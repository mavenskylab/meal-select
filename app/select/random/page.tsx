import { getMeals } from '@/app/meals/_actions/meals'
import { unstable_cache } from 'next/cache'
import Winner from '../_components/winner'

export default async function Page() {
  const meals = await unstable_cache(getMeals, ['meals'], {
    revalidate: 3600,
    tags: ['meals'],
  })({})

  if (!meals.length) return null

  const meal = await unstable_cache(
    (meals: any[]) => meals.at(Math.floor(Math.random() * meals.length)),
    ['select'],
    { revalidate: false, tags: ['select'] },
  )(meals)

  return (
    <main className='grid justify-center p-5'>
      <Winner meal={meal} />
    </main>
  )
}
