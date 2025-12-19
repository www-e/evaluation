"use client"

import { useState } from "react"
import { createCategory, deleteCategory } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/ImageUpload"
import { Loader2, Trash2, Plus, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
  image: string | null
  _count?: { products: number }
}

export function CategoriesClient({ initialData }: { initialData: Category[] }) {
  const [categories, setCategories] = useState(initialData)
  const [name, setName] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name) return
    setLoading(true)

    const res = await createCategory({ name, image: image || undefined })
    if (res.success) {
      setName("")
      setImage(null)
      router.refresh() // Reload server data
    } else {
      alert("Error creating category")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    const res = await deleteCategory(id)
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
        <h3 className="text-lg font-semibold text-white mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category Name</label>
                <Input
                    placeholder="e.g. Burgers"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="text-white bg-secondary/50"
                />
            </div>

            <ImageUpload
              value={image || undefined}
              onChange={setImage}
              label="Category Image"
            />

            <Button disabled={loading} type="submit" className="w-full md:w-auto">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                Add Category
            </Button>
        </form>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
            <div key={cat.id} className="group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col hover:border-primary/50 transition-colors">
                <div className="aspect-video bg-secondary w-full relative">
                    {cat.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                         </Button>
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="font-bold text-lg text-white">{cat.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {cat._count?.products || 0} Products
                    </p>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}
