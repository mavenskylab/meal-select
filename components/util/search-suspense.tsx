'use client'

import { useSearchParams } from '@/hooks/use-search-params'
import { hash } from '@/lib/util/hash'
import { Fragment, Suspense, SuspenseProps } from 'react'

export function SearchSuspense({ fallback = null, children }: SuspenseProps) {
  const { searchParams } = useSearchParams()

  return (
    <Suspense fallback={fallback}>
      <Fragment key={hash(searchParams)}>{children}</Fragment>
    </Suspense>
  )
}
