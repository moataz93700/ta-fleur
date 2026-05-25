'use client'

/* Callback OAuth — Clerk redirige ici après Google/Apple */

import { useEffect } from 'react'
import { useClerk } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk()
  const router = useRouter()

  useEffect(() => {
    handleRedirectCallback({
      signInForceRedirectUrl: '/account',
      signUpForceRedirectUrl: '/account',
    }).catch(() => router.push('/login'))
  }, [handleRedirectCallback, router])

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#FFFEF5' }}>
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-2 border-ta-rose-medium border-t-transparent animate-spin mx-auto mb-4" />
        <p className="font-display text-[0.55rem] tracking-[0.2em] uppercase text-ta-gray-400">
          Connexion en cours…
        </p>
      </div>
    </div>
  )
}
