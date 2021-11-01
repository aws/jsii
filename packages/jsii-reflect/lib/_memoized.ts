/* eslint-disable @typescript-eslint/ban-types -- WeakMap<T, _> demands T extends object */

const CACHE = new WeakMap<object, Map<string, unknown>>();

/**
 * Decorates property readers for readonly properties so that their results are
 * memoized in a `WeakMap`-based cache. Those properties will consequently be
 * computed exactly once.
 *
 * This can only be applied to property accessors (`public get foo(): any`), and not to
 * property declarations (`public readonly foo: any`).
 */
export function memoized(
  _prototype: unknown,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): void {
  if (!descriptor.get) {
    throw new Error(`@memoized can only be applied to property getters!`);
  }
  if (descriptor.set) {
    throw new Error(`@memoized can only be applied to readonly properties!`);
  }

  const original = descriptor.get;
  descriptor.get = function memoizedGet(this: object): unknown {
    let cache = CACHE.get(this);
    if (cache == null) {
      cache = new Map();
      CACHE.set(this, cache);
    }
    if (cache.has(propertyKey)) {
      const result = cache.get(propertyKey);
      if (Array.isArray(result)) {
        // Return a copy of arrays as a precaution
        return Array.from(result);
      }
      return result;
    }
    const result = original.call(this);
    // If the result is an array, memoize a copy for safety.
    cache.set(propertyKey, Array.isArray(result) ? Array.from(result) : result);
    return result;
  };
}
