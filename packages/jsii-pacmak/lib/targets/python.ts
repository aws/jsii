import path = require('path');

import { CodeMaker, toSnakeCase } from 'codemaker';
import * as escapeStringRegexp from 'escape-string-regexp';
import * as spec from 'jsii-spec';
import { Generator, GeneratorOptions } from '../generator';
import { Target, TargetOptions } from '../target';
import { shell } from '../util';

export default class Python extends Target {
    protected readonly generator = new PythonGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public async build(sourceDir: string, outDir: string): Promise<void> {
        // Format our code to make it easier to read, we do this here instead of trying
        // to do it in the code generation phase, because attempting to mix style and
        // function makes the code generation harder to maintain and read, while doing
        // this here is easy.
        // await shell("black", ["--py36", sourceDir], {});

        // Actually package up our code, both as a sdist and a wheel for publishing.
        await shell("python3", ["setup.py", "sdist", "--dist-dir", outDir], { cwd: sourceDir });
        await shell("python3", ["setup.py", "bdist_wheel", "--dist-dir", outDir], { cwd: sourceDir });
    }
}

// ##################
// # CODE GENERATOR #
// ##################

const PYTHON_BUILTIN_TYPES = ["bool", "str", "None"];

const PYTHON_KEYWORDS = [
    "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class",
    "continue", "def", "del", "elif", "else", "except", "finally", "for", "from",
    "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass",
    "raise", "return", "try", "while", "with", "yield"
];

const pythonModuleNameToFilename = (name: string): string => {
    return name.replace(/\./g, "/");
};

const toPythonIdentifier = (name: string): string => {
    if (PYTHON_KEYWORDS.indexOf(name) > -1) {
        return name + "_";
    }

    return name;
};

const toPythonMethodName = (name: string, protectedItem: boolean = false): string => {
    let value = toPythonIdentifier(toSnakeCase(name));
    if (protectedItem) {
        value = "_" + value;
    }
    return value;
};

const toPythonPropertyName = (name: string, constant: boolean = false, protectedItem: boolean = false): string => {
    let value = toPythonIdentifier(toSnakeCase(name));

    if (constant) {
        value = value.toUpperCase();
    }

    if (protectedItem) {
        value = "_" + value;
    }

    return value;
};

const toPythonParameterName = (name: string): string => {
    return toPythonIdentifier(toSnakeCase(name));
};

const setDifference = (setA: Set<any>, setB: Set<any>): Set<any> => {
    const difference = new Set(setA);
    for (const elem of setB) {
        difference.delete(elem);
    }
    return difference;
};

const sortMembers = (sortable: PythonBase[], resolver: TypeResolver): PythonBase[] => {
    const sorted: PythonBase[] = [];
    const seen: Set<PythonBase> = new Set();

    // We're going to take a copy of our sortable item, because it'll make it easier if
    // this method doesn't have side effects.
    sortable = sortable.slice();

    // The first thing we want to do, is push any item which is not sortable to the very
    // front of the list. This will be things like methods, properties, etc.
    for (const item of sortable) {
        if (!isSortableType(item)) {
            sorted.push(item);
            seen.add(item);
        }
    }
    sortable = sortable.filter(i => !seen.has(i));

    // Now that we've pulled out everything that couldn't possibly have dependencies,
    // we will go through the remaining items, and pull off any items which have no
    // dependencies that we haven't already sorted.
    while (sortable.length > 0) {
        for (const item of (sortable as Array<PythonBase & ISortableType>)) {
            const itemDeps: Set<PythonBase> = new Set(item.dependsOn(resolver));
            if (setDifference(itemDeps, seen).size === 0) {
                sorted.push(item);
                seen.add(item);

                break;
            }
        }

        const leftover = sortable.filter(i => !seen.has(i));
        if (leftover.length === sortable.length) {
            throw new Error("Could not sort members (circular dependency?).");
        } else {
            sortable = leftover;
        }
    }

    return sorted;
};

const recurseForNamedTypeReferences = (typeRef: spec.TypeReference): spec.NamedTypeReference[] => {
    if (spec.isPrimitiveTypeReference(typeRef)) {
        return [];
    } else if (spec.isCollectionTypeReference(typeRef)) {
        return recurseForNamedTypeReferences(typeRef.collection.elementtype);
    } else if (spec.isNamedTypeReference(typeRef)) {
        return [typeRef];
    } else if (typeRef.union) {
        const types: spec.NamedTypeReference[] = [];
        for (const type of typeRef.union.types) {
            types.push(...recurseForNamedTypeReferences(type));
        }
        return types;
    } else {
        throw new Error("Invalid type reference: " + JSON.stringify(typeRef));
    }
};

interface PythonBase {
    readonly name: string;

    emit(code: CodeMaker, resolver: TypeResolver, opts?: any): void;
}

interface PythonType extends PythonBase {
    // The JSII FQN for this item, if this item doesn't exist as a JSII type, then it
    // doesn't have a FQN and it should be null;
    readonly fqn: string | null;

    addMember(member: PythonBase): void;
}

interface ISortableType {
    dependsOn(resolver: TypeResolver): PythonType[];
}

function isSortableType(arg: any): arg is ISortableType {
    return arg.dependsOn !== undefined;
}

interface PythonTypeOpts {
    bases?: spec.TypeReference[];
}

abstract class BasePythonClassType implements PythonType, ISortableType {

    public readonly name: string;
    public readonly fqn: string | null;

    protected bases: spec.TypeReference[];
    protected members: PythonBase[];

    constructor(name: string, fqn: string, opts: PythonTypeOpts) {
        const {
            bases = [],
        } = opts;

        this.name = name;
        this.fqn = fqn;
        this.bases = bases;
        this.members = [];
    }

    public dependsOn(resolver: TypeResolver): PythonType[] {
        const dependencies: PythonType[] = [];
        const parent = resolver.getParent(this.fqn!);

        // We need to return any bases that are in the same module at the same level of
        // nesting.
        const seen: Set<string> = new Set();
        for (const base of this.bases) {
            if (spec.isNamedTypeReference(base)) {
                if (resolver.isInModule(base)) {
                    // Given a base, we need to locate the base's parent that is the same as
                    // our parent, because we only care about dependencies that are at the
                    // same level of our own.
                    // TODO: We might need to recurse into our members to also find their
                    //       dependencies.
                    let baseItem = resolver.getType(base);
                    let baseParent = resolver.getParent(base);
                    while (baseParent !== parent) {
                        baseItem = baseParent;
                        baseParent = resolver.getParent(baseItem.fqn!);
                    }

                    if (!seen.has(baseItem.fqn!)) {
                        dependencies.push(baseItem);
                        seen.add(baseItem.fqn!);
                    }
                }
            }
        }

        return dependencies;
    }

