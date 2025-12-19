import { getCategoriesCount, getProductsCount } from "@/actions/admin"

// Using dynamic rendering for real-time updates
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  // Fetch counts for dashboard overview
  const [categoriesCount, productsCount] = await Promise.all([
    getCategoriesCount(),
    getProductsCount()
  ])

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Categories</h3>
          <div className="mt-2 text-4xl font-bold text-white">{categoriesCount}</div>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Products</h3>
          <div className="mt-2 text-4xl font-bold text-white">{productsCount}</div>
        </div>

         <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Orders</h3>
          <div className="mt-2 text-4xl font-bold text-white">0</div>
        </div>
      </div>
    </div>
  )
}
