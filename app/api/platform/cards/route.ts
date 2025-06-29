import { createClient } from "@/lib/supabase"
import { type NextRequest, NextResponse } from "next/server"

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

    const { data: cards, error } = await supabase
      .from("user_cards")
      .select("id, last_four, card_type, expiry_month, expiry_year, is_default, created_at")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ cards })
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
    const { card_number, expiry_month, expiry_year, cvv, cardholder_name, is_default } = body

    // In a real app, you would tokenize the card with a payment processor
    // For demo purposes, we'll just store the last 4 digits
    const last_four = card_number.slice(-4)
    const card_type = getCardType(card_number)

    // If this is set as default, unset other defaults
    if (is_default) {
      await supabase.from("user_cards").update({ is_default: false }).eq("user_id", user.id)
    }

    const { data: card, error } = await supabase
      .from("user_cards")
      .insert({
        user_id: user.id,
        last_four,
        card_type,
        expiry_month,
        expiry_year,
        cardholder_name,
        is_default,
        // In production, store encrypted token from payment processor
        card_token: `token_${Date.now()}`,
      })
      .select("id, last_four, card_type, expiry_month, expiry_year, is_default, created_at")
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ card }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function getCardType(cardNumber: string): string {
  const number = cardNumber.replace(/\s/g, "")

  if (/^4/.test(number)) return "visa"
  if (/^5[1-5]/.test(number)) return "mastercard"
  if (/^3[47]/.test(number)) return "amex"

  return "unknown"
}
