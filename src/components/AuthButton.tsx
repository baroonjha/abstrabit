'use client'

import { createClient } from '@/utils/supabase/client'
import { LogIn, LogOut } from 'lucide-react'

export default function AuthButton({ user }: { user: any }) {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    location.reload()
  }

  return user ? (
    <button
      onClick={handleLogout}
      className="flex cursor-pointer items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      <LogOut size={18} />
      Sign Out
    </button>
  ) : (
    <button
      onClick={handleLogin}
      className="flex cursor-pointer items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
    >
      <LogIn size={18} />
      Sign in with Google
    </button>
  )
}
