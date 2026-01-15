import { PrismaClient } from "@prisma/client"

declare global {
  // garantir que client não recrie instância em hot-reload
  var prisma: PrismaClient | undefined
}

export const prisma =
  global.prisma ??
  new PrismaClient({
    log: ["query"], // opcional para debugar queries
  })

if (process.env.NODE_ENV !== "production") global.prisma = prisma
