import * as clone from 'clone';
import { CodeMaker } from 'codemaker';
import * as crypto from 'crypto';
import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as path from 'path';
import util = require('./util');
import { VERSION_DESC } from './version';

// tslint:disable

/**
 * Options for the code generator framework.
 */
export class GeneratorOptions {
    /**
     * If this property is set to 'true', union properties are "expanded" into multiple
     * properties, each with a different type and a postfix based on the type name. This
     * can be used by languages that don't have support for union types (e.g. Java).
     */
    expandUnionProperties? = false

    /**
     * If this property is set to 'true', methods that have optional arguments are duplicated
     * and overloads are created with all parameters.
     */
    generateOverloadsForMethodWithOptionals? = false

    /**
     * If this property is set, the generator will add "Base" to abstract class names
     */
    addBasePostfixToAbstractClassNames? = false
}

export interface IGenerator {
    generate(fingerprint: boolean): void;

    /**
     * Load a module into the generator.
     * @param packageDir is the root directory of the module.
     */
    load(packageDir: string): Promise<void>;

    /**
     * Determine if the generated artifacts for this generator are already up-to-date.
     * @param outDir the directory where generated artifacts would be placed.
     * @return ``true`` if no generation is necessary
     */
    upToDate(outDir: string): Promise<boolean>;
    save(outdir: string, tarball: string): Promise<any>;
}

/**
 * Abstract base class for jsii package generators.
 * Given a jsii module, it will invoke "events" to emit various elements.
 */
export abstract class Generator implements IGenerator {
    private readonly options: GeneratorOptions;
    private readonly excludeTypes = new Array<string>();
    protected readonly code = new CodeMaker();
    protected assembly: spec.Assembly;
    private externals: { [name: string]: spec.Type | undefined } = {};
    private fingerprint: string;

    constructor(options = new GeneratorOptions()) {
        this.options = options;
    }

    public get metadata() {
        return { fingerprint: this.fingerprint };
    }

    public async load(packageDir: string) {
        this.assembly = await util.loadAssembly(packageDir);

        if (this.assembly.schema !== spec.SchemaVersion.V1_0) {
            throw new Error(`Invalid schema version "${this.assembly.schema}". Expecting "${spec.SchemaVersion.V1_0}"`);
        }

        // Including the version of jsii-pacmak in the fingerprint, as a new version may imply different code generation.
        this.fingerprint = crypto.createHash('sha256')
                                 .update(VERSION_DESC)
                                 .update('\0')
                                 .update(this.assembly.fingerprint)
                                 .digest('base64');

        this.externals = {};
        const loaded = new Set<string>();
        for (const name of Object.keys(this.assembly.dependencies || {})) {
            await this.loadDependency(name, this.assembly.dependencies![name].version, packageDir, loaded);
        }
    }

    /**
     * Runs the generator (in-memory).
     */
    generate(fingerprint: boolean) {
        this.onBeginAssembly(this.assembly, fingerprint);
        this.visit(spec.NameTree.of(this.assembly));
        this.onEndAssembly(this.assembly, fingerprint);
    }

