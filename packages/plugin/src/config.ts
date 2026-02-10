import { z } from 'zod'

// 插件配置 Schema
export const pluginConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  enabled: z.boolean().optional(),
  config: z.record(z.unknown()).optional(),
  permissions: z.array(z.string()).optional(),
})

export type PluginConfig = z.infer<typeof pluginConfigSchema>

// 租户级插件配置
export const tenantPluginConfigSchema = z.object({
  tenantId: z.string().uuid(),
  plugins: z.array(pluginConfigSchema).default([]),
})

export type TenantPluginConfig = z.infer<typeof tenantPluginConfigSchema>

// 插件配置管理器
export class PluginConfigManager {
  private configs = new Map<string, PluginConfig>()
  private tenantConfigs = new Map<string, TenantPluginConfig>()

  // 获取插件配置
  getPluginConfig(pluginId: string): PluginConfig | undefined {
    return this.configs.get(pluginId)
  }

  // 设置插件配置
  setPluginConfig(config: PluginConfig): void {
    this.configs.set(config.id, config)
  }

  // 删除插件配置
  deletePluginConfig(pluginId: string): boolean {
    return this.configs.delete(pluginId)
  }

  // 获取租户级插件配置
  getTenantConfig(tenantId: string): TenantPluginConfig | undefined {
    return this.tenantConfigs.get(tenantId)
  }

  // 设置租户级插件配置
  setTenantConfig(config: TenantPluginConfig): void {
    this.tenantConfigs.set(config.tenantId, config)
  }

  // 为租户启用插件
  enablePluginForTenant(tenantId: string, pluginId: string, config?: Record<string, unknown>): boolean {
    let tenantConfig = this.tenantConfigs.get(tenantId)
    
    if (!tenantConfig) {
      tenantConfig = {
        tenantId,
        plugins: [],
      }
      this.tenantConfigs.set(tenantId, tenantConfig)
    }
    
    const existingPlugin = tenantConfig.plugins.find((p) => p.id === pluginId)
    if (existingPlugin) {
      existingPlugin.enabled = true
      if (config) {
        existingPlugin.config = { ...existingPlugin.config, ...config }
      }
    } else {
      tenantConfig.plugins.push({
        id: pluginId,
        name: pluginId,
        version: '0.0.0',
        enabled: true,
        permissions: [],
        config: config || {},
      })
    }
    
    return true
  }

  // 为租户禁用插件
  disablePluginForTenant(tenantId: string, pluginId: string): boolean {
    const tenantConfig = this.tenantConfigs.get(tenantId)
    if (!tenantConfig) return false
    
    const plugin = tenantConfig.plugins.find((p) => p.id === pluginId)
    if (plugin) {
      plugin.enabled = false
      return true
    }
    return false
  }

  // 获取租户已启用的插件列表
  getEnabledPluginsForTenant(tenantId: string): PluginConfig[] {
    const tenantConfig = this.tenantConfigs.get(tenantId)
    if (!tenantConfig) return []
    
    return tenantConfig.plugins.filter((p) => p.enabled)
  }

  // 合并配置（全局配置 + 租户配置）
  mergeConfigs(globalConfig: PluginConfig, tenantConfig?: PluginConfig): PluginConfig {
    if (!tenantConfig) return globalConfig
    
    return {
      ...globalConfig,
      config: {
        ...globalConfig.config,
        ...tenantConfig.config,
      },
      enabled: tenantConfig.enabled,
    }
  }
}

export const pluginConfigManager = new PluginConfigManager()
