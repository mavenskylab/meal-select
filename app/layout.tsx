// import '@/app/dev.css'
import '@/app/globals.css'
import '@fontsource/opendyslexic'

import type { Metadata } from 'next'
import { getFont } from './_actions/font'
import { getTheme } from './_actions/theme'
import Header from './_components/header'
import Providers from './_components/providers'

export const metadata: Metadata = {
  title: 'Meal Selector',
  description: '',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const font = await getFont()
  const theme = await getTheme()

  return (
    <html lang='en' data-theme={theme.value} className={font}>
      <body>
        <Providers font={font} theme={theme}>
          <div className='grid size-full grid-rows-[auto_1fr] divide-y divide-base-300'>
            <Header />
            <div className='h-full'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
