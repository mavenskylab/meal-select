import Modal from '@/components/modal'
import { HiXMark } from 'react-icons/hi2'
import TagForm from './tag-from'
import type { Tag } from '@/lib/schemas/tag'
import { updateTag } from '../_actions/tags'

export default function Tag({ tag }: { tag: Tag }) {
  return (
    <Modal
      className='h-auto p-0 text-start'
      button={
        <div className='grid w-full grid-flow-row gap-3 p-3'>
          <span className='text-primary text-lg'>{tag.name}</span>
        </div>
      }
    >
      <div className='modal-box'>
        <div className='flex items-center justify-between'>
          <span className='text-lg font-bold'>Update Tag</span>
          <form method='dialog'>
            <button type='submit' className='btn btn-circle btn-ghost'>
              <span className='sr-only'>Close</span>
              <HiXMark />
            </button>
          </form>
        </div>
        <TagForm
          data={tag}
          submit='Update Tag'
          action={updateTag.bind(null, tag.id)}
        />
      </div>
    </Modal>
  )
}
