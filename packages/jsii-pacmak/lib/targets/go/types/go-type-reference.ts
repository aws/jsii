import { toPascalCase } from 'codemaker';
import { TypeReference } from 'jsii-reflect';

import * as log from '../../../logging';
import { Package } from '../package';
import { JSII_ANY } from '../runtime';
import { GoType } from './go-type';

/*
 * Maps names of JS primitives to corresponding Go types as strings
 */
class PrimitiveMapper {
  private readonly MAP: { [key: string]: string } = {
    number: 'float64',
    boolean: 'bool',
    any: JSII_ANY,
    // TODO: Resolve "time" package dependency where needed and change to "time.Time"
    date: 'string',
    json: `map[string]${JSII_ANY}`,
  };

  public constructor(private readonly name: string) {}

  public get goPrimitive(): string {
    return this.MAP[this.name] ?? this.name;
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

  public isPrimitive() {
    return Boolean(this.reference.primitive);
  }

  public get type(): GoType | undefined {
    if (this.reference.fqn) {
      return this.root.findType(this.reference.fqn);
    }

    return undefined;
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
    if (this.reference.primitive) {
      return new PrimitiveMapper(this.reference.primitive).goPrimitive;
    }

    // type is an array
    if (this.reference.arrayOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.arrayOfType).scopedName(
          scope,
        ) ?? JSII_ANY;

      return `[]${innerName}`;
    }

    // type is a map
    if (this.reference.mapOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.mapOfType).scopedName(scope) ??
        JSII_ANY;
      return `map[string]${innerName}`;
    }

    // type is defined in the same scope as the current one, no namespace required
    if (scope.packageName === this.namespace && this.name) {
      // if the current scope is the same as the types scope, return without a namespace
      return toPascalCase(this.name);
    }

    // type is defined in another module and requires a namespace and import
    if (this.name) {
      return `${this.namespace}.${toPascalCase(this.name)}`;
    }

    // type isn't handled
    log.debug(
      `Type ${this.name} does not resolve to a known Go type. It is being mapped to "Any".`,
    );
    return JSII_ANY;
  }
}
