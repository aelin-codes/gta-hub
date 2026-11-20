// GTA 6 Cheat Codes Database — Leonida / Vice City
// Organized by category for the /cheats reference page

export interface Cheat {
  id: string
  name: string
  code: string
  category: CheatCategory
  platform: 'all' | 'ps5' | 'xbox'
  description: string
  effect: string
  note?: string
}

export type CheatCategory =
  | 'Health & Armor'
  | 'Weapons'
  | 'Wanted Level'
  | 'Vehicles'
  | 'Weather'
  | 'Player Effects'
  | 'World Effects'
  | 'Fun & Misc'

export const CHEAT_CATEGORIES: CheatCategory[] = [
  'Health & Armor',
  'Weapons',
  'Wanted Level',
  'Vehicles',
  'Weather',
  'Player Effects',
  'World Effects',
  'Fun & Misc',
]

export const CHEATS: Cheat[] = [
  // Health & Armor
  {
    id: 'max-health',
    name: 'Full Health',
    code: '1-999-887-9637',
    category: 'Health & Armor',
    platform: 'all',
    description: 'Restores health to maximum',
    effect: 'Health refilled to 100%',
  },
  {
    id: 'max-armor',
    name: 'Full Armor',
    code: '1-999-276-6745',
    category: 'Health & Armor',
    platform: 'all',
    description: 'Restores body armor to maximum',
    effect: 'Armor refilled to 100%',
  },
  {
    id: 'invincibility',
    name: 'Invincibility',
    code: '1-999-724-6545537',
    category: 'Health & Armor',
    platform: 'all',
    description: 'Five minutes of invulnerability',
    effect: 'Cannot take damage for 5 minutes',
    note: 'Disables achievements while active. Must re-enter after timer expires.',
  },

  // Weapons
  {
    id: 'weapons-1',
    name: 'Weapon Set 1',
    code: '1-999-866-5872',
    category: 'Weapons',
    platform: 'all',
    description: 'Assault Rifle, Shotgun, Pistol, Knife, Grenades',
    effect: 'Grants weapon loadout with ammo',
  },
  {
    id: 'weapons-2',
    name: 'Weapon Set 2',
    code: '1-999-866-5873',
    category: 'Weapons',
    platform: 'all',
    description: 'Sniper Rifle, SMG, RPG, Combat Shotgun, Sticky Bombs',
    effect: 'Grants advanced weapon loadout',
  },
  {
    id: 'weapons-3',
    name: 'Weapon Set 3',
    code: '1-999-866-5874',
    category: 'Weapons',
    platform: 'all',
    description: 'Minigun, Heavy Sniper, Grenade Launcher, Assault Shotgun',
    effect: 'Grants heavy weapon loadout',
  },
  {
    id: 'flaming-ammo',
    name: 'Flaming Rounds',
    code: '1-999-462-8463',
    category: 'Weapons',
    platform: 'all',
    description: 'All bullets set targets on fire',
    effect: 'Incendiary rounds on all firearms',
    note: 'Disables achievements.',
  },
  {
    id: 'explosive-ammo',
    name: 'Explosive Rounds',
    code: '1-999-444-3972',
    category: 'Weapons',
    platform: 'all',
    description: 'All bullets explode on impact',
    effect: 'Explosive rounds on all firearms',
    note: 'Disables achievements. Extremely destructive.',
  },

  // Wanted Level
  {
    id: 'lower-wanted',
    name: 'Lower Wanted Level',
    code: '1-999-529-9378',
    category: 'Wanted Level',
    platform: 'all',
    description: 'Reduces current wanted level by one star',
    effect: 'Wanted level -1 star',
  },
  {
    id: 'raise-wanted',
    name: 'Raise Wanted Level',
    code: '1-999-384-4837',
    category: 'Wanted Level',
    platform: 'all',
    description: 'Increases current wanted level by one star',
    effect: 'Wanted level +1 star',
  },

  // Vehicles
  {
    id: 'spawn-cheetah',
    name: 'Spawn Grotti Cheetah',
    code: '1-999-243-3824',
    category: 'Vehicles',
    platform: 'all',
    description: 'Spawns a Grotti Cheetah supercar',
    effect: 'Supercar appears in front of player',
  },
  {
    id: 'spawn-airboat',
    name: 'Spawn Sawgrass Airboat',
    code: '1-999-247-2628',
    category: 'Vehicles',
    platform: 'all',
    description: 'Spawns a fan-propelled swamp airboat',
    effect: 'Airboat appears nearby',
  },
  {
    id: 'spawn-chopper',
    name: 'Spawn Buzzard Helicopter',
    code: '1-999-289-9633',
    category: 'Vehicles',
    platform: 'all',
    description: 'Spawns an armed Buzzard attack helicopter',
    effect: 'Attack helicopter spawns on nearest flat surface',
  },
  {
    id: 'spawn-motorcycle',
    name: 'Spawn PCJ-600',
    code: '1-999-762-5368',
    category: 'Vehicles',
    platform: 'all',
    description: 'Spawns a sport motorcycle',
    effect: 'PCJ-600 appears in front of player',
  },
  {
    id: 'spawn-speedboat',
    name: 'Spawn Vice Speedboat',
    code: '1-999-773-3287',
    category: 'Vehicles',
    platform: 'all',
    description: 'Spawns a high-speed powerboat',
    effect: 'Speedboat appears at nearest water',
  },

  // Weather
  {
    id: 'sunny',
    name: 'Clear Skies',
    code: '1-999-625-3487',
    category: 'Weather',
    platform: 'all',
    description: 'Sets weather to clear and sunny',
    effect: 'Instant clear weather',
  },
  {
    id: 'rain',
    name: 'Tropical Rainstorm',
    code: '1-999-724-6837',
    category: 'Weather',
    platform: 'all',
    description: 'Triggers heavy tropical rain',
    effect: 'Heavy rain with reduced visibility',
  },
  {
    id: 'hurricane',
    name: 'Hurricane Weather',
    code: '1-999-487-7426',
    category: 'Weather',
    platform: 'all',
    description: 'Triggers hurricane-force winds and downpour',
    effect: 'Extreme weather with flying debris and flooding',
    note: 'Vehicles become difficult to control.',
  },
  {
    id: 'foggy',
    name: 'Vice Fog',
    code: '1-999-364-4948',
    category: 'Weather',
    platform: 'all',
    description: 'Dense fog rolls in over Leonida',
    effect: 'Heavy fog with limited visibility',
  },

  // Player Effects
  {
    id: 'super-jump',
    name: 'Super Jump',
    code: '1-999-467-8648',
    category: 'Player Effects',
    platform: 'all',
    description: 'Massively increases jump height',
    effect: 'Leap over buildings and vehicles',
    note: 'Fall damage still applies unless combined with invincibility.',
  },
  {
    id: 'fast-run',
    name: 'Fast Run',
    code: '1-999-228-2463',
    category: 'Player Effects',
    platform: 'all',
    description: 'Sprint speed greatly increased',
    effect: '2x sprint speed',
  },
  {
    id: 'fast-swim',
    name: 'Fast Swim',
    code: '1-999-468-4268',
    category: 'Player Effects',
    platform: 'all',
    description: 'Swimming speed greatly increased',
    effect: '2x swim speed — useful in Leonida Keys',
  },
  {
    id: 'drunk',
    name: 'Drunk Mode',
    code: '1-999-547-8676',
    category: 'Player Effects',
    platform: 'all',
    description: 'Character stumbles and vision blurs',
    effect: 'Drunk stagger, blurred vision, impaired driving',
  },

  // World Effects
  {
    id: 'slow-motion',
    name: 'Slow Motion',
    code: '1-999-756-9663',
    category: 'World Effects',
    platform: 'all',
    description: 'Everything moves in slow motion',
    effect: 'World speed reduced to 50%. Enter 3x for maximum slow-mo.',
    note: 'Stackable up to 3 times. Fourth entry resets to normal.',
  },
  {
    id: 'moon-gravity',
    name: 'Moon Gravity',
    code: '1-999-356-2837',
    category: 'World Effects',
    platform: 'all',
    description: 'Low gravity for all objects and vehicles',
    effect: 'Everything floats and vehicles get massive air',
  },
  {
    id: 'director-mode',
    name: 'Director Mode',
    code: '1-999-347-3283',
    category: 'World Effects',
    platform: 'all',
    description: 'Unlocks Rockstar Editor director mode',
    effect: 'Full camera control and NPC direction',
  },

  // Fun & Misc
  {
    id: 'skyfall',
    name: 'Skyfall',
    code: '1-999-759-3255',
    category: 'Fun & Misc',
    platform: 'all',
    description: 'Teleports player thousands of feet above Leonida',
    effect: 'Freefall from extreme altitude. No parachute given.',
    note: 'Combine with invincibility to survive. Spectacular views of the full map.',
  },
  {
    id: 'parachute',
    name: 'Give Parachute',
    code: '1-999-727-2248',
    category: 'Fun & Misc',
    platform: 'all',
    description: 'Adds a parachute to inventory',
    effect: 'Parachute available in weapon wheel',
  },
  {
    id: 'bang-bang',
    name: 'Explosive Melee',
    code: '1-999-226-4226',
    category: 'Fun & Misc',
    platform: 'all',
    description: 'Punches and kicks cause explosions',
    effect: 'Melee attacks detonate on contact',
    note: 'Disables achievements. Extremely chaotic.',
  },
  {
    id: 'slidey-cars',
    name: 'Slidey Cars',
    code: '1-999-766-9329',
    category: 'Fun & Misc',
    platform: 'all',
    description: 'All vehicles lose traction',
    effect: 'Drift mode — zero grip on all surfaces',
  },
]
