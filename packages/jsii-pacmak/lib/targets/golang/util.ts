import { Package } from './package';
import { TypeField, GoType } from './types';

/*
 * Recursively search module for type with fqn
 */
export function findTypeInTree(
  module: Package,
  fqn: string,
): GoType | undefined {
  const result = module.types.find((t) => t.type.fqn === fqn);

  if (result) {
    return result;
  }

  return module.submodules.reduce((accum: GoType | undefined, sm) => {
    return accum || findTypeInTree(sm, fqn);
  }, undefined);
}

/*
 * Format NPM package names as idiomatic Go module name
 */
export function goPackageName(name: string): string {
  return name.replace(/[^a-z0-9.]/gi, '').toLowerCase();
}

export function flatMap<T, R>(
  collection: readonly T[],
  mapper: (value: T) => readonly R[],
): readonly R[] {
  return collection
    .map(mapper)
    .reduce((acc, elt) => acc.concat(elt), new Array<R>());
}

/*
 * Return module dependencies of a class or interface fields
 */
export function getFieldDependencies(fields: TypeField[]): Package[] {
  return fields.reduce((accum: Package[], field) => {
    return field.reference?.type?.pkg
      ? [...accum, field.reference?.type.pkg]
      : accum;
  }, []);
}

const RESERVED_WORDS: { [word: string]: string } = {
  map: 'map_',
};
/*
 * Sanitize reserved words
 */
export function substituteReservedWords(name: string): string {
  return RESERVED_WORDS[name] || name;
}
