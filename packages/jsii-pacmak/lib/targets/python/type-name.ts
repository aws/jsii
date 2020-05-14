import {
  Assembly,
  OptionalValue, TypeReference,
  isCollectionTypeReference, CollectionKind,
  isNamedTypeReference,
  isPrimitiveTypeReference, PrimitiveType, PrimitiveTypeReference,
  isUnionTypeReference,
  Type,
} from '@jsii/spec';
import { createHash } from 'crypto';
import { die, toPythonIdentifier } from './util';
import { toSnakeCase } from 'codemaker';

export interface TypeName {
  pythonType(context: NamingContext): string;
  requiredImports(context: NamingContext): PythonImports;
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

  /** The submodule of the assembly in which the PythonType is expressed (could be the module root) */
  readonly submodule: string;

  /**
   * The declaration is made in the context of a type annotation (so it can be quoted)
   *
   * @default true
   */
  readonly typeAnnotation?: boolean;

  /**
   * The nesting scope in which the PythonType is expressed (if any)
   *
   * @default - none
   */
  readonly nestingScope?: string | undefined;

  /**
   * Disables generating typing.Optional wrappers
   * @default false
   * @internal
   */
  readonly ignoreOptional?: boolean;
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
  }

  return optional ? new Optional(result) : result;
}

export function mergePythonImports(...pythonImports: readonly PythonImports[]): PythonImports {
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

function isOptionalValue(type: OptionalValue | TypeReference): type is OptionalValue {
  return (type as unknown as OptionalValue).type != null;
}

class Dict implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #element: TypeName;

  public constructor(element: TypeName) {
    this.#element = element;
  }

  public pythonType(context: NamingContext) {
    return `typing.Mapping[str, ${this.#element.pythonType(context)}]`;
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
    return `typing.List[${this.#element.pythonType(context)}]`;
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
    const optionalType = this.#wrapped.pythonType({ ...context, ignoreOptional: true });
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
  private static readonly BOOL = new Primitive('bool');
  private static readonly DATE = new Primitive('datetime.datetime');
  private static readonly JSII_NUMBER = new Primitive('jsii.Number'); // "jsii" is always already imported!
  private static readonly STR = new Primitive('str');
  private static readonly JSON = new Primitive('typing.Mapping[typing.Any, typing.Any]');

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
    return `typing.Union[${this.#options.map(o => o.pythonType(context)).join(', ')}]`;
  }

  public requiredImports(context: NamingContext) {
    return mergePythonImports(
      ...this.#options.map(o => o.requiredImports(context)),
    );
  }
}

class UserType implements TypeName {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #fqn: string;

  public constructor(fqn: string) {
    this.#fqn = fqn;
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

  private resolve({ assembly, submodule, nestingScope, typeAnnotation = true }: NamingContext) {
    const { assemblyName, packageName, pythonFqn } = toPythonFqn(this.#fqn, assembly);
    if (assemblyName !== assembly.name) {
      return {
        pythonType: pythonFqn,
        requiredImport: {
          sourcePackage: packageName,
          item: '',
        },
      };
    }

    const submodulePythonName = toPythonFqn(submodule, assembly).pythonFqn;
    const typeSubmodulePythonName = toPythonFqn(findParentSubmodule(assembly.types![this.#fqn], assembly), assembly).pythonFqn;

    if (typeSubmodulePythonName === submodulePythonName) {
      // Submodule-local type, so we'll just drop the submodule name prefix here, unless we are
      // referencing a type within the current nesting context, where we'll want to make a context
      // local reference by dropping the nesting type's name prefix.
      const nestingParent = nestingScope && toPythonFqn(nestingScope, assembly).pythonFqn;
      const localName = nestingParent && pythonFqn.startsWith(`${nestingParent}.`)
        ? pythonFqn.substring(nestingParent.length + 1)
        : pythonFqn.substring(typeSubmodulePythonName.length + 1);
      return {
        pythonType: typeAnnotation ? JSON.stringify(localName) : localName,
      };
    }

    const [toImport, ...nested] = pythonFqn.substring(typeSubmodulePythonName.length + 1).split('.');
    const aliasSuffix = createHash('sha256')
      .update(typeSubmodulePythonName)
      .update('.')
      .update(toImport)
      .digest('hex')
      .substring(0, 8);
    const alias = `_${toImport}_${aliasSuffix}`;

    return {
      pythonType: [alias, ...nested].join('.'),
      requiredImport: {
        sourcePackage: relativeImportPath(submodulePythonName, typeSubmodulePythonName),
        item: `${toImport} as ${alias}`,
      },
    };
  }
}

function toPythonFqn(fqn: string, rootAssm: Assembly) {
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
  const config = assemblyName === rootAssm.name
    ? rootAssm
    : rootAssm.dependencyClosure?.[assemblyName] ?? die(`Unable to find configuration for assembly "${assemblyName}" in dependency closure`);
  const rootPkg = config.targets?.python?.module ?? die(`No Python target was configured in assembly "${assemblyName}"`);

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

    const subPackage: string | undefined = submoduleConfig.targets?.python?.module;
    if (subPackage != null) {
      // Found a sub-package. Confirm it's nested right in, and make this the head end of our package name.
      if (!subPackage.startsWith(`${rootPkg}.`)) {
        die(`Submodule "${submodule}" is mapped to Python sub-package "${subPackage}" which isn't nested under "${rootPkg}"!`);
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
