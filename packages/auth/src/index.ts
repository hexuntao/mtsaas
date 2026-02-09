import { createBrowserClient, createServerClient } from '@supabase/auth-helpers-nextjs'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const authClient: SupabaseClient = createBrowserClient(supabaseUrl, supabaseAnonKey)

// Server client - cookies will be handled by the caller
export const authServer: SupabaseClient = createServerClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    cookies: {
      getAll() {
        return []
      },
      setAll(_cookiesToSet) {
        // Do nothing - caller should handle
      },
    },
  }
)

export async function getSession() {
  const { data: { session } } = await authServer.auth.getSession()
  return session
}

export async function getUser() {
  const { data: { user } } = await authServer.auth.getUser()
  return user
}

export async function requireAuth() {
  const session = await getSession()
  if (!session) {
    throw new Error('Unauthorized')
  }
  return session
}

export async function requireUser() {
  const user = await getUser()
  if (!user) {
    throw new Error('Unauthorized')
  }
  return user
}
