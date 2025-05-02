import Modal from '@/components/modal'
import { Item } from '@/lib/schemas/item'
import type { Meal } from '@/lib/schemas/meal'
import { HiXMark } from 'react-icons/hi2'
import { updateMeal } from '../_actions/meals'
import MealForm from './meal-form'

export default function Meal({ items, meal }: { items: Item[]; meal: Meal }) {
  const tags = Array.from(
    new Map(
      meal.items
            .flatMap(({item}) => item.tags)
            .map(tag => [tag.id, tag])
    ).values()
)
  return (
    <Modal
      className='h-auto p-0 text-start'
      button={
        <div className='grid w-full grid-flow-row gap-3 p-3'>
          <span className='text-primary text-lg'>{meal.name}</span>
          {!!tags.length && <div className='flex gap-1'>
            {tags.map(({ id, name })=> <span key={id} className="badge badge-secondary badge-xs">{name}</span>)}
          </div>
          }
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
          data={meal}
          submit='Update Meal'
          action={updateMeal.bind(null, meal.id)}
        />
      </div>
    </Modal>
  )
}
