'use client'

import { SearchParamsReturn, useSearchParams } from '@/hooks/use-search-params'
import { useEffect, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

export default function Search() {
  const { searchParams, setSearchParam } = useSearchParams<{
    search?: string
  }>()

  return (
    <SearchFallback
      searchParams={searchParams}
      setSearchParam={setSearchParam}
    />
  )
}

export function SearchFallback({
  searchParams,
  setSearchParam,
}: Partial<SearchParamsReturn<{ search?: string }>>) {
  const [search, setSearch] = useState(searchParams?.search ?? '')

  useEffect(() => {
    setSearchParam?.({ search })
  }, [search])

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
        disabled={!setSearchParam}
        onChange={(event) => setSearch(event.target.value)}
      />
    </label>
  )
}
