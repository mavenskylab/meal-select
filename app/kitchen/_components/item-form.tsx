'use client'

import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import Submit from '@/components/forms/submit'
import { useFormState } from '@/hooks/use-form-state'
import { ItemSchema, type Item, type ItemForm } from '@/lib/schemas/item'
import { cn } from '@/lib/util'
import { FormState } from '@/types/form'
import { useEffect, useRef } from 'react'
import { deleteItem } from '../_actions/items'

export type ItemFormProps = {
  data?: Item['node'] & ItemForm
  submit: string
  action: (
    state: FormState<ItemForm>,
    payload: ItemForm,
  ) => Promise<FormState<ItemForm>>
}

export default function ItemForm(props: ItemFormProps) {
  const ref = useRef<HTMLButtonElement>(null)

  function handleClose() {
    ref.current?.click()
  }

  return (
    <>
      <form method='dialog' className='hidden'>
        <button ref={ref} type='submit' />
      </form>
      <Form {...props} handleClose={handleClose} />
    </>
  )
}

function Form({
  data,
  submit,
  action,
  handleClose,
}: ItemFormProps & { handleClose: () => void }) {
  const [form, formAction, reset] = useFormState(ItemSchema, action, {
    data: {
      store: 'cupboard',
      ...data,
    },
  })

  useEffect(() => {
    if (!form.formState.isSubmitSuccessful) return

    if (!data) reset()

    handleClose()
  }, [form.formState.isSubmitSuccessful, handleClose])

  async function handleDelete() {
    if (await deleteItem.bind(null, data?.id)()) handleClose()
  }

  return (
    <form className='grid grid-flow-row place-items-center gap-3'>
      <Input
        type='text'
        label='Name'
        placeholder='e.g. Tomato'
        errors={form.formState.errors?.name}
        {...form.register('name')}
      />
      <Select
        label='Store'
        errors={form.formState.errors?.store}
        {...form.register('store')}
      >
        <option value='cupboard'>Cupboard</option>
        <option value='fridge'>Fridge</option>
        <option value='freezer'>Freezer</option>
      </Select>
      <Input
        type='text'
        inputMode='numeric'
        label='Count'
        placeholder='0'
        clearable={!!data}
        errors={form.formState.errors?.count}
        {...form.register('count')}
      />
      <Submit
        type='button'
        disabled={form.formState.isPending}
        onClick={() => formAction(form.getValues())}
      >
        {submit}
      </Submit>
      {form.formState.message && (
        <div
          role='alert'
          className={cn('alert alert-error max-w-xs', {
            'alert-success': form.formState.isSubmitSuccessful,
          })}
        >
          <span>{form.formState.message}</span>
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
  )
}
