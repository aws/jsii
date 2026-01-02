import * as spec from '@jsii/spec';
import * as assert from 'assert';
import * as clone from 'clone';
import { toSnakeCase } from 'codemaker/lib/case-utils';
import { createHash } from 'crypto';
import * as fs from 'fs-extra';
import * as reflect from 'jsii-reflect';
import {
  RosettaTabletReader,
  TargetLanguage,
  enforcesStrictMode,
  markDownToJavaDoc,
  ApiLocation,
} from 'jsii-rosetta';
import * as path from 'path';
import * as xmlbuilder from 'xmlbuilder';

import { TargetBuilder, BuildOptions } from '../builder';
import { Generator } from '../generator';
import * as logging from '../logging';
import { jsiiToPascalCase } from '../naming-util';
import { JsiiModule } from '../packaging';
import {
  PackageInfo,
  Target,
  findLocalBuildDirs,
  TargetOptions,
} from '../target';
import { subprocess, Scratch, slugify, setExtend, zip, ShellOptions } from '../util';
import { VERSION, VERSION_DESC } from '../version';
import { stabilityPrefixFor, renderSummary } from './_utils';
import { toMavenVersionRange, toReleaseVersion } from './version-utils';
import { assertSpecIsRosettaCompatible } from '../rosetta-assembly';
import { containsUnionType } from '../type-utils';
import { visitTypeReference } from '../type-visitor';
import { literalTypeReference } from './type-literals';

import { TargetName } from './index';

// eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports
const spdxLicenseList = require('spdx-license-list');

const BUILDER_CLASS_NAME = 'Builder';

const ANN_NOT_NULL = '@org.jetbrains.annotations.NotNull';
const ANN_NULLABLE = '@org.jetbrains.annotations.Nullable';
const ANN_INTERNAL = '@software.amazon.jsii.Internal';

/**
 * Because of a historical bug, $Default interfaces we inherit from might not
 * have all method overloads generated correctly.
 *
 * So when inheriting these, we might need to generate the overloads in
 * subinterfaces/subclasses.
 */
const GENERATE_POTENTIALLY_MISING_DEFAULT_OVERLOADS = true;

/**
 * Build Java packages all together, by generating an aggregate POM
 *
 * This will make the Java build a lot more efficient (~300%).
 *
 * Do this by copying the code into a temporary directory, generating an aggregate
 * POM there, and then copying the artifacts back into the respective output
 * directories.
 */
export class JavaBuilder implements TargetBuilder {
  private readonly targetName = 'java';

  public constructor(
    private readonly modules: readonly JsiiModule[],
    private readonly options: BuildOptions,
  ) {}

  public async buildModules(): Promise<void> {
    if (this.modules.length === 0) {
      return;
    }

    if (this.options.codeOnly) {
      // Simple, just generate code to respective output dirs
      await Promise.all(
        this.modules.map((module) =>
          this.generateModuleCode(
            module,
            this.options,
            this.outputDir(module.outputDirectory),
          ),
        ),
      );
      return;
    }

    // Otherwise make a single tempdir to hold all sources, build them together and copy them back out
    const scratchDirs: Array<Scratch<any>> = [];
    try {
      const tempSourceDir = await this.generateAggregateSourceDir(
        this.modules,
        this.options,
      );
      scratchDirs.push(tempSourceDir);

      // Need any old module object to make a target to be able to invoke build, though none of its settings
      // will be used.
      const target = this.makeTarget(this.modules[0], this.options);

      await target.resolveMavenVersions(tempSourceDir.directory);

      const tempOutputDir = await Scratch.make(async (dir) => {
        logging.debug(`Building Java code to ${dir}`);

        await target.build(tempSourceDir.directory, dir);
      });
      scratchDirs.push(tempOutputDir);

      await this.copyOutArtifacts(
        tempOutputDir.directory,
        tempSourceDir.object,
      );

      if (this.options.clean) {
        await Scratch.cleanupAll(scratchDirs);
      }
    } catch (e) {
      logging.warn(
        `Exception occurred, not cleaning up ${scratchDirs
          .map((s) => s.directory)
          .join(', ')}`,
      );
      throw e;
    }
  }

  private async generateModuleCode(
    module: JsiiModule,
    options: BuildOptions,
    where: string,
  ): Promise<void> {
    const target = this.makeTarget(module, options);
    logging.debug(`Generating Java code into ${where}`);
    await target.generateCode(where, module.tarball);
  }

  private async generateAggregateSourceDir(
    modules: readonly JsiiModule[],
    options: BuildOptions,
  ): Promise<Scratch<TemporaryJavaPackage[]>> {
    return Scratch.make(async (tmpDir: string) => {
      logging.debug(`Generating aggregate Java source dir at ${tmpDir}`);
      const ret: TemporaryJavaPackage[] = [];

      const generatedModules = modules
        .map((module) => ({ module, relativeName: slugify(module.name) }))
        .map(({ module, relativeName }) => ({
          module,
          relativeName,
          sourceDir: path.join(tmpDir, relativeName),
        }))
        .map(({ module, relativeName, sourceDir }) =>
          this.generateModuleCode(module, options, sourceDir).then(() => ({
            module,
            relativeName,
          })),
        );

      for (const { module, relativeName } of await Promise.all(
        generatedModules,
      )) {
        ret.push({
          relativeSourceDir: relativeName,
          relativeArtifactsDir: moduleArtifactsSubdir(module),
          outputTargetDirectory: module.outputDirectory,
        });
      }

      await this.generateAggregatePom(
        tmpDir,
        ret.map((m) => m.relativeSourceDir),
      );
      await this.generateMavenSettingsForLocalDeps(tmpDir);

      return ret;
    });
  }

  private async generateAggregatePom(where: string, moduleNames: string[]) {
    const aggregatePom = xmlbuilder
      .create(
        {
          project: {
            '@xmlns': 'http://maven.apache.org/POM/4.0.0',
            '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '@xsi:schemaLocation':
              'http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd',
            '#comment': [
              `Generated by jsii-pacmak@${VERSION_DESC} on ${new Date().toISOString()}`,
            ],

            modelVersion: '4.0.0',
            packaging: 'pom',

            groupId: 'software.amazon.jsii',
            artifactId: 'aggregatepom',
            version: '1.0.0',

            modules: {
              module: moduleNames,
            },
          },
        },
        { encoding: 'UTF-8' },
      )
      .end({ pretty: true });

    logging.debug(`Generated ${where}/pom.xml`);
    await fs.writeFile(path.join(where, 'pom.xml'), aggregatePom);
  }

  private async copyOutArtifacts(
    artifactsRoot: string,
    packages: TemporaryJavaPackage[],
  ) {
    logging.debug('Copying out Java artifacts');
    // The artifacts directory looks like this:
    //  /tmp/XXX/software/amazon/awscdk/something/v1.2.3
    //                                 /else/v1.2.3
    //                                 /entirely/v1.2.3
    //
    // We get the 'software/amazon/awscdk/something' path from the package, identifying
    // the files we need to copy, including Maven metadata. But we need to recreate
    // the whole path in the target directory.

    await Promise.all(
      packages.map(async (pkg) => {
        const artifactsSource = path.join(
          artifactsRoot,
          pkg.relativeArtifactsDir,
        );
        const artifactsDest = path.join(
          this.outputDir(pkg.outputTargetDirectory),
          pkg.relativeArtifactsDir,
        );

        await fs.mkdirp(artifactsDest);
        await fs.copy(artifactsSource, artifactsDest, { recursive: true });
      }),
    );
  }

  /**
   * Decide whether or not to append 'java' to the given output directory
   */
  private outputDir(declaredDir: string) {
    return this.options.languageSubdirectory
      ? path.join(declaredDir, this.targetName)
      : declaredDir;
  }

