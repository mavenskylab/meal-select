'use client'

import type { Meal } from '@/lib/schemas/meal'
import { useReducer } from 'react'
import { knockoutInitializer, knockoutReducer } from './knockout-reducer'
import Winner from '../../_components/meal'

export default function Knockout({ meals }: { meals: Meal[] }) {
  const [{ winner, match, progress }, dispatch] = useReducer(
    knockoutReducer,
    meals,
    knockoutInitializer,
  )

  return (
    <main className='grid w-full grid-cols-1 justify-items-center gap-3 p-5'>
      {winner ? (
        <div>
          <Winner meal={winner} />
        </div>
      ) : (
        <div className='grid w-full grid-rows-[auto_1fr] gap-3'>
          <div className='w-full'>
            <progress
              className='progress progress-primary w-full'
              value={progress}
              max={1}
            />
          </div>
          <div className='grid w-full grid-cols-1 gap-3 sm:grid-cols-2'>
            <KnockoutTile
              meal={match[0]}
              onClick={() => {
                dispatch({ type: 'next', payload: { winner: 0 } })
              }}
            />
            <KnockoutTile
              meal={match[1]}
              onClick={() => {
                dispatch({ type: 'next', payload: { winner: 1 } })
              }}
            />
          </div>
        </div>
      )}
    </main>
  )
}

function KnockoutTile({
  meal: { node },
  onClick,
}: {
  meal: Meal
  onClick: () => void
}) {
  return (
    <button className='btn size-full text-5xl' onClick={onClick}>
      {node.name}
    </button>
  )
}
