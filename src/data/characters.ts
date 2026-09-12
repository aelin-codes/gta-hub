// Vice City & GTA 6 Comprehensive Character Database & Lore Vault
// 56 Characters with full attributes, radar metrics, relationships, quotes, and special outfits

export interface CharacterStats {
  leadership: number
  intelligence: number
  combatSkills: number
  drivingSkills: number
  shootingSkills: number
  physicalStrength: number
  businessSkills: number
  charisma: number
  loyalty: number
  influenceReputation: number
}

export interface Relationship {
  targetName: string
  relationshipType: string
  details: string
}

export interface SpecialOutfit {
  id: string
  name: string
  imageUrl: string
  description: string
  situation: string
}

export interface SpecialAppearance {
  game: string
  role: string
  description: string
}

export interface CharacterProfile {
  fullName: string
  nicknames: string[]
  gender: string
  age: string
  nationality: string
  occupation: string
  affiliations: string[]
  status: string
  firstAppearance: string
  lastAppearance: string
  voiceActor?: string
  family: string[]
  friends: string[]
  allies: string[]
  enemies: string[]
  residence: string
  businessesOwned: string[]
  height: string
  weight: string
  clothing: string
  distinctiveFeatures: string
  leadership: string
  intelligence: string
  ambition: string
  loyalty: string
  temperament: string
  behavior: string
  strengths: string[]
  weaknesses: string[]
  relationships: Relationship[]
  missions: string[]
  beliefs: string
  ideals: string
  recurringViewpoints: string
  memorableQuotes: string[]
  statistics: CharacterStats
  specialAppearances?: SpecialAppearance[]
  specialOutfits?: SpecialOutfit[]
}

export interface Character {
  id: string
  name: string
  nickname: string
  roleCategory: 'Protagonist' | 'Major' | 'Minor' | 'Antagonist' | 'Supporting'
  game: 'GTA 6' | 'GTA Vice City' | 'GTA Vice City Stories'
  imageUrl: string
  profile: CharacterProfile
}

