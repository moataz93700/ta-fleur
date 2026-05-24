'use client'

/*
  EMOTION SECTION — TA FLEUR (ANIMÉE)

  Split reveal : image depuis la gauche, texte depuis la droite.
  Décalage de 0.1s → impression que les deux colonnes "s'ouvrent" ensemble.
  Badge flottant avec son propre délai.
*/

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { fadeUp, slideLeft, slideRight, staggerContainer, sectionHeader } from '@/lib/animations'

export default function EmotionSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} aria-label="Notre philosophie" className="section-padding bg-white overflow-hidden">
      <div className="container-ta">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Image éditoriale ── */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            <div className="absolute -inset-4 border border-ta-gold/20 rounded-3xl hidden lg:block" />

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-ta-rose-warm">
              <Image
                src="/brand/image-deco.png"
                alt="Packaging premium TA FLEUR — sacs et bouquet de roses sur fond rose"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* Badge flottant */}
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute -bottom-4 -right-4 lg:-right-6 bg-white rounded-2xl shadow-card p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-ta-beige-light flex items-center justify-center text-base">
                🌸
              </div>
              <div>
                <p className="font-display text-[0.55rem] font-bold tracking-[0.15em] uppercase text-ta-gold">
                  Garantie fraîcheur
                </p>
                <p className="font-sans text-[0.65rem] font-light text-ta-gray-400">
                  Préparées le matin même
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Texte — stagger ── */}
          <motion.div
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div variants={slideRight}>
              <motion.p variants={fadeUp} className="section-label text-ta-gold mb-6">
                Notre philosophie
              </motion.p>
            </motion.div>

            <motion.h2
              variants={slideRight}
              className="font-serif text-3xl lg:text-[2.75rem] font-semibold text-ta-black tracking-tight leading-[1.1] mb-6"
            >
              Offrir des fleurs,{' '}
              <em className="italic text-ta-rose-deep">
                c&apos;est offrir une émotion.
              </em>
            </motion.h2>

            <motion.div variants={slideRight} className="space-y-4 mb-8">
              <p className="font-sans text-sm lg:text-base font-light text-ta-gray-500 leading-relaxed">
                Chaque bouquet TA FLEUR est pensé comme une déclaration. Pas un achat
                impulsif — une intention. Celle de dire <em>&ldquo;je pense à toi&rdquo;</em>,{' '}
                <em>&ldquo;tu comptes pour moi&rdquo;</em>, <em>&ldquo;je t&apos;aime&rdquo;</em>{' '}
                avec ce que la nature a de plus beau.
              </p>
              <p className="font-sans text-sm lg:text-base font-light text-ta-gray-500 leading-relaxed">
                Nos fleuristes sélectionnent chaque tige à l&apos;aube. Chaque arrangement
                est une composition artisanale, jamais industrielle. Parce que l&apos;émotion
                mérite le soin du détail.
              </p>
            </motion.div>

            {/* Stats trust */}
            <motion.div
              variants={slideRight}
              className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-ta-beige-medium"
            >
              {[
                { value: '12k+', label: 'Bouquets livrés' },
                { value: '4.9★', label: 'Note moyenne' },
                { value: '98%',  label: 'Clientes satisfaites' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center">
                  <p className="font-serif text-2xl font-bold text-ta-black mb-0.5">{value}</p>
                  <p className="font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase text-ta-gray-400">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <Link href="/collections/bouquets" className="btn btn-rose">
                Offrir maintenant
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
