'use client'

import { MealForm, MealSchema } from '@/lib/schemas/meal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export function useMealForm() {
  return useForm<MealForm>({ resolver: zodResolver(MealSchema) })
}
