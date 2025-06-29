import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ship } from "lucide-react"

export default function ToursPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Туры</h1>
        <p className="text-gray-600 mt-2">Управление круизными турами</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Ship className="mr-2 h-5 w-5" />
            Круизные туры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <Ship className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Раздел в разработке</h3>
            <p className="text-gray-600">Функционал управления турами будет доступен в ближайшее время</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
