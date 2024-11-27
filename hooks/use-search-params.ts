'use client'

import { useSearchParams as _useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export function useSearchParams() {
  const searchParams = _useSearchParams()

  const setSearchParam = useCallback(
    (name: string, value: string | string[]) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set(name, Array.isArray(value) ? value.toString() : value)
      } else {
        params.delete(name)
      }

      return params.toString()
    },
    [searchParams],
  )

  return [
    Object.fromEntries<string | string[] | undefined>(searchParams.entries()),
    setSearchParam,
  ] as const
}
