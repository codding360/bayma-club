import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

export default function CreateTourPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/platform/tours">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад к турам
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-light text-slate-900">Создать новый тур</h1>
            <p className="text-slate-500 mt-1">Добавьте новый круизный тур в систему</p>
          </div>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Save className="mr-2 h-4 w-4" />
          Сохранить тур
        </Button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Основная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Название тура</Label>
                <Input
                  id="name"
                  placeholder="Например: Средиземноморский круиз"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  placeholder="Подробное описание тура..."
                  rows={4}
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="duration">Продолжительность</Label>
                  <Input id="duration" placeholder="7 дней" className="border-slate-200 focus:border-slate-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="capacity">Вместимость</Label>
                  <Input id="capacity" placeholder="2000 человек" className="border-slate-200 focus:border-slate-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Маршрут</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="destinations">Пункты назначения</Label>
                <Textarea
                  id="destinations"
                  placeholder="Барселона, Рим, Неаполь, Марсель..."
                  rows={3}
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Настройки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Категория</Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:border-slate-400">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mediterranean">Средиземноморье</SelectItem>
                    <SelectItem value="caribbean">Карибы</SelectItem>
                    <SelectItem value="northern">Северные моря</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Цена (₽)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="45000"
                  className="border-slate-200 focus:border-slate-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Select>
                  <SelectTrigger className="border-slate-200 focus:border-slate-400">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="active">Активный</SelectItem>
                    <SelectItem value="archived">Архивный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-slate-900">Изображение</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center">
                <p className="text-slate-500">Перетащите изображение сюда или нажмите для выбора</p>
                <Button variant="outline" className="mt-2 bg-transparent">
                  Выбрать файл
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
