import { CodeMaker } from 'codemaker';
import { TypeReference } from '@jsii/spec';
import { Method, Parameter } from 'jsii-reflect';

import {
  reduceSpecialDependencies,
  SpecialDependencies,
} from '../dependencies';
import { Package } from '../package';
import {
  GoClass,
  GoClassConstructor,
  GoInterface,
  GoMethod,
  GoParameter,
  GoProperty,
  GoTypeRef,
} from '../types';

export class Validator {
  public static forConstructor(
    ctor: GoClassConstructor,
  ): Validator | undefined {
    return Validator.fromParts(`New${ctor.parent.name}`, ctor.parameters);
  }

  public static forMethod(method: GoMethod): Validator | undefined {
    return Validator.fromParts(
      method.name,
      method.parameters,
      method.static
        ? undefined
        : {
            name: method.instanceArg,
            type: `*${method.parent.proxyName}`,
          },
    );
  }

  public static forProperty(property: GoProperty): Validator | undefined {
    if (property.immutable) {
      return undefined;
    }
    return Validator.fromParts(
      property.setterName,
      [
        syntheticParameter(
          property.parent as any,
          'val',
          property.reference.reference.spec!,
          property.property.optional,
        ),
      ],
      property.static
        ? undefined
        : {
            name: property.instanceArg,
            type: `*${property.parent.proxyName}`,
          },
    );
  }

  private static fromParts(
    name: string,
    parameters: readonly GoParameter[],
    receiver?: Receiver,
  ): Validator | undefined {
    if (parameters.length === 0) {
      return undefined;
    }
    const parameterValidations = new Map<GoParameter, Validation[]>();

    for (const param of parameters) {
      const validations = new Array<Validation>();
      if (!param.isOptional) {
        validations.push(
          Validation.nullCheck(
            param.name,
            `parameter ${param.name}`,
            param.reference,
          ),
        );
      }
      if (validations.length !== 0) {
        parameterValidations.set(param, validations);
      }
    }

    if (parameterValidations.size == 0) {
      return undefined;
    }
    return new Validator(name, parameterValidations, receiver);
  }

  private readonly receiver?: Receiver;
  private readonly name: string;
  private readonly parameters: readonly GoParameter[];
  private readonly validations: ReadonlyMap<GoParameter, readonly Validation[]>;

  private constructor(
    baseName: string,
    validations: ReadonlyMap<GoParameter, readonly Validation[]>,
    receiver: Receiver | undefined,
  ) {
    this.receiver = receiver;
    this.name = `validate${baseName}Parameters`;
    this.validations = validations;
    this.parameters = Array.from(validations.keys());
  }

  public get dependencies(): readonly Package[] {
    return this.parameters.flatMap(
      (p) => p.reference /*.withTransparentTypeUnions*/.dependencies,
    );
  }

  public get specialDependencies(): SpecialDependencies {
    return reduceSpecialDependencies(
      this.parameters.map((p) => p.reference.specialDependencies),
    );
  }

  public emitCall(code: CodeMaker): void {
    const recv = this.receiver?.name ? `${this.receiver.name}.` : '';
    const params = this.parameters.map((p) => p.name).join(', ');

    code.openBlock(`if err := ${recv}${this.name}(${params}); err != nil`);
    code.line(`panic(err)`);
    code.closeBlock();
  }

  public emitImplementation(
    code: CodeMaker,
    scope: Package,
    noOp = false,
  ): void {
    code.openBlock(
      `func ${
        this.receiver ? `(${this.receiver.name} ${this.receiver.type}) ` : ''
      }${this.name}(${this.parameters
        .map((p) =>
          p.isVariadic
            ? `${p.name} []${p.reference.scopedReference(scope)}`
            : p.toString(),
        )
        .join(', ')}) error`,
    );
    if (noOp) {
      code.line('return nil');
    } else {
      for (const [_parameter, validations] of this.validations) {
        for (const validation of validations) {
          validation.emit(code);
        }
        code.line();
      }
      code.line('return nil');
    }
    code.closeBlock();
    code.line();
  }
}

interface Receiver {
  readonly name: string;
  readonly type: string;
}

abstract class Validation {
  public static nullCheck(
    expression: string,
    description: string,
    typeRef: GoTypeRef,
  ): Validation {
    class NullCheck extends Validation {
      public constructor(
        private readonly expression: string,
        private readonly description: string,
      ) {
        super();
      }

      public emit(code: CodeMaker): void {
        const nullValue = typeRef.type?.type?.isEnumType()
          ? `""` // Enums are represented as string-valued constants
          : 'nil';
        code.openBlock(`if ${this.expression} == ${nullValue}`);
        code.line(
          `return errors.New("${this.description} is required, but nil was provided")`,
        );
        code.closeBlock();
      }
    }
    return new NullCheck(expression, description);
  }

  public abstract emit(code: CodeMaker): void;
}

function syntheticParameter(
  parent: GoClass | GoInterface,
  name: string,
  type: TypeReference,
  optional: boolean,
) {
  return new GoParameter(
    parent,
    new Parameter(
      parent.type.system,
      parent.type,
      new Method(
        parent.type.system,
        parent.type.assembly,
        parent.type,
        parent.type,
        { name: '__synthetic__' },
      ),
      {
        name,
        optional,
        type,
      },
    ),
  );
}
