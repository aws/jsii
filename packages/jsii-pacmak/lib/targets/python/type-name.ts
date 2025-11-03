import {
  Assembly,
  OptionalValue,
  TypeReference,
  isCollectionTypeReference,
  CollectionKind,
  isNamedTypeReference,
  isPrimitiveTypeReference,
  PrimitiveType,
  PrimitiveTypeReference,
  isUnionTypeReference,
  Type,
  isInterfaceType,
  isIntersectionTypeReference,
} from '@jsii/spec';
import { CodeMaker, toSnakeCase } from 'codemaker';
import { createHash } from 'crypto';

import { die, setDifference, toPythonIdentifier } from './util';

/**
 * Actually more of a TypeNameFactory than a TypeName
 */
export interface TypeName {
  pythonType(context: NamingContext): string;
  requiredImports(context: NamingContext): PythonImports;
}

/**
 * Classify Python imports between type-checking imports and run-time imports
 *
 * (All members are required so we don't accidentally forget to classify)
 */
export interface PhaseAwarePythonImports {
  readonly runtimeImports: PythonImports;
  readonly typeImports: PythonImports;
}

export interface PythonImports {
  /**
   * For a given source module, what elements to import. The empty string value
   * indicates a need to import the module fully ("import <name>") instead of
   * doing a piecemeal import ("from <name> import <item>").
   */
  readonly [sourcePackage: string]: ReadonlySet<string>;
}

/**
 * The context in which a PythonType is being considered.
 */
export interface NamingContext {
  /** The assembly in which the PythonType is expressed. */
  readonly assembly: Assembly;

  /** A resolver to obtain complete information about a type. */
  readonly typeResolver: (fqn: string) => Type;

  /** The submodule of the assembly in which the PythonType is expressed (could be the module root) */
  readonly submodule: string;

  /**
   * The declaration is made in the context of a type annotation (so it can be quoted)
   *
   * @default true
   */
  readonly typeAnnotation?: boolean;

  /**
   * A an array representing the stack of declarations currently being
   * initialized. All of these names can only be referred to using a forward
   * reference (stringified type name) in the context of type signatures (but
   * they can be used safely from implementations so long as those are not *run*
   * as part of the declaration).
   *
   * @default []
   */
  readonly surroundingTypeFqns?: readonly string[];

  /**
   * Disables generating typing.Optional wrappers
   * @default false
   * @internal
   */
  readonly ignoreOptional?: boolean;

  /**
   * The set of jsii type FQNs that have already been emitted so far. This is
   * used to determine whether a given type reference is a forward declaration
   * or not when emitting type signatures.
   */
  readonly emittedTypes: Set<string>;

  /**
   * Whether the type is used for an input (true) or an output (false).
   *
   * This may change the exact type signature being emitted; we will sometimes
   * emit weaker type signatures for inputs. E.g: Arrays are typing.Sequence[T]
   * for inputs, typing.List[T] for outputs.
   */
  readonly isInputType?: boolean;
}

export function toTypeName(ref?: OptionalValue | TypeReference): TypeName {
  if (ref == null) {
    return Primitive.NONE;
  }

  const type = isOptionalValue(ref) ? ref.type : ref;
  const optional = isOptionalValue(ref) && ref.optional;

  let result: TypeName = Primitive.ANY;

  if (isPrimitiveTypeReference(type)) {
    result = Primitive.of(type);
  } else if (isCollectionTypeReference(type)) {
    const elt = toTypeName(type.collection.elementtype);
    if (type.collection.kind === CollectionKind.Array) {
      result = new List(elt);
    } else {
      result = new Dict(elt);
    }
  } else if (isUnionTypeReference(type)) {
    result = new Union(type.union.types.map(toTypeName));
  } else if (isNamedTypeReference(type)) {
    result = new UserType(type.fqn);
  } else if (isIntersectionTypeReference(type)) {
    const types = type.intersection.types.map(toTypeName);
    if (types.some((t) => !(t instanceof UserType))) {
      throw new Error('Only user types are supported in intersections');
    }
    result = new Intersection(types as any);
  }

  return optional ? new Optional(result) : result;
}

/**
 * Obtains the Python package name for a given submodule FQN.
 *
 * @param fqn      the submodule FQN for which a package name is needed.
 * @param rootAssm the assembly this FQN belongs to.
 */
export function toPackageName(fqn: string, rootAssm: Assembly): string {
  return getPackageName(fqn, rootAssm).packageName;
}

/**
 * Merge a set of Python imports
 */
export function mergePythonImports(
  pythonImports: readonly PythonImports[],
): PythonImports {
  const result: Record<string, Set<string>> = {};
  for (const bag of pythonImports) {
    for (const [packageName, items] of Object.entries(bag)) {
      if (!(packageName in result)) {
        result[packageName] = new Set();
      }
      for (const item of items) {
        result[packageName].add(item);
      }
    }
  }
  return result;
}

