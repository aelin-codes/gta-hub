'use client'

import { useState, useEffect, useRef } from 'react'
import { Radio, Volume2, VolumeX, Play, Pause, ChevronDown, ChevronUp, Music, Sparkles } from 'lucide-react'
import { soundFx } from './GtaSoundEffects'

interface Station {
  id: string
  name: string
  freq: string
  genre: string
  color: string
  scale: number[]
  tempo: number
  waveType: OscillatorType
}

const STATIONS: Station[] = [
  {
    id: 'flash-fm',
    name: 'Flash FM',
    freq: '102.9 MHz',
    genre: '80s Synth Pop & Sunshine',
    color: 'from-neon-flamingo to-pink-400',
    scale: [261.63, 329.63, 392.00, 523.25, 493.88, 392.00], // C major arpeggio
    tempo: 124,
    waveType: 'sawtooth',
  },
  {
    id: 'wave-103',
    name: 'Wave 103',
    freq: '103.2 MHz',
    genre: 'Dark Wave & Neon Electro',
    color: 'from-palm-teal to-cyan-400',
    scale: [220.00, 261.63, 329.63, 392.00, 440.00, 329.63], // A minor electro
    tempo: 128,
    waveType: 'square',
  },
  {
    id: 'v-rock',
    name: 'V-Rock',
    freq: '98.7 MHz',
    genre: 'Heavy Metal & Guitar Solos',
    color: 'from-sunset-orange to-rose-600',
    scale: [164.81, 196.00, 220.00, 246.94, 293.66, 329.63], // E minor pentatonic power
    tempo: 140,
    waveType: 'sawtooth',
  },
  {
    id: 'wild-94',
    name: 'Wild 94.1',
    freq: '94.1 MHz',
    genre: 'Leonida 808 Trap & Hip Hop',
    color: 'from-purple-500 to-indigo-500',
    scale: [110.00, 146.83, 164.81, 220.00, 146.83], // Deep 808 bass notes
    tempo: 132,
    waveType: 'triangle',
  },
  {
    id: 'radio-espantoso',
    name: 'Radio Espantoso',
    freq: '96.4 MHz',
    genre: 'Latin Jazz & Cuban Salsa',
    color: 'from-amber-400 to-sunset-orange',
    scale: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88], // Upbeat Latin
    tempo: 118,
    waveType: 'sine',
  },
]

export default function GtaRadioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStationIdx, setCurrentStationIdx] = useState(0)
  const [minimized, setMinimized] = useState(true)
  const [volume, setVolume] = useState(0.2)
  const [isMuted, setIsMuted] = useState(false)

  const audioCtxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const loopTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const stepRef = useRef(0)

  const station = STATIONS[currentStationIdx]

  // Setup Web Audio
  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      audioCtxRef.current = new AudioCtx()
      masterGainRef.current = audioCtxRef.current.createGain()
      masterGainRef.current.gain.value = isMuted ? 0 : volume
      masterGainRef.current.connect(audioCtxRef.current.destination)
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(() => {})
    }
    return { ctx: audioCtxRef.current, masterGain: masterGainRef.current }
  }

  // Synth step sequencer playing music loop
  const playNextNote = () => {
    if (!isPlaying) return
    const { ctx, masterGain } = getAudioContext()
    if (!ctx || !masterGain) return

    const now = ctx.currentTime
    const notes = station.scale
    const freq = notes[stepRef.current % notes.length]
    stepRef.current++

    // Synthesize note
    const osc = ctx.createOscillator()
    const noteGain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    osc.type = station.waveType
    osc.frequency.setValueAtTime(freq, now)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(2200, now)
    filter.frequency.exponentialRampToValueAtTime(600, now + 0.25)

    noteGain.gain.setValueAtTime(0.08, now)
    noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

    osc.connect(filter)
    filter.connect(noteGain)
    noteGain.connect(masterGain)

    osc.start(now)
    osc.stop(now + 0.28)

    // Schedule next beat
    const beatInterval = (60 / station.tempo) * 1000 * 0.5
    loopTimeoutRef.current = setTimeout(playNextNote, beatInterval)
  }

  useEffect(() => {
    if (isPlaying) {
      playNextNote()
    } else {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
    }
    return () => {
      if (loopTimeoutRef.current) clearTimeout(loopTimeoutRef.current)
    }
  }, [isPlaying, currentStationIdx])

  const togglePlay = () => {
    soundFx.playClick()
    setIsPlaying((prev) => !prev)
  }

  const nextStation = () => {
    soundFx.playClick()
    setCurrentStationIdx((prev) => (prev + 1) % STATIONS.length)
  }

  const prevStation = () => {
    soundFx.playClick()
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
              ? 'border-neon-flamingo shadow-[0_0_20px_rgba(255,61,129,0.5)]'
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
        <div className="w-72 sm:w-80 rounded-3xl bg-midnight-teal/95 border border-deep-teal shadow-2xl backdrop-blur-xl p-5 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-deep-teal/50 pb-2">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-neon-flamingo animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-off-white">
                VICE CITY AIRWAVES
              </span>
            </div>
            <button
              onClick={() => setMinimized(true)}
              aria-label="Minimize radio"
              className="p-1 rounded-full text-off-white/50 hover:text-off-white hover:bg-white/5 transition"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Station Display LCD */}
          <div className="rounded-2xl bg-black/60 border border-deep-teal/80 p-3.5 space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-palm-teal uppercase">{station.freq}</span>
              <span className="text-sunset-orange uppercase tracking-wider">STEREO FM</span>
            </div>

            <div className="text-center py-1">
              <h4 className="text-xl font-display uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal">
                {station.name}
              </h4>
              <p className="text-[10px] font-mono text-off-white/60 truncate mt-0.5">
                {station.genre}
              </p>
            </div>

            {/* Dancing Equalizer Bars */}
            <div className="flex items-end justify-center gap-1 h-5 pt-1">
              {[40, 80, 50, 95, 70, 85, 60, 90, 45, 75].map((h, i) => (
                <span
                  key={i}
                  className="w-1 rounded-t-sm bg-gradient-to-t from-palm-teal to-neon-flamingo transition-all duration-150"
                  style={{
                    height: isPlaying ? `${Math.max(15, (h * (stepRef.current % 4 + 1)) % 100)}%` : '15%',
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
              className="px-2.5 py-1.5 rounded-xl bg-deep-teal/50 hover:bg-deep-teal text-off-white text-xs font-mono transition"
            >
              ◀ PREV
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause radio' : 'Play radio'}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            {/* Next station */}
            <button
              onClick={nextStation}
              aria-label="Next station"
              className="px-2.5 py-1.5 rounded-xl bg-deep-teal/50 hover:bg-deep-teal text-off-white text-xs font-mono transition"
            >
              NEXT ▶
            </button>
          </div>

          {/* Mute & Close */}
          <div className="flex items-center justify-between text-xs text-off-white/50 pt-2 border-t border-deep-teal/40">
            <button
              onClick={toggleMute}
              className="flex items-center gap-1.5 hover:text-off-white transition text-[11px] font-mono"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 text-palm-teal" />}
              <span>{isMuted ? 'Muted' : 'Sound ON'}</span>
            </button>

            <span className="text-[10px] font-mono text-off-white/40">
              Live Synth Radio
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
