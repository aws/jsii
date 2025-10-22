import * as spec from '@jsii/spec';
import { JsiiFeature } from '@jsii/spec';
import { RosettaTabletReader } from 'jsii-rosetta';

const ROSETTA_SUPPORTED_ASSEMBLY_FEATURES: JsiiFeature[] = [
  'intersection-types',
  'class-covariant-overrides',
];

/**
 * Assert that the given spec is safe to give to Rosetta
 *
 * We have to do it like this, because Rosetta has its own internal copy of the
 * spec and new schema additions may make it technically illegal to assign our
 * Assembly instance to Rosetta's Assembly type.
 *
 * We do runtime validation here to make sure that assignment is safe,
 * and then assert it in the type system.
 *
 * The check should be cheap, this gets called quite a lot.
 *
 * (In actual fact, Rosetta doesn't do much with the Assembly, just crawl
 * all API documentations, so basically most new features would be supported...
 * but we technically should do *something* here anyway).
 */
export function assertSpecIsRosettaCompatible(
  x: spec.Assembly,
): asserts x is Parameters<RosettaTabletReader['addAssembly']>[0] {
  const unsupported = (x.usedFeatures ?? []).filter(
    (f) => !ROSETTA_SUPPORTED_ASSEMBLY_FEATURES.includes(f),
  );
  if (unsupported.length > 0) {
    throw new Error(
      `This assembly uses features that jsii-pacmak doesn't think jsii-rosetta can handle yet: ${unsupported.join(', ')}`,
    );
  }
}
