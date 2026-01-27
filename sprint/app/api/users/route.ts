import { NextResponse } from 'next/server'
import { getUserFromRequest } from '@/lib/auth/getUserFromRequest'
import { hasPermission } from '@/lib/rbac/checkPermission'

export async function DELETE(req: Request) {
  const user = getUserFromRequest(req)

  if (!user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (!hasPermission(user.role, 'delete')) {
    return NextResponse.json(
      { success: false, message: 'Forbidden' },
      { status: 403 }
    )
  }

  return NextResponse.json({
    success: true,
    message: 'User deleted',
  })
}
