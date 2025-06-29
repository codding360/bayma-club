import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get("start_date")
    const endDate = searchParams.get("end_date")
    const status = searchParams.get("status")

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

    let query = supabase.from("payments").select("*").eq("user_id", user.id)

    if (startDate) {
      query = query.gte("date", startDate)
    }

    if (endDate) {
      query = query.lte("date", endDate)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data: payments, error: paymentsError } = await query.order("date", { ascending: false })

    if (paymentsError) {
      return NextResponse.json({ error: paymentsError.message }, { status: 400 })
    }

    // Calculate summary statistics
    const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0)
    const completedPayments = payments.filter((p) => p.status === "completed")
    const pendingPayments = payments.filter((p) => p.status === "pending")
    const failedPayments = payments.filter((p) => p.status === "failed")

    const summary = {
      total_payments: payments.length,
      total_amount: totalAmount,
      completed_count: completedPayments.length,
      completed_amount: completedPayments.reduce((sum, payment) => sum + payment.amount, 0),
      pending_count: pendingPayments.length,
      pending_amount: pendingPayments.reduce((sum, payment) => sum + payment.amount, 0),
      failed_count: failedPayments.length,
      failed_amount: failedPayments.reduce((sum, payment) => sum + payment.amount, 0),
    }

    return NextResponse.json({ payments, summary })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
