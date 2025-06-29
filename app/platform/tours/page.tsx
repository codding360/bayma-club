import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Ship, Plus } from "lucide-react"

export default function PlatformToursPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Туры</h1>
          <p className="text-slate-500 mt-1">Управление круизными турами</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          Добавить тур
        </Button>
      </div>

      {/* Empty State */}
      <Card className="border-slate-200">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <Ship className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Раздел в разработке</h3>
          <p className="text-slate-500 text-center max-w-md">
            Функционал управления турами будет доступен в ближайшее время. Следите за обновлениями платформы.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
