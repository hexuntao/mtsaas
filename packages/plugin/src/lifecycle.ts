import { pluginRegistry, type Plugin } from './registry'

export type LifecycleHook = 'install' | 'uninstall' | 'enable' | 'disable' | 'load' | 'unload'

export interface LifecycleContext {
  tenantId?: string
  userId?: string
}

export interface LifecycleHandler {
  (plugin: Plugin, ctx: LifecycleContext): Promise<void> | void
}

export interface LifecycleHooks {
  install?: LifecycleHandler
  uninstall?: LifecycleHandler
  enable?: LifecycleHandler
  disable?: LifecycleHandler
  load?: LifecycleHandler
  unload?: LifecycleHandler
}

export class PluginLifecycle {
  private hooks = new Map<string, LifecycleHooks>()

  // 注册插件的生命周期钩子
  registerHooks(pluginId: string, hooks: LifecycleHooks) {
    this.hooks.set(pluginId, hooks)
  }

  // 移除插件的生命周期钩子
  unregisterHooks(pluginId: string) {
    this.hooks.delete(pluginId)
  }

  // 获取插件的生命周期钩子
  getHooks(pluginId: string): LifecycleHooks | undefined {
    return this.hooks.get(pluginId)
  }

  // 执行安装
  async install(pluginId: string, ctx: LifecycleContext = {}): Promise<void> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) throw new Error(`Plugin ${pluginId} not found`)
    
    const hooks = this.hooks.get(pluginId)
    if (hooks?.install) {
      await hooks.install(plugin, ctx)
    }
    
    console.log(`[Plugin:${pluginId}] Installed`)
  }

  // 执行卸载
  async uninstall(pluginId: string, ctx: LifecycleContext = {}): Promise<void> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) throw new Error(`Plugin ${pluginId} not found`)
    
    // 先卸载
    if (plugin.loaded) {
      await this.unload(pluginId, ctx)
    }
    
    // 禁用
    pluginRegistry.disable(pluginId)
    
    const hooks = this.hooks.get(pluginId)
    if (hooks?.uninstall) {
      await hooks.uninstall(plugin, ctx)
    }
    
    // 移除钩子
    this.unregisterHooks(pluginId)
    
    console.log(`[Plugin:${pluginId}] Uninstalled`)
  }

  // 执行启用
  async enable(pluginId: string, ctx: LifecycleContext = {}): Promise<boolean> {
    const enabled = pluginRegistry.enable(pluginId)
    if (!enabled) return false
    
    const hooks = this.hooks.get(pluginId)
    if (hooks?.enable) {
      await hooks.enable(pluginRegistry.get(pluginId)!, ctx)
    }
    
    console.log(`[Plugin:${pluginId}] Enabled`)
    return true
  }

  // 执行禁用
  async disable(pluginId: string, ctx: LifecycleContext = {}): Promise<boolean> {
    const disabled = pluginRegistry.disable(pluginId)
    if (!disabled) return false
    
    // 如果已加载，先卸载
    const plugin = pluginRegistry.get(pluginId)
    if (plugin?.loaded) {
      await this.unload(pluginId, ctx)
    }
    
    const hooks = this.hooks.get(pluginId)
    if (hooks?.disable) {
      await hooks.disable(plugin!, ctx)
    }
    
    console.log(`[Plugin:${pluginId}] Disabled`)
    return true
  }

  // 加载插件（实例化）
  async load(pluginId: string, ctx: LifecycleContext = {}): Promise<boolean> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) return false
    if (!plugin.enabled) {
      console.warn(`[Plugin:${pluginId}] Cannot load disabled plugin`)
      return false
    }
    if (plugin.loaded) {
      console.warn(`[Plugin:${pluginId}] Already loaded`)
      return true
    }
    
    const hooks = this.hooks.get(pluginId)
    if (hooks?.load) {
      await hooks.load(plugin, ctx)
    }
    
    plugin.loaded = true
    console.log(`[Plugin:${pluginId}] Loaded`)
    return true
  }

  // 卸载插件
  async unload(pluginId: string, ctx: LifecycleContext = {}): Promise<boolean> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) return false
    if (!plugin.loaded) {
      return true
    }
    
    const hooks = this.hooks.get(pluginId)
    if (hooks?.unload) {
      await hooks.unload(plugin, ctx)
    }
    
    plugin.loaded = false
    plugin.instance = undefined
    console.log(`[Plugin:${pluginId}] Unloaded`)
    return true
  }

  // 批量加载所有启用的插件
  async loadAll(ctx: LifecycleContext = {}): Promise<void> {
    const enabledPlugins = pluginRegistry.listEnabled()
    for (const plugin of enabledPlugins) {
      await this.load(plugin.manifest.id, ctx)
    }
  }

  // 批量卸载所有插件
  async unloadAll(ctx: LifecycleContext = {}): Promise<void> {
    const loadedPlugins = pluginRegistry.listLoaded()
    for (const plugin of loadedPlugins) {
      await this.unload(plugin.manifest.id, ctx)
    }
  }

  // 检查循环依赖（简化版）
  detectCircularDependencies(dependencies: string[]): boolean {
    // 这里可以实现更复杂的依赖图检测
    // 简化：检查是否有插件依赖于自己
    for (const dep of dependencies) {
      if (dependencies.filter((d) => d === dep).length > 1) {
        return true // 重复依赖
      }
    }
    return false
  }
}

export const pluginLifecycle = new PluginLifecycle()
