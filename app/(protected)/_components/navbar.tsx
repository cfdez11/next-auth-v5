'use client'

import { UserButton } from "@/components/auth/user-button"
import { Button } from "@/components/ui/button"
import { ADMIN_PAGE, CLIENT_PAGE, SERVER_PAGE, SETTINGS_PAGE } from "@/routes"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={SERVER_PAGE === pathname ? 'default' : 'outline'}>
          <Link href={SERVER_PAGE}>
            Server
          </Link>
        </Button>
        <Button asChild variant={CLIENT_PAGE === pathname ? 'default' : 'outline'}>
          <Link href={CLIENT_PAGE}>
            Client
          </Link>
        </Button>
        <Button asChild variant={ADMIN_PAGE === pathname ? 'default' : 'outline'}>
          <Link href={ADMIN_PAGE}>
            Admin
          </Link>
        </Button>
        <Button asChild variant={SETTINGS_PAGE === pathname ? 'default' : 'outline'}>
          <Link href={SETTINGS_PAGE}>
            Setttings
          </Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  )
}
