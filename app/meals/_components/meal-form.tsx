'use client'

import type { Item } from '@/app/kitchen/_actions/items'
import FormProvider from '@/components/forms/form-provider'
import Input from '@/components/forms/input'
import Select from '@/components/forms/select'
import Submit from '@/components/forms/submit'
import { type Form, useFormState } from '@/hooks/use-form-state'
import { type Meal, type MealForm } from '@/lib/schemas/meal'
import { cn } from '@/lib/util'
import { FormState } from '@/types/form'
import { useEffect, useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMealForm } from '../_hooks/use-meal-form'
import { XMarkIcon } from '@heroicons/react/24/solid'

export type MealFormProps = {
  items: Item[]
  data?: Meal['node']
  submit: string
  action: (
    id: number,
    state: FormState<MealForm>,
    payload: MealForm,
  ) => Promise<FormState<MealForm>>
}

export default function MealForm({
  items,
  data,
  submit,
  action,
}: MealFormProps) {
  const ref = useRef<HTMLButtonElement>(null)

  function handleClose() {
    ref.current?.click()
  }

  return (
    <>
      <form method='dialog' className='hidden'>
        <button ref={ref} type='submit' />
      </form>
      <FormProvider useForm={useMealForm}>
        <Form
          items={items}
          data={data}
          submit={submit}
          action={action}
          handleClose={handleClose}
        />
      </FormProvider>
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
  const [form, formAction] = useFormState(action.bind(null, data?.id), {
    data: data as MealForm,
  })

  useEffect(() => {
    if (!form.formState.isSubmitSuccessful) return

    handleClose()
  }, [form, handleClose])

  const values = form.getValues()

  return (
    <form className='grid grid-flow-row place-items-center gap-3'>
      <Input
        type='text'
        label='Name'
        defaultValue={values.name ?? data?.name}
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
    </form>
  )
}

function Items({ items, form }: { items: Item[]; form: Form<MealForm> }) {
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

      if (!hasEmpty) append({} as any)
    })
    return unsubscribe
  }, [watch])

  return (
    <>
      {fields.map((item, index) => (
        <div key={item.id} className='w-full max-w-xs grid-cols-subgrid'>
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
              <XMarkIcon className='size-6' />
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