    upToDate(_: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    /**
     * Returns the file name of the assembly resource as it is going to be saved.
     */
    protected getAssemblyFileName() {
        let name = this.assembly.name;
        const parts = name.split('/');

        if (parts.length === 1) {
            name = parts[0];
        } else if (parts.length === 2 && parts[0].startsWith('@')) {
            name = parts[1];
        } else {
            throw new Error('Malformed assembly name. Expecting either <name> or @<scope>/<name>');
        }

        return `${name}@${this.assembly.version}.jsii.tgz`
    }

    /**
     * Saves all generated files to an output directory, creating any subdirs if needed.
     */
    async save(outdir: string, tarball: string) {
        const assemblyDir = this.getAssemblyOutputDir(this.assembly);
        if (assemblyDir) {
            const fullPath = path.resolve(path.join(outdir, assemblyDir, this.getAssemblyFileName()));
            await fs.mkdirp(path.dirname(fullPath));
            await fs.copy(tarball, fullPath, { overwrite: true });
        }

        return await this.code.save(outdir);
    }

    //
    // Bundled assembly
    // jsii modules should bundle the assembly itself as a resource and use the load() kernel API to load it.
    //

    /**
     * Returns the destination directory for the assembly file.
     */
    protected getAssemblyOutputDir(_mod: spec.Assembly): string | undefined { return undefined; }

    //
    // Assembly

    protected onBeginAssembly(_assm: spec.Assembly, _fingerprint: boolean) { }
    protected onEndAssembly(_assm: spec.Assembly, _fingerprint: boolean) { }

    //
    // Namespaces

    protected onBeginNamespace(ns: string) { ns; }
    protected onEndNamespace(ns: string) { ns; }

    //
    // Classes

    protected onBeginClass(cls: spec.ClassType, abstract: boolean | undefined) { cls; abstract; }
    protected onEndClass(cls: spec.ClassType) { cls; }

    //
    // Interfaces

    protected abstract onBeginInterface(ifc: spec.InterfaceType): void;
    protected abstract onEndInterface(ifc: spec.InterfaceType): void;
    protected abstract onInterfaceMethod(ifc: spec.InterfaceType, method: spec.Method): void;
    protected abstract onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, originalMethod: spec.Method): void;
    protected abstract onInterfaceProperty(ifc: spec.InterfaceType, prop: spec.Property): void;

    //
    // Initializers (constructos)

