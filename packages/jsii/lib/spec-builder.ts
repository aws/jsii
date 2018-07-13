import spec = require('jsii-spec');

export function newAssembly(): spec.Assembly {
    return {
        schema: spec.SchemaVersion.V1_0,
        name: '',
        version: '',
        fingerprint: '',
        targets: {},
        docs: undefined,
        types: {},
        dependencies: undefined,
        bundled: undefined,
        externals: undefined,
    };
}

export function newClassType(): spec.ClassType {
    return newType(spec.TypeKind.Class);
}

export function newEnumType(): spec.EnumType {
    return newType(spec.TypeKind.Enum);
}

export function newInterfaceType(): spec.InterfaceType {
    return newType(spec.TypeKind.Interface);
}

function newType(kind: spec.TypeKind.Class): spec.ClassType;
function newType(kind: spec.TypeKind.Interface): spec.InterfaceType;
function newType(kind: spec.TypeKind.Enum): spec.EnumType;
function newType(kind: spec.TypeKind): spec.Type {
    const commonInfo: spec.Type = {
        kind,
        fqn: '',
        name: '',
        module: '',
        docs: undefined
    };

    switch (kind) {
    case spec.TypeKind.Class:
        const classType: spec.ClassType = { ...commonInfo, kind };
        return classType;
    case spec.TypeKind.Interface:
        const ifaceType: spec.InterfaceType = { ...commonInfo, kind };
        return ifaceType;
    case spec.TypeKind.Enum:
        const enumType: spec.EnumType = { ...commonInfo, kind, members: [] };
        return enumType;
    default:
        return { ...commonInfo };
    }
}

export function newMethod(): spec.Method {
    return {
        name: undefined,
        docs: {},
        parameters: [],
        protected: undefined,
        abstract: undefined,
        initializer: undefined,
    };
}

export function newParameter(): spec.Parameter {
    return {
        name: '',
        docs: {},
        type: {},
    };
}

export function newProperty(): spec.Property {
    return {
        name: '',
        docs: {},
        type: {},
        static: undefined,
        abstract: undefined,
        immutable: undefined,
    };
}
