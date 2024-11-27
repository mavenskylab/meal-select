'use client'

import { cn } from '@/lib/util'
import Link from 'next/link'
import { SparklesIcon } from '@heroicons/react/24/solid'
import { ViewColumnsIcon } from '@heroicons/react/24/solid'
import { useSearchParams } from '@/hooks/use-search-params'

export default function Sidebar() {
  const [searchParams, setSearchParam] = useSearchParams()

  return (
    <aside className='flex flex-col gap-5 py-5'>
      <section>
        <Link
          href='/kitchen'
          className={cn(
            'flex w-full gap-3 p-3',
            `${!Object.keys(searchParams).length ? 'bg-gray-900 text-primary' : 'hover:bg-gray-900 hover:text-primary'}`,
          )}
        >
          <SparklesIcon className='size-6' />
          <span>All</span>
        </Link>
      </section>
      <section>
        <Link
          href={`?${setSearchParam('store', 'cupboard')}`}
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams.store === 'cupboard' ? 'bg-gray-900 text-primary' : 'hover:bg-gray-900 hover:text-primary'}`,
          )}
        >
          <ViewColumnsIcon className='size-6' />
          <span>Cupboard</span>
        </Link>
      </section>
      <section>
        <Link
          href={`?${setSearchParam('store', 'fridge')}`}
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams.store === 'fridge' ? 'bg-gray-900 text-primary' : 'hover:bg-gray-900 hover:text-primary'}`,
          )}
        >
          <ViewColumnsIcon className='size-6' />
          <span>Fridge</span>
        </Link>
      </section>
      <section>
        <Link
          href={`?${setSearchParam('store', 'freezer')}`}
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams.store === 'freezer' ? 'bg-gray-900 text-primary' : 'hover:bg-gray-900 hover:text-primary'}`,
          )}
        >
          <ViewColumnsIcon className='size-6' />
          <span>Freezer</span>
        </Link>
      </section>
    </aside>
  )
}
