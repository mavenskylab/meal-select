import Modal from '@/components/modal'
import { HiPlus, HiXMark } from 'react-icons/hi2'
import { Suspense } from 'react'
import Search, { SearchFallback } from '@/components/forms/search'
import { addTag } from './_actions/tags'
import TagForm from './_components/tag-from'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='px-5 pt-5'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      <div className='grid grid-cols-2 gap-5 p-5 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8'>
        {children}
      </div>
      <Modal
        className={'btn-circle btn-primary btn-xl fixed right-5 bottom-5'}
        button={
          <>
            <span className='sr-only'>Add Tag</span>
            <HiPlus className='size-10' />
          </>
        }
      >
        <div className='modal-box'>
          <div className='flex items-center justify-between'>
            <span className='text-lg font-bold'>Add Tag</span>
            <form method='dialog'>
              <button type='submit' className='btn btn-circle btn-ghost'>
                <span className='sr-only'>Close</span>
                <HiXMark />
              </button>
            </form>
          </div>
          <TagForm submit='Add Tag' action={addTag} />
        </div>
      </Modal>
    </>
  )
}
