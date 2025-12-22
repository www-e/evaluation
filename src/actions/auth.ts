"use server"

import { prisma } from "@/lib/prisma"

export async function syncUser(mobile: string, fullName: string) {
  if (!mobile || !fullName) {
    return { error: "Missing required fields" }
  }

  try {
    const user = await prisma.user.upsert({
      where: { mobile },
      update: { fullName }, // Update name if they re-register/login and name changed (optional behavior)
      create: {
        mobile,
        fullName,
      },
    })
    return { success: true, userId: user.id }
  } catch (error) {
    console.error("Sync User Error:", error)
    return { error: "Failed to sync user" }
  }
}

export async function checkUserExists(mobile: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { mobile },
    })
    return { exists: !!user, user }
  } catch (error) {
    return { error: "Database error" }
  }
}
