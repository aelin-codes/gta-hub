export interface Article {
  slug: string
  title: string
  summary: string
  content: string
  published_at: string
  author: string
  image: string
  category?: string
  readTime?: string
}

export const ARTICLES: Article[] = [
  {
    "slug": "gta-6-leonida-map-leak-analysis",
    "title": "GTA 6 Leonida Map Leak Analysis: Vice City, Port Gellhorn & The Keys",
    "summary": "A forensic breakdown of the Leonida state map, coordinate mapping project, landmass scaling vs Los Santos, and confirmed regional biomes.",
    "readTime": "8 min read",
    "category": "Map & World",
    "content": "\n      <p class=\"lead\">Rockstar Games is redefining open-world scale with the state of <strong>Leonida</strong>. Synthesizing data from the official December 2023 reveal trailer, the community mapping project, and telemetry leaked during early developmental builds, Leonida promises to be Rockstar's most ambitious playground to date — estimated at <strong>2.3x to 2.7x the landmass of GTA V's San Andreas</strong>.</p>\n      \n      <h2>Major Geographical Regions & Biomes</h2>\n      <p>Unlike the singular metropolis layout of GTA V where Los Santos was anchored by Mount Chiliad to the north, Leonida is designed around distinct cultural, economic, and ecological hubs:</p>\n      \n      <ul>\n        <li><strong>Vice City Metro:</strong> The pulsating neon core. Includes Vice Beach (Ocean Drive / Washington Beach), Starfish Island (luxury compounds), Downtown skyscrapers, Little Haiti, Little Havana, and the Vice City International Airport (MIA inspired).</li>\n        <li><strong>Port Gellhorn:</strong> Located on the western coast, Port Gellhorn represents Leonida's industrial rust-belt. Characterized by container ports, rail yards, chemical plants, and blue-collar trailer parks, it serves as the backdrop for smuggling and cargo heists.</li>\n        <li><strong>Leonida Keys (Gator Keys):</strong> A serpentine archipelago south of the mainland connected by the iconic Overseas Highway. Featuring turquoise waters, sunken shipwrecks, private marinas, and stilt houses, watercraft travel is essential.</li>\n        <li><strong>Grassrivers (The Everglades):</strong> A vast, treacherous wetland region dominated by sawgrass marshes, mangrove tunnels, and mud-bogging tracks. Airboats and off-road 4x4s are crucial to avoid aggressive bull alligators and snakes.</li>\n        <li><strong>Kelly County & Ambrosia:</strong> Wealthy suburban equestrian estates, country clubs, and planned gated communities contrasting with rural mud-fest arenas and dragstrips.</li>\n        <li><strong>Mount Kalaga & Northern Foothills:</strong> Dense pine forests, state reserves, and elevated ridges offering paragliding vistas and off-grid mountain cabins.</li>\n      </ul>\n\n      <h2>World Telemetry & Density Comparison</h2>\n      <p>Community cartographers have triangulated line-of-sight angles from trailer shots, confirming that skyscrapers on Vice Beach are rendered with zero LOD pop-in across kilometers of bay water. Furthermore, interior enterability has spiked dramatically — leak analyses indicate over <strong>60% of commercial storefronts</strong> (supermarkets, pawn shops, laundromats, diners, and clubs) feature fully modelled interiors for seamless holdups and navigation.</p>\n      \n      <p>Leonida features a multi-tiered interstate network (Interstate 97), intricate backcountry dirt roads, and navigable nautical channels that allow long-range boat getaways from the Keys directly into downtown canals.</p>\n    ",
    "published_at": "2026-08-15T12:00:00.000Z",
    "author": "Vice City Cartography Bureau",
    "image": "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=1200&auto=format&fit=crop&q=80"
  },
  {
    "slug": "jason-lucia-character-backgrounds-theories",
    "title": "Jason & Lucia: Character Deep Dive & The Modern Bonnie & Clyde Dynamic",
    "summary": "Everything confirmed and deduced about Lucia Caminos and Jason Duval: criminal origins, ankle monitor mechanics, and trust-based dual protagonist gameplay.",
    "readTime": "7 min read",
    "category": "Characters & Story",
    "content": "\n      <p class=\"lead\">At the emotional center of Grand Theft Auto VI is the relationship between <strong>Lucia Caminos</strong> and <strong>Jason Duval</strong>. Moving away from the three-way fractured dynamic of GTA V (Michael, Franklin, Trevor), GTA VI introduces an intimate, high-stakes partnership inspired by the legendary outlaws Bonnie and Clyde.</p>\n      \n      <h2>Lucia Caminos: Leonida's First Female Protagonist</h2>\n      <p>Trailer 1 opens with Lucia inside Leonida Penitentiary dressed in an orange DOC jumpsuit, being interviewed by correctional counselor Stefanie. When asked if she knows why she is there, she replies coolly: <em>\"Bad luck, I guess.\"</em></p>\n      <p>Key details confirmed from early development footage and trailer frames:</p>\n      <ul>\n        <li><strong>Parole & Ankle Monitoring:</strong> Art and gameplay telemetry confirm Lucia wears an electronic ankle monitor early in the story. This suggests a progressive world-unlock mechanic where venturing beyond authorized metropolitan sectors triggers rapid police response.</li>\n        <li><strong>Combat Specialization:</strong> Lucia demonstrates explosive close-quarters firearm proficiency, dual-wielding handguns, executing aggressive hostage control, and vaulting counters with agility.</li>\n        <li><strong>Motivations:</strong> Driven by survival and ambition, Lucia refuses to settle for low-wage dead ends after prison, pulling Jason into larger commercial scores.</li>\n      </ul>\n\n      <h2>Jason Duval: The Pragmatic Wheelman</h2>\n      <p>Jason serves as the tactical anchor of the duo. Leaked gameplay clips highlight his background in precision driving, vehicle mechanics, and tactical weapons handling.</p>\n      <ul>\n        <li><strong>Personality:</strong> Quiet, observant, and intensely protective of Lucia. While Lucia brings fiery initiative and charisma, Jason brings cold calculation and exit strategies.</li>\n        <li><strong>Vehicle Expertise:</strong> Jason possesses unique automotive abilities, including hotwiring techniques, manual brake-bias tuning, and high-speed precision ramming.</li>\n      </ul>\n\n      <h2>The \"Trust\" Mechanic & Shared Inventory</h2>\n      <p>Dialogue in Trailer 1 places heavy emphasis on trust: <em>\"The only way we’re gonna get through this is by sticking together, being a team.\"</em> Gameplay leaks reveal an interactive partner command system:</p>\n      <ul>\n        <li><strong>Contextual Orders:</strong> Order your partner to cover the rear, intimidate store clerks, hold hostages, or pull up the getaway vehicle.</li>\n        <li><strong>Trunk & Duffel Bag Inventory:</strong> Carrying over innovations from Red Dead Redemption 2, players cannot carry infinite heavy weapons. Long arms must be stashed in the trunk of your vehicle or carried in duffel bags.</li>\n        <li><strong>Character Switching:</strong> Seamless real-time swapping during missions and in free-roam.</li>\n      </ul>\n    ",
    "published_at": "2026-08-20T14:30:00.000Z",
    "author": "GTA VI Lore Archive",
    "image": "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80"
  },
  {
    "slug": "vice-city-1986-vs-leonida-2026",
    "title": "Vice City 1986 vs. Leonida 2026: The 40-Year Evolution of a Metropolis",
    "summary": "How iconic landmarks from Tommy Vercetti’s 1986 reign have transformed four decades later in Grand Theft Auto VI.",
    "readTime": "9 min read",
    "category": "Lore & Comparison",
    "content": "\n      <p class=\"lead\">Forty years have passed in the GTA universe since Tommy Vercetti arrived at the Marco Ross Hotel in 1986. With GTA VI returning to Vice City in 2026, Rockstar has crafted an extraordinary architectural and cultural dialogue between the past and present.</p>\n      \n      <h2>Iconic Landmark Transformations</h2>\n      <p>Key locations across Vice City have evolved dramatically:</p>\n      <ul>\n        <li><strong>Ocean Drive:</strong> Once lined with 80s pastel convertibles and roller skaters, it is now an intoxicating neon boulevard dominated by viral livestreamers, supercar revvers, and rooftop lounges.</li>\n        <li><strong>Starfish Island:</strong> The legendary Vercetti Estate and Diaz compound has become an ultra-secure billionaire enclave guarded by private contractors.</li>\n        <li><strong>Malibu Club:</strong> Transformed from an 80s disco into an internationally renowned superclub with mega-watt bass stages and VIP cabanas.</li>\n        <li><strong>Little Haiti & Little Havana:</strong> Culturally rich districts with street murals, local food stands, and underground street racing networks.</li>\n      </ul>\n\n      <h2>The Enduring Legacy of Tommy Vercetti</h2>\n      <p>Rockstar honors Tommy Vercetti's conquest through rich environmental storytelling:</p>\n      <ul>\n        <li><strong>Vercetti Floral Prints:</strong> Hawaiian tropical floral shirts appear across boutique stores.</li>\n        <li><strong>Love Fist Reunions:</strong> Billboards across Downtown advertise anniversary tours for Jezz Torrent and the Scottish heavy metal crew.</li>\n        <li><strong>Cortez Marina Heritage:</strong> Tributes commemorate the legendary parties of Colonel Juan Garcia Cortez.</li>\n      </ul>\n    ",
    "published_at": "2026-08-25T16:00:00.000Z",
    "author": "Vice City Heritage Foundation",
    "image": "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=1200&auto=format&fit=crop&q=80"
  },
  {
    "slug": "gta-6-weapons-tactical-gear-robberies",
    "title": "GTA 6 Weapons, Tactical Gear & Dynamic Robberies Breakdown",
    "summary": "In-depth analysis of the overhauled gunplay, duffel bag logistics, car trunk armories, and advanced law enforcement AI response cordons.",
    "readTime": "6 min read",
    "category": "Gameplay Mechanics",
    "content": "\n      <p class=\"lead\">Grand Theft Auto VI marks a decisive break from arcade combat, adopting a grounded, tactical gunplay loop that rewards spatial awareness, weapon discipline, and meticulous getaway planning.</p>\n      \n      <h2>Realistic Inventory & Weapon Encumbrance</h2>\n      <ul>\n        <li><strong>Concealed vs. Long Arms:</strong> Carry two concealed sidearms inside waistbands or holsters. Long rifles and shotguns must be physically slung or carried in hands.</li>\n        <li><strong>Trunk Storage Arsenal:</strong> Your personal vehicle's trunk functions as a mobile armory. Pop the trunk before hits to equip appropriate firepower.</li>\n        <li><strong>Loot Duffel Bags & Zip Ties:</strong> Subdue clerks with zip ties or duct tape, and physically stuff cash and jewelry into duffel bags.</li>\n      </ul>\n\n      <h2>Tactical Law Enforcement AI (VCPD & State Troopers)</h2>\n      <ul>\n        <li><strong>Perimeter Cordons & Spike Strips:</strong> Cruisers establish roadblocks and lay tire spikes along bridges leaving Vice Beach.</li>\n        <li><strong>K9 Units & FLIR Helicopters:</strong> Tracker dogs search marshlands while FLIR thermal spotlights penetrate tree canopies.</li>\n        <li><strong>Delayed Response & Witness 911 Calls:</strong> In remote areas, crimes aren't instantly reported unless witnesses reach a phone.</li>\n      </ul>\n    ",
    "published_at": "2026-08-28T11:00:00.000Z",
    "author": "Tactical Recon Division",
    "image": "https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=1200&auto=format&fit=crop&q=80"
  },
  {
    "slug": "wildlife-ecosystem-leonida-alligators-hunting",
    "title": "Wildlife & Ecosystem of Leonida: Alligators, Predators & Living Nature",
    "summary": "Exploring the dynamic fauna of the Everglades, deep sea marine life, aggressive predator encounters, and animal AI behaviors.",
    "readTime": "6 min read",
    "category": "World & Nature",
    "content": "\n      <p class=\"lead\">Leonida's wilderness is a living food chain with modern tropical species, dynamic territory disputes, and urban encroachment.</p>\n      \n      <h2>Apex Predators of the Wetlands</h2>\n      <ul>\n        <li><strong>American Alligators:</strong> Ambush prey from murky banks, damage small watercraft, and occasionally wander into suburban swimming pools.</li>\n        <li><strong>Florida Panthers:</strong> Elusive apex predators stalking northern pine groves. Fast and deadly in dense brush.</li>\n        <li><strong>Wild Boars & Venomous Snakes:</strong> Boars charge on sight, while water moccasins pose stealth threats in shallow marsh waters.</li>\n      </ul>\n\n      <h2>Marine Life & Underwater Exploration</h2>\n      <ul>\n        <li><strong>Hammerhead & Tiger Sharks:</strong> Patrol deep-water drop-offs and sunken freighters.</li>\n        <li><strong>Dolphins & Sea Turtles:</strong> Escort watercraft through coastal channels.</li>\n        <li><strong>Deep-Sea Sport Fishing:</strong> Catch marlin, tarpon, and barracuda, and trade catches with waterfront fish markets.</li>\n      </ul>\n    ",
    "published_at": "2026-09-02T09:15:00.000Z",
    "author": "Leonida Wildlife Conservation Trust",
    "image": "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&auto=format&fit=crop&q=80"
  },
  {
    "slug": "next-gen-rage-engine-hurricanes-water-physics",
    "title": "Next-Gen RAGE Engine: Volumetric Hurricanes, Water Physics & AI Crowds",
    "summary": "A technical analysis of Rockstar’s RAGE 9 engine: fluid dynamics, wind deformation, ray-traced neon reflections, and autonomous crowd simulation.",
    "readTime": "8 min read",
    "category": "Technology & Graphics",
    "content": "\n      <p class=\"lead\">Behind GTA VI's staggering visual fidelity is Rockstar's proprietary <strong>RAGE 9</strong> game engine, built exclusively for current-generation consoles and PC hardware.</p>\n      \n      <h2>Dynamic Tropical Storms & Volumetric Weather</h2>\n      <ul>\n        <li><strong>Tropical Storms & Hurricanes:</strong> Severe low-pressure systems whip gale-force winds that bend palm trees, blow debris, and generate coastal storm surges.</li>\n        <li><strong>Dynamic Water Pooling & Flooding:</strong> Low-lying streets in Vice Beach accumulate standing water that affects vehicle handling and hydroplaning.</li>\n        <li><strong>Volumetric Cloudscapes:</strong> Realistic atmospheric scattering, ground shadows, and multi-cell lightning strikes.</li>\n      </ul>\n\n      <h2>AI Crowd Density & Social Media Pipeline</h2>\n      <ul>\n        <li><strong>Autonomous Social Groupings:</strong> Over 500 cataloged routines — sunbathing, workouts, street stunts, influencer streams, and spontaneous arguments.</li>\n        <li><strong>In-Game Parody Social Network:</strong> Notable player shootouts or reckless driving can be recorded by NPC spectators and posted to the in-game viral feed!</li>\n      </ul>\n    ",
    "published_at": "2026-09-08T18:00:00.000Z",
    "author": "RAGE Tech Analytics",
    "image": "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80"
  }
];
