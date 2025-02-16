import { getItems } from '../kitchen/_actions/items'
import { getMeals } from './_actions/meals'
import Meal from './_components/meal'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const items = await getItems()

  const meals = await getMeals(query)

  return meals.map((meal) => <Meal key={meal.id} items={items} meal={meal} />)
}
