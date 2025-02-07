'use client'

import Select from '@/components/forms/select'
import Switch from '@/components/forms/switch'
import { cn } from '@/lib/util'
import { ClassValue } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MouseEvent, MouseEventHandler, useState } from 'react'
import { HiBars3 } from 'react-icons/hi2'
import { SelectedTheme } from '../_actions/theme'
import { useFont } from './contexts/font-context'
import { useTheme } from './contexts/theme-context'

export default function Header() {
  const [open, setOpen] = useState(false)

  function handleToggle(event: MouseEvent) {
    event.preventDefault()
    setOpen((prev) => !prev)
  }

  function handleClose() {
    setOpen(false)
  }

  return (
    <header>
      <nav className='navbar relative z-50'>
        <div className='flex-1'>
          <Link
            href='/'
            className='btn btn-ghost text-primary text-xl'
            onClick={handleClose}
          >
            Meal Selector
          </Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal gap-3 px-1'>
            <Links className='hidden md:flex' onClick={handleClose} />
            <li className='hidden md:flex'>
              <details open={open}>
                <summary className='after:hidden' onClick={handleToggle}>
                  <HiBars3 />
                </summary>
                <ul className='menu border-base-300 bg-base-100 right-0 w-dvw max-w-xs gap-3 rounded-t-none border-x border-b p-2 shadow-xs'>
                  <Options />
                </ul>
              </details>
            </li>
            <li className='md:hidden'>
              <details open={open}>
                <summary className='after:hidden' onClick={handleToggle}>
                  <HiBars3 />
                </summary>
                <ul className='menu border-base-300 bg-base-100 right-0 w-[90dvw] gap-3 rounded-t-none border-x border-b p-2 shadow-xs'>
                  <Links onClick={handleClose} />
                  <Options />
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className={cn('fixed top-0 z-40 h-dvh w-dvw', {
          hidden: !open,
        })}
        onClick={handleClose}
      />
    </header>
  )
}

function Links({
  className,
  onClick,
}: {
  className?: ClassValue
  onClick: MouseEventHandler<HTMLAnchorElement>
}) {
  const pathname = usePathname()

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
          onClick={onClick}
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
          onClick={onClick}
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
          onClick={onClick}
        >
          Selector
        </Link>
      </li>
    </>
  )
}

function Options() {
  const { font, setFont } = useFont()
  const { selected, setTheme } = useTheme()

  return (
    <>
      <li className='*:flex *:items-start'>
        <Select
          className='max-w-full border-none shadow-none'
          label='Theme'
          defaultValue={selected}
          onChange={(event) => setTheme(event.target.value as SelectedTheme)}
        >
          <option value='system'>System</option>
          <option value='light'>Light</option>
          <option value='dark'>Dark</option>
          <option value='black'>Black</option>
        </Select>
      </li>
      <li className='font-dyslexic *:flex'>
        <Switch
          className='max-w-full'
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
