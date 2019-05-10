import clone = require('clone');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import {PrimitiveTypeReference} from "jsii-spec";
import path = require('path');
import xmlbuilder = require('xmlbuilder');
import {Generator, GeneratorOptions} from '../generator';
import logging = require('../logging');
import { PackageInfo, Target, TargetOptions } from '../target';
import { shell } from '../util';
import { FileGenerator } from './dotnet/filegenerator';
import nameutils = require('./dotnet/nameutils');

export default class Dotnet extends Target {
    public static toPackageInfos(assm: spec.Assembly): { [language: string]: PackageInfo } {
        const packageId = assm.targets!.dotnet!.packageId;
        const version = assm.version;
        const packageInfo: PackageInfo = {
            repository: 'Nuget',
            url: `https://www.nuget.org/packages/${packageId}/${version}`,
            usage: {
                'csproj': {
                    language: 'xml',
                    code: `<PackageReference Include="${packageId}" Version="${version}" />`
                },
                'dotnet': {
                    language: 'console',
                    code: `dotnet add package ${packageId} --version ${version}`
                },
                'packages.config': {
                    language: 'xml',
                    code: `<package id="${packageId}" version="${version}" />`
                }
            }
        };
        return {'C#': packageInfo};
    }

    // @ts-ignore: type is a required parameter
    public static toNativeReference(type: spec.Type, options: any) {
        return {
            'c#': `using ${options.namespace};`
        };
    }

    protected readonly generator = new DotNetGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public async build(sourceDir: string, outDir: string): Promise<void> {
        await this.generateNuGetConfigForLocalDeps(sourceDir, outDir);
        const pkg = await fs.readJson(path.join(this.packageDir, 'package.json'));
        const packageId: string = pkg.jsii.targets.dotnet.packageId;
        const project: string = path.join(packageId, `${packageId}.csproj`);

        await shell(
            'dotnet',
            [ 'build', project, '-c', 'Release' ],
            { cwd: sourceDir }
        );

        await this.copyFiles(
            path.join(sourceDir, packageId, 'bin', 'Release'),
            outDir);
        await fs.remove(path.join(outDir, 'netstandard2.0'));
    }

    private async generateNuGetConfigForLocalDeps(sourceDirectory: string, currentOutputDirectory: string): Promise<void> {
        // Traverse the dependency graph of this module and find all modules that have
        // an <outdir>/dotnet directory. We will add those as local NuGet repositories.
        // This enables building against local modules.
        const localRepos = await this.findLocalDepsOutput(this.packageDir);

        // Add the current output directory as a local repo for the case where we build multiple packages
        // into the same output. NuGet throws an error if a source directory doesn't exist, so we check
        // before adding it to the list.
        if (await fs.pathExists(currentOutputDirectory)) {
            localRepos.push(currentOutputDirectory);
        }

        // If dotnet-jsonmodel is checked-out and we can find a local repository, add it to the list.
        try {
            const jsiiDotNetJsonModel = require('jsii-dotnet-jsonmodel');
            const localDotNetJsonModel = jsiiDotNetJsonModel.repository;
            if (await fs.pathExists(localDotNetJsonModel)) {
                localRepos.push(localDotNetJsonModel);
            }
        } catch {
            // Couldn't locate jsii-dotnet-jsonmodel, which is owkay!
        }

        // If dotnet-runtime is checked-out and we can find a local repository, add it to the list.
        try {
            const jsiiDotNetRuntime = require('jsii-dotnet-runtime');
            const localDotNetRuntime = jsiiDotNetRuntime.repository;
            if (await fs.pathExists(localDotNetRuntime)) {
                localRepos.push(localDotNetRuntime);
            }
        } catch {
            // Couldn't locate jsii-dotnet-runtime, which is owkay!
        }

        logging.debug('local NuGet repos:', localRepos);

        // Construct XML content.
        const configuration = xmlbuilder.create('configuration', { encoding: 'UTF-8' });
        const packageSources = configuration.ele('packageSources');

        const nugetOrgAdd = packageSources.ele('add');
        nugetOrgAdd.att('key', 'nuget.org');
        nugetOrgAdd.att('value', 'https://api.nuget.org/v3/index.json');
        nugetOrgAdd.att('protocolVersion', '3');

        localRepos.forEach((repo, index) => {
            const add = packageSources.ele('add');
            add.att('key', `local-${index}`);
            add.att('value', path.join(repo));
        });

        const xml = configuration.end({ pretty: true });

        // Write XML content to NuGet.config.
        const filePath = path.join(sourceDirectory, 'NuGet.config');
        logging.debug(`Generated ${filePath}`);
        await fs.writeFile(filePath, xml);
    }
}

