import * as spec from '@jsii/spec';
import { camel, constant, pascal } from 'case';
import * as ts from 'typescript';

import { TypeSystemHints } from './docs';
import { WARNINGSCODE_FILE_NAME } from './transforms/deprecation-warnings';
import { JSII_DIAGNOSTICS_CODE, _formatDiagnostic } from './utils';

/**
 * Descriptors for all valid jsii diagnostic codes.
 *
 * The `category` or non-error codes can be updated, for example to treat
 * warnings as errors, or to suppress certain undesirable warnings.
 */
export class Code<
  T extends DiagnosticMessageFormatter = DiagnosticMessageFormatter,
> {
  private static readonly byCode: { [code: number]: Code } = {};
  private static readonly byName: { [name: string]: Code } = {};

  /**
   * @internal
   */
  public static message<T extends DiagnosticMessageFormatter>({
    code,
    name,
    formatter,
  }: {
    code: number;
    formatter: T;
    name: string;
  }) {
    return new Code<T>(code, name, ts.DiagnosticCategory.Message, formatter);
  }

  /**
   * @internal
   */
  public static suggestion<T extends DiagnosticMessageFormatter>({
    code,
    name,
    formatter,
  }: {
    code: number;
    formatter: T;
    name: string;
  }) {
    return new Code<T>(code, name, ts.DiagnosticCategory.Suggestion, formatter);
  }

  /**
   * @internal
   */
  public static warning<T extends DiagnosticMessageFormatter>({
    code,
    name,
    formatter,
  }: {
    code: number;
    formatter: T;
    name: string;
  }) {
    return new Code<T>(code, name, ts.DiagnosticCategory.Warning, formatter);
  }

  /**
   * @internal
   */
  public static error<T extends DiagnosticMessageFormatter>({
    code,
    name,
    formatter,
  }: {
    code: number;
    formatter: T;
    name: string;
  }) {
    return new Code<T>(code, name, ts.DiagnosticCategory.Error, formatter);
  }

  /**
   * Get a diagnostic code by code or name.
   *
   * @param codeOrName the looked up diagnostic code or name.
   *
   * @returns the JsiiDiagnosticCode instande, if one exists, or `undefined`
   *
   * @experimental this module is under active development and the error codes
   *               and names may change in the future.
   */
  public static lookup(codeOrName: string | number): Code | undefined {
    if (typeof codeOrName === 'number') {
      return this.byCode[codeOrName];
    }
    return this.byName[codeOrName];
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #defaultCategory: ts.DiagnosticCategory;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #category?: ts.DiagnosticCategory;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  readonly #formatter: T;

  /**
   * Registers a new diagnostic code.
   *
   * @param code            the numeric code for the diagnostic
   * @param name            the symbolic name for the diagnostic
   * @param defaultCategory the default category this diagnostic ranks in
   * @param formatter       a message formatter for easy creation of diagnostics
   */
  private constructor(
    public readonly code: number,
    public readonly name: string,
    defaultCategory: ts.DiagnosticCategory,
    formatter: T,
  ) {
    this.#defaultCategory = defaultCategory;
    this.#formatter = formatter;

    if (code in Code.byCode) {
      throw new Error(
        `Attempted to create two instances of ${this.constructor.name} with code ${code}`,
      );
    }
    if (name in Code.byName) {
      throw new Error(
        `Attempted to create two instances of ${this.constructor.name} with name ${name}`,
      );
    }
    Code.byCode[code] = Code.byName[name] = this;
  }

  /**
   * Determines whether this diagnostic is a compilation error. Diagnostics
   * where this is `true` cannot have their `category` overridden to a lower
   * category.
   */
  public get isError(): boolean {
    return this.#defaultCategory === ts.DiagnosticCategory.Error;
  }

  /**
   * The diagnostic category this particular code is filed as.
   */
  public get category(): ts.DiagnosticCategory {
    return this.#category ?? this.#defaultCategory;
  }

  /**
   * Update the diagnostic category for this particular code. If `isError` is
   * `true`, attempting to set anything other than `ts.DiagnosticCategory.Error`
   * will result in an error being throw.
   *
   * @param newValue the new diagnostic category to be used.
   */
  public set category(newValue: ts.DiagnosticCategory) {
    if (this.isError && newValue !== ts.DiagnosticCategory.Error) {
      throw new Error(
        `Illegal attempt to override category of error ${this.code} to ${ts.DiagnosticCategory[newValue]}`,
      );
    }
    this.#category = newValue;
  }

  /**
   * Creates a new `JsiiDiagnostic` message without any source code location
   * data.
   *
   * @param args the arguments to the message formatter.
   *
   * @deprecated It is preferred to specify a source code location for problem
   *             markers. Prefer the use of `create` while providing a value
   *             for the `location` parameter whenever possible.
   */
  public createDetached(...args: Parameters<T>): JsiiDiagnostic {
    return new JsiiDiagnostic(this, this.#formatter(...args));
  }

  /**
   * Creates a new `JsiiDiagnostic` message with source code location denoted
   * by the provided `location` node.
   *
   * @param location the source code location attachment of the message.
   * @param args     the arguments to the message formatter.
   */
  public create(location: ts.Node, ...args: Parameters<T>): JsiiDiagnostic {
    return new JsiiDiagnostic(this, this.#formatter(...args), location);
  }
}

/**
 * A jsii-specific diagnostic entry.
 */
export class JsiiDiagnostic implements ts.Diagnostic {
  /**
   * This symbol unequivocally identifies the `JsiiDiagnostic` domain.
   */
  private static readonly DOMAIN = Symbol('jsii');

  //////////////////////////////////////////////////////////////////////////////
  // 0001 => 0999 -- PACKAGE METADATA PROBLEMS

  public static readonly JSII_0001_PKG_MISSING_DESCRIPTION = Code.suggestion({
    code: 1,
    formatter: () =>
      `A "description" field should be specified in "package.json"`,
    name: 'metadata/package-json-missing-description',
  });

  public static readonly JSII_0002_PKG_MISSING_HOMEPAGE = Code.suggestion({
    code: 2,
    formatter: () => `A "homepage" field should be specified in "package.json"`,
    name: 'metadata/package-json-missing-homepage',
  });

  public static readonly JSII_0003_MISSING_README = Code.warning({
    code: 3,
    formatter: () =>
      `There is no "README.md" file. It is required in order to generate valid PyPI (Python) packages.`,
    name: 'metadata/missing-readme',
  });

  public static readonly JSII_0004_COULD_NOT_FIND_ENTRYPOINT = Code.error({
    code: 4,
    formatter: (mainFile: string) => `Could not find "main" file: ${mainFile}`,
    name: 'metadata/could-not-find-entrypoint',
  });

  public static readonly JSII_0005_MISSING_PEER_DEPENDENCY = Code.warning({
    code: 5,
    formatter: (assm: string, reference: string) =>
      `The type "${reference}" is exposed in the public API of this module. ` +
      `Therefore, the module "${assm}" must also be defined under "peerDependencies". ` +
      'This will be auto-corrected unless --no-fix-peer-dependencies was specified.',
    name: 'metadata/missing-peer-dependency',
  });

  // NOTE: currently not possible to change the severity of this code,
  // as it's being emitted before the overrides have been loaded
  public static readonly JSII_0006_MISSING_DEV_DEPENDENCY = Code.warning({
    code: 6,
    formatter: (
      dependencyName: string,
      peerRange: string,
      minVersion: string,
      actual: string,
    ) =>
      `A "peerDependency" on "${dependencyName}" at "${peerRange}" means you ` +
      `should take a "devDependency" on "${dependencyName}" at "${minVersion}" ` +
      `(found ${JSON.stringify(actual)})`,
    name: 'metadata/missing-dev-dependency',
  });

  public static readonly JSII_0007_MISSING_WARNINGS_EXPORT = Code.error({
    code: 7,
    formatter: () =>
      'If you are compiling with --add-deprecation-warnings and your package.json ' +
      `declares subpath exports, you must include { "./${WARNINGSCODE_FILE_NAME}": "./${WARNINGSCODE_FILE_NAME}" } ` +
      'in the set of exports.',
    name: 'metadata/missing-warnings-export',
  });

  //////////////////////////////////////////////////////////////////////////////
  // 1000 => 1999 -- TYPESCRIPT LANGUAGE RESTRICTIONS

  public static readonly JSII_1000_NO_CONST_ENUM = Code.error({
    code: 1000,
    formatter: () => `Exported "const enum" declarations are not allowed`,
    name: 'typescript-restrictions/no-const-enum',
  });

  public static readonly JSII_1001_TYPE_HAS_NO_SYMBOL = Code.error({
    code: 1001,
    formatter: () =>
      `Non-primitive types without a symbol cannot be processed.`,
    name: 'typescript-restrictions/type-has-no-symbol',
  });

  public static readonly JSII_1002_UNSPECIFIED_PROMISE = Code.error({
    code: 1002,
    formatter: () => `Un-specified promise type. Specify it using "Promise<T>"`,
    name: 'typescript-restrictions/unspecified-promise',
  });

  public static readonly JSII_1003_UNSUPPORTED_TYPE = Code.error({
    code: 1003,
    formatter: (messageText) => messageText,
    name: 'typescript-restrictions/unsupported-type',
  });

  public static readonly JSII_1004_DUPLICATE_ENUM_VALUE = Code.error({
    code: 1004,
    formatter: (enumValue: string, enumMemberNames: string[]) =>
      `Value ${enumValue} is used for multiple enum values: ${enumMemberNames.join(
        ', ',
      )}`,
    name: 'typescript-restrictions/duplicate-enum-value',
  });

  //////////////////////////////////////////////////////////////////////////////
  // 2000 => 2999 -- RESERVED

  //////////////////////////////////////////////////////////////////////////////
  // 3000 => 3999 -- TYPE MODEL COHERENCE

  public static readonly JSII_3000_EXPORTED_API_USES_HIDDEN_TYPE = Code.error({
    code: 3000,
    formatter: (badFqn) =>
      `Exported APIs cannot use un-exported type "${badFqn}"`,
    name: 'type-model/exported-api-cannot-use-unexported-type',
  });

  public static readonly JSII_3001_EXPOSED_INTERNAL_TYPE = Code.error({
    code: 3001,
    formatter: (symbol: ts.Symbol, isThisType: boolean, typeUse: string) =>
      `Type ${
        isThisType ? `"this" (aka: "${symbol.name}")` : `"${symbol.name}"`
      } cannot be used as the ${typeUse} because it is private or @internal`,
    name: 'type-model/use-of-internal-type',
  });

  public static readonly JSII_3002_USE_OF_UNEXPORTED_FOREIGN_TYPE = Code.error({
    code: 3002,
    formatter: (fqn: string, typeUse: string, pkg: { readonly name: string }) =>
      `Type "${fqn}" cannot be used as a ${typeUse} because it is not exported from ${pkg.name}`,
    name: 'type-model/unexported-foreign-type',
  });

  public static readonly JSII_3003_SYMBOL_IS_EXPORTED_TWICE = Code.error({
    code: 3003,
    formatter: (ns1: string, ns2: string) =>
      `Symbol is exported under two distinct submodules: ${ns1} and ${ns2}`,
    name: 'type-model/symbol-is-exported-twice',
  });

  public static readonly JSII_3004_INVALID_SUPERTYPE = Code.error({
    code: 3004,
    formatter: (clause: ts.HeritageClause, badDeclaration: ts.Declaration) => {
      return `Illegal ${clauseType(clause.token)} clause for an exported API: ${
        ts.SyntaxKind[badDeclaration.kind]
      }`;

      function clauseType(token: ts.SyntaxKind): string {
        switch (token) {
          case ts.SyntaxKind.ExtendsKeyword:
            return 'extends';
          case ts.SyntaxKind.ImplementsKeyword:
            return 'implements';
          default:
            return ts.SyntaxKind[token];
        }
      }
    },
    name: 'type-model/invalid-supertype',
  });

  public static readonly JSII_3005_TYPE_USED_AS_INTERFACE = Code.error({
    code: 3005,
    formatter: (badType: spec.TypeReference) =>
      `Type "${spec.describeTypeReference(
        badType,
      )}" cannot be used as an interface`,
    name: 'type-model/type-used-as-interface',
  });

  public static readonly JSII_3006_TYPE_USED_AS_CLASS = Code.error({
    code: 3006,
    formatter: (badType: spec.TypeReference) =>
      `Type "${spec.describeTypeReference(badType)}" cannot be used as a class`,
    name: 'type-model/type-used-as-class',
  });

  public static readonly JSII_3007_ILLEGAL_STRUCT_EXTENSION = Code.error({
    code: 3007,
    formatter: (offender: spec.Type, struct: spec.InterfaceType) =>
      `Attempt to extend or implement struct "${struct.fqn}" from "${offender.fqn}"`,
    name: 'type-model/illegal-struct-extension',
  });

  public static readonly JSII_3008_STRUCT_PROPS_MUST_BE_READONLY = Code.error({
    code: 3008,
    formatter: (propName: string, struct: spec.InterfaceType) =>
      `The "${propName}" property of struct "${struct.fqn}" must be "readonly". Rename "${struct.fqn}" to "I${struct.name}" if it is meant to be a behavioral interface.`,
    name: 'type-model/struct-props-must-be-readonly',
  });

  public static readonly JSII_3009_OPTIONAL_PARAMETER_BEFORE_REQUIRED =
    Code.error({
      code: 3009,
      formatter: (param: spec.Parameter, nextParam: spec.Parameter) =>
        `Parameter "${param.name}" cannot be optional, as it precedes required parameter "${nextParam.name}"`,
      name: 'type-model/optional-parameter-before-required',
    });

  public static readonly JSII_3999_INCOHERENT_TYPE_MODEL = Code.error({
    code: 3999,
    formatter: (messageText) => messageText,
    name: 'type-model/incoherent-type-model',
  });

  //////////////////////////////////////////////////////////////////////////////
  // 4000 => 4999 -- RESERVED

  //////////////////////////////////////////////////////////////////////////////
  // 5000 => 5999 -- LANGUAGE COMPATIBILITY ERRORS

  public static readonly JSII_5000_JAVA_GETTERS = Code.error({
    code: 5000,
    formatter: (badName: string, typeName: string) =>
      `Methods and properties cannot have names like "getXxx": those conflict with Java property getters. Rename "${typeName}.${badName}"`,
    name: 'language-compatibility/potential-java-getter-conflict',
  });

  public static readonly JSII_5001_JAVA_SETTERS = Code.error({
    code: 5001,
    formatter: (badName: string, typeName: string) =>
      `Methods and properties cannot have names like "setXxx": those conflict with Java property setters. Rename "${typeName}.${badName}"`,
    name: 'language-compatibility/potential-java-setter-conflict',
  });

  public static readonly JSII_5002_OVERRIDE_CHANGES_VISIBILITY = Code.error({
    code: 5002,
    formatter: (
      newElement: string,
      action: string,
      newValue: 'protected' | 'public',
      oldValue: 'protected' | 'public',
    ) =>
      `"${newElement}" changes visibility to ${newValue} when ${action}. Change it to ${oldValue}`,
    name: 'language-compatibility/override-changes-visibility',
  });

  public static readonly JSII_5003_OVERRIDE_CHANGES_RETURN_TYPE = Code.error({
    code: 5003,
    formatter: (
      newElement: string,
      action: string,
      newValue: string,
      oldValue: string,
    ) =>
      `"${newElement}" changes the return type to "${newValue}" when ${action}. Change it to "${oldValue}"`,
    name: 'language-compatibility/override-changes-return-type',
  });

  public static readonly JSII_5004_OVERRIDE_CHANGES_PROP_TYPE = Code.error({
    code: 5004,
    formatter: (
      newElement: string,
      action: string,
      newType: spec.TypeReference,
      oldType: spec.TypeReference,
    ) =>
      `"${newElement}" changes the property type to "${spec.describeTypeReference(
        newType,
      )}" when ${action}. Change it to "${spec.describeTypeReference(
        oldType,
      )}"`,
    name: 'language-compatibility/override-changes-property-type',
  });

  public static readonly JSII_5005_OVERRIDE_CHANGES_PARAM_COUNT = Code.error({
    code: 5005,
    formatter: (
      newElement: string,
      action: string,
      newCount: number,
      oldCount: number,
    ) =>
      `"${newElement}" has ${newCount} parameters when ${action}. It should accept ${oldCount} parameters`,
    name: 'language-compatibility/override-changes-param-count',
  });

  public static readonly JSII_5006_OVERRIDE_CHANGES_PARAM_TYPE = Code.error({
    code: 5006,
    formatter: (
      newElement: string,
      action: string,
      newParam: spec.Parameter,
      oldParam: spec.Parameter,
    ) =>
      `"${newElement}" changes the type of parameter "${
        newParam.name
      }" to ${spec.describeTypeReference(
        newParam.type,
      )} when ${action}. Change it to ${spec.describeTypeReference(
        oldParam.type,
      )}`,
    name: 'language-compatibility/override-changes-param-type',
  });

  public static readonly JSII_5007_OVERRIDE_CHANGES_VARIADIC = Code.error({
    code: 5007,
    formatter: (
      newElement: string,
      action: string,
      newVariadic = false,
      oldVariadic = false,
    ) =>
      `"${newElement}" turns ${
        newVariadic ? 'variadic' : 'non variadic'
      } when ${action}. Make it ${oldVariadic ? 'variadic' : 'non-variadic'}`,
    name: 'language-compatibility/override-changes-variadic',
  });

  public static readonly JSII_5008_OVERRIDE_CHANGES_PARAM_OPTIONAL = Code.error(
    {
      code: 5008,
      formatter: (
        newElement: string,
        action: string,
        newParam: spec.Parameter,
        oldParam: spec.Parameter,
      ) =>
        `"${newElement}" turns parameter "${newParam.name}" ${
          newParam.optional ? 'optional' : 'required'
        } when ${action}. Make it ${
          oldParam.optional ? 'optional' : 'required'
        }`,
      name: 'language-compatibility/override-changes-param-optional',
    },
  );

  public static readonly JSII_5009_OVERRIDE_CHANGES_PROP_OPTIONAL = Code.error({
    code: 5009,
    formatter: (
      newElement: string,
      action: string,
      newOptional = false,
      oldOptional = false,
    ) =>
      `"${newElement}" turns ${
        newOptional ? 'optional' : 'required'
      } when ${action}. Make it ${oldOptional ? 'optional' : 'required'}`,
    name: 'language-compatibility/override-changes-prop-optional',
  });

  public static readonly JSII_5010_OVERRIDE_CHANGES_MUTABILITY = Code.error({
    code: 5010,
    formatter: (
      newElement: string,
      action: string,
      newReadonly = false,
      oldReadonly = false,
    ) =>
      `"${newElement}" turns ${
        newReadonly ? 'readonly' : 'mutable'
      } when ${action}. Make it ${oldReadonly ? 'readonly' : 'mutable'}`,
    name: 'language-compatibility/override-changes-mutability',
  });

  public static readonly JSII_5011_SUBMODULE_NAME_CONFLICT = Code.error({
    code: 5011,
    formatter: (
      submoduleName: string,
      typeName: string,
      reserved: readonly string[],
    ) =>
      `Submodule "${submoduleName}" conflicts with "${typeName}, as different languages could represent it as: ${reserved
        .map((x) => `"${x}"`)
        .join(', ')}"`,
    name: 'language-compatibility/submodule-name-conflicts',
  });

  public static readonly JSII_5012_NAMESPACE_IN_TYPE = Code.error({
    code: 5012,
    formatter: (typeName: string, namespaceName: string) =>
      `All entities nested under a type (e.g: "${typeName}") must be concrete types, but "${namespaceName}" is a namespace. This structure cannot be supported in all languages (e.g: Java)`,
    name: 'language-compatibility/namespace-in-type',
  });

  public static readonly JSII_5013_STATIC_INSTANCE_CONFLICT = Code.error({
    code: 5013,
    formatter: (member: string, type: spec.ClassType) =>
      `Member "${member}" of class "${type.fqn}" has both a static and an instance delcaration`,
    name: 'language-compatibility/static-instance-conflict',
  });

  public static readonly JSII_5014_INHERITED_STATIC_CONFLICT = Code.error({
    code: 5014,
    formatter: (
      member: spec.Method | spec.Property,
      type: spec.ClassType,
      baseMember: spec.Method | spec.Property,
      baseType: spec.ClassType,
    ) =>
      `${member.static ? 'Static' : 'Instance'} member "${
        member.name
      }" of class "${type.fqn}" conflicts with ${
        baseMember.static ? 'static' : 'instance'
      } member in ancestor "${baseType.fqn}"`,
    name: 'language-compatibility/inherited-static-conflict',
  });

  public static readonly JSII_5015_REDECLARED_INTERFACE_MEMBER = Code.error({
    code: 5015,
    formatter: (memberName: string, iface: spec.InterfaceType) =>
      `Interface "${iface.fqn}" re-declares member "${memberName}". This is not supported as it results in invalid C#.`,
    name: 'language-compatibility/redeclared-interface-member',
  });

  public static readonly JSII_5016_PROHIBITED_MEMBER_NAME = Code.error({
    code: 5016,
    formatter: (badName: string) =>
      `Members cannot be named "${badName}" as it conflicts with synthetic declarations in some languages.`,
    name: 'language-compatibility/prohibited-member-name',
  });

  public static readonly JSII_5017_POSITIONAL_KEYWORD_CONFLICT = Code.error({
    code: 5017,
    formatter: (badName: string) =>
      `Parameter name "${badName}" is also the name of a property in a struct parameter. Rename the positional parameter.`,
    name: 'language-compatibility/positional-keyword-conflict',
  });

  public static readonly JSII_5018_RESERVED_WORD = Code.warning({
    code: 5018,
    formatter: (badName: string, languages: readonly string[]) =>
      `"${badName}" is a reserved word in ${languages.join(
        ', ',
      )}. Using this name may cause problems when generating language bindings. Consider a different name.`,
    name: 'language-compatibility/reserved-word',
  });

  public static readonly JSII_5019_MEMBER_TYPE_NAME_CONFLICT = Code.warning({
    code: 5019,
    formatter: (
      memberKind: 'method' | 'property',
      memberSymbol: ts.Symbol,
      declaringType: spec.Type,
    ) =>
      `The ${memberKind} name "${memberSymbol.name}" conflicts with the declaring ${declaringType.kind} "${declaringType.name}". This will result in renaming the ${declaringType.kind} to "_${declaringType.name}" in C#. Consider renaming "${memberSymbol.name}".`,
    name: 'language-compatibility/member-name-conflicts-with-type-name',
  });

  public static readonly JSII_5020_STATIC_MEMBER_CONFLICTS_WITH_NESTED_TYPE =
    Code.error({
      code: 5020,
      formatter: (
        nestingType: spec.Type,
        staticMember: spec.Property | spec.Method | spec.EnumMember,
        nestedType: spec.Type,
      ) =>
        `The static member "${nestingType.name}.${staticMember.name}" has the same PascalCased representation as nested type "${nestingType.name}.${nestedType.name}". This would result in invalid code in Go.`,
      name: 'language-compatibility/static-member-name-conflicts-with-nested-type',
    });

  //////////////////////////////////////////////////////////////////////////////
  // 6000 => 6999 -- RESERVED

  //////////////////////////////////////////////////////////////////////////////
  // 7000 => 7999 -- DOCUMENTATION ERRORS

  public static readonly JSII_7000_NON_EXISTENT_PARAMETER = Code.warning({
    code: 7000,
    formatter: (method: spec.Method, param: string) =>
      `Documentation for method "${method.name}" refers to non-existent @param "${param}"`,
    name: 'documentation/non-existent-parameter',
  });

  public static readonly JSII_7001_ILLEGAL_HINT = Code.error({
    code: 7001,
    formatter: (hint: keyof TypeSystemHints, ...valid: readonly string[]) =>
      `Illegal use of "@${hint}" hint. It is only valid on ${valid.join(
        ', ',
      )}.`,
    name: 'documentation/illegal-hint',
  });

  public static readonly JSII_7999_DOCUMENTATION_ERROR = Code.error({
    code: 7999,
    formatter: (messageText) => messageText,
    name: 'documentation/documentation-error',
  });

  //////////////////////////////////////////////////////////////////////////////
  // 8000 => 8999 -- JSII STYLE ENFORCEMENT

  public static readonly JSII_8000_PASCAL_CASED_TYPE_NAMES = Code.error({
    code: 8000,
    formatter: (badName: string, expectedName: string = pascal(badName)) =>
      `Type names must be PascalCased. Rename "${badName}" to "${expectedName}"`,
    name: 'code-style/type-names-must-use-pascal-case',
  });

  public static readonly JSII_8001_ALL_CAPS_ENUM_MEMBERS = Code.error({
    code: 8001,
    formatter: (badName: string, typeName: string) =>
      `Enum members must be ALL_CAPS. Rename "${typeName}.${badName}" to "${constant(
        badName,
      )}"`,
    name: 'code-style/enum-members-must-use-all-caps',
  });

  public static readonly JSII_8002_CAMEL_CASED_MEMBERS = Code.error({
    code: 8002,
    formatter: (badName: string, typeName: string) =>
      `Method and property (unless they are static readonly) names must use camelCase. Rename "${typeName}.${badName}" to "${camel(
        badName,
      )}"`,
    name: 'code-style/member-names-must-use-camel-case',
  });

  public static readonly JSII_8003_STATIC_CONST_CASING = Code.error({
    code: 8003,
    formatter: (badName: string, typeName: string) =>
      `Static constant names must use ALL_CAPS, PascalCase, or camelCase. Rename "${typeName}.${badName}" to "${constant(
        badName,
      )}"`,
    name: 'code-style/static-readonly-property-casing',
  });

  public static readonly JSII_8004_SUBMOULE_NAME_CASING = Code.error({
    code: 8004,
    formatter: (badName: string) =>
      `Submodule namespaces must be camelCased or snake_cased. Rename "${badName}" to ${camel(
        badName,
      )}`,
    name: 'code-style/submodule-name-casing',
  });

  public static readonly JSII_8005_INTERNAL_UNDERSCORE = Code.error({
    code: 8005,
    formatter: (badName: string) =>
      `Members marked with @internal must have a name starting with "_". Rename "${badName}" to "_${badName}"`,
    name: 'code-style/internal-members-underscore-prefix',
  });

  public static readonly JSII_8006_UNDERSCORE_INTERNAL = Code.error({
    code: 8006,
    formatter: (badName: string) =>
      `Members with a name starting with "_" (e.g: "${badName}") must be marked @internal`,
    name: 'code-style/underscored-members-must-be-internal',
  });

  public static readonly JSII_8007_BEHAVIORAL_INTERFACE_NAME = Code.error({
    code: 8007,
    formatter: (badName: string) =>
      `Interface contains behavior. Rename "${badName}" to "I${badName}"`,
    name: 'code-style/behavioral-interface-name',
  });

  //////////////////////////////////////////////////////////////////////////////
  // 9000 => 9999 -- SURPRISING ERRORS & INFORMATIONAL MESSAGES

  public static readonly JSII_9000_UNKNOWN_MODULE = Code.error({
    code: 9000,
    formatter: (moduleName) =>
      `Encountered use of module that is not declared in "dependencies" or "peerDependencies": "${moduleName}"`,
    name: 'miscellaneous/unknown-module',
  });

  public static readonly JSII_9001_TYPE_NOT_FOUND = Code.error({
    code: 9001,
    formatter: (typeRef: spec.NamedTypeReference) =>
      `Type not found in the corresponding assembly: "${typeRef.fqn}"`,
    name: 'miscellaneous/type-not-found',
  });

  public static readonly JSII_9002_UNRESOLVEABLE_TYPE = Code.error({
    code: 9002,
    formatter: (reference: string) =>
      `Unable to resolve type "${reference}". It may be @internal or not exported from the module's entry point (as configured in "package.json" as "main").`,
    name: 'miscellaneous/unresolveable-type',
  });

  public static readonly JSII_9003_UNRESOLVEABLE_MODULE = Code.error({
    code: 9003,
    formatter: (location: string) =>
      `Unable to resolve module location "${location}"`,
    name: 'miscellaneous/unresolveable-module',
  });

  public static readonly JSII_9004_UNABLE_TO_COMPUTE_SIGNATURE = Code.error({
    code: 9004,
    formatter: (methodName: string, type: spec.Type) =>
      `Unable to compute signature for method "${methodName}" of "${type.fqn}"`,
    name: 'miscellaneous/unable-to-compute-signature',
  });

  public static readonly JSII_9996_UNNECESSARY_TOKEN = Code.message({
    code: 9996,
    formatter: () => 'Unnecessary token, consider removing it',
    name: 'miscellaneous/unnecessary-token',
  });

  public static readonly JSII_9997_UNKNOWN_ERROR = Code.error({
    code: 9997,
    formatter: (error: Error) =>
      `Unknown error: ${error.message} -- ${error.stack}`,
    name: 'miscellaneous/unknown-error',
  });

  public static readonly JSII_9998_UNSUPPORTED_NODE = Code.message({
    code: 9998,
    formatter: (kindOrMessage: ts.SyntaxKind | string) =>
      typeof kindOrMessage === 'string'
        ? kindOrMessage
        : `Unsupported ${ts.SyntaxKind[kindOrMessage]} node. This declaration will not be accessible from other languages.`,
    name: 'miscellaneous/unsupported-node',
  });

  private static readonly JSII_9999_RELATED_INFO = Code.suggestion({
    code: 9999,
    formatter: (messageText) => messageText,
    name: 'miscellaneous/related-info',
  });

  //////////////////////////////////////////////////////////////////////////////

  /**
   * Determines whether a `Diagnostic` instance is a `JsiiDiagnostic` or not.
   * @param diag
   */
  public static isJsiiDiagnostic(diag: ts.Diagnostic): diag is JsiiDiagnostic {
    return (diag as unknown as JsiiDiagnostic).domain === JsiiDiagnostic.DOMAIN;
  }

  private readonly domain = JsiiDiagnostic.DOMAIN;

  public readonly category: ts.DiagnosticCategory;
  public readonly code: number = JSII_DIAGNOSTICS_CODE;
  public readonly jsiiCode: number;
  public readonly messageText: string | ts.DiagnosticMessageChain;

  public readonly file: ts.SourceFile | undefined;
  public readonly start: number | undefined;
  public readonly length: number | undefined;

  public readonly relatedInformation =
    new Array<ts.DiagnosticRelatedInformation>();

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  #formatted?: string;

  /**
   * Creates a new `JsiiDiagnostic` with the provided properties.
   *
   * @internal
   */
  public constructor(
    code: Code,
    messageText: string | ts.DiagnosticMessageChain,
    location?: ts.Node,
  ) {
    this.category = code.category;
    this.jsiiCode = code.code;
    this.messageText = messageText;

    if (location != null) {
      this.file = location.getSourceFile();
      this.start = location.getStart(this.file);
      this.length = location.getEnd() - this.start;
    }
  }

  public addRelatedInformation(
    node: ts.Node,
    message: JsiiDiagnostic['messageText'],
  ): this {
    this.relatedInformation.push(
      JsiiDiagnostic.JSII_9999_RELATED_INFO.create(node, message),
    );
    // Clearing out #formatted, as this would no longer be the correct string.
    this.#formatted = undefined;
    return this;
  }

  /**
   * Adds related information to this `JsiiDiagnostic` instance if the provided
   * `node` is defined.
   *
   * @param node    the node to bind as related information, or `undefined`.
   * @param message the message to attach to the related information.
   *
   * @returns `this`
   */
  public maybeAddRelatedInformation(
    node: ts.Node | undefined,
    message: JsiiDiagnostic['messageText'],
  ): this {
    if (node == null) {
      return this;
    }
    this.relatedInformation.push(
      JsiiDiagnostic.JSII_9999_RELATED_INFO.create(node, message),
    );
    // Clearing out #formatted, as this would no longer be the correct string.
    this.#formatted = undefined;
    return this;
  }

  /**
   * Formats this diagnostic with color and context if possible, and returns it.
   * The formatted diagnostic is cached, so that it can be re-used. This is
   * useful for diagnostic messages involving trivia -- as the trivia may have
   * been obliterated from the `SourceFile` by the `TsCommentReplacer`, which
   * makes the error messages really confusing.
   */
  public format(projectRoot: string): string {
    if (this.#formatted == null) {
      this.#formatted = _formatDiagnostic(this, projectRoot);
    }
    return this.#formatted;
  }
}

export type DiagnosticMessageFormatter = (
  ...args: any[]
) => JsiiDiagnostic['messageText'];

export function configureCategories(records: {
  [code: string]: ts.DiagnosticCategory;
}) {
  for (const [code, category] of Object.entries(records)) {
    const diagCode = Code.lookup(diagnosticCode(code));
    if (!diagCode) {
      throw new Error(`Unrecognized diagnostic code '${code}'`);
    }
    diagCode.category = category;
  }
}

function diagnosticCode(str: string): string | number {
  if (str.toLowerCase().startsWith('jsii')) {
    const re = /^JSII(\d+)$/i.exec(str);
    if (re) {
      return parseInt(re[1], 10);
    }
    throw new Error(
      `Invalid diagnostic code ${str}. A number must follow code that starts with 'JSII'`,
    );
  }
  return str;
}
