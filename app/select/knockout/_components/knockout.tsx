'use client'

import type { Meal } from '@/lib/schemas/meal'
import { useEffect, useReducer } from 'react'
import { knockoutInitializer, knockoutReducer } from './knockout-reducer'
import Winner from '../../_components/winner'
import { cn } from '@/lib/util'

export default function Knockout({ meals }: { meals: Meal[] }) {
  const [{ winner, match, progress, isLast }, dispatch] = useReducer(
    knockoutReducer,
    meals,
    knockoutInitializer,
  )

  useEffect(() => dispatch({ type: 'reset', payload: { meals } }), [meals])

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
              isLast={isLast}
              onClick={() => {
                dispatch({ type: 'next', payload: { winner: 0 } })
              }}
            />
            <KnockoutTile
              meal={match[1]}
              isLast={isLast}
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
  isLast,
  onClick,
}: {
  meal: Meal
  isLast: boolean
  onClick: () => void
}) {
  return (
    <button
      className='grid size-full place-items-center overflow-hidden rounded *:col-start-1 *:row-start-1'
      onClick={onClick}
    >
      {isLast && (
        <div className='aspect-square h-[250%] animate-spin bg-conic/decreasing from-violet-700 via-lime-300 to-violet-700' />
      )}
      <div className={cn('z-10 size-full', { 'p-3': isLast })}>
        <div className='btn size-full text-5xl'>{node.name}</div>
      </div>
    </button>
  )
}
