import clone = require('clone');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import path = require('path');
import xmlbuilder = require('xmlbuilder');
import { Generator } from '../generator';
import logging = require('../logging');
import { md2html } from '../markdown';
import { PackageInfo, Target, TargetOptions } from '../target';
import { shell } from '../util';
import { VERSION, VERSION_DESC } from '../version';

// tslint:disable-next-line:no-var-requires
const spdxLicenseList = require('spdx-license-list');

export default class Java extends Target {
    public static toPackageInfos(assm: spec.Assembly): { [language: string]: PackageInfo } {
        const groupId = assm.targets!.java!.maven.groupId;
        const artifactId = assm.targets!.java!.maven.artifactId;
        const url = `https://repo1.maven.org/maven2/${groupId.replace(/\./g, '/')}/${artifactId}/${assm.version}/`;
        return {
            java: {
                repository: 'Maven Central', url,
                usage: {
                    'Apache Maven': {
                        language: 'xml',
                        code: xmlbuilder.create({
                            dependency: { groupId, artifactId, version: assm.version }
                        }).end({ pretty: true }).replace(/<\?\s*xml(\s[^>]+)?>\s*/m, '')
                    },
                    'Apache Buildr': `'${groupId}:${artifactId}:jar:${assm.version}'`,
                    'Apache Ivy': {
                        language: 'xml',
                        code: xmlbuilder.create({
                            dependency: { '@groupId': groupId, '@name': artifactId, '@rev': assm.version }
                        }).end({ pretty: true }).replace(/<\?\s*xml(\s[^>]+)?>\s*/m, '')
                    },
                    'Groovy Grape': `@Grapes(\n@Grab(group='${groupId}', module='${artifactId}', version='${assm.version}')\n)`,
                    'Gradle / Grails': `compile '${groupId}:${artifactId}:${assm.version}'`,
                }
            }
        };
    }

    public static toNativeReference(type: spec.Type, options: any) {
        const [, ...name] = type.fqn.split('.');
        return { java: `import ${[options.package, ...name].join('.')};` };
    }

    protected readonly generator = new JavaGenerator();

    constructor(options: TargetOptions) {
        super(options);
    }

    public async build(sourceDir: string, outDir: string): Promise<void> {
        const url = `file://${outDir}`;
        const mvnArguments = new Array<string>();
        for (const arg of Object.keys(this.arguments)) {
            if (!arg.startsWith('mvn-')) { continue; }
            mvnArguments.push(`--${arg.slice(4)}`);
            mvnArguments.push(this.arguments[arg].toString());
        }

        const userXml = await this.generateMavenSettingsForLocalDeps(sourceDir, outDir);
        await shell(
            'mvn',
            [...mvnArguments, 'deploy', `-D=altDeploymentRepository=local::default::${url}`, `--settings=${userXml}`],
            {
                cwd: sourceDir,
                env: {
                    // Twiddle the JVM settings a little for Maven. Delaying JIT compilation
                    // brings down Maven execution time by about 1/3rd (15->10s, 30->20s)
                    MAVEN_OPTS: `${process.env.MAVEN_OPTS || ''} -XX:+TieredCompilation -XX:TieredStopAtLevel=1`
                }
             }
        );
    }

    /**
     * Generates maven settings file for this build.
     * @param sourceDir The generated sources directory. This is where user.xml will be placed.
     * @param currentOutputDirectory The current output directory. Will be added as a local maven repo.
     */
    private async generateMavenSettingsForLocalDeps(sourceDir: string, currentOutputDirectory: string) {
        const filePath = path.join(sourceDir, 'user.xml');

        // traverse the dep graph of this module and find all modules that have
        // an <outdir>/java directory. we will add those as local maven
        // repositories which will resolve instead of Maven Central for those
        // module. this enables building against local modules (i.e. in lerna
        // repositories or linked modules).
        const localRepos = await this.findLocalDepsOutput(this.packageDir);

        // add the current output directory as a local repo as well for the case
        // where we build multiple packages into the same output.
        localRepos.push(currentOutputDirectory);

        // if java-runtime is checked-out and we can find a local repository,
        // add it to the list.
        const localJavaRuntime = await findJavaRuntimeLocalRepository();
        if (localJavaRuntime) {
            localRepos.push(localJavaRuntime);
        }

        logging.debug('local maven repos:', localRepos);

        const profileName = 'local-jsii-modules';
        const settings = xmlbuilder.create({
            settings: {
                '@xmlns': 'http://maven.apache.org/POM/4.0.0',
                '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                '@xsi:schemaLocation': 'http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd',
                '#comment': [
                    `Generated by jsii-pacmak@${VERSION_DESC} on ${new Date().toISOString()}`,
                ],
                'profiles': {
                    profile: {
                        id: profileName,
                        repositories: {
                            repository: localRepos.map((repo, index) => ({
                                id: `local${index}`,
                                url: `file://${repo}`
                            }))
                        }
                    }
                },
                'activeProfiles': {
                    activeProfile: profileName
                }
            }
        }, { encoding: 'UTF-8' }).end({ pretty: true });

        logging.debug(`Generated ${filePath}`);
        await fs.writeFile(filePath, settings);
        return filePath;
    }

}

// ##################
// # CODE GENERATOR #
// ##################

const MODULE_CLASS_NAME = '$Module';
const INTERFACE_PROXY_CLASS_NAME = 'Jsii$Proxy';

const JSR305_NULLABLE = '@javax.annotation.Nullable';

class JavaGenerator extends Generator {
    /** If false, @Generated will not include generator version nor timestamp */
    private emitFullGeneratorInfo?: boolean;
    private moduleClass: string;

