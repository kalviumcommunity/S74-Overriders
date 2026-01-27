import { Role } from '@/lib/rbac/roles'

export function getUserFromRequest(req: Request) {
  const role = req.headers.get('x-user-role') as Role | null

  if (!role) return null

  return {
    id: 1,
    role,
  }
}
