import { TypeReference } from '@jsii/spec';
import { CodeMaker } from 'codemaker';
import { createHash } from 'crypto';
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
  Struct,
} from '../types';
import { JSII_RT_ALIAS } from './constants';

export class ParameterValidator {
  public static forConstructor(
    ctor: GoClassConstructor,
  ): ParameterValidator | undefined {
    return ParameterValidator.fromParts(
      `New${ctor.parent.name}`,
      ctor.parameters,
    );
  }

  public static forMethod(method: GoMethod): ParameterValidator | undefined {
    return ParameterValidator.fromParts(
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

  public static forProperty(
    property: GoProperty,
  ): ParameterValidator | undefined {
    if (property.immutable) {
      return undefined;
    }
    return ParameterValidator.fromParts(
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
  ): ParameterValidator | undefined {
    if (parameters.length === 0) {
      return undefined;
    }
    const parameterValidations = new Map<GoParameter, Validation[]>();

    for (const param of parameters) {
      const expr = param.name;
      const descr = `parameter ${param.name}`;

      const validations = new Array<Validation>();
      if (!param.isOptional && !param.isVariadic) {
        validations.push(Validation.nullCheck(expr, descr, param.reference));
      }
      const validation = Validation.forTypeMap(
        expr,
        descr,
        param.isVariadic
          ? { type: 'array', value: param.reference }
          : param.reference.typeMap,
      );
      if (validation) {
        validations.push(validation);
      }

      if (validations.length !== 0) {
        parameterValidations.set(param, validations);
      }
    }

    if (parameterValidations.size === 0) {
      return undefined;
    }
    return new ParameterValidator(name, parameterValidations, receiver);
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
    return [
      ...this.parameters.flatMap(
        (p) => p.reference.withTransparentUnions.dependencies,
      ),
      ...Array.from(this.validations.values()).flatMap((vs) =>
        vs.flatMap((v) => v.dependencies),
      ),
    ];
  }

  public get specialDependencies(): SpecialDependencies {
    return reduceSpecialDependencies(
      ...this.parameters.map((p) => p.reference.specialDependencies),
      ...Array.from(this.validations.values()).flatMap((vs) =>
        vs.flatMap((v) => v.specialDependencies),
      ),
    );
  }

  public emitCall(code: CodeMaker): void {
    const recv = this.receiver?.name ? `${this.receiver.name}.` : '';
    const params = this.parameters
      .map((p) => (p.isVariadic ? `&${p.name}` : p.name))
      .join(', ');

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
            ? `${p.name} *[]${p.reference.scopedReference(scope)}`
            : p.toString(),
        )
        .join(', ')}) error`,
    );
    if (noOp) {
      code.line('return nil');
    } else {
      for (const [_parameter, validations] of this.validations) {
        for (const validation of validations) {
          validation.emit(code, scope);
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

export class StructValidator {
  public static for(struct: Struct): StructValidator | undefined {
    const receiver = {
      name: struct.name.slice(0, 1).toLowerCase(),
      type: `*${struct.name}`,
    };

    const fieldValidations = new Map<GoProperty, Validation[]>();
    for (const prop of struct.properties) {
      const expr = `${receiver.name}.${prop.name}`;
      const descr = `@{desc()}.${prop.name}`;

      const validations = new Array<Validation>();
      if (!prop.property.optional) {
        validations.push(Validation.nullCheck(expr, descr, prop.reference));
      }
      const validation = Validation.forTypeMap(
        expr,
        descr,
        prop.reference.typeMap,
      );
      if (validation) {
        validations.push(validation);
      }
      if (validations.length > 0) {
        fieldValidations.set(prop, validations);
      }
    }

    if (fieldValidations.size === 0) {
      return undefined;
    }

    return new StructValidator(receiver, fieldValidations);
  }

  private constructor(
    private readonly receiver: Receiver,
    private readonly validations: ReadonlyMap<
      GoProperty,
      readonly Validation[]
    >,
  ) {}

  public get dependencies() {
    return Array.from(this.validations.values()).flatMap((vs) =>
      vs.flatMap((v) => v.dependencies),
    );
  }

  public get specialDependencies(): SpecialDependencies {
    return reduceSpecialDependencies(
      {
        fmt: true,
        init: false,
        internal: false,
        runtime: false,
        time: false,
      },
      ...Array.from(this.validations.values()).flatMap((vs) =>
        vs.flatMap((v) => v.specialDependencies),
      ),
    );
  }

  public emitImplementation(
    code: CodeMaker,
    scope: Package,
    noOp = false,
  ): void {
    code.openBlock(
      `func (${this.receiver.name} ${this.receiver.type}) validate(desc func() string) error`,
    );
    if (noOp) {
      code.line('return nil');
    } else {
      for (const [_prop, validations] of this.validations) {
        for (const validation of validations) {
          validation.emit(code, scope);
        }
        code.line();
      }
      code.line('return nil');
    }
    code.closeBlock();
    code.line();
  }
}

abstract class Validation {
  public static forTypeMap(
    expression: string,
    description: string,
    typeMap: GoTypeRef['typeMap'],
  ): Validation | undefined {
    switch (typeMap.type) {
      case 'union':
        return Validation.unionCheck(expression, description, typeMap.value);
      case 'interface':
        return Validation.interfaceCheck(
          expression,
          description,
          typeMap.value,
        );
      case 'array':
      case 'map':
        return Validation.collectionCheck(
          expression,
          description,
          typeMap.value,
        );
      case 'primitive':
      case 'void':
      case 'intersection':
        return undefined;
    }
  }

  public static collectionCheck(
    expression: string,
    description: string,
    elementType: GoTypeRef,
  ): Validation | undefined {
    // We need to come up with a unique-enough ID here... so we use a hash.
    const idx = `idx_${createHash('sha256')
      .update(expression)
      .digest('hex')
      .slice(0, 6)}`;

    // This is actually unused
    const elementValidator = Validation.forTypeMap(
      'v',
      `${description}[@{${idx}:#v}]`,
      elementType.typeMap,
    );
    if (elementValidator == null) {
      return undefined;
    }

    class CollectionCheck extends Validation {
      public get specialDependencies(): SpecialDependencies {
        return elementValidator!.specialDependencies;
      }

      public get dependencies() {
        return elementValidator!.dependencies;
      }

      public emit(code: CodeMaker, scope: Package): void {
        // We need to de-reference the pointer here (range does not operate on pointers)
        code.openBlock(`for ${idx}, v := range *${expression}`);
        elementValidator!.emit(code, scope);
        code.closeBlock();
      }
    }

    return new CollectionCheck();
  }

  public static interfaceCheck(
    expression: string,
    description: string,
    iface: GoTypeRef,
  ): Validation | undefined {
    if (!iface.datatype) {
      return undefined;
    }

    class InterfaceCheck extends Validation {
      public get dependencies(): readonly Package[] {
        return [];
      }

      public get specialDependencies(): SpecialDependencies {
        return {
          fmt: INTERPOLATION.test(description),
          init: false,
          internal: false,
          runtime: !!iface.datatype,
          time: false,
        };
      }

      public emit(code: CodeMaker, _scope: Package): void {
        code.openBlock(
          `if err := ${JSII_RT_ALIAS}.ValidateStruct(${expression}, func() string { return ${interpolated(
            description,
          )} }); err != nil`,
        );
        code.line(`return err`);
        code.closeBlock();
      }
    }
    return new InterfaceCheck();
  }

  public static nullCheck(
    expression: string,
    description: string,
    typeRef: GoTypeRef,
  ): Validation {
    class NullCheck extends Validation {
      public get dependencies(): readonly Package[] {
        return [];
      }

      public get specialDependencies(): SpecialDependencies {
        return {
          fmt: true,
          init: false,
          internal: false,
          runtime: false,
          time: false,
        };
      }

      public emit(code: CodeMaker): void {
        const nullValue = typeRef.type?.type?.isEnumType()
          ? `""` // Enums are represented as string-valued constants
          : 'nil';
        code.openBlock(`if ${expression} == ${nullValue}`);
        code.line(
          returnErrorf(`${description} is required, but nil was provided`),
        );
        code.closeBlock();
      }
    }
    return new NullCheck();
  }

  public static unionCheck(
    expression: string,
    description: string,
    types: readonly GoTypeRef[],
  ): Validation {
    const hasInterface = types.some((t) => t.typeMap.type === 'interface');

    class UnionCheck extends Validation {
      public get dependencies(): readonly Package[] {
        return types.flatMap((t) => t.dependencies);
      }

      public get specialDependencies(): SpecialDependencies {
        return reduceSpecialDependencies(
          {
            fmt: true,
            init: false,
            internal: false,
            runtime: hasInterface,
            time: false,
          },
          ...types.flatMap((t) => {
            const validator = Validation.forTypeMap(
              expression,
              description,
              t.typeMap,
            );
            if (validator == null) return [];
            return [validator.specialDependencies];
          }),
        );
      }

      public emit(code: CodeMaker, scope: Package): void {
        const validTypes = new Array<string>();

        code.line(`switch ${expression}.(type) {`);
        for (const type of types) {
          const typeName = type.scopedReference(scope);
          validTypes.push(typeName);
          // Maps a type to the conversion instructions to the ${typeName} type
          const acceptableTypes = new Map<
            string,
            | ((code: CodeMaker, inVar: string, outVar: string) => void)
            | undefined
          >();
          acceptableTypes.set(typeName, undefined);
          switch (typeName) {
            case '*float64':
              // For numbers, we accept everything that implictly converts to float64 (pointer & not)
              acceptableTypes.set('float64', (code, inVar, outVar) =>
                code.line(`${outVar} := &${inVar}`),
              );
              const ALTERNATE_TYPES = [
                'int',
                'uint',
                'int8',
                'int16',
                'int32',
                'int64',
                'uint8',
                'uint16',
                'uint32',
                'uint64',
              ];
              for (const otherType of ALTERNATE_TYPES) {
                const varName = createHash('sha256')
                  .update(expression)
                  .digest('hex')
                  .slice(6);
                acceptableTypes.set(`*${otherType}`, (code) => {
                  code.openBlock(
                    `${varName} := func (v *${otherType}) *float64`,
                  );
                  code.openBlock('if v == nil {');
                  code.line('return nil');
                  code.closeBlock();
                  code.line(`val := float64(*v)`);
                  code.line(`return &val`);
                  code.closeBlock('()');
                });
                acceptableTypes.set(otherType, (code) => {
                  code.openBlock(
                    `${varName} := func (v ${otherType}) *float64`,
                  );
                  code.line(`val := float64(v)`);
                  code.line(`return &val`);
                  code.closeBlock('()');
                });
              }
              break;
            default:
              // Accept pointer and non-pointer versions of everything
              if (typeName.startsWith('*')) {
                const nonPointerType = typeName.slice(1);
                acceptableTypes.set(nonPointerType, (code, inVar, outVar) =>
                  code.line(`${outVar} := &${inVar}`),
                );
              }
          }
          for (const [acceptableType, conversion] of acceptableTypes) {
            code.indent(`case ${acceptableType}:`);
            const outVar = /^[a-z0-9_]+$/.test(expression) ? expression : `v`;
            const validation = Validation.forTypeMap(
              outVar,
              description,
              type.typeMap,
            );
            if (validation) {
              const inVar = conversion ? `${outVar}_` : outVar;
              code.line(`${inVar} := ${expression}.(${acceptableType})`);
              if (conversion) {
                conversion(code, inVar, outVar);
              }
              validation.emit(code, scope);
            } else {
              code.line('// ok');
            }
            code.unindent(false);
          }
        }
        code.indent('default:');
        if (hasInterface)
          code.openBlock(
            `if !${JSII_RT_ALIAS}.IsAnonymousProxy(${expression})`,
          );
        code.line(
          returnErrorf(
            `${description} must be one of the allowed types: ${validTypes.join(
              ', ',
            )}; received @{${expression}:#v} (a @{${expression}:T})`,
          ),
        );
        if (hasInterface) code.closeBlock();
        code.unindent('}');
      }
    }
    return new UnionCheck();
  }

  private constructor() {}

  public abstract get dependencies(): readonly Package[];

  public abstract get specialDependencies(): SpecialDependencies;

  public abstract emit(code: CodeMaker, scope: Package): void;
}

const INTERPOLATION = /@\{([^}:]+)(?::([^}]+))?\}/;

