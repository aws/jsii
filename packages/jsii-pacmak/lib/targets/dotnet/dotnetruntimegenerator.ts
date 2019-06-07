import {CodeMaker} from "codemaker";
import * as spec from 'jsii-spec';
import {DotNetTypeResolver} from "./dotnettyperesolver";
import {DotNetNameUtils} from "./nameutils";

/**
 * Generates the Jsii attributes and calls for the jsii .NET runtime
 *
 * Uses the same instance of CodeMaker as the rest of the code
 */
export class DotNetRuntimeGenerator {
    private code: CodeMaker;
    private typeresolver: DotNetTypeResolver;
    private nameutils: DotNetNameUtils = new DotNetNameUtils();

    constructor(code: CodeMaker, typeresolver: DotNetTypeResolver) {
        this.code = code;
        this.typeresolver = typeresolver;
    }

    /**
     * Emits the jsii attribute for an interface
     *
     * Ex: [JsiiInterface(nativeType: typeof(IGreetee), fullyQualifiedName: "jsii-calc.Greetee")]
     */
    public emitAttributeForInterface(ifc: spec.InterfaceType) {
        const jsiiAttribute =
            `[JsiiInterface(nativeType: typeof(${this.nameutils.convertInterfaceName(ifc.name)}), fullyQualifiedName: "${ifc.fqn}")]`;
        this.code.line(jsiiAttribute);
    }

    /**
     * Emits the jsii attribute for an interface datatype
     *
     * Ex: [JsiiByValue]
     */
    public emitAttributeForInterfaceDatatype() {
        const jsiiAttribute = `[JsiiByValue]`;
        this.code.line(jsiiAttribute);
    }

    /**
     * Emits the jsii attribute for a class
     *
     * Ex: [JsiiClass(nativeType: typeof(Very), fullyQualifiedName: "@scope/jsii-calc-base-of-base.Very")]
     */
    public emitAttributeForClass(cls: spec.ClassType) {
        const className = this.nameutils.convertClassName(cls);
        let jsiiAttribute = `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: "${cls.fqn}")]`;
        const initializer = cls.initializer;
        if (initializer) {
            if (initializer.parameters) {
                jsiiAttribute = `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: `
                    + `"${cls.fqn}", parametersJson: "${JSON.stringify(initializer.parameters).replace(/"/g, '\\"')}")]`;
            }
        }
        this.code.line(jsiiAttribute);
    }

    /**
     * Emits the proper jsii .NET attribute for a method
     *
     * Ex: [JsiiMethod(name: "hey", returnsJson: "{\"type\":{\"primitive\":\"number\"}}")
     */
    public emitAttributeForMethod(cls: spec.ClassType | spec.InterfaceType, method: spec.Method/*, emitForProxyOrDatatype: boolean = false*/): void {
        const isOverride = (cls.kind === spec.TypeKind.Class) && (method.overrides) ? ', isOverride: true' : '';
        const isAsync = (cls.kind === spec.TypeKind.Class) && (method.async) ? ', isAsync: true' : '';
        const parametersJson = method.parameters ? `, parametersJson: "${JSON.stringify(method.parameters).replace(/"/g, '\\"')}"` : '';
        const returnsJson = method.returns ? `, returnsJson: "${JSON.stringify(method.returns).replace(/"/g, '\\"')}"` : '';
        const jsiiAttribute = `[JsiiMethod(name: "${method.name}"${returnsJson}${parametersJson}${isAsync}${isOverride})]`;
        this.code.line(jsiiAttribute);
    }

    /**
     * Emits the proper jsii .NET attribute for a property
     *
     * Ex: [JsiiProperty(name: "foo", typeJson: "{\"fqn\":\"@scope/jsii-calc-base-of-base.Very\"}", isOptional: true, isOverride: true)]
     */
    public emitAttributeForProperty(prop: spec.Property, datatype: boolean = false): void {
        // If we are on a datatype then we want the property to override in Jsii
        const isJsiiOverride = datatype ? ', isOverride: true' : '';
        const isOptionalJsii = prop.optional ? ', isOptional: true' : '';
        const jsiiAttribute = `[JsiiProperty(name: "${prop.name}", `
            + `typeJson: "${JSON.stringify(prop.type).replace(/"/g, '\\"')}"${isOptionalJsii}${isJsiiOverride})]`;
        this.code.line(jsiiAttribute);
    }

    /**
     * Emits the proper jsii .NET attribute for an interface proxy
     *
     * Ex: [JsiiTypeProxy(nativeType: typeof(IVeryBaseProps), fullyQualifiedName: "@scope/jsii-calc-base-of-base.VeryBaseProps")]
     */
    public emitAttributeForInterfaceProxy(ifc: spec.ClassType | spec.InterfaceType): void {
        const name = ifc.kind === spec.TypeKind.Interface ? this.nameutils.convertInterfaceName(ifc.name)
            : this.typeresolver.registeredShortTypes.get(ifc.fqn);
        this.code.line(`[JsiiTypeProxy(nativeType: typeof(${name}), fullyQualifiedName: \"${ifc.fqn}\")]`);
    }

    /**
     * Emits the proper jsii .NET attribute for an enum
     *
     * Ex: [JsiiEnum(nativeType: typeof(Test), fullyQualifiedName: "jsii-calc.Test")]
     */
    public emitAttributeForEnum(enm: spec.EnumType, enumName: string): void {
        const jsiiAttribute = `[JsiiEnum(nativeType: typeof(${enumName}), fullyQualifiedName: \"${enm.fqn}\")]`;
        this.code.line(jsiiAttribute);
    }

    /**
     * Emits the proper jsii .NET attribute for an enum member
     *
     * Ex: [JsiiEnumMember(name: "Normal")]
     */
    public emitAttributeForEnumMember(enumMemberName: string): void {
        const jsiiAttribute = `[JsiiEnumMember(name: "${enumMemberName}")]`;
        this.code.line(jsiiAttribute);
    }

    /**
     * Returns the jsii .NET method identifier
     */
    public createInvokeMethodIdentifier(method: spec.Method, cls: spec.ClassType): string {
        const className = this.typeresolver.registeredShortTypes.get(cls.fqn);
        const isStatic = method.static ? 'Static' : 'Instance';
        const returns = method.returns ? '' : 'Void';
        const invokeMethodName = method.returns ? `return Invoke${isStatic}${returns}Method` : `Invoke${isStatic}${returns}Method`;
        const returnType = method.returns ? `<${this.typeresolver.toDotNetType(method.returns.type)}>` : '';
        const typeofStatement = method.static ? `typeof(${className}), ` : '';
        const params: string[] = [];
        if (method.parameters) {
            method.parameters.forEach(param => { params.push(this.nameutils.convertParameterName(param.name)); });
        }
        return `${invokeMethodName}${returnType}(${typeofStatement}new object[]{${params.join(', ')}});`;
    }
}