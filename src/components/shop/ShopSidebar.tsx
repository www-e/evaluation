"use client"

import { cn } from "@/lib/utils"
// import { Checkbox } from "@/components/ui/checkbox" 
// import { Slider } from "@/components/ui/slider"

// MVP: I'll use standard inputs for filters to save time on complex UI components
// Unless requested, "minimal codes".

interface Category {
  id: string
  name: string
}

export function ShopSidebar({ 
    categories, 
    selectedCategory, 
    onSelectCategory 
}: { 
    categories: Category[], 
    selectedCategory: string, 
    onSelectCategory: (id: string) => void 
}) {
  return (
    <div className="space-y-8">
       {/* Category Filter */}
       <div className="space-y-4">
        <h3 className="font-bold text-white">Category</h3>
        <div className="space-y-2">
             <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                <input 
                    type="radio" 
                    name="category" 
                    className="w-4 h-4 accent-primary"
                    checked={selectedCategory === ""}
                    onChange={() => onSelectCategory("")}
                />
                All Categories
            </label>
            {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                    <input 
                        type="radio" 
                        name="category" 
                        className="w-4 h-4 accent-primary"
                        checked={selectedCategory === cat.id}
                        onChange={() => onSelectCategory(cat.id)}
                    />
                    {cat.name}
                </label>
            ))}
        </div>
       </div>

       {/* Price Filter (Visual Only for MVP unless we implement raw logic) */}
       <div className="space-y-4">
          <h3 className="font-bold text-white">Price Range</h3>
          <input type="range" className="w-full accent-primary" min="0" max="100" />
           <div className="flex justify-between text-xs text-muted-foreground">
               <span>$0</span>
               <span>$100+</span>
           </div>
       </div>
    </div>
  )
}
