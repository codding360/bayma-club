import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function PUT(request: NextRequest) {
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

    // Verify current password by attempting to sign in
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email!,
      password: body.current_password,
    })

    if (signInError) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Update password
    const { error: updateError } = await supabase.auth.updateUser({
      password: body.new_password,
    })

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 400 })
    }

    return NextResponse.json({ message: "Password updated successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
