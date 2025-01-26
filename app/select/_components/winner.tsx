'use client'

import Input from '@/components/forms/input'
import type { Meal } from '@/lib/schemas/meal'
import { revalidate } from '../_actions/revalidate'

export default function Winner({ meal: { node } }: { meal: Meal }) {
  return (
    <div className='grid h-fit w-full grid-flow-row gap-3 rounded bg-base-200 p-5'>
      <span className='w-80 max-w-xs text-3xl text-primary'>{node.name}</span>
      {node.mealItemCollection?.edges.map(({ node: { item, count } }) => (
        <div key={item?.id} className='grid max-w-xs grid-flow-row gap-3'>
          <Input type='text' label='Item' value={item?.name} readOnly />
          <Input type='text' label='Count' value={count} readOnly />
          <hr className='mx-5 rounded-full border-base-300' />
        </div>
      ))}
      <button className='btn btn-success'>Confirm</button>
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