function interpolated(message: string): string {
  // Need to escape literal percent signes, as a precaution.
  let escaped = message.replace(/%/gm, '%%');

  const args = new Array<string>();
  let match: ReturnType<RegExp['exec']>;
  while ((match = INTERPOLATION.exec(escaped))) {
    const before = escaped.slice(0, match.index);
    const expr = match[1];
    const mod = match[2];
    const after = escaped.slice(
      match.index + match[1].length + 3 + (mod ? mod.length + 1 : 0),
    );
    escaped = `${before}%${mod || 'v'}${after}`;
    args.push(expr);
  }

  if (args.length === 0) {
    return JSON.stringify(message);
  }

  return `fmt.Sprintf(${JSON.stringify(escaped)}, ${args.join(', ')})`;
}

function returnErrorf(message: string): string {
  const args = new Array<string>();

  // Need to escape literal percent signes, as a precaution.
  message = message.replace(/%/gm, '%%');

  let match: ReturnType<RegExp['exec']>;
  while ((match = INTERPOLATION.exec(message))) {
    const before = message.slice(0, match.index);
    const expr = match[1];
    const mod = match[2];
    const after = message.slice(
      match.index + match[1].length + 3 + (mod ? mod.length + 1 : 0),
    );
    message = `${before}%${mod || 'v'}${after}`;
    args.push(expr);
  }

  return `return fmt.Errorf(${[JSON.stringify(message), ...args].join(', ')})`;
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
