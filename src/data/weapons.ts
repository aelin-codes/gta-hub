// GTA 6 Weapons Database — Leonida Arsenal
// Organized by weapon slot/category

export type WeaponCategory =
  | 'Melee'
  | 'Pistol'
  | 'Submachine Gun'
  | 'Assault Rifle'
  | 'Shotgun'
  | 'Sniper Rifle'
  | 'Heavy'
  | 'Throwable'

export interface Weapon {
  id: string
  name: string
  category: WeaponCategory
  damage: number      // 1-100
  fireRate: number    // 1-100
  accuracy: number    // 1-100
  range: number       // 1-100
  realWorldAnalog: string
  unlockMethod: string
  description: string
  ammoType?: string
}

export const WEAPON_CATEGORIES: WeaponCategory[] = [
  'Melee', 'Pistol', 'Submachine Gun', 'Assault Rifle',
  'Shotgun', 'Sniper Rifle', 'Heavy', 'Throwable',
]

export const WEAPONS: Weapon[] = [
  // Melee
  {
    id: 'fist',
    name: 'Fists',
    category: 'Melee',
    damage: 18,
    fireRate: 62,
    accuracy: 97,
    range: 4,
    realWorldAnalog: 'Bare hands',
    unlockMethod: 'Default',
    description: 'Your hands. Upgraded with gym training for increased damage. Useful for stealth takedowns and bar fights.',
  },
  {
    id: 'machete',
    name: 'Machete',
    category: 'Melee',
    damage: 54,
    fireRate: 43,
    accuracy: 91,
    range: 7,
    realWorldAnalog: 'Machete',
    unlockMethod: 'Found in sawgrass camps and rural properties',
    description: 'Standard issue for Leonida swamp clearing. Also effective for clearing a path through nightclub crowds.',
  },
  {
    id: 'baseball-bat',
    name: 'Baseball Bat',
    category: 'Melee',
    damage: 42,
    fireRate: 48,
    accuracy: 88,
    range: 8,
    realWorldAnalog: 'Louisville Slugger',
    unlockMethod: 'Sporting goods stores, residential garages',
    description: 'Aluminum alloy for maximum swing speed. A Vice City classic since 1986. Home runs count.',
  },

  // Pistol
  {
    id: 'pistol',
    name: 'Pistol',
    category: 'Pistol',
    damage: 31,
    fireRate: 54,
    accuracy: 68,
    range: 42,
    realWorldAnalog: 'Beretta 92FS',
    unlockMethod: 'Default starting weapon',
    description: 'Standard semi-automatic sidearm. Reliable, accurate, boring. Upgrade to extended mag for 16 rounds.',
    ammoType: '9mm',
  },
  {
    id: 'combat-pistol',
    name: 'Combat Pistol',
    category: 'Pistol',
    damage: 36,
    fireRate: 58,
    accuracy: 72,
    range: 38,
    realWorldAnalog: 'HK USP',
    unlockMethod: 'Ammu-Nation — $5,750',
    description: 'Tactical polymer-frame pistol with accessory rail. Threaded barrel accepts suppressor. Preferred by professionals.',
    ammoType: '.45 ACP',
  },
  {
    id: 'heavy-revolver',
    name: 'Heavy Revolver',
    category: 'Pistol',
    damage: 67,
    fireRate: 28,
    accuracy: 74,
    range: 46,
    realWorldAnalog: 'Smith & Wesson Model 629',
    unlockMethod: 'Ammu-Nation — $12,500',
    description: 'Six shots of .44 Magnum. Penetrates light cover and vehicle doors. Slow to reload but devastatingly effective.',
    ammoType: '.44 Magnum',
  },

  // SMG
  {
    id: 'micro-smg',
    name: 'Micro SMG',
    category: 'Submachine Gun',
    damage: 22,
    fireRate: 89,
    accuracy: 38,
    range: 31,
    realWorldAnalog: 'Uzi',
    unlockMethod: 'Ammu-Nation — $7,500',
    description: 'Compact machine pistol for drive-by shootings and close-quarters chaos. Spray and pray incarnate.',
    ammoType: '9mm',
  },
  {
    id: 'smg',
    name: 'SMG',
    category: 'Submachine Gun',
    damage: 26,
    fireRate: 82,
    accuracy: 51,
    range: 37,
    realWorldAnalog: 'MP5',
    unlockMethod: 'Ammu-Nation — $12,250',
    description: 'German engineering in a compact package. Roller-delayed blowback for controllable recoil. The professional\'s choice for CQB.',
    ammoType: '9mm',
  },

  // Assault Rifle
  {
    id: 'assault-rifle',
    name: 'Assault Rifle',
    category: 'Assault Rifle',
    damage: 34,
    fireRate: 71,
    accuracy: 56,
    range: 63,
    realWorldAnalog: 'AK-47 / AKM',
    unlockMethod: 'Ammu-Nation — $17,750',
    description: 'Kalashnikov pattern rifle. Hits hard, kicks harder. Rattles your fillings loose but puts the other guy down first. Available everywhere.',
    ammoType: '7.62x39mm',
  },
  {
    id: 'carbine-rifle',
    name: 'Carbine Rifle',
    category: 'Assault Rifle',
    damage: 32,
    fireRate: 73,
    accuracy: 64,
    range: 68,
    realWorldAnalog: 'M4A1 Carbine',
    unlockMethod: 'Ammu-Nation — $19,500',
    description: 'NATO-standard platform with modularity for days. Picatinny rails, adjustable stock, free-float handguard. The workhorse.',
    ammoType: '5.56 NATO',
  },
  {
    id: 'advanced-rifle',
    name: 'Advanced Rifle',
    category: 'Assault Rifle',
    damage: 38,
    fireRate: 68,
    accuracy: 71,
    range: 72,
    realWorldAnalog: 'Steyr AUG A3',
    unlockMethod: 'Ammu-Nation — $28,500',
    description: 'Austrian bullpup with integrated optic. Compact enough for vehicle use, accurate enough for mid-range engagements.',
    ammoType: '5.56 NATO',
  },

  // Shotgun
  {
    id: 'pump-shotgun',
    name: 'Pump Shotgun',
    category: 'Shotgun',
    damage: 72,
    fireRate: 24,
    accuracy: 32,
    range: 18,
    realWorldAnalog: 'Remington 870',
    unlockMethod: 'Ammu-Nation — $8,750',
    description: 'Pump-action 12-gauge. Rack the slide, clear the room. Devastating at close range, decorative past 20 meters.',
    ammoType: '12 Gauge',
  },
  {
    id: 'combat-shotgun',
    name: 'Combat Shotgun',
    category: 'Shotgun',
    damage: 68,
    fireRate: 48,
    accuracy: 34,
    range: 21,
    realWorldAnalog: 'Benelli M4',
    unlockMethod: 'Ammu-Nation — $23,750',
    description: 'Semi-automatic gas-operated combat shotgun. VCPD SWAT team standard issue. Follow-up shots come fast.',
    ammoType: '12 Gauge',
  },

  // Sniper
  {
    id: 'sniper-rifle',
    name: 'Sniper Rifle',
    category: 'Sniper Rifle',
    damage: 82,
    fireRate: 14,
    accuracy: 94,
    range: 97,
    realWorldAnalog: 'Remington 700',
    unlockMethod: 'Ammu-Nation — $24,500',
    description: 'Bolt-action precision rifle. One shot, one kill philosophy. Effective out to 800 meters with proper scope adjustment.',
    ammoType: '.308 Winchester',
  },
  {
    id: 'heavy-sniper',
    name: 'Heavy Sniper',
    category: 'Sniper Rifle',
    damage: 97,
    fireRate: 8,
    accuracy: 96,
    range: 99,
    realWorldAnalog: 'Barrett M82',
    unlockMethod: 'Ammu-Nation — $42,500',
    description: 'Anti-materiel rifle chambered in .50 BMG. Disables vehicles, penetrates walls, and ruins anyone\'s day at extreme range.',
    ammoType: '.50 BMG',
  },

  // Heavy
  {
    id: 'rpg',
    name: 'RPG',
    category: 'Heavy',
    damage: 99,
    fireRate: 6,
    accuracy: 42,
    range: 54,
    realWorldAnalog: 'RPG-7',
    unlockMethod: 'Ammu-Nation — $67,500 (unlocks at high level)',
    description: 'Rocket-propelled grenade launcher. Point at vehicle, pull trigger, watch fireball. Keep your distance from the blast radius.',
    ammoType: 'Rocket',
  },
  {
    id: 'minigun',
    name: 'Minigun',
    category: 'Heavy',
    damage: 42,
    fireRate: 99,
    accuracy: 28,
    range: 48,
    realWorldAnalog: 'M134 Minigun',
    unlockMethod: 'Military base theft / special missions',
    description: 'Six-barrel rotary machine gun. 6,000 rounds per minute. The answer to every question is more bullets. Movement speed greatly reduced.',
    ammoType: '7.62 NATO',
  },

  // Throwable
  {
    id: 'grenade',
    name: 'Grenade',
    category: 'Throwable',
    damage: 87,
    fireRate: 18,
    accuracy: 44,
    range: 32,
    realWorldAnalog: 'M67 Fragmentation Grenade',
    unlockMethod: 'Ammu-Nation — $250 each',
    description: 'Standard fragmentation grenade. 5-meter kill radius. Cook it by holding the throw button. Don\'t hold it too long.',
  },
  {
    id: 'sticky-bomb',
    name: 'Sticky Bomb',
    category: 'Throwable',
    damage: 93,
    fireRate: 16,
    accuracy: 38,
    range: 28,
    realWorldAnalog: 'C4 with adhesive backing',
    unlockMethod: 'Ammu-Nation — $600 each',
    description: 'Remote-detonated plastic explosive with adhesive pad. Sticks to vehicles, walls, and people. Detonate with D-Pad left.',
  },
  {
    id: 'molotov',
    name: 'Molotov Cocktail',
    category: 'Throwable',
    damage: 54,
    fireRate: 22,
    accuracy: 36,
    range: 26,
    realWorldAnalog: 'Molotov cocktail',
    unlockMethod: 'Craft from convenience store supplies',
    description: 'Gasoline-filled bottle with a burning rag. Creates a fire zone on impact. Classic GTA area denial. Watch the wind direction.',
  },
]
