'use client'

import { FormState } from '@/types/form'
import { useEffect, useState, useTransition } from 'react'
import { useFormContext } from 'react-hook-form'

export type UseFormStateReturn<
  T extends object,
  P extends unknown[],
> = ReturnType<typeof useFormState<T, P>>
export type Form<T extends object> = UseFormStateReturn<T, unknown[]>[0]

export function useFormState<T extends object, P extends unknown[]>(
  action: (state: FormState<T>, ...payload: P) => Promise<FormState<T>>,
  initialState: FormState<T>,
) {
  const form = useFormContext<T>()
  const [state, formAction, isPending] = useActionState(action, initialState)

  useEffect(() => {
    console.dir({ test: 1, ...state }, { depth: null })
    form.reset()
    form.reset(state.data as T)
  }, [state])

  return [
    {
      ...form,
      formState: {
        ...form.formState,
        errors: state.errors,
        isPending,
        isSubmitSuccessful: state.success,
        message: state.message,
      },
    },
    formAction,
  ] as const
}

function useActionState<T, P extends unknown[]>(
  action: (state: T, ...payload: P) => Promise<T>,
  initialState: T,
) {
  const [state, setState] = useState(initialState)
  const [pending, startTransaction] = useTransition()

  async function formAction(...payload: P) {
    startTransaction(async () => {
      const newState = await action(state, ...payload)
      setState(() => newState)
    })
  }

  return [state, formAction, pending] as const
}
