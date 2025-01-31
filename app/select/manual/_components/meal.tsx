import type { Meal } from '@/lib/schemas/meal'
import Link from 'next/link'

export default function Meal({ meal: { node } }: { meal: Meal }) {
  return (
    <Link
      href={`confirm/${node.id}`}
      role='button'
      className='btn h-auto p-0 text-start text-lg text-primary'
    >
      <div className='grid w-full grid-flow-row gap-3 p-3'>
        <span>{node.name}</span>
      </div>
    </Link>
  )
}
