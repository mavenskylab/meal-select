import { getItems } from '@/app/kitchen/_actions/items'
import { z } from 'zod'

export const ItemSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  store: z.union([
    z.literal('cupboard'),
    z.literal('fridge'),
    z.literal('freezer'),
  ]),
  count: z.coerce.number().int().nonnegative('Cannot be negative'),
  tags: z.array(
    z.object({ tag_id: z.coerce.number().int(), name: z.string().optional() }),
  ),
})

export type Item = Awaited<ReturnType<typeof getItems>>[number]

export type ItemForm = z.infer<typeof ItemSchema>
