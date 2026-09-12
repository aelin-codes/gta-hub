'use client'

import { useState, useEffect } from 'react'
import { ShieldAlert, Zap, Radio, CheckCircle2, Lock, X, RefreshCw } from 'lucide-react'
import { soundFx } from './GtaSoundEffects'

interface HackingPuzzleProps {
  currentStars: number
  onReduceStar: () => void
  onClose: () => void
}

export default function GtaHackingPuzzle({
  currentStars,
  onReduceStar,
  onClose,
}: HackingPuzzleProps) {
  // Stage corresponds to current stars: 5 stars => Stage 1, 4 stars => Stage 2, etc.
  const stage = 6 - currentStars // 1 to 5

  // Stage 1: Frequency slider
  const [freq, setFreq] = useState(380.0)
  const targetFreq = 412.5

  // Stage 2: Sequence codes
  const sequence = ['DELTA', 'PHANTOM', 'CYBER']
  const [userSequence, setUserSequence] = useState<string[]>([])

  // Stage 3: Wire connection
  const [selectedWire, setSelectedWire] = useState<string | null>(null)
  const [connectedWires, setConnectedWires] = useState<Record<string, string>>({})

  // Stage 4: Camera node tap
  const [disabledNodes, setDisabledNodes] = useState<number[]>([])

  // Stage 5: Transponder flush progress
  const [flushProgress, setFlushProgress] = useState(0)
  const [isFlushing, setIsFlushing] = useState(false)

  // Stage 1 solver
  const handleSolveStage1 = () => {
    if (Math.abs(freq - targetFreq) <= 1.5) {
      soundFx.playCash()
      onReduceStar()
    } else {
      soundFx.playClick()
    }
  }

  // Stage 2 solver
  const handleSelectCode = (code: string) => {
    soundFx.playClick()
    const nextSeq = [...userSequence, code]
    setUserSequence(nextSeq)

    if (nextSeq.length === sequence.length) {
      if (nextSeq.every((val, idx) => val === sequence[idx])) {
        soundFx.playCash()
        setUserSequence([])
        onReduceStar()
      } else {
        setTimeout(() => setUserSequence([]), 400)
      }
    }
  }

  // Stage 3 solver
  const handleConnectWire = (source: string, target: string) => {
    soundFx.playClick()
    const newConnections = { ...connectedWires, [source]: target }
    setConnectedWires(newConnections)

    if (Object.keys(newConnections).length === 3) {
      soundFx.playCash()
      onReduceStar()
    }
  }

  // Stage 4 solver
  const handleDisableCamera = (nodeId: number) => {
    soundFx.playClick()
    if (!disabledNodes.includes(nodeId)) {
      const updated = [...disabledNodes, nodeId]
      setDisabledNodes(updated)
      if (updated.length === 4) {
        soundFx.playCash()
        onReduceStar()
      }
    }
  }

  // Stage 5 solver
  const handleFlushTransponder = () => {
    soundFx.playSpray()
    setIsFlushing(true)
    let p = 0
    const interval = setInterval(() => {
      p += 20
      setFlushProgress(p)
      if (p >= 100) {
        clearInterval(interval)
        setIsFlushing(false)
        soundFx.playCash()
        onReduceStar()
      }
    }, 150)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in-up">
      <div className="relative w-full max-w-lg bg-[#07080E] border-2 border-neon-flamingo rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(255,42,133,0.5)] space-y-6">
        {/* Header with Close Button */}
        <div className="flex items-start justify-between border-b border-deep-teal/70 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono text-neon-flamingo font-bold tracking-widest uppercase">
                VCPD TACTICAL FREQUENCY CIPHER • HEAT EVASION
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-display uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal">
              {currentStars === 0 ? 'HEAT FULLY EVADED' : 'SURRENDER NOW !!'}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close lockdown window"
            className="p-2 rounded-xl bg-midnight-teal/80 border border-deep-teal hover:border-neon-flamingo/50 text-off-white/60 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Heat Stars Meter */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-midnight-teal/80 border border-deep-teal">
          <span className="text-xs font-mono uppercase text-off-white/60">Active Heat Status:</span>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                className={`text-xl transition-all select-none ${
                  s <= currentStars
                    ? 'text-neon-flamingo filter drop-shadow-[0_0_10px_#ff2a85] animate-pulse'
                    : 'text-off-white/10'
                }`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Stage Content */}
        {currentStars === 5 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-deep-teal/30 border border-deep-teal text-xs space-y-2">
              <div className="flex items-center gap-2 text-palm-teal font-mono uppercase font-bold">
                <Radio className="w-4 h-4" />
                <span>Stage 1: Jam Air-1 Helicopter FLIR Radar</span>
              </div>
              <p className="text-off-white/70">
                Align the police radar scanner frequency to <strong className="text-sunset-orange">412.5 MHz</strong> to scramble aerial thermal tracking.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-off-white/50">Frequency:</span>
                <span className="text-neon-flamingo font-bold text-base">{freq.toFixed(1)} MHz</span>
              </div>
              <input
                type="range"
                min="350.0"
                max="450.0"
                step="0.5"
                value={freq}
                onChange={(e) => setFreq(parseFloat(e.target.value))}
                className="w-full h-2 bg-midnight-teal rounded-lg appearance-none cursor-pointer accent-neon-flamingo"
              />
            </div>

            <button
              onClick={handleSolveStage1}
              className={`w-full py-3.5 rounded-xl font-mono uppercase font-bold text-xs tracking-wider transition shadow-lg ${
                Math.abs(freq - targetFreq) <= 1.5
                  ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white hover:opacity-95'
                  : 'bg-deep-teal text-off-white/40 cursor-not-allowed'
              }`}
            >
              {Math.abs(freq - targetFreq) <= 1.5 ? '⚡ LOCK & JAM FREQUENCY (-1★)' : 'TUNE CLOSER TO 412.5 MHz'}
            </button>
          </div>
        )}

        {currentStars === 4 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-deep-teal/30 border border-deep-teal text-xs space-y-2">
              <div className="flex items-center gap-2 text-palm-teal font-mono uppercase font-bold">
                <ShieldAlert className="w-4 h-4" />
                <span>Stage 2: Roadblock Spike Grid Sequence</span>
              </div>
              <p className="text-off-white/70">
                Tap the cryptographic bypass tokens in exact order: <strong className="text-sunset-orange">DELTA → PHANTOM → CYBER</strong>.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              {['CYBER', 'DELTA', 'OMEGA', 'PHANTOM'].map((code) => (
                <button
                  key={code}
                  onClick={() => handleSelectCode(code)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase transition border ${
                    userSequence.includes(code)
                      ? 'bg-palm-teal/30 border-palm-teal text-palm-teal'
                      : 'bg-midnight-teal border-deep-teal hover:border-sunset-orange text-off-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <div className="text-center text-xs font-mono text-off-white/50">
              Input: {userSequence.join(' → ') || 'Awaiting input...'}
            </div>
          </div>
        )}

        {currentStars === 3 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-deep-teal/30 border border-deep-teal text-xs space-y-2">
              <div className="flex items-center gap-2 text-palm-teal font-mono uppercase font-bold">
                <Zap className="w-4 h-4" />
                <span>Stage 3: Scramble Cruiser TAC Radio Dispatch</span>
              </div>
              <p className="text-off-white/70">
                Route the 3 scrambled dispatch relays to cut off police reinforcements.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {['VCPD ALPHA', 'HIGHWAY PATROL', 'SWAT DISPATCH'].map((wire) => (
                <button
                  key={wire}
                  onClick={() => handleConnectWire(wire, 'BYPASSED')}
                  className={`p-3 rounded-2xl text-[11px] font-mono font-bold uppercase border transition ${
                    connectedWires[wire]
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                      : 'bg-midnight-teal border-deep-teal hover:border-neon-flamingo text-off-white'
                  }`}
                >
                  {connectedWires[wire] ? '✓ SCRAMBLED' : `TAP: ${wire}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStars === 2 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-deep-teal/30 border border-deep-teal text-xs space-y-2">
              <div className="flex items-center gap-2 text-palm-teal font-mono uppercase font-bold">
                <Lock className="w-4 h-4" />
                <span>Stage 4: Loop Traffic Surveillance Feeds</span>
              </div>
              <p className="text-off-white/70">
                Disable all 4 surveillance camera links across the causeway.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((id) => (
                <button
                  key={id}
                  onClick={() => handleDisableCamera(id)}
                  className={`p-3 rounded-2xl font-mono text-xs uppercase font-bold border transition ${
                    disabledNodes.includes(id)
                      ? 'bg-palm-teal/30 border-palm-teal text-palm-teal'
                      : 'bg-midnight-teal border-deep-teal hover:border-sunset-orange text-off-white'
                  }`}
                >
                  {disabledNodes.includes(id) ? '✓ OFFLINE' : `CAM 0${id}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStars === 1 && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-deep-teal/30 border border-deep-teal text-xs space-y-2">
              <div className="flex items-center gap-2 text-palm-teal font-mono uppercase font-bold">
                <RefreshCw className="w-4 h-4" />
                <span>Final Stage: Pay &apos;n&apos; Spray Transponder Wipe</span>
              </div>
              <p className="text-off-white/70">
                Execute vehicle transponder flush and install clean fictitious Leonida plates to eliminate the last star!
              </p>
            </div>

            <div className="h-3 w-full bg-midnight-teal rounded-full overflow-hidden border border-deep-teal">
              <div
                className="h-full bg-gradient-to-r from-palm-teal via-sunset-orange to-neon-flamingo transition-all duration-150"
                style={{ width: `${flushProgress}%` }}
              />
            </div>

            <button
              onClick={handleFlushTransponder}
              disabled={isFlushing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-neon-flamingo via-sunset-orange to-palm-teal text-white font-mono uppercase font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(255,61,129,0.4)] hover:opacity-95 transition"
            >
              {isFlushing ? `FLUSHING TRANSPONDER (${flushProgress}%)...` : '🔥 EXECUTE FINAL WIPE (-1★)'}
            </button>
          </div>
        )}

        {currentStars === 0 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(52,211,153,0.5)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-display uppercase tracking-widest text-emerald-400">
              HEAT EVADED: CLEAN RECORD
            </h3>
            <p className="text-xs font-mono text-off-white/70 max-w-sm mx-auto">
              Suspect successfully lost in the Leonida backcountry. All police cruisers stood down.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-deep-teal border border-deep-teal hover:border-palm-teal/50 text-off-white font-mono uppercase text-xs font-bold transition"
            >
              Return to Archives
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
