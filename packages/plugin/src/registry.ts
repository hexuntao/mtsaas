import { z } from 'zod'

export const pluginManifestSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  description: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.record(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
  entry: z.string().optional(),
})

export type PluginManifest = z.infer<typeof pluginManifestSchema>

export interface Plugin {
  manifest: PluginManifest
  enabled: boolean
  loaded: boolean
  instance?: unknown
}

export class PluginRegistry {
  private plugins = new Map<string, Plugin>()

  register(manifest: PluginManifest) {
    if (this.plugins.has(manifest.id)) {
      console.warn(`Plugin ${manifest.id} already registered, skipping`)
      return
    }
    this.plugins.set(manifest.id, {
      manifest,
      enabled: false,
      loaded: false,
    })
  }

  unregister(id: string) {
    this.plugins.delete(id)
  }

  get(id: string): Plugin | undefined {
    return this.plugins.get(id)
  }

  getByName(name: string): Plugin | undefined {
    for (const plugin of this.plugins.values()) {
      if (plugin.manifest.name === name) {
        return plugin
      }
    }
    return undefined
  }

  list(): Plugin[] {
    return Array.from(this.plugins.values())
  }

  listEnabled(): Plugin[] {
    return this.list().filter((p) => p.enabled)
  }

  listLoaded(): Plugin[] {
    return this.list().filter((p) => p.loaded)
  }

  enable(id: string): boolean {
    const plugin = this.plugins.get(id)
    if (!plugin) return false
    plugin.enabled = true
    return true
  }

  disable(id: string): boolean {
    const plugin = this.plugins.get(id)
    if (!plugin) return false
    plugin.enabled = false
    plugin.loaded = false
    plugin.instance = undefined
    return true
  }
}

export const pluginRegistry = new PluginRegistry()
