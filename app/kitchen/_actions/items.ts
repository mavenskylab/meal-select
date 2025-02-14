'use server'

import { ItemForm, ItemSchema } from '@/lib/schemas/item'
import { getClient } from '@/lib/supabase/client'
import { FormState } from '@/types/form'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getItems = unstable_cache(
  async ({ search = '', store }: { search?: string; store?: string } = {}) => {
    const client = await getClient()

    const query = client.from('Item').select('*, tags:Tag(tag_id:id, name)')

    if (store) query.eq('store', store)
    if (search) query.ilike('name', `%${search}%`)

    const { data, error } = await query

    if (error) throw error

    return data
  },
)

export async function addItem(
  state: FormState<ItemForm>,
  payload: ItemForm,
): Promise<FormState<ItemForm>> {
  const client = await getClient()

  const { success, data, error } = ItemSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const { tags, ...item } = data

  const response = await client.from('Item').insert(item).select('id').single()

  if (response.error) throw response.error

  const item_id = response.data.id

  if (tags.length) {
    const response = await client
      .from('ItemTag')
      .insert(tags.map(({ tag_id }) => ({ item_id, tag_id })))

    if (response.error) throw response.error
  }

  revalidateTag('items')

  return { success, data: {} }
}

export async function updateItem(
  id: any,
  state: FormState<ItemForm>,
  payload: ItemForm,
): Promise<FormState<ItemForm>> {
  const client = await getClient()

  const { success, data, error } = ItemSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const { tags, ...item } = data

  const response = await client.from('Item').update(item).eq('id', id)

  if (response.error) throw response.error

  await client.from('ItemTag').delete().eq('item_id', id)

  if (tags.length) {
    const response = await client
      .from('ItemTag')
      .insert(tags.map(({ tag_id }) => ({ item_id: id, tag_id })))

    if (response.error) throw response.error
  }

  revalidateTag('items')

  return {
    success,
    data,
  }
}
export async function deleteItem(id: any) {
  const client = await getClient()

  const { error, count } = await client.from('Item').delete().eq('id', id)

  if (error) throw error

  revalidateTag('items')

  return count
}
