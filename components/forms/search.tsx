'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Search() {
  const router = useRouter()
  const pathname = usePathname()
  const [searchParams, setSearchParam] = useSearchParams()
  const [search, setSearch] = useState(searchParams.search ?? '')

  useEffect(() => {
    router.replace(`${pathname}?${setSearchParam('search', search)}`)
  }, [router, pathname, setSearchParam, search])

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
        onChange={(event) => setSearch(event.target.value)}
      />
    </label>
  )
}
