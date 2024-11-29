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
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <div className='relative w-full max-w-xs'>
        <input
          ref={ref}
          className={cn('input input-bordered w-full', className, {
            'input-error': !!errors,
          })}
          {...props}
        />
        {clearable && (
          <div className='absolute right-2 top-0 grid h-full place-items-center'>
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
      {errors && (
        <div className='label *:text-error'>
          {errors?._errors.map((error, index) => (
            <span key={index} className='label-text'>
              {error}
            </span>
          ))}
        </div>
      )}
    </label>
  )
}
