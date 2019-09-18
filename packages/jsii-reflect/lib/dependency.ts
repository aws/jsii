import jsii = require('jsii-spec');
import { TypeSystem } from './type-system';

export class Dependency {
  public constructor(
    public readonly system: TypeSystem,
    private readonly name: string,
    private readonly spec: jsii.PackageVersion
  ) { }

  public get assembly() {
    return this.system.findAssembly(this.name);
  }

  /**
   * Version of the package.
   */
  public get version() {
    return this.spec.version;
  }
}
