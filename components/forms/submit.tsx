import { cn } from '@/lib/util'
import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react'

export type SubmitProps = {
  children: React.ReactNode
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export default function Submit({ type, className, children, ...props }: SubmitProps) {
  return (
    <button
      type={type ?? 'submit'}
      className={cn('btn btn-primary w-full max-w-xs', className)}
      {...props}
    >
      {props.disabled ? (
        <span className='loading loading-spinner loading-md' />
      ) : (
        children
      )}
    </button>
  )
}
