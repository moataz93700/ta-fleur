'use client'

import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   TYPES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
type Variant = 'primary' | 'rose' | 'outline' | 'ghost' | 'gold'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?:    Size
  href?:    string
  external?: boolean
  fullWidth?: boolean
  loading?: boolean
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STYLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const base = [
  'inline-flex items-center justify-center gap-2',
  'rounded-full font-display font-semibold uppercase tracking-wider',
  'border transition-all duration-300 ease-luxury',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ta-rose-deep focus-visible:ring-offset-2',
  'disabled:opacity-50 disabled:cursor-not-allowed',
  'select-none cursor-pointer whitespace-nowrap',
  'active:scale-[0.98]',
].join(' ')

const variants: Record<Variant, string> = {
  primary: [
    'bg-ta-black text-white border-ta-black',
    'hover:bg-ta-rose-dark hover:border-ta-rose-dark hover:-translate-y-0.5',
    'hover:shadow-rose',
  ].join(' '),

  rose: [
    'bg-ta-rose-deep text-white border-ta-rose-deep',
    'hover:bg-ta-rose-dark hover:border-ta-rose-dark hover:-translate-y-0.5',
    'hover:shadow-rose',
  ].join(' '),

  outline: [
    'bg-transparent text-ta-black border-ta-black',
    'hover:bg-ta-black hover:text-white hover:-translate-y-0.5',
  ].join(' '),

  ghost: [
    'bg-transparent text-ta-black border-ta-beige-medium',
    'hover:border-ta-rose-pastel hover:text-ta-rose-dark',
  ].join(' '),

  gold: [
    'bg-ta-gold text-white border-ta-gold',
    'hover:bg-ta-gold-medium hover:border-ta-gold-medium hover:-translate-y-0.5',
    'hover:shadow-gold',
  ].join(' '),
}

const sizes: Record<Size, string> = {
  sm: 'h-9  px-5  text-[0.6rem]  tracking-widest',
  md: 'h-12 px-8  text-[0.68rem] tracking-widest',
  lg: 'h-14 px-10 text-[0.72rem] tracking-widest',
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   COMPOSANT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant   = 'primary',
      size      = 'md',
      href,
      external  = false,
      fullWidth = false,
      loading   = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const classes = cn(
      base,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )

    const content = loading ? (
      <>
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        <span className="opacity-70">{children}</span>
      </>
    ) : children

    /* Lien interne Next.js */
    if (href && !external) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      )
    }

    /* Lien externe */
    if (href && external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      )
    }

    /* Bouton standard */
    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
export type { ButtonProps }
