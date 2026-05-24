'use client'

/*
  HERO SECTION — TA FLEUR (PREMIUM REWRITE)

  Direction artistique :
  → Image officielle TA FLEUR : box de roses branded, ambiance rose poudré
  → Profondeur cinématographique : double overlay + vignette radiale
  → Ken-burns lent (1.06 → 1.0 sur 2.4s) : tension dramatique à l'arrivée
  → Texte staggeré avec timing Jacquemus : label → H1 ligne 1 → H1 ligne 2 → CTA
  → Glow rose poudré derrière le titre : warmth émotionnel
  → Floating particles : poussière de lumière dorée
  → CTA double : conversion + découverte

  Impact conversion :
  → "Je veux offrir ce bouquet" dès les 3 premières secondes
  → Social proof sous les CTAs : frein à l'hésitation
  → Scroll indicator : invite au voyage vers le bas
*/

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import Logo from '@/components/ui/Logo'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   VARIANTS FRAMER MOTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const EASE_CINEMA = [0.16, 1, 0.3, 1] as const

const fadeSlideUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: (delay: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.9, ease: EASE_CINEMA, delay },
  }),
}

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    transition: { duration: 1.1, ease: 'easeOut', delay },
  }),
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PARTICULE DORÉE FLOTTANTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function GoldParticle({ x, delay, size }: { x: string; delay: number; size: number }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none"
      style={{ left: x, width: size, height: size }}
      animate={{ y: [0, -180, -360], opacity: [0, 0.6, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: 'easeOut' }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{ background: 'radial-gradient(circle, #D4A537 0%, transparent 70%)' }}
      />
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SCROLL INDICATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ScrollIndicator() {
  return (
    <motion.div
      custom={1.6}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span
        className="font-display text-[0.48rem] font-light tracking-[0.35em] uppercase"
        style={{ color: 'rgba(255,255,255,0.38)' }}
      >
        Découvrir
      </span>
      <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        className="w-px h-10"
        style={{ background: 'linear-gradient(to bottom, rgba(212,165,55,0.55), transparent)' }}
      />
    </motion.div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT PRINCIPAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function HeroSection() {
  const prefersReduced = useReducedMotion()

  return (
    <section
      aria-label="Bienvenue chez TA FLEUR"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: '#111' }}
    >

      {/* ── Image officielle TA FLEUR avec ken-burns ── */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: prefersReduced ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: EASE_CINEMA }}
      >
        <Image
          src="/brand/hero-bg.png"
          alt="Bouquet de roses premium dans une box TA FLEUR sur fond rose poudré"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: '65% center' }}
        />
      </motion.div>

      {/* ── Overlay cinématographique — double couche ── */}
      {/* Couche 1 : profondeur générale */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(15,10,8,0.82) 0%, rgba(15,10,8,0.55) 55%, rgba(15,10,8,0.18) 100%)',
        }}
      />
      {/* Couche 2 : vignette radiale bords → profondeur photo */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 140% 100% at 30% 50%, transparent 40%, rgba(0,0,0,0.50) 100%)',
        }}
      />
      {/* Couche 3 : gradient bas → ancre le sol */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(10,7,5,0.75) 0%, transparent 45%)',
        }}
      />

      {/* ── Glow rose poudré derrière le titre ── */}
      <div
        className="absolute left-[5%] lg:left-[8%] top-1/2 -translate-y-1/2 w-[420px] h-[320px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(233,178,188,0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* ── Particules dorées flottantes ── */}
      {!prefersReduced && (
        <>
          <GoldParticle x="12%"  delay={0}   size={3} />
          <GoldParticle x="18%"  delay={2.2} size={2} />
          <GoldParticle x="8%"   delay={4.1} size={4} />
          <GoldParticle x="22%"  delay={1.3} size={2} />
          <GoldParticle x="6%"   delay={3.5} size={3} />
        </>
      )}

      {/* ── Contenu principal ── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="max-w-xl lg:max-w-2xl">

          {/* Logo TA FLEUR — version blanche pour fond sombre */}
          <motion.div
            custom={0.1}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <Logo
              variant="white"
              size="xl"
              layout="stacked"
              showTagline
            />
          </motion.div>

          {/* Label collection */}
          <motion.p
            custom={0.25}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="mb-5 flex items-center gap-3"
          >
            <span
              className="block w-6 h-px"
              style={{ background: '#D4A537' }}
            />
            <span
              className="font-display text-[0.6rem] font-medium tracking-[0.28em] uppercase"
              style={{ color: '#D4A537' }}
            >
              Collection Printemps 2025
            </span>
          </motion.p>

          {/* Titre principal */}
          <h1 className="font-serif leading-[1.04] tracking-tight mb-7">

            <motion.span
              custom={0.42}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="block text-white"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)' }}
            >
              Offrez une
            </motion.span>

            <motion.span
              custom={0.58}
              variants={fadeSlideUp}
              initial="hidden"
              animate="visible"
              className="block italic"
              style={{
                fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                color: '#E9B2BC',
                textShadow: '0 0 60px rgba(233,178,188,0.35)',
              }}
            >
              émotion.
            </motion.span>

          </h1>

          {/* Tagline */}
          <motion.p
            custom={0.72}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="font-sans font-light leading-relaxed mb-10"
            style={{
              fontSize: 'clamp(0.9rem, 2vw, 1.05rem)',
              color: 'rgba(255,255,255,0.62)',
              maxWidth: '38ch',
            }}
          >
            Des bouquets préparés à l&apos;aube, livrés en 24h.
            Chaque fleur choisie avec soin pour raconter ce que les mots ne disent pas.
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={0.88}
            variants={fadeSlideUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            {/* CTA principal */}
            <Link
              href="/collections/bouquets"
              className="group relative inline-flex items-center justify-center h-14 px-10 rounded-full overflow-hidden font-display text-[0.62rem] font-semibold tracking-[0.22em] uppercase text-white transition-transform duration-300 hover:-translate-y-0.5"
              style={{ background: '#D4748C' }}
            >
              {/* Shimmer au hover */}
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
                }}
              />
              <span className="relative">Découvrir nos bouquets</span>
            </Link>

            {/* CTA secondaire */}
            <Link
              href="/collections/coffrets"
              className="inline-flex items-center justify-center h-14 px-10 rounded-full font-display text-[0.62rem] font-semibold tracking-[0.22em] uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                border: '1px solid rgba(255,255,255,0.32)',
                color: 'rgba(255,255,255,0.82)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.70)'
                ;(e.currentTarget as HTMLElement).style.color = '#fff'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.32)'
                ;(e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.82)'
              }}
            >
              Coffrets cadeaux
            </Link>
          </motion.div>

          {/* Trust micro-signals */}
          <motion.div
            custom={1.02}
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-5 sm:gap-8"
          >
            {[
              { icon: '✦', text: 'Livraison offerte dès 59€' },
              { icon: '✦', text: '+2 400 avis 5★' },
              { icon: '✦', text: 'Fraîcheur garantie' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <span style={{ color: '#D4A537', fontSize: '0.45rem' }}>{icon}</span>
                <span
                  className="font-display font-light tracking-[0.12em] uppercase hidden sm:inline"
                  style={{ fontSize: '0.52rem', color: 'rgba(255,255,255,0.42)' }}
                >
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
