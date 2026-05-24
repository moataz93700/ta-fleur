/*
  SHOP LAYOUT — TA FLEUR
  Toutes les pages boutique : header + footer + announcement + cart drawer.
*/

import type { ReactNode } from 'react'
import AnnouncementBar    from '@/components/layout/AnnouncementBar'
import Header             from '@/components/layout/Header'
import Footer             from '@/components/layout/Footer'
import CartDrawer         from '@/components/cart/CartDrawer'
import NewsletterPopup    from '@/components/ui/NewsletterPopup'

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CartDrawer />
      <NewsletterPopup />
    </>
  )
}
