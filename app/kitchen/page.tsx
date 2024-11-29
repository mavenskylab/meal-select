import Modal from '@/components/modal'
import { HiPlus, HiXMark } from 'react-icons/hi2'
import { unstable_cache } from 'next/cache'
import { addItem, getItems } from './_actions/items'
import Item from './_components/item'
import ItemForm from './_components/item-form'
import Sidebar from './_components/sidebar'
import Search from '../../components/forms/search'
import { OrderByDirection } from '@/lib/graphql'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>
}) {
  const query = await searchParams

  const items = await unstable_cache(getItems, ['items'], {
    revalidate: 3600,
    tags: ['items'],
  })({
    ...query,
    orderBy: [
      { count: OrderByDirection.DescNullsLast },
      { name: OrderByDirection.AscNullsLast },
    ],
  })

  return (
    <div className='grid size-full grid-cols-[auto_1fr] divide-x divide-base-200'>
      <Sidebar />
      <main>
        <div className='px-5 pt-5'>
          <Search />
        </div>
        <div className='grid grid-cols-2 gap-5 p-5 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8'>
          {items.map((item) => (
            <Item key={item.node.id} item={item} />
          ))}
        </div>
        <Modal
          className={'btn-circle btn-primary btn-lg absolute bottom-5 right-5'}
          button={
            <>
              <span className='sr-only'>Add Item</span>
              <HiPlus className='size-10 fill-primary-content' />
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
