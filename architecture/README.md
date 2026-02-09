# mtsaas 架构文档

> **2026 版本** | 基于 Next.js 16 + Zod v4 + Turborepo 最新技术栈

---

## 项目概述

构建一个完整的 SaaS Boilerplate，具有**三大核心特点**：

| 特点 | 说明 |
|------|------|
| **双模式定位** | 单租户模式（独立开发者）+ 多租户模式（企业 B2B SaaS） |
| **统一权限** | 单租户 = 默认租户，使用完全相同的三层权限系统 |
| **插件架构** | 核心功能精简，扩展功能按需启用 |
| **应用分离** | Platform（用户端） + Console（管理端）独立部署 |

---

## 技术栈（2026 最新）

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **框架** | Next.js | 16.1+ | proxy.ts、async APIs、cache components |
| **语言** | TypeScript | 5.8+ | 类型安全 |
| **Monorepo** | Turborepo | 2.0+ | 远程缓存、增量构建 |
| **包管理器** | pnpm | 9.0+ | 高效依赖管理 |
| **数据库** | Supabase | PostgreSQL 16 | RLS、分区表 |
| **认证** | Supabase Auth | Latest | 多种登录方式 |
| **UI 组件** | shadcn/ui | Latest | 可复制组件 |
| **样式** | Tailwind CSS | 4.1+ | 现代化样式 |
| **状态管理** | Zustand | 5.0+ | 轻量级状态管理 |
| **表单** | React Hook Form | 7.0+ | 高性能表单 |
| **验证** | Zod | v4.0+ | 14.71x 性能提升 |
| **缓存** | Redis | 7.0+ | 分布式缓存 |
| **AI** | Vercel AI SDK | Latest | AI 功能集成 |
| **支付** | Stripe | Latest | 支付系统 |
| **邮件** | Resend | Latest | 邮件发送 |
| **文档** | Fumadocs | v16+ | 文档站点 |
| **代码规范** | Biome | 2.0+ | 100x 比 ESLint 快 |
| **监控** | Sentry | Latest | 错误追踪 |
| **分析** | Vercel Analytics | Latest | 性能分析 |

---

## 核心架构

### Monorepo 结构

```
mtsaas/
├── apps/
│   ├── platform/               # 🔵 用户端应用（租户业务界面）
│   │   ├── app/
│   │   │   ├── [locale]/        # i18n
│   │   │   │   ├── (marketing)/ # 营销页面
│   │   │   │   ├── (auth)/      # 登录注册
│   │   │   │   ├── [tenant]/(app)/ # 租户应用 /app/*
││   │   │   │   └── blog/       # 🔥 博客（插件）
│   │   │   ├── public/          # 静态资源
│   │   │   ├── proxy.ts         # Next.js 16 Proxy
│   │   │   └── api/             # API Routes
│   │   └── package.json
│   │
│   ├── console/                # 🟣 管理端应用（平台管理）
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── (marketing)/ # 管理端营销页
│   │   │   │   ├── (auth)/      # 管理员登录
│   │   │   │   └── (console)/   # 管理后台
│   │   │   │       ├── dashboard/    # 总览
│   │   │   │       ├── tenants/      # 租户管理
│   │   │   │       ├── users/        # 用户管理
│   │   │   │       ├── plugins/      # 插件管理
│   │   │   │       ├── audit/        # 审计日志
│   │   │   │       └── settings/     # 系统设置
│   │   │   ├── public/
│   │   │   ├── proxy.ts
│   │   │   └── api/
│   │   └── package.json
│   │
│   ├── docs/                   # 📚 文档站点 (Fumadocs v16)
│   ├── stripe-webhook/         # 🔴 Stripe Webhook 服务
│   └── jobs/                   # ⏰ Cron Jobs 服务
│
├── packages/
│   │   # 🔥 核心包（必需）
│   ├── ui/                     # shadcn/ui 组件库
│   ├── db/                     # Supabase 客户端 + 类型 + 迁移
│   ├── auth/                   # 认证系统
│   ├── tenant/                 # 租户系统（子域名/子目录）
│   ├── rbac/                   # 三层权限系统
│   ├── plugin/                 # 🔌 插件系统核心
│   ├── menu/                   # 动态菜单系统（权限驱动）
│   ├── config/                 # 租户配置系统
│   ├── events/                 # 事件驱动系统
│   ├── audit/                  # 审计日志系统
│   ├── cache/                  # 🆕 统一缓存层（Redis + 内存）
│   ├── api/                    # API 契约 + 类型
│   ├── i18n/                   # 国际化（中英文）
│   └── monitoring/             # 🆕 监控系统（Sentry + Analytics）
│   │
│   │   # 🔌 插件包（可选）
│   ├── plugins/
│   │   ├── blog/               # 📝 MDX 博客系统插件
│   │   ├── ai/                 # 🤖 AI 功能插件 (Vercel AI SDK)
│   │   ├── payments/           # 💳 Stripe + 积分系统插件
│   │   ├── notifications/      # 📧 邮件 (Resend) + 站内消息插件
│   │   ├── storage/            # 📦 存储抽象插件 (R2/阿里云/腾讯云/本地)
│   │   ├── api-keys/           # 🔑 API Key 管理插件
│   │   ├── webhooks/           # 🔗 Webhook 配置插件
│   │   ├── forms/              # 📋 表单构建器插件
│   │   ├── analytics/          # 📊 数据分析插件
│   │   └── crm/                # 👥 CRM 插件
│   │
│   └── tooling/                # 工具配置 (Biome + TS + Tailwind + Turbo)
```

