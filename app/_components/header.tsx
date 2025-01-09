'use client'

import Switch from '@/components/forms/switch'
import { cn } from '@/lib/util'
import { ClassValue } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { RefObject, useEffect, useRef } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { useFont } from './contexts/font-context'

export default function Header() {
  const desktopOptionsRef = useRef<HTMLDetailsElement>(null)
  const mobileNavRef = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    function handleBlur(event: MouseEvent) {
      if (
        desktopOptionsRef.current &&
        !desktopOptionsRef.current.contains(event.target as Node)
      ) {
        desktopOptionsRef.current.open = false
      }
    }

    document.addEventListener('mousedown', handleBlur)

    return () => {
      document.removeEventListener('mousedown', handleBlur)
    }
  }, [])

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
            <li className='hidden md:flex'>
              <details ref={desktopOptionsRef}>
                <summary className='after:hidden'>
                  <HiBars3 />
                </summary>
                <ul className='right-0 z-50 w-screen max-w-xs rounded-t-none border-x border-b border-base-300 bg-base-100 p-2 shadow-sm'>
                  <Options />
                </ul>
              </details>
            </li>
            <li className='md:hidden'>
              <details ref={mobileNavRef}>
                <summary className='after:hidden'>
                  <HiBars3 />
                </summary>
                <ul className='right-0 z-50 w-[90dvw] rounded-t-none border-x border-b border-base-300 bg-base-100 p-2 shadow-sm'>
                  <Links navRef={mobileNavRef} />
                  <Options />
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
  navRef?: RefObject<HTMLDetailsElement | null>
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

function Options() {
  const { font, setFont } = useFont()

  return (
    <>
      <li className='font-dyslexic *:flex'>
        <Switch
          label='Dyslexic Font'
          checked={font === 'font-dyslexic'}
          onChange={(event) =>
            setFont(
              (event.target as HTMLInputElement).checked
                ? 'font-dyslexic'
                : 'font-mono',
            )
          }
        />
      </li>
    </>
  )
}
