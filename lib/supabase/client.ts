import 'server-only'

import { Database } from '@/database.types'
import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'

export type SupabaseClient = Awaited<ReturnType<typeof getClient>>

export async function getClient() {
  // const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        // setAll(cookiesToSet) {
        //   try {
        //     cookiesToSet.forEach(({ name, value, options }) =>
        //       cookieStore.set(name, value, options),
        //     )
        //   } catch {
        //     // The `setAll` method was called from a Server Component.
        //     // This can be ignored if you have middleware refreshing
        //     // user sessions.
        //   }
        // },
      },
    },
  )
}
