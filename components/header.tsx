"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Anchor } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link href="/" className="flex items-center space-x-2">
            <Anchor className="h-8 w-8" />
            <span className="text-xl font-bold">inCruises</span>
          </Link>

          {/* Навигация для десктопа */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition-colors">
              Главная
            </Link>
            <Link href="/about" className="hover:text-blue-200 transition-colors">
              О нас
            </Link>
            <Link href="/tours" className="hover:text-blue-200 transition-colors">
              Туры
            </Link>
            <Link href="/contact" className="hover:text-blue-200 transition-colors">
              Контакты
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link href="/platform">
                  <Button className="bg-white text-blue-900 hover:bg-blue-50">Платформа</Button>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-900 bg-transparent"
                >
                  Выйти
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-900 bg-transparent"
                  >
                    Вход
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-white text-blue-900 hover:bg-blue-50">Регистрация</Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Мобильное меню */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Мобильная навигация */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-600">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                Главная
              </Link>
              <Link href="/about" className="hover:text-blue-200 transition-colors">
                О нас
              </Link>
              <Link href="/tours" className="hover:text-blue-200 transition-colors">
                Туры
              </Link>
              <Link href="/contact" className="hover:text-blue-200 transition-colors">
                Контакты
              </Link>

              {user ? (
                <div className="flex flex-col space-y-2">
                  <Link href="/platform">
                    <Button className="bg-white text-blue-900 hover:bg-blue-50 w-full">Платформа</Button>
                  </Link>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-blue-900 w-full bg-transparent"
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link href="/auth/login">
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-blue-900 w-full bg-transparent"
                    >
                      Вход
                    </Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="bg-white text-blue-900 hover:bg-blue-50 w-full">Регистрация</Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
