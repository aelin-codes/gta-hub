import { NextResponse } from 'next/server'
import { createClient, createAdminClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { targetUserId, newRole, adminPassword } = body

    if (!targetUserId || !newRole || !adminPassword) {
      return NextResponse.json(
        { error: 'Missing targetUserId, newRole, or adminPassword' },
        { status: 400 }
      )
    }

    if (!['user', 'admin', 'superuser'].includes(newRole)) {
      return NextResponse.json(
        { error: 'Invalid role specified' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const adminClient = createAdminClient()

    // 1. Identify current session user
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    if (!currentUser || !currentUser.email) {
      return NextResponse.json(
        { error: 'Unauthorized. You must be logged in as an administrator.' },
        { status: 401 }
      )
    }

    // 2. Verify current user has admin privileges
    const { data: currentProfile } = await adminClient
      .from('users')
      .select('role, email')
      .eq('id', currentUser.id)
      .single()

    const isAdmin = currentProfile?.role === 'admin' || currentProfile?.role === 'superuser'
    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Forbidden. Administrator privileges required.' },
        { status: 403 }
      )
    }

    // 3. SUDO RE-AUTHENTICATION SECURITY GUARD:
    // Admin MUST re-enter their current account password to authorize role escalation!
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: currentUser.email,
      password: adminPassword,
    })

    if (authError) {
      return NextResponse.json(
        { error: 'Invalid administrator password. Privilege change authorization rejected.' },
        { status: 401 }
      )
    }

    // 4. Update the target user's role in the database (public.users)
    const { data: updatedUser, error: updateError } = await adminClient
      .from('users')
      .update({ role: newRole })
      .eq('id', targetUserId)
      .select('*')
      .single()

    if (updateError) {
      console.error('Error updating user role in DB:', updateError)
      return NextResponse.json(
        { error: 'Failed to update user role in database' },
        { status: 500 }
      )
    }

    // 4b. Synchronize auth system user role in Supabase Auth DB (auth.users metadata & claims)
    try {
      if ((adminClient.auth as any)?.admin?.updateUserById) {
        await (adminClient.auth as any).admin.updateUserById(targetUserId, {
          app_metadata: { role: newRole, claims_admin: newRole === 'admin' },
          user_metadata: { role: newRole }
        })
      }
    } catch (authAdminErr) {
      console.warn('Auth admin updateUserById note:', authAdminErr)
    }

    // 5. Audit Log Entry
    try {
      await adminClient.from('admin_audit_logs').insert({
        admin_id: currentUser.id,
        action: newRole === 'admin' ? 'promote_admin' : 'demote_user',
        details: `Admin ${currentUser.email} updated user ${targetUserId} role to '${newRole}' with sudo password re-authentication.`
      })
    } catch (auditErr) {
      console.warn('Audit log write error:', auditErr)
    }

    return NextResponse.json({
      success: true,
      message: `User role successfully updated to ${newRole}`,
      user: updatedUser,
    })
  } catch (err) {
    console.error('Update role error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Internal server error' },
      { status: 500 }
    )
  }
}
