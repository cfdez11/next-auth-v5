import NextAuth from "next-auth"
import authConfig from "./auth.config"

import { DEFAULT_LOGIN_REDIRECT, publicRoutes, apiAuthPrefix, authRoutes, LOGIN_PAGE } from '@/routes'
import { NextResponse } from "next/server"
const { auth: middleware } = NextAuth(authConfig)

export default middleware((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callBackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callBackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callBackUrl)
    return Response.redirect(new URL(`${LOGIN_PAGE}?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};