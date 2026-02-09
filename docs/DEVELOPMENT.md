# mtsaas 开发计划

> **项目**: 多租户 SaaS Boilerplate
> **技术栈**: Next.js 16 + Turborepo + shadcn/ui + Tailwind 4 + Supabase
> **创建时间**: 2026-02-10
> **作者**: TBot (AI Assistant)

---

## 📋 目录

1. [项目概述](#项目概述)
2. [开发阶段总览](#开发阶段总览)
3. [Phase 1: 基础设施](#phase-1-基础设施)
4. [Phase 2: 核心包开发](#phase-2-核心包开发)
5. [Phase 3: 应用层开发](#phase-3-应用层开发)
6. [Phase 4: 插件系统](#phase-4-插件系统)
7. [Phase 5: 测试与部署](#phase-5-测试与部署)
8. [Git 提交规范](#git-提交规范)
9. [项目结构](#项目结构)
10. [风险与应对](#风险与应对)

---

## 项目概述

### 🎯 项目目标

构建一个完整的 SaaS Boilerplate，具有以下特点：

- **双模式定位**: 单租户模式（独立开发者）+ 多租户模式（企业 B2B SaaS）
- **统一权限**: 单租户 = 默认租户，使用完全相同的三层权限系统
- **插件架构**: 核心功能精简，扩展功能按需启用
- **应用分离**: Platform（用户端）+ Console（管理端）独立部署

### 🛠️ 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js | 16.1+ |
| 语言 | TypeScript | 5.8+ |
| Monorepo | Turborepo | 2.0+ |
| 包管理器 | pnpm | 9.0+ |
| 数据库 | Supabase | PostgreSQL 16 |
| UI 组件 | shadcn/ui | Latest |
| 样式 | Tailwind CSS | 4.1+ |
| 验证 | Zod | v4.0+ |
| 缓存 | Redis | 7.0+ |
| 部署 | Vercel | Latest |

### 👥 开发者

- **GitHub**: hexuntao
- **Vercel**: 已登录
- **Supabase**: 已登录
- **AI Assistant**: TBot (OpenClaw)

---

## 开发阶段总览

### 📅 时间规划

```
Phase 1: 基础设施（1-2天）
Phase 2: 核心包开发（3-5天）
Phase 3: 应用层开发（5-7天）
Phase 4: 插件系统（3-5天）
Phase 5: 测试与部署（2-3天）
─────────────────────────────────
总计: 14-22 天
```

### 🔄 每个 Phase 的验证流程

每个 Phase 完成后必须执行以下验证步骤：

```bash
# 1. 类型检查
pnpm type-check

# 2. 代码检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建项目
pnpm build

# 5. 提交代码
git add .
git commit -m "feat(<phase>): <description>"
git push

# 6. 部署到 Vercel
vercel --prod
```

---

## Phase 1: 基础设施

**目标**: 初始化项目，配置开发环境

### 📋 任务清单

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 1.1 | 创建项目目录 | ~/Desktop/mtsaas | ✅ ls 检查 |
| 1.2 | 克隆模板（dan5py/turborepo-shadcn-ui） | 项目骨架 | ✅ 目录结构 |
| 1.3 | 安装依赖（pnpm install） | node_modules | ✅ pnpm list |
| 1.4 | 配置 Supabase 客户端 | packages/db | ✅ import 验证 |
| 1.5 | 配置环境变量 | .env.example | ✅ 文件存在 |
| 1.6 | 验证开发环境 | pnpm dev 正常运行 | ✅ localhost 访问 |
| 1.7 | GitHub 仓库创建 | hexuntao/mtsaas | ✅ gh repo status |
| 1.8 | 首次代码提交 | infrastructure init | ✅ git log |
| 1.9 | Vercel 项目创建 | vercel project | ✅ vercel inspect |

### 🔧 详细步骤

#### Step 1.1: 创建项目目录

```bash
cd ~/Desktop
mkdir -p mtsaas
cd mtsaas
```

#### Step 1.2: 克隆模板

```bash
git clone https://github.com/dan5py/turborepo-shadcn-ui.git .
```

#### Step 1.3: 安装依赖

```bash
pnpm install
```

#### Step 1.4: 配置 Supabase 客户端

```bash
# 安装 Supabase JS
pnpm add @supabase/supabase-js

# 创建 packages/db
mkdir -p packages/db/src
```

创建文件:
- `packages/db/src/index.ts` - Supabase 客户端
- `packages/db/src/types.ts` - 类型定义
- `packages/db/package.json`

#### Step 1.5: 配置环境变量

创建 `.env.example`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

#### Step 1.6: 验证开发环境

```bash
pnpm dev
```

验证:
- 访问 http://localhost:3000 正常
- 无 TypeScript 错误
- 无 lint 错误

#### Step 1.7: GitHub 仓库创建

```bash
# 创建公开仓库
gh repo create mtsaas --public --description "Multi-tenant SaaS Boilerplate with Next.js 16 + Turborepo"

# 推送代码
git remote add origin https://github.com/hexuntao/mtsaas.git
git branch -M main
git push -u origin main
```

#### Step 1.8: 首次代码提交

```bash
git add .
git commit -m "feat(infra): initial project setup with Turborepo + Next.js 16"
git push
```

#### Step 1.9: Vercel 部署

```bash
# 链接项目
vercel --link

# 首次部署
vercel --prod
```

### ✅ Phase 1 验证命令

```bash
# 在项目根目录执行
cd ~/Desktop/mtsaas

# 1. 类型检查
pnpm type-check

# 2. 代码检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建
pnpm build

# 5. 提交
git add .
git commit -m "feat(infra): complete Phase 1 - infrastructure setup"
git push

# 6. 部署
vercel --prod
```

---

## Phase 2: 核心包开发

**目标**: 开发租户系统、权限系统等核心模块

### 📋 任务清单

#### 2.1 数据库层（@mtsaas/db）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 2.1.1 | Supabase 客户端配置 | packages/db/index.ts | ✅ type-check |
| 2.1.2 | 数据库类型生成 | packages/db/types.ts | ✅ tsc |
| 2.1.3 | 迁移脚本目录 | packages/db/migrations/ | ✅ dir exists |
| 2.1.4 | RLS 策略配置 | packages/db/policies/ | ✅ build |

#### 2.2 认证系统（@mtsaas/auth）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 2.2.1 | Supabase Auth 封装 | packages/auth/auth-client.ts | ✅ type-check |
| 2.2.2 | 登录/注册页面 | apps/platform/(auth)/ | ✅ render |
| 2.2.3 | Session 管理 | packages/auth/session.ts | ✅ tsc |
| 2.2.4 | 中间件保护 | apps/platform/middleware.ts | ✅ build |

#### 2.3 租户系统（@mtsaas/tenant）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 2.3.1 | 租户数据模型 | packages/tenant/schema.ts | ✅ type-check |
| 2.3.2 | 租户解析中间件 | packages/tenant/middleware.ts | ✅ tsc |
| 2.3.3 | 租户 CRUD API | packages/tenant/api.ts | ✅ build |
| 2.3.4 | 单/多租户切换 | packages/tenant/mode.ts | ✅ lint |

#### 2.4 权限系统（@mtsaas/rbac）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 2.4.1 | RBAC 数据模型 | packages/rbac/schema.ts | ✅ type-check |
| 2.4.2 | 角色/权限定义 | packages/rbac/roles.ts | ✅ tsc |
| 2.4.3 | 权限检查 Hook | packages/rbac/usePermission.ts | ✅ build |
| 2.4.4 | 资源权限控制 | packages/rbac/resources.ts | ✅ test |
| 2.4.5 | RLS 数据策略 | packages/rbac/policies.ts | ✅ lint |

### 🔧 详细步骤

#### Step 2.1: 数据库层

创建 `packages/db/src/index.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  )
}
```

#### Step 2.2: 认证系统

创建 `packages/auth/src/auth-client.ts`:

```typescript
import { createClientComponentClient, createServerComponentClient, createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// 客户端组件
export const authClient = createClientComponentClient()

// 服务端组件
export const authServer = createServerComponentClient({ cookies })

// 路由处理器
export const authRoute = createRouteHandlerClient({ cookies })
```

#### Step 2.3: 租户系统

创建 `packages/tenant/src/schema.ts`:

```typescript
import { z } from 'zod'

export const tenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z.string().min(1).max(50).regex(/^[a-z0-9-]+$/),
  domain: z.string().nullable(),
  plan: z.enum(['free', 'pro', 'enterprise']).default('free'),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
})

export type Tenant = z.infer<typeof tenantSchema>
```

#### Step 2.4: 权限系统

创建 `packages/rbac/src/schema.ts`:

```typescript
import { z } from 'zod'

// 角色定义
export const roleSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(50),
  description: z.string().nullable(),
  permissions: z.array(z.string()),
  tenant_id: z.string().uuid().nullable(),
})

// 权限定义
export const permissionSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  resource: z.string().min(1).max(50),
  action: z.enum(['create', 'read', 'update', 'delete', 'admin']),
})

// 用户角色关联
export const userRoleSchema = z.object({
  user_id: z.string().uuid(),
  role_id: z.string().uuid(),
  tenant_id: z.string().uuid().nullable(),
})
```

### ✅ Phase 2 验证命令

```bash
cd ~/Desktop/mtsaas

# 1. 类型检查
pnpm type-check

# 2. 代码检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建
pnpm build

# 5. 提交
git add .
git commit -m "feat(core): complete Phase 2 - core packages (db, auth, tenant, rbac)"
git push

# 6. 部署
vercel --prod
```

---

## Phase 3: 应用层开发

**目标**: 开发 Platform 和 Console 应用

### 📋 任务清单

#### 3.1 Platform（用户端）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 3.1.1 | 营销页面 | apps/platform/(marketing)/page.tsx | ✅ build |
| 3.1.2 | 登录/注册 | apps/platform/(auth)/login/page.tsx | ✅ render |
| 3.1.3 | 租户仪表盘 | apps/platform/[tenant]/(app)/dashboard/page.tsx | ✅ build |
| 3.1.4 | 布局组件 | apps/platform/[tenant]/(app)/layout.tsx | ✅ type-check |
| 3.1.5 | 主题系统 | apps/platform/components/theme-provider.tsx | ✅ lint |

#### 3.2 Console（管理端）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 3.2.1 | 管理端布局 | apps/console/(console)/layout.tsx | ✅ build |
| 3.2.2 | 总览仪表盘 | apps/console/(console)/dashboard/page.tsx | ✅ render |
| 3.2.3 | 租户管理 | apps/console/(console)/tenants/page.tsx | ✅ build |
| 3.2.4 | 用户管理 | apps/console/(console)/users/page.tsx | ✅ type-check |
| 3.2.5 | 审计日志 | apps/console/(console)/audit/page.tsx | ✅ lint |

### 🔧 详细步骤

#### Step 3.1: Platform 营销页面

创建 `apps/platform/app/[locale]/(marketing)/page.tsx`:

```typescript
export default function MarketingPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold">Welcome to mtsaas</h1>
      <p className="mt-4 text-lg">
        Multi-tenant SaaS Boilerplate with Next.js 16
      </p>
    </div>
  )
}
```

#### Step 3.2: Platform 登录页面

创建 `apps/platform/app/[locale]/(auth)/login/page.tsx`:

```typescript
import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  )
}
```

#### Step 3.3: Platform 租户仪表盘

创建 `apps/platform/app/[locale]/[tenant]/(app)/dashboard/page.tsx`:

```typescript
import { getTenant } from '@/lib/tenant'

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ tenant: string }>
}) {
  const { tenant } = await params
  const tenantData = await getTenant(tenant)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold">{tenantData?.name} Dashboard</h1>
    </div>
  )
}
```

#### Step 3.4: Console 管理端布局

创建 `apps/console/app/[locale]/(console)/layout.tsx`:

```typescript
import { ConsoleSidebar } from '@/components/console/sidebar'
import { ConsoleHeader } from '@/components/console/header'

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <ConsoleSidebar />
      <div className="flex-1 flex flex-col">
        <ConsoleHeader />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

#### Step 3.5: Console 租户管理

创建 `apps/console/app/[locale]/(console)/tenants/page.tsx`:

```typescript
import { TenantList } from '@/components/console/tenants/tenant-list'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function TenantsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Tenant Management</h1>
        <Link href="/console/tenants/new">
          <Button>Create Tenant</Button>
        </Link>
      </div>
      <TenantList />
    </div>
  )
}
```

### ✅ Phase 3 验证命令

```bash
cd ~/Desktop/mtsaas

# 1. 类型检查
pnpm type-check

# 2. 代码检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建
pnpm build

# 5. 提交
git add .
git commit -m "feat(app): complete Phase 3 - platform and console applications"
git push

# 6. 部署
vercel --prod
```

---

## Phase 4: 插件系统

**目标**: 实现插件化架构，支持功能扩展

### 📋 任务清单

#### 4.1 插件核心（@mtsaas/plugin）

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 4.1.1 | 插件注册表 | packages/plugin/registry.ts | ✅ type-check |
| 4.1.2 | 插件生命周期 | packages/plugin/lifecycle.ts | ✅ tsc |
| 4.1.3 | 插件配置管理 | packages/plugin/config.ts | ✅ build |
| 4.1.4 | 插件 API | packages/plugin/api.ts | ✅ lint |

#### 4.2 内置插件（可选）

| 插件 | 任务 | 输出 | 优先级 |
|------|------|------|--------|
| @plugin/blog | MDX 博客系统 | packages/plugins/blog | P1 |
| @plugin/ai | AI 功能集成 | packages/plugins/ai | P2 |
| @plugin/payments | Stripe 支付 | packages/plugins/payments | P2 |
| @plugin/notifications | 邮件通知 | packages/plugins/notifications | P3 |

### 🔧 详细步骤

#### Step 4.1: 插件注册表

创建 `packages/plugin/src/registry.ts`:

```typescript
import { z } from 'zod'

export const pluginManifestSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  description: z.string().optional(),
  author: z.string().optional(),
  dependencies: z.record(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
})

export type PluginManifest = z.infer<typeof pluginManifestSchema>

export interface Plugin {
  manifest: PluginManifest
  enabled: boolean
  loaded: boolean
}

export class PluginRegistry {
  private plugins = new Map<string, Plugin>()

  register(manifest: PluginManifest) {
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

  list(): Plugin[] {
    return Array.from(this.plugins.values())
  }
}

export const pluginRegistry = new PluginRegistry()
```

#### Step 4.2: 插件生命周期

创建 `packages/plugin/src/lifecycle.ts`:

```typescript
import { Plugin, pluginRegistry } from './registry'

export type LifecycleHook = 'install' | 'uninstall' | 'enable' | 'disable' | 'load'

export interface LifecycleContext {
  tenantId?: string
  userId?: string
}

export class PluginLifecycle {
  async install(pluginId: string, ctx: LifecycleContext = {}): Promise<void> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) throw new Error(`Plugin ${pluginId} not found`)

    // Run install hooks
    await this.runHooks(pluginId, 'install', ctx)

    // Mark as installed
    plugin.loaded = true
  }

  async enable(pluginId: string, ctx: LifecycleContext = {}): Promise<void> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) throw new Error(`Plugin ${pluginId} not found`)

    await this.runHooks(pluginId, 'enable', ctx)
    plugin.enabled = true
  }

  async disable(pluginId: string, ctx: LifecycleContext = {}): Promise<void> {
    const plugin = pluginRegistry.get(pluginId)
    if (!plugin) throw new Error(`Plugin ${pluginId} not found`)

    await this.runHooks(pluginId, 'disable', ctx)
    plugin.enabled = false
  }

  private async runHooks(
    pluginId: string,
    hook: LifecycleHook,
    ctx: LifecycleContext
  ): Promise<void> {
    // Load and execute plugin hooks
    console.log(`[Plugin:${pluginId}] Running ${hook} hook`)
  }
}

export const pluginLifecycle = new PluginLifecycle()
```

### ✅ Phase 4 验证命令

```bash
cd ~/Desktop/mtsaas

# 1. 类型检查
pnpm type-check

# 2. 代码检查
pnpm lint

# 3. 运行测试
pnpm test

# 4. 构建
pnpm build

# 5. 提交
git add .
git commit -m "feat(plugin): complete Phase 4 - plugin system"
git push

# 6. 部署
vercel --prod
```

---

## Phase 5: 测试与部署

**目标**: 质量保证，可部署上线

### 📋 任务清单

#### 5.1 测试

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 5.1.1 | 单元测试 | packages/*/src/*.test.ts | ✅ 80%+ coverage |
| 5.1.2 | 集成测试 | apps/*/tests/*.test.ts | ✅ all pass |
| 5.1.3 | E2E 测试 | playwright/tests/*.spec.ts | ✅ all pass |
| 5.1.4 | 类型检查 | tsc --noEmit | ✅ 0 errors |

#### 5.2 部署

| 步骤 | 任务 | 输出 | 验证 |
|------|------|------|------|
| 5.2.1 | Vercel 配置 | vercel.json | ✅ deploy success |
| 5.2.2 | 环境变量 | Vercel Dashboard | ✅ all set |
| 5.2.3 | 域名配置 | DNS settings | ✅ resolving |
| 5.2.4 | 监控配置 | Sentry integration | ✅ working |

### 🔧 详细步骤

#### Step 5.1: 配置 Vitest

创建 `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './packages/*/src'),
    },
  },
})
```

#### Step 5.2: 配置 Vercel

创建 `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install"
}
```

### ✅ Phase 5 验证命令

```bash
cd ~/Desktop/mtsaas

