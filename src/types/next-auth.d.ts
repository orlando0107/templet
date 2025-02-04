import { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: Role[];
      image?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    name?: string;
    email: string;
    emailVerified?: Date;
    role: Role[];
    image?: string;
  }

  type Role = 'USER' | 'ADMIN';

  interface JWT {
    id: string;
    email: string;
    role: Role[];
  }
}
