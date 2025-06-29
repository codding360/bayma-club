import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's bookings count
    const { count: bookingsCount } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get total spent
    const { data: payments } = await supabase
      .from("payments")
      .select("amount")
      .eq("user_id", user.id)
      .eq("status", "completed")

    const totalSpent = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0

    // Get recent bookings
    const { data: recentBookings } = await supabase
      .from("bookings")
      .select(`
        *,
        tours (
          title
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(3)

    return NextResponse.json({
      stats: {
        activeBookings: bookingsCount || 0,
        totalSpent,
        recentBookings: recentBookings || [],
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
