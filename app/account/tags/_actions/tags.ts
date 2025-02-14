'use server'

import { Tag, TagForm, TagSchema } from '@/lib/schemas/tag'
import { getClient } from '@/lib/supabase/client'
import { FormState } from '@/types/form'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getTags = unstable_cache(
  async ({ search = '' }: { search?: string } = {}) => {
    const client = await getClient()

    const { data, error } = await client
      .from('Tag')
      .select('*')
      .ilike('name', `%${search}%`)

    if (error) throw error

    return data
  },
  ['tags'],
  { revalidate: 3600, tags: ['tags'] },
)

export async function addTag(
  state: FormState<TagForm>,
  payload: TagForm,
): Promise<FormState<TagForm>> {
  const client = await getClient()

  const { success, data, error } = TagSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const response = await client.from('Tag').insert(data)

  if (response.error) {
    console.dir(response.error, { depth: null })
    return {
      success: false,
      data: payload,
      errors: {
        _errors: [response.error.message],
      },
    }
  }

  revalidateTag('tags')

  return { success, data: {} }
}

export async function updateTag(
  id: Tag['id'],
  state: FormState<TagForm>,
  payload: TagForm,
): Promise<FormState<TagForm>> {
  const client = await getClient()

  const { success, data, error } = TagSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const response = await client.from('Tag').update(data).eq('id', id)

  if (response.error) {
    console.dir(response.error, { depth: null })
    return {
      success: false,
      data: payload,
      errors: {
        _errors: [response.error.message],
      },
    }
  }

  revalidateTag('tags')

  return { success }
}
export async function deleteTag(id: Tag['id']) {
  const client = await getClient()

  const { error, count } = await client.from('Tag').delete().eq('id', id)

  if (error) throw error

  revalidateTag('tags')

  return count
}
