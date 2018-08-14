import Case = require('case');
import spec = require('jsii-spec');
import ts = require('typescript');
import { Diagnostic, EmitResult, Emitter } from './emitter';
import { ProjectInfo } from './project-info';

// tslint:disable:no-var-requires not TypeScript modules
const deepEqual = require('deep-equal');
// tslint:enable:no-var-requires

export class Validator implements Emitter {
    public static VALIDATIONS: ValidationFunction[] = _defaultValidations();

    private _diagnostics: Diagnostic[] = [];

    public constructor(public readonly projectInfo: ProjectInfo,
                       public readonly assembly: spec.Assembly) {}

    public async emit(): Promise<EmitResult> {
        this._diagnostics = [];

        for (const validation of Validator.VALIDATIONS) {
            validation(this, this.assembly, this._diagnostic.bind(this));
        }

        try {
            return {
                diagnostics: this._diagnostics,
                emitSkipped: this._diagnostics.find(diag => diag.category === ts.DiagnosticCategory.Error) != null
            };
        } finally {
            // Clearing ``this._diagnostics`` to allow contents to be garbage-collected.
            delete this._diagnostics;
        }
    }

    private _diagnostic(category: ts.DiagnosticCategory, messageText: string) {
        this._diagnostics.push({
            domain: 'JSII',
            category, code: 0,
            messageText,
            file: undefined,
            start: undefined,
            length: undefined
        });
    }
}

export type DiagnosticEmitter = (category: ts.DiagnosticCategory, messageText: string) => void;
export type ValidationFunction = (validator: Validator,
                                  assembly: spec.Assembly,
                                  diagnostic: DiagnosticEmitter) => void;

