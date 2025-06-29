import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

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

    let query = supabase.from("tours").select("*")

    if (category) {
      query = query.eq("category", category)
    }

    const { data: tours, error: toursError } = await query.order("created_at", { ascending: false })

    if (toursError) {
      return NextResponse.json({ error: toursError.message }, { status: 400 })
    }

    return NextResponse.json({ tours })
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

    const { data: tour, error: tourError } = await supabase
      .from("tours")
      .insert([
        {
          title: body.title,
          description: body.description,
          price: body.price,
          duration: body.duration,
          category: body.category,
          destination: body.destination,
          start_date: body.start_date,
          end_date: body.end_date,
          max_participants: body.max_participants,
          created_by: user.id,
        },
      ])
      .select()
      .single()

    if (tourError) {
      return NextResponse.json({ error: tourError.message }, { status: 400 })
    }

    return NextResponse.json({ tour })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
