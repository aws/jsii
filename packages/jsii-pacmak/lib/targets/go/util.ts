import { Assembly, Submodule } from 'jsii-reflect';

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
    return accum ?? findTypeInTree(sm, fqn);
  }, undefined);
}

/*
 * Format NPM package names as idiomatic Go module name
 */
export function goPackageNameForAssembly(
  assembly: Assembly | Submodule,
): string {
  const config = assembly.targets?.go ?? {};
  if (config.packageName) {
    return config.packageName;
  }

  return assembly.name.replace(/[^a-z0-9.]/gi, '').toLowerCase();
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
export function getMemberDependencies(
  members: readonly GoTypeMember[],
): Package[] {
  return members.flatMap((member) => member.reference?.dependencies ?? []);
}

export function getParamDependencies(methods: readonly GoMethod[]): Package[] {
  return methods.flatMap(({ parameters }) =>
    parameters.flatMap((param) => param.reference?.dependencies ?? []),
  );
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
  _: '_arg',
};

/*
 * Sanitize reserved words
 */
export function substituteReservedWords(name: string): string {
  return RESERVED_WORDS[name] || name;
}

/**
 * Computes a safe tarball name for the provided assembly.
 *
 * @param assm the assembly.
 *
 * @returns a tarball name.
 */
export function tarballName(assm: Assembly): string {
  const name = assm.name.replace(/^@/, '').replace(/\//g, '-');
  return `${name}-${assm.version}.tgz`;
}
