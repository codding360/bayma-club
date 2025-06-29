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

    const { data: cards, error } = await supabase
      .from("payment_cards")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(cards)
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
    const { number, exp_month, exp_year, cvv, is_default } = body

    if (!number || !exp_month || !exp_year || !cvv) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Extract last 4 digits and determine brand
    const last_four = number.slice(-4)
    const brand = number.startsWith("4") ? "Visa" : number.startsWith("5") ? "Mastercard" : "Unknown"

    // If this is set as default, unset other defaults
    if (is_default) {
      await supabase.from("payment_cards").update({ is_default: false }).eq("user_id", user.id)
    }

    const { data, error } = await supabase
      .from("payment_cards")
      .insert({
        user_id: user.id,
        last_four,
        brand,
        exp_month: Number.parseInt(exp_month),
        exp_year: Number.parseInt(exp_year),
        is_default: is_default || false,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
