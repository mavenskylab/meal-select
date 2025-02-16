'use client'

import { useSearchParams as _useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export type SearchParamsReturn = ReturnType<typeof useSearchParams>

export function useSearchParams() {
  const _searchParams = _useSearchParams()

  const setSearchParam = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(_searchParams.toString())

      if (value) {
        params.set(name, Array.isArray(value) ? value.toString() : value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [_searchParams],
  )

  const searchParams = Object.fromEntries<string | string[] | undefined>(
    _searchParams.entries(),
  )

  return {
    searchParams,
    setSearchParam,
  } as const
}
