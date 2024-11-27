import { getMeals } from '@/app/meals/_actions/meals'
import { unstable_cache } from 'next/cache'
import Meal from '../_components/meal'

export default async function Page() {
  const meals = await unstable_cache(async () => getMeals({}), ['meals'], {
    revalidate: 3600,
    tags: ['meals'],
  })()

  if (!meals.length) return null

  const meal = meals.at(Math.floor(Math.random() * meals.length))!

  return (
    <main className='grid justify-center p-5'>
      <Meal meal={meal} />
    </main>
  )
}
