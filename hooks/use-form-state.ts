'use client'

import { FormState } from '@/types/form'
import { isEqual } from '@react-hookz/deep-equal'
import { useEffect, useRef, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type UseFormStateReturn<
  S extends z.Schema,
  T extends z.infer<S>,
  P extends unknown[],
> = ReturnType<typeof useFormState<S, T, P>>
export type Form<S extends z.Schema> = UseFormStateReturn<
  S,
  z.infer<S>,
  unknown[]
>[0]

export function useFormState<
  S extends z.Schema,
  T extends z.infer<S>,
  P extends unknown[],
>(
  schema: S,
  action: (state: FormState<T>, ...payload: P) => Promise<FormState<T>>,
  initialState: FormState<T>,
) {
  const [state, formAction, reset, isPending] = useActionState(
    action,
    initialState,
  )
  const form = useForm<T>({
    mode: 'onTouched',
    criteriaMode: 'all',
    defaultValues: { ...initialState.data, ...state.data } as T,
    //@ts-expect-error Type instantiation is excessively deep and possibly infinite.
    errors: state.errors,
    resolver: async (data) => {
      const { error } = await schema.safeParseAsync(data)
      return (error ? { errors: error?.format() } : {}) as any
    },
  })

  useEffect(() => {
    form.reset(undefined, { keepErrors: true })
    form.reset(state.data as T, { keepErrors: true })
  }, [state])

  const values = form.watch()

  const { success: isValid } = schema.safeParse(values)

  return [
    {
      ...form,
      formState: {
        ...form.formState,
        errors: form.formState.errors as FormState<T>['errors'],
        isValid,
        isPending,
        isSubmitSuccessful: state.success,
        message: state.message,
      },
    },
    formAction,
    reset,
  ] as const
}

function useActionState<T, P extends unknown[]>(
  action: (state: T, ...payload: P) => Promise<T>,
  initialState: T,
) {
  const initialStateRef = useRef(initialState)
  const [state, setState] = useState(() => initialStateRef.current)
  const [pending, startTransition] = useTransition()

  useEffect(() => {
    if (!isEqual(initialStateRef.current, initialState)) {
      initialStateRef.current = initialState
      reset()
    }
  }, [initialState])

  async function formAction(...payload: P) {
    startTransition(async () => {
      const newState = await action(state, ...payload)
      startTransition(() => {
        setState(() => newState)
      })
    })
  }

  function reset() {
    setState(initialStateRef.current)
  }

  return [state, formAction, reset, pending] as const
}
