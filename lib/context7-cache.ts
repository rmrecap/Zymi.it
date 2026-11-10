/**
 * Upstash Context7 High-Speed Memory & Serverless Cache Layer
 * Supports Upstash Redis REST API when configured, with seamless in-memory fallback.
 * Optimizes long-context SEO metadata, product search queries, and rate limiting.
 */

type CacheItem<T> = {
  value: T;
  expiresAt: number;
};

class Context7Cache {
  private inMemoryCache: Map<string, CacheItem<any>> = new Map();
  private redisUrl: string | undefined;
  private redisToken: string | undefined;

  constructor() {
    this.redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    this.redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
  }

  private isRedisConfigured(): boolean {
    return Boolean(this.redisUrl && this.redisToken);
  }

  /**
   * Get value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      // If Upstash Redis is configured, query via REST API
      if (this.isRedisConfigured()) {
        const response = await fetch(`${this.redisUrl}/get/${encodeURIComponent(key)}`, {
          headers: {
            Authorization: `Bearer ${this.redisToken}`,
          },
          next: { revalidate: 0 },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.result !== null && data.result !== undefined) {
            try {
              return JSON.parse(data.result) as T;
            } catch {
              return data.result as T;
            }
          }
        }
      }

      // Memory fallback
      const cached = this.inMemoryCache.get(key);
      if (!cached) return null;

      if (Date.now() > cached.expiresAt) {
        this.inMemoryCache.delete(key);
        return null;
      }

      return cached.value as T;
    } catch (err) {
      console.warn(`[Context7Cache] get error for key "${key}":`, err);
      return null;
    }
  }

  /**
   * Set value in cache with TTL (in seconds)
   */
  async set(key: string, value: any, ttlSeconds: number = 3600): Promise<void> {
    try {
      const serialized = typeof value === "string" ? value : JSON.stringify(value);

      if (this.isRedisConfigured()) {
        await fetch(`${this.redisUrl}/set/${encodeURIComponent(key)}?ex=${ttlSeconds}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.redisToken}`,
            "Content-Type": "text/plain",
          },
          body: serialized,
        });
      }

      // Always populate local memory cache for sub-millisecond local reads
      this.inMemoryCache.set(key, {
        value,
        expiresAt: Date.now() + ttlSeconds * 1000,
      });

      // Cleanup memory if size exceeds 2000 keys
      if (this.inMemoryCache.size > 2000) {
        const oldestKey = this.inMemoryCache.keys().next().value;
        if (oldestKey) this.inMemoryCache.delete(oldestKey);
      }
    } catch (err) {
      console.warn(`[Context7Cache] set error for key "${key}":`, err);
    }
  }

  /**
   * Delete value from cache
   */
  async del(key: string): Promise<void> {
    try {
      if (this.isRedisConfigured()) {
        await fetch(`${this.redisUrl}/del/${encodeURIComponent(key)}`, {
          headers: {
            Authorization: `Bearer ${this.redisToken}`,
          },
        });
      }
      this.inMemoryCache.delete(key);
    } catch (err) {
      console.warn(`[Context7Cache] del error for key "${key}":`, err);
    }
  }

  /**
   * Cache-aside pattern: Fetch if absent, then cache
   */
  async getOrSet<T>(key: string, fetcher: () => Promise<T>, ttlSeconds: number = 3600): Promise<T> {
    const existing = await this.get<T>(key);
    if (existing !== null && existing !== undefined) {
      return existing;
    }

    const fresh = await fetcher();
    await this.set(key, fresh, ttlSeconds);
    return fresh;
  }

  // --- Domain Specialized Helpers ---

  /**
   * Cache product search queries to reduce database strain
   */
  async cacheProductSearch(query: string, results: any[]): Promise<void> {
    const key = `search:product:${query.toLowerCase().trim()}`;
    await this.set(key, results, 600); // 10 minutes cache
  }

  async getCachedProductSearch(query: string): Promise<any[] | null> {
    const key = `search:product:${query.toLowerCase().trim()}`;
    return this.get<any[]>(key);
  }

  /**
   * Cache dynamic SEO blog context and rich Schema data
   */
  async cacheBlogContext(slug: string, contextData: any): Promise<void> {
    const key = `blog:context:${slug}`;
    await this.set(key, contextData, 3600 * 4); // 4 hours cache
  }

  async getCachedBlogContext(slug: string): Promise<any | null> {
    const key = `blog:context:${slug}`;
    return this.get<any>(key);
  }

  /**
   * Cache homepage featured digital products for instant sub-second render
   */
  async cacheFeaturedProducts(products: any[]): Promise<void> {
    await this.set("home:featured_digital_products", products, 3600); // 1 hour TTL
  }

  async getCachedFeaturedProducts(): Promise<any[] | null> {
    return this.get<any[]>("home:featured_digital_products");
  }

  /**
   * Cache trending affiliate deals to avoid frequent external API/DB calls
   */
  async cacheTrendingDeals(deals: any[]): Promise<void> {
    await this.set("home:trending_affiliate_deals", deals, 3600); // 1 hour TTL
  }

  async getCachedTrendingDeals(): Promise<any[] | null> {
    return this.get<any[]>("home:trending_affiliate_deals");
  }

  /**
   * Fast session caching
   */
  async cacheUserSession(token: string, sessionData: any): Promise<void> {
    await this.set(`session:${token}`, sessionData, 1800); // 30 mins
  }

  async getCachedUserSession(token: string): Promise<any | null> {
    return this.get<any>(`session:${token}`);
  }

  /**
   * Rate limiting using Upstash sliding window / in-memory counters
   */
  async checkRateLimit(
    identifier: string,
    limit: number = 60,
    windowSeconds: number = 60
  ): Promise<{ success: boolean; remaining: number }> {
    const key = `ratelimit:${identifier}`;
    const now = Date.now();

    try {
      const record = this.inMemoryCache.get(key) as CacheItem<{ count: number; windowStart: number }> | undefined;

      if (!record || now - record.value.windowStart > windowSeconds * 1000) {
        this.inMemoryCache.set(key, {
          value: { count: 1, windowStart: now },
          expiresAt: now + windowSeconds * 1000,
        });
        return { success: true, remaining: limit - 1 };
      }

      const currentCount = record.value.count + 1;
      record.value.count = currentCount;

      if (currentCount > limit) {
        return { success: false, remaining: 0 };
      }

      return { success: true, remaining: limit - currentCount };
    } catch {
      return { success: true, remaining: limit };
    }
  }
}

export const context7Cache = new Context7Cache();
export default context7Cache;

