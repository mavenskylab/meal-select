'use server'

import { getClient, gql, ItemOrderBy } from '@/lib/graphql'
import { ItemForm, ItemSchema } from '@/lib/schemas/item'
import { FormState } from '@/types/form'
import { revalidateTag } from 'next/cache'

export async function getItems({
  search = '',
  store,
  orderBy,
}: {
  search?: string
  store?: string
  orderBy?: ItemOrderBy[]
}) {
  const client = getClient()

  const { data } = await client.query({
    query: gql(/* GraphQL */ `
      query GetItems(
        $search: String
        $store: String
        $orderBy: [ItemOrderBy!]
      ) {
        itemCollection(
          filter: { name: { ilike: $search }, store: { eq: $store } }
          orderBy: $orderBy
        ) {
          edges {
            node {
              id
              name
              store
              count
            }
          }
        }
      }
    `),
    variables: { search: `%${search}%`, store, orderBy },
  })

  return data.itemCollection?.edges ?? []
}

export async function addItem(
  state: FormState<ItemForm>,
  payload: ItemForm,
): Promise<FormState<ItemForm>> {
  const client = getClient()

  const { success, data, error } = ItemSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  try {
    await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation AddItem($name: String!, $store: String!, $count: Int) {
          insertIntoItemCollection(
            objects: [{ name: $name, store: $store, count: $count }]
          ) {
            affectedCount
          }
        }
      `),
      variables: data,
    })

    revalidateTag('items')

    return { success, data: {} }
  } catch (err) {
    console.dir(err, { depth: null })
    return {
      success: false,
      data: payload,
      message:
        'An error occurred while trying to add the item. Please try again.',
    }
  }
}

export async function updateItem(
  id: any,
  state: FormState<ItemForm>,
  payload: ItemForm,
): Promise<FormState<ItemForm>> {
  const client = getClient()

  const { success, data, error } = ItemSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  try {
    const response = await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation UpdateItem(
          $id: BigInt
          $name: String!
          $store: String!
          $count: Int!
        ) {
          updateItemCollection(
            filter: { id: { eq: $id } }
            set: { name: $name, store: $store, count: $count }
          ) {
            records {
              id
              name
              store
              count
            }
          }
        }
      `),
      variables: { id, ...data },
    })

    revalidateTag('items')

    return {
      success,
      data: response.data!.updateItemCollection.records.at(0)! as any,
    }
  } catch (err) {
    console.dir(err, { depth: null })
    return {
      success: false,
      data: payload,
      message:
        'An error occurred while trying to add the item. Please try again.',
    }
  }
}
export async function deleteItem(id: any) {
  const client = getClient()

  try {
    await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation DeleteItem($id: BigInt) {
          deleteFromItemCollection(filter: { id: { eq: $id } }) {
            affectedCount
          }
        }
      `),
      variables: { id },
    })

    revalidateTag('items')

    return true
  } catch (err) {
    console.dir(err, { depth: null })
    return false
  }
}
