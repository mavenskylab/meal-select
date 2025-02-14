'use client'

import Input from '@/components/forms/input'
import Submit from '@/components/forms/submit'
import { useFormState } from '@/hooks/use-form-state'
import { TagSchema, type Tag, type TagForm } from '@/lib/schemas/tag'
import { cn } from '@/lib/util'
import { FormState } from '@/types/form'
import { useEffect, useRef } from 'react'
import { deleteTag } from '../_actions/tags'

export type TagFormProps = {
  data?: Tag & TagForm
  submit: string
  action: (
    state: FormState<TagForm>,
    payload: TagForm,
  ) => Promise<FormState<TagForm>>
}

export default function TagForm(props: TagFormProps) {
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
}: TagFormProps & { handleClose: () => void }) {
  const [form, formAction, reset] = useFormState(TagSchema, action, {
    data,
  })

  useEffect(() => {
    if (!form.formState.isSubmitSuccessful) return

    if (!data) reset()

    handleClose()
  }, [form.formState.isSubmitSuccessful, handleClose])

  async function handleDelete() {
    if (data && (await deleteTag.bind(null, data.id)())) handleClose()
  }

  return (
    <form className='grid grid-flow-row place-items-center gap-3'>
      <Input
        type='text'
        label='Name'
        placeholder='e.g. Meat'
        errors={form.formState.errors?.name}
        {...form.register('name')}
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
            <hr className='border-base-300 w-full rounded-full' />
          </div>
          <button
            type='button'
            className='btn btn-error w-full max-w-xs'
            onClick={handleDelete}
          >
            Delete Tag
          </button>
        </>
      )}
    </form>
  )
}
