export interface User {
  id: string
  email: string
  name?: string
  phone?: string
  created_at: string
}

export interface Address {
  id: string
  user_id: string
  street: string
  city: string
  postal_code: string
  country: string
  created_at: string
}

export interface Payment {
  id: string
  user_id: string
  amount: number
  status: "pending" | "completed" | "failed"
  date: string
  description?: string
}

export interface Card {
  id: string
  user_id: string
  last_four: string
  brand: string
  exp_month: number
  exp_year: number
  created_at: string
}

export interface Tour {
  id: string
  title: string
  description: string
  price: number
  duration: number
  category: string
  destination: string
  start_date: string
  end_date: string
  max_participants: number
  created_by: string
  created_at: string
}

export interface TourCategory {
  id: string
  name: string
  description?: string
  created_by: string
  created_at: string
}

export interface Booking {
  id: string
  user_id: string
  tour_id: string
  participants: number
  total_amount: number
  status: "pending" | "confirmed" | "cancelled" | "completed"
  special_requests?: string
  created_at: string
  tours?: Tour
}

export interface DashboardStats {
  total_bookings: number
  active_bookings: number
  total_spent: number
  upcoming_tours: number
}

export interface PaymentReport {
  payments: Payment[]
  summary: {
    total_payments: number
    total_amount: number
    completed_count: number
    completed_amount: number
    pending_count: number
    pending_amount: number
    failed_count: number
    failed_amount: number
  }
}