    public addMember(member: PythonBase) {
        this.members.push(member);
    }

    public emit(code: CodeMaker, resolver: TypeResolver) {
        const classParams = this.getClassParams(resolver);
        const bases = classParams.length > 0 ? `(${classParams.join(", ")})` : "";

        code.openBlock(`class ${this.name}${bases}`);

        this.emitPreamble(code, resolver);

        if (this.members.length > 0) {
            resolver = this.fqn ? resolver.bind(this.fqn) : resolver;
            for (const member of sortMembers(this.members, resolver)) {
                member.emit(code, resolver);
            }
        } else {
            code.line("pass");
        }

        code.closeBlock();
    }

    protected abstract getClassParams(resolver: TypeResolver): string[];

    protected emitPreamble(_code: CodeMaker, _resolver: TypeResolver) { return; }
}

interface BaseMethodOpts {
    abstract?: boolean;
    liftedProp?: spec.InterfaceType,
    parent?: spec.NamedTypeReference,
}

interface BaseMethodEmitOpts {
    renderAbstract?: boolean;
    forceEmitBody?: boolean;
}

abstract class BaseMethod implements PythonBase {

    public readonly name: string;
    public readonly abstract: boolean;

    protected readonly abstract implicitParameter: string;
    protected readonly jsiiMethod: string;
    protected readonly decorator?: string;
    protected readonly classAsFirstParameter: boolean = false;
    protected readonly returnFromJSIIMethod: boolean = true;
    protected readonly shouldEmitBody: boolean = true;

    private readonly jsName?: string;
    private readonly parameters: spec.Parameter[];
    private readonly returns?: spec.TypeReference;
    private readonly liftedProp?: spec.InterfaceType;
    private readonly parent?: spec.NamedTypeReference;

    constructor(name: string,
                jsName: string | undefined,
                parameters: spec.Parameter[],
                returns?: spec.TypeReference,
                opts: BaseMethodOpts = {}) {
        const { abstract = false } = opts;

        this.name = name;
        this.abstract = abstract;
        this.jsName = jsName;
        this.parameters = parameters;
        this.returns = returns;
        this.liftedProp = opts.liftedProp;
        this.parent = opts.parent;
    }

    public emit(code: CodeMaker, resolver: TypeResolver, opts?: BaseMethodEmitOpts) {
        const { renderAbstract = true, forceEmitBody = false } = opts || {};

        let returnType: string;
        if (this.returns !== undefined) {
            returnType = resolver.resolve(this.returns, { forwardReferences: false });
        } else {
            returnType = "None";
        }

        // We cannot (currently?) trust the JSII to accurately tell us whether a
        // parameter is truly optional or not. Because of that, we have to selectively
        // choose when we're going to respect the optional flag and emit a default value
        // to only be at the tail end of the method signature.
        // See: https://github.com/awslabs/jsii/issues/284
        let optionalStartsAt: number | undefined;
        for (const [idx, param] of this.parameters.entries()) {
            if (param.type.optional && optionalStartsAt === undefined) {
                optionalStartsAt = idx;
            } else if (!param.type.optional) {
                optionalStartsAt = undefined;
            }
        }

        // We cannot (currently?) blindly use the names given to us by the JSII for
        // initializers, because our keyword lifting will allow two names to clash.
        // This can hopefully be removed once we get https://github.com/awslabs/jsii/issues/288
        // resolved, so build up a list of all of the prop names so we can check against
        // them later.
        const liftedPropNames: Set<string> = new Set();
        if (this.liftedProp !== undefined
                && this.liftedProp.properties !== undefined
                && this.liftedProp.properties.length >= 1) {
            for (const prop of this.liftedProp.properties) {
                liftedPropNames.add(toPythonParameterName(prop.name));
            }
        }

        // We need to turn a list of JSII parameters, into Python style arguments with
        // gradual typing, so we'll have to iterate over the list of parameters, and
        // build the list, converting as we go.
        const pythonParams: string[] = [this.implicitParameter];
        for (const [idx, param] of this.parameters.entries()) {
            // We cannot (currently?) blindly use the names given to us by the JSII for
            // initializers, because our keyword lifting will allow two names to clash.
            // This can hopefully be removed once we get https://github.com/awslabs/jsii/issues/288
            // resolved.
            let paramName: string = toPythonParameterName(param.name);
            while (liftedPropNames.has(paramName)) {
                paramName = `${paramName}_`;
            }

            const paramType = resolver.resolve(param.type, { forwardReferences: false});
            const paramDefault = optionalStartsAt !== undefined && idx >= optionalStartsAt ? "=None" : "";

            pythonParams.push(`${paramName}: ${paramType}${paramDefault}`);
        }

        // If we have a lifted parameter, then we'll drop the last argument to our params
        // and then we'll lift all of the params of the lifted type as keyword arguments
        // to the function.
        if (this.liftedProp !== undefined) {
            // Remove our last item.
            pythonParams.pop();

            if (this.liftedProp.properties !== undefined && this.liftedProp.properties.length >= 1) {
                // All of these parameters are keyword only arguments, so we'll mark them
                // as such.
                pythonParams.push("*");

                // Iterate over all of our props, and reflect them into our params.
                for (const prop of this.liftedProp.properties) {
                    const paramName = toPythonParameterName(prop.name);
                    const paramType = resolver.resolve(prop.type, { forwardReferences: false });
                    const paramDefault = prop.type.optional ? "=None" : "";

                    pythonParams.push(`${paramName}: ${paramType}${paramDefault}`);
                }
            }
        } else if (this.parameters.length >= 1 && this.parameters.slice(-1)[0].variadic) {
            // Another situation we could be in, is that instead of having a plain parameter
            // we have a variadic parameter where we need to expand the last parameter as a
            // *args.
            pythonParams.pop();

            const lastParameter = this.parameters.slice(-1)[0];
            const paramName = toPythonParameterName(lastParameter.name);
            const paramType = resolver.resolve(
                lastParameter.type,
                { forwardReferences: false, ignoreOptional: true },
            );

            pythonParams.push(`*${paramName}: ${paramType}`);
        }

        if (this.jsName !== undefined) {
            code.line(`@jsii.member(jsii_name="${this.jsName}")`);
        }

        if (this.decorator !== undefined) {
            code.line(`@${this.decorator}`);
        }

        if (renderAbstract && this.abstract) {
            code.line("@abc.abstractmethod");
        }

        code.openBlock(`def ${this.name}(${pythonParams.join(", ")}) -> ${returnType}`);
        this.emitBody(code, resolver, renderAbstract, forceEmitBody);
        code.closeBlock();
    }

