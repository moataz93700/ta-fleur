'use client'

/*
  PAGE CHECKOUT — TA FLEUR

  Directeur artistique :
  Fond beige léger. 2 colonnes desktop :
  - Gauche 60% : formulaire progressif (Coordonnées → Livraison → Paiement)
  - Droite 40% sticky : récapitulatif commande

  Étapes visuelles : progress bar 3 étapes.
  Formulaire : champs Poppins Light, focus ring rose pastel.
  Paiement : mock card UI inspiré Stripe Elements (4 champs).
  CTA final : "Commander" rose, montant affiché, animation spinner.
  État succès : overlay de confirmation élégant.

  Impact conversion :
  → Progress bar = réduction de l'anxiété ("j'en suis à l'étape 2/3")
  → Résumé toujours visible = moins d'abandon (Baymard)
  → Autofill activé = réduction friction mobile
  → CTA avec montant = engagement conscient
*/

import { useState, type FormEvent } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckIcon, LockClosedIcon, ChevronDownIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { useCart } from '@/lib/context/CartContext'
import { formatPrice } from '@/lib/utils'
import { EASE_LUXURY } from '@/lib/animations'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CONSTANTES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const FREE_SHIPPING = 5900
const SHIPPING_COST = 495

const STEPS = ['Coordonnées', 'Livraison', 'Paiement'] as const
type Step = 0 | 1 | 2

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT CHAMP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Field({
  label, id, type = 'text', placeholder, autoComplete, required = true, colSpan,
}: {
  label:        string
  id:           string
  type?:        string
  placeholder?: string
  autoComplete?:string
  required?:    boolean
  colSpan?:     'full' | 'half'
}) {
  return (
    <div className={colSpan === 'full' ? 'col-span-2' : ''}>
      <label htmlFor={id} className="block font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ta-black mb-1.5">
        {label}{required && <span className="text-ta-rose-deep ml-0.5">*</span>}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="w-full h-11 px-4 rounded-xl border border-ta-beige-medium bg-white font-sans text-sm font-light text-ta-black placeholder-ta-gray-300 focus:outline-none focus:border-ta-rose-pastel focus:ring-2 focus:ring-ta-rose-pastel/20 transition-all duration-200"
      />
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROGRESS BAR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEPS.map((label, i) => {
        const done    = i < step
        const current = i === step
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div className={[
                'w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300',
                done    ? 'bg-ta-rose-deep'
                : current ? 'bg-ta-rose-deep ring-4 ring-ta-rose-pastel/30'
                : 'bg-ta-beige-medium',
              ].join(' ')}>
                {done
                  ? <CheckIcon className="w-3.5 h-3.5 text-white" />
                  : <span className={['font-display text-[0.55rem] font-bold', current ? 'text-white' : 'text-ta-gray-400'].join(' ')}>{i + 1}</span>
                }
              </div>
              <span className={['font-display text-[0.55rem] font-medium tracking-[0.1em] uppercase whitespace-nowrap', current ? 'text-ta-rose-deep' : done ? 'text-ta-black' : 'text-ta-gray-400'].join(' ')}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={['flex-1 h-px mx-2 mb-5 transition-all duration-500', i < step ? 'bg-ta-rose-deep' : 'bg-ta-beige-medium'].join(' ')} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CODE PROMO
   Impact conversion :
   → Espace visible pour le code = les clients le cherchent moins ailleurs
   → Réduction immédiate = engagement émotionnel renforcé
   → Code TAFLEUR15 du popup = boucle de conversion fermée
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function PromoCode() {
  const [code,    setCode]    = useState('')
  const [applied, setApplied] = useState(false)
  const [error,   setError]   = useState(false)
  const [open,    setOpen]    = useState(false)

  function handleApply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (code.trim().toUpperCase() === 'TAFLEUR15') {
      setApplied(true)
      setError(false)
    } else {
      setError(true)
      setApplied(false)
    }
  }

  return (
    <div className="px-5 pb-4 border-b border-ta-beige-medium">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 font-display text-[0.58rem] font-semibold tracking-[0.1em] uppercase text-ta-rose-deep hover:text-ta-rose-dark transition-colors duration-200"
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-block text-sm leading-none"
        >
          +
        </motion.span>
        {applied ? 'Code TAFLEUR15 appliqué ✓' : 'J\'ai un code promo'}
      </button>

      <AnimatePresence>
        {open && !applied && (
          <motion.form
            key="promo-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_LUXURY }}
            style={{ overflow: 'hidden' }}
            onSubmit={handleApply}
            className="flex gap-2 mt-3"
          >
            <input
              type="text"
              value={code}
              onChange={e => { setCode(e.target.value); setError(false) }}
              placeholder="TAFLEUR15"
              className={[
                'flex-1 h-10 px-4 rounded-xl border bg-white font-sans text-sm font-light text-ta-black placeholder-ta-gray-300 focus:outline-none focus:ring-2 transition-all duration-200',
                error
                  ? 'border-red-300 focus:border-red-300 focus:ring-red-100'
                  : 'border-ta-beige-medium focus:border-ta-rose-pastel focus:ring-ta-rose-pastel/20',
              ].join(' ')}
            />
            <button
              type="submit"
              className="h-10 px-4 rounded-xl bg-ta-black hover:bg-ta-gray-900 text-white font-display text-[0.55rem] font-semibold tracking-[0.1em] uppercase transition-colors duration-200"
            >
              Appliquer
            </button>
          </motion.form>
        )}
        {error && open && (
          <motion.p
            key="promo-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-1.5 font-sans text-[0.62rem] text-red-500"
          >
            Code invalide ou expiré.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RÉSUMÉ COMMANDE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrderSummary({ subtotal }: { subtotal: number }) {
  const { items } = useCart()
  const shipping  = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST
  const total     = subtotal + shipping

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Items */}
      <div className="p-5 border-b border-ta-beige-medium">
        <h2 className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-gold mb-4">
          Votre commande
        </h2>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.productId} className="flex gap-3 items-start">
              <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-ta-beige-light">
                <Image src={item.image} alt={item.imageAlt} fill sizes="56px" className="object-cover" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-ta-rose-deep text-white flex items-center justify-center font-display text-[0.45rem] font-bold">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-xs font-semibold text-ta-black leading-snug line-clamp-2">{item.name}</p>
                {item.message && (
                  <p className="font-sans text-[0.6rem] font-light italic text-ta-gray-400 mt-0.5 line-clamp-1">&ldquo;{item.message}&rdquo;</p>
                )}
              </div>
              <span className="font-sans text-xs font-medium text-ta-black flex-shrink-0">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Code promo */}
      <PromoCode />

      {/* Totaux */}
      <div className="p-5 space-y-2.5">
        <div className="flex justify-between">
          <span className="font-sans text-xs font-light text-ta-gray-500">Sous-total</span>
          <span className="font-sans text-xs font-medium text-ta-black">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-sans text-xs font-light text-ta-gray-500">Livraison</span>
          <span className={['font-sans text-xs font-medium', shipping === 0 ? 'text-emerald-600' : 'text-ta-black'].join(' ')}>
            {shipping === 0 ? 'Offerte' : formatPrice(shipping)}
          </span>
        </div>
        <div className="h-px bg-ta-beige-medium" />
        <div className="flex justify-between items-end pt-1">
          <span className="font-display text-[0.6rem] font-bold tracking-[0.1em] uppercase text-ta-black">Total</span>
          <span className="font-serif text-2xl font-bold text-ta-black">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Trust */}
      <div className="px-5 pb-5">
        <div className="bg-ta-beige-light rounded-xl px-4 py-3 flex items-center gap-2">
          <LockClosedIcon className="w-3.5 h-3.5 text-ta-gray-400 flex-shrink-0" />
          <p className="font-display text-[0.55rem] font-medium tracking-[0.08em] uppercase text-ta-gray-400 leading-snug">
            Paiement 100% sécurisé · SSL 256-bit
          </p>
        </div>
      </div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   RÉCAPITULATIF MOBILE (accordion)
   Impact conversion :
   → Visible sans scroller → réassurance avant de taper les données
   → Collapsible → ne prend pas toute la place sur petit écran
   → Total affiché en permanence = ancrage prix
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function MobileOrderSummary({ subtotal }: { subtotal: number }) {
  const { items } = useCart()
  const [expanded, setExpanded] = useState(false)
  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST
  const total    = subtotal + shipping

  return (
    <div className="lg:hidden mb-6 bg-white rounded-2xl shadow-card overflow-hidden">
      {/* Header — toujours visible */}
      <button
        onClick={() => setExpanded(e => !e)}
        aria-expanded={expanded}
        aria-label={expanded ? 'Masquer le récapitulatif' : 'Voir le récapitulatif'}
        className="w-full px-5 py-4 flex items-center justify-between gap-3"
      >
        <div className="flex items-center gap-2 min-w-0">
          <ShoppingBagIcon className="w-4 h-4 text-ta-gray-400 flex-shrink-0" />
          <span className="font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ta-gray-500 truncate">
            {items.length} article{items.length > 1 ? 's' : ''}
          </span>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex-shrink-0"
          >
            <ChevronDownIcon className="w-3.5 h-3.5 text-ta-gray-400" />
          </motion.div>
        </div>
        <span className="font-serif text-xl font-bold text-ta-black flex-shrink-0">
          {formatPrice(total)}
        </span>
      </button>

      {/* Body — expandable */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="mobile-summary"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: EASE_LUXURY }}
            style={{ overflow: 'hidden' }}
          >
            <div className="border-t border-ta-beige-medium">
              <OrderSummary subtotal={subtotal} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   SUCCESS STATE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function OrderSuccess({ total }: { total: number }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_LUXURY }}
        className="max-w-md w-full text-center"
      >
        {/* Checkmark animé */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6"
        >
          <CheckIcon className="w-9 h-9 text-emerald-500" />
        </motion.div>

        <p className="section-label text-ta-gold mb-3">Commande confirmée</p>
        <h1 className="font-serif text-3xl font-bold text-ta-black tracking-tight mb-3">
          Merci pour votre confiance
        </h1>
        <p className="font-sans text-sm font-light text-ta-gray-500 leading-relaxed mb-2">
          Votre commande de <strong className="font-medium text-ta-black">{formatPrice(total)}</strong> a
          bien été reçue. Vous recevrez un email de confirmation dans quelques minutes.
        </p>
        <p className="font-sans text-sm font-light text-ta-gray-500 leading-relaxed mb-8">
          Vos fleurs seront préparées demain matin et livrées dans la journée. 🌸
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="btn btn-rose">
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/collections/bouquets"
            className="h-12 px-8 rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-black transition-all duration-200 flex items-center justify-center"
          >
            Continuer mes achats
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PAGE PRINCIPALE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [step,     setStep]     = useState<Step>(0)
  const [ordering, setOrdering] = useState(false)
  const [success,  setSuccess]  = useState(false)

  const shipping = subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST
  const total    = subtotal + shipping

  /* Panier vide → rediriger */
  if (items.length === 0 && !success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-serif text-2xl font-semibold text-ta-black">Votre panier est vide</p>
        <Link href="/collections/bouquets" className="btn btn-rose">Découvrir nos bouquets</Link>
      </div>
    )
  }

  if (success) return <OrderSuccess total={total} />

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (step < 2) {
      setStep((step + 1) as Step)
      return
    }
    /* Étape 3 → passer commande */
    setOrdering(true)
    setTimeout(() => {
      clearCart()
      setSuccess(true)
      setOrdering(false)
    }, 1800)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

      {/* ── Récapitulatif mobile (collapsible) ── */}
      <MobileOrderSummary subtotal={subtotal} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

        {/* ── Formulaire (gauche) ── */}
        <div>
          <ProgressBar step={step} />

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">

              {/* ÉTAPE 1 — Coordonnées */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: EASE_LUXURY }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-ta-black mb-5">
                      Vos coordonnées
                    </h2>
                    <div className="bg-white rounded-2xl shadow-card p-6 grid grid-cols-2 gap-4">
                      <Field label="Prénom" id="firstName" placeholder="Marie" autoComplete="given-name" colSpan="half" />
                      <Field label="Nom" id="lastName" placeholder="Dupont" autoComplete="family-name" colSpan="half" />
                      <Field label="Email" id="email" type="email" placeholder="marie@email.fr" autoComplete="email" colSpan="full" />
                      <Field label="Téléphone" id="phone" type="tel" placeholder="+33 6 00 00 00 00" autoComplete="tel" colSpan="full" />
                    </div>
                  </div>

                  <button type="submit" className="w-full h-14 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose">
                    Continuer vers la livraison →
                  </button>
                </motion.div>
              )}

              {/* ÉTAPE 2 — Livraison */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: EASE_LUXURY }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-ta-black mb-5">
                      Adresse de livraison
                    </h2>
                    <div className="bg-white rounded-2xl shadow-card p-6 grid grid-cols-2 gap-4">
                      <Field label="Adresse" id="address" placeholder="12 rue des Lilas" autoComplete="street-address" colSpan="full" />
                      <Field label="Appartement, étage" id="address2" placeholder="Bât. B, 3ème étage" autoComplete="address-line2" required={false} colSpan="full" />
                      <Field label="Code postal" id="zip" placeholder="75001" autoComplete="postal-code" colSpan="half" />
                      <Field label="Ville" id="city" placeholder="Paris" autoComplete="address-level2" colSpan="half" />
                    </div>
                  </div>

                  {/* Option livraison */}
                  <div className="bg-white rounded-2xl shadow-card p-5">
                    <h3 className="font-display text-[0.6rem] font-bold tracking-[0.15em] uppercase text-ta-gold mb-4">
                      Mode de livraison
                    </h3>
                    <label className="flex items-center gap-4 cursor-pointer p-3 rounded-xl border-2 border-ta-rose-pastel bg-ta-beige-light">
                      <input type="radio" name="shipping" defaultChecked className="accent-ta-rose-deep" />
                      <div className="flex-1">
                        <p className="font-display text-xs font-semibold text-ta-black">Livraison standard · 24h</p>
                        <p className="font-sans text-xs font-light text-ta-gray-400">Demain avant 18h</p>
                      </div>
                      <span className={['font-serif text-sm font-bold', shipping === 0 ? 'text-emerald-600' : 'text-ta-black'].join(' ')}>
                        {shipping === 0 ? 'Offerte' : formatPrice(shipping)}
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(0)} className="h-14 px-6 rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-gray-500 hover:text-ta-black transition-all duration-200">
                      ← Retour
                    </button>
                    <button type="submit" className="flex-1 h-14 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose">
                      Continuer vers le paiement →
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ÉTAPE 3 — Paiement */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: EASE_LUXURY }}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-serif text-xl font-semibold text-ta-black mb-5">
                      Paiement sécurisé
                    </h2>

                    {/* Paiements rapides */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { label: 'Apple Pay', icon: '🍎' },
                        { label: 'Google Pay', icon: 'G' },
                      ].map(({ label, icon }) => (
                        <button
                          key={label}
                          type="button"
                          className="h-12 rounded-xl border border-ta-beige-medium bg-white hover:border-ta-black font-display text-xs font-semibold text-ta-black transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <span>{icon}</span> {label}
                        </button>
                      ))}
                    </div>

                    {/* Séparateur */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex-1 h-px bg-ta-beige-medium" />
                      <span className="font-display text-[0.55rem] font-light tracking-[0.1em] uppercase text-ta-gray-400">
                        ou par carte bancaire
                      </span>
                      <div className="flex-1 h-px bg-ta-beige-medium" />
                    </div>

                    {/* Card form mock (Stripe Elements ready) */}
                    <div className="bg-white rounded-2xl shadow-card p-6 space-y-4">
                      <div>
                        <label htmlFor="card-number" className="block font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ta-black mb-1.5">
                          Numéro de carte<span className="text-ta-rose-deep ml-0.5">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="card-number"
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19}
                            required
                            className="w-full h-11 px-4 pr-14 rounded-xl border border-ta-beige-medium bg-white font-sans text-sm font-light text-ta-black placeholder-ta-gray-300 focus:outline-none focus:border-ta-rose-pastel focus:ring-2 focus:ring-ta-rose-pastel/20 transition-all duration-200"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                            {['💳'].map(i => <span key={i} className="text-base">{i}</span>)}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="card-expiry" className="block font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ta-black mb-1.5">
                            Date d&apos;expiration<span className="text-ta-rose-deep ml-0.5">*</span>
                          </label>
                          <input id="card-expiry" type="text" placeholder="MM / AA" maxLength={7} required className="w-full h-11 px-4 rounded-xl border border-ta-beige-medium bg-white font-sans text-sm font-light text-ta-black placeholder-ta-gray-300 focus:outline-none focus:border-ta-rose-pastel focus:ring-2 focus:ring-ta-rose-pastel/20 transition-all duration-200" />
                        </div>
                        <div>
                          <label htmlFor="card-cvc" className="block font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ta-black mb-1.5">
                            CVV<span className="text-ta-rose-deep ml-0.5">*</span>
                          </label>
                          <input id="card-cvc" type="text" placeholder="•••" maxLength={4} required className="w-full h-11 px-4 rounded-xl border border-ta-beige-medium bg-white font-sans text-sm font-light text-ta-black placeholder-ta-gray-300 focus:outline-none focus:border-ta-rose-pastel focus:ring-2 focus:ring-ta-rose-pastel/20 transition-all duration-200" />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="card-name" className="block font-display text-[0.58rem] font-bold tracking-[0.12em] uppercase text-ta-black mb-1.5">
                          Nom sur la carte<span className="text-ta-rose-deep ml-0.5">*</span>
                        </label>
                        <input id="card-name" type="text" placeholder="MARIE DUPONT" autoComplete="cc-name" required className="w-full h-11 px-4 rounded-xl border border-ta-beige-medium bg-white font-sans text-sm font-light text-ta-black placeholder-ta-gray-300 focus:outline-none focus:border-ta-rose-pastel focus:ring-2 focus:ring-ta-rose-pastel/20 transition-all duration-200" />
                      </div>
                    </div>
                  </div>

                  {/* CGV */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" required className="mt-0.5 accent-ta-rose-deep flex-shrink-0" />
                    <span className="font-sans text-xs font-light text-ta-gray-500 leading-relaxed">
                      J&apos;accepte les{' '}
                      <a href="/cgv" className="text-ta-rose-deep hover:underline" target="_blank">conditions générales de vente</a>
                      {' '}et la{' '}
                      <a href="/confidentialite" className="text-ta-rose-deep hover:underline" target="_blank">politique de confidentialité</a>.
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setStep(1)} className="h-14 px-6 rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] font-semibold tracking-[0.15em] uppercase text-ta-gray-500 hover:text-ta-black transition-all duration-200">
                      ← Retour
                    </button>
                    <motion.button
                      type="submit"
                      disabled={ordering}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 h-14 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark disabled:opacity-70 text-white font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose flex items-center justify-center gap-2"
                    >
                      {ordering ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Traitement en cours…
                        </>
                      ) : (
                        <>
                          <LockClosedIcon className="w-4 h-4" />
                          Commander · {formatPrice(total)}
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </form>
        </div>

        {/* ── Résumé commande (droite, sticky) — desktop uniquement ── */}
        <div className="hidden lg:block lg:sticky lg:top-8">
          <OrderSummary subtotal={subtotal} />
        </div>

      </div>
    </div>
  )
}
