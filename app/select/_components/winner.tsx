'use client'

import type { Meal } from '@/lib/schemas/meal'
import { revalidate } from '../_actions/revalidate'
import Link from 'next/link'

export default function Winner({ meal: { node } }: { meal: Meal }) {
  return (
    <div className='grid h-fit w-full grid-flow-row gap-3 rounded bg-base-200 p-5'>
      <span className='w-80 max-w-xs text-3xl text-primary'>{node.name}</span>
      <hr className='mx-5 rounded-full border-base-300' />
      <Link
        href={`confirm/${node.id}`}
        role='button'
        className='btn btn-success'
      >
        Accept
      </Link>
      <hr className='mx-5 rounded-full border-base-300' />
      <button
        type='button'
        className='btn btn-error'
        onClick={() => revalidate()}
      >
        Retry
      </button>
    </div>
  )
}
