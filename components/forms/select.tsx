import { cn } from '@/lib/util'
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react'

export type SelectProps = {
  label: string
  errors?: { _errors: string[] }
  children: React.ReactNode
} & DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>

export default function Select({
  className,
  label,
  errors,
  children,
  ...props
}: SelectProps) {
  return (
    <fieldset className={cn('fieldset w-full max-w-xs p-0', className)}>
      <label
        className={cn('select w-full', {
          'select-error': !!errors,
        })}
      >
        <span className='label min-w-auto!'>{label}</span>
        <select {...props}>{children}</select>
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
