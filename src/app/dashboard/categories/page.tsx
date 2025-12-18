import { getCategories } from "@/actions/admin"
import { CategoriesClient } from "@/components/dashboard/CategoriesClient"

export const dynamic = "force-dynamic"

export default async function Page() {
  const categories = await getCategories()
  return (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Categories</h2>
        <CategoriesClient initialData={categories} />
    </div>
  )
}
