import { UserRole } from '@prisma/client';
import NextAuth, { DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
}

// sobreescribimos los tipos / interfaces de next auth, para adaptarlos a nuestra aplicación
declare module 'next-auth' {
  interface Session {
    user: ExtendedUser,
  }
}