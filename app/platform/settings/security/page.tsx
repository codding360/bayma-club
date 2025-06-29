import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Shield, Key, Smartphone, AlertTriangle } from "lucide-react"

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light text-slate-900">Безопасность</h1>
        <p className="text-slate-500 mt-1">Настройки безопасности и конфиденциальности</p>
      </div>

      {/* Password */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-medium text-slate-900">
            <Key className="mr-2 h-5 w-5" />
            Пароль
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Текущий пароль</label>
            <Input
              type="password"
              placeholder="Введите текущий пароль"
              className="border-slate-200 focus:border-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Новый пароль</label>
            <Input
              type="password"
              placeholder="Введите новый пароль"
              className="border-slate-200 focus:border-slate-400"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Подтвердите новый пароль</label>
            <Input
              type="password"
              placeholder="Подтвердите новый пароль"
              className="border-slate-200 focus:border-slate-400"
            />
          </div>
          <Button className="bg-slate-900 hover:bg-slate-800">Обновить пароль</Button>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-medium text-slate-900">
            <Smartphone className="mr-2 h-5 w-5" />
            Двухфакторная аутентификация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">SMS-уведомления</p>
              <p className="text-sm text-slate-500">Получать коды подтверждения по SMS</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Приложение-аутентификатор</p>
              <p className="text-sm text-slate-500">Использовать Google Authenticator или аналогичное приложение</p>
            </div>
            <Switch />
          </div>
          <Button variant="outline">Настроить аутентификатор</Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-medium text-slate-900">
            <Shield className="mr-2 h-5 w-5" />
            Настройки безопасности
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Уведомления о входе</p>
              <p className="text-sm text-slate-500">Получать уведомления при входе с нового устройства</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Автоматический выход</p>
              <p className="text-sm text-slate-500">Автоматически выходить из системы при неактивности</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900">Блокировка подозрительной активности</p>
              <p className="text-sm text-slate-500">Автоматически блокировать подозрительные попытки входа</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-900">Активные сессии</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">Текущая сессия</p>
                <p className="text-sm text-slate-500">Chrome на Windows • Москва, Россия</p>
                <p className="text-xs text-slate-400">Последняя активность: сейчас</p>
              </div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Активна</span>
            </div>
            <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
              <div>
                <p className="font-medium text-slate-900">Мобильное приложение</p>
                <p className="text-sm text-slate-500">iPhone • Москва, Россия</p>
                <p className="text-xs text-slate-400">Последняя активность: 2 часа назад</p>
              </div>
              <Button variant="outline" size="sm">
                Завершить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-lg font-medium text-red-900">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Опасная зона
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium text-red-900">Удалить аккаунт</p>
            <p className="text-sm text-red-700 mb-4">
              Это действие нельзя отменить. Все ваши данные будут удалены навсегда.
            </p>
            <Button variant="destructive">Удалить аккаунт</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
