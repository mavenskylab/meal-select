'use server'

import { getMeal } from '@/app/meals/_actions/meals'
import { MealForm } from '@/lib/schemas/meal'
import { FormState } from '@/types/form'
// import { getClient } from '@/lib/supabase/client'

export async function confirm(
  id: any,
  state: FormState<MealForm>,
  payload: MealForm,
): Promise<FormState<MealForm>> {
  // const client = await getClient()

  const meal = await getMeal(id)

  const validItemIds = meal?.items.map(({ item }) => item.id)

  if (!validItemIds || !validItemIds.length) return state

  const items = payload.items.filter(
    ({ item, count }) => validItemIds.includes(item.id) && count > 0,
  )

  if (!items || !items.length) return state

  // console.dir(items, { depth: null })

  // console.log((await client.from('Item').select('id, count').in('id', items.map(({node}) => node.item!.id))).data)

  return state
}
