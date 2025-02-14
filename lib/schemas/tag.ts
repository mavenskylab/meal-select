import { getTags } from '@/app/account/tags/_actions/tags'
import { z } from 'zod'

export const TagSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
})

export type Tag = Awaited<ReturnType<typeof getTags>>[number]

export type TagForm = z.infer<typeof TagSchema>