  /**
   * Generates maven settings file for this build.
   * @param where The generated sources directory. This is where user.xml will be placed.
   * @param currentOutputDirectory The current output directory. Will be added as a local maven repo.
   */
  private async generateMavenSettingsForLocalDeps(where: string) {
    const filePath = path.join(where, 'user.xml');

    // traverse the dep graph of this module and find all modules that have
    // an <outdir>/java directory. we will add those as local maven
    // repositories which will resolve instead of Maven Central for those
    // module. this enables building against local modules (i.e. in lerna
    // repositories or linked modules).
    const allDepsOutputDirs = new Set<string>();

    const resolvedModules = this.modules.map(async (mod) => ({
      module: mod,
      localBuildDirs: await findLocalBuildDirs(
        mod.moduleDirectory,
        this.targetName,
      ),
    }));
    for (const { module, localBuildDirs } of await Promise.all(
      resolvedModules,
    )) {
      setExtend(allDepsOutputDirs, localBuildDirs);

      // Also include output directory where we're building to, in case we build multiple packages into
      // the same output directory.
      allDepsOutputDirs.add(
        path.join(
          module.outputDirectory,
          this.options.languageSubdirectory ? this.targetName : '',
        ),
      );
    }

    const localRepos = Array.from(allDepsOutputDirs);

    // if java-runtime is checked-out and we can find a local repository,
    // add it to the list.
    const localJavaRuntime = await findJavaRuntimeLocalRepository();
    if (localJavaRuntime) {
      localRepos.push(localJavaRuntime);
    }

    logging.debug('local maven repos:', localRepos);

    const profileName = 'local-jsii-modules';
    const localRepository = this.options.arguments['maven-local-repository'];
    const settings = xmlbuilder
      .create(
        {
          settings: {
            '@xmlns': 'http://maven.apache.org/POM/4.0.0',
            '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            '@xsi:schemaLocation':
              'http://maven.apache.org/SETTINGS/1.0.0 https://maven.apache.org/xsd/settings-1.0.0.xsd',
            '#comment': [
              `Generated by jsii-pacmak@${VERSION_DESC} on ${new Date().toISOString()}`,
            ],
            // Do *not* attempt to ask the user for stuff...
            interactiveMode: false,
            // Use a non-default local repository (unless java-custom-cache-path arg is provided) to isolate from cached artifacts...
            localRepository: localRepository
              ? path.resolve(process.cwd(), localRepository)
              : path.resolve(where, '.m2', 'repository'),
            // Register locations of locally-sourced dependencies
            profiles: {
              profile: {
                id: profileName,
                repositories: {
                  repository: localRepos.map((repo) => ({
                    id: repo.replace(/[\\/:"<>|?*]/g, '$'),
                    url: `file://${repo}`,
                  })),
                },
              },
            },
            activeProfiles: {
              activeProfile: profileName,
            },
          },
        },
        { encoding: 'UTF-8' },
      )
      .end({ pretty: true });

    logging.debug(`Generated ${filePath}`);
    await fs.writeFile(filePath, settings);
    return filePath;
  }

  private makeTarget(module: JsiiModule, options: BuildOptions): Java {
    return new Java({
      arguments: options.arguments,
      assembly: module.assembly,
      fingerprint: options.fingerprint,
      force: options.force,
      packageDir: module.moduleDirectory,
      rosetta: options.rosetta,
      runtimeTypeChecking: options.runtimeTypeChecking,
      targetName: this.targetName,
    });
  }
}

interface TemporaryJavaPackage {
  /**
   * Where the sources are (relative to the source root)
   */
  relativeSourceDir: string;

  /**
   * Where the artifacts will be stored after build (relative to build dir)
   */
  relativeArtifactsDir: string;

  /**
   * Where the artifacts ought to go for this particular module
   */
  outputTargetDirectory: string;
}

/**
 * Return the subdirectory of the output directory where the artifacts for this particular package are produced
 */
function moduleArtifactsSubdir(module: JsiiModule) {
  const groupId = module.assembly.targets!.java!.maven.groupId;
  const artifactId = module.assembly.targets!.java!.maven.artifactId;
  return `${groupId.replace(/\./g, '/')}/${artifactId}`;
}

export default class Java extends Target {
  public static toPackageInfos(assm: spec.Assembly): {
    [language: string]: PackageInfo;
  } {
    const groupId = assm.targets!.java!.maven.groupId;
    const artifactId = assm.targets!.java!.maven.artifactId;
    const releaseVersion = toReleaseVersion(assm.version, TargetName.JAVA);
    const url = `https://repo1.maven.org/maven2/${groupId.replace(
      /\./g,
      '/',
    )}/${artifactId}/${assm.version}/`;
    return {
      java: {
        repository: 'Maven Central',
        url,
        usage: {
          'Apache Maven': {
            language: 'xml',
            code: xmlbuilder
              .create({
                dependency: { groupId, artifactId, version: releaseVersion },
              })
              .end({ pretty: true })
              .replace(/<\?\s*xml(\s[^>]+)?>\s*/m, ''),
          },
          'Apache Buildr': `'${groupId}:${artifactId}:jar:${releaseVersion}'`,
          'Apache Ivy': {
            language: 'xml',
            code: xmlbuilder
              .create({
                dependency: {
                  '@groupId': groupId,
                  '@name': artifactId,
                  '@rev': releaseVersion,
                },
              })
              .end({ pretty: true })
              .replace(/<\?\s*xml(\s[^>]+)?>\s*/m, ''),
          },
          'Groovy Grape': `@Grapes(\n@Grab(group='${groupId}', module='${artifactId}', version='${releaseVersion}')\n)`,
          'Gradle / Grails': `compile '${groupId}:${artifactId}:${releaseVersion}'`,
        },
      },
    };
  }

  public static toNativeReference(type: spec.Type, options: any) {
    const [, ...name] = type.fqn.split('.');
    return { java: `import ${[options.package, ...name].join('.')};` };
  }

  protected readonly generator: JavaGenerator;

  public constructor(options: TargetOptions) {
    super(options);

    this.generator = new JavaGenerator(options);
  }

  public async build(sourceDir: string, outDir: string): Promise<void> {
    const url = `file://${outDir}`;

    await this.invokeMaven(sourceDir,
      [
        'deploy',
        `-D=altDeploymentRepository=local::default::${url}`,
      ],
      {
        retry: { maxAttempts: 5 },
      },
    );
  }

  /**
   * Run the maven 'versions:resolve-ranges' plugin
   *
   * Initially, we generate version ranges into the pom file based on the NPM
   * version ranges.
   *
   * At build time, given a dependency version range, Maven will download metadata
   * for all possible versions before every (uncached) build. This takes a long
   * time, before finally resolving to the latest version anyway.
   *
   * Instead, we use the Maven 'versions' plugin to resolve our wide ranges to
   * point versions. We want the "latest matching" version anyway, and if we don't
   * the resolution now (which downloads the .poms of all possible versions) it
   * will happen during every single build.
   */
  public async resolveMavenVersions(directory: string) {
    const versionsPluginVersion = '2.20.1';
    await this.invokeMaven(directory, [
      `org.codehaus.mojo:versions-maven-plugin:${versionsPluginVersion}:resolve-ranges`,
    ], {
      retry: { maxAttempts: 1 },
    });
  }

  private async invokeMaven(directory: string, args: string[], options?: Omit<ShellOptions, 'cwd'>) {
    // Pass through jsii-pacmak --mvn-xyz=... arguments as --xyz=...
    const passThruArgs = new Array<string>();
    for (const arg of Object.keys(this.arguments)) {
      if (!arg.startsWith('mvn-')) {
        continue;
      }
      passThruArgs.push(`--${arg.slice(4)}`);
      passThruArgs.push(this.arguments[arg].toString());
    }

    await subprocess(
      'mvn',
      [
        // If we don't run in verbose mode, turn on quiet mode
        ...(this.arguments.verbose ? [] : ['--quiet']),
        '--batch-mode',
        ...args,
        ...passThruArgs,
        '--settings=user.xml',
      ],
      {
        cwd: directory,
        env: {
          // Twiddle the JVM settings a little for Maven. Delaying JIT compilation
          // brings down Maven execution time by about 1/3rd (15->10s, 30->20s)
          MAVEN_OPTS: `${
            process.env.MAVEN_OPTS ?? ''
          } -XX:+TieredCompilation -XX:TieredStopAtLevel=1`,
          ...options?.env,
        },
        ...options,
      },
    );
  }
}

// ##################
// # CODE GENERATOR #
// ##################

const MODULE_CLASS_NAME = '$Module';
const INTERFACE_PROXY_CLASS_NAME = 'Jsii$Proxy';
const INTERFACE_DEFAULT_CLASS_NAME = 'Jsii$Default';

// Struct that stores metadata about a property that can be used in Java code generation.
interface JavaProp {
  // Documentation for the property
  docs?: spec.Docs;

  // The original JSII property spec this struct was derived from
  spec: spec.Property;

  // The original JSII type this property was defined on
  definingType: spec.Type;

  // Canonical name of the Java property (eg: 'MyProperty')
  propName: string;

  // The original canonical name of the JSII property
  jsiiName: string;

  // Field name of the Java property (eg: 'myProperty')
  fieldName: string;

  /**
   * The java type for the property (eg: 'List<String>')
   */
  renderedFieldType: string;

  // The java type for the parameter (e.g: 'List<? extends SomeType>')
  renderedParamType: string;

  // The NativeType representation of the property's type
  renderedNativeFieldType: string;

  // List of types that the property is assignable from. Used to overload setters.
  javaTypes: JavaType[];

  // True if the property is optional.
  nullable: boolean;

  // True if the property has been transitively inherited from a base class.
  inherited: boolean;

  // True if the property is read-only once initialized.
  immutable: boolean;
}

class JavaGenerator extends Generator {
  // When the code-generator needs to generate code for a property or method that has the same name as a member of this list, the name will
  // be automatically modified to avoid compile errors. Most of these are java language reserved keywords. In addition to those, any keywords that
  // are likely to conflict with auto-generated methods or properties (eg: 'build') are also considered reserved.
  private static readonly RESERVED_KEYWORDS = [
    'abstract',
    'assert',
    'boolean',
    'break',
    'build',
    'byte',
    'case',
    'catch',
    'char',
    'class',
    'const',
    'continue',
    'default',
    'double',
    'do',
    'else',
    'enum',
    'extends',
    'false',
    'final',
    'finally',
    'float',
    'for',
    'goto',
    'if',
    'implements',
    'import',
    'instanceof',
    'int',
    'interface',
    'long',
    'native',
    'new',
    'null',
    'package',
    'private',
    'protected',
    'public',
    'return',
    'short',
    'static',
    'strictfp',
    'super',
    'switch',
    'synchronized',
    'this',
    'throw',
    'throws',
    'transient',
    'true',
    'try',
    'void',
    'volatile',
    'while',
    '_',
  ];

  /**
   * Turns a raw javascript property name (eg: 'default') into a safe Java property name (eg: 'defaultValue').
   * @param propertyName the raw JSII property Name
   */
  private static safeJavaPropertyName(propertyName: string) {
    if (!propertyName) {
      return propertyName;
    }

    if (propertyName === '_') {
      // Slightly different pattern for this one. We used to generate `__` here
      // but it's somewhat likely that people will use `_, __, ___` as multiple
      // indifferent arguments, so we pick a different name.
      //
      // Ideally we would look at the alternative argument names and pick
      // something guaranteed to be unique, but unfortunately the code isn't
      // quite structured that way so we'll pick something unlikely to collide
      // instead.
      //
      // Changing from `__` -> `_under` would be a breaking change if applied to
      // public property names, but most likely this will be used for function
      // parameters (unfortunately the code has been structured in such a way
      // that property and parameter names are strongly tied together, in a way
      // that would take more time to unwind than I care to invest right now),
      // where it doesn't matter.
      return '_under_';
    }

    if (JavaGenerator.RESERVED_KEYWORDS.includes(propertyName)) {
      return `${propertyName}Value`;
    }
    return propertyName;
  }

  /**
   * Turns a raw javascript method name (eg: 'import') into a safe Java method name (eg: 'doImport').
   * @param methodName
   */
  private static safeJavaMethodName(methodName: string) {
    if (!methodName) {
      return methodName;
    }

    if (methodName === '_') {
      // Different pattern for this one. Also this should never happen, who names a function '_' ??
      return 'doIt';
    }

    if (JavaGenerator.RESERVED_KEYWORDS.includes(methodName)) {
      return `do${jsiiToPascalCase(methodName)}`;
    }
    return methodName;
  }

  /** If false, @Generated will not include generator version nor timestamp */
  private emitFullGeneratorInfo?: boolean;
  private moduleClass!: string;

  /**
   * A map of all the modules ever referenced during code generation. These include
   * direct dependencies but can potentially also include transitive dependencies, when,
   * for example, we need to refer to their types when flatting the class hierarchy for
   * interface proxies.
   */
  private readonly referencedModules: {
    [name: string]: spec.AssemblyConfiguration;
  } = {};

  private readonly rosetta: RosettaTabletReader;

  public constructor(options: {
    readonly rosetta: RosettaTabletReader;
    readonly runtimeTypeChecking: boolean;
  }) {
    super({ ...options, generateOverloadsForMethodWithOptionals: true });
    this.rosetta = options.rosetta;
  }

  protected onBeginAssembly(assm: spec.Assembly, fingerprint: boolean) {
    this.emitFullGeneratorInfo = fingerprint;
    this.moduleClass = this.emitModuleFile(assm);

    this.emitAssemblyPackageInfo(assm);
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
    this.addJavaDocs(cls, { api: 'type', fqn: cls.fqn });

    const classBase = this.getClassBase(cls);
    const extendsExpression = classBase
      ? ` extends ${displayStatic(classBase)}`
      : '';

    let implementsExpr = '';
    if (cls.interfaces?.length ?? 0 > 0) {
      implementsExpr = ` implements ${cls
        .interfaces!.map((x) => this.toNativeFqn(x))
        .join(', ')}`;
    }

    const nested = this.isNested(cls);
    const inner = nested ? ' static' : '';
    const absPrefix = abstract ? ' abstract' : '';

    if (!nested) {
      this.emitGeneratedAnnotation();
    }
    this.emitStabilityAnnotations(cls);
    this.code.line(
      `@software.amazon.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${cls.fqn}")`,
    );
    this.code.openBlock(
      `public${inner}${absPrefix} class ${cls.name}${extendsExpression}${implementsExpr}`,
    );

    this.emitJsiiInitializers(cls);
    this.emitStaticInitializer(cls);
  }

  protected onEndClass(cls: spec.ClassType) {
    if (cls.abstract) {
      const type = this.reflectAssembly.findType(cls.fqn) as reflect.ClassType;
      this.emitProxy(type);
    } else {
      this.emitClassBuilder(cls);
    }

    this.code.closeBlock();
    this.closeFileIfNeeded(cls);
  }

  protected onInitializer(cls: spec.ClassType, method: spec.Initializer) {
    this.code.line();

    // If needed, patching up the documentation to point users at the builder pattern
    this.addJavaDocs(method, { api: 'initializer', fqn: cls.fqn });
    this.emitStabilityAnnotations(method);

    // Abstract classes should have protected initializers
    const initializerAccessLevel = cls.abstract
      ? 'protected'
      : this.renderAccessLevel(method);

    const types = this.convertTypes(method.parameters);
    if (types.some((t) => t.type === 'param')) {
      throw new Error('Cannot have generic type arguments to a constructor');
    }

    // NOTE: even though a constructor is technically final and we COULD render covariant types, historically we didn't and I'm not changing it.
    this.code.openBlock(
      `${initializerAccessLevel} ${cls.name}(${this.renderParameters(method.parameters, types, 'exact-types')})`,
    );
    this.code.line(
      'super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);',
    );
    this.emitUnionParameterValidation(method.parameters, 'exact-types');
    this.code.line(
      `software.amazon.jsii.JsiiEngine.getInstance().createNewObject(this${this.renderMethodCallArguments(
        method,
      )});`,
    );
    this.code.closeBlock();
  }

  protected onInitializerOverload(
    cls: spec.ClassType,
    overload: spec.Method,
    _originalInitializer: spec.Method,
  ) {
    this.onInitializer(cls, overload);
  }

  protected onField(
    _cls: spec.ClassType,
    _prop: spec.Property,
    _union?: spec.UnionTypeReference,
  ) {
    /* noop */
  }

  protected onProperty(cls: spec.ClassType, prop: spec.Property) {
    this.emitProperty(cls, prop, cls);
  }

  protected onStaticProperty(cls: spec.ClassType, prop: spec.Property) {
    if (prop.const) {
      this.emitConstProperty(cls, prop);
    } else {
      this.emitProperty(cls, prop, cls);
    }
  }

  /**
   * Since we expand the union setters, we will use this event to only emit the getter which returns an Object.
   */
  protected onUnionProperty(
    cls: spec.ClassType,
    prop: spec.Property,
    _union: spec.UnionTypeReference,
  ) {
    this.emitProperty(cls, prop, cls);
  }

  protected onMethod(cls: spec.ClassType, method: spec.Method) {
    this.emitMethod(cls, method);
  }

  protected onMethodOverload(
    cls: spec.ClassType,
    overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    this.onMethod(cls, overload);
  }

  protected onStaticMethod(cls: spec.ClassType, method: spec.Method) {
    this.emitMethod(cls, method);
  }

  protected onStaticMethodOverload(
    cls: spec.ClassType,
    overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    this.emitMethod(cls, overload);
  }

  protected onBeginEnum(enm: spec.EnumType) {
    this.openFileIfNeeded(enm);
    this.addJavaDocs(enm, { api: 'type', fqn: enm.fqn });
    if (!this.isNested(enm)) {
      this.emitGeneratedAnnotation();
    }
    this.emitStabilityAnnotations(enm);
    this.code.line(
      `@software.amazon.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${enm.fqn}")`,
    );
    this.code.openBlock(`public enum ${enm.name}`);
  }
  protected onEndEnum(enm: spec.EnumType) {
    this.code.closeBlock();
    this.closeFileIfNeeded(enm);
  }
  protected onEnumMember(parentType: spec.EnumType, member: spec.EnumMember) {
    this.addJavaDocs(member, {
      api: 'member',
      fqn: parentType.fqn,
      memberName: member.name,
    });
    this.emitStabilityAnnotations(member);
    this.code.line(`${member.name},`);
  }

  /**
   * Namespaces are handled implicitly by onBeginClass().
   *
   * Only emit package-info in case this is a submodule
   */
  protected onBeginNamespace(ns: string) {
    const submodule = this.assembly.submodules?.[ns];
    if (submodule) {
      this.emitSubmodulePackageInfo(this.assembly, ns);
    }
  }

  protected onEndNamespace(_ns: string) {
    /* noop */
  }

  protected onBeginInterface(ifc: spec.InterfaceType) {
    this.openFileIfNeeded(ifc);
    this.addJavaDocs(ifc, { api: 'type', fqn: ifc.fqn });

    // all interfaces always extend JsiiInterface so we can identify that it is a jsii interface.
    const interfaces = ifc.interfaces ?? [];
    const bases = [
      'software.amazon.jsii.JsiiSerializable',
      ...interfaces.map((x) => this.toNativeFqn(x)),
    ].join(', ');

    const nested = this.isNested(ifc);
    const inner = nested ? ' static' : '';
    if (!nested) {
      this.emitGeneratedAnnotation();
    }
    this.code.line(
      `@software.amazon.jsii.Jsii(module = ${this.moduleClass}.class, fqn = "${ifc.fqn}")`,
    );
    this.code.line(
      `@software.amazon.jsii.Jsii.Proxy(${ifc.name}.${INTERFACE_PROXY_CLASS_NAME}.class)`,
    );
    this.emitStabilityAnnotations(ifc);
    this.code.openBlock(
      `public${inner} interface ${ifc.name} extends ${bases}`,
    );
  }

  protected onEndInterface(ifc: spec.InterfaceType) {
    this.emitMultiplyInheritedProperties(ifc);

    if (ifc.datatype) {
      this.emitDataType(ifc);
    } else {
      const type = this.reflectAssembly.findType(
        ifc.fqn,
      ) as reflect.InterfaceType;

      this.emitProxy(type);
      // We don't emit Jsii$Default if the assembly opted out of it explicitly.
      // This is mostly to facilitate compatibility testing...
      if (hasDefaultInterfaces(this.reflectAssembly)) {
        this.emitDefaultImplementation(type);
      }
    }

    this.code.closeBlock();
    this.closeFileIfNeeded(ifc);
  }

  protected onInterfaceMethod(ifc: spec.InterfaceType, method: spec.Method) {
    this.code.line();
    const returnType = method.returns
      ? forceSingleType(this.toDecoratedJavaTypes(method.returns))
      : mkStatic('void');

    const methodName = JavaGenerator.safeJavaMethodName(method.name);
    this.addJavaDocs(
      method,
      {
        api: 'member',
        fqn: ifc.fqn,
        memberName: methodName,
      },
      {
        returnsUnion: method.returns?.type,
      },
    );
    this.emitStabilityAnnotations(method);

    const types = this.convertTypes(method.parameters);

    this.code.line(
      `${typeVarDeclarations(types)}${displayStatic(returnType)} ${methodName}(${this.renderParameters(method.parameters, types, 'exact-types')});`,
    );
  }

  protected onInterfaceMethodOverload(
    ifc: spec.InterfaceType,
    overload: spec.Method,
    _originalMethod: spec.Method,
  ) {
    this.onInterfaceMethod(ifc, overload);
  }

  protected onInterfaceProperty(ifc: spec.InterfaceType, prop: spec.Property) {
    let apparentGetterType: spec.OptionalValue = prop;

    // We can only ever return one type, so take the first one
    if (spec.isIntersectionTypeReference(prop.type)) {
      apparentGetterType = {
        optional: prop.optional,
        type: prop.type.intersection.types[0],
      };
    }

    const getterType = forceSingleType(
      this.toDecoratedJavaTypes(apparentGetterType),
    );
    const propName = jsiiToPascalCase(
      JavaGenerator.safeJavaPropertyName(prop.name),
    );

    // for unions we only generate overloads for setters, not getters.
    this.code.line();
    this.addJavaDocs(
      prop,
      {
        api: 'member',
        fqn: ifc.fqn,
        memberName: prop.name,
      },
      {
        returnsUnion: prop.type,
      },
    );
    this.emitStabilityAnnotations(prop);
    if (prop.optional) {
      if (prop.overrides) {
        this.code.line('@Override');
      }
      this.code.openBlock(
        `default ${displayStatic(getterType)} get${propName}()`,
      );
      this.code.line('return null;');
      this.code.closeBlock();
    } else {
      this.code.line(`${displayStatic(getterType)} get${propName}();`);
    }

    if (!prop.immutable) {
      const setterTypes = this.toDecoratedJavaTypes(prop);
      for (const type of setterTypes) {
        this.code.line();
        this.addJavaDocs(prop, {
          api: 'member',
          fqn: ifc.fqn,
          memberName: prop.name,
          // Setter doesn't need a union type hint because we're generating overloads
        });
        if (prop.optional) {
          if (prop.overrides) {
            this.code.line('@Override');
          }
          this.code.line('@software.amazon.jsii.Optional');
          this.code.openBlock(
            `default void set${propName}(final ${displayStatic(type)} value)`,
          );
          this.code.line(
            `throw new UnsupportedOperationException("'void " + getClass().getCanonicalName() + "#set${propName}(${displayStatic(type)})' is not implemented!");`,
          );
          this.code.closeBlock();
        } else {
          this.code.line(
            `void set${propName}(final ${displayStatic(type)} value);`,
          );
        }
      }
    }
  }

  /**
   * Emits a local default implementation for properties inherited from multiple
   * distinct parent types. This removes the default method dispatch ambiguity
   * that would otherwise exist.
   *
   * @param ifc            the interface to be processed.

   *
   * @see https://github.com/aws/jsii/issues/2256
   */
  private emitMultiplyInheritedProperties(ifc: spec.InterfaceType) {
    if (ifc.interfaces == null || ifc.interfaces.length <= 1) {
      // Nothing to do if we don't have parent interfaces, or if we have exactly one
      return;
    }

    const memberSources: Record<string, Record<string, spec.Property>> = {};
    for (const parent of ifc.interfaces) {
      const type = this.reflectAssembly.system.findInterface(parent);
      for (const prop of type.allProperties) {
        if (!(prop.name in memberSources)) {
          memberSources[prop.name] = {};
        }
        memberSources[prop.name][prop.definingType.fqn] = prop.spec;
      }
    }

    for (const defininingTypes of Object.values(memberSources)) {
      // Ignore our own type
      delete defininingTypes[ifc.fqn];

      const keys = Object.keys(defininingTypes);
      if (keys.length > 1) {
        this.onInterfaceProperty(ifc, defininingTypes[keys[0]]);
      }
    }
  }

  private emitAssemblyPackageInfo(mod: spec.Assembly) {
    if (!mod.docs) {
      return;
    }

    const { packageName } = this.toNativeName(mod);
    const packageInfoFile = this.toJavaFilePath(
      mod,
      `${mod.name}.package-info`,
    );
    this.code.openFile(packageInfoFile);
    this.code.line('/**');
    if (mod.readme) {
      for (const line of myMarkDownToJavaDoc(
        this.convertSamplesInMarkdown(mod.readme.markdown, {
          api: 'moduleReadme',
          moduleFqn: mod.name,
        }),
      ).split('\n')) {
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

  private emitSubmodulePackageInfo(assembly: spec.Assembly, moduleFqn: string) {
    const mod = assembly.submodules?.[moduleFqn];
    if (!mod?.readme?.markdown) {
      return;
    }

    const { packageName } = translateFqn(assembly, moduleFqn);
    const packageInfoFile = this.toJavaFilePath(
      assembly,
      `${moduleFqn}.package-info`,
    );
    this.code.openFile(packageInfoFile);
    this.code.line('/**');
    if (mod.readme) {
      for (const line of myMarkDownToJavaDoc(
        this.convertSamplesInMarkdown(mod.readme.markdown, {
          api: 'moduleReadme',
          moduleFqn,
        }),
      ).split('\n')) {
        this.code.line(` * ${line.replace(/\*\//g, '*{@literal /}')}`);
      }
    }
    this.code.line(' */');
    this.code.line(`package ${packageName};`);
    this.code.closeFile(packageInfoFile);
  }

  private emitMavenPom(assm: spec.Assembly, fingerprint: boolean) {
    if (!assm.targets?.java) {
      throw new Error(`Assembly ${assm.name} does not declare a java target`);
    }

    const comment = fingerprint
      ? {
          '#comment': [
            `Generated by jsii-pacmak@${VERSION_DESC} on ${new Date().toISOString()}`,
            `@jsii-pacmak:meta@ ${JSON.stringify(this.metadata)}`,
          ],
        }
      : {};

    this.code.openFile('pom.xml');
    this.code.line(
      xmlbuilder
        .create(
          {
            project: {
              '@xmlns': 'http://maven.apache.org/POM/4.0.0',
              '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
              '@xsi:schemaLocation':
                'http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd',

              ...comment,

              modelVersion: '4.0.0',
              name: '${project.groupId}:${project.artifactId}',
              description: assm.description,
              url: assm.homepage,

              licenses: {
                license: getLicense(),
              },

              developers: {
                developer: mavenDevelopers(),
              },

              scm: {
                connection: `scm:${assm.repository.type}:${assm.repository.url}`,
                url: assm.repository.url,
              },

              groupId: assm.targets.java.maven.groupId,
              artifactId: assm.targets.java.maven.artifactId,
              version: makeVersion(
                assm.version,
                assm.targets.java.maven.versionSuffix,
              ),
              packaging: 'jar',

              properties: { 'project.build.sourceEncoding': 'UTF-8' },

              dependencies: { dependency: mavenDependencies.call(this) },

              build: {
                plugins: {
                  plugin: [
                    {
                      groupId: 'org.apache.maven.plugins',
                      artifactId: 'maven-compiler-plugin',
                      version: '3.11.0',
                      configuration: {
                        source: '1.8',
                        target: '1.8',
                        fork: 'true',
                        maxmem: '4096m',
                      },
                    },
                    {
                      groupId: 'org.apache.maven.plugins',
                      artifactId: 'maven-jar-plugin',
                      version: '3.3.0',
                      configuration: {
                        archive: {
                          index: true,
                          manifest: {
                            addDefaultImplementationEntries: true,
                            addDefaultSpecificationEntries: true,
                          },
                        },
                      },
                    },
                    {
                      groupId: 'org.apache.maven.plugins',
                      artifactId: 'maven-source-plugin',
                      version: '3.3.0',
                      executions: {
                        execution: {
                          id: 'attach-sources',
                          goals: { goal: 'jar' },
                        },
                      },
                    },
                    {
                      groupId: 'org.apache.maven.plugins',
                      artifactId: 'maven-javadoc-plugin',
                      version: '3.5.0',
                      executions: {
                        execution: {
                          id: 'attach-javadocs',
                          goals: { goal: 'jar' },
                        },
                      },
                      configuration: {
                        failOnError: false,
                        show: 'protected',
                        sourceFileExcludes: {
                          // Excluding the $Module classes so they won't pollute the docsite. They otherwise
                          // are all collected at the top of the classlist, burrying useful information under
                          // a lot of dry scrolling.
                          exclude: ['**/$Module.java'],
                        },
                        // Adding these makes JavaDoc generation about a 3rd faster (which is far and away the most
                        // expensive part of the build)
                        additionalJOption: [
                          '-J-XX:+TieredCompilation',
                          '-J-XX:TieredStopAtLevel=1',
                        ],
                        doclint: 'none',
                        quiet: 'true',
                      },
                    },
                    {
                      groupId: 'org.apache.maven.plugins',
                      artifactId: 'maven-enforcer-plugin',
                      version: '3.3.0',
                      executions: {
                        execution: {
                          id: 'enforce-maven',
                          goals: { goal: 'enforce' },
                          configuration: {
                            rules: {
                              requireMavenVersion: { version: '3.6' },
                            },
                          },
                        },
                      },
                    },
                    {
                      groupId: 'org.codehaus.mojo',
                      artifactId: 'versions-maven-plugin',
                      version: '2.16.0',
                      configuration: {
                        generateBackupPoms: false,
                      },
                    },
                  ],
                },
              },
            },
          },
          { encoding: 'UTF-8' },
        )
        .end({ pretty: true }),
    );
    this.code.closeFile('pom.xml');

    /**
     * Combines a version number with an optional suffix. The suffix, when present, must begin with
     * '-' or '.', and will be concatenated as-is to the version number..
     *
     * @param version the semantic version number
     * @param suffix  the suffix, if any.
     */
    function makeVersion(version: string, suffix?: string): string {
      if (!suffix) {
        return toReleaseVersion(version, TargetName.JAVA);
      }
      if (!suffix.startsWith('-') && !suffix.startsWith('.')) {
        throw new Error(
          `versionSuffix must start with '-' or '.', but received ${suffix}`,
        );
      }
      return `${version}${suffix}`;
    }

    function mavenDependencies(this: JavaGenerator) {
      const dependencies = new Array<MavenDependency>();
      for (const [depName, version] of Object.entries(
        this.assembly.dependencies ?? {},
      )) {
        const dep = this.assembly.dependencyClosure?.[depName];
        if (!dep?.targets?.java) {
          throw new Error(
            `Assembly ${assm.name} depends on ${depName}, which does not declare a java target`,
          );
        }
        dependencies.push({
          groupId: dep.targets.java.maven.groupId,
          artifactId: dep.targets.java.maven.artifactId,
          version: toMavenVersionRange(
            version,
            dep.targets.java.maven.versionSuffix,
          ),
        });
      }
      // The JSII java runtime base classes
      dependencies.push({
        groupId: 'software.amazon.jsii',
        artifactId: 'jsii-runtime',
        version:
          VERSION === '0.0.0'
            ? '[0.0.0-SNAPSHOT]'
            : // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              toMavenVersionRange(`^${VERSION}`),
      });

      // Provides @org.jetbrains.*
      dependencies.push({
        groupId: 'org.jetbrains',
        artifactId: 'annotations',
        version: '[16.0.3,20.0.0)',
      });

      // Provides @javax.annotation.Generated for JDKs >= 9
      dependencies.push({
        '#comment': 'Provides @javax.annotation.Generated for JDKs >= 9',
        groupId: 'javax.annotation',
        artifactId: 'javax.annotation-api',
        version: '[1.3.2,1.4.0)',
        scope: 'compile',
      });

      return dependencies;
    }

    function mavenDevelopers() {
      return [assm.author, ...(assm.contributors ?? [])].map(toDeveloper);

      function toDeveloper(person: spec.Person) {
        const developer: any = {
          [person.organization ? 'organization' : 'name']: person.name,
          roles: { role: person.roles },
        };
        // We cannot set "undefined" or "null" to a field - this causes invalid XML to be emitted (per POM schema).
        if (person.email) {
          developer.email = person.email;
        }
        if (person.url) {
          developer[person.organization ? 'organizationUrl' : 'url'] =
            person.url;
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
      return (
        spdx && {
          name: spdx.name,
          url: spdx.url,
          distribution: 'repo',
          comments: spdx.osiApproved ? 'An OSI-approved license' : undefined,
        }
      );
    }
  }

  private emitStaticInitializer(cls: spec.ClassType) {
    const consts = (cls.properties ?? []).filter((x) => x.const);
    if (consts.length === 0) {
      return;
    }

    const javaClass = forceSingleType(this.toJavaTypes(cls));

    this.code.line();
    this.code.openBlock('static');

    for (const prop of consts) {
      const constName = this.renderConstName(prop);
      const propType = this.toNativeType(
        forceSingleType(this.toJavaTypes(prop.type)),
      );
      const statement = `software.amazon.jsii.JsiiObject.jsiiStaticGet(${displayStatic(javaClass)}.class, "${prop.name}", ${propType})`;
      this.code.line(
        `${constName} = ${this.wrapCollection(
          statement,
          prop.type,
          prop.optional,
        )};`,
      );
    }

    this.code.closeBlock();
  }

  private renderConstName(prop: spec.Property) {
    return this.code.toSnakeCase(prop.name).toLocaleUpperCase(); // java consts are SNAKE_UPPER_CASE
  }

  private emitConstProperty(parentType: spec.Type, prop: spec.Property) {
    const propType = forceSingleType(this.toJavaTypes(prop.type));
    const propName = this.renderConstName(prop);
    const access = this.renderAccessLevel(prop);

    this.code.line();
    this.addJavaDocs(
      prop,
      {
        api: 'member',
        fqn: parentType.fqn,
        memberName: prop.name,
      },
      {
        returnsUnion: prop.type,
      },
    );
    this.emitStabilityAnnotations(prop);
    this.code.line(
      `${access} final static ${displayStatic(propType)} ${propName};`,
    );
  }

  private emitProperty(
    cls: spec.Type,
    prop: spec.Property,
    definingType: spec.Type,
    {
      defaultImpl = false,
      final = false,
      includeGetter = true,
      overrides = !!prop.overrides,
    }: {
      defaultImpl?: boolean;
      final?: boolean;
      includeGetter?: boolean;
      overrides?: boolean;
    } = {},
  ) {
    const setterTypes = this.toDecoratedJavaTypes(prop);
    const getterType = forceSingleType(setterTypes);

    const propName = jsiiToPascalCase(
      JavaGenerator.safeJavaPropertyName(prop.name),
    );

    const modifiers = [defaultImpl ? 'default' : this.renderAccessLevel(prop)];
    if (prop.static) modifiers.push('static');
    if (prop.abstract && !defaultImpl) modifiers.push('abstract');
    if (final && !prop.abstract && !defaultImpl) modifiers.push('final');

    const javaClass = forceSingleType(this.toJavaTypes(cls));

    // for unions we only generate overloads for setters, not getters.
    if (includeGetter) {
      this.code.line();
      this.addJavaDocs(
        prop,
        {
          api: 'member',
          fqn: definingType.fqn,
          memberName: prop.name,
        },
        {
          returnsUnion: prop.type,
        },
      );
      if (overrides && !prop.static) {
        this.code.line('@Override');
      }
      this.emitStabilityAnnotations(prop);
      const signature = `${modifiers.join(' ')} ${displayStatic(getterType)} get${propName}()`;
      if (prop.abstract && !defaultImpl) {
        this.code.line(`${signature};`);
      } else {
        this.code.openBlock(signature);
        let statement;
        if (prop.static) {
          statement = `software.amazon.jsii.JsiiObject.jsiiStaticGet(${displayStatic(
            forceSingleType(this.toJavaTypes(cls)),
          )}.class, `;
        } else {
          statement = 'software.amazon.jsii.Kernel.get(this, ';
        }

        statement += `"${prop.name}", ${this.toNativeType(forceSingleType(this.toJavaTypes(prop.type)))})`;

        this.code.line(
          `return ${this.wrapCollection(statement, prop.type, prop.optional)};`,
        );
        this.code.closeBlock();
      }
    }

    if (!prop.immutable) {
      for (const type of setterTypes) {
        this.code.line();
        this.addJavaDocs(prop, {
          api: 'member',
          fqn: cls.fqn,
          memberName: prop.name,
          // No union type hint for setters
        });
        if (overrides && !prop.static) {
          this.code.line('@Override');
        }
        this.emitStabilityAnnotations(prop);

        // We could have emitted a covariant argument type here, but we didn't historically and I'm not changing that now.
        const signature = `${modifiers.join(
          ' ',
        )} void set${propName}(final ${displayStatic(type)} value)`;
        if (prop.abstract && !defaultImpl) {
          this.code.line(`${signature};`);
        } else {
          this.code.openBlock(signature);
          let statement = '';

          // Setters have one overload for each possible type in the union parameter.
          // If a setter can take a `String | Number`, then we render two setters;
          // one that takes a string, and one that takes a number.
          // This allows the compiler to do this type checking for us,
          // so we should not emit these checks for primitive-only unions.
          // Also, Java does not allow us to perform these checks if the types
          // have no overlap (eg if we emit code for `String instanceof Number`,
          // which will always return `false`, the compiler would reject the code).
          if (
            displayStatic(type).includes('java.lang.Object') &&
            (!spec.isPrimitiveTypeReference(prop.type) ||
              prop.type.primitive === spec.PrimitiveType.Any)
          ) {
            this.emitUnionParameterValidation(
              [
                {
                  name: 'value',
                  type: this.filterType(prop, type),
                },
              ],
              'exact-types',
            );
          }
          if (prop.static) {
            statement += `software.amazon.jsii.JsiiObject.jsiiStaticSet(${displayStatic(javaClass)}.class, `;
          } else {
            statement += 'software.amazon.jsii.Kernel.set(this, ';
          }
          const value = prop.optional
            ? 'value'
            : `java.util.Objects.requireNonNull(value, "${prop.name} is required")`;
          statement += `"${prop.name}", ${value});`;
          this.code.line(statement);
          this.code.closeBlock();
        }
      }
    }
  }

  /**
   * Filters types from a union to select only those that correspond to the
   * specified javaType.
   *
   * @param ref the type to be filtered.
   * @param javaType the java type that is expected.
   * @param covariant whether collections should use the covariant form.
   * @param optional whether the type at an optional location or not
   *
   * @returns a type reference that matches the provided javaType.
   */
  private filterType(
    prop: spec.OptionalValue,
    javaType: JavaType,
  ): spec.TypeReference {
    if (!spec.isUnionTypeReference(prop.type)) {
      // No filterning needed -- this isn't a type union!
      return prop.type;
    }
    const types = prop.type.union.types.filter((t) =>
      typesEqual(
        forceSingleType(annotateOptional(prop, this.toJavaTypes(t))),
        javaType,
      ),
    );
    assert(
      types.length > 0,
      `No type found in ${spec.describeTypeReference(
        prop.type,
      )} has Java type ${displayStatic(javaType)}`,
    );
    return { union: { types } };
  }

  private emitMethod(
    cls: spec.Type,
    method: spec.Method,
    {
      defaultImpl = false,
      final = false,
      overrides = !!method.overrides,
    }: { defaultImpl?: boolean; final?: boolean; overrides?: boolean } = {},
  ) {
    const returnType = method.returns
      ? forceSingleType(this.toDecoratedJavaTypes(method.returns))
      : mkStatic('void');

    const modifiers = [
      defaultImpl ? 'default' : this.renderAccessLevel(method),
    ];
    if (method.static) modifiers.push('static');
    if (method.abstract && !defaultImpl) modifiers.push('abstract');
    if (final && !method.abstract && !defaultImpl) modifiers.push('final');

    const async = !!method.async;
    const methodName = JavaGenerator.safeJavaMethodName(method.name);

    const types = this.convertTypes(method.parameters);
    const covariance = covarianceFromOverridability(
      overridabilityFromMethod(method),
    );

    const signature = `${typeVarDeclarations(types)}${displayStatic(returnType)} ${methodName}(${this.renderParameters(
      method.parameters,
      types,
      covariance,
    )})`;
    this.code.line();
    this.addJavaDocs(
      method,
      {
        api: 'member',
        fqn: cls.fqn,
        memberName: method.name,
      },
      {
        returnsUnion: method.returns?.type,
      },
    );
    this.emitStabilityAnnotations(method);
    if (overrides && !method.static) {
      this.code.line('@Override');
    }
    if (method.abstract && !defaultImpl) {
      this.code.line(`${modifiers.join(' ')} ${signature};`);
    } else {
      this.code.openBlock(`${modifiers.join(' ')} ${signature}`);
      this.emitUnionParameterValidation(method.parameters, covariance);
      this.code.line(this.renderMethodCall(cls, method, async));
      this.code.closeBlock();
    }
  }

  /**
   * Emits type checks for values passed for type union parameters.
   *
   * @param parameters the list of parameters received by the function.
   */
  private emitUnionParameterValidation(
    parameters: readonly spec.Parameter[] | undefined,
    covariance: Covariance,
  ): void {
    if (!this.runtimeTypeChecking) {
      // We were configured not to emit those, so bail out now.
      return;
    }
    const unionParameters = parameters?.filter(({ type }) =>
      containsUnionType(type),
    );
    if (unionParameters == null || unionParameters.length === 0) {
      return;
    }

    this.code.openBlock(
      'if (software.amazon.jsii.Configuration.getRuntimeTypeChecking())',
    );
    for (const param of unionParameters) {
      if (param.variadic) {
        const javaType = this.toSingleJavaType(param.type);
        const asListName = `__${param.name}__asList`;
        this.code.line(
          `final java.util.List<${displayStatic(javaType, covariance)}> ${asListName} = java.util.Arrays.asList(${param.name});`,
        );

        validate.call(
          this,
          asListName,
          `.append("${param.name}")`,
          {
            collection: {
              kind: spec.CollectionKind.Array,
              elementtype: param.type,
            },
          },
          param.name,
          true,
        );
      } else {
        validate.call(
          this,
          param.name,
          `.append("${param.name}")`,
          param.type,
          param.name,
          false,
        );
      }
    }
    this.code.closeBlock();

    function validate(
      this: JavaGenerator,
      value: string,
      descr: string,
      type: spec.TypeReference,
      parameterName: string,
      isRawArray = false,
    ) {
      if (spec.isUnionTypeReference(type)) {
        validateTypeUnion.call(this, value, descr, type, parameterName);
      } else if (spec.isCollectionTypeReference(type)) {
        switch (type.collection.kind) {
          case spec.CollectionKind.Array:
            return validateArray.call(
              this,
              value,
              descr,
              type.collection.elementtype,
              parameterName,
              isRawArray,
            );
          case spec.CollectionKind.Map:
            return validateMap.call(
              this,
              value,
              descr,
              type.collection.elementtype,
              parameterName,
            );
          default:
            throw new Error(
              `Unhandled collection kind: ${spec.describeTypeReference(type)}`,
            );
        }
      }
    }

    function validateArray(
      this: JavaGenerator,
      value: string,
      descr: string,
      elementType: spec.TypeReference,
      parameterName: string,
      isRawArray: boolean,
    ) {
      const suffix = createHash('sha256')
        .update(descr)
        .digest('hex')
        .slice(0, 6);
      const idxName = `__idx_${suffix}`;
      const valName = `__val_${suffix}`;
      this.code.openBlock(
        `for (int ${idxName} = 0; ${idxName} < ${value}.size(); ${idxName}++)`,
      );
      const eltType = this.toSingleJavaType(elementType);
      this.code.line(
        `final ${displayStatic(eltType)} ${valName} = ${value}.get(${idxName});`,
      );
      validate.call(
        this,
        valName,
        isRawArray
          ? `${descr}.append("[").append(${idxName}).append("]")`
          : `${descr}.append(".get(").append(${idxName}).append(")")`,
        elementType,
        parameterName,
        false,
      );
      this.code.closeBlock();
    }

    function validateMap(
      this: JavaGenerator,
      value: string,
      descr: string,
      elementType: spec.TypeReference,
      parameterName: string,
    ) {
      // we have to perform this check before the loop,
      // because the loop will assume that the keys are Strings;
      // this throws a ClassCastException
      this.code.openBlock(
        `if (!(${value}.keySet().toArray()[0] instanceof String))`,
      );
      this.code.indent(`throw new IllegalArgumentException(`);
      this.code.indent(`new java.lang.StringBuilder("Expected ")`);
      this.code.line(`${descr}.append(".keySet()")`);
      this.code.line(`.append(" to contain class String; received ")`);
      this.code.line(
        `.append(${value}.keySet().toArray()[0].getClass()).toString());`,
      );
      this.code.unindent(false);
      this.code.unindent(false);
      this.code.closeBlock();

      const suffix = createHash('sha256')
        .update(descr)
        .digest('hex')
        .slice(0, 6);
      const varName = `__item_${suffix}`;
      const valName = `__val_${suffix}`;
      const javaElemType = this.toSingleJavaType(elementType);

      const entryType = mkStatic('java.util.Map.Entry', [
        mkStatic('java.lang.String'),
        javaElemType,
      ]);

      this.code.openBlock(
        `for (final ${displayStatic(entryType, covariance)} ${varName}: ${value}.entrySet())`,
      );
      this.code.line(
        `final ${displayStatic(javaElemType, covariance)} ${valName} = ${varName}.getValue();`,
      );
      validate.call(
        this,
        valName,
        `${descr}.append(".get(\\"").append((${varName}.getKey())).append("\\")")`,
        elementType,
        parameterName,
      );
      this.code.closeBlock();
    }

    function validateTypeUnion(
      this: JavaGenerator,
      value: string,
      descr: string,
      type: spec.UnionTypeReference,
      parameterName: string,
    ) {
      let emitAnd = false;
      const nestedCollectionUnionTypes = new Map<string, spec.TypeReference>();
      const typeRefs = type.union.types;
      if (typeRefs.length > 1) {
        this.code.indent('if (');
      }
      const checked = new Set<string>();
      for (const typeRef of typeRefs) {
        const prefix = emitAnd ? '&&' : '';
        const javaRawType = this.toJavaTypeNoGenerics(typeRef);
        if (checked.has(javaRawType)) {
          continue;
        } else {
          checked.add(javaRawType);
        }
        const javaType = this.toSingleJavaType(typeRef);
        if (javaRawType !== displayStatic(javaType)) {
          nestedCollectionUnionTypes.set(displayStatic(javaType), typeRef);
        }
        const test = `${value} instanceof ${javaRawType}`;
        if (typeRefs.length > 1) {
          this.code.line(`${prefix} !(${test})`);
        }
        emitAnd = true;
      }
      if (
        typeRefs.length > 1 &&
        typeRefs.some(
          (t) =>
            spec.isNamedTypeReference(t) &&
            spec.isInterfaceType(this.findType(t.fqn)),
        )
      ) {
        // Only anonymous objects at runtime can be `JsiiObject`s.
        this.code.line(
          `&& !(${value}.getClass().equals(software.amazon.jsii.JsiiObject.class))`,
        );
      }

      if (typeRefs.length > 1) {
        this.code.unindent(false);
        this.code.openBlock(')');

        const placeholders = typeRefs
          .map((typeRef) => {
            return `${displayStatic(this.toSingleJavaType(typeRef))}`;
          })
          .join(', ');

        this.code.indent(`throw new IllegalArgumentException(`);
        this.code.indent(`new java.lang.StringBuilder("Expected ")`);
        this.code.line(descr);
        this.code.line(`.append(" to be one of: ${placeholders}; received ")`);
        this.code.line(`.append(${value}.getClass()).toString());`);
        this.code.unindent(false);
        this.code.unindent(false);
        this.code.closeBlock();
      }

      for (const [javaType, typeRef] of nestedCollectionUnionTypes) {
        const varName =
          typeRefs.length > 1
            ? `__cast_${createHash('sha256')
                .update(value)
                .digest('hex')
                .slice(0, 6)}`
            : value;
        if (typeRefs.length > 1) {
          this.code.openBlock(
            `if (${value} instanceof ${this.toJavaTypeNoGenerics(typeRef)})`,
          );
          this.code.line(`@SuppressWarnings("unchecked")`);
          this.code.line(
            `final ${javaType} ${varName} = (${javaType})${value};`,
          );
        }
        validate.call(this, varName, descr, typeRef, parameterName);
        if (typeRefs.length > 1) {
          this.code.closeBlock();
        }
      }
    }
  }

  /**
   * We are now going to build a class that can be used as a proxy for untyped
   * javascript objects that implement this interface. we want java code to be
   * able to interact with them, so we will create a proxy class which
   * implements this interface and has the same methods.
   *
   * These proxies are also used to extend abstract classes to allow the JSII
   * engine to instantiate an abstract class in Java.
   */
  private emitProxy(type: reflect.InterfaceType | reflect.ClassType) {
    const name = INTERFACE_PROXY_CLASS_NAME;

    this.code.line();
    this.code.line('/**');
    this.code.line(
      ' * A proxy class which represents a concrete javascript instance of this type.',
    );
    this.code.line(' */');

    // Get the list of $Default interfaces
    const baseInterfaces = this.defaultInterfacesFor(type, {
      includeThisType: true,
    });

    // Add ourselves if we don't have a $Default interface
    if (type.isInterfaceType() && !hasDefaultInterfaces(type.assembly)) {
      // Extend this interface directly since this module does not have the Jsii$Default
      baseInterfaces.push(this.toNativeFqn(type.fqn));
    }

    const suffix = type.isInterfaceType()
      ? `extends software.amazon.jsii.JsiiObject implements ${baseInterfaces.join(
          ', ',
        )}`
      : `extends ${this.toNativeFqn(type.fqn)}${
          baseInterfaces.length > 0
            ? ` implements ${baseInterfaces.join(', ')}`
            : ''
        }`;

    const modifiers = type.isInterfaceType() ? 'final' : 'private static final';

    this.code.line(ANN_INTERNAL);
    this.code.openBlock(`${modifiers} class ${name} ${suffix}`);
    this.code.openBlock(
      `protected ${name}(final software.amazon.jsii.JsiiObjectRef objRef)`,
    );
    this.code.line('super(objRef);');
    this.code.closeBlock();

    // emit all properties
    for (const reflectProp of type.allProperties.filter(needsProxyImpl)) {
      const prop = clone(reflectProp.spec);
      prop.abstract = false;
      // Emitting "final" since this is a proxy and nothing will/should override this
      this.emitProperty(type.spec, prop, reflectProp.definingType.spec, {
        final: true,
        overrides: true,
      });
    }

    // emit all the methods
    for (const reflectMethod of type.allMethods.flatMap(
      this.makeProxyImpls.bind(this),
    )) {
      const method = clone(reflectMethod);
      // Emitting "final" since this is a proxy and nothing will/should override this
      method.abstract = false;
      this.emitMethod(type.spec, method, { final: true, overrides: true });
    }

    this.code.closeBlock();
  }

  private emitDefaultImplementation(type: reflect.InterfaceType) {
    const baseInterfaces = [type.name, ...this.defaultInterfacesFor(type)];

    this.code.line();
    this.code.line('/**');
    this.code.line(
      ` * Internal default implementation for {@link ${type.name}}.`,
    );
    this.code.line(' */');
    this.code.line(ANN_INTERNAL);
    this.code.openBlock(
      `interface ${INTERFACE_DEFAULT_CLASS_NAME} extends ${baseInterfaces
        .sort()
        .join(', ')}`,
    );

    for (const property of type.allProperties.filter(needsDefaultImpl)) {
      this.emitProperty(type.spec, property.spec, property.definingType.spec, {
        defaultImpl: true,
        overrides: type.isInterfaceType(),
      });
    }
    for (const method of type.allMethods.flatMap(
      this.makeDefaultImpls.bind(this),
    )) {
      this.emitMethod(type.spec, method, {
        defaultImpl: true,
        overrides: true,
      });
    }
    this.code.closeBlock();
  }

  private emitStabilityAnnotations(entity: spec.Documentable) {
    if (!entity.docs) {
      return;
    }
    if (entity.docs.stability) {
      this.code.line(
        `@software.amazon.jsii.Stability(software.amazon.jsii.Stability.Level.${_level(
          entity.docs.stability,
        )})`,
      );
    }
    if (
      entity.docs.stability === spec.Stability.Deprecated ||
      entity.docs.deprecated
    ) {
      this.code.line('@Deprecated');
    }

    function _level(stability: spec.Stability): string {
      switch (stability) {
        case spec.Stability.Deprecated:
          return 'Deprecated';
        case spec.Stability.Experimental:
          return 'Experimental';
        case spec.Stability.External:
          // Rendering 'External' out as publicly visible state is confusing. As far
          // as users are concerned we just advertise this as stable.
          return 'Stable';
        case spec.Stability.Stable:
          return 'Stable';
        default:
          throw new Error(`Unexpected stability: ${stability as any}`);
      }
    }
  }

  private toJavaProp(
    property: spec.Property,
    definingType: spec.Type,
    inherited: boolean,
  ): JavaProp {
    const safeName = JavaGenerator.safeJavaPropertyName(property.name);
    const propName = jsiiToPascalCase(safeName);

    const noIntersectionJavaTypes = this.toJavaTypes(
      removeIntersections(property.type),
    );
    const singleJavaType = forceSingleType(noIntersectionJavaTypes);

    return {
      docs: property.docs,
      spec: property,
      definingType,
      propName,
      jsiiName: property.name,
      nullable: !!property.optional,
      fieldName: this.code.toCamelCase(safeName),
      renderedFieldType: displayStatic(singleJavaType),
      renderedParamType: displayType(singleJavaType, 'covariant'),
      renderedNativeFieldType: this.toNativeType(singleJavaType),
      javaTypes: this.toJavaTypes(property.type),
      immutable: property.immutable ?? false,
      inherited,
    };
  }

  private emitClassBuilder(cls: spec.ClassType) {
    // Not rendering if there is no initializer, or if the initializer is protected or variadic
    if (cls.initializer == null || cls.initializer.protected) {
      return;
    }
    // Not rendering if the initializer has no parameters
    if (cls.initializer.parameters == null) {
      return;
    }
    // Not rendering if there is a nested "Builder" class
    if (
      this.reflectAssembly.tryFindType(`${cls.fqn}.${BUILDER_CLASS_NAME}`) !=
      null
    ) {
      return;
    }

    // Find the first struct parameter of the constructor (if any)
    const firstStruct = cls.initializer.parameters.find((param) => {
      if (!spec.isNamedTypeReference(param.type)) {
        return false;
      }
      const paramType = this.reflectAssembly.tryFindType(param.type.fqn);
      return paramType?.isDataType();
    });

    // Not rendering if there is no struct parameter
    if (firstStruct == null) {
      return;
    }

    const structType = this.reflectAssembly.findType(
      (firstStruct.type as spec.NamedTypeReference).fqn,
    ) as reflect.InterfaceType;
    const structParamName = this.code.toCamelCase(
      JavaGenerator.safeJavaPropertyName(firstStruct.name),
    );
    const structBuilder = `${displayStatic(
      this.toSingleJavaType(firstStruct.type),
    )}.${BUILDER_CLASS_NAME}`;

    const positionalParams = cls.initializer.parameters
      .filter((p) => p !== firstStruct)
      .map((param) => ({
        param,
        fieldName: this.code.toCamelCase(
          JavaGenerator.safeJavaPropertyName(param.name),
        ),
        javaType: this.toSingleJavaType(param.type),
      }));

    const builtType = this.toSingleJavaType(cls);

    this.code.line();
    this.code.line('/**');
    // eslint-disable-next-line prettier/prettier
    this.code.line(
      ` * ${stabilityPrefixFor(
        cls.initializer,
      )}A fluent builder for {@link ${displayStatic(builtType)}}.`,
    );
    this.code.line(' */');
    this.emitStabilityAnnotations(cls.initializer);
    this.code.openBlock(
      `public static final class ${BUILDER_CLASS_NAME} implements software.amazon.jsii.Builder<${displayStatic(builtType)}>`,
    );

    // Static factory method(s)
    for (const params of computeOverrides(positionalParams)) {
      const dummyMethod: spec.Method = {
        docs: {
          stability: cls.initializer.docs?.stability ?? cls.docs?.stability,
          returns: `a new instance of {@link ${BUILDER_CLASS_NAME}}.`,
        },
        name: 'create',
        parameters: params.map((param) => param.param),
      };
      this.addJavaDocs(dummyMethod, {
        api: 'member',
        fqn: cls.fqn,
        memberName: dummyMethod.name,
      });
      this.emitStabilityAnnotations(cls.initializer);
      this.code.openBlock(
        `public static ${BUILDER_CLASS_NAME} create(${params
          .map(
            (param) =>
              `final ${displayStatic(param.javaType)}${param.param.variadic ? '...' : ''} ${
                param.fieldName
              }`,
          )
          .join(', ')})`,
      );
      this.code.line(
        `return new ${BUILDER_CLASS_NAME}(${positionalParams
          .map((param, idx) => (idx < params.length ? param.fieldName : 'null'))
          .join(', ')});`,
      );
      this.code.closeBlock();
    }

    // Private properties
    this.code.line();
    for (const param of positionalParams) {
      this.code.line(
        `private final ${displayStatic(param.javaType)}${param.param.variadic ? '[]' : ''} ${
          param.fieldName
        };`,
      );
    }
    this.code.line(
      `private ${
        firstStruct.optional ? '' : 'final '
      }${structBuilder} ${structParamName};`,
    );

    // Private constructor
    this.code.line();
    this.code.openBlock(
      `private ${BUILDER_CLASS_NAME}(${positionalParams
        .map(
          (param) =>
            `final ${displayStatic(param.javaType)}${param.param.variadic ? '...' : ''} ${
              param.fieldName
            }`,
        )
        .join(', ')})`,
    );
    for (const param of positionalParams) {
      this.code.line(`this.${param.fieldName} = ${param.fieldName};`);
    }
    if (!firstStruct.optional) {
      this.code.line(`this.${structParamName} = new ${structBuilder}();`);
    }
    this.code.closeBlock();

    // Fields
    for (const prop of structType.allProperties) {
      const fieldName = this.code.toCamelCase(
        JavaGenerator.safeJavaPropertyName(prop.name),
      );
      this.code.line();
      const setter: spec.Method = {
        name: fieldName,
        docs: {
          ...prop.spec.docs,
          stability: prop.spec.docs?.stability,
          returns: '{@code this}',
        },
        parameters: [
          {
            name: fieldName,
            type: spec.CANONICAL_ANY, // We don't quite care in this context!
            docs: prop.spec.docs,
          },
        ],
      };
      for (const javaType of this.toJavaTypes(prop.type.spec!)) {
        this.addJavaDocs(setter, {
          api: 'member',
          fqn: prop.definingType.fqn, // Could be inherited
          memberName: prop.name,
        });
        this.emitStabilityAnnotations(prop.spec);
        // FIXME: generix
        const renderedType = displayType(javaType, 'covariant');
        this.code.openBlock(
          `public ${typeVarDeclarations([javaType])}${BUILDER_CLASS_NAME} ${fieldName}(final ${renderedType} ${fieldName})`,
        );
        this.code.line(
          `this.${structParamName}${
            firstStruct.optional ? '()' : ''
          }.${fieldName}(${fieldName});`,
        );
        this.code.line('return this;');
        this.code.closeBlock();
      }
    }

    // Final build method
    this.code.line();
    this.code.line('/**');
    this.code.line(
      ` * @return a newly built instance of {@link ${displayStatic(builtType)}}.`,
    );
    this.code.line(' */');
    this.emitStabilityAnnotations(cls.initializer);
    this.code.line('@Override');
    this.code.openBlock(`public ${displayStatic(builtType)} build()`);
    const params = cls.initializer.parameters.map((param) => {
      if (param === firstStruct) {
        return firstStruct.optional
          ? `this.${structParamName} != null ? this.${structParamName}.build() : null`
          : `this.${structParamName}.build()`;
      }
      return `this.${
        positionalParams.find((p) => param === p.param)!.fieldName
      }`;
    });
    this.code.indent(`return new ${displayStatic(builtType)}(`);
    params.forEach((param, idx) =>
      this.code.line(`${param}${idx < params.length - 1 ? ',' : ''}`),
    );
    this.code.unindent(');');
    this.code.closeBlock();

    // Optional builder initialization
    if (firstStruct.optional) {
      this.code.line();
      this.code.openBlock(`private ${structBuilder} ${structParamName}()`);
      this.code.openBlock(`if (this.${structParamName} == null)`);
      this.code.line(`this.${structParamName} = new ${structBuilder}();`);
      this.code.closeBlock();
      this.code.line(`return this.${structParamName};`);
      this.code.closeBlock();
    }
    this.code.closeBlock();
  }

  private emitBuilderSetter(
    prop: JavaProp,
    builderName: string,
    parentType: spec.InterfaceType,
  ) {
    for (const type of prop.javaTypes) {
      this.code.line();
      this.code.line('/**');
      this.code.line(
        ` * Sets the value of {@link ${parentType.name}#${getterFor(
          prop.fieldName,
        )}}`,
      );
      const summary = prop.docs?.summary ?? 'the value to be set';
      this.code.line(
        ` * ${this.paramJavadoc(prop.fieldName, prop.nullable, summary)}`,
      );
      if (prop.docs?.remarks != null) {
        const indent = ' '.repeat(7 + prop.fieldName.length);
        const remarks = myMarkDownToJavaDoc(
          this.convertSamplesInMarkdown(prop.docs.remarks, {
            api: 'member',
            fqn: prop.definingType.fqn,
            memberName: prop.jsiiName,
          }),
        ).trimRight();
        for (const line of remarks.split('\n')) {
          this.code.line(` * ${indent} ${line}`);
        }
      }
      this.code.line(' * @return {@code this}');
      if (prop.docs?.deprecated) {
        this.code.line(` * @deprecated ${prop.docs.deprecated}`);
      }
      this.code.line(' */');
      this.emitStabilityAnnotations(prop.spec);

      const renderedType = displayType(type, 'covariant');

      // We add an explicit cast if both types are generic but they are not identical (one is covariant, the other isn't)
      const explicitCast =
        renderedType.includes('<') &&
        prop.renderedFieldType.includes('<') &&
        renderedType !== prop.renderedFieldType
          ? `(${prop.renderedFieldType})`
          : '';
      if (explicitCast !== '') {
        // We'll be doing a safe, but unchecked cast, so suppress that warning
        this.code.line('@SuppressWarnings("unchecked")');
      }
      this.code.openBlock(
        `public ${typeVarDeclarations([type])}${builderName} ${prop.fieldName}(${renderedType} ${prop.fieldName})`,
      );
      this.code.line(
        `this.${prop.fieldName} = ${explicitCast}${prop.fieldName};`,
      );
      this.code.line('return this;');
      this.code.closeBlock();
    }

    function getterFor(fieldName: string): string {
      const [first, ...rest] = fieldName;
      return `get${first.toUpperCase()}${rest.join('')}`;
    }
  }

  private emitInterfaceBuilder(
    classSpec: spec.InterfaceType,
    constructorName: string,
    props: JavaProp[],
  ) {
    // Start builder()
    this.code.line();
    this.code.line('/**');
    this.code.line(
      ` * @return a {@link ${BUILDER_CLASS_NAME}} of {@link ${classSpec.name}}`,
    );
    this.code.line(' */');
    this.emitStabilityAnnotations(classSpec);
    this.code.openBlock(`static ${BUILDER_CLASS_NAME} builder()`);
    this.code.line(`return new ${BUILDER_CLASS_NAME}();`);
    this.code.closeBlock();
    // End builder()

    // Start Builder
    this.code.line('/**');
    this.code.line(` * A builder for {@link ${classSpec.name}}`);
    this.code.line(' */');
    this.emitStabilityAnnotations(classSpec);
    this.code.openBlock(
      `public static final class ${BUILDER_CLASS_NAME} implements software.amazon.jsii.Builder<${classSpec.name}>`,
    );

    props.forEach((prop) =>
      this.code.line(`${prop.renderedFieldType} ${prop.fieldName};`),
    );
    props.forEach((prop) =>
      this.emitBuilderSetter(prop, BUILDER_CLASS_NAME, classSpec),
    );

    // Start build()
    this.code.line();
    this.code.line('/**');
    this.code.line(' * Builds the configured instance.');
    this.code.line(` * @return a new instance of {@link ${classSpec.name}}`);
    this.code.line(
      ' * @throws NullPointerException if any required attribute was not provided',
    );
    this.code.line(' */');
    this.emitStabilityAnnotations(classSpec);
    this.code.line('@Override');
    this.code.openBlock(`public ${classSpec.name} build()`);

    this.code.line(`return new ${constructorName}(this);`);
    this.code.closeBlock();
    // End build()

    this.code.closeBlock();
    // End Builder
  }

  private emitDataType(ifc: spec.InterfaceType) {
    // collect all properties from all base structs and dedupe by name. It is assumed that the generation of the
    // assembly will not permit multiple overloaded inherited properties with the same name and that this will be
    // enforced by Typescript constraints.
    const propsByName: { [name: string]: JavaProp } = {};

    function collectProps(
      this: JavaGenerator,
      currentIfc: spec.InterfaceType,
      isBaseClass = false,
    ) {
      for (const property of currentIfc.properties ?? []) {
        const javaProp = this.toJavaProp(property, currentIfc, isBaseClass);
        propsByName[javaProp.propName] = javaProp;
      }

      // add props of base struct
      for (const base of currentIfc.interfaces ?? []) {
        collectProps.call(
          this,
          this.findType(base) as spec.InterfaceType,
          true,
        );
      }
    }

    collectProps.call(this, ifc);
    const props = Object.values(propsByName);
    this.emitInterfaceBuilder(ifc, INTERFACE_PROXY_CLASS_NAME, props);

    // Start implementation class
    this.code.line();
    this.code.line('/**');
    this.code.line(` * An implementation for {@link ${ifc.name}}`);
    this.code.line(' */');
    this.emitStabilityAnnotations(ifc);
    this.code.line(ANN_INTERNAL);
    this.code.openBlock(
      `final class ${INTERFACE_PROXY_CLASS_NAME} extends software.amazon.jsii.JsiiObject implements ${ifc.name}`,
    );

    // Immutable properties
    props.forEach((prop) =>
      this.code.line(
        `private final ${prop.renderedFieldType} ${prop.fieldName};`,
      ),
    );

    // Start JSII reference constructor
    this.code.line();
    this.code.line('/**');
    this.code.line(
      ' * Constructor that initializes the object based on values retrieved from the JsiiObject.',
    );
    this.code.line(' * @param objRef Reference to the JSII managed object.');
    this.code.line(' */');
    this.code.openBlock(
      `protected ${INTERFACE_PROXY_CLASS_NAME}(final software.amazon.jsii.JsiiObjectRef objRef)`,
    );
    this.code.line('super(objRef);');
    props.forEach((prop) =>
      this.code.line(
        `this.${prop.fieldName} = software.amazon.jsii.Kernel.get(this, "${prop.jsiiName}", ${prop.renderedNativeFieldType});`,
      ),
    );
    this.code.closeBlock();
    // End JSII reference constructor

    // Start builder constructor
    this.code.line();
    this.code.line('/**');
    this.code.line(
      ' * Constructor that initializes the object based on literal property values passed by the {@link Builder}.',
    );
    this.code.line(' */');
    if (
      props.some((prop) => prop.renderedFieldType !== prop.renderedParamType)
    ) {
      this.code.line('@SuppressWarnings("unchecked")');
    }
    this.code.openBlock(
      `protected ${INTERFACE_PROXY_CLASS_NAME}(final ${BUILDER_CLASS_NAME} builder)`,
    );
    this.code.line(
      'super(software.amazon.jsii.JsiiObject.InitializationMode.JSII);',
    );
    props.forEach((prop) => {
      const explicitCast =
        prop.renderedFieldType !== prop.renderedParamType
          ? `(${prop.renderedFieldType})`
          : '';
      this.code.line(
        `this.${prop.fieldName} = ${explicitCast}${_validateIfNonOptional(
          `builder.${prop.fieldName}`,
          prop,
        )};`,
      );
    });
    this.code.closeBlock();
    // End literal constructor

    // Getters
    props.forEach((prop) => {
      this.code.line();
      this.code.line('@Override');
      this.code.openBlock(
        `public final ${prop.renderedFieldType} get${prop.propName}()`,
      );
      this.code.line(`return this.${prop.fieldName};`);
      this.code.closeBlock();
    });

    // emit $jsii$toJson which will be called to serialize this object when sent to JS
    this.code.line();
    this.code.line('@Override');
    this.code.line(ANN_INTERNAL);
    this.code.openBlock(
      'public com.fasterxml.jackson.databind.JsonNode $jsii$toJson()',
    );
    this.code.line(
      'final com.fasterxml.jackson.databind.ObjectMapper om = software.amazon.jsii.JsiiObjectMapper.INSTANCE;',
    );
    this.code.line(
      `final com.fasterxml.jackson.databind.node.ObjectNode data = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();`,
    );

    this.code.line();
    for (const prop of props) {
      if (prop.nullable) {
        this.code.openBlock(`if (this.get${prop.propName}() != null)`);
      }
      this.code.line(
        `data.set("${prop.spec.name}", om.valueToTree(this.get${prop.propName}()));`,
      );
      if (prop.nullable) {
        this.code.closeBlock();
      }
    }

    this.code.line();
    this.code.line(
      'final com.fasterxml.jackson.databind.node.ObjectNode struct = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();',
    );
    this.code.line(`struct.set("fqn", om.valueToTree("${ifc.fqn}"));`);
    this.code.line('struct.set("data", data);');

    this.code.line();
    this.code.line(
      'final com.fasterxml.jackson.databind.node.ObjectNode obj = com.fasterxml.jackson.databind.node.JsonNodeFactory.instance.objectNode();',
    );
    this.code.line('obj.set("$jsii.struct", struct);');

    this.code.line();
    this.code.line('return obj;');
    this.code.closeBlock();
    // End $jsii$toJson

    // Generate equals() override
    this.emitEqualsOverride(ifc.name, props);

    // Generate hashCode() override
    this.emitHashCodeOverride(props);

    this.code.closeBlock();
    // End implementation class

    function _validateIfNonOptional(variable: string, prop: JavaProp): string {
      if (prop.nullable) {
        return variable;
      }
      return `java.util.Objects.requireNonNull(${variable}, "${prop.fieldName} is required")`;
    }
  }

  private emitEqualsOverride(className: string, props: JavaProp[]) {
    // A class without properties does not need to override equals()
    if (props.length === 0) {
      return;
    }

    this.code.line();
    this.code.line('@Override');
    this.code.openBlock(
      'public final boolean equals(final java.lang.Object o)',
    );
    this.code.line('if (this == o) return true;');

    // This was already checked by `super.equals(o)`, so we skip it here...
    this.code.line(
      'if (o == null || getClass() != o.getClass()) return false;',
    );

    this.code.line();
    this.code.line(
      `${className}.${INTERFACE_PROXY_CLASS_NAME} that = (${className}.${INTERFACE_PROXY_CLASS_NAME}) o;`,
    );
    this.code.line();

    const initialProps = props.slice(0, props.length - 1);
    const finalProp = props[props.length - 1];

    initialProps.forEach((prop) => {
      const predicate = prop.nullable
        ? `this.${prop.fieldName} != null ? !this.${prop.fieldName}.equals(that.${prop.fieldName}) : that.${prop.fieldName} != null`
        : `!${prop.fieldName}.equals(that.${prop.fieldName})`;

      this.code.line(`if (${predicate}) return false;`);
    });

    // The final (returned predicate) is the inverse of the other ones
    const finalPredicate = finalProp.nullable
      ? `this.${finalProp.fieldName} != null ? this.${finalProp.fieldName}.equals(that.${finalProp.fieldName}) : ` +
        `that.${finalProp.fieldName} == null`
      : `this.${finalProp.fieldName}.equals(that.${finalProp.fieldName})`;
    this.code.line(`return ${finalPredicate};`);

    this.code.closeBlock();
  }

  private emitHashCodeOverride(props: JavaProp[]) {
    // A class without properties does not need to override hashCode()
    if (props.length === 0) {
      return;
    }

    this.code.line();
    this.code.line('@Override');
    this.code.openBlock('public final int hashCode()');

    const firstProp = props[0];
    const remainingProps = props.slice(1);

    this.code.line(`int result = ${_hashCodeForProp(firstProp)};`);
    remainingProps.forEach((prop) =>
      this.code.line(`result = 31 * result + (${_hashCodeForProp(prop)});`),
    );
    this.code.line('return result;');
    this.code.closeBlock();

    function _hashCodeForProp(prop: JavaProp) {
      return prop.nullable
        ? `this.${prop.fieldName} != null ? this.${prop.fieldName}.hashCode() : 0`
        : `this.${prop.fieldName}.hashCode()`;
    }
  }

  private openFileIfNeeded(type: spec.Type) {
    if (this.isNested(type)) {
      return;
    }

    this.code.openFile(this.toJavaFilePath(this.assembly, type));
    this.code.line(
      `package ${this.toNativeName(this.assembly, type).packageName};`,
    );
    this.code.line();
  }

  private closeFileIfNeeded(type: spec.Type) {
    if (this.isNested(type)) {
      return;
    }
    this.code.closeFile(this.toJavaFilePath(this.assembly, type));
  }

  private isNested(type: spec.Type) {
    if (!this.assembly.types || !type.namespace) {
      return false;
    }
    const parent = `${type.assembly}.${type.namespace}`;
    return parent in this.assembly.types;
  }

  private toJavaFilePath(assm: spec.Assembly, fqn: string): string;
  private toJavaFilePath(assm: spec.Assembly, type: spec.Type): string;
  private toJavaFilePath(assm: spec.Assembly, what: spec.Type | string) {
    const fqn = typeof what === 'string' ? what : what.fqn;
    const { packageName, typeNames } = translateFqn(assm, fqn);

    if (typeNames.length === 0) {
      throw new Error(
        `toJavaFilePath: ${fqn} must indicate a type, but doesn't: ${JSON.stringify(
          { packageName, typeNames },
        )}`,
      );
    }

    return `${path.join(
      'src',
      'main',
      'java',
      ...packageName.split('.'),
      typeNames[0],
    )}.java`;
  }

  private toJavaResourcePath(assm: spec.Assembly, fqn: string, ext = '.txt') {
    const { packageName, typeName } = this.toNativeName(assm, {
      fqn,
      kind: spec.TypeKind.Class,
      assembly: assm.name,
      name: fqn.replace(/.*\.([^.]+)$/, '$1'),
    });

    const parts = [
      ...packageName.split('.'),
      `${typeName.split('.')[0]}${ext}`,
    ];
    // Resource names are /-delimited paths (even on Windows *wink wink*)
    const name = parts.join('/');
    const filePath = path.join('src', 'main', 'resources', ...parts);

    return { filePath, name };
  }

  // eslint-disable-next-line complexity
  private addJavaDocs(
    doc: spec.Documentable,
    apiLoc: ApiLocation,
    unionHint?: {
      returnsUnion?: spec.TypeReference;
    },
  ) {
    const returnsUnion =
      unionHint?.returnsUnion && containsUnionType(unionHint.returnsUnion)
        ? this.renderTypeReference(unionHint.returnsUnion)
        : undefined;

    if (
      !returnsUnion &&
      Object.keys(doc.docs ?? {}).length === 0 &&
      !((doc as spec.Method).parameters ?? []).some(
        (p) => Object.keys(p.docs ?? {}).length !== 0,
      )
    ) {
      return;
    }

    const docs = (doc.docs = doc.docs ?? {});

    const paras = [];

    if (docs.summary) {
      paras.push(stripNewLines(myMarkDownToJavaDoc(renderSummary(docs))));
    }

    if (docs.remarks) {
      paras.push(
        myMarkDownToJavaDoc(
          this.convertSamplesInMarkdown(docs.remarks, apiLoc),
        ).trimRight(),
      );
    }

    if (returnsUnion) {
      paras.push(`Returns union: ${returnsUnion}`);
    }

    if (docs.default) {
      paras.push(`Default: ${docs.default}`); // NOTE: there is no annotation in JavaDoc for this
    }

    if (docs.example) {
      paras.push('Example:');

      const convertedExample = this.convertExample(docs.example, apiLoc);

      // We used to use the slightly nicer `<pre>{@code ...}</pre>`, which doesn't
      // require (and therefore also doesn't allow) escaping special characters.
      //
      // However, code samples may contain block quotes of their own ('*/') that
      // would terminate the block comment from the PoV of the Java tokenizer, and
      // since `{@code ... }` doesn't allow any escaping, there's also no way to encode
      // '*/' in a way that would (a) hide it from the tokenizer and (b) give '*/' back
      // after processing JavaDocs.
      //
      // Hence, we just resort to HTML-encoding everything (same as we do for code
      // examples that have been translated from MarkDown).
      paras.push(
        myMarkDownToJavaDoc(['```', convertedExample, '```'].join('\n')),
      );
    }

    const tagLines = [];

    if (docs.returns) {
      tagLines.push(`@return ${myMarkDownToJavaDoc(docs.returns)}`);
    }
    if (docs.see) {
      tagLines.push(
        `@see <a href="${escape(docs.see)}">${escape(docs.see)}</a>`,
      );
    }
    if (docs.deprecated) {
      tagLines.push(`@deprecated ${myMarkDownToJavaDoc(docs.deprecated)}`);
    }

    // Params
    if ((doc as spec.Method).parameters) {
      const method = doc as spec.Method;
      if (method.parameters) {
        for (const param of method.parameters) {
          const summary = param.docs?.summary;
          tagLines.push(
            this.paramJavadoc(param.name, param.optional, summary, param.type),
          );
        }
      }
    }

    if (tagLines.length > 0) {
      paras.push(tagLines.join('\n'));
    }

    const lines = new Array<string>();
    for (const para of paras) {
      if (lines.length > 0) {
        lines.push('<p>');
      }
      lines.push(...para.split('\n').filter((l) => l !== ''));
    }

    this.code.line('/**');
    for (const line of lines) {
      this.code.line(` * ${escapeEndingComment(line)}`);
    }
    this.code.line(' */');
  }

  private paramJavadoc(
    name: string,
    optional?: boolean,
    summary?: string,
    unionTypeHint?: spec.TypeReference,
  ): string {
    const parts = ['@param', name];
    if (summary) {
      parts.push(stripNewLines(myMarkDownToJavaDoc(endWithPeriod(summary))));
    }

    if (unionTypeHint && containsUnionType(unionTypeHint)) {
      parts.push(`Takes union: ${this.renderTypeReference(unionTypeHint)}.`);
    }

    if (!optional) {
      parts.push('This parameter is required.');
    }

    return parts.join(' ');
  }

  private getClassBase(cls: spec.ClassType): JavaType {
    if (!cls.base) {
      return mkStatic('software.amazon.jsii.JsiiObject');
    }
    return this.toJavaTypes({ fqn: cls.base })[0];
  }

  /**
   * Convert an OptionalValue, adding the `NotNull` or `Nullable` declarations as appropriate
   */
  private toDecoratedJavaTypes(optionalValue: spec.OptionalValue): JavaType[] {
    return annotateOptional(
      optionalValue,
      this.toJavaTypes(optionalValue.type),
    );
  }

  /**
   * Renders a type without generic arguments
   *
   * Necessary because of type erasure; the compiler
   * will not let you check `foo instanceof Map<String, Foo>`,
   * and you must instead check `foo instanceof Map`.
   */
  private toJavaTypeNoGenerics(type: spec.TypeReference): string {
    return forceSingleType(this.toJavaTypes(type)).typeSymbol;
  }

  /**
   * Return the jsii object that represents this native type
   */
  private toNativeType(type: JavaType): string {
    if (type.type === 'static' && type.typeSymbol === 'java.util.List') {
      const nativeElementType = this.toNativeType(type.typeArguments![0]);
      return `software.amazon.jsii.NativeType.listOf(${nativeElementType})`;
    }
    if (type.type === 'static' && type.typeSymbol === 'java.util.Map') {
      const nativeElementType = this.toNativeType(type.typeArguments![1]);
      return `software.amazon.jsii.NativeType.mapOf(${nativeElementType})`;
    }

    return `software.amazon.jsii.NativeType.forClass(${marshallingType(type)})`;
  }

  /**
   * Convert a jsii type to a single Java type, collapsing to object if necessary
   */
  private toSingleJavaType(
    typeref: spec.TypeReference,
    { typeSymGen = undefined as SymGen | undefined } = {},
  ) {
    return forceSingleType(this.toJavaTypes(typeref, { typeSymGen }));
  }

  /**
   * Convert a jsii type to a union of Java types
   */
  private toJavaTypes(
    typeref: spec.TypeReference,
    { typeSymGen = undefined as SymGen | undefined } = {},
  ): JavaType[] {
    typeSymGen = typeSymGen ?? newTypeSymGen();

    if (spec.isPrimitiveTypeReference(typeref)) {
      return [this.toJavaPrimitive(typeref.primitive)];
    } else if (spec.isCollectionTypeReference(typeref)) {
      return [
        this.toJavaCollection(typeref, {
          typeSymGen,
        }),
      ];
    } else if (spec.isNamedTypeReference(typeref)) {
      const literal = literalTypeReference(typeref);
      return literal
        ? [mkStatic(literal)]
        : [mkStatic(this.toNativeFqn(typeref.fqn))];
    } else if (spec.isUnionTypeReference(typeref)) {
      return typeref.union.types.flatMap((subtype) =>
        this.toJavaTypes(subtype, { typeSymGen }),
      );
    } else if (spec.isIntersectionTypeReference(typeref)) {
      const typeVariable = typeSymGen();

      return [
        mkParam(
          typeVariable,
          `${typeVariable} extends ${typeref.intersection.types
            // Take the first type of any given union (an intersect-of-union
            // would have been rejected by jsii-compiler anyway)
            .map((t) => displayStatic(this.toJavaTypes(t)[0]))
            .join(' & ')}`,
        ),
      ];
    }
    throw new Error(`Unrenderable type reference: ${JSON.stringify(typeref)}`);
  }

  private toJavaCollection(
    ref: spec.CollectionTypeReference,
    { typeSymGen }: { typeSymGen?: SymGen },
  ): JavaType {
    const elementJavaType = this.toSingleJavaType(ref.collection.elementtype, {
      typeSymGen,
    });
    switch (ref.collection.kind) {
      case spec.CollectionKind.Array:
        return mkStatic('java.util.List', [elementJavaType]);
      case spec.CollectionKind.Map:
        return mkStatic('java.util.Map', [
          mkStatic('java.lang.String'),
          elementJavaType,
        ]);
      default:
        throw new Error(
          `Unsupported collection kind: ${ref.collection.kind as any}`,
        );
    }
  }

  private toJavaPrimitive(primitive: spec.PrimitiveType): JavaType {
    switch (primitive) {
      case spec.PrimitiveType.Boolean:
        return mkStatic('java.lang.Boolean');
      case spec.PrimitiveType.Date:
        return mkStatic('java.time.Instant');
      case spec.PrimitiveType.Json:
        return mkStatic('com.fasterxml.jackson.databind.node.ObjectNode');
      case spec.PrimitiveType.Number:
        return mkStatic('java.lang.Number');
      case spec.PrimitiveType.String:
        return mkStatic('java.lang.String');
      case spec.PrimitiveType.Any:
        return mkStatic('java.lang.Object');
      default:
        throw new Error(`Unknown primitive type: ${primitive as any}`);
    }
  }

  /**
   * Render a type reference to something human readable for use in JavaDocs
   */
  private renderTypeReference(x: spec.TypeReference): string {
    return visitTypeReference<string>(x, {
      primitive: (x) =>
        `{@link ${this.toJavaPrimitive(x.primitive).typeSymbol}}`,
      named: (x) => `{@link ${this.toNativeFqn(x.fqn)}}`,
      collection: (x) => {
        switch (x.collection.kind) {
          case spec.CollectionKind.Array:
            return `List<${this.renderTypeReference(x.collection.elementtype)}>`;
          case spec.CollectionKind.Map:
            return `Map<String, ${this.renderTypeReference(x.collection.elementtype)}>`;
        }
      },
      union: (x) =>
        `either ${x.union.types.map((x) => this.renderTypeReference(x)).join(' or ')}`,
      intersection: (x) =>
        `${x.intersection.types.map((x) => this.renderTypeReference(x)).join(' + ')}`,
    });
  }

  private renderMethodCallArguments(method: spec.Callable) {
    if (!method.parameters || method.parameters.length === 0) {
      return '';
    }
    const regularParams = method.parameters.filter((p) => !p.variadic);
    const values = regularParams.map(_renderParameter);
    const valueStr = `new Object[] { ${values.join(', ')} }`;
    if (method.variadic) {
      const valuesStream = `java.util.Arrays.<Object>stream(${valueStr})`;

      const lastParam = method.parameters[method.parameters.length - 1];
      const restStream = `java.util.Arrays.<Object>stream(${lastParam.name})`;

      const fullStream =
        regularParams.length > 0
          ? `java.util.stream.Stream.concat(${valuesStream}, ${restStream})`
          : restStream;
      return `, ${fullStream}.toArray(Object[]::new)`;
    }
    return `, ${valueStr}`;

    function _renderParameter(param: spec.Parameter) {
      const safeName = JavaGenerator.safeJavaPropertyName(param.name);
      return isNullable(param)
        ? safeName
        : `java.util.Objects.requireNonNull(${safeName}, "${safeName} is required")`;
    }
  }

  private renderMethodCall(
    cls: spec.TypeReference,
    method: spec.Method,
    async: boolean,
  ) {
    let statement = '';

    if (method.static) {
      const javaClass = this.toSingleJavaType(cls);
      statement += `software.amazon.jsii.JsiiObject.jsiiStaticCall(${displayStatic(javaClass)}.class, `;
    } else {
      statement += `software.amazon.jsii.Kernel.${
        async ? 'asyncCall' : 'call'
      }(this, `;
    }

    statement += `"${method.name}"`;

    if (method.returns) {
      const returnsType = forceSingleType(
        this.toJavaTypes(method.returns.type),
      );
      statement += `, ${this.toNativeType(returnsType)}`;
    } else {
      statement += ', software.amazon.jsii.NativeType.VOID';
    }
    statement += `${this.renderMethodCallArguments(method)})`;

    if (method.returns) {
      statement = this.wrapCollection(
        statement,
        method.returns.type,
        method.returns.optional,
      );
    }

    if (method.returns) {
      return `return ${statement};`;
    }
    return `${statement};`;
  }

  /**
   * Wraps a collection into an unmodifiable collection else returns the existing statement.
   * @param statement The statement to wrap if necessary.
   * @param type The type of the object to wrap.
   * @param optional Whether the value is optional (can be null/undefined) or not.
   * @returns The modified or original statement.
   */
  private wrapCollection(
    statement: string,
    type: spec.TypeReference,
    optional?: boolean,
  ): string {
    if (spec.isCollectionTypeReference(type)) {
      let wrapper: string;
      switch (type.collection.kind) {
        case spec.CollectionKind.Array:
          wrapper = 'unmodifiableList';
          break;
        case spec.CollectionKind.Map:
          wrapper = 'unmodifiableMap';
          break;
        default:
          throw new Error(
            `Unsupported collection kind: ${type.collection.kind as any}`,
          );
      }
      // In the case of "optional", the value needs ot be explicitly cast to allow for cases where the raw type was returned.
      return optional
        ? `java.util.Optional.ofNullable((${displayStatic(
            this.toSingleJavaType(type),
          )})(${statement})).map(java.util.Collections::${wrapper}).orElse(null)`
        : `java.util.Collections.${wrapper}(${statement})`;
    }

    return statement;
  }

  private convertTypes(parameters: spec.Parameter[] | undefined): JavaType[] {
    return (parameters ?? []).map((p) => {
      return forceSingleType(this.toDecoratedJavaTypes(p));
    });
  }

  private renderParameters(
    parameters: spec.Parameter[] | undefined,
    types: JavaType[],
    cov: Covariance,
  ) {
    parameters = parameters ?? [];
    if (parameters.length !== types.length) {
      throw new Error(
        `Arrays not same length: ${parameters.length} !== ${types.length}`,
      );
    }

    const params = [];
    for (const [p, type] of zip(parameters, types)) {
      params.push(
        `final ${displayType(type, cov)}${p.variadic ? '...' : ''} ${JavaGenerator.safeJavaPropertyName(
          p.name,
        )}`,
      );
    }
    return params.join(', ');
  }

  private renderAccessLevel(method: spec.Callable | spec.Property) {
    return method.protected ? 'protected' : 'public';
  }

  private makeModuleClass(moduleName: string) {
    return `${this.toNativeFqn(moduleName)}.${MODULE_CLASS_NAME}`;
  }

  private emitModuleFile(mod: spec.Assembly) {
    const moduleName = mod.name;
    const moduleClass = this.makeModuleClass(moduleName);

    const { filePath: moduleResFile, name: moduleResName } =
      this.toJavaResourcePath(mod, `${mod.name}.${MODULE_CLASS_NAME}`);
    this.code.openFile(moduleResFile);
    for (const fqn of Object.keys(this.assembly.types ?? {})) {
      this.code.line(`${fqn}=${this.toNativeFqn(fqn, { binaryName: true })}`);
    }
    this.code.closeFile(moduleResFile);

    const moduleFile = this.toJavaFilePath(mod, {
      assembly: mod.name,
      fqn: `${mod.name}.${MODULE_CLASS_NAME}`,
      kind: spec.TypeKind.Class,
      name: MODULE_CLASS_NAME,
    });

    this.code.openFile(moduleFile);
    this.code.line(`package ${this.toNativeName(mod).packageName};`);
    this.code.line();
    if (Object.keys(mod.dependencies ?? {}).length > 0) {
      this.code.line('import static java.util.Arrays.asList;');
      this.code.line();
    }
    this.code.line('import java.io.BufferedReader;');
    this.code.line('import java.io.InputStream;');
    this.code.line('import java.io.InputStreamReader;');
    this.code.line('import java.io.IOException;');
    this.code.line('import java.io.Reader;');
    this.code.line('import java.io.UncheckedIOException;');
    this.code.line();
    this.code.line('import java.nio.charset.StandardCharsets;');
    this.code.line();
    this.code.line('import java.util.HashMap;');
    if (Object.keys(mod.dependencies ?? {}).length > 0) {
      this.code.line('import java.util.List;');
    }
    this.code.line('import java.util.Map;');
    this.code.line();
    this.code.line('import software.amazon.jsii.JsiiModule;');
    this.code.line();

    this.code.line(ANN_INTERNAL);
    this.code.openBlock(
      `public final class ${MODULE_CLASS_NAME} extends JsiiModule`,
    );
    this.code.line(
      'private static final Map<String, String> MODULE_TYPES = load();',
    );
    this.code.line();

    this.code.openBlock('private static Map<String, String> load()');
    this.code.line('final Map<String, String> result = new HashMap<>();');
    this.code.line(
      `final ClassLoader cl = ${MODULE_CLASS_NAME}.class.getClassLoader();`,
    );
    this.code.line(
      `try (final InputStream is = cl.getResourceAsStream("${moduleResName}");`,
    );
    this.code.line(
      '     final Reader rd = new InputStreamReader(is, StandardCharsets.UTF_8);',
    );
    this.code.openBlock(
      '     final BufferedReader br = new BufferedReader(rd))',
    );
    this.code.line('br.lines()');
    this.code.line('  .filter(line -> !line.trim().isEmpty())');
    this.code.openBlock('  .forEach(line -> ');
    this.code.line('final String[] parts = line.split("=", 2);');
    this.code.line('final String fqn = parts[0];');
    this.code.line('final String className = parts[1];');
    this.code.line('result.put(fqn, className);');
    this.code.unindent('});'); // Proxy for closeBlock
    this.code.closeBlock();
    this.code.openBlock('catch (final IOException exception)');
    this.code.line('throw new UncheckedIOException(exception);');
    this.code.closeBlock();
    this.code.line('return result;');
    this.code.closeBlock();
    this.code.line();

    this.code.line(
      'private final Map<String, Class<?>> cache = new HashMap<>();',
    );
    this.code.line();

    // ctor
    this.code.openBlock(`public ${MODULE_CLASS_NAME}()`);
    this.code.line(
      `super("${moduleName}", "${
        mod.version
      }", ${MODULE_CLASS_NAME}.class, "${this.getAssemblyFileName()}");`,
    );
    this.code.closeBlock(); // ctor

    // dependencies
    if (mod.dependencies && Object.keys(mod.dependencies).length > 0) {
      const deps = [];
      for (const dep of Object.keys(mod.dependencies)) {
        deps.push(`${this.makeModuleClass(dep)}.class`);
      }

      this.code.line();
      this.code.line('@Override');
      this.code.openBlock(
        'public List<Class<? extends JsiiModule>> getDependencies()',
      );
      this.code.line(`return asList(${deps.join(', ')});`);
      this.code.closeBlock();
    }

    this.code.line();
    this.code.line('@Override');
    this.code.openBlock(
      'protected Class<?> resolveClass(final String fqn) throws ClassNotFoundException',
    );
    this.code.openBlock('if (!MODULE_TYPES.containsKey(fqn))');
    this.code.line(
      'throw new ClassNotFoundException("Unknown JSII type: " + fqn);',
    );
    this.code.closeBlock();
    this.code.line('String className = MODULE_TYPES.get(fqn);');
    this.code.openBlock('if (!this.cache.containsKey(className))');
    this.code.line('this.cache.put(className, this.findClass(className));');
    this.code.closeBlock();
    this.code.line('return this.cache.get(className);');
    this.code.closeBlock();
    this.code.line();
    this.code.openBlock('private Class<?> findClass(final String binaryName)');
    this.code.openBlock('try');
    this.code.line('return Class.forName(binaryName);');
    this.code.closeBlock();
    this.code.openBlock('catch (final ClassNotFoundException exception)');
    this.code.line('throw new RuntimeException(exception);');
    this.code.closeBlock();
    this.code.closeBlock();

    this.code.closeBlock();

    this.code.closeFile(moduleFile);

    return moduleClass;
  }

  /**
   * Given a method, return the methods that we should generate implementations for on the $Default interface
   *
   * This can be 0..N:
   *
   * - 0: if the method can be inherited from a parent $Default implementation
   * - 1: if the method cannot be inherited from a parent $Default implementation
   * - N: ah-ha, wait! There can be overloads! And because of a historical bug,
   *   we didn't use to generate overloads onto $Default interfaces. So it's possible
   *   that we don't generate the "main" implementation, but we do generate its overloads.
   *
   * Technically speaking we only have to account for the bug if the type is from a different
   * assembly (because we know all types from the current assembly will be generated ✨ bugless ✨,
   * but just to keep it simple we'll always do the same thing).
   *
   * We can only get rid of this bug once the oldest dependency package a Java
   * package can be used with definitely has overloaded $Default impls. So that will be a while.
   */
  private makeDefaultImpls(m: reflect.Method): spec.Method[] {
    const ret: spec.Method[] = [];
    if (needsDefaultImpl(m)) {
      ret.push(m.spec);
    }

    // Account for a past bug
    if (needsDefaultImpl(m) || GENERATE_POTENTIALLY_MISING_DEFAULT_OVERLOADS) {
      ret.push(...this.createOverloadsForOptionals(m.spec));
    }

    return ret;
  }

  /**
   * Given a method, return the methods that we should generate implementations for on the $Proxy class
   *
   * See `makeDefaultImpls` for the main rationale behind this. The $Proxy class inherits from $Default
   * so technically this could have usually been empty, but we need to account for the possibility that
   * we implement a $Default interface from another assembly that has been generated with a buggy version
   * of pacmak.
   */
  private makeProxyImpls<A extends reflect.Method | reflect.Property>(
    m: A,
  ): Array<A['spec']> {
    const ret: spec.Method[] = [];
    if (needsProxyImpl(m)) {
      ret.push(m.spec);
    }

    // Account for a past bug
    if (needsProxyImpl(m) || GENERATE_POTENTIALLY_MISING_DEFAULT_OVERLOADS) {
      ret.push(...this.createOverloadsForOptionals(m.spec));
    }

    return ret;
  }

  private emitJsiiInitializers(cls: spec.ClassType) {
    this.code.line();
    this.code.openBlock(
      `protected ${cls.name}(final software.amazon.jsii.JsiiObjectRef objRef)`,
    );
    this.code.line('super(objRef);');
    this.code.closeBlock();

    this.code.line();
    this.code.openBlock(
      `protected ${cls.name}(final software.amazon.jsii.JsiiObject.InitializationMode initializationMode)`,
    );
    this.code.line('super(initializationMode);');
    this.code.closeBlock();
  }

  /**
   * Computes the java FQN for a JSII FQN:
   * 1. Determine which assembly the FQN belongs to (first component of the FQN)
   * 2. Locate the `targets.java.package` value for that assembly (this assembly, or one of the dependencies)
   * 3. Return the java FQN: ``<module.targets.java.package>.<FQN stipped of first component>``
   *
   * Records an assembly reference if the referenced FQN comes from a different assembly.
   *
   * @param fqn the JSII FQN to be used.
   *
   * @returns the corresponding Java FQN.
   *
   * @throws if the assembly the FQN belongs to does not have a `targets.java.package` set.
   */
  private toNativeFqn(
    fqn: string,
    { binaryName }: { binaryName: boolean } = { binaryName: false },
  ): string {
    const [mod] = fqn.split('.');
    const depMod = this.findModule(mod);
    // Make sure any dependency (direct or transitive) of which any type is explicitly referenced by the generated
    // code is included in the generated POM's dependencies section (protecting the artifact from changes in the
    // dependencies' dependency structure).
    if (mod !== this.assembly.name) {
      this.referencedModules[mod] = depMod;

      const translated = translateFqn({ ...depMod, name: mod }, fqn);
      return [translated.packageName, ...translated.typeNames].join('.');
    }

    const { packageName, typeName } =
      fqn === this.assembly.name
        ? this.toNativeName(this.assembly)
        : this.toNativeName(this.assembly, this.assembly.types![fqn]);
    const className =
      typeName && binaryName ? typeName.replace('.', '$') : typeName;
    return `${packageName}${className ? `.${className}` : ''}`;
  }

  /**
   * Computes Java name for a jsii assembly or type.
   *
   * @param assm The assembly that contains the type
   * @param type The type we want the name of
   */
  private toNativeName(assm: spec.Assembly): {
    packageName: string;
    typeName: undefined;
  };
  private toNativeName(
    assm: spec.Assembly,
    type: spec.Type,
  ): { packageName: string; typeName: string };
  private toNativeName(
    assm: spec.Assembly,
    type?: spec.Type,
  ): { packageName: string; typeName?: string } {
    if (!type) {
      return { packageName: packageNameFromAssembly(assm) };
    }

    const translated = translateFqn(assm, type.fqn);
    return {
      packageName: translated.packageName,
      typeName: translated.typeNames.join('.'),
    };
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
    this.code.line(
      `@javax.annotation.Generated(value = "${generator}"${date})`,
    );
  }

  private convertExample(example: string, api: ApiLocation): string {
    assertSpecIsRosettaCompatible(this.assembly);
    const translated = this.rosetta.translateExample(
      api,
      example,
      TargetLanguage.JAVA,
      enforcesStrictMode(this.assembly),
    );
    return translated.source;
  }

  private convertSamplesInMarkdown(markdown: string, api: ApiLocation): string {
    assertSpecIsRosettaCompatible(this.assembly);
    return this.rosetta.translateSnippetsInMarkdown(
      api,
      markdown,
      TargetLanguage.JAVA,
      enforcesStrictMode(this.assembly),
    );
  }

  /**
   * Fins the Java FQN of the default implementation interfaces that should be implemented when a new
   * default interface or proxy class is being emitted.
   *
   * @param type the type for which a default interface or proxy is emitted.
   * @param includeThisType whether this class's default interface should be included or not.
   *
   * @returns a list of Java fully qualified class names.
   */
  private defaultInterfacesFor(
    type: reflect.ClassType | reflect.InterfaceType,
    { includeThisType = false }: { includeThisType?: boolean } = {},
  ): string[] {
    const result = new Set<string>();

    if (
      includeThisType &&
      hasDefaultInterfaces(type.assembly) &&
      type.isInterfaceType()
    ) {
      result.add(
        `${this.toNativeFqn(type.fqn)}.${INTERFACE_DEFAULT_CLASS_NAME}`,
      );
    } else {
      for (const iface of type.interfaces) {
        if (hasDefaultInterfaces(iface.assembly)) {
          result.add(
            `${this.toNativeFqn(iface.fqn)}.${INTERFACE_DEFAULT_CLASS_NAME}`,
          );
        } else {
          for (const item of this.defaultInterfacesFor(iface)) {
            result.add(item);
          }
        }
      }
      if (type.isClassType() && type.base != null) {
        for (const item of this.defaultInterfacesFor(type.base)) {
          result.add(item);
        }
      }
    }

    return Array.from(result);
  }
}

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

  '#comment'?: string;
}

/**
 * Looks up the `@jsii/java-runtime` package from the local repository.
 * If it contains a "maven-repo" directory, it will be added as a local maven repo
 * so when we build locally, we build against it and not against the one published
 * to Maven Central.
 */
function findJavaRuntimeLocalRepository() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,@typescript-eslint/no-require-imports,import/no-extraneous-dependencies
    const javaRuntime = require('@jsii/java-runtime');
    logging.info(
      `Using local version of the Java jsii runtime package at: ${javaRuntime.repository}`,
    );
    return javaRuntime.repository;
  } catch {
    return undefined;
  }
}

function isNullable(optionalValue: spec.OptionalValue | undefined): boolean {
  if (!optionalValue) {
    return false;
  }
  return (
    optionalValue.optional ||
    (spec.isPrimitiveTypeReference(optionalValue.type) &&
      optionalValue.type.primitive === spec.PrimitiveType.Any)
  );
}

function endWithPeriod(s: string): string {
  s = s.trimRight();
  if (!s.endsWith('.')) {
    return `${s}.`;
  }
  return s;
}

function computeOverrides<T extends { param: spec.Parameter }>(
  allParams: T[],
): Iterable<T[]> {
  return {
    [Symbol.iterator]: function* () {
      yield allParams;
      while (allParams.length > 0) {
        const lastParam = allParams[allParams.length - 1];
        if (!lastParam.param.variadic && !lastParam.param.optional) {
          // Neither variadic nor optional -- we're done here!
          return;
        }
        allParams = allParams.slice(0, allParams.length - 1);
        // If the lastParam was variadic, we shouldn't generate an override without it only.
        if (lastParam.param.optional) {
          yield allParams;
        }
      }
    },
  };
}

type AssemblyLike = spec.AssemblyConfiguration & { name: string };

/**
 * Return the native package name from an assembly
 */
function packageNameFromAssembly(assm: AssemblyLike) {
  const javaPackage = assm.targets?.java?.package;
  if (!javaPackage) {
    throw new Error(
      `The module ${assm.name} does not have a java.package setting`,
    );
  }
  return javaPackage;
}

/**
 * Analyzes and translates a jsii FQN to Java components
 *
 * The FQN can be of the assembly, a submodule, or a type.
 *
 * Any type can have the following characteristics:
 *
 * - Located in zero or more nested submodules. Any of these can have a Java
 *   package name assigned--if none, the name is automatically determined by
 *   snake casing. At least the assembly must have a Java package name assigned.
 * - Located in zero or more nested types (classes).
 *
 * Find up the set of namespaces until we find a submodule (or the assembly
 * itself) that has an explicit Java package name defined.
 *
 * Append all the namespaces that we crossed that didn't have a package name defined.
 *
 * Returns the Java package name determined this way, as well as the hierarchy of type
 * names inside the package. `typeNames` may be missing or empty if the FQN indicated
 * the assembly or a submodule, contains 1 element if the FQN indicated a top-level type,
 * multiple elements if the FQN indicated a nested type.
 */
function translateFqn(
  assm: AssemblyLike,
  originalFqn: string,
): { packageName: string; typeNames: string[] } {
  const implicitPackageNames = new Array<string>();
  const typeNames = new Array<string>();

  // We work ourselves upward through the FQN until we've found an explicit package
  let packageName = packageNameFromAssembly(assm);
  let fqn = originalFqn;
  while (fqn !== '' && fqn !== assm.name) {
    const [parentFqn, lastPart] = splitNamespace(fqn);

    const submodule = assm.submodules?.[fqn];
    if (submodule) {
      const explicitPackage = submodule.targets?.java?.package;
      if (explicitPackage) {
        packageName = explicitPackage;
        // We can stop recursing, types cannot be the parent of a module and nothing upwards can change
        // the package name anymore
        break;
      }
      implicitPackageNames.unshift(`.${toSnakeCase(lastPart)}`);
    } else {
      // If it's not a submodule, it must be a type.
      typeNames.unshift(lastPart);
    }

    fqn = parentFqn;
  }
  if (fqn === '') {
    throw new Error(`Could not find '${originalFqn}' inside '${assm.name}'`);
  }
  return {
    packageName: `${packageName}${implicitPackageNames.join('')}`,
    typeNames,
  };
}

/**
 * Determines whether the provided assembly exposes the "hasDefaultInterfaces"
 * jsii-pacmak feature flag.
 *
 * @param assembly the assembly that is tested
 *
 * @returns true if the Jsii$Default interfaces can be used
 */
function hasDefaultInterfaces(assembly: reflect.Assembly): boolean {
  return !!assembly.metadata?.jsii?.pacmak?.hasDefaultInterfaces;
}

/**
 * Whecks whether a name corresponds to a method on `java.lang.Object`. It is not
 * possible to emit default interface implementation for those names because
 * these would always be replaced by the implementations on `Object`.
 *
 * @param name the checked name
 *
 * @returns `true` if a default implementation cannot be generated for this name.
 */
function isJavaLangObjectMethodName(name: string): boolean {
  return JAVA_LANG_OBJECT_METHOD_NAMES.has(name);
}
const JAVA_LANG_OBJECT_METHOD_NAMES = new Set([
  'clone',
  'equals',
  'finalize',
  'getClass',
  'hashCode',
  'notify',
  'notifyAll',
  'toString',
  'wait',
]);

/**
 * In a dotted string, strip off the last dotted component
 */
function splitNamespace(ns: string): [string, string] {
  const dot = ns.lastIndexOf('.');
  if (dot === -1) {
    return ['', ns];
  }
  return [ns.slice(0, dot), ns.slice(dot + 1)];
}

/**
 * Escape a string for dropping into JavaDoc
 */
function escape(s: string) {
  return s.replace(/["\\<>&]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function myMarkDownToJavaDoc(source: string) {
  if (source.includes('{@link') || source.includes('{@code')) {
    // Slightly dirty hack: if we are seeing this, it means the docstring was provided literally
    // in this file. These strings are safe to not be escaped, and in fact escaping them will
    // break them: they will turn into `{&#64;`, which breaks the JavaDoc markup.
    //
    // Since docstring do not (or at least should not) contain JavaDoc literals, this is safe.
    return source;
  }
  return markDownToJavaDoc(source);
}

function stripNewLines(x: string) {
  return x.replace(/\n/g, '');
}

// Replace */ with *\/ to avoid closing the comment block
function escapeEndingComment(x: string) {
  return x.replace(/\*\//g, '*\\/');
}

type SymGen = () => string;

function newTypeSymGen(): SymGen {
  let cnt = 1;

  return () => {
    return `T${cnt++}`;
  };
}

// region Java Types

type JavaType = StaticJavaType | JavaTypeParameter;

/**
 * A type whose name is not bound to a variable (i.e., stands alone)
 */
interface StaticJavaType {
  readonly type: 'static';

  /**
   * Any annotations for this type
   */
  readonly annotation: string;

  /**
   * The rendered version of the type
   */
  readonly typeSymbol: string;

  /**
   * Type arguments
   */
  readonly typeArguments?: JavaType[];
}

interface JavaTypeParameter {
  readonly type: 'param';

  /**
   * Any annotations for this type
   */
  readonly annotation: string;

  /**
   * The rendered version of the type (including any annotations)
   */
  readonly typeSymbol: string;

  /**
   * Just the type variable and nothing else
   */
  readonly typeVariable: string;

  /**
   * The type variable declaration
   */
  readonly typeVarDeclaration: string;
}

function mkStatic(
  typeSymbol: string,
  typeArguments: JavaType[] = [],
): StaticJavaType {
  return { typeSymbol, annotation: '', type: 'static', typeArguments };
}

function mkParam(
  typeVariable: string,
  typeVarDeclaration: string,
): JavaTypeParameter {
  return {
    type: 'param',
    annotation: '',
    typeSymbol: typeVariable,
    typeVariable,
    typeVarDeclaration,
  };
}

function displayStatic(x: JavaType, options?: Covariance): string {
  if (x.type !== 'static') {
    throw new Error(`Expected static type here, got ${JSON.stringify(x)}`);
  }
  return displayType(x, options);
}

function displayType(x: JavaType, options?: Covariance): string {
  switch (x.type) {
    case 'param':
      return `${x.annotation}${x.typeSymbol}`;
    case 'static':
      return [
        `${x.annotation}${x.typeSymbol}`,
        (x.typeArguments ?? []).length > 0
          ? `<${x
              .typeArguments!.map((t, i) => {
                const subT = displayType(t, options);
                // For Map<K, V> we only want to make V covariant.
                // Since that's and List<T> are the only types we have generics
                // for anyway, we hack it here (as opposed to storing a field on
                // the type object itself). This is simpler and Good Enough For Now(tm).
                const isLastParameter =
                  i === (x.typeArguments ?? []).length - 1;

                // Don't emit a covariant expression for String (it's `final` in Java)
                const isString = subT === 'java.lang.String';

                return options === 'covariant' && isLastParameter && !isString
                  ? `? extends ${subT}`
                  : subT;
              })
              .join(', ')}>`
          : '',
      ].join('');
  }
}

function typeVarDeclarations(types: JavaType[]): string {
  const ret: string[] = [];
  for (const t of types) {
    recurse(t);
  }
  return ret.length > 0 ? `<${ret.join(', ')}> ` : '';

  function recurse(t: JavaType) {
    switch (t.type) {
      case 'param':
        ret.push(t.typeVarDeclaration);
        break;
      case 'static':
        for (const arg of t.typeArguments ?? []) {
          recurse(arg);
        }
        break;
    }
  }
}

function typesEqual(a: JavaType, b: JavaType, opts?: 'deep'): boolean {
  if (a.type !== b.type) {
    return false;
  }
  if (a.typeSymbol !== b.typeSymbol) {
    return false;
  }

  if (a.type === 'static' && b.type === 'static' && opts === 'deep') {
    if (a.typeArguments?.length !== b.typeArguments?.length) {
      return false;
    }
    if (a.typeArguments) {
      for (let i = 0; i < a.typeArguments.length; i++) {
        if (!typesEqual(a.typeArguments[i], b.typeArguments![i])) {
          return false;
        }
      }
    }
  }

  return true;
}

// endregion

/**
 * Return a reference for the marshalling class object
 *
 * Basically returns `Type.class`, disregarding any generic
 * type arguments.
 */
function marshallingType(x: JavaType) {
  switch (x.type) {
    case 'static':
      return `${x.typeSymbol}.class`;
    case 'param':
      throw new Error(`Cannot marshall a type parameter: ${JSON.stringify(x)}`);
  }
}

/**
 * Return the one type from a union, or collapse to Object if there's more than one type in the union
 */
function forceSingleType(types: JavaType[]): JavaType {
  if (types.length > 1) {
    return {
      ...mkStatic('java.lang.Object'),
      // Copy the annotation
      annotation: types[0].annotation,
    };
  }
  return types[0];
}

function annotateOptional(
  optionalValue: spec.OptionalValue,
  types: JavaType[],
): JavaType[] {
  return types.map((t) => ({
    ...t,
    annotation: `${optionalValue.optional ? ANN_NULLABLE : ANN_NOT_NULL} `,
  }));
}

/**
 * Resolve any type intersections to the first type
 */
function removeIntersections(x: spec.TypeReference): spec.TypeReference {
  if (spec.isIntersectionTypeReference(x)) {
    return x.intersection.types[0];
  }
  if (spec.isUnionTypeReference(x)) {
    return {
      ...x,
      union: {
        types: x.union.types.map(removeIntersections),
      },
    };
  }
  if (spec.isCollectionTypeReference(x)) {
    return {
      ...x,
      collection: {
        kind: x.collection.kind,
        elementtype: removeIntersections(x.collection.elementtype),
      },
    };
  }
  return x;
}

/**
 * Whether the given property or method needs to be implemented on a $Proxy class
 *
 * Proxies extend the class they're for (if for a class), and the $Default interfaces
 * of all the base interfaces, so implementations need to be present for everything
 * that is not abstract and can be inherited from a $Default interface.
 */
function needsProxyImpl(x: reflect.Property | reflect.Method) {
  // Interface members are always marked 'abstract', but we only need to
  // implement them if they come from a class (because interface members
  // will have a $Default impl that calls out to jsii already).
  const isAbstractClassMember = x.definingType.isClassType() && x.abstract;
  return (
    isAbstractClassMember || !hasDefaultInterfaces(x.definingType.assembly)
  );
}

/**
 * Whether the given property or method needs to be implemented on a $Default interface
 *
 * $Default interfaces extend the interface they're for, and the $Default interfaces
 * of all the base interfaces, so implementations need to be present for everything
 * that is defined on the current interface or cannot be inherited from a $Default interface.
 */
function needsDefaultImpl(x: reflect.Property | reflect.Method) {
  const isBuiltinMethod =
    x instanceof reflect.Property
      ? // Only checking the getter - java.lang.Object has no setters.
        isJavaLangObjectMethodName(`get${jsiiToPascalCase(x.name)}`)
      : isJavaLangObjectMethodName(x.name);

  return (
    (!hasDefaultInterfaces(x.definingType.assembly) ||
      x.definingType.fqn === x.parentType.fqn) &&
    !isBuiltinMethod
  );
}

type Overridability = 'overridable' | 'final' | 'final-but-not-cov';

/**
 * Return the appropriate covariance rendering for the overridability of a given method
 */
function covarianceFromOverridability(overridable: Overridability): Covariance {
  // We can render covariant parameters only for methods that aren't overridable... so only for static methods currently.
  // (There are some more places where we could do this, like properties and constructors, but historically we didn't
  // and I don't want to mess with this too much because the risk/reward isn't there.)
  return overridable === 'final' ? 'covariant' : 'exact-types';
}

function overridabilityFromMethod(method: spec.Method): Overridability {
  return method.static ? 'final' : 'overridable';
}

type Covariance = 'covariant' | 'exact-types';
