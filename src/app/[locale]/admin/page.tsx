import { Metadata } from 'next'
import AdminClientPage from './AdminClientPage'

export const metadata: Metadata = {
  title: 'Admin Dashboard | GTA 6 Hub',
  description: 'Manage users, video categories, takedowns, and view security audit logs.',
  robots: {
    index: false,
    follow: false,
  }
}

export default async function AdminPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return <AdminClientPage locale={locale} />
}
