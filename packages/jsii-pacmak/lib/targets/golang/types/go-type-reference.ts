import { TypeReference } from 'jsii-reflect';
import { PackageTypes } from '../package-context';
import { GoType } from './go-type';

// TODO: Can we subclass TypeReference effectively?
export class GoTypeReference {
  public constructor(
    public reference: TypeReference,
    public packageTypes: PackageTypes,
  ) {}

  public resolve(): GoType | undefined {
    if (this.reference.fqn) {
      return this.packageTypes[this.reference.fqn];
    }
    return undefined;
  }
}
