import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  const senhaHash = await bcrypt.hash("123456", 10)

  const oficina = await prisma.oficina.create({
    data: {
      nome: "Oficina Central",
      usuarios: {
        create: {
          nome: "Administrador",
          email: "admin@oficina.com",
          senha: senhaHash,
          role: "ADMIN",
        },
      },
    },
  })

  console.log("Usuário criado:", oficina)
}

main()
