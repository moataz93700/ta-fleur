'use client'

/*
  UGC GALLERY — TA FLEUR (ANIMÉE)
  Stagger en cascade sur les 6 photos — effet "mur qui se remplit".
*/

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, scaleUp, staggerContainer, sectionHeader } from '@/lib/animations'

interface UGCPost {
  id:          string
  image:       string
  alt:         string
  handle:      string
  likes:       string
  objectPos?:  string
}

const ugcPosts: UGCPost[] = [
  {
    id:        'u1',
    image:     '/community/comm1.png',
    alt:       'Bouquet de roses reçu par une cliente',
    handle:    '@camille.paris',
    likes:     '847',
    objectPos: 'center center',
  },
  {
    id:     'u2',
    image:  '/community/comm2.png',
    alt:    'Arrangement floral sur une table élégante',
    handle: '@sophiam_lyon',
    likes:  '1.2k',
  },
  {
    id:     'u3',
    image:  '/community/comm3.png',
    alt:    'Roses éternelles dans un intérieur haussmannien',
    handle: '@iloveluxe',
    likes:  '2.1k',
  },
  {
    id:     'u4',
    image:  '/community/comm4.png',
    alt:    'Tulipes pastel dans un vase blanc',
    handle: '@marie.bordeaux',
    likes:  '634',
  },
  {
    id:        'u5',
    image:     '/community/comm5.png',
    alt:       'Mains recevant un bouquet romantique',
    handle:    '@elise.lbk',
    likes:     '3.4k',
    objectPos: 'center top',
  },
  {
    id:     'u6',
    image:  '/community/comm6.png',
    alt:    'Décoration florale de mariage',
    handle: '@wedding.stories',
    likes:  '5.7k',
  },
]

export default function UGCGallery() {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const { ref: gridRef,   inView: gridInView   } = useInView({ triggerOnce: true, threshold: 0.05 })
  const { ref: ctaRef,    inView: ctaInView    } = useInView({ triggerOnce: true, threshold: 0.5 })

  return (
    <section aria-label="Notre communauté #TaFleur" className="section-padding bg-white">
      <div className="container-ta">

        {/* En-tête */}
        <motion.div
          ref={headerRef}
          variants={sectionHeader}
          initial="hidden"
          animate={headerInView ? 'visible' : 'hidden'}
          className="text-center mb-10 lg:mb-12"
        >
          <motion.p variants={fadeUp} className="section-label text-ta-gold mb-3">#TaFleur</motion.p>
          <motion.h2 variants={fadeUp} className="font-serif text-3xl lg:text-4xl font-semibold text-ta-black tracking-tight mb-4">
            Votre communauté
          </motion.h2>
          <motion.p variants={fadeUp} className="font-sans text-sm font-light text-ta-gray-400 max-w-md mx-auto">
            Partagez vos bouquets avec{' '}
            <strong className="font-medium text-ta-black">#TaFleur</strong>{' '}
            et rejoignez notre galerie de belles émotions.
          </motion.p>
        </motion.div>

        {/* Grille UGC */}
        <motion.div
          ref={gridRef}
          variants={staggerContainer(0.07)}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3"
        >
          {ugcPosts.map(post => (
            <motion.div
              key={post.id}
              variants={scaleUp}
              className="group relative aspect-square overflow-hidden rounded-xl bg-ta-beige-light cursor-pointer"
            >
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 ease-luxury group-hover:scale-105"
                style={{ objectPosition: post.objectPos ?? 'center center' }}
              />
              <div className="absolute inset-0 bg-ta-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2">
                <span className="text-2xl">♥</span>
                <p className="font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-white">
                  {post.handle}
                </p>
                <p className="font-display text-[0.55rem] font-light tracking-wide text-white/60">
                  {post.likes} j&apos;aime
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          ref={ctaRef}
          variants={fadeUp}
          initial="hidden"
          animate={ctaInView ? 'visible' : 'hidden'}
          className="mt-8 lg:mt-10 text-center"
        >
          <a
            href="https://instagram.com/tafleur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 h-12 px-8 rounded-full border border-ta-black/15 hover:border-ta-rose-deep text-ta-black hover:text-ta-rose-deep font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase transition-all duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
            Nous suivre sur Instagram
          </a>
        </motion.div>

      </div>
    </section>
  )
}
