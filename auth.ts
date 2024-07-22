import NextAuth from "next-auth"
import authConfig from "./auth.config"
 
import { PrismaClient, UserRole } from "@prisma/client"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/data/user"
import { db } from "@/lib/db"
import { ERROR_PAGE, LOGIN_PAGE } from "./routes"
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation"
import { getAccountByUserId } from "./data/account"
 
const prisma = new PrismaClient()
 
export const { handlers: { GET, POST }, auth, signIn, signOut, unstable_update } = NextAuth({
  pages: {
    signIn: LOGIN_PAGE,
    error: ERROR_PAGE,
  },
  events: {
    async linkAccount ({ user }) {
      // linkAccount is executed when there is a sign by external provider 
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow oauth without email verification
      if(account?.provider !== "credentials") return true

      
      if(!user.id) return false

      const existingUser = await getUserById(user.id)

      // prevent sign in without email verification
      if(!existingUser || !existingUser.emailVerified) return false 

      if(existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
        
        if(!twoFactorConfirmation) return false

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        })
      }

      return true
    },
    session({ session, token }) {
      if(session.user) {
        if(token.sub) session.user.id = token.sub
        session.user.role = token.role as UserRole          
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.isOAuth = token.isOAuth as boolean
      }
    
      return session
    },
    async jwt({ token }) {
      if(!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token
      
      const existingAccount = await getAccountByUserId(existingUser.id)

      // add all the attributes that can be modified during the session
      token.isOAuth = !!existingAccount
      token.name = existingUser.name
      token.email = existingUser.email
      token.role = existingUser.role
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

      return token
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})