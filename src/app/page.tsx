import { getProducts, getCategories } from "@/actions/admin"
import { HomePageClient } from "@/components/shop/HomePageClient"
import Link from "next/link"
import { ShoppingCart } from "lucide-react" // Import icon

export const dynamic = "force-dynamic"

// I'll add a Navbar here for the Cart button
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/80 backdrop-blur-md border-b border-white/10 flex items-center justify-between px-8">
       <div className="font-bold text-xl text-primary">BUZZER</div>
       <div className="flex items-center gap-4">
           <Link href="/login" className="text-sm font-medium text-white hover:text-primary">Login</Link>
           <Link href="/dashboard" className="text-sm font-medium text-white hover:text-primary">Admin</Link>
           <Link href="/cart">
             <div className="relative p-2 bg-primary/20 rounded-full hover:bg-primary/30 transition-colors">
                <ShoppingCart className="h-5 w-5 text-primary" />
             </div>
           </Link>
       </div>
    </nav>
  )
}

export default async function Page() {
  const products = await getProducts()
  const categories = await getCategories()

  return (
    <main className="min-h-screen bg-background pt-16">
        <Navbar />
        <HomePageClient initialProducts={products} initialCategories={categories} />
    </main>
  )
}
