// import '@/app/dev.css'
import '@/app/globals.css'
import '@fontsource/opendyslexic'

import type { Metadata } from 'next'
import Header from './_components/header'
import Providers from './_components/providers'
import { getFont } from './_actions/font'

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

  return (
    <html lang='en' data-theme='dark' className={font}>
      <body>
        <Providers font={font}>
          <div className='grid size-full grid-rows-[auto_1fr] divide-y divide-base-300'>
            <Header />
            <div className='h-full'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
