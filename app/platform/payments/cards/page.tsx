import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Shield } from "lucide-react"

export default function PaymentCardsPage() {
  const cards = [
    { id: 1, last_four: "4242", brand: "Visa", exp_month: 12, exp_year: 2025, isDefault: true },
    { id: 2, last_four: "5555", brand: "Mastercard", exp_month: 8, exp_year: 2026, isDefault: false },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Банковские карты</h1>
          <p className="text-slate-500 mt-1">Управление способами оплаты</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          Добавить карту
        </Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card key={card.id} className="border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-br from-slate-900 to-slate-700 text-white p-6 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="text-lg font-medium">{card.brand}</div>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 h-8 w-8 p-0">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xl font-mono mb-4">•••• •••• •••• {card.last_four}</div>
              <div className="flex justify-between items-end">
                <div className="text-sm opacity-80">
                  {String(card.exp_month).padStart(2, "0")}/{card.exp_year}
                </div>
                {card.isDefault && <div className="bg-white/20 px-2 py-1 rounded text-xs">По умолчанию</div>}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Защищено
                </div>
                <Button variant="outline" size="sm">
                  Настроить
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Card */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Добавить новую карту</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Номер карты</label>
            <Input placeholder="1234 5678 9012 3456" className="border-slate-200 focus:border-slate-400" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Месяц</label>
              <Input placeholder="12" className="border-slate-200 focus:border-slate-400" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Год</label>
              <Input placeholder="2025" className="border-slate-200 focus:border-slate-400" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">CVV</label>
              <Input placeholder="123" className="border-slate-200 focus:border-slate-400" />
            </div>
          </div>

          <Button className="bg-slate-900 hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" />
            Добавить карту
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
