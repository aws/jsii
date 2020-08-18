import { Module, ModuleType } from './module';
import { TypeField } from './types';

/*
 * Recursively search module for type with fqn
 */
export function findTypeInTree(
  module: Module,
  fqn: string,
): ModuleType | undefined {
  const result = module.types.find((t) => t.type.fqn === fqn);

  if (result) {
    return result;
  }

  return module.submodules.reduce((accum: ModuleType | undefined, sm) => {
    return accum || findTypeInTree(sm, fqn);
  }, undefined);
}

/*
 * Format NPM package names as idiomatic Go module name
 */
export function goModuleName(name: string): string {
  return name.replace('@', '').replace(/[^a-z0-9.]/gi, '');
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
export function getFieldDependencies(fields: TypeField[]): Module[] {
  return fields.reduce((accum: Module[], field) => {
    return field.references?.type?.parent
      ? [...accum, field.references?.type.parent]
      : accum;
  }, []);
}
