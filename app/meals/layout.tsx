import Search, { SearchFallback } from '@/components/forms/search'
import Modal from '@/components/modal'
import { Item } from '@/lib/schemas/item'
import { Suspense } from 'react'
import { HiPlus, HiXMark } from 'react-icons/hi2'
import { getItems } from '../kitchen/_actions/items'
import { addMeal } from './_actions/meals'
import MealForm from './_components/meal-form'
import Filters, { FilterBadges, FiltersFallback } from '@/components/forms/filters'
import { getTags } from '../account/tags/_actions/tags'
import { SearchSuspense } from '@/components/util/search-suspense'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const tags = await getTags()

  return (
    <main>
      <div className='px-5 pt-5'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
        <Suspense
          fallback={<FiltersFallback label='Filter by tags' items={tags} />}
        >
          <Filters label='Filter by tags' items={tags} />
        </Suspense>
        <FilterBadges items={tags}/>
      </div>
      <div className='grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        <SearchSuspense>{children}</SearchSuspense>
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
          <Suspense fallback={<AddMeal items={[]} />}>
            <AddMeal />
          </Suspense>
        </div>
      </Modal>
    </main>
  )
}

async function AddMeal({ items: _items }: { items?: Item[] }) {
  const items = _items ?? (await getItems())

  return <MealForm items={items} submit='Add Meal' action={addMeal} />
}
