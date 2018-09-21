/* tslint:disable */
import path = require('path');
import util = require('util');

import * as spec from 'jsii-spec';
import { Generator, GeneratorOptions } from '../generator';
import { Target, TargetOptions } from '../target';
import { CodeMaker } from 'codemaker';
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
        await shell("black", ["--py36", sourceDir], {});

        return this.copyFiles(sourceDir, outDir);
    }
}

// ##################
// # CODE GENERATOR #
// ##################
const debug = function(o: any) {
    console.log(util.inspect(o, false, null, true));
}


class Module {

    readonly name: string;
    readonly assembly?: spec.Assembly;
    readonly assemblyFilename?: string;

    private buffer: object[];
    private exportedNames: string[];

    constructor(ns: string, assembly?: [spec.Assembly, string]) {
        this.name = ns;

        if (assembly != undefined) {
            this.assembly = assembly[0];
            this.assemblyFilename = assembly[1];
        }

        this.buffer = [];
        this.exportedNames = [];
    }

    // Adds a name to the list of names that this module will export, this will control
    // things like what is listed inside of __all__.
    public exportName(name: string) {
        this.exportedNames.push(name);
    }

    // We're purposely replicating the API of CodeMaker here, because CodeMaker cannot
    // Operate on more than one file at a time, so we have to buffer our calls to
    // CodeMaker, otherwise we can end up in inconsistent state when we get things like:
    //      - onBeginNamespace(foo)
    //      - onBeginNamespace(foo.bar)
    //      - OnEndNamespace(foo.bar)
    //      - Inconsitent State, where we're now back in the scope of foo, but due to
    //        the fact that if we had opened a file in onBeginNamespace(foo), we would
    //        have had to close it for onBeginNamespace(foo.bar), and re-opening it
    //        would overwrite the contents.
    //      - OnEndNamespace(foo)
    // To solve this, we buffer all of the things we *would* have written out via
    // CodeMaker via this API, and then we will just iterate over it in the
    // onEndNamespace event and write it out then.

    public line(...args: any[]) {
        this.buffer.push({method: "line", args: args});
    }

    public indent(...args: any[]) {
        this.buffer.push({method: "indent", args: args});
    }

    public unindent(...args: any[]) {
        this.buffer.push({method: "unindent", args: args});
    }

    public open(...args: any[]) {
        this.buffer.push({method: "open", args: args});
    }

    public close(...args: any[]) {
        this.buffer.push({method: "close", args: args});
    }

    public openBlock(...args: any[]) {
        this.buffer.push({method: "openBlock", args: args});
    }

    public closeBlock(...args: any[]) {
        this.buffer.push({method: "closeBlock", args: args});
    }

    public write(code: CodeMaker) {
        // Before we do Anything, we need to write out our module headers, this is where
        // we handle stuff like imports, any required initialization, etc.
        code.line(
            this.generateImportFrom(
                "jsii.runtime",
                [
                    "JSIIAssembly",
                    "JSIIMeta",
                    "jsii_method",
                    "jsii_property",
                    "jsii_classmethod",
                    "jsii_classproperty",
                ]
            )
        )

        // Determine if we need to write out the kernel load line.
        if (this.assembly && this.assemblyFilename) {
            this.exportName("__jsii_assembly__");
            code.line(`__jsii_assembly__ = _runtime.JSIIAssembly.load("${this.assembly.name}", "${this.assembly.version}", __name__, "${this.assemblyFilename}")`);
        }

        // Now that we've gotten all of the module header stuff done, we need to go
        // through and actually write out the meat of our module.
        for (let buffered of this.buffer) {
            let methodName = (buffered as any)["method"] as string;
            let args = (buffered as any)["args"] as any[];

            (code as any)[methodName](...args);
        }

        // Whatever names we've exported, we'll write out our __all__ that lists them.
        const stringifiedExportedNames = this.exportedNames.sort().map(s => `"${s}"`);
        code.line(`__all__ = [${stringifiedExportedNames.join(", ")}]`);
    }

