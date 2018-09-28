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

        // Actually package up our code, both as a sdist and a wheel for publishing.
        await shell("python", ["setup.py", "sdist", "--dist-dir", outDir], { cwd: sourceDir });
        await shell("python", ["setup.py", "bdist_wheel", "--dist-dir", outDir], { cwd: sourceDir });
    }
}

// ##################
// # CODE GENERATOR #
// ##################
const debug = function(o: any) {
    console.log(util.inspect(o, false, null, true));
}


const PYTHON_BUILTIN_TYPES = ["bool", "str", "None"]


class Module {

    readonly name: string;
    readonly assembly?: spec.Assembly;
    readonly assemblyFilename?: string;

    private buffer: object[];
    private exportedNames: string[];
    private importedModules: string[];

    constructor(ns: string, assembly?: [spec.Assembly, string]) {
        this.name = ns;

        if (assembly != undefined) {
            this.assembly = assembly[0];
            this.assemblyFilename = assembly[1];
        }

        this.buffer = [];
        this.exportedNames = [];
        this.importedModules = [];
    }

    // Adds a name to the list of names that this module will export, this will control
    // things like what is listed inside of __all__.
    public exportName(name: string) {
        this.exportedNames.push(name);
    }

    // Adds a name to the list of modules that should be imported at the top of this
    // file.
    public importModule(name: string) {
        this.importedModules.push(name);
    }

