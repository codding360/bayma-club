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

    // Получаем карты пользователя
    const { data: cards, error: cardError } = await supabase.from("cards").select("*").eq("user_id", user.id)

    if (cardError) {
      return NextResponse.json({ error: cardError.message }, { status: 400 })
    }

    return NextResponse.json({ cards })
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

    // Создаем новую карту (в реальном приложении здесь была бы интеграция с платежной системой)
    const lastFour = body.number.slice(-4)
    const brand = body.number.startsWith("4") ? "Visa" : "Mastercard"

    const { data: card, error: cardError } = await supabase
      .from("cards")
      .insert([
        {
          user_id: user.id,
          last_four: lastFour,
          brand: brand,
          exp_month: body.exp_month,
          exp_year: body.exp_year,
        },
      ])
      .select()
      .single()

    if (cardError) {
      return NextResponse.json({ error: cardError.message }, { status: 400 })
    }

    return NextResponse.json({ card })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