    private generateImportFrom(from: string, names: string[]): string {
        // Whenever we import something, we want to prefix all of the names we're
        // importing with an underscore to indicate that these names are private. We
        // do this, because otherwise we could get clashes in the names we use, and the
        // names of exported classes.
        const importNames = names.map(n => `${n} as _${n}`);
        return `from ${from} import ${importNames.join(", ")}`;
    }
}

class PythonGenerator extends Generator {

    private moduleStack: Module[];

    constructor(options = new GeneratorOptions()) {
        super(options);

        this.code.openBlockFormatter = s => `${s}:`;
        this.code.closeBlockFormatter = _s => "";

        this.moduleStack = [];
    }

    protected getAssemblyOutputDir(mod: spec.Assembly) {
        return path.join("src", this.toPythonModuleName(mod.name), "_jsii");
    }

    protected onBeginAssembly(assm: spec.Assembly, _fingerprint: boolean) {
        debug("onBeginAssembly");

        // We need to write out an __init__.py for our _jsii package so that
        // importlib.resources will be able to load our assembly from it.
        const assemblyInitFilename = path.join(this.getAssemblyOutputDir(assm), "__init__.py");

        this.code.openFile(assemblyInitFilename);
        this.code.closeFile(assemblyInitFilename);
    }

    protected onBeginNamespace(ns: string) {
        debug(`onBeginNamespace: ${ns}`);

        const moduleName = this.toPythonModuleName(ns);
        const loadAssembly = this.assembly.name == ns ? true : false;

        let moduleArgs: any[] = [];

        if (loadAssembly) {
            moduleArgs.push([this.assembly, this.getAssemblyFileName()]);
        }

        this.moduleStack.push(new Module(moduleName, ...moduleArgs));
    }

    protected onEndNamespace(ns: string) {
        debug(`onEndNamespace: ${ns}`);

        let module = this.moduleStack.pop() as Module;
        let moduleFilename = path.join("src", this.toPythonModuleFilename(module.name), "__init__.py");

        this.code.openFile(moduleFilename);
        module.write(this.code);
        this.code.closeFile(moduleFilename);
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean | undefined) {
        debug("onBeginClass");

        // TODO: Figure out what to do with abstract here.
        abstract;

        this.currentModule().exportName(cls.name);
        this.currentModule().openBlock(`class ${cls.name}(metaclass=_JSIIMeta, jsii_type="${cls.fqn}")`);
    }

    protected onEndClass(_cls: spec.ClassType) {
        debug("onEndClass");

        this.currentModule().closeBlock();
    }

    protected onStaticMethod(_cls: spec.ClassType, method: spec.Method) {
        debug("onStaticMethod");

        // TODO: Handle the case where the Python name and the JSII name differ.
        this.currentModule().line("@_jsii_classmethod");
        this.emitPythonMethod(method.name, "cls", method.parameters, method.returns);
    }

    protected onMethod(_cls: spec.ClassType, method: spec.Method) {
        debug("onMethod");

        this.currentModule().line("@_jsii_method");
        this.emitPythonMethod(method.name, "self", method.parameters, method.returns);
    }

    protected onStaticProperty(_cls: spec.ClassType, prop: spec.Property) {
        debug("onStaticProperty");

        // TODO: Properties have a bunch of states, they can have getters and setters
        //       we need to better handle all of these cases.
        this.currentModule().line("@_jsii_classproperty");
        this.emitPythonMethod(prop.name, "self", [], prop.type);
    }

    protected onProperty(_cls: spec.ClassType, prop: spec.Property) {
        debug("onProperty");

        this.currentModule().line("@_jsii_property");
        this.emitPythonMethod(prop.name, "self", [], prop.type);
    }

