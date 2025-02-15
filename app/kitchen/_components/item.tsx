import Modal from '@/components/modal'
import { HiXMark } from 'react-icons/hi2'
import { updateItem } from '../_actions/items'
import ItemForm from './item-form'
import type { Item } from '@/lib/schemas/item'
import { Tag } from '@/lib/schemas/tag'

export default function Item({ tags, item }: { tags: Tag[]; item: Item }) {
  return (
    <Modal
      className='h-auto p-0 text-start'
      button={
        <div className='grid w-full grid-flow-row gap-3 p-3'>
          <span className='text-primary text-lg'>{item.name}</span>
          <span className='capitalize'>{item.store}</span>
          <span>{item.count}</span>
        </div>
      }
    >
      <div className='modal-box'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>Update Item</span>
          <form method='dialog'>
            <button type='submit' className='btn btn-circle btn-ghost'>
              <span className='sr-only'>Close</span>
              <HiXMark />
            </button>
          </form>
        </div>
        <ItemForm
          tags={tags}
          data={item as any}
          submit='Update Item'
          action={updateItem.bind(null, item.id)}
        />
      </div>
    </Modal>
  )
}
