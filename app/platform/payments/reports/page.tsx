import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react"

export default function PaymentReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Отчеты по платежам</h1>
          <p className="text-slate-500 mt-1">Аналитика и статистика платежей</p>
        </div>
        <div className="flex space-x-3">
          <Select>
            <SelectTrigger className="w-40 border-slate-200">
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Выбрать даты
          </Button>
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Download className="mr-2 h-4 w-4" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Общий доход</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">₽2,345,000</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% за месяц
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Количество платежей</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">1,234</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8% за месяц
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Средний чек</CardTitle>
            <DollarSign className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">₽78,500</div>
            <div className="flex items-center text-xs text-red-600">
              <TrendingDown className="h-3 w-3 mr-1" />
              -2% за месяц
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">Успешные платежи</CardTitle>
            <TrendingUp className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-light text-slate-900">98.5%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.5% за месяц
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Динамика платежей</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
              <p className="text-slate-500">График динамики платежей</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-900">Способы оплаты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Банковские карты</span>
                <span className="text-sm font-medium">85%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-slate-900 h-2 rounded-full" style={{ width: "85%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Банковские переводы</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-slate-600 h-2 rounded-full" style={{ width: "12%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Другие</span>
                <span className="text-sm font-medium">3%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-slate-400 h-2 rounded-full" style={{ width: "3%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Последние транзакции</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Дата</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Клиент</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Сумма</th>
                  <th className="text-left py-3 px-4 font-medium text-slate-700">Статус</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: "2024-01-15", client: "Анна Петрова", amount: 45000, status: "Завершен" },
                  { date: "2024-01-14", client: "Михаил Иванов", amount: 78000, status: "Завершен" },
                  { date: "2024-01-13", client: "Елена Сидорова", amount: 89000, status: "В обработке" },
                ].map((transaction, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-3 px-4 text-slate-900">{transaction.date}</td>
                    <td className="py-3 px-4 text-slate-900">{transaction.client}</td>
                    <td className="py-3 px-4 font-medium text-slate-900">{transaction.amount.toLocaleString()} ₽</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === "Завершен"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
