'use client'

/*
  CATÉGORIES — TA FLEUR (ANIMÉE)

  Grande carte slide depuis la gauche.
  3 petites cartes stagger depuis la droite.
  Titre en fadeUp avant tout.
*/

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, slideLeft, scaleUp, staggerContainer, sectionHeader } from '@/lib/animations'

interface Category {
  id:          string
  name:        string
  description: string
  href:        string
  image:       string
  imageAlt:    string
}

const categories: Category[] = [
  {
    id:          'bouquets',
    name:        'Bouquets frais',
    description: 'Préparés chaque matin',
    href:        '/collections/bouquets',
    image:       '/collections/collec1.png',
    imageAlt:    'Bouquet de roses fraîches TA FLEUR',
  },
  {
    id:          'roses-eternelles',
    name:        'Roses éternelles',
    description: 'Beauty forever preserved',
    href:        '/collections/roses-eternelles',
    image:       '/collections/collec2.png',
    imageAlt:    'Roses éternelles TA FLEUR',
  },
  {
    id:          'coffrets',
    name:        'Coffrets cadeaux',
    description: 'L\'art d\'offrir',
    href:        '/collections/coffrets',
    image:       '/collections/collec3.png',
    imageAlt:    'Coffret cadeau TA FLEUR',
  },
  {
    id:          'evenements',
    name:        'Événements & Mariages',
    description: 'Sur mesure pour vos grands jours',
    href:        '/collections/evenements',
    image:       '/collections/collec4.png',
    imageAlt:    'Décoration florale pour mariage TA FLEUR',
  },
]

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CARTE CATÉGORIE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function CategoryCard({ category, large = false }: { category: Category; large?: boolean }) {
  return (
    <Link
      href={category.href}
      className="group relative overflow-hidden rounded-2xl bg-ta-beige-light block h-full"
    >
      <div className={large ? 'aspect-[3/4] sm:aspect-auto sm:h-full' : 'aspect-[4/3] h-full'}>
        <Image
          src={category.image}
          alt={category.imageAlt}
          fill
          sizes={large ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
          className="object-cover transition-transform duration-700 ease-luxury group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ta-black/70 via-ta-black/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 lg:p-6">
        <p className="font-display text-[0.55rem] font-medium tracking-[0.2em] uppercase text-white/60 mb-1">
          {category.description}
        </p>
        <h3 className={[
          'font-serif font-semibold text-white tracking-tight leading-tight',
          large ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl',
        ].join(' ')}>
          {category.name}
        </h3>
        <div className="mt-3 flex items-center gap-2">
          <span className="font-display text-[0.6rem] font-medium tracking-[0.15em] uppercase text-ta-gold">
            Découvrir
          </span>
          <span className="h-px flex-1 max-w-[40px] bg-ta-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-luxury" />
        </div>
      </div>
    </Link>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CategoriesSection() {
  const { ref: titleRef, inView: titleInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: gridRef,  inView: gridInView  } = useInView({ triggerOnce: true, threshold: 0.1 })

  const [featured, ...rest] = categories

  return (
    <section aria-label="Nos univers floraux" className="section-padding bg-white">
      <div className="container-ta">

        {/* En-tête */}
        <motion.div
          ref={titleRef}
          variants={sectionHeader}
          initial="hidden"
          animate={titleInView ? 'visible' : 'hidden'}
          className="text-center mb-10 lg:mb-12"
        >
          <motion.p variants={fadeUp} className="section-label text-ta-gold mb-3">
            Collections
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-serif text-3xl lg:text-4xl font-semibold text-ta-black tracking-tight"
          >
            Nos univers floraux
          </motion.h2>
        </motion.div>

        {/* Grille asymétrique */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 lg:h-[540px]"
        >
          {/* Grande carte gauche */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            className="sm:col-span-2 lg:h-full"
          >
            <CategoryCard category={featured} large />
          </motion.div>

          {/* 3 petites cartes — stagger */}
          <motion.div
            variants={staggerContainer(0.1, 0.15)}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-5 lg:h-full"
          >
            <motion.div variants={scaleUp} className="sm:col-span-2 lg:col-span-1">
              <CategoryCard category={rest[0]} />
            </motion.div>
            <motion.div variants={scaleUp} className="lg:hidden">
              <CategoryCard category={rest[1]} />
            </motion.div>
            <motion.div variants={scaleUp} className="lg:hidden">
              <CategoryCard category={rest[2]} />
            </motion.div>
            <motion.div
              variants={staggerContainer(0.08)}
              className="hidden lg:grid lg:grid-cols-2 lg:gap-5"
            >
              <motion.div variants={scaleUp}><CategoryCard category={rest[1]} /></motion.div>
              <motion.div variants={scaleUp}><CategoryCard category={rest[2]} /></motion.div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
