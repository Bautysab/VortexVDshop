"use client"

import { Bell, Check } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useStore } from "@/lib/store"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export function NotificationsDrawer() {
  const {
    notifications,
    isNotificationsOpen,
    toggleNotifications,
    markNotificationAsRead,
    getUnreadNotificationsCount,
  } = useStore()

  const handleMarkAllAsRead = () => {
    notifications.forEach((notification) => {
      markNotificationAsRead(notification.id)
    })
  }

  return (
    <Sheet open={isNotificationsOpen} onOpenChange={toggleNotifications}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white relative group">
          <Bell className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          {getUnreadNotificationsCount() > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
              {getUnreadNotificationsCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[450px] bg-zinc-900 border-zinc-800 p-0">
        <SheetHeader className="p-4 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-white flex items-center">
              <Bell className="mr-2 h-5 w-5" />
              Notificaciones
            </SheetTitle>
            {getUnreadNotificationsCount() > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 h-8"
                onClick={handleMarkAllAsRead}
              >
                <Check className="mr-1 h-4 w-4" />
                Marcar todo como leído
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="overflow-y-auto h-[calc(100vh-120px)] py-4">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400 p-4">
              <Bell className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg mb-2">No tienes notificaciones</p>
            </div>
          ) : (
            <div className="space-y-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-zinc-800/50 transition-colors relative ${notification.read ? "opacity-70" : ""}`}
                  onClick={() => markNotificationAsRead(notification.id)}
                >
                  {!notification.read && <div className="absolute left-2 top-5 w-2 h-2 rounded-full bg-blue-500"></div>}
                  <div className="pl-3">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-zinc-500">
                        {formatDistanceToNow(new Date(notification.date), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">{notification.message}</p>
                  </div>
                  <Separator className="mt-4 bg-zinc-800" />
                </div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
