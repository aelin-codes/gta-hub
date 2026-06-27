'use client'

import { useState } from 'react'
import { Map, Users, Car, ClipboardList, Info, Locate } from 'lucide-react'
import Link from 'next/link'

interface POI {
  name: string
  x: number // Percentage from left
  y: number // Percentage from top
  type: 'easter-egg' | 'mission' | 'landmark'
  description: string
  coordinates: string
}

const POIS: POI[] = [
  { name: "Vice City International Airport", x: 22, y: 78, type: 'landmark', description: "Primary airport serving the Vice City metropolitan area. Rumored high-security zones with hangar access.", coordinates: "VC-8012-AP" },
  { name: "Sunken Submarine Wreck", x: 55, y: 91, type: 'easter-egg', description: "An old submarine resting at the ocean bed containing loot caches and rusty skeletons.", coordinates: "OC-4412-SUB" },
  { name: "Jason & Lucia Safehouse", x: 42, y: 55, type: 'landmark', description: "Lucia and Jason's main hideout early in the campaign. Features custom customization lockers.", coordinates: "SH-3109-VC" },
  { name: "Grasslands Swamp Area", x: 78, y: 35, type: 'mission', description: "Alligator-infested swampland featuring side missions, airboat rental shops, and hidden drug caches.", coordinates: "GL-1244-SW" },
  { name: "Leonida Keys Lighthouse", x: 88, y: 82, type: 'easter-egg', description: "Historic lighthouse containing a cryptic riddle written on the wall inside. Spawns rare weapon loot.", coordinates: "LK-0012-LH" }
]

const CHARACTERS = [
  { name: "Lucia", role: "Protagonist", background: "A clever and street-smart street criminal making a fresh start in Leonida. Deeply loyal to Jason.", actor: "Manni L. Perez (Rumored)" },
  { name: "Jason", role: "Protagonist", background: "A former wheelman looking for high-paying scores. Pragmatic, quiet, and Lucia's partner in crime.", actor: "Dylan Rourke (Rumored)" },
  { name: "Pegorino Family Member", role: "Antagonist / Boss", background: "New Liberty City contacts expanding operations into Vice City's nightclub/smuggling circuits.", actor: "TBA" }
]

const VEHICLES = [
  { name: "Grotti Cheetah", class: "Super", speed: "9.8/10", handling: "9.2/10", location: "Downtown Vice City" },
  { name: "Pegassi Infernus", class: "Super", speed: "9.6/10", handling: "8.9/10", location: "Leonida Key West Resort" },
  { name: "Bravado Banshee", class: "Sports", speed: "8.5/10", handling: "8.2/10", location: "Airport Drag strip" },
  { name: "Dinka Double-T", class: "Motorcycle", speed: "8.8/10", handling: "9.5/10", location: "Vice Beach Strip" }
]