    protected onInitializer(cls: spec.ClassType, method: spec.Method) { cls; method; }
    protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, originalInitializer: spec.Method) { cls; overload; originalInitializer; }

    //
    // Properties

    protected onBeginProperties(_cls: spec.ClassType) { }
    protected abstract onProperty(cls: spec.ClassType, prop: spec.Property): void;
    protected abstract onStaticProperty(cls: spec.ClassType, prop: spec.Property): void;
    protected onEndProperties(_cls: spec.ClassType) { }

    //
    // Union Properties
    // Those are properties that can accept more than a single type (i.e. String | Token). If the option `expandUnionProperties` is enabled
    // instead of onUnionProperty, the method onExpandedUnionProperty will be called for each of the types defined in the property.
    // `primaryName` indicates the original name of the union property (without the 'AsXxx' postfix).

    protected abstract onUnionProperty(cls: spec.ClassType, prop: spec.Property, union: spec.UnionTypeReference): void;
    protected onExpandedUnionProperty(_cls: spec.ClassType, _prop: spec.Property, _primaryName: string): void {
        return;
    }

    //
    // Methods
    // onMethodOverload is triggered if the option `generateOverloadsForMethodWithOptionals` is enabled for each overload of the original method.
    // The original method will be emitted via onMethod.

    protected onBeginMethods(_cls: spec.ClassType) { }
    protected abstract onMethod(cls: spec.ClassType, method: spec.Method): void;
    protected abstract onMethodOverload(cls: spec.ClassType, overload: spec.Method, originalMethod: spec.Method): void
    protected abstract onStaticMethod(cls: spec.ClassType, method: spec.Method): void;
    protected abstract onStaticMethodOverload(cls: spec.ClassType, overload: spec.Method, originalMethod: spec.Method): void
    protected onEndMethods(_cls: spec.ClassType) { }

    //
    // Enums

    protected onBeginEnum(enm: spec.EnumType) { enm; }
    protected onEndEnum(enm: spec.EnumType) { enm; }
    protected onEnumMember(enm: spec.EnumType, member: spec.EnumMember) { enm; member; }

    //
    // Fields
    // Can be used to implements properties backed by fields in cases where we want to generate "native" classes.
    // The default behavior is that properties do not have backing fields.

    protected hasField(cls: spec.ClassType, prop: spec.Property): boolean { cls; prop; return false; }
    protected onField(cls: spec.ClassType, prop: spec.Property, union?: spec.UnionTypeReference) { cls; prop; union }

    private visit(node: spec.NameTree, names = new Array<string>()) {
        let namespace = (!node.fqn && names.length > 0) ? names.join('.') : undefined;

        if (namespace) {
            this.onBeginNamespace(namespace);
        }

        let visitChildren = () => {
            Object.keys(node.children).sort().forEach(name => {
                this.visit(node.children[name], names.concat(name));
            })
        }

        if (node.fqn) {
            let type = this.assembly.types && this.assembly.types[node.fqn];
            if (!type) {
                throw new Error(`Malformed jsii file. Cannot find type: ${node.fqn}`);
            }
            if (!this.shouldExcludeType(type.name)) {
                switch (type.kind) {
                    case spec.TypeKind.Class:
                        let classSpec = type as spec.ClassType;
                        let abstract = classSpec.abstract;
                        if (abstract && this.options.addBasePostfixToAbstractClassNames) {
                            this.addAbstractPostfixToClassName(classSpec);
                        }
                        this.onBeginClass(classSpec, abstract);
                        this.visitClass(classSpec);
                        visitChildren();
                        this.onEndClass(classSpec);
                        break;
                    case spec.TypeKind.Enum:
                        let enumSpec = type as spec.EnumType
                        this.onBeginEnum(enumSpec);
                        this.visitEnum(enumSpec);
                        visitChildren();
                        this.onEndEnum(enumSpec);
                        break;
                    case spec.TypeKind.Interface:
                        let interfaceSpec = type as spec.InterfaceType;
                        this.onBeginInterface(interfaceSpec);
                        this.visitInterface(interfaceSpec);
                        visitChildren();
                        this.onEndInterface(interfaceSpec);
                        break;
                    default:
                        throw new Error('Unsupported type kind: ' + (type as any).kind);
                }
            }
        } else {
            visitChildren();
        }

        if (namespace) {
            this.onEndNamespace(namespace);
        }
    }

    /**
     * Adds a postfix ("XxxBase") to the class name to indicate it is abstract.
     */
    private addAbstractPostfixToClassName(cls: spec.ClassType) {
        cls.name = `${cls.name}Base`;
        let components = cls.fqn.split('.');
        cls.fqn = components.map((x, i) => i < components.length - 1 ? x : `${x}Base`).join('.');
    }

    protected excludeType(...names: string[]) {
        for (let n of names) {
            this.excludeTypes.push(n);
        }
    }

    private shouldExcludeType(name: string) {
        return this.excludeTypes.includes(name);
    }

    /**
     * Returns all the method overloads needed to satisfy optional arguments.
     * For example, for the method `foo(bar: string, hello?: number, world?: number)`
     * this method will return:
     *  - foo(bar: string)
     *  - foo(bar: string, hello: number)
     *
     * Notice that the method that contains all the arguments will not be returned.
     */
    protected createOverloadsForOptionals(method: spec.Method) {
        const methods = new Array<spec.Method>();

        // if option disabled, just return the empty array.
        if (!this.options.generateOverloadsForMethodWithOptionals || !method.parameters) {
            return methods;
        }

        //
        // pop an argument from the end of the parameter list.
        // if it is an optional argument, clone the method without that parameter.
        // continue until we reach a non optional param or no parameters left.
        //

        const remaining: spec.Parameter[] = clone(method.parameters);
        let next: spec.Parameter | undefined

        next = remaining.pop();
        while (next && next.type.optional) {
            // clone the method but set the parameter list based on the remaining set of parameters
            let cloned: spec.Method = clone(method);
            cloned.parameters = clone(remaining);
            methods.push(cloned);

            // pop the next parameter
            next = remaining.pop();
        }

        return methods;
    }

    private visitInterface(ifc: spec.InterfaceType) {
        if (ifc.properties) {
            ifc.properties.forEach(prop => {
                this.onInterfaceProperty(ifc, prop);
            })
        }

        if (ifc.methods) {
            ifc.methods.forEach(method => {
                this.onInterfaceMethod(ifc, method);

                for (let overload of this.createOverloadsForOptionals(method)) {
                    this.onInterfaceMethodOverload(ifc, overload, method);
                }
            });
        }
    }

    private visitClass(cls: spec.ClassType) {
        let initializer = cls.initializer;
        if (initializer) {

            this.onInitializer(cls, initializer);

            // if method has optional arguments and
            for (let overload of this.createOverloadsForOptionals(initializer)) {
                this.onInitializerOverload(cls, overload, initializer);
            }
        }

        // if running in 'pure' mode and the class has methods, emit them as abstract methods.
        if (cls.methods) {
            this.onBeginMethods(cls);
            cls.methods.forEach(method => {
                if (!method.static) {
                    this.onMethod(cls, method);

                    for (let overload of this.createOverloadsForOptionals(method)) {
                        this.onMethodOverload(cls, overload, method);
                    }
                } else {
                    this.onStaticMethod(cls, method);

                    for (let overload of this.createOverloadsForOptionals(method)) {
                        this.onStaticMethodOverload(cls, overload, method);
                    }
                }
            });
            this.onEndMethods(cls);
        }

        if (cls.properties) {

            this.onBeginProperties(cls);
            cls.properties.forEach(prop => {
                if (this.hasField(cls, prop)) {
                    this.onField(cls, prop, spec.isUnionTypeReference(prop.type) ? prop.type : undefined);
                }
            })

            cls.properties.forEach(prop => {
                if (!spec.isUnionTypeReference(prop.type)) {
                    if (!prop.static) {
                        this.onProperty(cls, prop);
                    } else {
                        this.onStaticProperty(cls, prop);
                    }
                } else {
                    // okay, this is a union. some languages support unions (mostly the dynamic ones) and some will need some help
                    // if `expandUnionProperties` is set, we will "expand" each property that has a union type into multiple properties
                    // and postfix their name with the type name (i.e. FooAsToken).

                    // first, emit a property for the union, for languages that support unions.
                    this.onUnionProperty(cls, prop, prop.type);

                    // if require, we also "expand" the union for languages that don't support unions.
                    if (this.options.expandUnionProperties) {
                        prop.type.union.types.forEach((type, index) => {
                            // create a clone of this property
                            let propClone = clone(prop) as spec.Property;
                            let primary = this.isPrimaryExpandedUnionProperty(prop.type as spec.UnionTypeReference, index);
                            let propertyName = primary ? prop.name : `${prop.name}As${this.displayNameForType(type)}`;
                            propClone.type = type;
                            propClone.type.optional = prop.type.optional;
                            propClone.name = propertyName;
                            this.onExpandedUnionProperty(cls, propClone, prop.name);
                        });
                    }
                }
            });
            this.onEndProperties(cls);
        }
    }

    /**
     * Magical heuristic to determine which type in a union is the primary type. The primary type will not have
     * a postfix with the name of the type attached to the expanded property name.
     *
     * The primary type is determined according to the following rules (first match):
     * 1. The first primitive type
     * 2. The first primitive collection
     * 3. No primary
     */
    protected isPrimaryExpandedUnionProperty(ref: spec.UnionTypeReference | undefined, index: number) {
        if (!ref) {
            return false;
        }

        return index === ref.union.types.findIndex(t => {
            if (spec.isPrimitiveTypeReference(t)) {
                return true;
            }

            // if (t.collection && t.collection.elementtype.primitive) {
            //     return true;
            // }

            return false;
        });
    }

    private visitEnum(enumSpec: spec.EnumType) {
        if (enumSpec.members) {
            enumSpec.members.forEach(spec => this.onEnumMember(enumSpec, spec));
        }
    }

    private displayNameForType(type: spec.TypeReference): string {
        // last name from FQN
        if (spec.isNamedTypeReference(type)) {
            let comps = type.fqn.split('.');
            let last = comps[comps.length - 1];
            return this.code.toPascalCase(last);
        }

        // primitive name
        if (spec.isPrimitiveTypeReference(type)) {
            return this.code.toPascalCase(type.primitive);
        }

        // ListOfX or MapOfX
        let coll = spec.isCollectionTypeReference(type) && type.collection;
        if (coll) {
            return `${this.code.toPascalCase(coll.kind)}Of${this.displayNameForType(coll.elementtype)}`;
        }

        let union = spec.isUnionTypeReference(type) && type.union;
        if (union) {
            return union.types.map(t => this.displayNameForType(t)).join('Or');
        }

        throw new Error(`Cannot determine display name for type: ${JSON.stringify(type)}`);
    }

    /**
     * Looks up a jsii module in the dependency tree.
     * @param name The name of the jsii module to look up
     */
    protected findModule(name: string) {

        // if this is the current module, return it
        if (this.assembly.name === name) {
            return this.assembly;
        }

        // look up in all deps, recursively
        const found = lookupModule(this.assembly);
        if (!found) {
            throw new Error(`Unable to find module ${name} as a direct or indirect dependency of ${this.assembly.name}`);
        }

        return found;

        function lookupModule(parent: spec.PackageVersion): spec.PackageVersion | undefined {
            const indirect = parent.dependencies && parent.dependencies[name];
            if (indirect) {
                return indirect;
            }

            for (const depName of Object.keys(parent.dependencies || { })) {
                const dep = parent.dependencies![depName];

                if (depName === name) {
                    return dep;
                }

                const transitive = lookupModule(dep);
                if (transitive) {
                    return transitive;
                }
            }

            return undefined;
        }

    }

    protected findType(fqn: string) {

        const lookupType = (asm: spec.Assembly): spec.Type | undefined => {

            const type = asm.types && asm.types[fqn];
            if (type) {
                return type;
            }

            const externalType = this.externals[fqn];
            if (externalType) {
                return externalType;
            }

            return undefined;
        }

        const ret = lookupType(this.assembly);
        if (!ret) {
            throw new Error(`Cannot find type '${fqn}' either as internal or external type`);
        }

        return ret;
    }

    /**
     * Loads a dependency assembly and makes the types it defines available in ``this.externals``. The modules are
     * loaded transitively (dependencies of the assembly will be loaded using this function, too).
     *
     * @param name       the name of the dependency to be loaded.
     * @param version    the expected (aka declared) version of the dependency.
     * @param packageDir the root directory of the package that declares the dependency.
     * @param loaded     a cache of already-loaded modules (helps avoid multi-loading dependencies that appear multiple
     *                   times in the full dependency closure).
     *
     * @throws if no module with the requested name can be resolved (using npm resolution mechanisms), if the resolved
     *         module lacks a ``.jsii`` file, or if the version does not match the requested one (TODO: Semver?).
     */
    private async loadDependency(name: string, version: string, packageDir: string, loaded: Set<string>) {
        if (loaded.has(name)) { return; }
        const moduleRoot = util.resolveDependencyDirectory(packageDir, name);
        const assm = await util.loadAssembly(moduleRoot);
        if (assm.version !== version) {
            throw new Error(`Module ${name} found with version ${assm.version}, but version ${version} was expected`);
        }
        for (const type of Object.values(assm.types || {})) {
            this.externals[type.fqn] = type;
        }
        loaded.add(name);
        for (const depName of Object.keys(assm.dependencies || {})) {
            const dep = assm.dependencies![depName];
            await this.loadDependency(depName, dep.version, moduleRoot, loaded);
        }
    }
}