// #####################
// # CODE GENERATOR V2 #
// #####################
class DotNetGenerator extends Generator {

    // This will be used to keep track of the referenced namespaces.
    public referencedNamespaces: string[] = ["Amazon.JSII.Runtime.Deputy"];

    // The path of the original jsii input model.
    private jsiiFilePath: string;

    constructor(options = new GeneratorOptions()) {
        super(options);

        // Override the openBlock to get a correct C# looking code block with the curly brace after the line
        this.code.openBlock = function(s) {
            this.line(s);
            this.open('{');
        };
    }

    public async load(packageRoot: string) {
        await super.load(packageRoot);
        this.jsiiFilePath = path.join(packageRoot, spec.SPEC_FILE_NAME);
    }

    /**
     * Runs the generator (in-memory).
     */
    public generate(fingerprint: boolean) {
        super.generate(fingerprint);
    }

    public async save(outdir: string, tarball: string): Promise<any> {
        // Generating the csproj and AssemblyInfo.cs files
        const tarballFileName = tarball.substr(tarball.lastIndexOf('/') + 1);
        const filegen = new FileGenerator(this.assembly, tarballFileName, this.code);
        filegen.generateProjectFile();
        filegen.generateAssemblyInfoFile();

        // Calling super.save() dumps the tarball in the format name@version.jsii.tz.
        // This is not in sync with the Old .NET generator where the name is scope-name-version.tgz.
        // Hence we are saving the files ourselves here:
        const assm = this.assembly;
        const packageId: string = assm.targets!.dotnet!.packageId;
        await fs.mkdirs(path.join(outdir, packageId));
        await fs.copyFile(tarball, path.join(outdir, packageId, tarballFileName));

        // Saving the generated code.
        await this.code.save(outdir);

        // Copying the .jsii file
        await fs.copyFile(this.jsiiFilePath, path.join(outdir, packageId, spec.SPEC_FILE_NAME));
    }

    // Not used as we override the save() method
    protected getAssemblyOutputDir(mod: spec.Assembly) {
        return nameutils.convertPackageName((mod.name));
    }

    // namespaces are handled implicitly by openFileIfNeeded().
    protected onBeginNamespace(ns: string) {
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    protected onEndNamespace(ns: string) {
        // Create an anchor file for the current namespace
        this.generateDependencyAnchorFile();
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        const interfaceName = nameutils.convertInterfaceName(ifc.name);
        this.openFileIfNeeded(interfaceName, this.assembly.targets!.dotnet!.namespace, this.isNested(ifc));

        // all interfaces always extend JsiiInterface so we can identify that it is a jsii interface.
        const interfaces = ifc.interfaces || [];
        const bases = [ interfaces.map(x => x) ].join(', ');

        // [JsiiInterface(nativeType: typeof(IIVeryBaseInterface), fullyQualifiedName: "@scope/jsii-calc-base-of-base.IVeryBaseInterface")]
        this.code.line("[JsiiInterface(nativeType: typeof(" +
            nameutils.convertInterfaceName(ifc.name) + "), fullyQualifiedName: \"" + ifc.fqn + "\")]");

        if (bases.length > 0) {
            this.code.openBlock(`public interface ${interfaceName} : ${bases}`);
        } else {
            this.code.openBlock(`public interface ${interfaceName}`);
        }
    }

    protected onEndInterface(ifc: spec.InterfaceType) {
        const interfaceName = nameutils.convertInterfaceName(ifc.name);

        this.code.closeBlock();

        this.closeFileIfNeeded(interfaceName, this.isNested(ifc));

        // emit interface proxy class
        this.emitInterfaceProxy(ifc);

        // emit implementation class
        // TODO: if datatype then we don't need the interface to be created, We could do with just the interface impl?
        if (ifc.datatype) {
            this.emitInterfaceDataType(ifc);
        }
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        const returnType = method.returns ? this.toDotNetType(method.returns.type) : 'void';
        this.code.line('[JsiiMethod(name: "' + method.name + '")]');
        this.code.line(`${returnType} ${nameutils.convertMethodName(method.name)}(${this.renderMethodParameters(method)});`);
    }

    protected onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onInterfaceMethod(ifc, overload);
    }

