'use client'

import Input from '@/components/forms/input'
import { useFormState } from '@/hooks/use-form-state'
import { MealForm, MealSchema, type Meal } from '@/lib/schemas/meal'
import { FormState } from '@/types/form'
import { useEffect } from 'react'

export default function Meal({
  meal,
  action,
}: {
  meal: Meal
  action: (
    state: FormState<MealForm>,
    payload: MealForm,
  ) => Promise<FormState<MealForm>>
}) {
  const [form, formAction] = useFormState(MealSchema, action, {
    data: meal,
  })

  useEffect(() => {
    if (!form.formState.isSubmitSuccessful) return

    // handleClose()
  }, [form.formState.isSubmitSuccessful])

  return (
    <form className='bg-base-200 grid h-fit w-full grid-flow-row gap-3 rounded-sm p-5'>
      <span className='text-primary w-80 max-w-xs text-3xl'>{meal.name}</span>
      {meal.items.map(({ item, count }) => (
        <div key={item?.id} className='grid max-w-xs grid-flow-row gap-3'>
          <Input type='text' label={item!.name} defaultValue={count} />
        </div>
      ))}
      <hr className='border-base-300 mx-5 rounded-full' />
      <button
        className='btn btn-success'
        onClick={() => formAction(form.getValues())}
      >
        Confirm
      </button>
    </form>
  )
}
