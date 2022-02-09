import * as ts from 'typescript';

import { RosettaDiagnostic } from './translate';

export function startsWithUppercase(x: string): boolean {
  return /^[A-Z]/.exec(x) != null;
}

export interface File {
  readonly contents: string;
  readonly fileName: string;
}

export function printDiagnostics(diags: readonly RosettaDiagnostic[], stream: NodeJS.WritableStream) {
  // Don't print too much, at some point it just clogs up the log
  const maxDiags = 50;

  for (const diag of diags.slice(0, maxDiags)) {
    stream.write(diag.formattedMessage);
  }

  if (diags.length > maxDiags) {
    stream.write(`(...and ${diags.length - maxDiags} more diagnostics not shown)`);
  }
}

export function formatList(xs: string[], n = 5) {
  const tooMany = xs.length - n;

  return tooMany > 0 ? `${xs.slice(0, n).join(', ')} (and ${tooMany} more)` : xs.join(', ');
}

export const StrictBrand = 'jsii.strict';
interface MaybeStrictDiagnostic {
  readonly [StrictBrand]?: boolean;
}

/**
 * Annotate a diagnostic with a magic property to indicate it's a strict diagnostic
 */
export function annotateStrictDiagnostic(diag: ts.Diagnostic) {
  Object.defineProperty(diag, StrictBrand, {
    configurable: false,
    enumerable: true,
    value: true,
    writable: false,
  });
}

/**
 * Return whether or not the given diagnostic was annotated with the magic strict property
 */
export function hasStrictBranding(diag: ts.Diagnostic) {
  return !!(diag as MaybeStrictDiagnostic)[StrictBrand];
}

/**
 * Chunk an array of elements into approximately equal groups
 */
export function divideEvenly<A>(groups: number, xs: A[]): A[][] {
  const chunkSize = Math.ceil(xs.length / groups);
  const ret: A[][] = [];

  for (let i = 0; i < groups; i++) {
    ret.push(xs.slice(i * chunkSize, (i + 1) * chunkSize));
  }

  return ret;
}

export function flat<A>(xs: A[][]): A[] {
  return Array.prototype.concat.apply([], xs);
}

/**
 * Partition a list in twain using a predicate
 *
 * Returns [elements-matching-predicate, elements-not-matching-predicate];
 */
export function partition<A>(xs: A[], pred: (x: A) => boolean): [A[], A[]] {
  const truthy = new Array<A>();
  const falsy = new Array<A>();

  for (const x of xs) {
    if (pred(x)) {
      truthy.push(x);
    } else {
      falsy.push(x);
    }
  }

  return [truthy, falsy];
}

export function setExtend<A>(xs: Set<A>, els: Iterable<A>) {
  for (const el of els) {
    xs.add(el);
  }
}

export function mkDict<A extends string, B>(xs: Array<readonly [A, B]>): Record<A, B> {
  const ret: any = {};
  for (const [key, value] of xs) {
    ret[key] = value;
  }
  return ret;
}

/**
 * Apply a function to a value, as long as it's not `undefined`
 *
 * This is a companion helper to TypeScript's nice `??` and `?.` nullish
 * operators. Those operators are helpful if you're calling methods:
 *
 *    object?.method()  <- returns 'undefined' if 'object' is nullish
 *
 * But are no help when you want to use free functions:
 *
 *    func(object)      <- but what if 'object' is nullish and func
 *                         expects it not to be?
 *
 * Yes you can write `object ? func(object) : undefined` but the trailing
 * `: undefined` clutters your code. Instead, you write:
 *
 *    fmap(object, func)
 *
 * The name `fmap` is taken from Haskell: it's a "Functor-map" (although
 * only for the `Maybe` Functor).
 */
export function fmap<A, B>(value: NonNullable<A>, fn: (x: NonNullable<A>) => B): B;
export function fmap<A, B>(value: undefined | null, fn: (x: NonNullable<A>) => B): undefined;
export function fmap<A, B>(value: A | undefined | null, fn: (x: A) => B): B | undefined;
export function fmap<A, B>(value: A, fn: (x: A) => B): B | undefined {
  if (value == null) {
    return undefined;
  }
  return fn(value);
}

export function mapValues<A, B>(xs: Record<string, A>, fn: (x: A) => B): Record<string, B> {
  const ret: Record<string, B> = {};
  for (const [key, value] of Object.entries(xs)) {
    ret[key] = fn(value);
  }
  return ret;
}

/**
 * Sort an array by a key function.
 *
 * Instead of having to write your own comparators for your types any time you
 * want to sort, you supply a function that maps a value to a compound sort key
 * consisting of numbers or strings. The sorting will happen by that sort key
 * instead.
 */
export function sortBy<A>(xs: A[], keyFn: (x: A) => Array<string | number>) {
  return xs.sort((a, b) => {
    const aKey = keyFn(a);
    const bKey = keyFn(b);

    for (let i = 0; i < Math.min(aKey.length, bKey.length); i++) {
      // Compare aKey[i] to bKey[i]
      const av = aKey[i];
      const bv = bKey[i];

      if (av === bv) {
        continue;
      }

      if (typeof av !== typeof bv) {
        throw new Error(`Type of sort key ${JSON.stringify(aKey)} not same as ${JSON.stringify(bKey)}`);
      }

      if (typeof av === 'number' && typeof bv === 'number') {
        return av - bv;
      }

      if (typeof av === 'string' && typeof bv === 'string') {
        return av.localeCompare(bv);
      }
    }

    return aKey.length - bKey.length;
  });
}

/**
 * Group elements by a key
 *
 * Supply a function that maps each element to a key string.
 *
 * Returns a map of the key to the list of elements that map to that key.
 */
export function groupBy<A>(xs: A[], keyFn: (x: A) => string): Record<string, A[]> {
  const ret: Record<string, A[]> = {};
  for (const x of xs) {
    const key = keyFn(x);
    if (ret[key]) {
      ret[key].push(x);
    } else {
      ret[key] = [x];
    }
  }
  return ret;
}

export function isDefined<A>(x: A): x is NonNullable<A> {
  return x !== undefined;
}

export function indexBy<A>(xs: A[], fn: (x: A) => string): Record<string, A> {
  return mkDict(xs.map((x) => [fn(x), x] as const));
}

export type Mutable<T> = { -readonly [P in keyof T]: Mutable<T[P]> };

export function commentToken(language: string) {
  // This is future-proofed a bit, but don't read too much in this...
  switch (language) {
    case 'python':
    case 'ruby':
      return '#';
    case 'csharp':
    case 'java':
    case 'go':
    default:
      return '//';
  }
}
