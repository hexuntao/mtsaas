import { LRUCache } from 'lru-cache'

// 内存缓存 - LRU Cache
const memoryCache = new LRUCache<string, any>({
  max: 500,
  ttl: 1000 * 60 * 5, // 5 分钟
})

export class CacheService {
  // 获取缓存
  async get<T>(key: string): Promise<T | null> {
    const value = memoryCache.get(key)
    if (value !== undefined) return value as T
    return null
  }

  // 设置缓存
  async set(key: string, value: any, ttlMs: number = 300000): Promise<void> {
    memoryCache.set(key, value, { ttl: ttlMs })
  }

  // 删除缓存
  async del(key: string): Promise<void> {
    memoryCache.delete(key)
  }

  // 按标签失效（简化实现）
  async invalidateTag(_tag: string): Promise<void> {
    // TODO: 实现 Redis 支持后添加标签失效
  }

  // 清除所有缓存
  async clear(): Promise<void> {
    memoryCache.clear()
  }
}

export const cache = new CacheService()
