import { redirect } from 'next/navigation'

/* Catch-all for Clerk's default /sign-up — redirect to our branded page */
export default function SignUpPage() {
  redirect('/register')
}
