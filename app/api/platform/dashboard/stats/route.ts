import { createClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user's booking statistics
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("status, created_at")
      .eq("user_id", user.id)

    if (bookingsError) {
      return NextResponse.json({ error: bookingsError.message }, { status: 500 })
    }

    // Get user's payment statistics
    const { data: payments, error: paymentsError } = await supabase
      .from("payments")
      .select("amount, status, payment_date")
      .eq("user_id", user.id)

    if (paymentsError) {
      return NextResponse.json({ error: paymentsError.message }, { status: 500 })
    }

    // Calculate statistics
    const totalBookings = bookings.length
    const activeBookings = bookings.filter((b) => b.status === "confirmed").length
    const pendingBookings = bookings.filter((b) => b.status === "pending").length

    const totalSpent = payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

    const recentBookings = bookings
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5)

    const stats = {
      totalBookings,
      activeBookings,
      pendingBookings,
      totalSpent,
      recentBookings,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
