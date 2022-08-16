import * as assert from 'assert';

import { Package } from './package';
import {
  JSII_INIT_ALIAS,
  JSII_INIT_PACKAGE,
  JSII_RT_ALIAS,
  JSII_RT_PACKAGE_NAME,
} from './runtime';

/**
 * Information about a module's dependency on "special" packages (either part of
 * the go standard library, or generated as part of the current module).
 */
export interface SpecialDependencies {
  /** Whether the go standard library for string formatting is needed */
  readonly fmt: boolean;

  /** Whether the jsii runtime library for go is needed */
  readonly runtime: boolean;

  /** Whether the package's initialization hook is needed */
  readonly init: boolean;

  /** Whether the internal type aliases package is needed */
  readonly internal: boolean;

  /** Whether go's standard library "time" module is needed */
  readonly time: boolean;
}

export function reduceSpecialDependencies(
  ...specialDepsList: readonly SpecialDependencies[]
): SpecialDependencies {
  const [first, ...rest] = specialDepsList;
  if (!first) {
    assert(rest.length === 0);
    return {
      fmt: false,
      init: false,
      internal: false,
      runtime: false,
      time: false,
    };
  }
  return rest.reduce(
    (acc, elt) => ({
      fmt: acc.fmt || elt.fmt,
      init: acc.init || elt.init,
      internal: acc.internal || elt.internal,
      runtime: acc.runtime || elt.runtime,
      time: acc.time || elt.time,
    }),
    first,
  );
}

export interface ImportedModule {
  readonly alias?: string;
  readonly module: string;
}

export function toImportedModules(
  specialDeps: SpecialDependencies,
  context: Package,
): readonly ImportedModule[] {
  const result = new Array<ImportedModule>();

  if (specialDeps.fmt) {
    result.push({ module: 'fmt' });
  }

  if (specialDeps.time) {
    result.push({ module: 'time' });
  }

  if (specialDeps.runtime) {
    result.push(JSII_RT_MODULE);
  }

  if (specialDeps.init) {
    result.push({
      alias: JSII_INIT_ALIAS,
      module: `${context.root.goModuleName}/${JSII_INIT_PACKAGE}`,
    });
  }

  if (specialDeps.internal) {
    result.push({
      module: `${context.goModuleName}/${INTERNAL_PACKAGE_NAME}`,
    });
  }

  return result;
}

/**
 * The name of a sub-package that includes internal type aliases it has to be
 * "internal" so it not published.
 */
export const INTERNAL_PACKAGE_NAME = 'internal';

export const JSII_RT_MODULE: ImportedModule = {
  alias: JSII_RT_ALIAS,
  module: JSII_RT_PACKAGE_NAME,
};
export const GO_REFLECT: ImportedModule = { module: 'reflect' };
