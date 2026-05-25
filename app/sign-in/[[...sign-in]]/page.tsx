import { redirect } from 'next/navigation'

/* Catch-all for Clerk's default /sign-in — redirect to our branded page */
export default function SignInPage() {
  redirect('/login')
}
