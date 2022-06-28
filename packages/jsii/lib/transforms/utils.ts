import { CustomTransformers } from 'typescript';

/**
 * Combines a collection of `CustomTransformers` configurations into a single
 * one, preserving the order of arguments.
 *
 * @param transformers the list of transformers to combine.
 *
 * @returns the combined transformer.
 */
export function combinedTransformers(
  ...transformers: readonly CustomTransformers[]
): CustomTransformers {
  // Note the ! below are just to stop the type checker from seeing undefined as
  // a value for the whole map-filter-reduce chain, as this would require heavy
  // syntax that is not desirable. The filter step removes the `undefined`.
  return {
    before: transformers
      .map((transformer) => transformer.before!)
      .filter((transform) => transform != null)
      .reduce(
        (acc, elt) => (acc ? [...acc, ...elt] : elt),
        undefined as CustomTransformers['before'],
      ),
    after: transformers
      .map((transformer) => transformer.after!)
      .filter((transform) => transform != null)
      .reduce(
        (acc, elt) => (acc ? [...acc, ...elt] : elt),
        undefined as CustomTransformers['after'],
      ),
    afterDeclarations: transformers
      .map((transformer) => transformer.afterDeclarations!)
      .filter((transform) => transform != null)
      .reduce(
        (acc, elt) => (acc ? [...acc, ...elt] : elt),
        undefined as CustomTransformers['afterDeclarations'],
      ),
  };
}
