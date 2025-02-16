export default function Loading() {
  return Array(50)
    .fill(0)
    .map((_, index) => (
      <div key={index} className='btn h-[3.25rem] animate-pulse' />
    ))
}
