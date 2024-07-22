'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RoleGate } from "../_components/role-gate"
import { FormSuccess } from "@/components/form/form-success"
import { UserRole } from "@prisma/client"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { admin } from "@/actions/admin"

export default function AdminPage() {
  const onApiRouteClick = () => {
    fetch('/api/admin')
      .then((response) => {
        if (response.ok) {
          toast.success('Allowed API Route!')
        } else {
          toast.success('Forbidden API Route!')
        }
      })
  }

  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.error) {
          toast.error(data.error)
        }
        if (data.success) {
          toast.success(data.success)
        }
      })
  }

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">
          Admin
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={onApiRouteClick}>
            Click to test
          </Button>
        </div>
        <div className="flex flex-row justify-between items-center rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">
            Admin-only Server action
          </p>
          <Button onClick={() => onServerActionClick()}>
            Click to test
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
