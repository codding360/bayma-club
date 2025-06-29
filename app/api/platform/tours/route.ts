import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const supabase = createServerClient()

    const url = new URL(request.url)
    const search = url.searchParams.get("search")
    const category = url.searchParams.get("category")

    let query = supabase
      .from("tours")
      .select(`
        *,
        tour_categories (
          name
        )
      `)
      .order("created_at", { ascending: false })

    if (search) {
      query = query.ilike("title", `%${search}%`)
    }

    if (category) {
      query = query.eq("category_id", category)
    }

    const { data: tours, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ tours })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