    private emitBody(code: CodeMaker, resolver: TypeResolver, renderAbstract: boolean, forceEmitBody: boolean) {
        if ((!this.shouldEmitBody && !forceEmitBody) || (renderAbstract && this.abstract)) {
            code.line("...");
        } else {
            if (this.liftedProp !== undefined) {
                this.emitAutoProps(code, resolver);
            }

            this.emitJsiiMethodCall(code, resolver);
        }
    }

    private emitAutoProps(code: CodeMaker, resolver: TypeResolver) {
        const lastParameter = this.parameters.slice(-1)[0];
        const argName = toPythonParameterName(lastParameter.name);
        const typeName = resolver.resolve(lastParameter.type, {ignoreOptional: true });

        // We need to build up a list of properties, which are mandatory, these are the
        // ones we will specifiy to start with in our dictionary literal.
        const mandatoryPropMembers: string[] = [];
        for (const prop of this.liftedProp!.properties || []) {
            if (prop.type.optional) {
                continue;
            }

            mandatoryPropMembers.push(`"${prop.name}": ${toPythonParameterName(prop.name)}`);
        }
        code.line(`${argName}: ${typeName} = {${mandatoryPropMembers.join(", ")}}`);
        code.line();

        // Now we'll go through our optional properties, and if they haven't been set
        // we'll add them to our dictionary.
        for (const prop of this.liftedProp!.properties || []) {
            if (!prop.type.optional) {
                continue;
            }

            code.openBlock(`if ${toPythonParameterName(prop.name)} is not None`);
            code.line(`${argName}["${prop.name}"] = ${toPythonParameterName(prop.name)}`);
            code.closeBlock();
        }
    }

    private emitJsiiMethodCall(code: CodeMaker, resolver: TypeResolver) {
        const methodPrefix: string = this.returnFromJSIIMethod ? "return " : "";

        const jsiiMethodParams: string[] = [];
        if (this.classAsFirstParameter) {
            if (this.parent === undefined) {
                throw new Error("Parent not known.");
            }
            jsiiMethodParams.push(resolver.resolve(this.parent));
        }
        jsiiMethodParams.push(this.implicitParameter);
        if (this.jsName !== undefined) {
            jsiiMethodParams.push(`"${this.jsName}"`);
        }

        const paramNames: string[] = [];
        for (const param of this.parameters) {
            paramNames.push(toPythonParameterName(param.name));
        }

        code.line(`${methodPrefix}jsii.${this.jsiiMethod}(${jsiiMethodParams.join(", ")}, [${paramNames.join(", ")}])`);
    }
}

interface BasePropertyOpts {
    abstract?: boolean;
    immutable?: boolean;
}

interface BasePropertyEmitOpts {
    renderAbstract?: boolean;
    forceEmitBody?: boolean;
}

abstract class BaseProperty implements PythonBase {

    public readonly name: string;
    public readonly abstract: boolean;

    protected readonly abstract decorator: string;
    protected readonly abstract implicitParameter: string;
    protected readonly jsiiGetMethod: string;
    protected readonly jsiiSetMethod: string;
    protected readonly shouldEmitBody: boolean = true;

    private readonly jsName: string;
    private readonly type: spec.TypeReference;
    private readonly immutable: boolean;

    constructor(name: string, jsName: string, type: spec.TypeReference, opts: BasePropertyOpts = {}) {
        const {
            abstract = false,
            immutable = false,
        } = opts;

        this.name = name;
        this.abstract = abstract;
        this.jsName = jsName;
        this.type = type;
        this.immutable = immutable;
    }

    public emit(code: CodeMaker, resolver: TypeResolver, opts?: BasePropertyEmitOpts) {
        const { renderAbstract = true, forceEmitBody = false } = opts || {};
        const pythonType = resolver.resolve(this.type, { forwardReferences: false });

        code.line(`@${this.decorator}`);
        code.line(`@jsii.member(jsii_name="${this.jsName}")`);
        if (renderAbstract && this.abstract) {
            code.line("@abc.abstractmethod");
        }
        code.openBlock(`def ${this.name}(${this.implicitParameter}) -> ${pythonType}`);
        if ((this.shouldEmitBody || forceEmitBody) && (!renderAbstract || !this.abstract)) {
            code.line(`return jsii.${this.jsiiGetMethod}(${this.implicitParameter}, "${this.jsName}")`);
        } else {
            code.line("...");
        }
        code.closeBlock();

        if (!this.immutable) {
            code.line(`@${this.name}.setter`);
            if (renderAbstract && this.abstract) {
                code.line("@abc.abstractmethod");
            }
            code.openBlock(`def ${this.name}(${this.implicitParameter}, value: ${pythonType})`);
            if ((this.shouldEmitBody || forceEmitBody) && (!renderAbstract || !this.abstract)) {
                code.line(`return jsii.${this.jsiiSetMethod}(${this.implicitParameter}, "${this.jsName}", value)`);
            } else {
                code.line("...");
            }
            code.closeBlock();
        }
    }
}

class Interface extends BasePythonClassType {

    public emit(code: CodeMaker, resolver: TypeResolver) {
        code.line(`@jsii.interface(jsii_type="${this.fqn}")`);

        // First we do our normal class logic for emitting our members.
        super.emit(code, resolver);

        // Then, we have to emit a Proxy class which implements our proxy interface.
        resolver = this.fqn ? resolver.bind(this.fqn) : resolver;
        const proxyBases: string[] = this.bases.map(b => `jsii.proxy_for(${resolver.resolve(b)})`);
        code.openBlock(`class ${this.getProxyClassName()}(${proxyBases.join(", ")})`);
        code.line(`__jsii_type__ = "${this.fqn}"`);

        if (this.members.length > 0) {
            for (const member of this.members) {
                member.emit(code, resolver, { forceEmitBody: true });
            }
        } else {
            code.line("pass");
        }

        code.closeBlock();
    }

    protected getClassParams(resolver: TypeResolver): string[] {
        const params: string[] = this.bases.map(b => resolver.resolve(b));

        params.push("jsii.compat.Protocol");

        return params;
    }

    protected emitPreamble(code: CodeMaker, _resolver: TypeResolver) {
        code.line("@staticmethod");
        code.openBlock("def __jsii_proxy_class__()");
        code.line(`return ${this.getProxyClassName()}`);
        code.closeBlock();
    }

    private getProxyClassName(): string {
        return `_${this.name}Proxy`;
    }

}

class InterfaceMethod extends BaseMethod {
    protected readonly implicitParameter: string = "self";
    protected readonly jsiiMethod: string = "invoke";
    protected readonly shouldEmitBody: boolean = false;
}

