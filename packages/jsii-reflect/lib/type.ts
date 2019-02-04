import jsii = require('jsii-spec');
import { Assembly } from './assembly';
import { Docs, Documentable } from './docs';
import { TypeSystem } from './type-system';

export abstract class Type implements Documentable {
  constructor(
    public readonly system: TypeSystem,
    public readonly assembly: Assembly,
    private readonly spec: jsii.Type) { }

  public toString(): string {
    return `${this.kind}:${this.fqn}`;
  }

  /**
   * The fully qualified name of the type (``<assembly>.<namespace>.<name>``)
   */
  public get fqn(): string {
    return this.spec.fqn;
  }

  /**
   * The namespace of the type (``foo.bar.baz``). When undefined, the type is located at the root of the assembly
   * (it's ``fqn`` would be like ``<assembly>.<name>``). If the `namespace` corresponds to an existing type's
   * namespace-qualified (e.g: ``<namespace>.<name>``), then the current type is a nested type.
   */
  public get namespace(): string | undefined {
    return this.spec.namespace;
  }

  /**
   * The simple name of the type (MyClass).
   */
  public get name(): string {
    return this.spec.name;
  }

  /**
   * The kind of the type.
   */
  public get kind(): jsii.TypeKind {
    return this.spec.kind;
  }

  public get docs(): Docs {
    return new Docs(this.system, this, this.spec.docs);
  }
}
