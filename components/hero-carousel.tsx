"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useStore } from "@/lib/store"

const heroGames = [
  {
    id: "last-of-us-2",
    title: "The Last of Us Part II",
    description:
      "Cinco años después de su peligroso viaje a través de los Estados Unidos post-pandemia, Ellie y Joel se han establecido en Jackson, Wyoming.",
    image: "/placeholder.svg?height=600&width=1400",
    tags: ["Acción", "Aventura", "Exclusivo PS4", "Historia"],
    price: 39.99,
    discountedPrice: 29.99,
    discount: 25,
  },
  {
    id: "ghost-of-tsushima",
    title: "Ghost of Tsushima",
    description:
      "A finales del siglo XIII, el imperio mongol ha devastado naciones enteras. La isla de Tsushima es lo único que se interpone entre Japón continental y una enorme flota de invasión mongola.",
    image: "/placeholder.svg?height=600&width=1400",
    tags: ["Acción", "Mundo Abierto", "Exclusivo PS4", "Samurái"],
    price: 49.99,
    discountedPrice: 34.99,
    discount: 30,
  },
  {
    id: "horizon-zero-dawn",
    title: "Horizon Zero Dawn",
    description:
      "Experimenta la legendaria búsqueda de Aloy para desentrañar los misterios de una Tierra futura gobernada por Máquinas.",
    image: "/placeholder.svg?height=600&width=1400",
    tags: ["RPG", "Mundo Abierto", "Exclusivo PS4", "Post-Apocalíptico"],
    price: 29.99,
    discountedPrice: 14.99,
    discount: 50,
  },
]

export function HeroCarousel({ onBuyNow }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [direction, setDirection] = useState(0)
  const { addToCart, togglePaymentModal } = useStore()

  const nextSlide = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroGames.length)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroGames.length) % heroGames.length)
  }

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        nextSlide()
      }, 6000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const currentGame = heroGames[currentIndex]

  const handleAddToCart = () => {
    addToCart({
      id: currentGame.id,
      title: currentGame.title,
      price: currentGame.price,
      discount: currentGame.discount,
      image: currentGame.image,
    })
  }

  const handleBuyNow = () => {
    // Primero añadimos al carrito
    addToCart({
      id: currentGame.id,
      title: currentGame.title,
      price: currentGame.price,
      discount: currentGame.discount,
      image: currentGame.image,
    })

    // Luego abrimos el modal de pago
    togglePaymentModal()

    // Si hay una función onBuyNow personalizada, la llamamos también
    if (onBuyNow) {
      onBuyNow(currentGame)
    }
  }

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div
      className="relative rounded-xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[21/9] relative">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentGame.image || "/placeholder.svg"}
              alt={currentGame.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:p-10">
              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 mb-3 uppercase tracking-wider">
                    Juego Destacado
                  </Badge>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-3xl md:text-5xl font-bold mb-2 text-white"
                >
                  {currentGame.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-zinc-300 mb-4 text-base md:text-lg"
                >
                  {currentGame.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {currentGame.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-zinc-800/80 hover:bg-zinc-700 transition-colors duration-300"
                    >
                      {tag}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex items-center gap-4 flex-wrap"
                >
                  <Button
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-blue-500/20 text-base md:text-lg py-6 px-8"
                    onClick={handleBuyNow}
                  >
                    Comprar Ahora
                  </Button>

                  <div className="flex items-center gap-2">
                    {currentGame.discount > 0 && (
                      <>
                        <span className="line-through text-zinc-500">${currentGame.price.toFixed(2)}</span>
                        <span className="font-bold text-xl md:text-2xl">${currentGame.discountedPrice.toFixed(2)}</span>
                        <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500">-{currentGame.discount}%</Badge>
                      </>
                    )}
                    {currentGame.discount === 0 && (
                      <span className="font-bold text-xl md:text-2xl">${currentGame.price.toFixed(2)}</span>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {heroGames.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1)
              setCurrentIndex(index)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-blue-500 w-6" : "bg-zinc-600 hover:bg-zinc-400"
            }`}
            aria-label={`Ir a diapositiva ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
        aria-label="Diapositiva anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
        aria-label="Siguiente diapositiva"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  )
}
