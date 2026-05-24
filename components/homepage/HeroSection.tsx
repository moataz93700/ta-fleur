'use client'

/*
  HERO SECTION — TA FLEUR (ANIMÉE)

  Animation : stagger sur label → H1 ligne 1 → H1 ligne 2 → tagline → CTAs → trust signals.
  Délai total ~0.8s → tension dramatique avant que tout soit visible.
  Le scroll indicator a un bounce infini pour guider l'œil vers le bas.
*/

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer, EASE_LUXURY } from '@/lib/animations'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCROLL INDICATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="font-display text-[0.5rem] font-light tracking-[0.3em] uppercase text-white/40">
        Découvrir
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
      />
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroSection() {
  return (
    <section
      aria-label="Bienvenue chez TA FLEUR"
      className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ta-black"
    >

      {/* ── Image de fond avec zoom subtil au load ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: EASE_LUXURY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1487530811015-780d31bf58a5?w=1600&q=85"
          alt="Bouquet de roses fraîches dans un intérieur élégant"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55"
        />
      </motion.div>

      {/* ── Overlay gradient ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-ta-black/80 via-ta-black/30 to-ta-black/20" />

      {/* ── Contenu centré — stagger ── */}
      <motion.div
        variants={staggerContainer(0.12, 0.3)}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >

        {/* Label collection */}
        <motion.p variants={fadeUp} className="section-label text-ta-gold mb-6">
          Collection Printemps 2025
        </motion.p>

        {/* Titre — 2 lignes animées séparément */}
        <h1 className="font-serif text-[clamp(3rem,8vw,6.5rem)] font-bold text-white leading-[1.05] tracking-tight mb-6">
          <motion.span variants={fadeUp} className="block">
            Des fleurs qui
          </motion.span>
          <motion.em
            variants={fadeUp}
            className="block font-serif italic text-ta-rose-pastel not-italic"
          >
            parlent pour vous
          </motion.em>
        </h1>

        {/* Tagline */}
        <motion.p
          variants={fadeUp}
          className="font-sans text-base lg:text-lg font-light text-white/65 mb-10 max-w-lg mx-auto leading-relaxed"
        >
          Bouquets préparés le matin même.
          Livrés en 24h en France métropolitaine.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/collections/bouquets"
            className="w-full sm:w-auto h-14 px-10 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose flex items-center justify-center"
          >
            Découvrir nos bouquets
          </Link>
          <Link
            href="/collections/coffrets"
            className="w-full sm:w-auto h-14 px-10 rounded-full border border-white/40 hover:border-white/80 text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 flex items-center justify-center"
          >
            Coffrets cadeaux
          </Link>
        </motion.div>

        {/* Trust micro-signal */}
        <motion.div
          variants={fadeIn}
          className="mt-10 flex items-center justify-center gap-6"
        >
          {[
            { icon: '✦', text: 'Livraison offerte dès 59€' },
            { icon: '✦', text: '+2 400 avis 5 étoiles' },
            { icon: '✦', text: 'Fraîcheur garantie' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <span className="text-ta-gold text-[0.5rem]">{icon}</span>
              <span className="font-display text-[0.55rem] font-light tracking-[0.15em] uppercase text-white/45 hidden sm:inline">
                {text}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}
