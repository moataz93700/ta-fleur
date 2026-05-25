'use client'

/*
  PAGE ADRESSES — TA FLEUR
  Gestion des adresses de livraison (stockées dans localStorage).
*/

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPinIcon, PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline'

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay } },
})

interface Address {
  id:         string
  label:      string   // "Domicile", "Bureau"
  firstName:  string
  lastName:   string
  address:    string
  city:       string
  postal:     string
  country:    string
  phone:      string
  isDefault:  boolean
}

const STORAGE_KEY = 'ta-fleur-addresses'
const BLANK: Omit<Address, 'id' | 'isDefault'> = {
  label: 'Domicile', firstName: '', lastName: '', address: '', city: '', postal: '', country: 'France', phone: '',
}

export default function AddressesPage() {
  const [addresses,  setAddresses]  = useState<Address[]>([])
  const [showForm,   setShowForm]   = useState(false)
  const [editId,     setEditId]     = useState<string | null>(null)
  const [form,       setForm]       = useState({ ...BLANK })
  const [saved,      setSaved]      = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setAddresses(JSON.parse(stored))
    } catch {}
  }, [])

  function persist(next: Address[]) {
    setAddresses(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }

  function openAdd() {
    setForm({ ...BLANK })
    setEditId(null)
    setShowForm(true)
  }

  function openEdit(addr: Address) {
    setForm({ label: addr.label, firstName: addr.firstName, lastName: addr.lastName, address: addr.address, city: addr.city, postal: addr.postal, country: addr.country, phone: addr.phone })
    setEditId(addr.id)
    setShowForm(true)
  }

  function handleDelete(id: string) {
    persist(addresses.filter(a => a.id !== id))
  }

  function handleSetDefault(id: string) {
    persist(addresses.map(a => ({ ...a, isDefault: a.id === id })))
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (editId) {
      persist(addresses.map(a => a.id === editId ? { ...a, ...form } : a))
    } else {
      const newAddr: Address = {
        id: Date.now().toString(), isDefault: addresses.length === 0, ...form,
      }
      persist([...addresses, newAddr])
    }
    setShowForm(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const fieldCls = "w-full h-12 px-4 rounded-xl border border-ta-beige-medium bg-white font-sans text-sm text-ta-black placeholder:text-ta-gray-300 outline-none focus:border-ta-rose-medium focus:ring-2 focus:ring-ta-rose-medium/20 transition-all duration-200"

  return (
    <motion.div initial="hidden" animate="visible" className="space-y-6">

      <motion.div variants={fadeUp(0)} className="flex items-center justify-between">
        <div>
          <p className="font-display text-[0.52rem] tracking-[0.25em] uppercase text-ta-gold mb-1">Mon compte</p>
          <h1 className="font-serif text-2xl lg:text-3xl font-semibold text-ta-black">Mes adresses</h1>
        </div>
        {!showForm && (
          <button onClick={openAdd}
            className="flex items-center gap-2 h-10 px-5 rounded-full font-display text-[0.55rem] font-semibold tracking-[0.15em] uppercase text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#D4748C' }}>
            <PlusIcon className="w-3.5 h-3.5" />
            Ajouter
          </button>
        )}
      </motion.div>

      {/* Formulaire */}
      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
            <h2 className="font-display text-[0.58rem] tracking-[0.2em] uppercase text-ta-gray-400 mb-6">
              {editId ? 'Modifier l\'adresse' : 'Nouvelle adresse'}
            </h2>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Étiquette</label>
                <select value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                  className={fieldCls}>
                  <option>Domicile</option>
                  <option>Bureau</option>
                  <option>Autre</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Prénom</label>
                  <input type="text" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} required className={fieldCls} placeholder="Marie" />
                </div>
                <div>
                  <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Nom</label>
                  <input type="text" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} required className={fieldCls} placeholder="Dupont" />
                </div>
              </div>
              <div>
                <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Adresse</label>
                <input type="text" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} required className={fieldCls} placeholder="12 rue des Roses" />
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <div>
                  <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Code postal</label>
                  <input type="text" value={form.postal} onChange={e => setForm(f => ({ ...f, postal: e.target.value }))} required className={fieldCls} placeholder="75001" />
                </div>
                <div>
                  <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Ville</label>
                  <input type="text" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} required className={fieldCls} placeholder="Paris" />
                </div>
              </div>
              <div>
                <label className="block font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-500 mb-2">Téléphone</label>
                <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={fieldCls} placeholder="06 00 00 00 00" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit"
                  className="h-11 px-8 rounded-full font-display text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-white transition-all hover:-translate-y-0.5 relative overflow-hidden group"
                  style={{ background: '#D4748C' }}>
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />
                  <span className="relative">Sauvegarder</span>
                </button>
                <button type="button" onClick={() => setShowForm(false)}
                  className="h-11 px-6 rounded-full font-display text-[0.58rem] font-medium tracking-[0.15em] uppercase border border-ta-beige-medium text-ta-gray-500 hover:border-ta-black hover:text-ta-black transition-all duration-200">
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Liste adresses */}
      {addresses.length === 0 && !showForm ? (
        <motion.div variants={fadeUp(0.08)} className="bg-white rounded-2xl p-12 shadow-sm text-center">
          <MapPinIcon className="w-12 h-12 text-ta-beige-medium mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold text-ta-black mb-2">Aucune adresse</h2>
          <p className="font-sans text-sm text-ta-gray-400 mb-6">
            Ajoutez une adresse pour accélérer vos prochaines commandes.
          </p>
          <button onClick={openAdd}
            className="inline-flex h-11 items-center gap-2 px-8 rounded-full font-display text-[0.58rem] font-semibold tracking-[0.18em] uppercase text-white transition-all hover:-translate-y-0.5"
            style={{ background: '#D4748C' }}>
            <PlusIcon className="w-3.5 h-3.5" /> Ajouter une adresse
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence>
            {addresses.map((addr, i) => (
              <motion.div key={addr.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                transition={{ delay: i * 0.06 }}
                className={`bg-white rounded-2xl p-5 shadow-sm border-2 transition-all duration-200 ${addr.isDefault ? 'border-ta-rose-medium' : 'border-transparent hover:border-ta-beige-medium'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-[0.52rem] font-semibold tracking-[0.15em] uppercase text-ta-black">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <span className="px-2 py-0.5 rounded-full font-display text-[0.45rem] font-bold tracking-[0.1em] uppercase text-white" style={{ background: '#D4748C' }}>
                        Par défaut
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(addr)} className="p-1.5 text-ta-gray-300 hover:text-ta-black transition-colors rounded-lg">
                      <PencilIcon className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(addr.id)} className="p-1.5 text-ta-gray-300 hover:text-red-500 transition-colors rounded-lg">
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="font-sans text-sm text-ta-black font-medium">{addr.firstName} {addr.lastName}</p>
                <p className="font-sans text-xs text-ta-gray-400 mt-0.5 leading-relaxed">
                  {addr.address}<br />{addr.postal} {addr.city}<br />{addr.country}
                </p>
                {addr.phone && <p className="font-sans text-xs text-ta-gray-400 mt-1">{addr.phone}</p>}
                {!addr.isDefault && (
                  <button onClick={() => handleSetDefault(addr.id)}
                    className="mt-3 font-display text-[0.5rem] tracking-[0.1em] uppercase text-ta-gold hover:text-ta-gold-medium transition-colors">
                    Définir par défaut
                  </button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {saved && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="text-center font-display text-[0.52rem] tracking-[0.1em] uppercase text-green-600">
          ✓ Adresse sauvegardée
        </motion.p>
      )}

    </motion.div>
  )
}
