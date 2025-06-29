import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2 } from "lucide-react"

export default function TourCategoriesPage() {
  const categories = [
    { id: 1, name: "Средиземноморье", tours: 12, color: "bg-blue-100 text-blue-800" },
    { id: 2, name: "Карибы", tours: 8, color: "bg-green-100 text-green-800" },
    { id: 3, name: "Северные моря", tours: 5, color: "bg-purple-100 text-purple-800" },
    { id: 4, name: "Балтийское море", tours: 3, color: "bg-orange-100 text-orange-800" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Категории туров</h1>
          <p className="text-slate-500 mt-1">Управление категориями круизных туров</p>
        </div>
        <Button className="bg-slate-900 hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          Добавить категорию
        </Button>
      </div>

      {/* Search */}
      <Card className="border-slate-200">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input placeholder="Поиск категорий..." className="pl-10 border-slate-200 focus:border-slate-400" />
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="border-slate-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-slate-900">{category.name}</CardTitle>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Badge className={category.color}>
                  {category.tours} {category.tours === 1 ? "тур" : "туров"}
                </Badge>
                <p className="text-sm text-slate-500">Категория включает в себя различные маршруты и направления</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for New Category */}
      <Card className="border-slate-200 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="bg-slate-100 p-4 rounded-full mb-4">
            <Plus className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Создать новую категорию</h3>
          <p className="text-slate-500 text-center max-w-md mb-4">
            Добавьте новую категорию для лучшей организации ваших туров
          </p>
          <Button className="bg-slate-900 hover:bg-slate-800">
            <Plus className="mr-2 h-4 w-4" />
            Добавить категорию
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
