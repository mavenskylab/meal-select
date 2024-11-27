import { getMeals } from '@/app/meals/_actions/meals'
import { unstable_cache } from 'next/cache'
import Knockout from './_components/knockout'

export default async function Page() {
  const meals = await unstable_cache(async () => getMeals({}), ['meals'], {
    revalidate: 3600,
    tags: ['meals'],
  })()

  if (!meals.length) return null

  return <Knockout meals={meals.toSorted(() => Math.random() - 0.5)} />
}