    /**
     * A map of all the modules ever referenced during code generation. These include
     * direct dependencies but can potentially also include transitive dependencies, when,
     * for example, we need to refer to their types when flatting the class hierarchy for
     * interface proxies.
     */
    private readonly referencedModules: { [name: string]: spec.PackageVersion } = { };

    constructor() {
        super({ generateOverloadsForMethodWithOptionals: true });
    }

    protected onBeginAssembly(assm: spec.Assembly, fingerprint: boolean) {
        this.emitFullGeneratorInfo = fingerprint;
        this.moduleClass = this.emitModuleFile(assm);

        this.emitPackageInfo(assm);
    }

    protected onEndAssembly(assm: spec.Assembly, fingerprint: boolean) {
        this.emitMavenPom(assm, fingerprint);
        delete this.emitFullGeneratorInfo;
    }

    protected getAssemblyOutputDir(mod: spec.Assembly) {
        const dir = this.toNativeFqn(mod.name).replace(/\./g, '/');
        return path.join('src', 'main', 'resources', dir);
    }

    protected onBeginClass(cls: spec.ClassType, abstract: boolean) {
        this.openFileIfNeeded(cls);
        this.addJavaDocs(cls);

        const classBase = this.getClassBase(cls);
        const extendsExpression = classBase ? ` extends ${classBase}` : '';

        let implementsExpr = '';
        if (cls.interfaces && cls.interfaces.length > 0) {
            implementsExpr = ' implements ' + cls.interfaces.map(x => this.toNativeFqn(x));
        }

        const nested = this.isNested(cls);
        const inner = nested ? ' static' : '';
        const absPrefix = abstract ? ' abstract' : '';

        if (!nested) { this.emitGeneratedAnnotation(); }
        this.emitStabilityAnnotations(cls);
        this.code.line(`@software.amazon.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${cls.fqn}")`);
        this.code.openBlock(`public${inner}${absPrefix} class ${cls.name}${extendsExpression}${implementsExpr}`);

        this.emitJsiiInitializers(cls.name);
        this.emitStaticInitializer(cls);
    }

    protected onEndClass(cls: spec.ClassType) {
        if (cls.abstract) {
            this.emitInterfaceProxy(cls);
        }

        this.code.closeBlock();
        this.closeFileIfNeeded(cls);
    }

    protected onInitializer(cls: spec.ClassType, method: spec.Method) {
        this.addJavaDocs(method);
        this.emitStabilityAnnotations(method);
        this.code.openBlock(`${this.renderAccessLevel(method)} ${cls.name}(${this.renderMethodParameters(method)})`);
        this.code.line('super(software.amazon.jsii.JsiiObject.InitializationMode.Jsii);');
        this.code.line(`software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this${this.renderMethodCallArguments(method)});`);
        this.code.closeBlock();
    }

    protected onInitializerOverload(cls: spec.ClassType, overload: spec.Method, originalInitializer: spec.Method) {
        this.onInitializer(cls, overload);

        /* tslint:disable-next-line no-unused-expression */
        originalInitializer;
    }

    protected onField(cls: spec.ClassType, prop: spec.Property, union?: spec.UnionTypeReference) {
        /* tslint:disable-next-line no-unused-expression */
        cls; prop; union;
    }

    protected onProperty(cls: spec.ClassType, prop: spec.Property) {
        this.emitProperty(cls, prop);
    }

    protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
        if (prop.const) {
            this.emitConstProperty(prop);
        } else {
            this.emitProperty(cls, prop);
        }
    }

    /**
     * Since we expand the union setters, we will use this event to only emit the getter which returns an Object.
     */
    protected onUnionProperty(cls: spec.ClassType, prop: spec.Property, _union: spec.UnionTypeReference) {
        this.emitProperty(cls, prop);
    }

    protected onMethod(cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(cls, method);
    }

    protected onMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onMethod(cls, overload);
    }

    protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
        this.emitMethod(cls, method);
    }

    protected onStaticMethodOverload(cls: spec.ClassType, overload: spec.Method, _originalMethod: spec.Method) {
        this.emitMethod(cls, overload);
    }

    protected onBeginEnum(enm: spec.EnumType) {
        this.openFileIfNeeded(enm);
        this.addJavaDocs(enm);
        if (!this.isNested(enm)) { this.emitGeneratedAnnotation(); }
        this.emitStabilityAnnotations(enm);
        this.code.line(`@software.amazon.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${enm.fqn}")`);
        this.code.openBlock(`public enum ${enm.name}`);
    }
    protected onEndEnum(enm: spec.EnumType) {
        this.code.closeBlock();
        this.closeFileIfNeeded(enm);
    }
    protected onEnumMember(_: spec.EnumType, member: spec.EnumMember) {
        this.addJavaDocs(member);
        this.emitStabilityAnnotations(member);
        this.code.line(`${member.name},`);
    }

    // namespaces are handled implicitly by onBeginClass().
    protected onBeginNamespace(ns: string) {
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    protected onEndNamespace(ns: string) {
        /* tslint:disable-next-line no-unused-expression */
        ns;
    }

    protected onBeginInterface(ifc: spec.InterfaceType) {
        this.openFileIfNeeded(ifc);
        this.addJavaDocs(ifc);

        // all interfaces always extend JsiiInterface so we can identify that it is a jsii interface.
        const interfaces = ifc.interfaces || [];
        const bases = [ 'software.amazon.jsii.JsiiSerializable', ...interfaces.map(x => this.toNativeFqn(x)) ].join(', ');

        const nested = this.isNested(ifc);
        const inner = nested ? ' static' : '';
        if (!nested) { this.emitGeneratedAnnotation(); }
        this.emitStabilityAnnotations(ifc);
        this.code.openBlock(`public${inner} interface ${ifc.name} extends ${bases}`);
    }

    protected onEndInterface(ifc: spec.InterfaceType) {
        if (ifc.datatype) {
            this.emitInterfaceBuilder(ifc);
        }

        // emit interface proxy class
        this.emitInterfaceProxy(ifc);

        this.code.closeBlock();
        this.closeFileIfNeeded(ifc);
    }

    protected onInterfaceMethod(_ifc: spec.InterfaceType, method: spec.Method) {
        const returnType = method.returns ? this.toJavaType(method.returns.type) : 'void';
        this.addJavaDocs(method);
        this.emitStabilityAnnotations(method);
        this.code.line(`${returnType} ${method.name}(${this.renderMethodParameters(method)});`);
    }

    protected onInterfaceMethodOverload(ifc: spec.InterfaceType, overload: spec.Method, _originalMethod: spec.Method) {
        this.onInterfaceMethod(ifc, overload);
    }

    protected onInterfaceProperty(_ifc: spec.InterfaceType, prop: spec.Property) {
        const getterType = this.toJavaType(prop.type);
        const setterTypes = this.toJavaTypes(prop.type);
        const propName = this.code.toPascalCase(prop.name);

        // for unions we only generate overloads for setters, not getters.
        this.addJavaDocs(prop);
        this.emitStabilityAnnotations(prop);
        this.code.line(`${getterType} get${propName}();`);

        if (!prop.immutable) {
            for (const type of setterTypes) {
                this.addJavaDocs(prop);
                this.code.line(`void set${propName}(final ${type} value);`);
            }
        }
    }

    private emitPackageInfo(mod: spec.Assembly) {
        if (!mod.docs) { return; }

        const packageName = this.getNativeName(mod, undefined);
        const packageInfoFile = this.toJavaFilePath(mod.name + '.package-info');
        this.code.openFile(packageInfoFile);
        this.code.line('/**');
        if (mod.readme) {
            for (const line of md2html(mod.readme.markdown).split('\n')) {
                this.code.line(` * ${line.replace(/\*\//g, '*{@literal /}')}`);
            }
        }
        if (mod.docs.deprecated) {
            this.code.line(' *');
            // Javac won't allow @deprecated on packages, while @Deprecated is aaaabsolutely fine. Duh.
            this.code.line(` * Deprecated: ${mod.docs.deprecated}`);
        }
        this.code.line(' */');
        this.emitStabilityAnnotations(mod);
        this.code.line(`package ${packageName};`);
        this.code.closeFile(packageInfoFile);
    }

    private emitMavenPom(assm: spec.Assembly, fingerprint: boolean) {
        const self = this;

        if (!(assm.targets && assm.targets.java)) {
            throw new Error(`Assembly ${assm.name} does not declare a java target`);
        }

        const comment = fingerprint
            ? {
                '#comment': [
                    `Generated by jsii-pacmak@${VERSION_DESC} on ${new Date().toISOString()}`,
                    `@jsii-pacmak:meta@ ${JSON.stringify(this.metadata)}`
                ]
              }
            : {};

        this.code.openFile('pom.xml');
        this.code.line(
            xmlbuilder.create({
                project: {
                    '@xmlns': 'http://maven.apache.org/POM/4.0.0',
                    '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
                    '@xsi:schemaLocation': 'http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd',

                    ...comment,

                    'modelVersion': '4.0.0',
                    'name': '${project.groupId}:${project.artifactId}',
                    'description': assm.description,
                    'url': assm.homepage,

                    'licenses': {
                        license: getLicense()
                    },

                    'developers': {
                        developer: mavenDevelopers()
                    },

                    'scm': {
                        connection: `scm:${assm.repository.type}:${assm.repository.url}`,
                        url: assm.repository.url
                    },

                    'groupId': assm.targets.java.maven.groupId,
                    'artifactId': assm.targets.java.maven.artifactId,
                    'version': makeVersion(assm.version, assm.targets.java.maven.versionSuffix),
                    'packaging': 'jar',

                    'properties': { 'project.build.sourceEncoding': 'UTF-8' },

                    'dependencies': { dependency: mavenDependencies() },

                    'build': {
                        plugins: {
                            plugin: [{
                                groupId: 'org.apache.maven.plugins',
                                artifactId: 'maven-compiler-plugin',
                                version: '3.8.1',
                                configuration: { source: '1.8', target: '1.8' }
                            }, {
                                groupId: 'org.apache.maven.plugins',
                                artifactId: 'maven-jar-plugin',
                                version: '3.1.0',
                                configuration: {
                                    archive: {
                                        index: true,
                                        manifest: {
                                            addDefaultImplementationEntries: true,
                                            addDefaultSpecificationEntries: true,
                                        }
                                    }
                                }
                            }, {
                                groupId: 'org.apache.maven.plugins',
                                artifactId: 'maven-source-plugin',
                                version: '3.0.1',
                                executions: {
                                    execution: {
                                        id: 'attach-sources',
                                        goals: { goal: 'jar' }
                                    }
                                }
                            }, {
                                groupId: 'org.apache.maven.plugins',
                                artifactId: 'maven-javadoc-plugin',
                                version: '3.0.1',
                                executions: {
                                    execution: {
                                        id: 'attach-javadocs',
                                        goals: { goal: 'jar' }
                                    }
                                },
                                configuration: {
                                    failOnError: false,
                                    show: 'protected',
                                    sourceFileExcludes: {
                                        // Excluding the $Module classes so they won't pollute the docsite. They otherwise
                                        // are all collected at the top of the classlist, burrying useful information under
                                        // a lot of dry scrolling.
                                        exclude: ['**/$Module.java']
                                    },
                                    // Adding these makes JavaDoc generation about a 3rd faster (which is far and away the most
                                    // expensive part of the build)
                                    additionalJOption: ['-J-XX:+TieredCompilation', '-J-XX:TieredStopAtLevel=1']
                                }
                            }]
                        }
                    }
                }
            }, { encoding: 'UTF-8' }).end({ pretty: true })
        );
        this.code.closeFile('pom.xml');

        /**
         * Combines a version number with an optional suffix. If the suffix starts with '-' or '.', it will be
         * concatenated as-is to the semantic version number. Otherwise, it'll be appended to the version number with an
         * intercalar '-'.
         *
         * @param version the semantic version number
         * @param suffix  the suffix, if any.
         */
        function makeVersion(version: string, suffix?: string): string {
            if (!suffix) { return version; }
            if (!suffix.startsWith('-') && !suffix.startsWith('.')) {
                throw new Error(`versionSuffix must start with '-' or '.', but received ${suffix}`);
            }
            return `${version}${suffix}`;
        }

        function mavenDependencies() {
            const dependencies = new Array<MavenDependency>();
            const allDeps = { ...(assm.dependencies || {}), ...self.referencedModules };
            for (const depName of Object.keys(allDeps)) {
                const dep = allDeps[depName];
                if (!(dep.targets && dep.targets.java)) {
                    throw new Error(`Assembly ${assm.name} depends on ${depName}, which does not declare a java target`);
                }
                dependencies.push({
                    groupId: dep.targets.java.maven.groupId,
                    artifactId: dep.targets.java.maven.artifactId,
                    version: makeVersion(dep.version, dep.targets.java.maven.versionSuffix),
                });
            }
            // The JSII java runtime base classes
            dependencies.push({
                groupId: 'software.amazon.jsii',
                artifactId: 'jsii-runtime',
                version: VERSION
            });

            // Provides @javax.annotation.*
            dependencies.push({
                groupId: 'javax.annotation',
                artifactId: 'javax.annotation-api',
                version: '[1.3.2,)',
                scope: 'provided'
            });
            return dependencies;
        }

        function mavenDevelopers() {
            return [assm.author, ...(assm.contributors || [])].map(toDeveloper);

            function toDeveloper(person: spec.Person) {
                const developer: any = {
                    [person.organization ? 'organization' : 'name']: person.name,
                    roles: { role: person.roles }
                };
                // We cannot set "undefined" or "null" to a field - this causes invalid XML to be emitted (per POM schema).
                if (person.email) {
                    developer.email = person.email;
                }
                if (person.url) {
                    developer[person.organization ? 'organizationUrl' : 'url'] = person.url;
                }
                return developer;
            }
        }

        /**
         * Get the maven-style license block for a the assembly.
         * @see https://maven.apache.org/pom.html#Licenses
         */
        function getLicense() {
            const spdx = spdxLicenseList[assm.license];
            return spdx && {
                name: spdx.name,
                url: spdx.url,
                distribution: 'repo',
                comments: spdx.osiApproved ? 'An OSI-approved license' : undefined
            };
        }
    }

    private emitStaticInitializer(cls: spec.ClassType) {
        const consts = (cls.properties || []).filter(x => x.const);
        if (consts.length === 0) {
            return;
        }

        const javaClass = this.toJavaType(cls);

        this.code.openBlock(`static`);

        for (const prop of consts) {
            const constName = this.renderConstName(prop);
            const propClass = this.toJavaType(prop.type, true);
            this.code.line(`${constName} = software.amazon.jsii.JsiiObject.jsiiStaticGet(${javaClass}.class, "${prop.name}", ${propClass}.class);`);
        }

        this.code.closeBlock();
    }

    private renderConstName(prop: spec.Property) {
        return this.code.toSnakeCase(prop.name).toLocaleUpperCase(); // java consts are SNAKE_UPPER_CASE
    }

    private emitConstProperty(prop: spec.Property) {
        const propType = this.toJavaType(prop.type);
        const propName = this.renderConstName(prop);
        const access = this.renderAccessLevel(prop);

        this.addJavaDocs(prop);
        this.emitStabilityAnnotations(prop);
        this.code.line(`${access} final static ${propType} ${propName};`);
    }

    private emitProperty(cls: spec.Type, prop: spec.Property, includeGetter = true, overrides: boolean = !!prop.overrides) {
        const getterType = this.toJavaType(prop.type);
        const setterTypes = this.toJavaTypes(prop.type);
        const propClass = this.toJavaType(prop.type, true);
        const propName = this.code.toPascalCase(prop.name);
        const access = this.renderAccessLevel(prop);
        const statc = prop.static ? 'static ' : '';
        const javaClass = this.toJavaType(cls);

        // for unions we only generate overloads for setters, not getters.
        if (includeGetter) {
            this.code.line();
            this.addJavaDocs(prop);
            if (overrides) { this.code.line('@Override'); }
            this.emitStabilityAnnotations(prop);
            if (isNullable(prop)) { this.code.line(JSR305_NULLABLE); }
            this.code.openBlock(`${access} ${statc}${getterType} get${propName}()`);

            let statement = 'return ';
            if (prop.static) {
                statement += `software.amazon.jsii.JsiiObject.jsiiStaticGet(${javaClass}.class, `;
            } else {
                statement += `this.jsiiGet(`;
            }

            statement += `"${prop.name}", ${propClass}.class);`;

            this.code.line(statement);
            this.code.closeBlock();
        }

        if (!prop.immutable) {
            for (const type of setterTypes) {
                this.code.line();
                this.addJavaDocs(prop);
                if (overrides) { this.code.line('@Override'); }
                this.emitStabilityAnnotations(prop);
                const nullable = isNullable(prop) ? `${JSR305_NULLABLE} ` : '';
                this.code.openBlock(`${access} ${statc}void set${propName}(${nullable}final ${type} value)`);
                let statement = '';

                if (prop.static) {
                    statement += `software.amazon.jsii.JsiiObject.jsiiStaticSet(${javaClass}.class, `;
                } else {
                    statement += 'this.jsiiSet(';
                }
                const value = prop.optional ? 'value' : `java.util.Objects.requireNonNull(value, "${prop.name} is required")`;
                statement += `"${prop.name}\", ${value});`;
                this.code.line(statement);
                this.code.closeBlock();
            }
        }
    }

    private emitMethod(cls: spec.Type, method: spec.Method, overrides: boolean = !!method.overrides) {
        const returnType = method.returns ? this.toJavaType(method.returns.type) : 'void';
        const statc = method.static ? 'static ' : '';
        const access = this.renderAccessLevel(method);
        const async = !!method.async;
        const methodName = slugify(method.name);
        const signature = `${returnType} ${methodName}(${this.renderMethodParameters(method)})`;
        this.code.line();
        this.addJavaDocs(method);
        this.emitStabilityAnnotations(method);
        if (overrides) { this.code.line('@Override'); }
        if (isNullable(method.returns)) { this.code.line(JSR305_NULLABLE); }
        if (method.abstract) {
            this.code.line(`${access} abstract ${signature};`);
        } else {
            this.code.openBlock(`${access} ${statc}${signature}`);
            this.code.line(this.renderMethodCall(cls, method, async));
            this.code.closeBlock();
        }
    }

    /**
     * We are now going to build a class that can be used as a proxy for untyped
     * javascript objects that implement this interface. we want java code to be
     * able to interact with them, so we will create a proxy class which
     * implements this interface and has the same methods.
     */
    private emitInterfaceProxy(ifc: spec.InterfaceType | spec.ClassType) {
        const name = INTERFACE_PROXY_CLASS_NAME;

        this.code.line();
        this.code.line('/**');
        this.code.line(' * A proxy class which represents a concrete javascript instance of this type.');
        this.code.line(' */');

        const suffix = ifc.kind === spec.TypeKind.Interface
            ? `extends software.amazon.jsii.JsiiObject implements ${this.toNativeFqn(ifc.fqn)}`
            : `extends ${this.toNativeFqn(ifc.fqn)}`;

        this.code.openBlock(`final static class ${name} ${suffix}`);
        this.emitJsiiInitializers(name);

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
            this.emitProperty(ifc, prop, /* includeGetter: */ undefined, /* overrides: */ true);
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
    }

    private emitStabilityAnnotations(entity: spec.Documentable) {
        if (!entity.docs) { return; }
        if (entity.docs.stability === spec.Stability.Deprecated || entity.docs.deprecated) {
            this.code.line('@Deprecated');
        }
        if (entity.docs.stability) {
            this.code.line(`@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.${_level(entity.docs.stability)})`);
        }

        function _level(stability: spec.Stability): string {
            switch (stability) {
                case spec.Stability.Deprecated:
                    return 'Deprecated';
                case spec.Stability.Experimental:
                    return 'Experimental';
                case spec.Stability.External:
                    return 'External';
                case spec.Stability.Stable:
                    return 'Stable';
            }
        }
    }

    private emitInterfaceBuilder(ifc: spec.InterfaceType) {
        const interfaceName = ifc.name;
        const builderName = 'Builder';

        this.code.line();
        this.code.line('/**');
        this.code.line(` * @return a {@link Builder} of {@link ${interfaceName}}`);
        this.code.line(' */');
        this.emitStabilityAnnotations(ifc);
        this.code.openBlock(`static ${builderName} builder()`);
        this.code.line(`return new ${builderName}();`);
        this.code.closeBlock();

        interface Prop {
            docs?: spec.Docs
            spec: spec.Property
            propName: string
            fieldName: string
            fieldJavaType: string
            javaTypes: string[]
            nullable: boolean
            inherited: boolean
            immutable: boolean
        }

        const props = new Array<Prop>();

        // collect all properties from all base structs
        const self = this;

        function collectProps(currentIfc: spec.InterfaceType, isBaseClass = false) {
            for (const property of currentIfc.properties || []) {
                const propName = self.code.toPascalCase(property.name);

                const prop: Prop = {
                    docs: property.docs,
                    spec: property,
                    propName,
                    nullable: !!property.optional,
                    fieldName: self.code.toCamelCase(property.name),
                    fieldJavaType: self.toJavaType(property.type),
                    javaTypes: self.toJavaTypes(property.type),
                    immutable: property.immutable || false,
                    inherited: isBaseClass,
                };

                props.push(prop);
            }

            // add props of base struct
            for (const base of currentIfc.interfaces || []) {
                collectProps(self.findType(base) as spec.InterfaceType, true);
            }
        }

        collectProps(ifc);

        this.code.line();
        this.code.line('/**');
        this.code.line(` * A builder for {@link ${interfaceName}}`);
        this.code.line(' */');
        this.emitStabilityAnnotations(ifc);
        this.code.openBlock(`final class ${builderName}`);

        for (const prop of props) {
            if (prop.nullable) {
                this.code.line(JSR305_NULLABLE);
            }
            this.code.line(`private ${prop.fieldJavaType} _${prop.fieldName};`);
        }
        this.code.line();
        for (const prop of props) {
            for (const type of prop.javaTypes) {
                this.code.line('/**');
                this.code.line(` * Sets the value of ${prop.propName}`);
                if (prop.docs && prop.docs.summary) {
                    this.code.line(` * @param value ${prop.docs.summary}`);
                } else {
                    this.code.line(` * @param value the value to be set`);
                }
                this.code.line(` * @return {@code this}`);
                if (prop.docs && prop.docs.deprecated) {
                    this.code.line(` * @deprecated ${prop.docs.deprecated}`);
                }
                this.code.line(' */');
                this.emitStabilityAnnotations(prop.spec);
                this.code.openBlock(`public ${builderName} with${prop.propName}(${prop.nullable ? `${JSR305_NULLABLE} ` : ''}final ${type} value)`);
                this.code.line(`this._${prop.fieldName} = ${_validateIfNonOptional('value', prop)};`);
                this.code.line('return this;');
                this.code.closeBlock();
            }
        }
        this.code.line();
        this.code.line('/**');
        this.code.line(' * Builds the configured instance.');
        this.code.line(` * @return a new instance of {@link ${interfaceName}}`);
        this.code.line(' * @throws NullPointerException if any required attribute was not provided');
        this.code.line(' */');
        this.emitStabilityAnnotations(ifc);
        this.code.openBlock(`public ${interfaceName} build()`);
        this.code.openBlock(`return new ${interfaceName}()`);
        for (const prop of props) {
            if (prop.nullable) { this.code.line(JSR305_NULLABLE); }
            // tslint:disable-next-line:max-line-length
            this.code.line(`private${prop.immutable ? ' final' : ''} ${prop.fieldJavaType} $${prop.fieldName} = ${_validateIfNonOptional(`_${prop.fieldName}`, prop)};`);
        }
        for (const prop of props) {
            this.code.line();
            this.code.line('@Override');
            this.code.openBlock(`public ${prop.fieldJavaType} get${prop.propName}()`);
            this.code.line(`return this.$${prop.fieldName};`);
            this.code.closeBlock();
            if (!prop.immutable) {
                for (const type of prop.javaTypes) {
                    this.code.line();
                    this.code.line('@Override');
                    this.code.openBlock(`public void set${prop.propName}(${prop.nullable ? `${JSR305_NULLABLE} ` : ''}final ${type} value)`);
                    this.code.line(`this.$${prop.fieldName} = ${_validateIfNonOptional('value', prop)};`);
                    this.code.closeBlock();
                }
            }
        }

        // emit $jsii$toJson which will be called to serialize this object when sent to JS
        this.code.line();
        this.code.openBlock(`public com.fasterxml.jackson.databind.JsonNode $jsii$toJson()`);
        this.code.line(`com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;`);
        // tslint:disable-next-line:max-line-length
        this.code.line(`com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();`);

        for (const prop of props) {
            if (prop.nullable) { this.code.openBlock(`if (this.get${prop.propName}() != null)`); }
            this.code.line(`obj.set(\"${prop.spec.name}\", om.valueToTree(this.get${prop.propName}()));`);
            if (prop.nullable) { this.code.closeBlock(); }
        }

        this.code.line(`return obj;`);

        this.code.closeBlock();

        this.code.unindent();
        this.code.line(`};`); /* return new Foo() */

        this.code.closeBlock(/* public Foo build() */);

        this.code.closeBlock(/* final class Builder */);

        function _validateIfNonOptional(variable: string, prop: Prop): string {
            if (prop.nullable) { return variable; }
            return `java.util.Objects.requireNonNull(${variable}, "${prop.fieldName} is required")`;
        }
    }

    private openFileIfNeeded(type: spec.Type) {
        if (this.isNested(type)) {
            return;
        }

        this.code.openFile(this.toJavaFilePath(type.fqn));
        this.code.line(`package ${this.getNativeName(this.assembly, type.namespace)};`);
        this.code.line();
    }

    private closeFileIfNeeded(type: spec.Type) {
        if (this.isNested(type)) {
            return;
        }
        this.code.closeFile(this.toJavaFilePath(type.fqn));
    }

    private isNested(type: spec.Type) {
        if (!this.assembly.types || !type.namespace) { return false; }
        const parent = `${type.assembly}.${type.namespace}`;
        return parent in this.assembly.types;
    }

    private toJavaFilePath(fqn: string) {
        const nativeFqn = this.toNativeFqn(fqn);
        return path.join('src', 'main', 'java', ...nativeFqn.split('.')) + '.java';
    }

    private addJavaDocs(doc: spec.Documentable, defaultText?: string) {
        if (!defaultText && Object.keys(doc.docs || {}).length === 0
                         && !((doc as spec.Method).parameters || []).some(p => Object.keys(p.docs || {}).length !== 0)) {
            return;
        }

        const docs = doc.docs = doc.docs || { };

        const paras = [];

        if (docs.summary) {
            paras.push(docs.summary);
        } else if (defaultText) {
            paras.push(defaultText);
        }

        if (docs.remarks) {
            paras.push(docs.remarks);
        }

        if (docs.default) {
            paras.push(`Default: ${docs.default}`); // NOTE: there is no annotation in JavaDoc for this
        }

        if (docs.example) {
            paras.push('Example:');
            // FIXME: Have to parse the MarkDown and convert fenced code blocks to <pre>{@code\n....\n}</pre>.
            paras.push(docs.example);
        }

        if (docs.stability === spec.Stability.Experimental) {
            paras.push('EXPERIMENTAL');
        }

        const tagLines = [];

        if (docs.returns) { tagLines.push(`@return ${docs.returns}`); }
        if (docs.see) { tagLines.push(`@see ${docs.see}`); }
        if (docs.deprecated) { tagLines.push(`@deprecated ${docs.deprecated}`); }

        // Params
        if ((doc as spec.Method).parameters) {
            const method = doc as spec.Method;
            if (method.parameters) {
                for (const param of method.parameters) {
                    if (param.docs && param.docs.summary) {
                        tagLines.push(`@param ${param.name} ${param.docs.summary}`);
                    }
                }
            }
        }

        if (tagLines.length > 0) {
            paras.push(tagLines.join('\n'));
        }

        const lines = new Array<string>();
        for (const para of interleave('', paras)) {
            lines.push(...para.split('\n'));
        }

        this.code.line('/**');
        for (const line of lines) {
            this.code.line(` * ${line}`);
        }
        this.code.line(' */');
    }

    private getClassBase(cls: spec.ClassType) {
        if (!cls.base) {
            return 'software.amazon.jsii.JsiiObject';
        }

        return this.toJavaType({ fqn: cls.base });
    }

    private toJavaType(type: spec.TypeReference, forMarshalling = false): string {
        const types = this.toJavaTypes(type, forMarshalling);
        if (types.length > 1) {
            return 'java.lang.Object';
        } else {
            return types[0];
        }
    }

    private toJavaTypes(typeref: spec.TypeReference, forMarshalling = false): string[] {
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
    }

    private toJavaCollection(ref: spec.CollectionTypeReference, forMarshalling: boolean) {
        const elementJavaType = this.toJavaType(ref.collection.elementtype);
        switch (ref.collection.kind) {
            case spec.CollectionKind.Array: return forMarshalling ? 'java.util.List' : `java.util.List<${elementJavaType}>`;
            case spec.CollectionKind.Map: return forMarshalling ? 'java.util.Map' : `java.util.Map<java.lang.String, ${elementJavaType}>`;
            default:
                throw new Error(`Unsupported collection kind: ${ref.collection.kind}`);
        }
    }

    private toJavaPrimitive(primitive: spec.PrimitiveType) {
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
    }

    private renderMethodCallArguments(method: spec.Method) {
        if (!method.parameters || method.parameters.length === 0) { return ''; }
        const regularParams = method.parameters.filter(p => !p.variadic);
        const values = regularParams.map(_renderParameter);
        const valueStr = `new Object[] { ${values.join(', ')} }`;
        if (method.variadic) {
            const valuesStream = `java.util.Arrays.<Object>stream(${valueStr})`;

            const lastParam = method.parameters[method.parameters.length - 1];
            const restStream = `java.util.Arrays.<Object>stream(${lastParam.name})`;

            const fullStream = regularParams.length > 0
                ? `java.util.stream.Stream.concat(${valuesStream}, ${restStream})`
                : restStream;
            return `, ${fullStream}.toArray(Object[]::new)`;
        } else {
            return `, ${valueStr}`;
        }

        function _renderParameter(param: spec.Parameter) {
            return isNullable(param)
                ? param.name
                : `java.util.Objects.requireNonNull(${param.name}, "${param.name} is required")`;
        }
    }

    private renderMethodCall(cls: spec.TypeReference, method: spec.Method, async: boolean) {
        let statement = '';

        if (method.returns) {
            statement += `return `;
        }

        if (method.static) {
            const javaClass = this.toJavaType(cls);
            statement += `software.amazon.jsii.JsiiObject.jsiiStaticCall(${javaClass}.class, `;
        } else {
            if (async) {
                statement += `this.jsiiAsyncCall(`;
            } else {
                statement += 'this.jsiiCall(';
            }
        }

        statement += `"${method.name}"`;

        if (method.returns) {
            statement += `, ${this.toJavaType(method.returns.type, true)}.class`;
        } else {
            statement += ', Void.class';
        }
        statement += this.renderMethodCallArguments(method);
        statement += ');';

        return statement;
    }

    private renderMethodParameters(method: spec.Method) {
        const params = [];
        if (method.parameters) {
            for (const p of method.parameters) {
                const nullable = isNullable(p) ? `${JSR305_NULLABLE} ` : '';
                params.push(`${nullable}final ${this.toJavaType(p.type)}${p.variadic ? '...' : ''} ${p.name}`);
            }
        }
        return params.join(', ');
    }

    private renderAccessLevel(method: spec.Method | spec.Property) {
        return method.protected ? 'protected' : 'public';
    }

    private makeModuleClass(moduleName: string) {
        return this.toNativeFqn(moduleName) + '.' + MODULE_CLASS_NAME;
    }

    private makeModuleFqn(moduleName: string) {
        return moduleName + '.' + MODULE_CLASS_NAME;
    }

    private emitModuleFile(mod: spec.Assembly) {
        const moduleName = mod.name;
        const moduleClass = this.makeModuleClass(moduleName);
        const moduleFile = this.toJavaFilePath(this.makeModuleFqn(moduleName));
        this.code.openFile(moduleFile);
        this.code.line(`package ${this.toNativeFqn(moduleName)};`);
        this.code.line();
        if (Object.keys(mod.dependencies || {}).length > 0) {
            this.code.line('import static java.util.Arrays.asList;');
            this.code.line();
            this.code.line('import java.util.List;');
        }
        this.code.line('import software.amazon.jsii.JsiiModule;');
        this.code.line();

        this.code.openBlock(`public final class ${MODULE_CLASS_NAME} extends JsiiModule`);

        // ctor
        this.code.openBlock(`public ${MODULE_CLASS_NAME}()`);
        this.code.line(`super("${moduleName}", "${mod.version}", ${MODULE_CLASS_NAME}.class, "${this.getAssemblyFileName()}");`);
        this.code.closeBlock(); // ctor

        // dependencies
        if (mod.dependencies && Object.keys(mod.dependencies).length > 0) {
            const deps = [];
            for (const dep of Object.keys(mod.dependencies)) {
                deps.push(`${this.makeModuleClass(dep)}.class`);
            }

            this.code.line();
            this.code.line('@Override');
            this.code.openBlock(`public List<Class<? extends JsiiModule>> getDependencies()`);
            this.code.line(`return asList(${deps.join(', ')});`);
            this.code.closeBlock();
        }

        this.code.line();
        this.code.line('@Override');
        this.code.openBlock('protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException');
        this.code.openBlock('switch (fqn)');
        for (const type of Object.keys(this.assembly.types || {})) {
            this.code.line(`case "${type}": return ${this.toNativeFqn(type)}.class;`);
        }
        this.code.line('default: throw new ClassNotFoundException("Unknown JSII type: " + fqn);');
        this.code.closeBlock();
        this.code.closeBlock();

        this.code.closeBlock();

        this.code.closeFile(moduleFile);

        return moduleClass;
    }

    private emitJsiiInitializers(className: string) {
        this.code.openBlock(`protected ${className}(final software.amazon.jsii.JsiiObject.InitializationMode mode)`);
        this.code.line(`super(mode);`);
        this.code.closeBlock();
    }

    /**
     * Computes the java FQN for a JSII FQN:
     * 1. Determine which assembly the FQN belongs to (first component of the FQN)
     * 2. Locate the `targets.java.package` value for that assembly (this assembly, or one of the dependencies)
     * 3. Return the java FQN: ``<module.targets.java.package>.<FQN stipped of first component>``
     *
     * @param fqn the JSII FQN to be used.
     *
     * @returns the corresponding Java FQN.
     *
     * @throws if the assembly the FQN belongs to does not have a `targets.java.package` set.
     */
    private toNativeFqn(fqn: string): string {
        const [mod, ...name] = fqn.split('.');
        const depMod = this.findModule(mod);
        // Make sure any dependency (direct or transitive) of which any type is explicitly referenced by the generated
        // code is included in the generated POM's dependencies section (protecting the artifact from changes in the
        // dependencies' dependency structure).
        if (mod !== this.assembly.name) {
            this.referencedModules[mod] = depMod;
        }
        return this.getNativeName(depMod, name.join('.'), mod);
    }

    private getNativeName(assm: spec.Assembly, name: string | undefined): string;
    private getNativeName(assm: spec.PackageVersion, name: string | undefined, assmName: string): string;
    private getNativeName(assm: spec.Assembly | spec.PackageVersion,
                          name: string | undefined,
                          assmName: string = (assm as spec.Assembly).name): string {
        const javaPackage = assm.targets && assm.targets.java && assm.targets.java.package;
        if (!javaPackage) { throw new Error(`The module ${assmName} does not have a java.package setting`); }
        return `${javaPackage}${name ? `.${name}` : ''}`;
    }

    /**
     * Emits an ``@Generated`` annotation honoring the ``this.emitFullGeneratorInfo`` setting.
     */
    private emitGeneratedAnnotation() {
        const date = this.emitFullGeneratorInfo
                   ? `, date = "${new Date().toISOString()}"`
                   : '';
        const generator = this.emitFullGeneratorInfo
                        ? `jsii-pacmak/${VERSION_DESC}`
                        : 'jsii-pacmak';
        this.code.line(`@javax.annotation.Generated(value = "${generator}"${date})`);
    }
}

