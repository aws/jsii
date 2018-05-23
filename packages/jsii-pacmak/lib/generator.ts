import * as clone from 'clone';
import { CodeMaker } from 'codemaker';
import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as path from 'path';

// tslint:disable

/**
 * Options for the code generator framework.
 */
export class GeneratorOptions {
    /**
     * The target language.
     * If not defined, toNativeFqn(fqn) won't work.
     */
    target?: string

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

/**
 * Abstract base class for jsii package generators.
 * Given a jsii module, it will invoke "events" to emit various elements.
 */
export abstract class Generator {
    private readonly options: GeneratorOptions;
    private readonly mod: spec.Assembly
    private readonly excludeTypes = new Array<string>();
    private readonly target?: string
    protected readonly code = new CodeMaker();

    constructor(mod: spec.Assembly, private readonly bundleFilePath: string, options = new GeneratorOptions()) {
        if (mod.schema !== spec.SPEC_VERSION) {
            throw new Error(`Invalid schema version "${mod.schema}". Expecting "${spec.SPEC_VERSION}"`);
        }

        this.mod = mod
        this.options = options;
        this.target = options.target;
    }

    /**
     * Runs the generator (in-memory).
     */
    generate() {
        this.onBeginAssembly(this.mod);
        this.visit(this.mod.nametree);
        this.onEndAssembly(this.mod);
    }

    /**
     * Saves all generated files to an output directory, creating any subdirs if needed.
     */
    async save(outdir: string) {

        // store a copy of the assembly as the destination module.
        const assemblyPath = this.getAssemblyOutputPath(this.mod);
        if (assemblyPath) {
            const fullPath = path.join(outdir, assemblyPath);
            await fs.mkdirp(path.dirname(fullPath));
            await fs.writeFile(fullPath, JSON.stringify(this.mod, undefined, 2));
        }

        const bundleDest = this.getBundleOutDir(this.mod);
        if (bundleDest) {
            console.warn('WARNING: getBundleOutDir is deprecated. Use getAssemblyOutputPath instead. The new assembly format contains both the spec and the code');
            const bundleFile = path.join(outdir, bundleDest, spec.BUNDLE_FILE_NAME);
            await fs.copy(this.bundleFilePath, bundleFile);
        }

        return await this.code.save(outdir);
    }

    /**
     * Given an FQN returns it's "native FQN" based on the language.
     * For example, jsii$module.name.space.Type => com.mymodule.name.space.Type
     */
    protected toNativeFqn(fqn: string) {
        if (!this.target) {
            throw new Error('You must specify the `target` option in order to use toNativeFqn');
        }

        // a jsii FQN always starts with the jsii$ prefix
        if (fqn.indexOf(spec.MODULE_NAME_PREFIX) !== 0) {
            throw new Error(`jsii FQNs must start with ${spec.MODULE_NAME_PREFIX}: ${fqn}`);
        }

        const components = fqn.split('.');
        const moduleName = components[0];

        let typeName = components.slice(1);


        const names = this.mod.nativenames[moduleName];
        if (!names) {
            throw new Error(`Cannot find native names for module ${moduleName}`);
        }

        const nativeModule = names[this.target];
        if (!nativeModule) {
            throw new Error(`Cannot find '${this.target}' name for module '${moduleName}' of fqn '${fqn}'`);
        }

        return [ nativeModule ].concat(typeName).join('.');
    }

    //
    // Bundled assembly
    // jsii modules should bundle the assembly itself as a resource and use the load() kernel API to load it.
    //

    /**
     * Returns the destination path for the assembly file.
     */
    protected getAssemblyOutputPath(mod: spec.Assembly): string | undefined { mod; this.notImpl('getAssemblyOutputPath'); return undefined; }

    /**
     * @deprecated Implement getAssemblyOutputPath - this is where the full assembly which contains the spec + code should be stored.
     */
    protected getBundleOutDir(_mod: spec.Assembly): undefined | string { return undefined; }

    //
    // Assembly

    protected onBeginAssembly(_assm: spec.Assembly) { }
    protected onEndAssembly(_assm: spec.Assembly) { }

    //
    // Namespaces

