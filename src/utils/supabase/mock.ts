// ponytail: shared mock data — was duplicated verbatim in client.ts and server.ts
export const MOCK_VIDEOS = [
  {
    id: "sub-uuid-1",
    platform: "youtube",
    external_id: "sub-location-01",
    title: "GTA 6 - Hidden Submarine Easter Egg Location (Leonida Map)",
    description: "Detailed guide to finding the hidden submarine at the bottom of the Leonida Keys. Make sure to bring scuba gear!",
    channel_name: "GTA Series Videos",
    channel_url: "https://youtube.com/c/gtaseriesvideos",
    published_at: new Date(Date.now() - 3 * 3600000).toISOString(),
    transcript: "Hey everyone, today we are showing you how to find the submarine wreck in GTA 6. Head over to the southern portion of the map near the keys...",
    video_timestamps: [
      { label: "Submarine Location on Map", seconds: 45 },
      { label: "Entering the Water", seconds: 120 },
      { label: "Wreck Walkthrough & Loot", seconds: 245 }
    ],
    excluded: false
  },
  {
    id: "mission-uuid-2",
    platform: "youtube",
    external_id: "mission-guide-02",
    title: "GTA 6 Main Story Walkthrough - Mission #12: Neon Escape",
    description: "Lucia and Jason pull off a high-stakes robbery in Vice City downtown. Full mission walkthrough with gold medal tips.",
    channel_name: "TGG",
    channel_url: "https://youtube.com/c/tgg",
    published_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    transcript: "Welcome back. Today we are doing mission 12, Neon Escape. The main objective is to lose the 4-star cops after robbing the nightclub. Here is the best escape route...",
    video_timestamps: [
      { label: "Heist Execution", seconds: 15 },
      { label: "Best Cop Escape Route", seconds: 180 },
      { label: "Gold Medal Requirements", seconds: 320 }
    ],
    excluded: false
  },
  {
    id: "car-uuid-3",
    platform: "youtube",
    external_id: "car-custom-03",
    title: "GTA 6 - Confirmed Vehicle Customization & Cheetah Location",
    description: "Finding the Grotti Cheetah in Leonida and showing off the new advanced car tuning mechanics.",
    channel_name: "Broughy1322",
    channel_url: "https://youtube.com/c/broughy",
    published_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    transcript: "Hello! We are looking at the Grotti Cheetah, a returning classic. Customization options are now deeper, with interior customization and engine tuning...",
    video_timestamps: [
      { label: "Where to find the Cheetah", seconds: 30 },
      { label: "Customization Garage Overview", seconds: 110 },
      { label: "High-speed Performance Test", seconds: 290 }
    ],
    excluded: false
  },
  {
    id: "funny-uuid-4",
    platform: "youtube",
    external_id: "funny-moments-04",
    title: "GTA 6 Streamer Fails & Funny Moments compilation",
    description: "Hilarious clips from streamer gameplay, physics bugs, and hilarious police chases in GTA 6.",
    channel_name: "Funny Moments Gaming",
    channel_url: "https://youtube.com/c/funnymoments",
    published_at: new Date(Date.now() - 48 * 3600000).toISOString(),
    transcript: "Oh my god did you see that car fly! Classic GTA physics. Check out these crazy clips...",
    video_timestamps: [
      { label: "Flying Gator Glitch", seconds: 10 },
      { label: "Stunt Jump Fail", seconds: 95 },
      { label: "Cop Chase Blooper", seconds: 175 }
    ],
    excluded: false
  }
]

export const MOCK_CATEGORIES = [
  { id: "1", name: "Easter Eggs & Secrets" },
  { id: "2", name: "Missions & Story" },
  { id: "3", name: "Map & Exploration" },
  { id: "4", name: "Vehicles" },
  { id: "5", name: "Customization & Style" },
  { id: "6", name: "Funny & Highlight Moments" }
]

export const MOCK_ADMIN_USER = {
  id: "mock-admin-uuid",
  email: "admin@gta6hub.com",
  role: "superuser",
  is_premium: true
}

// Minimal mock query builder — returns mock data for offline/dev use
export class MockQueryBuilder {
  constructor(private tableName: string) {}

  select(_?: string) { return this }
  eq(_c: string, _v: any) { return this }
  neq(_c: string, _v: any) { return this }
  or(_v: string) { return this }
  order(_c: string, _o?: any) { return this }
  limit(_n: number) { return this }
  textSearch(_c: string, _q: string, _o?: any) { return this }

  async single() {
    const data = this.getData()
    return { data: Array.isArray(data) ? data[0] : data, error: null }
  }

  async insert(payload: any) {
    return { data: Array.isArray(payload) ? payload[0] : payload, error: null }
  }

  async update(payload: any) { return { data: payload, error: null } }
  async upsert(payload: any, _?: any) { return { data: payload, error: null } }
  async delete() { return { error: null } }

  async then(resolve: (v: any) => void) {
    resolve({ data: this.getData(), error: null })
  }

  private getData(): any {
    if (this.tableName === 'videos') return MOCK_VIDEOS
    if (this.tableName === 'categories') return MOCK_CATEGORIES
    if (this.tableName === 'users') return MOCK_ADMIN_USER
    return []
  }
}
