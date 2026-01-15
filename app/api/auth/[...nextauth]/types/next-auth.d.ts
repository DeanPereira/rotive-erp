import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 })
  }

  const body = await req.json()
  const senhaHash = await bcrypt.hash(body.senha, 10)

  const usuario = await prisma.usuario.create({
    data: {
      nome: body.nome,
      email: body.email,
      senha: senhaHash,
      role: body.role,
      oficinaId: session.user.oficinaId,
    },
  })

  return NextResponse.json(usuario)
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json([], { status: 401 })
  }

  const usuarios = await prisma.usuario.findMany({
    where: { oficinaId: session.user.oficinaId },
  })

  return NextResponse.json(usuarios)
}
