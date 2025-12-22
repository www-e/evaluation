"use client"

import { useCart } from "@/store/cart"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { createOrder } from "@/actions/shop"
import { useRouter } from "next/navigation"
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import AlertModal from "@/components/ui/AlertModal"

export default function CartClient() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()
  const { user } = useAuth() // Auth check on client for now
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState<{isOpen: boolean, title: string, message: string, type: 'success' | 'error' | 'warning' | 'info'}>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info'
  })
  const router = useRouter()

  const totalPrice = total()

  const showAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setAlert({isOpen: true, title, message, type});
  };

  const handleCheckout = async () => {
    if (!user) {
        // In real app, push to login with callback
        router.push("/login")
        return
    }

    setLoading(true)
    try {
        // Fetch the user from our database using the phone number from Firebase
        const { checkUserExists } = await import("@/actions/auth")
        const { user: dbUser } = await checkUserExists(user.phoneNumber!)

        if (!dbUser) {
            showAlert("Error", "User record not found. Please re-login.", 'error');
            return
        }

        const res = await createOrder(
            dbUser.id,
            items.map(i => ({ productId: i.productId, quantity: i.quantity, price: i.price })),
            totalPrice
        )

        if (res.success) {
            clearCart()
            // Redirect to home with success parameter
            router.push("/?checkout=success");
        } else {
            showAlert("Error", "Failed to place order", 'error');
        }
    } catch (e) {
        console.error("Checkout error:", e)
        showAlert("Error", "Error processing checkout", 'error');
    } finally {
        setLoading(false)
    }
  }

  if (items.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-white">Your Cart is Empty</h1>
              <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
              <Link href="/">
                  <Button variant="outline" className="mt-4">Start Shopping</Button>
              </Link>
          </div>
      )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-card border border-border glass items-center">
                    <div className="h-20 w-20 bg-secondary rounded-lg overflow-hidden shrink-0">
                        {item.image && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        )}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">{item.name}</h3>
                        <p className="text-primary font-bold">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                        <button
                            className="p-1 hover:bg-white/10 rounded"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                            <Minus className="h-4 w-4 text-white" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                         <button
                            className="p-1 hover:bg-white/10 rounded"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                            <Plus className="h-4 w-4 text-white" />
                        </button>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                        <Trash2 className="h-5 w-5 text-red-500" />
                    </Button>
                </div>
            ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
            <div className="p-6 rounded-xl bg-card border border-border glass sticky top-24">
                <h3 className="text-xl font-bold text-white mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Tax (0%)</span>
                        <span>$0.00</span>
                    </div>
                    <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-bold text-white">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                    </div>
                </div>
                <Button className="w-full font-bold text-lg h-12" onClick={handleCheckout} disabled={loading}>
                    {loading ? "Processing..." : "Checkout"}
                </Button>
            </div>
        </div>

        {/* Alert Modal */}
        <AlertModal
          isOpen={alert.isOpen}
          onClose={() => setAlert({...alert, isOpen: false})}
          title={alert.title}
          message={alert.message}
          type={alert.type}
        />
    </div>
  )
}
