"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Ship, Settings, CreditCard, User, LogOut, Anchor } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Туры",
    href: "/dashboard/tours",
    icon: Ship,
  },
  {
    name: "Настройки",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Платежи",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Логотип */}
      <div className="flex items-center px-6 py-4 border-b border-gray-700">
        <Link href="/" className="flex items-center space-x-2">
          <Anchor className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold">inCruises</span>
        </Link>
      </div>

      {/* Навигация */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Профиль пользователя */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-blue-600 rounded-full p-2">
            <User className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.user_metadata?.name || user?.email}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email}</p>
          </div>
        </div>

        <Button
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="w-full text-gray-300 border-gray-600 hover:bg-gray-800 bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>
    </div>
  )
}
