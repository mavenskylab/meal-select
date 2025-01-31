import { getMeals } from '@/app/meals/_actions/meals'
import { OrderByDirection } from '@/lib/graphql'
import { unstable_cache } from 'next/cache'
import Meal from './_components/meal'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const meals = await unstable_cache(getMeals, ['meals'], {
    revalidate: 3600,
    tags: ['meals'],
  })({ ...query, orderBy: [{ name: OrderByDirection.AscNullsLast }] })

  return (
    <div className='grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
      {meals.map((meal) => (
        <Meal key={meal.node.id} meal={meal} />
      ))}
    </div>
  )
}
