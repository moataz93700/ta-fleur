/*
  COLLECTION HERO — TA FLEUR

  Directeur artistique :
  Image de fond avec overlay. Breadcrumb discret en haut.
  Titre Playfair centré + tagline + compteur produits.
  Hauteur 55vh — pas plein écran (on est déjà dans une catégorie,
  l'utilisateur veut voir les produits, pas une immersion totale).

  Impact branding :
  Chaque catégorie a sa propre ambiance visuelle grâce à son image unique.
  Le passage d'une catégorie à l'autre = changement d'univers → marque riche.
*/

import Image from 'next/image'
import Link from 'next/link'
import type { CollectionMeta } from '@/lib/data/collections'

interface CollectionHeroProps {
  collection:   CollectionMeta
  productCount: number
}

export default function CollectionHero({ collection, productCount }: CollectionHeroProps) {
  return (
    <section
      aria-label={`Collection ${collection.name}`}
      className="relative h-[45vh] min-h-[320px] max-h-[480px] flex flex-col justify-end overflow-hidden bg-ta-black"
    >
      {/* Image */}
      <Image
        src={collection.image}
        alt={collection.imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-50"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ta-black/85 via-ta-black/30 to-ta-black/10" />

      {/* Breadcrumb */}
      <nav
        aria-label="Fil d'Ariane"
        className="absolute top-6 left-0 right-0 z-10"
      >
        <div className="container-ta">
          <ol className="flex items-center gap-2">
            <li>
              <Link
                href="/"
                className="font-display text-[0.55rem] font-light tracking-[0.15em] uppercase text-white/50 hover:text-white/80 transition-colors"
              >
                Accueil
              </Link>
            </li>
            <li className="text-white/30 text-[0.55rem]">/</li>
            <li>
              <span className="font-display text-[0.55rem] font-medium tracking-[0.15em] uppercase text-white/70">
                {collection.name}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Contenu */}
      <div className="relative z-10 container-ta pb-10 lg:pb-12">
        <p className="section-label text-ta-gold mb-3">
          {collection.tagline}
        </p>
        <h1 className="font-serif text-4xl lg:text-6xl font-bold text-white tracking-tight mb-3">
          {collection.name}
        </h1>
        <p className="font-sans text-sm font-light text-white/60 max-w-lg leading-relaxed mb-4">
          {collection.description}
        </p>
        <p className="font-display text-[0.6rem] font-medium tracking-[0.15em] uppercase text-white/40">
          {productCount} produit{productCount > 1 ? 's' : ''}
        </p>
      </div>
    </section>
  )
}
