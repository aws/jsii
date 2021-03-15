import { Assembly, Submodule } from 'jsii-reflect';

import { Package } from './package';
import {
  GoMethod,
  GoTypeMember,
  GoType,
  GoClass,
  GoInterface,
  GoTypeRef,
} from './types';

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
  const deps = new Array<Package>();
  for (const member of members) {
    deps.push(...(member.reference?.dependencies ?? []));
  }

  return deps;
}

export function getParamDependencies(methods: GoMethod[]): Package[] {
  const dependencies: Package[] = [];
  for (const method of methods) {
    for (const param of method.parameters) {
      dependencies.push(...(param.reference?.dependencies ?? []));
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

/**
 * Returns the name of the embed field used to embed a base class/interface in a
 * struct.
 *
 * @returns If the base is in the same package, returns the proxy name of the
 * base under `embed`, otherwise returns a unique symbol under `embed` and the
 * original interface reference under `original`.
 *
 * @param pkg The package we are code-generating
 * @param structName The name of the struct in which we will embed the type
 * @param base The base type we want to embed
 */
export function embedForBase(
  pkg: Package,
  structName: string,
  base: GoClass | GoInterface,
) {
  if (base.pkg === pkg) {
    return { embed: base.proxyName };
  }
  const typeref = new GoTypeRef(pkg.root, base.type.reference);
  const original = typeref.scopedInterfaceName(pkg);
  const embed = `${structName}_${original.replace(/[^A-Za-z0-9]/g, '')}`;
  return { embed, original };
}
