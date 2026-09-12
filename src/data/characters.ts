// Grand Theft Auto VI (State of Leonida) Comprehensive Character Database & Lore Vault
// 100% Pure GTA 6 Cast with authentic attributes, radar metrics, relationships, quotes, and lore

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
  game: 'GTA 6'
  imageUrl: string
  profile: CharacterProfile
}

export const CHARACTERS: Character[] = [
  {
    id: "lucia-caminos",
    name: "Lucia Caminos",
    nickname: "The Wildcard",
    roleCategory: "Protagonist",
    game: "GTA 6",
    imageUrl: "/images/characters/lucia.jpg",
    profile: {
      fullName: "Lucia Caminos",
      nicknames: ["Lucia", "Lucy", "The Wildcard"],
      gender: "Female",
      age: "Late 20s",
      nationality: "Latina-American",
      occupation: "Armed Robber, Contraband Runner, Outlaw",
      affiliations: ["Jason & Lucia Crew", "Leonida Underworld"],
      status: "Alive (Parolee)",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      voiceActor: "Manni L. Perez (Rumored/Reported)",
      family: ["Estranged Family in Vice-Dale"],
      friends: ["Jason Duval", "Stefanie (Parole Counselor)"],
      allies: ["Jason Duval", "Cal Hampton", "Brian Heder"],
      enemies: ["Leonida Department of Corrections", "VCPD SWAT", "San Chian Cartel"],
      residence: "Vice-Dale Motel Safehouse / Mobile RV",
      businessesOwned: ["Underground Safehouses", "Pawn Fences"],
      height: "5'7\" (170 cm)",
      weight: "135 lbs (61 kg)",
      clothing: "Pink halter crop top, distressed denim, bandana face wrap, electronic parole ankle monitor",
      distinctiveFeatures: "Right ankle GPS monitoring bracelet, confident piercing gaze, forearm tattoos",
      leadership: "Natural tactician with fierce survival instincts under heavy fire",
      intelligence: "Sharp street intellect, keen observational awareness of law enforcement patrol routes",
      ambition: "Seeking total financial independence and freedom from the correctional system",
      loyalty: "Unconditional ride-or-die loyalty to Jason",
      temperament: "Calculated yet explosive when cornered or betrayed",
      behavior: "Methodical during reconnaissance; lethal and daring during armed entries",
      strengths: ["CQC Combat", "Armed Robberies", "High-Stress Tactical Decision Making", "Lockpicking"],
      weaknesses: ["Parole Geofencing Restrictions", "Impulsive Thrill-Seeking", "Target of Police APB"],
      relationships: [
        {
          targetName: "Jason Duval",
          relationshipType: "Romantic & Criminal Partner",
          details: "Deep, passionate bond of trust and survival. The modern Bonnie-and-Clyde partnership navigating the underworld of Leonida."
        },
        {
          targetName: "Stefanie",
          relationshipType: "Parole Counselor",
          details: "Supervising officer at Leonida Correctional Facility. Lucia feigns rehabilitation while orchestrating scores."
        }
      ],
      missions: [
        "Leonida Correctional Facility Intake",
        "Highway Store Convenience Robbery",
        "Vice Beach Marina Extraction",
        "Everglades Airboat Evacuation"
      ],
      beliefs: "Trust is the only currency that doesn't depreciate when the sirens start wailing.",
      ideals: "Complete autonomy, shared survival, unconditional partnership.",
      recurringViewpoints: "The only way we're gonna get through this is by sticking together, being a team.",
      memorableQuotes: [
        "The only way we're gonna get through this is by sticking together, being a team.",
        "Trust? Trust is everything.",
        "Bad luck, I guess."
      ],
      statistics: {
        leadership: 90,
        intelligence: 92,
        combatSkills: 88,
        drivingSkills: 85,
        shootingSkills: 91,
        physicalStrength: 82,
        businessSkills: 78,
        charisma: 94,
        loyalty: 98,
        influenceReputation: 86
      }
    }
  },
  {
    id: "jason-duval",
    name: "Jason Duval",
    nickname: "The Wheelman",
    roleCategory: "Protagonist",
    game: "GTA 6",
    imageUrl: "/images/characters/jason.jpg",
    profile: {
      fullName: "Jason Duval",
      nicknames: ["Jason", "Jay", "The Wheelman"],
      gender: "Male",
      age: "Early 30s",
      nationality: "American",
      occupation: "Ex-Military Wheelman, Armorer, Tactical Getaway Driver",
      affiliations: ["Jason & Lucia Crew", "Leonida Smugglers"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      voiceActor: "Gregory Connors (Rumored/Reported)",
      family: ["Military Veteran Background"],
      friends: ["Lucia Caminos"],
      allies: ["Lucia Caminos", "Cal Hampton", "Brian Heder"],
      enemies: ["VCPD Tactical Division", "San Chian Cartel", "Bounty Hunters"],
      residence: "Vice-Dale Motel Safehouse / Rural Workshop",
      businessesOwned: ["Vehicle Modification Garage", "Armory Lockers"],
      height: "6'1\" (185 cm)",
      weight: "185 lbs (84 kg)",
      clothing: "White tank top, backwards trucker cap, tactical cargo shorts, weapon sling holster",
      distinctiveFeatures: "Athletic combat-hardened build, light stubble, sharp tactical eye",
      leadership: "Calm battlefield commander who keeps Lucia grounded in chaotic firefights",
      intelligence: "Mastery of mechanical engineering, firearms ballistics, and tactical egress routes",
      ambition: "Securing enough wealth to leave the criminal lifestyle behind permanently",
      loyalty: "Fiercely protective of Lucia; willing to sacrifice everything for her safety",
      temperament: "Stoic, measured, quiet professional with sudden explosive lethality",
      behavior: "Constantly checking mirrors, scanning perimeter sightlines, and inspecting vehicle engines",
      strengths: ["Precision High-Speed Driving", "Heavy Firearm Mastery", "Vehicle Hotwiring & Tuning", "Cover Tactics"],
      weaknesses: ["Emotional Vulnerability Regarding Lucia", "Reluctant to Trust Outside Syndicates"],
      relationships: [
        {
          targetName: "Lucia Caminos",
          relationshipType: "Romantic Partner & Co-Conspirator",
          details: "Shared criminal destiny. Jason acts as the tactical anchor and getaway specialist to Lucia's aggressive momentum."
        },
        {
          targetName: "Cal Hampton",
          relationshipType: "Rural Associate",
          details: "Connects Jason with off-grid vehicles, sawgrass routes, and unlicensed ammunition stockpiles."
        }
      ],
      missions: [
        "Highway Store Robbery Egress",
        "Port Gellhorn Container Heist",
        "Ocean Beach Expressway Pursuit",
        "Sawgrass Airboat Ambush"
      ],
      beliefs: "A clean getaway is planned three miles before the first shot is ever fired.",
      ideals: "Protection, honor among partners, professional execution.",
      recurringViewpoints: "Keep your head down and stay on my six.",
      memorableQuotes: [
        "Trust. (In response to Lucia)",
        "We move on my count. Keep your head down and stay on my six.",
        "Cruisers inbound from the north causeway — hold on!"
      ],
      statistics: {
        leadership: 88,
        intelligence: 89,
        combatSkills: 94,
        drivingSkills: 96,
        shootingSkills: 93,
        physicalStrength: 90,
        businessSkills: 75,
        charisma: 84,
        loyalty: 96,
        influenceReputation: 84
      }
    }
  },
  {
    id: "stefanie",
    name: "Stefanie",
    nickname: "The Counselor",
    roleCategory: "Supporting",
    game: "GTA 6",
    imageUrl: "/images/characters/stefanie.jpg",
    profile: {
      fullName: "Stefanie",
      nicknames: ["Counselor Stefanie", "The Case Officer"],
      gender: "Female",
      age: "Late 30s",
      nationality: "American",
      occupation: "State Correctional Counselor & Parole Supervisor",
      affiliations: ["Leonida Department of Corrections", "State Parole Board"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Unknown"],
      friends: ["Colleagues at Leonida Corrections"],
      allies: ["State Rehabilitation Bureau"],
      enemies: ["Recidivist Criminal Syndicates"],
      residence: "Vice-Dale County Suburbs",
      businessesOwned: [],
      height: "5'6\" (168 cm)",
      weight: "140 lbs (63 kg)",
      clothing: "Bureaucratic office blazer, ID lanyard, reading glasses, correctional clipboard",
      distinctiveFeatures: "Pragmatic, cynical gaze of a veteran correctional administrator who has heard every excuse",
      leadership: "Authoritative administrative control over inmate evaluations and release recommendations",
      intelligence: "High forensic and psychological evaluation capability; detects deception quickly",
      ambition: "Maintaining order within an overburdened penal system while managing high caseloads",
      loyalty: "Dedicated to department regulations and legal compliance",
      temperament: "Even-tempered, skeptical, direct, patient but unyielding",
      behavior: "Carefully cross-examining inmate testimonies during mandatory parole check-ins",
      strengths: ["Psychological Profiling", "Legal Bureaucracy", "Parole Monitoring Protocols"],
      weaknesses: ["Underestimates Lucia's Underlying Resolve and Outside Network"],
      relationships: [
        {
          targetName: "Lucia Caminos",
          relationshipType: "Parolee & Inmate Assessment",
          details: "Conducts mandatory intake and exit reviews for Lucia at Leonida Correctional Facility, asking the famous opening question: 'Lucia, do you know why you're here?'"
        }
      ],
      missions: [
        "Leonida Correctional Facility Intake Hearing",
        "Mandatory Ankle Monitor Diagnostic Check",
        "Bi-Weekly Parole Review Inspection"
      ],
      beliefs: "Everyone claims bad luck, but choices are what land you behind barbed wire.",
      ideals: "Institutional justice, behavioral reform, public safety.",
      recurringViewpoints: "Do you understand the conditions of your release, Lucia?",
      memorableQuotes: [
        "Lucia, do you know why you're here?",
        "Bad luck? That's what they all say until the verdict comes back.",
        "If you violate perimeter restrictions, that bracelet alerts dispatch before you clear the driveway."
      ],
      statistics: {
        leadership: 82,
        intelligence: 91,
        combatSkills: 40,
        drivingSkills: 60,
        shootingSkills: 55,
        physicalStrength: 58,
        businessSkills: 72,
        charisma: 76,
        loyalty: 88,
        influenceReputation: 85
      }
    }
  },
  {
    id: "cal-hampton",
    name: "Cal Hampton",
    nickname: "Gator Cal",
    roleCategory: "Supporting",
    game: "GTA 6",
    imageUrl: "/images/characters/cal-hampton.jpg",
    profile: {
      fullName: "Calvin 'Cal' Hampton",
      nicknames: ["Gator Cal", "Mud Dog", "The Swamp Tinkerer"],
      gender: "Male",
      age: "Early 40s",
      nationality: "American (Leonida Native)",
      occupation: "Thrillbilly Mud Club Host, Airboat Fabricator, Gator Wrangler",
      affiliations: ["Thrillbilly Mud Club", "Kelly County Off-Road Collective"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Generations of Leonida Backcountry Folk"],
      friends: ["Jason Duval", "Mud Club Crew"],
      allies: ["Jason Duval", "Lucia Caminos", "Brian Heder"],
      enemies: ["Leonida Wildlife Wardens", "Suburban Developers"],
      residence: "Kelly County Mudfest Ranch & Sawgrass Compound",
      businessesOwned: ["Custom Airboat Workshop", "Mud Bog Arena"],
      height: "5'10\" (178 cm)",
      weight: "205 lbs (93 kg)",
      clothing: "Sleeveless camo tee, mud-splattered denim overalls, trucker cap, alligator tooth pendant",
      distinctiveFeatures: "Sunburned skin, bushy beard, scarred forearms from alligator captures",
      leadership: "Rallies hundreds of muddy spectators and off-road racers with roaring enthusiasm",
      intelligence: "Encyclopedic knowledge of sawgrass navigation, animal tracks, and V8 engine torque",
      ambition: "Preserving the raw, untamed backcountry culture of Leonida against corporate expansion",
      loyalty: "Solid as bedrock to fellow backcountry outlaws and friends who respect the swamp",
      temperament: "Boisterous, high-energy, wild, fearless around predatory wildlife",
      behavior: "Loves revving massive big-block engines, cooking swamp cookouts, and handling live reptiles",
      strengths: ["Airboat Piloting", "Heavy Off-Road Driving", "Wildlife Handling", "Swamp Evasion"],
      weaknesses: ["Disregards Law Enforcement Warnings", "Excessive Beer Consumption During Mud Fests"],
      relationships: [
        {
          targetName: "Jason Duval",
          relationshipType: "Trusted Associate & Gear Supplier",
          details: "Provides Jason with modified all-terrain trucks, hidden sawgrass fuel depots, and evasion routes through sawgrass channels."
        }
      ],
      missions: [
        "Thrillbilly Mudfest 4x4 Showdown",
        "Airboat Extraction in Sawgrass",
        "Alligator Pond Defense",
        "Kelly County Fuel Depot Run"
      ],
      beliefs: "If it can't be fixed with a torque wrench or an airboat prop, it ain't worth having.",
      ideals: "Wild freedom, swamp brotherhood, unbridled horsepower.",
      recurringViewpoints: "City folks don't last five minutes out here when the sun dips down.",
      memorableQuotes: [
        "Welcome to the Mud Club, boys! If your axles ain't bent, you ain't trying!",
        "Watch that channel over yonder — twelve-foot bull gator claimed that bank this morning.",
        "Cruisers can't follow you through forty miles of sawgrass slurry. Floor it!"
      ],
      statistics: {
        leadership: 84,
        intelligence: 76,
        combatSkills: 86,
        drivingSkills: 94,
        shootingSkills: 82,
        physicalStrength: 92,
        businessSkills: 68,
        charisma: 88,
        loyalty: 94,
        influenceReputation: 82
      }
    }
  },
  {
    id: "brian-heder",
    name: "Brian Heder",
    nickname: "Dockside Brian",
    roleCategory: "Major",
    game: "GTA 6",
    imageUrl: "/images/characters/brian-heder.jpg",
    profile: {
      fullName: "Brian Heder",
      nicknames: ["Dockside Brian", "The Quartermaster", "Port King"],
      gender: "Male",
      age: "Late 40s",
      nationality: "American",
      occupation: "Port Gellhorn Container Terminal Foreman & Contraband Smuggler",
      affiliations: ["Port Gellhorn Dockworkers Union", "Offshore Freight Syndicates"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Extended Port Family"],
      friends: ["Docks Crane Operators", "Warehouse Night Guards"],
      allies: ["Jason & Lucia", "Keys Boat Captains"],
      enemies: ["Federal Port Authority", "San Chian Cartel"],
      residence: "Port Gellhorn Industrial Waterfront Loft",
      businessesOwned: ["Freight Container Fencing Yard", "Dockside Crane Depot"],
      height: "6'0\" (183 cm)",
      weight: "215 lbs (97 kg)",
      clothing: "Hi-vis safety vest over flannel work shirt, steel-toe boots, maritime dock cap",
      distinctiveFeatures: "Grizzled beard, calloused dockworker hands, maritime anchor tattoo on neck",
      leadership: "Respected union figure who controls the logistics of thousands of shipping containers daily",
      intelligence: "Mastery of manifest tracking, customs bypass loopholes, and contraband shipping routes",
      ambition: "Controlling all black-market incoming freight across western Leonida",
      loyalty: "Protects his working crews fiercely; businesslike and strict with outside syndicates",
      temperament: "Gritty, practical, cynical of federal promises, tough under pressure",
      behavior: "Directs container crane lifts while simultaneously falsifying shipping manifests",
      strengths: ["Freight Logistics", "Heavy Machinery Operation", "Black Market Fencing", "Port Security Bypass"],
      weaknesses: ["Vulnerable to Federal Port Investigations", "Stubborn Union Loyalty"],
      relationships: [
        {
          targetName: "Lucia Caminos",
          relationshipType: "Contraband Broker",
          details: "Brokers high-value cargo thefts and supplies shipping manifests for Jason and Lucia's larger scores."
        }
      ],
      missions: [
        "Port Gellhorn Container Heist",
        "Customs Manifest Override",
        "Offshore Freight Night Loading",
        "Dockside Warehouse Shootout"
      ],
      beliefs: "If you want something to disappear off the face of the earth, put it inside an unmarked forty-foot container.",
      ideals: "Working class solidarity, logistical perfection, quiet prosperity.",
      recurringViewpoints: "Customs inspects five percent of incoming freight. The other ninety-five belongs to us.",
      memorableQuotes: [
        "Container forty-eight on the east pier. If you're not out by midnight, the crane moves it to a cargo ship heading for Nassau.",
        "Keep the heat off my cranes, or this entire port locks down.",
        "Money talks, but a clean bill of lading screams."
      ],
      statistics: {
        leadership: 89,
        intelligence: 87,
        combatSkills: 80,
        drivingSkills: 81,
        shootingSkills: 84,
        physicalStrength: 89,
        businessSkills: 91,
        charisma: 80,
        loyalty: 88,
        influenceReputation: 90
      }
    }
  },
  {
    id: "san-chian-cartel-boss",
    name: "San Chian Cartel Kingpin",
    nickname: "El Tiburón de Leonida",
    roleCategory: "Antagonist",
    game: "GTA 6",
    imageUrl: "/images/characters/cartel_boss.jpg",
    profile: {
      fullName: "San Chian Syndicate Leader",
      nicknames: ["El Tiburón", "The Admiral", "Don Santiago"],
      gender: "Male",
      age: "Early 50s",
      nationality: "Colombian-Leonidan",
      occupation: "International Drug Trafficker, Superyacht Owner, Money Launderer",
      affiliations: ["San Chian Cartel", "Offshore Marine Shipping Fronts"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Dynastic Crime Family"],
      friends: ["Corrupt Port Officials", "International Bankers"],
      allies: ["Offshore Cartel Enforcers", "Private Military Contractors"],
      enemies: ["Jason & Lucia Crew", "DEA Tactical Units", "VCPD Organized Crime"],
      residence: "250-Foot Superyacht anchored offshore & Starfish Island Compound",
      businessesOwned: ["Offshore Banking Shells", "Luxury Yacht Charters", "Nightclub Franchises"],
      height: "5'11\" (180 cm)",
      weight: "175 lbs (79 kg)",
      clothing: "Tailored white linen suit, luxury gold chronograph, aviator sunglasses, silk open-collar shirt",
      distinctiveFeatures: "Impeccable grooming, ruthless cold stare, subtle dueling scar along jawline",
      leadership: "Commands hundreds of armed cartel mercenaries, offshore boat captains, and money couriers",
      intelligence: "Elite international money laundering intellect; anticipates law enforcement sting operations",
      ambition: "Monopolizing all narcotics distribution and luxury real estate laundering across Vice City",
      loyalty: "Demands absolute obedience; executes traitors with zero hesitation",
      temperament: "Deceptively polite, cultured, and soft-spoken until crossed, then merciless",
      behavior: "Conducts multi-million dollar transactions from the sun deck of his armed superyacht",
      strengths: ["Vast Financial Reserves", "Private Armed Security Fleet", "Political Bribery", "Strategic Ruthlessness"],
      weaknesses: ["Arrogance Born of Extreme Wealth", "Vulnerable Offshore Supply Lines"],
      relationships: [
        {
          targetName: "Lucia Caminos",
          relationshipType: "Underworld Adversary",
          details: "Views Jason and Lucia as dangerous upstart thieves after they target his money courier drops across Vice-Dale."
        }
      ],
      missions: [
        "Superyacht Offshore Infiltration",
        "Starfish Island Courier Interception",
        "Port Gellhorn Contraband Hijack",
        "Final Offshore Confrontation"
      ],
      beliefs: "In this city, blood dries fast under the neon sun, but compounding interest is forever.",
      ideals: "Absolute dominion, refined ruthlessness, financial untouchability.",
      recurringViewpoints: "Everyone has a price. Those who don't are merely negotiating their burial plot.",
      memorableQuotes: [
        "You took something that belonged to the San Chian family. That was very brave, and very foolish.",
        "The police only exist to catch amateur criminals. We run the water that surrounds them.",
        "Feed them to the sawgrass sharks."
      ],
      statistics: {
        leadership: 96,
        intelligence: 95,
        combatSkills: 78,
        drivingSkills: 79,
        shootingSkills: 85,
        physicalStrength: 75,
        businessSkills: 98,
        charisma: 92,
        loyalty: 70,
        influenceReputation: 98
      }
    }
  },
  {
    id: "drequan-priest",
    name: "Dre'Quan Priest",
    nickname: "Priest",
    roleCategory: "Major",
    game: "GTA 6",
    imageUrl: "/images/characters/drequan-priest.jpg",
    profile: {
      fullName: "Dre'Quan Priest",
      nicknames: ["Priest", "Big Dre", "Vice City Beats"],
      gender: "Male",
      age: "Early 30s",
      nationality: "American",
      occupation: "Record Label Executive, Nightclub Owner, Street Mogul",
      affiliations: ["Priest Records", "Vice Beach Nightlife Syndicate"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Vice City Roots"],
      friends: ["Boobie Ike", "Top Charting Hip-Hop Artists"],
      allies: ["Jason & Lucia", "Soundtrack DJs"],
      enemies: ["Rival Miami Record Promoters", "Extortion Crews"],
      residence: "Vice Beach Oceanfront Penthouse",
      businessesOwned: ["Priest Recording Studios", "Club Solarium Vice Beach"],
      height: "6'2\" (188 cm)",
      weight: "210 lbs (95 kg)",
      clothing: "Custom designer bomber jacket, iced-out platinum pendant, designer sneakers, tinted shades",
      distinctiveFeatures: "Radiant charismatic smile, heavy diamond chains, distinctive voice",
      leadership: "Inspires artists and controls premier VIP venues across Ocean Drive",
      intelligence: "Sharp media savvy, commercial marketing genius, reads street trends instantly",
      ambition: "Building a global multimedia entertainment empire out of Vice Beach",
      loyalty: "Loyal to true talent and people who deliver on their word",
      temperament: "Smooth, energetic, generous with friends, fiercely protective of his business interests",
      behavior: "Always surrounded by artists, bodyguards, and luxury sports cars outside premier clubs",
      strengths: ["Music Industry Connections", "Money Laundering Through Entertainment", "Charisma", "Negotiation"],
      weaknesses: ["High Public Visibility", "Entourage Security Leaks"],
      relationships: [
        {
          targetName: "Boobie Ike",
          relationshipType: "Socialite & Club Partner",
          details: "Co-hosts high-profile celebrity parties and promotional music releases across Vice Beach clubs."
        },
        {
          targetName: "Jason & Lucia",
          relationshipType: "High-Roller Client",
          details: "Hires the duo for delicate off-the-books security and retrieving stolen master recordings."
        }
      ],
      missions: [
        "Club Solarium VIP Defense",
        "Studio Master Tape Recovery",
        "Ocean Drive Supercar Convoy",
        "Rooftop Afterparty Extraction"
      ],
      beliefs: "The music gets them in the door, but the lifestyle keeps them buying tickets.",
      ideals: "Creative supremacy, street credibility, boundless luxury.",
      recurringViewpoints: "Vice City moves to our rhythm.",
      memorableQuotes: [
        "If it ain't gold-certified before midnight, we ain't working hard enough.",
        "Tell your crew they're VIP tonight. Drinks on Priest.",
        "In this town, fame is a shield — until someone gets a clear shot."
      ],
      statistics: {
        leadership: 91,
        intelligence: 89,
        combatSkills: 75,
        drivingSkills: 83,
        shootingSkills: 76,
        physicalStrength: 80,
        businessSkills: 95,
        charisma: 97,
        loyalty: 84,
        influenceReputation: 93
      }
    }
  },
  {
    id: "boobie-ike",
    name: "Boobie Ike",
    nickname: "The Siren",
    roleCategory: "Supporting",
    game: "GTA 6",
    imageUrl: "/images/characters/boobie-ike.jpg",
    profile: {
      fullName: "Boobie Ike",
      nicknames: ["The Siren", "Vice Beach Queen", "B-Ike"],
      gender: "Female",
      age: "Mid 20s",
      nationality: "American",
      occupation: "Social Media Influencer, Yacht Party Promoter, VIP Host",
      affiliations: ["Leonida Social Feed", "Ocean Drive Club Circuit"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["South Florida Native"],
      friends: ["Dre'Quan Priest", "Bae Luxe"],
      allies: ["Vice Beach DJs", "Luxury Speedboat Owners"],
      enemies: ["Paparazzi Stalkers", "Online Trolls"],
      residence: "Starfish Island Canal Villa",
      businessesOwned: ["Social Media Brand Agency", "VIP Yacht Charters"],
      height: "5'8\" (173 cm)",
      weight: "130 lbs (59 kg)",
      clothing: "Vibrant neon swimsuit, luxury sarong, oversized designer sunglasses, designer tote",
      distinctiveFeatures: "Glamorous beach socialite aesthetic, viral social media presence",
      leadership: "Can summon a hundred high-rollers and luxury sports cars with a single social post",
      intelligence: "Master of algorithmic virality, social manipulation, and trend forecasting",
      ambition: "Becoming the most influential and wealthy digital icon in the state of Leonida",
      loyalty: "Values genuine people who don't just view her as clout currency",
      temperament: "Bubbly, confident, perceptive, secretly very sharp about street politics",
      behavior: "Livestreaming rooftop parties, speedboats on Biscayne bay, and VIP club openings",
      strengths: ["Mass Public Influence", "Extensive Nightlife Network", "Information Gathering"],
      weaknesses: ["Addiction to the Spotlight", "Oversharing Geolocation Data"],
      relationships: [
        {
          targetName: "Dre'Quan Priest",
          relationshipType: "Promotional Partner",
          details: "Directs viral marketing campaigns for Priest Records and hosts launch parties on luxury yachts."
        }
      ],
      missions: [
        "Yacht Party Paparazzi Evasion",
        "Starfish Island Stream Hijack",
        "Ocean Drive Speedboat Rally"
      ],
      beliefs: "If nobody recorded it on high-res video, it never really happened.",
      ideals: "Radiant joy, social dominance, luxury lifestyle.",
      recurringViewpoints: "Welcome to Vice City, baby — where the sun never sets on the party.",
      memorableQuotes: [
        "Drop a like and subscribe, because tonight we're shutting down Ocean Drive!",
        "You can't buy this vibe anywhere else in the world.",
        "Smile for the stream, honey — you're trending in Leonida!"
      ],
      statistics: {
        leadership: 83,
        intelligence: 85,
        combatSkills: 45,
        drivingSkills: 78,
        shootingSkills: 52,
        physicalStrength: 60,
        businessSkills: 88,
        charisma: 98,
        loyalty: 80,
        influenceReputation: 92
      }
    }
  },
  {
    id: "raul-bautista",
    name: "Raul Bautista",
    nickname: "El Mecánico",
    roleCategory: "Supporting",
    game: "GTA 6",
    imageUrl: "/images/characters/raul-bautista.jpg",
    profile: {
      fullName: "Raul Bautista",
      nicknames: ["El Mecánico", "Raul", "Keys Transponder"],
      gender: "Male",
      age: "Early 40s",
      nationality: "Cuban-American",
      occupation: "Speedboat Tuner, Keys Smuggler, Custom Electronics Specialist",
      affiliations: ["Leonida Keys Marine Syndicate", "Vice Beach Tuners"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Little Havana Roots"],
      friends: ["Brian Heder", "Local Marina Mechanics"],
      allies: ["Jason & Lucia", "Offshore Smugglers"],
      enemies: ["Coast Guard Interdiction", "Customs Maritime Task Force"],
      residence: "Hamlet Marina Boathouse, Leonida Keys",
      businessesOwned: ["Bautista Marine Performance", "Offshore Bait & Tackle"],
      height: "5'9\" (175 cm)",
      weight: "180 lbs (82 kg)",
      clothing: "Grease-stained marine polo, deck shorts, polarized sunglasses, utility belt",
      distinctiveFeatures: "Weathered sea-bronzed skin, oil-stained hands, quick reassuring smile",
      leadership: "Directs high-speed boat mechanics and offshore refueling vessels",
      intelligence: "Unmatched knowledge of twin-turbo boat engines, radar jammers, and GPS scramblers",
      ambition: "Building the fastest offshore cigarette boats in the Caribbean corridor",
      loyalty: "Honors personal codes; never snitches to Coast Guard or DEA agents",
      temperament: "Laid-back island mentality on land; razor-sharp focused when engines fire up",
      behavior: "Spends days dyno-tuning high-displacement marine engines and inspecting hulls",
      strengths: ["Marine Mechanics", "High-Speed Boat Navigation", "Electronic Scrambling", "Reef Shortcuts"],
      weaknesses: ["Takes High Financial Risks on Unregistered Engines"],
      relationships: [
        {
          targetName: "Jason Duval",
          relationshipType: "Technical Specialist & Mechanic",
          details: "Upgrades Jason's getaway vehicles with police radar detectors and builds high-speed boats for keys runs."
        }
      ],
      missions: [
        "Keys Speedboat Drag Run",
        "Nighttime Offshore Drops",
        "Coast Guard Radar Evacuation",
        "Hamlet Marina Defense"
      ],
      beliefs: "The ocean doesn't leave tire tracks for the police to follow.",
      ideals: "Maritime excellence, personal honor, brotherhood of mechanics.",
      recurringViewpoints: "Two thousand horsepower on the water will outrun anything with a badge.",
      memorableQuotes: [
        "Listen to that triple-outboard purr. That's eighty knots on open water, my friend.",
        "The Coast Guard has radar, but they don't know the reef channels like I do.",
        "Take the southern mangrove cut — the police cruisers will bottom out every single time."
      ],
      statistics: {
        leadership: 80,
        intelligence: 88,
        combatSkills: 72,
        drivingSkills: 93,
        shootingSkills: 75,
        physicalStrength: 82,
        businessSkills: 83,
        charisma: 86,
        loyalty: 92,
        influenceReputation: 85
      }
    }
  },
  {
    id: "real-dimez",
    name: "Bae Luxe",
    nickname: "Real Dimez",
    roleCategory: "Supporting",
    game: "GTA 6",
    imageUrl: "/images/characters/real-dimez.jpg",
    profile: {
      fullName: "Alexis 'Bae Luxe' Monroe",
      nicknames: ["Real Dimez", "Bae Luxe", "Lexi"],
      gender: "Female",
      age: "Mid 20s",
      nationality: "American",
      occupation: "Fashion Model, Supercar Enthusiast, Nightlife Icon",
      affiliations: ["Vice City Fashion Week", "Ocean Drive Supercar Club"],
      status: "Alive",
      firstAppearance: "GTA VI Trailer 1 (2023)",
      lastAppearance: "GTA VI",
      family: ["Vice City"],
      friends: ["Boobie Ike", "Dre'Quan Priest"],
      allies: ["High-End Showroom Owners", "Celebrity Photographers"],
      enemies: ["Tabloid Blackmailers"],
      residence: "Vice Beach High-Rise Penthouse",
      businessesOwned: ["Luxe Apparel Line", "Exotic Car Rental Boutique"],
      height: "5'9\" (175 cm)",
      weight: "128 lbs (58 kg)",
      clothing: "High-fashion cutout bodysuit, metallic gold accessories, stiletto heels, designer eyewear",
      distinctiveFeatures: "Striking runway model look, viral street racing aesthetic",
      leadership: "Sets the fashion and lifestyle trends for thousands across Leonida",
      intelligence: "Shrewd commercial businesswoman who leverages glamour for major corporate sponsorships",
      ambition: "Establishing an international luxury fashion and supercar empire",
      loyalty: "Loyal to inner circle friends who supported her before global recognition",
      temperament: "Poised, sophisticated, witty, unimpressed by arrogant millionaires",
      behavior: "Cruising down Ocean Drive in exotic convertibles and hosting runway afterparties",
      strengths: ["High-Society Infiltration", "Brand Partnerships", "Supercar Handling"],
      weaknesses: ["Obsession with Aesthetics and Public Status"],
      relationships: [
        {
          targetName: "Boobie Ike",
          relationshipType: "Best Friend & Trendsetter Duo",
          details: "The defining socialite pair of modern Vice Beach nightlife and viral streaming culture."
        }
      ],
      missions: [
        "Fashion Week Penthouse Infiltration",
        "Ocean Drive Supercar Showcase",
        "Runway Show Blackmail Recovery"
      ],
      beliefs: "Style isn't just what you wear; it's how you speed past everyone watching.",
      ideals: "Elegance, self-made wealth, unapologetic glamour.",
      recurringViewpoints: "Vice City was built on neon dreams and expensive tastes.",
      memorableQuotes: [
        "Life looks so much better through the windshield of an Italian exotic.",
        "They want the luxury, but they can't handle the horsepower.",
        "Neon reflects best on twenty-four karat gold, darling."
      ],
      statistics: {
        leadership: 82,
        intelligence: 87,
        combatSkills: 50,
        drivingSkills: 88,
        shootingSkills: 58,
        physicalStrength: 62,
        businessSkills: 91,
        charisma: 99,
        loyalty: 82,
        influenceReputation: 94
      }
    }
  }
];
