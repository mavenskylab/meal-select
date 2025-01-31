'use client'

import Input from '@/components/forms/input'
import { useFormState } from '@/hooks/use-form-state'
import { MealForm, MealSchema, type Meal } from '@/lib/schemas/meal'
import { FormState } from '@/types/form'
import { useEffect } from 'react'

export default function Meal({
  meal: { node },
  action,
}: {
  meal: Meal
  action: (
    state: FormState<MealForm>,
    payload: MealForm,
  ) => Promise<FormState<MealForm>>
}) {
  const [form, formAction] = useFormState(MealSchema, action, {
    data: {
      name: node.name,
      mealItemCollection: {
        edges: node.mealItemCollection?.edges ?? [],
      },
    } as MealForm,
  })

  useEffect(() => {
    if (!form.formState.isSubmitSuccessful) return

    // handleClose()
  }, [form.formState.isSubmitSuccessful])

  return (
    <form className='grid h-fit w-full grid-flow-row gap-3 rounded bg-base-200 p-5'>
      <span className='w-80 max-w-xs text-3xl text-primary'>{node.name}</span>
      {node.mealItemCollection?.edges.map(({ node: { item, count } }) => (
        <div key={item?.id} className='grid max-w-xs grid-flow-row gap-3'>
          <Input type='text' label={item!.name} defaultValue={count} />
        </div>
      ))}
      <hr className='mx-5 rounded-full border-base-300' />
      <button
        className='btn btn-success'
        onClick={() => formAction(form.getValues())}
      >
        Confirm
      </button>
    </form>
  )
}
