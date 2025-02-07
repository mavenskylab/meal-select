'use client'

import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import Submit from '@/components/forms/submit'
import { type Form, useFormState } from '@/hooks/use-form-state'
import { Item } from '@/lib/schemas/item'
import { type Meal, type MealForm, MealSchema } from '@/lib/schemas/meal'
import { cn } from '@/lib/util'
import { FormState } from '@/types/form'
import { useEffect, useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { HiXMark } from 'react-icons/hi2'
import { deleteMeal } from '../_actions/meals'

export type MealFormProps = {
  items: Item[]
  data?: Meal['node'] & MealForm
  submit: string
  action: (
    state: FormState<MealForm>,
    payload: MealForm,
  ) => Promise<FormState<MealForm>>
}

export default function MealForm(props: MealFormProps) {
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
  items,
  data,
  submit,
  action,
  handleClose,
}: MealFormProps & { handleClose: () => void }) {
  const [form, formAction, reset] = useFormState(MealSchema, action, {
    data: {
      mealItemCollection: {
        edges: [],
      },
      ...data,
    },
  })

  useEffect(() => {
    if (!form.formState.isSubmitSuccessful) return

    if (!data) reset()

    handleClose()
  }, [form.formState.isSubmitSuccessful, handleClose])

  async function handleDelete() {
    if (await deleteMeal.bind(null, data?.id)()) handleClose()
  }

  return (
    <form className='grid grid-flow-row place-items-center gap-3'>
      <Input
        type='text'
        label='Name'
        placeholder='e.g. Pasta'
        errors={form.formState.errors?.name}
        {...form.register('name')}
      />
      <Items items={items} form={form} />
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
            Delete Meal
          </button>
        </>
      )}
    </form>
  )
}

function Items({
  items,
  form,
}: {
  items: Item[]
  form: Form<typeof MealSchema>
}) {
  const { watch } = form
  const { fields, append, remove } = useFieldArray({
    name: 'mealItemCollection.edges',
    control: form.control,
  })

  useEffect(() => {
    if (!fields.length) append({} as any)
  }, [append])

  useEffect(() => {
    const { unsubscribe } = watch((value, { name }) => {
      if (!name?.includes('mealItemCollection.edges')) return

      const hasEmpty = !!value.mealItemCollection?.edges?.some(
        (value) => !value?.node?.item?.id,
      )

      if (!hasEmpty) append({ node: { count: '' } } as any)
    })
    return unsubscribe
  }, [watch])

  return (
    <>
      {fields.map((item, index) => (
        <div
          key={item.id}
          className='grid w-full max-w-xs gap-3'
        >
          <div className='w-full max-w-xs px-5'>
            <hr className='border-base-300 w-full rounded-full' />
          </div>
          <div className='grid w-full grid-cols-[1fr_auto] place-items-center gap-3'>
            <Select
              label='Item'
              errors={
                form.formState.errors?.mealItemCollection?.edges?.[index]?.node
                  ?.item?.id
              }
              {...form.register(
                `mealItemCollection.edges.${index}.node.item.id`,
              )}
            >
              <option value=''>-</option>
              {items.map(({ node }) => (
                <option key={node.id} value={node.id}>
                  {node.name}
                </option>
              ))}
            </Select>
            <button
              type='button'
              className='btn btn-error place-self-end'
              disabled={fields.length - 1 === index}
              onClick={() => remove(index)}
            >
              <HiXMark />
            </button>
          </div>
          <Input
            type='text'
            inputMode='numeric'
            label='Count'
            placeholder='0'
            errors={
              form.formState.errors?.mealItemCollection?.edges?.[index]?.node
                ?.count
            }
            {...form.register(`mealItemCollection.edges.${index}.node.count`)}
          />
        </div>
      ))}
    </>
  )
}
