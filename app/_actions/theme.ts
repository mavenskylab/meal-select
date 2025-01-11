'use server'

import { cookies } from 'next/headers'

export type BaseTheme = 'light' | 'dark'
export type Theme = BaseTheme | 'black'
export type SelectedTheme = Theme | 'system'

export type ThemeState = {
  value: Theme
  selected: SelectedTheme
}

const initialThemeState: ThemeState = {
  value: 'dark',
  selected: 'system',
}

export async function getTheme(): Promise<ThemeState> {
  const cookieStore = await cookies()

  const value = cookieStore.get('theme')?.value

  if (!value) return initialThemeState

  return JSON.parse(value)
}

export async function setServerTheme(value: Theme, selected: SelectedTheme) {
  const cookieStore = await cookies()

  cookieStore.set('theme', JSON.stringify({ value, selected }))
}
