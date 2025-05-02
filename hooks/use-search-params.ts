'use client'

import {
  useSearchParams as _useSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation'
import { useCallback } from 'react'

export type SearchParamsReturn<T = Record<string, string | string[]>> =
  ReturnType<typeof useSearchParams<T>>

export function useSearchParams<T = Record<string, string | string[]>>() {
  const router = useRouter()
  const pathname = usePathname()
  const _searchParams = _useSearchParams()

  const setSearchParam = useCallback(
    async (params: Partial<T>, replace = false) => {
      const searchParams = new URLSearchParams(
        replace ? {} : decodeURI(_searchParams.toString()),
      )

      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          if (Array.isArray(value)) {
            searchParams.delete(`${key}[]`)
            value.forEach((v) => searchParams.append(`${key}[]`, v.toString()))
          } else searchParams.set(key, value.toString())
        } else {
          searchParams.delete(key)
        }
      })

      return router.replace(`${pathname}?${searchParams}`)
    },
    [router, pathname, _searchParams],
  )

  const searchParams = Object.fromEntries(
    _searchParams.keys().map((key) => {
      if (key.endsWith('[]')) {
        return [key.substring(0, key.length - 2), _searchParams.getAll(key)]
      }

      return [key, _searchParams.get(key)!]
    }),
  ) as T

  return {
    searchParams,
    setSearchParam,
  } as const
}
