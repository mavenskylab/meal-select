import Modal from '@/components/modal'
import { XMarkIcon } from '@heroicons/react/24/solid'
import ItemForm from './item-form'
import { clearItem, type Item, updateItem } from '../_actions/items'
import ClearButton from './clear-button'

export default function Item({
  item: { node },
}: {
  item: Item
}) {
  return (
    <Modal
      className='h-auto p-0 text-start'
      button={
        <div className='grid w-full grid-flow-row gap-3 p-3'>
          <div className='flex items-center justify-between'>
            <span className='text-lg text-primary'>{node.name}</span>
            <ClearButton action={clearItem.bind(null, node.id)} />
          </div>
          <div>
            <span className='capitalize'>{node.store}</span>
          </div>
          <div>
            <span>{node.count}</span>
          </div>
        </div>
      }
    >
      <div className='modal-box'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>Update Item</span>
          <form method='dialog'>
            <button type='submit' className='btn btn-circle btn-ghost'>
              <span className='sr-only'>Close</span>
              <XMarkIcon className='size-6' />
            </button>
          </form>
        </div>
        <ItemForm data={node} submit='Update Item' action={updateItem} />
      </div>
    </Modal>
  )
}
