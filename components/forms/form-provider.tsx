import { ReactNode } from 'react'
import { FormProvider as Provider, UseFormReturn } from 'react-hook-form'

export type NestedFormProps = {
  useForm: () => UseFormReturn<any, any, any>
  children: ReactNode
}

export default function FormProvider({ useForm, children }: NestedFormProps) {
  const methods = useForm()

  return <Provider {...methods}>{children}</Provider>
}
