// ## File: src/lib/prisma.ts
import { PrismaClient } from '@prisma/client' 
// Note: If you used custom output in schema, import from there instead.
// e.g. import { PrismaClient } from '../generated/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma