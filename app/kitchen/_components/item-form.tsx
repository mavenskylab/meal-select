'use client'

import Input from '@/components/forms/input'
import { cn } from '@/lib/util'
import { useActionState, useEffect, useRef } from 'react'
import Submit from '@/components/forms/submit'
import { FormState } from '@/types/form'
import type { Item, ItemForm } from '../_actions/items'
import Select from '@/components/forms/select'

export default function ItemForm({
  data = {},
  submit,
  action,
}: {
  data?: Partial<Item['node']>
  submit: string
  action: (
    id: any,
    state: FormState<Item['node']>,
    payload: FormData,
  ) => Promise<FormState<Item['node']>>
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [state, formAction, pending] = useActionState(
    action.bind(null, data.id),
    {
      data,
    },
  )

  useEffect(() => {
    if (!state.success) return

    ref.current?.click()
  }, [state])

  return (
    <>
      <form method='dialog' className='hidden'>
        <button ref={ref} type='submit' />
      </form>
      <form
        className='grid grid-flow-row place-items-center gap-3'
        action={formAction}
      >
        <Input
          type='text'
          name='name'
          label='Name'
          defaultValue={state.data.name}
          placeholder='e.g. Tomato'
          errors={state.errors?.name}
        />
        <Select
          name='store'
          label='Store'
          defaultValue={state.data.store as any ?? 'cupboard'}
          errors={state.errors?.store}
        >
          <option value='cupboard'>Cupboard</option>
          <option value='fridge'>Fridge</option>
          <option value='freezer'>Freezer</option>
        </Select>
        <Input
          type='text'
          inputMode='numeric'
          name='count'
          label='Count'
          defaultValue={state.data.count as any}
          placeholder='0'
          errors={state.errors?.count}
        />
        <Submit disabled={pending}>{submit}</Submit>
        {state.message && (
          <div
            role='alert'
            className={cn('alert alert-error max-w-xs', {
              'alert-success': state.success,
            })}
          >
            <span>{state.message}</span>
          </div>
        )}
      </form>
    </>
  )
}
