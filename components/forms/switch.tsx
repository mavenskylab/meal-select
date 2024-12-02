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
    <div className='form-control w-full max-w-xs'>
      <label className='label w-full cursor-pointer'>
        <span className='label-text'>{label}</span>
        <input
          type='checkbox'
          className={cn('toggle toggle-primary', className, {
            'input-error': !!errors,
          })}
          {...props}
        />
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
    </div>
  )
}