/**
 * Return lhs with any elements from rhs removed
 */
export function excludeImports(
  lhs: PythonImports,
  rhs: PythonImports,
): PythonImports {
  return Object.fromEntries(
    Object.entries(lhs).flatMap(([pkg, elements]) => {
      const returnEls = setDifference(elements, new Set(rhs[pkg] ?? []));
      if (returnEls.size > 0) {
        return [[pkg, returnEls]];
      }
      return [];
    }),
  );
}

export function nonEmptyImports(imp: PythonImports) {
  return Object.keys(imp).length > 0;
}

/**
 * Merge the different phases of phase-aware imports separately
 *
 * Type imports that are subsumed by runtime imports will be removed.
 */
export function mergePhaseAwarePythonImports(
  imports: readonly PhaseAwarePythonImports[],
): PhaseAwarePythonImports {
  const runtimeImports = mergePythonImports(
    imports.map((p) => p.runtimeImports),
  );
  const typeImports = mergePythonImports(imports.map((p) => p.typeImports));

  return {
    runtimeImports,
    // Anything that's imported as runtime doesn't need to be additionally imported for types
    typeImports: excludeImports(typeImports, runtimeImports),
  };
}

function isOptionalValue(
  type: OptionalValue | TypeReference,
): type is OptionalValue {
  return (type as unknown as OptionalValue).type != null;
}

class Dict implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #element: TypeName;

  public constructor(element: TypeName) {
    this.#element = element;
  }

  public pythonType(context: NamingContext) {
    return `typing.Mapping[builtins.str, ${this.#element.pythonType(context)}]`;
  }

  public requiredImports(context: NamingContext) {
    return this.#element.requiredImports(context);
  }
}

class List implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #element: TypeName;

  public constructor(element: TypeName) {
    this.#element = element;
  }

  public pythonType(context: NamingContext) {
    const type = context.isInputType ? 'Sequence' : 'List';
    return `typing.${type}[${this.#element.pythonType(context)}]`;
  }

  public requiredImports(context: NamingContext) {
    return this.#element.requiredImports(context);
  }
}

class Optional implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #wrapped: TypeName;

  public constructor(wrapped: TypeName) {
    this.#wrapped = wrapped;
  }

  public pythonType(context: NamingContext) {
    const optionalType = this.#wrapped.pythonType({
      ...context,
      ignoreOptional: true,
    });
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (context.ignoreOptional || this.#wrapped === Primitive.ANY) {
      return optionalType;
    }
    return `typing.Optional[${optionalType}]`;
  }

  public requiredImports(context: NamingContext) {
    return this.#wrapped.requiredImports({ ...context, ignoreOptional: true });
  }
}

class Primitive implements TypeName {
  private static readonly BOOL = new Primitive('builtins.bool');
  private static readonly DATE = new Primitive('datetime.datetime');
  private static readonly JSII_NUMBER = new Primitive('jsii.Number'); // "jsii" is always already imported!
  private static readonly STR = new Primitive('builtins.str');
  private static readonly JSON = new Primitive(
    'typing.Mapping[typing.Any, typing.Any]',
  );

  public static readonly ANY = new Primitive('typing.Any');
  public static readonly NONE = new Primitive('None');

  public static of(type: PrimitiveTypeReference): TypeName {
    switch (type.primitive) {
      case PrimitiveType.Boolean:
        return Primitive.BOOL;
      case PrimitiveType.Date:
        return Primitive.DATE;
      case PrimitiveType.Number:
        return Primitive.JSII_NUMBER;
      case PrimitiveType.String:
        return Primitive.STR;
      case PrimitiveType.Json:
        return Primitive.JSON;
      case PrimitiveType.Any:
      default:
        return Primitive.ANY;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #pythonType: string;

  private constructor(pythonType: string) {
    this.#pythonType = pythonType;
  }

  public pythonType() {
    return this.#pythonType;
  }

  public requiredImports() {
    return {};
  }
}

class Union implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #options: readonly TypeName[];

  public constructor(options: readonly TypeName[]) {
    this.#options = options;
  }

  public pythonType(context: NamingContext) {
    return `typing.Union[${this.#options
      .map((o) => o.pythonType(context))
      .join(', ')}]`;
  }

  public requiredImports(context: NamingContext) {
    return mergePythonImports(
      this.#options.map((o) => o.requiredImports(context)),
    );
  }
}

export class Intersection implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #types: readonly UserType[];

  public constructor(types: readonly UserType[]) {
    this.#types = types;
  }

