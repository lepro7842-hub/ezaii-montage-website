import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifySession, COOKIE_NAME } from './auth'

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }
  const valid = await verifySession(token)
  if (!valid) {
    return NextResponse.json({ error: 'Session invalide' }, { status: 401 })
  }
  return null
}
