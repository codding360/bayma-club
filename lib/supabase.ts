import { createClient } from "@supabase/supabase-js"

/* ------------------------------------------------------------------
 * If real environment variables are absent (e.g. in a local preview
 * that hasn't been configured yet), fall back to placeholder values.
 * These values let the code run without throwing, but they won’t let
 * you reach a real Supabase backend until you set the real variables.
 * -----------------------------------------------------------------*/
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co" // ✅ replace in production
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "public-anon-key"

if (supabaseUrl.startsWith("https://placeholder") || supabaseAnonKey === "public-anon-key") {
  // eslint-disable-next-line no-console
  console.warn("⚠️  Supabase env vars are not set. Using placeholder credentials.")
}

/* --------------  Browser-side client (can be null on server) -------------- */
export const supabase =
  typeof window !== "undefined" ? createClient(supabaseUrl, supabaseAnonKey) : ({} as ReturnType<typeof createClient>) // dummy object on server

/* --------------  Helper to create a fresh SERVER client -------------- */
export const createServerClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey,
  )
