import type { Meal } from '@/lib/schemas/meal'
import Link from 'next/link'

export default function Meal({ meal }: { meal: Meal }) {
  return (
    <Link
      href={`confirm/${meal.id}`}
      role='button'
      className='btn text-primary h-auto p-0 text-start text-lg'
    >
      <div className='grid w-full grid-flow-row gap-3 p-3'>
        <span>{meal.name}</span>
      </div>
    </Link>
  )
}