  public get types(): readonly TypeName[] {
    return this.#types;
  }

  public get fqns() {
    return this.#types.map((t) => t.fqn);
  }

  public pythonType(context: NamingContext) {
    // This can only ever appear as a type annotation, so render between quotes
    return `"${this.helperTypeName(context)}"`;
  }

  /**
   * Need the context for the type resolver
   */
  public helperTypeName(context: NamingContext) {
    const parts = this.#types.map((t) =>
      t.pythonType({ ...context, typeAnnotation: false }),
    );
    return `_${parts.map(lastComponent).join('_')}`;
  }

  public requiredImports(context: NamingContext) {
    return mergePythonImports(
      this.#types.map((o) => o.requiredImports(context)),
    );
  }
}

class UserType implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  public readonly fqn: string;

  public constructor(fqn: string) {
    this.fqn = fqn;
  }

  public pythonType(context: NamingContext) {
    return this.resolve(context).pythonType;
  }

  public requiredImports(context: NamingContext) {
    const requiredImport = this.resolve(context).requiredImport;
    if (requiredImport == null) {
      return {};
    }
    return { [requiredImport.sourcePackage]: new Set([requiredImport.item]) };
  }

  private resolve({
    assembly,
    emittedTypes,
    submodule,
    surroundingTypeFqns,
    typeAnnotation = true,
    isInputType,
    typeResolver,
  }: NamingContext) {
    const { assemblyName, packageName, pythonFqn } = toPythonFqn(
      this.fqn,
      assembly,
    );

    // If this is a type annotation for a parameter, allow dicts to be passed where structs are expected.
    const type = typeResolver(this.fqn);
    const isStruct = isInterfaceType(type) && !!type.datatype;
    const quoteType = typeAnnotation
      ? (t: string) => `"${t}"`
      : (t: string) => t;

    // For backwards compatibility, we accept a dict if the input is a struct with camelCased keys.
    // Using `typing.Dict` instead of `typing.Dict[str, typing.Any]` because of a bug in the Python
    // standard library that only got fixed in 3.14 <https://github.com/python/cpython/issues/137226>
    const wrapType =
      typeAnnotation && isInputType && isStruct
        ? (pyType: string) =>
            `typing.Union[${quoteType(pyType)}, builtins.dict]`
        : (pyType: string) => quoteType(pyType);

    // Emit aliased imports for dependencies (this avoids name collisions)
    if (assemblyName !== assembly.name) {
      const aliasSuffix = createHash('sha256')
        .update(assemblyName)
        .update('.*')
        .digest('hex')
        .substring(0, 8);
      const alias = `_${packageName.replace(/\./g, '_')}_${aliasSuffix}`;

      const aliasedFqn = `${alias}${pythonFqn.slice(packageName.length)}`;

      return {
        // If it's a struct, then we allow passing as a dict, too...
        pythonType: wrapType(aliasedFqn),
        requiredImport: {
          sourcePackage: `${packageName} as ${alias}`,
          item: '',
        },
      };
    }

    const submodulePythonName = toPythonFqn(submodule, assembly).pythonFqn;
    const typeSubmodulePythonName = toPythonFqn(
      findParentSubmodule(type, assembly),
      assembly,
    ).pythonFqn;

    if (typeSubmodulePythonName === submodulePythonName) {
      // Identify declarations that are not yet initialized and hence cannot be
      // used as part of a type qualification. Since this is not a forward
      // reference, the type was already emitted and its un-qualified name must
      // be used instead of its locally qualified name.
      const nestingParent = surroundingTypeFqns
        ?.map((fqn) => toPythonFqn(fqn, assembly).pythonFqn)
        ?.reverse()
        ?.find((parent) => pythonFqn.startsWith(`${parent}.`));

      if (
        typeAnnotation &&
        (!emittedTypes.has(this.fqn) || nestingParent != null)
      ) {
        // Possibly a forward reference, outputting the stringifierd python FQN
        return {
          pythonType: wrapType(
            pythonFqn.substring(submodulePythonName.length + 1),
          ),
        };
      }

      if (!typeAnnotation && nestingParent) {
        // This is not for a type annotation, so we should be at a point in time
        // where the surrounding symbol has been defined entirely, so we can
        // refer to it "normally" now.
        return { pythonType: pythonFqn.slice(packageName.length + 1) };
      }

      // We'll just make a module-qualified reference at this point.
      return {
        pythonType: wrapType(
          pythonFqn.substring(submodulePythonName.length + 1),
        ),
      };
    }

    const [toImport, ...nested] = pythonFqn
      .substring(typeSubmodulePythonName.length + 1)
      .split('.');
    const aliasSuffix = createHash('sha256')
      .update(typeSubmodulePythonName)
      .update('.')
      .update(toImport)
      .digest('hex')
      .substring(0, 8);
    const alias = `_${toImport}_${aliasSuffix}`;

    return {
      pythonType: wrapType([alias, ...nested].join('.')),
      requiredImport: {
        sourcePackage: relativeImportPath(
          submodulePythonName,
          typeSubmodulePythonName,
        ),
        item: `${toImport} as ${alias}`,
      },
    };
  }
}

