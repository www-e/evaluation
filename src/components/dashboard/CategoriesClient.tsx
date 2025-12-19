"use client"

import { useState } from "react"
import { createCategory, deleteCategory } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/ImageUpload"
import Pagination from "@/components/Pagination"
import { Loader2, Trash2, Plus, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

interface Category {
  id: string
  name: string
  image: string | null
  products: { id: string }[] // Array of product IDs only for count
}

export function CategoriesClient({
  initialData,
  currentPage: initialPage = 1,
  totalPages: initialTotalPages = 1,
  totalCount = 0
}: {
  initialData: Category[];
  currentPage?: number;
  totalPages?: number;
  totalCount?: number;
}) {
  const [categories, setCategories] = useState(initialData)
  const [name, setName] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !image) return
    setLoading(true)

    // If there's an image file to upload, handle the upload first
    let imageUrl: string | undefined;
    if (image && image.startsWith('data:')) { // If it's a data URL (user selected a file but didn't upload yet)
      const formData = new FormData();
      // Convert data URL to blob
      const response = await fetch(image);
      const blob = await response.blob();
      formData.append('file', blob, `category_${Date.now()}.jpg`);

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

    const res = await createCategory({ name, image: imageUrl })
    if (res.success) {
      setName("")
      setImage(null)
      // Optimistically update the UI
      const newCategory = {
        id: Date.now().toString(), // Temporary ID
        name,
        image: imageUrl || null,
        products: [] // Empty array since we're fetching with product count
      }
      setCategories(prev => [newCategory, ...prev])
    } else {
      alert("Error creating category")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure?")) return;
    const res = await deleteCategory(id)
    if (res.success) {
      // Optimistically update the UI
      setCategories(prev => prev.filter(cat => cat.id !== id))
    } else {
        alert("Error deleting")
    }
  }

  return (
    <div className="space-y-8">
      {/* Create Form */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Category Name</label>
                <Input
                    placeholder="e.g. Burgers"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
            </div>

            <ImageUpload
              value={image || undefined}
              onChange={setImage}
              label="Category Image"
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
                    <Plus className="h-4 w-4 mr-2" /> Add Category
                  </>
                )}
            </Button>
        </form>
      </div>

      {/* Results Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing {categories.length} of {totalCount} categories
        </p>
      </div>

      {/* List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
            <div key={cat.id} className="group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col hover:border-primary/50 transition-colors">
                <div className="aspect-video bg-secondary w-full relative">
                    {cat.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <Button variant="destructive" size="sm" onClick={() => handleDelete(cat.id)} disabled={loading}>
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                         </Button>
                    </div>
                </div>
                <div className="p-4">
                    <h4 className="font-bold text-lg text-white">{cat.name}</h4>
                    <p className="text-sm text-muted-foreground">
                        {cat.products?.length || 0} Products
                    </p>
                </div>
            </div>
        ))}
        {categories.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No categories found. Create your first category above.</p>
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
