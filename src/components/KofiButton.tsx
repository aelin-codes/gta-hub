import { Heart } from 'lucide-react'

// ponytail: static link — replace REPLACE_WITH_YOUR_KOFI_USERNAME with your Ko-fi handle
// Sign up free at https://ko-fi.com — connect PayPal, no PAN card required
const KOFI_URL = 'https://ko-fi.com/REPLACE_WITH_YOUR_KOFI_USERNAME'

interface KofiButtonProps {
  variant?: 'compact' | 'full'
  className?: string
}

export default function KofiButton({ variant = 'compact', className = '' }: KofiButtonProps) {
  if (variant === 'full') {
    return (
      <a
        href={KOFI_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#FF5E5B]/10 hover:bg-[#FF5E5B]/20 border border-[#FF5E5B]/30 hover:border-[#FF5E5B]/60 transition-all duration-200 no-underline ${className}`}
      >
        <Heart className="w-5 h-5 text-[#FF5E5B] fill-current group-hover:scale-110 transition-transform" />
        <div>
          <p className="text-sm font-bold text-off-white">Support GTA Hub</p>
          <p className="text-[11px] text-off-white/50 font-mono">Buy us a coffee on Ko-fi — keeps the site running</p>
        </div>
      </a>
    )
  }

  return (
    <a
      href={KOFI_URL}
      target="_blank"
      rel="noopener noreferrer"
      title="Support GTA Hub on Ko-fi"
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold font-mono uppercase tracking-wider bg-[#FF5E5B]/15 hover:bg-[#FF5E5B]/25 text-[#FF5E5B] border border-[#FF5E5B]/30 hover:border-[#FF5E5B]/60 transition-all duration-200 no-underline shrink-0 ${className}`}
    >
      <Heart className="w-3 h-3 fill-current" />
      Support
    </a>
  )
}
