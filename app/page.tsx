"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Heart,
  Zap,
  Clock,
  Award,
  Tag,
  Percent,
  Flame,
  TrendingUp,
  Trophy,
  Sparkles,
  Gamepad2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchDialog } from "@/components/search-dialog"
import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedBackground } from "@/components/animated-background"
import { HeroCarousel } from "@/components/hero-carousel"
import { GameCard } from "@/components/game-card"
import { SpecialOfferCard } from "@/components/special-offer-card"
import { CategoryCard } from "@/components/category-card"
import { CartDrawer } from "@/components/cart-drawer"
import { NotificationsDrawer } from "@/components/notifications-drawer"
import { CategoryFilter } from "@/components/category-filter"
import { PaymentModal } from "@/components/payment-modal"
import { useStore } from "@/lib/store"

export default function Home() {
  const { selectedCategory, addToCart, togglePaymentModal } = useStore()

  // Game data
  const allGames = [
    {
      id: "god-of-war",
      title: "God of War",
      price: 39.99,
      discount: 25,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Acción", "Aventura", "Exclusivo PS4"],
      rating: 4.9,
      players: "Un jugador",
      category: "action",
    },
    {
      id: "last-of-us-2",
      title: "The Last of Us Part II",
      price: 49.99,
      discount: 0,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Acción", "Aventura", "Exclusivo PS4"],
      rating: 4.8,
      players: "Un jugador",
      category: "adventure",
    },
    {
      id: "ghost-of-tsushima",
      title: "Ghost of Tsushima",
      price: 59.99,
      discount: 30,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Acción", "Mundo Abierto", "Exclusivo PS4"],
      rating: 4.7,
      players: "Un jugador",
      category: "action",
    },
    {
      id: "horizon-zero-dawn",
      title: "Horizon Zero Dawn",
      price: 29.99,
      discount: 50,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["RPG", "Mundo Abierto", "Exclusivo PS4"],
      rating: 4.6,
      players: "Un jugador",
      category: "rpg",
    },
    {
      id: "fifa-23",
      title: "FIFA 23",
      price: 29.99,
      discount: 0,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Deportes", "Fútbol", "Multijugador"],
      rating: 4.3,
      players: "Un jugador/Multi",
      category: "sports",
    },
    {
      id: "call-of-duty",
      title: "Call of Duty: Modern Warfare",
      price: 39.99,
      discount: 15,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["FPS", "Acción", "Multijugador"],
      rating: 4.5,
      players: "Un jugador/Multi",
      category: "action",
    },
    {
      id: "fortnite",
      title: "Fortnite",
      price: 0,
      discount: 0,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["Battle Royale", "Gratuito", "Multijugador"],
      rating: 4.4,
      players: "Multijugador",
      category: "action",
    },
    {
      id: "assassins-creed",
      title: "Assassin's Creed Valhalla",
      price: 49.99,
      discount: 20,
      image: "/placeholder.svg?height=300&width=600",
      tags: ["RPG de Acción", "Mundo Abierto", "Vikingos"],
      rating: 4.6,
      players: "Un jugador",
      category: "rpg",
    },
  ]

  // Filter games based on selected category
  const filteredGames = selectedCategory ? allGames.filter((game) => game.category === selectedCategory) : allGames

  const featuredGames = filteredGames.slice(0, 4)
  const updatedGames = filteredGames.slice(4, 8)

  const specialOffers = [
    {
      title: "Venta de Exclusivos PlayStation",
      discount: "Hasta 70% DESCUENTO",
      image: "/placeholder.svg?height=300&width=600",
      endDate: "5 de Mayo",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "Festival de Juegos de Primavera",
      discount: "Hasta 80% DESCUENTO",
      image: "/placeholder.svg?height=300&width=600",
      endDate: "5 de Mayo",
      gradient: "from-green-500 to-yellow-500",
    },
    {
      title: "Destacados Juegos Indie",
      discount: "35% DESCUENTO",
      image: "/placeholder.svg?height=300&width=600",
      endDate: "Oferta del día",
      gradient: "from-red-500 to-orange-500",
    },
  ]

  const categories = [
    { name: "Acción", icon: <Zap className="h-8 w-8" />, color: "from-red-500 to-orange-500" },
    { name: "Aventura", icon: <Gamepad2 className="h-8 w-8" />, color: "from-emerald-500 to-teal-500" },
    { name: "RPG", icon: <Award className="h-8 w-8" />, color: "from-purple-500 to-indigo-500" },
    { name: "Deportes", icon: <Trophy className="h-8 w-8" />, color: "from-blue-500 to-cyan-500" },
    { name: "Carreras", icon: <Tag className="h-8 w-8" />, color: "from-amber-500 to-yellow-500" },
    { name: "Exclusivos", icon: <Sparkles className="h-8 w-8" />, color: "from-blue-600 to-indigo-600" },
  ]

  const handleBuyNow = (game) => {
    addToCart({
      id: game.id,
      title: game.title,
      price: game.price,
      discount: game.discount,
      image: game.image,
    })
    togglePaymentModal()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-white">
      <AnimatedBackground />
      <PaymentModal />

      <header className="sticky top-0 z-50 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="relative w-8 h-8 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 group-hover:from-blue-400 group-hover:to-indigo-400 transition-all duration-300">
                  <Image
                    src="/placeholder.svg?height=32&width=32"
                    alt="VortexShop Logo"
                    width={32}
                    height={32}
                    className="w-8 h-8 scale-90 group-hover:scale-100 transition-transform duration-300"
                  />
                </div>
                <span className="font-bold text-xl tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                  VORTEXSHOP
                </span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="#"
                  className="text-white hover:text-blue-400 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300"
                >
                  Tienda
                </Link>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300"
                >
                  Biblioteca
                </Link>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300"
                >
                  Comunidad
                </Link>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300"
                >
                  Noticias
                </Link>
                <Link
                  href="#"
                  className="text-zinc-400 hover:text-white font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-400 after:transition-all after:duration-300"
                >
                  Soporte
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block w-64 group">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-blue-400 transition-colors duration-300" />
                <Input
                  placeholder="Buscar juegos, editores..."
                  className="pl-8 bg-zinc-800/50 border-zinc-700 focus-visible:border-blue-500 focus-visible:ring-blue-500/20 transition-all duration-300"
                />
              </div>
              <SearchDialog />
              <NotificationsDrawer />
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white group">
                <Heart className="h-5 w-5 group-hover:scale-110 group-hover:text-rose-500 transition-all duration-300" />
              </Button>
              <CartDrawer />
              <ThemeToggle />
              <Avatar className="h-8 w-8 border border-zinc-700 ring-2 ring-blue-500/20 hover:ring-blue-500/50 transition-all duration-300">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500">US</AvatarFallback>
              </Avatar>
              <MobileMenu />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <div className="space-y-6 sticky top-24">
              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
                <h3 className="font-medium text-blue-400 mb-3 flex items-center">
                  <Flame className="mr-2 h-4 w-4" />
                  DESCUBRIR
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="#"
                      className="flex items-center text-white hover:text-blue-400 transition-colors duration-300 group"
                    >
                      <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Nuevos Lanzamientos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center text-zinc-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Award className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Más Vendidos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center text-zinc-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Clock className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Próximamente</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center text-zinc-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Percent className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Ofertas y Descuentos</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="flex items-center text-zinc-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Sparkles className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>Exclusivos PS4</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
                <CategoryFilter />
              </div>

              <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/50">
                <h3 className="font-medium text-blue-400 mb-3 flex items-center">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  ETIQUETAS POPULARES
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["Mundo Abierto", "RPG", "Exclusivo PS4", "Acción", "Aventura", "Multijugador", "Supervivencia"].map(
                    (tag, index) => (
                      <Badge
                        key={index}
                        className="bg-zinc-700/50 hover:bg-blue-500 transition-colors duration-300 cursor-pointer"
                      >
                        {tag}
                      </Badge>
                    ),
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Carousel */}
            <section className="mb-10">
              <HeroCarousel onBuyNow={handleBuyNow} />
            </section>

            {/* Featured & Recommended */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-blue-400" />
                  Destacados y Recomendados
                </h2>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 hover:border-blue-500 transition-all duration-300"
                >
                  Ver Todos
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredGames.map((game, index) => (
                  <GameCard key={index} game={game} onBuyNow={() => handleBuyNow(game)} />
                ))}
              </div>
            </section>

            {/* Special Offers */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Percent className="mr-2 h-5 w-5 text-blue-400" />
                  Ofertas Especiales
                </h2>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 hover:border-blue-500 transition-all duration-300"
                >
                  Ver Todas
                </Button>
              </div>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="bg-zinc-800/50 backdrop-blur-sm mb-6 p-1 border border-zinc-700/50 rounded-lg">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    Todas las Ofertas
                  </TabsTrigger>
                  <TabsTrigger
                    value="weekend"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    Ofertas de Fin de Semana
                  </TabsTrigger>
                  <TabsTrigger
                    value="publisher"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    Ventas de Editores
                  </TabsTrigger>
                  <TabsTrigger
                    value="seasonal"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white rounded-md transition-all duration-300"
                  >
                    Temporada
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="all" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {specialOffers.map((deal, index) => (
                      <SpecialOfferCard key={index} deal={deal} />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="weekend" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Weekend deals content */}
                    <SpecialOfferCard
                      deal={{
                        title: "Festival de Juegos de Primavera",
                        discount: "Hasta 80% DESCUENTO",
                        image: "/placeholder.svg?height=300&width=600",
                        endDate: "5 de Mayo",
                        gradient: "from-green-500 to-yellow-500",
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="publisher" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Publisher sales content */}
                    <SpecialOfferCard
                      deal={{
                        title: "Venta de Exclusivos PlayStation",
                        discount: "Hasta 70% DESCUENTO",
                        image: "/placeholder.svg?height=300&width=600",
                        endDate: "5 de Mayo",
                        gradient: "from-blue-500 to-indigo-500",
                      }}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="seasonal" className="mt-0">
                  {/* Seasonal content */}
                  <div className="p-8 text-center text-zinc-400 bg-zinc-800/30 backdrop-blur-sm rounded-xl border border-zinc-700/50">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-blue-400 opacity-50" />
                    <p className="text-lg">No hay ventas de temporada activas en este momento.</p>
                    <p className="mt-2">¡Vuelve pronto para nuestra Venta de Verano!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </section>

            {/* Categories Browse */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Tag className="mr-2 h-5 w-5 text-blue-400" />
                  Explorar por Categoría
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map((category, index) => (
                  <CategoryCard key={index} category={category} />
                ))}
              </div>
            </section>

            {/* Recently Updated */}
            <section className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-blue-400" />
                  Recientemente Actualizados
                </h2>
                <Button
                  variant="outline"
                  className="border-zinc-700 hover:bg-zinc-800 hover:border-blue-500 transition-all duration-300"
                >
                  Ver Todos
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {updatedGames.map((game, index) => (
                  <GameCard key={index} game={game} onBuyNow={() => handleBuyNow(game)} />
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>

      <footer className="bg-zinc-900/80 backdrop-blur-md border-t border-zinc-800/50 mt-12 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4 text-blue-400">SOBRE VORTEXSHOP</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Acerca de
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Carreras
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Prensa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Socios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Tarjetas de Regalo
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-blue-400">TIENDA</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Juegos PS4
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Lista de Deseos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Ofertas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Pre-órdenes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-blue-400">COMUNIDAD</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Foros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Reseñas de Juegos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Guías de Juegos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Eventos
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4 text-blue-400">SOPORTE</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Contáctanos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Política de Reembolso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Términos de Servicio
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors duration-300">
                    Política de Privacidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500">
            <p>
              © 2024 VortexShop. Todos los derechos reservados. Todas las marcas comerciales son propiedad de sus
              respectivos dueños. PlayStation y PS4 son marcas registradas de Sony Interactive Entertainment Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
