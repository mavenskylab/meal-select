import { cn } from '@/lib/util'
import { HiBars3 } from 'react-icons/hi2'
import { ClassValue } from 'clsx'
import Link from 'next/link'

export default function Header() {
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
              <details>
                <summary className='after:hidden'>
                  <HiBars3 />
                </summary>
                <ul className='right-0 z-50 w-[90dvw] rounded-t-none border-x border-b border-base-300 bg-base-100 p-2 shadow-sm'>
                  <Links />
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

function Links({ className }: { className?: ClassValue }) {
  return (
    <>
      <li className={cn(className)}>
        <Link href='/kitchen'>Kitchen</Link>
      </li>
      <li className={cn(className)}>
        <Link href='/meals'>Meals</Link>
      </li>
      <li className={cn(className)}>
        <Link href='/select'>Selector</Link>
      </li>
    </>
  )
}
