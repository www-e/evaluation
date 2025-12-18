"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface CartItem {
  productId: string
  quantity: number
  price: number
}

export async function createOrder(userId: string, items: CartItem[], total: number) {
  if (!userId || items.length === 0) {
    return { error: "Invalid order data" }
  }

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        items: {
            create: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price
            }))
        }
      }
    })
    return { success: true, orderId: order.id }
  } catch (e) {
    console.error(e)
    return { error: "Failed to create order" }
  }
}
