import { getMeals } from '@/app/meals/_actions/meals'
import { z } from 'zod'

export const MealSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  mealItemCollection: z
    .object({
      edges: z.array(
        z.object({
          node: z.object({
            item: z.object({
              id: z.coerce.number().int(),
            }),
            count: z.coerce.number().int().nonnegative('Cannot be negative'),
          }),
        }),
      ),
    })
    .optional(),
})

export type Meal = Awaited<ReturnType<typeof getMeals>>[number]

export type MealForm = z.infer<typeof MealSchema>
