import { TypeReference } from 'jsii-reflect';

import * as log from '../../../logging';
import { Package } from '../package';
import { GoType } from './go-type';

/*
 * Maps names of JS primitives to corresponding Go types as strings
 */
class PrimitiveMapper {
  private readonly MAP: { [key: string]: string } = {
    number: 'float64',
    boolean: 'bool',
    any: 'interface{}',
    // TODO: Resolve "time" package dependency where needed and change to "time.Time"
    date: 'string',
    string: 'string',
    json: `map[string]interface{}`,
  };

  public constructor(private readonly name: string) {}

  public get goPrimitive(): string {
    const val = this.MAP[this.name];
    if (!val) {
      log.debug(`Unmapped primitive type: ${this.name}`);
    }

    return val ?? this.name;
  }
}

/*
 * Accepts a JSII TypeReference and Go Package and can resolve the GoType within the module tree.
 */
export class GoTypeRef {
  public constructor(
    public readonly root: Package,
    public readonly reference: TypeReference,
  ) {}

  public get type(): GoType | undefined {
    if (this.reference.fqn) {
      return this.root.findType(this.reference.fqn);
    }

    return undefined;
  }

  public get primitiveType() {
    if (this.reference.primitive) {
      return new PrimitiveMapper(this.reference.primitive).goPrimitive;
    }

    return undefined;
  }

  public get interfaceName() {
    return this.type?.interfaceName;
  }

  public get name() {
    return this.type?.name;
  }

  public get namespace() {
    return this.type?.namespace;
  }

  public get void() {
    return this.reference.void;
  }

  /*
   * Return the name of a type for reference from the `Package` passed in
   */
  public scopedName(scope: Package): string {
    return this.scopedTypeName(this.typeMap, scope, false);
  }

  public scopedInterfaceName(scope: Package): string {
    return this.scopedTypeName(this.typeMap, scope, true);
  }

  public scopedReferenceName(scope: Package): string {
    return this.scopedTypeName(this.typeMap, scope, false, true);
  }

  public get typeMap(): TypeMap {
    return this.buildTypeMap(this);
  }

  private buildTypeMap(ref: GoTypeRef): TypeMap {
    if (ref.primitiveType) {
      return { primitive: ref.primitiveType };
    } else if (ref.reference.arrayOfType) {
      return { array: new GoTypeRef(this.root, ref.reference.arrayOfType) };
    } else if (ref.reference.mapOfType) {
      return { map: new GoTypeRef(this.root, ref.reference.mapOfType) };
    } else if (ref.reference.unionOfTypes) {
      return {
        union: ref.reference.unionOfTypes.map(
          (typeRef) => new GoTypeRef(this.root, typeRef),
        ),
      };
    } else if (ref.reference.void) {
      return { void: true };
    }

    return { interface: ref };
  }

  /**
   * Builds a map of interface to concrete types. This is passed to the runtime
   * so that return types of interfaces can correctly be constructucted.
   */
  public scopedImplMap(scope: Package) {
    const nextRef =
      this.typeMap.array ?? this.typeMap.map ?? this.typeMap.interface;

    if (nextRef) {
      return [nextRef.scopedInterfaceName(scope), nextRef.scopedName(scope)];
    }

    return [];
  }

  private scopedTypeName(
    typeMap: TypeMap,
    scope: Package,
    asInterface: boolean,
    asRef = false,
  ): string {
    if (typeMap.primitive) {
      return typeMap.primitive;
    } else if (typeMap.array || typeMap.map) {
      const prefix = typeMap.array ? '[]' : 'map[string]';
      const innerName =
        this.scopedTypeName(
          (typeMap.array ?? typeMap.map!).typeMap,
          scope,
          asInterface,
          asRef,
        ) ?? 'interface{}';
      return `${prefix}${innerName}`;
    } else if (typeMap.interface) {
      const prefix = asRef ? '*' : '';
      const baseName = asInterface
        ? typeMap.interface.interfaceName
        : typeMap.interface.name;
      // type is defined in the same scope as the current one, no namespace required
      if (scope.packageName === typeMap.interface.namespace && baseName) {
        // if the current scope is the same as the types scope, return without a namespace
        return `${prefix}${baseName}`;
      }

      // type is defined in another module and requires a namespace and import
      if (baseName) {
        return `${prefix}${typeMap.interface.namespace}.${baseName}`;
      }
    } else if (typeMap.union) {
      return 'interface{}';
    } else if (typeMap.void) {
      return '';
    }

    // type isn't handled
    log.warn(
      `Type ${typeMap.interface?.name} does not resolve to a known Go type. It is being mapped to "interface{}".`,
    );

    return 'interface{}';
  }
}

interface TypeMap {
  primitive?: string;
  array?: GoTypeRef;
  map?: GoTypeRef;
  union?: GoTypeRef[];
  void?: boolean;
  interface?: GoTypeRef;
}
