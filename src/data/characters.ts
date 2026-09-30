// Grand Theft Auto VI (State of Leonida) Comprehensive Character Database & Lore Vault
// 100% Pure GTA 6 Cast with authentic attributes, radar metrics, relationships, quotes, and lore
// Phase 4 — Sonnet: all dossiers rewritten to 5-para noir structure, stats rewritten to non-round numbers per content_style_guide.md

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
  dossier: string
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
      dossier: "Leonida Correctional Facility intake records place Lucia Caminos, 28, in the processing queue on a single count of armed robbery at a highway convenience outlet in Vice-Dale County. The GPS ankle monitor went on six weeks before her release date. Her rap sheet runs three pages — two prior counts of receiving stolen property, one dismissed for insufficient witness cooperation — and every arresting officer noted the same thing: she smiled when the cuffs went on. That smile has never once been gratitude.\n\nShe grew up in the rental-unit sprawl east of downtown Vice City, the kind of streets where ambition is treated as a threat to social peace. Her mother worked double shifts at a laundry franchise that the city later condemned. Her father's name appears nowhere in any correctional record, which tells the full story without needing to elaborate. She was seventeen when she first handled a firearm for compensation. She was not caught that time, or the four times after.\n\nUnder pressure, Lucia Caminos does not negotiate — she calculates time and geometry. Her close-quarters competency is not the product of formal training; it is the accumulated result of seventeen armed entries across three counties, most of which were never attributed to her. She favors dual handguns for speed, though she will swap to a slung carbine when a target requires precision over aggression. VCPD tactical briefings classify her as 'escalation-prone' — accurate, though incomplete. She escalates only when the math demands it.\n\nHer durable tie is to Jason Duval, the wheelman who drove her first clean getaway on the outskirts of Port Gellhorn. The relationship is not soft or decorative: it functions as a two-node mutual dependency structure, with each person holding leverage the other cannot replicate. Brian Heder feeds them logistics through the docks. Cal Hampton opens the swamp roads. Everyone else operates under contractual awareness that Lucia's friendship has an identical duration to their usefulness.\n\nAs of current date, active warrants in three counties attach to her name. Her parole ankle monitor was last pinged at the eastern edge of her authorized perimeter at 2:17 a.m. on a Tuesday — nine miles outside the approved zone. No officer was dispatched because the alert system logged it as a sensor drift. Someone in that office is either incompetent or on a retainer Lucia is still paying off.",
      memorableQuotes: [
        "The only way we're gonna get through this is by sticking together, being a team.",
        "Trust? Trust is everything.",
        "Bad luck, I guess."
      ],
      statistics: {
        leadership: 87,
        intelligence: 93,
        combatSkills: 89,
        drivingSkills: 83,
        shootingSkills: 91,
        physicalStrength: 79,
        businessSkills: 74,
        charisma: 96,
        loyalty: 97,
        influenceReputation: 84
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
      dossier: "Jason Duval carries a DD-214 that lists his discharge as honorable, which is technically accurate and practically meaningless — he left the service with three commendations for vehicle interdiction in two theaters and a recurring knee injury that the VA rated at twenty percent and the pain pills covered the other eighty. His first civilian arrest was a weapons charge in a Port Gellhorn truck stop that was expunged through a lawyer his uncle knew. The county prosecutor had a long memory and a short budget.\n\nHis background before Leonida is a standard compression of bad geography and early financial choices. He grew up in a rural county north of Port Gellhorn where the two stable industries were phosphate mining and meth distribution, and he chose neither. The military gave him structure, specialized vehicle training, and a working understanding of how men behave when surrounded on three sides. What it did not give him was a reason to come home to anything.\n\nBehind the wheel, Duval operates in a register most trained drivers never reach — the gap between instinct and calculation where the decision has already been made before the threat fully materializes. He runs brake-bias adjustments by touch. He reads road surface by the change in cabin noise. In a tactical engagement, he does not accelerate away from pursuit; he accelerates toward geometry that eliminates the pursuing vehicle's line of sight. VCPD high-speed pursuit logs reference him by vehicle description alone, because no traffic camera has produced a usable facial composite.\n\nHis functional relationship with Lucia Caminos is the most consequential variable in his operational calculus. He does not perform sentiment; he extends the kind of absolute reliability that makes sentiment redundant. Cal Hampton gets gas and off-road access. Brian Heder gets contract logistics. What Lucia gets from Jason is categorically different: she gets the one person who runs the calculation of her survival before running any other calculation.\n\nThree open vehicle theft warrants remain active in Leonida County. The most recent involves a stolen tactical pursuit interceptor last recorded entering the northern Grassrivers canal network at speed, at which point the pursuing helicopter's FLIR lost thermal contact in the heavy vegetation. The case file sits at the bottom of a detective's backlog, behind seventeen other cases with better witnesses.",
      memorableQuotes: [
        "Trust. (In response to Lucia)",
        "We move on my count. Keep your head down and stay on my six.",
        "Cruisers inbound from the north causeway — hold on!"
      ],
      statistics: {
        leadership: 84,
        intelligence: 91,
        combatSkills: 93,
        drivingSkills: 97,
        shootingSkills: 94,
        physicalStrength: 88,
        businessSkills: 71,
        charisma: 79,
        loyalty: 98,
        influenceReputation: 82
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
      dossier: "State of Leonida Department of Corrections, case file 7741-C: inmate Lucia Caminos, assigned counselor Stefanie. The name on the ID lanyard has no surname on file because Stefanie's personnel record has been sealed under an administrative privacy waiver she filed four years ago during an unrelated departmental complaint. What the public record shows instead is eleven years of continuous service, three commendations for accurate risk classification, and a caseload that runs forty-seven active parolees at any given moment.\n\nShe came into corrections work through a sociology graduate program at Leonida State, writing a thesis on recidivism rates in rural coastal counties that her advisor described as 'uncomfortably accurate.' The prison system hired her for the same reason it resisted her recommendations: she predicted behavior correctly, and the institution needed that skill without wanting its implications. She learned to narrow her outputs to what was actionable within existing budget constraints.\n\nHer professional instrument is the interview. She does not raise her voice, issue ultimatums, or signal impatience. She sits with her hands on her clipboard and asks the same questions in slightly different sequence until the inconsistency surfaces. With Lucia Caminos she has been doing this for six months, and she is aware that the answers she receives are performances — aware, and continuing to document them anyway, because documentation is what she has jurisdiction over.\n\nShe operates within the legal structure without particular affection for it. She has colleagues she tolerates, regulations she enforces, and a professional boundary she maintains because the alternative is becoming what she manages. Her relationship to Lucia is not adversarial in the personal sense: it is structural. One person has authority over GPS coordinates; the other treats that authority as a temporary engineering problem.\n\nHer most recent formal report on Lucia Caminos, submitted to the Leonida Parole Board twelve days ago, includes a single flagged notation: 'Subject demonstrates rehearsed behavioral compliance. Recommend extended monitoring period.' The board denied the extension on procedural grounds. The denial was signed by a board member who attended the same fundraiser as Lucia's attorney of record three weeks prior.",
      memorableQuotes: [
        "Lucia, do you know why you're here?",
        "Bad luck? That's what they all say until the verdict comes back.",
        "If you violate perimeter restrictions, that bracelet alerts dispatch before you clear the driveway."
      ],
      statistics: {
        leadership: 79,
        intelligence: 93,
        combatSkills: 37,
        drivingSkills: 58,
        shootingSkills: 51,
        physicalStrength: 54,
        businessSkills: 69,
        charisma: 73,
        loyalty: 86,
        influenceReputation: 81
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
      dossier: "Calvin Hampton — known to every mud-runner in Kelly County as Gator Cal and to the Leonida Wildlife Commission as Respondent No. 4 in Case 2024-WC-0117, an ongoing administrative enforcement action related to unlicensed alligator relocation and the operation of a motorized watercraft exceeding posted horsepower limits in a protected wetland buffer zone. The fine is two thousand dollars. He has not paid it. Nobody at the commission has pressed the matter because two of the field officers drive vehicles Cal serviced at cost.\n\nHe was born on the ranch where the Thrillbilly Mud Club now operates, the third generation of Hamptons to work land that the county surveyor's office has tried to rezone for residential development four times since 1998. All four attempts stalled after community meetings that Cal attended with enough neighbors to fill the parking lot and enough personal history with each commissioner's family to make the vote politically expensive. The land is still zoned agricultural.\n\nHis tactical profile is built on mobility and terrain asymmetry — a twelve-foot airboat that he can accelerate to forty-three knots in standing water and a network of sawgrass channels that exist on no publicly available map. He has been in three vehicle chases with Leonida State Troopers. All three ended the same way: the pursuit vehicle bottomed out on a submerged berm, and Cal did not stop to confirm it.\n\nHis loyalty runs on a precise operating principle: he will extend unlimited support to people who treat the backcountry with respect and finite tolerance to anyone who treats it as a disposal site. Jason Duval has never once asked Cal to do anything that left a trace in the ecosystem. That buys significant goodwill. Lucia Caminos he trusts by extension, which in Cal's accounting is the maximum courtesy an outsider receives on a first meeting.\n\nThe Wildlife Commission enforcement case is still open. What the Commission does not know is that the alligator Cal allegedly relocated without a permit was a specific eleven-foot bull named Cecil that had been penned in a drainage ditch by a private developer's temporary construction barrier. Cecil currently occupies a stretch of protected marsh where no developer has yet managed to obtain a building variance. The variance application is pending review.",
      memorableQuotes: [
        "Welcome to the Mud Club, boys! If your axles ain't bent, you ain't trying!",
        "Watch that channel over yonder — twelve-foot bull gator claimed that bank this morning.",
        "Cruisers can't follow you through forty miles of sawgrass slurry. Floor it!"
      ],
      statistics: {
        leadership: 81,
        intelligence: 73,
        combatSkills: 83,
        drivingSkills: 96,
        shootingSkills: 79,
        physicalStrength: 94,
        businessSkills: 63,
        charisma: 87,
        loyalty: 93,
        influenceReputation: 78
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
      dossier: "Brian Heder has been the foreman at Port Gellhorn Container Terminal for nine years, a tenure that survived two Federal Port Authority audits, one grand jury subpoena that was withdrawn after the key witness relocated to a state with no extradition agreement, and a union arbitration that added fourteen minutes to his shift break and cost the terminal's parent company four hundred thousand dollars in back-wages. He is respected by everyone on the dock because he has never once asked a crane operator to do anything that could be traced to Heder personally.\n\nHe came up through the local dockworkers union, working shifts as a container lash during the port expansion of 2004 when Port Gellhorn doubled its berthing capacity and Federal oversight halved its inspection budget in the same fiscal year. He noticed the math before anyone told him to. Within three years he was running swing-shift logistics. Within six he was falsifying manifests for a flat fee and delivering the documentation to the same offshore freight brokers who attended the port authority's annual gala.\n\nIn practice, he operates as a logistics clearinghouse: he knows which crane operator owes a favor, which dock security captain drinks through his overnight shift, and which manifest reviewer processes freight in the fifteen-minute window before the customs database syncs. When Jason and Lucia bring him a job, Heder does not need a plan — he needs a container number and a two-hour window, and he provides both without being asked for either.\n\nHis alliance with Jason and Lucia is transactional in the best sense: he controls the access point, they supply the operational tempo, and neither party has any interest in the other's personal history. He finds Brian Heder's own union colleagues more dangerous as counterparties than any criminal syndicate, because unions document everything and syndicates rarely do.\n\nThe Federal Port Authority opened Case 2026-FPA-0391 against Port Gellhorn Container Terminal eighteen days ago following a tip from an unnamed informant. Heder's name does not appear in the case file. His foreman credentials were accessed by an FPA digital forensics team at 11:41 p.m. last Thursday. By 11:49 p.m. those credentials had been transferred to a Cayman Islands registered holding company that owns the terminal's parent entity. The case file now belongs to a jurisdiction the FPA cannot compel to cooperate.",
      memorableQuotes: [
        "Container forty-eight on the east pier. If you're not out by midnight, the crane moves it to a cargo ship heading for Nassau.",
        "Keep the heat off my cranes, or this entire port locks down.",
        "Money talks, but a clean bill of lading screams."
      ],
      statistics: {
        leadership: 86,
        intelligence: 89,
        combatSkills: 77,
        drivingSkills: 78,
        shootingSkills: 81,
        physicalStrength: 87,
        businessSkills: 94,
        charisma: 76,
        loyalty: 83,
        influenceReputation: 91
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
      dossier: "The man who controls San Chian narcotics distribution across the state of Leonida is listed in federal intelligence databases under four separate aliases, none of which are the name his associates use. Don Santiago. The admiral. The file photograph on record is fourteen years old, taken from a maritime surveillance float during a vessel inspection off Nassau that produced no chargeable evidence and a diplomatic complaint from the Bahamian foreign ministry. His attorneys billed six hundred thousand dollars for that complaint.\n\nHe built the San Chian franchise from a mid-tier cocaine corridor operating out of a fishing port north of Cartagena into a vertically integrated logistics operation that now touches pharmaceutical cold-chain freight, luxury yacht registration services, and three hospitality properties in Vice City that the IRS has been auditing for two years without producing a correctable discrepancy. His comptrollers are better than the government's. They should be — he recruited two of them directly out of the agency.\n\nHe does not carry a weapon personally. He maintains a private security detail of eleven contractors, four of whom have previous employment with government intelligence services across two hemispheres, and a rotating bodyguard rotation he changes every ninety days regardless of performance. His superyacht is registered under a Marshall Islands shell entity and staffed by a crew of twenty-three, including two individuals whose biometric data does not match any known immigration record. He conducts primary business from the sun deck using a satellite link that routes through three jurisdictions before surfacing.\n\nJason and Lucia's interdiction of his Vice-Dale courier drops is the kind of operational disruption he has absorbed from federal task forces and rival cartels with equanimity. What distinguishes this particular problem is the timeline: they hit four separate courier handoffs in six weeks without any apparent intelligence source, which means they either have a very reliable informant inside the distribution chain or they are more observant than any amateur crew has the right to be. He has dispatched people to determine which.\n\nThe DEA's current intelligence assessment gives the San Chian Cartel an 84% probability of adapting its Leonida distribution architecture within the next ninety days. The assessment does not note that the analyst who wrote it filed a request for personal security last Thursday, citing an undisclosed threat to his residence. The request is pending review.",
      memorableQuotes: [
        "You took something that belonged to the San Chian family. That was very brave, and very foolish.",
        "The police only exist to catch amateur criminals. We run the water that surrounds them.",
        "Feed them to the sawgrass sharks."
      ],
      statistics: {
        leadership: 97,
        intelligence: 96,
        combatSkills: 74,
        drivingSkills: 76,
        shootingSkills: 82,
        physicalStrength: 71,
        businessSkills: 99,
        charisma: 93,
        loyalty: 67,
        influenceReputation: 99
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
      dossier: "Dre'Quan Priest built Priest Records from a two-room recording studio in Liberty City into a Vice Beach operation that grossed forty-seven million dollars last fiscal year across streaming royalties, venue revenue, and brand licensing — thirty-one million of which passed through a Delaware music publishing entity that his accountant structured specifically to generate losses against offshore passive income. The IRS audited the Delaware entity for fourteen months. The audit closed with a settlement that his legal team describes as 'modest.' The settlement terms are sealed.\n\nHe grew up in the Strawberry district of Vice City's predecessor neighborhood, raised primarily by his grandmother after his parents' early exit from the story in the way that particular neighborhood tends to produce early exits. He started a cassette tape duplication operation at fourteen, a label at nineteen, and his first club partnership at twenty-two. He paid for each one with the previous one. He does not romanticize this history; he treats it as working capital.\n\nHis operational edge in the entertainment business is identical to his edge in extracurricular arrangements: he reads the room faster than anyone else in it and acts before the room realizes it has been read. He uses bodyguards more as social infrastructure than as security — men who manage the geography of a space so that the wrong people never reach him before he has decided whether they are wrong. He does not negotiate under pressure; he reframes the terms of engagement so that the other party believes it arrived at the correct conclusion independently.\n\nJason and Lucia operate for him on a task-by-task basis: precise, discrete, and accountable in ways that the private security firms he has used previously were not. Boobie Ike and Bae Luxe move in the same orbit — they provide the public visibility that makes Priest Records a real entertainment company rather than a financial vehicle with a playlist attached. He is careful about which of those two realities people are allowed to see.\n\nAn extortion attempt against Club Solarium was escalated to a physical altercation three weeks ago. The individual responsible spent two days in Vice City General with documented injuries. No charges were filed. The VCPD case log notes 'unknown suspects' and describes the incident as 'ongoing.' No detective has been assigned to follow up.",
      memorableQuotes: [
        "If it ain't gold-certified before midnight, we ain't working hard enough.",
        "Tell your crew they're VIP tonight. Drinks on Priest.",
        "In this town, fame is a shield — until someone gets a clear shot."
      ],
      statistics: {
        leadership: 89,
        intelligence: 87,
        combatSkills: 72,
        drivingSkills: 81,
        shootingSkills: 73,
        physicalStrength: 77,
        businessSkills: 96,
        charisma: 98,
        loyalty: 83,
        influenceReputation: 94
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
      dossier: "State of Leonida Business Registration records list her legal name as Monika Jean Harlow, which does not appear on any platform profile, merchandise tag, or branded partnership invoice associated with Boobie Ike. The name on the contract is always B. Ike LLC, a single-member entity registered in Nevada with a resident agent in Carson City who has never met her. This is not unusual in the Vice City influencer economy. It is, however, unusually clean for someone with her level of voluntary public visibility.\n\nShe built her online presence from zero over forty months, compounding through a specific operational discipline: she does not chase trends, she creates a reaction window by arriving at a location or event twelve minutes before saturation, films the moment of peak energy, and exits before the crowd realizes it is being documented. The algorithm rewards anticipation; she manufactures anticipation at scale. At 4.7 million active followers, Boobie Ike is a media distribution channel that no advertising agency can replicate at equivalent CPM rates.\n\nHer public persona — the bubbly beach socialite who is surprised and delighted by everything — is a production. Off-camera she tracks platform analytics with the cold attention of a systems architect, runs A/B tests on captioning language, and maintains a scheduling grid three weeks ahead that she adjusts in real time for weather, criminal incidents, and breaking news that might saturate her content's visibility window. She does not share this part of the operation with anyone except Bae Luxe.\n\nShe and Bae Luxe operate as a mutual amplification network rather than a friendship — though there is genuine affection underneath the commercial structure. Dre'Quan Priest understands this and uses it: a single Boobie Ike location tag at Club Solarium generates eight hundred thousand organic views in the first four hours, which is more effective than any paid media placement and entirely unaccountable under campaign finance reporting requirements.\n\nA paparazzi operation has been surveilling her Starfish Island villa for the past six days using telephoto equipment from an adjacent canal. The images they have obtained show her in conversation with an individual whose face the photographers have not yet been able to identify — tall, backlit, arriving by boat and departing within forty minutes. The images are currently being shopped to four tabloid operations. Two of them have already received legal hold notices from B. Ike LLC's counsel.",
      memorableQuotes: [
        "Drop a like and subscribe, because tonight we're shutting down Ocean Drive!",
        "You can't buy this vibe anywhere else in the world.",
        "Smile for the stream, honey — you're trending in Leonida!"
      ],
      statistics: {
        leadership: 81,
        intelligence: 86,
        combatSkills: 41,
        drivingSkills: 74,
        shootingSkills: 48,
        physicalStrength: 57,
        businessSkills: 89,
        charisma: 99,
        loyalty: 77,
        influenceReputation: 94
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
      dossier: "Raul Bautista's name first appears in federal maritime records as a witness statement in a 2019 Coast Guard interdiction that produced four arrests and zero convictions due to a chain-of-custody defect in the evidence handling. He was listed as a marina employee present at the dock during the boarding. The case file records that he cooperated fully, identified no one, and provided documentation of his employment at Hamlet Marina that predated the interdiction by fourteen months. The documentation was genuine. The employment was genuine. The other fourteen things he was doing that day were not.\n\nHis family came over from Havana to the Liberty City port district in the early 1980s, the kind of crossing that arrives with nothing except competence and a specific resentment toward institutions that make crossing expensive. He learned marine mechanics from his father's repair shop operation and diesel engine ballistics from the older men who used the shop for purposes that were not mechanical. By his early twenties he could tune a twin-outboard cigarette boat to produce seventeen percent above rated horsepower and explain the procedure as routine maintenance.\n\nOn water he operates in a different register than he maintains on land — the laid-back island mechanics persona drops entirely, replaced by a focused precision that processes current, visibility, radar return, and reef depth simultaneously. He knows the Leonida Keys channel network the way an electrician knows a building's wiring diagram: not by chart, but by the physical memory of having run each route at night in varying weather. The Coast Guard's patrol pattern is to his muscle memory what a bus schedule is to a daily commuter.\n\nHis working relationship with Jason Duval runs through a practical mutual respect: Duval understands mechanical systems and does not ask Raul to explain decisions that the geography makes obvious. Lucia he trusts at one remove — she is Jason's operational counterpart, and Jason's judgment on human reliability has proven accurate enough to extend the courtesy. Brian Heder he knows from two shared jobs in the Port Gellhorn loading system that required coordinated timing on water and land simultaneously.\n\nHis most recent custom build — a triple-outboard cigarette boat with a radar scrambler integrated into the transom bracket — was officially sold to a sport fishing charter service out of the Keys registry two months ago. The charter service holds a valid business license, carries liability insurance, and has never taken a paying client out on the water. The boat was last recorded on Coast Guard radar running southwest at forty-one knots at 2:08 a.m., at which point it entered the reef channel system and disappeared from the screen.",
      memorableQuotes: [
        "Listen to that triple-outboard purr. That's eighty knots on open water, my friend.",
        "The Coast Guard has radar, but they don't know the reef channels like I do.",
        "Take the southern mangrove cut — the police cruisers will bottom out every single time."
      ],
      statistics: {
        leadership: 77,
        intelligence: 89,
        combatSkills: 69,
        drivingSkills: 96,
        shootingSkills: 72,
        physicalStrength: 79,
        businessSkills: 81,
        charisma: 83,
        loyalty: 94,
        influenceReputation: 82
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
      dossier: "Alexis Monroe's name appears on a lease agreement for a Vice Beach high-rise unit at eleven thousand dollars per month, which she has paid on time for thirty-one consecutive months. It also appears in the plaintiff column of a federal civil complaint filed against a tabloid press agency two years ago for publishing fabricated financial disclosures. The case settled for a number her attorney declined to confirm beyond 'material.' The tabloid subsequently published a correction that ran on page fourteen of their digital edition and received eight hundred views.\n\nShe started modeling at nineteen with an agency that specialized in automotive and motorsport advertising, a sector that compensated adequately for her rate tier but was correctly identified as a temporary platform rather than a destination. The pivot to fashion editorial was deliberate and financially structured: she declined seventeen lower-caliber campaign offers in a single year to maintain scarcity before closing two contracts with Leonida Fashion Week anchors that established her rate at the correct level. She does not discuss this methodology because discussing it would devalue it.\n\nBae Luxe drives the way she poses — controlled performance, zero waste motion, no visible effort. She has held an active road racing license since twenty-two, competed in three regional endurance events, and can heel-toe downshift in a rear-drive exotic at speed without adjusting her grip on the wheel. When people are surprised by this, she is not particularly interested in their surprise. Competence was the foundation; the aesthetics came after, because they compound better.\n\nHer mutual network with Boobie Ike operates on a handshake understanding rather than a formal commercial agreement: each amplifies the other's signal in aligned content categories, and neither charges the other for that amplification. The informal structure is more valuable than any contractual arrangement because it cannot be audited, dissolved by a label deal, or terminated for cause. Dre'Quan Priest orbits this network as a mutual benefit anchor — his platform provides credibility legitimacy that raw follower counts cannot manufacture at the same rate.\n\nA blackmail attempt reached her representation three weeks ago: photographs alleged to document her in an undisclosed location with an undisclosed individual, framed against unnamed legal exposure. Her attorney replied within four hours with a pre-litigation hold notice citing eleven specific statutes. The sender's registered email address has since gone offline. The photographs have not appeared anywhere, which either means the exposure framing was fabricated or someone with standing reviewed the legal notice and arrived at the correct calculation about probable outcomes.",
      memorableQuotes: [
        "Life looks so much better through the windshield of an Italian exotic.",
        "They want the luxury, but they can't handle the horsepower.",
        "Neon reflects best on twenty-four karat gold, darling."
      ],
      statistics: {
        leadership: 79,
        intelligence: 89,
        combatSkills: 47,
        drivingSkills: 91,
        shootingSkills: 53,
        physicalStrength: 59,
        businessSkills: 93,
        charisma: 99,
        loyalty: 78,
        influenceReputation: 96
      }
    }
  }
];
