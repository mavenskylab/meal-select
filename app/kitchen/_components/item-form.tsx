'use client'

import Input from '@/components/forms/input'
import { cn } from '@/lib/util'
import { useActionState, useEffect, useRef } from 'react'
import Submit from '@/components/forms/submit'
import { FormState } from '@/types/form'
import { deleteItem, type Item, type ItemForm } from '../_actions/items'
import Select from '@/components/forms/select'

export default function ItemForm({
  data,
  submit,
  action,
}: {
  data?: Item['node']
  submit: string
  action: (
    id: any,
    state: FormState<ItemForm>,
    payload: FormData,
  ) => Promise<FormState<ItemForm>>
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const [state, formAction, pending] = useActionState(
    action.bind(null, data?.id),
    { data },
  )

  useEffect(() => {
    if (!state.success) return

    handleClose()
  }, [state])

  function handleClose() {
    ref.current?.click()
  }

  async function handleDelete() {
    if (await deleteItem.bind(null, data?.id)()) handleClose()
  }

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
          defaultValue={state.data?.name}
          placeholder='e.g. Tomato'
          errors={state.errors?.name}
        />
        <Select
          name='store'
          label='Store'
          defaultValue={state.data?.store ?? 'cupboard'}
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
          defaultValue={state.data?.count}
          placeholder='0'
          clearable={!!data}
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
        {!!data && (
          <>
            <div className='w-full max-w-xs p-5'>
              <hr className='w-full rounded-full border-base-300' />
            </div>
            <button
              type='button'
              className='btn btn-error w-full max-w-xs'
              onClick={handleDelete}
            >
              Delete Item
            </button>
          </>
        )}
      </form>
    </>
  )
}
