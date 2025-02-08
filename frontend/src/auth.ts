import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from "@auth/core/types";
import "next-auth/jwt";
import { authProviders } from "@/lib/providers";
import { prisma } from "./db/connection";

const conection = prisma

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(conection),
  providers: authProviders,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role ?? "user";
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = token.role as string;
      session.user.name = token.name ?? "";
      session.user.image =
        typeof token.image === "string" ? token.image : undefined;
      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    newUser:"/dashboard",
    error: "/error",
  },

  secret: process.env.NEXTAUTH_SECRET as string,
});
