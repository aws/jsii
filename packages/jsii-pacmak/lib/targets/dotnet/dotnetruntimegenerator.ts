import * as spec from '@jsii/spec';
import { CodeMaker } from 'codemaker';

import { DotNetTypeResolver } from './dotnettyperesolver';
import { DotNetNameUtils } from './nameutils';
import { isLiteralTypeReference } from '../type-literals';

/**
 * Generates the Jsii attributes and calls for the jsii .NET runtime
 *
 * Uses the same instance of CodeMaker as the rest of the code
 */
export class DotNetRuntimeGenerator {
  private readonly code: CodeMaker;
  private readonly typeresolver: DotNetTypeResolver;
  private readonly nameutils: DotNetNameUtils = new DotNetNameUtils();

  public constructor(code: CodeMaker, typeresolver: DotNetTypeResolver) {
    this.code = code;
    this.typeresolver = typeresolver;
  }

  /**
   * Emits the jsii attribute for an interface
   *
   * Ex: [JsiiInterface(nativeType: typeof(IGreetee), fullyQualifiedName: "jsii-calc.Greetee")]
   */
  public emitAttributesForInterface(ifc: spec.InterfaceType) {
    const jsiiAttribute = `[JsiiInterface(nativeType: typeof(${this.nameutils.convertInterfaceName(
      ifc,
    )}), fullyQualifiedName: "${ifc.fqn}")]`;
    this.code.line(jsiiAttribute);
    this.emitDeprecatedAttributeIfNecessary(ifc);
  }

  /**
   * Emits the jsii attribute for an interface datatype
   *
   * @param ifc the annotated interface type.
   *
   * Ex: [JsiiByValue(fqn: "assembly.TypeName")]
   */
  public emitAttributesForInterfaceDatatype(ifc: spec.InterfaceType) {
    const jsiiAttribute = `[JsiiByValue(fqn: "${ifc.fqn}")]`;
    this.code.line(jsiiAttribute);
  }

  /**
   * Emits the jsii attribute for a class
   *
   * Ex: [JsiiClass(nativeType: typeof(Very), fullyQualifiedName: "@scope/jsii-calc-base-of-base.Very")]
   */
  public emitAttributesForClass(cls: spec.ClassType) {
    // const className = this.nameutils.convertClassName(cls);
    const className = this.typeresolver.toNativeFqn(cls.fqn);
    let jsiiAttribute = `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: "${cls.fqn}")]`;
    const initializer = cls.initializer;
    if (initializer) {
      if (initializer.parameters) {
        jsiiAttribute =
          `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: ` +
          `"${cls.fqn}", parametersJson: "${JSON.stringify(
            initializer.parameters,
          )
            .replace(/"/g, '\\"')
            .replace(/\\{2}"/g, 'test')}")]`;
      }
    }
    this.code.line(jsiiAttribute);
    this.emitDeprecatedAttributeIfNecessary(cls);
  }

  /**
   * Emits the proper jsii .NET attribute for a method
   *
   * Ex: [JsiiMethod(name: "hey", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")
   */
  public emitAttributesForMethod(
    cls: spec.ClassType | spec.InterfaceType,
    method: spec.Method /*, emitForProxyOrDatatype: boolean = false*/,
  ): void {
    const isAsync =
      spec.isClassType(cls) && method.async ? ', isAsync: true' : '';
    const parametersJson = method.parameters
      ? `, parametersJson: "${JSON.stringify(method.parameters)
          .replace(/"/g, '\\"')
          .replace(/\\{2}"/g, 'test')}"`
      : '';
    const returnsJson = method.returns
      ? `, returnsJson: "${JSON.stringify(method.returns)
          .replace(/"/g, '\\"')
          .replace(/\\{2}"/g, 'test')}"`
      : '';
    const jsiiAttribute = `[JsiiMethod(name: "${method.name}"${returnsJson}${parametersJson}${isAsync})]`;
    this.code.line(jsiiAttribute);
    this.emitDeprecatedAttributeIfNecessary(method);
  }

  /**
   * Emits the proper jsii .NET attribute for a property
   *
   * Ex: [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", isOptional: true)]
   */
  public emitAttributesForProperty(prop: spec.Property): void {
    const isOptionalJsii = prop.optional ? ', isOptional: true' : '';
    const jsiiAttribute =
      `[JsiiProperty(name: "${prop.name}", ` +
      `typeJson: "${JSON.stringify(prop.type)
        .replace(/"/g, '\\"')
        .replace(/\\{2}"/g, 'test')}"${isOptionalJsii})]`;
    this.code.line(jsiiAttribute);
    this.emitDeprecatedAttributeIfNecessary(prop);
  }

