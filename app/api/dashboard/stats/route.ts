import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()

    const authHeader = request.headers.get("authorization")
    if (!authHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(authHeader.replace("Bearer ", ""))

    if (error || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get bookings count
    const { count: bookingsCount } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get active bookings count
    const { count: activeBookingsCount } = await supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)
      .in("status", ["confirmed", "pending"])

    // Get total spent
    const { data: payments } = await supabase
      .from("payments")
      .select("amount")
      .eq("user_id", user.id)
      .eq("status", "completed")

    const totalSpent = payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0

    // Get upcoming tours count
    const today = new Date().toISOString().split("T")[0]
    const { count: upcomingToursCount } = await supabase
      .from("bookings")
      .select("*, tours!inner(*)", { count: "exact", head: true })
      .eq("user_id", user.id)
      .eq("status", "confirmed")
      .gte("tours.start_date", today)

    const stats = {
      total_bookings: bookingsCount || 0,
      active_bookings: activeBookingsCount || 0,
      total_spent: totalSpent,
      upcoming_tours: upcomingToursCount || 0,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
