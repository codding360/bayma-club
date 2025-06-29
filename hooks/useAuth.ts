"use client"

import { useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useToast } from "@/hooks/use-toast"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const supabase = createClientComponentClient()

  useEffect(() => {
    // Получаем текущего пользователя
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    // Слушаем изменения аутентификации
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log(error?.code)
    console.log(error?.message)


    if(error?.code === "email_not_confirmed"){
      toast({
        variant: "destructive",
        title: "Почта не потверждена!",
        description: "Что бы продолжить потвердите почту!",
      })
    }else if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка входа",
        description: "Неверный email или пароль",
      })
    } else {
      toast({
        variant: "success",
        title: "Добро пожаловать!",
        description: "Вы успешно вошли в систему",
      })
    }

    return { error }
  }

  const signUp = async (email: string, password: string, name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    })

    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка регистрации",
        description:
          error.message === "User already registered"
            ? "Пользователь с таким email уже существует"
            : "Произошла ошибка при регистрации",
      })
    } else {
      toast({
        variant: "success",
        title: "Регистрация успешна!",
        description: "Что бы продолжить потвердите почту!",
      })
    }

    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      toast({
        title: "До свидания!",
        description: "Вы успешно вышли из системы",
      })
    }

    return { error }
  }

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }
}
