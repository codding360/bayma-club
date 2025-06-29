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

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const { error } = await signIn(email, password)

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
          <CardTitle className="text-2xl font-light text-slate-900">Вход в платформу</CardTitle>
          <p className="text-slate-500 font-light">Войдите в свой рабочий кабинет</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="h-12 border-slate-200 focus:border-slate-400 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Пароль"
                required
                className="h-12 border-slate-200 focus:border-slate-400 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 rounded-xl font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Входим..." : "Войти"}
            </Button>
          </form>

          <div className="text-center space-y-4">
            <Link href="/auth/forgot-password" className="text-slate-500 hover:text-slate-700 text-sm font-light">
              Забыли пароль?
            </Link>
            <div className="text-slate-500 font-light">
              Нет аккаунта?{" "}
              <Link href="/auth/register" className="text-slate-900 hover:underline font-medium">
                Зарегистрироваться
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
