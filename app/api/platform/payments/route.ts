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
      .from("payments")
      .select(`
        *,
        bookings(
          id,
          tours(title, start_date)
        )
      `)
      .eq("user_id", user.id)
      .range((page - 1) * limit, page * limit - 1)
      .order("payment_date", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data: payments, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ payments })
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
    const { booking_id, amount, payment_method, card_id } = body

    const { data: payment, error } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        booking_id,
        amount,
        payment_method,
        card_id,
        status: "processing",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Here you would integrate with actual payment processor
    // For now, we'll simulate successful payment
    await supabase
      .from("payments")
      .update({
        status: "completed",
        payment_date: new Date().toISOString(),
      })
      .eq("id", payment.id)

    return NextResponse.json({ payment }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
