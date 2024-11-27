'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
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
      <XMarkIcon className='size-3' />
    </button>
  )
}
