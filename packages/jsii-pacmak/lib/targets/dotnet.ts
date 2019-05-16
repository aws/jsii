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
import {DotNetDependency, FileGenerator} from './dotnet/filegenerator';
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

    // The path of the original jsii input model.
    private jsiiFilePath: string;

    // The dependency tree for the current jsii input model.
    // This is later used to output the csproj
    private dependencies: Map<string, DotNetDependency> = new Map<string, DotNetDependency>();

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
        // We need to resolve the dependency tree
        this.resolveDependencies();
        super.generate(fingerprint);
    }

    public async save(outdir: string, tarball: string): Promise<any> {
        // Generating the csproj and AssemblyInfo.cs files
        const tarballFileName = tarball.substr(tarball.lastIndexOf('/') + 1);
        const filegen = new FileGenerator(this.assembly, tarballFileName, this.code);
        filegen.generateAssemblyInfoFile();
        filegen.generateProjectFile(this.dependencies);
        // Calling super.save() dumps the tarball in the format name@version.jsii.tz.
        // This is not in sync with the Old .NET generator where the name is scope-name-version.tgz.
        // Hence we are saving the files ourselves here:
        const assm = this.assembly;
        const packageId: string = assm.targets!.dotnet!.packageId;
        await fs.mkdirs(path.join(outdir, packageId));
        await fs.copyFile(tarball, path.join(outdir, packageId, tarballFileName));

        // Create an anchor file for the current model
        this.generateDependencyAnchorFile();

        // Saving the generated code.
        await this.code.save(outdir);

        // Copying the .jsii file
        await fs.copyFile(this.jsiiFilePath, path.join(outdir, packageId, spec.SPEC_FILE_NAME));
    }

    // Generates the Anchor file
    protected generateDependencyAnchorFile() {
        const namespace: string = this.assembly.targets!.dotnet!.namespace + ".Internal.DependencyResolution";
        this.openFileIfNeeded("Anchor", namespace, false, undefined, false);
        this.code.openBlock("public class Anchor");
        this.code.openBlock("public Anchor()");
        this.dependencies.forEach((value: DotNetDependency) => {
            this.code.line(`new ${value.namespace}.Internal.DependencyResolution.Anchor();`);
        });
        this.code.closeBlock();
        this.code.closeBlock();
        this.closeFileIfNeeded("Anchor", false);
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
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    // This resolves the needed dependencies by looking at the .jsii model
    protected resolveDependencies() {
        const assmDependencies = this.assembly.dependencies || {};
        for (const depName of Object.keys(assmDependencies)) {
            const depInfo = assmDependencies[depName];
            if (!this.dependencies.has(depName)) {
                const namespace = depInfo.targets!.dotnet!.namespace;
                const packageId = depInfo.targets!.dotnet!.packageId;
                const version = depInfo.version;
                this.dependencies.set(depName, new DotNetDependency(namespace, packageId, depName, version));
            }
        }
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        // all interfaces always extend JsiiInterface so we can identify that it is a jsii interface.
        const interfaces = ifc.interfaces || [];
        const baseNamespaces: string[] = [];
        const baseTypeNames: string[] = [];

        // For all base members
        for (const base of interfaces) {
            // Retrieve the interface name from the fqn
            const baseFqn = base.substr(0, base.lastIndexOf('.'));
            const baseName = base.substr(base.lastIndexOf('.') + 1);
            // Adding the base type
            baseTypeNames.push(nameutils.convertInterfaceName(baseName));
            if (baseFqn === this.assembly.name) {
                // If the base interface is in the current assembly
                // Nothing to do, we just added it to the list of implemented ifc
            } else {
                // We need to add a reference to the interface assembly in the using statement and the csproj.
                const namespaceName = this.dependencies.get(baseFqn)!.namespace;
                // Adding the namespaceName to the base namespaces for the using statement
                if (!baseNamespaces.includes(namespaceName)) {
                    baseNamespaces.push(namespaceName);
                }
            }
        }

        const interfaceName = nameutils.convertInterfaceName(ifc.name);
        this.openFileIfNeeded(interfaceName, this.assembly.targets!.dotnet!.namespace, this.isNested(ifc), baseNamespaces);

        const jsiiAttribute = `[JsiiInterface(nativeType: typeof(${nameutils.convertInterfaceName(ifc.name)}), fullyQualifiedName: "${ifc.fqn}")]`;
        this.code.line(jsiiAttribute);

        if (baseTypeNames.length > 0) {
            this.code.openBlock(`public interface ${interfaceName} : ${baseTypeNames.join(', ')}`);
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
        // If datatype then we may not need the interface proxy to be created, We could do with just the interface impl?
        if (ifc.datatype) {
            this.emitInterfaceDataType(ifc);
        }
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        const returnType = method.returns ? this.toDotNetType(method.returns.type) : 'void';
        const jsiiAttribute = `[JsiiMethod(name: "${method.name}")]`;
        this.code.line(jsiiAttribute);
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
        let jsiiAttribute = ``;
        if (spec.isPrimitiveTypeReference(prop.type)) {
            jsiiAttribute = `[JsiiProperty(name: "${prop.name}", typeJson: "{\\\"primitive\\\":\\\"${prop.type.primitive}\\\"}")]`;
        } else if (spec.isNamedTypeReference(prop.type)) {
            jsiiAttribute = `[JsiiProperty(name: "${prop.name}", typeJson: "{\\\"fqn\\\":\\\"${prop.type.fqn}\\\"}")]`;
        } else if (spec.isCollectionTypeReference(prop.type)) {
            // TODO: impl other type of Jsii attributes when impl calc
        }
        this.code.line(jsiiAttribute);

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
        let implementsExpr = '';
        const baseNamespaces: string[] = [];
        const baseTypeNames: string[] = [];

        const classBase = this.getClassBase(cls);
        const extendsExpression = classBase ? ` : ${classBase}` : '';

        if (cls.interfaces && cls.interfaces.length > 0) {

            // For all base members
            for (const base of cls.interfaces) {
                // Retrieve the interface name from the fqn
                const baseFqn = base.substr(0, base.lastIndexOf('.'));
                const baseName = base.substr(base.lastIndexOf('.') + 1);
                // Adding the base type
                baseTypeNames.push(nameutils.convertInterfaceName(baseName));
                if (baseFqn === this.assembly.name) {
                    // If the base interface is in the current assembly
                    // Nothing to do, we just added it to the list of implemented ifc
                } else {
                    // We need to add a reference to the interface assembly in the using statement and the csproj.
                    const namespaceName = this.dependencies.get(baseFqn)!.namespace;
                    // Adding the namespaceName to the base namespaces for the using statement
                    if (!baseNamespaces.includes(namespaceName)) {
                        baseNamespaces.push(namespaceName);
                    }
                }
            }
            implementsExpr = classBase ? ', ' + baseTypeNames.join(', ') : ' : ' + baseTypeNames.join(', ');
        }

        this.openFileIfNeeded(cls.name, this.assembly.targets!.dotnet!.namespace, this.isNested(cls), baseNamespaces);

        // Nested classes will be dealt with during calc code generation
        const nested = this.isNested(cls);
        const inner = nested ? ' static' : '';
        const absPrefix = abstract ? ' abstract' : '';

        const className = nameutils.convertClassName(cls.name);

        if (cls.docs!) {
            this.code.line(`/// <summary>${cls.docs!.summary}</summary>`);
        }
        // Emit Jsii Attribute
        const jsiiAttribute = `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: "${cls.fqn}")]`;
        this.code.line(jsiiAttribute);

        this.code.openBlock(`public${inner}${absPrefix} class ${className}${extendsExpression}${implementsExpr}`);

        // Create the constructors:
        if (cls.abstract) {
            // Abstract classes have protected constructors.
            this.code.openBlock(`protected ${className}(): base(new DeputyProps(new object[]{}))`);
        } else {
            this.code.openBlock(`public ${className}(): base(new DeputyProps(new object[]{}))`);
        }

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
        this.code.closeBlock();
        this.closeFileIfNeeded(cls.name, this.isNested(cls));

        if (cls.abstract) {
            this.emitInterfaceProxy(cls);
        }
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
        // overrides will be used later when implementing calc-base and calc
        /* tslint:disable-next-line no-unused-expression */
        overrides;
        const returnType = method.returns ? this.toDotNetType(method.returns.type) : 'void';
        const statc = method.static ? 'static ' : '';
        // If we are emiting a method for a class (and not a proxy), the method should be virtual.
        const virtual = cls.kind === spec.TypeKind.Class ? 'virtual ' : '';

        const access = this.renderAccessLevel(method);
        // TODO: handle async methods when impl calc-base and calc
        // const async = !!method.async;
        const methodName = nameutils.convertMethodName(method.name);
        const signature = `${returnType} ${methodName}(${this.renderMethodParameters(method)})`;
        // TODO: handle overrides in methods when impl calc-base and calc
        // if (overrides) { this.code.line('TODO: handle overrides in methods when impl calc-base and calc'); }
        if (method.abstract) {
            // TODO: add Jsii attribute for abstract methods when impl calc-base and calc
            this.code.line(`${access} abstract ${signature};`);
            this.code.line();
        } else {
            if (method.returns) {
                if (method.docs!) {
                    this.code.line(`/// <returns>${method.docs!.returns}</returns>`);
                }
                const isPrimitive = spec.isPrimitiveTypeReference(method.returns.type);
                if (isPrimitive) {
                    // Emit Jsii Attribute
                    const prim = method.returns.type as PrimitiveTypeReference;
                    const jsiiAttribute =
                        `[JsiiMethod(name: "${method.name}", returnsJson: "{\\"type\\":{\\"primitive\\":\\"${prim.primitive}\\"}}")]`;
                    this.code.line(jsiiAttribute);
                }
                this.code.openBlock(`${access} ${statc}${virtual}${signature}`);
                this.code.line('return InvokeInstanceMethod<' + returnType + '>(new object[]{});');
            } else {
                // Emit Jsii attribute
                const jsiiAttribute = `[JsiiMethod(name: "${method.name}")]`;
                this.code.line(jsiiAttribute);
                this.code.openBlock(`${access} ${statc}${virtual}${signature}`);
                this.code.line('InvokeInstanceVoidMethod(new object[]{});');
            }
            this.code.closeBlock();
            this.code.line();
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

    // Emitting an interface proxy for an interface or an abstract class.
    private emitInterfaceProxy(ifc: spec.InterfaceType | spec.ClassType) {
        const name = nameutils.convertClassName(ifc.name) + 'Proxy';
        this.openFileIfNeeded(name, this.assembly.targets!.dotnet!.namespace, false);

        let suffix = "";
        let jsiiAttribute: string;
        if (ifc.kind === spec.TypeKind.Interface) {
            suffix = `: DeputyBase, ${nameutils.convertInterfaceName(ifc.name)}`;
            jsiiAttribute = `[JsiiTypeProxy(nativeType: typeof(${nameutils.convertInterfaceName(ifc.name)}), fullyQualifiedName: \"${ifc.fqn}\")]`;
        } else {
            if (ifc.docs!) {
                this.code.line(`/// <summary>${ifc.docs!.summary}</summary>`);
            }
            suffix = `: ${nameutils.convertClassName(ifc.name)}`;
            jsiiAttribute = `[JsiiTypeProxy(nativeType: typeof(${nameutils.convertClassName(ifc.name)}), fullyQualifiedName: \"${ifc.fqn}\")]`;
        }
        // Emit Jsii Attribute
        this.code.line(jsiiAttribute);

        this.code.openBlock(`internal sealed class ${name} ${suffix}`);

        // Create the private constructor
        this.code.openBlock(`private ${name}(ByRefValue reference): base(reference)`);
        this.code.closeBlock();
        this.code.line();

        const emitInstanceGetter = true;
        const datatype = false;
        this.emitInterfaceMembersForProxyOrDatatype(ifc, emitInstanceGetter, datatype);

        this.code.closeBlock();
        this.closeFileIfNeeded(name, this.isNested(ifc));
    }

    // This is used to emit a class implementing an interface when the datatype property is true in the jsii model
    // The generation of the interface proxy may not be needed if the interface is also set as a datatype
    private emitInterfaceDataType(ifc: spec.InterfaceType | spec.ClassType) {
        const name = nameutils.convertClassName(ifc.name);

        this.openFileIfNeeded(name, this.assembly.targets!.dotnet!.namespace, this.isNested((ifc)));

        const suffix = `: ${nameutils.convertInterfaceName(ifc.name)}`;

        const jsiiAttribute = `[JsiiByValue]`;
        this.code.line(jsiiAttribute);
        this.code.openBlock(`public class ${name} ${suffix}`);

        const emitInstanceGetter = false;
        const datatype = true;
        this.emitInterfaceMembersForProxyOrDatatype(ifc, emitInstanceGetter, datatype);
        this.code.closeBlock();
        this.closeFileIfNeeded(name, this.isNested(ifc));
    }

    // This generates the body of the interface proxy or data type class
    // This loops through all the member and generates them
    private emitInterfaceMembersForProxyOrDatatype(ifc: spec.InterfaceType | spec.ClassType, emitInstanceGetter: boolean, datatype: boolean) {
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

            this.emitProperty(ifc, prop, !!prop.overrides, emitInstanceGetter, datatype);
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
    }

    private emitProperty(cls: spec.Type, prop: spec.Property, overrides: boolean = !!prop.overrides,
                         emitInstanceGetter: boolean = false, datatype: boolean = false) {
        const access = this.renderAccessLevel(prop);
        const statc = prop.static ? 'static ' : '';
        const propName = nameutils.convertPropertyName(prop.name);

        // If we are on a datatype then we want the property to override in Jsii
        const isOverride = datatype ? ', isOverride: true' : '';
        let jsiiAttribute = ``;
        if (spec.isPrimitiveTypeReference(prop.type)) {
            jsiiAttribute = `[JsiiProperty(name: "${prop.name}", typeJson: "{\\\"primitive\\\":\\\"${prop.type.primitive}\\\"}"${isOverride})]`;
        } else if (spec.isNamedTypeReference(prop.type)) {
            jsiiAttribute = `[JsiiProperty(name: "${prop.name}", typeJson: "{\\\"fqn\\\":\\\"${prop.type.fqn}\\\"}"${isOverride})]`;
        } else if (spec.isCollectionTypeReference(prop.type)) {
            // TODO: impl other type of Jsii attributes when impl calc
        }

        this.code.line(jsiiAttribute);

        const fullPropTypes = this.toDotNetType(prop.type, true);
        if (fullPropTypes.length > 1) {// Union type
            this.code.openBlock(`object ${propName}`);
        } else {
            const statement = `${access} ${statc}${fullPropTypes} ${propName}`;
            this.code.openBlock(statement);
            if (emitInstanceGetter) {
                const getter = `get => GetInstanceProperty<${fullPropTypes}>();`;
                this.code.line(getter);
            } else {
                this.code.line('get;');
            }
        }

        // If the prop is immutable OR the ifc is a datatype ifc, we need a setter
        if (!prop.immutable || datatype) {
            this.code.line('set;');
        }
        this.code.closeBlock();
        this.code.line();

        // TODO: handle cls and overrides when impl calc?
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
        } else {
            return this.toDotNetType({ fqn: cls.base });
        }
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

    // Translates a type fqn to a native .NET fqn by looking at the namespace
    private toNativeFqn(fqn: string): string {
        const [mod, ...name] = fqn.split('.');
        const depMod = this.findModule(mod);
        const dotnetNamespace = depMod.targets && depMod.targets.dotnet && depMod.targets.dotnet.namespace;
        if (!dotnetNamespace) { throw new Error(`The module does not have a dotnet.namespace setting`); }
        const nativeFqn = `${dotnetNamespace}.${nameutils.convertTypeName(name.pop()!)}`;
        return nativeFqn;
    }

    private toCSharpFilePath(type: string) {
        return type + ".cs";
    }

    private openFileIfNeeded(typeName: string, namespace: string, isNested: boolean, namespaces?: string[], usingDeputy: boolean = true) {
        // If Nested type, we shouldn't open/close a file
        if (isNested) {
            return;
        }
        const dotnetPackageId = this.assembly.targets && this.assembly.targets.dotnet && this.assembly.targets.dotnet.packageId;
        if (!dotnetPackageId) { throw new Error(`The module ${this.assembly.name} does not have a dotnet.packageId setting`); }
        const filePath = namespace.replace(/[.]/g, '/');
        this.createDirectoryPaths(filePath);
        this.code.openFile(path.join(dotnetPackageId, filePath, this.toCSharpFilePath(typeName)));
        if (namespaces) {
            if (usingDeputy) {
                namespaces.push("Amazon.JSII.Runtime.Deputy");
            }
            namespaces.sort().map(n => this.code.line(`using ${n};`));
            this.code.line();
        } else {
            if (usingDeputy) {
                this.code.line("using Amazon.JSII.Runtime.Deputy;");
                this.code.line();
            }
        }
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
}