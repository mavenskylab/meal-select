'use server'

import { getClient, gql, MealOrderBy } from '@/lib/graphql'
import { MealForm, MealSchema } from '@/lib/schemas/meal'
import { FormState } from '@/types/form'
import { revalidateTag } from 'next/cache'

export async function getMeals({
  search = '',
  orderBy,
}: {
  search?: string
  orderBy?: MealOrderBy[]
}) {
  const client = getClient()

  const { data } = await client.query({
    query: gql(/* GraphQL */ `
      query GetMeals($search: String, $orderBy: [MealOrderBy!]) {
        mealCollection(
          filter: { name: { ilike: $search } }
          orderBy: $orderBy
        ) {
          edges {
            node {
              id
              name
              mealItemCollection {
                edges {
                  node {
                    item {
                      id
                      name
                    }
                    count
                  }
                }
              }
            }
          }
        }
      }
    `),
    variables: { search: `%${search}%`, orderBy },
  })

  return data.mealCollection?.edges ?? []
}

export async function addMeal(
  state: FormState<MealForm>,
  payload: MealForm,
): Promise<FormState<MealForm>> {
  const client = getClient()

  const { success, data: _data, error } = MealSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const { name, mealItemCollection } = {
    ..._data,
    mealItemCollection: {
      edges:
        _data.mealItemCollection?.edges.filter(
          ({
            node: {
              item: { id },
            },
          }) => !!id,
        ) ?? [],
    },
  }

  try {
    // https://github.com/supabase/pg_graphql/issues/294

    const response = await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation AddMeal($name: String!) {
          insertIntoMealCollection(objects: [{ name: $name }]) {
            records {
              id
            }
          }
        }
      `),
      variables: { name },
    })

    if (mealItemCollection.edges.length) {
      await client.mutate({
        mutation: gql(/* GraphQL */ `
          mutation AddMealItem($objects: [MealItemInsertInput!]!) {
            insertIntoMealItemCollection(objects: $objects) {
              affectedCount
            }
          }
        `),
        variables: {
          objects: mealItemCollection.edges.map(
            ({
              node: {
                item: { id: item_id },
                count,
              },
            }) => ({
              meal_id:
                response.data?.insertIntoMealCollection?.records.at(0)?.id,
              item_id,
              count,
            }),
          ),
        },
      })
    }

    revalidateTag('meals')

    return { success, data: {} }
  } catch (err) {
    console.dir(err, { depth: null })
    return {
      success: false,
      data: payload,
      message:
        'An error occurred while trying to add the meal. Please try again.',
    }
  }
}

export async function updateMeal(
  id: number,
  state: FormState<MealForm>,
  payload: MealForm,
): Promise<FormState<MealForm>> {
  const client = getClient()

  const { success, data, error } = MealSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const { name, mealItemCollection } = {
    ...data,
    mealItemCollection: data.mealItemCollection?.edges
      .filter(
        ({
          node: {
            item: { id },
          },
        }) => !!id,
      )
      .map(
        ({
          node: {
            item: { id: item_id },
            count,
          },
        }) => ({
          meal_id: id,
          item_id,
          count,
        }),
      ),
  }

  try {
    await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation ClearItems($id: BigInt) {
          deleteFromMealItemCollection(filter: { meal_id: { eq: $id } }) {
            affectedCount
          }
        }
      `),
      variables: { id },
    })

    if (mealItemCollection?.length) {
      await client.mutate({
        mutation: gql(/* GraphQL */ `
          mutation UpdateMealItems(
            $mealItemCollection: [MealItemInsertInput!]!
          ) {
            insertIntoMealItemCollection(objects: $mealItemCollection) {
              affectedCount
            }
          }
        `),
        variables: { mealItemCollection },
      })
    }

    const response = await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation UpdateMeal($id: BigInt, $name: String!) {
          updateMealCollection(
            filter: { id: { eq: $id } }
            set: { name: $name }
          ) {
            records {
              id
              name
              mealItemCollection {
                edges {
                  node {
                    item {
                      id
                      name
                    }
                    count
                  }
                }
              }
            }
          }
        }
      `),
      variables: { id, name },
    })

    revalidateTag('meals')

    return {
      success,
      data: response.data!.updateMealCollection.records.at(0)! as MealForm,
    }
  } catch (err) {
    console.dir(err, { depth: null })
    return {
      success: false,
      data: payload,
      message:
        'An error occurred while trying to update the meal. Please try again.',
    }
  }
}

export async function deleteMeal(id: any) {
  const client = getClient()

  try {
    await client.mutate({
      mutation: gql(/* GraphQL */ `
        mutation DeleteMeal($id: BigInt) {
          deleteFromMealCollection(filter: { id: { eq: $id } }) {
            affectedCount
          }
        }
      `),
      variables: { id, count: 0 },
    })

    revalidateTag('meals')

    return true
  } catch (err) {
    console.dir(err, { depth: null })
    return false
  }
}
