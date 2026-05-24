/*
  TA FLEUR — Homepage
  Architecture : AnnouncementBar + Header (dans layout.tsx)
  puis les sections de la homepage, puis Footer (dans layout.tsx)

  Ordre des sections (validé direction artistique) :
  1. HeroSection       → immersion, premier contact émotionnel
  2. USPBand           → réassurance immédiate (livraison, fraîcheur, paiement, SAV)
  3. CategoriesSection → navigation par désir
  4. BestSellers       → preuve sociale + découverte produit
  5. EmotionSection    → renforcement émotionnel de la marque
  6. Reviews           → social proof qualifié
  7. UGCGallery        → communauté + FOMO
  8. FAQ               → réduction des dernières objections
*/

import HeroSection       from '@/components/homepage/HeroSection'
import USPBand           from '@/components/homepage/USPBand'
import CategoriesSection from '@/components/homepage/CategoriesSection'
import BestSellers       from '@/components/homepage/BestSellers'
import EmotionSection    from '@/components/homepage/EmotionSection'
import Reviews           from '@/components/homepage/Reviews'
import UGCGallery        from '@/components/homepage/UGCGallery'
import FAQ               from '@/components/homepage/FAQ'
import JsonLd, { buildOrganizationSchema } from '@/components/ui/JsonLd'
import SectionDivider    from '@/components/ui/SectionDivider'

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <HeroSection />
      <USPBand />
      <SectionDivider className="container-ta" />
      <CategoriesSection />
      <SectionDivider className="container-ta" variant="rose" />
      <BestSellers />
      <SectionDivider className="container-ta" />
      <EmotionSection />
      <SectionDivider className="container-ta" variant="rose" />
      <Reviews />
      <SectionDivider className="container-ta" />
      <UGCGallery />
      <SectionDivider className="container-ta" variant="beige" />
      <FAQ />
    </>
  )
}
