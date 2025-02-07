'use client'

import { cn } from '@/lib/util'
import { DetailedHTMLProps, InputHTMLAttributes, useRef } from 'react'
import { HiXMark } from 'react-icons/hi2'

export type InputProps = {
  label: string
  errors?: { _errors: string[] }
  clearable?: boolean
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Input({
  className,
  label,
  errors,
  clearable,
  ...props
}: InputProps) {
  const ref = useRef<HTMLInputElement>(null)

  function handleClear() {
    if (ref.current) {
      ref.current.focus()
      ref.current.value = ''
    }
  }

  return (
    <fieldset className={cn('fieldset w-full max-w-xs p-0', className)}>
      <label
        className={cn('input input-bordered w-full max-w-xs', {
          'input-error': !!errors,
        })}
      >
        <span className='label min-w-auto!'>{label}</span>
        <div className='relative size-full'>
          <input ref={ref} {...props} />
          {clearable && (
            <div className='absolute top-0 right-0 grid h-full place-items-center'>
              <button
                type='button'
                className='btn btn-circle btn-ghost btn-sm'
                onClick={handleClear}
              >
                <HiXMark />
              </button>
            </div>
          )}
        </div>
      </label>
      {errors &&
        errors?._errors.map((error, index) => (
          <span key={index} className='fieldset-label text-error'>
            {error}
          </span>
        ))}
    </fieldset>
  )
}
