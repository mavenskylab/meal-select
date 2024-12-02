'use client'

import { Font, setFont } from '@/app/_actions/font'
import React from 'react'

export const FontContext = React.createContext({
  font: 'font-mono' as Font,
  setFont,
})

export function useFont() {
  return React.useContext(FontContext)
}
