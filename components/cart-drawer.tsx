"use client"
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useStore } from "@/lib/store"

export function CartDrawer() {
  const {
    cart,
    isCartOpen,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartCount,
    clearCart,
    togglePaymentModal,
  } = useStore()

  const handleCheckout = () => {
    toggleCart() // Cierra el drawer del carrito
    togglePaymentModal() // Abre el modal de pago
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white relative group">
          <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          {getCartCount() > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-medium text-white">
              {getCartCount()}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[350px] sm:w-[450px] bg-zinc-900 border-zinc-800 p-0">
        <SheetHeader className="p-4 border-b border-zinc-800">
          <SheetTitle className="text-white flex items-center">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Carrito de Compras
          </SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto h-[calc(100vh-180px)] py-4 px-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-400">
              <ShoppingCart className="h-16 w-16 mb-4 opacity-50" />
              <p className="text-lg mb-2">Tu carrito está vacío</p>
              <p className="text-sm text-center">Añade algunos juegos para comenzar</p>
              <SheetClose asChild>
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700">Continuar Comprando</Button>
              </SheetClose>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 py-3">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.title}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-zinc-500 hover:text-white -mt-1 -mr-1"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-zinc-700 rounded-md">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none rounded-l-md p-0"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none rounded-r-md p-0"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          {item.discount > 0 ? (
                            <>
                              <div className="line-through text-zinc-500 text-xs">${item.price.toFixed(2)}</div>
                              <div className="font-bold">${(item.price * (1 - item.discount / 100)).toFixed(2)}</div>
                            </>
                          ) : (
                            <div className="font-bold">${item.price.toFixed(2)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6 bg-zinc-800" />

              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Impuestos</span>
                  <span>${(getCartTotal() * 0.16).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(getCartTotal() * 1.16).toFixed(2)}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t border-zinc-800">
            <div className="grid gap-3">
              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleCheckout}>
                Proceder al Pago
              </Button>
              <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800" onClick={clearCart}>
                <Trash2 className="mr-2 h-4 w-4" />
                Vaciar Carrito
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
