import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      role: string
      oficinaId: string
    } & DefaultSession["user"]
  }
}
