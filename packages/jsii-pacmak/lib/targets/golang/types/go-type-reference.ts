import { TypeReference } from 'jsii-reflect';
import { Module, RootModule } from '../module';
import { GoType } from './go-type';
import { toPascalCase } from 'codemaker';

class PrimitiveMapper {
  public constructor(private readonly name: string) {}

  public get goPrimitive(): string {
    if (this.name === 'number') {
      return 'float64';
    }
    return this.name;
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
      const inner = new GoTypeRef(this.root, this.reference.arrayOfType);
      return `${inner.scopedName(scope)}[]`;
    } else if (this.reference.mapOfType) {
      const inner = new GoTypeRef(this.root, this.reference.mapOfType);
      return `map[string]${inner.scopedName(scope)}`;
    } else if (scope.moduleName === this.namespace && this.name) {
      return toPascalCase(this.name);
    } else if (this.name) {
      return `${this.namespace}.${toPascalCase(this.name)}`;
    }

    // TODO: This shouldn't happen?
    return '';
  }
}
