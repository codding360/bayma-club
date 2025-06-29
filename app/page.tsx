import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Ship, Globe, Star, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Герой секция */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Добро пожаловать в inCruises</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">Путешествуйте с умом. Отдыхайте с комфортом.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  Узнать больше
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Присоединиться
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы предлагаем уникальный опыт путешествий с максимальным комфортом и выгодой
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Ship className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Лучшие круизы</h3>
                <p className="text-gray-600">Тщательно отобранные маршруты по самым красивым местам мира</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Мировые направления</h3>
                <p className="text-gray-600">Откройте для себя удивительные места по всему миру</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Безопасность</h3>
                <p className="text-gray-600">Ваша безопасность и комфорт - наш главный приоритет</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Отзывы наших клиентов</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Анна Петрова",
                text: "Незабываемое путешествие! Сервис на высшем уровне, все организовано идеально.",
                rating: 5,
              },
              {
                name: "Михаил Иванов",
                text: "Отличные цены и качественное обслуживание. Обязательно воспользуемся снова!",
                rating: 5,
              },
              {
                name: "Елена Сидорова",
                text: "Команда профессионалов! Помогли выбрать идеальный маршрут для всей семьи.",
                rating: 5,
              },
            ].map((review, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{review.text}"</p>
                  <p className="font-semibold text-gray-900">— {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Часто задаваемые вопросы</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Как забронировать круиз?",
                answer: "Зарегистрируйтесь на нашем сайте и выберите подходящий маршрут в личном кабинете.",
              },
              {
                question: "Какие способы оплаты доступны?",
                answer: "Мы принимаем все основные банковские карты и предлагаем рассрочку.",
              },
              {
                question: "Можно ли отменить бронирование?",
                answer: "Да, отмена возможна согласно условиям тарифа. Подробности в личном кабинете.",
              },
            ].map((faq, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-0">
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
