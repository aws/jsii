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

/**
 * TypeMap used to recursively resolve interfaces in nested types for use in
 * resolving scoped type names and implementation maps.
 */
type TypeMap =
  | { readonly type: 'primitive'; readonly value: string }
  | { readonly type: 'array'; readonly value: GoTypeRef }
  | { readonly type: 'map'; readonly value: GoTypeRef }
  | { readonly type: 'union'; readonly value: readonly GoTypeRef[] }
  | { readonly type: 'interface'; readonly value: GoTypeRef }
  | { readonly type: 'void' };

/*
 * Accepts a JSII TypeReference and Go Package and can resolve the GoType within the module tree.
 */
export class GoTypeRef {
  private _typeMap?: TypeMap;
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

  public get typeMap(): TypeMap {
    if (!this._typeMap) {
      this._typeMap = this.buildTypeMap(this);
    }
    return this._typeMap;
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

  private buildTypeMap(ref: GoTypeRef): TypeMap {
    if (ref.primitiveType) {
      return { type: 'primitive', value: ref.primitiveType };
    } else if (ref.reference.arrayOfType) {
      return {
        type: 'array',
        value: new GoTypeRef(this.root, ref.reference.arrayOfType),
      };
    } else if (ref.reference.mapOfType) {
      return {
        type: 'map',
        value: new GoTypeRef(this.root, ref.reference.mapOfType),
      };
    } else if (ref.reference.unionOfTypes) {
      return {
        type: 'union',
        value: ref.reference.unionOfTypes.map(
          (typeRef) => new GoTypeRef(this.root, typeRef),
        ),
      };
    } else if (ref.reference.void) {
      return { type: 'void' };
    }

    return { type: 'interface', value: ref };
  }

  private scopedTypeName(
    typeMap: TypeMap,
    scope: Package,
    asInterface: boolean,
    asRef = false,
  ): string {
    if (typeMap.type === 'primitive') {
      return typeMap.value;
    } else if (typeMap.type === 'array' || typeMap.type === 'map') {
      const prefix = typeMap.type === 'array' ? '[]' : 'map[string]';
      const innerName =
        this.scopedTypeName(typeMap.value.typeMap, scope, asInterface, asRef) ??
        'interface{}';
      return `${prefix}${innerName}`;
    } else if (typeMap.type === 'interface') {
      const prefix = asRef ? '*' : '';
      const baseName = asInterface
        ? typeMap.value.interfaceName
        : typeMap.value.name;
      // type is defined in the same scope as the current one, no namespace required
      if (scope.packageName === typeMap.value.namespace && baseName) {
        // if the current scope is the same as the types scope, return without a namespace
        return `${prefix}${baseName}`;
      }

      // type is defined in another module and requires a namespace and import
      if (baseName) {
        return `${prefix}${typeMap.value.namespace}.${baseName}`;
      }
    } else if (typeMap.type === 'union') {
      return 'interface{}';
    } else if (typeMap.type === 'void') {
      return '';
    }

    // type isn't handled
    throw new Error(
      `Type ${typeMap.value?.name} does not resolve to a known Go type. It is being mapped to "interface{}".`,
    );
  }
}
