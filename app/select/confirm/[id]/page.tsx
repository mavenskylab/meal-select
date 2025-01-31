import { confirm } from './_actions/confirm'
import { getMeal } from './_actions/meal'
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
      <Meal meal={meal} action={confirm.bind(null, meal.node.id)} />
    </main>
  )
}
