import type { Item } from '@/app/kitchen/_actions/items'
import Modal from '@/components/modal'
import type { Meal } from '@/lib/schemas/meal'
import { HiXMark } from 'react-icons/hi2'
import { updateMeal } from '../_actions/meals'
import MealForm from './meal-form'

export default function Meal({
  items,
  meal: { node },
}: {
  items: Item[]
  meal: Meal
}) {
  return (
    <Modal
      className='h-auto p-0 text-start'
      button={
        <div className='grid w-full grid-flow-row gap-3 p-3'>
          <span className='text-lg text-primary'>{node.name}</span>
        </div>
      }
    >
      <div className='modal-box'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>Update Meal</span>
          <form method='dialog'>
            <button type='submit' className='btn btn-circle btn-ghost'>
              <span className='sr-only'>Close</span>
              <HiXMark />
            </button>
          </form>
        </div>
        <MealForm
          items={items}
          data={node}
          submit='Update Meal'
          action={updateMeal}
        />
      </div>
    </Modal>
  )
}