class InterfaceProperty extends BaseProperty {
    protected readonly decorator: string = "property";
    protected readonly implicitParameter: string = "self";
    protected readonly jsiiGetMethod: string = "get";
    protected readonly jsiiSetMethod: string = "set";
    protected readonly shouldEmitBody: boolean = false;
}

class TypedDict extends BasePythonClassType {

    public emit(code: CodeMaker, resolver: TypeResolver) {
        resolver = this.fqn ? resolver.bind(this.fqn) : resolver;

        // MyPy doesn't let us mark some keys as optional, and some keys as mandatory,
        // we can either mark either the entire class as mandatory or the entire class
        // as optional. However, we can make two classes, one with all mandatory keys
        // and one with all optional keys in order to emulate this. So we'll go ahead
        // and implement this "split" class logic.

        const classParams = this.getClassParams(resolver);

        const mandatoryMembers = this.members.filter(
            item => item instanceof TypedDictProperty ? !item.optional : true
        );
        const optionalMembers = this.members.filter(
            item => item instanceof TypedDictProperty ? item.optional : false
        );

        if (mandatoryMembers.length >= 1 && optionalMembers.length >= 1) {
            // In this case, we have both mandatory *and* optional members, so we'll
            // do our split class logic.

            // We'll emit the optional members first, just because it's a little nicer
            // for the final class in the chain to have the mandatory members.
            code.openBlock(`class _${this.name}(${classParams.concat(["total=False"]).join(", ")})`);
            for (const member of optionalMembers) {
                member.emit(code, resolver);
            }
            code.closeBlock();

            // Now we'll emit the mandatory members.
            code.line(`@jsii.data_type(jsii_type="${this.fqn}")`);
            code.openBlock(`class ${this.name}(_${this.name})`);
            for (const member of sortMembers(mandatoryMembers, resolver)) {
                member.emit(code, resolver);
            }
            code.closeBlock();
        } else {
            code.line(`@jsii.data_type(jsii_type="${this.fqn}")`);

            // In this case we either have no members, or we have all of one type, so
            // we'll see if we have any optional members, if we don't then we'll use
            // total=True instead of total=False for the class.
            if (optionalMembers.length >= 1) {
                code.openBlock(`class ${this.name}(${classParams.concat(["total=False"]).join(", ")})`);
            } else {
                code.openBlock(`class ${this.name}(${classParams.join(", ")})`);
            }

            // Finally we'll just iterate over and emit all of our members.
            if (this.members.length > 0) {
                for (const member of sortMembers(this.members, resolver)) {
                    member.emit(code, resolver);
                }
            } else {
                code.line("pass");
            }

            code.closeBlock();
        }
    }

    protected getClassParams(resolver: TypeResolver): string[] {
        const params: string[] = this.bases.map(b => resolver.resolve(b));

        params.push("jsii.compat.TypedDict");

        return params;
    }

}

class TypedDictProperty implements PythonBase {

    public readonly name: string;

    private readonly type: spec.TypeReference;

    constructor(name: string, type: spec.TypeReference) {
        this.name = name;
        this.type = type;
    }

    get optional(): boolean {
        return this.type.optional !== undefined ? this.type.optional : false;
    }

    public emit(code: CodeMaker, resolver: TypeResolver) {
        const resolvedType = resolver.resolve(
            this.type,
            { forwardReferences: false, ignoreOptional: true }
        );
        code.line(`${this.name}: ${resolvedType}`);
    }
}

interface ClassOpts extends PythonTypeOpts {
    abstract?: boolean;
    interfaces?: spec.NamedTypeReference[];
    abstractBases?: spec.ClassType[];
}

class Class extends BasePythonClassType {

    private abstract: boolean;
    private abstractBases: spec.ClassType[];
    private interfaces: spec.NamedTypeReference[];

    constructor(name: string, fqn: string, opts: ClassOpts) {
        super(name, fqn, opts);

        const { abstract = false, interfaces = [], abstractBases = [] } = opts;

        this.abstract = abstract;
        this.interfaces = interfaces;
        this.abstractBases = abstractBases;
    }

    public dependsOn(resolver: TypeResolver): PythonType[] {
        const dependencies: PythonType[] = super.dependsOn(resolver);
        const parent = resolver.getParent(this.fqn!);

        // We need to return any ifaces that are in the same module at the same level of
        // nesting.
        const seen: Set<string> = new Set();
        for (const iface of this.interfaces) {
            if (resolver.isInModule(iface)) {
                // Given a iface, we need to locate the ifaces's parent that is the same
                // as our parent, because we only care about dependencies that are at the
                // same level of our own.
                // TODO: We might need to recurse into our members to also find their
                //       dependencies.
                let ifaceItem = resolver.getType(iface);
                let ifaceParent = resolver.getParent(iface);
                while (ifaceParent !== parent) {
                    ifaceItem = ifaceParent;
                    ifaceParent = resolver.getParent(ifaceItem.fqn!);
                }

                if (!seen.has(ifaceItem.fqn!)) {
                    dependencies.push(ifaceItem);
                    seen.add(ifaceItem.fqn!);
                }
            }
        }

        return dependencies;
    }

    public emit(code: CodeMaker, resolver: TypeResolver) {
        // First we emit our implments decorator
        if (this.interfaces.length > 0) {
            const interfaces: string[] = this.interfaces.map(b => resolver.resolve(b));
            code.line(`@jsii.implements(${interfaces.join(", ")})`);
        }

        // Then we do our normal class logic for emitting our members.
        super.emit(code, resolver);

        // Then, if our class is Abstract, we have to go through and redo all of
        // this logic, except only emiting abstract methods and properties as non
        // abstract, and subclassing our initial class.
        if (this.abstract) {
            resolver = this.fqn ? resolver.bind(this.fqn) : resolver;

            const proxyBases: string[] = [this.name];
            for (const base of this.abstractBases) {
                proxyBases.push(`jsii.proxy_for(${resolver.resolve(base)})`);
            }

            code.openBlock(`class ${this.getProxyClassName()}(${proxyBases.join(', ')})`);

            // Filter our list of members to *only* be abstract members, and not any
            // other types.
            const abstractMembers = this.members.filter(
                m => (m instanceof BaseMethod || m instanceof BaseProperty) && m.abstract
            );
            if (abstractMembers.length > 0) {
                for (const member of abstractMembers) {
                    member.emit(code, resolver, { renderAbstract: false });
                }
            } else {
                code.line("pass");
            }

            code.closeBlock();
        }
    }

    protected emitPreamble(code: CodeMaker, _resolver: TypeResolver) {
        if (this.abstract) {
            code.line("@staticmethod");
            code.openBlock("def __jsii_proxy_class__()");
            code.line(`return ${this.getProxyClassName()}`);
            code.closeBlock();
        }
    }

