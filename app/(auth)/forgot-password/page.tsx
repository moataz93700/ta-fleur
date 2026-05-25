'use client'

/*
  PAGE MOT DE PASSE OUBLIÉ — TA FLEUR
  Redirige vers /login avec le flow oublié-mot-de-passe de Clerk intégré.
  Le composant <SignIn /> de Clerk gère nativement le reset.
*/

import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'

const clerkAppearance = {
  variables: {
    colorPrimary:    '#D4748C',
    colorBackground: '#FFFFFF',
    colorText:       '#222222',
    colorInputText:  '#222222',
    fontFamily:      "'Poppins', system-ui, sans-serif",
    borderRadius:    '0.75rem',
    colorInputBackground: '#FFFFFF',
  },
  elements: {
    card:              'shadow-none border-0 bg-transparent p-0 w-full',
    headerTitle:       'font-serif text-2xl font-semibold text-ta-black',
    headerSubtitle:    'font-sans text-sm text-ta-gray-400',
    formButtonPrimary: 'rounded-full h-12 font-display text-[0.6rem] tracking-[0.22em] uppercase bg-ta-rose-deep hover:bg-ta-rose-dark transition-all duration-300',
    formFieldInput:    'rounded-xl border border-ta-beige-medium h-12 px-4 font-sans text-sm focus:border-ta-rose-medium focus:ring-2 focus:ring-ta-rose-medium/20',
    formFieldLabel:    'font-display text-[0.52rem] tracking-[0.18em] uppercase text-ta-gray-500',
    footerActionLink:  'text-ta-black font-semibold underline underline-offset-2 hover:text-ta-rose-deep',
    alertText:         'font-sans text-xs',
  },
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-[55fr_45fr]">

      {/* ── Image brand ── */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image src="/brand/hero-bg.png" alt="TA FLEUR" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-ta-black/65 via-ta-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12">
          <Image src="/brand/logo-principal.png" alt="TA FLEUR" width={180} height={220}
            className="brightness-0 invert" priority />
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="flex items-center justify-center p-8 min-h-screen" style={{ background: '#FFFEF5' }}>
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10 flex justify-center">
            <Image src="/brand/logo-principal.png" alt="TA FLEUR" width={110} height={135} />
          </div>

          <div className="mb-6">
            <p className="font-display text-[0.55rem] tracking-[0.28em] uppercase mb-2" style={{ color: '#D4A537' }}>
              Récupération
            </p>
            <h1 className="font-serif text-2xl font-semibold text-ta-black mb-2">
              Mot de passe oublié ?
            </h1>
            <p className="font-sans text-sm text-ta-gray-400">
              Connectez-vous et utilisez l&apos;option &laquo; Mot de passe oublié &raquo;.
            </p>
          </div>

          <SignIn
            appearance={clerkAppearance}
            signUpUrl="/register"
            forceRedirectUrl="/account"
            initialValues={{ emailAddress: '' }}
          />

          <p className="mt-6 text-center font-sans text-xs text-ta-gray-400">
            <Link href="/login" className="text-ta-black underline underline-offset-2 hover:text-ta-rose-deep transition-colors">
              ← Retour à la connexion
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
