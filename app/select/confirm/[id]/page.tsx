import { getMeal } from '@/app/meals/_actions/meals'
import { confirm } from './_actions/confirm'
import Meal from './_components/meal'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const meal = await getMeal(id)

  if (!meal) return null

  return (
    <main className='grid justify-center p-5'>
      <Meal meal={meal} action={confirm.bind(null, meal.id)} />
    </main>
  )
}
