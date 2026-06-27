import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { MOCK_ADMIN_USER, MOCK_VIDEOS, MockQueryBuilder } from './mock'

const mockServerClient = {
  from(tableName: string) { return new MockQueryBuilder(tableName) },
  auth: {
    async getUser() {
      return { data: { user: MOCK_ADMIN_USER }, error: null }
    },
    async getSession() {
      return { data: { session: { user: MOCK_ADMIN_USER } }, error: null }
    }
  },
  rpc(_fn: string, _args: any) {
    return Promise.resolve({ data: MOCK_VIDEOS, error: null })
  }
}

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anonKey) {
    console.log('Supabase credentials missing — using mock server client')
    return mockServerClient as any
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
  if (!url || !serviceKey) {
    console.log('Supabase service key missing — using mock admin client')
    return mockServerClient as any
  }
  return createServerClient(url, serviceKey, {
    cookies: { getAll() { return [] }, setAll() {} }
  })
}
