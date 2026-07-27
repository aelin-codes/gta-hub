'use client'

import Link from 'next/link'
import { Home, Compass } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="bg-midnight-teal min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-8xl font-display text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal neon-glow-flamingo animate-flicker">
          404
        </h1>
        <h2 className="text-2xl font-bold uppercase tracking-wider text-off-white">
          Wasted / Page Not Found
        </h2>
        <p className="text-sm text-off-white/60 max-w-md mx-auto leading-relaxed">
          You wandered off the Vice City map. The page you are looking for has been moved, deleted, or never existed in the first place.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/en"
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:opacity-90 transition interactive-hover"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          href="/en/library"
          className="flex items-center space-x-2 px-6 py-3 bg-deep-teal hover:bg-palm-teal/20 text-off-white rounded-xl border border-deep-teal hover:border-palm-teal/40 transition text-xs font-bold uppercase tracking-wider interactive-hover"
        >
          <Compass className="w-4 h-4" />
          <span>Go to Library</span>
        </Link>
      </div>
    </div>
  )
}
