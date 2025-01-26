'use server'

import { cookies } from 'next/headers'

export type Font = 'font-mono' | 'font-dyslexic'

export async function getFont() {
  const cookieStore = await cookies()

  return (cookieStore.get('font')?.value ?? 'font-mono') as Font
}

export async function setFont(font: Font) {
  const cookieStore = await cookies()

  cookieStore.set('font', font)
}
