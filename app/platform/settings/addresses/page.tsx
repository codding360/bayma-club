import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Plus, Trash2, Edit } from "lucide-react"

export default function SettingsAddressesPage() {
  const addresses = [
    { id: 1, street: "ул. Морская, д. 10", city: "Москва", postal_code: "125009", country: "Россия", isDefault: true },
    {
      id: 2,
      street: "пр. Невский, д. 25",
      city: "Санкт-Петербург",
      postal_code: "191025",
      country: "Россия",
      isDefault: false,
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Адреса</h1>
          <p className="text-slate-500 mt-1">Управление адресами доставки и выставления счетов</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          Добавить адрес
        </Button>
      </div>

      {/* Addresses List */}
      <div className="space-y-4">
        {addresses.map((address) => (
          <Card key={address.id} className="border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="bg-slate-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-slate-900">{address.street}</h3>
                      {address.isDefault && (
                        <span className="bg-slate-900 text-white px-2 py-1 rounded text-xs">По умолчанию</span>
                      )}
                    </div>
                    <p className="text-slate-600">
                      {address.city}, {address.postal_code}
                    </p>
                    <p className="text-slate-600">{address.country}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add New Address */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Добавить новый адрес</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Улица и дом" className="border-slate-200 focus:border-slate-400" />
            <Input placeholder="Город" className="border-slate-200 focus:border-slate-400" />
            <Input placeholder="Почтовый индекс" className="border-slate-200 focus:border-slate-400" />
            <Input placeholder="Страна" className="border-slate-200 focus:border-slate-400" />
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" />
            Добавить адрес
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
