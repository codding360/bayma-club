"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Ship, Settings, CreditCard, BarChart3, LogOut, User, Globe } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"

const navigation = [
  {
    name: "Обзор",
    href: "/platform",
    icon: BarChart3,
  },
  {
    name: "Туры",
    href: "/platform/tours",
    icon: Ship,
  },
  {
    name: "Платежи",
    href: "/platform/payments/reports",
    icon: CreditCard,
    subpages: [
      {
        name: "Квитанции",
        href: "/platform/payments/reports",
      },
      {
        name: "Карты",
        href: "/platform/payments/cards",
      },
    ],
  },
  {
    name: "Настройки",
    href: "/platform/settings",
    icon: Settings,
    subpages: [
      {
        name: "Профиль",
        href: "/platform/settings",
      },
      {
        name: "Адреса",
        href: "/platform/settings/addresses",
      },
      {
        name: "Безопасность",
        href: "/platform/settings/security",
      },
    ],
  },
]

const secondaryNavigation = [
  {
    name: "На сайт",
    href: "/",
    icon: Globe,
  },
]

export default function PlatformSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <div className="flex flex-col w-64 bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="flex items-center px-6 py-8">
        <div className="bg-slate-900 p-2 rounded-lg">
          <Ship className="h-6 w-6 text-white" />
        </div>
        <span className="ml-3 text-xl font-light text-slate-900">inCruises</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const isParentActive = item.subpages?.some((sub) => pathname === sub.href) || false
          const showSubpages =
            isActive || isParentActive || (item.subpages && item.subpages.some((sub) => pathname.startsWith(sub.href)))

          return (
            <div key={item.name} className="space-y-1">
              <Link
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive || isParentActive
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>

              {/* Subpages */}
              {item.subpages && showSubpages && (
                <div className="ml-8 space-y-1">
                  {item.subpages.map((subpage) => {
                    const isSubActive = pathname === subpage.href
                    return (
                      <Link
                        key={subpage.name}
                        href={subpage.href}
                        className={cn(
                          "flex items-center px-4 py-2 text-sm rounded-lg transition-colors",
                          isSubActive
                            ? "bg-slate-100 text-slate-900 font-medium"
                            : "text-slate-500 hover:bg-slate-50 hover:text-slate-700",
                        )}
                      >
                        <div className="w-2 h-2 rounded-full bg-slate-300 mr-3" />
                        {subpage.name}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}

        <div className="pt-4 mt-4 border-t border-slate-200">
          {secondaryNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* User Profile */}
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-slate-100 rounded-full p-2">
            <User className="h-5 w-5 text-slate-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{user?.user_metadata?.name || "Пользователь"}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
        </div>

        <Button
          onClick={handleSignOut}
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-600 hover:text-slate-900 hover:bg-slate-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Выйти
        </Button>
      </div>
    </div>
  )
}