function _defaultValidations(): ValidationFunction[] {
    return [
        _typeNamesMustUsePascalCase,
        _memberNamesMustUseCamelCase,
        _staticConstantNamesMustUseUpperSnakeCase,
        _memberNamesMustNotLookLikeJavaGettersOrSetters,
        _allTypeReferencesAreValid,
        _inehritanceDoesNotChangeContracts
    ];

    function _typeNamesMustUsePascalCase(_: Validator, assembly: spec.Assembly, diagnostic: DiagnosticEmitter) {
        for (const type of _allTypes(assembly)) {
            if (type.name !== Case.pascal(type.name)) {
                diagnostic(ts.DiagnosticCategory.Error,
                           `Type names must use PascalCase: ${type.name}`);
            }
        }
    }

    function _memberNamesMustUseCamelCase(_: Validator, assembly: spec.Assembly, diagnostic: DiagnosticEmitter) {
        for (const member of _allMembers(assembly)) {
            if (member.static && (member as spec.Property).const) { continue; }
            if (member.name && member.name !== Case.camel(member.name)) {
                diagnostic(ts.DiagnosticCategory.Error,
                            `Method and property names must use camelCase: ${member.name}`);
            }
        }
    }

    function _staticConstantNamesMustUseUpperSnakeCase(_: Validator, assembly: spec.Assembly, diagnostic: DiagnosticEmitter) {
        for (const member of _allMembers(assembly)) {
            if (!member.static || !(member as spec.Property).const) { continue; }
            if (member.name
                && member.name !== Case.constant(member.name)
                && member.name !== Case.pascal(member.name)
                && member.name !== Case.camel(member.name)) {
                diagnostic(ts.DiagnosticCategory.Error,
                           `Static constant names must use TRUMP_CASE, PascalCase or camelCase: ${member.name}`);
            }
        }
    }

    function _memberNamesMustNotLookLikeJavaGettersOrSetters(_: Validator, assembly: spec.Assembly, diagnostic: DiagnosticEmitter) {
        for (const member of _allMembers(assembly)) {
            if (!member.name) { continue; }
            const snakeName = Case.snake(member.name);
            if (snakeName.startsWith('get_') && _isEmpty((member as spec.Method).parameters)) {
                diagnostic(ts.DiagnosticCategory.Error,
                           `Methods and properties cannot have names like getXxx() - those conflict with Java property getters by the same name`);
            } else if (snakeName.startsWith('set_') && ((member as spec.Method).parameters || []).length === 1) {
                diagnostic(ts.DiagnosticCategory.Error,
                           `Methods and properties cannot have names like setXxx() - those conflict with Java property setters by the same name`);
            }
        }
    }

    function _allTypeReferencesAreValid(validator: Validator, assembly: spec.Assembly, diagnostic: DiagnosticEmitter) {
        for (const typeRef of _allTypeReferences(assembly)) {
            const [assm, ] = typeRef.fqn.split('.');
            if (assembly.name === assm) {
                if (!(typeRef.fqn in (assembly.types || {}))) {
                    diagnostic(ts.DiagnosticCategory.Error,
                               `Exported APIs cannot use un-exported type ${typeRef.fqn}`);
                }
                continue;
            }
            const foreignAssm = validator.projectInfo.transitiveDependencies.find(dep => dep.name === assm);
            if (!foreignAssm) {
                diagnostic(ts.DiagnosticCategory.Error,
                            `Type reference is rooted in unknown module: ${assm}`);
                continue;
            }
            if (!(typeRef.fqn in (foreignAssm.types || {}))) {
                diagnostic(ts.DiagnosticCategory.Error,
                            `Type reference not found in ${assm}: ${typeRef.fqn}`);
            }
        }
    }

    function _inehritanceDoesNotChangeContracts(validator: Validator, assembly: spec.Assembly, diagnostic: DiagnosticEmitter) {
        for (const type of _allTypes(assembly)) {
            if (spec.isClassType(type)) {
                for (const method of type.methods || []) {
                    _validateMethodOverride(method, type);
                }
                for (const property of type.properties || []) {
                    _validatePropertyOverride(property, type);
                }
            }
            if (spec.isClassOrInterfaceType(type) && type.interfaces && type.interfaces.length > 0) {
                for (const method of type.methods || []) {
                    // Overrides "win" over implementations
                    if (method.overrides) { continue; }
                    _validateMethodImplementation(method, type);
                }
                for (const property of type.properties || []) {
                    _validatePropertyImplementation(property, type);
                }
            }
        }

        function _validateMethodOverride(method: spec.Method, type: spec.ClassType): boolean {
            if (!type.base) { return false; }
            const baseType = _dereference(type.base, assembly, validator) as spec.ClassType;
            if (!baseType) { return false; }
            const overridden = (baseType.methods || []).find(m => m.name === method.name);
            if (!overridden) {
                return _validateMethodOverride(method, baseType);
            }
            _assertSignaturesMatch(overridden, method, `${type.fqn}#${method.name}`, `overriding ${baseType.fqn}`);
            method.overrides = { fqn: baseType.fqn };
            return true;
        }

        function _validatePropertyOverride(property: spec.Property, type: spec.ClassType): boolean {
            if (!type.base) { return false; }
            const baseType = _dereference(type.base, assembly, validator) as spec.ClassType;
            if (!baseType) { return false; }
            const overridden = (baseType.properties || []).find(p => p.name === property.name);
            if (!overridden) {
                return _validatePropertyOverride(property, baseType);
            }
            _assertPropertiesMatch(overridden, property, `${type.fqn}#${property.name}`, `overriding ${baseType.fqn}`);
            property.overrides = { fqn: baseType.fqn };
            return true;
        }

        function _validateMethodImplementation(method: spec.Method, type: spec.ClassType | spec.InterfaceType): boolean {
            if (!type.interfaces) {
                // Abstract classes may not directly implement all members, need to check their supertypes...
                if (spec.isClassType(type) && type.base && type.abstract) {
                    return _validateMethodImplementation(method, _dereference(type.base, assembly, validator) as spec.ClassType);
                }
                return false;
            }
            for (const iface of type.interfaces) {
                const ifaceType = _dereference(iface, assembly, validator) as spec.InterfaceType;
                const implemented = (ifaceType.methods || []).find(m => m.name === method.name);
                if (implemented) {
                    _assertSignaturesMatch(implemented, method, `${type.fqn}#${method.name}`, `implementing ${ifaceType.fqn}`);
                    method.overrides = { fqn: iface.fqn };
                    return true;
                }
                if (_validateMethodImplementation(method, ifaceType)) {
                    return true;
                }
            }
            return false;
        }

        function _validatePropertyImplementation(property: spec.Property, type: spec.ClassType | spec.InterfaceType): boolean {
            if (!type.interfaces) {
                // Abstract classes may not directly implement all members, need to check their supertypes...
                if (spec.isClassType(type) && type.base && type.abstract) {
                    return _validatePropertyImplementation(property, _dereference(type.base, assembly, validator) as spec.ClassType);
                }
                return false;
            }
            for (const iface of type.interfaces) {
                const ifaceType = _dereference(iface, assembly, validator) as spec.InterfaceType;
                const implemented = (ifaceType.properties || []).find(p => p.name === property.name);
                if (implemented) {
                    _assertPropertiesMatch(implemented, property, `${type.fqn}#${property.name}`, `implementing ${ifaceType.fqn}`);
                    property.overrides = { fqn: iface.fqn };
                    return true;
                }
                if (_validatePropertyImplementation(property, ifaceType)) {
                    return true;
                }
            }
            return false;
        }

        function _assertSignaturesMatch(expected: spec.Method, actual: spec.Method, label: string, action: string) {
            if (!deepEqual(actual.returns, expected.returns)) {
                const expType = spec.describeTypeReference(expected.returns);
                const actType = spec.describeTypeReference(actual.returns);
                diagnostic(ts.DiagnosticCategory.Error,
                           `${label} changes the return type when ${action} (expected ${expType}, found ${actType})`);
            }
            const expectedParams = expected.parameters || [];
            const actualParams = actual.parameters || [];
            if (expectedParams.length !== actualParams.length) {
                diagnostic(ts.DiagnosticCategory.Error,
                           `${label} changes argument count when ${action} (expected ${expectedParams.length}, found ${actualParams.length})`);
                return;
            }
            for (let i = 0 ; i < expectedParams.length ; i++) {
                const expParam = expectedParams[i];
                const actParam = actualParams[i];
                if (!deepEqual(expParam.type, actParam.type)) {
                    const expType = spec.describeTypeReference(expParam.type);
                    const actType = spec.describeTypeReference(actParam.type);
                    diagnostic(ts.DiagnosticCategory.Error,
                               `${label} changes type of argument ${actParam.name} when ${action} (expected ${expType}, found ${actType}`);
                }
                // Not-ing those to force the values to a strictly boolean context (they're optional, undefined means false)
                if (!expParam.variadic !== !actParam.variadic) {
                    diagnostic(ts.DiagnosticCategory.Error,
                               // tslint:disable-next-line:max-line-length
                               `${label} changes the variadicity of argument ${actParam.name} when ${action} (expected ${expParam.variadic}, found ${actParam.variadic})`);
                }
            }
        }

        function _assertPropertiesMatch(expected: spec.Property, actual: spec.Property, label: string, action: string) {
            if (!deepEqual(expected.type, actual.type)) {
                const expType = spec.describeTypeReference(expected.type);
                const actType = spec.describeTypeReference(actual.type);
                diagnostic(ts.DiagnosticCategory.Error,
                           `${label} changes the type of property when ${action} (expected ${expType}, found ${actType})`);
            }
            if (expected.immutable !== actual.immutable) {
                diagnostic(ts.DiagnosticCategory.Error,
                           `${label} changes immutability of property when ${action}`);
            }
        }
    }
}

