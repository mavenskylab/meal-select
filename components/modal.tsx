'use client'

import { cn } from '@/lib/util'
import { ClassValue } from 'clsx'
import { useRef } from 'react'

export default function Modal({
  className,
  button,
  children,
}: Readonly<{
  className?: ClassValue
  button?: React.ReactNode
  children: React.ReactNode
}>) {
  const ref = useRef<HTMLDialogElement>(null)

  return (
    <div
      role='button'
      className={cn('btn', className)}
      onClick={() => ref.current?.showModal()}
    >
      {button}
      <dialog ref={ref} className='modal'>
        {children}
      </dialog>
    </div>
  )
}
