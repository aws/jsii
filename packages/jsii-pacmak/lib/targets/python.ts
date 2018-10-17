import path = require('path');
import util = require('util');

import { CodeMaker, toSnakeCase } from 'codemaker';
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
        await shell("black", ["--py36", sourceDir], {});

        // Actually package up our code, both as a sdist and a wheel for publishing.
        await shell("python", ["setup.py", "sdist", "--dist-dir", outDir], { cwd: sourceDir });
        await shell("python", ["setup.py", "bdist_wheel", "--dist-dir", outDir], { cwd: sourceDir });
    }
}

// ##################
// # CODE GENERATOR #
// ##################
const debug = (o: any) => {
    // tslint:disable-next-line:no-console
    console.log(util.inspect(o, false, null, true));
};

const PYTHON_BUILTIN_TYPES = ["bool", "str", "None"];

const PYTHON_KEYWORDS = [
    "False", "None", "True", "and", "as", "assert", "async", "await", "break", "class",
    "continue", "def", "del", "elif", "else", "except", "finally", "for", "from",
    "global", "if", "import", "in", "is", "lambda", "nonlocal", "not", "or", "pass",
    "raise", "return", "try", "while", "with", "yield"
];

const toPythonModuleName = (name: string): string => {
    if (name.match(/^@[^/]+\/[^/]+$/)) {
        name = name.replace(/^@/g, "");
        name = name.replace(/\//g, ".");
    }

    name = toSnakeCase(name.replace(/-/g, "_"));

    return name;
};

const toPythonModuleFilename = (name: string): string => {
    if (name.match(/^@[^/]+\/[^/]+$/)) {
        name = name.replace(/^@/g, "");
        name = name.replace(/\//g, ".");
    }

    name = name.replace(/\./g, "/");

    return name;
};

const toPythonPackageName = (name: string): string => {
    return toPythonModuleName(name).replace(/_/g, "-");
};

const toPythonIdentifier = (name: string): string => {
    if (PYTHON_KEYWORDS.indexOf(name) > -1) {
        return name + "_";
    }

    return name;
};

const toPythonType = (typeref: spec.TypeReference): string => {
    if (spec.isPrimitiveTypeReference(typeref)) {
        return toPythonPrimitive(typeref.primitive);
    } else if (spec.isCollectionTypeReference(typeref)) {
        return toPythonCollection(typeref);
    } else if (spec.isNamedTypeReference(typeref)) {
        return toPythonFQN(typeref.fqn);
    } else if (typeref.union) {
        const types = new Array<string>();
        for (const subtype of typeref.union.types) {
            types.push(toPythonType(subtype));
        }
        return `typing.Union[${types.join(", ")}]`;
    } else {
        throw new Error("Invalid type reference: " + JSON.stringify(typeref));
    }
};

const toPythonCollection = (ref: spec.CollectionTypeReference) => {
    const elementPythonType = toPythonType(ref.collection.elementtype);
    switch (ref.collection.kind) {
        case spec.CollectionKind.Array: return `typing.List[${elementPythonType}]`;
        case spec.CollectionKind.Map: return `typing.Mapping[str,${elementPythonType}]`;
        default:
            throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
    }
};

const toPythonPrimitive = (primitive: spec.PrimitiveType): string => {
    switch (primitive) {
        case spec.PrimitiveType.Boolean: return "bool";
        case spec.PrimitiveType.Date: return "dateetime.datetime";
        case spec.PrimitiveType.Json: return "typing.Mapping[typing.Any, typing.Any]";
        case spec.PrimitiveType.Number: return "numbers.Number";
        case spec.PrimitiveType.String: return "str";
        case spec.PrimitiveType.Any: return "typing.Any";
        default:
            throw new Error("Unknown primitive type: " + primitive);
    }
};

const toPythonFQN = (name: string): string => {
    return name.split(".").map((cur, idx, arr) => {
        if (idx === arr.length - 1) {
            return toPythonIdentifier(cur);
        } else {
            return toPythonModuleName(cur);
        }
    }).join(".");
};

const formatPythonType = (type: string, forwardReference: boolean = false, moduleName: string) => {
    // If we split our types by any of the "special" characters that can't appear in
    // identifiers (like "[],") then we will get a list of all of the identifiers,
    // no matter how nested they are. The downside is we might get trailing/leading
    // spaces or empty items so we'll need to trim and filter this list.
    const types = type.split(/[\[\],]/).map((s: string) => s.trim()).filter(s => s !== "");

    for (const innerType of types) {
        // Built in types do not need formatted in any particular way.
        if (PYTHON_BUILTIN_TYPES.indexOf(innerType) > -1) {
            continue;
        }

        // If we do not have a current moduleName, or the type is not within that
        // module, then we don't format it any particular way.
        if (!innerType.startsWith(moduleName + ".")) {
            continue;
        } else {
            const typeName = innerType.substring(moduleName.length + 1, innerType.length);
            const re = new RegExp('((?:^|[[,\\s])"?)' + innerType + '("?(?:$|[\\],\\s]))');

            // If this is our current module, then we need to correctly handle our
            // forward references, by placing the type inside of quotes, unless
            // we're returning real forward references.
            if (!forwardReference) {
                type = type.replace(re, `$1"${innerType}"$2`);
            }

            // Now that we've handled (or not) our forward references, then we want
            // to replace the module with just the type name.
            // type = type.replace(re, "$1" + innerType.substring(moduleName.length + 1, innerType.length) + "$2");
            type = type.replace(re, `$1${typeName}$2`);
        }
    }

    return type;
};

const setDifference = (setA: Set<any>, setB: Set<any>): Set<any> => {
    const difference = new Set(setA);
    for (const elem of setB) {
        difference.delete(elem);
    }
    return difference;
};

const sortMembers = (sortable: PythonCollectionNode[]): PythonCollectionNode[] => {
    const sorted: PythonCollectionNode[] = [];
    const sortedFQNs: Set<string> = new Set();

    // We're going to take a copy of our sortable item, because it'll make it easier if
    // this method doesn't have side effects.
    sortable = sortable.slice();

    while (sortable.length > 0) {
        let idx: number | undefined;

        for (const [idx2, item] of sortable.entries()) {
            if (setDifference(new Set(item.depends_on), sortedFQNs).size === 0) {
                sorted.push(item);
                sortedFQNs.add(item.fqn);
                idx = idx2;
                break;
            } else {
                idx = undefined;
            }
        }

        if (idx === undefined) {
            throw new Error("Could not sort members.");
        } else {
            sortable.splice(idx, 1);
        }
    }

    return sorted;
    };

interface PythonNode {

    // The name of the module that this Node exists in.
    readonly moduleName: string;

    // The name of the given Node.
    readonly name: string;

    // The fully qualifed name of this node.
    readonly fqn: string;

    // Returns a list of all of the FQN Python types that this Node requires, this
    // should traverse all of it's members to get the full list of all types required to
    // exist (i.e. be imported).
    requiredTypes(): string[];

    // Emits the entire tree of objects represented by this object into the given
    // CodeMaker object.
    emit(code: CodeMaker): void;
}

interface PythonCollectionNode extends PythonNode {
    // A list of other nodes that this node depends on, can be used to sort a list of
    // nodes so that nodes get emited *after* the nodes it depends on.
    readonly depends_on: string[];

    // Given a particular item, add it as a member of this collection of nodes, returns
    // the original member back.
    addMember(member: PythonNode): PythonNode;
}

class BaseMethod implements PythonNode {

    public readonly moduleName: string;
    public readonly name: string;

    protected readonly decorator?: string;
    protected readonly implicitParameter: string;

    private readonly parameters: spec.Parameter[];
    private readonly returns?: spec.TypeReference;

    constructor(moduleName: string, name: string, parameters: spec.Parameter[], returns?: spec.TypeReference) {
        this.moduleName = moduleName;
        this.name = name;
        this.parameters = parameters;
        this.returns = returns;
    }

    get fqn(): string {
        return `${this.moduleName}.${this.name}`;
    }

    public requiredTypes(): string[] {
        const types: string[] = [this.getReturnType(this.returns)];

        for (const param of this.parameters) {
            types.push(toPythonType(param.type));
        }

        return types;
    }

    public emit(code: CodeMaker) {
        const returnType = this.getReturnType(this.returns);

        // We need to turn a list of JSII parameters, into Python style arguments with
        // gradual typing, so we'll have to iterate over the list of parameters, and
        // build the list, converting as we go.
        // TODO: Handle imports (if needed) for all of these types.
        const pythonParams: string[] = [this.implicitParameter];
        for (const param of this.parameters) {
            const paramName = toPythonIdentifier(param.name);
            const paramType = toPythonType(param.type);

            pythonParams.push(`${paramName}: ${formatPythonType(paramType, false, this.moduleName)}`);
        }

        if (this.decorator !== undefined) {
            code.line(`@${this.decorator}`);
        }

        code.openBlock(`def ${this.name}(${pythonParams.join(", ")}) -> ${formatPythonType(returnType, false, this.moduleName)}`);
        code.line("...");
        code.closeBlock();
    }

    private getReturnType(type?: spec.TypeReference): string {
        return type ? toPythonType(type) : "None";
    }
}

class BaseProperty implements PythonNode {

    public readonly moduleName: string;
    public readonly name: string;

    protected readonly decorator: string;
    protected readonly implicitParameter: string;

    private readonly type: spec.TypeReference;

    constructor(moduleName: string, name: string, type: spec.TypeReference) {
        this.moduleName = moduleName;
        this.name = name;
        this.type = type;
    }

    get fqn(): string {
        return `${this.moduleName}.${this.name}`;
    }

    public requiredTypes(): string[] {
        return [toPythonType(this.type)];
    }

    public emit(code: CodeMaker) {
        const returnType = toPythonType(this.type);

        code.line(`@${this.decorator}`);
        code.openBlock(`def ${this.name}(${this.implicitParameter}) -> ${formatPythonType(returnType, false, this.moduleName)}`);
        code.line("...");
        code.closeBlock();
    }
}

class InterfaceMethod extends BaseMethod {
    protected readonly implicitParameter: string = "self";
}

class InterfaceProperty extends BaseProperty {
    protected readonly decorator: string = "property";
    protected readonly implicitParameter: string = "self";
}

class Interface implements PythonCollectionNode {

    public readonly moduleName: string;
    public readonly name: string;

    private bases: string[];
    private members: PythonNode[];

    constructor(moduleName: string, name: string, bases: string[]) {
        this.moduleName = moduleName;
        this.name = name;
        this.bases = bases;

        this.members = [];
    }

    get fqn(): string {
        return `${this.moduleName}.${this.name}`;
    }

    get depends_on(): string[] {
        return this.bases.filter(base => base.startsWith(this.moduleName + "."));
    }

    public addMember(member: PythonNode): PythonNode {
        this.members.push(member);
        return member;
    }

    public requiredTypes(): string[] {
        const types = this.bases.slice();

        for (const member of this.members) {
            types.push(...member.requiredTypes());
        }

        return types;
    }

    public emit(code: CodeMaker) {
        // TODO: Data Types?

        const interfaceBases = this.bases.map(baseType => formatPythonType(baseType, true, this.moduleName));
        interfaceBases.push("_Protocol");

        code.openBlock(`class ${this.name}(${interfaceBases.join(",")})`);
        if (this.members.length > 0) {
            for (const member of this.members) {
                member.emit(code);
            }
        } else {
            code.line("pass");
        }
        code.closeBlock();
    }
}

class StaticMethod extends BaseMethod {
    protected readonly decorator?: string = "_jsii_classmethod";
    protected readonly implicitParameter: string = "cls";
}

class Method extends BaseMethod {
    protected readonly decorator?: string = "_jsii_method";
    protected readonly implicitParameter: string = "self";
}

class StaticProperty extends BaseProperty {
    protected readonly decorator: string = "_jsii_classproperty";
    protected readonly implicitParameter: string = "cls";
}

class Property extends BaseProperty {
    protected readonly decorator: string = "_jsii_property";
    protected readonly implicitParameter: string = "self";
}

class Class implements PythonCollectionNode {
    public readonly moduleName: string;
    public readonly name: string;

    private jsiiFQN: string;
    private members: PythonNode[];

    constructor(moduleName: string, name: string, jsiiFQN: string) {
        this.moduleName = moduleName;
        this.name = name;

        this.jsiiFQN = jsiiFQN;
        this.members = [];
    }

    get fqn(): string {
        return `${this.moduleName}.${this.name}`;
    }

    get depends_on(): string[] {
        return [];
    }

    public addMember(member: PythonNode): PythonNode {
        this.members.push(member);
        return member;
    }

    public requiredTypes(): string[] {
        const types: string[] = [];

        for (const member of this.members) {
            types.push(...member.requiredTypes());
        }

        return types;
    }

    public emit(code: CodeMaker) {
        // TODO: Data Types?
        // TODO: Bases

        code.openBlock(`class ${this.name}(metaclass=_JSIIMeta, jsii_type="${this.jsiiFQN}")`);
        if (this.members.length > 0) {
            for (const member of this.members) {
                member.emit(code);
            }
        } else {
            code.line("pass");
        }
        code.closeBlock();
    }
}

class Enum implements PythonCollectionNode {
    public readonly moduleName: string;
    public readonly name: string;

    private members: PythonNode[];

    constructor(moduleName: string, name: string) {
        this.moduleName = moduleName;
        this.name = name;
        this.members = [];
    }

    get fqn(): string {
        return `${this.moduleName}.${this.name}`;
    }

    get depends_on(): string[] {
        return [];
    }

    public addMember(member: PythonNode): PythonNode {
        this.members.push(member);
        return member;
    }

    public requiredTypes(): string[] {
        return ["enum.Enum"];
    }

    public emit(code: CodeMaker) {
        code.openBlock(`class ${this.name}(enum.Enum)`);
        if (this.members.length > 0) {
            for (const member of this.members) {
                member.emit(code);
            }
        } else {
            code.line("pass");
        }
        code.closeBlock();
    }
}

class EnumMember implements PythonNode {
    public readonly moduleName: string;
    public readonly name: string;

    private readonly value: string;

    constructor(moduleName: string, name: string, value: string) {
        this.moduleName = moduleName;
        this.name = name;
        this.value = value;
    }

    get fqn(): string {
        return `${this.moduleName}.${this.name}`;
    }

    public requiredTypes(): string[] {
        return [];
    }

    public emit(code: CodeMaker) {
        code.line(`${this.name} = "${this.value}"`);
    }
}

class Module {

    public readonly name: string;
    public readonly assembly?: spec.Assembly;
    public readonly assemblyFilename?: string;

    private members: PythonCollectionNode[];

    constructor(ns: string, assembly?: [spec.Assembly, string]) {
        this.name = ns;

        if (assembly !== undefined) {
            this.assembly = assembly[0];
            this.assemblyFilename = assembly[1];
        }

        this.members = [];
    }

    public addMember(member: PythonCollectionNode): PythonCollectionNode {
        this.members.push(member);
        return member;
    }

    public emit(code: CodeMaker) {
        // Before we write anything else, we need to write out our module headers, this
        // is where we handle stuff like imports, any required initialization, etc.
        code.line(this.generateImportFrom("jsii.compat", ["Protocol"]));
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
        );

        // Go over all of the modules that we need to import, and import them.
        // for (let [idx, modName] of this.importedModules.sort().entries()) {
        for (const [idx, modName] of this.getRequiredTypeImports().sort().entries()) {
            if (idx === 0) {
                code.line();
            }

            code.line(`import ${modName}`);
        }

        // Determine if we need to write out the kernel load line.
        if (this.assembly && this.assemblyFilename) {
            code.line(
                `__jsii_assembly__ = _JSIIAssembly.load(` +
                `"${this.assembly.name}", ` +
                `"${this.assembly.version}", ` +
                `__name__, ` +
                `"${this.assemblyFilename}")`
            );
        }

        // Now that we've gotten all of the module header stuff done, we need to go
        // through and actually write out the meat of our module.
        for (const member of sortMembers(this.members)) {
            member.emit(code);
        }

        // // Whatever names we've exported, we'll write out our __all__ that lists them.
        code.line(`__all__ = [${this.getExportedNames().map(s => `"${s}"`).join(", ")}]`);
    }

    private getRequiredTypeImports(): string[] {
        const types: string[] = [];
        const imports: string[] = [];

        // Compute a list of all of of the types that
        for (const member of this.members) {
            types.push(...member.requiredTypes());
        }

        // Go over our types, and generate a list of imports that we need to import for
        // our module.
        for (const type of types) {
            // If we split our types by any of the "special" characters that can't appear in
            // identifiers (like "[],") then we will get a list of all of the identifiers,
            // no matter how nested they are. The downside is we might get trailing/leading
            // spaces or empty items so we'll need to trim and filter this list.
            const subTypes = type.split(/[\[\],]/).map((s: string) => s.trim()).filter(s => s !== "");

            // Loop over all of the types we've discovered, and check them for being
            // importable
            for (const subType of subTypes) {
                // For built in types, we don't need to do anything, and can just move on.
                if (PYTHON_BUILTIN_TYPES.indexOf(subType) > -1) { continue; }

                const [, typeModule] = subType.match(/(.*)\.(.*)/) as any[];

                // Given a name like foo.bar.Frob, we want to import the module that Frob exists
                // in. Given that all classes exported by JSII have to be pascal cased, and all
                // of our imports are snake cases, this should be safe. We're going to double
                // check this though, to ensure that our importable here is safe.
                if (typeModule !== typeModule.toLowerCase()) {
                    // If we ever get to this point, we'll need to implment aliasing for our
                    // imports.
                    throw new Error(`Type module is not lower case: '${typeModule}'`);
                }

                // We only want to actually import the type for this module, if it isn't the
                // module that we're currently in, otherwise we'll jus rely on the module scope
                // to make the name available to us.
                if (typeModule !== this.name && imports.indexOf(typeModule) === -1) {
                    imports.push(typeModule);
                }
            }
        }

        return imports;
    }

    private getExportedNames(): string[] {
        // We assume that anything that is a member of this module, will be exported by
        // this module.
        const exportedNames = this.members.map(m => m.name);

        // If this module will be outputting the Assembly, then we also want to export
        // our assembly variable.
        if (this.assembly && this.assemblyFilename) {
            exportedNames.push("__jsii_assembly__");
        }

        return exportedNames.sort();

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

    private currentMember?: PythonCollectionNode;
    private modules: Module[];
    private moduleStack: Module[];

    constructor(options = new GeneratorOptions()) {
        super(options);

        this.code.openBlockFormatter = s => `${s}:`;
        this.code.closeBlockFormatter = _s => "";

        this.currentMember = undefined;
        this.modules = [];
        this.moduleStack = [];
    }

    protected getAssemblyOutputDir(mod: spec.Assembly) {
        return path.join("src", toPythonModuleFilename(toPythonModuleName(mod.name)), "_jsii");
    }

    protected onBeginAssembly(assm: spec.Assembly, _fingerprint: boolean) {
        // We need to write out an __init__.py for our _jsii package so that
        // importlib.resources will be able to load our assembly from it.
        const assemblyInitFilename = path.join(this.getAssemblyOutputDir(assm), "__init__.py");

        this.code.openFile(assemblyInitFilename);
        this.code.closeFile(assemblyInitFilename);
    }

    protected onEndAssembly(assm: spec.Assembly, _fingerprint: boolean) {
        const packageName = toPythonPackageName(assm.name);
        const topLevelModuleName = toPythonModuleName(packageName);
        const moduleNames = this.modules.map(m => m.name);

        moduleNames.push(`${topLevelModuleName}._jsii`);
        moduleNames.sort();

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
        this.code.line(`name="${packageName}",`);
        this.code.line(`version="${assm.version}",`);
        this.code.line(`description="${assm.description}",`);
        this.code.line(`url="${assm.homepage}",`);
        this.code.line('package_dir={"": "src"},');
        this.code.line(`packages=[${moduleNames.map(m => `"${m}"`).join(",")}],`);
        this.code.line(`package_data={"${topLevelModuleName}._jsii": ["*.jsii.tgz"]},`);
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
        this.code.openFile("MANIFEST.in");
        this.code.line("include pyproject.toml");
        this.code.closeFile("MANIFEST.in");
    }

    protected onBeginNamespace(ns: string) {
        const moduleName = toPythonModuleName(ns);
        const loadAssembly = this.assembly.name === ns ? true : false;

        const moduleArgs: any[] = [];

        if (loadAssembly) {
            moduleArgs.push([this.assembly, this.getAssemblyFileName()]);
        }

        const mod = new Module(moduleName, ...moduleArgs);

        this.modules.push(mod);
        this.moduleStack.push(mod);
    }

    protected onEndNamespace(_ns: string) {
        const module = this.moduleStack.pop() as Module;
        const moduleFilename = path.join("src", toPythonModuleFilename(module.name), "__init__.py");

        this.code.openFile(moduleFilename);
        module.emit(this.code);
        this.code.closeFile(moduleFilename);
    }

    protected onBeginClass(cls: spec.ClassType, _abstract: boolean | undefined) {
        const currentModule = this.currentModule();

        // TODO: Figure out what to do with abstract here.

        this.currentMember = currentModule.addMember(
            new Class(
                currentModule.name,
                toPythonIdentifier(cls.name),
                cls.fqn
            )
        );
    }

    protected onEndClass(_cls: spec.ClassType) {
        this.currentMember = undefined;
    }

    protected onStaticMethod(_cls: spec.ClassType, method: spec.Method) {
        this.currentMember!.addMember(
            new StaticMethod(
                this.currentModule().name,
                toPythonIdentifier(method.name!),
                method.parameters || [],
                method.returns
            )
        );
    }

    protected onMethod(_cls: spec.ClassType, method: spec.Method) {
        this.currentMember!.addMember(
            new Method(
                this.currentModule().name,
                toPythonIdentifier(method.name!),
                method.parameters || [],
                method.returns
            )
        );
    }

    protected onStaticProperty(_cls: spec.ClassType, prop: spec.Property) {
        this.currentMember!.addMember(
            new StaticProperty(
                this.currentModule().name,
                toPythonIdentifier(prop.name!),
                prop.type,
            )
        );
    }

    protected onProperty(_cls: spec.ClassType, prop: spec.Property) {
        this.currentMember!.addMember(
            new Property(
                this.currentModule().name,
                toPythonIdentifier(prop.name!),
                prop.type,
            )
        );
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        const currentModule = this.currentModule();

        this.currentMember = currentModule.addMember(
            new Interface(
                currentModule.name,
                toPythonIdentifier(ifc.name),
                (ifc.interfaces || []).map(i => toPythonType(i))
            )
        );
    }

    protected onEndInterface(_ifc: spec.InterfaceType) {
        this.currentMember = undefined;
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        this.currentMember!.addMember(
            new InterfaceMethod(
                this.currentModule().name,
                toPythonIdentifier(method.name!),
                method.parameters || [],
                method.returns
            )
        );
    }

    protected onInterfaceProperty(_ifc: spec.InterfaceType, prop: spec.Property) {
        this.currentMember!.addMember(
            new InterfaceProperty(
                this.currentModule().name,
                toPythonIdentifier(prop.name!),
                prop.type,
            )
        );
    }

    protected onBeginEnum(enm: spec.EnumType) {
        const currentModule = this.currentModule();

        this.currentMember = currentModule.addMember(
            new Enum(
                currentModule.name,
                toPythonIdentifier(enm.name),
            )
        );
    }

    protected onEndEnum(_enm: spec.EnumType) {
        this.currentMember = undefined;
    }

    protected onEnumMember(_enm: spec.EnumType, member: spec.EnumMember) {
        this.currentMember!.addMember(
            new EnumMember(
                this.currentModule().name,
                toPythonIdentifier(member.name),
                member.name
            )
        );
    }

    // Not Currently Used

    protected onInterfaceMethodOverload(_ifc: spec.InterfaceType, _overload: spec.Method, _originalMethod: spec.Method) {
        debug("onInterfaceMethodOverload");
        throw new Error("Unhandled Type: InterfaceMethodOverload");
    }

    protected onUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _union: spec.UnionTypeReference) {
        debug("onUnionProperty");
        throw new Error("Unhandled Type: UnionProperty");
    }

    protected onMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
        debug("onMethodOverload");
        throw new Error("Unhandled Type: MethodOverload");
    }

    protected onStaticMethodOverload(_cls: spec.ClassType, _overload: spec.Method, _originalMethod: spec.Method) {
        debug("onStaticMethodOverload");
        throw new Error("Unhandled Type: StaticMethodOverload");
    }

    // End Not Currently Used

    private currentModule(): Module {
        return this.moduleStack.slice(-1)[0];
    }
}