# 1. 类型检查
pnpm type-check

# 2. 代码检查
pnpm lint

# 3. 运行测试
pnpm test --coverage

# 4. 构建
pnpm build

# 5. E2E 测试
pnpm test:e2e

# 6. 提交
git add .
git commit -m "chore(release): complete Phase 5 - testing and deployment"
git push

# 7. 部署到生产
vercel --prod
```

---

## Git 提交规范

### 📝 提交格式

```
<type>(<scope>): <subject>
```

### 🔖 类型（Type）

| 类型 | 说明 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| docs | 文档更新 |
| style | 代码格式（不影响功能）|
| refactor | 重构 |
| perf | 性能优化 |
| test | 测试相关 |
| chore | 构建/工具相关 |

### 📦 范围（Scope）

| 范围 | 说明 |
|------|------|
| infra | 基础设施 |
| db | 数据库层 |
| auth | 认证系统 |
| tenant | 租户系统 |
| rbac | 权限系统 |
| platform | 用户端 |
| console | 管理端 |
| plugin | 插件系统 |
| app | 应用层 |

### 📝 提交示例

```bash
# Phase 1 提交
git commit -m "feat(infra): initial project setup with Turborepo + Next.js 16"
git commit -m "feat(infra): add supabase client configuration"
git commit -m "feat(infra): configure environment variables"

