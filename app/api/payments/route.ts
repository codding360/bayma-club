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

    // Получаем платежи пользователя
    const { data: payments, error: paymentError } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })

    if (paymentError) {
      return NextResponse.json({ error: paymentError.message }, { status: 400 })
    }

    return NextResponse.json({ payments })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
