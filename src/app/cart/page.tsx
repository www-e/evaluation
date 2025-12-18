import CartClient from "@/components/shop/CartClient"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background p-8 pt-24">
        <div className="container mx-auto">
             <div className="mb-8">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-white transition-colors mb-4">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Shop
                </Link>
                <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
            </div>
            
            <CartClient />
        </div>
    </div>
  )
}
