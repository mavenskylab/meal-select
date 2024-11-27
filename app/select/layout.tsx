export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='grid size-full grid-cols-1 divide-x divide-base-200'>
      {children}
    </div>
  )
}
