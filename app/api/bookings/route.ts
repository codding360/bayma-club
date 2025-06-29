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

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(`
        *,
        tours (
          title,
          destination,
          start_date,
          end_date,
          price
        )
      `)
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (bookingsError) {
      return NextResponse.json({ error: bookingsError.message }, { status: 400 })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const body = await request.json()

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

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          tour_id: body.tour_id,
          participants: body.participants,
          total_amount: body.total_amount,
          status: "pending",
          special_requests: body.special_requests,
        },
      ])
      .select()
      .single()

    if (bookingError) {
      return NextResponse.json({ error: bookingError.message }, { status: 400 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
