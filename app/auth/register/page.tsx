"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/useAuth"
import { Anchor } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (password !== confirmPassword) {
      setError("Пароли не совпадают")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Пароль должен содержать минимум 6 символов")
      setIsLoading(false)
      return
    }

    const { error } = await signUp(email, password, name)

    if (!error) {
      router.push("/platform")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <Card className="w-full max-w-md shadow-xl border-0">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-slate-900 p-4 rounded-2xl">
              <Anchor className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-light text-slate-900">Создать аккаунт</CardTitle>
          <p className="text-slate-500 font-light">Присоединяйтесь к платформе inCruises</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">{error}</div>
            )}

            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя"
              required
              className="h-12 border-slate-200 focus:border-slate-400 rounded-xl"
            />

            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="h-12 border-slate-200 focus:border-slate-400 rounded-xl"
            />

            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Пароль (минимум 6 символов)"
              required
              className="h-12 border-slate-200 focus:border-slate-400 rounded-xl"
            />

            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите пароль"
              required
              className="h-12 border-slate-200 focus:border-slate-400 rounded-xl"
            />

            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 rounded-xl font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Создаем аккаунт..." : "Создать аккаунт"}
            </Button>
          </form>

          <div className="text-center">
            <div className="text-slate-500 font-light">
              Уже есть аккаунт?{" "}
              <Link href="/auth/login" className="text-slate-900 hover:underline font-medium">
                Войти
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
