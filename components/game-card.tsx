"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, Users, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { useStore } from "@/lib/store"

interface GameCardProps {
  game: {
    id: string
    title: string
    price: number
    discount?: number
    image: string
    tags: string[]
    rating: number
    players: string
  }
  onBuyNow?: () => void
}

export function GameCard({ game, onBuyNow }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart, togglePaymentModal } = useStore()

  const handleAddToCart = () => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      discount: game.discount || 0,
      image: game.image,
    })
  }

  const handleBuyNow = () => {
    // Primero añadimos al carrito
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      discount: game.discount || 0,
      image: game.image,
    })

    // Luego abrimos el modal de pago
    togglePaymentModal()

    // Si hay una función onBuyNow personalizada, la llamamos también
    if (onBuyNow) {
      onBuyNow()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
    >
      <Card
        className="bg-zinc-800/50 backdrop-blur-sm border-zinc-700/50 overflow-hidden group relative h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-0 transition-opacity duration-500 pointer-events-none ${isHovered ? "opacity-100" : ""}`}
        />

        {/* Border glow */}
        <div
          className={`absolute inset-0 rounded-lg border-2 border-blue-500/0 transition-all duration-500 ${isHovered ? "border-blue-500/70 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : ""}`}
        />

        <div className="aspect-video relative overflow-hidden">
          <Image
            src={game.image || "/placeholder.svg"}
            alt={game.title}
            fill
            className={`object-cover transition-transform duration-700 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          {game.discount && game.discount > 0 && (
            <div className="absolute top-2 right-2 z-10">
              <motion.div
                animate={{
                  scale: isHovered ? [1, 1.1, 1] : 1,
                  rotate: isHovered ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: isHovered ? Number.POSITIVE_INFINITY : 0,
                  repeatDelay: 2,
                }}
              >
                <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 shadow-lg shadow-blue-500/20 font-bold">
                  -{game.discount}%
                </Badge>
              </motion.div>
            </div>
          )}

          {/* Overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/50 to-transparent flex items-end justify-between p-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Button
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20"
              onClick={handleBuyNow}
            >
              Comprar Ahora
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700 hover:border-blue-500 transition-all duration-300"
              onClick={handleAddToCart}
            >
              <motion.div animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }} transition={{ duration: 0.3 }}>
                <ShoppingCart className="w-5 h-5" />
              </motion.div>
            </Button>
          </div>
        </div>

        <CardContent className="p-4 relative z-10">
          <h3 className={`font-semibold mb-1 transition-colors duration-300 ${isHovered ? "text-blue-400" : ""}`}>
            {game.title}
          </h3>

          <div className="flex flex-wrap gap-1 mb-2">
            {game.tags.map((tag, i) => (
              <Badge
                key={i}
                variant="outline"
                className={`text-xs border-zinc-600 transition-all duration-300 ${isHovered ? "border-blue-500/50 bg-blue-500/10" : ""}`}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {game.discount && game.discount > 0 ? (
                <>
                  <span className="line-through text-zinc-500 text-sm">${game.price.toFixed(2)}</span>
                  <span className="font-bold">${(game.price * (1 - game.discount / 100)).toFixed(2)}</span>
                </>
              ) : (
                <span className="font-bold">${game.price.toFixed(2)}</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm">{game.rating}</span>
              </div>
              <div className="text-xs text-zinc-400 flex items-center">
                <Users className="h-3 w-3 mr-1" />
                {game.players}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