    protected getClassParams(resolver: TypeResolver): string[] {
        const params: string[] = this.bases.map(b => resolver.resolve(b));
        const metaclass: string = this.abstract ? "JSIIAbstractClass" : "JSIIMeta";

        params.push(`metaclass=jsii.${metaclass}`);
        params.push(`jsii_type="${this.fqn}"`);

        return params;
    }

    private getProxyClassName(): string {
        return `_${this.name}Proxy`;
    }
}

class StaticMethod extends BaseMethod {
    protected readonly decorator?: string = "classmethod";
    protected readonly implicitParameter: string = "cls";
    protected readonly jsiiMethod: string = "sinvoke";
}

class Initializer extends BaseMethod {
    protected readonly implicitParameter: string = "self";
    protected readonly jsiiMethod: string = "create";
    protected readonly classAsFirstParameter: boolean = true;
    protected readonly returnFromJSIIMethod: boolean = false;
}

class Method extends BaseMethod {
    protected readonly implicitParameter: string = "self";
    protected readonly jsiiMethod: string = "invoke";
}

class AsyncMethod extends BaseMethod {
    protected readonly implicitParameter: string = "self";
    protected readonly jsiiMethod: string = "ainvoke";
}

class StaticProperty extends BaseProperty {
    protected readonly decorator: string = "classproperty";
    protected readonly implicitParameter: string = "cls";
    protected readonly jsiiGetMethod: string = "sget";
    protected readonly jsiiSetMethod: string = "sset";
}

class Property extends BaseProperty {
    protected readonly decorator: string = "property";
    protected readonly implicitParameter: string = "self";
    protected readonly jsiiGetMethod: string = "get";
    protected readonly jsiiSetMethod: string = "set";
}

class Enum extends BasePythonClassType {

    public emit(code: CodeMaker, resolver: TypeResolver) {
        code.line(`@jsii.enum(jsii_type="${this.fqn}")`);
        return super.emit(code, resolver);
    }

    protected getClassParams(_resolver: TypeResolver): string[] {
        return ["enum.Enum"];
    }

}

class EnumMember implements PythonBase {

    public readonly name: string;

    private readonly value: string;

    constructor(name: string, value: string) {
        this.name = name;
        this.value = value;
    }

    public emit(code: CodeMaker, _resolver: TypeResolver) {
        code.line(`${this.name} = "${this.value}"`);
    }
}

class Namespace extends BasePythonClassType {
    protected getClassParams(_resolver: TypeResolver): string[] {
        return [];
    }
}

interface ModuleOpts {
    assembly: spec.Assembly,
    assemblyFilename: string;
    loadAssembly: boolean;
}

class Module implements PythonType {

    public readonly name: string;
    public readonly fqn: string | null;

    private assembly: spec.Assembly;
    private assemblyFilename: string;
    private loadAssembly: boolean;
    private members: PythonBase[];

    constructor(name: string, fqn: string | null, opts: ModuleOpts) {
        this.name = name;
        this.fqn = fqn;

        this.assembly = opts.assembly;
        this.assemblyFilename = opts.assemblyFilename;
        this.loadAssembly = opts.loadAssembly;
        this.members = [];
    }

    public addMember(member: PythonBase) {
        this.members.push(member);
    }

    public emit(code: CodeMaker, resolver: TypeResolver) {
        resolver = this.fqn ? resolver.bind(this.fqn, this.name) : resolver;

        // Before we write anything else, we need to write out our module headers, this
        // is where we handle stuff like imports, any required initialization, etc.
        code.line("import abc");
        code.line("import datetime");
        code.line("import enum");
        code.line("import typing");
        code.line();
        code.line("import jsii");
        code.line("import jsii.compat");
        code.line("import publication");
        code.line();
        code.line("from jsii.python import classproperty");

        // Go over all of the modules that we need to import, and import them.
        this.emitDependencyImports(code, resolver);

        // Determine if we need to write out the kernel load line.
        if (this.loadAssembly) {
            code.line(
                `__jsii_assembly__ = jsii.JSIIAssembly.load(` +
                `"${this.assembly.name}", ` +
                `"${this.assembly.version}", ` +
                `__name__, ` +
                `"${this.assemblyFilename}")`
            );
        }

        // Emit all of our members.
        for (const member of sortMembers(this.members, resolver)) {
            member.emit(code, resolver);
        }

        // Whatever names we've exported, we'll write out our __all__ that lists them.
        const exportedMembers = this.members.map(m => `"${m.name}"`);
        if (this.loadAssembly) {
            exportedMembers.push(`"__jsii_assembly__"`);
        }
        code.line(`__all__ = [${exportedMembers.sort().join(", ")}]`);

        // Finally, we'll use publication to ensure that all of the non-public names
        // get hidden from dir(), tab-complete, etc.
        code.line();
        code.line("publication.publish()");
    }

    private emitDependencyImports(code: CodeMaker, _resolver: TypeResolver) {
        const deps = Array.from(
            new Set([
                ...Object.values(this.assembly.dependencies || {}).map(d => {
                    return (d as spec.PackageVersion).targets!.python!.module;
                }),
            ])
        );

        for (const [idx, moduleName] of deps.sort().entries()) {
            // If this our first dependency, add a blank line to format our imports
            // slightly nicer.
            if (idx === 0) {
                code.line();
            }

            code.line(`import ${moduleName}`);
        }
    }
}

interface PackageData {
    filename: string;
    data: string | null;
}

class Package {

    public readonly name: string;
    public readonly version: string;
    public readonly metadata: spec.Assembly;

    private modules: Map<string, Module>;
    private data: Map<string, PackageData[]>;

    constructor(name: string, version: string, metadata: spec.Assembly) {
        this.name = name;
        this.version = version;
        this.metadata = metadata;

        this.modules = new Map();
        this.data = new Map();
    }

    public addModule(module: Module) {
        this.modules.set(module.name, module);
    }

    public addData(module: Module, filename: string, data: string | null) {
        if (!this.data.has(module.name)) {
            this.data.set(module.name, new Array());
        }

        this.data.get(module.name)!.push({filename, data});
    }

