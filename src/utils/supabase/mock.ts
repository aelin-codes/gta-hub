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
  is_premium: true,
  created_at: new Date(Date.now() - 86400000 * 30).toISOString()
}

export const MOCK_TEST_USER = {
  id: "mock-testuser-uuid",
  email: "testuser@gta6hub.com",
  role: "user",
  is_premium: false,
  created_at: new Date(Date.now() - 86400000 * 15).toISOString()
}

export const SEED_USERS = [
  MOCK_ADMIN_USER,
  MOCK_TEST_USER,
  {
    id: "mock-lucia-uuid",
    email: "lucia@gta6hub.com",
    role: "user",
    is_premium: true,
    created_at: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    id: "mock-jason-uuid",
    email: "jason@gta6hub.com",
    role: "user",
    is_premium: false,
    created_at: new Date(Date.now() - 86400000 * 3).toISOString()
  }
]

// In-memory runtime store for serverless/API execution
export const SERVER_STORE: Record<string, any[]> = {
  videos: [],
  categories: [...MOCK_CATEGORIES],
  users: [...SEED_USERS],
  admin_audit_logs: [],
  video_categories: [],
  video_timestamps: []
}

// Minimal mock query builder — returns mock data for offline/dev use
export class MockQueryBuilder {
  private filters: Array<{ col: string; val: unknown }> = []
  private isDelete: boolean = false
  private isUpdate: boolean = false
  private isInsert: boolean = false
  private updatePayload: unknown = null
  private insertPayload: unknown = null

  constructor(private tableName: string) {}

  select(c?: string, o?: unknown) { void c; void o; return this }
  eq(c: string, v: unknown) {
    this.filters.push({ col: c, val: v })
    return this
  }
  neq(c: string, v: unknown) { void c; void v; return this }
  or(v: string) { void v; return this }
  order(c: string, o?: unknown) { void c; void o; return this }
  limit(n: number) { void n; return this }
  textSearch(c: string, q: string, o?: unknown) { void c; void q; void o; return this }

  insert(payload: unknown) {
    this.isInsert = true
    this.insertPayload = payload
    return this
  }

  update(payload: unknown) {
    this.isUpdate = true
    this.updatePayload = payload
    return this
  }

  upsert(payload: unknown, onConflict?: unknown) {
    void onConflict
    this.isInsert = true
    this.insertPayload = payload
    return this
  }

  delete() {
    this.isDelete = true
    return this
  }

  async single() {
    const res = this.execute()
    const data = Array.isArray(res.data) ? (res.data[0] || null) : res.data
    return { data, error: res.error }
  }

  async maybeSingle() {
    const res = this.execute()
    const data = Array.isArray(res.data) ? (res.data[0] || null) : res.data
    return { data, error: res.error }
  }