function _allTypes(assm: spec.Assembly): spec.Type[] {
    return Object.values(assm.types || {});
}

function _allMethods(assm: spec.Assembly): spec.Method[] {
    const methods = new Array<spec.Method>();
    for (const type of _allTypes(assm)) {
        if (!spec.isClassOrInterfaceType(type)) { continue; }
        if (!type.methods) { continue; }
        type.methods.forEach(method => methods.push(method));
    }
    return methods;
}

function _allProperties(assm: spec.Assembly): spec.Property[] {
    const properties = new Array<spec.Property>();
    for (const type of _allTypes(assm)) {
        if (!spec.isClassOrInterfaceType(type)) { continue; }
        if (!type.properties) { continue; }
        type.properties.forEach(property => properties.push(property));
    }
    return properties;
}

function _allMembers(assm: spec.Assembly): Array<spec.Property | spec.Method> {
    return [..._allMethods(assm), ..._allProperties(assm)];
}

function _allTypeReferences(assm: spec.Assembly): spec.NamedTypeReference[] {
    const typeReferences = new Array<spec.NamedTypeReference>();
    for (const type of _allTypes(assm)) {
        if (!spec.isClassOrInterfaceType(type)) { continue; }
        if (spec.isClassType(type) && type.base) {
            typeReferences.push(type.base);
        }
        if (type.interfaces) {
            type.interfaces.forEach(iface => typeReferences.push(iface));
        }
    }
    for (const prop of _allProperties(assm)) {
        _collectTypeReferences(prop.type);
    }
    for (const meth of _allMethods(assm)) {
        if (meth.returns) {
            _collectTypeReferences(meth.returns);
        }
        for (const param of meth.parameters || []) {
            _collectTypeReferences(param.type);
        }
    }
    return typeReferences;

    function _collectTypeReferences(type: spec.TypeReference): void {
        if (spec.isNamedTypeReference(type)) {
            typeReferences.push(type);
        } else if (spec.isCollectionTypeReference(type)) {
            _collectTypeReferences(type.collection.elementtype);
        } else if (spec.isUnionTypeReference(type)) {
            type.union.types.forEach(t => _collectTypeReferences(t));
        }
    }
}

function _dereference(typeRef: spec.NamedTypeReference, assembly: spec.Assembly, validator: Validator): spec.Type | undefined {
    const [assm, ] = typeRef.fqn.split('.');
    if (assembly.name === assm) {
        return assembly.types && assembly.types[typeRef.fqn];
    }
    const foreignAssm = validator.projectInfo.transitiveDependencies.find(dep => dep.name === assm);
    return foreignAssm && foreignAssm.types && foreignAssm.types[typeRef.fqn];
}

function _isEmpty(array: undefined | any[]): array is undefined {
    return array == null || array.length === 0;
}
