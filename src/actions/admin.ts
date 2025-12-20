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

export async function updateCategory(id: string, data: Partial<z.infer<typeof categorySchema>>) {
  const result = categorySchema.partial().safeParse(data);
  if (!result.success) return { error: "Invalid data" }

  try {
    const category = await prisma.category.update({
      where: { id },
      data: result.data
    });

    revalidatePath("/dashboard/categories");
    revalidatePath("/");
    return { success: true, data: category };
  } catch (e) {
    return { error: "Failed to update category" }
  }
}

import { utapi } from "@/uploadthing";

export async function deleteCategory(id: string) {
  try {
    // Get the category to access its image
    const category = await prisma.category.findUnique({
      where: { id },
      select: { image: true }
    });

    // Delete the category
    await prisma.category.delete({ where: { id } })

    // If the category had an image from UploadThing, delete it from there too
    if (category?.image && category.image.includes('uploadthing')) {
      try {
        // Extract file key from the URL and delete it
        const url = new URL(category.image);
        const pathParts = url.pathname.split('/');
        if (pathParts.length > 1) {
          const fileKey = pathParts[pathParts.length - 1];
          await utapi.deleteFiles(fileKey);
        }
      } catch (deleteError) {
        console.error("Error deleting image from UploadThing:", deleteError);
        // Don't fail the operation if image deletion fails
      }
    }

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

export async function updateProduct(id: string, data: Partial<z.infer<typeof productSchema>>) {
  const result = productSchema.partial().safeParse(data);
  if (!result.success) return { error: "Invalid data" }

  try {
    const product = await prisma.product.update({
      where: { id },
      data: result.data
    });

    revalidatePath("/dashboard/products");
    revalidatePath("/");
    return { success: true, data: product };
  } catch (e) {
    return { error: "Failed to update product" }
  }
}

export async function deleteProduct(id: string) {
  try {
    // Get the product to access its image
    const product = await prisma.product.findUnique({
      where: { id },
      select: { image: true }
    });

    // Delete the product
    await prisma.product.delete({ where: { id } })

    // If the product had an image from UploadThing, delete it from there too
    if (product?.image && product.image.includes('uploadthing')) {
      try {
        // Extract file key from the URL and delete it
        const url = new URL(product.image);
        const pathParts = url.pathname.split('/');
        if (pathParts.length > 1) {
          const fileKey = pathParts[pathParts.length - 1];
          await utapi.deleteFiles(fileKey);
        }
      } catch (deleteError) {
        console.error("Error deleting image from UploadThing:", deleteError);
        // Don't fail the operation if image deletion fails
      }
    }

    revalidatePath("/dashboard/products")
    revalidatePath("/")
    return { success: true }
  } catch (e) {
    return { error: "Failed to delete product" }
  }
}

import { cache } from 'react'

// --- FETCHERS (Can also be used in Server Components directly, but helper here is fine) ---
export const getCategories = cache(async (includeProducts: boolean = false, page: number = 1, limit: number = 12) => {
  const skip = (page - 1) * limit;
  return await prisma.category.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { products: includeProducts }
  })
})

export const getProducts = cache(async (includeCategory: boolean = true, page: number = 1, limit: number = 12) => {
  const skip = (page - 1) * limit;
  return await prisma.product.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { category: includeCategory }
  })
})

// Optimized fetchers for specific use cases
export const getCategoriesWithProductCount = cache(async (page: number = 1, limit: number = 12) => {
  const skip = (page - 1) * limit;
  return await prisma.category.findMany({
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      products: {
        select: {
          id: true
        }
      }
    }
  })
})

// Count functions for pagination
export const getCategoriesCount = cache(async () => {
  return await prisma.category.count();
})

export const getProductsCount = cache(async () => {
  return await prisma.product.count();
})

// Additional dashboard data functions
export const getOrdersCount = cache(async () => {
  return await prisma.order.count();
})

export const getTotalRevenue = cache(async () => {
  const orders = await prisma.order.findMany({
    where: { status: "COMPLETED" }
  });

  return orders.reduce((sum, order) => sum + order.total, 0);
})

export const getRecentOrders = cache(async (limit: number = 5) => {
  return await prisma.order.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: {
          mobile: true
        }
      }
    }
  });
})

export const getTopSellingProducts = cache(async (limit: number = 5) => {
  const orderItems = await prisma.orderItem.findMany({
    select: {
      productId: true,
      quantity: true,
      product: true
    },
    orderBy: {
      quantity: 'desc'
    },
    take: limit * 10 // Get more items to account for different products
  });

  // Group by product and sum quantities
  const productQuantities: Record<string, { productId: string, totalQuantity: number, product: any }> = {};

  orderItems.forEach(item => {
    if (productQuantities[item.productId]) {
      productQuantities[item.productId].totalQuantity += item.quantity;
    } else {
      productQuantities[item.productId] = {
        productId: item.productId,
        totalQuantity: item.quantity,
        product: item.product
      };
    }
  });

  // Convert to array and sort by quantity
  const sortedProducts = Object.values(productQuantities)
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, limit);

  return sortedProducts;
})
