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
    return this.type?.pkg.packageName;
  }

  public get void() {
    return this.reference.void;
  }

  /*
   * Return the name of a type for reference from the `Package` passed in
   */
  public scopedName(scope: Package): string {
    return this.scopedTypeName(scope, false);
  }

  public scopedInterfaceName(scope: Package): string {
    return this.scopedTypeName(scope, true);
  }

  public scopedReferenceName(scope: Package): string {
    return this.scopedTypeName(scope, false, true);
  }

  private scopedTypeName(
    scope: Package,
    asInterface: boolean,
    asRef = false,
  ): string {
    if (this.primitiveType) {
      return this.primitiveType;
    }

    // type is an array
    if (this.reference.arrayOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.arrayOfType).scopedTypeName(
          scope,
          asInterface,
          asRef,
        ) ?? 'interface{}';

      return `[]${innerName}`;
    }

    // type is a map
    if (this.reference.mapOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.mapOfType).scopedTypeName(
          scope,
          asInterface,
          asRef,
        ) ?? 'interface{}';
      return `map[string]${innerName}`;
    }

    const prefix = asRef ? '*' : '';
    const baseName = asInterface ? this.interfaceName : this.name;
    // type is defined in the same scope as the current one, no namespace required
    if (scope.packageName === this.namespace && baseName) {
      // if the current scope is the same as the types scope, return without a namespace
      return `${prefix}${baseName}`;
    }

    // type is defined in another module and requires a namespace and import
    if (baseName) {
      return `${prefix}${this.namespace}.${baseName}`;
    }

    // type isn't handled
    log.debug(
      `Type ${baseName} does not resolve to a known Go type. It is being mapped to "interface{}".`,
    );
    return 'interface{}';
  }
}
