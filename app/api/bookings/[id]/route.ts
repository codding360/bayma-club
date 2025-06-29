import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select(`
        *,
        tours (
          title,
          description,
          destination,
          start_date,
          end_date,
          price,
          duration
        )
      `)
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()

    if (bookingError) {
      return NextResponse.json({ error: bookingError.message }, { status: 400 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
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
      .update({
        participants: body.participants,
        total_amount: body.total_amount,
        status: body.status,
        special_requests: body.special_requests,
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
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

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
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

    const { error: deleteError } = await supabase.from("bookings").delete().eq("id", params.id).eq("user_id", user.id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 })
    }

    return NextResponse.json({ message: "Booking cancelled successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
