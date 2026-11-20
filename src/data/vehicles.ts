// GTA 6 Vehicles Database — Confirmed & Trailer-Analyzed
// Categories based on traditional GTA class taxonomy

export type VehicleClass =
  | 'Super'
  | 'Sports'
  | 'Muscle'
  | 'Sedan'
  | 'SUV'
  | 'Off-Road'
  | 'Motorcycle'
  | 'Boat'
  | 'Aircraft'
  | 'Emergency'
  | 'Commercial'
  | 'Military'

export interface Vehicle {
  id: string
  name: string
  manufacturer: string
  vehicleClass: VehicleClass
  speed: number       // 1-100 performance tier
  handling: number    // 1-100
  acceleration: number // 1-100
  braking: number     // 1-100
  realWorldAnalog: string
  location: string
  description: string
  trailerAppearance?: string
  price?: string
}

export const VEHICLE_CLASSES: VehicleClass[] = [
  'Super', 'Sports', 'Muscle', 'Sedan', 'SUV', 'Off-Road',
  'Motorcycle', 'Boat', 'Aircraft', 'Emergency', 'Commercial', 'Military',
]

export const VEHICLES: Vehicle[] = [
  // Super
  {
    id: 'grotti-cheetah',
    name: 'Grotti Cheetah',
    manufacturer: 'Grotti',
    vehicleClass: 'Super',
    speed: 97,
    handling: 83,
    acceleration: 91,
    braking: 86,
    realWorldAnalog: 'Ferrari SF90 Stradale',
    location: 'Luxury Autos, Vice Beach',
    description: 'Returning GTA legend. Mid-engine hybrid supercar with active aero and Vice City heritage. The definitive neon-lit cruiser for Ocean Drive.',
    trailerAppearance: 'Trailer 1 — Ocean Beach expressway chase sequence',
  },
  {
    id: 'pegassi-infernus',
    name: 'Pegassi Infernus',
    manufacturer: 'Pegassi',
    vehicleClass: 'Super',
    speed: 94,
    handling: 79,
    acceleration: 93,
    braking: 81,
    realWorldAnalog: 'Lamborghini Revuelto',
    location: 'Luxury Autos, Vice Beach',
    description: 'V12 hybrid hypercar with scissor doors and aggressive Italian-inspired bodywork. Unmistakable exhaust note echoes through Vice City tunnels.',
    trailerAppearance: 'Trailer 1 — parked outside nightclub',
  },
  {
    id: 'overflod-tyrant',
    name: 'Overflod Tyrant',
    manufacturer: 'Overflod',
    vehicleClass: 'Super',
    speed: 96,
    handling: 87,
    acceleration: 89,
    braking: 88,
    realWorldAnalog: 'Koenigsegg Jesko',
    location: 'Warstock Cache & Carry (online order)',
    description: 'Swedish engineering pushed to the limit. Twin-turbo flat-plane crank V8 making theoretical 1,600 HP. Active rear wing adjusts at speed.',
  },

  // Sports
  {
    id: 'vapid-dominator',
    name: 'Vapid Dominator GTX',
    manufacturer: 'Vapid',
    vehicleClass: 'Sports',
    speed: 84,
    handling: 76,
    acceleration: 82,
    braking: 73,
    realWorldAnalog: 'Ford Mustang GT (S650)',
    location: 'Found on streets, Downtown Vice City',
    description: 'All-American pony car with a 5.0 Coyote-inspired V8. Common on Vice City boulevards. Rear-wheel-drive tail-happiness in the rain.',
    trailerAppearance: 'Trailer 1 — street racing montage',
  },
  {
    id: 'annis-elegy',
    name: 'Annis Elegy RR',
    manufacturer: 'Annis',
    vehicleClass: 'Sports',
    speed: 86,
    handling: 88,
    acceleration: 84,
    braking: 82,
    realWorldAnalog: 'Nissan GT-R R36',
    location: 'Premium Deluxe Motorsport',
    description: 'AWD twin-turbo Japanese grand tourer. Legendary grip in wet conditions. The thinking person\'s sports car — clinical, precise, devastating.',
  },
  {
    id: 'pfister-comet',
    name: 'Pfister Comet S2',
    manufacturer: 'Pfister',
    vehicleClass: 'Sports',
    speed: 89,
    handling: 91,
    acceleration: 87,
    braking: 89,
    realWorldAnalog: 'Porsche 911 (992) GT3',
    location: 'Legendary Motorsport',
    description: 'Rear-engine, rear-drive. The layout that shouldn\'t work but does. Flat-six howl at 9,000 RPM through the Vice City causeway.',
  },

  // Muscle
  {
    id: 'bravado-gauntlet',
    name: 'Bravado Gauntlet Hellcat',
    manufacturer: 'Bravado',
    vehicleClass: 'Muscle',
    speed: 83,
    handling: 61,
    acceleration: 88,
    braking: 67,
    realWorldAnalog: 'Dodge Challenger SRT Hellcat',
    location: 'Common spawn — Port Gellhorn industrial district',
    description: 'Supercharged V8 muscle with more power than its chassis can handle. Perfect for straight-line drags down the Vice City strip.',
    trailerAppearance: 'Trailer 1 — drag race scene',
  },
  {
    id: 'imponte-dukes',
    name: 'Imponte Dukes',
    manufacturer: 'Imponte',
    vehicleClass: 'Muscle',
    speed: 78,
    handling: 63,
    acceleration: 76,
    braking: 62,
    realWorldAnalog: 'Dodge Charger R/T (1969)',
    location: 'Found in rural Leonida, grasslands region',
    description: 'Classic American muscle. Big-block V8 rumble, vinyl seats, and the smell of leaded gasoline. Leonida\'s back roads were built for this car.',
  },

  // Sedan
  {
    id: 'ubermacht-oracle',
    name: 'Übermacht Oracle XS',
    manufacturer: 'Übermacht',
    vehicleClass: 'Sedan',
    speed: 72,
    handling: 74,
    acceleration: 69,
    braking: 76,
    realWorldAnalog: 'BMW 7 Series',
    location: 'Common spawn — Vice City Financial District',
    description: 'Executive luxury sedan favored by Vice City lawyers and cartel accountants. Bulletproof glass upgrade available at Los Santos Customs.',
  },

  // SUV
  {
    id: 'gallivanter-baller',
    name: 'Gallivanter Baller ST',
    manufacturer: 'Gallivanter',
    vehicleClass: 'SUV',
    speed: 73,
    handling: 68,
    acceleration: 71,
    braking: 72,
    realWorldAnalog: 'Range Rover Sport',
    location: 'Starfish Island residential area',
    description: 'British luxury SUV with off-road capability. Popular with Leonida\'s nouveau riche and drug kingpins who need to look respectable.',
  },

  // Off-Road
  {
    id: 'canis-mesa',
    name: 'Canis Mesa Grande',
    manufacturer: 'Canis',
    vehicleClass: 'Off-Road',
    speed: 64,
    handling: 71,
    acceleration: 67,
    braking: 63,
    realWorldAnalog: 'Jeep Wrangler Rubicon',
    location: 'Common in rural Leonida, mud trails',
    description: 'Open-top off-roader built for the sawgrass trails and swamp crossings of inland Leonida. Snorkel kit comes standard.',
    trailerAppearance: 'Trailer 1 — mud bog scene',
  },
  {
    id: 'vapid-mudslinger',
    name: 'Vapid Mudslinger',
    manufacturer: 'Vapid',
    vehicleClass: 'Off-Road',
    speed: 58,
    handling: 62,
    acceleration: 71,
    braking: 54,
    realWorldAnalog: 'Ford F-150 Raptor (lifted)',
    location: 'Thrillbilly Mud Club, rural Leonida',
    description: 'Jacked-up pickup truck with monster tires and roll cage. The official ride of the Thrillbilly Mud Club. Crushes anything smaller.',
    trailerAppearance: 'Trailer 1 — mud club donuts',
  },

  // Motorcycle
  {
    id: 'shitzu-pcj',
    name: 'Shitzu PCJ-600',
    manufacturer: 'Shitzu',
    vehicleClass: 'Motorcycle',
    speed: 81,
    handling: 86,
    acceleration: 92,
    braking: 78,
    realWorldAnalog: 'Honda CBR600RR',
    location: 'Common spawn — Vice Beach boardwalk',
    description: 'Lightweight supersport bike. Lane-splitting through Vice City traffic at 140 MPH is what this machine was designed for.',
  },
  {
    id: 'western-daemon',
    name: 'Western Daemon',
    manufacturer: 'Western',
    vehicleClass: 'Motorcycle',
    speed: 72,
    handling: 68,
    acceleration: 73,
    braking: 64,
    realWorldAnalog: 'Harley-Davidson Sportster',
    location: 'Biker bar parking lots, rural Leonida',
    description: 'V-twin cruiser with ape hangers and a straight pipe exhaust that announces your arrival six blocks early.',
  },

  // Boat
  {
    id: 'shitzu-jetmax',
    name: 'Shitzu Jetmax',
    manufacturer: 'Shitzu',
    vehicleClass: 'Boat',
    speed: 87,
    handling: 73,
    acceleration: 84,
    braking: 61,
    realWorldAnalog: 'Cigarette Racing 42X',
    location: 'Vice Beach Marina, Starfish Island docks',
    description: 'Twin-engine offshore racing powerboat. Cuts through Biscayne Bay chop at 90+ knots. The go-to escape vehicle for waterfront heists.',
    trailerAppearance: 'Trailer 1 — bay chase sequence',
  },
  {
    id: 'nagasaki-airboat',
    name: 'Nagasaki Swamp Skimmer',
    manufacturer: 'Nagasaki',
    vehicleClass: 'Boat',
    speed: 56,
    handling: 67,
    acceleration: 72,
    braking: 48,
    realWorldAnalog: 'Everglades Airboat',
    location: 'Grassrivers Swamp, Sawgrass wetlands',
    description: 'Fan-propelled flat-bottom airboat. Glides over shallow swamp water, sawgrass, and mud flats. Essential for Leonida backcountry navigation.',
    trailerAppearance: 'Trailer 1 — swamp chase scene',
  },

  // Aircraft
  {
    id: 'buckingham-swift',
    name: 'Buckingham Swift',
    manufacturer: 'Buckingham',
    vehicleClass: 'Aircraft',
    speed: 79,
    handling: 76,
    acceleration: 71,
    braking: 68,
    realWorldAnalog: 'AgustaWestland AW109',
    location: 'Vice City International Airport',
    description: 'Luxury twin-engine helicopter. Leather interior, retractable landing gear. The cartel boss\'s preferred mode of transport between islands.',
  },
  {
    id: 'mammatus-crop',
    name: 'Mammatus Crop Duster',
    manufacturer: 'Mammatus',
    vehicleClass: 'Aircraft',
    speed: 48,
    handling: 82,
    acceleration: 43,
    braking: 71,
    realWorldAnalog: 'Air Tractor AT-502',
    location: 'Rural Leonida agricultural strips',
    description: 'Single-engine turboprop biplane. Slow, loud, and smells like pesticide. Surprisingly maneuverable at low altitude over the flatlands.',
  },

  // Emergency
  {
    id: 'vapid-cruiser',
    name: 'Vapid VCPD Cruiser',
    manufacturer: 'Vapid',
    vehicleClass: 'Emergency',
    speed: 79,
    handling: 74,
    acceleration: 81,
    braking: 77,
    realWorldAnalog: 'Ford Police Interceptor',
    location: 'Vice City Police Department stations',
    description: 'Standard VCPD patrol vehicle. Twin-turbo V6 pursuit-rated package. PIT maneuver capable. You\'ll see these in your mirrors a lot.',
  },

  // Commercial
  {
    id: 'brute-stockade',
    name: 'Brute Stockade',
    manufacturer: 'Brute',
    vehicleClass: 'Commercial',
    speed: 52,
    handling: 47,
    acceleration: 41,
    braking: 56,
    realWorldAnalog: 'Brinks Armored Truck',
    location: 'Spawns on routes between banks and casinos',
    description: 'Armored cash-in-transit vehicle. Heavy, slow, and full of money. The centerpiece of several heist missions. Bring explosives.',
  },
]
