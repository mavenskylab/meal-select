import Sidebar from './_components/sidebar'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='divide-base-200 grid size-full grid-cols-[auto_1fr] divide-x'>
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
