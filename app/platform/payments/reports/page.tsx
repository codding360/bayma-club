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
