import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n'

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
})

export async function middleware(request: NextRequest) {
  // First run next-intl middleware to handle path routing for locales
  const response = intlMiddleware(request)

  let supabaseResponse = response || NextResponse.next()

  // Ensure Supabase keys are set before trying to initialize client
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect admin routes from unauthorized users
  const path = request.nextUrl.pathname
  if (path.includes('/admin')) {
    if (!user) {
      // Find current locale to redirect correctly
      const segments = path.split('/')
      const locale = locales.includes(segments[1]) ? segments[1] : defaultLocale
      const loginUrl = new URL(`/${locale}/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Query database for admin / superuser roles
    const { data: dbUser } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!dbUser || (dbUser.role !== 'admin' && dbUser.role !== 'superuser')) {
      const segments = path.split('/')
      const locale = locales.includes(segments[1]) ? segments[1] : defaultLocale
      const homeUrl = new URL(`/${locale}`, request.url)
      return NextResponse.redirect(homeUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - API routes (e.g. /api/...)
    // - static files (e.g. /_next/static, /images, /favicon.ico)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
