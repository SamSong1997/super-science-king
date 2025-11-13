import { TopNavigation } from './TopNavigation'
import { MobileNavigation } from './MobileNavigation'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#faf9f5] m-0 p-0">
      <TopNavigation />
      <main className="pb-16 md:pb-0 m-0 p-0">
        {children}
      </main>
      <MobileNavigation />
    </div>
  )
}