  /**
   * Emits the proper jsii .NET attribute for an interface proxy
   *
   * Ex: [JsiiTypeProxy(nativeType: typeof(IVeryBaseProps), fullyQualifiedName: "@scope/jsii-calc-base-of-base.VeryBaseProps")]
   */
  public emitAttributesForInterfaceProxy(
    ifc: spec.ClassType | spec.InterfaceType,
  ): void {
    const name = spec.isInterfaceType(ifc)
      ? this.nameutils.convertInterfaceName(ifc)
      : this.typeresolver.toNativeFqn(ifc.fqn);
    this.code.line(
      `[JsiiTypeProxy(nativeType: typeof(${name}), fullyQualifiedName: "${ifc.fqn}")]`,
    );
    this.emitDeprecatedAttributeIfNecessary(ifc);
  }

  /**
   * Emits the proper jsii .NET attribute for an enum
   *
   * Ex: [JsiiEnum(nativeType: typeof(Test), fullyQualifiedName: "jsii-calc.Test")]
   */
  public emitAttributesForEnum(enm: spec.EnumType, enumName: string): void {
    const jsiiAttribute = `[JsiiEnum(nativeType: typeof(${enumName}), fullyQualifiedName: "${enm.fqn}")]`;
    this.code.line(jsiiAttribute);
    this.emitDeprecatedAttributeIfNecessary(enm);
  }

  /**
   * Emits the proper jsii .NET attribute for an enum member
   *
   * Ex: [JsiiEnumMember(name: "Normal")]
   */
  public emitAttributesForEnumMember(
    enumMemberName: string,
    enmmember: spec.EnumMember,
  ): void {
    const jsiiAttribute = `[JsiiEnumMember(name: "${enumMemberName}")]`;
    this.code.line(jsiiAttribute);
    this.emitDeprecatedAttributeIfNecessary(enmmember);
  }

  /**
   * Returns the jsii .NET method identifier
   */
  public createInvokeMethodIdentifier(
    method: spec.Method,
    cls: spec.ClassType,
  ): string {
    const className = this.typeresolver.toNativeFqn(cls.fqn);
    const isStatic = method.static ? 'Static' : 'Instance';
    const returns = method.returns ? '' : 'Void';
    const invokeMethodName = method.returns
      ? `return Invoke${isStatic}${returns}Method`
      : `Invoke${isStatic}${returns}Method`;
    const returnType = method.returns
      ? `<${this.typeresolver.toDotNetType(method.returns.type)}${
          method.returns.optional ? '?' : ''
        }>`
      : '';
    // If the method returns a non-optional value, apply a "!" to silence compilation warning.
    const bang = method.returns && !method.returns.optional ? '!' : '';
    const typeofStatement = method.static ? `typeof(${className}), ` : '';
    const paramTypes = new Array<string>();
    const params = new Array<string>();
    if (method.parameters) {
      const { parameters } = this.typeresolver.renderGenericParameters(
        method.parameters,
      );

      for (const param of parameters) {
        if (isLiteralTypeReference(param.type)) {
          // Generic type argument -- since we don't actually need this type anyway because we don't use it
          // for method resolution, we can just use Object.
          paramTypes.push('typeof(System.Object)');
        } else {
          paramTypes.push(
            `typeof(${this.typeresolver.toDotNetType(param.type)}${
              param.variadic ? '[]' : ''
            })`,
          );
        }
        params.push(this.nameutils.convertParameterName(param.name));
      }
    }
    const hasOptional =
      method.parameters?.find((param) => param.optional) != null ? '?' : '';
    return `${invokeMethodName}${returnType}(${typeofStatement}new System.Type[]{${paramTypes.join(
      ', ',
    )}}, new object${hasOptional}[]{${params.join(', ')}})${bang};`;
  }

  /**
   * Emits the proper .NET attribute for a deprecated class/interface/member
   *
   * Ex: [System.Obsolete()]
   */
  public emitDeprecatedAttributeIfNecessary(
    obj:
      | spec.Method
      | spec.ClassType
      | spec.InterfaceType
      | spec.Property
      | spec.EnumType
      | spec.EnumMember
      | spec.Initializer
      | undefined,
  ): void {
    if (!obj) {
      return;
    }
    const docs = obj.docs;
    if (docs) {
      if (docs.stability! === spec.Stability.Deprecated) {
        const attribute = docs.deprecated
          ? `[System.Obsolete("${docs.deprecated
              .replace(/\n/g, ' ') // Replacing new lines in Obsolete
              .replace(/"/g, '\\"')}")]`
          : '[System.Obsolete()]';
        this.code.line(attribute);
      }
    }
  }
}
