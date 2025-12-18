"use client"

import { useState } from "react"
import { ProductCard } from "@/components/shop/ProductCard"
import { ShopSidebar } from "@/components/shop/ShopSidebar"
import { Search } from "lucide-react" // Import icon

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  categoryId: string
  category: { id: string; name: string } | null // Handle relation properly
}

interface PageProps {
  initialProducts: any[] // Using any to bypass complex nested type mismatch for now in MVP
  initialCategories: any[]
}

export function HomePageClient({ initialProducts, initialCategories }: PageProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [search, setSearch] = useState("")

  const filteredProducts = initialProducts.filter(p => {
    const matchesCategory = selectedCategory ? p.categoryId === selectedCategory : true
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-background">
        {/* Header / Hero */}
        <div className="relative h-[300px] w-full bg-secondary overflow-hidden flex items-center justify-center">
             <div className="absolute inset-0 bg-black/60 z-10" />
             <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover" alt="Hero" />
             <div className="relative z-20 text-center">
                <h1 className="text-5xl font-bold text-white mb-2">Refined Taste</h1>
                <p className="text-gray-300">Order from the best restaurants in town</p>
             </div>
        </div>

        <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
                <ShopSidebar 
                    categories={initialCategories} 
                    selectedCategory={selectedCategory} 
                    onSelectCategory={setSelectedCategory} 
                />
            </aside>

            {/* Main Grid */}
            <div className="flex-1 space-y-8">
                 {/* Search Bar */}
                 <div className="relative">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search for food..." 
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-secondary/50 border border-input text-white focus:outline-none focus:ring-2 focus:ring-primary"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {filteredProducts.length === 0 && (
                        <div className="col-span-full py-12 text-center text-muted-foreground">
                            No products found.
                        </div>
                    )}
                 </div>
            </div>
        </div>
    </div>
  )
}
