'use server'

import { MealForm } from '@/lib/schemas/meal'
import { FormState } from '@/types/form'
import { getMeal } from './meal'
import { getClient } from '@/lib/supabase/client'

export async function confirm(
  id: any,
  state: FormState<MealForm>,
  payload: MealForm,
): Promise<FormState<MealForm>> {
  const client = await getClient()

  const meal = await getMeal(id)

  const validItemIds = meal?.node.mealItemCollection?.edges.map(
    ({ node }) => node.item!.id,
  )

  if (!validItemIds || !validItemIds.length) return state

  const items = payload.mealItemCollection?.edges.filter(
    ({ node }) => validItemIds.includes(node.item!.id) && node.count > 0,
  )

  if (!items || !items.length) return state

  // console.dir(items, { depth: null })

  // console.log((await client.from('Item').select('id, count').in('id', items.map(({node}) => node.item!.id))).data)

  return state
}
