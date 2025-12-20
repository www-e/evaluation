"use client"

import { useState } from "react"
import { createCategory, deleteCategory } from "@/actions/admin"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import ImageUpload from "@/components/ui/ImageUpload"
import Pagination from "@/components/Pagination"
import AlertModal from "@/components/ui/AlertModal";
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: '', message: '', type: 'info' as 'info' | 'error' | 'success' | 'warning' });
  const router = useRouter()

  const showAlertMessage = (title: string, message: string, type: 'info' | 'error' | 'success' | 'warning' = 'info') => {
    setAlertConfig({ title, message, type });
    setShowAlert(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !image) {
      showAlertMessage("Error", "Please provide both name and image", 'error');
      return;
    }
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
          showAlertMessage("Upload Error", result.error || 'Image upload failed', 'error');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Image upload error:", error); // Debug log
        showAlertMessage("Upload Error", 'Image upload failed: ' + (error as Error).message, 'error');
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
      showAlertMessage("Success", "Category created successfully!", 'success');
    } else {
      showAlertMessage("Error", "Error creating category", 'error');
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if(!window.confirm("Are you sure?")) return;
    const res = await deleteCategory(id)
    if (res.success) {
      // Optimistically update the UI
      setCategories(prev => prev.filter(cat => cat.id !== id))
      showAlertMessage("Success", "Category deleted successfully!", 'success');
    } else {
        showAlertMessage("Error", "Error deleting category", 'error');
    }
  }

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const startEditing = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditImage(category.image);
    setIsEditing(true);

    // Show success message
    showAlertMessage("Edit Mode", "Category data has been loaded. You can now edit the information.", 'info');

    // Scroll to the edit form after a short delay to ensure it's rendered
    setTimeout(() => {
      const editForm = document.getElementById('edit-category-form');
      if (editForm) {
        editForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setLoading(true);

    // If there's an image file to upload, handle the upload first
    let imageUrl: string | undefined = editImage || undefined;
    if (editImage && editImage.startsWith('data:')) { // If it's a data URL (user selected a file but didn't upload yet)
      const formData = new FormData();
      // Convert data URL to blob
      const response = await fetch(editImage);
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
          showAlertMessage("Upload Error", result.error || 'Image upload failed', 'error');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Image upload error:", error); // Debug log
        showAlertMessage("Upload Error", 'Image upload failed: ' + (error as Error).message, 'error');
        setLoading(false);
        return;
      }
    }

    try {
      // Use the updateCategory function from admin actions
      const { updateCategory } = await import("@/actions/admin");
      const res = await updateCategory(editingCategory.id, {
        name: editName,
        image: imageUrl
      });

      if (res.success) {
        const updatedCategory = { ...editingCategory, name: editName, image: imageUrl || null };
        setCategories(prev => prev.map(cat => cat.id === editingCategory.id ? updatedCategory : cat));
        setEditingCategory(null);
        setIsEditing(false);
        showAlertMessage("Success", "Category updated successfully!", 'success');

        // Scroll back to the category list after a short delay
        setTimeout(() => {
          const categoryList = document.getElementById('category-list');
          if (categoryList) {
            categoryList.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      } else {
        showAlertMessage("Error", res.error || "Failed to update category", 'error');
      }
    } catch (error) {
      console.error("Update error:", error);
      showAlertMessage("Error", "Error updating category", 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Edit Form - Only show when editing */}
      {isEditing && editingCategory && (
        <div id="edit-category-form" className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-semibold text-white mb-4">Edit Category</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category Name</label>
              <Input
                placeholder="e.g. Burgers"
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category Image</label>
              <div
                className="border-2 border-dashed border-input rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById('edit-category-image-upload')?.click()}
              >
                {editImage ? (
                  <div className="relative w-full h-40 flex items-center justify-center">
                    <img
                      src={editImage}
                      alt="Category preview"
                      className="max-h-40 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-2">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click to select image</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Supports JPG, PNG, WEBP</p>
                  </div>
                )}
                <input
                  id="edit-category-image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setEditImage(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button disabled={loading} type="submit" className="bg-primary hover:bg-primary/90 text-black">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Processing...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 mr-2" /> Update Category
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category Image</label>
              <div
                className="border-2 border-dashed border-input rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => document.getElementById('category-image-upload')?.click()}
              >
                {image ? (
                  <div className="relative w-full h-40 flex items-center justify-center">
                    <img
                      src={image}
                      alt="Category preview"
                      className="max-h-40 max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="py-8">
                    <div className="mx-auto w-12 h-12 bg-secondary rounded-full flex items-center justify-center mb-2">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">Click to select image</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">Supports JPG, PNG, WEBP</p>
                  </div>
                )}
                <input
                  id="category-image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setImage(event.target.result as string);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  disabled={loading}
                />
              </div>
            </div>

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
      <div id="category-list" className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
            <div key={cat.id} className="group relative overflow-hidden rounded-xl bg-card border border-border flex flex-col hover:border-primary/50 transition-colors">
                <div className="aspect-video bg-secondary w-full relative flex items-center justify-center">
                    {cat.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover object-center"
                          loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            <ImageIcon className="h-10 w-10 opacity-20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                         <Button variant="outline" size="sm" onClick={() => startEditing(cat)} disabled={loading}>
                            Edit
                         </Button>
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