    public write(code: CodeMaker, resolver: TypeResolver) {
        const modules = [...this.modules.values()].sort((a, b) => a.name.localeCompare(b.name));

        // Iterate over all of our modules, and write them out to disk.
        for (const mod of modules) {
            const filename = path.join("src", pythonModuleNameToFilename(mod.name), "__init__.py");

            code.openFile(filename);
            mod.emit(code, resolver);
            code.closeFile(filename);
        }

        // Handle our package data.
        const packageData: {[key: string]: string[]} = {};
        for (const [mod, pdata] of this.data) {
            for (const data of pdata) {
                if (data.data != null) {
                    const filepath = path.join("src", pythonModuleNameToFilename(mod), data.filename);

                    code.openFile(filepath);
                    code.line(data.data);
                    code.closeFile(filepath);
                }
            }

            packageData[mod] = pdata.map(pd => pd.filename);
        }

        // Compute our list of dependencies
        const dependencies: string[] = [];
        const expectedDeps = this.metadata.dependencies || {};
        for (const depName of Object.keys(expectedDeps)) {
            const depInfo = expectedDeps[depName];
            if (depInfo.peer) {
                // We need to figure out what our version range is.
                // Basically, if it starts with Zero we want to restrict things to
                // ~=X.Y.Z. If it does not start with zero, then we want to do ~=X.Y,>=X.Y.Z.
                const versionParts = depInfo.version.split(".");
                let versionSpecifier: string;
                if (versionParts[0] === "0") {
                    versionSpecifier = `~=${versionParts.slice(0, 3).join(".")}`;
                } else {
                    versionSpecifier = `~=${versionParts.slice(0, 2).join(".")},>=${versionParts.slice(0, 3).join(".")}`;
                }

                dependencies.push(`${depInfo.targets!.python!.distName}${versionSpecifier}`);
            }
        }

        code.openFile("README.md");
        code.line(this.metadata.readme !== undefined ? this.metadata.readme.markdown : "");
        code.closeFile("README.md");

        const setupKwargs = {
            name: this.name,
            version: this.version,
            description: this.metadata.description,
            url: this.metadata.homepage,
            long_description_content_type: "text/markdown",
            author: this.metadata.author.name + (
                this.metadata.author.email !== undefined ? "<" + this.metadata.author.email + ">" : ""
            ),
            project_urls: {
                Source: this.metadata.repository.url,
            },
            package_dir: {"": "src"},
            packages: modules.map(m => m.name),
            package_data: packageData,
            python_requires: ">=3.6",
            install_requires: ["jsii", "publication>=0.0.3"].concat(dependencies),
        };

        // We Need a setup.py to make this Package, actually a Package.
        // TODO:
        //      - License
        //      - Classifiers
        code.openFile("setup.py");
        code.line("import json");
        code.line("import setuptools");
        code.line();
        code.line('kwargs = json.loads("""');
        code.line(JSON.stringify(setupKwargs, null, 4));
        code.line('""")');
        code.line();
        code.openBlock("with open('README.md') as fp");
        code.line("kwargs['long_description'] = fp.read()");
        code.closeBlock();
        code.line();
        code.line("setuptools.setup(**kwargs)");
        code.closeFile("setup.py");

        // Because we're good citizens, we're going to go ahead and support pyproject.toml
        // as well.
        // TODO: Might be easier to just use a TOML library to write this out.
        code.openFile("pyproject.toml");
        code.line("[build-system]");
        code.line('requires = ["setuptools >= 38.6.0", "wheel >= 0.31.0"]');
        code.line('build-backend = "setuptools.build_meta"');
        code.closeFile("pyproject.toml");

        // We also need to write out a MANIFEST.in to ensure that all of our required
        // files are included.
        code.openFile("MANIFEST.in");
        code.line("include pyproject.toml");
        code.closeFile("MANIFEST.in");
    }
}

type FindModuleCallback = (fqn: string) => spec.Assembly | spec.PackageVersion;

interface TypeResolverOpts {
    forwardReferences?: boolean;
    ignoreOptional?: boolean;
}

class TypeResolver {

    private readonly types: Map<string, PythonType>;
    private boundTo?: string;
    private readonly stdTypesRe = new RegExp("^(datetime\\.datetime|typing\\.[A-Z][a-z]+|jsii\\.Number)$");
    private readonly boundRe: RegExp;
    private readonly moduleName?: string;
    private readonly moduleRe: RegExp;
    private readonly findModule: FindModuleCallback;

    constructor(types: Map<string, PythonType>, findModule: FindModuleCallback, boundTo?: string, moduleName?: string) {
        this.types = types;
        this.findModule = findModule;
        this.moduleName = moduleName;
        this.boundTo = boundTo !== undefined ? this.toPythonFQN(boundTo) : boundTo;

        if (this.moduleName !== undefined) {
            this.moduleRe = new RegExp(`^(${escapeStringRegexp(this.moduleName)})\\.(.+)$`);
        }

        if (this.boundTo !== undefined) {
            this.boundRe = new RegExp(`^(${escapeStringRegexp(this.boundTo)})\\.(.+)$`);
        }
    }

    public bind(fqn: string, moduleName?: string): TypeResolver {
        return new TypeResolver(
            this.types,
            this.findModule,
            fqn,
            moduleName !== undefined ? moduleName : this.moduleName,
        );
    }

    public isInModule(typeRef: spec.NamedTypeReference | string): boolean {
        const pythonType = typeof typeRef !== "string" ? this.toPythonFQN(typeRef.fqn) : typeRef;
        return this.moduleRe.test(pythonType);
    }

    public isInNamespace(typeRef: spec.NamedTypeReference | string): boolean {
        const pythonType = typeof typeRef !== "string" ? this.toPythonFQN(typeRef.fqn) : typeRef;
        return this.boundRe.test(pythonType);
    }

    public getParent(typeRef: spec.NamedTypeReference | string): PythonType {
        const fqn = typeof typeRef !== "string" ? typeRef.fqn : typeRef;
        const [, parentFQN] = fqn.match(/^(.+)\.[^\.]+$/) as string[];
        const parent = this.types.get(parentFQN);

        if (parent === undefined) {
            throw new Error(`Could not find parent:  ${parentFQN}`);
        }

        return parent;
    }

    public getType(typeRef: spec.NamedTypeReference): PythonType {
        const type = this.types.get(typeRef.fqn);

        if (type === undefined) {
            throw new Error(`Could not locate type: "${typeRef.fqn}"`);
        }

        return type;
    }