---

## 三层权限模型

```
┌─────────────────────────────────────────────────────────┐
│                    三层权限模型（统一）                   │
├─────────────────────────────────────────────────────────┤
│  第一层: 功能权限 (RBAC)                                 │
│  用户 → 角色 → 权限 (控制菜单/功能访问)                  │
│                                                          │
│  第二层: 资源权限 (Resource-Based)                       │
│  Teams + Resources + ResourcePermissions (资源所有权)   │
│                                                          │
│  第三层: 数据权限 (Data-Level - RLS)                     │
│  Supabase RLS 策略 (字段级、行级隔离)                    │
└─────────────────────────────────────────────────────────┘

单租户模式: 所有用户属于 "default" 租户
多租户模式: 每个企业独立租户
```

---

## 应用架构

### Platform vs Console

```
┌─────────────────────────────────────────────────────────────┐
│                    应用架构设计                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Platform（用户端）                    Console（管理端）       │
│  ┌─────────────────┐                ┌─────────────────┐    │
│  • 租户业务界面      │                • 平台管理界面    │    │
│  • 用户仪表盘        │                • 租户管理        │    │
│  • 业务功能          │                • 用户管理        │    │
│  • 插件功能          │                • 插件管理        │    │
│  • 品牌可自定义      │                • 审计日志        │    │
│  • 独立部署          │                • 系统设置        │    │
│  └─────────────────┘                └─────────────────┘    │
│                                                             │
│  共享核心包：                                                 │
│  • @mtsaas/tenant, @mtsaas/rbac, @mtsaas/plugin, ...      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 部署策略

| 应用 | 部署方式 | 域名 |
|------|---------|------|
| **platform** | 独立部署 | 可绑定租户自定义域名 |
| **console** | 独立部署 | `console.mtsaas.com` |
| **docs** | 独立部署 | `docs.mtsaas.com` |
| **stripe-webhook** | 独立部署 | webhook.mtsaas.com |
| **jobs** | 独立部署 | 无需公网访问 |

---

## 插件系统

### 插件架构

```
核心系统 ← 插件管理器 → 插件注册表
              ↓
        插件生命周期 + 插件配置
              ↓
        10+ 内置插件
```

### 内置插件

| 插件 | 功能 | 技术栈 |
|------|------|--------|
| `@plugin/blog` | MDX 博客、分类、标签、作者、SEO | next-mdx-remote |
| `@plugin/ai` | AI 文本/图像生成、聊天、积分系统 | Vercel AI SDK + Anthropic + OpenAI |
| `@plugin/payments` | Stripe 订阅、一次性支付、积分 | Stripe |
| `@plugin/notifications` | 邮件通知、站内消息 | Resend + React Email |
| `@plugin/storage` | 存储抽象（R2/阿里云/腾讯云/本地）| AWS S3 SDK |
| `@plugin/api-keys` | API Key 管理、权限控制、速率限制 | crypto + Redis |
| `@plugin/webhooks` | Webhook 配置、事件订阅 | HTTP POST + 签名验证 |
| `@plugin/forms` | 表单构建器 | React Hook Form + Zod v4 |
| `@plugin/analytics` | 用户行为分析 | 自建 + 隐私合规 |
| `@plugin/crm` | 客户关系管理 | 自建 |

---

## Next.js 16 特性使用

### 1. proxy.ts（替代 middleware.ts）

```typescript
// apps/platform/proxy.ts
import { createProxy } from 'next/server'

