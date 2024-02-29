import { TypeSystem } from './type-system';

/* eslint-disable @typescript-eslint/ban-types -- WeakMap<T, _> demands T extends object */
const CACHE = new WeakMap<object, Map<string, unknown>>();

function memoizedGet(original: () => any, propertyKey: string): () => any {
  return function (this: object): unknown {
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

/**
 * Decorates property readers for readonly properties so that their results are
 * memoized in a `WeakMap`-based cache. Those properties will consequently be
 * computed exactly once.
 *
 * This can only be applied to property accessors (`public get foo(): any`), and not to
 * property declarations (`public readonly foo: any`).
 *
 * This should not be applied to any computations relying on a typesystem.
 * The typesystem can be changed and thus change the result of the call.
 * Use `memoizedWhenLocked` instead.
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
  descriptor.get = memoizedGet(original, propertyKey);
}

export function memoizedWhenLocked<T extends { system: TypeSystem }>(
  _prototype: T,
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
  descriptor.get = function (this: T): unknown {
    if (this.system.isLocked) {
      return memoizedGet(original, propertyKey).call(this);
    }

    return original.call(this);
  };
}
