import { getMeals } from '@/app/meals/_actions/meals'
import { shuffle } from '@/lib/util/shuffle'
import { unstable_cache } from 'next/cache'
import Knockout from './_components/knockout'

export default async function Page() {
  const meals = await unstable_cache(async () => getMeals({}), ['meals'], {
    revalidate: 3600,
    tags: ['meals'],
  })()

  if (!meals.length) return null

  const shuffledMeals = await unstable_cache(shuffle as any, ['select'], {
    tags: ['select'],
  })(meals)

  return <Knockout meals={shuffledMeals} />
}