    private emitPythonMethod(name?: string, implicitParam?: string, params: spec.Parameter[] = [], returns?: spec.TypeReference) {
        // TODO: Handle imports (if needed) for type.
        const returnType = returns ? this.toPythonType(returns) : "None";

        // We need to turn a list of JSII parameters, into Python style arguments with
        // gradual typing, so we'll have to iterate over the list of parameters, and
        // build the list, converting as we go.
        // TODO: Handle imports (if needed) for all of these types.

        let pythonParams: string[] = implicitParam ? [implicitParam] : [];
        for (let param of params) {
            pythonParams.push(`${param.name}: ${this.toPythonType(param.type)}`);
        }

        let module = this.currentModule();

        module.openBlock(`def ${name}(${pythonParams.join(", ")}) -> ${returnType}`);
        module.line("...");
        module.closeBlock();
    }

    private toPythonType(typeref: spec.TypeReference): string {
        if (spec.isPrimitiveTypeReference(typeref)) {
            return this.toPythonPrimitive(typeref.primitive);
        } else if (spec.isNamedTypeReference(typeref)) {
            // TODO: We need to actually handle this, isntead of just returning the FQN
            //       as a string.
            return `"${typeref.fqn}"`;
        } else {
            throw new Error("Invalid type reference: " + JSON.stringify(typeref));
        }

        /*
        if (spec.isPrimitiveTypeReference(typeref)) {
            return [ this.toJavaPrimitive(typeref.primitive) ];
        } else if (spec.isCollectionTypeReference(typeref)) {
            return [ this.toJavaCollection(typeref, forMarshalling) ];
        } else if (spec.isNamedTypeReference(typeref)) {
            return [ this.toNativeFqn(typeref.fqn) ];
        } else if (typeref.union) {
            const types = new Array<string>();
            for (const subtype of typeref.union.types) {
                for (const t of this.toJavaTypes(subtype, forMarshalling)) {
                    types.push(t);
                }
            }
            return types;
        } else {
            throw new Error('Invalid type reference: ' + JSON.stringify(typeref));
        }
        */

        /*
        switch (primitive) {
            case spec.PrimitiveType.Boolean: return 'java.lang.Boolean';
            case spec.PrimitiveType.Date: return 'java.time.Instant';
            case spec.PrimitiveType.Json: return 'com.fasterxml.jackson.databind.node.ObjectNode';
            case spec.PrimitiveType.Number: return 'java.lang.Number';
            case spec.PrimitiveType.String: return 'java.lang.String';
            case spec.PrimitiveType.Any: return 'java.lang.Object';
            default:
                throw new Error('Unknown primitive type: ' + primitive);
        }
        */
    }

    private toPythonPrimitive(primitive: spec.PrimitiveType): string {
        switch (primitive) {
            case spec.PrimitiveType.String:
                return "str";
            default:
                throw new Error("Unknown primitive type: " + primitive);
        }
    }

    private currentModule(): Module {
        return this.moduleStack.slice(-1)[0];
    }

    private toPythonModuleName(name: string): string {
        return this.code.toSnakeCase(name.replace(/-/g, "_"));
    }

    private toPythonModuleFilename(name: string): string {
        return name.replace(/\./g, "/");
    }

    // Not Currently Used

    protected onEndAssembly(_assm: spec.Assembly, _fingerprint: boolean) {
        debug("onEndAssembly");
    }

    protected onBeginInterface(_ifc: spec.InterfaceType) {
        debug("onBeginInterface");
    }

    protected onEndInterface(_ifc: spec.InterfaceType) {
        debug("onEndInterface");
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, _method: spec.Method) {
        debug("onInterfaceMethod");
    }

    protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) {
        debug("onInterfaceMethodOverload");
    }

    protected onInterfaceProperty(_ifc: spec.InterfaceType, _prop: spec.Property) {
        debug("onInterfaceProperty");
    }

    protected onUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _union: spec.UnionTypeReference) {
        debug("onUnionProperty");
    }

    protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
        debug("onMethodOverload");
    }

    protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
        debug("onStaticMethodOverload");
    }
}
