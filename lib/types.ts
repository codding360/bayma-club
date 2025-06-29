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
