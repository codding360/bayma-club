"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Users, CreditCard, TrendingUp } from "lucide-react"

interface DashboardStats {
  activeBookings: number
  totalSpent: number
  recentBookings: Array<{
    id: string
    tours: { title: string }
    created_at: string
  }>
}

export default function PlatformPage() {
  const [stats, setStats] = useState<DashboardStats>({
    activeBookings: 0,
    totalSpent: 0,
    recentBookings: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch("/api/platform/dashboard/stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Обзор</h1>
          <p className="text-slate-500 mt-1">Загрузка...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-slate-900">Обзор</h1>
        <p className="text-slate-500 mt-1">Добро пожаловать в вашу рабочую панель</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Активные бронирования</CardTitle>
            <Ship className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">{stats.activeBookings}</div>
            <p className="text-xs text-slate-500">Всего бронирований</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Потрачено</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">₽{stats.totalSpent.toLocaleString()}</div>
            <p className="text-xs text-slate-500">Общая сумма</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Последние туры</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">{stats.recentBookings.length}</div>
            <p className="text-xs text-slate-500">За последнее время</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Статус</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">Активен</div>
            <p className="text-xs text-slate-500">Аккаунт</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Последние бронирования</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.recentBookings.length > 0 ? (
              stats.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">{booking.tours.title}</p>
                    <p className="text-sm text-slate-500">{new Date(booking.created_at).toLocaleDateString("ru-RU")}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500">Нет бронирований</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
