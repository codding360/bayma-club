"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/hooks/useAuth"
import { User, MapPin, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PlatformSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()

  const [profile, setProfile] = useState({
    name: user?.user_metadata?.name || "",
    email: user?.email || "",
    phone: "",
  })

  const [addresses, setAddresses] = useState([
    { id: 1, street: "ул. Морская, д. 10", city: "Москва", postal_code: "125009", country: "Россия" },
  ])

  const [newAddress, setNewAddress] = useState({
    street: "",
    city: "",
    postal_code: "",
    country: "",
  })

  const handleProfileSave = async () => {
    toast({
      variant: "success",
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
    })
  }

  const handleAddAddress = () => {
    if (newAddress.street && newAddress.city) {
      setAddresses([
        ...addresses,
        {
          id: Date.now(),
          ...newAddress,
        },
      ])
      setNewAddress({ street: "", city: "", postal_code: "", country: "" })
      toast({
        variant: "success",
        title: "Адрес добавлен",
        description: "Новый адрес успешно добавлен",
      })
    }
  }

  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
    toast({
      title: "Адрес удален",
      description: "Адрес успешно удален из списка",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-slate-900">Настройки</h1>
        <p className="text-slate-500 mt-1">Управление профилем и настройками аккаунта</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-slate-100">
          <TabsTrigger value="profile" className="data-[state=active]:bg-white">
            Профиль
          </TabsTrigger>
          <TabsTrigger value="addresses" className="data-[state=active]:bg-white">
            Адреса
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="flex items-center text-lg font-medium text-slate-900">
                <User className="mr-2 h-5 w-5" />
                Профиль пользователя
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Имя</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    placeholder="Ваше имя"
                    className="border-slate-200 focus:border-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    placeholder="your@email.com"
                    type="email"
                    className="border-slate-200 focus:border-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Телефон</label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    className="border-slate-200 focus:border-slate-400"
                  />
                </div>
              </div>

              <Button onClick={handleProfileSave} className="bg-slate-900 hover:bg-slate-800">
                Сохранить изменения
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="addresses">
          <div className="space-y-6">
            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg font-medium text-slate-900">
                  <MapPin className="mr-2 h-5 w-5" />
                  Мои адреса
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-slate-900">{address.street}</p>
                        <p className="text-sm text-slate-500">
                          {address.city}, {address.postal_code}, {address.country}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg font-medium text-slate-900">Добавить новый адрес</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Улица и дом"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({ ...newAddress, street: e.target.value })}
                    className="border-slate-200 focus:border-slate-400"
                  />
                  <Input
                    placeholder="Город"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="border-slate-200 focus:border-slate-400"
                  />
                  <Input
                    placeholder="Почтовый индекс"
                    value={newAddress.postal_code}
                    onChange={(e) => setNewAddress({ ...newAddress, postal_code: e.target.value })}
                    className="border-slate-200 focus:border-slate-400"
                  />
                  <Input
                    placeholder="Страна"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    className="border-slate-200 focus:border-slate-400"
                  />
                </div>
                <Button onClick={handleAddAddress} className="bg-slate-900 hover:bg-slate-800">
                  <Plus className="mr-2 h-4 w-4" />
                  Добавить адрес
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
