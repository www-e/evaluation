"use client"

import { useState } from "react"
import { createProduct, deleteProduct } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Trash2, Plus, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image: string | null
  categoryId: string
  category?: { name: string }
}

interface Category {
  id: string
  name: string
}

export function ProductsClient({ initialData, categories }: { initialData: Product[], categories: Category[] }) {
  const [products, setProducts] = useState(initialData)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [catId, setCatId] = useState(categories[0]?.id || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !catId) {
        alert("Missing Name, Price or Category")
        return
    }
    setLoading(true)
    
    const res = await createProduct({ 
        name, 
        description: desc,
        price: parseFloat(price),
        image,
        categoryId: catId
    })

    if (res.success) {
      setName("")
      setDesc("")
      setPrice("")
      setImage("")
      router.refresh()
    } else {
      alert("Error creating product")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    const res = await deleteProduct(id)
    if (res.success) {
       router.refresh()
    } else {
        alert("Error deleting")
    }
  }

  return (
    <div className="space-y-8">
      {/* Create Form */}
      <div className="p-6 rounded-xl bg-card border border-border glass">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                <Input value={name} onChange={e => setName(e.target.value)} className="text-white bg-secondary/50" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
                <Input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="text-white bg-secondary/50" />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <select 
                    className="flex h-12 w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={catId}
                    onChange={e => setCatId(e.target.value)}
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id} className="bg-gray-900">{c.name}</option>)}
                </select>
            </div>
             <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Description</label>
                <Input value={desc} onChange={e => setDesc(e.target.value)} className="text-white bg-secondary/50" />
            </div>
             <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Image URL</label>
                <Input value={image} onChange={e => setImage(e.target.value)} className="text-white bg-secondary/50" />
            </div>
            <div className="md:col-span-3 lg:col-span-1">
                <Button disabled={loading} type="submit" className="w-full">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    Add Product
                </Button>
            </div>
        </form>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
            <div key={p.id} className="group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col">
                <div className="aspect-square bg-secondary w-full relative">
                    {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                    )}
                     <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold">
                        ${p.price}
                    </div>
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                         </Button>
                    </div>
                </div>
                <div className="p-3">
                    <div className="text-xs text-primary mb-1">{p.category?.name}</div>
                    <h4 className="font-bold text-white truncate">{p.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{p.description}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
