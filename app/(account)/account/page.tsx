'use client'

/*
  PAGE PROFIL — TA FLEUR
  Affiche les informations Clerk + permet de modifier prénom/nom.
*/

import { useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
})

export default function AccountPage() {
  const { user, isLoaded } = useUser()
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [saved,     setSaved]     = useState(false)
  const [loading,   setLoading]   = useState(false)

  if (!isLoaded) return <AccountSkeleton />

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    try {
      await user?.update({ firstName: firstName || user.firstName || '', lastName: lastName || user.lastName || '' })
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">

      {/* Titre */}
      <motion.div variants={fadeUp(0)}>
        <p className="font-display text-[0.52rem] tracking-[0.25em] uppercase text-ta-gold mb-1">Mon compte</p>
        <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-ta-black">Mon profil</h1>
      </motion.div>

      {/* Carte infos */}
      <motion.div variants={fadeUp(0.08)} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
        <h2 className="font-display text-[0.58rem] tracking-[0.2em] uppercase text-ta-gray-400 mb-6">
          Informations personnelles
        </h2>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">
                Prénom
              </label>
              <input
                type="text"
                defaultValue={user?.firstName ?? ''}
                onChange={e => setFirstName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-ta-beige-medium bg-ta-ivory font-sans text-sm text-ta-black outline-none focus:border-ta-rose-medium focus:ring-2 focus:ring-ta-rose-medium/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">
                Nom
              </label>
              <input
                type="text"
                defaultValue={user?.lastName ?? ''}
                onChange={e => setLastName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl border border-ta-beige-medium bg-ta-ivory font-sans text-sm text-ta-black outline-none focus:border-ta-rose-medium focus:ring-2 focus:ring-ta-rose-medium/20 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">
              Adresse email
            </label>
            <input
              type="email"
              value={user?.primaryEmailAddress?.emailAddress ?? ''}
              disabled
              className="w-full h-12 px-4 rounded-xl border border-ta-beige-medium bg-ta-beige-light font-sans text-sm text-ta-gray-400 cursor-not-allowed"
            />
            <p className="mt-1.5 font-sans text-[0.65rem] text-ta-gray-300">
              L&apos;email ne peut pas être modifié ici.
            </p>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <button type="submit" disabled={loading}
              className="h-11 px-8 rounded-full font-display text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 relative overflow-hidden group"
              style={{ background: '#D4748C' }}>
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
              <span className="relative">{loading ? 'Sauvegarde…' : 'Sauvegarder'}</span>
            </button>
            {saved && (
              <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1.5 font-display text-[0.52rem] tracking-[0.1em] uppercase text-green-600">
                <CheckCircleIcon className="w-4 h-4" />
                Sauvegardé
              </motion.span>
            )}
          </div>
        </form>
      </motion.div>

      {/* Carte sécurité */}
      <motion.div variants={fadeUp(0.14)} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
        <h2 className="font-display text-[0.58rem] tracking-[0.2em] uppercase text-ta-gray-400 mb-4">
          Sécurité
        </h2>
        <p className="font-sans text-sm text-ta-gray-400 mb-4">
          Pour modifier votre mot de passe, un email de réinitialisation vous sera envoyé.
        </p>
        <a href="/forgot-password"
          className="inline-flex h-11 items-center px-7 rounded-full border border-ta-beige-medium font-display text-[0.58rem] font-medium tracking-[0.15em] uppercase text-ta-black hover:border-ta-black transition-all duration-200 hover:-translate-y-0.5">
          Modifier mon mot de passe
        </a>
      </motion.div>

    </motion.div>
  )
}

function AccountSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 bg-ta-beige-light rounded-lg w-40" />
      <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
        <div className="h-4 bg-ta-beige-light rounded w-48" />
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-ta-beige-light rounded-xl" />
          <div className="h-12 bg-ta-beige-light rounded-xl" />
        </div>
        <div className="h-12 bg-ta-beige-light rounded-xl" />
      </div>
    </div>
  )
}