    public maybeImportType(type: string) {
        let types: string[] = [];

        // Before we do anything else, we need to split apart any collections, these
        // always have the syntax of something[something, maybesomething], so we'll
        // check for [] first.
        if (type.match(/[^\[]*\[.+\]/)) {
            const [, genericType, innerTypes] = type.match(/([^\[]*)\[(.+)\]/) as any[];

            types.push(genericType);
            types.push(...innerTypes.split(","));
        } else {
            types.push(type);
        }

        // Loop over all of the types we've discovered, and check them for being
        // importable
        for (let type of types) {
            // For built in types, we don't need to do anything, and can just move on.
            if (PYTHON_BUILTIN_TYPES.indexOf(type) > -1) { continue; }

            let [, typeModule] = type.match(/(.*)\.(.*)/) as any[];

            // Given a name like foo.bar.Frob, we want to import the module that Frob exists
            // in. Given that all classes exported by JSII have to be pascal cased, and all
            // of our imports are snake cases, this should be safe. We're going to double
            // check this though, to ensure that our importable here is safe.
            if (typeModule != typeModule.toLowerCase()) {
                // If we ever get to this point, we'll need to implment aliasing for our
                // imports.
                throw new Error(`Type module is not lower case: '${typeModule}'`);
            }

            // We only want to actually import the type for this module, if it isn't the
            // module that we're currently in, otherwise we'll jus rely on the module scope
            // to make the name available to us.
            if (typeModule != this.name) {
                this.importModule(typeModule);
            }
        }
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

        // Go over all of the modules that we need to import, and import them.
        for (let [idx, modName] of this.importedModules.sort().entries()) {
            if (idx == 0) {
                code.line();
            }

            code.line(`import ${modName}`);
        }

        // Determine if we need to write out the kernel load line.
        if (this.assembly && this.assemblyFilename) {
            this.exportName("__jsii_assembly__");
            code.line(`__jsii_assembly__ = _JSIIAssembly.load("${this.assembly.name}", "${this.assembly.version}", __name__, "${this.assemblyFilename}")`);
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

    protected onEndAssembly(assm: spec.Assembly, _fingerprint: boolean) {
        debug("onEndAssembly");
        debug(assm);

        // We need to write out our packaging for the Python ecosystem here.
        // TODO:
        //      - Author
        //      - README
        //      - License
        //      - Classifiers
        //      - install_requires
        this.code.openFile("setup.py");
        this.code.line("import setuptools");
        this.code.indent("setuptools.setup(");
        this.code.line(`name="${assm.name}",`);
        this.code.line(`version="${assm.version}",`);
        this.code.line(`description="${assm.description}",`);
        this.code.line(`url="${assm.homepage}",`);
        this.code.line('package_dir={"": "src"},');
        this.code.line('packages=setuptools.find_packages(where="src"),');
        this.code.line(`package_data={"${this.toPythonModuleName(assm.name)}._jsii": ["*.jsii.tgz"]},`);
        this.code.line('python_requires=">=3.6",');
        this.code.unindent(")");
        this.code.closeFile("setup.py");

        // Because we're good citizens, we're going to go ahead and support pyproject.toml
        // as well.
        // TODO: Might be easier to just use a TOML library to write this out.
        this.code.openFile("pyproject.toml");
        this.code.line("[build-system]");
        this.code.line('requires = ["setuptools", "wheel"]');
        this.code.closeFile("pyproject.toml");

        // We also need to write out a MANIFEST.in to ensure that all of our required
        // files are included.
        this.code.openFile("MANIFEST.in")
        this.code.line("include pyproject.toml")
        this.code.closeFile("MANIFEST.in")
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
        let module = this.currentModule();

        // TODO: Handle imports (if needed) for type.
        const returnType = returns ? this.toPythonType(returns) : "None";
        module.maybeImportType(returnType);


        // We need to turn a list of JSII parameters, into Python style arguments with
        // gradual typing, so we'll have to iterate over the list of parameters, and
        // build the list, converting as we go.
        // TODO: Handle imports (if needed) for all of these types.

        let pythonParams: string[] = implicitParam ? [implicitParam] : [];
        for (let param of params) {
            let paramType = this.toPythonType(param.type);
            module.maybeImportType(paramType);
            pythonParams.push(`${param.name}: ${this.formatPythonType(paramType)}`);
        }

        module.openBlock(`def ${name}(${pythonParams.join(", ")}) -> ${this.formatPythonType(returnType)}`);
        module.line("...");
        module.closeBlock();
    }

    private toPythonType(typeref: spec.TypeReference): string {
        if (spec.isPrimitiveTypeReference(typeref)) {
            return this.toPythonPrimitive(typeref.primitive);
        } else if (spec.isCollectionTypeReference(typeref)) {
            return this.toPythonCollection(typeref);
        } else if (spec.isNamedTypeReference(typeref)) {
            return this.toPythonFQN(typeref.fqn);
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
    }

    private toPythonCollection(ref: spec.CollectionTypeReference) {
        const elementPythonType = this.toPythonType(ref.collection.elementtype);
        switch (ref.collection.kind) {
            case spec.CollectionKind.Array: return `typing.List[${elementPythonType}]`;
            case spec.CollectionKind.Map: return `typing.Mapping[str,${elementPythonType}]`;
            default:
                throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
        }
    }

    private toPythonPrimitive(primitive: spec.PrimitiveType): string {
        switch (primitive) {
            case spec.PrimitiveType.Boolean: return "bool";
            case spec.PrimitiveType.Date:    return "dateetime.datetime";
            case spec.PrimitiveType.Json:    return "typing.Mapping[typing.Any, typing.Any]";
            case spec.PrimitiveType.Number:  return "numbers.Number";
            case spec.PrimitiveType.String:  return "str";
            case spec.PrimitiveType.Any:     return "typing.Any";
            default:
                throw new Error("Unknown primitive type: " + primitive);
        }
    }

    private toPythonFQN(name: string): string {
        return name.split(".").map((cur, idx, arr) => {
            if (idx == arr.length - 1) {
                return cur;
            } else {
                return this.toPythonModuleName(cur);
            }
        }).join(".");
    }

    private formatPythonType(type: string) {
        // Built in types do not need formatted in any particular way.
        if(PYTHON_BUILTIN_TYPES.indexOf(type) > -1) {
            return type;
        }

        const [, typeModule, typeName] = type.match(/(.*)\.(.*)/) as any[];

        // Types whose module is different than our current module, can also just be
        // formatted as they are.
        if (this.currentModule().name != typeModule) {
            return type;
        }

        // Otherwise, this is a type that exists in this module, and we can jsut emit
        // the name.
        // TODO: We currently emit this as a string, because that's how forward
        //       references used to work prior to 3.7. Ideally we will move to using 3.7
        //       and can just use native forward references.
        return `"${typeName}"`;
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
