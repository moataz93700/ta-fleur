'use client'

/*
  FORMULAIRE NEWSLETTER — Client Component isolé
  Le Footer est un Server Component → les event handlers
  doivent vivre dans un composant client séparé.
*/

import { useState } from 'react'

export default function NewsletterForm() {
  const [email,   setEmail]   = useState('')
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    // TODO: connecter à l'API newsletter (Klaviyo / Mailchimp)
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex items-center justify-center h-12 max-w-md mx-auto">
        <p className="font-display text-sm font-medium text-ta-gold tracking-wide">
          ✓ Bienvenue — votre code −15% arrive dans votre boîte mail.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="votre@email.fr"
        required
        className="flex-1 h-12 px-5 rounded-full bg-white/[0.06] border border-white/10 text-white placeholder-white/30 font-sans text-sm font-light focus:outline-none focus:border-ta-rose-pastel transition-colors"
      />
      <button
        type="submit"
        className="h-12 px-6 rounded-full bg-ta-rose-deep hover:bg-ta-rose-dark text-white font-display text-[0.65rem] font-semibold tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-rose whitespace-nowrap"
      >
        Je m&apos;inscris
      </button>
    </form>
  )
}
