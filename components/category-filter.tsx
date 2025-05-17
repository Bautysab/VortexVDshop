"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

type Category = {
  id: string
  name: string
  count: number
}

const categories: Category[] = [
  { id: "action", name: "Acción", count: 245 },
  { id: "adventure", name: "Aventura", count: 189 },
  { id: "rpg", name: "RPG", count: 156 },
  { id: "strategy", name: "Estrategia", count: 98 },
  { id: "simulation", name: "Simulación", count: 76 },
  { id: "sports", name: "Deportes", count: 112 },
  { id: "racing", name: "Carreras", count: 67 },
  { id: "exclusives", name: "Exclusivos PS4", count: 87 },
]

export function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useStore()

  return (
    <div>
      <h3 className="font-medium text-blue-400 mb-3 flex items-center">CATEGORÍAS</h3>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <Button
              variant="ghost"
              className={`w-full justify-between px-2 py-1 h-auto text-left ${
                selectedCategory === category.id ? "text-white bg-zinc-800" : "text-zinc-400 hover:text-white"
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <span>{category.name}</span>
              <div className="flex items-center">
                <span className="text-xs text-zinc-500 mr-2">{category.count}</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-300 ${
                    selectedCategory === category.id ? "rotate-90" : ""
                  }`}
                />
              </div>
            </Button>
          </li>
        ))}
        <li>
          <Button
            variant="link"
            className="text-blue-400 p-0 h-auto hover:text-blue-300 transition-colors duration-300"
            onClick={() => setSelectedCategory(null)}
          >
            Ver todas las categorías
          </Button>
        </li>
      </ul>
    </div>
  )
}
