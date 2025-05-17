import Image from "next/image"
import Link from "next/link"
import {
  ChevronRight,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  ThumbsUp,
  Users,
  Monitor,
  Cpu,
  MemoryStickIcon as Memory,
  HardDrive,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function GameDetailPage() {
  // This would normally be fetched from an API based on the slug
  const game = {
    id: "god-of-war",
    title: "God of War",
    description:
      "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… and teach his son to do the same.",
    longDescription:
      "From Santa Monica Studio and creative director Cory Barlog comes a new beginning for one of gaming's most recognizable icons. Living as a man outside the shadow of the gods, Kratos must adapt to unfamiliar lands, unexpected threats, and a second chance at being a father. Together with his son Atreus, the pair will venture into the brutal Norse wilds and fight to fulfill a deeply personal quest. This stunning reimagining of God of War combines all the hallmarks of the iconic series – brutal combat, epic boss fights, and breathtaking scale – and fuses them with a powerful and moving narrative that re-establishes Kratos' world.",
    price: 39.99,
    discount: 25,
    releaseDate: "April 20, 2018",
    developer: "Santa Monica Studio",
    publisher: "Sony Interactive Entertainment",
    tags: ["Action", "Adventure", "RPG", "PS4 Exclusive", "Single-player", "Third Person", "Fantasy", "Atmospheric"],
    features: ["Single-player", "PS4 Pro Enhanced", "Remote Play", "Vibration Function", "Trophy Support"],
    rating: 4.9,
    reviews: {
      total: 845789,
      positive: 823500,
      recent: {
        total: 8458,
        positive: 8235,
      },
    },
    systemRequirements: {
      minimum: {
        os: "PlayStation 4",
        processor: "Standard PS4",
        memory: "Standard PS4",
        graphics: "Standard PS4",
        storage: "45 GB minimum",
      },
      recommended: {
        os: "PlayStation 4 Pro",
        processor: "PS4 Pro",
        memory: "PS4 Pro",
        graphics: "PS4 Pro",
        storage: "45 GB available space",
      },
    },
    screenshots: [
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
      "/placeholder.svg?height=600&width=1200",
    ],
    headerImage: "/placeholder.svg?height=600&width=1400",
  }

  const positivePercentage = Math.round((game.reviews.positive / game.reviews.total) * 100)
  const recentPositivePercentage = Math.round((game.reviews.recent.positive / game.reviews.recent.total) * 100)

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      {/* Header with game title and breadcrumbs */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-zinc-900">
          <Image
            src={game.headerImage || "/placeholder.svg"}
            alt={game.title}
            fill
            className="object-cover opacity-40 -z-10"
            priority
          />
        </div>

        <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
          <div className="flex items-center gap-2 text-sm text-zinc-400 mb-4">
            <Link href="/" className="hover:text-white transition">
              VortexShop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="#" className="hover:text-white transition">
              PS4 Games
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="#" className="hover:text-white transition">
              Action
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-white">{game.title}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">{game.title}</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Game media and info */}
          <div className="lg:col-span-2">
            {/* Game trailer/screenshots carousel */}
            <div className="mb-8">
              <Carousel className="w-full">
                <CarouselContent>
                  {game.screenshots.map((screenshot, index) => (
                    <CarouselItem key={index}>
                      <div className="relative rounded-lg overflow-hidden">
                        <Image
                          src={screenshot || "/placeholder.svg"}
                          alt={`${game.title} screenshot ${index + 1}`}
                          width={1200}
                          height={600}
                          className="w-full aspect-video object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </div>

            {/* Thumbnail gallery */}
            <div className="grid grid-cols-5 gap-2 mb-8">
              {game.screenshots.map((screenshot, index) => (
                <div
                  key={index}
                  className="relative rounded-md overflow-hidden cursor-pointer hover:opacity-80 transition"
                >
                  <Image
                    src={screenshot || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={200}
                    height={100}
                    className="w-full aspect-video object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Game description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">About This Game</h2>
              <p className="text-zinc-300 mb-4">{game.description}</p>
              <p className="text-zinc-300">{game.longDescription}</p>
            </div>

            {/* Game features */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Game Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {game.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4 text-emerald-500" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews section */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Player Reviews</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">All Reviews</h3>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-3xl font-bold text-emerald-500">{positivePercentage}%</div>
                    <div>
                      <div className="font-medium">Overwhelmingly Positive</div>
                      <div className="text-sm text-zinc-400">{game.reviews.total.toLocaleString()} reviews</div>
                    </div>
                  </div>
                  <Progress value={positivePercentage} className="h-2 bg-zinc-700" />
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Recent Reviews</h3>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="text-3xl font-bold text-emerald-500">{recentPositivePercentage}%</div>
                    <div>
                      <div className="font-medium">Very Positive</div>
                      <div className="text-sm text-zinc-400">{game.reviews.recent.total.toLocaleString()} reviews</div>
                    </div>
                  </div>
                  <Progress value={recentPositivePercentage} className="h-2 bg-zinc-700" />
                </div>
              </div>
            </div>

            {/* System requirements */}
            <div>
              <h2 className="text-xl font-bold mb-4">System Requirements</h2>
              <Tabs defaultValue="minimum" className="w-full">
                <TabsList className="bg-zinc-800 mb-4 w-full grid grid-cols-2">
                  <TabsTrigger value="minimum">Minimum</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                </TabsList>
                <TabsContent value="minimum" className="mt-0">
                  <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">OS</div>
                        <div className="text-zinc-400">{game.systemRequirements.minimum.os}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Processor</div>
                        <div className="text-zinc-400">{game.systemRequirements.minimum.processor}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Memory className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Memory</div>
                        <div className="text-zinc-400">{game.systemRequirements.minimum.memory}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Graphics</div>
                        <div className="text-zinc-400">{game.systemRequirements.minimum.graphics}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Storage</div>
                        <div className="text-zinc-400">{game.systemRequirements.minimum.storage}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="recommended" className="mt-0">
                  <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">OS</div>
                        <div className="text-zinc-400">{game.systemRequirements.recommended.os}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Cpu className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Processor</div>
                        <div className="text-zinc-400">{game.systemRequirements.recommended.processor}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Memory className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Memory</div>
                        <div className="text-zinc-400">{game.systemRequirements.recommended.memory}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Graphics</div>
                        <div className="text-zinc-400">{game.systemRequirements.recommended.graphics}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <HardDrive className="h-5 w-5 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">Storage</div>
                        <div className="text-zinc-400">{game.systemRequirements.recommended.storage}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right column - Purchase info and metadata */}
          <div>
            {/* Game cover image */}
            <div className="mb-6">
              <Image
                src={game.screenshots[0] || "/placeholder.svg"}
                alt={game.title}
                width={600}
                height={300}
                className="w-full rounded-lg"
              />
            </div>

            {/* Purchase card */}
            <div className="bg-zinc-800 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Buy {game.title}</h2>

              {game.discount > 0 ? (
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-emerald-600 text-white">-{game.discount}%</Badge>
                  <div className="flex items-center gap-2">
                    <span className="line-through text-zinc-500">${game.price.toFixed(2)}</span>
                    <span className="text-2xl font-bold">${(game.price * (1 - game.discount / 100)).toFixed(2)}</span>
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-bold mb-4">${game.price.toFixed(2)}</div>
              )}

              <div className="grid gap-3">
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-700">
                  <Heart className="mr-2 h-4 w-4" />
                  Add to Wishlist
                </Button>
                <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-700">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Game info card */}
            <div className="bg-zinc-800 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-4">Game Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Developer:</span>
                  <Link href="#" className="text-emerald-400 hover:underline">
                    {game.developer}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Publisher:</span>
                  <Link href="#" className="text-emerald-400 hover:underline">
                    {game.publisher}
                  </Link>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Release Date:</span>
                  <span>{game.releaseDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-400">User Rating:</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{game.rating}/5</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Players:</span>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>Single-player, Multi-player</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-zinc-800 rounded-lg p-6">
              <h3 className="font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-zinc-700 hover:bg-zinc-700 cursor-pointer">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
