'use client'

import { useState } from 'react'
import { Mail, ArrowRight, Check, X } from 'lucide-react'

// ponytail: writes to Supabase `email_subscribers` table — create it via:
// CREATE TABLE email_subscribers (id uuid DEFAULT gen_random_uuid() PRIMARY KEY, email text UNIQUE NOT NULL, source text, created_at timestamptz DEFAULT now());
// ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
// CREATE POLICY "insert only" ON email_subscribers FOR INSERT WITH CHECK (true);
export default function EmailCapture({ source = 'unknown' }: { source?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return
    setStatus('loading')
    try {
      const { createClient } = await import('@/utils/supabase/client')
      const supabase = createClient()
      const { error } = await supabase
        .from('email_subscribers')
        .insert({ email: email.trim().toLowerCase(), source })
      if (error && error.code !== '23505') throw error // 23505 = duplicate, treat as success
      setStatus('success')
    } catch (err) {
      console.error(err)
      setErrorMsg('Something went wrong. Try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-palm-teal/10 border border-palm-teal/40 text-palm-teal text-sm font-mono">
        <Check className="w-4 h-4 shrink-0" />
        <span>You're in! We'll alert you on GTA 6 launch day.</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-off-white/50">
        <Mail className="w-3.5 h-3.5 text-palm-teal" />
        <span>Get the Launch Day Alert</span>
        <span className="px-1.5 py-0.5 rounded bg-neon-flamingo/20 text-neon-flamingo text-[9px] font-bold">Nov 19</span>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-grow bg-[#07090E] border border-deep-teal/80 rounded-xl px-4 py-2.5 text-xs text-off-white placeholder:text-off-white/30 focus:outline-none focus:border-palm-teal transition"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-xs font-bold font-mono uppercase tracking-wider hover:opacity-90 transition shrink-0 disabled:opacity-60"
        >
          {status === 'loading' ? (
            <span className="animate-pulse">...</span>
          ) : (
            <>Alert Me <ArrowRight className="w-3.5 h-3.5" /></>
          )}
        </button>
      </form>
      {status === 'error' && (
        <p className="flex items-center gap-1.5 text-[11px] text-neon-flamingo font-mono">
          <X className="w-3 h-3" /> {errorMsg}
        </p>
      )}
      <p className="text-[10px] text-off-white/30 font-mono">No spam. One email on launch day only.</p>
    </div>
  )
}
