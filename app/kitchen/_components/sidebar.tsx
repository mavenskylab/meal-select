'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { cn } from '@/lib/util'
import Link from 'next/link'
import { BiSolidFridge } from 'react-icons/bi'
import { HiSparkles } from 'react-icons/hi2'
import { IoSnow } from 'react-icons/io5'
import { MdDoorSliding } from 'react-icons/md'

export default function Sidebar() {
  const [searchParams, setSearchParam] = useSearchParams()

  return (
    <SidebarFallback
      searchParams={searchParams}
      setSearchParam={setSearchParam}
    />
  )
}

export function SidebarFallback({
  searchParams,
  setSearchParam,
}: {
  searchParams?: Record<string, string | string[] | undefined>
  setSearchParam?: (name: string, value: string | string[]) => string
}) {
  return (
    <aside className='flex flex-col gap-5 py-5 md:w-60'>
      <section>
        <Link
          href='/kitchen'
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams && !Object.keys(searchParams).length ? 'bg-base-200 text-primary' : 'hover:bg-base-200 hover:text-primary'}`,
          )}
        >
          <HiSparkles />
          <span className='hidden md:block'>All</span>
        </Link>
      </section>
      <section>
        <Link
          href={`?${setSearchParam?.('store', 'cupboard') ?? ''}`}
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams?.store === 'cupboard' ? 'bg-base-200 text-primary' : 'hover:bg-base-200 hover:text-primary'}`,
          )}
        >
          <MdDoorSliding />
          <span className='hidden md:block'>Cupboard</span>
        </Link>
      </section>
      <section>
        <Link
          href={`?${setSearchParam?.('store', 'fridge') ?? ''}`}
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams?.store === 'fridge' ? 'bg-base-200 text-primary' : 'hover:bg-base-200 hover:text-primary'}`,
          )}
        >
          <BiSolidFridge />
          <span className='hidden md:block'>Fridge</span>
        </Link>
      </section>
      <section>
        <Link
          href={`?${setSearchParam?.('store', 'freezer') ?? ''}`}
          className={cn(
            'flex w-full gap-3 p-3',
            `${searchParams?.store === 'freezer' ? 'bg-base-200 text-primary' : 'hover:bg-base-200 hover:text-primary'}`,
          )}
        >
          <IoSnow />
          <span className='hidden md:block'>Freezer</span>
        </Link>
      </section>
    </aside>
  )
}
