/**
 * The API available to jsii-pacmak target plugins.
 *
 * A plugin should import from this module only. Everything else in
 * jsii-pacmak is internal and may change in any release; what is exported here
 * is versioned by `PLUGIN_API_VERSION`, and a plugin declaring an incompatible
 * version is refused at load time.
 *
 * @experimental while `PLUGIN_API_VERSION` is 0.x, any minor version may break
 * plugins.
 */

// The plugin declaration and its version contract.
export {
  isCompatiblePluginApi,
  PLUGIN_API_VERSION,
  TargetPluginDeclaration,
} from './plugins';

// A target built one package at a time (the `targetConstructor` route).
export {
  Target,
  TargetConstructor,
  TargetOptions,
  PackageInfo,
} from './target';
export { Generator, GeneratorOptions, IGenerator, Legalese } from './generator';

// A target that controls the whole build (the `builderFactory` route).
export { BuilderFactory } from './targets';
export { BuildOptions, TargetBuilder } from './builder';
export { JsiiModule } from './packaging';
export { Toposorted } from './toposort';

// Helpers the built-in targets use, which a plugin target needs as well.
export { assertSpecIsRosettaCompatible } from './rosetta-assembly';
export { subprocess } from './util';
