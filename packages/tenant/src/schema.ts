import { z } from 'zod'

export const tenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  domain: z.string().nullable().optional(),
  plan: z.enum(['free', 'pro', 'enterprise']).default('free'),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Tenant = z.infer<typeof tenantSchema>

export const createTenantSchema = tenantSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
})

export type CreateTenantInput = z.infer<typeof createTenantSchema>
