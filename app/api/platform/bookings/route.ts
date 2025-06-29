import { createClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    let query = supabase
      .from("bookings")
      .select(`
        *,
        tours(title, price, start_date, end_date),
        payments(amount, status, payment_date)
      `)
      .eq("user_id", user.id)
      .range((page - 1) * limit, page * limit - 1)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data: bookings, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { tour_id, participants, special_requests } = body

    // Check tour availability
    const { data: tour, error: tourError } = await supabase
      .from("tours")
      .select("max_participants, current_participants")
      .eq("id", tour_id)
      .single()

    if (tourError || !tour) {
      return NextResponse.json({ error: "Tour not found" }, { status: 404 })
    }

    if (tour.current_participants + participants > tour.max_participants) {
      return NextResponse.json({ error: "Not enough available spots" }, { status: 400 })
    }

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        tour_id,
        participants,
        special_requests,
        status: "pending",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ booking }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
