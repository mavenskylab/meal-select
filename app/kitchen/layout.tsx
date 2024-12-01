import Modal from '@/components/modal'
import { HiPlus, HiXMark } from 'react-icons/hi2'
import Search, { SearchFallback } from '../../components/forms/search'
import { addItem } from './_actions/items'
import ItemForm from './_components/item-form'
import Sidebar, { SidebarFallback } from './_components/sidebar'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid size-full grid-cols-[auto_1fr] divide-x divide-base-200'>
      <Suspense fallback={<SidebarFallback />}>
        <Sidebar />
      </Suspense>
      <main>
        <div className='px-5 pt-5'>
          <Suspense fallback={<SearchFallback />}>
            <Search />
          </Suspense>
        </div>
        <div className='grid grid-cols-2 gap-5 p-5 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8'>
          {children}
        </div>
        <Modal
          className={'btn-circle btn-primary btn-lg fixed bottom-5 right-5'}
          button={
            <>
              <span className='sr-only'>Add Item</span>
              <HiPlus className='size-10' />
            </>
          }
        >
          <div className='modal-box'>
            <div className='flex items-center justify-between'>
              <span className='text-lg font-bold'>Add Item</span>
              <form method='dialog'>
                <button type='submit' className='btn btn-circle btn-ghost'>
                  <span className='sr-only'>Close</span>
                  <HiXMark />
                </button>
              </form>
            </div>
            <ItemForm submit='Add Item' action={addItem} />
          </div>
        </Modal>
      </main>
    </div>
  )
}
