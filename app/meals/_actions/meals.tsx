'use server'

import { MealForm, MealSchema } from '@/lib/schemas/meal'
import { getClient } from '@/lib/supabase/client'
import { FormState } from '@/types/form'
import { revalidateTag, unstable_cache } from 'next/cache'

export const getMeals = unstable_cache(
  async ({ search = '' }: { search?: string } = {}) => {
    const client = await getClient()

    const query = client
      .from('Meal')
      .select(
        '*, items:MealItem(item:Item(id, name, tags:Tag(tag_id:id, name)), count)',
      )

    if (search) query.ilike('name', `%${search}%`)

    const { data, error } = await query

    if (error) throw error

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
          '*, items:MealItem(item:Item(id, name, tags:Tag(tag_id:id, name)), count)',
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

  const { items, ...meal } = data

  const response = await client.from('Meal').insert(meal).select('id').single()

  if (response.error) throw response.error

  const meal_id = response.data.id

  if (items.length) {
    const response = await client
      .from('MealItem')
      .insert(
        items.map(({ item, count }) => ({ meal_id, item_id: item.id, count })),
      )

    if (response.error) throw response.error
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

  const { items, ...meal } = data

  const response = await client.from('Meal').update(meal).eq('id', id)

  if (response.error) throw response.error

  await client.from('MealItem').delete().eq('meal_id', id)

  if (items.length) {
    const response = await client.from('MealItem').insert(
      items.map(({ item, count }) => ({
        meal_id: id,
        item_id: item.id,
        count,
      })),
    )

    if (response.error) throw response.error
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
