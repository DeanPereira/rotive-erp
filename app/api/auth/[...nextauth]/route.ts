import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: {},
        senha: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          return null
        }

        const usuario = await prisma.usuario.findUnique({
          where: { email: credentials.email },
          include: { oficina: true },
        })

        if (!usuario) return null

        const senhaValida = await bcrypt.compare(
          credentials.senha,
          usuario.senha
        )

        if (!senhaValida) return null

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nome,
          role: usuario.role,
          oficinaId: usuario.oficinaId,
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.oficinaId = user.oficinaId
      }
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      session.user.oficinaId = token.oficinaId
      return session
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
