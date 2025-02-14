'use client'

import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import Submit from '@/components/forms/submit'
import { type Form, useFormState } from '@/hooks/use-form-state'
import { ItemSchema, type Item, type ItemForm } from '@/lib/schemas/item'
import { cn } from '@/lib/util'
import { FormState } from '@/types/form'
import { ChangeEvent, useEffect, useRef } from 'react'
import { deleteItem } from '../_actions/items'
import { Tag } from '@/lib/schemas/tag'
import { useFieldArray } from 'react-hook-form'
import { HiXMark } from 'react-icons/hi2'

export type ItemFormProps = {
  tags: Tag[]
  data?: Item & ItemForm
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
  tags,
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
    if (data && (await deleteItem.bind(null, data.id)())) handleClose()
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
      <Tags tags={tags} form={form} />
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
            Delete Item
          </button>
        </>
      )}
    </form>
  )
}

function Tags({ tags, form }: { tags: Tag[]; form: Form<typeof ItemSchema> }) {
  const { fields, append, remove } = useFieldArray({
    name: 'tags',
    control: form.control,
  })

  function handleAddTag(e: ChangeEvent<HTMLSelectElement>) {
    const tag = tags.find(({ id }) => id === Number(e.target.value))

    console.log(tag)

    if (tag) append({ tag_id: tag.id, name: tag.name })

    e.target.value = ''
  }

  const fieldIds = fields.map(({ tag_id }) => tag_id)
  const filteredTags = tags.filter(({ id }) => !fieldIds.includes(id))

  return (
    <div className='grid w-full max-w-xs grid-cols-1 gap-2'>
      <Select
        label='Add Tag'
        disabled={!filteredTags.length}
        onChange={handleAddTag}
      >
        <option value=''>Add Tag</option>
        {filteredTags.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </Select>
      <div className='flex w-full gap-1'>
        {fields.map((tag, index) => (
          <div key={tag.id} className='badge badge-soft badge-accent'>
            <span>{tag.name}</span>
            <button
              type='button'
              className='btn btn-circle btn-ghost btn-sm'
              onClick={remove.bind(null, index)}
            >
              <HiXMark />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
