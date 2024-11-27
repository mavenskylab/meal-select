import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <nav className='navbar'>
        <div className='flex-1'>
          <Link href="/" className='btn btn-ghost text-xl'>Meal Selector</Link>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal px-1 gap-3'>
            <li>
              <Link href="/kitchen">Kitchen</Link>
            </li>
            <li>
              <Link href="/meals">Meals</Link>
            </li>
            <li>
              <Link href="/select">Selector</Link>
            </li>
            {/* <li>
              <details>
                <summary>Parent</summary>
                <ul className='rounded-t-none bg-base-100 p-2'>
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a>Link 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  )
}
