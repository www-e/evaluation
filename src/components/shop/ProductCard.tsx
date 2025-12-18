"use client"

import { useCart } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { Plus, Image as ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string | null
    price: number
    image: string | null
    category?: { name: string }
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card border border-border flex flex-col transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-primary/10 glass">
      <div className="aspect-[4/3] w-full relative overflow-hidden bg-secondary">
        {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
             <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ImageIcon className="h-10 w-10 opacity-20" />
            </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" className="rounded-full shadow-lg h-8 w-8" onClick={() => addItem(product)}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
      </div>
      
      <div className="p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start">
             <h3 className="font-bold text-lg text-white leading-tight">{product.name}</h3>
             <span className="font-bold text-primary">${product.price}</span>
        </div>
        {product.category && (
            <span className="text-xs text-primary/80 font-medium uppercase tracking-wider">{product.category.name}</span>
        )}
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {product.description || "No description available"}
        </p>
      </div>
    </div>
  )
}
