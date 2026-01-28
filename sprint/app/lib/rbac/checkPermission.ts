import { roles, Role, Permission } from './roles'

export function hasPermission(
  role: Role,
  action: Permission
): boolean {
  const allowed = roles[role]?.includes(action) ?? false

  console.log(
    `[RBAC] ${role} tried ${action}: ${allowed ? 'ALLOWED' : 'DENIED'}`
  )

  return allowed
}
