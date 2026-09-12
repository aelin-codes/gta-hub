import { CURATED_VIDEOS } from '@/data/curatedVideos'

// Real curated video catalog for reliable offline/fallback operation
export const MOCK_VIDEOS = CURATED_VIDEOS

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
  role: "admin",
  is_premium: true
}

export const MOCK_TEST_USER = {
  id: "mock-testuser-uuid",
  email: "testuser@gta6hub.com",
  role: "user",
  is_premium: false
}

export const SEED_USERS = [
  MOCK_ADMIN_USER,
  MOCK_TEST_USER,
  {
    id: "mock-lucia-uuid",
    email: "lucia@gta6hub.com",
    role: "user",
    is_premium: true
  },
  {
    id: "mock-jason-uuid",
    email: "jason@gta6hub.com",
    role: "user",
    is_premium: false
  }
]

// Minimal mock query builder — returns mock data for offline/dev use
export class MockQueryBuilder {
  private filters: Array<{ col: string; val: unknown }> = []
  private isDelete: boolean = false

  constructor(private tableName: string) {}

  select(c?: string) { void c; return this }
  eq(c: string, v: unknown) {
    this.filters.push({ col: c, val: v })
    return this
  }
  neq(c: string, v: unknown) { void c; void v; return this }
  or(v: string) { void v; return this }
  order(c: string, o?: unknown) { void c; void o; return this }
  limit(n: number) { void n; return this }
  textSearch(c: string, q: string, o?: unknown) { void c; void q; void o; return this }

  async single() {
    const data = this.getFilteredData()
    return { data: Array.isArray(data) ? (data[0] || null) : data, error: null }
  }

  async maybeSingle() {
    const data = this.getFilteredData()
    return { data: Array.isArray(data) ? (data[0] || null) : data, error: null }
  }

  async insert(payload: unknown) {
    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || 'null') || (
        this.tableName === 'users' ? [...SEED_USERS] : []
      )
      const items = (Array.isArray(payload) ? payload : [payload]).map((item: Record<string, unknown>) => ({
        id: item.id || 'rec-' + Math.random().toString(36).substring(2, 9),
        created_at: new Date().toISOString(),
        ...item
      }))
      const updated = [...current, ...items]
      localStorage.setItem(`gta_${this.tableName}`, JSON.stringify(updated))
      return { data: items[0], error: null }
    }
    return { data: Array.isArray(payload) ? payload[0] : payload, error: null }
  }

  async update(payload: unknown) {
    if (typeof window !== 'undefined') {
      const current = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || 'null') || (
        this.tableName === 'users' ? [...SEED_USERS] : []
      )
      const targetId = this.filters.find(f => f.col === 'id')?.val
      const updated = current.map((u: any) => u.id === targetId ? { ...u, ...(payload as object) } : u)
      localStorage.setItem(`gta_${this.tableName}`, JSON.stringify(updated))
    }
    return { data: payload, error: null }
  }

  async upsert(payload: unknown, onConflict?: unknown) { void onConflict; return { data: payload, error: null } }

  delete() {
    this.isDelete = true
    return this
  }

  async then(resolve: (v: { data: unknown; error: null }) => void) {
    if (this.isDelete) {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || '[]')
        const remaining = stored.filter((item: Record<string, unknown>) => {
          // If all filters match this item, remove it
          return !this.filters.every((f) => item[f.col] === f.val)
        })
        localStorage.setItem(`gta_${this.tableName}`, JSON.stringify(remaining))
      }
      resolve({ data: null, error: null })
      return
    }

    resolve({ data: this.getFilteredData(), error: null })
  }

  private getFilteredData(): unknown {
    let data: unknown[] = []
    if (this.tableName === 'videos') {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('gta_videos') || 'null')
        data = stored || MOCK_VIDEOS
      } else {
        data = MOCK_VIDEOS
      }
    }
    else if (this.tableName === 'categories') data = MOCK_CATEGORIES
    else if (this.tableName === 'users') {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('gta_users') || 'null')
        data = stored || SEED_USERS
      } else {
        data = SEED_USERS
      }
    }
    else if (this.tableName === 'favorites' || this.tableName === 'follows') {
      if (typeof window !== 'undefined') {
        data = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || '[]')
      } else {
        data = []
      }
    }
    else {
      if (typeof window !== 'undefined') {
        data = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || '[]')
      } else {
        data = []
      }
    }

    if (this.filters.length > 0) {
      return data.filter((item) =>
        typeof item === 'object' &&
        item !== null &&
        this.filters.every((f) => (item as Record<string, unknown>)[f.col] === f.val)
      )
    }

    return data
  }
}
