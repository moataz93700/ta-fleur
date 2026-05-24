'use client'

/*
  PRODUCT GALLERY — TA FLEUR

  Directeur artistique :
  Image principale grande (aspect 3/4) + 4 thumbnails en rangée.
  AnimatePresence sur le switch d'image — fade cross-dissolve.
  Hover sur l'image principale : zoom 1.03 subtil.

  Impact conversion :
  → Galerie multi-images = +30% de confiance produit (Baymard)
  → Zoom hover = inspection mentale du produit → moins de retours
  → Thumbnails = navigation rapide sans friction

  Impact émotionnel :
  Les images de fleurs doivent être vues sous plusieurs angles.
  La rose vue de face + de côté + en détail = désir construit progressivement.
*/

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { EASE_LUXURY } from '@/lib/animations'

interface ProductGalleryProps {
  images: { src: string; alt: string }[]
  name:   string
}

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction,   setDirection]   = useState(1) // 1 = next, -1 = prev
  const pointerStartX = useRef<number | null>(null)

  function goTo(index: number) {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  /* ── Touch / pointer swipe ── */
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    pointerStartX.current = e.clientX
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return
    const delta = e.clientX - pointerStartX.current
    if (delta < -50) goTo((activeIndex + 1) % images.length)
    else if (delta > 50) goTo((activeIndex - 1 + images.length) % images.length)
    pointerStartX.current = null
  }

  const current = images[activeIndex]

  return (
    <div className="flex flex-col gap-4">

      {/* ── Image principale ── */}
      <div
        className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ta-beige-light group cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={{
              enter:  (d: number) => ({ opacity: 0, x: d * 30 }),
              center: { opacity: 1, x: 0 },
              exit:   (d: number) => ({ opacity: 0, x: d * -30 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: EASE_LUXURY }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center transition-transform duration-700 ease-luxury group-hover:scale-[1.03]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Compteur d'image */}
        <div className="absolute bottom-3 right-3 bg-ta-black/40 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="font-display text-[0.5rem] font-medium tracking-widest text-white">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Navigation flèches — toujours visibles sur mobile, au hover sur desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); goTo((activeIndex - 1 + images.length) % images.length) }}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-ta-black/70 hover:text-ta-black transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100"
            >
              ←
            </button>
            <button
              onClick={e => { e.stopPropagation(); goTo((activeIndex + 1) % images.length) }}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-ta-black/70 hover:text-ta-black transition-all duration-200 sm:opacity-0 sm:group-hover:opacity-100"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Voir l'image ${i + 1} de ${name}`}
              className="relative aspect-square rounded-xl overflow-hidden bg-ta-beige-light"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 25vw, 14vw"
                className="object-cover object-center transition-transform duration-300 hover:scale-105"
              />
              {/* Bordure active */}
              <div className={[
                'absolute inset-0 rounded-xl border-2 transition-all duration-200',
                activeIndex === i
                  ? 'border-ta-rose-deep'
                  : 'border-transparent hover:border-ta-rose-pastel',
              ].join(' ')} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
