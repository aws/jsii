import { TypeReference } from 'jsii-reflect';
import { Module, RootModule } from '../module';
import { GoType } from './go-type';
import { toPascalCase } from 'codemaker';

const GO_ANY = 'jsii.Any';
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
// TODO: Handle Collection Types
export class GoTypeRef {
  public constructor(
    public readonly root: RootModule,
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
    return this.type?.parent.moduleName;
  }

  public scopedName(scope: Module): string {
    if (this.reference.primitive) {
      return new PrimitiveMapper(this.reference.primitive).goPrimitive;
    } else if (this.reference.arrayOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.arrayOfType).scopedName(
          scope,
        ) ?? GO_ANY;
      return `[]${innerName}`;
    } else if (this.reference.mapOfType) {
      const innerName =
        new GoTypeRef(this.root, this.reference.mapOfType).scopedName(scope) ??
        GO_ANY;
      return `map[string]${innerName}`;
    } else if (scope.moduleName === this.namespace && this.name) {
      return toPascalCase(this.name);
    } else if (this.name) {
      return `${this.namespace}.${toPascalCase(this.name)}`;
    }

    // TODO: This shouldn't happen?
    return GO_ANY;
  }
}
