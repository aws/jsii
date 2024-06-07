import { CollectionKind } from '@jsii/spec';
import { CodeMaker } from 'codemaker';
import { createHash } from 'crypto';
import { Parameter, TypeReference } from 'jsii-reflect';

import { DotNetTypeResolver } from './dotnettyperesolver';
import { DotNetNameUtils } from './nameutils';

export class ParameterValidator {
  public static forParameters(
    parameters: readonly Parameter[],
    nameUtils: DotNetNameUtils,
    { noMangle }: { readonly noMangle: boolean },
  ): ParameterValidator | undefined {
    if (parameters.length === 0) {
      return undefined;
    }
    const parameterValidations = new Map<Parameter, Validation[]>();

    for (const param of parameters) {
      const expr = noMangle
        ? param.name
        : nameUtils.convertParameterName(param.name);
      const argName = `nameof(${expr})`;

      const validations = new Array<Validation>();
      const validation = Validation.forTypeReference(
        argName,
        expr,
        `${noMangle ? '' : 'argument '}{${argName}}`,
        param.variadic
          ? new TypeReference(param.system, {
              collection: {
                kind: CollectionKind.Array,
                elementtype: param.type.spec!,
              },
            })
          : param.type,
        param.optional,
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
    return new ParameterValidator(parameterValidations);
  }

  private constructor(
    private readonly validations: ReadonlyMap<Parameter, readonly Validation[]>,
  ) {}

  public emit(code: CodeMaker, resolver: DotNetTypeResolver): void {
    for (const [_parameter, validations] of this.validations) {
      for (const validation of validations) {
        validation.emit(code, resolver);
      }
    }
  }
}

abstract class Validation {
  public static forTypeReference(
    argument: string,
    expression: string,
    description: string,
    ref: TypeReference,
    allowNull: boolean,
  ): Validation | undefined {
    if (ref.unionOfTypes) {
      return Validation.unionCheck(
        argument,
        expression,
        description,
        ref.unionOfTypes,
        allowNull,
      );
    } else if (ref.arrayOfType) {
      return Validation.collectionCheck(
        argument,
        expression,
        description,
        'array',
        ref.arrayOfType,
      );
    } else if (ref.mapOfType) {
      return Validation.collectionCheck(
        argument,
        expression,
        description,
        'map',
        ref.mapOfType,
      );
    }
    return undefined;
  }

  public static collectionCheck(
    argument: string,
    expression: string,
    description: string,
    type: 'array' | 'map',
    elementType: TypeReference,
  ): Validation | undefined {
    const elementValidator = Validation.forTypeReference(
      argument,
      `${expression}[idx]`,
      `${description}[@{idx}]`,
      elementType,
      false,
    );
    if (elementValidator == null) {
      return undefined;
    }

    class CollectionCheck extends Validation {
      public emit(code: CodeMaker, resolver: DotNetTypeResolver): void {
        // We need to come up with a unique-enough ID here... so we use a hash.
        const prefix = type === 'array' ? '__idx' : '__item';
        const varName = `${prefix}_${createHash('sha256')
          .update(expression)
          .digest('hex')
          .slice(0, 6)}`;
        if (type === 'array') {
          code.openBlock(
            `for (var ${varName} = 0 ; ${varName} < ${expression}.Length ; ${varName}++)`,
          );
        } else {
          code.openBlock(`foreach (var ${varName} in ${expression})`);
        }
        Validation.forTypeReference(
          argument,
          type === 'array' ? `${expression}[${varName}]` : `${varName}.Value`,
          `${description}[${
            type === 'array' ? `{${varName}}` : `"{${varName}.Key}"`
          }]`,
          elementType,
          false,
        )!.emit(code, resolver);
        code.closeBlock();
      }
    }

    return new CollectionCheck();
  }

  public static unionCheck(
    argument: string,
    expression: string,
    description: string,
    types: readonly TypeReference[],
    allowNull: boolean,
  ): Validation {
    const hasInterface = types.some((t) => t.type?.isInterfaceType());

    class UnionCheck extends Validation {
      public emit(code: CodeMaker, resolver: DotNetTypeResolver): void {
        const validTypes = new Array<string>();

        const castVarName = `cast_${createHash('sha256')
          .update(expression)
          .digest('hex')
          .slice(0, 6)}`;

        code.openBlock(`switch (${expression})`);
        for (const type of types) {
          validTypes.push(resolver.toDotNetTypeName(type.spec!));

          /**
           * Filter to remove classes and interfaces from a set of type references that
           * are implied by another entry in the set. Practically this is meant to remove
           * types from a set if a parent type of it is also present in the set, keeping
           * only the most generic declaration.
           *
           * This is useful because the TypeScript compiler and jsii do not guarantee that
           * all entries in a type union are unrelated, but the C# compiler treats dead
           * code as an error, and will refuse to compile (error CS8120) a pattern-matching
           * switch case if it cannot be matched (for example, if it matches on a child of
           * a type that was previously matched on already).
           */
          if (
            (type.type?.isClassType() || type.type?.isInterfaceType()) &&
            types.some(
              (other) =>
                other !== type &&
                other.type != null &&
                type.type!.extends(other.type),
            )
          ) {
            continue;
          }

          const typeNames = [resolver.toDotNetType(type.spec!)];
          if (typeNames[0] === 'double') {
            // For doubles, we accept any numeric value, really...
            typeNames.push(
              'byte',
              'decimal',
              'float',
              'int',
              'long',
              'sbyte',
              'short',
              'uint',
              'ulong',
              'ushort',
            );
          }

          for (const typeName of typeNames) {
            code.indent(`case ${typeName} ${castVarName}:`);
            Validation.forTypeReference(
              argument,
              castVarName,
              description,
              type,
              allowNull,
            )?.emit(code, resolver);
            code.line('break;');
            code.unindent(false);
          }
        }
        if (hasInterface) {
          code.indent(
            `case Amazon.JSII.Runtime.Deputy.AnonymousObject ${castVarName}:`,
          );
          code.line('// Not enough information to type-check...');
          code.line('break;');
          code.unindent(false);
        }
        code.indent('case null:');

        const acceptedTypes = validTypes
          .map((t) =>
            t.startsWith('"')
              ? t.slice(1, t.length - 1)
              : t.startsWith('$"')
                ? t.slice(2, t.length - 1)
                : `{${t}}`,
          )
          .join(', ');
        if (allowNull) {
          code.line('break;');
        } else {
          const message = JSON.stringify(
            `Expected ${description} to be one of: ${acceptedTypes}; received null`,
          );
          code.line(
            `throw new System.ArgumentException($${message}, ${argument});`,
          );
        }
        code.unindent(false);
        code.indent('default:');
        const message = JSON.stringify(
          `Expected ${description} to be one of: ${acceptedTypes}; received {${expression}.GetType().FullName}`,
        );
        code.line(
          `throw new System.ArgumentException($${message}, ${argument});`,
        );
        code.unindent(false);
        code.closeBlock();
      }
    }
    return new UnionCheck();
  }

  private constructor() {}

  public abstract emit(code: CodeMaker, resolver: DotNetTypeResolver): void;
}
