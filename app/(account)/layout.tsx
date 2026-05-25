/*
  ACCOUNT LAYOUT — TA FLEUR
  Header + footer + sidebar compte.
*/

import type { ReactNode } from 'react'
import AnnouncementBar from '@/components/layout/AnnouncementBar'
import Header          from '@/components/layout/Header'
import Footer          from '@/components/layout/Footer'
import CartDrawer      from '@/components/cart/CartDrawer'
import AccountSidebar  from '@/components/account/AccountSidebar'

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <div className="bg-ta-ivory min-h-screen">
          <div className="container-ta py-10 lg:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8 lg:gap-12 items-start">
              <AccountSidebar />
              <div>{children}</div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}
