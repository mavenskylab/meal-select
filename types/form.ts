import { DeepRequired } from 'react-hook-form'

export type FormState<T> = {
  success?: boolean
  data?: Partial<T>
  errors?: ErrorObject<DeepRequired<T>>
  message?: string
}

type ErrorObject<T> = T extends unknown[]
  ? Record<`${number}` | number, ErrorObject<T[number]>>
  : T extends object
    ? { _errors: string[] } & { [K in keyof T]?: ErrorObject<T[K]> }
    : { _errors: string[] }
