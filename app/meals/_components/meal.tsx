import Modal from '@/components/modal'
import { deleteMeal, updateMeal } from '../_actions/meals'
import { XMarkIcon } from '@heroicons/react/24/solid'
import DeleteButton from './delete-button'
import MealForm from './meal-form'
import type { Item } from '@/app/kitchen/_actions/items'
import type { Meal } from '@/lib/schemas/meal'

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
          <div className='flex items-center justify-between'>
            <span className='text-lg text-primary'>{node.name}</span>
            <DeleteButton action={deleteMeal.bind(null, node.id)} />
          </div>
        </div>
      }
    >
      <div className='modal-box'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>Update Meal</span>
          <form method='dialog'>
            <button type='submit' className='btn btn-circle btn-ghost'>
              <span className='sr-only'>Close</span>
              <XMarkIcon className='size-6' />
            </button>
          </form>
        </div>
        <MealForm items={items} data={node} submit='Update Meal' action={updateMeal} />
      </div>
    </Modal>
  )
}
