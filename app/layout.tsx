// import '@/app/dev.css'
import '@/app/globals.css'

import type { Metadata } from 'next'
import Header from './_components/header'
import Providers from './_components/providers'

export const metadata: Metadata = {
  title: 'Meal Selector',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' data-theme='dark' className='font-mono'>
      <body>
        <Providers>
          <div className='grid size-full grid-rows-[auto_1fr] divide-y divide-base-300'>
            <Header />
            <div className='h-full'>{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
