'use client'

import { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger with GSAP
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Procedural buildings component for the skyline
function Buildings({ count = 35, zIndex = -10, color = "#0F2E33", speedMultiplier = 1 }) {
  const meshRef = useRef<THREE.Group>(null)
  
  // Create random widths, heights, and positions for buildings
  const [buildingsData] = useState(() => {
    const data = []
    const spacing = 1.2
    const startX = -(count * spacing) / 2
    for (let i = 0; i < count; i++) {
      const height = 2 + Math.random() * 5
      const width = 0.5 + Math.random() * 0.8
      data.push({
        position: [startX + i * spacing + (Math.random() - 0.5) * 0.2, height / 2 - 2, zIndex],
        scale: [width, height, 0.5] as [number, number, number]
      })
    }
    return data
  })

  // Micro-parallax on cursor hover
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!meshRef.current) return
      const x = (e.clientX / window.innerWidth - 0.5) * 0.4 * speedMultiplier
      gsap.to(meshRef.current.position, { x, duration: 0.8, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [speedMultiplier])

  return (
    <group ref={meshRef}>
      {buildingsData.map((data, i) => (
        <mesh key={i} position={data.position as [number, number, number]}>
          <boxGeometry args={data.scale} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}

// Floating neon grid for the retro Vice City sun-belt aesthetic
function NeonGrid({ color = '#FF3D81' }) {
  const gridRef = useRef<THREE.LineSegments>(null)

  useFrame((state) => {
    if (gridRef.current) {
      // Slowly animate the grid scrolling forward
      const material = gridRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(state.clock.getElapsedTime() * 2) * 0.1
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[40, 40, color, color]}
      position={[0, -2, -5]}
      rotation={[Math.PI / 2.5, 0, 0]}
    />
  )
}

// Simulated neon signs that flicker in the skyline
function NeonSigns() {
  const sign1 = useRef<THREE.Mesh>(null)
  const sign2 = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    // Neon flickering math
    if (sign1.current) {
      const mat = sign1.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.random() > 0.98 ? 0.2 : (Math.random() > 0.05 ? 1 : 0.4)
    }
    if (sign2.current) {
      const mat = sign2.current.material as THREE.MeshBasicMaterial
      mat.opacity = Math.sin(time * 5) > 0 ? 1 : 0.3
    }
  })

  return (
    <group>
      {/* Flamingo pink sign */}
      <mesh ref={sign1} position={[-2, 1, -8]}>
        <boxGeometry args={[0.6, 0.2, 0.1]} />
        <meshBasicMaterial color="#FF3D81" transparent />
      </mesh>
      {/* Sunset orange sign */}
      <mesh ref={sign2} position={[3, 2, -9]}>
        <boxGeometry args={[0.4, 0.4, 0.1]} />
        <meshBasicMaterial color="#FF7A45" transparent />
      </mesh>
    </group>
  )
}

export default function SkylineHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const skyBgRef = useRef<HTMLDivElement>(null)
  
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

    // Scroll-driven animation from Day -> Dusk -> Night
    // We animate CSS backgrounds and properties based on viewport scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    })

    // Sky colors: Day (Teal-blue) -> Dusk (Sunset Orange/Pink) -> Night (Midnight Teal)
    tl.to(skyBgRef.current, {
      background: 'linear-gradient(to bottom, #0B1E23 0%, #0F2E33 100%)', // Night
      duration: 1
    })

    // Parallax text scroll
    gsap.to(textContainerRef.current, {
      y: 180,
      opacity: 0,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom 20%',
        scrub: true
      }
    })

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [reducedMotion])

  if (!mounted) return null

  // Graceful fallback for mobile or prefers-reduced-motion (Section 2/9)
  if (reducedMotion) {
    return (
      <div className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F2E33] to-[#0B1E23] border-b border-deep-teal">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neon-flamingo/10 via-transparent to-transparent"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-7xl sm:text-9xl font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange animate-flicker select-none leading-none">
            LEONIDA CALLS
          </h1>
          <p className="mt-6 text-xl sm:text-2xl text-off-white/80 uppercase tracking-widest font-semibold max-w-2xl mx-auto">
            Find the secrets. Master the missions. Track the maps.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative h-[95vh] w-full overflow-hidden border-b border-deep-teal">
      
      {/* Sky Background Element controlled by GSAP */}
      <div 
        ref={skyBgRef}
        className="absolute inset-0 z-0 transition-all duration-300"
        style={{
          background: 'linear-gradient(to bottom, #1FA9A0 0%, #FF7A45 60%, #FF3D81 100%)' // Day/Dusk starter
        }}
      />

      {/* R3F Canvas representing the 3D Parallax Skyline */}
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.6} />
          
          {/* Night Stars that slowly fade in */}
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1} />
          
          {/* Foreground & Midground building layers */}
          <Buildings count={25} zIndex={-6} color="#0B1E23" speedMultiplier={0.3} />
          <Buildings count={35} zIndex={-10} color="#071518" speedMultiplier={0.15} />
          <Buildings count={45} zIndex={-15} color="#03080A" speedMultiplier={0.08} />
          
          {/* Neon signs on buildings */}
          <NeonSigns />

          {/* Glowing ground grid lines */}
          <NeonGrid color="#FF3D81" />
        </Canvas>
      </div>

      {/* Floating Retro-style Title Content */}
      <div 
        ref={textContainerRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none px-4 select-none"
      >
        <h1 className="text-7xl sm:text-[10rem] font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-off-white via-off-white to-off-white/70 filter drop-shadow-[0_5px_15px_rgba(255,61,129,0.3)] leading-none">
          LEONIDA CALLS
        </h1>
        <p className="mt-4 text-sm sm:text-lg text-off-white uppercase tracking-[0.6em] font-semibold max-w-2xl">
          Everything GTA 6. Categorized and search-ready.
        </p>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-65 animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-widest text-off-white/60 mb-2">Scroll Down</span>
          <div className="w-5 h-8 border border-off-white/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-neon-flamingo rounded-full" />
          </div>
        </div>
      </div>

    </div>
  )
}
