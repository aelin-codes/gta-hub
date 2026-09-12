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
  role: "superuser",
  is_premium: true
}

// Minimal mock query builder — returns mock data for offline/dev use
export class MockQueryBuilder {
  private filters: Array<{ col: string; val: unknown }> = []

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

  async insert(payload: unknown) {
    return { data: Array.isArray(payload) ? payload[0] : payload, error: null }
  }

  async update(payload: unknown) { return { data: payload, error: null } }
  async upsert(payload: unknown, onConflict?: unknown) { void onConflict; return { data: payload, error: null } }
  async delete() { return { error: null } }

  async then(resolve: (v: { data: unknown; error: null }) => void) {
    resolve({ data: this.getFilteredData(), error: null })
  }

  private getFilteredData(): unknown {
    let data: unknown[] = []
    if (this.tableName === 'videos') data = MOCK_VIDEOS
    else if (this.tableName === 'categories') data = MOCK_CATEGORIES
    else if (this.tableName === 'users') return MOCK_ADMIN_USER
    else return []

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
