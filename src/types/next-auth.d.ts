import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      image?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name?: string;
    email: string;
    emailVerified?: Date;
    role: string;
    image?: string;
  }

  interface JWT {
    id: string;
    email: string;
    role: string;
  }
}