    protected onBeginNamespace(ns: string) { ns; this.notImpl('onBeginNamespace'); }
    protected onEndNamespace(ns: string) { ns; this.notImpl('onEndNamespace'); }

    //
    // Classes

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) { cls; abstract; this.notImpl('onBeginClass'); }
    protected onEndClass(cls: spec.ClassType) { cls; this.notImpl('onEndClass'); }

    //
    // Interfaces

    protected abstract onBeginInterface(ifc: spec.InterfaceType): void;
    protected abstract onEndInterface(ifc: spec.InterfaceType): void;
    protected abstract onInterfaceMethod(ifc: spec.InterfaceType, method: spec.Method): void;
    protected abstract onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, originalMethod: spec.Method): void;
    protected abstract onInterfaceProperty(ifc: spec.InterfaceType, prop: spec.Property): void;

    //
    // Initializers (constructos)

    protected onInitializer(cls: spec.ClassType, method: spec.Method) { cls; method; this.notImpl('onInitializer');}
    protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, originalInitializer: spec.Method) { cls; overload; originalInitializer; this.notImpl('onInitializerOverload'); }

    //
    // Properties

    protected onBeginProperties(_cls: spec.ClassType) { }
    protected abstract onProperty(cls: spec.ClassType, prop: spec.Property): void;
    protected onEndProperties(_cls: spec.ClassType) { }

    //
    // Union Properties
    // Those are properties that can accept more than a single type (i.e. String | Token). If the option `expandUnionProperties` is enabled
    // instead of onUnionProperty, the method onExpandedUnionProperty will be called for each of the types defined in the property.
    // `primaryName` indicates the original name of the union property (without the 'AsXxx' postfix).

    protected abstract onUnionProperty(cls: spec.ClassType, prop: spec.Property, union: spec.UnionTypeReference): void;
    protected abstract onExpandedUnionProperty(cls: spec.ClassType, prop: spec.Property, primaryName: string): void;

    //
    // Methods
    // onMethodOverload is triggered if the option `generateOverloadsForMethodWithOptionals` is enabled for each overload of the original method.
    // The original method will be emitted via onMethod.

    protected onBeginMethods(_cls: spec.ClassType) { }
    protected abstract onMethod(cls: spec.ClassType, method: spec.Method): void;
    protected abstract onMethodOverload(cls: spec.ClassType, overload: spec.Method, originalMethod: spec.Method): void
    protected onEndMethods(_cls: spec.ClassType) { }

    //
    // Enums

    protected onBeginEnum(enm: spec.EnumType) { enm; this.notImpl('onBeginEnum'); }
    protected onEndEnum(enm: spec.EnumType) { enm; this.notImpl('onEndEnum'); }
    protected onEnumMember(enm: spec.EnumType, member: spec.EnumMember) { enm; member; this.notImpl('onEnumMember'); }

    //
    // Consts (with values)
    // Note that values are JavaScript types and may need to be serialized to literal based on the programming language.

    protected onBeginConsts(_cls: spec.ClassType) { }
    protected onConstValue(cls: spec.ClassType, constValue: spec.ConstValue, value: any) { cls; constValue; value; this.notImpl('onConstValue'); }
    protected onEndConsts(_cls: spec.ClassType) { }

    //
    // Fields
    // Can be used to implements properties backed by fields in cases where we want to generate "native" classes.
    // The default behavior is that properties do not have backing fields.

    protected hasField(cls: spec.ClassType, prop: spec.Property): boolean { cls; prop; return false; }
    protected onField(cls: spec.ClassType, prop: spec.Property, union?: spec.UnionTypeReference) { cls; prop; union }

    private visit(node: spec.NameTree, names = new Array<string>()) {
        let namespace = (!node._ && names.length > 0) ? names.join('.') : undefined;

        if (namespace) {
            this.onBeginNamespace(namespace);
        }

        let visitChildren = () => {
            Object.keys(node).sort().forEach(name => {
                if (name === '_') return;
                this.visit(node[name], names.concat(name));
            })
        }

        if (node._) {
            let type = this.mod.types[node._];
            if (!type) {
                throw new Error(`Malformed jsii file. Cannot find type: ${node._}`);
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
                        this.visitClass(classSpec, abstract);
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
                        throw new Error('Unsupported type kind: ' + type.kind);
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

    private createOverloadsForOptionals(method: spec.Method) {
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

    private visitClass(cls: spec.ClassType, abstract: boolean) {
        if (cls.consts) {
            this.onBeginConsts(cls);
            cls.consts.forEach(cv => {
                this.onConstValue(cls, cv, this.renderConstValue(cv))
            });
            this.onEndConsts(cls);
        }

        let initializer = cls.initializer;
        if (!abstract && initializer) {

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
                this.onMethod(cls, method);

                for (let overload of this.createOverloadsForOptionals(method)) {
                    this.onMethodOverload(cls, overload, method);
                }
            });
            this.onEndMethods(cls);
        }

        if (cls.properties) {

            this.onBeginProperties(cls);
            cls.properties.forEach(prop => {
                if (this.hasField(cls, prop)) {
                    this.onField(cls, prop, prop.type.union);
                }
            })

            cls.properties.forEach(prop => {
                // emit a regular property
                let union = prop.type.union;

                if (!union) {
                    this.onProperty(cls, prop);
                }
                else {
                    // okay, this is a union. some languages support unions (mostly the dynamic ones) and some will need some help
                    // if `expandUnionProperties` is set, we will "expand" each property that has a union type into multiple properties
                    // and postfix their name with the type name (i.e. FooAsToken).

                    // first, emit a property for the union, for languages that support unions.
                    this.onUnionProperty(cls, prop, union);

                    // if require, we also "expand" the union for languages that don't support unions.
                    if (this.options.expandUnionProperties) {
                        union.types.forEach((type, index) => {
                            // create a clone of this property
                            let propClone = clone(prop) as spec.Property;
                            let primary = this.isPrimaryExpandedUnionProperty(union, index);
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
    protected isPrimaryExpandedUnionProperty(union: spec.UnionTypeReference | undefined, index: number) {
        if (!union) {
            return false;
        }

        return index === union.types.findIndex(t => {
            if (t.primitive) {
                return true;
            }

            // if (t.collection && t.collection.elementtype.primitive) {
            //     return true;
            // }

            return false;
        });
    }

    private renderConstValue(cv: spec.ConstValue) {
        switch (cv.primitive) {
            case spec.PrimitiveType.String:
                return cv.stringValue;
            case spec.PrimitiveType.Number:
                return cv.numberValue;
            case spec.PrimitiveType.Boolean:
                return cv.booleanValue;
            default:
                throw new Error(`Invalid const value primitive type: ${cv.primitive}`);
        }
    }

    private visitEnum(enumSpec: spec.EnumType) {
        if (enumSpec.members) {
            enumSpec.members.forEach(spec => this.onEnumMember(enumSpec, spec));
        }
    }

    private displayNameForType(type: spec.TypeReference): string {
        // last name from FQN
        if (type.fqn) {
            let comps = type.fqn.split('.');
            let last = comps[comps.length - 1];
            return this.code.toPascalCase(last);
        }

        // primitive name
        if (type.primitive) {
            return this.code.toPascalCase(type.primitive);
        }

        // ListOfX or MapOfX
        let coll = type.collection;
        if (coll) {
            return `${this.code.toPascalCase(coll.kind)}Of${this.displayNameForType(coll.elementtype)}`;
        }

        let union = type.union;
        if (union) {
            return union.types.map(t => this.displayNameForType(t)).join('Or');
        }

        throw new Error(`Cannot determine display name for type: ${JSON.stringify(type)}`);
    }

    protected findType(fqn: string) {

        const lookupType = (asm: spec.Assembly): spec.Type | undefined => {

            const type = asm.types[fqn];
            if (type) {
                return type;
            }

            for (const depName of Object.keys(asm.dependencies || { })) {
                const dep = asm.dependencies[depName];
                const found = lookupType(dep);
                if (found) {
                    return found;
                }
            }

            return undefined;
        }

        const ret = lookupType(this.mod);
        if (!ret) {
            throw new Error(`Cannot find type '${fqn}' either as internal or external type`);
        }

        return ret;
    }

    protected notImpl(method: string) {
        console.error(`warning: ${method} is not implemented`);
    }
}
