'use client'

import { logout } from "@/actions/auth/logout";
import { LOGIN_PAGE } from "@/routes";

interface Props {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  const onClick = async () => {
    await logout()
    window.location.replace(LOGIN_PAGE)
  }

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  )
}
