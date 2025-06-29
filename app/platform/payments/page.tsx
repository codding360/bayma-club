"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Receipt, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PlatformPaymentsPage() {
  const { toast } = useToast()

  // Replace the useState for payments with API call
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
    fetchCards()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/platform/payments", { credentials: "include"})
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments)
      }
    } catch (error) {
      console.error("Error fetching payments:", error)
    }
  }

  const fetchCards = async () => {
    try {
      const response = await fetch("/api/platform/cards", { credentials: "include"})
      if (response.ok) {
        const data = await response.json()
        setCards(data.cards)
      }
    } catch (error) {
      console.error("Error fetching cards:", error)
    } finally {
      setLoading(false)
    }
  }

  const [cards, setCards] = useState([])

  const [newCard, setNewCard] = useState({
    number: "",
    exp_month: "",
    exp_year: "",
    cvv: "",
  })

  const handleAddCard = async () => {
    if (newCard.number && newCard.exp_month && newCard.exp_year && newCard.cvv) {
      try {
        const response = await fetch("/api/platform/cards", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newCard),
          credentials: "include"
        })

        if (response.ok) {
          const data = await response.json()
          setCards([...cards, data.card])
          setNewCard({ number: "", exp_month: "", exp_year: "", cvv: "" })
          toast({
            title: "Карта добавлена",
            description: "Новая карта успешно добавлена",
          })
        }
      } catch (error) {
        console.error("Error adding card:", error)
      }
    }
  }

  const handleDeleteCard = async (id: number) => {
    try {
      const response = await fetch(`/api/platform/cards/${id}`, {
        method: "DELETE",
        credentials: "include"
      })

      if (response.ok) {
        setCards(cards.filter((card) => card.id !== id))
        toast({
          title: "Карта удалена",
          description: "Карта успешно удалена",
        })
      }
    } catch (error) {
      console.error("Error deleting card:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Завершен</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">В обработке</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Отклонен</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-slate-900">Платежи</h1>
        <p className="text-slate-500 mt-1">Управление платежами и банковскими картами</p>
      </div>

      <Tabs defaultValue="receipts" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100">
          <TabsTrigger value="receipts" className="data-[state=active]:bg-white">
            Список чеков
          </TabsTrigger>
          <TabsTrigger value="cards" className="data-[state=active]:bg-white">
            Карты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="receipts">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium text-slate-900">
                <Receipt className="mr-2 h-5 w-5" />
                История платежей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Дата</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Описание</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Сумма</th>
                      <th className="text-left py-3 px-4 font-medium text-slate-700">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-slate-100">
                        <td className="py-3 px-4 text-slate-900">{payment.date}</td>
                        <td className="py-3 px-4 text-slate-900">{payment.description}</td>
                        <td className="py-3 px-4 font-medium text-slate-900">{payment.amount.toLocaleString()} ₽</td>
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
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium text-slate-900">
                  <CreditCard className="mr-2 h-5 w-5" />
                  Мои карты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards.map((card) => (
                    <div
                      key={card.id}
                      className="border border-slate-200 rounded-xl p-6 bg-gradient-to-br from-slate-900 to-slate-700 text-white relative"
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="text-lg font-medium">{card.brand}</div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                          className="text-white hover:bg-white/20 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="text-xl font-mono mb-4">•••• •••• •••• {card.last_four}</div>
                      <div className="text-sm opacity-80">
                        {String(card.exp_month).padStart(2, "0")}/{card.exp_year}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-900">Добавить новую карту</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Номер карты</label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={newCard.number}
                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                    className="border-slate-200 focus:border-slate-400"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Месяц</label>
                    <Input
                      placeholder="12"
                      value={newCard.exp_month}
                      onChange={(e) => setNewCard({ ...newCard, exp_month: e.target.value })}
                      className="border-slate-200 focus:border-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Год</label>
                    <Input
                      placeholder="2025"
                      value={newCard.exp_year}
                      onChange={(e) => setNewCard({ ...newCard, exp_year: e.target.value })}
                      className="border-slate-200 focus:border-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">CVV</label>
                    <Input
                      placeholder="123"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                      className="border-slate-200 focus:border-slate-400"
                    />
                  </div>
                </div>

                <Button onClick={handleAddCard} className="bg-slate-900 hover:bg-slate-800">
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
