'use client'

import { HiXMark } from 'react-icons/hi2'
import { MouseEvent } from 'react'

export default function DeleteButton({ action }: { action: () => void }) {
  function handleClear(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation()
    action()
  }

  return (
    <button
      type='button'
      className='btn btn-circle btn-error btn-xs'
      onClick={handleClear}
    >
      <span className='sr-only'>Close</span>
      <HiXMark className='size-3' />
    </button>
  )
}
