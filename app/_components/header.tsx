'use client'

import { cn } from '@/lib/util'
import { HiBars3 } from 'react-icons/hi2'
import { ClassValue } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RefObject, useRef } from 'react'

export default function Header() {
  const mobileNavRef = useRef<HTMLDetailsElement>(null)

  return (
    <header>
      <nav className='navbar'>
        <div className='flex-1'>
          <Link href='/' className='btn btn-ghost text-xl text-primary'>
            Meal Selector
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal gap-3 px-1'>
            <Links className='hidden md:flex' />
            <li className='md:hidden'>
              <details ref={mobileNavRef}>
                <summary className='after:hidden'>
                  <HiBars3 />
                </summary>
                <ul className='right-0 z-50 w-[90dvw] rounded-t-none border-x border-b border-base-300 bg-base-100 p-2 shadow-sm'>
                  <Links navRef={mobileNavRef} />
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

function Links({
  className,
  navRef,
}: {
  className?: ClassValue
  navRef?: RefObject<HTMLDetailsElement>
}) {
  const pathname = usePathname()

  function handleClick() {
    if (navRef?.current) {
      navRef.current.open = false
    }
  }

  return (
    <>
      <li>
        <Link
          href='/kitchen'
          className={cn(
            'hover:text-primary focus:text-primary active:text-primary',
            className,
            {
              'text-primary': pathname.includes('/kitchen'),
            },
          )}
          onClick={handleClick}
        >
          Kitchen
        </Link>
      </li>
      <li>
        <Link
          href='/meals'
          className={cn(
            'hover:text-primary focus:text-primary active:text-primary',
            className,
            {
              'text-primary': pathname.includes('/meals'),
            },
          )}
          onClick={handleClick}
        >
          Meals
        </Link>
      </li>
      <li>
        <Link
          href='/select'
          className={cn(
            'hover:text-primary focus:text-primary active:text-primary',
            className,
            {
              'text-primary': pathname.includes('/select'),
            },
          )}
          onClick={handleClick}
        >
          Selector
        </Link>
      </li>
    </>
  )
}
