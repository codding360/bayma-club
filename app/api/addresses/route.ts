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

    // Получаем адреса пользователя
    const { data: addresses, error: addressError } = await supabase.from("addresses").select("*").eq("user_id", user.id)

    if (addressError) {
      return NextResponse.json({ error: addressError.message }, { status: 400 })
    }

    return NextResponse.json({ addresses })
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

    // Создаем новый адрес
    const { data: address, error: addressError } = await supabase
      .from("addresses")
      .insert([
        {
          user_id: user.id,
          street: body.street,
          city: body.city,
          postal_code: body.postal_code,
          country: body.country,
        },
      ])
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
