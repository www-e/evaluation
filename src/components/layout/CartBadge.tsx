"use client";

import { useCart } from "@/store/cart";
import { ShoppingBag } from "lucide-react";

export default function CartBadge() {
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative">
      <a href="/cart" className="text-gray-700 hover:text-amber-500 transition-colors">
        <ShoppingBag className="h-6 w-6" />
      </a>
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  );
}