export const CHARACTERS: Character[] = [
  {
    "id": "lucia-caminos",
    "name": "Lucia Caminos",
    "nickname": "The Wildcard",
    "roleCategory": "Protagonist",
    "game": "GTA 6",
    "imageUrl": "/images/characters/lucia.jpg",
    "profile": {
      "fullName": "Lucia Caminos",
      "nicknames": [
        "Lucia",
        "Lucy"
      ],
      "gender": "Female",
      "age": "Late 20s (2026)",
      "nationality": "Latina-American",
      "occupation": "Armed Robber / Wheelwoman / Ex-Inmate",
      "affiliations": [
        "Jason & Lucia Duo",
        "Leonida Penitentiary (formerly)"
      ],
      "status": "Alive",
      "firstAppearance": "GTA VI Trailer 1",
      "lastAppearance": "Active Protagonist",
      "voiceActor": "Manni L. Perez (Rumored/Likely)",
      "family": [
        "Unknown Mother",
        "Estranged Father in Leonida"
      ],
      "friends": [
        "Jason Duval",
        "Stefanie (Counselor)"
      ],
      "allies": [
        "Cal Hampton",
        "Raul & Dale"
      ],
      "enemies": [
        "VCPD Tactical Squad",
        "Leonard County Sheriff's Dept",
        "San Chian Cartel"
      ],
      "residence": "Vice Beach Safehouse / Port Gellhorn Motel",
      "businessesOwned": [
        "Chop Shop Front (Speculated)",
        "Stolen Contraband Locker"
      ],
      "height": "5 ft 7 in (170 cm)",
      "weight": "135 lbs (61 kg)",
      "clothing": "Prison jumper (intro), coral halter top, distressed denim shorts, gold chain necklace, ankle monitor",
      "distinctiveFeatures": "Athletic frame, dark wavy hair, ankle monitoring bracelet, piercing gaze",
      "leadership": "Fierce and instinctive. Drives the criminal enterprise and takes daring initiatives under fire.",
      "intelligence": "High situational awareness. Expert in social engineering, distraction tactics, and safe-cracking.",
      "ambition": "Relentless hunger for freedom and luxury after surviving incarceration.",
      "loyalty": "Unbreakable bond with Jason; 'The only way we’re gonna get through this is by sticking together.'",
      "temperament": "Passionate, fiery, yet acutely calculating during high-stakes robberies.",
      "behavior": "Dynamic, charismatic, fearless behind the wheel or with a drawn firearm.",
      "strengths": [
        "CQC & Firearm Quick-Draw",
        "Evasive Driving",
        "High-Stress Planning",
        "Negotiation Under Threat"
      ],
      "weaknesses": [
        "Impulsive temper",
        "Emotional vulnerability regarding Jason's safety",
        "Ankle monitor tracking vulnerabilities"
      ],
      "relationships": [
        {
          "targetName": "Jason Duval",
          "relationshipType": "Partner in Crime & Romantic Interest",
          "details": "A Bonnie-and-Clyde bond of mutual trust, surviving together in criminal Leonida."
        },
        {
          "targetName": "Stefanie",
          "relationshipType": "Parole Counselor / Confidante",
          "details": "Counselor at the Leonida Department of Corrections who reviews Lucia's parole status."
        },
        {
          "targetName": "Cal Hampton",
          "relationshipType": "Swamp Informant / Weapons Contact",
          "details": "Supplies Lucia and Jason with untraceable gear and airboat logistics in Grassrivers."
        }
      ],
      "missions": [
        "Trailer 1 Convenience Store Heist",
        "Leonida Highway Escape",
        "Port Gellhorn Motel Getaway",
        "Nightclub Dropoff"
      ],
      "beliefs": "Bad luck got me locked up; bad habits are gonna keep us rich.",
      "ideals": "Uncompromising personal liberty and financial freedom at all costs.",
      "recurringViewpoints": "Trust is a weapon you only hand to someone ready to die with you.",
      "memorableQuotes": [
        "\"The only way we’re gonna get through this is by sticking together, being a team.\"",
        "\"Bad luck, I guess.\"",
        "\"Trust? Trust is everything out here.\""
      ],
      "statistics": {
        "leadership": 92,
        "intelligence": 94,
        "combatSkills": 91,
        "drivingSkills": 89,
        "shootingSkills": 93,
        "physicalStrength": 82,
        "businessSkills": 85,
        "charisma": 96,
        "loyalty": 98,
        "influenceReputation": 88
      },
      "specialAppearances": [
        {
          "game": "GTA VI Trailer 1",
          "role": "Main Focus",
          "description": "Featured in the opening scene in prison garb and throughout multiple high-octane heist clips."
        }
      ],
      "specialOutfits": [
        {
          "id": "outfit-prison-inmate",
          "name": "Leonida Dept. of Corrections Jumpsuit",
          "imageUrl": "/images/characters/lucia.jpg",
          "description": "Standard-issue orange prison inmate uniform with serial stenciling.",
          "situation": "Worn during the opening prison orientation sequence with counselor Stefanie."
        },
        {
          "id": "outfit-vice-heist",
          "name": "Vice Sunset Heist Casual",
          "imageUrl": "/images/characters/lucia.jpg",
          "description": "Pink patterned bandeau top, denim shorts, black boots, and a bandana disguise.",
          "situation": "Worn during the convenience store robbery shown in Trailer 1."
        },
        {
          "id": "outfit-nightclub-glam",
          "name": "Downtown Vice Nightclub Glam",
          "imageUrl": "/images/characters/lucia.jpg",
          "description": "Sleek backless metallic silver mini-dress with high-heel stilettos.",
          "situation": "Disguise used to infiltrate high-society VIP lounges and nightclub rooftop parties."
        }
      ]
    }
  },
  {
    "id": "jason-duval",
    "name": "Jason Duval",
    "nickname": "The Wheelman",
    "roleCategory": "Protagonist",
    "game": "GTA 6",
    "imageUrl": "/images/characters/jason.jpg",
    "profile": {
      "fullName": "Jason Duval",
      "nicknames": [
        "Jason",
        "J"
      ],
      "gender": "Male",
      "age": "Early 30s (2026)",
      "nationality": "American (Southern/Leonida)",
      "occupation": "Wheelman / Gunfighter / Ex-Military Contractor",
      "affiliations": [
        "Jason & Lucia Duo",
        "Keys Fishing Syndicate (formerly)"
      ],
      "status": "Alive",
      "firstAppearance": "GTA VI Trailer 1",
      "lastAppearance": "Active Protagonist",
      "voiceActor": "Gregory Connors / TBA",
      "family": [
        "Unknown Relatives in Georgia/North Leonida"
      ],
      "friends": [
        "Lucia Caminos",
        "Brian Heder"
      ],
      "allies": [
        "Cal Hampton",
        "Dre"
      ],
      "enemies": [
        "San Chian Cartel",
        "VCPD SWAT",
        "Underworld Loan Sharks"
      ],
      "residence": "Vice Beach Safehouse / Grassrivers Stash Cabin",
      "businessesOwned": [
        "Underground Chop Shop",
        "Offshore Speedboat Dock"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "195 lbs (88 kg)",
      "clothing": "Backward baseball cap, white tank top / olive tactical cargo shirt, cargo pants, work boots",
      "distinctiveFeatures": "Muscular build, rugged stubble, tactical grip tattoos, calm demeanor under fire",
      "leadership": "Steady, dependable, and tactical. Prefers meticulous route planning over chaotic gunfights.",
      "intelligence": "Exceptional mechanical and automotive engineering knowledge; master precision driver.",
      "ambition": "To build a secure future with Lucia and escape the bottom-feeder criminal grind.",
      "loyalty": "Completely committed to Lucia; defends her with lethal precision.",
      "temperament": "Stoic, quiet, observant, deadly when provoked.",
      "behavior": "Pragmatic, methodical, protective, unflinching in shootouts.",
      "strengths": [
        "Precision High-Speed Driving",
        "Military Tactical Marksmanship",
        "Vehicle Hotwiring & Tuning",
        "Hand-to-Hand Brawling"
      ],
      "weaknesses": [
        "Hesitant to leave Lucia's side",
        "Prone to underestimating corrupt law enforcement nets"
      ],
      "relationships": [
        {
          "targetName": "Lucia Caminos",
          "relationshipType": "Partner in Crime & Romantic Counterpart",
          "details": "Trusts Lucia with his life; together they orchestrate armed robberies across Vice City."
        },
        {
          "targetName": "Brian Heder",
          "relationshipType": "Smuggling Associate",
          "details": "Longtime Port Gellhorn contact who tips Jason off to high-value cargo shipments."
        }
      ],
      "missions": [
        "Store Holdup Getaway",
        "Vice City Beach Expressway Pursuit",
        "Swamp Airboat Extradition"
      ],
      "beliefs": "Keep your head down, your engine tuned, and your eyes on the exit.",
      "ideals": "Total loyalty to the crew and getting out before the house takes your stake.",
      "recurringViewpoints": "Words don't stop bullets; speed and planning do.",
      "memorableQuotes": [
        "\"Trust.\"",
        "\"Hold on tight, we're not stopping for red lights tonight.\"",
        "\"If we're doing this, we do it right the first time.\""
      ],
      "statistics": {
        "leadership": 88,
        "intelligence": 91,
        "combatSkills": 95,
        "drivingSkills": 98,
        "shootingSkills": 94,
        "physicalStrength": 92,
        "businessSkills": 80,
        "charisma": 84,
        "loyalty": 99,
        "influenceReputation": 86
      },
      "specialAppearances": [
        {
          "game": "GTA VI Trailer 1",
          "role": "Co-Lead",
          "description": "Shown kicking down doors, escaping in high-speed chases, and affirming trust with Lucia."
        }
      ],
      "specialOutfits": [
        {
          "id": "outfit-heist-tactical",
          "name": "Getaway Tactician",
          "imageUrl": "/images/characters/jason.jpg",
          "description": "Olive drab utility vest with heavy-duty pockets, combat boots, and driving gloves.",
          "situation": "Equipped during bank truck and armored courier takedowns."
        },
        {
          "id": "outfit-vice-coastal",
          "name": "Keys Coastal Casual",
          "imageUrl": "/images/characters/jason.jpg",
          "description": "Lightweight linen floral button-down, aviator sunglasses, and cargo shorts.",
          "situation": "Ideal for low-profile reconnaissance in resort marinas and waterfront bars."
        }
      ]
    }
  },
  {
    "id": "stefanie",
    "name": "Stefanie",
    "nickname": "The Counselor",
    "roleCategory": "Supporting",
    "game": "GTA 6",
    "imageUrl": "/images/characters/stefanie.jpg",
    "profile": {
      "fullName": "Stefanie (Last Name Redacted)",
      "nicknames": [
        "Stef",
        "Officer Stefanie"
      ],
      "gender": "Female",
      "age": "Early 40s (2026)",
      "nationality": "American",
      "occupation": "Parole Officer / Correctional Counselor",
      "affiliations": [
        "Leonida Department of Corrections",
        "State Parole Board"
      ],
      "status": "Alive",
      "firstAppearance": "GTA VI Trailer 1",
      "lastAppearance": "Trailer 1 Dialogue",
      "voiceActor": "TBA",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Department Colleagues"
      ],
      "allies": [
        "Correctional Staff"
      ],
      "enemies": [
        "Repeat Felons who violate parole"
      ],
      "residence": "Vice City Metro",
      "businessesOwned": [],
      "height": "5 ft 8 in (173 cm)",
      "weight": "145 lbs (66 kg)",
      "clothing": "Professional state corrections blazer, reading glasses, clipboard and pen",
      "distinctiveFeatures": "Poised demeanor, analytical gaze, authoritative yet conversational voice",
      "leadership": "Manages heavy inmate case dockets with psychological insight.",
      "intelligence": "Trained in behavioral criminology and rehabilitative risk assessment.",
      "ambition": "To prevent recidivism while navigating a stressed state prison system.",
      "loyalty": "To the state penal code and rehabilitation guidelines.",
      "temperament": "Measured, patient, difficult to deceive.",
      "behavior": "Direct, inquisitorial, professional.",
      "strengths": [
        "Psychological Profiling",
        "De-escalation",
        "Institutional Authority"
      ],
      "weaknesses": [
        "Underestimates how deeply embedded organized crime is outside prison walls"
      ],
      "relationships": [
        {
          "targetName": "Lucia Caminos",
          "relationshipType": "Parolee & Caseworker",
          "details": "Evaluates Lucia's readiness for release; challenges her understanding of why she was incarcerated."
        }
      ],
      "missions": [
        "Trailer 1 Opening Interview"
      ],
      "beliefs": "People only change when they confront the truth of their choices.",
      "ideals": "Order and accountability in an unruly state.",
      "recurringViewpoints": "Do you know why you're here?",
      "memorableQuotes": [
        "\"Lucia, do you know why you're here?\""
      ],
      "statistics": {
        "leadership": 84,
        "intelligence": 92,
        "combatSkills": 50,
        "drivingSkills": 65,
        "shootingSkills": 60,
        "physicalStrength": 60,
        "businessSkills": 75,
        "charisma": 80,
        "loyalty": 88,
        "influenceReputation": 82
      },
      "specialAppearances": [
        {
          "game": "GTA VI Trailer 1",
          "role": "Opening Questioner",
          "description": "Interviews Lucia inside Leonida Penitentiary in the game's official debut scene."
        }
      ]
    }
  },
  {
    "id": "cal-hampton",
    "name": "Cal Hampton",
    "nickname": "Gator Cal",
    "roleCategory": "Supporting",
    "game": "GTA 6",
    "imageUrl": "/images/characters/cal_hampton.jpg",
    "profile": {
      "fullName": "Cal Hampton",
      "nicknames": [
        "Gator Cal",
        "Swamp Dog"
      ],
      "gender": "Male",
      "age": "Late 30s (2026)",
      "nationality": "American (Native Floridian/Leonidan)",
      "occupation": "Airboat Operator / Swamp Guide / Contraband Fencer",
      "affiliations": [
        "Grassrivers Mud Club",
        "Kelly County Independent Trappers"
      ],
      "status": "Alive",
      "firstAppearance": "GTA VI Trailer 1 (Mud Club)",
      "lastAppearance": "Leonida Lore Leak",
      "voiceActor": "TBA",
      "family": [
        "Hampton Clan in Kelly County"
      ],
      "friends": [
        "Mud bogging enthusiasts",
        "Local moonshiners"
      ],
      "allies": [
        "Jason Duval",
        "Lucia Caminos"
      ],
      "enemies": [
        "Leonida Wildlife Conservation Officers",
        "Gator poachers"
      ],
      "residence": "Grassrivers Swamps, Kelly County",
      "businessesOwned": [
        "Cal's Swamp Tours & Repair",
        "Off-grid Airboat Depot"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "210 lbs (95 kg)",
      "clothing": "Mud-splattered overalls, trucker hat, work boots, sleeveless flannel",
      "distinctiveFeatures": "Long scruffy beard, mud-caked boots, gator tooth necklace",
      "leadership": "Natural leader among swamp folk and off-road clubs.",
      "intelligence": "Encyclopedic knowledge of Leonida waterways, animal tracking, and hidden channels.",
      "ambition": "Keep big city corporations and luxury developers out of the wetlands.",
      "loyalty": "Defends true locals fiercely; suspicious of high-rise city elites.",
      "temperament": "Boisterous, wild, fearless around apex predators.",
      "behavior": "Unpredictable, loud, welcoming to fellow adrenaline junkies.",
      "strengths": [
        "Apex Predator Handling",
        "Airboat Stunt Driving",
        "Wetland Navigation",
        "Improvised Explosives"
      ],
      "weaknesses": [
        "Lacks modern digital tech skills",
        "Heavy drinker during swamp festivals"
      ],
      "relationships": [
        {
          "targetName": "Jason Duval",
          "relationshipType": "Off-Grid Ally",
          "details": "Guides Jason through marsh channels to evade state police helicopters."
        }
      ],
      "missions": [
        "Grassrivers Mudfest Rally",
        "Airboat Bayou Contraband Run"
      ],
      "beliefs": "The swamp takes care of those who respect it and eats those who don't.",
      "ideals": "Total autonomy outside municipal city codes.",
      "recurringViewpoints": "If an alligator don't bother you, the sheriff won't neither.",
      "memorableQuotes": [
        "\"Out here in the mud, nobody cares about your credit score!\"",
        "\"Watch your step, that ain't a log you're standing on.\""
      ],
      "statistics": {
        "leadership": 80,
        "intelligence": 78,
        "combatSkills": 88,
        "drivingSkills": 92,
        "shootingSkills": 86,
        "physicalStrength": 91,
        "businessSkills": 68,
        "charisma": 85,
        "loyalty": 90,
        "influenceReputation": 79
      },
      "specialAppearances": []
    }
  },
  {
    "id": "brian-heder",
    "name": "Brian Heder",
    "nickname": "The Dockmaster",
    "roleCategory": "Supporting",
    "game": "GTA 6",
    "imageUrl": "/images/characters/brian_heder.jpg",
    "profile": {
      "fullName": "Brian Heder",
      "nicknames": [
        "Hed",
        "Dock Boss"
      ],
      "gender": "Male",
      "age": "52 (2026)",
      "nationality": "American",
      "occupation": "Port Gellhorn Logistics Manager / Smuggling Facilitator",
      "affiliations": [
        "Port Gellhorn Stevedores Union",
        "Offshore Cargo Syndicate"
      ],
      "status": "Alive",
      "firstAppearance": "Port Gellhorn Leaks",
      "lastAppearance": "Industrial Port Lore",
      "voiceActor": "TBA",
      "family": [
        "Daughter living in Liberty City"
      ],
      "friends": [
        "Warehouse dockworkers",
        "Crane operators"
      ],
      "allies": [
        "Jason Duval"
      ],
      "enemies": [
        "Federal Maritime Commission",
        "Vice City Cartel Enforcers"
      ],
      "residence": "Port Gellhorn Waterfront",
      "businessesOwned": [
        "Heder Marine Logistics",
        "Drydock Storage Bay 4"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "225 lbs (102 kg)",
      "clothing": "High-visibility maritime vest, grease-stained denim, hard hat, steel-toe boots",
      "distinctiveFeatures": "Heavy build, weather-beaten complexion, cigar smoke smell",
      "leadership": "Commands total respect among blue-collar dockers and container crews.",
      "intelligence": "Deep understanding of international maritime manifests, customs loopholes, and container routing.",
      "ambition": "Retire with a fat offshore pension before the feds crack down on Port Gellhorn.",
      "loyalty": "Follows the cash, but won't sell out personal working friends to federal heat.",
      "temperament": "Gruff, pragmatic, stress-hardened.",
      "behavior": "Methodical, discreet, cynical about state politics.",
      "strengths": [
        "Port Logistics Exploitation",
        "Heavy Machinery Operation",
        "Black Market Manifests"
      ],
      "weaknesses": [
        "Slow physical mobility",
        "Chronic respiratory cough"
      ],
      "relationships": [
        {
          "targetName": "Jason Duval",
          "relationshipType": "Fencing Client & Source",
          "details": "Alerts Jason whenever shipping containers with luxury cars or electronics dock without security."
        }
      ],
      "missions": [
        "Port Gellhorn Container Heist",
        "Midnight Cargo Diversion"
      ],
      "beliefs": "Half of everything arriving on these docks already belongs to someone who didn't pay for it.",
      "ideals": "Protect the union guys and keep the shipping cranes moving.",
      "recurringViewpoints": "Keep your eyes on the crane and your mouth shut.",
      "memorableQuotes": [
        "\"Look at that ship. 4,000 containers and the feds only check ten. That's good odds in my book.\""
      ],
      "statistics": {
        "leadership": 85,
        "intelligence": 86,
        "combatSkills": 72,
        "drivingSkills": 75,
        "shootingSkills": 70,
        "physicalStrength": 84,
        "businessSkills": 89,
        "charisma": 76,
        "loyalty": 82,
        "influenceReputation": 87
      },
      "specialAppearances": []
    }
  },
  {
    "id": "san-chian-cartel-boss",
    "name": "San Chian Cartel Kingpin",
    "nickname": "El Tiburón de Vice",
    "roleCategory": "Antagonist",
    "game": "GTA 6",
    "imageUrl": "/images/characters/cartel_boss.jpg",
    "profile": {
      "fullName": "Unknown / Alias \"El Tiburón\"",
      "nicknames": [
        "The Shark",
        "El Jefe",
        "Mr. San Chian"
      ],
      "gender": "Male",
      "age": "Late 50s (2026)",
      "nationality": "Colombian-American",
      "occupation": "Cartel Narcotics Kingpin / Real Estate Mogul",
      "affiliations": [
        "San Chian Syndicate",
        "Keys Smuggling Flotilla"
      ],
      "status": "Alive",
      "firstAppearance": "Trailer 1 Marina Scene",
      "lastAppearance": "Story Lore",
      "voiceActor": "TBA",
      "family": [
        "Cartel Dynasty in South America"
      ],
      "friends": [
        "Corrupt City Commissioners",
        "Luxury Yacht Captains"
      ],
      "allies": [
        "High-end Vice City nightclub owners"
      ],
      "enemies": [
        "DEA Task Force",
        "Jason & Lucia Duo",
        "Rival Street Crews"
      ],
      "residence": "Starfish Island Luxury Compound, Vice City",
      "businessesOwned": [
        "Multiple High-Rise Hotel Fronts",
        "Offshore Bank Holdings",
        "Private Marina"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "185 lbs (84 kg)",
      "clothing": "Tailored silk cream suit, diamond signet ring, open collar with gold crucifix",
      "distinctiveFeatures": "Silver swept-back hair, scar across left jawline, aristocratic posture",
      "leadership": "Autocratic and merciless. One quiet nod sends hit squads across Leonida.",
      "intelligence": "Master strategist in international money laundering and cartel logistics.",
      "ambition": "Absolute control of every ounce of contraband entering the southeastern seaboard.",
      "loyalty": "Demands blind obedience; executes anyone suspected of speaking with federal agents.",
      "temperament": "Cold, calculated, polite right up until the point of execution.",
      "behavior": "Diplomatic in public galas, monstrous behind locked compound doors.",
      "strengths": [
        "Incalculable Wealth",
        "Private Military Security",
        "Political Bribery Networks"
      ],
      "weaknesses": [
        "Arrogance born of decades of impunity",
        "Underestimates scrappy street-level operators"
      ],
      "relationships": [
        {
          "targetName": "Lucia Caminos",
          "relationshipType": "Mortal Adversary",
          "details": "Target of Lucia and Jason's brazen high-stakes heist raids on his private shipments."
        }
      ],
      "missions": [
        "Compound Infiltration",
        "Marina Superyacht Takedown"
      ],
      "beliefs": "Money buys laws; fear ensures they are obeyed.",
      "ideals": "Empire above all human cost.",
      "recurringViewpoints": "Everyone has a price; those who don't have a grave.",
      "memorableQuotes": [
        "\"In Vice City, blood washes away with the tide, but gold stays in the vault.\""
      ],
      "statistics": {
        "leadership": 99,
        "intelligence": 97,
        "combatSkills": 78,
        "drivingSkills": 80,
        "shootingSkills": 85,
        "physicalStrength": 75,
        "businessSkills": 100,
        "charisma": 94,
        "loyalty": 70,
        "influenceReputation": 100
      },
      "specialAppearances": []
    }
  },
  {
    "id": "tommy-vercetti",
    "name": "Tommy Vercetti",
    "nickname": "The Harwood Butcher",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Tommy Vercetti.jpg",
    "profile": {
      "fullName": "Thomas \"Tommy\" Vercetti",
      "nicknames": [
        "Tommy",
        "The Harwood Butcher",
        "Vercetti"
      ],
      "gender": "Male",
      "age": "35 (1986)",
      "nationality": "Italian-American",
      "occupation": "Kingpin / Vercetti Gang Leader / Ex-Forelli Mob Hitman",
      "affiliations": [
        "Vercetti Crime Family",
        "Forelli Crime Family (formerly)",
        "Cortez Crew"
      ],
      "status": "Alive",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "Keep Your Friends Close...",
      "voiceActor": "Ray Liotta",
      "family": [
        "Unnamed Father (Printworks Worker)",
        "Unnamed Mother"
      ],
      "friends": [
        "Ken Rosenberg",
        "Earnest Kelly",
        "Umberto Robina",
        "Kent Paul"
      ],
      "allies": [
        "Lance Vance (formerly)",
        "Colonel Juan Garcia Cortez",
        "Phil Cassidy",
        "Big Mitch Baker",
        "Avery Carrington"
      ],
      "enemies": [
        "Sonny Forelli",
        "Ricardo Diaz",
        "Lance Vance (traitor)",
        "Haitian Gang",
        "French Secret Service"
      ],
      "residence": "Vercetti Estate, Starfish Island, Vice City",
      "businessesOwned": [
        "Vercetti Estate",
        "Kaufman Cabs",
        "Malibu Club",
        "Print Works",
        "Cherry Popper Ice Cream",
        "InterGlobal Studios",
        "Sunshine Autos",
        "Film Studio",
        "Boatyard"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "190 lbs (86 kg)",
      "clothing": "Hawaiian Teal Palms shirt, blue denim jeans, white sneakers, gold chain watch",
      "distinctiveFeatures": "Muscular build, rugged chin, fierce gaze, signature tropical floral shirt",
      "leadership": "Exceptional. Built an empire from scratch after surviving an ambush.",
      "intelligence": "Tactical genius. Quick-witted, pragmatic, and highly ruthless in business acquisitions.",
      "ambition": "Unbounded. Refuses to remain a foot soldier and claims all of Vice City.",
      "loyalty": "Fiercely loyal to those who stand by him; merciless to backstabbers.",
      "temperament": "Hot-headed yet calculating under extreme gunfire pressure.",
      "behavior": "Dominant, commanding, fearless, direct.",
      "strengths": [
        "Master marksman",
        "Tactical combat specialist",
        "Business foresight",
        "Unshakable nerve"
      ],
      "weaknesses": [
        "Explosive temper",
        "Reluctance to trust after betrayal",
        "Cannot swim"
      ],
      "relationships": [
        {
          "targetName": "Sonny Forelli",
          "relationshipType": "Former Boss / Arch-Enemy",
          "details": "Set Tommy up in Harwood; tried to take over his Vice City empire."
        },
        {
          "targetName": "Lance Vance",
          "relationshipType": "Former Partner / Traitor",
          "details": "Fought together against Diaz, but jealousy led Lance to betray Tommy to Sonny."
        },
        {
          "targetName": "Ken Rosenberg",
          "relationshipType": "Trusted Friend / Lawyer",
          "details": "Nervous attorney who guided Tommy through initial Vice City acquisitions."
        },
        {
          "targetName": "Colonel Juan Garcia Cortez",
          "relationshipType": "Respected Contact",
          "details": "Provided Tommy with early intelligence and high-level mercenary contacts."
        },
        {
          "targetName": "Ricardo Diaz",
          "relationshipType": "Rival Kingpin / Enemy",
          "details": "Orchestrated the drug deal ambush; eliminated by Tommy & Lance."
        }
      ],
      "missions": [
        "In the Beginning...",
        "An Old Friend",
        "The Party",
        "Back Alley Brawl",
        "Jury Fury",
        "Road Kill",
        "Four Iron",
        "Demolition Man",
        "Two Bit Hit",
        "Guardian Angels",
        "Sir, Yes Sir!",
        "Phnom Penh '86",
        "The Chase",
        "Rub Out",
        "Shakedown",
        "Bar Brawl",
        "Cop Land",
        "Cap The Collector",
        "Keep Your Friends Close..."
      ],
      "beliefs": "Power is earned through strength and decisive action, not inherited by mafia promises.",
      "ideals": "Complete control of his destiny and total ownership of Vice City operations.",
      "recurringViewpoints": "Trust must be proven; excuses are useless when lead is flying.",
      "memorableQuotes": [
        "\"I reinserted the sword into the scabbard, Sonny.\"",
        "\"You built a career on my 15 years in prison, Sonny!\"",
        "\"What's the matter with you? You think I'm crazy?\""
      ],
      "statistics": {
        "leadership": 98,
        "intelligence": 90,
        "combatSkills": 95,
        "drivingSkills": 88,
        "shootingSkills": 96,
        "physicalStrength": 89,
        "businessSkills": 94,
        "charisma": 91,
        "loyalty": 85,
        "influenceReputation": 100
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Mentioned / Audio Tape",
          "description": "Ken Rosenberg attempts to call Tommy in Las Venturas, but Tommy refuses to take his calls."
        }
      ],
      "specialOutfits": [
        {
          "id": "outfit-soiree",
          "name": "Soirée Outfit",
          "imageUrl": "/images/special_outfits/tommy/2. SOIRÉE OUTFIT.png",
          "description": "A stylish pastel blue suit jacket with dark blue dress slacks and matching dress shoes, tailored for upscale social gatherings.",
          "situation": "Acquired for Colonel Cortez's yacht party in the mission \"The Party\" to blend in with Vice City high society. Available at Rafael's in Ocean Beach."
        },
        {
          "id": "outfit-coveralls",
          "name": "Coveralls",
          "imageUrl": "/images/special_outfits/tommy/3. COVERALLS.png",
          "description": "Heavy-duty blue denim worker coveralls over a white undershirt with work boots, designed for blue-collar labor disguises.",
          "situation": "Worn during the mission \"Riot\" for Ken Rosenberg to blend in with striking workers and sabotage Spand Express vans. Available at Tooled Up in North Point Mall."
        },
        {
          "id": "outfit-country-club",
          "name": "Country Club Outfit",
          "imageUrl": "/images/special_outfits/tommy/4. COUNTRY CLUB.png",
          "description": "Classic golf attire featuring a patterned argyle diamond sweater vest, collared polo shirt, khaki trousers, and a sun visor.",
          "situation": "Picked up outside Leaf Links Golf Club in Avery Carrington's mission \"Four Iron\" to gain entrance past golf club security and take out the target."
        },
        {
          "id": "outfit-havana",
          "name": "Havana Outfit",
          "imageUrl": "/images/special_outfits/tommy/5. HAVANA OUTFIT.png",
          "description": "A traditional white short-sleeved Cuban guayabera shirt paired with relaxed blue trousers and brown leather loafers.",
          "situation": "Acquired during Umberto Robina's mission \"Two Bit Hit\" to disguise Tommy as a Cuban gangster during a hit on a Haitian funeral. Available at Little Havana Streetwear."
        },
        {
          "id": "outfit-cop",
          "name": "Cop Outfit",
          "imageUrl": "/images/special_outfits/tommy/6. COP OUTFIT.png",
          "description": "An official Vice City Police Department (VCPD) officer patrol uniform complete with police badge, necktie, and dark trousers.",
          "situation": "Obtained in the mission \"Cop Land\" by luring officers into a lockup to steal their uniforms and plant a bomb inside North Point Mall without drawing police fire. Available at Washington Beach Police Station."
        },
        {
          "id": "outfit-bank-job",
          "name": "Bank Job Outfit",
          "imageUrl": "/images/special_outfits/tommy/7. BANK JOB OUTFIT.png",
          "description": "A tactical dark green boiler suit jumpsuit paired with reinforced gloves and an intimidating green hockey mask.",
          "situation": "Worn exclusively during the Malibu Club bank heist mission \"The Job\" to rob El Banco Corrupto Grande in Little Havana. Available upstairs at the Malibu Club."
        },
        {
          "id": "outfit-casual",
          "name": "Casual Outfit",
          "imageUrl": "/images/special_outfits/tommy/8. Casual Outfit.png",
          "description": "A relaxed black printed graphic t-shirt with blue denim jeans and white sports sneakers.",
          "situation": "Obtained during the mission \"Treacherous Swine\" to shake off police attention after assassinating Gonzalez with a chainsaw. Found at Gash department store in North Point Mall."
        },
        {
          "id": "outfit-mr-vercetti",
          "name": "Mr. Vercetti",
          "imageUrl": "/images/special_outfits/tommy/9. MR. VERCETTI.png",
          "description": "A sharp, luxury dark pinstripe silk business suit with necktie and polished black dress shoes, signifying Tommy's status as the kingpin of Vice City.",
          "situation": "Unlocked after purchasing the Malibu Club asset. Available at the high-end Collar & Cuffs boutique in Ocean Beach."
        },
        {
          "id": "outfit-black-tracksuit",
          "name": "Black Tracksuit",
          "imageUrl": "/images/special_outfits/tommy/10. BLACK TRACKSUIT.png",
          "description": "A dark athletic tracksuit with sporty white racing stripes along the arms and legs, matched with running sneakers.",
          "situation": "Available at Jocksports in Downtown Vice City after completing initial island storylines. Instantly removes up to a 2-star wanted level when equipped."
        },
        {
          "id": "outfit-red-tracksuit",
          "name": "Red Tracksuit",
          "imageUrl": "/images/special_outfits/tommy/11. RED TRACKSUIT.png",
          "description": "A bold maroon/red athletic zip tracksuit with white trim accents, ideal for agile street getaways.",
          "situation": "Available at the laundromat in Little Haiti and Ocean Beach once the Western Island opens. Clears up to a 2-star wanted level on change."
        },
        {
          "id": "outfit-frankie",
          "name": "Frankie Outfit",
          "imageUrl": "/images/special_outfits/tommy/12. FRANKIE OUTFIT.png",
          "description": "A trophy black t-shirt featuring the famous slogan \"I completed Vice City and all I got was this lousy T-shirt\", paired with classic blue denim jeans.",
          "situation": "Delivered directly to the Vercetti Estate mansion on Starfish Island upon achieving 100% Game Completion in GTA Vice City."
        }
      ]
    }
  },
  {
    "id": "sonny-forelli",
    "name": "Sonny Forelli",
    "nickname": "The Don of Liberty City",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Sonny Forelli.jpg",
    "profile": {
      "fullName": "Sonny Forelli",
      "nicknames": [
        "Sonny",
        "Don Forelli"
      ],
      "gender": "Male",
      "age": "42 (1986)",
      "nationality": "Italian-American",
      "occupation": "Don of the Forelli Crime Family",
      "affiliations": [
        "Forelli Crime Family (Liberty City)"
      ],
      "status": "Died",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "Keep Your Friends Close...",
      "voiceActor": "Tom Sizemore",
      "family": [
        "Franco Forelli (Relative)",
        "Marco Forelli (Brother)",
        "Mike Forelli (Brother)"
      ],
      "friends": [
        "Lance Vance (co-conspirator)"
      ],
      "allies": [
        "Forelli Caporegimes",
        "Liberty City Mobsters"
      ],
      "enemies": [
        "Tommy Vercetti",
        "Vercetti Crime Family"
      ],
      "residence": "Forelli Compound, Saint Mark's, Portland, Liberty City",
      "businessesOwned": [
        "Forelli Crime Family Assets",
        "Marco's Bistro (Liberty City)"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "210 lbs (95 kg)",
      "clothing": "Dark burgundy double-breasted suit, red tie, expensive leather shoes, slick hair",
      "distinctiveFeatures": "Heavy mobster frame, aggressive gestures, manicured goatee",
      "leadership": "Greedy and intimidating. Commands a vast mafia syndicate with fear.",
      "intelligence": "Calculated but blinded by avarice and envy of Tommy's success.",
      "ambition": "Expansionist. Demanded control over Vice City drug distribution.",
      "loyalty": "Zero. Trapped Tommy in Harwood for 15 years to prevent Vercetti from rising.",
      "temperament": "Explosive, impatient, demanding.",
      "behavior": "Arrogant mob boss who expects absolute submission.",
      "strengths": [
        "Mob resources",
        "Enormous underworld influence",
        "Cunning setup skills"
      ],
      "weaknesses": [
        "Underestimated Tommy Vercetti",
        "Greed override"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Enmity / Former Underling",
          "details": "Used Tommy as a scapegoat; ambushed at Vercetti Estate and killed."
        },
        {
          "targetName": "Lance Vance",
          "relationshipType": "Secret Accomplice",
          "details": "Bribed Lance with cash and status to betray Tommy."
        }
      ],
      "missions": [
        "In the Beginning...",
        "An Old Friend",
        "Keep Your Friends Close..."
      ],
      "beliefs": "Everyone in the underworld has a price, and loyalty lasts as long as money flows.",
      "ideals": "Total monopoly of narcotics and extortion across the East Coast.",
      "recurringViewpoints": "\"Tommy owes me 15 years and three million dollars.\"",
      "memorableQuotes": [
        "\"15 years in the joint made you soft, Tommy?\"",
        "\"You took my money, Tommy, and now I'm taking your life!\""
      ],
      "statistics": {
        "leadership": 90,
        "intelligence": 82,
        "combatSkills": 75,
        "drivingSkills": 60,
        "shootingSkills": 78,
        "physicalStrength": 76,
        "businessSkills": 88,
        "charisma": 79,
        "loyalty": 10,
        "influenceReputation": 92
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Mentioned",
          "description": "Referenced as the deceased head of Forelli syndicate during Saint Mark's Bistro events."
        }
      ]
    }
  },
  {
    "id": "ken-rosenberg",
    "name": "Ken Rosenberg",
    "nickname": "Rosie",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/ken rosenbrge.jpg",
    "profile": {
      "fullName": "Kenneth \"Ken\" Rosenberg",
      "nicknames": [
        "Rosie",
        "Ken"
      ],
      "gender": "Male",
      "age": "33 (1986)",
      "nationality": "American",
      "occupation": "Defense Attorney / Vercetti Business Advisor",
      "affiliations": [
        "Rosenberg & Associates",
        "Vercetti Crime Family",
        "Forelli Family (formerly)"
      ],
      "status": "Alive",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "Keep Your Friends Close...",
      "voiceActor": "William Fichtner",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Tommy Vercetti",
        "Kent Paul",
        "Maccer",
        "Paul"
      ],
      "allies": [
        "Colonel Cortez",
        "Avery Carrington"
      ],
      "enemies": [
        "Sonny Forelli",
        "Vice City District Attorney"
      ],
      "residence": "Harrison Hotel Suite & Law Office, Washington Beach, Vice City",
      "businessesOwned": [
        "Rosenberg & Associates Law Firm"
      ],
      "height": "5 ft 9 in (175 cm)",
      "weight": "165 lbs (75 kg)",
      "clothing": "Pastel purple suit jacket, striped shirt, oversized retro 80s glasses",
      "distinctiveFeatures": "Nervous twitch, frantic hand gestures, disheveled hair under stress",
      "leadership": "Weak under physical threat, but effective legal brain.",
      "intelligence": "Sharp legal strategist despite chronic paranoid panic attacks.",
      "ambition": "Wants financial stability, protection, and respect.",
      "loyalty": "High loyalty to Tommy, though strained by substance abuse later.",
      "temperament": "Anxious, neurotic, easily panicked.",
      "behavior": "Fast-talking, paranoid attorney who drinks coffee and snorts cocaine constantly.",
      "strengths": [
        "Legal loop-hole expertise",
        "Suborning juries",
        "Bailing allies out of jail"
      ],
      "weaknesses": [
        "Paranoia",
        "Cocaine dependency",
        "Lack of combat bravery"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Client & Best Friend",
          "details": "Bail Tommy out of endless legal jams and managed asset contracts."
        },
        {
          "targetName": "Sonny Forelli",
          "relationshipType": "Terrorizer",
          "details": "Lived in constant fear of Forelli hitmen executing him."
        }
      ],
      "missions": [
        "In the Beginning...",
        "An Old Friend",
        "The Party",
        "Back Alley Brawl",
        "Jury Fury",
        "Riots",
        "Guardian Angels",
        "Keep Your Friends Close..."
      ],
      "beliefs": "Law is just a flexible set of rules waiting to be rewritten by a clever defense lawyer.",
      "ideals": "Staying out of prison and retaining Tommy's protection.",
      "recurringViewpoints": "\"They're gonna kill us, Tommy! We're dead men!\"",
      "memorableQuotes": [
        "\"Ah, Tommy! I can't believe it, you're alive!\"",
        "\"I can bend rules, break laws, but I can't change gravity, Tommy!\""
      ],
      "statistics": {
        "leadership": 45,
        "intelligence": 85,
        "combatSkills": 20,
        "drivingSkills": 55,
        "shootingSkills": 30,
        "physicalStrength": 40,
        "businessSkills": 80,
        "charisma": 72,
        "loyalty": 90,
        "influenceReputation": 70
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Major Supporting Character",
          "description": "Managed Caligula's Palace casino in Las Venturas; rescued by CJ from mob crossfire."
        },
        {
          "game": "GTA III",
          "role": "Mentioned",
          "description": "Referenced on Liberty City radio adverts."
        }
      ]
    }
  },
  {
    "id": "lance-vance",
    "name": "Lance Vance",
    "nickname": "Quentin",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Lance Vance.jpg",
    "profile": {
      "fullName": "Lance Vance",
      "nicknames": [
        "Quentin",
        "Lance"
      ],
      "gender": "Male",
      "age": "32 (1986)",
      "nationality": "African-Dominican-American",
      "occupation": "Drug Smuggler / Vercetti Co-Partner (former)",
      "affiliations": [
        "Vance Crime Family",
        "Vercetti Crime Family (formerly)",
        "Forelli Family"
      ],
      "status": "Died",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "Keep Your Friends Close...",
      "voiceActor": "Philip Michael Thomas",
      "family": [
        "Victor Vance (Brother, Deceased)",
        "Pete Vance (Brother)",
        "Janet Vance (Mother)"
      ],
      "friends": [
        "Tommy Vercetti (formerly)"
      ],
      "allies": [
        "Phil Cassidy",
        "Ricardo Diaz (formerly)"
      ],
      "enemies": [
        "Ricardo Diaz",
        "Tommy Vercetti (final battle)"
      ],
      "residence": "Ocean Heights Apartment / Vercetti Estate, Vice City",
      "businessesOwned": [
        "Vance Family Smuggling Assets"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "White designer suit, purple silk shirt, expensive gold chain and sunglasses",
      "distinctiveFeatures": "Flamboyant 80s style, helicopter piloting skills, whiny tone",
      "leadership": "Flawed. Impulsive and resentful when not treated as an equal boss.",
      "intelligence": "Moderate; good pilot but makes reckless emotional choices.",
      "ambition": "Desperately wanted prestige, money, and glory in Vice City.",
      "loyalty": "Low. Betrayed Tommy to Sonny over perceived slights and profit margins.",
      "temperament": "Egotistical, volatile, emotionally fragile.",
      "behavior": "Showy, reckless, easily offended.",
      "strengths": [
        "Expert helicopter pilot",
        "Aggressive gunman",
        "Sophisticated style"
      ],
      "weaknesses": [
        "Insecurity",
        "Impulsivity",
        "Vindictiveness"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Co-partner turning to Arch-Rival",
          "details": "Fought together to kill Diaz; betrayed Tommy to Sonny at Vercetti Mansion."
        },
        {
          "targetName": "Victor Vance",
          "relationshipType": "Deceased Brother",
          "details": "Killed during the opening drug deal ambush at the docks."
        }
      ],
      "missions": [
        "In the Beginning...",
        "Back Alley Brawl",
        "Guardian Angels",
        "Phnom Penh '86",
        "The Chase",
        "Rub Out",
        "Shakedown",
        "Bar Brawl",
        "Cop Land",
        "Keep Your Friends Close..."
      ],
      "beliefs": "I deserve half of Vice City and absolute equal respect without nagging.",
      "ideals": "Living the flashy billionaire gangster lifestyle.",
      "recurringViewpoints": "\"This is the Lance Vance Dance!\"",
      "memorableQuotes": [
        "\"It's time for the Lance Vance Dance!\"",
        "\"I sold you out, Tommy. I sold you out! This is business!\""
      ],
      "statistics": {
        "leadership": 65,
        "intelligence": 70,
        "combatSkills": 82,
        "drivingSkills": 85,
        "shootingSkills": 84,
        "physicalStrength": 75,
        "businessSkills": 60,
        "charisma": 85,
        "loyalty": 25,
        "influenceReputation": 78
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Main Deuteragonist",
          "description": "Co-protagonist alongside his brother Victor Vance in 1984 Vice City."
        }
      ],
      "specialOutfits": [
        {
          "id": "lance-outfit-cop",
          "name": "Cop Outfit",
          "imageUrl": "/images/special_outfits/lance/cop_outfit.png",
          "description": "An official Vice City Police Department (VCPD) officer patrol uniform complete with police badge and brown trousers, used as an undercover disguise.",
          "situation": "Worn alongside Tommy Vercetti during the mission \"Cop Land\" to infiltrate North Point Mall disguised as police officers and detonate explosives inside the Tarbrush Café."
        }
      ]
    }
  },
  {
    "id": "colonel-juan-cortez",
    "name": "Colonel Juan Garcia Cortez",
    "nickname": "The Colonel",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Colonel Juan García Cortez.jpg",
    "profile": {
      "fullName": "Juan Garcia Cortez",
      "nicknames": [
        "The Colonel",
        "Colonel Cortez"
      ],
      "gender": "Male",
      "age": "55 (1986)",
      "nationality": "Central American (Unspecified Nation)",
      "occupation": "Retired Military Colonel / Arms Dealer / Diplomat",
      "affiliations": [
        "Cortez Cartel",
        "Diplomatic Corps"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "All Hands On Deck!",
      "voiceActor": "Robert Davi",
      "family": [
        "Mercedes Cortez (Daughter)"
      ],
      "friends": [
        "Tommy Vercetti",
        "Ricardo Diaz (formerly)",
        "Kent Paul"
      ],
      "allies": [
        "French Military Contacts",
        "Vice City High Society"
      ],
      "enemies": [
        "French Secret Service",
        "Rival Dictatorships"
      ],
      "residence": "Luxury Yacht moored at Ocean Bay Marina, Vice City",
      "businessesOwned": [
        "Arms Export Fleet",
        "High-end Yacht Empire"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "185 lbs (84 kg)",
      "clothing": "White military dress uniform with gold epaulets, red sash, medals",
      "distinctiveFeatures": "Distinguished gray hair, military mustache, aristocratic posture",
      "leadership": "Commanding, honorable, diplomatic.",
      "intelligence": "Master espionage coordinator and international military broker.",
      "ambition": "Protecting his family while executing lucrative defense contracts.",
      "loyalty": "High. Kept his word to Tommy and awarded him a speed boat upon departure.",
      "temperament": "Calm, polite, theatrical, aristocratic.",
      "behavior": "Gracious host who uses politeness to mask lethal military authority.",
      "strengths": [
        "International military intelligence",
        "Diplomatic immunity",
        "Loyalty to allies"
      ],
      "weaknesses": [
        "Targeted by international intelligence agencies"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Protege & Mercenary Chief",
          "details": "Hired Tommy for high-stakes tactical ops; gave him custom speedboats."
        },
        {
          "targetName": "Mercedes Cortez",
          "relationshipType": "Daughter",
          "details": "Worried about her wild lifestyle in Vice City."
        }
      ],
      "missions": [
        "The Party",
        "Treacherous Swine",
        "Mall Shootout",
        "Guardian Angels",
        "Sir, Yes Sir!",
        "All Hands On Deck!"
      ],
      "beliefs": "Honor between soldiers surpasses political treaties.",
      "ideals": "Living comfortably while profiting from regional military conflicts.",
      "recurringViewpoints": "\"Ah, Tommy, my dear friend! Excellent news!\"",
      "memorableQuotes": [
        "\"In my country, hypocrites are eaten alive!\"",
        "\"Take care of Mercedes, Tommy. She has a wild spirit.\""
      ],
      "statistics": {
        "leadership": 92,
        "intelligence": 91,
        "combatSkills": 85,
        "drivingSkills": 75,
        "shootingSkills": 88,
        "physicalStrength": 72,
        "businessSkills": 87,
        "charisma": 94,
        "loyalty": 92,
        "influenceReputation": 95
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Mentioned",
          "description": "Referenced as a dominant military figure active across Latin America."
        }
      ]
    }
  },
  {
    "id": "ricardo-diaz",
    "name": "Ricardo Diaz",
    "nickname": "The Coke Baron",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Ricardo Diaz.jpg",
    "profile": {
      "fullName": "Ricardo Diaz",
      "nicknames": [
        "The Coke Baron",
        "Mr. Diaz"
      ],
      "gender": "Male",
      "age": "44 (1986)",
      "nationality": "Colombian",
      "occupation": "Drug Lord / Cartel Boss of Vice City",
      "affiliations": [
        "Diaz Cartel"
      ],
      "status": "Died",
      "firstAppearance": "The Party",
      "lastAppearance": "Rub Out",
      "voiceActor": "Luis Guzman",
      "family": [
        "Unknown"
      ],
      "friends": [
        "None (Paranoid tyrant)"
      ],
      "allies": [
        "Tommy Vercetti (formerly)",
        "Lance Vance (formerly)",
        "Colonel Cortez (formerly)"
      ],
      "enemies": [
        "Haitians",
        "Cubans",
        "Tommy Vercetti",
        "Lance Vance"
      ],
      "residence": "Diaz Mansion, Starfish Island, Vice City",
      "businessesOwned": [
        "Starfish Island Mansion",
        "Narcotics Distribution Syndicate"
      ],
      "height": "5 ft 4 in (163 cm)",
      "weight": "210 lbs (95 kg)",
      "clothing": "Red silk shirt, beige trousers, heavy gold watches, gold chain",
      "distinctiveFeatures": "Short stature, severe obesity, violent rage outbursts, gun holsters",
      "leadership": "Ruling by terror and bribery.",
      "intelligence": "Cunning drug distributor, but severely ruined by extreme paranoia.",
      "ambition": "Total dominance over the Vice City drug trade.",
      "loyalty": "Nonexistent; destroys equipment and shoots subordinates for minor mistakes.",
      "temperament": "Uncontrollable rage; shoots televisions when sports teams lose.",
      "behavior": "Manic, screaming, paranoid, violent.",
      "strengths": [
        "Immense cartel firepower",
        "Financial wealth",
        "Ruthless aggression"
      ],
      "weaknesses": [
        "Explosive rage",
        "Paranoia",
        "Short attention span"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Target / Employer",
          "details": "Ambushed Tommy's opening deal; later executed in his own mansion courtyard by Tommy & Lance."
        },
        {
          "targetName": "Lance Vance",
          "relationshipType": "Enemy",
          "details": "Murdered Lance's brother Victor; tortured Lance at the Junkyard."
        }
      ],
      "missions": [
        "The Party",
        "Guardian Angels",
        "The Chase",
        "Phnom Penh '86",
        "Faster, Pussycat! Kill! Kill!",
        "Rub Out"
      ],
      "beliefs": "Violence and cocaine solve every obstacle in life.",
      "ideals": "Shooting anyone who dares to look at him sideways.",
      "recurringViewpoints": "\"I shoot the VCR! I shoot the TV! I shoot everyone!\"",
      "memorableQuotes": [
        "\"Pigeons! I hate pigeons! Die, you stupid bird!\"",
        "\"You think you can play me, Vercetti?! I am Ricardo Diaz!\""
      ],
      "statistics": {
        "leadership": 80,
        "intelligence": 72,
        "combatSkills": 80,
        "drivingSkills": 70,
        "shootingSkills": 86,
        "physicalStrength": 78,
        "businessSkills": 85,
        "charisma": 40,
        "loyalty": 15,
        "influenceReputation": 90
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Major Antagonist",
          "description": "Rival cartel boss competing against the Vance Crime Family in 1984."
        }
      ]
    }
  },
  {
    "id": "kent-paul",
    "name": "Kent Paul",
    "nickname": "Paulo / MP",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Kent Paul.jpg",
    "profile": {
      "fullName": "Kent Paul (Paul from Kent)",
      "nicknames": [
        "Paulo",
        "MP",
        "Kent"
      ],
      "gender": "Male",
      "age": "21 (1986)",
      "nationality": "English (Kent, UK)",
      "occupation": "Music Manager / Underworld Information Broker",
      "affiliations": [
        "Love Fist Band",
        "Vercetti Crime Family (Contact)"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "Keep Your Friends Close...",
      "voiceActor": "Danny Dyer",
      "family": [
        "Unknown family in Kent, UK"
      ],
      "friends": [
        "Tommy Vercetti",
        "Love Fist (Jezz, Willy, Dick, Percy)",
        "Maccer"
      ],
      "allies": [
        "Ken Rosenberg",
        "Colonel Cortez"
      ],
      "enemies": [
        "Vice City Bouncers",
        "Forelli Family"
      ],
      "residence": "Malibu Club VIP Lounge, Vice Point, Vice City",
      "businessesOwned": [
        "Music Production & Talent Agency"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "150 lbs (68 kg)",
      "clothing": "Red tank top, Union Jack tattoos, leather pants, spiked hair",
      "distinctiveFeatures": "Cockney accent, hyperactive gesturing, bragging demeanor",
      "leadership": "Good talent manager; poor physically in street fights.",
      "intelligence": "Knows every rumor, deal, and mob movement in Vice City.",
      "ambition": "Become the top music producer while staying alive in Vice City.",
      "loyalty": "Cooperates readily under physical intimidation from Tommy.",
      "temperament": "Loudmouth, self-aggrandizing, cowardly under direct violence.",
      "behavior": "Constantly boasts about famous connections while drinking at the Malibu Club.",
      "strengths": [
        "Underworld intelligence",
        "Music industry promotion",
        "Network of contacts"
      ],
      "weaknesses": [
        "Physical cowardice",
        "Blabbermouth"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Informant / Terrifying Friend",
          "details": "Provides Tommy with critical leads on Diaz, Love Fist, and hitmen."
        },
        {
          "targetName": "Love Fist",
          "relationshipType": "Band Manager",
          "details": "Managed the Scottish rock band during their turbulent Vice City tour."
        }
      ],
      "missions": [
        "The Party",
        "Back Alley Brawl",
        "Death Row",
        "Love Juice",
        "Psycho Killer",
        "Publicity Tour"
      ],
      "beliefs": "If you talk fast enough and name-drop, you can get away with anything.",
      "ideals": "Sex, drugs, rock 'n' roll, and lucrative music royalty checks.",
      "recurringViewpoints": "\"Alright mate! I know everything about everyone!\"",
      "memorableQuotes": [
        "\"I'm a music manager, not a mob hitman, Tommy!\"",
        "\"Mate, you gotta help me! Love Fist is out of their minds!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 82,
        "combatSkills": 30,
        "drivingSkills": 60,
        "shootingSkills": 35,
        "physicalStrength": 45,
        "businessSkills": 75,
        "charisma": 88,
        "loyalty": 70,
        "influenceReputation": 80
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Major Supporting Character",
          "description": "Managed the band Goretorium in Las Venturas; rescued alongside Maccer by CJ."
        }
      ]
    }
  },
  {
    "id": "avery-carrington",
    "name": "Avery Carrington",
    "nickname": "Tex",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Avery Carrington.jpg",
    "profile": {
      "fullName": "Avery Carrington",
      "nicknames": [
        "Tex",
        "Avery"
      ],
      "gender": "Male",
      "age": "51 (1986)",
      "nationality": "American (Texan)",
      "occupation": "Real Estate Developer / Property Tycoon",
      "affiliations": [
        "Carrington Enterprises"
      ],
      "status": "Alive in VC (Deceased in LCS 1998)",
      "firstAppearance": "The Party",
      "lastAppearance": "Two Bit Hit",
      "voiceActor": "Burt Reynolds",
      "family": [
        "Unknown Texan Family"
      ],
      "friends": [
        "Tommy Vercetti",
        "Ken Rosenberg"
      ],
      "allies": [
        "Donald Love (Protege)"
      ],
      "enemies": [
        "Haitian Gang",
        "Cuban Gang",
        "Rival Developers"
      ],
      "residence": "Construction Site / Luxury Limousine, Vice Point",
      "businessesOwned": [
        "Carrington Real Estate Empire"
      ],
      "height": "6 ft 2 in (188 cm)",
      "weight": "215 lbs (97 kg)",
      "clothing": "White cowboy hat, white western suit, bolo tie, cowboy boots",
      "distinctiveFeatures": "Texan drawl, white Stetson hat, riding in stretched stretch limos",
      "leadership": "Shrewd capitalist leader.",
      "intelligence": "Master at manipulate gang rivalries to drop real estate land values.",
      "ambition": "Buying up Vice City real estate for pennies on the dollar.",
      "loyalty": "Transactional; pays Tommy handsomely for dirty demolition jobs.",
      "temperament": "Calm, smooth-talking, ruthless businessman.",
      "behavior": "Quotes old Texan proverbs while orchestrating urban warfare.",
      "strengths": [
        "Real estate manipulation",
        "Capital resources",
        "Mentoring Donald Love"
      ],
      "weaknesses": [
        "Over-reliance on mercenaries for dirty work"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Contractor & Client",
          "details": "Hired Tommy for demolition missions like blowing up rival buildings."
        },
        {
          "targetName": "Donald Love",
          "relationshipType": "Protege",
          "details": "Taught Donald Love that nothing drives down land values like a good gang war."
        }
      ],
      "missions": [
        "Four Iron",
        "Demolition Man",
        "Two Bit Hit"
      ],
      "beliefs": "Nothing drives down real estate prices like a good old-fashioned turf war.",
      "ideals": "Unrestricted capitalist expansion across Vice City waterfronts.",
      "recurringViewpoints": "\"Now, my daddy always said: never trust a man who doesn't wear a cowboy hat!\"",
      "memorableQuotes": [
        "\"Nothing drives down property values like a good old gang war!\"",
        "\"You're a doer, Tommy. I like doers.\""
      ],
      "statistics": {
        "leadership": 88,
        "intelligence": 92,
        "combatSkills": 50,
        "drivingSkills": 65,
        "shootingSkills": 60,
        "physicalStrength": 65,
        "businessSkills": 98,
        "charisma": 85,
        "loyalty": 60,
        "influenceReputation": 93
      },
      "specialAppearances": [
        {
          "game": "GTA Liberty City Stories",
          "role": "Minor Character / Assassinated",
          "description": "Assassinated in 1998 Liberty City by Toni Cipriani on Donald Love's orders."
        }
      ]
    }
  },
  {
    "id": "umberto-robina",
    "name": "Umberto Robina",
    "nickname": "El Macho",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Umberto Robina.jpg",
    "profile": {
      "fullName": "Umberto Robina",
      "nicknames": [
        "El Macho",
        "Umberto"
      ],
      "gender": "Male",
      "age": "38 (1986)",
      "nationality": "Cuban-American",
      "occupation": "Leader of the Los Cabrones (Cuban Gang)",
      "affiliations": [
        "Los Cabrones (Cubans)",
        "Robina Cafe"
      ],
      "status": "Alive",
      "firstAppearance": "Stunt Boat Challenge",
      "lastAppearance": "Trojan Voodoo",
      "voiceActor": "Danny Trejo",
      "family": [
        "Alberto Robina (Father)"
      ],
      "friends": [
        "Tommy Vercetti",
        "Rico",
        "Pepe"
      ],
      "allies": [
        "Vercetti Crime Family"
      ],
      "enemies": [
        "Haitian Gang",
        "Auntie Poulet"
      ],
      "residence": "Little Havana, Vice City",
      "businessesOwned": [
        "Cafe Robina",
        "Little Havana Smuggling"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "200 lbs (90 kg)",
      "clothing": "Open unbuttoned vest, gold chain, visible chest hair, dark trousers",
      "distinctiveFeatures": "Loud voice, aggressive flexing, hyper-masculine bravado",
      "leadership": "Passionate and fierce defender of Cuban neighborhood.",
      "intelligence": "Street-smart; relies on big cojones rather than complex strategy.",
      "ambition": "Total elimination of Haitian gang control in Little Haiti.",
      "loyalty": "Extreme. Treats Tommy like a brother after Tommy proves his bravery.",
      "temperament": "Fiery, dramatic, intensely vocal.",
      "behavior": "Grabs men by the shoulders, shouts about big cojones, honors his father.",
      "strengths": [
        "Lethal street warfare",
        "Loyal gang followings",
        "Unshakable courage"
      ],
      "weaknesses": [
        "Over-emotional decisions",
        "Hatred for Haitians clouding judgment"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Respected Brother-in-Arms",
          "details": "Hired Tommy to destroy the Haitian drug factory in Trojan Voodoo."
        },
        {
          "targetName": "Alberto Robina",
          "relationshipType": "Beloved Father",
          "details": "Protects his old father's cafe with his life."
        }
      ],
      "missions": [
        "Stunt Boat Challenge",
        "Cannon Fodder",
        "Naval Engagement",
        "Trojan Voodoo"
      ],
      "beliefs": "Real men have big cojones and stand up for their family and neighborhood.",
      "ideals": "Cuban dominance over Vice City street trade.",
      "recurringViewpoints": "\"You got cojones, Tommy! Big cojones!\"",
      "memorableQuotes": [
        "\"Tommy! You are a man with big cojones!\"",
        "\"We are gonna wipe those Haitians off the map!\""
      ],
      "statistics": {
        "leadership": 88,
        "intelligence": 70,
        "combatSkills": 86,
        "drivingSkills": 75,
        "shootingSkills": 85,
        "physicalStrength": 88,
        "businessSkills": 72,
        "charisma": 90,
        "loyalty": 95,
        "influenceReputation": 88
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Major Supporting Character",
          "description": "Fought alongside Victor Vance in 1984 Cuban turf wars."
        }
      ]
    }
  },
  {
    "id": "auntie-poulet",
    "name": "Auntie Poulet",
    "nickname": "Voodoo Queen",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Auntie Poulet.jpg",
    "profile": {
      "fullName": "Auntie Poulet",
      "nicknames": [
        "Voodoo Queen",
        "Auntie"
      ],
      "gender": "Female",
      "age": "65 (1986)",
      "nationality": "Haitian",
      "occupation": "Matriarch of Haitian Gang / Voodoo Priestess",
      "affiliations": [
        "Haitian Gang",
        "Voodoo Syndicate"
      ],
      "status": "Alive",
      "firstAppearance": "Juju Scramble",
      "lastAppearance": "Dirty Lickin's",
      "voiceActor": "Youree Cleomill Harris",
      "family": [
        "Unknown Haitian Clan"
      ],
      "friends": [
        "Haitian Lieutenants"
      ],
      "allies": [
        "Tommy Vercetti (under voodoo mind control)"
      ],
      "enemies": [
        "Umberto Robina",
        "Los Cabrones (Cubans)"
      ],
      "residence": "Wooden Shack in Little Haiti, Vice City",
      "businessesOwned": [
        "Voodoo Herbal & Narcotics Operation"
      ],
      "height": "5 ft 4 in (163 cm)",
      "weight": "160 lbs (72 kg)",
      "clothing": "Traditional colorful Haitian dress, headwrap, beaded necklaces",
      "distinctiveFeatures": "Slow soothing voice, brewing mystical potions, voodoo magic powders",
      "leadership": "Commands total spiritual and tactical obedience from Haitian gangsters.",
      "intelligence": "Master psychological manipulator using mind-altering voodoo teas.",
      "ambition": "Protect Haitian community and profit from juju drug operations.",
      "loyalty": "Calculated; uses Tommy then erases his memory of her shacks.",
      "temperament": "Uncanny calm, grandmotherly yet terrifying.",
      "behavior": "Serves potion tea to guests that mind-controls them into doing bidding.",
      "strengths": [
        "Voodoo potion mind control",
        "Psychological warfare",
        "Spiritual authority"
      ],
      "weaknesses": [
        "Elderly physical condition"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Mind-Controlled Pawn",
          "details": "Drugged Tommy with voodoo tea to attack Cubans, then made him forget."
        },
        {
          "targetName": "Umberto Robina",
          "relationshipType": "Arch-Enemy",
          "details": "Engaged in brutal turf war against the Cuban gang."
        }
      ],
      "missions": [
        "Juju Scramble",
        "Bombs Away!",
        "Dirty Lickin's"
      ],
      "beliefs": "Spirits control the minds of men; magic subdues firepower.",
      "ideals": "Haitian survival and prosperity in Vice City.",
      "recurringViewpoints": "\"Drink your tea, Tommy child... smooth your mind...\"",
      "memorableQuotes": [
        "\"Drink de tea, Tommy, drink de tea...\"",
        "\"Do not come back here no more, Tommy Vercetti!\""
      ],
      "statistics": {
        "leadership": 90,
        "intelligence": 94,
        "combatSkills": 25,
        "drivingSkills": 20,
        "shootingSkills": 30,
        "physicalStrength": 35,
        "businessSkills": 82,
        "charisma": 91,
        "loyalty": 80,
        "influenceReputation": 89
      },
      "specialAppearances": []
    }
  },
  {
    "id": "phil-cassidy",
    "name": "Phil Cassidy",
    "nickname": "One-Armed Gun Nut",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Phil Cassidy.jpg",
    "profile": {
      "fullName": "Phil Cassidy",
      "nicknames": [
        "Phil",
        "One-Armed Gun Nut"
      ],
      "gender": "Male",
      "age": "37 (1986)",
      "nationality": "American (Redneck)",
      "occupation": "Military Arms Dealer / Heist Gunman",
      "affiliations": [
        "Phil's Place",
        "Vercetti Heist Crew"
      ],
      "status": "Alive (Lost arm in Boomshine explosion)",
      "firstAppearance": "The Driver",
      "lastAppearance": "Boomshine Saigon",
      "voiceActor": "Gary Busey",
      "family": [
        "Louise Cassidy-Williams (Sister, VCS)",
        "Mary-Jo Cassidy (Sister)"
      ],
      "friends": [
        "Tommy Vercetti",
        "Cam Jones",
        "Hilary King"
      ],
      "allies": [
        "Vercetti Crime Family"
      ],
      "enemies": [
        "Mexican Gunrunners",
        "Vice City SWAT"
      ],
      "residence": "Phil's Compound, Little Haiti, Vice City",
      "businessesOwned": [
        "Phil's Depot & Heavy Ordnance Store"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "220 lbs (100 kg)",
      "clothing": "Patriotic skull t-shirt, camouflage trousers, baseball cap, arm bandage later",
      "distinctiveFeatures": "Southern redneck twang, moonshine addiction, explosive expertise",
      "leadership": "Wild mercenary spirit.",
      "intelligence": "Expert military gunsmith despite chronic alcoholism.",
      "ambition": "Blow things up and sell heavy military-grade weapons.",
      "loyalty": "Unshakable loyalty to Tommy after the bank heist.",
      "temperament": "Drunkenly cheerful, explosive, reckless.",
      "behavior": "Test-fires rocket launchers and boomshine explosives while drunk.",
      "strengths": [
        "Heavy weaponry master",
        "Demolitions",
        "Bank robbery execution"
      ],
      "weaknesses": [
        "Severe alcoholism",
        "Reckless handling of explosives"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Heist Partner & Arms Supplier",
          "details": "Joined Tommy's bank robbery team; Tommy saved his life after he blew off his own arm."
        }
      ],
      "missions": [
        "The Job",
        "Gun Runner",
        "Boomshine Saigon"
      ],
      "beliefs": "There ain't nothing in this world that can't be solved with enough high explosives.",
      "ideals": "Patriotism, moonshine brewing, and unrestricted automatic weapons.",
      "recurringViewpoints": "\"Boomshine! It's good for the soul, Tommy!\"",
      "memorableQuotes": [
        "\"That Boomshine's got a hell of a kick!\"",
        "\"My arm! Where's my damn arm?!\""
      ],
      "statistics": {
        "leadership": 75,
        "intelligence": 75,
        "combatSkills": 95,
        "drivingSkills": 80,
        "shootingSkills": 98,
        "physicalStrength": 85,
        "businessSkills": 78,
        "charisma": 80,
        "loyalty": 96,
        "influenceReputation": 88
      },
      "specialAppearances": [
        {
          "game": "GTA III",
          "role": "Major Supporting Character",
          "description": "Operates Phil's Army Surplus in Liberty City with missing right arm in 2001."
        },
        {
          "game": "GTA Vice City Stories",
          "role": "Major Character",
          "description": "Assists Victor Vance with weapons operations in 1984."
        }
      ],
      "specialOutfits": [
        {
          "id": "phil-outfit-bank-job",
          "name": "Bank Job Outfit",
          "imageUrl": "/images/special_outfits/phil/bank_job_outfit.png",
          "description": "A tactical green boiler suit jumpsuit equipped with white sneakers and a hockey mask disguise for heavy assault firepower during the heist.",
          "situation": "Worn during the Malibu Club bank heist mission \"The Job\" to provide heavy weapons support and crowd control inside El Banco Corrupto Grande."
        }
      ]
    }
  },
  {
    "id": "big-mitch-baker",
    "name": "Big Mitch Baker",
    "nickname": "Mitch",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Mitch Baker.jpg",
    "profile": {
      "fullName": "Mitch Baker",
      "nicknames": [
        "Big Mitch",
        "Mitch"
      ],
      "gender": "Male",
      "age": "40 (1986)",
      "nationality": "American",
      "occupation": "President of the Vice City Biker Gang / Vietnam War Veteran",
      "affiliations": [
        "Vice City Bikers (Greasers)",
        "Vercetti Ally"
      ],
      "status": "Alive",
      "firstAppearance": "Alloy Wheels of Steel",
      "lastAppearance": "Hog Tied",
      "voiceActor": "Lee Majors",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Biker Gang Members"
      ],
      "allies": [
        "Tommy Vercetti",
        "Love Fist",
        "Kent Paul"
      ],
      "enemies": [
        "Sharks Gang",
        "Rival Biker Clubs"
      ],
      "residence": "The Greasy Chopper Bar, Downtown Vice City",
      "businessesOwned": [
        "The Greasy Chopper Bar"
      ],
      "height": "6 ft 4 in (193 cm)",
      "weight": "250 lbs (113 kg)",
      "clothing": "Black leather motorcycle vest with club patches, denim, sunglasses, headband",
      "distinctiveFeatures": "Huge muscular build, thick biker beard, Vietnam veteran tattoos",
      "leadership": "Absolute authority over the Vice City Biker chapter.",
      "intelligence": "Honorable tactical leader who values loyalty and motorcycle mastery.",
      "ambition": "Protect his biker club's freedom and honor.",
      "loyalty": "High. Agreed to provide Love Fist security after Tommy proved his riding skills.",
      "temperament": "Intimidating, rough, honorable.",
      "behavior": "Enforces club rules with iron fist; demands respect for military vets.",
      "strengths": [
        "Chopper motorcycle racing",
        "Heavy hand-to-hand combat",
        "Biker club network"
      ],
      "weaknesses": [
        "Disdain for authority and suits"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Ally & Racing Challenger",
          "details": "Required Tommy to win a chopper race and recover his stolen motorcycle."
        },
        {
          "targetName": "Love Fist",
          "relationshipType": "Security Client",
          "details": "Provided biker security for Love Fist concert."
        }
      ],
      "missions": [
        "Alloy Wheels of Steel",
        "Messing with the Security",
        "Hog Tied"
      ],
      "beliefs": "Honor, brotherhood, motorcycles, and respect for Vietnam veterans.",
      "ideals": "Riding free in Vice City without government or mafia interference.",
      "recurringViewpoints": "\"You wanna deal with us? You gotta ride like us first!\"",
      "memorableQuotes": [
        "\"If you want my boys securing Love Fist, you better show some cojones on a bike!\"",
        "\"A veteran deserves respect in this country!\""
      ],
      "statistics": {
        "leadership": 92,
        "intelligence": 78,
        "combatSkills": 94,
        "drivingSkills": 96,
        "shootingSkills": 90,
        "physicalStrength": 95,
        "businessSkills": 65,
        "charisma": 87,
        "loyalty": 94,
        "influenceReputation": 91
      },
      "specialAppearances": []
    }
  },
  {
    "id": "steve-scott",
    "name": "Steve Scott",
    "nickname": "The Film Director",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Steve Scott.jpg",
    "profile": {
      "fullName": "Steve Scott",
      "nicknames": [
        "Steve",
        "The Director"
      ],
      "gender": "Male",
      "age": "46 (1986)",
      "nationality": "American",
      "occupation": "Pornographic Film Director / InterGlobal Studios Head",
      "affiliations": [
        "InterGlobal Studios",
        "Vercetti Crime Family"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "G-Spot Leap",
      "voiceActor": "Dennis Hopper",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Candy Suxxx",
        "Mercedes Cortez"
      ],
      "allies": [
        "Tommy Vercetti"
      ],
      "enemies": [
        "Alex Shrub (Politician anti-porn censor)"
      ],
      "residence": "Prawn Island Film Studio Lot, Vice City",
      "businessesOwned": [
        "InterGlobal Film Studios"
      ],
      "height": "5 ft 8 in (173 cm)",
      "weight": "170 lbs (77 kg)",
      "clothing": "Beret, tropical vest, scarf, thick glasses, megaphone",
      "distinctiveFeatures": "Obsessed with giant alien props and bizarre adult cinema visions",
      "leadership": "Eccentric movie set director.",
      "intelligence": "Obsessive creative genius in low-budget adult film genre.",
      "ambition": "Direct the ultimate adult sci-fi blockbuster with giant shark props.",
      "loyalty": "Loyal to Tommy after Tommy bought the film studio.",
      "temperament": "Hysterical, theatrical, easily agitated.",
      "behavior": "Screams at movie crews while arguing about giant prop sharks.",
      "strengths": [
        "Film production management",
        "Cinematic vision"
      ],
      "weaknesses": [
        "Absurd artistic delusions",
        "Zero physical combat skill"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Studio Boss & Savior",
          "details": "Tommy acquired InterGlobal Studios and secured Candy Suxxx for Steve's films."
        },
        {
          "targetName": "Candy Suxxx",
          "relationshipType": "Lead Actress",
          "details": "Starred in Steve's flagship productions."
        }
      ],
      "missions": [
        "Recruitment Drive",
        "Dildo Dodo",
        "Martha's Mug Shot",
        "G-Spot Leap"
      ],
      "beliefs": "Adult cinema is high art that requires giant alien props and perfection.",
      "ideals": "Total artistic freedom from corrupt politicians like Alex Shrub.",
      "recurringViewpoints": "\"It needs a giant shark! A giant alien shark!\"",
      "memorableQuotes": [
        "\"Tommy! The light is fading! We need Candy on set now!\"",
        "\"Art cannot be censored by sleazy politicians!\""
      ],
      "statistics": {
        "leadership": 65,
        "intelligence": 75,
        "combatSkills": 15,
        "drivingSkills": 50,
        "shootingSkills": 20,
        "physicalStrength": 40,
        "businessSkills": 70,
        "charisma": 78,
        "loyalty": 82,
        "influenceReputation": 72
      },
      "specialAppearances": []
    }
  },
  {
    "id": "mercedes-cortez",
    "name": "Mercedes Cortez",
    "nickname": "Mercedes",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Mercedes Cortez.jpg",
    "profile": {
      "fullName": "Mercedes Cortez",
      "nicknames": [
        "Mercedes"
      ],
      "gender": "Female",
      "age": "22 (1986)",
      "nationality": "Central American",
      "occupation": "Socialite / InterGlobal Actress / High Society Heiress",
      "affiliations": [
        "Cortez Family",
        "Vercetti Empire",
        "Love Fist Party Circuit"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "Recruitment Drive",
      "voiceActor": "Fairuza Balk",
      "family": [
        "Colonel Juan Garcia Cortez (Father)"
      ],
      "friends": [
        "Tommy Vercetti",
        "Kent Paul",
        "Love Fist",
        "Candy Suxxx"
      ],
      "allies": [
        "InterGlobal Studios"
      ],
      "enemies": [
        "Her father's strict etiquette rules"
      ],
      "residence": "Cortez Yacht / Vice Point Luxury Apartment",
      "businessesOwned": [
        "Inheritance Assets"
      ],
      "height": "5 ft 7 in (170 cm)",
      "weight": "120 lbs (54 kg)",
      "clothing": "Pink party dress, high heels, silver bracelets, glamorous 80s makeup",
      "distinctiveFeatures": "Wild party girl attitude, seductive banter, glamorous fashion",
      "leadership": "Socialite party organizer.",
      "intelligence": "Street-savvy socialite who knows all high-society secrets.",
      "ambition": "Live a wild, rebellious life away from military discipline.",
      "loyalty": "Friendly toward Tommy; enjoyed riding on his motorbikes.",
      "temperament": "Playful, rebellious, adventurous.",
      "behavior": "Flirts with dangerous underworld figures to annoy her strict father.",
      "strengths": [
        "High society connections",
        "Charming influence"
      ],
      "weaknesses": [
        "Reckless party lifestyle"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Romantic Interest / Friend",
          "details": "Tommy escorted her to the Pole Position club and hired her for InterGlobal."
        },
        {
          "targetName": "Colonel Cortez",
          "relationshipType": "Father",
          "details": "Rebelled against his strict military discipline."
        }
      ],
      "missions": [
        "The Party",
        "Love Juice",
        "Recruitment Drive"
      ],
      "beliefs": "Life in Vice City is meant to be enjoyed to the maximum every single night.",
      "ideals": "Total freedom, parties, and glamorous lifestyle.",
      "recurringViewpoints": "\"Tommy! Take me somewhere fun!\"",
      "memorableQuotes": [
        "\"My father thinks I'm studying law... as if!\"",
        "\"Tommy, you are so brooding and dangerous!\""
      ],
      "statistics": {
        "leadership": 50,
        "intelligence": 78,
        "combatSkills": 20,
        "drivingSkills": 60,
        "shootingSkills": 25,
        "physicalStrength": 35,
        "businessSkills": 55,
        "charisma": 95,
        "loyalty": 80,
        "influenceReputation": 82
      },
      "specialAppearances": []
    }
  },
  {
    "id": "candy-suxxx",
    "name": "Candy Suxxx",
    "nickname": "Candy",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/candy suxx.png",
    "profile": {
      "fullName": "Candice \"Candy Suxxx\" Shand",
      "nicknames": [
        "Candy",
        "Candy Suxxx"
      ],
      "gender": "Female",
      "age": "24 (1986)",
      "nationality": "American",
      "occupation": "Adult Film Star / InterGlobal Lead Actress",
      "affiliations": [
        "InterGlobal Studios",
        "Vercetti Crime Family"
      ],
      "status": "Alive",
      "firstAppearance": "Recruitment Drive",
      "lastAppearance": "G-Spot Leap",
      "voiceActor": "Jenna Jameson",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Steve Scott",
        "Mercedes Cortez",
        "Tommy Vercetti"
      ],
      "allies": [
        "Alex Shrub (Client/Blackmail Target)"
      ],
      "enemies": [
        "Candy's Agent (former pimp)"
      ],
      "residence": "Downtown Vice City Luxury Condo",
      "businessesOwned": [
        "Candy Suxxx Merchandise Empire"
      ],
      "height": "5 ft 9 in (175 cm)",
      "weight": "125 lbs (57 kg)",
      "clothing": "US Flag bikini top, denim shorts, red boots, heavy blonde hair",
      "distinctiveFeatures": "Signature patriotic stars-and-stripes bikini, high squeaky voice",
      "leadership": "Starlet presence.",
      "intelligence": "Knows how to leverage adult fame and blackmail politicians.",
      "ambition": "Become the world's most famous adult film star.",
      "loyalty": "High to Tommy after he eliminated her abusive agent.",
      "temperament": "Flamboyant, dramatic, cheerful.",
      "behavior": "Poses for billboards across Vice City; stars in Steve Scott movies.",
      "strengths": [
        "High brand visibility",
        "Political leverage over Alex Shrub"
      ],
      "weaknesses": [
        "Naivety in business contracts"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Employer & Protector",
          "details": "Tommy killed her abusive pimp/agent and made her InterGlobal's main star."
        },
        {
          "targetName": "Alex Shrub",
          "relationshipType": "Secret Lover / Blackmail Target",
          "details": "Caught on camera with Congressman Shrub in blackmail photos."
        }
      ],
      "missions": [
        "Recruitment Drive",
        "Martha's Mug Shot",
        "G-Spot Leap"
      ],
      "beliefs": "Fame and glamour are everything in 1980s America.",
      "ideals": "Having her picture on giant neon billboards over Vice City.",
      "recurringViewpoints": "\"Oh Tommy! You're my hero!\"",
      "memorableQuotes": [
        "\"Is that a gun in your pocket or are you just happy to see me?\"",
        "\"Steve says I'm going to be a star!\""
      ],
      "statistics": {
        "leadership": 40,
        "intelligence": 70,
        "combatSkills": 15,
        "drivingSkills": 50,
        "shootingSkills": 20,
        "physicalStrength": 35,
        "businessSkills": 68,
        "charisma": 96,
        "loyalty": 85,
        "influenceReputation": 86
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Billboard Cameo",
          "description": "Featured on Vinewood billboards and video box art in 1992 San Andreas."
        },
        {
          "game": "GTA Liberty City Stories",
          "role": "Poster Cameo",
          "description": "Movie posters visible across Liberty City."
        }
      ]
    }
  },
  {
    "id": "jezz-torrent",
    "name": "Jezz Torrent",
    "nickname": "Jezz",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/jezz torret.png",
    "profile": {
      "fullName": "Jezz Torrent",
      "nicknames": [
        "Jezz"
      ],
      "gender": "Male",
      "age": "29 (1986)",
      "nationality": "Scottish",
      "occupation": "Lead Singer of Love Fist (Heavy Metal Band)",
      "affiliations": [
        "Love Fist Band"
      ],
      "status": "Alive",
      "firstAppearance": "Love Juice",
      "lastAppearance": "Publicity Tour",
      "voiceActor": "Kevin McKidd",
      "family": [
        "Unknown Scottish Family"
      ],
      "friends": [
        "Willy",
        "Dick",
        "Percy",
        "Kent Paul",
        "Tommy Vercetti"
      ],
      "allies": [
        "Big Mitch Baker"
      ],
      "enemies": [
        "The Psycho Killer (Stalker)"
      ],
      "residence": "Love Fist Tour Bus / Recording Studio, Downtown Vice City",
      "businessesOwned": [
        "Love Fist World Tour Franchise"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "160 lbs (72 kg)",
      "clothing": "Leather kilt, studs, glam rock makeup, long wild hair",
      "distinctiveFeatures": "Thick Scottish brogue, glam rock aesthetic, extreme substance habits",
      "leadership": "Lead vocalist charismatic frontman.",
      "intelligence": "Musically talented; chaotic in personal life decisions.",
      "ambition": "Perform the wilder concert in Vice City history.",
      "loyalty": "Grateful to Tommy for saving the band from a bomb-rigged limo.",
      "temperament": "Wild, erratic, paranoid under stalker threats.",
      "behavior": "Consumes Love Juice potions while screaming rock lyrics.",
      "strengths": [
        "Frontman stage presence",
        "Vocal talent"
      ],
      "weaknesses": [
        "Substance abuse",
        "Panic under physical danger"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Savior & Security Chief",
          "details": "Tommy disarmed the speed-sensitive bomb in Love Fist's limousine."
        },
        {
          "targetName": "Kent Paul",
          "relationshipType": "Manager",
          "details": "Constantly complained about Paul's management decisions."
        }
      ],
      "missions": [
        "Love Juice",
        "Psycho Killer",
        "Publicity Tour"
      ],
      "beliefs": "Heavy metal music can heal any hangover if played loud enough.",
      "ideals": "Unstoppable rock 'n' roll world tours.",
      "recurringViewpoints": "\"Where's de Love Juice, laddie?!\"",
      "memorableQuotes": [
        "\"If this limo slows down below 50, we're gonna blow to bits!\"",
        "\"Love Fist is eternal, pal!\""
      ],
      "statistics": {
        "leadership": 75,
        "intelligence": 68,
        "combatSkills": 35,
        "drivingSkills": 55,
        "shootingSkills": 30,
        "physicalStrength": 60,
        "businessSkills": 70,
        "charisma": 94,
        "loyalty": 80,
        "influenceReputation": 89
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Radio Mention",
          "description": "Radio commercials and posters across San Andreas."
        }
      ]
    }
  },
  {
    "id": "willy",
    "name": "Willy",
    "nickname": "Willy Love Fist",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/willy.png",
    "profile": {
      "fullName": "Willy",
      "nicknames": [
        "Willy"
      ],
      "gender": "Male",
      "age": "28 (1986)",
      "nationality": "Scottish",
      "occupation": "Bass Guitarist for Love Fist",
      "affiliations": [
        "Love Fist Band"
      ],
      "status": "Alive",
      "firstAppearance": "Love Juice",
      "lastAppearance": "Publicity Tour",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Jezz Torrent",
        "Dick",
        "Percy",
        "Kent Paul",
        "Tommy Vercetti"
      ],
      "allies": [
        "Vercetti Crime Family"
      ],
      "enemies": [
        "Psycho Killer"
      ],
      "residence": "Love Fist Tour Bus, Vice City",
      "businessesOwned": [
        "Love Fist Partnership"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "Spiked wristbands, ripped denim, black leather vest",
      "distinctiveFeatures": "Long curly hair, bass guitar tattoos, Scottish accent",
      "leadership": "Rhythm section support.",
      "intelligence": "Rocker mindset; easily swayed by party drugs.",
      "ambition": "Play bass guitar and party continuously.",
      "loyalty": "High to his bandmates.",
      "temperament": "Rowdy, drunken, friendly.",
      "behavior": "Drinks scotch and plays heavy bass lines during rehearsals.",
      "strengths": [
        "Bass groove timing",
        "Stage energy"
      ],
      "weaknesses": [
        "Easily distracted by parties"
      ],
      "relationships": [
        {
          "targetName": "Jezz Torrent",
          "relationshipType": "Bandmate",
          "details": "Co-founded Love Fist in Scotland."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Savior",
          "details": "Rescued from stalker attacks."
        }
      ],
      "missions": [
        "Love Juice",
        "Psycho Killer",
        "Publicity Tour"
      ],
      "beliefs": "Bass frequency is the heart of heavy metal.",
      "ideals": "Endless stadium tours.",
      "recurringViewpoints": "\"More scotch for the bass player!\"",
      "memorableQuotes": [
        "\"Keep driving, Tommy, don't touch that brake!\"",
        "\"We're heavy metal royalty!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 65,
        "combatSkills": 30,
        "drivingSkills": 50,
        "shootingSkills": 25,
        "physicalStrength": 65,
        "businessSkills": 60,
        "charisma": 85,
        "loyalty": 88,
        "influenceReputation": 82
      },
      "specialAppearances": []
    }
  },
  {
    "id": "dick",
    "name": "Dick",
    "nickname": "Dickie",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/dick.png",
    "profile": {
      "fullName": "Dick",
      "nicknames": [
        "Dickie"
      ],
      "gender": "Male",
      "age": "27 (1986)",
      "nationality": "Scottish",
      "occupation": "Drummer for Love Fist",
      "affiliations": [
        "Love Fist Band"
      ],
      "status": "Alive",
      "firstAppearance": "Love Juice",
      "lastAppearance": "Publicity Tour",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Jezz Torrent",
        "Willy",
        "Percy",
        "Tommy Vercetti"
      ],
      "allies": [
        "Vercetti Family"
      ],
      "enemies": [
        "Psycho Killer"
      ],
      "residence": "Love Fist Tour Bus",
      "businessesOwned": [
        "Love Fist Partnership"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "165 lbs (75 kg)",
      "clothing": "Sleeveless band t-shirt, bandana, drumsticks in back pocket",
      "distinctiveFeatures": "Hyperactive drumming twitches, Scottish slang",
      "leadership": "Tempo keeper.",
      "intelligence": "Focused mainly on double-bass drum beats.",
      "ambition": "Drum louder than a jet engine.",
      "loyalty": "Solid band commitment.",
      "temperament": "Hyperactive, volatile.",
      "behavior": "Taps drumsticks on every surface around him.",
      "strengths": [
        "Drumming speed",
        "High endurance"
      ],
      "weaknesses": [
        "Short attention span"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Ally",
          "details": "Saved by Tommy from bomb threat."
        }
      ],
      "missions": [
        "Love Juice",
        "Psycho Killer",
        "Publicity Tour"
      ],
      "beliefs": "Loud drums solve depression.",
      "ideals": "Mastering the double-kick drum technique.",
      "recurringViewpoints": "\"Smash them drums!\"",
      "memorableQuotes": [
        "\"Aye! Floor it Tommy, floor it!\"",
        "\"Nobody messes with Love Fist!\""
      ],
      "statistics": {
        "leadership": 55,
        "intelligence": 62,
        "combatSkills": 35,
        "drivingSkills": 45,
        "shootingSkills": 25,
        "physicalStrength": 70,
        "businessSkills": 58,
        "charisma": 82,
        "loyalty": 85,
        "influenceReputation": 80
      },
      "specialAppearances": []
    }
  },
  {
    "id": "percy",
    "name": "Percy",
    "nickname": "Percy Love Fist",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/percy.png",
    "profile": {
      "fullName": "Percy",
      "nicknames": [
        "Percy"
      ],
      "gender": "Male",
      "age": "30 (1986)",
      "nationality": "Scottish",
      "occupation": "Lead Guitarist for Love Fist",
      "affiliations": [
        "Love Fist Band"
      ],
      "status": "Alive",
      "firstAppearance": "Love Juice",
      "lastAppearance": "Publicity Tour",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Jezz Torrent",
        "Willy",
        "Dick",
        "Tommy Vercetti"
      ],
      "allies": [
        "Kent Paul"
      ],
      "enemies": [
        "Psycho Killer"
      ],
      "residence": "Love Fist Studio",
      "businessesOwned": [
        "Love Fist Partnership"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "158 lbs (71 kg)",
      "clothing": "Leopard print pants, leather jacket, sunglasses indoors",
      "distinctiveFeatures": "Flamboyant guitar solos, high-pitched Scottish shouting",
      "leadership": "Guitar riff master.",
      "intelligence": "Musical ear for heavy metal hooks.",
      "ambition": "Play the longest guitar solo in stadium history.",
      "loyalty": "High to Love Fist.",
      "temperament": "Eccentric, theatrical.",
      "behavior": "Air-guitaring continuously during conversations.",
      "strengths": [
        "Guitar virtuosity",
        "Stage presence"
      ],
      "weaknesses": [
        "Dramatic panic"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Ally",
          "details": "Guided by Tommy through Vice City concerts."
        }
      ],
      "missions": [
        "Love Juice",
        "Psycho Killer",
        "Publicity Tour"
      ],
      "beliefs": "Guitar riffs can change the world.",
      "ideals": "Endless guitar solos.",
      "recurringViewpoints": "\"Listen to this guitar solo, pal!\"",
      "memorableQuotes": [
        "\"That bomb is right under my seat!\"",
        "\"We made it to the gig! Pure magic!\""
      ],
      "statistics": {
        "leadership": 58,
        "intelligence": 67,
        "combatSkills": 28,
        "drivingSkills": 48,
        "shootingSkills": 22,
        "physicalStrength": 55,
        "businessSkills": 62,
        "charisma": 86,
        "loyalty": 85,
        "influenceReputation": 81
      },
      "specialAppearances": []
    }
  },
  {
    "id": "donald-love",
    "name": "Donald Love",
    "nickname": "The Media Mogul Protege",
    "roleCategory": "Major",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/donald love.png",
    "profile": {
      "fullName": "Donald Love",
      "nicknames": [
        "Donald",
        "Mr. Love"
      ],
      "gender": "Male",
      "age": "24 (1986)",
      "nationality": "American",
      "occupation": "Apprentice Real Estate & Media Developer",
      "affiliations": [
        "Carrington Enterprises",
        "Love Media (future)"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "Two Bit Hit",
      "voiceActor": "Bill Fiore (GTA III) / Uncredited (VC)",
      "family": [
        "Unknown Wealthy Family"
      ],
      "friends": [
        "Avery Carrington (Mentor)"
      ],
      "allies": [
        "Tommy Vercetti",
        "Ken Rosenberg"
      ],
      "enemies": [
        "Rival Real Estate Tycoons"
      ],
      "residence": "Carrington Executive Limo & Suites, Vice City",
      "businessesOwned": [
        "Love Media Holdings (future empire)"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "170 lbs (77 kg)",
      "clothing": "Expensive double-breasted grey suit, silk tie, slicked back hair",
      "distinctiveFeatures": "Soft-spoken, articulate, taking notes behind Avery Carrington",
      "leadership": "Observant apprentice learning cutthroat business tactics.",
      "intelligence": "Genius media and property strategist in training.",
      "ambition": "Build the largest media conglomerate in the United States.",
      "loyalty": "Opportunistic; loyal to profits and ruthless mentors.",
      "temperament": "Calm, polite, eerily cold.",
      "behavior": "Takes quiet notes while Avery Carrington orders gang assassinations.",
      "strengths": [
        "Financial acumen",
        "Media foresight",
        "Ruthless corporate mindset"
      ],
      "weaknesses": [
        "Lack of physical combat training"
      ],
      "relationships": [
        {
          "targetName": "Avery Carrington",
          "relationshipType": "Mentor & Teacher",
          "details": "Learned the ruthless art of real estate destruction from Avery in 1986."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Business Acquaintance",
          "details": "Observed Tommy executing Avery's demolition contracts."
        }
      ],
      "missions": [
        "The Party",
        "Four Iron",
        "Two Bit Hit"
      ],
      "beliefs": "Nothing creates value faster than chaos, conflict, and media narrative control.",
      "ideals": "Total ownership of television, radio, news, and real estate.",
      "recurringViewpoints": "\"I am taking detailed notes, Mr. Carrington.\"",
      "memorableQuotes": [
        "\"It's fascinating how a small gang conflict can alter market value so rapidly.\"",
        "\"I am learning so much from your methods, Avery.\""
      ],
      "statistics": {
        "leadership": 82,
        "intelligence": 96,
        "combatSkills": 20,
        "drivingSkills": 60,
        "shootingSkills": 30,
        "physicalStrength": 50,
        "businessSkills": 95,
        "charisma": 88,
        "loyalty": 40,
        "influenceReputation": 94
      },
      "specialAppearances": [
        {
          "game": "GTA III",
          "role": "Major Antagonist / Media Billionaire",
          "description": "Billionaire owner of Love Media in 2001 Liberty City who mysteriously vanishes."
        },
        {
          "game": "GTA Liberty City Stories",
          "role": "Major Character",
          "description": "Ran for Mayor of Liberty City in 1998; ordered Avery Carrington's death."
        }
      ]
    }
  },
  {
    "id": "victor-vance",
    "name": "Victor Vance",
    "nickname": "Vic",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/victor vance.png",
    "profile": {
      "fullName": "Victor \"Vic\" Vance",
      "nicknames": [
        "Vic"
      ],
      "gender": "Male",
      "age": "30 (1986)",
      "nationality": "Dominican-American",
      "occupation": "Head of Vance Crime Family / Ex-US Army Corporal",
      "affiliations": [
        "Vance Crime Family",
        "US Military (formerly)"
      ],
      "status": "Died",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "In the Beginning...",
      "voiceActor": "Armando Riesco (VC) / Dorian Missick (VCS)",
      "family": [
        "Lance Vance (Brother)",
        "Pete Vance (Brother)",
        "Janet Vance (Mother)"
      ],
      "friends": [
        "Lance Vance"
      ],
      "allies": [
        "Tommy Vercetti (intended drug buyer)"
      ],
      "enemies": [
        "Ricardo Diaz",
        "Forelli Family hitmen"
      ],
      "residence": "Vice City Docks / Vance Family Assets",
      "businessesOwned": [
        "Vance Crime Empire (1984)"
      ],
      "height": "6 ft 2 in (188 cm)",
      "weight": "205 lbs (93 kg)",
      "clothing": "Military surplus jacket, blue jeans, boots",
      "distinctiveFeatures": "Athletic military build, serious demeanor",
      "leadership": "Disciplined military officer turned reluctant crime boss.",
      "intelligence": "Tactical strategist with strong moral core.",
      "ambition": "Raise money for his sick brother Pete's medical bills.",
      "loyalty": "Extremely high to family.",
      "temperament": "Serious, stoic, reluctant gangster.",
      "behavior": "Tried to stay out of heavy drugs but forced into crime by Lance.",
      "strengths": [
        "Military combat expert",
        "Martial arts",
        "Weaponry mastery"
      ],
      "weaknesses": [
        "Drawn into disaster by brother Lance's greed"
      ],
      "relationships": [
        {
          "targetName": "Lance Vance",
          "relationshipType": "Brother",
          "details": "Brought Vic into the fatal Vice City docks deal."
        },
        {
          "targetName": "Ricardo Diaz",
          "relationshipType": "Executioner",
          "details": "Diaz's hitmen gunned Vic down during the opening ambush."
        }
      ],
      "missions": [
        "In the Beginning..."
      ],
      "beliefs": "I only did what I had to do to pay my brother's hospital bills.",
      "ideals": "Honor, family responsibility, military discipline.",
      "recurringViewpoints": "\"Lance, you're gonna get us both killed!\"",
      "memorableQuotes": [
        "\"We got the stuff, let's make this deal fast.\"",
        "\"Lance, stop talking and watch the perimeter!\""
      ],
      "statistics": {
        "leadership": 88,
        "intelligence": 85,
        "combatSkills": 96,
        "drivingSkills": 88,
        "shootingSkills": 94,
        "physicalStrength": 92,
        "businessSkills": 75,
        "charisma": 78,
        "loyalty": 95,
        "influenceReputation": 85
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Main Protagonist",
          "description": "The playable central protagonist of 1984 Vice City Stories."
        }
      ]
    }
  },
  {
    "id": "hilary-king",
    "name": "Hilary King",
    "nickname": "The Getaway Driver",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Hilary King.jpg",
    "profile": {
      "fullName": "Hilary King",
      "nicknames": [
        "Hilary"
      ],
      "gender": "Male",
      "age": "31 (1986)",
      "nationality": "American",
      "occupation": "Expert Getaway Driver / Bank Heist Crew Member",
      "affiliations": [
        "Vercetti Heist Crew",
        "Phil Cassidy network"
      ],
      "status": "Died",
      "firstAppearance": "The Driver",
      "lastAppearance": "The Job",
      "voiceActor": "Charles Tucker",
      "family": [
        "Abandoned Family (Implied mother issues)"
      ],
      "friends": [
        "Phil Cassidy",
        "Tommy Vercetti"
      ],
      "allies": [
        "Cam Jones"
      ],
      "enemies": [
        "Vice City SWAT"
      ],
      "residence": "Garage Apartment, Little Haiti, Vice City",
      "businessesOwned": [
        "Underground Drag Racing Garage"
      ],
      "height": "5 ft 9 in (175 cm)",
      "weight": "210 lbs (95 kg)",
      "clothing": "Red racing jacket, sweatpants, messy hair",
      "distinctiveFeatures": "Emotional insecurity, obsession with driving perfection, crying under stress",
      "leadership": "Low; purely a behind-the-wheel Specialist.",
      "intelligence": "Master precision driving physics.",
      "ambition": "Driven by needy desire for approval from tough guys.",
      "loyalty": "Died driving into police crossfire to pick up Tommy's heist team.",
      "temperament": "Needy, paranoid, neurotic driver.",
      "behavior": "Refuses to drive for anyone who cannot beat him in a street race.",
      "strengths": [
        "Unmatched getaway driving skills",
        "High speed maneuvers"
      ],
      "weaknesses": [
        "Emotional instability",
        "Lack of armor protection"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Employer / Driver",
          "details": "Tommy beat him in a street race to recruit him for the bank heist."
        }
      ],
      "missions": [
        "The Driver",
        "The Job"
      ],
      "beliefs": "Nobody drives faster than Hilary King when the heat is on.",
      "ideals": "Finding someone who respects his driving talent.",
      "recurringViewpoints": "\"My daddy never loved me, but I can drive!\"",
      "memorableQuotes": [
        "\"You beat me, Tommy! I'll drive for you anywhere!\"",
        "\"Get in! I'll hold off the SWAT!\""
      ],
      "statistics": {
        "leadership": 30,
        "intelligence": 65,
        "combatSkills": 40,
        "drivingSkills": 99,
        "shootingSkills": 35,
        "physicalStrength": 60,
        "businessSkills": 40,
        "charisma": 45,
        "loyalty": 90,
        "influenceReputation": 72
      },
      "specialAppearances": [],
      "specialOutfits": [
        {
          "id": "hilary-outfit-bank-job",
          "name": "Bank Job Outfit",
          "imageUrl": "/images/special_outfits/hilary/bank_job_outfit.png",
          "description": "A tactical green boiler suit jumpsuit with a hockey mask disguise, worn as the dedicated getaway driver for the heist crew.",
          "situation": "Worn during the Malibu Club bank heist mission \"The Job\" to provide high-speed getaway driving outside El Banco Corrupto Grande."
        }
      ]
    }
  },
  {
    "id": "cam-jones",
    "name": "Cam Jones",
    "nickname": "The Safe Cracker",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Cam Jones.jpg",
    "profile": {
      "fullName": "Cam Jones",
      "nicknames": [
        "Cam",
        "Safe Cracker"
      ],
      "gender": "Male",
      "age": "39 (1986)",
      "nationality": "American",
      "occupation": "Professional Safe Cracker / Locksmith",
      "affiliations": [
        "Vercetti Heist Crew"
      ],
      "status": "Alive (Can die depending on player choices in bank heist)",
      "firstAppearance": "No Escape?",
      "lastAppearance": "The Job",
      "voiceActor": "Greg Sims",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Tommy Vercetti",
        "Phil Cassidy"
      ],
      "allies": [
        "Hilary King"
      ],
      "enemies": [
        "Vice City Police Department"
      ],
      "residence": "Little Haiti Locksmith Shop",
      "businessesOwned": [
        "Cam's Locksmith & Safe Shop"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "165 lbs (75 kg)",
      "clothing": "Yellow shirt, blue overalls, locksmith toolbelt",
      "distinctiveFeatures": "Keyhole tattoos on arms, quiet demeanor",
      "leadership": "Technical vault specialist.",
      "intelligence": "Master mechanical engineer and safe combination solver.",
      "ambition": "Crack the safest bank vaults in Florida.",
      "loyalty": "High after Tommy broke him out of police station cells.",
      "temperament": "Calm under pressure inside bank vaults.",
      "behavior": "Concentrates intensely on dial combinations while bullets fly.",
      "strengths": [
        "Vault safecracking",
        "Lock picking",
        "Security bypass"
      ],
      "weaknesses": [
        "Slow sprinter"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Savior & Heist Boss",
          "details": "Tommy stormed the Vice City police department to rescue Cam from his cell."
        }
      ],
      "missions": [
        "No Escape?",
        "The Job"
      ],
      "beliefs": "Every lock created by man can be opened by a smarter man.",
      "ideals": "Cracking the El Banco Corrupto grande vault.",
      "recurringViewpoints": "\"Give me 30 seconds with this dial, Tommy!\"",
      "memorableQuotes": [
        "\"You broke into a police station just to rescue me? I'm in!\"",
        "\"The vault door is opening!\""
      ],
      "statistics": {
        "leadership": 40,
        "intelligence": 88,
        "combatSkills": 35,
        "drivingSkills": 50,
        "shootingSkills": 40,
        "physicalStrength": 55,
        "businessSkills": 60,
        "charisma": 60,
        "loyalty": 85,
        "influenceReputation": 75
      },
      "specialAppearances": [],
      "specialOutfits": [
        {
          "id": "cam-outfit-bank-job",
          "name": "Bank Job Outfit",
          "imageUrl": "/images/special_outfits/cam_jones/bank_job_outfit.png",
          "description": "A tactical green boiler suit jumpsuit equipped with white sneakers and a hockey mask disguise for the bank vault break-in.",
          "situation": "Worn during the Malibu Club bank heist mission \"The Job\" to crack open the safe at El Banco Corrupto Grande in Little Havana."
        }
      ]
    }
  },
  {
    "id": "bj-smith",
    "name": "BJ Smith",
    "nickname": "BJ",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/bj smith.png",
    "profile": {
      "fullName": "BJ Smith",
      "nicknames": [
        "BJ"
      ],
      "gender": "Male",
      "age": "34 (1986)",
      "nationality": "American",
      "occupation": "Retired Vice City Mambas Football Star / Auto Dealership Seller",
      "affiliations": [
        "Vice City Mambas",
        "Sunshine Autos"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "Sunshine Autos Acquisition",
      "voiceActor": "Lawrence Taylor",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Tommy Vercetti"
      ],
      "allies": [
        "Sunshine Autos Crew"
      ],
      "enemies": [
        "Auto Finance Debtors"
      ],
      "residence": "Starfish Island Villa / Sunshine Autos Showroom",
      "businessesOwned": [
        "Sunshine Autos (sold to Tommy)"
      ],
      "height": "6 ft 4 in (193 cm)",
      "weight": "260 lbs (118 kg)",
      "clothing": "Custom sports suit, gold football championship ring, leather boots",
      "distinctiveFeatures": "Imposing football tight-end physique, deep booming voice",
      "leadership": "Gridiron team captain energy.",
      "intelligence": "Smart enough to sell off his auto dealership before debt collectors hit.",
      "ambition": "Transition from football stardom to auto dealership tycoon.",
      "loyalty": "Clean business dealings with Tommy.",
      "temperament": "Confident, smooth, charismatic.",
      "behavior": "Uses football metaphors to describe business buyouts.",
      "strengths": [
        "Physical strength",
        "Public celebrity appeal"
      ],
      "weaknesses": [
        "Gambling debts"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Business Seller",
          "details": "Sold Sunshine Autos dealership to Tommy for $15,000."
        }
      ],
      "missions": [
        "The Party",
        "Sunshine Autos Asset Purchase"
      ],
      "beliefs": "Business is just football with suits instead of helmets.",
      "ideals": "Retiring wealthy off sports fame and auto investments.",
      "recurringViewpoints": "\"You gotta hit hard on every downs, Tommy!\"",
      "memorableQuotes": [
        "\"Sunshine Autos is all yours, Tommy. Keep the motor running!\"",
        "\"I put blood and tackles into this city!\""
      ],
      "statistics": {
        "leadership": 80,
        "intelligence": 75,
        "combatSkills": 75,
        "drivingSkills": 80,
        "shootingSkills": 50,
        "physicalStrength": 95,
        "businessSkills": 78,
        "charisma": 90,
        "loyalty": 75,
        "influenceReputation": 86
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Radio Host Cameo",
          "description": "Guest on WCTR radio sports talk shows in 1992."
        }
      ]
    }
  },
  {
    "id": "alex-shrub",
    "name": "Alex Shrub",
    "nickname": "Congressman Shrub",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/alex shrub.png",
    "profile": {
      "fullName": "Alex Shrub",
      "nicknames": [
        "Congressman Shrub"
      ],
      "gender": "Male",
      "age": "48 (1986)",
      "nationality": "American",
      "occupation": "Florida State Congressman / Hypocritical Anti-Porn Politician",
      "affiliations": [
        "Florida Republican Party",
        "State Legislature"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "Martha's Mug Shot",
      "family": [
        "Wife in Tallahassee"
      ],
      "friends": [
        "High Society Donors"
      ],
      "allies": [
        "Property Developers"
      ],
      "enemies": [
        "Candy Suxxx (Blackmail)",
        "Tommy Vercetti"
      ],
      "residence": "State Mansion / Vice Point Penthouse",
      "businessesOwned": [
        "Political Campaign Fund"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "Conservative blue suit, red tie, American flag lapel pin",
      "distinctiveFeatures": "Slick politician smile, secret cross-dressing habits",
      "leadership": "Right-wing political campaigner.",
      "intelligence": "Master of media spin, tax cuts, and public distraction.",
      "ambition": "Become Governor of Florida on a strict moral platform.",
      "loyalty": "Zero. Serves only his political career.",
      "temperament": "Smug, hypocritical, easily panicked when caught on camera.",
      "behavior": "Preaches morality on television while engaging in secret affairs at night.",
      "strengths": [
        "Political sway",
        "Tax law manipulation",
        "Public speaking"
      ],
      "weaknesses": [
        "Extremely vulnerable to photo blackmail"
      ],
      "relationships": [
        {
          "targetName": "Candy Suxxx",
          "relationshipType": "Secret Mistress",
          "details": "Photographed in compromising positions by Tommy on Steve Scott's orders."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Blackmailer",
          "details": "Forced to approve InterGlobal Studios zoning permits after Tommy took photos."
        }
      ],
      "missions": [
        "The Party",
        "Martha's Mug Shot"
      ],
      "beliefs": "Voters believe whatever looks good on 6 o'clock television news.",
      "ideals": "Tax cuts for the rich and votes from moral conservatives.",
      "recurringViewpoints": "\"I am a man of high family morals!\"",
      "memorableQuotes": [
        "\"If those photos leak to the press, my political career is dead!\"",
        "\"I stand for traditional family values in Florida!\""
      ],
      "statistics": {
        "leadership": 75,
        "intelligence": 85,
        "combatSkills": 15,
        "drivingSkills": 50,
        "shootingSkills": 20,
        "physicalStrength": 45,
        "businessSkills": 80,
        "charisma": 88,
        "loyalty": 20,
        "influenceReputation": 90
      },
      "specialAppearances": []
    }
  },
  {
    "id": "maude-hanson",
    "name": "Maude Hanson",
    "nickname": "Maude the Ice Cream Queen",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/maude hanson.png",
    "profile": {
      "fullName": "Maude Hanson",
      "nicknames": [
        "Maude"
      ],
      "gender": "Female",
      "age": "62 (1986)",
      "nationality": "American",
      "occupation": "Cherry Popper Factory Owner / Drug Front Operator",
      "affiliations": [
        "Cherry Popper Ice Cream",
        "Child-Hating League"
      ],
      "status": "Alive",
      "firstAppearance": "Cherry Popper Acquisition",
      "lastAppearance": "Distribution Missions",
      "voiceActor": "Jane Gennaro",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Tommy Vercetti"
      ],
      "allies": [
        "Vice City Street Pushers"
      ],
      "enemies": [
        "Vice City Children",
        "VCPD Narcotics Unit"
      ],
      "residence": "Cherry Popper Factory, Little Haiti",
      "businessesOwned": [
        "Cherry Popper Ice Cream Factory"
      ],
      "height": "5 ft 3 in (160 cm)",
      "weight": "180 lbs (81 kg)",
      "clothing": "Stained apron, floral dress, hairnet, rolling pin",
      "distinctiveFeatures": "Scratchy bitter voice, intense hatred of screaming children",
      "leadership": "Manager of front business.",
      "intelligence": "Genius at concealing drug distribution inside ice cream trucks.",
      "ambition": "Sell her drug factory and get away from annoying children forever.",
      "loyalty": "Transactional seller.",
      "temperament": "Bitter, misanthropic, hateful.",
      "behavior": "Mutters threats against neighborhood children while counting drug money.",
      "strengths": [
        "Narcotics distribution network",
        "Disguised logistics"
      ],
      "weaknesses": [
        "Physical infirmity"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Business Seller",
          "details": "Sold the Cherry Popper Ice Cream Factory front to Tommy Vercetti."
        }
      ],
      "missions": [
        "Cherry Popper Asset Purchase",
        "Distribution"
      ],
      "beliefs": "Children are noisy parasites; selling \"special ice cream\" pays for peace.",
      "ideals": "Retiring to a remote island with no children anywhere in sight.",
      "recurringViewpoints": "\"I hate children! Horrible little beasts!\"",
      "memorableQuotes": [
        "\"It's not ice cream we're selling out of those trucks, dearie!\"",
        "\"Keep those screaming brat kids away from my factory!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 80,
        "combatSkills": 20,
        "drivingSkills": 40,
        "shootingSkills": 25,
        "physicalStrength": 35,
        "businessSkills": 82,
        "charisma": 30,
        "loyalty": 60,
        "influenceReputation": 65
      },
      "specialAppearances": []
    }
  },
  {
    "id": "doris",
    "name": "Doris",
    "nickname": "Dispatch Doris",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/doris.png",
    "profile": {
      "fullName": "Doris",
      "nicknames": [
        "Dispatch Doris"
      ],
      "gender": "Female",
      "age": "50 (1986)",
      "nationality": "American",
      "occupation": "Kaufman Cabs Radio Dispatcher",
      "affiliations": [
        "Kaufman Cabs",
        "Vercetti Empire"
      ],
      "status": "Alive",
      "firstAppearance": "Kaufman Cabs Acquisition",
      "lastAppearance": "Cabmaggedon",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Tommy Vercetti"
      ],
      "allies": [
        "Kaufman Cab Drivers"
      ],
      "enemies": [
        "VC Cabs (Rival Taxi Company)"
      ],
      "residence": "Kaufman Cabs Office, Little Haiti",
      "businessesOwned": [
        "Kaufman Dispatch Desk"
      ],
      "height": "5 ft 5 in (165 cm)",
      "weight": "160 lbs (72 kg)",
      "clothing": "Work blouse, headset microphone, chain-smoking cigarettes",
      "distinctiveFeatures": "Raspy chain-smoker voice, witty radio banter",
      "leadership": "Firm control over fleet dispatchers.",
      "intelligence": "Knows every street corner, taxi route, and gang zone in Vice City.",
      "ambition": "Destroy rival VC Cabs and win the taxi wars.",
      "loyalty": "High to Tommy Vercetti.",
      "temperament": "Sarcastic, tough, reliable.",
      "behavior": "Barks radio orders to drivers over the CB radio.",
      "strengths": [
        "Radio communication",
        "Fleet coordination"
      ],
      "weaknesses": [
        "Stationary worker"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Boss / Dispatcher",
          "details": "Dispatches Tommy on key taxi conflict missions."
        }
      ],
      "missions": [
        "V.I.P.",
        "Friendly Rivalry",
        "Cabmaggedon"
      ],
      "beliefs": "Kaufman Cabs owns these roads, not those yellow VC Cabs scum.",
      "ideals": "Monopolizing Vice City taxi transport.",
      "recurringViewpoints": "\"Kaufman Cabs, we take you anywhere!\"",
      "memorableQuotes": [
        "\"Tommy, VC Cabs is cutting our tires again! Give 'em hell!\"",
        "\"Breaker breaker, we got a VIP pick up at the airport!\""
      ],
      "statistics": {
        "leadership": 75,
        "intelligence": 78,
        "combatSkills": 25,
        "drivingSkills": 60,
        "shootingSkills": 30,
        "physicalStrength": 40,
        "businessSkills": 75,
        "charisma": 72,
        "loyalty": 90,
        "influenceReputation": 70
      },
      "specialAppearances": []
    }
  },
  {
    "id": "earnest-kelly",
    "name": "Earnest Kelly",
    "nickname": "Old Man Kelly",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Earnest Kelly.jpg",
    "profile": {
      "fullName": "Earnest Kelly",
      "nicknames": [
        "Old Man Kelly"
      ],
      "gender": "Male",
      "age": "68 (1986)",
      "nationality": "American",
      "occupation": "Master Printer / Print Works Manager",
      "affiliations": [
        "Print Works",
        "Vercetti Crime Family"
      ],
      "status": "Alive (Injured by Forelli mob hitmen, recovered)",
      "firstAppearance": "Print Works Acquisition",
      "lastAppearance": "Cap The Collector",
      "voiceActor": "George DiCenzo",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Tommy Vercetti (father figure)"
      ],
      "allies": [
        "Counterfeit Plate Suppliers"
      ],
      "enemies": [
        "Forelli Crime Family Hitmen"
      ],
      "residence": "Print Works Factory, Little Haiti",
      "businessesOwned": [
        "Print Works Shop"
      ],
      "height": "5 ft 8 in (173 cm)",
      "weight": "155 lbs (70 kg)",
      "clothing": "Inked aprons, magnifying glasses, suspenders, newsboy cap",
      "distinctiveFeatures": "Stained printing hands, gentle raspy voice, fatherly warmth",
      "leadership": "Master craftsman respected by all press workers.",
      "intelligence": "Genius engraver capable of printing undetectable counterfeit cash plates.",
      "ambition": "Print the most realistic counterfeit US banknotes in American history.",
      "loyalty": "Extremely loyal to Tommy; reminded Tommy of his own father.",
      "temperament": "Warm, dedicated, brave under mob intimidation.",
      "behavior": "Passionate about printing techniques; took beatings from Forelli goons without giving up plates.",
      "strengths": [
        "Master counterfeiting engraver",
        "High morale",
        "Fatherly wisdom"
      ],
      "weaknesses": [
        "Elderly physical vulnerability"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Fatherly Friend & Master Craftsman",
          "details": "Tommy revered him like his own printing father; brutally avenged Kelly after Forelli goons beat him."
        }
      ],
      "missions": [
        "Print Works Acquisition",
        "Spilling the Beans",
        "Hit the Courier",
        "Cap The Collector"
      ],
      "beliefs": "Good printing is an art form; money is just paper until an artist engraves it.",
      "ideals": "High quality counterfeiting plate acquisition.",
      "recurringViewpoints": "\"I always wanted to print high quality money, Tommy!\"",
      "memorableQuotes": [
        "\"Tommy... they took the cash... but I didn't tell 'em about the plates...\"",
        "\"You remind me of your old man, Tommy.\""
      ],
      "statistics": {
        "leadership": 70,
        "intelligence": 90,
        "combatSkills": 20,
        "drivingSkills": 40,
        "shootingSkills": 25,
        "physicalStrength": 35,
        "businessSkills": 80,
        "charisma": 85,
        "loyalty": 98,
        "influenceReputation": 78
      },
      "specialAppearances": []
    }
  },
  {
    "id": "dwaine",
    "name": "Dwaine",
    "nickname": "Dwaine the Mechanic",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Dwayne.png",
    "profile": {
      "fullName": "Dwaine",
      "nicknames": [
        "Dwaine"
      ],
      "gender": "Male",
      "age": "33 (1986)",
      "nationality": "American",
      "occupation": "Boatyard Mechanic / Hotdog Vendor",
      "affiliations": [
        "Vice City Boatyard",
        "Jethro Partnership"
      ],
      "status": "Alive",
      "firstAppearance": "Boatyard Acquisition",
      "lastAppearance": "Check Point Charlie",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Jethro",
        "Tommy Vercetti"
      ],
      "allies": [
        "Vercetti Family"
      ],
      "enemies": [
        "Coast Guard Patrols"
      ],
      "residence": "Viceport Boatyard Hangar",
      "businessesOwned": [
        "Vice City Boatyard (sold to Tommy)"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "180 lbs (81 kg)",
      "clothing": "Greasy overalls, trucker hat, wrench in back pocket",
      "distinctiveFeatures": "Grease-smudged face, relaxed hippie demeanor",
      "leadership": "Boat engine tuning expert.",
      "intelligence": "High mechanical skill with marine engines and fast speedboats.",
      "ambition": "Build the fastest drug-running speedboats in Vice City.",
      "loyalty": "Good customer relations with Tommy.",
      "temperament": "Laid-back, relaxed, chill.",
      "behavior": "Tunes high-horsepower marine engines with Jethro.",
      "strengths": [
        "Marine engine mechanics",
        "Speedboat modifications"
      ],
      "weaknesses": [
        "Unorganized business management"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Seller & Mechanic",
          "details": "Sold Viceport Boatyard to Tommy and modified the Squalo speedboats."
        },
        {
          "targetName": "Jethro",
          "relationshipType": "Best Friend & Mechanic Partner",
          "details": "Worked side-by-side in Vice City and later San Fierro."
        }
      ],
      "missions": [
        "Boatyard Asset Purchase",
        "Check Point Charlie"
      ],
      "beliefs": "A twin-turbo marine V8 engine can outrun any Coast Guard chopper.",
      "ideals": "Tuning high speed boats.",
      "recurringViewpoints": "\"Check out the engine response on this Squalo, man!\"",
      "memorableQuotes": [
        "\"She's built for speed, Tommy! Go smash those checkpoint records!\"",
        "\"Me and Jethro tuned this baby personally.\""
      ],
      "statistics": {
        "leadership": 55,
        "intelligence": 82,
        "combatSkills": 30,
        "drivingSkills": 85,
        "shootingSkills": 25,
        "physicalStrength": 70,
        "businessSkills": 55,
        "charisma": 70,
        "loyalty": 85,
        "influenceReputation": 68
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Minor Supporting Character",
          "description": "Operates a hotdog van in San Fierro before CJ hires him at the Doherty Garage in 1992."
        }
      ]
    }
  },
  {
    "id": "jethro",
    "name": "Jethro",
    "nickname": "Jethro the Mechanic",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/jethro.jpeg",
    "profile": {
      "fullName": "Jethro",
      "nicknames": [
        "Jethro"
      ],
      "gender": "Male",
      "age": "32 (1986)",
      "nationality": "American",
      "occupation": "Speedboat Mechanic / Garage Technician",
      "affiliations": [
        "Vice City Boatyard",
        "Dwaine Partnership"
      ],
      "status": "Alive",
      "firstAppearance": "Boatyard Acquisition",
      "lastAppearance": "Check Point Charlie",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Dwaine",
        "Tommy Vercetti"
      ],
      "allies": [
        "Vercetti Crime Family"
      ],
      "enemies": [
        "Coast Guard"
      ],
      "residence": "Viceport Hangar",
      "businessesOwned": [
        "Boatyard Workshop"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "170 lbs (77 kg)",
      "clothing": "Denim vest, band t-shirt, messy long hair",
      "distinctiveFeatures": "Stoner speech cadence, engine grease under fingernails",
      "leadership": "Co-mechanic partner.",
      "intelligence": "Expert knowledge of marine fiberglass hulls and propulsion.",
      "ambition": "Fix fast cars and speedboats while enjoying Vice City sunshine.",
      "loyalty": "Solid.",
      "temperament": "Easygoing, spacey, friendly.",
      "behavior": "Hands tools to Dwaine while testing engine revs.",
      "strengths": [
        "Hull aerodynamic tuning",
        "Speedboat maintenance"
      ],
      "weaknesses": [
        "Spacey attention span"
      ],
      "relationships": [
        {
          "targetName": "Dwaine",
          "relationshipType": "Mechanic Partner",
          "details": "Longtime business partner in Vice City and San Andreas."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Client",
          "details": "Provided Tommy with record-breaking speedboats."
        }
      ],
      "missions": [
        "Boatyard Asset Purchase",
        "Check Point Charlie"
      ],
      "beliefs": "If it rides on water and goes 90 knots, it's beautiful.",
      "ideals": "Endless summer, fast engines, zero stress.",
      "recurringViewpoints": "\"Far out, man! Feel that horsepower!\"",
      "memorableQuotes": [
        "\"This boat is so fast it'll peel your eyebrows back, Tommy!\"",
        "\"Groovy work on that delivery run, man!\""
      ],
      "statistics": {
        "leadership": 50,
        "intelligence": 80,
        "combatSkills": 28,
        "drivingSkills": 84,
        "shootingSkills": 22,
        "physicalStrength": 65,
        "businessSkills": 50,
        "charisma": 72,
        "loyalty": 85,
        "influenceReputation": 67
      },
      "specialAppearances": [
        {
          "game": "GTA San Andreas",
          "role": "Minor Supporting Character",
          "description": "Worked at Xoomer Gas Station in San Fierro before CJ recruited him for Doherty Garage in 1992."
        }
      ]
    }
  },
  {
    "id": "harry",
    "name": "Harry",
    "nickname": "Forelli Harry",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/harry.png",
    "profile": {
      "fullName": "Harry",
      "nicknames": [
        "Forelli Harry"
      ],
      "gender": "Male",
      "age": "34 (1986)",
      "nationality": "Italian-American",
      "occupation": "Forelli Family Mobster / Tommy's Escort Bodyguard",
      "affiliations": [
        "Forelli Crime Family"
      ],
      "status": "Died",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "In the Beginning...",
      "family": [
        "Unknown Forelli Mob Clan"
      ],
      "friends": [
        "Lee",
        "Tommy Vercetti"
      ],
      "allies": [
        "Sonny Forelli"
      ],
      "enemies": [
        "Diaz Hitmen"
      ],
      "residence": "Liberty City / Escort Limo in Vice City",
      "businessesOwned": [
        "Forelli Mob Assets"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "190 lbs (86 kg)",
      "clothing": "Brown leather mob jacket, suit trousers, sunglasses",
      "distinctiveFeatures": "Heavy Brooklyn accent, armed with Mac-10",
      "leadership": "Mob gunman escort.",
      "intelligence": "Standard mafia muscle.",
      "ambition": "Complete the Vice City deal and return to Liberty City.",
      "loyalty": "Sent by Sonny to keep eyes on Tommy.",
      "temperament": "Aggressive, alert.",
      "behavior": "Guarded the cash briefcase during the docks meeting.",
      "strengths": [
        "Submachine gun shooting",
        "Bodyguard duty"
      ],
      "weaknesses": [
        "Caught off guard by masked ambushers"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Mob Escort Colleague",
          "details": "Travelled with Tommy to Vice City; killed in opening dock ambush."
        },
        {
          "targetName": "Lee",
          "relationshipType": "Enforcer Partner",
          "details": "Killed alongside Lee at the docks."
        }
      ],
      "missions": [
        "In the Beginning..."
      ],
      "beliefs": "Liberty City mobs run the whole country.",
      "ideals": "Getting paid by Don Forelli.",
      "recurringViewpoints": "\"Keep your hands on your guns, boys.\"",
      "memorableQuotes": [
        "\"This deal better go smooth, Tommy.\"",
        "\"Ambush! Look out!\""
      ],
      "statistics": {
        "leadership": 50,
        "intelligence": 60,
        "combatSkills": 75,
        "drivingSkills": 65,
        "shootingSkills": 72,
        "physicalStrength": 75,
        "businessSkills": 40,
        "charisma": 50,
        "loyalty": 70,
        "influenceReputation": 60
      },
      "specialAppearances": []
    }
  },
  {
    "id": "lee",
    "name": "Lee",
    "nickname": "Forelli Lee",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/lee.jpeg",
    "profile": {
      "fullName": "Lee",
      "nicknames": [
        "Forelli Lee"
      ],
      "gender": "Male",
      "age": "32 (1986)",
      "nationality": "Italian-American",
      "occupation": "Forelli Family Mob Enforcer",
      "affiliations": [
        "Forelli Crime Family"
      ],
      "status": "Died",
      "firstAppearance": "In the Beginning...",
      "lastAppearance": "In the Beginning...",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Harry",
        "Tommy Vercetti"
      ],
      "allies": [
        "Sonny Forelli"
      ],
      "enemies": [
        "Diaz Ambush Squad"
      ],
      "residence": "Liberty City",
      "businessesOwned": [
        "Forelli Assets"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "185 lbs (84 kg)",
      "clothing": "Dark grey mob suit, black shirt",
      "distinctiveFeatures": "Serious mobster stare",
      "leadership": "Enforcer muscle.",
      "intelligence": "Basic street combat awareness.",
      "ambition": "Serve the Forelli family.",
      "loyalty": "Forelli loyalist.",
      "temperament": "Quiet, stern.",
      "behavior": "Carried weapons to back up Tommy at the dock transaction.",
      "strengths": [
        "Tactical escort cover"
      ],
      "weaknesses": [
        "Overwhelmed by surprise gunfire"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Mob Associate",
          "details": "Killed by Diaz's hitmen during opening deal."
        }
      ],
      "missions": [
        "In the Beginning..."
      ],
      "beliefs": "Follow Don Forelli's orders without question.",
      "ideals": "Mafia brotherhood.",
      "recurringViewpoints": "\"Watch the dock perimeter.\"",
      "memorableQuotes": [
        "\"We got company!\""
      ],
      "statistics": {
        "leadership": 45,
        "intelligence": 58,
        "combatSkills": 72,
        "drivingSkills": 60,
        "shootingSkills": 70,
        "physicalStrength": 72,
        "businessSkills": 35,
        "charisma": 45,
        "loyalty": 75,
        "influenceReputation": 58
      },
      "specialAppearances": []
    }
  },
  {
    "id": "leo-teal",
    "name": "Leo Teal",
    "nickname": "The Hitman / Chef",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/leo teal.png",
    "profile": {
      "fullName": "Leo Teal",
      "nicknames": [
        "Leo",
        "The Hitman Chef"
      ],
      "gender": "Male",
      "age": "36 (1986)",
      "nationality": "American",
      "occupation": "Hitman / Restaurant Chef Front Operator",
      "affiliations": [
        "Freelance Assassins",
        "Vice City Underworld"
      ],
      "status": "Died",
      "firstAppearance": "Back Alley Brawl",
      "lastAppearance": "Back Alley Brawl",
      "voiceActor": "Donald Faison",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Rival Mercenaries"
      ],
      "allies": [
        "Contract Paymasters"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Back Alley Restaurant, Ocean Beach",
      "businessesOwned": [
        "Ocean Beach Bistro Front"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "White chef coat, bloodied aprons, cellular phone pouch",
      "distinctiveFeatures": "Carried a bulky 1980s mobile phone that Tommy took",
      "leadership": "Solo hitman.",
      "intelligence": "Connected to high-profile contract hits via mobile communications.",
      "ambition": "Execute hit contracts for cash.",
      "loyalty": "To highest bidder.",
      "temperament": "Hostile, aggressive.",
      "behavior": "Attacked Tommy in an alley with meat cleavers and fists.",
      "strengths": [
        "Covert operation front",
        "Mobile phone network"
      ],
      "weaknesses": [
        "Underestimated Tommy Vercetti in hand-to-hand combat"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Victim to Tommy",
          "details": "Tommy beat Leo to death in an ocean beach back alley and stole his cell phone."
        }
      ],
      "missions": [
        "Back Alley Brawl"
      ],
      "beliefs": "Cooking food and killing targets both pay the bills.",
      "ideals": "Making easy money off hit contracts.",
      "recurringViewpoints": "\"Get out of my alley, chump!\"",
      "memorableQuotes": [
        "\"You picked the wrong alley to mess around in!\""
      ],
      "statistics": {
        "leadership": 35,
        "intelligence": 65,
        "combatSkills": 70,
        "drivingSkills": 60,
        "shootingSkills": 65,
        "physicalStrength": 75,
        "businessSkills": 50,
        "charisma": 40,
        "loyalty": 30,
        "influenceReputation": 55
      },
      "specialAppearances": []
    }
  },
  {
    "id": "gonzalez",
    "name": "Gonzalez",
    "nickname": "The Traitor Aide",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Gonzalez.jpg",
    "profile": {
      "fullName": "Gonzalez",
      "nicknames": [
        "Gonzalez"
      ],
      "gender": "Male",
      "age": "45 (1986)",
      "nationality": "Central American",
      "occupation": "Colonel Cortez's Right-Hand Aide / Embezzler",
      "affiliations": [
        "Cortez Cartel (formerly)"
      ],
      "status": "Died",
      "firstAppearance": "The Party",
      "lastAppearance": "Treacherous Swine",
      "voiceActor": "Jorge Pupo",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Corrupt Buyers"
      ],
      "allies": [
        "Secret buyers of Cortez's arms"
      ],
      "enemies": [
        "Colonel Juan Garcia Cortez",
        "Tommy Vercetti"
      ],
      "residence": "Penthouse Suite, Washington Beach, Vice City",
      "businessesOwned": [
        "Embezzled Stash Houses"
      ],
      "height": "5 ft 9 in (175 cm)",
      "weight": "195 lbs (88 kg)",
      "clothing": "Silk floral shirt, gold chains, white pants",
      "distinctiveFeatures": "Chubby frame, sweating under pressure, nervous laugh",
      "leadership": "Low; greedy administrator.",
      "intelligence": "Skilled at secret bookkeeping until caught.",
      "ambition": "Steal Cortez's weapons cargo and flee to private estate.",
      "loyalty": "Zero. Sold out Colonel Cortez for money.",
      "temperament": "Cowardly, greedy, desperate.",
      "behavior": "Tried to hide behind bodyguards with a chainsaw when Tommy arrived.",
      "strengths": [
        "Bureaucratic access"
      ],
      "weaknesses": [
        "Extreme cowardice under chainsaw threat"
      ],
      "relationships": [
        {
          "targetName": "Colonel Cortez",
          "relationshipType": "Traitorous Aide",
          "details": "Betrayed Cortez by leaking drug deal coordinates; Cortez ordered Tommy to execute him."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Executioner",
          "details": "Tommy hunted Gonzalez down at his penthouse and executed him with a chainsaw."
        }
      ],
      "missions": [
        "The Party",
        "Treacherous Swine"
      ],
      "beliefs": "Money in hand is better than loyalty to a military colonel.",
      "ideals": "Stealing enough cash to retire quietly.",
      "recurringViewpoints": "\"Don't kill me! I have money!\"",
      "memorableQuotes": [
        "\"Cortez sent you?! No, Tommy, wait!\"",
        "\"I can pay you double whatever the Colonel offered!\""
      ],
      "statistics": {
        "leadership": 40,
        "intelligence": 70,
        "combatSkills": 30,
        "drivingSkills": 50,
        "shootingSkills": 35,
        "physicalStrength": 50,
        "businessSkills": 65,
        "charisma": 50,
        "loyalty": 10,
        "influenceReputation": 60
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Minor Character",
          "description": "Served as Colonel Cortez's aide in 1984 Vice City Stories."
        }
      ]
    }
  },
  {
    "id": "pedro-garcia",
    "name": "Pedro Garcia",
    "nickname": "Pedro",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/pedro.png",
    "profile": {
      "fullName": "Pedro Garcia",
      "nicknames": [
        "Pedro"
      ],
      "gender": "Male",
      "age": "41 (1986)",
      "nationality": "Mexican",
      "occupation": "Gunrunner / Arms Smuggler Leader",
      "affiliations": [
        "Mexican Gunrunners"
      ],
      "status": "Died",
      "firstAppearance": "Gun Runner",
      "lastAppearance": "Gun Runner",
      "voiceActor": "Frank Vincent",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Arms Dealers"
      ],
      "allies": [
        "Military Supply Thieves"
      ],
      "enemies": [
        "Phil Cassidy",
        "Tommy Vercetti"
      ],
      "residence": "Convoys across Vice City",
      "businessesOwned": [
        "Arms Smuggling Syndicate"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "200 lbs (90 kg)",
      "clothing": "Sombrero hat, leather ammo belts, denim jacket",
      "distinctiveFeatures": "Heavy mustache, riding in armored Walton trucks",
      "leadership": "Convoy commander.",
      "intelligence": "Tactical supply route manager.",
      "ambition": "Control the military grade weapons market in Florida.",
      "loyalty": "Loyal to his gunrunning syndicate.",
      "temperament": "Aggressive, stubborn.",
      "behavior": "Drives armored trucks loaded with heavy weapons crates.",
      "strengths": [
        "Armored convoy logistics",
        "Heavy weapons supply"
      ],
      "weaknesses": [
        "Targeted by Phil Cassidy and Tommy Vercetti"
      ],
      "relationships": [
        {
          "targetName": "Phil Cassidy",
          "relationshipType": "Rival Gunrunner",
          "details": "Rival arms dealer whose weapons trucks were hijacked by Tommy and Phil."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Enemy",
          "details": "Destroyed Pedro's supply trucks in Gun Runner."
        }
      ],
      "missions": [
        "Gun Runner"
      ],
      "beliefs": "Whoever holds the heaviest military rifles owns the state.",
      "ideals": "Monopolizing heavy ordnance sales.",
      "recurringViewpoints": "\"Protect the ammo trucks!\"",
      "memorableQuotes": [
        "\"Fire on those intruders! Don't lose the weapons!\""
      ],
      "statistics": {
        "leadership": 75,
        "intelligence": 72,
        "combatSkills": 80,
        "drivingSkills": 78,
        "shootingSkills": 82,
        "physicalStrength": 80,
        "businessSkills": 70,
        "charisma": 65,
        "loyalty": 80,
        "influenceReputation": 72
      },
      "specialAppearances": []
    }
  },
  {
    "id": "alberto-robina",
    "name": "Alberto Robina",
    "nickname": "Papá Robina",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/alberto robina.png",
    "profile": {
      "fullName": "Alberto Robina",
      "nicknames": [
        "Papá Robina",
        "Alberto"
      ],
      "gender": "Male",
      "age": "67 (1986)",
      "nationality": "Cuban",
      "occupation": "Cafe Robina Owner / Patriarch",
      "affiliations": [
        "Los Cabrones (Cuban Gang)",
        "Cafe Robina"
      ],
      "status": "Alive",
      "firstAppearance": "Stunt Boat Challenge",
      "lastAppearance": "Trojan Voodoo",
      "voiceActor": "Victor Argo",
      "family": [
        "Umberto Robina (Son)"
      ],
      "friends": [
        "Tommy Vercetti",
        "Little Havana Elders"
      ],
      "allies": [
        "Los Cabrones"
      ],
      "enemies": [
        "Haitian Gang"
      ],
      "residence": "Cafe Robina, Little Havana, Vice City",
      "businessesOwned": [
        "Cafe Robina"
      ],
      "height": "5 ft 7 in (170 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "Traditional Cuban guayabera shirt, fedora hat, reading glasses",
      "distinctiveFeatures": "Warm grandfatherly smile, brewing authentic Cuban espresso",
      "leadership": "Patriarchal figurehead respected by all Cuban youths.",
      "intelligence": "Wise elder who understands community strength.",
      "ambition": "Run a peaceful cafe and watch his son Umberto grow up strong.",
      "loyalty": "Extreme family loyalty.",
      "temperament": "Gentle, gracious, proud.",
      "behavior": "Welcomes Tommy into Cafe Robina with hot espresso drinks.",
      "strengths": [
        "Community respect",
        "Patriarchal wisdom"
      ],
      "weaknesses": [
        "Elderly physical condition"
      ],
      "relationships": [
        {
          "targetName": "Umberto Robina",
          "relationshipType": "Son",
          "details": "Adored by his violent son Umberto."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Honored Guest",
          "details": "Always served Tommy espresso with great honor."
        }
      ],
      "missions": [
        "Stunt Boat Challenge",
        "Cannon Fodder",
        "Trojan Voodoo"
      ],
      "beliefs": "Family and good Cuban coffee are the foundation of life.",
      "ideals": "Peace and honor for the Little Havana community.",
      "recurringViewpoints": "\"Welcome to Cafe Robina, my friend!\"",
      "memorableQuotes": [
        "\"Umberto talks loud, but he has a good heart, Tommy.\"",
        "\"Drink your Cuban coffee, Tommy!\""
      ],
      "statistics": {
        "leadership": 78,
        "intelligence": 85,
        "combatSkills": 20,
        "drivingSkills": 40,
        "shootingSkills": 25,
        "physicalStrength": 35,
        "businessSkills": 75,
        "charisma": 92,
        "loyalty": 98,
        "influenceReputation": 88
      },
      "specialAppearances": [
        {
          "game": "GTA Vice City Stories",
          "role": "Minor Supporting Character",
          "description": "Owned Cafe Robina during the 1984 events."
        }
      ]
    }
  },
  {
    "id": "rico",
    "name": "Rico",
    "nickname": "Rico the Boat Captain",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/rico.png",
    "profile": {
      "fullName": "Rico",
      "nicknames": [
        "Rico"
      ],
      "gender": "Male",
      "age": "31 (1986)",
      "nationality": "Cuban-American",
      "occupation": "Los Cabrones Boat Captain / Enforcer",
      "affiliations": [
        "Los Cabrones (Cuban Gang)"
      ],
      "status": "Alive (Rescued after boat explosion)",
      "firstAppearance": "Stunt Boat Challenge",
      "lastAppearance": "Naval Engagement",
      "voiceActor": "Hunter Platin",
      "family": [
        "Unknown Cuban Clan"
      ],
      "friends": [
        "Umberto Robina",
        "Pepe",
        "Tommy Vercetti"
      ],
      "allies": [
        "Los Cabrones"
      ],
      "enemies": [
        "Haitians"
      ],
      "residence": "Little Havana Docks",
      "businessesOwned": [
        "Cuban Speedboat Fleet"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "Red bandana, sleeveless vest, tattoos, jeans",
      "distinctiveFeatures": "Expert boat steering, fierce Cuban gang loyalty",
      "leadership": "Naval squad leader.",
      "intelligence": "Expert knowledge of Vice City water channels and sea assaults.",
      "ambition": "Smuggle goods for Umberto and destroy Haitian supply boats.",
      "loyalty": "High to Umberto Robina.",
      "temperament": "Aggressive, brave.",
      "behavior": "Pilots Tropic speedboats into heavy gunfire without flinching.",
      "strengths": [
        "High speed boat maneuvering",
        "Naval combat"
      ],
      "weaknesses": [
        "Vulnerable to RPG ambushes"
      ],
      "relationships": [
        {
          "targetName": "Umberto Robina",
          "relationshipType": "Gang Leader Boss",
          "details": "Serves as Umberto's top naval lieutenant."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Combat Partner",
          "details": "Piloted Tommy into the Haitian naval ambush in Starfish Island waters."
        }
      ],
      "missions": [
        "Stunt Boat Challenge",
        "Naval Engagement"
      ],
      "beliefs": "No Haitian boat can out-maneuver Los Cabrones on the water.",
      "ideals": "Cuban victory in Vice City waters.",
      "recurringViewpoints": "\"Get on the gun, Tommy!\"",
      "memorableQuotes": [
        "\"Hold on tight, Tommy! I'm bringing us right up to their dock!\"",
        "\"Los Cabrones rule these waters!\""
      ],
      "statistics": {
        "leadership": 70,
        "intelligence": 72,
        "combatSkills": 82,
        "drivingSkills": 90,
        "shootingSkills": 80,
        "physicalStrength": 78,
        "businessSkills": 55,
        "charisma": 75,
        "loyalty": 92,
        "influenceReputation": 75
      },
      "specialAppearances": []
    }
  },
  {
    "id": "pepe",
    "name": "Pepe",
    "nickname": "Pepe the Trojan Driver",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/Pepe.jpg",
    "profile": {
      "fullName": "Pepe",
      "nicknames": [
        "Pepe"
      ],
      "gender": "Male",
      "age": "29 (1986)",
      "nationality": "Cuban-American",
      "occupation": "Los Cabrones Street Enforcer / Voodoo Van Driver",
      "affiliations": [
        "Los Cabrones (Cuban Gang)"
      ],
      "status": "Alive",
      "firstAppearance": "Trojan Voodoo",
      "lastAppearance": "Trojan Voodoo",
      "voiceActor": "Felix Solis",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Umberto Robina",
        "Rico",
        "Tommy Vercetti"
      ],
      "allies": [
        "Los Cabrones"
      ],
      "enemies": [
        "Haitian Gang"
      ],
      "residence": "Little Havana",
      "businessesOwned": [
        "Cuban Garage Assets"
      ],
      "height": "5 ft 9 in (175 cm)",
      "weight": "170 lbs (77 kg)",
      "clothing": "Yellow bandana, Cuban gang shirt, combat boots",
      "distinctiveFeatures": "Fast reflexes, gang tattoos",
      "leadership": "Field operative.",
      "intelligence": "Street tactical infiltrator.",
      "ambition": "Assist in blowing up the Haitian narcotics factory.",
      "loyalty": "Loyal to Umberto Robina.",
      "temperament": "Eager for action, loud.",
      "behavior": "Stole a Haitian Voodoo car to disguise Tommy's bomb raid.",
      "strengths": [
        "Covert vehicle theft",
        "Demolition assistance"
      ],
      "weaknesses": [
        "Hot-headed"
      ],
      "relationships": [
        {
          "targetName": "Umberto Robina",
          "relationshipType": "Boss",
          "details": "Executed Umberto's Trojan Voodoo infiltration plan."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Comrade",
          "details": "Drove Tommy into the Haitian compound to plant explosives."
        }
      ],
      "missions": [
        "Trojan Voodoo"
      ],
      "beliefs": "Disguising as the enemy is the smartest way to blow up their base.",
      "ideals": "Eliminating the Haitian drug factory.",
      "recurringViewpoints": "\"Jump in de Voodoo, Tommy!\"",
      "memorableQuotes": [
        "\"They think we are Haitians in this car! Drive fast, Tommy!\"",
        "\"The whole factory is gonna blow!\""
      ],
      "statistics": {
        "leadership": 65,
        "intelligence": 75,
        "combatSkills": 80,
        "drivingSkills": 82,
        "shootingSkills": 78,
        "physicalStrength": 75,
        "businessSkills": 50,
        "charisma": 70,
        "loyalty": 90,
        "influenceReputation": 72
      },
      "specialAppearances": []
    }
  },
  {
    "id": "pablo",
    "name": "Pablo",
    "nickname": "Pablo Cortez Aide",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/pablo.png",
    "profile": {
      "fullName": "Pablo",
      "nicknames": [
        "Pablo"
      ],
      "gender": "Male",
      "age": "33 (1986)",
      "nationality": "Central American",
      "occupation": "Colonel Cortez's Yacht Security Chief",
      "affiliations": [
        "Cortez Cartel",
        "Diplomatic Guard"
      ],
      "status": "Alive",
      "firstAppearance": "The Party",
      "lastAppearance": "All Hands On Deck!",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Colonel Cortez",
        "Tommy Vercetti"
      ],
      "allies": [
        "Cortez Mercenaries"
      ],
      "enemies": [
        "French Secret Service Agents"
      ],
      "residence": "Cortez Yacht",
      "businessesOwned": [
        "Security Escort Operations"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "190 lbs (86 kg)",
      "clothing": "White naval officer uniform, sunglasses",
      "distinctiveFeatures": "Military posture, assault rifle proficiency",
      "leadership": "Shipboard security chief.",
      "intelligence": "Maritime defense specialist.",
      "ambition": "Safeguard Colonel Cortez against French intelligence raids.",
      "loyalty": "Absolute loyalty to Colonel Cortez.",
      "temperament": "Disciplined, silent, lethal.",
      "behavior": "Guards the Yacht bridge during missile and helicopter attacks.",
      "strengths": [
        "Anti-aircraft shooting",
        "Shipboard defense"
      ],
      "weaknesses": [
        "Limited civilian networking"
      ],
      "relationships": [
        {
          "targetName": "Colonel Cortez",
          "relationshipType": "Commander",
          "details": "Fought alongside Cortez on the escape yacht."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Comrade in Arms",
          "details": "Helped Tommy defend Cortez's yacht from French gunboats."
        }
      ],
      "missions": [
        "The Party",
        "All Hands On Deck!"
      ],
      "beliefs": "Duty to the Colonel until the last bullet.",
      "ideals": "Military precision.",
      "recurringViewpoints": "\"French gunboats coming from the starboard side!\"",
      "memorableQuotes": [
        "\"Shoot down those French attack helicopters!\"",
        "\"Clear the deck!\""
      ],
      "statistics": {
        "leadership": 75,
        "intelligence": 78,
        "combatSkills": 88,
        "drivingSkills": 75,
        "shootingSkills": 90,
        "physicalStrength": 82,
        "businessSkills": 55,
        "charisma": 65,
        "loyalty": 96,
        "influenceReputation": 74
      },
      "specialAppearances": []
    }
  },
  {
    "id": "pierre-la-ponce",
    "name": "Pierre La Ponce",
    "nickname": "French Secret Agent",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/pierre la ponce.png",
    "profile": {
      "fullName": "Pierre La Ponce",
      "nicknames": [
        "La Ponce",
        "French Agent"
      ],
      "gender": "Male",
      "age": "38 (1986)",
      "nationality": "French",
      "occupation": "French Secret Service Intelligence Courier",
      "affiliations": [
        "DGSE (French Secret Service)"
      ],
      "status": "Died",
      "firstAppearance": "Mall Shootout",
      "lastAppearance": "Mall Shootout",
      "voiceActor": "Christian Erickson",
      "family": [
        "Unknown"
      ],
      "friends": [
        "French Intel Officers"
      ],
      "allies": [
        "French Tactical Squads"
      ],
      "enemies": [
        "Colonel Cortez",
        "Tommy Vercetti"
      ],
      "residence": "Paris / Vice City French Consulate",
      "businessesOwned": [
        "Intelligence Safehouses"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "165 lbs (75 kg)",
      "clothing": "Trench coat, dark suit, leather gloves, courier briefcase",
      "distinctiveFeatures": "French accent, riding a fast PCJ-600 sports bike",
      "leadership": "Intelligence courier officer.",
      "intelligence": "Master spy craft and missile technology theft.",
      "ambition": "Retrieve military guidance chips from Colonel Cortez.",
      "loyalty": "Loyal to the French government.",
      "temperament": "Deceitful, agile, evasive.",
      "behavior": "Set an ambush for Tommy at the Washington Mall and fled on a motorcycle.",
      "strengths": [
        "High-speed motorcycle getaway",
        "Espionage"
      ],
      "weaknesses": [
        "Chased down by Tommy Vercetti"
      ],
      "relationships": [
        {
          "targetName": "Colonel Cortez",
          "relationshipType": "Target of Espionage",
          "details": "Stole military missile chips from Cortez."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Hunter",
          "details": "Tommy chased La Ponce through Vice City traffic and eliminated him."
        }
      ],
      "missions": [
        "Mall Shootout"
      ],
      "beliefs": "The Republic of France comes before any South American colonel.",
      "ideals": "Recovering classified missile guidance tech.",
      "recurringViewpoints": "\"You will never catch me, American!\"",
      "memorableQuotes": [
        "\"It is a trap! French Secret Service, open fire!\"",
        "\"Sacrebleu!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 85,
        "combatSkills": 75,
        "drivingSkills": 92,
        "shootingSkills": 78,
        "physicalStrength": 65,
        "businessSkills": 60,
        "charisma": 70,
        "loyalty": 85,
        "influenceReputation": 70
      },
      "specialAppearances": []
    }
  },
  {
    "id": "ted",
    "name": "Ted",
    "nickname": "Ted the Hitman Target",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/ted.png",
    "profile": {
      "fullName": "Ted",
      "nicknames": [
        "Ted"
      ],
      "gender": "Male",
      "age": "40 (1986)",
      "nationality": "American",
      "occupation": "Target on Payphone Contract",
      "affiliations": [
        "Vice City Underworld"
      ],
      "status": "Died",
      "firstAppearance": "Road Kill",
      "lastAppearance": "Road Kill",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Pizza Delivery Drivers"
      ],
      "allies": [
        "Local Businesses"
      ],
      "enemies": [
        "Mr. Black (Payphone Contact)",
        "Tommy Vercetti"
      ],
      "residence": "Vice Point",
      "businessesOwned": [
        "Unknown"
      ],
      "height": "5 ft 9 in (175 cm)",
      "weight": "190 lbs (86 kg)",
      "clothing": "Casual shirt, cap, riding a Pizza Boy scooter",
      "distinctiveFeatures": "Riding a slow pizza delivery scooter",
      "leadership": "None.",
      "intelligence": "Unaware he had a hit out on his life.",
      "ambition": "Deliver pizzas on time.",
      "loyalty": "Low.",
      "temperament": "Unsuspecting.",
      "behavior": "Rode around Vice Point delivering pizzas until Tommy ran him down.",
      "strengths": [
        "Pizza delivery routing"
      ],
      "weaknesses": [
        "Driving a slow scooter against Tommy's car"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Assassin",
          "details": "Tommy executed him per Mr. Black's payphone orders."
        }
      ],
      "missions": [
        "Road Kill"
      ],
      "beliefs": "Pizzas should be delivered hot.",
      "ideals": "Surviving another work shift.",
      "recurringViewpoints": "\"Just another pizza delivery run...\"",
      "memorableQuotes": [
        "\"Hey, watch where you're driving!\""
      ],
      "statistics": {
        "leadership": 20,
        "intelligence": 50,
        "combatSkills": 20,
        "drivingSkills": 40,
        "shootingSkills": 15,
        "physicalStrength": 45,
        "businessSkills": 30,
        "charisma": 40,
        "loyalty": 50,
        "influenceReputation": 25
      },
      "specialAppearances": []
    }
  },
  {
    "id": "charlie-dilson",
    "name": "Charlie Dilson",
    "nickname": "Charlie",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/charlie.png",
    "profile": {
      "fullName": "Charlie Dilson",
      "nicknames": [
        "Charlie"
      ],
      "gender": "Male",
      "age": "35 (1986)",
      "nationality": "American",
      "occupation": "Payphone Contract Target / Mercenary",
      "affiliations": [
        "Autocide Mercenaries"
      ],
      "status": "Died",
      "firstAppearance": "Autocide",
      "lastAppearance": "Autocide",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Autocide Syndicate"
      ],
      "allies": [
        "Mike Griffin",
        "Dick Tanner"
      ],
      "enemies": [
        "Mr. Black",
        "Tommy Vercetti"
      ],
      "residence": "Washington Beach Billboard",
      "businessesOwned": [
        "Security Contracting"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "180 lbs (81 kg)",
      "clothing": "Tactical vest, jeans, sunglasses",
      "distinctiveFeatures": "Riding a PCJ-600 motorcycle near billboard",
      "leadership": "Squad sniper.",
      "intelligence": "Professional hitman surveillance skills.",
      "ambition": "Execute European syndicate heist in Vice City.",
      "loyalty": "Syndicate loyalist.",
      "temperament": "Alert, vigilant.",
      "behavior": "Monitored street traffic from a high vantage point.",
      "strengths": [
        "Sniper optics",
        "Mobile escape"
      ],
      "weaknesses": [
        "Eliminated by Tommy Vercetti"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Executioner",
          "details": "Eliminated by Tommy in the Autocide hit list."
        }
      ],
      "missions": [
        "Autocide"
      ],
      "beliefs": "High ground wins every sniper duel.",
      "ideals": "Executing European bank heist.",
      "recurringViewpoints": "\"Scanning target zone.\"",
      "memorableQuotes": [
        "\"Target acquired!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 75,
        "combatSkills": 80,
        "drivingSkills": 85,
        "shootingSkills": 88,
        "physicalStrength": 75,
        "businessSkills": 55,
        "charisma": 50,
        "loyalty": 70,
        "influenceReputation": 65
      },
      "specialAppearances": []
    }
  },
  {
    "id": "mike-griffin",
    "name": "Mike Griffin",
    "nickname": "Mike",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/mike griffin.png",
    "profile": {
      "fullName": "Mike Griffin",
      "nicknames": [
        "Mike"
      ],
      "gender": "Male",
      "age": "37 (1986)",
      "nationality": "American",
      "occupation": "Autocide Mercenary / Billboard Worker Front",
      "affiliations": [
        "Autocide Syndicate"
      ],
      "status": "Died",
      "firstAppearance": "Autocide",
      "lastAppearance": "Autocide",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Charlie Dilson"
      ],
      "allies": [
        "Dick Tanner"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Washington Beach Construction Site",
      "businessesOwned": [
        "Scaffolding Front"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "Construction hard hat, tool belt, denim shirt",
      "distinctiveFeatures": "Working on billboard scaffolding overlooking Washington Beach",
      "leadership": "Lookout operative.",
      "intelligence": "Counter-surveillance observer.",
      "ambition": "Collect heist payout.",
      "loyalty": "Syndicate member.",
      "temperament": "Methodical.",
      "behavior": "Posed as a billboard maintenance worker while scoping targets.",
      "strengths": [
        "Elevated vantage point sniper cover"
      ],
      "weaknesses": [
        "Trapped on scaffolding"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Target",
          "details": "Sniped off billboard scaffolding by Tommy."
        }
      ],
      "missions": [
        "Autocide"
      ],
      "beliefs": "Nobody looks up at billboard workers.",
      "ideals": "Flawless covert observation.",
      "recurringViewpoints": "\"Everything clear from up here.\"",
      "memorableQuotes": [
        "\"Hey! Who's pointing a rifle up here?!\""
      ],
      "statistics": {
        "leadership": 55,
        "intelligence": 72,
        "combatSkills": 78,
        "drivingSkills": 60,
        "shootingSkills": 84,
        "physicalStrength": 70,
        "businessSkills": 50,
        "charisma": 45,
        "loyalty": 70,
        "influenceReputation": 62
      },
      "specialAppearances": []
    }
  },
  {
    "id": "marcus-hammond",
    "name": "Marcus Hammond",
    "nickname": "Marcus",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/marcus.png",
    "profile": {
      "fullName": "Marcus Hammond",
      "nicknames": [
        "Marcus"
      ],
      "gender": "Male",
      "age": "38 (1986)",
      "nationality": "British",
      "occupation": "Autocide Syndicate Mercenary",
      "affiliations": [
        "Autocide Syndicate"
      ],
      "status": "Died",
      "firstAppearance": "Autocide",
      "lastAppearance": "Autocide",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Nick Kong",
        "Franco Carter"
      ],
      "allies": [
        "Autocide Team"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Vice Point Hotel",
      "businessesOwned": [
        "Security Firm"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "195 lbs (88 kg)",
      "clothing": "Casual polo, sunglasses, driving a Securicar van",
      "distinctiveFeatures": "Seated inside armored Securicar van",
      "leadership": "Armored transport commander.",
      "intelligence": "Armored vehicle combat expert.",
      "ambition": "Transport stolen bank funds.",
      "loyalty": "Syndicate loyalist.",
      "temperament": "Aggressive driver.",
      "behavior": "Attempted to ram Tommy using the Securicar.",
      "strengths": [
        "Heavy vehicle ramming"
      ],
      "weaknesses": [
        "Vulnerable to drive-by machine gun fire"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Enemy",
          "details": "Shot dead inside Securicar by Tommy."
        }
      ],
      "missions": [
        "Autocide"
      ],
      "beliefs": "Armored plating stops all small arms fire.",
      "ideals": "Safely moving syndicate cash.",
      "recurringViewpoints": "\"Ram them off the road!\"",
      "memorableQuotes": [
        "\"He's shooting through the windshield!\""
      ],
      "statistics": {
        "leadership": 65,
        "intelligence": 74,
        "combatSkills": 80,
        "drivingSkills": 85,
        "shootingSkills": 75,
        "physicalStrength": 82,
        "businessSkills": 55,
        "charisma": 50,
        "loyalty": 75,
        "influenceReputation": 64
      },
      "specialAppearances": []
    }
  },
  {
    "id": "nick-kong",
    "name": "Nick Kong",
    "nickname": "Nick",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/nick.png",
    "profile": {
      "fullName": "Nick Kong",
      "nicknames": [
        "Nick"
      ],
      "gender": "Male",
      "age": "36 (1986)",
      "nationality": "American",
      "occupation": "Autocide Syndicate Mercenary",
      "affiliations": [
        "Autocide Syndicate"
      ],
      "status": "Died",
      "firstAppearance": "Autocide",
      "lastAppearance": "Autocide",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Marcus Hammond"
      ],
      "allies": [
        "Autocide Team"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Washington Beach Hotel",
      "businessesOwned": [
        "None"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "185 lbs (84 kg)",
      "clothing": "Hawaii shirt, sunglasses, passenger seat in Securicar",
      "distinctiveFeatures": "Firing submachine gun out van window",
      "leadership": "Passenger gunman.",
      "intelligence": "Drive-by tactical specialist.",
      "ambition": "Eliminate rivals.",
      "loyalty": "High.",
      "temperament": "Trigger-happy.",
      "behavior": "Launches heavy gunfire from passenger door.",
      "strengths": [
        "Drive-by accuracy"
      ],
      "weaknesses": [
        "Vehicle explosion vulnerability"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Target",
          "details": "Killed alongside Marcus Hammond in Autocide."
        }
      ],
      "missions": [
        "Autocide"
      ],
      "beliefs": "Keep firing until the mag is empty.",
      "ideals": "Suppressing enemy pursuers.",
      "recurringViewpoints": "\"Keep shooting at his tires!\"",
      "memorableQuotes": [
        "\"He's right on our tail!\""
      ],
      "statistics": {
        "leadership": 50,
        "intelligence": 68,
        "combatSkills": 78,
        "drivingSkills": 65,
        "shootingSkills": 82,
        "physicalStrength": 75,
        "businessSkills": 45,
        "charisma": 45,
        "loyalty": 70,
        "influenceReputation": 60
      },
      "specialAppearances": []
    }
  },
  {
    "id": "carl-pearson",
    "name": "Carl Pearson",
    "nickname": "Carl the Driver",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/carl pearson.png",
    "profile": {
      "fullName": "Carl Pearson",
      "nicknames": [
        "Carl"
      ],
      "gender": "Male",
      "age": "34 (1986)",
      "nationality": "American",
      "occupation": "Payphone Target / Spand Express Delivery Driver",
      "affiliations": [
        "Spand Express Delivery"
      ],
      "status": "Died",
      "firstAppearance": "Waste The Wife",
      "lastAppearance": "Waste The Wife",
      "family": [
        "Mrs. Dawson (Target Client)"
      ],
      "friends": [
        "Delivery Drivers"
      ],
      "allies": [
        "Spand Express"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Little Haiti",
      "businessesOwned": [
        "Spand Express Van"
      ],
      "height": "5 ft 10 in (178 cm)",
      "weight": "175 lbs (79 kg)",
      "clothing": "Spand Express uniform, baseball cap",
      "distinctiveFeatures": "Driving heavy Spand Express box van",
      "leadership": "Delivery driver.",
      "intelligence": "Basic route driver.",
      "ambition": "Complete delivery routes.",
      "loyalty": "Low.",
      "temperament": "Careful driver.",
      "behavior": "Attempted to ram Tommy's car when attacked.",
      "strengths": [
        "Heavy van ramming"
      ],
      "weaknesses": [
        "Slow vehicle acceleration"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Executioner",
          "details": "Tommy rammed his van until it caught fire without using guns per contract."
        }
      ],
      "missions": [
        "Waste The Wife"
      ],
      "beliefs": "Spand Express delivers on time.",
      "ideals": "Finishing the shift.",
      "recurringViewpoints": "\"Get your car out of my lane!\"",
      "memorableQuotes": [
        "\"What are you ramming my van for?!\""
      ],
      "statistics": {
        "leadership": 35,
        "intelligence": 60,
        "combatSkills": 50,
        "drivingSkills": 75,
        "shootingSkills": 30,
        "physicalStrength": 65,
        "businessSkills": 40,
        "charisma": 40,
        "loyalty": 60,
        "influenceReputation": 45
      },
      "specialAppearances": []
    }
  },
  {
    "id": "dick-tanner",
    "name": "Dick Tanner",
    "nickname": "Dick Tanner",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/dick tanner.jpeg",
    "profile": {
      "fullName": "Dick Tanner",
      "nicknames": [
        "Tanner"
      ],
      "gender": "Male",
      "age": "35 (1986)",
      "nationality": "American",
      "occupation": "Autocide Mercenary / Undercover Operative (Driver spoof)",
      "affiliations": [
        "Autocide Syndicate"
      ],
      "status": "Died",
      "firstAppearance": "Autocide",
      "lastAppearance": "Autocide",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Charlie Dilson"
      ],
      "allies": [
        "Autocide Team"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Little Haiti Securicar Garage",
      "businessesOwned": [
        "Security Contracting"
      ],
      "height": "6 ft 0 in (183 cm)",
      "weight": "180 lbs (81 kg)",
      "clothing": "Blue shirt, jeans, running shoes",
      "distinctiveFeatures": "Walks with a funny awkward gait (parody of Driver game protagonist Tanner)",
      "leadership": "Undercover driver.",
      "intelligence": "High driving skill.",
      "ambition": "Outdrive Tommy Vercetti.",
      "loyalty": "Syndicate loyalist.",
      "temperament": "Cocky, competitive.",
      "behavior": "Drives aggressively to avoid Tommy's sniper rifle.",
      "strengths": [
        "Precision driving",
        "Agile evasive maneuvers"
      ],
      "weaknesses": [
        "Awkward on-foot animation, easily killed"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Rival Target",
          "details": "Tommy eliminated Tanner near the Securicar office in Autocide."
        }
      ],
      "missions": [
        "Autocide"
      ],
      "beliefs": "I am the ultimate undercover driver.",
      "ideals": "Outrunning all mafia hitmen.",
      "recurringViewpoints": "\"You can't outdrive Tanner!\"",
      "memorableQuotes": [
        "\"Check out my driving maneuvers!\""
      ],
      "statistics": {
        "leadership": 50,
        "intelligence": 70,
        "combatSkills": 75,
        "drivingSkills": 95,
        "shootingSkills": 70,
        "physicalStrength": 70,
        "businessSkills": 45,
        "charisma": 55,
        "loyalty": 70,
        "influenceReputation": 65
      },
      "specialAppearances": []
    }
  },
  {
    "id": "franco-carter",
    "name": "Franco Carter",
    "nickname": "Franco",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/franco carter.jpeg",
    "profile": {
      "fullName": "Franco Carter",
      "nicknames": [
        "Franco"
      ],
      "gender": "Male",
      "age": "39 (1986)",
      "nationality": "American",
      "occupation": "Autocide Syndicate Hitman",
      "affiliations": [
        "Autocide Syndicate"
      ],
      "status": "Died",
      "firstAppearance": "Autocide",
      "lastAppearance": "Autocide",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Marcus Hammond"
      ],
      "allies": [
        "Autocide Squad"
      ],
      "enemies": [
        "Tommy Vercetti"
      ],
      "residence": "Starfish Island Access Bridge",
      "businessesOwned": [
        "Mercenary Contractor"
      ],
      "height": "6 ft 1 in (185 cm)",
      "weight": "190 lbs (86 kg)",
      "clothing": "Suit jacket, dark pants, assault rifle holster",
      "distinctiveFeatures": "Guarding Bobcat pickup truck",
      "leadership": "Senior mercenary operator.",
      "intelligence": "Ambush strategist.",
      "ambition": "Secure European syndicate contract money.",
      "loyalty": "Syndicate member.",
      "temperament": "Ruthless, efficient.",
      "behavior": "Waited in Bobcat pickup truck with shotgun drawn.",
      "strengths": [
        "Shotgun combat",
        "Vehicle ambush"
      ],
      "weaknesses": [
        "Sniped before entering vehicle"
      ],
      "relationships": [
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Executioner Target",
          "details": "Sniped by Tommy during Autocide mission."
        }
      ],
      "missions": [
        "Autocide"
      ],
      "beliefs": "Close range shotguns solve all arguments.",
      "ideals": "Executing high value hit targets.",
      "recurringViewpoints": "\"Hold your fire until he gets close!\"",
      "memorableQuotes": [
        "\"He's here! Open fire!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 72,
        "combatSkills": 82,
        "drivingSkills": 75,
        "shootingSkills": 85,
        "physicalStrength": 78,
        "businessSkills": 50,
        "charisma": 48,
        "loyalty": 70,
        "influenceReputation": 63
      },
      "specialAppearances": []
    }
  },
  {
    "id": "mrs-dawson",
    "name": "Mrs. Dawson",
    "nickname": "The Jealous Wife Target",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/mrs dawson.png",
    "profile": {
      "fullName": "Mrs. Dawson",
      "nicknames": [
        "Mrs. Dawson"
      ],
      "gender": "Female",
      "age": "42 (1986)",
      "nationality": "American",
      "occupation": "Wealthy Socialite / Target of Husband's Hit",
      "affiliations": [
        "Vice City High Society"
      ],
      "status": "Died",
      "firstAppearance": "Waste The Wife",
      "lastAppearance": "Waste The Wife",
      "family": [
        "Mr. Dawson (Husband who ordered hit)"
      ],
      "friends": [
        "Jewelry Store Owners"
      ],
      "allies": [
        "High Society Club Members"
      ],
      "enemies": [
        "Mr. Dawson",
        "Tommy Vercetti"
      ],
      "residence": "Starfish Island Villa",
      "businessesOwned": [
        "Inherited Real Estate"
      ],
      "height": "5 ft 7 in (170 cm)",
      "weight": "135 lbs (61 kg)",
      "clothing": "Designer dress, pearl necklace, driving a Comet sports car",
      "distinctiveFeatures": "Driving a silver Comet sports car out of Vice Point jewelry store",
      "leadership": "High society figure.",
      "intelligence": "Unaware of her husband's deadly plot.",
      "ambition": "Divorce her husband and take half his fortune.",
      "loyalty": "Low.",
      "temperament": "Arrogant, wealthy.",
      "behavior": "Drove her Comet sports car home after shopping.",
      "strengths": [
        "High speed sports car"
      ],
      "weaknesses": [
        "Car crashed and burned under Tommy's persistent ramming"
      ],
      "relationships": [
        {
          "targetName": "Mr. Dawson",
          "relationshipType": "Husband & Hit Paymaster",
          "details": "Her husband hired Tommy via payphone to make her death look like a car accident."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Assassin",
          "details": "Tommy rammed her Comet off the road until it exploded."
        }
      ],
      "missions": [
        "Waste The Wife"
      ],
      "beliefs": "My husband is a fool and my divorce lawyer will take all his money.",
      "ideals": "Shopping at expensive Vice Point boutiques.",
      "recurringViewpoints": "\"Watch the paint job on my Comet!\"",
      "memorableQuotes": [
        "\"Stop bumping into my sports car, you lunatic!\""
      ],
      "statistics": {
        "leadership": 40,
        "intelligence": 65,
        "combatSkills": 15,
        "drivingSkills": 78,
        "shootingSkills": 10,
        "physicalStrength": 35,
        "businessSkills": 60,
        "charisma": 75,
        "loyalty": 40,
        "influenceReputation": 70
      },
      "specialAppearances": []
    }
  },
  {
    "id": "candys-agent",
    "name": "Candy's Agent",
    "nickname": "The Pimp Agent",
    "roleCategory": "Minor",
    "game": "GTA Vice City",
    "imageUrl": "/images/characters/candy agent.png",
    "profile": {
      "fullName": "Candy's Agent",
      "nicknames": [
        "The Pimp Agent"
      ],
      "gender": "Male",
      "age": "40 (1986)",
      "nationality": "American",
      "occupation": "Abusive Talent Agent / Street Pimp",
      "affiliations": [
        "Downtown Vice City Pimping Ring"
      ],
      "status": "Died",
      "firstAppearance": "Recruitment Drive",
      "lastAppearance": "Recruitment Drive",
      "family": [
        "Unknown"
      ],
      "friends": [
        "Bodyguards"
      ],
      "allies": [
        "Downtown Goons"
      ],
      "enemies": [
        "Tommy Vercetti",
        "Candy Suxxx"
      ],
      "residence": "Downtown Vice City Apartment",
      "businessesOwned": [
        "Street Escort Agency"
      ],
      "height": "5 ft 11 in (180 cm)",
      "weight": "190 lbs (86 kg)",
      "clothing": "Purple pimp suit, leopard fur collar, gold chains, cane",
      "distinctiveFeatures": "Flashy purple suit, loud abusive screaming",
      "leadership": "Abusive street boss.",
      "intelligence": "Exploitative talent management tactics.",
      "ambition": "Monopolize Downtown escort and talent contracts.",
      "loyalty": "Zero.",
      "temperament": "Violent, aggressive, abusive.",
      "behavior": "Threatened Candy Suxxx with violence when she tried to leave with Tommy.",
      "strengths": [
        "Intimidation tactics",
        "Armed bodyguard escorts"
      ],
      "weaknesses": [
        "Chased down and gunned down by Tommy Vercetti"
      ],
      "relationships": [
        {
          "targetName": "Candy Suxxx",
          "relationshipType": "Abused Talent",
          "details": "Tried to force Candy to stay under his abusive contract."
        },
        {
          "targetName": "Tommy Vercetti",
          "relationshipType": "Executioner",
          "details": "Tommy gunned down the agent and his bodyguards in Downtown Vice City."
        }
      ],
      "missions": [
        "Recruitment Drive"
      ],
      "beliefs": "Nobody breaks a contract with me and lives.",
      "ideals": "Extorting maximum percentage from adult talent.",
      "recurringViewpoints": "\"You ain't going nowhere, Candy!\"",
      "memorableQuotes": [
        "\"Candy belongs to me! Get outta here before my boys blow you away!\"",
        "\"Shoot him down!\""
      ],
      "statistics": {
        "leadership": 60,
        "intelligence": 65,
        "combatSkills": 70,
        "drivingSkills": 68,
        "shootingSkills": 72,
        "physicalStrength": 75,
        "businessSkills": 60,
        "charisma": 50,
        "loyalty": 20,
        "influenceReputation": 60
      },
      "specialAppearances": []
    }
  }
];
