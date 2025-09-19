import { TypeReference } from 'jsii-reflect';

import * as log from '../../../logging';
import { SpecialDependencies } from '../dependencies';
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
    date: 'time.Time',
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
  | { readonly type: 'intersection'; readonly value: readonly GoTypeRef[] }
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
    private readonly options: { readonly opaqueUnionTypes: boolean } = {
      opaqueUnionTypes: true,
    },
  ) {}

  public get type(): GoType | undefined {
    if (this.reference.fqn) {
      return this.root.findType(this.reference.fqn);
    }

    return undefined;
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      fmt: false,
      init: false,
      internal: false,
      runtime: false,
      time: containsDate(this.reference, this.options.opaqueUnionTypes),
    };

    function containsDate(
      ref: TypeReference,
      opaqueUnionType: boolean,
    ): boolean {
      if (ref.primitive === 'date') {
        return true;
      }
      if (ref.arrayOfType) {
        return containsDate(ref.arrayOfType, opaqueUnionType);
      }
      if (ref.mapOfType) {
        return containsDate(ref.mapOfType, opaqueUnionType);
      }
      if (!opaqueUnionType && ref.unionOfTypes) {
        return ref.unionOfTypes.some((item) =>
          containsDate(item, opaqueUnionType),
        );
      }
      if (!opaqueUnionType && ref.intersectionOfTypes) {
        return ref.intersectionOfTypes.some((item) =>
          containsDate(item, opaqueUnionType),
        );
      }
      return false;
    }
  }

  public get primitiveType() {
    if (this.reference.primitive) {
      return new PrimitiveMapper(this.reference.primitive).goPrimitive;
    }

    return undefined;
  }

  public get name() {
    return this.type?.name;
  }

  public get datatype() {
    const reflectType = this.type?.type;
    return reflectType?.isInterfaceType() && reflectType.datatype;
  }

  public get namespace() {
    return this.type?.namespace;
  }

  public get void() {
    return this.reference.void;
  }

  public get typeMap(): TypeMap {
    this._typeMap ??= this.buildTypeMap(this);
    return this._typeMap;
  }

  /**
   * The go `import`s required in order to be able to use this type in code.
   */
  public get dependencies(): readonly Package[] {
    const ret = new Array<Package>();

    switch (this.typeMap.type) {
      case 'interface':
        if (this.type?.pkg) {
          ret.push(this.type.pkg);
        }
        break;

      case 'array':
      case 'map':
        ret.push(...this.typeMap.value.dependencies);
        break;

      case 'union':
        if (!this.options.opaqueUnionTypes) {
          for (const t of this.typeMap.value) {
            ret.push(...t.dependencies);
          }
        }
        break;

      case 'intersection':
        if (!this.options.opaqueUnionTypes) {
          for (const t of this.typeMap.value) {
            ret.push(...t.dependencies);
          }
        }
        break;

      case 'void':
      case 'primitive':
        break;
    }

    return ret;
  }

  public get unionOfTypes(): readonly GoTypeRef[] | undefined {
    const typeMap = this.typeMap;
    if (typeMap.type !== 'union') {
      return undefined;
    }
    return typeMap.value;
  }

  public get withTransparentUnions(): GoTypeRef {
    if (!this.options.opaqueUnionTypes) {
      return this;
    }
    return new GoTypeRef(this.root, this.reference, {
      ...this.options,
      opaqueUnionTypes: false,
    });
  }

  /*
   * Return the name of a type for reference from the `Package` passed in
   */
  public scopedName(scope: Package): string {
    return this.scopedTypeName(this.typeMap, scope);
  }

  public scopedReference(scope: Package): string {
    return this.scopedTypeName(this.typeMap, scope, true);
  }

  private buildTypeMap(ref: GoTypeRef): TypeMap {
    if (ref.primitiveType) {
      return { type: 'primitive', value: ref.primitiveType };
    } else if (ref.reference.arrayOfType) {
      return {
        type: 'array',
        value: new GoTypeRef(
          this.root,
          ref.reference.arrayOfType,
          this.options,
        ),
      };
    } else if (ref.reference.mapOfType) {
      return {
        type: 'map',
        value: new GoTypeRef(this.root, ref.reference.mapOfType, this.options),
      };
    } else if (ref.reference.unionOfTypes) {
      return {
        type: 'union',
        value: ref.reference.unionOfTypes.map(
          (typeRef) => new GoTypeRef(this.root, typeRef, this.options),
        ),
      };
    } else if (ref.reference.intersectionOfTypes) {
      return {
        type: 'intersection',
        value: ref.reference.intersectionOfTypes.map(
          (typeRef) => new GoTypeRef(this.root, typeRef, this.options),
        ),
      };
    } else if (ref.reference.void) {
      return { type: 'void' };
    }

    return { type: 'interface', value: ref };
  }

  public scopedTypeName(
    typeMap: TypeMap,
    scope: Package,
    asRef = false,
  ): string {
    if (typeMap.type === 'primitive') {
      const { value } = typeMap;
      const prefix = asRef && value !== 'interface{}' ? '*' : '';
      return `${prefix}${value}`;
    } else if (typeMap.type === 'array' || typeMap.type === 'map') {
      const prefix = asRef ? '*' : '';
      const wrapper = typeMap.type === 'array' ? '[]' : 'map[string]';
      const innerName =
        this.scopedTypeName(typeMap.value.typeMap, scope, asRef) ??
        'interface{}';
      return `${prefix}${wrapper}${innerName}`;
    } else if (typeMap.type === 'interface') {
      const prefix = asRef && typeMap.value.datatype ? '*' : '';
      const baseName = typeMap.value.name;
      // type is defined in the same scope as the current one, no namespace required
      if (scope.packageName === typeMap.value.namespace && baseName) {
        // if the current scope is the same as the types scope, return without a namespace
        return `${prefix}${baseName}`;
      }

      // type is defined in another module and requires a namespace and import
      if (baseName) {
        return `${prefix}${typeMap.value.namespace}.${baseName}`;
      }
    } else if (typeMap.type === 'intersection') {
      const components = typeMap.value.map((inner) =>
        this.scopedTypeName(inner.typeMap, scope, false),
      );
      return `interface{ ${components.join(';')} }`;
    } else if (typeMap.type === 'union') {
      return 'interface{}';
    } else if (typeMap.type === 'void') {
      return '';
    }

    // type isn't handled
    throw new Error(
      `Type ${typeMap.value?.name} does not resolve to a known Go type.`,
    );
  }
}
