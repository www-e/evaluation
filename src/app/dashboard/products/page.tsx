import { getProducts, getCategories, getProductsCount } from "@/actions/admin"
import { ProductsClient } from "@/components/dashboard/ProductsClient"

// Using dynamic rendering for real-time updates
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page as string) || 1;
  const limit = 12; // 12 items per page (4 columns x 3 rows on desktop)

  // Fetch products with category info, categories, and total count separately to optimize
  const [products, categories, totalCount] = await Promise.all([
    getProducts(true, page, limit), // Include category info for products
    getCategories(false), // Don't include products for categories list
    getProductsCount()
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Products</h2>
        {categories.length === 0 ? (
            <div className="p-8 text-center border border-dashed border-gray-700 rounded-xl text-muted-foreground">
                Please create a Category first.
            </div>
        ) : (
            <ProductsClient
              initialData={products}
              categories={categories}
              currentPage={page}
              totalPages={totalPages}
              totalCount={totalCount}
            />
        )}
    </div>
  )
}
