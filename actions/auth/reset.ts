'use server'

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { ResetSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { getUserByEmail } from '@/data/user';
import { generatePasswordResetToken, generateVerificationToken } from '@/lib/tokens';
import { sendPasswordResetEmail, sendVerificationEmail } from '@/lib/mail';

export const sendResetEmail = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  
  if(!validatedFields.success) {
    return { error: "Invalid fields!"};
  }

  const { email } = validatedFields.data

  const existingUser = await getUserByEmail(email)

  if(!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exists" }
  }

  
  if(!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    
    await sendVerificationEmail(verificationToken.email, verificationToken.token)

    return { error: 'Email not verified, confirmation email sent to verify your email!'}
  }


  const passwordResetToken = await generatePasswordResetToken(existingUser.email)

  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

  return { success: 'Reset password email sent!'}
}