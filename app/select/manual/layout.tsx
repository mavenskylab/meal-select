import Search, { SearchFallback } from '@/components/forms/search'
import { Suspense } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <div className='px-5 pt-5'>
        <Suspense fallback={<SearchFallback />}>
          <Search />
        </Suspense>
      </div>
      {children}
    </main>
  )
}
