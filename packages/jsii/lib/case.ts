import * as Case from 'case';

const cached =
  (func: (text: string) => string): ((text: string) => string) =>
  (text: string) =>
    Cache.fetch(text, func);

export const camel = cached(Case.camel);
export const constant = cached(Case.constant);
export const pascal = cached(Case.pascal);
export const snake = cached(Case.snake);

class Cache {
  // Cache is indexed on a weak CacheKey so the cache can be purged under memory pressure
  private static readonly CACHES = new WeakMap<CacheKey, Map<string, string>>();

  public static fetch(text: string, func: (text: string) => string): string {
    // Check whether we have a cache for this function...
    const cacheKey = CacheKey.for(func);
    let cache = this.CACHES.get(cacheKey);
    if (cache == null) {
      // If not, create one...
      cache = new Map<string, string>();
      this.CACHES.set(cacheKey, cache);
    }

    // Check if the current cache has a value for this text...
    const cached = cache.get(text);
    if (cached != null) {
      return cached;
    }

    // If not, compute one...
    const result = func(text);
    cache.set(text, result);
    return result;
  }

  private constructor() {}
}

class CacheKey {
  // Storing cache keys as weak references to allow garbage collection if there is memory pressure.
  private static readonly STORE = new Map<any, WeakRef<CacheKey>>();

  public static for(data: any) {
    const entry = this.STORE.get(data)?.deref();
    if (entry != null) {
      return entry;
    }
    const newKey = new CacheKey();
    this.STORE.set(data, new WeakRef(newKey));
    return newKey;
  }

  private constructor() {}
}
