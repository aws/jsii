import { TypeReference } from 'jsii-reflect';
import { Package } from '../package';
import { GoType } from './go-type';
import { toPascalCase } from 'codemaker';

const GO_ANY = 'jsii.Any';

/*
 * Maps names of JS primitives to corresponding Go types as strings
 */
class PrimitiveMapper {
  private readonly MAP: { [key: string]: string } = {
    number: 'float64',
    boolean: 'bool',
    any: GO_ANY,
    // TODO: Resolve "time" package dependency where needed and change to "time.Time"
    date: 'string',
    json: `map[string]${GO_ANY}`,
  };

  public constructor(private readonly name: string) {}

  public get goPrimitive(): string {
    return this.MAP[this.name] ?? this.name;
  }
}

/*
 * Accepts a JSII type reference and can resolve the GoType within the module tree.
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
    return this.type?.parent.packageName;
  }

  /*
   * Return the name of a type for reference from the `Package` passed in
   */
  public scopedName(scope: Package): string {
    // type references a primitive
    if (this.reference.primitive) {
      return new PrimitiveMapper(this.reference.primitive).goPrimitive;
    }

    // type is an array
    if (this.reference.arrayOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.arrayOfType).scopedName(
          scope,
        ) ?? GO_ANY;

      return `[]${innerName}`;
    }

    // type is a map
    if (this.reference.mapOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.mapOfType).scopedName(scope) ??
        GO_ANY;
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
    // TODO: Are there other cases to handle? if not throw an error.
    return GO_ANY;
  }
}
