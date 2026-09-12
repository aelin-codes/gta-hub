'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Radio, Volume2, VolumeX, Play, Pause, ChevronDown, Music, Sparkles } from 'lucide-react'
import { soundFx } from './GtaSoundEffects'

interface Station {
  id: string
  name: string
  freq: string
  dj: string
  nowPlaying: string
  genre: string
  color: string
  tempo: number
  leadWave: OscillatorType
  bassWave: OscillatorType
  cutoff: number
  // 16-step patterns
  kick: number[]
  snare: number[]
  hihat: number[]
  bass: number[] // frequencies in Hz (0 = rest)
  lead: number[] // frequencies in Hz (0 = rest)
}

// Pre-computed musical notes
const N = {
  REST: 0,
  // Bass Octave 2
  C2: 65.41, D2: 73.42, E2: 82.41, F2: 87.31, G2: 98.00, A2: 110.00, B2: 123.47,
  // Mid Octave 3
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
  // Lead Octave 4
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
  // High Octave 5
  C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, A5: 880.00,
}

const STATIONS: Station[] = [
  {
    id: 'flash-fm',
    name: 'Flash FM',
    freq: '102.9 MHz',
    dj: 'Toni',
    nowPlaying: 'Laura Branigan - Self Control (Vice Night Remaster)',
    genre: '80s Synth Pop & Sunshine Disco',
    color: 'from-neon-flamingo to-pink-400',
    tempo: 122,
    leadWave: 'sawtooth',
    bassWave: 'sawtooth',
    cutoff: 2400,
    // Four on the floor disco kick
    kick:  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Upbeat pulsing 80s bassline
    bass:  [N.A2, N.A2, N.A2, N.C3, N.D3, N.D3, N.D3, N.F2, N.G2, N.G2, N.G2, N.E2, N.A2, N.A2, N.C3, N.E3],
    // Catchy synth melody
    lead:  [N.E4, N.REST, N.A4, N.C5, N.B4, N.REST, N.G4, N.REST, N.A4, N.E4, N.REST, N.C4, N.D4, N.E4, N.G4, N.E4],
  },
  {
    id: 'wave-103',
    name: 'Wave 103',
    freq: '103.2 MHz',
    dj: 'Adam First',
    nowPlaying: 'New Order - Blue Monday (Leonida Cyber Mix)',
    genre: 'Darkwave, Post-Punk & Cyber Electro',
    color: 'from-palm-teal to-cyan-400',
    tempo: 128,
    leadWave: 'square',
    bassWave: 'square',
    cutoff: 1800,
    // Driving electro beat
    kick:  [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    hihat: [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    // Punchy minor bass sequence
    bass:  [N.D2, N.D2, N.D3, N.D2, N.F2, N.F2, N.C3, N.C2, N.G2, N.G2, N.D3, N.G2, N.A2, N.A2, N.C3, N.D2],
    // Haunting synth lead
    lead:  [N.D4, N.F4, N.A4, N.D5, N.C5, N.A4, N.F4, N.REST, N.G4, N.A4, N.C5, N.REST, N.A4, N.F4, N.E4, N.D4],
  },
  {
    id: 'v-rock',
    name: 'V-Rock',
    freq: '98.7 MHz',
    dj: 'Couzin Ed',
    nowPlaying: "Judas Priest - You've Got Another Thing Comin'",
    genre: 'Hard Rock, Glam & Heavy Metal Riffs',
    color: 'from-sunset-orange to-rose-600',
    tempo: 136,
    leadWave: 'sawtooth',
    bassWave: 'sawtooth',
    cutoff: 3200,
    // Rock double-kick drive
    kick:  [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    snare: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Heavy E-minor power chug
    bass:  [N.E2, N.E2, N.E2, N.G2, N.E2, N.E2, N.A2, N.B2, N.E2, N.E2, N.D3, N.B2, N.A2, N.G2, N.E2, N.G2],
    // Blistering rock pentatonic riffs
    lead:  [N.E4, N.G4, N.E4, N.B4, N.D5, N.B4, N.A4, N.G4, N.E4, N.REST, N.G4, N.A4, N.B4, N.D5, N.E5, N.REST],
  },
  {
    id: 'wild-94',
    name: 'Wild 94.1',
    freq: '94.1 MHz',
    dj: 'DJ Pooh',
    nowPlaying: 'Metro Boomin x Denzel Curry - Leonida Heatwave 808',
    genre: 'Leonida Trap & Deep Sub-Bass Hip-Hop',
    color: 'from-purple-500 to-indigo-500',
    tempo: 132,
    leadWave: 'triangle',
    bassWave: 'sine',
    cutoff: 1200,
    // Trap kick with syncopated bounce
    kick:  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    snare: [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    // Rhythmic 16th + 32nd hi-hat rolls
    hihat: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // Sliding 808 sub bass notes
    bass:  [N.C2, N.REST, N.REST, N.C2, N.REST, N.REST, N.F2, N.REST, N.G2, N.REST, N.REST, N.G2, N.REST, N.E2, N.REST, N.C2],
    // Atmospheric eerie trap melody
    lead:  [N.C4, N.REST, 311.13, N.REST, N.G4, N.REST, N.C5, N.REST, 466.16, N.REST, N.G4, N.REST, N.F4, N.REST, 311.13, N.REST],
  },
  {
    id: 'radio-espantoso',
    name: 'Radio Espantoso',
    freq: '96.4 MHz',
    dj: 'Pepe',
    nowPlaying: 'Tito Puente - Oye Como Va (Havana Rework)',
    genre: 'Cuban Salsa, Mambo & Latin Jazz',
    color: 'from-amber-400 to-sunset-orange',
    tempo: 118,
    leadWave: 'sine',
    bassWave: 'triangle',
    cutoff: 2800,
    // 3-2 Son Clave rhythm
    kick:  [1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0],
    snare: [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    hihat: [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    // Latin tumbao bassline
    bass:  [N.C3, N.REST, N.G2, N.C3, N.REST, N.E3, N.F3, N.REST, N.G3, N.REST, N.D3, N.G3, N.REST, N.B2, N.C3, N.REST],
    // Salsa piano montuno arpeggios
    lead:  [N.E4, N.G4, N.C5, N.E4, N.G4, N.C5, N.F4, N.A4, N.D5, N.F4, N.A4, N.D5, N.G4, N.B4, N.D5, N.C5],
  },
]

export default function GtaRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStationIdx, setCurrentStationIdx] = useState(0)
  const [minimized, setMinimized] = useState(true)
  const [volume, setVolume] = useState(0.25)
  const [isMuted, setIsMuted] = useState(false)
  const [isTuning, setIsTuning] = useState(false)
  const [eqLevels, setEqLevels] = useState<number[]>([30, 60, 45, 80, 55, 90, 40, 70, 50, 65])

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const noiseBufferRef = useRef<AudioBuffer | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const stepRef = useRef<number>(0)

  const station = STATIONS[currentStationIdx]

  // Setup Web Audio Context with Noise Buffer for real percussion
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
      masterGainRef.current = audioCtxRef.current.createGain()
      masterGainRef.current.gain.value = isMuted ? 0 : volume
      masterGainRef.current.connect(audioCtxRef.current.destination)

      // Create 1-second white noise buffer for drums & static
      const sampleRate = audioCtxRef.current.sampleRate
      const buffer = audioCtxRef.current.createBuffer(1, sampleRate, sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < sampleRate; i++) {
        data[i] = Math.random() * 2 - 1
      }
      noiseBufferRef.current = buffer
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return { ctx: audioCtxRef.current, masterGain: masterGainRef.current }
  }, [isMuted, volume])

  // Play realistic radio tuning static burst
  const playTuningStatic = useCallback(() => {
    const { ctx, masterGain } = getAudioContext()
    if (!ctx || !masterGain || !noiseBufferRef.current) return

    setIsTuning(true)
    const now = ctx.currentTime
    const noiseSource = ctx.createBufferSource()
    noiseSource.buffer = noiseBufferRef.current

    const bandpass = ctx.createBiquadFilter()
    bandpass.type = 'bandpass'
    bandpass.frequency.setValueAtTime(1400, now)
    bandpass.frequency.linearRampToValueAtTime(800, now + 0.22)
    bandpass.Q.setValueAtTime(3.0, now)

    const staticGain = ctx.createGain()
    staticGain.gain.setValueAtTime(0.18, now)
    staticGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25)

    noiseSource.connect(bandpass)
    bandpass.connect(staticGain)
    staticGain.connect(masterGain)

    noiseSource.start(now)
    noiseSource.stop(now + 0.25)

    setTimeout(() => setIsTuning(false), 260)
  }, [getAudioContext])

  // Sequencer beat tick
  const tickStep = useCallback(() => {
    if (!isPlaying) return
    const { ctx, masterGain } = getAudioContext()
    if (!ctx || !masterGain) return

    const now = ctx.currentTime
    const step = stepRef.current % 16
    stepRef.current++

    const isTrap = station.id === 'wild-94'

    // 1. Kick Drum
    if (station.kick[step]) {
      const kickOsc = ctx.createOscillator()
      const kickGain = ctx.createGain()
      kickOsc.type = 'sine'
      const startFreq = isTrap ? 110 : 150
      const endFreq = isTrap ? 32 : 0.01
      const dur = isTrap ? 0.35 : 0.18

      kickOsc.frequency.setValueAtTime(startFreq, now)
      kickOsc.frequency.exponentialRampToValueAtTime(endFreq, now + dur)
      kickGain.gain.setValueAtTime(0.28, now)
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + dur)

      kickOsc.connect(kickGain)
      kickGain.connect(masterGain)
      kickOsc.start(now)
      kickOsc.stop(now + dur)
    }

    // 2. Snare / Clap
    if (station.snare[step] && noiseBufferRef.current) {
      const snareNoise = ctx.createBufferSource()
      snareNoise.buffer = noiseBufferRef.current
      const snareFilter = ctx.createBiquadFilter()
      snareFilter.type = 'bandpass'
      snareFilter.frequency.setValueAtTime(1200, now)

      const snareGain = ctx.createGain()
      snareGain.gain.setValueAtTime(0.15, now)
      snareGain.gain.exponentialRampToValueAtTime(0.001, now + 0.16)

      snareNoise.connect(snareFilter)
      snareFilter.connect(snareGain)
      snareGain.connect(masterGain)
      snareNoise.start(now)
      snareNoise.stop(now + 0.16)
    }

    // 3. Hi-Hat
    if (station.hihat[step] && noiseBufferRef.current) {
      const hatNoise = ctx.createBufferSource()
      hatNoise.buffer = noiseBufferRef.current
      const hatFilter = ctx.createBiquadFilter()
      hatFilter.type = 'highpass'
      hatFilter.frequency.setValueAtTime(7500, now)

      const hatGain = ctx.createGain()
      const hatVol = step % 4 === 0 ? 0.07 : 0.035
      hatGain.gain.setValueAtTime(hatVol, now)
      hatGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      hatNoise.connect(hatFilter)
      hatFilter.connect(hatGain)
      hatGain.connect(masterGain)
      hatNoise.start(now)
      hatNoise.stop(now + 0.05)
    }

    // 4. Bassline Voice
    const bassFreq = station.bass[step]
    if (bassFreq > 0) {
      const bassOsc = ctx.createOscillator()
      const bassFilter = ctx.createBiquadFilter()
      const bassGain = ctx.createGain()

      bassOsc.type = station.bassWave
      bassOsc.frequency.setValueAtTime(bassFreq, now)

      bassFilter.type = 'lowpass'
      bassFilter.frequency.setValueAtTime(800, now)

      bassGain.gain.setValueAtTime(0.16, now)
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

      bassOsc.connect(bassFilter)
      bassFilter.connect(bassGain)
      bassGain.connect(masterGain)
      bassOsc.start(now)
      bassOsc.stop(now + 0.22)
    }

    // 5. Lead Synth Voice
    const leadFreq = station.lead[step]
    if (leadFreq > 0) {
      const leadOsc = ctx.createOscillator()
      const leadFilter = ctx.createBiquadFilter()
      const leadGain = ctx.createGain()

      leadOsc.type = station.leadWave
      leadOsc.frequency.setValueAtTime(leadFreq, now)

      leadFilter.type = 'lowpass'
      leadFilter.frequency.setValueAtTime(station.cutoff, now)
      leadFilter.frequency.exponentialRampToValueAtTime(station.cutoff * 0.4, now + 0.24)

      leadGain.gain.setValueAtTime(0.11, now)
      leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26)

      leadOsc.connect(leadFilter)
      leadFilter.connect(leadGain)
      leadGain.connect(masterGain)
      leadOsc.start(now)
      leadOsc.stop(now + 0.26)
    }

    // Update dynamic equalizer bars based on step
    const hasKick = Boolean(station.kick[step])
    const hasSnare = Boolean(station.snare[step])
    const hasLead = Boolean(station.lead[step])

    setEqLevels([
      hasKick ? 95 : 30,
      hasKick ? 85 : 40,
      bassFreq > 0 ? 90 : 35,
      bassFreq > 0 ? 80 : 45,
      hasSnare ? 85 : 30,
      hasLead ? 92 : 40,
      hasLead ? 88 : 35,
      hasSnare ? 75 : 40,
      60,
      70,
    ])

    // Schedule next 16th note
    const stepDuration = (60 / station.tempo) * 1000 * 0.25
    timerRef.current = setTimeout(tickStep, stepDuration)
  }, [getAudioContext, isPlaying, station])

  useEffect(() => {
    if (isPlaying) {
      stepRef.current = 0
      tickStep()
    } else {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [isPlaying, currentStationIdx, tickStep])

  const togglePlay = () => {
    soundFx.playClick()
    if (!isPlaying) {
      playTuningStatic()
    }
    setIsPlaying((prev) => !prev)
  }

  const nextStation = () => {
    soundFx.playClick()
    playTuningStatic()
    setCurrentStationIdx((prev) => (prev + 1) % STATIONS.length)
  }

  const prevStation = () => {
    soundFx.playClick()
    playTuningStatic()
    setCurrentStationIdx((prev) => (prev - 1 + STATIONS.length) % STATIONS.length)
  }

  const toggleMute = () => {
    soundFx.playClick()
    const newMute = !isMuted
    setIsMuted(newMute)
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = newMute ? 0 : volume
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Minimized Bubble */}
      {minimized ? (
        <button
          onClick={() => {
            soundFx.playClick()
            setMinimized(false)
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-midnight-teal/95 border shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${
            isPlaying
              ? 'border-neon-flamingo shadow-[0_0_25px_rgba(255,61,129,0.5)]'
              : 'border-deep-teal hover:border-palm-teal/50'
          }`}
          title="Open Vice City Radio Tuner"
        >
          <Radio className={`w-4 h-4 ${isPlaying ? 'text-neon-flamingo animate-pulse' : 'text-off-white/60'}`} />
          <span className="text-xs font-mono font-bold text-off-white">
            {isPlaying ? station.name : 'VC Radio'}
          </span>
          {isPlaying && (
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-neon-flamingo h-full animate-bounce" />
              <span className="w-0.5 bg-sunset-orange h-2 animate-bounce delay-75" />
              <span className="w-0.5 bg-palm-teal h-3 animate-bounce delay-150" />
            </div>
          )}
        </button>
      ) : (
        /* Expanded Radio Console */
        <div className="w-80 sm:w-96 rounded-3xl bg-[#080E14]/95 border border-deep-teal/90 shadow-2xl backdrop-blur-xl p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-deep-teal/50 pb-2">
            <div className="flex items-center gap-2">
              <Radio className={`w-4 h-4 ${isTuning ? 'text-sunset-orange animate-spin' : 'text-neon-flamingo animate-pulse'}`} />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-off-white">
                LEONIDA AIRWAVES 102.9
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized(true)}
                aria-label="Minimize radio"
                className="p-1 rounded-full text-off-white/50 hover:text-off-white hover:bg-white/5 transition"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Station Display LCD */}
          <div className="rounded-2xl bg-black/80 border border-deep-teal/90 p-4 space-y-2.5 relative overflow-hidden">
            {/* Tuning Static Glitch Overlay */}
            {isTuning && (
              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                <span className="text-xs font-mono uppercase text-sunset-orange tracking-widest animate-pulse">
                  📻 SEARCHING FREQUENCY...
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-palm-teal uppercase font-bold tracking-wider">{station.freq}</span>
              <span className="text-sunset-orange uppercase tracking-wider bg-sunset-orange/10 px-2 py-0.5 rounded border border-sunset-orange/20">
                LIVE STEREO
              </span>
            </div>

            <div className="text-center py-1">
              <h4 className="text-2xl font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal">
                {station.name}
              </h4>
              <p className="text-[11px] font-mono text-off-white/60 truncate mt-0.5">
                {station.genre}
              </p>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-[10px] font-mono text-neon-flamingo/90 bg-neon-flamingo/10 py-1 px-2.5 rounded-full mx-auto max-w-[90%] truncate">
                <Music className="w-3 h-3 shrink-0" />
                <span className="truncate">{station.nowPlaying}</span>
              </div>
            </div>

            {/* Dancing Equalizer Bars */}
            <div className="flex items-end justify-center gap-1.5 h-6 pt-1">
              {eqLevels.map((lvl, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-t-sm bg-gradient-to-t from-palm-teal via-sunset-orange to-neon-flamingo transition-all duration-100"
                  style={{
                    height: isPlaying ? `${lvl}%` : '15%',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between pt-1">
            {/* Prev station */}
            <button
              onClick={prevStation}
              aria-label="Previous station"
              className="px-3 py-2 rounded-xl bg-deep-teal/60 hover:bg-deep-teal text-off-white text-xs font-mono font-bold tracking-wider transition hover:text-palm-teal border border-deep-teal/40"
            >
              ◀ PREV
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,61,129,0.4)] hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
            </button>

            {/* Next station */}
            <button
              onClick={nextStation}
              aria-label="Next station"
              className="px-3 py-2 rounded-xl bg-deep-teal/60 hover:bg-deep-teal text-off-white text-xs font-mono font-bold tracking-wider transition hover:text-palm-teal border border-deep-teal/40"
            >
              NEXT ▶
            </button>
          </div>

          {/* Stations Quick Selector */}
          <div className="grid grid-cols-5 gap-1 pt-1">
            {STATIONS.map((stn, idx) => (
              <button
                key={stn.id}
                onClick={() => {
                  soundFx.playClick()
                  playTuningStatic()
                  setCurrentStationIdx(idx)
                  if (!isPlaying) setIsPlaying(true)
                }}
                className={`text-[9px] font-mono py-1 rounded border transition text-center truncate ${
                  currentStationIdx === idx
                    ? 'border-neon-flamingo bg-neon-flamingo/20 text-white font-bold'
                    : 'border-deep-teal/60 text-off-white/50 hover:text-off-white hover:border-palm-teal/40'
                }`}
                title={stn.name}
              >
                {stn.name.split(' ')[0]}
              </button>
            ))}
          </div>

          {/* Mute & Sound Meta */}
          <div className="flex items-center justify-between text-xs text-off-white/50 pt-2 border-t border-deep-teal/40">
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 hover:text-off-white transition text-[11px] font-mono"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-palm-teal" />}
              <span>{isMuted ? 'Muted' : 'Volume Active'}</span>
            </button>

            <span className="text-[10px] font-mono text-off-white/40">
              DJ: {station.dj}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
