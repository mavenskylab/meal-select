import Search from '@/components/forms/search'
import Modal from '@/components/modal'
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { addMeal, getMeals } from './_actions/meals'
import { unstable_cache } from 'next/cache'
import Meal from './_components/meal'
import MealForm from './_components/meal-form'
import { getItems } from '../kitchen/_actions/items'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const meals = await unstable_cache(
    async (query: Awaited<typeof searchParams>) => getMeals(query),
    ['meals'],
    {
      revalidate: 3600,
      tags: ['meals'],
    },
  )(query)

  const items = await unstable_cache(async () => getItems({}), ['items'], {
    revalidate: 3600,
    tags: ['items'],
  })()

  return (
    <main>
      <div className='px-5 pt-5'>
        <Search />
      </div>
      <div className='grid grid-cols-4 gap-5 p-5'>
        {meals.map((meal) => (
          <Meal key={meal.node.id} items={items} meal={meal} />
        ))}
      </div>
      <Modal
        className={'btn-circle btn-primary btn-lg absolute bottom-5 right-5'}
        button={
          <>
            <span className='sr-only'>Add Meal</span>
            <PlusIcon className='size-10 fill-primary-content' />
          </>
        }
      >
        <div className='modal-box'>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-bold'>Add Meal</span>
            <form method='dialog'>
              <button type='submit' className='btn btn-circle btn-ghost'>
                <span className='sr-only'>Close</span>
                <XMarkIcon className='size-6' />
              </button>
            </form>
          </div>
          <MealForm items={items} submit='Add Meal' action={addMeal} />
        </div>
      </Modal>
    </main>
  )
}
