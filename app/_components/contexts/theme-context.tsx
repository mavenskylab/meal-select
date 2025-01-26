'use client'

import {
  SelectedTheme,
  setServerTheme,
  ThemeState,
  type Theme,
} from '@/app/_actions/theme'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

const ThemeContext = createContext<
  ThemeState & { setTheme: (selected: SelectedTheme) => void }
>({
  value: 'dark',
  selected: 'system',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export type ThemeProviderProps = {
  value: ThemeState
  children?: React.ReactNode
}

export function ThemeProvider(props: ThemeProviderProps) {
  const context = useContext(ThemeContext)

  if (!context) return <>{props.children}</>

  return <Theme {...props} />
}

function Theme({ value: props, children }: ThemeProviderProps) {
  const [selected, setTheme] = useState<SelectedTheme>(
    props.selected ?? 'system',
  )

  const handleMediaQuery = useCallback(
    ({ matches }: MediaQueryList | MediaQueryListEvent) => {
      setServerTheme(
        selected === 'system' ? (matches ? 'dark' : 'light') : selected,
        selected,
      )
    },
    [selected],
  )

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')

    handleMediaQuery(media)
    media.addEventListener('change', handleMediaQuery)

    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery])

  return (
    <ThemeContext.Provider value={{ ...props, selected, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
