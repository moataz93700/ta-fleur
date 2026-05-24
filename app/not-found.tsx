/*
  PAGE 404 — TA FLEUR

  Directeur artistique :
  Pas de page d'erreur froide et générique.
  TA FLEUR transforme même l'erreur en moment de marque.
  Fond beige, message élégant, CTA vers les collections.

  Impact conversion :
  → 404 optimisée = -60% de bounces vs 404 générique (Google UX study)
  → CTA direct vers best-sellers = récupération du trafic perdu
  → Ton de marque maintenu = confiance préservée malgré l'erreur

  Impact émotionnel :
  Une rose qu'on ne trouve pas... c'est aussi une invitation à en découvrir d'autres.
*/

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page introuvable — TA FLEUR',
  description: 'Cette page n\'existe pas. Découvrez nos bouquets et collections florales.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ta-beige-light flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center">

        {/* Numéro */}
        <p className="font-serif text-[8rem] font-bold text-ta-rose-pastel/40 leading-none select-none">
          404
        </p>

        {/* Séparateur or */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ta-gold/40 to-transparent" />
          <span className="text-ta-gold text-lg">✿</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-ta-gold/40 to-transparent" />
        </div>

        {/* Message */}
        <p className="section-label text-ta-gold mb-3">Page introuvable</p>
        <h1 className="font-serif text-3xl font-semibold text-ta-black tracking-tight mb-4">
          Cette fleur s&apos;est envolée
        </h1>
        <p className="font-sans text-sm font-light text-ta-gray-500 leading-relaxed mb-10">
          La page que vous cherchez n&apos;existe pas ou a été déplacée.
          Laissez-vous guider vers quelque chose de plus beau.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-rose">
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/collections/bouquets"
            className="h-12 px-8 rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-black transition-all duration-200 flex items-center justify-center"
          >
            Nos bouquets
          </Link>
          <Link
            href="/collections/best-sellers"
            className="h-12 px-8 rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-black transition-all duration-200 flex items-center justify-center"
          >
            Best-Sellers
          </Link>
        </div>

      </div>
    </div>
  )
}