export const proxy = createProxy(async (req) => {
  const mode = process.env.TENANT_MODE || 'multi'

  // 单租户模式：直接返回默认租户
  if (mode === 'single') {
    return {
      request: {
        headers: {
          'x-tenant-id': process.env.DEFAULT_TENANT_ID!,
          'x-tenant-slug': 'default',
          'x-locale': getLocaleFromRequest(req),
        }
      }
    }
  }

  // 多租户模式：从请求解析租户
  const tenant = await getTenantFromRequest(req)
  const locale = getLocaleFromRequest(req)

  return {
    request: {
      headers: {
        'x-tenant-id': tenant?.id || '',
        'x-tenant-slug': tenant?.slug || '',
        'x-locale': locale,
      }
    }
  }
})
```

### 2. async params

```typescript
// apps/platform/app/[tenant]/(app)/dashboard/page.tsx
export default async function DashboardPage({
  params,
}: {
  params: Promise<{ tenant: string }>
}) {
  const { tenant } = await params  // 必须使用 await

  // async cookies/headers
  const cookies = await cookies()
  const headers = await headers()

  // ...
}
```

### 3. async cookies/headers

```typescript
import { cookies, headers } from 'next/headers'

export default async function Page() {
  const cookiesStore = await cookies()
  const headersList = await headers()

  const theme = cookiesStore.get('theme')?.value
  const userAgent = headersList.get('user-agent')
  // ...
}
```

### 4. cache components

```typescript
import { cacheLife, cacheTag } from 'next/cache'

export default async function TenantList() {
  'use cache'
  cacheLife('max')
  cacheTag('tenants')

  const tenants = await getTenants()
  return <div>{/* ... */}</div>
}
```

---

## Zod v4 特性使用

### 基础验证

```typescript
import { z } from 'zod'

// 用户创建 schema
export const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).regex(/[A-Z]/, '必须包含大写字母'),
  name: z.string().min(2),
  role: z.enum(['user', 'admin', 'owner']).default('user'),
})

// 类型推断
type CreateUserInput = z.infer<typeof createUserSchema>
```

### Zod Mini（客户端优化）

```typescript
// 客户端使用 Zod Mini 减小 bundle
import * as z from 'zod/mini'

const schema = z.string().minLength(8)
```

---

## 缓存系统设计

### 统一缓存层

```typescript
// packages/cache/src/index.ts
import { LRUCache } from 'lru-cache'
import { Redis } from 'ioredis'

export class CacheService {
  private memory: LRUCache<string, any>
  private redis: Redis | null

  constructor() {
    this.memory = new LRUCache({ max: 500, ttl: 1000 * 60 * 5 }) // 5分钟

    if (process.env.REDIS_URL) {
      this.redis = new Redis(process.env.REDIS_URL)
    }
  }

  async get<T>(key: string): Promise<T | null> {
    // 先查内存缓存
    const memValue = this.memory.get(key)
    if (memValue) return memValue as T

    // 再查 Redis
    if (this.redis) {
      const redisValue = await this.redis.get(key)
      if (redisValue) {
        const parsed = JSON.parse(redisValue)
        // 回填内存缓存
        this.memory.set(key, parsed)
        return parsed as T
      }
    }

    return null
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    // 设置内存缓存
    this.memory.set(key, value, { ttl })

    // 设置 Redis
    if (this.redis) {
      await this.redis.setex(
        key,
        ttl || 300, // 默认 5 分钟
        JSON.stringify(value)
      )
    }
  }

  async del(key: string): Promise<void> {
    this.memory.delete(key)
    if (this.redis) {
      await this.redis.del(key)
    }
  }

  async invalidateTag(tag: string): Promise<void> {
    // 标签失效（适用于 Next.js revalidateTag）
    if (this.redis) {
      const keys = await this.redis.keys(`tag:${tag}:*`)
      if (keys.length > 0) {
        await this.redis.del(...keys)
      }
    }
  }
}

export const cache = new CacheService()
```

### 权限检查缓存

```typescript
// packages/rbac/src/cache.ts
import { cache } from '@mtsaas/cache'

