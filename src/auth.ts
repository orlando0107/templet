import Nodemailer from 'next-auth/providers/nodemailer';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db/ConnectPrisma';
import NextAuth, { Role } from 'next-auth';
export type {
  Account,
  DefaultSession,
  Profile,
  Session,
  User,
} from '@auth/core/types';
import 'next-auth/jwt';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.role = (token.role as Role[]) || [];
      session.user.name = token.name as string;
      session.user.image = typeof token.image === 'string' ? token.image : undefined;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login', // Página personalizada de inicio de sesión
    error: '/error', // Página personalizada de errores
  },
});
