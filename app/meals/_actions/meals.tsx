'use server'

import { MealForm, MealSchema } from '@/lib/schemas/meal'
import { getClient } from '@/lib/supabase/client'
import { FormState } from '@/types/form'
import { revalidateTag, unstable_cache } from 'next/cache'
import { number } from 'zod'

export const getMeals = unstable_cache(
  async ({
    search,
    includes,
    requires,
    excludes,
  }: {
    search?: string
    includes?: string[]
    requires?: string[]
    excludes?: string[]
  } = {}) => {
    const client = await getClient()

    const query = client
      .from('Meal')
      .select(
        `*, items:MealItem${includes || requires ? '!inner' : ''}(item:Item${includes || requires ? '!inner' : ''}(id, name, tags:Tag${includes || requires ? '!inner' : ''}(id, name)), count)`,
      )

    if (search) query.ilike('name', `%${search}%`)
    if (includes) query.in('items.item.tags.id', includes)
    if (requires) query.contains('items.item.tags.id', requires)
    if (excludes) query.not('items.item.tags.id', 'in', `(${excludes.join(',')})`)

    const { data, error } = await query.order('name')

    if (error) throw error

    console.dir(data, { depth: null })

    return data
  },
  ['meals'],
  { revalidate: 3600, tags: ['meals'] },
)

export const getMeal = async (id: any) =>
  unstable_cache(
    async (id: any) => {
      const client = await getClient()

      const { data, error } = await client
        .from('Meal')
        .select(
          '*, items:MealItem(item:Item(id, name, tags:Tag(id, name)), count)',
        )
        .eq('id', id)
        .single()

      if (error) throw error

      return data
    },
    [`meal-${id}`],
    { revalidate: 3600, tags: [`meal-${id}`] },
  )(id)

export async function addMeal(
  state: FormState<MealForm>,
  payload: MealForm,
): Promise<FormState<MealForm>> {
  const client = await getClient()

  const { success, data, error } = MealSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const { items: _items, ...meal } = data

  const response = await client.from('Meal').insert(meal).select('id').single()

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

  const meal_id = response.data.id

  const items = _items.filter(({ item }) => item.id)

  if (items.length) {
    const response = await client
      .from('MealItem')
      .insert(
        items.map(({ item, count }) => ({ meal_id, item_id: item.id, count })),
      )

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
  }

  revalidateTag('meals')

  return { success, data: {} }
}

export async function updateMeal(
  id: number,
  state: FormState<MealForm>,
  payload: MealForm,
): Promise<FormState<MealForm>> {
  const client = await getClient()

  const { success, data, error } = MealSchema.safeParse(payload)

  if (!success) {
    return {
      success,
      data: payload,
      errors: error.format(),
    }
  }

  const { items: _items, ...meal } = data

  const response = await client.from('Meal').update(meal).eq('id', id)

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

  await client.from('MealItem').delete().eq('meal_id', id)

  const items = _items.filter(({ item }) => item.id)

  if (items.length) {
    const response = await client.from('MealItem').insert(
      items.map(({ item, count }) => ({
        meal_id: id,
        item_id: item.id,
        count,
      })),
    )

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
  }

  revalidateTag('meals')

  return { success, data }
}

export async function deleteMeal(id: any) {
  const client = await getClient()

  const { error, count } = await client.from('Meal').delete().eq('id', id)

  if (error) throw error

  revalidateTag('meals')

  return count
}
