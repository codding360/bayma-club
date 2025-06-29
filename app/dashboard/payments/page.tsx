"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Receipt, Plus, Trash2 } from "lucide-react"

export default function PaymentsPage() {
  const [payments] = useState([
    { id: 1, date: "2024-01-15", amount: 45000, status: "completed", description: "Круиз по Средиземному морю" },
    { id: 2, date: "2024-01-10", amount: 12000, status: "pending", description: "Доплата за каюту" },
    { id: 3, date: "2024-01-05", amount: 78000, status: "completed", description: "Карибский круиз" },
  ])

  const [cards, setCards] = useState([
    { id: 1, last_four: "4242", brand: "Visa", exp_month: 12, exp_year: 2025 },
    { id: 2, last_four: "5555", brand: "Mastercard", exp_month: 8, exp_year: 2026 },
  ])

  const [newCard, setNewCard] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvv: "",
  })

  const handleAddCard = () => {
    if (newCard.number && newCard.exp_month && newCard.exp_year && newCard.cvv) {
      const lastFour = newCard.number.slice(-4)
      const brand = newCard.number.startsWith("4") ? "Visa" : "Mastercard"

      setCards([
        ...cards,
        {
          id: Date.now(),
          last_four: lastFour,
          brand,
          exp_month: Number.parseInt(newCard.exp_month),
          exp_year: Number.parseInt(newCard.exp_year),
        },
      ])

      setNewCard({ number: "", exp_month: "", exp_year: "", cvv: "" })
    }
  }

  const handleDeleteCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Завершен</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">В обработке</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Отклонен</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Платежи</h1>
        <p className="text-gray-600 mt-2">Управление платежами и банковскими картами</p>
      </div>

      <Tabs defaultValue="receipts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="receipts">Список чеков</TabsTrigger>
          <TabsTrigger value="cards">Карты</TabsTrigger>
        </TabsList>

        <TabsContent value="receipts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Receipt className="mr-2 h-5 w-5" />
                История платежей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Дата</th>
                      <th className="text-left py-3 px-4">Описание</th>
                      <th className="text-left py-3 px-4">Сумма</th>
                      <th className="text-left py-3 px-4">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b">
                        <td className="py-3 px-4">{payment.date}</td>
                        <td className="py-3 px-4">{payment.description}</td>
                        <td className="py-3 px-4">{payment.amount.toLocaleString()} ₽</td>
                        <td className="py-3 px-4">{getStatusBadge(payment.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cards">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Мои карты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="border rounded-lg p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-lg font-semibold">{card.brand}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-white hover:bg-white/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xl font-mono mb-2">•••• •••• •••• {card.last_four}</div>
                      <div className="text-sm">
                        {String(card.exp_month).padStart(2, "0")}/{card.exp_year}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Добавить новую карту</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Номер карты</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={newCard.number}
                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Месяц</label>
                    <Input
                      placeholder="12"
                      value={newCard.exp_month}
                      onChange={(e) => setNewCard({ ...newCard, exp_month: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Год</label>
                    <Input
                      placeholder="2025"
                      value={newCard.exp_year}
                      onChange={(e) => setNewCard({ ...newCard, exp_year: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <Input
                      placeholder="123"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddCard}>
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить карту
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
