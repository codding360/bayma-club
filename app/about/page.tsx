import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">О компании inCruises</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы создаем незабываемые морские путешествия, объединяя роскошь, комфорт и доступность
          </p>
        </div>

        {/* Миссия */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-2xl p-12">
            <div className="max-w-4xl mx-auto text-center">
              <Target className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6">Наша миссия</h2>
              <p className="text-xl leading-relaxed">
                Сделать круизные путешествия доступными для каждого, предоставляя исключительный сервис и создавая
                воспоминания, которые останутся на всю жизнь. Мы верим, что каждый заслуживает возможности исследовать
                мир с комфортом и стилем.
              </p>
            </div>
          </div>
        </section>

        {/* Ценности */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-lg text-gray-600">Принципы, которыми мы руководствуемся в работе</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Клиентоориентированность</h3>
                <p className="text-gray-600">Потребности наших клиентов всегда на первом месте</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Качество</h3>
                <p className="text-gray-600">Высочайшие стандарты во всем, что мы делаем</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Забота</h3>
                <p className="text-gray-600">Мы заботимся о каждом клиенте как о члене семьи</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Инновации</h3>
                <p className="text-gray-600">Постоянно совершенствуем наши услуги</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* История */}
        <section className="mb-20">
          <div className="bg-gray-50 rounded-2xl p-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Наша история</h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2018
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Основание компании</h3>
                    <p className="text-gray-600">
                      inCruises была основана с целью революционизировать индустрию круизных путешествий, делая их более
                      доступными и персонализированными.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2020
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Расширение географии</h3>
                    <p className="text-gray-600">
                      Мы расширили наше присутствие на международные рынки и заключили партнерства с ведущими круизными
                      компаниями мира.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold">
                    2023
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Цифровая трансформация</h3>
                    <p className="text-gray-600">
                      Запуск новой цифровой платформы, которая делает бронирование круизов еще более простым и удобным
                      для наших клиентов.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Команда */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-lg text-gray-600">Профессионалы, которые делают ваши путешествия незабываемыми</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Александр Морской",
                position: "Генеральный директор",
                description: "15 лет опыта в туристической индустрии",
              },
              {
                name: "Марина Волнова",
                position: "Директор по развитию",
                description: "Эксперт по круизным направлениям",
              },
              {
                name: "Николай Якорев",
                position: "Руководитель сервиса",
                description: "Отвечает за качество обслуживания клиентов",
              },
            ].map((member, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
