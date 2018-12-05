import jsii = require('jsii-spec');
import { TypeSystem } from './type-system';

export class Dependency {
  constructor(
    public readonly system: TypeSystem,
    private readonly name: string,
    private readonly spec: jsii.PackageVersion
  ) { }

  public get assembly() {
    return this.system.findAssembly(this.name);
  }

  /**
   * Version of the package.
   * @minLength 1
   */
  public get version() {
    return this.spec.version;
  }

  /**
   * Indicates if this dependency is a peer dependency or a normal dependency.
   *
   * Peer dependencies are expected to be explicitly defined by the user of
   * this library instead of brought in as transitive dependencies.
   *
   * jsii enforces that if this module exports a type from a dependency, this
   * dependency must be defined as a peer and not as a normal dependency.
   * Otherwise, it would be impossible to safely use two versions of this
   * dependency in a closure.
   *
   * @see https://github.com/awslabs/aws-cdk/issues/979
   * @see https://nodejs.org/en/blog/npm/peer-dependencies/
   */
  public get peer(): boolean {
    return !!this.spec.peer;
  }
}