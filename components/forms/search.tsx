'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
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
      <MagnifyingGlassIcon className='size-6' />
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