    protected onInterfaceProperty(_ifc: spec.InterfaceType, prop: spec.Property) {
        if (!prop.abstract) {
            throw new Error(`Interface properties must be abstract: ${prop.name}`);
        }

        if (prop.protected) {
            throw new Error(`Protected properties are not allowed on interfaces: ${prop.name}`);
        }

        if (prop.static) {
            throw new Error(`Property ${_ifc.name}.${prop.name} is marked as static, but interfaces must not contain static members.`);
        }

        const fullPropTypes = this.toDotNetType(prop.type);
        const propName = nameutils.convertPropertyName(prop.name);

        // Emit Jssi Attribute
        // Compute the property fqn from the class fqn and the type
        const propFqn = _ifc.fqn.substr(0, _ifc.fqn.lastIndexOf('.')) + '.'
            + fullPropTypes.toString().split('.').pop();

        this.code.line('[JsiiProperty(name: "' + prop.name + '", typeJson: "{\\"fqn\\":\\"' + propFqn + '\\"}")]');

        if (fullPropTypes.length > 1) {// Union type
            this.code.openBlock(`object ${propName}`);
        } else {
            const shortPropType = fullPropTypes.toString().split('.').pop();
            this.code.openBlock(`${shortPropType} ${propName}`);
        }

        this.code.line('get;');
        if (!prop.immutable) {
            this.code.line('set;');
        }
        this.code.closeBlock();
        this.code.line();
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
        this.openFileIfNeeded(cls.name, this.assembly.targets!.dotnet!.namespace, this.isNested(cls));

        const classBase = this.getClassBase(cls);
        const extendsExpression = classBase ? ` : ${classBase}` : '';

        let implementsExpr = '';
        if (cls.interfaces && cls.interfaces.length > 0) {
            implementsExpr = ' implements ' + cls.interfaces.map(x => this.toNativeFqn(x));
        }

        // Nested classes will be dealt with during calc-base and calc code generation
        const nested = this.isNested(cls);
        const inner = nested ? ' static' : '';
        const absPrefix = abstract ? ' abstract' : '';

        const className = nameutils.convertClassName(cls.name);

        // Emit Jsii Attribute
        this.code.line('[JsiiClass(nativeType: typeof(' + className + '), fullyQualifiedName: "' + cls.fqn + '")]');

        this.code.openBlock(`public${inner}${absPrefix} class ${className}${extendsExpression}${implementsExpr}`);

        // Create the constructors:
        this.code.openBlock(`public ${className}(): base(new DeputyProps(new object[]{}))`);
        this.code.closeBlock();
        this.code.line();
        this.code.openBlock(`protected ${className}(ByRefValue reference): base(reference)`);
        this.code.closeBlock();
        this.code.line();
        this.code.openBlock(`protected ${className}(DeputyProps props): base(props)`);
        this.code.closeBlock();
        this.code.line();
    }

    protected onEndClass(cls: spec.ClassType) {
        if (cls.abstract) {
            this.emitInterfaceProxy(cls);
        }

        this.code.closeBlock();
        this.closeFileIfNeeded(cls.name, this.isNested(cls));
    }

    protected onField(cls: spec.ClassType, prop: spec.Property, union?: spec.UnionTypeReference) {
        /* tslint:disable-next-line no-unused-expression */
        cls; prop; union;
    }

