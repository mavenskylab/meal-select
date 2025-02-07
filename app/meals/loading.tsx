import { HiPlus } from 'react-icons/hi2'

export default function Loading() {
  return (
    <>
      <div className='grid grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
        {Array(50)
          .fill(0)
          .map((_, index) => (
            <div key={index} className='btn h-[3.25rem] animate-pulse' />
          ))}
      </div>
      <div
        role='button'
        className='btn btn-circle btn-primary no-animation btn-lg fixed right-5 bottom-5'
      >
        <span className='sr-only'>Add Meal</span>
        <HiPlus className='size-10' />
      </div>
      <div className='btn btn-circle no-animation btn-lg fixed right-5 bottom-5 bg-black/25' />
    </>
  )
}
