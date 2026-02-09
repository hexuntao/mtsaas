import { supabase, createServerClient } from '@mtsaas/db'
import { tenantSchema, type Tenant } from './schema'

export async function getTenantBySlug(slug: string): Promise<Tenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data) return null

  const result = tenantSchema.safeParse(data)
  return result.success ? result.data : null
}

export async function getTenantById(id: string): Promise<Tenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null

  const result = tenantSchema.safeParse(data)
  return result.success ? result.data : null
}

export async function createTenant(input: {
  name: string
  slug: string
  plan?: 'free' | 'pro' | 'enterprise'
}): Promise<Tenant | null> {
  const { data, error } = await supabase
    .from('tenants')
    .insert({
      name: input.name,
      slug: input.slug,
      plan: input.plan || 'free',
    })
    .select()
    .single()

  if (error) throw new Error(error.message)

  const result = tenantSchema.safeParse(data)
  return result.success ? result.data : null
}

export async function listTenants(): Promise<Tenant[]> {
  const { data, error } = await supabase
    .from('tenants')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return data
    .map((t) => tenantSchema.safeParse(t))
    .filter((r) => r.success)
    .map((r) => r.data as Tenant)
}

export function isSingleTenantMode(): boolean {
  return process.env.TENANT_MODE === 'single'
}

export function getDefaultTenantSlug(): string {
  return process.env.DEFAULT_TENANT_SLUG || 'default'
}
