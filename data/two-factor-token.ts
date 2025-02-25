import { db } from '@/lib/db';

export const getTwoFactorTokenByEmail = async (email:string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    })

    return twoFactorToken
  } catch (error) {
    throw error
  }
}

export const getTwoFactorTokenByToken = async (token:string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    })

    return twoFactorToken
  } catch (error) {
    throw error
  }
}