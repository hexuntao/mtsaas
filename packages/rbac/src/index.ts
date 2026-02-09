import { supabase, createServerClient } from '@mtsaas/db'
import { roleSchema, permissionSchema, userRoleSchema, resourcePermissionSchema, type Role, type Permission, type UserRole, type ResourcePermission, SYSTEM_ROLES } from './schema'
import { cache } from '@mtsaas/cache'

// 权限缓存 key
function getPermissionCacheKey(userId: string, permission: string, resource?: string): string {
  return `permission:${userId}:${permission}${resource ? `:${resource}` : ''}`
}

// 检查用户是否有指定权限
export async function hasPermission(
  userId: string,
  permission: string,
  tenantId?: string
): Promise<boolean> {
  const cacheKey = getPermissionCacheKey(userId, permission, tenantId)

  // 检查缓存
  const cached = await cache.get<boolean>(cacheKey)
  if (cached !== null) return cached

  // 查询数据库
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      roles!inner (
        permissions
      )
    `)
    .eq('user_id', userId)
    .eq('tenant_id', tenantId || null)
    .single()

  if (error || !data) {
    await cache.set(cacheKey, false, 300)
    return false
  }

  const hasAccess = (data as any).roles?.permissions?.includes(permission) || false
  await cache.set(cacheKey, hasAccess, 300)

  return hasAccess
}

// 检查用户是否有指定角色
export async function hasRole(
  userId: string,
  roleName: string,
  tenantId?: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('user_roles')
    .select(`
      roles!inner (
        name
      )
    `)
    .eq('user_id', userId)
    .eq('roles.name', roleName)
    .eq('tenant_id', tenantId || null)
    .single()

  return !error && !!data
}

// 获取用户的所有角色
export async function getUserRoles(userId: string, tenantId?: string): Promise<Role[]> {
  const { data, error } = await supabase
    .from('user_roles')
    .select('roles(*)')
    .eq('user_id', userId)
    .eq('tenant_id', tenantId || null)

  if (error || !data) return []

  return data
    .map((r: any) => r.roles)
    .filter((r: any) => r)
    .map((r: any) => roleSchema.safeParse(r))
    .filter((r: any) => r.success)
    .map((r: any) => r.data as Role)
}

// 为用户分配角色
export async function assignRole(
  userId: string,
  roleId: string,
  tenantId?: string
): Promise<UserRole | null> {
  const { data, error } = await supabase
    .from('user_roles')
    .insert({
      user_id: userId,
      role_id: roleId,
      tenant_id: tenantId,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  return data
}

// 检查用户对资源的访问权限
export async function canAccessResource(
  userId: string,
  resourceType: string,
  resourceId: string,
  requiredPermission: 'owner' | 'editor' | 'viewer'
): Promise<boolean> {
  const { data, error } = await supabase
    .from('resource_permissions')
    .select('permission')
    .or(`user_id.eq.${userId},team_id.in.(SELECT team_id FROM team_members WHERE user_id = '${userId}')`)
    .eq('resource_type', resourceType)
    .eq('resource_id', resourceId)
    .single()

  if (error || !data) return false

  const permissionHierarchy: Record<string, number> = {
    viewer: 1,
    editor: 2,
    owner: 3,
  }

  const currentPerm = (data as any).permission as string
  const requiredPerm = requiredPermission as string

  return (permissionHierarchy[currentPerm] ?? 0) >= (permissionHierarchy[requiredPerm] ?? 0)
}

// 创建新角色
export async function createRole(input: {
  name: string
  description?: string
  permissions: string[]
  tenantId?: string
}): Promise<Role | null> {
  const { data, error } = await supabase
    .from('roles')
    .insert({
      name: input.name,
      description: input.description,
      permissions: input.permissions,
      tenant_id: input.tenantId,
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  const result = roleSchema.safeParse(data)
  return result.success ? result.data : null
}

// 获取所有可用权限列表
export async function listPermissions(): Promise<Permission[]> {
  const { data, error } = await supabase
    .from('permissions')
    .select('*')

  if (error || !data) return []

  return data
    .map((p: any) => permissionSchema.safeParse(p))
    .filter((p: any) => p.success)
    .map((p: any) => p.data as Permission)
}
