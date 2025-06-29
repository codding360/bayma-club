import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { street, city, postal_code, country, is_default } = await request.json()

    // If this is set as default, unset other defaults
    if (is_default) {
      await supabase.from("user_addresses").update({ is_default: false }).eq("user_id", user.id)
    }

    const { data, error } = await supabase
      .from("user_addresses")
      .update({
        street,
        city,
        postal_code,
        country,
        is_default: is_default || false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ address: data })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { error } = await supabase.from("user_addresses").delete().eq("id", params.id).eq("user_id", user.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
