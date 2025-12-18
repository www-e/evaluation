import { getProducts, getCategories } from "@/actions/admin"
import { ProductsClient } from "@/components/dashboard/ProductsClient"

export const dynamic = "force-dynamic"

export default async function Page() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Products</h2>
        {categories.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-gray-700 rounded-xl text-muted-foreground">
                Please create a Category first.
            </div>
        ) : (
            <ProductsClient initialData={products} categories={categories} />
        )}
    </div>
  )
}
