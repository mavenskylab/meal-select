import { formatSearchParams } from '@/lib/util/format-search-params'
import { getItems } from '../kitchen/_actions/items'
import { getMeals } from './_actions/meals'
import Meal from './_components/meal'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string
    'includes[]'?: string | string[]
    'requires[]'?: string | string[]
    'excludes[]'?: string | string[]
  }>
}) {
  const query = formatSearchParams(await searchParams)

  console.log(query)

  const items = await getItems()

  const meals = await getMeals(query)

  return meals.map((meal) => <Meal key={meal.id} items={items} meal={meal} />)
}
