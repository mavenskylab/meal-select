'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchParams, setSearchParam] = useSearchParams()
  const [search, setSearch] = useState(searchParams.search ?? '')

  useEffect(() => {
    router.replace(`${pathname}?${setSearchParam('search', search)}`)
  }, [router, pathname, setSearchParam, search])

  return <SearchFallback search={search} setSearch={setSearch} />
}

export function SearchFallback({
  search,
  setSearch,
}: {
  search?: string | string[]
  setSearch?: Dispatch<SetStateAction<string | string[]>>
}) {
  return (
    <label className='input input-bordered flex items-center gap-2'>
      <span className='sr-only'>Search</span>
      <HiMagnifyingGlass />
      <input
        type='text'
        className='grow'
        name='search'
        value={search}
        placeholder='Search'
        disabled={!setSearch}
        onChange={(event) => setSearch?.(event.target.value)}
      />
    </label>
  )
}
