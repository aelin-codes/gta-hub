import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { MOCK_ADMIN_USER, MOCK_VIDEOS, MockQueryBuilder } from './mock'

export const mockServerClient = {
  from(tableName: string) { return new MockQueryBuilder(tableName) },
  auth: {
    async getUser() {
      return { data: { user: MOCK_ADMIN_USER }, error: null }
    },
    async getSession() {
      return { data: { session: { user: MOCK_ADMIN_USER } }, error: null }
    },
    async signInWithPassword({ email, password }: { email: string; password?: string }) {
      if (password && password.length >= 4) {
        return { data: { user: { ...MOCK_ADMIN_USER, email } }, error: null }
      }
      return { data: { user: null }, error: new Error('Invalid administrator password.') }
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
    return mockServerClient as unknown as ReturnType<typeof createServerClient>
  }
  const cookieStore = cookies()
  return createServerClient(url, anonKey, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // Safe to ignore — middleware handles session cookies
        }
      },
    },
  })
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true' || !url || !serviceKey || url.includes('your-project') || url.includes('example')
  if (useMock) {
    return mockServerClient as unknown as ReturnType<typeof createServerClient>
  }
  return createServerClient(url, serviceKey, {
    cookies: { getAll() { return [] }, setAll() {} }
  })
}
