import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { data: profile, error } = await supabase.from("users").select("*").eq("user_id", user.id).single()

    if (error && error.code !== "PGRST116") {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      profile: profile || {
        user_id: user.id,
        name: user.user_metadata?.name || "",
        email: user.email || "",
        phone: "",
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, phone } = await request.json()

    const { data, error } = await supabase
      .from("users")
      .upsert({
        user_id: user.id,
        name,
        phone,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ profile: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
