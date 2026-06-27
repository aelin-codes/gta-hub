'use client'

import { useState } from 'react'
import { LogIn, Key, Mail, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function LoginPage({ params: { locale } }: { params: { locale: string } }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [message, setMessage] = useState('')

  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setErrorMsg('')
    setMessage('')

    try {
      if (mode === 'signin') {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        })
        if (error) throw error
        
        // Logged in! Redirect
        setMessage("Success! Redirecting to Dashboard...")
        setTimeout(() => {
          window.location.href = `/${locale}/dashboard`
        }, 1000)
      } else {
        // Sign up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        })
        if (error) throw error
        
        // After signup, we insert a record into the public.users table as well.
        // We'll let a trigger handle it, or try to insert here just to be safe.
        if (data.user) {
          await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: email,
              role: 'user',
              is_premium: false
            })
        }

        setMessage("Account created! Please check your email inbox to confirm registration.")
      }
    } catch (err: any) {
      console.error(err)
      setErrorMsg(err.message || 'Authentication failed. Please verify credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-midnight-teal min-h-screen py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-deep-teal/40 rounded-3xl p-6 sm:p-8 border border-deep-teal/80 shadow-2xl relative">
        
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-flamingo/5 via-transparent to-transparent pointer-events-none rounded-3xl" />

        <div className="text-center space-y-2 mb-8 relative z-10">
          <span className="text-3xl font-display tracking-widest text-off-white select-none">
            GTA VI <span className="text-neon-flamingo">HUB</span>
          </span>
          <h2 className="text-md font-bold uppercase tracking-wider text-off-white/80">
            {mode === 'signin' ? 'Sign In to Account' : 'Register New Account'}
          </h2>
          <p className="text-xs text-off-white/50">
            Unlock favorites, follows list, and premium search features.
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5 relative z-10">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 block">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-off-white/40">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full pl-11 pr-4 py-3.5 bg-midnight-teal border border-deep-teal/80 focus:border-palm-teal focus:ring-1 focus:ring-palm-teal rounded-xl text-sm text-off-white outline-none transition"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 block">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-off-white/40">
                <Key className="w-4 h-4" />
              </span>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3.5 bg-midnight-teal border border-deep-teal/80 focus:border-palm-teal focus:ring-1 focus:ring-palm-teal rounded-xl text-sm text-off-white outline-none transition"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="flex items-center space-x-2 text-xs text-neon-flamingo font-semibold bg-neon-flamingo/10 p-3 rounded-lg border border-neon-flamingo/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {message && (
            <div className="flex items-center space-x-2 text-xs text-palm-teal font-semibold bg-palm-teal/10 p-3 rounded-lg border border-palm-teal/20">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-95 transition shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>{mode === 'signin' ? 'Sign In' : 'Sign Up'}</span>
              </>
            )}
          </button>
        </form>

        {/* Toggle Mode */}
        <div className="mt-6 border-t border-midnight-teal/40 pt-4 text-center">
          <button
            onClick={() => {
              setMode(mode === 'signin' ? 'signup' : 'signin')
              setErrorMsg('')
              setMessage('')
            }}
            className="text-xs text-palm-teal hover:text-sunset-orange font-semibold hover:underline"
          >
            {mode === 'signin' ? "Don't have an account? Register here" : 'Already have an account? Log In'}
          </button>
        </div>

      </div>
    </div>
  )
}
