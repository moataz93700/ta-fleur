'use client'

/*
  PAGE REGISTER — TA FLEUR
  Split-screen brand + composant Clerk <SignUp /> stylisé
*/

import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

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
    socialButtonsBlockButton: 'rounded-full border border-ta-beige-medium hover:border-ta-black font-display text-[0.6rem] tracking-[0.1em] uppercase transition-all duration-200 h-12',
    formButtonPrimary: 'rounded-full h-12 font-display text-[0.6rem] tracking-[0.22em] uppercase bg-ta-rose-deep hover:bg-ta-rose-dark transition-all duration-300',
    formFieldInput:    'rounded-xl border border-ta-beige-medium h-12 px-4 font-sans text-sm focus:border-ta-rose-medium focus:ring-2 focus:ring-ta-rose-medium/20',
    formFieldLabel:    'font-display text-[0.52rem] tracking-[0.18em] uppercase text-ta-gray-500',
    footerActionLink:  'text-ta-black font-semibold underline underline-offset-2 hover:text-ta-rose-deep',
    dividerLine:       'bg-ta-beige-medium',
    dividerText:       'font-display text-[0.52rem] tracking-[0.15em] uppercase text-ta-gray-300',
    alertText:         'font-sans text-xs',
  },
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-[55fr_45fr]">

      {/* ── Image brand ── */}
      <div className="hidden lg:block relative overflow-hidden">
        <Image src="/brand/hero-bg.png" alt="TA FLEUR" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-ta-black/65 via-ta-black/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12">
          <Image src="/brand/logo-principal.png" alt="TA FLEUR" width={180} height={220}
            className="brightness-0 invert" priority />
          <p className="font-display text-[0.6rem] tracking-[0.3em] uppercase text-center"
            style={{ color: 'rgba(255,255,255,0.6)' }}>
            Fleurs &amp; Émotions
          </p>
        </div>
      </div>

      {/* ── Formulaire Clerk ── */}
      <div className="flex items-center justify-center p-8 min-h-screen" style={{ background: '#FFFEF5' }}>
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <div className="lg:hidden mb-10 flex justify-center">
            <Image src="/brand/logo-principal.png" alt="TA FLEUR" width={110} height={135} />
          </div>

          <SignUp
            appearance={clerkAppearance}
            signInUrl="/login"
            forceRedirectUrl="/account"
          />
        </div>
      </div>
    </div>
  )
}