function slugify(name?: string) {
    if (!name) {
        return name;
    }
    if (RESERVED_KEYWORDS.includes(name)) {
        return `${name}_`;
    } else {
        return name;
    }
}

const RESERVED_KEYWORDS = [
    'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char', 'class',
    'const', 'continue', 'default', 'double', 'do', 'else', 'enum', 'extends', 'false',
    'final', 'finally', 'float', 'for', 'goto', 'if', 'implements', 'import', 'instanceof',
    'int', 'interface', 'long', 'native', 'new', 'null', 'package', 'private', 'protected',
    'public', 'return', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized',
    'this', 'throw', 'throws', 'transient', 'true', 'try', 'void', 'volatile', 'while'
];

/**
 * This models the POM schema for a <dependency> entity
 * @see https://maven.apache.org/pom.html#Dependencies
 */
interface MavenDependency {
    groupId: string;
    artifactId: string;
    version: string;

    type?: string;
    scope?: 'compile' | 'provided' | 'runtime' | 'test' | 'system';
    systemPath?: string;
    optional?: boolean;
}

/**
 * Looks up the `jsii-java-runtime` package from the local repository.
 * If it contains a "maven-repo" directory, it will be added as a local maven repo
 * so when we build locally, we build against it and not against the one published
 * to Maven Central.
 */
async function findJavaRuntimeLocalRepository() {
    try {
        const javaRuntime = require('jsii-java-runtime');
        return javaRuntime.repository;
    } catch (e) {
        return undefined;
    }
}

function* interleave<T>(sep: T, xs: Iterable<T>) {
    let first = true;
    for (const x of xs) {
        if (!first) { yield sep; }
        first = false;
        yield x;
    }
}

function isNullable(optionalValue: spec.OptionalValue | undefined): boolean {
    if (!optionalValue) {
        return false;
    }
    return optionalValue.optional
        || (spec.isPrimitiveTypeReference(optionalValue.type)
            && optionalValue.type.primitive === spec.PrimitiveType.Any);
}
