'use client'

/*
  BEST-SELLERS — TA FLEUR (ANIMÉE)
  Header fadeUp, 4 ProductCards staggerées au scroll.
*/

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import ProductCard, { type Product } from '@/components/ui/ProductCard'
import { fadeUp, scaleUp, staggerContainer, sectionHeader } from '@/lib/animations'

const bestSellers: Product[] = [
  {
    id:            'bs-1',
    name:          'Bouquet Romance — Roses & Pivoines',
    slug:          'bouquet-romance',
    price:         6900,
    originalPrice: 8500,
    image:         'https://images.unsplash.com/photo-1490750967868-88df5691166b?w=600&q=80',
    imageAlt:      'Bouquet de roses et pivoines roses',
    badge:         'Bestseller',
    inStock:       true,
  },
  {
    id:       'bs-2',
    name:     'Coffret Lumière — Roses Éternelles Or',
    slug:     'coffret-lumiere',
    price:    11900,
    image:    'https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=600&q=80',
    imageAlt: 'Coffret de roses éternelles dorées',
    badge:    'Exclusif',
    inStock:  true,
  },
  {
    id:       'bs-3',
    name:     'Bouquet Douceur — Tulipes & Renoncules',
    slug:     'bouquet-douceur',
    price:    5500,
    image:    'https://images.unsplash.com/photo-1567696911980-2c669aff9db1?w=600&q=80',
    imageAlt: 'Bouquet pastel de tulipes et renoncules',
    badge:    'Nouveau',
    inStock:  true,
  },
  {
    id:       'bs-4',
    name:     'Collection Mariage — Bouquet de Mariée',
    slug:     'bouquet-mariee',
    price:    18900,
    image:    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    imageAlt: 'Bouquet de mariée blanc avec pivoines',
    badge:    'Édition limitée',
    inStock:  true,
  },
]

export default function BestSellers() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: gridRef,   inView: gridInView   } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section aria-label="Nos best-sellers" className="section-padding bg-ta-beige-light">
      <div className="container-ta">

        {/* En-tête */}
        <motion.div
          ref={headerRef}
          variants={sectionHeader}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12"
        >
          <div>
            <motion.p variants={fadeUp} className="section-label text-ta-gold mb-3">
              Best-sellers
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl lg:text-4xl font-semibold text-ta-black tracking-tight"
            >
              Les préférés de nos clientes
            </motion.h2>
          </div>
          <motion.div variants={fadeUp}>
            <Link
              href="/collections/best-sellers"
              className="font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-black hover:text-ta-rose-deep transition-colors duration-200 flex items-center gap-2 whitespace-nowrap"
            >
              Voir tout
              <span className="text-ta-rose-pastel">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Grille produits — stagger */}
        <motion.div
          ref={gridRef}
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
        >
          {bestSellers.map((product, i) => (
            <motion.div key={product.id} variants={scaleUp}>
              <ProductCard product={product} priority={i < 2} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA mobile */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="mt-10 text-center sm:hidden"
        >
          <Link href="/collections/best-sellers" className="btn btn-outline">
            Voir toute la collection
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
