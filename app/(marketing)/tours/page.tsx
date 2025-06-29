import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, MapPin, Calendar, Users } from "lucide-react"
import Link from "next/link"

export default function ToursPage() {
  const tours = [
    {
      id: 1,
      name: "Средиземноморский круиз",
      description: "Откройте для себя красоты Средиземного моря",
      duration: "7 дней",
      capacity: "2000 человек",
      destinations: ["Барселона", "Рим", "Неаполь", "Марсель"],
      price: 45000,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      name: "Карибский круиз",
      description: "Тропический рай ждет вас",
      duration: "10 дней",
      capacity: "3000 человек",
      destinations: ["Майами", "Ямайка", "Багамы", "Мексика"],
      price: 78000,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 3,
      name: "Норвежские фьорды",
      description: "Величественная природа Норвегии",
      duration: "12 дней",
      capacity: "1500 человек",
      destinations: ["Берген", "Гейрангер", "Флом", "Ставангер"],
      price: 89000,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Наши круизы</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите идеальное путешествие из нашей коллекции тщательно отобранных круизов
          </p>
        </div>

        {/* Список туров */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-blue-400 to-blue-600"></div>

              <CardHeader>
                <CardTitle className="text-xl">{tour.name}</CardTitle>
                <p className="text-gray-600">{tour.description}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {tour.duration}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  До {tour.capacity}
                </div>

                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2 mt-0.5" />
                  <div>{tour.destinations.join(" • ")}</div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">{tour.price.toLocaleString()} ₽</span>
                      <span className="text-gray-600 ml-1">с человека</span>
                    </div>

                    <Link href="/auth/register">
                      <Button>Забронировать</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Призыв к действию */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
            <CardContent className="py-12">
              <Ship className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Не нашли подходящий круиз?</h2>
              <p className="text-xl mb-8 text-blue-100">
                Свяжитесь с нами, и мы поможем подобрать идеальное путешествие
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  Связаться с нами
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
