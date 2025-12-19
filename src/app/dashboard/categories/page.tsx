import { getCategoriesWithProductCount, getCategoriesCount } from "@/actions/admin"
import { CategoriesClient } from "@/components/dashboard/CategoriesClient"
import LoadingSpinner from "@/components/LoadingSpinner"

// Using dynamic rendering for real-time updates
export const dynamic = "force-dynamic"

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams.page as string) || 1;
  const limit = 12; // 12 items per page (4 columns x 3 rows on desktop)

  const [categories, totalCount] = await Promise.all([
    getCategoriesWithProductCount(page, limit),
    getCategoriesCount()
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6">
        <h2 className="text-3xl font-bold text-white">Categories</h2>
        <CategoriesClient
          initialData={categories}
          currentPage={page}
          totalPages={totalPages}
          totalCount={totalCount}
        />
    </div>
  )
}
