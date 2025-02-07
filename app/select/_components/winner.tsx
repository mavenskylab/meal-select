'use client'

import type { Meal } from '@/lib/schemas/meal'
import { revalidate } from '../_actions/revalidate'
import Link from 'next/link'

export default function Winner({ meal: { node } }: { meal: Meal }) {
  return (
    <div className='bg-base-200 grid h-fit w-full grid-flow-row gap-3 rounded-sm p-5'>
      <span className='text-primary w-80 max-w-xs text-3xl'>{node.name}</span>
      <hr className='border-base-300 mx-5 rounded-full' />
      <Link
        href={`confirm/${node.id}`}
        role='button'
        className='btn btn-success'
      >
        Accept
      </Link>
      <hr className='border-base-300 mx-5 rounded-full' />
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
