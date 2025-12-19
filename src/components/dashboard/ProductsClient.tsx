"use client"

import { useState } from "react"
import { createProduct, deleteProduct } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/ImageUpload"
import Pagination from "@/components/Pagination"
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

export function ProductsClient({
  initialData,
  categories,
  currentPage: initialPage = 1,
  totalPages: initialTotalPages = 1,
  totalCount = 0
}: {
  initialData: Product[];
  categories: Category[];
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
}) {
  const [products, setProducts] = useState(initialData)
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [catId, setCatId] = useState(categories[0]?.id || "")
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !catId || !image) {
        alert("Missing Name, Price, Category, or Image")
        return
    }
    setLoading(true)

    // If there's an image file to upload, handle the upload first
    let imageUrl: string | undefined;
    if (image && image.startsWith('data:')) { // If it's a data URL (user selected a file but didn't upload yet)
      const formData = new FormData();
      // Convert data URL to blob
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append('file', blob, `product_${Date.now()}.jpg`);

      try {
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await uploadResponse.json();

        if (uploadResponse.ok && result.url) {
          imageUrl = result.url;
          console.log("Image uploaded successfully:", result.url); // Debug log
        } else {
          alert(result.error || 'Image upload failed');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Image upload error:", error); // Debug log
        alert('Image upload failed: ' + (error as Error).message);
        setLoading(false);
        return;
      }
    } else {
      imageUrl = image; // Use the existing image URL
      console.log("Using existing image URL:", image); // Debug log
    }

    const res = await createProduct({
        name,
        description: desc,
        price: parseFloat(price),
        image: imageUrl,
        categoryId: catId
    })

    if (res.success) {
      setName("")
      setDesc("")
      setPrice("")
      setImage(null)
      // Optimistically update the UI
      const newProduct = {
        id: Date.now().toString(), // Temporary ID
        name,
        description: desc || null,
        price: parseFloat(price),
        image: imageUrl || null,
        categoryId: catId,
        category: categories.find(c => c.id === catId) || undefined
      }
      setProducts(prev => [newProduct, ...prev])
    } else {
      alert("Error creating product")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    const res = await deleteProduct(id)
    if (res.success) {
      // Optimistically update the UI
      setProducts(prev => prev.filter(p => p.id !== id))
    } else {
        alert("Error deleting")
    }
  }

  return (
    <div className="space-y-8">
      {/* Create Form */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                    <Input value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
                    <Input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <select
                        className="flex h-12 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        value={catId}
                        onChange={e => setCatId(e.target.value)}
                    >
                        <option value="" disabled>Select Category</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <Input value={desc} onChange={e => setDesc(e.target.value)} />
                </div>
            </div>

            <ImageUpload
              value={image || undefined}
              onChange={setImage}
              label="Product Image"
              disabled={loading}
              autoUpload={true}
            />

            <Button disabled={loading || !image} type="submit" className={`w-full md:w-auto ${!image ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-black`}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Add Product
                  </>
                )}
            </Button>
        </form>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {products.length} of {totalCount} products
        </p>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
            <div key={p.id} className="group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col">
                <div className="aspect-square bg-secondary w-full relative">
                    {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                    )}
                     <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold">
                        ${p.price}
                    </div>
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Button variant="destructive" size="sm" onClick={() => handleDelete(p.id)} disabled={loading}>
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
        {products.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No products found. Create your first product above.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalCount > 12 && (
        <div className="flex justify-center pt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / 12)}
            onPageChange={(page) => {
              // Update URL with new page
              const url = new URL(window.location.href);
              url.searchParams.set('page', page.toString());
              window.location.href = url.toString();
            }}
          />
        </div>
      )}
    </div>
  )
}
