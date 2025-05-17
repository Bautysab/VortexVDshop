"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Calendar, Lock, User, MapPin, CheckCircle2 } from "lucide-react"
import { useStore } from "@/lib/store"

export function PaymentModal() {
  const { isPaymentModalOpen, togglePaymentModal, clearCart } = useStore()
  const [paymentStep, setPaymentStep] = useState(1)
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    postalCode: "",
    country: "España",
  })
  const [errors, setErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    // Formateo específico para el número de tarjeta
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
        .slice(0, 19)

      setFormData({ ...formData, [name]: formatted })
      return
    }

    // Formateo para fecha de expiración
    if (name === "expiryDate") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5)

      setFormData({ ...formData, [name]: formatted })
      return
    }

    // Formateo para CVV (solo números, máximo 3-4 dígitos)
    if (name === "cvv") {
      const formatted = value.replace(/\D/g, "").slice(0, 4)
      setFormData({ ...formData, [name]: formatted })
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Introduce un número de tarjeta válido"
    }

    if (!formData.cardName) {
      newErrors.cardName = "Introduce el nombre del titular"
    }

    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Formato MM/AA requerido"
    }

    if (!formData.cvv || formData.cvv.length < 3) {
      newErrors.cvv = "Introduce un CVV válido"
    }

    if (paymentStep === 2) {
      if (!formData.address) {
        newErrors.address = "Introduce tu dirección"
      }

      if (!formData.city) {
        newErrors.city = "Introduce tu ciudad"
      }

      if (!formData.postalCode) {
        newErrors.postalCode = "Introduce tu código postal"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateForm()) {
      setPaymentStep(2)
    }
  }

  const handlePreviousStep = () => {
    setPaymentStep(1)
  }

  const handleSubmit = () => {
    if (validateForm()) {
      setIsProcessing(true)

      // Simulación de procesamiento de pago
      setTimeout(() => {
        setIsProcessing(false)
        setPaymentStep(3) // Paso de confirmación
      }, 2000)
    }
  }

  const handleClose = () => {
    if (paymentStep === 3) {
      clearCart()
    }
    togglePaymentModal()
    setTimeout(() => {
      setPaymentStep(1)
      setFormData({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        address: "",
        city: "",
        postalCode: "",
        country: "España",
      })
      setErrors({})
    }, 300)
  }

  return (
    <Dialog open={isPaymentModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {paymentStep === 3 ? "¡Pago Completado!" : "Información de Pago"}
          </DialogTitle>
          {paymentStep !== 3 && (
            <DialogDescription className="text-zinc-400">
              {paymentStep === 1
                ? "Introduce los datos de tu tarjeta para completar la compra"
                : "Introduce tu dirección de facturación"}
            </DialogDescription>
          )}
        </DialogHeader>

        {paymentStep === 1 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="cardNumber" className="text-white">
                Número de Tarjeta
              </Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="pl-10 bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                  value={formData.cardNumber}
                  onChange={handleChange}
                />
              </div>
              {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName" className="text-white">
                Nombre del Titular
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="NOMBRE APELLIDOS"
                  className="pl-10 bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                  value={formData.cardName}
                  onChange={handleChange}
                />
              </div>
              {errors.cardName && <p className="text-red-500 text-sm">{errors.cardName}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate" className="text-white">
                  Fecha de Vencimiento
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/AA"
                    className="pl-10 bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cvv" className="text-white">
                  CVV
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                  <Input
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    className="pl-10 bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
              </div>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Métodos de pago aceptados:</span>
              </div>
              <div className="flex space-x-2">
                <div className="bg-zinc-800 rounded p-1 border border-zinc-700">
                  <img src="/placeholder.svg?height=30&width=40" alt="Visa" className="h-6" />
                </div>
                <div className="bg-zinc-800 rounded p-1 border border-zinc-700">
                  <img src="/placeholder.svg?height=30&width=40" alt="Mastercard" className="h-6" />
                </div>
                <div className="bg-zinc-800 rounded p-1 border border-zinc-700">
                  <img src="/placeholder.svg?height=30&width=40" alt="American Express" className="h-6" />
                </div>
                <div className="bg-zinc-800 rounded p-1 border border-zinc-700">
                  <img src="/placeholder.svg?height=30&width=40" alt="PayPal" className="h-6" />
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentStep === 2 && (
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="address" className="text-white">
                Dirección
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                <Input
                  id="address"
                  name="address"
                  placeholder="Calle, número, piso"
                  className="pl-10 bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">
                  Ciudad
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Ciudad"
                  className="bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode" className="text-white">
                  Código Postal
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="28001"
                  className="bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                  value={formData.postalCode}
                  onChange={handleChange}
                />
                {errors.postalCode && <p className="text-red-500 text-sm">{errors.postalCode}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-white">
                País
              </Label>
              <Input
                id="country"
                name="country"
                className="bg-zinc-800 border-zinc-700 focus-visible:ring-blue-500"
                value={formData.country}
                onChange={handleChange}
                disabled
              />
            </div>

            <Separator className="my-4 bg-zinc-800" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Resumen de tarjeta:</span>
              </div>
              <div className="bg-zinc-800 p-3 rounded-md border border-zinc-700">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-zinc-300">{formData.cardNumber || "•••• •••• •••• ••••"}</p>
                    <p className="text-xs text-zinc-500 mt-1">{formData.cardName || "NOMBRE DEL TITULAR"}</p>
                  </div>
                  <div>
                    <img src="/placeholder.svg?height=30&width=40" alt="Card" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentStep === 3 && (
          <div className="py-6 flex flex-col items-center justify-center text-center">
            <div className="bg-blue-500/20 p-4 rounded-full mb-4">
              <CheckCircle2 className="h-16 w-16 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">¡Pago Realizado con Éxito!</h3>
            <p className="text-zinc-400 mb-6">
              Tu pedido ha sido procesado correctamente. Recibirás un correo electrónico con los detalles de tu compra.
            </p>
            <div className="bg-zinc-800 p-4 rounded-md w-full border border-zinc-700 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-zinc-400">Número de pedido:</span>
                <span className="font-medium">
                  #VX
                  {Math.floor(Math.random() * 10000)
                    .toString()
                    .padStart(4, "0")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Fecha:</span>
                <span className="font-medium">{new Date().toLocaleDateString("es-ES")}</span>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {paymentStep === 1 && (
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleNextStep}>
              Continuar
            </Button>
          )}

          {paymentStep === 2 && (
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                className="flex-1 border-zinc-700 hover:bg-zinc-800"
                onClick={handlePreviousStep}
              >
                Volver
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={handleSubmit} disabled={isProcessing}>
                {isProcessing ? "Procesando..." : "Completar Pago"}
              </Button>
            </div>
          )}

          {paymentStep === 3 && (
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={handleClose}>
              Volver a la Tienda
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
