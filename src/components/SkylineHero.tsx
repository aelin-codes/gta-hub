'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Play, Map, Users, ArrowRight, Sparkles } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function SkylineHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  
  const [reducedMotion, setReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    mediaQuery.addEventListener('change', handleMotionChange)

    if (reducedMotion) return

    // Subtle parallax effect on scroll
    if (containerRef.current && imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 18,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      })
    }

    if (textContainerRef.current) {
      gsap.to(textContainerRef.current, {
        y: 120,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom 30%',
          scrub: true,
        }
      })
    }

    // Micro-parallax on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || reducedMotion) return
      const x = (e.clientX / window.innerWidth - 0.5) * 14
      const y = (e.clientY / window.innerHeight - 0.5) * 10
      gsap.to(imageRef.current, {
        x,
        y: y + 10,
        duration: 1.2,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      mediaQuery.removeEventListener('change', handleMotionChange)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [reducedMotion])

  if (!mounted) return null

  return (
    <div ref={containerRef} className="relative h-[95vh] w-full overflow-hidden border-b border-deep-teal/80 bg-[#07090E] select-none">
      
      {/* 1. Official 4K GTA 6 Cover Artwork Background with Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imageRef}
          src="/images/gta6-cover.jpg"
          alt="Grand Theft Auto VI — Lucia & Jason Vice City Artwork"
          className="w-full h-full object-cover object-[center_30%] scale-105 will-change-transform filter brightness-95 contrast-105"
        />

        {/* Cinematic Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/40 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090E]/85 via-transparent to-[#07090E]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,9,14,0.7)_100%)] pointer-events-none" />
        
        {/* Subtle Palm Neon Sunset Glow Tint */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,42,133,0.12)_0%,rgba(0,229,255,0.06)_50%,transparent_100%)] pointer-events-none" />
      </div>

      {/* 2. Floating Night Stars (Three.js subtle canvas) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <Stars radius={90} depth={40} count={1200} factor={3} saturation={0.8} fade speed={0.8} />
        </Canvas>
      </div>

      {/* 3. Hero Content Overlay */}
      <div 
        ref={textContainerRef}
        className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center space-y-6 pt-12"
      >
        {/* GTA VI Lore Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#07090E]/85 border border-neon-flamingo/40 backdrop-blur-md text-neon-flamingo text-xs font-mono uppercase tracking-widest shadow-[0_0_20px_rgba(255,42,133,0.3)] animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" />
          <span>State of Leonida • Vice City Intelligence</span>
        </div>

        {/* Main Title */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-off-white via-off-white to-off-white/75 filter drop-shadow-[0_8px_30px_rgba(255,42,133,0.4)] leading-none">
          LEONIDA CALLS
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-off-white/80 font-mono tracking-wide uppercase">
          Everything GTA 6. Interactive Radar Atlas, AI Schematic Search, and Biometric Criminal Dossiers.
        </p>

        {/* Quick Launch Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/en/library/gta6-official-trailer-1"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_25px_rgba(255,42,133,0.4)] hover:scale-105 hover:shadow-[0_0_35px_rgba(255,42,133,0.6)] transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Official 4K Trailer</span>
          </Link>

          <Link
            href="/en/wiki"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#101724]/90 border border-palm-teal/40 hover:border-palm-teal text-palm-teal hover:text-white font-mono text-xs uppercase font-bold tracking-wider backdrop-blur-md hover:scale-105 shadow-lg transition-all cursor-pointer"
          >
            <Map className="w-4 h-4" />
            <span>Satellite Radar Map</span>
          </Link>

          <Link
            href="/en/characters"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#101724]/90 border border-deep-teal hover:border-neon-flamingo/50 text-off-white/80 hover:text-white font-mono text-xs uppercase font-bold tracking-wider backdrop-blur-md hover:scale-105 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span>Syndicate Dossiers</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-70 animate-bounce pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-off-white/60 mb-2">Scroll Down</span>
          <div className="w-5 h-8 border border-off-white/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-neon-flamingo rounded-full" />
          </div>
        </div>

      </div>

    </div>
  )
}
