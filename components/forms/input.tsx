import { cn } from '@/lib/util'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

export type InputProps = {
  label: string
  errors?: { _errors: string[] }
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export default function Input({ className, label, errors, ...props }: InputProps) {
  return (
    <label className='form-control w-full max-w-xs'>
      <div className='label'>
        <span className='label-text'>{label}</span>
      </div>
      <input
        className={cn('input input-bordered w-full max-w-xs', className, {
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
  )
}
