import * as path from 'node:path';

import { BuilderFactory, TargetName } from './targets';
import { IndependentPackageBuilder } from './builder';
import { TargetConstructor } from './target';

/**
 * The version of the target-plugin API implemented by this copy of pacmak.
 *
 * Plugins may declare the API version they were written against via
 * `pluginApiVersion`; a differing MAJOR version fails loudly at load time.
 * The API is currently experimental: no compatibility guarantee is made
 * between minor versions while the major version is 0.
 */
export const PLUGIN_API_VERSION = '0.1.0';

/**
 * The shape a target plugin module must export (as its default export or as
 * the module itself).
 *
 * The common case provides `targetConstructor` and is run through the same
 * generic `IndependentPackageBuilder` used by the built-in go/js/python
 * targets. Targets that need whole-batch control (e.g. multi-module builds
 * like Java/.NET) may provide `builderFactory` instead.
 */
export interface TargetPluginDeclaration {
  /**
   * The name under which this target is selected (`--targets <name>`), and
   * the per-language output subdirectory name. Must not collide with a
   * built-in target name.
   */
  readonly targetName: string;

  /**
   * Constructor for the plugin's `Target` (see `lib/target.ts`). Exactly one
   * of `targetConstructor` / `builderFactory` must be provided.
   */
  readonly targetConstructor?: TargetConstructor;

  /**
   * Full builder factory — the escape hatch for targets that cannot use the
   * generic one-package-at-a-time builder.
   */
  readonly builderFactory?: BuilderFactory;

  /**
   * The plugin API version this plugin was written against.
   */
  readonly pluginApiVersion?: string;
}

/**
 * Load target plugins from module specifiers (npm package names, or paths).
 *
 * @returns a map of target name to builder factory, ready to be consulted
 *          alongside the built-in `ALL_BUILDERS`.
 */
export function loadTargetPlugins(
  specs: readonly string[],
): Record<string, BuilderFactory> {
  // Null prototype: a target named like an Object.prototype member
  // (`toString`, ...) must be neither rejected as its own duplicate by the
  // `in` check below nor resolved to an inherited function by lookups.
  const result: Record<string, BuilderFactory> = Object.create(null);
  for (const spec of specs) {
    const declaration = loadTargetPlugin(spec);
    if (declaration.targetName in result) {
      throw new Error(
        `Duplicate target plugin name '${declaration.targetName}' (from ${spec})`,
      );
    }
    result[declaration.targetName] = builderFactoryFor(declaration);
  }
  return result;
}

function loadTargetPlugin(spec: string): TargetPluginDeclaration {
  const modulePath =
    spec.startsWith('.') || path.isAbsolute(spec)
      ? path.resolve(process.cwd(), spec)
      : /* eslint-disable-next-line @typescript-eslint/no-require-imports */
        require.resolve(spec, { paths: [process.cwd(), __dirname] });

  /* eslint-disable-next-line @typescript-eslint/no-require-imports */
  const module = require(modulePath);
  const declaration: TargetPluginDeclaration = module.default ?? module;

  if (
    typeof declaration.targetName !== 'string' ||
    declaration.targetName.length === 0
  ) {
    throw new Error(
      `Target plugin ${spec} must declare a non-empty 'targetName' string`,
    );
  }
  if (Object.values(TargetName).includes(declaration.targetName as any)) {
    throw new Error(
      `Target plugin ${spec} declares target name '${declaration.targetName}', which collides with a built-in target`,
    );
  }
  if (
    (declaration.targetConstructor == null) ===
    (declaration.builderFactory == null)
  ) {
    throw new Error(
      `Target plugin ${spec} must declare exactly one of 'targetConstructor' or 'builderFactory'`,
    );
  }
  if (declaration.pluginApiVersion != null) {
    const pluginMajor = declaration.pluginApiVersion.split('.')[0];
    const ourMajor = PLUGIN_API_VERSION.split('.')[0];
    if (pluginMajor !== ourMajor) {
      throw new Error(
        `Target plugin ${spec} requires plugin API ${declaration.pluginApiVersion}, but this jsii-pacmak implements ${PLUGIN_API_VERSION}`,
      );
    }
  }

  return declaration;
}

function builderFactoryFor(
  declaration: TargetPluginDeclaration,
): BuilderFactory {
  if (declaration.builderFactory) {
    return declaration.builderFactory;
  }
  return (modules, options) =>
    new IndependentPackageBuilder(
      declaration.targetName,
      declaration.targetConstructor!,
      modules,
      options,
    );
}
