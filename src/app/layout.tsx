import { ReactNode } from 'react'

// Root layout: minimal html/body shell required by Next.js App Router.
// The real layout (fonts, nav, footer) lives in [locale]/layout.tsx.
// This wrapper only exists to satisfy Next.js's html+body requirement for
// routes outside [locale] (e.g. the global 404 not-found page).
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
