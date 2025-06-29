import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const status = url.searchParams.get("status")

    let query = supabase.from("payments").select("*").eq("user_id", user.id).order("created_at", { ascending: false })

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

export async function POST(request: Request) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, description, card_id } = await request.json()

    const { data, error } = await supabase
      .from("payments")
      .insert({
        user_id: user.id,
        amount: Number.parseFloat(amount),
        description,
        card_id,
        status: "completed",
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ payment: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