  private execute(): { data: unknown; error: null } {
    if (this.isDelete) {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || '[]')
        const remaining = stored.filter((item: Record<string, unknown>) => {
          return !this.filters.every((f) => item[f.col] === f.val)
        })
        localStorage.setItem(`gta_${this.tableName}`, JSON.stringify(remaining))
      }
      if (SERVER_STORE[this.tableName]) {
        SERVER_STORE[this.tableName] = SERVER_STORE[this.tableName].filter((item: Record<string, unknown>) => {
          return !this.filters.every((f) => item[f.col] === f.val)
        })
      }
      return { data: null, error: null }
    }

    if (this.isInsert) {
      const raw = Array.isArray(this.insertPayload) ? this.insertPayload : [this.insertPayload]
      const items = raw.map((item: Record<string, unknown>) => ({
        id: item.id || 'rec-' + Math.random().toString(36).substring(2, 9),
        created_at: item.created_at || new Date().toISOString(),
        ...item
      }))

      if (typeof window !== 'undefined') {
        const storedRaw = localStorage.getItem(`gta_${this.tableName}`)
        const current = storedRaw ? JSON.parse(storedRaw) : (this.tableName === 'users' ? [...SEED_USERS] : [])
        const updated = [...(Array.isArray(current) ? current : []), ...items]
        localStorage.setItem(`gta_${this.tableName}`, JSON.stringify(updated))
      }

      if (!SERVER_STORE[this.tableName]) {
        SERVER_STORE[this.tableName] = []
      }
      SERVER_STORE[this.tableName].push(...items)

      return {
        data: Array.isArray(this.insertPayload) ? items : items[0],
        error: null
      }
    }

    if (this.isUpdate) {
      let updatedItem: unknown = this.updatePayload
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem(`gta_${this.tableName}`)
        let current = raw ? JSON.parse(raw) : null
        if (!current || !Array.isArray(current) || current.length === 0) {
          current = this.tableName === 'users' ? [...SEED_USERS] : []
        }
        if (this.tableName === 'users') {
          for (const su of SEED_USERS) {
            if (!current.some((u: any) => u.id === su.id || (u.email && u.email.toLowerCase() === su.email.toLowerCase()))) {
              current.push({ ...su })
            }
          }
        }

        let found = false
        const updated = current.map((item: Record<string, unknown>) => {
          const matches = this.filters.length === 0 || this.filters.every((f) => {
            if (item[f.col] === f.val) return true
            if (f.col === 'email' && typeof item.email === 'string' && typeof f.val === 'string') {
              return item.email.toLowerCase() === f.val.toLowerCase()
            }
            if (f.col === 'id' && typeof item.email === 'string' && typeof f.val === 'string') {
              const seed = SEED_USERS.find(s => s.id === f.val || s.email.toLowerCase() === (item.email as string)?.toLowerCase())
              if (seed && (seed.id === item.id || seed.email.toLowerCase() === (item.email as string)?.toLowerCase())) {
                return true
              }
            }
            return false
          })
          if (matches) {
            found = true
            const merged = { ...item, ...(this.updatePayload as Record<string, unknown>) }
            updatedItem = merged
            return merged
          }
          return item
        })

        if (!found && this.tableName === 'users' && this.updatePayload) {
          const idFilter = this.filters.find(f => f.col === 'id')?.val as string | undefined
          const emailFilter = this.filters.find(f => f.col === 'email')?.val as string | undefined
          const newItem = {
            id: idFilter || 'usr-' + Math.random().toString(36).substring(2, 9),
            email: emailFilter || 'user@gta6hub.com',
            role: 'user',
            is_premium: false,
            created_at: new Date().toISOString(),
            ...(this.updatePayload as Record<string, unknown>)
          }
          updated.push(newItem)
          updatedItem = newItem
        }

        localStorage.setItem(`gta_${this.tableName}`, JSON.stringify(updated))

        // If updating users, sync active user session & cookies
        if (this.tableName === 'users' && updatedItem) {
          const up = updatedItem as Record<string, unknown>
          const activeUser = JSON.parse(localStorage.getItem('gta_active_user') || 'null')
          const loggedEmail = localStorage.getItem('gta_logged_email')
          if (
            (activeUser && (activeUser.id === up.id || (activeUser.email && activeUser.email.toLowerCase() === (up.email as string)?.toLowerCase()))) ||
            (loggedEmail && loggedEmail.toLowerCase() === (up.email as string)?.toLowerCase())
          ) {
            const newActive = { ...(activeUser || {}), ...up }
            localStorage.setItem('gta_active_user', JSON.stringify(newActive))
            if (up.role) {
              document.cookie = `gta_user_role=${up.role}; path=/; max-age=604800; SameSite=Lax`
            }
          }
        }
      }

      // In-memory update for SEED_USERS & SERVER_STORE (server/node contexts)
      if (this.tableName === 'users') {
        for (let i = 0; i < SEED_USERS.length; i++) {
          const su = SEED_USERS[i]
          const matches = this.filters.length === 0 || this.filters.every((f) => {
            if ((su as Record<string, unknown>)[f.col] === f.val) return true
            if (f.col === 'email' && typeof su.email === 'string' && typeof f.val === 'string') {
              return su.email.toLowerCase() === f.val.toLowerCase()
            }
            if (f.col === 'id' && typeof f.val === 'string' && (su.id === f.val || su.email.toLowerCase() === f.val.toLowerCase())) {
              return true
            }
            return false
          })
          if (matches) {
            SEED_USERS[i] = { ...su, ...(this.updatePayload as Record<string, unknown>) }
            if (su.id === MOCK_TEST_USER.id) Object.assign(MOCK_TEST_USER, this.updatePayload)
            if (su.id === MOCK_ADMIN_USER.id) Object.assign(MOCK_ADMIN_USER, this.updatePayload)
            updatedItem = SEED_USERS[i]
          }
        }

        if (SERVER_STORE['users']) {
          SERVER_STORE['users'] = SERVER_STORE['users'].map(u => {
            const matches = this.filters.length === 0 || this.filters.every((f) => {
              if (u[f.col] === f.val) return true
              if (f.col === 'email' && typeof u.email === 'string' && typeof f.val === 'string') {
                return u.email.toLowerCase() === f.val.toLowerCase()
              }
              return false
            })
            return matches ? { ...u, ...(this.updatePayload as Record<string, unknown>) } : u
          })
        }
      }

      return { data: updatedItem, error: null }
    }

    return { data: this.getFilteredData(), error: null }
  }

  async then(resolve: (v: { data: unknown; error: null }) => void) {
    resolve(this.execute())
  }

  private getFilteredData(): unknown {
    let data: unknown[] = []
    if (this.tableName === 'videos') {
      if (typeof window !== 'undefined') {
        const stored = JSON.parse(localStorage.getItem('gta_videos') || 'null')
        data = stored || MOCK_VIDEOS
      } else {
        const serverVideos = SERVER_STORE['videos'] || []
        data = serverVideos.length > 0 ? [...MOCK_VIDEOS, ...serverVideos] : MOCK_VIDEOS
      }
    }
    else if (this.tableName === 'categories') data = MOCK_CATEGORIES
    else if (this.tableName === 'users') {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('gta_users')
        const stored = raw ? JSON.parse(raw) : null
        if (Array.isArray(stored) && stored.length > 0) {
          const merged = [...stored]
          for (const su of SEED_USERS) {
            if (!merged.some((u: any) => u.id === su.id || (u.email && u.email.toLowerCase() === su.email.toLowerCase()))) {
              merged.push({ ...su })
            }
          }
          data = merged
        } else {
          data = [...SEED_USERS]
        }
      } else {
        const serverUsers = SERVER_STORE['users'] || []
        const merged = [...SEED_USERS]
        for (const su of serverUsers) {
          if (!merged.some((u: any) => u.id === su.id || (u.email && u.email.toLowerCase() === su.email.toLowerCase()))) {
            merged.push(su)
          }
        }
        data = merged
      }
    }
    else if (this.tableName === 'favorites' || this.tableName === 'follows') {
      if (typeof window !== 'undefined') {
        data = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || '[]')
      } else {
        data = SERVER_STORE[this.tableName] || []
      }
    }
    else {
      if (typeof window !== 'undefined') {
        data = JSON.parse(localStorage.getItem(`gta_${this.tableName}`) || '[]')
      } else {
        data = SERVER_STORE[this.tableName] || []
      }
    }

    if (this.filters.length > 0) {
      return data.filter((item) =>
        typeof item === 'object' &&
        item !== null &&
        this.filters.every((f) => {
          if ((item as Record<string, unknown>)[f.col] === f.val) return true
          if (f.col === 'email' && typeof (item as any).email === 'string' && typeof f.val === 'string') {
            return (item as any).email.toLowerCase() === f.val.toLowerCase()
          }
          return false
        })
      )
    }

    return data
  }
}