export default function WikiPage({ params: { locale } }: { params: { locale: string } }) {
  const [activeTab, setActiveTab] = useState<'map' | 'characters' | 'vehicles' | 'features'>('map')
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(POIS[0])

  return (
    <div className="bg-midnight-teal min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-6xl font-display uppercase tracking-widest text-off-white">
            WIKI & DATABASE
          </h1>
          <p className="text-sm sm:text-md text-off-white/60">
            Confirmed characters, vehicles, map locations, and gameplay features based on official media.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 bg-deep-teal/40 p-2 rounded-2xl border border-deep-teal/60 max-w-2xl mx-auto">
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'map' ? 'bg-palm-teal text-white shadow-lg' : 'text-off-white/60 hover:text-off-white'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>Interactive Map</span>
          </button>
          <button
            onClick={() => setActiveTab('characters')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'characters' ? 'bg-palm-teal text-white shadow-lg' : 'text-off-white/60 hover:text-off-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Characters</span>
          </button>
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'vehicles' ? 'bg-palm-teal text-white shadow-lg' : 'text-off-white/60 hover:text-off-white'
            }`}
          >
            <Car className="w-4 h-4" />
            <span>Vehicles</span>
          </button>
          <button
            onClick={() => setActiveTab('features')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'features' ? 'bg-palm-teal text-white shadow-lg' : 'text-off-white/60 hover:text-off-white'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>Features</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-deep-teal/20 rounded-3xl p-6 sm:p-8 border border-deep-teal/80 shadow-xl min-h-[500px]">
          
          {/* TAB 1: INTERACTIVE MAP (2.5D Mockup) */}
          {activeTab === 'map' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Map rendering (Section 6 - Signature Moment) */}
              <div className="lg:col-span-2 relative aspect-[4/3] bg-midnight-teal border border-palm-teal/30 rounded-2xl overflow-hidden shadow-2xl group flex items-center justify-center">
                {/* 2.5D grid lines representing city maps */}
                <div className="absolute inset-0 bg-[radial-gradient(#1fa9a0_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-flamingo/5 via-transparent to-sunset-orange/5" />
                
                {/* Visual shoreline representation */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-palm-teal/10 rounded-t-[50%] blur-xl" />

                {/* Render nodes representing points of interest */}
                {POIS.map((poi, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPOI(poi)}
                    style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 p-2.5 rounded-full border transition-all duration-300 ${
                      selectedPOI?.name === poi.name
                        ? 'bg-neon-flamingo border-white scale-125 shadow-[0_0_15px_#ff3d81]'
                        : 'bg-midnight-teal hover:bg-sunset-orange border-palm-teal/40 hover:border-white scale-100'
                    }`}
                    title={poi.name}
                  >
                    <Locate className="w-3.5 h-3.5 text-white" />
                  </button>
                ))}

                <span className="absolute bottom-4 right-4 text-[10px] font-mono text-off-white/40 uppercase tracking-widest">
                  Leonida Sector Map Grid v0.8
                </span>
              </div>

              {/* Side Details Panel */}
              <div className="space-y-6 flex flex-col justify-between">
                {selectedPOI ? (
                  <div className="space-y-4">
                    <span className="text-[10px] uppercase font-mono text-palm-teal bg-palm-teal/10 px-2 py-0.5 rounded border border-palm-teal/20">
                      {selectedPOI.type}
                    </span>
                    <h3 className="text-2xl font-bold uppercase text-off-white">{selectedPOI.name}</h3>
                    
                    <div className="flex items-center space-x-2 text-xs font-mono text-off-white/60">
                      <span>Coordinates:</span>
                      <strong className="text-sunset-orange">{selectedPOI.coordinates}</strong>
                    </div>

                    <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed">
                      {selectedPOI.description}
                    </p>

                    <div className="bg-midnight-teal/80 border border-deep-teal p-4 rounded-xl text-xs flex items-center space-x-3 mt-4">
                      <Info className="w-5 h-5 text-neon-flamingo shrink-0" />
                      <span>Visit the Video Library page to search community walkthroughs for this location.</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-off-white/50">Select a point on the map grid to inspect coordinate details.</p>
                )}

                <Link
                  href={`/${locale}/library`}
                  className="block py-3 bg-gradient-to-r from-neon-flamingo to-sunset-orange text-white text-center text-xs font-bold uppercase tracking-wider rounded-xl hover:opacity-90 transition"
                >
                  Find Videos on Library
                </Link>
              </div>

            </div>
          )}

          {/* TAB 2: CHARACTERS */}
          {activeTab === 'characters' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CHARACTERS.map((char, index) => (
                <div key={index} className="bg-midnight-teal/50 border border-deep-teal/60 p-6 rounded-2xl hover:border-palm-teal/30 transition-all duration-300">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-palm-teal">{char.role}</span>
                  <h3 className="text-xl font-bold text-off-white mt-2 mb-4 uppercase">{char.name}</h3>
                  <p className="text-xs sm:text-sm text-off-white/70 leading-relaxed mb-6">
                    {char.background}
                  </p>
                  <div className="text-[10px] font-mono text-off-white/40 uppercase tracking-wider border-t border-midnight-teal/40 pt-4">
                    Voice Actor: <strong className="text-off-white/70">{char.actor}</strong>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: VEHICLES */}
          {activeTab === 'vehicles' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-off-white/80">
                <thead className="text-[10px] uppercase font-mono tracking-wider text-off-white/40 border-b border-midnight-teal/40">
                  <tr>
                    <th className="pb-3 pr-4">Vehicle Model</th>
                    <th className="pb-3 pr-4">Vehicle Class</th>
                    <th className="pb-3 pr-4">Top Speed</th>
                    <th className="pb-3 pr-4">Handling</th>
                    <th className="pb-3">Primary Spawn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-midnight-teal/20">
                  {VEHICLES.map((car, index) => (
                    <tr key={index} className="hover:bg-midnight-teal/20 transition-colors">
                      <td className="py-4 pr-4 font-bold text-off-white uppercase">{car.name}</td>
                      <td className="py-4 pr-4 capitalize">{car.class}</td>
                      <td className="py-4 pr-4 font-mono text-palm-teal">{car.speed}</td>
                      <td className="py-4 pr-4 font-mono text-palm-teal">{car.handling}</td>
                      <td className="py-4 text-off-white/60">{car.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: CONFIRMED FEATURES */}
          {activeTab === 'features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                  Gameplay Innovations
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-off-white/70 list-disc list-inside">
                  <li>Dual-Protagonist swap mechanic (Jason and Lucia) returning from GTA V.</li>
                  <li>Advanced AI behavior patterns for NPCs responding dynamically to weather/time.</li>
                  <li>Deeper police response levels, tactical cordon maneuvers.</li>
                  <li>In-game mock social media platform mapping community events.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-neon-flamingo to-sunset-orange">
                  Leonida Ecosystem
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-off-white/70 list-disc list-inside">
                  <li>Full day/dusk/night weather cycle.</li>
                  <li>Extreme weather dynamics like hurricanes, floods in swamp grids.</li>
                  <li>Dynamic wildlife interaction (alligators, panthers, marine life).</li>
                  <li>Fully responsive radios mapping localized Vice City updates.</li>
                </ul>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  )
}
