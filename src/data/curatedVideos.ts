export interface Timestamp {
  label: string
  seconds: number
}

export interface CuratedVideo {
  id: string
  platform: 'youtube' | 'twitch'
  external_id: string
  title: string
  description: string
  channel_name: string
  channel_url: string
  thumbnail_url: string
  published_at: string
  category: string
  secondary_categories?: string[]
  schematic_concepts?: string[]
  video_timestamps: Timestamp[]
  excluded?: boolean
}

export const CURATED_VIDEOS: CuratedVideo[] = [
  {
    id: "gta6-official-trailer-1",
    platform: "youtube",
    external_id: "QdBZY2fkU-0",
    title: "Grand Theft Auto VI Trailer 1 (Official 4K)",
    description: "Our official first look at Grand Theft Auto VI, heading to the state of Leonida, home to the neon-soaked streets of Vice City and beyond in the biggest, most immersive evolution of the Grand Theft Auto series yet.",
    channel_name: "Rockstar Games",
    channel_url: "https://www.youtube.com/@RockstarGames",
    thumbnail_url: "https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg",
    published_at: "2023-12-05T00:00:00Z",
    category: "News & Trailers",
    secondary_categories: ["Missions & Story", "Characters", "Soundtrack & World"],
    schematic_concepts: [
      "Lucia & Stefanie Prison Meeting",
      "Vice Beach Speedboats & Supercars",
      "Everglades Sawgrass Alligators",
      "Thrillbilly Mud Club Off-Road",
      "Jason & Lucia Store Robbery",
      "Tom Petty Love Is A Long Road"
    ],
    video_timestamps: [
      { label: "Leonida Correctional Facility & Stefanie", seconds: 0 },
      { label: "Vice Beach Neon & Ocean Drive Speedboats", seconds: 24 },
      { label: "Everglades Sawgrass & Alligator Wildlife", seconds: 43 },
      { label: "Thrillbilly Mud Club & Highway Pursuits", seconds: 58 },
      { label: "Jason & Lucia Convenience Store Robbery", seconds: 78 }
    ],
    excluded: false
  },
  {
    id: "gta6-extended-look",
    platform: "youtube",
    external_id: "tJbzMqJGH4k",
    title: "Grand Theft Auto VI: An Extended Look — World & Characters",
    description: "A comprehensive deep dive into the state of Leonida, exploring the living ecosystem, character dynamics between Jason and Lucia, next-generation AI crowd densities, and volumetric cloud rendering.",
    channel_name: "Rockstar Games",
    channel_url: "https://www.youtube.com/@RockstarGames",
    thumbnail_url: "https://img.youtube.com/vi/tJbzMqJGH4k/maxresdefault.jpg",
    published_at: "2024-05-18T14:00:00Z",
    category: "News & Trailers",
    secondary_categories: ["Map & Exploration", "Vehicles", "Characters"],
    schematic_concepts: [
      "Downtown Vice City Weather System",
      "Port Gellhorn Cargo Shipping",
      "Vehicle Trunk Storage Weapon Locker",
      "Tactical VCPD PIT Maneuver AI",
      "Living Pedestrian Crowd Dynamics"
    ],
    video_timestamps: [
      { label: "Downtown Vice City Skyline & Weather", seconds: 0 },
      { label: "Port Gellhorn Industrial Docks", seconds: 35 },
      { label: "Underground Safehouse & Trunk Storage", seconds: 70 },
      { label: "Police Tactical PIT Maneuver AI", seconds: 105 }
    ],
    excluded: false
  },
  {
    id: "gta6-map-leonida-analysis",
    platform: "youtube",
    external_id: "qApw-Enzs-w",
    title: "GTA 6 Full Map of Leonida Analyzed & Compared to GTA 5",
    description: "The GTA VI mapping community breaks down the massive state of Leonida using trailer landmarks, coordinate leaks, and satellite imagery. Vice City, Port Gellhorn, Grassrivers, and the Keys measured side-by-side with Los Santos.",
    channel_name: "Serious Bear Nick",
    channel_url: "https://www.youtube.com/@SeriousBearNick",
    thumbnail_url: "https://img.youtube.com/vi/qApw-Enzs-w/maxresdefault.jpg",
    published_at: "2024-08-10T12:00:00Z",
    category: "Map & Exploration",
    secondary_categories: ["Theories & Comparisons", "Easter Eggs & Secrets"],
    schematic_concepts: [
      "Leonida 2.5x Los Santos Map Scale",
      "Vice City Metro Road Geometry",
      "Grassrivers Mud Tracks & Swamps",
      "Port Gellhorn Deepwater Terminal",
      "Leonida Keys Overseas Highway"
    ],
    video_timestamps: [
      { label: "Vice City Metro vs Los Santos Scale", seconds: 45 },
      { label: "Grassrivers Sawgrass & Mud Track Geometry", seconds: 190 },
      { label: "Port Gellhorn Container Terminal Coordinates", seconds: 380 },
      { label: "Leonida Keys Oceanic Bridges & Reefs", seconds: 590 }
    ],
    excluded: false
  },
  {
    id: "gta6-trailer-hidden-details",
    platform: "youtube",
    external_id: "JmKZUB1NBag",
    title: "GTA 6 Trailer Breakdown: 89 Hidden Details, Secrets & Lore",
    description: "Frame-by-frame analysis uncovering 89 subtle details: Lucia's parole ankle monitor, enterable storefronts, high-speed boat wakes, brand parodies, and weapon holsters.",
    channel_name: "IGN",
    channel_url: "https://www.youtube.com/@IGN",
    thumbnail_url: "https://img.youtube.com/vi/JmKZUB1NBag/maxresdefault.jpg",
    published_at: "2024-06-20T18:00:00Z",
    category: "Easter Eggs & Secrets",
    secondary_categories: ["Weapons & Combat", "Missions & Story"],
    schematic_concepts: [
      "Lucia Parole Ankle Tracker Mechanics",
      "Ocean Beach Art Deco Nightlife Signs",
      "Dynamic Sand Footprint Displacement",
      "Sunken Submarine Coral Reef Loot",
      "Enterable Storefront Glass Physics"
    ],
    video_timestamps: [
      { label: "Parole Tracker Bracelet Mechanics", seconds: 30 },
      { label: "Ocean Beach Club Neon Signage", seconds: 160 },
      { label: "Dynamic Sand Displacement Physics", seconds: 290 },
      { label: "Submarine Wreck in Coral Reefs", seconds: 430 }
    ],
    excluded: false
  },
  {
    id: "gta6-vice-city-comparison",
    platform: "youtube",
    external_id: "zYcWQYx1tr8",
    title: "GTA 6 Extended Look vs GTA Vice City Locations Comparison (1986 vs 2026)",
    description: "Comparing iconic locations side-by-side: Ocean Drive, the Malibu Club, Starfish Island, Leaf Links, and Escobar Airport. Witness the 40-year visual and architectural leap from the PS2 era to modern photorealism.",
    channel_name: "Onespot Gaming",
    channel_url: "https://www.youtube.com/@OnespotGaming",
    thumbnail_url: "https://img.youtube.com/vi/zYcWQYx1tr8/maxresdefault.jpg",
    published_at: "2024-09-02T15:30:00Z",
    category: "Theories & Comparisons",
    secondary_categories: ["Map & Exploration", "Soundtrack & World"],
    schematic_concepts: [
      "Ocean Drive Art Deco Strip 40-Year Jump",
      "Starfish Island Vercetti Mansion Legacy",
      "Malibu Club Reimagined Nightclub",
      "Escobar International Runway Expansion",
      "Venetian Islands Waterway Bridges"
    ],
    video_timestamps: [
      { label: "Ocean Drive Art Deco Strip", seconds: 15 },
      { label: "Starfish Island Cartel Compounds", seconds: 120 },
      { label: "Malibu Club & Vice City Nightlife", seconds: 250 },
      { label: "Vice Beach Bridges & Marina Docks", seconds: 390 }
    ],
    excluded: false
  },
  {
    id: "gta6-map-hidden-secrets",
    platform: "youtube",
    external_id: "Bh5BhyYcaL0",
    title: "GTA 6 Leonida Map Breakdown — Secret Areas You Missed!",
    description: "Investigating off-grid hunting cabins, offshore naval facilities, sunken drug freighters, and hidden radar stations scattered across the swamps and archipelago of Leonida.",
    channel_name: "LeftZ games",
    channel_url: "https://www.youtube.com/@LeftZgames",
    thumbnail_url: "https://img.youtube.com/vi/Bh5BhyYcaL0/maxresdefault.jpg",
    published_at: "2024-10-12T11:00:00Z",
    category: "Map & Exploration",
    secondary_categories: ["Easter Eggs & Secrets", "Money & Economy"],
    schematic_concepts: [
      "Grassrivers Poacher Off-Grid Camps",
      "Sunken Contraband Freighter Dive Site",
      "Keys Historic Lighthouse Sniper Perch",
      "Radar Listening Post in North Forest",
      "Hidden Smuggler Airboat Docks"
    ],
    video_timestamps: [
      { label: "Everglades Poacher Compound", seconds: 25 },
      { label: "Underwater Cargo Wreck Loot", seconds: 180 },
      { label: "Keys Historic Lighthouse Sniper Nest", seconds: 320 }
    ],
    excluded: false
  },
  {
    id: "gta6-returning-characters",
    platform: "youtube",
    external_id: "gGBpomUaorQ",
    title: "Rockstar Never Forgot These Characters — GTA 6 Lore & Connections",
    description: "Investigating returning lore connections from the 3D and HD universes: Tommy Vercetti's empire legacy, Ken Rosenberg's legal fallout, Phil Cassidy's gun shops, and modern cartel successors.",
    channel_name: "Revenger Boss",
    channel_url: "https://www.youtube.com/@RevengerBoss",
    thumbnail_url: "https://img.youtube.com/vi/gGBpomUaorQ/maxresdefault.jpg",
    published_at: "2024-11-05T16:00:00Z",
    category: "Characters",
    secondary_categories: ["Theories & Comparisons", "Missions & Story"],
    schematic_concepts: [
      "Vercetti Cartel Estate Ruins in 2026",
      "Ken Rosenberg Disbarment & Legal Lore",
      "Phil Cassidy Armory Supply Network",
      "Auntie Poulet Haitian Syndicate Successors",
      "Modern Leonida Underworld Factions"
    ],
    video_timestamps: [
      { label: "The Vercetti Estate in Modern Vice City", seconds: 20 },
      { label: "Ken Rosenberg & Legal Disbarment Lore", seconds: 110 },
      { label: "Auntie Poulet & Haitian Syndicate Ties", seconds: 210 }
    ],
    excluded: false
  },
  {
    id: "gta6-nightclubs-and-physics",
    platform: "youtube",
    external_id: "n5U51oHhlpI",
    title: "GTA 6 Next-Gen Physics, Nightclub Interiors & RAGE 9 Capabilities",
    description: "Digital analysis of Rockstar's proprietary RAGE 9 engine: fluid displacement for swamp water, cloth deformation, volumetric fog, dynamic lighting, and interior transitions.",
    channel_name: "LeftZ games",
    channel_url: "https://www.youtube.com/@LeftZgames",
    thumbnail_url: "https://img.youtube.com/vi/n5U51oHhlpI/maxresdefault.jpg",
    published_at: "2024-11-18T13:45:00Z",
    category: "Easter Eggs & Secrets",
    secondary_categories: ["Mods & PC", "Soundtrack & World", "Customization & Style"],
    schematic_concepts: [
      "Volumetric Club Fog & Lasers",
      "RAGE 9 Water Fluid Displacement",
      "Vehicle Body Damage Deformation",
      "Cloth Simulation & Hair Dynamics",
      "Seamless Interior-to-Exterior Flow"
    ],
    video_timestamps: [
      { label: "Volumetric Smoke & Club Lasers", seconds: 15 },
      { label: "Realistic Water Displacement in Boats", seconds: 140 },
      { label: "Vehicle Body Deformation & Paint Shimmer", seconds: 280 }
    ],
    excluded: false
  },
  {
    id: "gta6-5-tiny-things-missed",
    platform: "youtube",
    external_id: "wZ6OVggOZk4",
    title: "5 Tiny Things You Missed in GTA 6 Trailer 1",
    description: "Five subtle background details that confirm gameplay mechanics: vehicle trunk weapon storage, dual-wielding handguns, interactive pawn shops, and wildlife AI predators.",
    channel_name: "GTA Mojo",
    channel_url: "https://www.youtube.com/@GTAMojo",
    thumbnail_url: "https://img.youtube.com/vi/wZ6OVggOZk4/maxresdefault.jpg",
    published_at: "2024-07-22T09:00:00Z",
    category: "Missions & Story",
    secondary_categories: ["Weapons & Combat", "Vehicles", "Easter Eggs & Secrets"],
    schematic_concepts: [
      "Dual Protagonist Instant Weapon Swap",
      "Vehicle Trunk Locker Gun Storage",
      "Alligator Dynamic Hunting AI Loop",
      "Pawn Shop Fence & Money Laundering",
      "Interactive Convenience Store Robbery"
    ],
    video_timestamps: [
      { label: "Dual Protagonist Weapon Swap", seconds: 20 },
      { label: "Trunk Gun Locker Storage", seconds: 95 },
      { label: "Alligator Dynamic Food Chain AI", seconds: 180 }
    ],
    excluded: false
  },
  {
    id: "gta6-graphics-comparison",
    platform: "youtube",
    external_id: "8m9FJpmoIKs",
    title: "GTA 6 Graphics Comparison — Lighting, Textures & Draw Distance",
    description: "Comprehensive graphical comparison examining screen-space reflections, ray-traced global illumination, high-density traffic simulation, and ocean water dynamics in Leonida.",
    channel_name: "GTA VI Now",
    channel_url: "https://www.youtube.com/@GTAVINow",
    thumbnail_url: "https://img.youtube.com/vi/8m9FJpmoIKs/maxresdefault.jpg",
    published_at: "2024-10-28T17:15:00Z",
    category: "Theories & Comparisons",
    secondary_categories: ["Mods & PC", "Vehicles", "Map & Exploration"],
    schematic_concepts: [
      "Hardware Ray-Traced Sunset Shadows",
      "Ocean Wave Foam & Spray Physics",
      "Ultra-Dense Traffic AI Simulation",
      "Neon Headlight Puddle Reflections",
      "Draw Distance to Leonard County"
    ],
    video_timestamps: [
      { label: "Ray-Traced Sunset Shadows", seconds: 15 },
      { label: "Ocean Waves & Particle Spray", seconds: 120 },
      { label: "Traffic Density & Headlight Reflections", seconds: 230 }
    ],
    excluded: false
  },
  {
    id: "gta6-vice-city-duo-evolution",
    platform: "youtube",
    external_id: "oEKwrciB7bU",
    title: "Vice City's Duo: 1986 Tommy & Lance vs 2026 Jason & Lucia",
    description: "Contrasting the iconic partnership of Tommy Vercetti and Lance Vance in 1986 with the modern Bonnie-and-Clyde romantic criminal dynamic of Jason and Lucia.",
    channel_name: "Fxy",
    channel_url: "https://www.youtube.com/@Fxy",
    thumbnail_url: "https://img.youtube.com/vi/oEKwrciB7bU/maxresdefault.jpg",
    published_at: "2024-12-01T20:00:00Z",
    category: "Characters",
    secondary_categories: ["Missions & Story", "Theories & Comparisons"],
    schematic_concepts: [
      "1986 Vercetti-Vance Syndicate Power Struggle",
      "Trust vs Betrayal Narrative Arc",
      "Jason & Lucia Bonnie-and-Clyde Bond",
      "Co-op Heist Tactical Mechanics",
      "Leonida Underworld Alliances"
    ],
    video_timestamps: [
      { label: "The 1986 Power Grab Dynamic", seconds: 10 },
      { label: "Trust & Betrayal in the Underworld", seconds: 80 },
      { label: "Jason & Lucia's Shared Destiny", seconds: 150 }
    ],
    excluded: false
  },
  {
    id: "gta6-real-life-locations",
    platform: "youtube",
    external_id: "HzU8xRORtac",
    title: "GTA 6 vs Real Life Florida — Places That Are 100% Real",
    description: "Touring the real-world Florida locations recreated in Leonida: Ocean Drive Art Deco hotels, the Wynwood graffiti district, the Overseas Highway to Key West, and the alligator swamps.",
    channel_name: "DAX IS LIVE",
    channel_url: "https://www.youtube.com/@DAXISLIVE",
    thumbnail_url: "https://img.youtube.com/vi/HzU8xRORtac/maxresdefault.jpg",
    published_at: "2024-11-12T19:30:00Z",
    category: "Easter Eggs & Secrets",
    secondary_categories: ["Map & Exploration", "Customization & Style"],
    schematic_concepts: [
      "South Beach Ocean Drive Real Architecture",
      "Wynwood Arts District Graffiti Murals",
      "Seven Mile Bridge Overseas Highway",
      "Everglades Airboat Gator Tours",
      "Krome Detention Center Parody"
    ],
    video_timestamps: [
      { label: "South Beach Ocean Drive Real Life Match", seconds: 10 },
      { label: "Wynwood Arts District Graffiti Walls", seconds: 60 },
      { label: "Seven Mile Bridge Overseas Highway", seconds: 110 }
    ],
    excluded: false
  }
];
