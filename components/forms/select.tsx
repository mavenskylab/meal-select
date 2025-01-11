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
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <select
        className={cn('select select-bordered w-full', className, {
          'input-error': !!errors,
        })}
        {...props}
      >
        {children}
      </select>
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
