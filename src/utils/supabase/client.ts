import { createBrowserClient } from '@supabase/ssr'
import { MOCK_VIDEOS, MOCK_ADMIN_USER, MockQueryBuilder } from './mock'

const mockClient = {
  from(tableName: string) {
    const builder = new MockQueryBuilder(tableName)

    // Client-side: persist videos and subscriptions in localStorage for offline demo
    if (typeof window !== 'undefined') {
      const original = builder as MockQueryBuilder & Record<string, unknown>
      original.insert = async (payload: unknown) => {
        const current = JSON.parse(localStorage.getItem(`gta_${tableName}`) || '[]')
        const items = (Array.isArray(payload) ? payload : [payload]).map(
          (item: Record<string, unknown>) => ({ id: Math.random().toString(), created_at: new Date().toISOString(), ...item })
        )
        localStorage.setItem(`gta_${tableName}`, JSON.stringify([...current, ...items]))
        return { data: items[0], error: null }
      }
      if (tableName === 'videos') {
        // Prefer localStorage videos over hardcoded mocks when available
        original.then = async (resolve: (v: { data: unknown; error: null }) => void) => {
          const stored = JSON.parse(localStorage.getItem('gta_videos') || '[]')
          resolve({ data: stored.length > 0 ? stored : MOCK_VIDEOS, error: null })
        }
      }
      if (tableName === 'favorites' || tableName === 'follows') {
        original.then = async (resolve: (v: { data: unknown; error: null }) => void) => {
          const stored = JSON.parse(localStorage.getItem(`gta_${tableName}`) || '[]')
          resolve({ data: stored, error: null })
        }
      }
    }

    return builder
  },
  auth: {
    async getSession() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('gta_logged_email') || MOCK_ADMIN_USER.email
        return { data: { session: { user: { id: MOCK_ADMIN_USER.id, email } } } }
      }
      return { data: { session: null } }
    },
    async getUser() {
      if (typeof window !== 'undefined') {
        const email = localStorage.getItem('gta_logged_email') || MOCK_ADMIN_USER.email
        return { data: { user: { id: MOCK_ADMIN_USER.id, email } }, error: null }
      }
      return { data: { user: null }, error: null }
    },
    async signInWithPassword({ email }: { email: string }) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('gta_logged_email', email)
        localStorage.setItem('gta_active_user', JSON.stringify({
          ...MOCK_ADMIN_USER,
          email,
          role: email.includes('admin') ? 'superuser' : 'user',
        }))
      }
      return { data: { user: { id: MOCK_ADMIN_USER.id, email } }, error: null }
    },
    async signUp({ email }: { email: string }) {
      return { data: { user: { id: MOCK_ADMIN_USER.id, email } }, error: null }
    },
    async signOut() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('gta_logged_email')
        localStorage.removeItem('gta_active_user')
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
  if (!url || !anonKey) {
    console.log('Supabase credentials missing — using mock client')
    return mockClient as unknown as ReturnType<typeof createBrowserClient>
  }
  return createBrowserClient(url, anonKey)
}
