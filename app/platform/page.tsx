import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship, Users, CreditCard, TrendingUp } from "lucide-react"

export default function PlatformPage() {
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
            <CardTitle className="text-sm font-medium text-slate-600">Активные туры</CardTitle>
            <Ship className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">3</div>
            <p className="text-xs text-slate-500">+1 за месяц</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Клиенты</CardTitle>
            <Users className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">1,234</div>
            <p className="text-xs text-slate-500">+15% за месяц</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Доходы</CardTitle>
            <CreditCard className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">₽2.3М</div>
            <p className="text-xs text-slate-500">+8% за месяц</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Рост</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">+12%</div>
            <p className="text-xs text-slate-500">За квартал</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Последние бронирования</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Анна Петрова", tour: "Средиземноморский круиз", date: "15 янв" },
                { name: "Михаил Иванов", tour: "Карибский круиз", date: "14 янв" },
                { name: "Елена Сидорова", tour: "Норвежские фьорды", date: "13 янв" },
              ].map((booking, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">{booking.name}</p>
                    <p className="text-sm text-slate-500">{booking.tour}</p>
                  </div>
                  <div className="text-sm text-slate-400">{booking.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Популярные направления</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { destination: "Средиземное море", bookings: 45, color: "bg-blue-500" },
                { destination: "Карибские острова", bookings: 38, color: "bg-green-500" },
                { destination: "Норвежские фьорды", bookings: 29, color: "bg-purple-500" },
                { destination: "Балтийское море", bookings: 22, color: "bg-orange-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-slate-900">{item.destination}</span>
                  </div>
                  <span className="text-sm text-slate-500">{item.bookings}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
