import Link from 'next/link'
import { GiPerspectiveDiceSixFacesRandom } from 'react-icons/gi'
import { HiTrophy } from 'react-icons/hi2'

export default function Page() {
  return (
    <main className='grid justify-items-center p-5'>
      <div className='flex h-fit flex-wrap gap-5'>
        <div className='grid grow place-items-center'>
          <Link
            href='/select/knockout'
            className='btn grid size-40 grid-flow-row gap-3 p-5'
          >
            <HiTrophy className='size-24' />
            <span>Knockout</span>
          </Link>
        </div>
        <div className='grid grow place-items-center'>
          <Link
            href='/select/random'
            className='btn grid size-40 grid-flow-row gap-3 p-5'
          >
            <GiPerspectiveDiceSixFacesRandom className='size-24' />
            <span>Random</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