export async function hasPermission(
  userId: string,
  permission: string
): Promise<boolean> {
  const cacheKey = `permission:${userId}:${permission}`

  // 检查缓存
  const cached = await cache.get<boolean>(cacheKey)
  if (cached !== null) return cached

  // 查询数据库
  const result = await checkPermissionDB(userId, permission)

  // 缓存结果（5分钟）
  await cache.set(cacheKey, result, 300)

  return result
}
```

---

## 单租户 vs 多租户对比

| 维度 | 单租户模式（默认租户） | 多租户模式 |
|------|-----------|-----------|
| **目标用户** | 独立开发者 | 企业/B2B SaaS |
| **租户数量** | 1 个（default） | N 个 |
| **权限模型** | ✅ 完整三层权限 | ✅ 完整三层权限 |
| **团队功能** | ✅ Teams + 资源权限 | ✅ Teams + 资源权限 |
| **路由** | `/app/dashboard` | `/app/[tenant]/dashboard` |
| **租户管理** | ❌ 不需要 | ✅ 必需（Console 管理）|
| **插件** | 🔌 按需启用 | 🔌 按需启用 |
| **部署** | Platform 单应用 | Platform + Console 双应用 |

---

## 技术栈优势

| 技术 | 优势 |
|------|------|
| **Next.js 16** | proxy.ts、async APIs、cache components、Turbopack 稳定 |
| **Zod v4** | 14.71x 性能提升、Zod Mini 减小 bundle、TypeScript 编译更快 |
| **Turborepo 2.0** | 远程缓存、增量构建、智能任务调度 |
| **Supabase** | 云托管 PostgreSQL 16 + RLS、Auth 自动集成、实时订阅 |
| **Biome 2.0** | 比 ESLint 快 100x、统一配置、更好的错误提示 |
| **shadcn/ui** | 可复制粘贴的组件、完全可定制、基于 Radix UI |
| **Redis** | 分布式缓存、支持 pub/sub、适合生产环境 |

---

## 架构亮点

### 1. 应用分离设计

**Platform（用户端）**：
- 租户业务界面
- 品牌可自定义
- 插件功能展示
- 独立部署

**Console（管理端）**：
- 平台管理界面
- 租户管理
- 用户管理
- 插件管理
- 审计日志
- 系统设置

**优势**：
- 职责清晰，维护简单
- 可独立部署和扩展
- 用户端和管理端样式隔离
- Console 可以统一管理所有租户

### 2. 统一权限模型

单租户和多租户使用**完全相同的权限逻辑**：

```typescript
if (TENANT_MODE === 'single') {
  return DEFAULT_TENANT
}
return await getTenantFromRequest(request)
```

### 3. 插件即服务

- 编译时注册 + 运行时加载
- 生命周期管理（install/uninstall/enable/disable）
- 依赖检查（含循环检测）
- 配置隔离（租户级配置）
- 扩展点（事件系统）

### 4. 性能优化

| 优化项 | 技术 | 提升 |
|--------|------|------|
| **构建** | Turbopack | 2-5x |
| **验证** | Zod v4 | 14.71x |
| **数据库** | 分区表 + 复合索引 | 大表查询优化 |
| **权限** | Redis 缓存 | 5分钟缓存 |
| **菜单** | React Query 缓存 | 减少查询 |
| **组件** | Next.js cache components | 按需缓存 |

### 5. 安全设计

| 安全项 | 技术 |
|--------|------|
| **数据隔离** | Supabase RLS |
| **审计追踪** | 分区表（90天热数据 + 冷存储） |
| **API 限流** | Redis 滑动窗口 |
| **数据加密** | 敏感字段 AES-256-GCM |
| **插件隔离** | 沙箱机制（可选）|

---

## 总结

**mtsaas = 双模式租户（单=默认租户）+ 三层统一权限 + 插件化架构 + 应用分离（Platform + Console）+ Next.js 16 + Zod v4 + Turborepo + Supabase + Redis**

这是一个面向 **2026 年** 的现代化 SaaS 基座，具有：
- ✅ 成熟稳定的技术栈（Next.js 16、Zod v4、Turborepo 2.0）
- ✅ 清晰的应用分离（Platform 用户端 + Console 管理端）
- ✅ 完整的权限系统（三层统一）
- ✅ 灵活的插件架构
- ✅ 生产级性能优化（缓存、分区表、索引）
- ✅ 企业级安全设计（RLS、审计、加密）

**可直接用于生产环境！**
