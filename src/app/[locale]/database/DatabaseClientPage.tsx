'use client'

import { useState, useMemo } from 'react'
import {
  Car,
  Crosshair,
  Search,
  Gauge,
  MapPin,
  Scale
} from 'lucide-react'
import {
  VEHICLES,
  VEHICLE_CLASSES,
  type Vehicle,
  type VehicleClass
} from '@/data/vehicles'
import {
  WEAPONS,
  WEAPON_CATEGORIES,
  type WeaponCategory
} from '@/data/weapons'
import { soundFx } from '@/components/GtaSoundEffects'

type ActiveTab = 'vehicles' | 'weapons'

export default function DatabaseClientPage({}: { locale?: string }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('vehicles')
  const [vehicleSearch, setVehicleSearch] = useState('')
  const [selectedVehicleClass, setSelectedVehicleClass] = useState<VehicleClass | 'All'>('All')
  const [weaponSearch, setWeaponSearch] = useState('')
  const [selectedWeaponCat, setSelectedWeaponCat] = useState<WeaponCategory | 'All'>('All')
  const [comparedVehicles, setComparedVehicles] = useState<Vehicle[]>([])

  const filteredVehicles = useMemo(() => {
    return VEHICLES.filter((v) => {
      const matchesClass = selectedVehicleClass === 'All' || v.vehicleClass === selectedVehicleClass
      const query = vehicleSearch.toLowerCase()
      const matchesSearch =
        v.name.toLowerCase().includes(query) ||
        v.manufacturer.toLowerCase().includes(query) ||
        v.realWorldAnalog.toLowerCase().includes(query) ||
        v.location.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query)
      return matchesClass && matchesSearch
    })
  }, [vehicleSearch, selectedVehicleClass])

  const filteredWeapons = useMemo(() => {
    return WEAPONS.filter((w) => {
      const matchesCat = selectedWeaponCat === 'All' || w.category === selectedWeaponCat
      const query = weaponSearch.toLowerCase()
      const matchesSearch =
        w.name.toLowerCase().includes(query) ||
        w.category.toLowerCase().includes(query) ||
        w.realWorldAnalog.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query) ||
        w.unlockMethod.toLowerCase().includes(query)
      return matchesCat && matchesSearch
    })
  }, [weaponSearch, selectedWeaponCat])

  const toggleCompare = (v: Vehicle) => {
    soundFx.playClick()
    setComparedVehicles((prev) => {
      if (prev.find((item) => item.id === v.id)) {
        return prev.filter((item) => item.id !== v.id)
      }
      if (prev.length >= 2) {
        return [prev[1], v] // keep latest 2
      }
      return [...prev, v]
    })
  }

  return (
    <div className="bg-[#07090E] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Hero */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-palm-teal/15 border border-palm-teal/30 text-palm-teal text-xs font-mono uppercase tracking-widest">
            <Gauge className="w-3.5 h-3.5 animate-pulse" />
            <span>State of Leonida Armory &amp; Vehicle Registry</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-[#F1F5F4] leading-tight">
            LEONIDA <span className="text-transparent bg-clip-text bg-gradient-to-r from-palm-teal via-sunset-orange to-neon-flamingo">DATABASE</span>
          </h1>

          <p className="text-sm text-[#F1F5F4]/70 max-w-2xl mx-auto font-sans leading-relaxed">
            Confirmed tactical gear, supercars, muscle machines, and firearms indexed directly from Grand Theft Auto VI trailers, leaks, and gameplay breakdowns.
          </p>

          {/* Tab Switcher: Vehicles vs Weapons */}
          <div className="inline-flex p-1.5 rounded-2xl bg-[#101724] border border-deep-teal shadow-xl max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                setActiveTab('vehicles')
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition ${
                activeTab === 'vehicles'
                  ? 'bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white shadow-lg shadow-neon-flamingo/20'
                  : 'text-[#F1F5F4]/60 hover:text-white'
              }`}
            >
              <Car className="w-4 h-4" />
              <span>Vehicles ({VEHICLES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundFx.playClick()
                setActiveTab('weapons')
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono uppercase font-bold tracking-wider transition ${
                activeTab === 'weapons'
                  ? 'bg-gradient-to-r from-palm-teal to-blue-500 text-black font-bold shadow-lg shadow-palm-teal/20'
                  : 'text-[#F1F5F4]/60 hover:text-white'
              }`}
            >
              <Crosshair className="w-4 h-4" />
              <span>Weapons ({WEAPONS.length})</span>
            </button>
          </div>
        </div>

        {/* COMPARISON DRAWER (Vehicles) */}
        {activeTab === 'vehicles' && comparedVehicles.length > 0 && (
          <div className="bg-[#101724]/90 border-2 border-palm-teal/60 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-palm-teal" />
                <h3 className="text-lg font-display uppercase tracking-wider text-[#F1F5F4]">
                  Head-to-Head Vehicle Telemetry ({comparedVehicles.length}/2)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setComparedVehicles([])}
                className="text-xs font-mono text-neon-flamingo uppercase hover:underline"
              >
                Clear Comparison
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparedVehicles.map((v) => (
                <div key={v.id} className="p-4 rounded-2xl bg-[#07090E] border border-deep-teal space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-palm-teal">{v.manufacturer}</span>
                      <h4 className="text-base font-bold text-[#F1F5F4]">{v.name}</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-deep-teal text-[10px] font-mono uppercase text-off-white/80">
                      {v.vehicleClass}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F1F5F4]/60">Top Speed</span>
                        <span className="text-sunset-orange font-bold">{v.speed} / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-deep-teal overflow-hidden">
                        <div className="h-full bg-sunset-orange rounded-full" style={{ width: `${v.speed}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F1F5F4]/60">Handling Response</span>
                        <span className="text-palm-teal font-bold">{v.handling} / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-deep-teal overflow-hidden">
                        <div className="h-full bg-palm-teal rounded-full" style={{ width: `${v.handling}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F1F5F4]/60">Acceleration</span>
                        <span className="text-neon-flamingo font-bold">{v.acceleration} / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-deep-teal overflow-hidden">
                        <div className="h-full bg-neon-flamingo rounded-full" style={{ width: `${v.acceleration}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-[#F1F5F4]/60">Braking Distance</span>
                        <span className="text-emerald-400 font-bold">{v.braking} / 100</span>
                      </div>
                      <div className="h-2 rounded-full bg-deep-teal overflow-hidden">
                        <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${v.braking}%` }} />
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-[#F1F5F4]/60 font-sans">
                    <strong>Real Analog:</strong> {v.realWorldAnalog} • <strong>Spawn:</strong> {v.location}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 1: VEHICLES SECTION */}
        {activeTab === 'vehicles' && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="space-y-4 bg-[#101724]/70 border border-[#101724] rounded-3xl p-5 shadow-xl backdrop-blur-md">
              <div className="relative">
                <Search className="w-4 h-4 text-[#F1F5F4]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={vehicleSearch}
                  onChange={(e) => setVehicleSearch(e.target.value)}
                  placeholder="Search vehicles by name, manufacturer, real-world analog (e.g. Cheetah, Ferrari, Raptor)..."
                  className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-deep-teal rounded-2xl text-xs sm:text-sm text-[#F1F5F4] placeholder:text-[#F1F5F4]/30 focus:outline-none focus:border-palm-teal transition"
                />
              </div>

              {/* Class Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setSelectedVehicleClass('All')
                  }}
                  className={`px-3.5 py-2 rounded-xl transition shrink-0 border ${
                    selectedVehicleClass === 'All'
                      ? 'bg-palm-teal text-black font-bold border-palm-teal shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                      : 'bg-[#07090E] text-[#F1F5F4]/60 border-deep-teal hover:text-white'
                  }`}
                >
                  All Classes ({VEHICLES.length})
                </button>
                {VEHICLE_CLASSES.map((cls) => {
                  const isSelected = selectedVehicleClass === cls
                  const count = VEHICLES.filter((v) => v.vehicleClass === cls).length
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => {
                        soundFx.playClick()
                        setSelectedVehicleClass(cls)
                      }}
                      className={`px-3.5 py-2 rounded-xl transition shrink-0 border ${
                        isSelected
                          ? 'bg-neon-flamingo text-white font-bold border-neon-flamingo shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                          : 'bg-[#07090E] text-[#F1F5F4]/60 border-deep-teal hover:text-white hover:border-neon-flamingo/40'
                      }`}
                    >
                      {cls} ({count})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Vehicles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredVehicles.map((vehicle) => {
                const isCompared = comparedVehicles.some((c) => c.id === vehicle.id)

                return (
                  <div
                    key={vehicle.id}
                    className="bg-[#101724]/50 hover:bg-[#101724]/80 border border-deep-teal hover:border-palm-teal/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Card Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-palm-teal bg-deep-teal px-2.5 py-1 rounded-lg border border-palm-teal/20">
                          {vehicle.vehicleClass}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleCompare(vehicle)}
                          className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-lg border transition ${
                            isCompared
                              ? 'bg-palm-teal text-black font-bold border-palm-teal'
                              : 'text-off-white/60 border-deep-teal hover:text-palm-teal hover:border-palm-teal/40'
                          }`}
                        >
                          {isCompared ? 'Comparing ✓' : '+ Compare'}
                        </button>
                      </div>

                      {/* Name & Manufacturer */}
                      <div>
                        <span className="text-xs font-mono text-off-white/40 block uppercase tracking-wider">
                          {vehicle.manufacturer}
                        </span>
                        <h3 className="text-xl font-display uppercase tracking-wider text-[#F1F5F4] group-hover:text-palm-teal transition">
                          {vehicle.name}
                        </h3>
                        <p className="text-xs text-sunset-orange font-mono mt-0.5">
                          Inspired by: {vehicle.realWorldAnalog}
                        </p>
                      </div>

                      {/* Telemetry Stat Bars */}
                      <div className="space-y-2.5 font-mono text-xs pt-2 border-t border-deep-teal/60">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Speed Rating</span>
                            <span className="text-sunset-orange font-bold">{vehicle.speed}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-sunset-orange rounded-full" style={{ width: `${vehicle.speed}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Handling</span>
                            <span className="text-palm-teal font-bold">{vehicle.handling}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-palm-teal rounded-full" style={{ width: `${vehicle.handling}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Acceleration</span>
                            <span className="text-neon-flamingo font-bold">{vehicle.acceleration}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-neon-flamingo rounded-full" style={{ width: `${vehicle.acceleration}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Braking</span>
                            <span className="text-emerald-400 font-bold">{vehicle.braking}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${vehicle.braking}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#F1F5F4]/70 leading-relaxed font-sans">
                        {vehicle.description}
                      </p>
                    </div>

                    {/* Spawn Details */}
                    <div className="pt-3 border-t border-deep-teal/60 text-xs font-mono space-y-1">
                      <div className="flex items-center gap-1.5 text-palm-teal">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{vehicle.location}</span>
                      </div>
                      {vehicle.trailerAppearance && (
                        <div className="text-[10px] text-off-white/40 truncate">
                          📹 {vehicle.trailerAppearance}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* TAB 2: WEAPONS SECTION */}
        {activeTab === 'weapons' && (
          <div className="space-y-6">
            {/* Toolbar */}
            <div className="space-y-4 bg-[#101724]/70 border border-[#101724] rounded-3xl p-5 shadow-xl backdrop-blur-md">
              <div className="relative">
                <Search className="w-4 h-4 text-[#F1F5F4]/40 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={weaponSearch}
                  onChange={(e) => setWeaponSearch(e.target.value)}
                  placeholder="Search weapons by name, real analog, caliber (e.g. AKM, Sniper, RPG, 9mm)..."
                  className="w-full pl-11 pr-4 py-3 bg-[#07090E] border border-deep-teal rounded-2xl text-xs sm:text-sm text-[#F1F5F4] placeholder:text-[#F1F5F4]/30 focus:outline-none focus:border-palm-teal transition"
                />
              </div>

              {/* Weapon Category Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-mono uppercase tracking-wider">
                <button
                  type="button"
                  onClick={() => {
                    soundFx.playClick()
                    setSelectedWeaponCat('All')
                  }}
                  className={`px-3.5 py-2 rounded-xl transition shrink-0 border ${
                    selectedWeaponCat === 'All'
                      ? 'bg-palm-teal text-black font-bold border-palm-teal shadow-[0_0_15px_rgba(0,229,255,0.3)]'
                      : 'bg-[#07090E] text-[#F1F5F4]/60 border-deep-teal hover:text-white'
                  }`}
                >
                  All Armory ({WEAPONS.length})
                </button>
                {WEAPON_CATEGORIES.map((cat) => {
                  const isSelected = selectedWeaponCat === cat
                  const count = WEAPONS.filter((w) => w.category === cat).length
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        soundFx.playClick()
                        setSelectedWeaponCat(cat)
                      }}
                      className={`px-3.5 py-2 rounded-xl transition shrink-0 border ${
                        isSelected
                          ? 'bg-neon-flamingo text-white font-bold border-neon-flamingo shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                          : 'bg-[#07090E] text-[#F1F5F4]/60 border-deep-teal hover:text-white hover:border-neon-flamingo/40'
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Weapons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredWeapons.map((weapon) => {
                return (
                  <div
                    key={weapon.id}
                    className="bg-[#101724]/50 hover:bg-[#101724]/80 border border-deep-teal hover:border-palm-teal/50 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-lg group hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-neon-flamingo bg-deep-teal px-2.5 py-1 rounded-lg border border-neon-flamingo/20">
                          {weapon.category}
                        </span>
                        {weapon.ammoType && (
                          <span className="text-[10px] font-mono text-off-white/60 bg-[#07090E] px-2 py-0.5 rounded border border-deep-teal">
                            {weapon.ammoType}
                          </span>
                        )}
                      </div>

                      {/* Name & Analog */}
                      <div>
                        <h3 className="text-xl font-display uppercase tracking-wider text-[#F1F5F4] group-hover:text-neon-flamingo transition">
                          {weapon.name}
                        </h3>
                        <p className="text-xs text-palm-teal font-mono mt-0.5">
                          Modeled on: {weapon.realWorldAnalog}
                        </p>
                      </div>

                      {/* Tactical Specs */}
                      <div className="space-y-2.5 font-mono text-xs pt-2 border-t border-deep-teal/60">
                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Lethality / Damage</span>
                            <span className="text-neon-flamingo font-bold">{weapon.damage}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-neon-flamingo rounded-full" style={{ width: `${weapon.damage}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Fire Rate / Cadence</span>
                            <span className="text-sunset-orange font-bold">{weapon.fireRate}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-sunset-orange rounded-full" style={{ width: `${weapon.fireRate}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Accuracy &amp; Grouping</span>
                            <span className="text-palm-teal font-bold">{weapon.accuracy}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-palm-teal rounded-full" style={{ width: `${weapon.accuracy}%` }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-[11px] mb-1">
                            <span className="text-off-white/50">Effective Range</span>
                            <span className="text-emerald-400 font-bold">{weapon.range}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-[#07090E] overflow-hidden">
                            <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${weapon.range}%` }} />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-[#F1F5F4]/70 leading-relaxed font-sans">
                        {weapon.description}
                      </p>
                    </div>

                    {/* Unlock / Acquisition */}
                    <div className="pt-3 border-t border-deep-teal/60 text-xs font-mono">
                      <span className="text-off-white/40 block text-[10px] uppercase">Acquisition:</span>
                      <span className="text-sunset-orange font-bold truncate block">{weapon.unlockMethod}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Verbatim Legal Disclaimer at bottom */}
        <div className="border-t border-deep-teal/40 pt-6 text-center text-[10px] text-off-white/40 leading-relaxed">
          GTA 6 Hub is an unofficial fan site and is not affiliated with, endorsed by, or sponsored by Rockstar Games or Take-Two Interactive. All trademarks belong to their respective owners. All videos remain the property of their original creators and are embedded via official platform players.
        </div>

      </div>
    </div>
  )
}
