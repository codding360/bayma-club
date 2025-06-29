import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

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

    const { data: address, error: addressError } = await supabase
      .from("addresses")
      .update({
        street: body.street,
        city: body.city,
        postal_code: body.postal_code,
        country: body.country,
      })
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select()
      .single()

    if (addressError) {
      return NextResponse.json({ error: addressError.message }, { status: 400 })
    }

    return NextResponse.json({ address })
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

    const { error: deleteError } = await supabase.from("addresses").delete().eq("id", params.id).eq("user_id", user.id)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 })
    }

    return NextResponse.json({ message: "Address deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
