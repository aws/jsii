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
    stream.write(`(...and ${maxDiags - diags.length} more diagnostics not shown)`);
  }
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

export function fmap<A, B>(value: NonNullable<A>, fn: (x: A) => B): B;
export function fmap<A, B>(value: undefined, fn: (x: A) => B): undefined;
export function fmap<A, B>(value: A, fn: (x: A) => B): B | undefined {
  if (value === undefined) {
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
