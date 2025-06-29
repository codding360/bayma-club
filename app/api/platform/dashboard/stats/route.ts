import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total bookings
    const { count: totalBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get active bookings (confirmed or pending)
    const { count: activeBookings } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .in("status", ["confirmed", "pending"])

    // Get total spent (completed payments)
    const { data: completedPayments } = await supabase
      .from("payments")
      .select("amount")
      .eq("user_id", user.id)
      .eq("status", "completed")

    const totalSpent = completedPayments?.reduce((sum, payment) => sum + payment.amount, 0) || 0

    // Get upcoming tours count (bookings with future start dates)
    const { count: upcomingTours } = await supabase
      .from("bookings")
      .select(
        `
        *,
        tours!inner (
          start_date
        )
      `,
        { count: "exact", head: true },
      )
      .eq("user_id", user.id)
      .eq("status", "confirmed")
      .gte("tours.start_date", new Date().toISOString())

    return NextResponse.json({
      total_bookings: totalBookings || 0,
      active_bookings: activeBookings || 0,
      total_spent: Math.round(totalSpent / 100), // Convert from cents to rubles
      upcoming_tours: upcomingTours || 0,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
