"use server"

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Validations
const categorySchema = z.object({
  name: z.string().min(3),
  image: z.string().optional()
})

const productSchema = z.object({
  name: z.string().min(3),
  description: z.string().optional(),
  price: z.coerce.number().min(0.1),
  image: z.string().optional(),
  categoryId: z.string().uuid()
})

// --- CATEGORIES ---

export async function createCategory(data: z.infer<typeof categorySchema>) {
  const result = categorySchema.safeParse(data)
  if (!result.success) return { error: "Invalid data" }

  try {
    await prisma.category.create({ data: result.data })
    revalidatePath("/dashboard/categories")
    revalidatePath("/") // Update home page as well
    return { success: true }
  } catch (e) {
    return { error: "Failed to create category" }
  }
}

export async function deleteCategory(id: string) {
  try {
    await prisma.category.delete({ where: { id } })
    revalidatePath("/dashboard/categories")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { error: "Failed to delete category" }
  }
}

// --- PRODUCTS ---

export async function createProduct(data: z.infer<typeof productSchema>) {
  const result = productSchema.safeParse(data)
  if (!result.success) return { error: "Invalid data" }

  try {
    await prisma.product.create({ data: result.data })
    revalidatePath("/dashboard/products")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { error: "Failed to create product" }
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({ where: { id } })
    revalidatePath("/dashboard/products")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { error: "Failed to delete product" }
  }
}

// --- FETCHERS (Can also be used in Server Components directly, but helper here is fine) ---
export async function getCategories() {
  return await prisma.category.findMany({ orderBy: { createdAt: 'desc' }, include: { products: true } })
}

export async function getProducts() {
  return await prisma.product.findMany({ 
    orderBy: { createdAt: 'desc' },
    include: { category: true }
  })
}
