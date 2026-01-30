export type Role = 'admin' | 'editor' | 'viewer'
export type Permission = 'create' | 'read' | 'update' | 'delete'

export const roles: Record<Role, Permission[]> = {
  admin: ['create', 'read', 'update', 'delete'],
  editor: ['read', 'update'],
  viewer: ['read'],
}