    public resolve(
            typeRef: spec.TypeReference,
            opts: TypeResolverOpts = { forwardReferences: true, ignoreOptional: false }): string {
        const {
            forwardReferences = true,
        } = opts;

        // First, we need to resolve our given type reference into the Python type.
        let pythonType = this.toPythonType(typeRef, opts.ignoreOptional);

        // If we split our types by any of the "special" characters that can't appear in
        // identifiers (like "[],") then we will get a list of all of the identifiers,
        // no matter how nested they are. The downside is we might get trailing/leading
        // spaces or empty items so we'll need to trim and filter this list.
        const types = pythonType.split(/[\[\],]/).map((s: string) => s.trim()).filter(s => s !== "");

        for (const innerType of types) {
            // Built in types do not need formatted in any particular way.
            if (PYTHON_BUILTIN_TYPES.indexOf(innerType) > -1) {
                continue;
            }

            // These are not exactly built in types, but they're also not types that
            // this resolver has to worry about.
            if (this.stdTypesRe.test(innerType)) {
                continue;
            }

            // If our resolver is bound to the same module as the type we're trying to
            // resolve, then we'll implement the needed logic to use module relative naming
            // and to handle forward references (if needed).
            if (this.isInModule(innerType)) {
                // If our type is part of the same namespace, then we'll return a namespace
                // relative name, otherwise a module relative name.
                let typeName: string;
                if (this.isInNamespace(innerType)) {
                    [, , typeName] = innerType.match(this.boundRe) as string[];
                } else {
                    [, , typeName] = innerType.match(this.moduleRe) as string[];
                }

                // This re will look for the entire type, boxed by either the start/end of
                // a string, a comma, a space, a quote, or open/closing brackets. This will
                // ensure that we only match whole type names, and not partial ones.
                const re = new RegExp('((?:^|[[,\\s])"?)' + innerType + '("?(?:$|[\\],\\s]))');

                // We need to handle forward references, our caller knows if we're able to
                // use them in the current context or not, so if not, we'll wrap our forward
                // reference in quotes.
                // We have special logic here for checking if our thing is actually *in*
                // our module, behond what we've already done, because our other logic will
                // work for submodules, but this can't.
                if (!forwardReferences && this.isInModule(innerType)) {
                    pythonType = pythonType.replace(re, `$1"${innerType}"$2`);
                }

                // Now that we've gotten forward references out of the way, we will want
                // to replace the entire type string, with just the type portion.
                pythonType = pythonType.replace(re, `$1${typeName}$2`);
            }
        }

        return pythonType;
    }

    private toPythonType(typeRef: spec.TypeReference, ignoreOptional?: boolean): string {
        let pythonType: string;

        // Get the underlying python type.
        if (spec.isPrimitiveTypeReference(typeRef)) {
            pythonType = this.toPythonPrimitive(typeRef.primitive);
        } else if (spec.isCollectionTypeReference(typeRef)) {
            pythonType = this.toPythonCollection(typeRef);
        } else if (spec.isNamedTypeReference(typeRef)) {
            pythonType = this.toPythonFQN(typeRef.fqn);
        } else if (typeRef.union) {
            const types = new Array<string>();
            for (const subtype of typeRef.union.types) {
                types.push(this.toPythonType(subtype));
            }
            pythonType = `typing.Union[${types.join(", ")}]`;
        } else {
            throw new Error("Invalid type reference: " + JSON.stringify(typeRef));
        }

        // If our type is Optional, then we'll wrap our underlying type with typing.Optional
        // However, if we're not respecting optionals, then we'll just skip over this.
        // We explicitly don't emit this when our type is typing.Any, because typing.Any
        // already implied that None is an accepted type.
        // See: https://github.com/awslabs/jsii/issues/284
        if (!ignoreOptional && typeRef.optional && pythonType !== "typing.Any") {
            pythonType = `typing.Optional[${pythonType}]`;
        }

        return pythonType;
    }

    private toPythonPrimitive(primitive: spec.PrimitiveType): string {
        switch (primitive) {
            case spec.PrimitiveType.Boolean: return "bool";
            case spec.PrimitiveType.Date: return "datetime.datetime";
            case spec.PrimitiveType.Json: return "typing.Mapping[typing.Any, typing.Any]";
            case spec.PrimitiveType.Number: return "jsii.Number";
            case spec.PrimitiveType.String: return "str";
            case spec.PrimitiveType.Any: return "typing.Any";
            default:
                throw new Error("Unknown primitive type: " + primitive);
        }
    }

    private toPythonCollection(ref: spec.CollectionTypeReference): string {
        const elementPythonType = this.toPythonType(ref.collection.elementtype);
        switch (ref.collection.kind) {
            case spec.CollectionKind.Array: return `typing.List[${elementPythonType}]`;
            case spec.CollectionKind.Map: return `typing.Mapping[str,${elementPythonType}]`;
            default:
                throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
        }
    }

    private toPythonFQN(fqn: string): string {
        const [assemblyName, ...qualifiedIdentifiers] = fqn.split(".");
        const fqnParts: string[] = [this.findModule(assemblyName).targets!.python!.module];

        for (const part of qualifiedIdentifiers) {
            fqnParts.push(toPythonIdentifier(part));
        }

        return fqnParts.join(".");
    }
}

class PythonGenerator extends Generator {

    private package: Package;
    private types: Map<string, PythonType>;

    constructor(options = new GeneratorOptions()) {
        super(options);

        this.code.openBlockFormatter = s => `${s}:`;
        this.code.closeBlockFormatter = _s => "";

        this.types = new Map();
    }

    protected getAssemblyOutputDir(assm: spec.Assembly) {
        return path.join("src", pythonModuleNameToFilename(this.getAssemblyModuleName(assm)));
    }

    protected onBeginAssembly(assm: spec.Assembly, _fingerprint: boolean) {
        this.package = new Package(
            assm.targets!.python!.distName,
            assm.version,
            assm,
        );

        const assemblyModule = new Module(
            this.getAssemblyModuleName(assm),
            null,
            { assembly: assm,
              assemblyFilename: this.getAssemblyFileName(),
              loadAssembly: false },
        );

        this.package.addModule(assemblyModule);
        this.package.addData(assemblyModule, this.getAssemblyFileName(), null);
    }

    protected onEndAssembly(_assm: spec.Assembly, _fingerprint: boolean) {
        const resolver = new TypeResolver(this.types, (fqn: string) => this.findModule(fqn));
        this.package.write(this.code, resolver);
    }

    protected onBeginNamespace(ns: string) {
        // If we're generating the Namespace that matches our assembly, then we'll
        // actually be generating a module, otherwise we'll generate a class within
        // that module.
        if (ns === this.assembly.name) {
            const module = new Module(
                this.assembly.targets!.python!.module,
                ns,
                { assembly: this.assembly,
                  assemblyFilename: this.getAssemblyFileName(),
                  loadAssembly: ns === this.assembly.name },
            );

            this.package.addModule(module);
            // Add our py.typed marker to ensure that gradual typing works for this
            // package.
            this.package.addData(module, "py.typed", "");

            this.types.set(ns, module);
        } else {
            // This should be temporary code, which can be removed and turned into an
            // error case once https://github.com/awslabs/jsii/issues/270 and
            // https://github.com/awslabs/jsii/issues/283 are solved.
            this.addPythonType(
                new Namespace(
                    toPythonIdentifier(ns.replace(/^.+\.([^\.]+)$/, "$1")),
                    ns,
                    {},
                ),
            );
        }
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean | undefined) {
        const klass = new Class(
            toPythonIdentifier(cls.name),
            cls.fqn,
            { abstract, bases: cls.base !== undefined ? [cls.base] : [], interfaces: cls.interfaces,
              abstractBases: abstract ? this.getAbstractBases(cls) : [] }
        );

        if (cls.initializer !== undefined) {
            const { parameters = [] } = cls.initializer;

            klass.addMember(
                new Initializer(
                    "__init__",
                    undefined,
                    parameters,
                    cls.initializer.returns,
                    { liftedProp: this.getliftedProp(cls.initializer), parent: cls },
                )
            );
        }

        this.addPythonType(klass);
    }

    protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
        const { parameters = [] } = method;

        this.getPythonType(cls.fqn).addMember(
            new StaticMethod(
                toPythonMethodName(method.name!),
                method.name,
                parameters,
                method.returns,
                { abstract: method.abstract, liftedProp: this.getliftedProp(method) },
            )
        );
    }

    protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
        this.getPythonType(cls.fqn).addMember(
            new StaticProperty(
                toPythonPropertyName(prop.name, prop.const),
                prop.name,
                prop.type,
                { abstract: prop.abstract, immutable: prop.immutable },
            )
        );
    }

    protected onMethod(cls: spec.ClassType, method: spec.Method) {
        const { parameters = [] } = method;

        if (this.isAsyncMethod(method)) {
            this.getPythonType(cls.fqn).addMember(
                new AsyncMethod(
                    toPythonMethodName(method.name!, method.protected),
                    method.name,
                    parameters,
                    method.returns,
                    { abstract: method.abstract, liftedProp: this.getliftedProp(method) },
                )
            );
        } else {
            this.getPythonType(cls.fqn).addMember(
                new Method(
                    toPythonMethodName(method.name!, method.protected),
                    method.name,
                    parameters,
                    method.returns,
                    { abstract: method.abstract, liftedProp: this.getliftedProp(method) },
                )
            );
        }
    }

    protected onProperty(cls: spec.ClassType, prop: spec.Property) {
        this.getPythonType(cls.fqn).addMember(
            new Property(
                toPythonPropertyName(prop.name, prop.const, prop.protected),
                prop.name,
                prop.type,
                { abstract: prop.abstract, immutable: prop.immutable },
            )
        );
    }

    protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
        this.onProperty(cls, prop);
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        let iface: Interface | TypedDict;

        if (ifc.datatype) {
            iface = new TypedDict(
                toPythonIdentifier(ifc.name),
                ifc.fqn,
                { bases: ifc.interfaces },
            );
        } else {
            iface = new Interface(
                toPythonIdentifier(ifc.name),
                ifc.fqn,
                { bases: ifc.interfaces },
            );
        }

        this.addPythonType(iface);
    }

    protected onEndInterface(_ifc: spec.InterfaceType) { return; }

    protected onInterfaceMethod(ifc: spec.InterfaceType, method: spec.Method) {
        const { parameters = [] } = method;

        this.getPythonType(ifc.fqn).addMember(
            new InterfaceMethod(
                toPythonMethodName(method.name!, method.protected),
                method.name,
                parameters,
                method.returns,
                { liftedProp: this.getliftedProp(method) },
            )
        );
    }

    protected onInterfaceProperty(ifc: spec.InterfaceType, prop: spec.Property) {
        let ifaceProperty: InterfaceProperty | TypedDictProperty;

        if (ifc.datatype) {
            ifaceProperty = new TypedDictProperty(
                toPythonIdentifier(prop.name),
                prop.type,
            );
        } else {
            ifaceProperty = new InterfaceProperty(
                toPythonPropertyName(prop.name, prop.const, prop.protected),
                prop.name,
                prop.type,
                { immutable: prop.immutable },
            );
        }

        this.getPythonType(ifc.fqn).addMember(ifaceProperty);
    }

    protected onBeginEnum(enm: spec.EnumType) {
        this.addPythonType(new Enum(toPythonIdentifier(enm.name), enm.fqn, {}));
    }

    protected onEnumMember(enm: spec.EnumType, member: spec.EnumMember) {
        this.getPythonType(enm.fqn).addMember(
            new EnumMember(
                toPythonIdentifier(member.name),
                member.name,
            )
        );
    }

    protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) {
        throw new Error("Unhandled Type: InterfaceMethodOverload");
    }

    protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
        throw new Error("Unhandled Type: MethodOverload");
    }

    protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
        throw new Error("Unhandled Type: StaticMethodOverload");
    }

    private getAssemblyModuleName(assm: spec.Assembly): string {
        return `${assm.targets!.python!.module}._jsii`;
    }

    private getParentFQN(fqn: string): string {
        const m = fqn.match(/^(.+)\.[^\.]+$/);

        if (m === null) {
            throw new Error(`Could not determine parent FQN of: ${fqn}`);
        }

        return m[1];
    }

    private getParent(fqn: string): PythonType {
        return this.getPythonType(this.getParentFQN(fqn));
    }

    private getPythonType(fqn: string): PythonType {
        const type = this.types.get(fqn);

        if (type === undefined) {
            throw new Error(`Could not locate type: "${fqn}"`);
        }

        return type;
    }

    private addPythonType(type: PythonType) {
        if (type.fqn === null) {
            throw new Error("Cannot add a Python type without a FQN.");
        }

        this.getParent(type.fqn).addMember(type);
        this.types.set(type.fqn, type);
    }

    private getliftedProp(method: spec.Method): spec.InterfaceType | undefined {
        // If there are parameters to this method, and if the last parameter's type is
        // a datatype interface, then we want to lift the members of that last paramter
        // as keyword arguments to this function.
        if (method.parameters !== undefined && method.parameters.length >= 1) {
            const lastParameter = method.parameters.slice(-1)[0];
            if (spec.isNamedTypeReference(lastParameter.type)) {
                const lastParameterType = this.findType(lastParameter.type.fqn);
                if (spec.isInterfaceType(lastParameterType) && lastParameterType.datatype) {
                    return lastParameterType;
                }
            }
        }

        return undefined;
    }

    private getAbstractBases(cls: spec.ClassType): spec.ClassType[] {
        const abstractBases: spec.ClassType[] = [];

        if (cls.base !== undefined) {
            const base = this.findType(cls.base.fqn);

            if (!spec.isClassType(base)) {
                throw new Error("Class inheritence that isn't a class?");
            }

            if (base.abstract) {
                abstractBases.push(base);
            }
        }

        return abstractBases;
    }

    private isAsyncMethod(method: spec.Method): boolean {
        return method.returns !== undefined && method.returns.promise !== undefined && method.returns.promise;
    }
}