# Phase 2 提交
git commit -m "feat(db): add database schema and types"
git commit -m "feat(auth): implement authentication with Supabase"
git commit -m "feat(tenant): add tenant system with multi-tenant support"
git commit -m "feat(rbac): implement role-based access control"

# Phase 3 提交
git commit -m "feat(platform): add marketing pages"
git commit -m "feat(platform): implement user dashboard"
git commit -m "feat(console): add admin dashboard"
git commit -m "feat(console): implement tenant management"

# Phase 4 提交
git commit -m "feat(plugin): add core plugin system"
git commit -m "feat(plugin): add blog plugin"

# Phase 5 提交
git commit -m "test: add unit tests for core packages"
git commit -m "test: add integration tests for APIs"
git commit -m "chore: configure Vercel deployment"
```

---

## 项目结构

```
mtsaas/
├── apps/
│   ├── platform/              # 🔵 用户端应用
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── (marketing)/    # 营销页面
│   │   │   │   ├── (auth)/         # 登录注册
│   │   │   │   ├── [tenant]/(app)/ # 租户应用
│   │   │   │   └── blog/           # 博客插件
│   │   │   ├── public/
│   │   │   ├── proxy.ts
│   │   │   └── api/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   │
│   ├── console/               # 🟣 管理端应用
│   │   ├── app/
│   │   │   ├── [locale]/
│   │   │   │   ├── (marketing)/
│   │   │   │   ├── (auth)/
│   │   │   │   └── (console)/      # 管理后台
│   │   │   │       ├── dashboard/
│   │   │   │       ├── tenants/
│   │   │   │       ├── users/
│   │   │   │       ├── audit/
│   │   │   │       └── settings/
│   │   ├── components/
│   │   ├── lib/
│   │   └── package.json
│   │
│   └── docs/                  # 📚 文档站点
│       ├── app/
│       └── package.json
│
├── packages/
│   ├── ui/                    # shadcn/ui 组件库
│   ├── db/                    # Supabase 客户端 + 类型
│   ├── auth/                  # 认证系统
│   ├── tenant/                # 租户系统
│   ├── rbac/                  # 三层权限系统
│   ├── plugin/                # 插件系统核心
│   ├── menu/                  # 动态菜单系统
│   ├── config/                # 租户配置系统
│   ├── events/                # 事件驱动系统
│   ├── audit/                 # 审计日志系统
│   ├── cache/                 # 统一缓存层
│   ├── api/                   # API 契约 + 类型
│   ├── i18n/                  # 国际化
│   └── monitoring/            # 监控系统
│
├── packages/plugins/          # 🔌 可选插件
│   ├── blog/
│   ├── ai/
│   ├── payments/
│   ├── notifications/
│   ├── storage/
│   ├── api-keys/
│   ├── webhooks/
│   ├── forms/
│   ├── analytics/
│   └── crm/
│
├── scripts/                   # 工具脚本
├── docs/                      # 项目文档
│   └── DEVELOPMENT.md         # 本文件
│
├── turbo.json
├── pnpm-workspace.yaml
├── package.json
├── vercel.json
├── vitest.config.ts
└── .env.example
```

---

## 风险与应对

| 风险 | 可能性 | 影响 | 应对措施 |
|------|--------|------|----------|
| 模板兼容性问题 | 低 | 高 | 使用 dan5py 模板，已验证 |
| Supabase Schema 变更 | 中 | 中 | 使用迁移脚本管理 |
| 插件冲突 | 低 | 中 | 编译时检测 + 单元测试 |
| 部署失败 | 低 | 中 | Vercel CLI 自动配置 |
| TypeScript 类型错误 | 中 | 低 | 每日 type-check |
| 性能问题 | 低 | 中 | 性能测试 + 优化 |

---

## 验证检查清单

### 每个 Phase 完成后

- [ ] `pnpm type-check` 通过
- [ ] `pnpm lint` 无错误
- [ ] `pnpm test` 全部通过
- [ ] `pnpm build` 成功
- [ ] `git commit` 已提交
- [ ] `git push` 已推送
- [ ] `vercel --prod` 部署成功

### 每日检查

- [ ] 代码无合并冲突
- [ ] 所有测试通过
- [ ] 构建正常
- [ ] 部署正常

---

## 更新日志

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-02-10 | 1.0.0 | 初始版本 |
| | | |

---

*文档由 TBot 自动生成*
