import { Package } from './package';
import { GoMethod, GoTypeMember, GoType } from './types';

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
 * Return module dependencies of a class or interface members
 */
export function getMemberDependencies(members: GoTypeMember[]): Package[] {
  return members.reduce((accum: Package[], member) => {
    return member.reference?.type?.pkg
      ? [...accum, member.reference?.type.pkg]
      : accum;
  }, []);
}

export function getParamDependencies(methods: GoMethod[]): Package[] {
  const dependencies: Package[] = [];
  for (const method of methods) {
    for (const param of method.parameters) {
      const pkg = param.reference?.type?.pkg;
      if (pkg) {
        dependencies.push(pkg);
      }
    }
  }
  return dependencies;
}

const RESERVED_WORDS: { [word: string]: string } = {
  break: 'break_',
  default: 'default_',
  func: 'func_',
  interface: 'interface_',
  select: 'select_',
  case: 'case_',
  defer: 'defer_',
  go: 'go_',
  map: 'map_',
  struct: 'struct_',
  chan: 'chan_',
  else: 'else_',
  goto: 'goto_',
  package: 'package_',
  switch: 'switch_',
  const: 'const_',
  fallthrough: 'fallthrough_',
  if: 'if_',
  range: 'range_',
  type: 'type_',
  continue: 'continue_',
  for: 'for_',
  import: 'import_',
  return: 'return_',
  var: 'var_',
};
/*
 * Sanitize reserved words
 */
export function substituteReservedWords(name: string): string {
  return RESERVED_WORDS[name] || name;
}
