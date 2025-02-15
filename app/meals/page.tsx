import Modal from '@/components/modal'
import { HiPlus, HiXMark } from 'react-icons/hi2'
import { getItems } from '../kitchen/_actions/items'
import { addMeal, getMeals } from './_actions/meals'
import Meal from './_components/meal'
import MealForm from './_components/meal-form'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const items = await getItems()

  const meals = await getMeals(query)

  return (
    <>
      <div className='grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {meals.map((meal) => (
          <Meal key={meal.id} items={items} meal={meal} />
        ))}
      </div>
      <Modal
        className={'btn-circle btn-primary btn-xl fixed right-5 bottom-5'}
        button={
          <>
            <span className='sr-only'>Add Meal</span>
            <HiPlus className='size-10' />
          </>
        }
      >
        <div className='modal-box'>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-bold'>Add Meal</span>
            <form method='dialog'>
              <button type='submit' className='btn btn-circle btn-ghost'>
                <span className='sr-only'>Close</span>
                <HiXMark />
              </button>
            </form>
          </div>
          <MealForm items={items} submit='Add Meal' action={addMeal} />
        </div>
      </Modal>
    </>
  )
}