    protected onMethod(cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(cls, method);
    }

    protected onMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onMethod(cls, overload);
    }

    protected onProperty(cls: spec.ClassType, prop: spec.Property) {
        this.emitProperty(cls, prop);
    }

    protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(cls, method);
    }

    protected onStaticMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.emitMethod(cls, overload);
    }

    protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
        if (prop.const) {
            this.emitConstProperty(prop);
        } else {
            this.emitProperty(cls, prop);
        }
    }

    protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
        this.emitProperty(cls, prop);
    }

    private emitMethod(cls: spec.Type, method: spec.Method, overrides: boolean = !!method.overrides) {
        // cls and overrides will be used later when implementing calc-base and calc
        /* tslint:disable-next-line no-unused-expression */
        cls;
        /* tslint:disable-next-line no-unused-expression */
        overrides;
        const returnType = method.returns ? this.toDotNetType(method.returns.type) : 'void';
        const statc = method.static ? 'static ' : '';
        const access = this.renderAccessLevel(method);
        // TODO: handle async methods when impl calc-base and calc
        // const async = !!method.async;
        const methodName = nameutils.convertMethodName(method.name);
        const signature = `${returnType} ${methodName}(${this.renderMethodParameters(method)})`;
        // TODO: handle overrides in methods when impl calc-base and calc
        // if (overrides) { this.code.line('TODO: handle overrides in methods when impl calc-base and calc'); }
        if (method.abstract) {
            // TODO: add Jsii initializers for abstract methods when impl calc-base and calc
            this.code.line(`${access} abstract ${signature};`);
        } else {
            if (method.returns) {
                const isPrimitive = spec.isPrimitiveTypeReference(method.returns.type);
                if (isPrimitive) {
                    // Emit Jsii Attribute
                    const prim = method.returns.type as PrimitiveTypeReference;
                    this.code.line('[JsiiMethod(name: "' + method.name
                        + '", returnsJson: "{\\"type\\":{\\"primitive\\":\\"' + this.toDotNetPrimitive(prim.primitive) + '\\"}}")]');
                }
                this.code.openBlock(`${access} ${statc}${signature}`);
                this.code.line('return InvokeInstanceMethod<' + returnType + '>(new object[]{});');
            } else {
                // Emit Jsii attribute
                this.code.line('[JsiiMethod(name: "' + method.name + '")]');
                this.code.openBlock(`${access} ${statc}${signature}`);
                this.code.line('InvokeInstanceVoidMethod(new object[]{});');
            }
            this.code.closeBlock();
        }
    }

    private renderMethodParameters(method: spec.Method) {
        // TODO: handle variadic parameters when impl calc-base and calc
        const params = [];
        if (method.parameters) {
            for (const p of method.parameters) {
                const nullable = this.isNullable(p) ? `?` : '';
                params.push(`${this.toDotNetType(p.type)}${nullable} ${p.name}`);
            }
        }
        return params.join(', ');
    }

    private isNullable(optionalValue: spec.OptionalValue | undefined): boolean {
        if (!optionalValue) {
            return false;
        }
        return optionalValue.optional
            || (spec.isPrimitiveTypeReference(optionalValue.type)
                && optionalValue.type.primitive === spec.PrimitiveType.Any);
    }

    private emitInterfaceProxy(ifc: spec.InterfaceType | spec.ClassType) {
        const name = nameutils.convertClassName(ifc.name + 'Proxy');
        this.openFileIfNeeded(name, this.assembly.targets!.dotnet!.namespace, false);

        const suffix = `: DeputyBase, ${nameutils.convertInterfaceName(ifc.name)}`;

        // Emit Jsii Attribute
        this.code.line("[JsiiTypeProxy(nativeType: typeof(" +
            nameutils.convertInterfaceName(ifc.name) + "), fullyQualifiedName: \"" + ifc.fqn + "\")]");
        this.code.openBlock(`internal sealed class ${name} ${suffix}`);

        // Create the private constructor
        this.code.openBlock(`private ${name}(ByRefValue reference): base(reference)`);
        this.code.closeBlock();
        this.code.line();

        // This code was pulled from the java generator
        // compile a list of all unique methods from the current interface and all
        // base interfaces (and their bases).
        const methods: { [name: string]: spec.Method } = {};
        const properties: { [name: string]: spec.Property } = {};
        const collectAbstractMembers = (currentType: spec.InterfaceType | spec.ClassType) => {
            for (const prop of currentType.properties || []) {
                if (prop.abstract) {
                    properties[prop.name] = prop;
                }
            }
            for (const method of currentType.methods || []) {
                if (method.abstract) {
                    methods[method.name!] = method;
                }
            }

            const bases = new Array<spec.NamedTypeReference>();
            bases.push(...(currentType.interfaces || []).map(iface => this.findType(iface)));
            if (currentType.kind === spec.TypeKind.Class && currentType.base) {
                bases.push(this.findType(currentType.base));
            }
            for (const base of bases) {
                const type = this.findType(base.fqn!);
                if (type.kind !== spec.TypeKind.Interface && type.kind !== spec.TypeKind.Class) {
                    throw new Error(`Base interfaces of an interface must be an interface or a class (${base.fqn} is of type ${type.kind})`);
                }
                collectAbstractMembers(type);
            }
        };
        collectAbstractMembers(ifc);

        // emit all properties
        for (const propName of Object.keys(properties)) {
            const prop = clone(properties[propName]);
            prop.abstract = false;
            // Emit the property with the instance getters
            this.emitProperty(ifc, prop, !!prop.overrides, true);
        }

        // emit all the methods
        for (const methodName of Object.keys(methods)) {
            const method = clone(methods[methodName]);
            method.abstract = false;
            this.emitMethod(ifc, method, /* overrides: */ true);

            for (const overloadedMethod of this.createOverloadsForOptionals(method)) {
                overloadedMethod.abstract = false;
                this.emitMethod(ifc, overloadedMethod, /* overrides: */ true);
            }
        }

        this.code.closeBlock();
        this.closeFileIfNeeded(name, this.isNested(ifc));
    }

    // This is used to emit a class implementing an interface when the datatype property is true in the jsii model
    // The generation of the interface proxy might not be useful if the interface is also set as a datatype
    private emitInterfaceDataType(ifc: spec.InterfaceType | spec.ClassType) {

        // TODO: Figure out what to do if the interface starts with an I
        const name = nameutils.convertClassName(ifc.name);

        this.openFileIfNeeded(name, this.assembly.targets!.dotnet!.namespace, this.isNested((ifc)));

        const suffix = `: ${nameutils.convertInterfaceName(ifc.name)}`;

        this.code.line(`[JsiiByValue]`);
        this.code.openBlock(`public class ${name} ${suffix}`);

        // This code was pulled from the java generator
        // compile a list of all unique methods from the current interface and all
        // base interfaces (and their bases).
        const methods: { [name: string]: spec.Method } = {};
        const properties: { [name: string]: spec.Property } = {};
        const collectAbstractMembers = (currentType: spec.InterfaceType | spec.ClassType) => {
            for (const prop of currentType.properties || []) {
                if (prop.abstract) {
                    properties[prop.name] = prop;
                }
            }
            for (const method of currentType.methods || []) {
                if (method.abstract) {
                    methods[method.name!] = method;
                }
            }

            const bases = new Array<spec.NamedTypeReference>();
            bases.push(...(currentType.interfaces || []).map(iface => this.findType(iface)));
            if (currentType.kind === spec.TypeKind.Class && currentType.base) {
                bases.push(this.findType(currentType.base));
            }
            for (const base of bases) {
                const type = this.findType(base.fqn!);
                if (type.kind !== spec.TypeKind.Interface && type.kind !== spec.TypeKind.Class) {
                    throw new Error(`Base interfaces of an interface must be an interface or a class (${base.fqn} is of type ${type.kind})`);
                }
                collectAbstractMembers(type);
            }
        };
        collectAbstractMembers(ifc);

        // emit all properties
        for (const propName of Object.keys(properties)) {
            const prop = clone(properties[propName]);
            prop.abstract = false;
            // Emit the property with the instance getters
            this.emitProperty(ifc, prop, !!prop.overrides, false);
        }

        // emit all the methods
        for (const methodName of Object.keys(methods)) {
            const method = clone(methods[methodName]);
            method.abstract = false;
            this.emitMethod(ifc, method, /* overrides: */ true);

            for (const overloadedMethod of this.createOverloadsForOptionals(method)) {
                overloadedMethod.abstract = false;
                this.emitMethod(ifc, overloadedMethod, /* overrides: */ true);
            }
        }

        this.code.closeBlock();
        this.closeFileIfNeeded(name, this.isNested(ifc));
    }

    private emitProperty(cls: spec.Type, prop: spec.Property, overrides: boolean = !!prop.overrides, emitInstanceGetter = false) {
        const fullPropTypes = this.toDotNetType(prop.type, true);
        const shortPropType = fullPropTypes.toString().split('.').pop();
        const access = this.renderAccessLevel(prop);
        const statc = prop.static ? 'static ' : '';
        const propName = nameutils.convertPropertyName(prop.name);
        // Compute the property fqn from the class fqn and the type
        const propFqn = cls.fqn.substr(0, cls.fqn.lastIndexOf('.')) + '.' + shortPropType;
        // Emit the Jsii attribute
        const jsiiAttribute = "[JsiiProperty(\"" + prop.name + "\", \"{\\\"fqn\\\":\\\"" + propFqn + "\\\"}\", " +
            "isOptional: " + !!prop.optional + ", isOverride: " + !!prop.overrides + ")]";
        this.code.line(jsiiAttribute);
        if (fullPropTypes.length > 1) {// Union type
            this.code.openBlock(`object ${propName}`);
        } else {
            const statement = `${access} ${statc}${shortPropType} ${propName}`;
            this.code.openBlock(statement);
            if (emitInstanceGetter) {
                const getter = `get => GetInstanceProperty<${shortPropType}>();`;
                this.code.line(getter);
            } else {
                this.code.line('get;');
            }
        }

        if (!prop.immutable) {
            this.code.line('set;');
        }
        this.code.closeBlock();
        this.code.line();

        // TODO: handle cls and overrides when impl calc-base and calc?
        /* tslint:disable-next-line no-unused-expression */
        cls; overrides;
    }

    // This is not use by base-of-base, will be checked when impl calc-base and calc
    private emitConstProperty(prop: spec.Property) {
        const propType = this.toDotNetType(prop.type);
        const propName = this.code.toPascalCase(prop.name);
        const access = this.renderAccessLevel(prop);

        this.code.line(`${access} const ${propType} ${propName};`);
    }

    private renderAccessLevel(method: spec.Method | spec.Property) {
        return method.protected ? 'protected' : 'public';
    }

    private getClassBase(cls: spec.ClassType) {
        if (!cls.base) {
            return 'DeputyBase';
        }
        // else {
        // TODO: when impl calc-base and calc:
        // TODO: add the base namespace to the list of using statements?
        // TODO: Namespaces.Add(cls.base);
        // }

        return this.toDotNetType({ fqn: cls.base });
    }

    private isNested(type: spec.Type) {
        if (!this.assembly.types || !type.namespace) { return false; }
        const parent = `${type.assembly}.${type.namespace}`;
        return parent in this.assembly.types;
    }

    private toDotNetType(typeref: spec.TypeReference, forMarshalling = false): string[] {
        if (spec.isPrimitiveTypeReference(typeref)) {
            return [ this.toDotNetPrimitive(typeref.primitive) ];
        } else if (spec.isCollectionTypeReference(typeref)) {
            return [ this.toDotNetCollection(typeref, forMarshalling) ];
        } else if (spec.isNamedTypeReference(typeref)) {
            return [ this.toNativeFqn(typeref.fqn) ];
        } else if (typeref.union) {
            const types = new Array<string>();
            for (const subtype of typeref.union.types) {
                for (const t of this.toDotNetType(subtype, forMarshalling)) {
                    types.push(t);
                }
            }
            return types;
        } else {
            throw new Error('Invalid type reference: ' + JSON.stringify(typeref));
        }
    }

    private toDotNetPrimitive(primitive: spec.PrimitiveType) {
        switch (primitive) {
            case spec.PrimitiveType.Boolean: return 'bool';
            case spec.PrimitiveType.Date: return 'System.Datetime';
            case spec.PrimitiveType.Json: return 'object';
            case spec.PrimitiveType.Number: return 'double';
            case spec.PrimitiveType.String: return 'string';
            case spec.PrimitiveType.Any: return 'object';
            default:
                throw new Error('Unknown primitive type: ' + primitive);
        }
    }

    private toDotNetCollection(ref: spec.CollectionTypeReference, forMarshalling: boolean) {
        const elementDotNetType = this.toDotNetType(ref.collection.elementtype);
        switch (ref.collection.kind) {
            // TODO: add using statement to System.Collections.Generic
            // when impl calc-base and calc
            case spec.CollectionKind.Array: return forMarshalling ? 'IList' : `List<${elementDotNetType}>`;
            case spec.CollectionKind.Map: return forMarshalling ? 'IDictionary' : `Dictionary<string, ${elementDotNetType}>`;
            default:
                throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
        }
    }

    private toNativeFqn(fqn: string): string {
        const [mod, ...name] = fqn.split('.');
        const depMod = this.findModule(mod);
        return this.getNativeName(depMod, name.join('.'), mod);
    }

    // This is ported over from the Java generator
    private getNativeName(assm: spec.PackageVersion, name: string | undefined, assmName: string): string;
    private getNativeName(assm: spec.Assembly | spec.PackageVersion,
                          name: string | undefined,
                          assmName: string = (assm as spec.Assembly).name): string {
        const dotnetPackageId = assm.targets && assm.targets.dotnet && assm.targets.dotnet.packageId;
        if (!dotnetPackageId) { throw new Error(`The module ${assmName} does not have a dotnet.packageId setting`); }
        return `${dotnetPackageId}${name ? `.${name}` : ''}`;
    }

    private toCSharpFilePath(type: string) {
        return nameutils.convertTypeName(type) + ".cs";
    }

    private openFileIfNeeded(typeName: string, namespace: string, isNested: boolean) {
        // If Nested type, we shouldn't open/close a file
        if (isNested) {
            return;
        }
        const dotnetPackageId = this.assembly.targets && this.assembly.targets.dotnet && this.assembly.targets.dotnet.packageId;
        if (!dotnetPackageId) { throw new Error(`The module ${this.assembly.name} does not have a dotnet.packageId setting`); }
        const filePath = namespace.replace(/[.]/g, '/');
        this.createDirectoryPaths(filePath);
        this.code.openFile(dotnetPackageId + '/' + filePath + '/' + this.toCSharpFilePath(typeName));
        this.referencedNamespaces.map(n => this.code.line(`using ${n};`));
        this.code.line();
        this.code.openBlock(`namespace ${namespace}`);
    }

    private createDirectoryPaths(fullPath: string) {
        fs.mkdirsSync(path.dirname(fullPath));
    }

    private closeFileIfNeeded(typeName: string, isNested: boolean) {
        if (isNested) {
            return;
        }
        this.code.closeBlock();
        this.code.closeFile(this.toCSharpFilePath(typeName));
    }

    private generateDependencyAnchorFile() {
        const namespace: string = this.assembly.targets!.dotnet!.namespace + ".Internal.DependencyResolution";
        this.openFileIfNeeded("Anchor", namespace, false);
        this.code.openBlock("public class Anchor");
        this.code.openBlock("public Anchor()");
        // TODO: We will have to make the Base anchor call the base of base anchor etc..
        this.code.closeBlock();
        this.code.closeBlock();
        this.closeFileIfNeeded("Anchor", false);
    }
}