import { createBrowserClient } from '@supabase/ssr'
import { MOCK_VIDEOS, MOCK_ADMIN_USER, MockQueryBuilder, SEED_USERS } from './mock'

function getStoredUsers() {
  if (typeof window === 'undefined') return [...SEED_USERS]
  const raw = localStorage.getItem('gta_users')
  const stored = raw ? JSON.parse(raw) : null
  if (!stored || !Array.isArray(stored) || stored.length === 0) {
    localStorage.setItem('gta_users', JSON.stringify(SEED_USERS))
    return [...SEED_USERS]
  }
  const merged = [...stored]
  let changed = false
  for (const su of SEED_USERS) {
    if (!merged.some((u: any) => u.id === su.id || (u.email && u.email.toLowerCase() === su.email.toLowerCase()))) {
      merged.push({ ...su })
      changed = true
    }
  }
  if (changed) {
    localStorage.setItem('gta_users', JSON.stringify(merged))
  }
  return merged
}

const mockClient = {
  from(tableName: string) {
    return new MockQueryBuilder(tableName)
  },
  auth: {
    async getSession() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('gta_logged_email')
        if (!email) return { data: { session: null } }
        const users = getStoredUsers()
        const user = users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase()) || { id: 'mock-user-uuid', email, role: 'user', is_premium: false }
        return { data: { session: { user } } }
      }
      return { data: { session: null } }
    },
    async getUser() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('gta_logged_email')
        if (!email) return { data: { user: null }, error: null }
        const users = getStoredUsers()
        const user = users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase()) || { id: 'mock-user-uuid', email, role: 'user', is_premium: false }
        return { data: { user }, error: null }
      }
      return { data: { user: null }, error: null }
    },
    async signInWithPassword({ email }: { email: string; password?: string }) {
      if (typeof window !== 'undefined') {
        const users = getStoredUsers()
        let user = users.find((u: any) => u.email?.toLowerCase() === email.toLowerCase())
        if (!user) {
          const isAdmin = email.toLowerCase().includes('admin')
          user = {
            id: isAdmin ? 'mock-admin-uuid' : 'usr-' + Math.random().toString(36).substring(2, 9),
            email,
            role: isAdmin ? 'admin' : 'user',
            is_premium: isAdmin,
            created_at: new Date().toISOString()
          }
          users.push(user)
          localStorage.setItem('gta_users', JSON.stringify(users))
        }
        localStorage.setItem('gta_logged_email', user.email)
        localStorage.setItem('gta_active_user', JSON.stringify(user))

        // Set client auth cookies for edge middleware
        document.cookie = `gta_user_role=${user.role}; path=/; max-age=604800; SameSite=Lax`
        document.cookie = `gta_user_email=${encodeURIComponent(user.email)}; path=/; max-age=604800; SameSite=Lax`

        return { data: { user, session: { user } }, error: null }
      }
      return { data: { user: null, session: null }, error: null }
    },
    async signUp({ email }: { email: string; password?: string }) {
      if (typeof window !== 'undefined') {
        const users = JSON.parse(localStorage.getItem('gta_users') || 'null') || [...SEED_USERS]
        const isAdmin = email.toLowerCase().includes('admin')
        const user = {
          id: 'usr-' + Math.random().toString(36).substring(2, 9),
          email,
          role: isAdmin ? 'admin' : 'user',
          is_premium: false,
          created_at: new Date().toISOString()
        }
        users.push(user)
        localStorage.setItem('gta_users', JSON.stringify(users))
        localStorage.setItem('gta_logged_email', user.email)
        localStorage.setItem('gta_active_user', JSON.stringify(user))

        // Set client auth cookies for edge middleware
        document.cookie = `gta_user_role=${user.role}; path=/; max-age=604800; SameSite=Lax`
        document.cookie = `gta_user_email=${encodeURIComponent(user.email)}; path=/; max-age=604800; SameSite=Lax`

        return { data: { user, session: { user } }, error: null }
      }
      return { data: { user: null }, error: null }
    },
    async signOut() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gta_logged_email')
        localStorage.removeItem('gta_active_user')
        document.cookie = 'gta_user_role=; path=/; max-age=0'
        document.cookie = 'gta_user_email=; path=/; max-age=0'
      }
      return { error: null }
    }
  },
  rpc(fn: string, args: unknown) {
    void fn;
    void args;
    return Promise.resolve({ data: MOCK_VIDEOS, error: null })
  }
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !url || !anonKey || url.includes('your-project') || url.includes('example')
  if (useMock) {
    return mockClient as unknown as ReturnType<typeof createBrowserClient>
  }
  return createBrowserClient(url, anonKey)
}
