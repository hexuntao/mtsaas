import { pluginRegistry, pluginLifecycle, type PluginManifest, type LifecycleContext } from '@mtsaas/plugin'
import { z } from 'zod'

// Blog 插件配置 Schema
export const blogConfigSchema = z.object({
  postsPerPage: z.number().min(1).max(100).default(10),
  enableComments: z.boolean().default(true),
  enableDrafts: z.boolean().default(false),
  markdown: z.object({
    highlight: z.boolean().default(true),
    math: z.boolean().default(false),
  }).default({}),
})

export type BlogConfig = z.infer<typeof blogConfigSchema>

// Blog 帖子 Schema
export const blogPostSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/),
  content: z.string(),
  excerpt: z.string().optional(),
  authorId: z.string().uuid(),
  authorName: z.string(),
  publishedAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  featuredImage: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export type BlogPost = z.infer<typeof blogPostSchema>

// Blog 插件清单
export const blogManifest: PluginManifest = {
  id: '@plugin/blog',
  name: 'Blog',
  version: '0.1.0',
  description: 'MDX Blog system with categories, tags, and authors',
  author: 'mtsaas',
  permissions: ['posts:read', 'posts:write', 'comments:read', 'comments:write'],
  entry: './src/index.ts',
}

// 注册 Blog 插件
export function registerBlogPlugin() {
  pluginRegistry.register(blogManifest)
  
  // 注册生命周期钩子
  pluginLifecycle.registerHooks('@plugin/blog', {
    install: async (plugin, ctx) => {
      console.log('[Blog Plugin] Installing...')
      // 可以在这里创建数据库表、初始化配置等
    },
    enable: async (plugin, ctx) => {
      console.log('[Blog Plugin] Enabled for tenant:', ctx.tenantId)
    },
    disable: async (plugin, ctx) => {
      console.log('[Blog Plugin] Disabled for tenant:', ctx.tenantId)
    },
    uninstall: async (plugin, ctx) => {
      console.log('[Blog Plugin] Uninstalling...')
      // 可以在这里清理数据库表等
    },
  })
}
