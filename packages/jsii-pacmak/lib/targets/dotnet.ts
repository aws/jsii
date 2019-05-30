import * as clone from 'clone';
import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as path from 'path';
import * as xmlbuilder from 'xmlbuilder';
import {Generator, GeneratorOptions} from '../generator';
import * as logging from '../logging';
import { PackageInfo, Target, TargetOptions } from '../target';
import { shell } from '../util';
import {DotNetDependency, FileGenerator} from './dotnet/filegenerator';
import * as nameutils from './dotnet/nameutils';

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

/**
 * CODE GENERATOR V2
 */
class DotNetGenerator extends Generator {
    // The path of the original jsii input model.
    private jsiiFilePath: string;

    // The dependency tree for the current jsii input model.
    // This is later used to output the csproj
    private dependencies: Map<string, DotNetDependency> = new Map<string, DotNetDependency>();

    // Flags that tracks if we have already wrote the first member of the class
    private firstMemberWritten: boolean = false;

    constructor(options = new GeneratorOptions()) {
        super(options);

        // Override the openBlock to get a correct C# looking code block with the curly brace after the line
        this.code.openBlock = function(text) {
            this.line(text);
            this.open('{');
        };
    }

    public async load(packageRoot: string): Promise<void> {
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

    public async save(outdir: string, tarball: string) {
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
        if (!packageId) { throw new Error(`The module ${assm.name} does not have a dotnet.packageId setting`); }
        await fs.mkdirs(path.join(outdir, packageId));
        await fs.copyFile(tarball, path.join(outdir, packageId, tarballFileName));

        // Create an anchor file for the current model
        this.generateDependencyAnchorFile();

        // Copying the .jsii file
        await fs.copyFile(this.jsiiFilePath, path.join(outdir, packageId, spec.SPEC_FILE_NAME));

        // Saving the generated code.
        return await this.code.save(outdir);
    }

    /**
     * Generates the Anchor file
     */
    protected generateDependencyAnchorFile(): void {
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

    /**
     * Not used as we override the save() method
     */
    protected getAssemblyOutputDir(mod: spec.Assembly): string {
        return nameutils.convertPackageName((mod.name));
    }

    /**
     * Namespaces are handled implicitly by openFileIfNeeded().
     */
    protected onBeginNamespace(_ns: string) {
        /* tslint:disable:no-empty */
    }

    protected onEndNamespace(_ns: string) {
        /* tslint:disable:no-empty */
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        const [baseTypeNames, baseNamespaces] = this.resolveImplementedInterfaces(ifc);

        const interfaceName = nameutils.convertInterfaceName(ifc.name);
        this.openFileIfNeeded(interfaceName, this.assembly.targets!.dotnet!.namespace, this.isNested(ifc), baseNamespaces);

        this.emitDocs(ifc);
        const jsiiAttribute = `[JsiiInterface(nativeType: typeof(${nameutils.convertInterfaceName(ifc.name)}), fullyQualifiedName: "${ifc.fqn}")]`;
        this.code.line(jsiiAttribute);

        if (baseTypeNames.length > 0) {
            this.code.openBlock(`public interface ${interfaceName} : ${baseTypeNames.join(', ')}`);
        } else {
            this.code.openBlock(`public interface ${interfaceName}`);
        }
        this.flagFirstMemberWritten(false);
    }

    protected onEndInterface(ifc: spec.InterfaceType) {
        const interfaceName = nameutils.convertInterfaceName(ifc.name);

        this.code.closeBlock();

        this.closeFileIfNeeded(interfaceName, this.isNested(ifc));

        // emit interface proxy class
        this.emitInterfaceProxy(ifc);

        // emit implementation class
        // TODO: If datatype then we may not need the interface proxy to be created, We could do with just the interface impl?
        if (ifc.datatype) {
            this.emitInterfaceDataType(ifc);
        }
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        this.emitDocs(method);
        const returnType = method.returns ? this.toDotNetType(method.returns.type) : 'void';
        if (method.returns) {
            const jsiiAttribute =
                `[JsiiMethod(name: "${method.name}", returnsJson: "${JSON.stringify(method.returns).replace(/"/g, '\\"')}")]`;
            this.code.line(jsiiAttribute);
        } else {
            // Emit Jsii attribute
            const jsiiAttribute = `[JsiiMethod(name: "${method.name}")]`;
            this.code.line(jsiiAttribute);
        }
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

        this.emitNewLineIfNecessary();

        this.emitDocs(prop);

        const fullPropTypes = this.toDotNetType(prop.type);
        const propName = nameutils.convertPropertyName(prop.name);

        // Emit Jssi Attribute
        const isOptionalJsii = prop.optional ? ', isOptional: true' : '';
        const jsiiAttribute = `[JsiiProperty(name: "${prop.name}", typeJson: "${JSON.stringify(prop.type).replace(/"/g, '\\"')}"${isOptionalJsii})]`;
        this.code.line(jsiiAttribute);

        // Specifying that a type is nullable is only required for primitive value types
        const isOptionalPrimitive = this.isOptionalPrimitive(prop) ? '?' : '';
        if (fullPropTypes.length > 1) {// Union type
            this.code.openBlock(`object${isOptionalPrimitive} ${propName}`);
        } else {
            const shortPropType = fullPropTypes.toString().split('.').pop();
            this.code.openBlock(`${shortPropType}${isOptionalPrimitive} ${propName}`);
        }

        this.code.line('get;');
        if (!prop.immutable) {
            this.code.line('set;');
        }
        this.code.closeBlock();
        this.flagFirstMemberWritten(true);
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
        let implementsExpr = '';

        const classBase = this.getClassBase(cls);
        const extendsExpression = classBase ? ` : ${classBase}` : '';

        if (cls.interfaces && cls.interfaces.length > 0) {
            const [baseTypeNames, baseNamespaces] = this.resolveImplementedInterfaces(cls);
            implementsExpr = classBase ? ', ' + baseTypeNames.join(', ') : ' : ' + baseTypeNames.join(', ');
            this.openFileIfNeeded(cls.name, this.assembly.targets!.dotnet!.namespace, this.isNested(cls), baseNamespaces);
        } else {
            this.openFileIfNeeded(cls.name, this.assembly.targets!.dotnet!.namespace, this.isNested(cls));
        }

        // Nested classes will be dealt with during calc code generation
        const nested = this.isNested(cls);
        const inner = nested ? ' static' : '';
        const absPrefix = abstract ? ' abstract' : '';

        const className = nameutils.convertClassName(cls.name);

        this.emitDocs(cls);
        // Emit Jsii Attribute
        let jsiiAttribute = `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: "${cls.fqn}")]`;
        const initializer = cls.initializer;
        if (initializer) {
            if (initializer.parameters) {
                jsiiAttribute = `[JsiiClass(nativeType: typeof(${className}), fullyQualifiedName: `
                    + `"${cls.fqn}", parametersJson: "${JSON.stringify(initializer.parameters).replace(/"/g, '\\"')}")]`;
            }
        }

        this.code.line(jsiiAttribute);

        this.code.openBlock(`public${inner}${absPrefix} class ${className}${extendsExpression}${implementsExpr}`);

        // Compute the class parameters
        let parametersDefinition = '';
        let parametersBase = '';
        if (initializer) {
            if (initializer.parameters) {
                for (const p of initializer.parameters) {
                    // TODO: the parameter may be an interface. Look into the dependencies to get the correct type.
                    const pType = this.toDotNetType(p.type);
                    if (parametersDefinition !== '') {
                        parametersDefinition += ', ';
                        parametersBase += ', ';
                    }
                    parametersDefinition += `${pType} ${p.name}`;
                    parametersBase += `${p.name}`;
                }
            }
        }
        // Create the constructors:
        // Abstract classes have protected constructors.
        const visibility = cls.abstract ? 'protected' : 'public';

        this.code.openBlock(`${visibility} ${className}(${parametersDefinition}): base(new DeputyProps(new object[]{${parametersBase}}))`);
        this.code.closeBlock();
        this.code.line();
        this.code.openBlock(`protected ${className}(ByRefValue reference): base(reference)`);
        this.code.closeBlock();
        this.code.line();
        this.code.openBlock(`protected ${className}(DeputyProps props): base(props)`);
        this.code.closeBlock();

        // We have already outputted members (constructors), setting the flag to true
        this.flagFirstMemberWritten(true);
    }

    protected onEndClass(cls: spec.ClassType) {
        this.code.closeBlock();
        this.closeFileIfNeeded(cls.name, this.isNested(cls));

        if (cls.abstract) {
            this.emitInterfaceProxy(cls);
        }
    }

    protected onField(_cls: spec.ClassType, _prop: spec.Property, _union?: spec.UnionTypeReference) {
        /* tslint:disable:no-empty */
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

    protected onBeginEnum(enm: spec.EnumType) {
        const enumName = nameutils.convertTypeName(enm.name);
        this.openFileIfNeeded(enumName, this.assembly.targets!.dotnet!.namespace, this.isNested(enm));
        this.emitDocs(enm);
        const jsiiAttribute = `[JsiiEnum(nativeType: typeof(${enumName}), fullyQualifiedName: \"${enm.fqn}\")]`;
        // Emit Jsii Attribute
        this.code.line(jsiiAttribute);
        this.code.openBlock(`public enum ${enm.name}`);
    }

    protected onEndEnum(enm: spec.EnumType) {
        this.code.closeBlock();
        const enumName = nameutils.convertTypeName(enm.name);
        this.closeFileIfNeeded(enumName, this.isNested(enm));
    }

    protected onEnumMember(_: spec.EnumType, member: spec.EnumMember) {
        const enumMemberName = nameutils.convertEnumMemberName(member.name);
        const jsiiAttribute = `[JsiiEnumMember(name: "${enumMemberName}")]`;
        // Emit Jsii Attribute
        this.code.line(jsiiAttribute);
        // If we are on the last enum member, we don't need a comma
        if (_.members.indexOf(member) !== (_.members.length - 1)) {
            this.code.line(`${enumMemberName},`);
        } else {
            this.code.line(`${enumMemberName}`);
        }
    }

    private emitMethod(cls: spec.ClassType | spec.InterfaceType, method: spec.Method, emitForProxyOrDatatype: boolean = false): void {
        this.emitNewLineIfNecessary();
        const returnType = method.returns ? this.toDotNetType(method.returns.type) : 'void';
        const staticKeyWord = method.static ? 'static ' : '';

        let overrideKeyWord = '';
        let virtualKeyWord = '';

        let definedOnAncestor = false;
        // In the case of the source being a class, we check if it is already defined on an ancestor
        if (cls.kind === spec.TypeKind.Class) {
            definedOnAncestor = this.isMemberDefinedOnAncestor(cls as spec.ClassType, method);
        }
        // The method is an override if it's defined on the ancestor, or if the parent is a class and we are generating a proxy or datatype class
        const overrides = (definedOnAncestor || (cls.kind === spec.TypeKind.Class && emitForProxyOrDatatype));
        if (overrides) {
            // Add the override key word if the method is emitted for a proxy or data type or is defined on an ancestor
            overrideKeyWord = 'override ';
        } else if ((method.abstract || !definedOnAncestor) && !emitForProxyOrDatatype) {
            // Add the virtual key word if the method is abstract or not defined on an ancestor and we are NOT generating a proxy or datatype class
            // Methods should always be virtual when possible
            virtualKeyWord = 'virtual ';
        }
        const access = this.renderAccessLevel(method);
        // TODO: handle async methods when impl calc-base and calc
        // const async = !!method.async;
        const methodName = nameutils.convertMethodName(method.name);
        const signature = `${returnType} ${methodName}(${this.renderMethodParameters(method)})`;
        this.emitDocs(method);
        // Emit Jsii Attribute
        const isOverride = (cls.kind === spec.TypeKind.Class) && (method.abstract || emitForProxyOrDatatype) ? ', isOverride: true' : '';
        if (method.returns) {
            const jsiiAttribute =
                `[JsiiMethod(name: "${method.name}", returnsJson: "${JSON.stringify(method.returns).replace(/"/g, '\\"')}"${isOverride})]`;
            this.code.line(jsiiAttribute);
        } else {
            const jsiiAttribute = `[JsiiMethod(name: "${method.name}")]`;
            this.code.line(jsiiAttribute);
        }

        if (method.abstract) {
            this.code.line(`${access} ${overrideKeyWord}abstract ${signature};`);
            this.code.line();
        } else {
            if (method.returns) {
                this.code.openBlock(`${access} ${staticKeyWord}${overrideKeyWord}${virtualKeyWord}${signature}`);
                this.code.line('return InvokeInstanceMethod<' + returnType + '>(new object[]{});');
            } else {
                this.code.openBlock(`${access} ${staticKeyWord}${overrideKeyWord}${virtualKeyWord}${signature}`);
                this.code.line('InvokeInstanceVoidMethod(new object[]{});');
            }
            this.code.closeBlock();
        }
    }

    /**
     * Founds out if a member (property or method) is already defined in one of the base classes
     *
     * Used to figure out if the override or virtual keywords are necessary.
     */
    private isMemberDefinedOnAncestor(cls: spec.ClassType, member: spec.Property | spec.Method): boolean {
        if (member as spec.Method) {
            const objectMethods = [ 'ToString', 'GetHashCode', 'Equals'];
            // Methods defined on the Object class should be overridden, return true;
            if (objectMethods.includes(nameutils.convertMethodName(member.name))) {
                return true;
            }
        }

        const base = cls.base;
        if (base) {
            const baseType = this.findType(base) as spec.ClassType;

            if (member as spec.Property) {
                if (baseType.properties) {
                    if (baseType.properties.filter(property => property.name === member.name).length > 0) {
                        // property found in base parent
                        return true;
                    }
                }
                return this.isMemberDefinedOnAncestor(baseType, member);
            } else if (member as spec.Method) {
                if (baseType.methods) {
                    if (baseType.methods.indexOf(member) > 0) {
                        // Method found in base parent
                        return true;
                    }
                }
                return this.isMemberDefinedOnAncestor(baseType, member);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Emits all documentation depending on what is available in the jsii model
     *
     * Used by all kind of members + classes, interfaces, enums
     * Order should be
     * Summary
     * Param
     * Returns
     * Remarks (includes examples, links, deprecated)
     */
    private emitDocs(obj: spec.Method | spec.InterfaceType | spec.ClassType | spec.Property | spec.EnumType): void {
        const docs = obj.docs;
        if (!docs) {
            return;
        }
        if (docs.summary) {
            this.code.line(`/// <summary>${docs.summary}</summary>`);
        }

        // Handling parameters only if the obj is a method
        const objMethod = obj as spec.Method;
        if (objMethod.parameters) {
            objMethod.parameters.forEach(param => {
                if (param.docs) {
                    const paramSummary = param.docs.summary;
                    if (paramSummary) {
                        this.code.line(`/// <param name = "${param.name}">${paramSummary}</param>`);
                    }
                }
            });
        }

        if (docs.returns) {
            this.code.line(`/// <returns>${docs.returns}</returns>`);
        }

        const remarks: string[] = [];
        let remarksOpen = false;
        if (docs.remarks) {
            this.code.line(`/// <remarks>`);
            remarksOpen = true;
            const remarkLines = docs.remarks.split('\n');
            remarkLines.forEach( line => this.code.line(`/// ${line}`));
        }

        if (docs.default) {
            remarks.push(docs.default);
        }

        if (docs.deprecated) {
            remarks.push(docs.deprecated);
        }

        if (docs.stability) {
            remarks.push(`stability: ${docs.stability}`);
        }

        if (docs.example) {
            remarks.push(docs.example);
        }

        if (docs.see) {
            remarks.push(docs.see);
        }

        if (docs.subclassable) {
            remarks.push("subclassable");
        }

        if (docs.custom) {
            for (const [k, v] of Object.entries(docs.custom || {})) {
                const custom = (k === "link") ? `${k}: ${v} ` : `${k}: ${v}`; // Extra space for '@link' to keep unit tests happy
                remarks.push(custom);
            }
        }

        if (remarks.length > 0) {
            if (!remarksOpen) {
                this.code.line(`/// <remarks>`);
                remarksOpen = true;
            }
            remarks.forEach( line => this.code.line(`/// ${line}`));
        }

        if (remarksOpen) {
            this.code.line(`/// </remarks>`);
        }
    }

    private renderMethodParameters(method: spec.Method): string {
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

    private isOptionalPrimitive(optionalValue: spec.OptionalValue | undefined): boolean {
        if (!optionalValue || !optionalValue.optional) {
            return false;
        }
        return (spec.isPrimitiveTypeReference(optionalValue.type)
                // In .NET, string is a reference type, and can be nullable
                && optionalValue.type.primitive !== spec.PrimitiveType.String);
    }

    /**
     * Emits an interface proxy for an interface or an abstract class.
     */
    private emitInterfaceProxy(ifc: spec.InterfaceType | spec.ClassType): void {
        const shouldSlugify = false;
        // No need to slugify the interface name in the case of an interface proxy
        const name = nameutils.convertClassName(ifc.name, shouldSlugify) + 'Proxy';
        this.openFileIfNeeded(name, this.assembly.targets!.dotnet!.namespace, false);

        this.emitDocs(ifc);
        let suffix = "";
        let jsiiAttribute: string;
        if (ifc.kind === spec.TypeKind.Interface) {
            suffix = `: DeputyBase, ${nameutils.convertInterfaceName(ifc.name)}`;
            jsiiAttribute = `[JsiiTypeProxy(nativeType: typeof(${nameutils.convertInterfaceName(ifc.name)}), fullyQualifiedName: \"${ifc.fqn}\")]`;
        } else {
            suffix = `: ${nameutils.convertClassName(ifc.name)}`;
            jsiiAttribute = `[JsiiTypeProxy(nativeType: typeof(${nameutils.convertClassName(ifc.name)}), fullyQualifiedName: \"${ifc.fqn}\")]`;
        }
        // Emit Jsii Attribute
        this.code.line(jsiiAttribute);

        this.code.openBlock(`internal sealed class ${name} ${suffix}`);

        // Create the private constructor
        this.code.openBlock(`private ${name}(ByRefValue reference): base(reference)`);
        this.code.closeBlock();

        // We have already output a member (constructor), setting the first member flag to true
        this.flagFirstMemberWritten(true);

        const datatype = false;
        const proxy = true;
        this.emitInterfaceMembersForProxyOrDatatype(ifc, datatype, proxy);

        this.code.closeBlock();
        this.closeFileIfNeeded(name, this.isNested(ifc));
    }

    /**
     * Emits an Interface Datatype class
     *
     * This is used to emit a class implementing an interface when the datatype property is true in the jsii model
     * The generation of the interface proxy may not be needed if the interface is also set as a datatype
     */
    private emitInterfaceDataType(ifc: spec.InterfaceType | spec.ClassType): void {
        const name = nameutils.convertClassName(ifc.name);

        this.openFileIfNeeded(name, this.assembly.targets!.dotnet!.namespace, this.isNested((ifc)));

        this.emitDocs(ifc);
        const suffix = `: ${nameutils.convertInterfaceName(ifc.name)}`;

        const jsiiAttribute = `[JsiiByValue]`;
        this.code.line(jsiiAttribute);
        this.code.openBlock(`public class ${name} ${suffix}`);

        this.flagFirstMemberWritten(false);
        const datatype = true;
        const proxy = false;
        this.emitInterfaceMembersForProxyOrDatatype(ifc, datatype, proxy);
        this.code.closeBlock();
        this.closeFileIfNeeded(name, this.isNested(ifc));
    }

    /**
     * Generates the body of the interface proxy or data type class
     *
     * This loops through all the member and generates them
     */
    private emitInterfaceMembersForProxyOrDatatype(ifc: spec.InterfaceType | spec.ClassType, datatype: boolean, proxy: boolean): void {
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
            this.emitProperty(ifc, prop, datatype, proxy);
        }

        // emit all the methods
        for (const methodName of Object.keys(methods)) {
            const method = clone(methods[methodName]);
            method.abstract = false;
            this.emitMethod(ifc, method, /* emitForProxyOrDatatype */ true);

            for (const overloadedMethod of this.createOverloadsForOptionals(method)) {
                overloadedMethod.abstract = false;
                this.emitMethod(ifc, overloadedMethod, /* emitForProxyOrDatatype */ true);
            }
        }
    }

    private emitProperty(cls: spec.Type, prop: spec.Property, datatype: boolean = false, proxy: boolean = false): void {

        this.emitNewLineIfNecessary();

        const access = this.renderAccessLevel(prop);
        const staticKeyWord = prop.static ? 'static ' : '';
        const propName = nameutils.convertPropertyName(prop.name);

        this.emitDocs(prop);
        // Emit Jssi Attribute
        // If we are on a datatype then we want the property to override in Jsii
        const isJsiiOverride = datatype ? ', isOverride: true' : '';
        const isOptionalJsii = prop.optional ? ', isOptional: true' : '';
        const jsiiAttribute = `[JsiiProperty(name: "${prop.name}", `
            + `typeJson: "${JSON.stringify(prop.type).replace(/"/g, '\\"')}"${isOptionalJsii}${isJsiiOverride})]`;
        this.code.line(jsiiAttribute);

        let isOverrideKeyWord = '';
        let isOverride = false;
        let isVirtual = false;
        let isVirtualKeyWord = '';
        // If the prop parent is a class
        if (cls.kind === spec.TypeKind.Class) {

            const implementedInBase = this.isMemberDefinedOnAncestor(cls as spec.ClassType, prop);
            if (implementedInBase || datatype || proxy) {
                // Override if the property is in a datatype or proxy class or declared in a parent class
                isOverrideKeyWord = 'override ';
                isOverride = true;
            } else if (prop.abstract || !implementedInBase) {
                // Virtual if the prop is abstract or not implemented in base member, this way we can later override it.
                isVirtualKeyWord = 'virtual ';
                isVirtual = true;
            }
        }

        const fullPropTypes = this.toDotNetType(prop.type);
        if (fullPropTypes.length > 1) {// Union type
            this.code.openBlock(`object ${propName}`);
        } else {
            // Specifying that a type is nullable ? is only required for primitive value types
            const isOptionalPrimitive = this.isOptionalPrimitive(prop) ? '?' : '';
            const statement = `${access} ${isVirtualKeyWord}${isOverrideKeyWord}${staticKeyWord}${fullPropTypes}${isOptionalPrimitive} ${propName}`;
            this.code.openBlock(statement);
            if (isOverride || isVirtual || proxy) {
                const getter = `get => GetInstanceProperty<${fullPropTypes}${isOptionalPrimitive}>();`;
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

        this.flagFirstMemberWritten(true);
    }

    private emitConstProperty(prop: spec.Property): void {
        const propType = this.toDotNetType(prop.type);
        const propName = this.code.toPascalCase(prop.name);
        const access = this.renderAccessLevel(prop);

        this.code.line(`${access} const ${propType} ${propName};`);
    }

    /**
     * Resolves the needed dependencies by looking at the .jsii model
     */
    private resolveDependencies(): void {
        const assmDependencies = this.assembly.dependencies || {};
        for (const depName of Object.keys(assmDependencies)) {
            const depInfo = assmDependencies[depName];
            if (!this.dependencies.has(depName)) {
                const dotnetInfo = depInfo.targets!.dotnet;
                const namespace = dotnetInfo!.namespace;
                const packageId = dotnetInfo!.packageId;
                const version = depInfo.version;
                this.dependencies.set(depName, new DotNetDependency(namespace, packageId, depName, version));
            }
        }
    }

    /**
     * Loops through the implemented interfaces and saves the type and namespace
     *
     * [0] The type names will be added to the class/ifc declaration
     * [1] The namespace names will be added to the using statement
     */
    private resolveImplementedInterfaces(ifc: spec.InterfaceType | spec.ClassType): [string[], string[]] {
        const interfaces = ifc.interfaces || [];
        const baseNamespaces: string[] = [];
        const baseTypeNames: string[] = [];

        // For all base members
        for (const base of interfaces) {
            // Retrieve the interface name from the fqn
            const lastIndexOfDot = base.lastIndexOf('.');
            const baseFqn = base.substr(0, lastIndexOfDot);
            const baseName = base.substr(lastIndexOfDot + 1);
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
        return [baseTypeNames, baseNamespaces];
    }

    private renderAccessLevel(method: spec.Method | spec.Property): string {
        return method.protected ? 'protected' : 'public';
    }

    private getClassBase(cls: spec.ClassType) {
        if (!cls.base) {
            return 'DeputyBase';
        } else {
            return this.toDotNetType({ fqn: cls.base });
        }
    }

    private isNested(type: spec.Type): boolean {
        if (!this.assembly.types || !type.namespace) { return false; }
        const parent = `${type.assembly}.${type.namespace}`;
        return parent in this.assembly.types;
    }

    private toDotNetType(typeref: spec.TypeReference): string[] {
        if (spec.isPrimitiveTypeReference(typeref)) {
            return [ this.toDotNetPrimitive(typeref.primitive) ];
        } else if (spec.isCollectionTypeReference(typeref)) {
            return [ this.toDotNetCollection(typeref) ];
        } else if (spec.isNamedTypeReference(typeref)) {
            return [ this.toNativeFqn(typeref.fqn) ];
        } else if (typeref.union) {
            const types = new Array<string>();
            for (const subtype of typeref.union.types) {
                for (const t of this.toDotNetType(subtype)) {
                    types.push(t);
                }
            }
            return types;
        } else {
            throw new Error('Invalid type reference: ' + JSON.stringify(typeref));
        }
    }

    private toDotNetPrimitive(primitive: spec.PrimitiveType): string {
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

    private toDotNetCollection(ref: spec.CollectionTypeReference): string {
        const elementDotNetType = this.toDotNetType(ref.collection.elementtype);
        switch (ref.collection.kind) {
            // TODO: add using statement to System.Collections.Generic
            // when impl calc-base and calc
            // TODO: see what to do with the IList forMarshalling
            case spec.CollectionKind.Array: return `${elementDotNetType}[]`;
            case spec.CollectionKind.Map: return `Dictionary<string, ${elementDotNetType}>`;
            default:
                throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
        }
    }

    /**
     * Translates a type fqn to a native .NET fqn by looking at the namespace
     */
    private toNativeFqn(fqn: string): string {
        const [mod, ...name] = fqn.split('.');
        const depMod = this.findModule(mod);
        const dotnetNamespace = depMod.targets && depMod.targets.dotnet && depMod.targets.dotnet.namespace;
        if (!dotnetNamespace) { throw new Error(`The module does not have a dotnet.namespace setting`); }
        const nativeFqn = `${dotnetNamespace}.${nameutils.convertTypeName(name.pop()!)}`;
        return nativeFqn;
    }

    private toCSharpFilePath(type: string): string {
        // Slugify the file name
        return nameutils.slugify(type) + ".cs";
    }

    private openFileIfNeeded(typeName: string, namespace: string, isNested: boolean, namespaces?: string[], usingDeputy: boolean = true): void {
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

    private createDirectoryPaths(fullPath: string): void {
        fs.mkdirsSync(path.dirname(fullPath));
    }

    private closeFileIfNeeded(typeName: string, isNested: boolean): void {
        if (isNested) {
            return;
        }
        this.code.closeBlock();
        this.code.closeFile(this.toCSharpFilePath(typeName));
    }

    /**
     * Resets the firstMember boolean flag to keep track of the first member of a new file
     *
     * This avoids unnecessary white lines
     */
    private flagFirstMemberWritten(first: boolean): void {
        this.firstMemberWritten = first;
    }

    /**
     * Emits a new line prior to writing a new property, method, if the property is not the first one in the class
     *
     * This avoids unnecessary white lines.
     */
    private emitNewLineIfNecessary(): void {
        // If the first member has already been written, it is safe to write a new line
        if (this.firstMemberWritten) {
            this.code.line();
        } else {
            this.firstMemberWritten = false;
        }
    }
}