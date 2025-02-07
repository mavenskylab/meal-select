export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='divide-base-200 grid size-full grid-cols-1 divide-x'>
      {children}
    </div>
  )
}
