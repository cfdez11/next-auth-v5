export const HOME_PAGE = '/'
export const NEW_VERIFICATION_PAGE ='/auth/new-verification'
export const publicRoutes = [
  HOME_PAGE,
  NEW_VERIFICATION_PAGE,
]

export const LOGIN_PAGE = '/auth/login'
export const REGISTER_PAGE = '/auth/register'
export const ERROR_PAGE = '/auth/error'
export const RESET_PASSWORD_PAGE = '/auth/reset'
export const NEW_PASSWORD_PAGE = '/auth/new-password'
export const authRoutes = [
  LOGIN_PAGE,
  REGISTER_PAGE,
  ERROR_PAGE,
  RESET_PASSWORD_PAGE,
  NEW_PASSWORD_PAGE,
]

export const apiAuthPrefix = '/api/auth'

export const SETTINGS_PAGE = '/settings'
export const CLIENT_PAGE = '/client'
export const SERVER_PAGE = '/server'
export const ADMIN_PAGE = '/admin'
export const privateRoutes = [
  SETTINGS_PAGE,
  CLIENT_PAGE,
  SERVER_PAGE,
  ADMIN_PAGE,
]

export const DEFAULT_LOGIN_REDIRECT = '/settings'