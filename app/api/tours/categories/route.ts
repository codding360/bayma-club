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

    const { data: categories, error: categoriesError } = await supabase
      .from("tour_categories")
      .select("*")
      .order("name", { ascending: true })

    if (categoriesError) {
      return NextResponse.json({ error: categoriesError.message }, { status: 400 })
    }

    return NextResponse.json({ categories })
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

    const { data: category, error: categoryError } = await supabase
      .from("tour_categories")
      .insert([
        {
          name: body.name,
          description: body.description,
          created_by: user.id,
        },
      ])
      .select()
      .single()

    if (categoryError) {
      return NextResponse.json({ error: categoryError.message }, { status: 400 })
    }

    return NextResponse.json({ category })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
