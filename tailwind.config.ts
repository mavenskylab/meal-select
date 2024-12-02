import daisyui from 'daisyui'
import { black, dark, light } from 'daisyui/src/theming/themes'
import type { Config } from 'tailwindcss'
import { blue, gray, teal, violet } from 'tailwindcss/colors'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        dyslexic: ['OpenDyslexic'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  safelist: [
    {
      pattern: /^opacity-\d{0,3}$/,
    },
    {
      pattern: /^bg-base-\d{0,3}\/\d{0,3}$/,
    },
  ],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          ...light,
          primary: violet[700],
          secondary: blue[500],
          accent: teal[500],
        },
      },
      {
        dark: {
          ...dark,
          primary: violet[700],
          secondary: blue[500],
          accent: teal[500],
          'base-100': gray[950],
          'base-200': gray[900],
          'base-300': gray[800],
        },
      },
      {
        black: {
          ...black,
          primary: violet[700],
          secondary: blue[500],
        },
      },
    ],
  },
} as const satisfies Config
