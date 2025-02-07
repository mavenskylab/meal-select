import { cn } from '@/lib/util'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type SwitchProps = {
  label: string
  errors?: { _errors: string[] }
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Switch({
  className,
  label,
  errors,
  ...props
}: SwitchProps) {
  return (
    <fieldset className={cn('fieldset w-full max-w-xs p-0', className)}>
      <label
        className={cn('input input-border w-full', {
          'input-error': !!errors,
        })}
      >
        <span className='label min-w-auto!'>{label}</span>
        <input
          type='checkbox'
          className='toggle! toggle-primary! ms-auto'
          {...props}
        />
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
