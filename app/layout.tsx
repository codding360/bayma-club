import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "inCruises - Круизные путешествия",
  description: "Путешествуйте с умом. Отдыхайте с комфортом. Лучшие круизы по всему миру.",
  keywords: "круизы, путешествия, отдых, море, туры",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Header />
        {children}

        {/* Футер */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">inCruises</h3>
                <p className="text-gray-400">Ваш надежный партнер в мире круизных путешествий</p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Компания</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="/about" className="hover:text-white">
                      О нас
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:text-white">
                      Контакты
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Карьера
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Услуги</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Круизы
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Экскурсии
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Страхование
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Поддержка</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      Помощь
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      Политика конфиденциальности
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>&copy; 2024 inCruises. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
