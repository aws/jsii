import * as assert from 'assert';
import { InterfaceType } from 'jsii-reflect';

import { SpecialDependencies } from '../dependencies';
import { EmitContext } from '../emit-context';
import { Package } from '../package';
import { JSII_RT_ALIAS } from '../runtime';
import {
  ParameterValidator,
  StructValidator,
} from '../runtime/runtime-type-checking';
import { getMemberDependencies } from '../util';
import { GoType } from './go-type';
import { GoProperty } from './type-member';

/*
 * Struct wraps a JSII datatype interface aka, structs
 */
export class Struct extends GoType<InterfaceType> {
  public readonly properties: readonly GoProperty[];
  #structValidator: StructValidator | undefined;
  #validators?: readonly ParameterValidator[];

  public constructor(parent: Package, type: InterfaceType) {
    super(parent, type);

    assert(
      type.isDataType(),
      `The provided interface ${type.fqn} is not a struct!`,
    );

    this.properties = type.allProperties.map(
      (prop) => new GoProperty(this, prop),
    );
  }

  public get parameterValidators(): readonly ParameterValidator[] {
    if (this.#validators == null) {
      this.#validators = this.properties
        .map((p) => p.validator!)
        .filter((v) => v != null);
    }
    return this.#validators;
  }

  public get structValidator(): StructValidator | undefined {
    if (this.#structValidator === null) {
      this.#structValidator = StructValidator.for(this);
    }
    return this.#structValidator;
  }

  public get dependencies(): Package[] {
    return getMemberDependencies(this.properties);
  }

  public get specialDependencies(): SpecialDependencies {
    return {
      fmt: false,
      init: false,
      internal: false,
      runtime: false,
      time: this.properties.some((prop) => prop.specialDependencies.time),
    };
  }

  public emit(context: EmitContext): void {
    const { code, documenter } = context;
    documenter.emit(this.type.docs, this.apiLocation);
    code.openBlock(`type ${this.name} struct`);
    for (const property of this.properties) {
      property.emitStructMember(context);
    }
    code.closeBlock();
    code.line();
  }

  public emitRegistration({ code, runtimeTypeChecking }: EmitContext): void {
    code.open(`${JSII_RT_ALIAS}.RegisterStruct(`);
    code.line(`"${this.fqn}",`);
    code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);
    code.close(')');
    if (runtimeTypeChecking && this.structValidator) {
      code.open(`${JSII_RT_ALIAS}.RegisterStructValidator(`);
      code.line(`reflect.TypeOf((*${this.name})(nil)).Elem(),`);
      code.open('func (i interface{}, d func() string) error {');
      code.line(`return (i.(*${this.name})).validate(d)`);
      code.close('},');
      code.close(')');
    }
  }
}
