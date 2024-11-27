'use client'

import type { Meal } from '@/lib/schemas/meal'
import { useReducer } from 'react'
import { knockoutInitializer, knockoutReducer } from './knockout-reducer'
import Winner from '../../_components/meal'

export default function Knockout({ meals }: { meals: Meal[] }) {
  const [
    {
      winner,
      match,
    },
    dispatch,
  ] = useReducer(knockoutReducer, meals, knockoutInitializer)

  return (
    <main className='grid grid-cols-1 justify-items-center gap-3 p-5'>
      {winner ? (
        <div>
          <Winner meal={winner} />
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr]'>
          <KnockoutTile
            meal={match[0]}
            onClick={() => {
              dispatch({ type: 'next', payload: { winner: 0 } })
            }}
          />
          <span>VS</span>
          <KnockoutTile
            meal={match[1]}
            onClick={() => {
              dispatch({ type: 'next', payload: { winner: 1 } })
            }}
          />
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
    <button className='btn size-40' onClick={onClick}>
      {node.name}
    </button>
  )
}
