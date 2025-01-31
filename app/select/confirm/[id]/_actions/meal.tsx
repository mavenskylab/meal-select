'use server'

import { getMeal as _getMeal } from '@/app/meals/_actions/meals'
import { unstable_cache } from 'next/cache'

export async function getMeal(id: any) {
  return unstable_cache(_getMeal, [`meal-${id}`], {
    revalidate: 3600,
    tags: [`meal-${id}`],
  })(id)
}
