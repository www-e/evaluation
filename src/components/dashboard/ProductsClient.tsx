"use client"

import { useState } from "react"
import { createProduct, deleteProduct } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/ImageUpload"
import Dropdown from "@/components/ui/Dropdown";
import Pagination from "@/components/Pagination"
import AlertModal from "@/components/ui/AlertModal";
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'info' as 'info' | 'error' | 'success' | 'warning' });
  const router = useRouter()

  const showAlertMessage = (title: string, message: string, type: 'info' | 'error' | 'success' | 'warning' = 'info') => {
    setAlertConfig({ title, message, type });
    setShowAlert(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !price || !catId || !image) {
        showAlertMessage("Error", "Missing Name, Price, Category, or Image", 'error');
        return
    }
    setLoading(true)

    // The image is already a URL from UploadThing, so we can use it directly
    const imageUrl = image; // This should now be a URL from UploadThing

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
      showAlertMessage("Success", "Product created successfully!", 'success');
    } else {
      showAlertMessage("Error", "Error creating product", 'error');
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    // Instead of confirm, we could create a confirmation modal, but for now we'll use our alert modal
    if(!window.confirm("Are you sure?")) return;
    const res = await deleteProduct(id)
    if (res.success) {
      // Optimistically update the UI
      setProducts(prev => prev.filter(p => p.id !== id))
      showAlertMessage("Success", "Product deleted successfully!", 'success');
    } else {
        showAlertMessage("Error", "Error deleting product", 'error');
    }
  }

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState<string | null>(null);
  const [editCatId, setEditCatId] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setEditName(product.name);
    setEditDesc(product.description || "");
    setEditPrice(product.price.toString());
    setEditImage(product.image);
    setEditCatId(product.categoryId);
    setIsEditing(true);

    // Show success message
    showAlertMessage("Edit Mode", "Product data has been loaded. You can now edit the information.", 'info');

    // Scroll to the edit form after a short delay to ensure it's rendered
    setTimeout(() => {
      const editForm = document.getElementById('edit-product-form');
      if (editForm) {
        editForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    setLoading(true);

    // The image is already a URL from UploadThing, so we can use it directly
    const imageUrl = editImage || undefined; // This should now be a URL from UploadThing

    try {
      // Use the updateProduct function from admin actions
      const { updateProduct } = await import("@/actions/admin");
      const res = await updateProduct(editingProduct.id, {
        name: editName,
        description: editDesc,
        price: parseFloat(editPrice),
        image: imageUrl,
        categoryId: editCatId
      });

      if (res.success) {
        const updatedProduct = {
          ...editingProduct,
          name: editName,
          description: editDesc || null,
          price: parseFloat(editPrice),
          image: imageUrl || null,
          categoryId: editCatId
        };
        setProducts(prev => prev.map(p => p.id === editingProduct.id ? updatedProduct : p));
        setEditingProduct(null);
        setIsEditing(false);
        showAlertMessage("Success", "Product updated successfully!", 'success');

        // Scroll back to the product list after a short delay
        setTimeout(() => {
          const productList = document.getElementById('product-list');
          if (productList) {
            productList.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      } else {
        showAlertMessage("Error", res.error || "Failed to update product", 'error');
      }
    } catch (error) {
      console.error("Update error:", error);
      showAlertMessage("Error", "Error updating product", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Edit Form - Only show when editing */}
      {isEditing && editingProduct && (
        <div id="edit-product-form" className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-white mb-4">Edit Product</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                    <Input value={editName} onChange={e => setEditName(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Price ($)</label>
                    <Input type="number" step="0.01" value={editPrice} onChange={e => setEditPrice(e.target.value)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Category</label>
                    <Dropdown
                        options={[
                            { value: "", label: "Select Category" },
                            ...categories.map(c => ({ value: c.id, label: c.name }))
                        ]}
                        value={editCatId}
                        onChange={setEditCatId}
                        placeholder="Select Category"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <Input value={editDesc} onChange={e => setEditDesc(e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
              <ImageUpload
                value={editImage || undefined}
                onChange={(url) => setEditImage(url)}
                label="Product Image"
                disabled={loading}
              />
            </div>

            <div className="flex gap-2">
              <Button disabled={loading} type="submit" className="bg-primary hover:bg-primary/90 text-black">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Update Product
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  showAlertMessage("Edit Cancelled", "Edit mode has been cancelled.", 'info');
                }}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

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
                    <Dropdown
                        options={[
                            { value: "", label: "Select Category" },
                            ...categories.map(c => ({ value: c.id, label: c.name }))
                        ]}
                        value={catId}
                        onChange={setCatId}
                        placeholder="Select Category"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <Input value={desc} onChange={e => setDesc(e.target.value)} />
                </div>
            </div>

            <div className="space-y-2">
              <ImageUpload
                value={image || undefined}
                onChange={(url) => setImage(url)}
                label="Product Image"
                disabled={loading}
              />
            </div>

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
      <div id="product-list" className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
            <div key={p.id} className="group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col">
                <div className="aspect-square bg-secondary w-full relative flex items-center justify-center">
                    {p.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-10 w-40 opacity-20" />
                        </div>
                    )}
                     <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs font-bold">
                        ${p.price}
                    </div>
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <Button variant="outline" size="sm" onClick={() => startEditing(p)} disabled={loading}>
                            Edit
                         </Button>
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

      {/* Alert Modal */}
      <AlertModal
        isOpen={showAlert}
        onClose={() => setShowAlert(false)}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
      />
    </div>
  )
}