export function toPythonFqn(fqn: string, rootAssm: Assembly) {
  const { assemblyName, packageName, tail } = getPackageName(fqn, rootAssm);
  const fqnParts: string[] = [packageName];

  for (const part of tail) {
    fqnParts.push(toPythonIdentifier(part));
  }

  return { assemblyName, packageName, pythonFqn: fqnParts.join('.') };
}

/**
 * Computes the python relative import path from `fromModule` to `toModule`.
 *
 * @param fromPkg the package where the relative import statement is located.
 * @param toPkg   the package that needs to be relatively imported.
 *
 * @returns a relative import path.
 *
 * @example
 *  relativeImportPath('A.B.C.D', 'A.B.E') === '...E';
 *  relativeImportPath('A.B.C', 'A.B')     === '..';
 *  relativeImportPath('A.B', 'A.B.C')     === '.C';
 */
function relativeImportPath(fromPkg: string, toPkg: string): string {
  if (toPkg.startsWith(fromPkg)) {
    // from A.B to A.B.C === .C
    return `.${toPkg.substring(fromPkg.length + 1)}`;
  }
  // from A.B.E to A.B.C === .<from A.B to A.B.C>
  const fromPkgParent = fromPkg.substring(0, fromPkg.lastIndexOf('.'));
  return `.${relativeImportPath(fromPkgParent, toPkg)}`;
}

function getPackageName(fqn: string, rootAssm: Assembly) {
  const segments = fqn.split('.');
  const assemblyName = segments[0];
  const config =
    assemblyName === rootAssm.name
      ? rootAssm
      : (rootAssm.dependencyClosure?.[assemblyName] ??
        die(
          `Unable to find configuration for assembly "${assemblyName}" in dependency closure`,
        ));
  const rootPkg =
    config.targets?.python?.module ??
    die(`No Python target was configured in assembly "${assemblyName}"`);

  const pkg = new Array<string>();
  const tail = new Array<string>();

  for (let len = segments.length; len > 0; len--) {
    const submodule = segments.slice(0, len).join('.');
    if (submodule === assemblyName) {
      pkg.unshift(rootPkg);
      break;
    }

    const submoduleConfig = config.submodules?.[submodule];
    if (submoduleConfig == null) {
      // Not in a submodule - so the current lead name is not a package name part.
      tail.unshift(segments[len - 1]);
      continue;
    }

    const subPackage: string | undefined =
      submoduleConfig.targets?.python?.module;
    if (subPackage != null) {
      // Found a sub-package. Confirm it's nested right in, and make this the head end of our package name.
      if (!subPackage.startsWith(`${rootPkg}.`)) {
        die(
          `Submodule "${submodule}" is mapped to Python sub-package "${subPackage}" which isn't nested under "${rootPkg}"!`,
        );
      }
      pkg.unshift(subPackage);
      break;
    }

    // Just use whatever the default name is for this package name part.
    pkg.unshift(toSnakeCase(toPythonIdentifier(segments[len - 1])));
  }

  return { assemblyName, packageName: pkg.join('.'), tail };
}

function findParentSubmodule(type: Type, assm: Assembly): string {
  if (type.namespace == null) {
    return assm.name;
  }
  const namespaceFqn = `${assm.name}.${type.namespace}`;
  if (assm.types?.[namespaceFqn] != null) {
    return findParentSubmodule(assm.types?.[namespaceFqn], assm);
  }
  return namespaceFqn;
}

/**
 * Holds a set of intersection types used by the current set of modules
 */
export class IntersectionTypesRegistry {
  private readonly types = new Map<string, string[]>();

  /**
   * Return a unique name for a protocol that extends the given types
   */
  public obtain(types: string[]): string {
    const derivedName = `_${types.map(lastComponent).join('_')}`;
    this.types.set(derivedName, types);
    return derivedName;
  }

  public get typeNames() {
    return Array.from(this.types.keys());
  }

  public flushHelperTypes(code: CodeMaker) {
    for (const [name, types] of this.types.entries()) {
      code.line('');
      code.line(
        `class ${name}(${types.join(', ')}, typing_extensions.Protocol):`,
      );
      code.line('    pass');
    }
  }
}

function lastComponent(x: string) {
  return x.split('.').slice(-1)[0];
}
