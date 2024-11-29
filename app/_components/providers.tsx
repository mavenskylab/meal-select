'use client'

import { IconContext } from 'react-icons'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <IconContext.Provider value={{ className: 'size-6' }}>
      {children}
    </IconContext.Provider>
  )
}
