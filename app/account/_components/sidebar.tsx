'use client'

import { cn } from '@/lib/util'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MdDoorSliding } from 'react-icons/md'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className='flex flex-col gap-5 py-5 md:w-60'>
      <section>
        <Link
          href='/account/tags'
          className={cn(
            'hover:text-primary focus:text-primary active:text-primary flex w-full gap-3 p-3',
            {
              'text-primary': pathname.includes('/tags'),
            },
          )}
        >
          <MdDoorSliding />
          <span className='hidden md:block'>Manage Tags</span>
        </Link>
      </section>
    </aside>
  )
}
