import { Meal } from '@/lib/schemas/meal'

export type KnockoutState = {
  _: {
    meals: Meal[]
    rounds: number
    round: number
    matches: number
    match: number
    base: number
    count: number
  }
  toAdvance: Meal[]
  match: [Meal, Meal]
  progress: number
  winner?: Meal
}

export type KnockoutAction = {
  type: 'next'
  payload: {
    winner: number
  }
}

export function knockoutReducer(state: KnockoutState, action: KnockoutAction) {
  switch (action.type) {
    case 'next':
      return nextKnockout(state, action)
    default:
      return state
  }
}

export function knockoutInitializer(_meals: Meal[]): KnockoutState {
  const rounds = Math.ceil(Math.log2(_meals.length))

  const base = 2 ** (rounds - 1)

  const remainder = _meals.length - base

  const toAdvance = _meals.slice(0, base - remainder)

  const meals = _meals.slice(base - remainder)

  const matches = base + Math.floor(meals.length / 2) - 1

  return {
    _: {
      meals,
      rounds,
      round: 0,
      matches,
      match: 0,
      base,
      count: 0,
    },
    toAdvance,
    match: [meals.at(0)!, meals.at(1)!] as [Meal, Meal],
    progress: 0,
  }
}

function nextKnockout(
  state: KnockoutState,
  { payload: { winner } }: KnockoutAction,
) {
  const toAdvance = [...state.toAdvance, state.match.at(winner)!]

  const match = toAdvance.length !== state._.base ? state._.match + 1 : 0
  const round = match === 0 ? state._.round + 1 : state._.round

  const meals = match === 0 ? toAdvance : state._.meals

  const count = state._.count + 1

  return {
    ...state,
    _: {
      ...state._,
      meals,
      round,
      match,
      ...(match === 0 && { base: state._.base / 2 }),
      count,
    },
    ...(match === 0 ? { toAdvance: [] } : { toAdvance }),
    match: [meals.at(match * 2)!, meals.at(match * 2 + 1)!] as [Meal, Meal],
    progress: count / state._.matches,
    ...(meals.length === 1 && { winner: meals.at(0)! }),
  }
}
