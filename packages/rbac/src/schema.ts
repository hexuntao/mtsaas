import { z } from 'zod'

// 角色定义
export const roleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().nullable().optional(),
  permissions: z.array(z.string()).default([]),
  tenant_id: z.string().uuid().nullable().optional(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
})

export type Role = z.infer<typeof roleSchema>

// 权限定义
export const permissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  resource: z.string().min(1).max(50),
  action: z.enum(['create', 'read', 'update', 'delete', 'admin']),
})

export type Permission = z.infer<typeof permissionSchema>

// 用户角色关联
export const userRoleSchema = z.object({
  user_id: z.string().uuid(),
  role_id: z.string().uuid(),
  tenant_id: z.string().uuid().nullable().optional(),
})

export type UserRole = z.infer<typeof userRoleSchema>

// 资源权限
export const resourcePermissionSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid().nullable().optional(),
  team_id: z.string().uuid().nullable().optional(),
  resource_type: z.string(),
  resource_id: z.string(),
  permission: z.enum(['owner', 'editor', 'viewer']),
})

export type ResourcePermission = z.infer<typeof resourcePermissionSchema>

// 预定义角色
export const SYSTEM_ROLES = {
  OWNER: 'owner',
  ADMIN: 'admin',
  MEMBER: 'member',
  VIEWER: 'viewer',
} as const
