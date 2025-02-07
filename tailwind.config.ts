import type { Config } from 'tailwindcss'

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
  // TODO: Fix for tailwindcss v4
  // safelist: [
  //   {
  //     pattern: /^opacity-\d{0,3}$/,
  //   },
  //   {
  //     pattern: /^bg-base-\d{0,3}\/\d{0,3}$/,
  //   },
  // ],
} as const satisfies Config
