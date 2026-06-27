'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Play, ShieldAlert, Award, Clock } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SkylineHero = dynamic(() => import('@/components/SkylineHero'), {
  ssr: false,
  loading: () => (
    <div className="relative h-[95vh] w-full bg-gradient-to-b from-[#0F2E33] to-[#0B1E23] flex items-center justify-center">
      <div className="text-off-white/40 font-mono text-xs uppercase tracking-widest animate-pulse">
        Initializing 3D Skyline...
      </div>
    </div>
  )
})

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  // Target date: October 27, 2026
  const targetDate = new Date('2026-10-27T00:00:00')
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [heroInView, setHeroInView] = useState(false)
  const heroContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date()
      let timeLeftData = { days: 0, hours: 0, minutes: 0, seconds: 0 }

      if (difference > 0) {
        timeLeftData = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }
      setTimeLeft(timeLeftData)
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (heroContainerRef.current) {
      observer.observe(heroContainerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex flex-col bg-midnight-teal min-h-screen">
      
      {/* 1. 3D Parallax Skyline Hero (Lazy Loaded) */}
      <div ref={heroContainerRef} className="min-h-[95vh] w-full bg-gradient-to-b from-[#0F2E33] to-[#0B1E23]">
        {heroInView ? (
          <SkylineHero />
        ) : (
          <div className="relative h-[95vh] w-full flex items-center justify-center">
            <div className="text-off-white/40 font-mono text-xs uppercase tracking-widest animate-pulse">
              Initializing 3D Skyline...
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full space-y-24">
        
        {/* Unofficial Portal Legal Disclaimer (Section 9 / Legal shit.txt) */}
        <div className="bg-sunset-orange/15 border border-sunset-orange/30 rounded-2xl p-4 text-xs text-center text-sunset-orange font-semibold">
          GTA VI HUB IS AN UNOFFICIAL FAN PORTAL. IT IS NOT AFFILIATED WITH, SPONSORED BY, OR ENDORSED BY ROCKSTAR GAMES OR TAKE-TWO INTERACTIVE.
        </div>

        {/* Countdown Timer Component */}
        <section className="relative overflow-hidden bg-deep-teal/40 rounded-3xl p-8 md:p-12 border border-deep-teal/80 shadow-xl text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neon-flamingo/5 via-transparent to-transparent" />
          <h2 className="text-3xl sm:text-5xl font-display uppercase tracking-widest text-off-white mb-6">
            COUNTDOWN TO LEONIDA
          </h2>
          <p className="text-xs uppercase font-mono tracking-widest text-palm-teal mb-8">
            Estimated Rockstar Release Window — October 2026
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-midnight-teal/80 border border-deep-teal p-5 rounded-2xl flex flex-col items-center">
                <span className="text-4xl sm:text-6xl font-display text-transparent bg-clip-text bg-gradient-to-b from-neon-flamingo to-sunset-orange filter drop-shadow-[0_2px_8px_rgba(255,61,129,0.3)]">
                  {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-off-white/50 mt-2">
                  {unit}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Trailer & Details Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-display uppercase tracking-widest text-off-white mb-6 leading-none">
              WELCOME TO THE NEXT GENERATION
            </h2>
            <p className="text-off-white/70 leading-relaxed mb-6">
              Grand Theft Auto VI heads to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet. 
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href={`/${locale}/library`} 
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white font-bold uppercase tracking-wider rounded-xl hover:opacity-95 transition shadow-lg"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Explore Video Library</span>
              </Link>
              <Link 
                href={`/${locale}/wiki`} 
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-deep-teal hover:bg-palm-teal/20 text-off-white border border-deep-teal hover:border-palm-teal/40 font-bold uppercase tracking-wider rounded-xl transition"
              >
                <span>Interactive Wiki</span>
              </Link>
            </div>
          </div>

          {/* Official Trailer Video Embed */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border border-deep-teal/60 bg-black">
            <iframe 
              src="https://www.youtube.com/embed/QdBZY2fkU-0" 
              title="Grand Theft Auto VI Trailer 1"
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </section>

        {/* 4. Trending Features */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-deep-teal/30 p-8 rounded-2xl border border-deep-teal/60">
            <div className="w-12 h-12 bg-neon-flamingo/10 text-neon-flamingo rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-3">Timestamp Navigation</h3>
            <p className="text-xs text-off-white/60 leading-relaxed">
              Skip directly to secret weapon caches or unmarked map easter eggs inside guides with deep-linked video timestamps.
            </p>
          </div>

          <div className="bg-deep-teal/30 p-8 rounded-2xl border border-deep-teal/60">
            <div className="w-12 h-12 bg-sunset-orange/10 text-sunset-orange rounded-xl flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-3">AI Tagging & Sorting</h3>
            <p className="text-xs text-off-white/60 leading-relaxed">
              We parse and analyze community guides with Gemini, sorting everything into clean categories so you don't scroll through hundreds of duplicates.
            </p>
          </div>

          <div className="bg-deep-teal/30 p-8 rounded-2xl border border-deep-teal/60">
            <div className="w-12 h-12 bg-palm-teal/10 text-palm-teal rounded-xl flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold uppercase tracking-wider text-off-white mb-3">Unofficial Fan Site</h3>
            <p className="text-xs text-off-white/60 leading-relaxed">
              This is a community-owned portal. All creator credits are preserved, and embeds links back directly to channels.
            </p>
          </div>
        </section>

      </div>
    </div>
  )
}
