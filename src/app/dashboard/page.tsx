import { getCategoriesCount, getProductsCount, getOrdersCount, getTotalRevenue, getRecentOrders, getTopSellingProducts } from "@/actions/admin"

// Using dynamic rendering for real-time updates
export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  // Fetch counts for dashboard overview
  const [categoriesCount, productsCount, ordersCount, totalRevenue, recentOrders, topSellingProducts] = await Promise.all([
    getCategoriesCount(),
    getProductsCount(),
    getOrdersCount(),
    getTotalRevenue(),
    getRecentOrders(),
    getTopSellingProducts()
  ])

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white">Dashboard Overview</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
          <div className="mt-2 text-4xl font-bold text-white">{ordersCount}</div>
        </div>

        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
          <div className="mt-2 text-4xl font-bold text-white">${totalRevenue.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-bold text-white mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order.id} className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="text-sm text-muted-foreground">Order #{order.id.substring(0, 8)}</p>
                    <p className="text-xs text-muted-foreground">Customer: {order.user?.mobile || 'N/A'}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${order.total.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent orders</p>
            )}
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="p-6 rounded-xl bg-card border border-border">
          <h3 className="text-lg font-bold text-white mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topSellingProducts.length > 0 ? (
              topSellingProducts.map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-border pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-white">{item.product?.name || 'Product'}</p>
                    <p className="text-xs text-muted-foreground">ID: {item.productId.substring(0, 8)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">{item.totalQuantity || 0} sold</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No sales data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
