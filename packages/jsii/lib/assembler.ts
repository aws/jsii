import * as spec from '@jsii/spec';
import { PackageJson } from '@jsii/spec';
import * as Case from 'case';
import * as chalk from 'chalk';
import * as crypto from 'crypto';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import deepEqual = require('deep-equal');
import * as fs from 'fs-extra';
import * as log4js from 'log4js';
import * as path from 'path';
import * as ts from 'typescript';

import {
  getReferencedDocParams,
  parseSymbolDocumentation,
  TypeSystemHints,
} from './docs';
import { Emitter } from './emitter';
import { JsiiDiagnostic } from './jsii-diagnostic';
import * as literate from './literate';
import * as bindings from './node-bindings';
import { ProjectInfo } from './project-info';
import { isReservedName } from './reserved-words';
import { symbolIdentifier } from './symbol-id';
import { DeprecatedRemover } from './transforms/deprecated-remover';
import { DeprecationWarningsInjector } from './transforms/deprecation-warnings';
import { RuntimeTypeInfoInjector } from './transforms/runtime-info';
import { combinedTransformers } from './transforms/utils';
import { Validator } from './validator';
import { SHORT_VERSION, VERSION } from './version';
import { enabledWarnings } from './warnings';

// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const sortJson = require('sort-json');

const LOG = log4js.getLogger('jsii/assembler');

/**
 * The JSII Assembler consumes a ``ts.Program`` instance and emits a JSII assembly.
 */
export class Assembler implements Emitter {
  private readonly runtimeTypeInfoInjector: RuntimeTypeInfoInjector;
  private readonly deprecatedRemover?: DeprecatedRemover;
  private readonly warningsInjector?: DeprecationWarningsInjector;

  private readonly mainFile: string;
  private readonly tscRootDir?: string;

  private _diagnostics = new Array<JsiiDiagnostic>();
  private _deferred = new Array<DeferredRecord>();
  private _types: { [fqn: string]: spec.Type } = {};

  /** Map of Symbol to namespace export Symbol */
  private readonly _submoduleMap = new Map<ts.Symbol, ts.Symbol>();

  /**
   * Submodule information
   *
   * Contains submodule information for all namespaces that have been seen
   * across all assemblies (this and dependencies).
   *
   * Filtered to local submodules only at time of writing the assembly out to disk.
   */
  private readonly _submodules = new Map<ts.Symbol, SubmoduleSpec>();

  /**
   * @param projectInfo information about the package being assembled
   * @param program     the TypeScript program to be assembled from
   * @param stdlib      the directory where the TypeScript stdlib is rooted
   */
  public constructor(
    public readonly projectInfo: ProjectInfo,
    public readonly program: ts.Program,
    public readonly stdlib: string,
    options: AssemblerOptions = {},
  ) {
    if (options.stripDeprecated) {
      let allowlistedDeprecations: Set<string> | undefined;
      if (options.stripDeprecatedAllowListFile) {
        if (!fs.existsSync(options.stripDeprecatedAllowListFile)) {
          throw new Error(
            `--strip-deprecated file not found: ${options.stripDeprecatedAllowListFile}`,
          );
        }
        allowlistedDeprecations = new Set<string>(
          fs
            .readFileSync(options.stripDeprecatedAllowListFile, 'utf8')
            .split('\n'),
        );
      }

      this.deprecatedRemover = new DeprecatedRemover(
        this._typeChecker,
        allowlistedDeprecations,
      );
    }

    if (options.addDeprecationWarnings) {
      this.warningsInjector = new DeprecationWarningsInjector(
        this._typeChecker,
      );
    }

    const dts = projectInfo.types;
    let mainFile = dts.replace(/\.d\.ts(x?)$/, '.ts$1');

    // If out-of-source build was configured (tsc's outDir and rootDir), the
    // main file's path needs to be re-rooted from the outDir into the rootDir.
    const tscOutDir = program.getCompilerOptions().outDir;
    if (tscOutDir != null) {
      mainFile = path.relative(tscOutDir, mainFile);

      // rootDir may be set explicitly or not. If not, inferRootDir replicates
      // tsc's behavior of using the longest prefix of all built source files.
      this.tscRootDir =
        program.getCompilerOptions().rootDir ?? inferRootDir(program);
      if (this.tscRootDir != null) {
        mainFile = path.join(this.tscRootDir, mainFile);
      }
    }

    this.mainFile = path.resolve(projectInfo.projectRoot, mainFile);
    this.runtimeTypeInfoInjector = new RuntimeTypeInfoInjector(
      projectInfo.version,
    );
  }

  public get customTransformers(): ts.CustomTransformers {
    return combinedTransformers(
      this.deprecatedRemover?.customTransformers ?? {},
      this.runtimeTypeInfoInjector.makeTransformers(),
      this.warningsInjector?.customTransformers ?? {},
    );
  }

  private get _typeChecker(): ts.TypeChecker {
    return this.program.getTypeChecker();
  }

  /**
   * Attempt emitting the JSII assembly for the program.
   *
   * @return the result of the assembly emission.
   */
  public async emit(): Promise<ts.EmitResult> {
    this._diagnostics = [];
    if (!this.projectInfo.description) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_0001_PKG_MISSING_DESCRIPTION.createDetached(),
      );
    }
    if (!this.projectInfo.homepage) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_0002_PKG_MISSING_HOMEPAGE.createDetached(),
      );
    }
    const readme = await _loadReadme.call(this);
    if (readme == null) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_0003_MISSING_README.createDetached(),
      );
    }
    const docs = _loadDocs.call(this);

    this._types = {};
    this._deferred = [];
    const visitPromises = new Array<Promise<any>>();

    const sourceFile = this.program.getSourceFile(this.mainFile);

    if (sourceFile == null) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_0004_COULD_NOT_FIND_ENTRYPOINT.createDetached(
          this.mainFile,
        ),
      );
    } else {
      await this._registerDependenciesNamespaces(sourceFile);

      if (LOG.isTraceEnabled()) {
        LOG.trace(
          `Processing source file: ${chalk.blue(
            path.relative(this.projectInfo.projectRoot, sourceFile.fileName),
          )}`,
        );
      }
      const symbol = this._typeChecker.getSymbolAtLocation(sourceFile);
      if (symbol) {
        const moduleExports = this._typeChecker.getExportsOfModule(symbol);
        await Promise.all(
          moduleExports.map((item) =>
            this._registerNamespaces(item, this.projectInfo.projectRoot),
          ),
        );
        for (const node of moduleExports) {
          visitPromises.push(
            this._visitNode(
              node.declarations[0],
              new EmitContext([], this.projectInfo.stability),
            ),
          );
        }
      }
    }

    await Promise.all(visitPromises);

    this.callDeferredsInOrder();

    // Skip emitting if any diagnostic message is an error
    if (
      this._diagnostics.find(
        (diag) => diag.category === ts.DiagnosticCategory.Error,
      ) != null
    ) {
      LOG.debug('Skipping emit due to errors.');
      // Clearing ``this._types`` to allow contents to be garbage-collected.
      delete this._types;
      try {
        return { diagnostics: this._diagnostics, emitSkipped: true };
      } finally {
        // Clearing ``this._diagnostics`` to allow contents to be garbage-collected.
        delete this._diagnostics;
      }
    }

    const jsiiVersion =
      this.projectInfo.jsiiVersionFormat === 'short' ? SHORT_VERSION : VERSION;

    const assembly: spec.Assembly = {
      schema: spec.SchemaVersion.LATEST,
      name: this.projectInfo.name,
      version: this.projectInfo.version,
      description: this.projectInfo.description ?? this.projectInfo.name,
      license: this.projectInfo.license,
      keywords: this.projectInfo.keywords,
      homepage: this.projectInfo.homepage ?? this.projectInfo.repository.url,
      author: this.projectInfo.author,
      contributors: this.projectInfo.contributors && [
        ...this.projectInfo.contributors,
      ],
      repository: this.projectInfo.repository,
      dependencies: noEmptyDict({
        ...this.projectInfo.dependencies,
        ...this.projectInfo.peerDependencies,
      }),
      dependencyClosure: noEmptyDict(
        toDependencyClosure(this.projectInfo.dependencyClosure),
      ),
      bundled: this.projectInfo.bundleDependencies,
      types: this._types,
      submodules: noEmptyDict(toSubmoduleDeclarations(this.mySubmodules())),
      targets: this.projectInfo.targets,
      metadata: {
        ...this.projectInfo.metadata,

        // Downstream consumers need this to map a symbolId in the outDir to a
        // symbolId in the rootDir.
        tscRootDir: this.tscRootDir,
      },
      docs,
      readme,
      jsiiVersion,
      bin: this.projectInfo.bin,
      fingerprint: '<TBD>',
    };

    if (this.deprecatedRemover) {
      this._diagnostics.push(...this.deprecatedRemover.removeFrom(assembly));
    }

    if (this.warningsInjector) {
      const jsiiMetadata = {
        ...(assembly.metadata?.jsii ?? {}),
        ...{ compiledWithDeprecationWarnings: true },
      };

      if (assembly.metadata) {
        assembly.metadata.jsii = jsiiMetadata;
      } else {
        assembly.metadata = { jsii: jsiiMetadata };
      }
      this.warningsInjector.process(assembly, this.projectInfo);
    }

    const validator = new Validator(this.projectInfo, assembly);
    const validationResult = await validator.emit();
    if (!validationResult.emitSkipped) {
      const assemblyPath = path.join(this.projectInfo.projectRoot, '.jsii');
      LOG.trace(`Emitting assembly: ${chalk.blue(assemblyPath)}`);
      await fs.writeJson(assemblyPath, _fingerprint(assembly), {
        encoding: 'utf8',
        spaces: 2,
      });
    }

    try {
      return {
        diagnostics: [...this._diagnostics, ...validationResult.diagnostics],
        emitSkipped: validationResult.emitSkipped,
      };
    } finally {
      // Clearing ``this._types`` to allow contents to be garbage-collected.
      delete this._types;

      // Clearing ``this._diagnostics`` to allow contents to be garbage-collected.
      delete this._diagnostics;
    }

    async function _loadReadme(this: Assembler) {
      // Search for `README.md` in a case-insensitive way
      const fileName = (await fs.readdir(this.projectInfo.projectRoot)).find(
        (file) => file.toLocaleLowerCase() === 'readme.md',
      );
      if (fileName == null) {
        return undefined;
      }
      const readmePath = path.join(this.projectInfo.projectRoot, fileName);
      return loadAndRenderReadme(readmePath, this.projectInfo.projectRoot);
    }

    function _loadDocs(this: Assembler): spec.Docs | undefined {
      if (!this.projectInfo.stability && !this.projectInfo.deprecated) {
        return undefined;
      }
      const deprecated = this.projectInfo.deprecated;
      const stability = this.projectInfo.stability;
      return { deprecated, stability };
    }
  }

  /**
   * Defer a callback until a (set of) types are available
   *
   * This is a helper function around _defer() which encapsulates the _dereference
   * action (which is basically the majority use case for _defer anyway).
   *
   * Will not invoke the function with any 'undefined's; an error will already have been emitted in
   * that case anyway.
   *
   * @param fqn FQN of the current type (the type that has a dependency on baseTypes)
   * @param baseTypes Array of type references to be looked up
   * @param referencingNode Node to report a diagnostic on if we fail to look up a t ype
   * @param cb Callback to be invoked with the Types corresponding to the TypeReferences in baseTypes
   */
  private _deferUntilTypesAvailable(
    fqn: string,
    baseTypes: Array<string | spec.NamedTypeReference>,
    referencingNode: ts.Node,
    cb: (...xs: spec.Type[]) => void,
  ) {
    // We can do this one eagerly
    if (baseTypes.length === 0) {
      cb();
      return;
    }
    const baseFqns = baseTypes.map((bt) =>
      typeof bt === 'string' ? bt : bt.fqn,
    );

    this._defer(fqn, baseFqns, () => {
      const resolved = baseFqns
        .map((x) => this._dereference(x, referencingNode))
        .filter((x) => x !== undefined);
      if (resolved.length > 0) {
        cb(...(resolved as spec.Type[]));
      }
    });
  }

  /**
   * Defer checks for after the program has been entirely processed; useful for verifying type references that may not
   * have been discovered yet, and verifying properties about them.
   *
   * The callback is guaranteed to be executed only after all deferreds for all types in 'dependedFqns' have
   * been executed.
   *
   * @param fqn FQN of the current type.
   * @param dependedFqns List of FQNs of types this callback depends on. All deferreds for all
   * @param cb the function to be called in a deferred way. It will be bound with ``this``, so it can depend on using
   *           ``this``.
   */
  private _defer(fqn: string, dependedFqns: string[], cb: () => void) {
    this._deferred.push({ fqn, dependedFqns, cb: cb.bind(this) });
  }

  /**
   * Obtains the ``spec.Type`` for a given ``spec.NamedTypeReference``.
   *
   * @param ref the type reference to be de-referenced
   *
   * @returns the de-referenced type, if it was found, otherwise ``undefined``.
   */
  private _dereference(
    ref: string | spec.NamedTypeReference,
    referencingNode: ts.Node | undefined,
  ): spec.Type | undefined {
    if (typeof ref !== 'string') {
      ref = ref.fqn;
    }

    const [assm] = ref.split('.');
    let type;
    if (assm === this.projectInfo.name) {
      type = this._types[ref];
    } else {
      const assembly = this.projectInfo.dependencyClosure.find(
        (dep) => dep.name === assm,
      );
      type = assembly?.types?.[ref];

      // since we are exposing a type of this assembly in this module's public API,
      // we expect it to appear as a peer dependency instead of a normal dependency.
      if (assembly) {
        if (!(assembly.name in this.projectInfo.peerDependencies)) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_0005_MISSING_PEER_DEPENDENCY.create(
              referencingNode!, // Cheating here for now, until the referencingNode can be made required
              assembly.name,
              ref,
            ),
          );
        }
      }
    }

    if (!type) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_9002_UNRESOLVEABLE_TYPE.create(
          referencingNode!, // Cheating here for now, until the referencingNode can be made required
          ref,
        ),
      );
    }

    return type;
  }

  /**
   * Compute the JSII fully qualified name corresponding to a ``ts.Type`` instance. If for any reason a name cannot be
   * computed for the type, a marker is returned instead, and an ``ts.DiagnosticCategory.Error`` diagnostic is
   * inserted in the assembler context.
   *
   * @param type the type for which a JSII fully qualified name is needed.
   * @param typeAnnotationNode the type annotation for which this FQN is generated. This is used for attaching the error
   *                           marker. When there is no explicit type annotation (e.g: inferred method return type), the
   *                           preferred substitute is the "type-inferred" element's name.
   * @param typeUse the reason why this type was resolved (e.g: "return type")
   * @param isThisType whether this type was specified or inferred as "this" or not
   *
   * @returns the FQN of the type, or some "unknown" marker.
   */
  private async _getFQN(
    type: ts.Type,
    typeAnnotationNode: ts.Node,
    typeUse: TypeUseKind,
    isThisType: boolean,
  ): Promise<string> {
    const sym = symbolFromType(type, this._typeChecker);

    const typeDeclaration = sym.valueDeclaration ?? sym.declarations?.[0];

    // Set to true to prevent further adding of Error diagnostics for known-bad reference
    let hasError = false;

    if (this._isPrivateOrInternal(sym)) {
      // Check if this type is "this" (explicit or inferred method return type).
      this._diagnostics.push(
        JsiiDiagnostic.JSII_3001_EXPOSED_INTERNAL_TYPE.create(
          typeAnnotationNode,
          sym,
          isThisType,
          typeUse,
        ).addRelatedInformation(
          typeDeclaration,
          `The referenced type is declared here`,
        ),
      );

      hasError = true;
    }

    const tsName = this._typeChecker.getFullyQualifiedName(sym);
    const groups = /^"([^"]+)"\.(.*)$/.exec(tsName);
    if (!groups) {
      if (!hasError) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_3001_EXPOSED_INTERNAL_TYPE.create(
            typeAnnotationNode,
            sym,
            isThisType,
            typeUse,
          ).addRelatedInformation(
            typeDeclaration,
            `The referenced type is declared here`,
          ),
        );
        hasError = true;
      }
      return tsName;
    }
    const [, modulePath, typeName] = groups;
    const pkg = await findPackageInfo(modulePath);
    if (!pkg) {
      if (!hasError) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_9003_UNRESOLVEABLE_MODULE.create(
            typeAnnotationNode,
            modulePath,
          ).addRelatedInformation(
            typeDeclaration,
            `The referenced type is declared here`,
          ),
        );
        hasError = true;
      }
      return `unknown.${typeName}`;
    }

    // If the symbol comes from an assembly whose submodules we've already
    // spidered (or from the current assembly), look up there. This relies
    // on an entry-point import of the library having been done first
    // (`import * as x from 'module-root';`)
    const submodule = this._submoduleMap.get(sym);
    if (submodule != null) {
      const submoduleNs = this._submodules.get(submodule)!.fqnResolutionPrefix;
      return `${submoduleNs}.${typeName}`;
    }

    // This is the fallback: in case we can't find a symbolId for the given
    // type, we're return this value. This is for backwards compatibility with
    // modules that haven't been compiled to have symbolId support. Those also
    // most likely won't be using submodules so this legacy guess will be correct.
    const fallbackFqn = `${pkg.name}.${typeName}`;

    // If the type is coming from the current module, we won't find it in a dependency
    if (pkg.name === this.projectInfo.name) {
      return fallbackFqn;
    }

    // Otherwise look up the symbol identifier in the dependency assemblies
    // This is now the preferred mechanism but we can't do this as the only mechanism,
    // as we may still have compile against very old assemblies that don't have a
    // symbol identifier table at all.
    const dep = this.projectInfo.dependencyClosure.find(
      (d) => d.name === pkg.name,
    );
    if (!dep) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_9000_UNKNOWN_MODULE.create(
          typeAnnotationNode,
          pkg.name,
        ),
      );
      return fallbackFqn;
    }
    const symbolId = symbolIdentifier(this._typeChecker, sym, {
      assembly: dep,
    });
    const fqn =
      (dep && symbolId ? symbolIdIndex(dep)[symbolId] : undefined) ??
      fallbackFqn;

    if (!fqn || !this._dereference({ fqn }, sym.valueDeclaration)) {
      if (!hasError) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_3002_USE_OF_UNEXPORTED_FOREIGN_TYPE.create(
            typeAnnotationNode,
            fqn ?? tsName,
            typeUse,
            pkg,
          ).addRelatedInformation(
            typeDeclaration,
            `The referenced type is declared here`,
          ),
        );
        hasError = true;
      }
    }

    return fqn;
  }

  /**
   * For all modules in the dependency closure, crawl their exports to register
   * the submodules they contain.
   *
   * @param entryPoint the main source file for the currently compiled module.
   */
  private async _registerDependenciesNamespaces(entryPoint: ts.SourceFile) {
    for (const assm of this.projectInfo.dependencyClosure) {
      const resolved = ts.resolveModuleName(
        assm.name,
        entryPoint.fileName,
        this.program.getCompilerOptions(),
        ts.sys,
      );
      // If we can't resolve the module name, simply ignore it (TypeScript compilation likely failed)
      if (resolved.resolvedModule == null) {
        continue;
      }
      const source = this.program.getSourceFile(
        resolved.resolvedModule.resolvedFileName,
      );
      const depMod = source && this._typeChecker.getSymbolAtLocation(source);
      // It's unlikely, but if we can't get the SourceFile here, ignore it (TypeScript compilation probably failed)
      if (depMod == null) {
        continue;
      }

      const depRoot = packageRoot(resolved.resolvedModule.resolvedFileName);

      for (const symbol of this._typeChecker.getExportsOfModule(depMod)) {
        // eslint-disable-next-line no-await-in-loop
        await this._registerNamespaces(symbol, depRoot);
      }
    }

    function packageRoot(file: string): string {
      const parent = path.dirname(file);
      if (path.basename(parent) === 'node_modules' || parent === file) {
        return file;
      }
      return packageRoot(parent);
    }
  }

  private async _registerNamespaces(
    symbol: ts.Symbol,
    packageRoot: string,
  ): Promise<void> {
    const declaration = symbol.valueDeclaration ?? symbol.declarations[0];
    if (declaration == null) {
      // Nothing to do here...
      return;
    }
    if (ts.isModuleDeclaration(declaration)) {
      // Looks like:
      //
      //    export some_namespace {
      //       ...
      //    }
      //
      // No way to configure targets

      const { fqn, fqnResolutionPrefix } = await qualifiedNameOf.call(
        this,
        symbol,
        true,
      );

      this._submodules.set(symbol, {
        fqn,
        fqnResolutionPrefix,
        symbolId: symbolIdentifier(this._typeChecker, symbol),
        locationInModule: this.declarationLocation(declaration),
      });
      await this._addToSubmodule(symbol, symbol, packageRoot);
      return;
    }
    if (!ts.isNamespaceExport(declaration)) {
      // Nothing to do here...
      return;
    }

    const moduleSpecifier = declaration.parent.moduleSpecifier;
    if (moduleSpecifier == null || !ts.isStringLiteral(moduleSpecifier)) {
      // There is a grammar error here, so we'll let tsc report this for us.
      return;
    }
    const resolution = ts.resolveModuleName(
      moduleSpecifier.text,
      declaration.getSourceFile().fileName,
      this.program.getCompilerOptions(),
      ts.sys,
    );
    if (resolution.resolvedModule == null) {
      // Unresolvable module... We'll let tsc report this for us.
      return;
    }

    if (
      // We're not looking into a dependency's namespace exports, and the resolution says it's external
      (packageRoot === this.projectInfo.projectRoot &&
        resolution.resolvedModule.isExternalLibraryImport) ||
      // Or the module resolves outside of the current dependency's tree entirely
      !isUnder(resolution.resolvedModule.resolvedFileName, packageRoot) ||
      // Or the module is under one the current dependency's node_modules subtree
      resolution.resolvedModule.resolvedFileName
        .split('/') // Separator is always '/', even on Windows
        .filter((entry) => entry === 'node_modules').length !==
        packageRoot.split('/').filter((entry) => entry === 'node_modules')
          .length
    ) {
      // External re-exports are "pure-javascript" sugar; they need not be
      // represented in the jsii Assembly since the types in there will be
      // resolved through dependencies.
      return;
    }

    const sourceFile = this.program.getSourceFile(
      resolution.resolvedModule.resolvedFileName,
    )!;
    const sourceModule = this._typeChecker.getSymbolAtLocation(sourceFile);
    // If there's no module, it's a syntax error, and tsc will have reported it for us.
    if (sourceModule) {
      if (
        symbol.name !== Case.camel(symbol.name) &&
        symbol.name !== Case.snake(symbol.name)
      ) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_8004_SUBMOULE_NAME_CASING.create(
            declaration.name,
            symbol.name,
          ),
        );
      }

      const { fqn, fqnResolutionPrefix } = await qualifiedNameOf.call(
        this,
        symbol,
      );
      const targets = await loadSubmoduleTargetConfig(sourceFile.fileName);
      // There is no need to process the README file for submodules that are
      // external (i.e: from a dependency), as these will not be emitted in the
      // assembly. That'd be wasted effort, and could fail if the README file
      // refers to literate examples that are not packaged in the dependency.
      const readme =
        packageRoot === this.projectInfo.projectRoot
          ? await loadSubmoduleReadMe(
              sourceFile.fileName,
              this.projectInfo.projectRoot,
            )
          : undefined;

      this._submodules.set(symbol, {
        fqn,
        fqnResolutionPrefix,
        targets,
        readme,
        symbolId: symbolIdentifier(this._typeChecker, symbol),
        locationInModule: this.declarationLocation(declaration),
      });
      await this._addToSubmodule(symbol, sourceModule, packageRoot);
    }

    async function qualifiedNameOf(
      this: Assembler,
      sym: ts.Symbol,
      inlineNamespace = false,
    ): Promise<{ fqn: string; fqnResolutionPrefix: string }> {
      if (this._submoduleMap.has(sym)) {
        const parent = this._submodules.get(this._submoduleMap.get(sym)!)!;
        const fqn = `${parent.fqn}.${sym.name}`;
        return {
          fqn,
          fqnResolutionPrefix: inlineNamespace
            ? parent.fqnResolutionPrefix
            : fqn,
        };
      }
      const symbolLocation = sym
        .getDeclarations()?.[0]
        ?.getSourceFile()?.fileName;
      const pkgInfo = symbolLocation
        ? await findPackageInfo(symbolLocation)
        : undefined;
      const assemblyName: string = pkgInfo?.name ?? this.projectInfo.name;
      const fqn = `${assemblyName}.${sym.name}`;
      return {
        fqn,
        fqnResolutionPrefix: inlineNamespace ? this.projectInfo.name : fqn,
      };
    }

    async function loadSubmoduleTargetConfig(
      submoduleMain: string,
    ): Promise<SubmoduleSpec['targets']> {
      const jsiirc = path.resolve(submoduleMain, '..', '.jsiirc.json');
      if (!(await fs.pathExists(jsiirc))) {
        return undefined;
      }
      const data = await fs.readJson(jsiirc);
      return data.targets;
    }

    /**
     * Load the README for the given submodule
     *
     * If the submodule is loaded from a complete directory (determined by the 'main'
     * file ending in `index.[d.]ts`, then we load `README.md` in that same directory.
     *
     * If the submodule is loaded from a file, like `mymodule.[d.]ts`, we will load
     * `mymodule.README.md`.
     */
    async function loadSubmoduleReadMe(
      submoduleMain: string,
      projectRoot: string,
    ): Promise<SubmoduleSpec['readme']> {
      const fileBase = path.basename(submoduleMain).replace(/(\.d)?\.ts$/, '');
      const readMeName =
        fileBase === 'index' ? `README.md` : `${fileBase}.README.md`;
      const fullPath = path.join(path.dirname(submoduleMain), readMeName);
      return loadAndRenderReadme(fullPath, projectRoot);
    }
  }

  /**
   * Registers Symbols to a particular submodule. This is used to associate
   * declarations exported by an `export * as ns from 'moduleLike';` statement
   * so that they can subsequently be correctly namespaced.
   *
   * @param ns          the symbol that identifies the submodule.
   * @param moduleLike  the module-like symbol bound to the submodule.
   * @param packageRoot the root of the package being traversed.
   */
  private async _addToSubmodule(
    ns: ts.Symbol,
    moduleLike: ts.Symbol,
    packageRoot: string,
  ) {
    // For each symbol exported by the moduleLike, map it to the ns submodule.
    for (const symbol of this._typeChecker.getExportsOfModule(moduleLike)) {
      if (this._submoduleMap.has(symbol)) {
        const currNs = this._submoduleMap.get(symbol)!;
        // Checking if there's been two submodules exporting the same symbol,
        // which is illegal. We can tell if the currently registered symbol has
        // a different name than the one we're currently trying to register in.
        if (currNs.name !== ns.name) {
          const currNsDecl = currNs.valueDeclaration ?? currNs.declarations[0];
          const nsDecl = ns.valueDeclaration ?? ns.declarations[0];

          // Make sure the error message always lists causes in the same order
          const refs = [
            { decl: currNsDecl, name: currNs.name } as const,
            { decl: nsDecl, name: ns.name } as const,
          ].sort(({ name: l }, { name: r }) => l.localeCompare(r));

          this._diagnostics.push(
            JsiiDiagnostic.JSII_3003_SYMBOL_IS_EXPORTED_TWICE.create(
              _nameOrDeclarationNode(symbol),
              refs[0].name,
              refs[1].name,
            )
              .addRelatedInformation(
                refs[0].decl,
                `Symbol is exported under the "${refs[0].name}" submodule`,
              )
              .addRelatedInformation(
                refs[1].decl,
                `Symbol is exported under the "${refs[1].name}" submodule`,
              ),
          );
        }
        // Found two re-exports, which is odd, but they use the same submodule,
        // so it's probably okay? That's likely a tsc error, which will have
        // been reported for us already anyway.
        continue;
      }
      this._submoduleMap.set(symbol, ns);

      // If the exported symbol has any declaration, and that delcaration is of
      // an entity that can have nested declarations of interest to jsii
      // (classes, interfaces, enums, modules), we need to also associate those
      // nested symbols to the submodule (or they won't be named correctly!)
      const decl = symbol.declarations?.[0];
      if (decl != null) {
        if (
          ts.isClassDeclaration(decl) ||
          ts.isInterfaceDeclaration(decl) ||
          ts.isEnumDeclaration(decl)
        ) {
          const type = this._typeChecker.getTypeAtLocation(decl);
          if (isSingleValuedEnum(type, this._typeChecker)) {
            // type.symbol !== symbol, because symbol is the enum itself, but
            // since it's single-valued, the TypeChecker will only show us the
            // value's symbol later on.
            this._submoduleMap.set(type.symbol, ns);
          }
          if (type.symbol.exports) {
            // eslint-disable-next-line no-await-in-loop
            await this._addToSubmodule(ns, symbol, packageRoot);
          }
        } else if (ts.isModuleDeclaration(decl)) {
          // eslint-disable-next-line no-await-in-loop
          await this._registerNamespaces(symbol, packageRoot);
        } else if (ts.isNamespaceExport(decl)) {
          // eslint-disable-next-line no-await-in-loop
          await this._registerNamespaces(symbol, packageRoot);
        }
      }
    }
  }

  /**
   * Register exported types in ``this.types``.
   *
   * @param node       a node found in a module
   * @param namePrefix the prefix for the types' namespaces
   */
  // eslint-disable-next-line complexity
  private async _visitNode(
    node: ts.Declaration,
    context: EmitContext,
  ): Promise<spec.Type[]> {
    if (ts.isNamespaceExport(node)) {
      // export * as ns from 'module';
      // Note: the "ts.NamespaceExport" refers to the "export * as ns" part of
      // the statement only. We must refer to `node.parent` in order to be able
      // to access the module specifier ("from 'module'") part.
      const symbol = this._typeChecker.getSymbolAtLocation(
        node.parent.moduleSpecifier!,
      )!;

      if (LOG.isTraceEnabled()) {
        LOG.trace(
          `Entering submodule: ${chalk.cyan(
            [...context.namespace, symbol.name].join('.'),
          )}`,
        );
      }

      const nsContext = context.appendNamespace(node.name.text);
      const promises = new Array<Promise<spec.Type[]>>();
      for (const child of this._typeChecker.getExportsOfModule(symbol)) {
        promises.push(this._visitNode(child.declarations[0], nsContext));
      }
      const allTypes = flattenPromises(promises);

      if (LOG.isTraceEnabled()) {
        LOG.trace(
          `Leaving submodule: ${chalk.cyan(
            [...context.namespace, symbol.name].join('.'),
          )}`,
        );
      }

      return allTypes;
    }

    if (ts.isExportSpecifier(node)) {
      // This is what happens when one does `export { Symbol } from "./location";`
      //                   ExportSpecifier:           ~~~~~~

      const resolvedSymbol =
        this._typeChecker.getExportSpecifierLocalTargetSymbol(node);
      if (!resolvedSymbol) {
        // A grammar error, compilation will already have failed
        return [];
      }
      return this._visitNode(
        resolvedSymbol.valueDeclaration ?? resolvedSymbol.declarations[0],
        context,
      );
    }

    if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) === 0) {
      return [];
    }

    let jsiiType: spec.Type | undefined;

    if (ts.isClassDeclaration(node) && _isExported(node)) {
      // export class Name { ... }
      this._validateHeritageClauses(node.heritageClauses);

      jsiiType = await this._visitClass(
        this._typeChecker.getTypeAtLocation(node),
        context,
      );
      if (jsiiType) {
        this.registerExportedClassFqn(node, jsiiType.fqn);
      }
    } else if (ts.isInterfaceDeclaration(node) && _isExported(node)) {
      // export interface Name { ... }
      this._validateHeritageClauses(node.heritageClauses);
      jsiiType = await this._visitInterface(
        this._typeChecker.getTypeAtLocation(node),
        context,
      );
    } else if (ts.isEnumDeclaration(node) && _isExported(node)) {
      // export enum Name { ... }
      jsiiType = await this._visitEnum(
        this._typeChecker.getTypeAtLocation(node),
        context,
      );
    } else if (ts.isModuleDeclaration(node)) {
      // export namespace name { ... }
      const name = node.name.getText();
      const symbol = this._typeChecker.getSymbolAtLocation(node.name)!;

      if (LOG.isTraceEnabled()) {
        LOG.trace(
          `Entering namespace: ${chalk.cyan(
            [...context.namespace, name].join('.'),
          )}`,
        );
      }

      const allTypesPromises = new Array<Promise<spec.Type[]>>();
      for (const prop of this._typeChecker.getExportsOfModule(symbol)) {
        allTypesPromises.push(
          this._visitNode(
            prop.declarations[0],
            context.appendNamespace(node.name.getText()),
          ),
        );
      }
      const allTypes = await flattenPromises(allTypesPromises);

      if (LOG.isTraceEnabled()) {
        LOG.trace(
          `Leaving namespace:  ${chalk.cyan(
            [...context.namespace, name].join('.'),
          )}`,
        );
      }
      return allTypes;
    } else {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_9998_UNSUPPORTED_NODE.create(
          ts.getNameOfDeclaration(node) ?? node,
          node.kind,
        ),
      );
    }

    if (!jsiiType) {
      return [];
    }

    // If symbolId hasn't been set yet, set it here
    if (!jsiiType.symbolId) {
      jsiiType.symbolId = this.getSymbolId(node);
    }

    // Let's quickly verify the declaration does not collide with a submodule. Submodules get case-adjusted for each
    // target language separately, so names cannot collide with case-variations.
    for (const submodule of this._submodules.keys()) {
      const candidates = Array.from(
        new Set([
          submodule.name,
          Case.camel(submodule.name),
          Case.pascal(submodule.name),
          Case.snake(submodule.name),
        ]),
      );
      const colliding = candidates.find(
        (name) => `${this.projectInfo.name}.${name}` === jsiiType!.fqn,
      );
      if (colliding != null) {
        const submoduleDeclName = _nameOrDeclarationNode(submodule);
        this._diagnostics.push(
          JsiiDiagnostic.JSII_5011_SUBMODULE_NAME_CONFLICT.create(
            ts.getNameOfDeclaration(node) ?? node,
            submodule.name,
            jsiiType.name,
            candidates,
          ).addRelatedInformation(
            submoduleDeclName,
            `This is the conflicting submodule declaration`,
          ),
        );
      }
    }

    if (LOG.isInfoEnabled()) {
      LOG.info(
        `Registering JSII ${chalk.magenta(jsiiType.kind)}: ${chalk.green(
          jsiiType.fqn,
        )}`,
      );
    }
    this._types[jsiiType.fqn] = jsiiType;
    jsiiType.locationInModule = this.declarationLocation(node);

    const type = this._typeChecker.getTypeAtLocation(node);
    if (type.symbol.exports) {
      const nestedContext = context.appendNamespace(type.symbol.name);
      const visitedNodes = this._typeChecker
        .getExportsOfModule(type.symbol)
        .filter((s) => s.declarations)
        .map((exportedNode) =>
          this._visitNode(exportedNode.declarations[0], nestedContext),
        );
      for (const nestedTypes of await Promise.all(visitedNodes)) {
        for (const nestedType of nestedTypes) {
          if (nestedType.namespace !== nestedContext.namespace.join('.')) {
            this._diagnostics.push(
              JsiiDiagnostic.JSII_5012_NAMESPACE_IN_TYPE.create(
                ts.getNameOfDeclaration(node) ?? node,
                jsiiType.fqn,
                nestedType.namespace!,
              ),
            );
          }
        }
      }
    }

    return [jsiiType];
  }

  private getSymbolId(node: ts.Node) {
    return symbolIdentifier(
      this._typeChecker,
      this._typeChecker.getTypeAtLocation(node).symbol,
    );
  }

  private _validateHeritageClauses(clauses?: ts.NodeArray<ts.HeritageClause>) {
    if (clauses == null || clauses.length === 0) {
      // Nothing to do.
      return;
    }
    for (const clause of clauses) {
      for (const node of clause.types) {
        const parentType = this._typeChecker.getTypeAtLocation(node);
        if (parentType.symbol == null) {
          // The parent type won't have a symbol if it's an "error type" inserted by the type checker when the original
          // code contains a compilation error. In such cases, the TypeScript compiler will already have reported about
          // the incoherent declarations, so we'll just not re-validate it there (we'd fail anyway).
          continue;
        }
        // For some reason, we cannot trust parentType.isClassOrInterface()
        const badDecl = parentType.symbol.declarations.find(
          (decl) =>
            !ts.isClassDeclaration(decl) && // <-- local classes
            !ts.isInterfaceDeclaration(decl) && // <-- local interfaces
            !ts.isModuleDeclaration(decl), // <-- imported types
        );
        if (badDecl != null) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_3004_INVALID_SUPERTYPE.create(
              node,
              clause,
              badDecl,
            ).addRelatedInformation(
              badDecl,
              `The invalid super type is declared here.`,
            ),
          );
        }
      }
    }
  }

  private declarationLocation(node: ts.Declaration): spec.SourceLocation {
    const file = node.getSourceFile();
    const line = ts.getLineAndCharacterOfPosition(file, node.getStart()).line;
    const filename = path
      .normalize(path.relative(this.projectInfo.projectRoot, file.fileName))
      .replace(/\\/g, '/');
    return {
      filename,
      line: line + 1,
    };
  }

  private async _processBaseInterfaces(fqn: string, baseTypes?: ts.Type[]) {
    const erasedBases = new Array<ts.Type>();
    if (!baseTypes) {
      return { erasedBases };
    }

    const result = new Array<spec.NamedTypeReference>();
    const baseInterfaces = new Set<ts.Type>();

    const processBaseTypes = (types: ts.Type[]) => {
      for (const iface of types) {
        // base is private/internal, so we continue recursively with it's own bases
        if (this._isPrivateOrInternal(iface.symbol)) {
          erasedBases.push(iface);
          const bases = iface.getBaseTypes();
          if (bases) {
            processBaseTypes(bases);
          }
          continue;
        }

        baseInterfaces.add(iface);
      }
    };

    processBaseTypes(baseTypes);

    const typeRefs = Array.from(baseInterfaces).map(async (iface) => {
      const decl = iface.symbol.valueDeclaration;
      const typeRef = await this._typeReference(iface, decl, 'base interface');
      return { decl, typeRef };
    });
    for (const { decl, typeRef } of await Promise.all(typeRefs)) {
      if (!spec.isNamedTypeReference(typeRef)) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_3005_TYPE_USED_AS_INTERFACE.create(decl, typeRef),
        );
        continue;
      }

      this._deferUntilTypesAvailable(fqn, [typeRef], decl, (deref) => {
        if (!spec.isInterfaceType(deref)) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_3005_TYPE_USED_AS_INTERFACE.create(
              decl,
              typeRef,
            ),
          );
        }
      });

      result.push(typeRef);
    }

    return {
      interfaces: result.length === 0 ? undefined : result,
      erasedBases,
    };
  }

  // eslint-disable-next-line complexity
  private async _visitClass(
    type: ts.Type,
    ctx: EmitContext,
  ): Promise<spec.ClassType | undefined> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(
        `Processing class: ${chalk.gray(ctx.namespace.join('.'))}.${chalk.cyan(
          type.symbol.name,
        )}`,
      );
    }

    if (_hasInternalJsDocTag(type.symbol)) {
      return undefined;
    }

    this._warnAboutReservedWords(type.symbol);

    const fqn = `${[this.projectInfo.name, ...ctx.namespace].join('.')}.${
      type.symbol.name
    }`;

    const jsiiType: spec.ClassType = bindings.setClassRelatedNode(
      {
        assembly: this.projectInfo.name,
        fqn,
        kind: spec.TypeKind.Class,
        name: type.symbol.name,
        namespace:
          ctx.namespace.length > 0 ? ctx.namespace.join('.') : undefined,
        docs: this._visitDocumentation(type.symbol, ctx).docs,
      },
      type.symbol.valueDeclaration as ts.ClassDeclaration,
    );

    if (_isAbstract(type.symbol, jsiiType)) {
      jsiiType.abstract = true;
    }

    const erasedBases = new Array<ts.BaseType>();
    for (let base of type.getBaseTypes() ?? []) {
      if (jsiiType.base) {
        // Ignoring this - there has already been a compilation error generated by tsc here.
        continue;
      }

      //
      // base classes ("extends foo")

      // Crawl up the inheritance tree if the current base type is not exported, so we identify the type(s) to be
      // erased, and identify the closest exported base class, should there be one.
      while (base && this._isPrivateOrInternal(base.symbol)) {
        LOG.debug(
          `Base class of ${chalk.green(jsiiType.fqn)} named ${chalk.green(
            base.symbol.name,
          )} is not exported, erasing it...`,
        );
        erasedBases.push(base);
        base = (base.getBaseTypes() ?? [])[0];
      }
      if (!base) {
        // There is no exported base class to be found, pretend this class has no base class.
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      const ref = await this._typeReference(
        base,
        type.symbol.valueDeclaration,
        'base class',
      );

      if (!spec.isNamedTypeReference(ref)) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_3006_TYPE_USED_AS_CLASS.create(
            base.symbol.valueDeclaration ?? base.symbol.declarations[0],
            ref,
          ),
        );
        continue;
      }
      this._deferUntilTypesAvailable(
        fqn,
        [ref],
        base.symbol.valueDeclaration,
        (deref) => {
          if (!spec.isClassType(deref)) {
            this._diagnostics.push(
              JsiiDiagnostic.JSII_3006_TYPE_USED_AS_CLASS.create(
                base.symbol.valueDeclaration ?? base.symbol.declarations[0],
                ref,
              ),
            );
          }
        },
      );
      jsiiType.base = ref.fqn;
    }

    //
    // base interfaces ("implements foo")

    // collect all "implements" declarations from the current type and all
    // erased base types (because otherwise we lose them, see jsii#487)
    const implementsClauses = new Array<ts.HeritageClause>();
    for (const heritage of [type, ...erasedBases].map(
      (t) =>
        (t.symbol.valueDeclaration as ts.ClassDeclaration).heritageClauses ??
        [],
    )) {
      for (const clause of heritage) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          // Handled by `getBaseTypes`
          continue;
        } else if (clause.token !== ts.SyntaxKind.ImplementsKeyword) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_9998_UNSUPPORTED_NODE.create(
              clause,
              `Ignoring ${ts.SyntaxKind[clause.token]} heritage clause`,
            ),
          );
          continue;
        }

        implementsClauses.push(clause);
      }
    }

    // process all "implements" clauses
    const allInterfaces = new Set<string>();
    const baseInterfaces = implementsClauses.map((clause) =>
      this._processBaseInterfaces(
        fqn,
        clause.types.map((t) => this._getTypeFromTypeNode(t)),
      ),
    );
    for (const { interfaces } of await Promise.all(baseInterfaces)) {
      for (const ifc of interfaces ?? []) {
        allInterfaces.add(ifc.fqn);
      }
      if (interfaces) {
        this._deferUntilTypesAvailable(
          jsiiType.fqn,
          interfaces,
          type.symbol.valueDeclaration,
          (...ifaces) => {
            for (const iface of ifaces) {
              if (spec.isInterfaceType(iface) && iface.datatype) {
                this._diagnostics.push(
                  JsiiDiagnostic.JSII_3007_ILLEGAL_STRUCT_EXTENSION.create(
                    type.symbol.valueDeclaration ?? type.symbol.declarations[0],
                    jsiiType,
                    iface,
                  ),
                );
              }
            }
          },
        );
      }
    }

    if (allInterfaces.size > 0) {
      jsiiType.interfaces = Array.from(allInterfaces);
    }

    if (!type.isClass()) {
      throw new Error('Oh no');
    }

    const allDeclarations: Array<{
      decl: ts.Declaration;
      type: ts.InterfaceType | ts.BaseType;
    }> = type.symbol.declarations.map((decl) => ({ decl, type }));

    // Considering erased bases' declarations, too, so they are "blended in"
    for (const base of erasedBases) {
      allDeclarations.push(
        ...base.symbol.declarations.map((decl) => ({ decl, type: base })),
      );
    }

    for (const { decl, type: declaringType } of allDeclarations) {
      const classDecl = decl as ts.ClassDeclaration | ts.InterfaceDeclaration;
      if (!classDecl.members) {
        continue;
      }

      for (const memberDecl of classDecl.members) {
        if (ts.isSemicolonClassElement(memberDecl)) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_9996_UNNECESSARY_TOKEN.create(memberDecl),
          );
          continue;
        }

        const member: ts.Symbol = ts.isConstructorDeclaration(memberDecl)
          ? (memberDecl as any).symbol
          : this._typeChecker.getSymbolAtLocation(
              ts.getNameOfDeclaration(memberDecl)!,
            )!;

        if (
          !(declaringType.symbol.getDeclarations() ?? []).find(
            (d) => d === memberDecl.parent,
          )
        ) {
          continue;
        }

        if (this._isPrivateOrInternal(member, memberDecl as ts.ClassElement)) {
          continue;
        }

        // constructors are handled later
        if (ts.isConstructorDeclaration(memberDecl)) {
          continue;
        }

        // eslint-disable-next-line no-await-in-loop
        if (
          ts.isMethodDeclaration(memberDecl) ||
          ts.isMethodSignature(memberDecl)
        ) {
          // eslint-disable-next-line no-await-in-loop
          await this._visitMethod(
            member,
            jsiiType,
            ctx.replaceStability(jsiiType.docs?.stability),
            classDecl,
          );
        } else if (
          ts.isPropertyDeclaration(memberDecl) ||
          ts.isPropertySignature(memberDecl) ||
          ts.isAccessor(memberDecl)
        ) {
          // eslint-disable-next-line no-await-in-loop
          await this._visitProperty(
            member,
            jsiiType,
            ctx.replaceStability(jsiiType.docs?.stability),
            classDecl,
          );
        } else {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_9998_UNSUPPORTED_NODE.create(
              ts.getNameOfDeclaration(memberDecl) ?? memberDecl,
              memberDecl.kind,
            ),
          );
        }
        /* eslint-enable no-await-in-loop */
      }
    }

    const memberEmitContext = ctx.replaceStability(
      jsiiType.docs && jsiiType.docs.stability,
    );

    // Find the first defined constructor in this class, or it's erased bases
    const constructor = [type, ...erasedBases]
      .map(getConstructor)
      .find((ctor) => ctor != null);
    const ctorDeclaration =
      constructor && (constructor.declarations[0] as ts.ConstructorDeclaration);
    if (constructor && ctorDeclaration) {
      const signature =
        this._typeChecker.getSignatureFromDeclaration(ctorDeclaration);

      if (
        (ts.getCombinedModifierFlags(ctorDeclaration) &
          ts.ModifierFlags.Private) ===
        0
      ) {
        jsiiType.initializer = {
          locationInModule: this.declarationLocation(ctorDeclaration),
        };
        if (signature) {
          for (const param of signature.getParameters()) {
            jsiiType.initializer.parameters =
              jsiiType.initializer.parameters ?? [];
            jsiiType.initializer.parameters.push(
              // eslint-disable-next-line no-await-in-loop
              await this._toParameter(
                param,
                ctx.replaceStability(jsiiType.docs?.stability),
              ),
            );
            jsiiType.initializer.variadic =
              jsiiType.initializer?.parameters?.some((p) => !!p.variadic) ||
              undefined;
            jsiiType.initializer.protected =
              (ts.getCombinedModifierFlags(ctorDeclaration) &
                ts.ModifierFlags.Protected) !==
                0 || undefined;
          }
        }
        this._verifyConsecutiveOptionals(
          ctorDeclaration,
          jsiiType.initializer.parameters,
        );
        jsiiType.initializer.docs = this._visitDocumentation(
          constructor,
          memberEmitContext,
        ).docs;
      }

      // Process constructor-based property declarations even if constructor is private
      if (signature) {
        for (const param of signature.getParameters()) {
          if (
            ts.isParameterPropertyDeclaration(
              param.valueDeclaration,
              param.valueDeclaration.parent,
            ) &&
            !this._isPrivateOrInternal(param)
          ) {
            // eslint-disable-next-line no-await-in-loop
            await this._visitProperty(
              param,
              jsiiType,
              memberEmitContext,
              ctorDeclaration.parent,
            );
          }
        }
      }
    } else if (jsiiType.base) {
      this._deferUntilTypesAvailable(
        fqn,
        [jsiiType.base],
        type.symbol.valueDeclaration,
        (baseType) => {
          if (spec.isClassType(baseType)) {
            jsiiType.initializer = baseType.initializer;
          } else {
            this._diagnostics.push(
              JsiiDiagnostic.JSII_3999_INCOHERENT_TYPE_MODEL.create(
                type.symbol.valueDeclaration ?? type.symbol.declarations[0],
                `Base type of ${jsiiType.fqn} (${jsiiType.base}) is not a class`,
              ),
            );
          }
        },
      );
    } else {
      jsiiType.initializer = {
        docs: ctx.stability && { stability: ctx.stability },
      };
    }

    this._verifyNoStaticMixing(jsiiType, type.symbol.valueDeclaration);

    return _sortMembers(jsiiType);
  }

  /**
   * Use the TypeChecker's getTypeFromTypeNode, but throw a descriptive error if it fails
   */
  private _getTypeFromTypeNode(t: ts.TypeNode) {
    const type = this._typeChecker.getTypeFromTypeNode(t);
    if (isErrorType(type)) {
      throw new Error(
        `Unable to resolve type: ${t.getFullText()}. This typically happens if something is wrong with your dependency closure.`,
      );
    }
    return type;
  }

  /**
   * Check that this class doesn't declare any members that are of different staticness in itself or any of its bases
   */
  private _verifyNoStaticMixing(klass: spec.ClassType, decl: ts.Declaration) {
    // Check class itself--may have two methods/props with the same name, so check the arrays
    const statics = new Set(
      (klass.methods ?? [])
        .concat(klass.properties ?? [])
        .filter((x) => x.static)
        .map((x) => x.name),
    );
    const nonStatics = new Set(
      (klass.methods ?? [])
        .concat(klass.properties ?? [])
        .filter((x) => !x.static)
        .map((x) => x.name),
    );
    // Intersect
    for (const member of intersect(statics, nonStatics)) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_5013_STATIC_INSTANCE_CONFLICT.create(
          decl,
          member,
          klass,
        ),
      );
    }

    // Check against base classes. They will not contain duplicate member names so we can load
    // the members into a map.
    const classMembers = typeMembers(klass);
    this._withBaseClass(klass, decl, (base, recurse) => {
      for (const [name, baseMember] of Object.entries(typeMembers(base))) {
        const member = classMembers[name];
        if (!member) {
          continue;
        }

        if (!!baseMember.static !== !!member.static) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_5014_INHERITED_STATIC_CONFLICT.create(
              decl,
              member,
              klass,
              baseMember,
              base,
            ),
          );
        }
      }

      recurse();
    });
  }

  /**
   * Wrapper around _deferUntilTypesAvailable, invoke the callback with the given classes' base type
   *
   * Does nothing if the given class doesn't have a base class.
   *
   * The second argument will be a `recurse` function for easy recursion up the inheritance tree
   * (no messing around with binding 'self' and 'this' and doing multiple calls to _withBaseClass.)
   */
  private _withBaseClass(
    klass: spec.ClassType,
    decl: ts.Declaration,
    cb: (base: spec.ClassType, recurse: () => void) => void,
  ) {
    if (klass.base) {
      this._deferUntilTypesAvailable(klass.fqn, [klass.base], decl, (base) => {
        if (!spec.isClassType(base)) {
          throw new Error('Oh no');
        }
        cb(base, () => this._withBaseClass(base, decl, cb));
      });
    }
  }

  /**
   * @returns true if this member is internal and should be omitted from the type manifest
   */
  private _isPrivateOrInternal(
    symbol: ts.Symbol,
    validateDeclaration?: ts.Declaration,
  ): boolean {
    const hasInternalJsDocTag = _hasInternalJsDocTag(symbol);
    const hasUnderscorePrefix =
      symbol.name !== '__constructor' && symbol.name.startsWith('_');

    if (_isPrivate(symbol)) {
      LOG.trace(
        `${chalk.cyan(
          symbol.name,
        )} is marked "private", or is an unexported type declaration`,
      );
      return true;
    }

    if (!hasInternalJsDocTag && !hasUnderscorePrefix) {
      return false;
    }

    // we only validate if we have a declaration
    if (validateDeclaration) {
      if (!hasUnderscorePrefix) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_8005_INTERNAL_UNDERSCORE.create(
            ts.getNameOfDeclaration(validateDeclaration) ?? validateDeclaration,
            symbol.name,
          ),
        );
      }

      if (!hasInternalJsDocTag) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_8006_UNDERSCORE_INTERNAL.create(
            ts.getNameOfDeclaration(validateDeclaration) ?? validateDeclaration,
            symbol.name,
          ),
        );
      }
    }

    return true;
  }

  private async _visitEnum(
    type: ts.Type,
    ctx: EmitContext,
  ): Promise<spec.EnumType | undefined> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(
        `Processing enum: ${chalk.gray(ctx.namespace.join('.'))}.${chalk.cyan(
          type.symbol.name,
        )}`,
      );
    }

    // Forcefully resolving to the EnumDeclaration symbol for single-valued enums
    let decl: ts.Node | undefined = type.symbol.declarations[0];
    let symbol: ts.Symbol | undefined;
    if (ts.isEnumMember(decl)) {
      decl = decl?.parent;
    }
    if (ts.isEnumDeclaration(decl)) {
      symbol = getSymbolFromDeclaration(decl, this._typeChecker);
    }
    if (!decl || !symbol || !ts.isEnumDeclaration(decl)) {
      throw new Error(
        `Unable to resolve enum declaration for ${type.symbol.name}!`,
      );
    }

    if (_hasInternalJsDocTag(symbol)) {
      return Promise.resolve(undefined);
    }

    this._warnAboutReservedWords(symbol);

    const flags = ts.getCombinedModifierFlags(decl);
    if (flags & ts.ModifierFlags.Const) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_1000_NO_CONST_ENUM.create(
          decl.modifiers?.find(
            (mod) => mod.kind === ts.SyntaxKind.ConstKeyword,
          ) ?? decl,
        ),
      );
    }

    const { docs } = this._visitDocumentation(symbol, ctx);

    const typeContext = ctx.replaceStability(docs?.stability);
    const members = type.isUnion() ? type.types : [type];

    const jsiiType: spec.EnumType = bindings.setEnumRelatedNode(
      {
        assembly: this.projectInfo.name,
        fqn: `${[this.projectInfo.name, ...ctx.namespace].join('.')}.${
          symbol.name
        }`,
        kind: spec.TypeKind.Enum,
        members: members.map((m) => {
          const { docs } = this._visitDocumentation(m.symbol, typeContext);
          return { name: m.symbol.name, docs };
        }),
        name: symbol.name,
        namespace:
          ctx.namespace.length > 0 ? ctx.namespace.join('.') : undefined,
        docs,

        // Set SymbolId here instead of later, as by default TS will pick single-enum members
        // as the target symbol if possible.
        symbolId: symbolIdentifier(this._typeChecker, symbol),
      },
      decl,
    );

    return Promise.resolve(jsiiType);
  }

  /**
   * Return docs for a symbol
   */
  private _visitDocumentation(
    sym: ts.Symbol,
    context: EmitContext,
  ): { readonly docs?: spec.Docs; readonly hints: TypeSystemHints } {
    const result = parseSymbolDocumentation(sym, this._typeChecker);

    for (const diag of result.diagnostics ?? []) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_7999_DOCUMENTATION_ERROR.create(
          sym.valueDeclaration ?? sym.declarations[0],
          diag,
        ),
      );
    }

    const decl = sym.valueDeclaration ?? sym.declarations[0];
    // The @struct hint is only valid for interface declarations
    if (!ts.isInterfaceDeclaration(decl) && result.hints.struct) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_7001_ILLEGAL_HINT.create(
          _findHint(decl, 'struct')!,
          'struct',
          'interfaces with only readonly properties',
        ).addRelatedInformation(
          ts.getNameOfDeclaration(decl) ?? decl,
          'The annotated declaration is here',
        ),
      );
      // Clean up the bad hint...
      delete (result.hints as any).struct;
    }

    // Apply the current context's stability if none was specified locally.
    if (result.docs.stability == null) {
      result.docs.stability = context.stability;
    }

    const allUndefined = Object.values(result.docs).every(
      (v) => v === undefined,
    );
    return {
      docs: !allUndefined ? result.docs : undefined,
      hints: result.hints,
    };
  }

  /**
   * Check that all parameters the doc block refers to with a @param declaration actually exist
   */
  private _validateReferencedDocParams(
    method: spec.Method,
    methodSym: ts.Symbol,
  ) {
    const params = getReferencedDocParams(methodSym);
    const actualNames = new Set((method.parameters ?? []).map((p) => p.name));
    for (const param of params) {
      if (!actualNames.has(param)) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_7000_NON_EXISTENT_PARAMETER.create(
            methodSym.valueDeclaration ?? methodSym.declarations[0],
            method,
            param,
          ),
        );
      }
    }
  }

  private async _visitInterface(
    type: ts.Type,
    ctx: EmitContext,
  ): Promise<spec.InterfaceType | undefined> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(
        `Processing interface: ${chalk.gray(
          ctx.namespace.join('.'),
        )}.${chalk.cyan(type.symbol.name)}`,
      );
    }

    if (_hasInternalJsDocTag(type.symbol)) {
      return undefined;
    }

    this._warnAboutReservedWords(type.symbol);

    const fqn = `${[this.projectInfo.name, ...ctx.namespace].join('.')}.${
      type.symbol.name
    }`;

    const { docs, hints } = this._visitDocumentation(type.symbol, ctx);
    const jsiiType: spec.InterfaceType = bindings.setInterfaceRelatedNode(
      {
        assembly: this.projectInfo.name,
        fqn,
        kind: spec.TypeKind.Interface,
        name: type.symbol.name,
        namespace:
          ctx.namespace.length > 0 ? ctx.namespace.join('.') : undefined,
        docs,
      },
      type.symbol.declarations[0] as ts.InterfaceDeclaration,
    );

    const { interfaces, erasedBases } = await this._processBaseInterfaces(
      fqn,
      type.getBaseTypes(),
    );
    jsiiType.interfaces = apply(interfaces, (arr) => arr.map((i) => i.fqn));

    for (const declaringType of [type, ...erasedBases]) {
      for (const member of declaringType.getProperties()) {
        if (
          !(declaringType.symbol.getDeclarations() ?? []).find(
            (decl) => decl === member.valueDeclaration?.parent,
          )
        ) {
          continue;
        }

        if (
          this._isPrivateOrInternal(
            member,
            member.valueDeclaration as ts.PropertyDeclaration,
          )
        ) {
          continue;
        }

        if (
          ts.isMethodDeclaration(member.valueDeclaration) ||
          ts.isMethodSignature(member.valueDeclaration)
        ) {
          // eslint-disable-next-line no-await-in-loop
          await this._visitMethod(
            member,
            jsiiType,
            ctx.replaceStability(jsiiType.docs?.stability),
            (type.symbol.valueDeclaration ??
              type.symbol.declarations[0]) as ts.InterfaceDeclaration,
          );
        } else if (
          ts.isPropertyDeclaration(member.valueDeclaration) ||
          ts.isPropertySignature(member.valueDeclaration) ||
          ts.isAccessor(member.valueDeclaration)
        ) {
          // eslint-disable-next-line no-await-in-loop
          await this._visitProperty(
            member,
            jsiiType,
            ctx.replaceStability(jsiiType.docs?.stability),
            (type.symbol.valueDeclaration ??
              type.symbol.declarations[0]) as ts.InterfaceDeclaration,
          );
        } else {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_9998_UNSUPPORTED_NODE.create(
              _nameOrDeclarationNode(member),
              (member.valueDeclaration ?? member.declarations[0]).kind,
            ),
          );
        }
      }
    }

    // Calculate datatype based on the datatypeness of this interface and all of its parents
    // To keep the spec minimal the actual values of the attribute are "true" or "undefined" (to represent "false").
    const declaration =
      type.symbol.valueDeclaration ?? type.symbol.declarations[0];
    this._deferUntilTypesAvailable(
      fqn,
      jsiiType.interfaces ?? [],
      declaration,
      (...bases: spec.Type[]) => {
        if ((jsiiType.methods ?? []).length === 0) {
          jsiiType.datatype = true;
        } else if (hints.struct) {
          this._diagnostics.push(
            jsiiType.methods!.reduce((diag, mthod) => {
              const node = bindings.getMethodRelatedNode(mthod);
              return node
                ? diag.addRelatedInformation(
                    ts.getNameOfDeclaration(node) ?? node,
                    `A method is declared here`,
                  )
                : diag;
            }, JsiiDiagnostic.JSII_7001_ILLEGAL_HINT.create(_findHint(declaration, 'struct')!, 'struct', 'interfaces with only readonly properties').addRelatedInformation(ts.getNameOfDeclaration(declaration) ?? declaration, 'The annotated declartion is here')),
          );
        }

        for (const base of bases) {
          if (spec.isInterfaceType(base) && !base.datatype) {
            jsiiType.datatype = undefined;
          }
        }

        const interfaceName = isInterfaceName(jsiiType.name);

        // If it's not a datatype the name must start with an "I".
        if (!jsiiType.datatype && !interfaceName) {
          this._diagnostics.push(
            JsiiDiagnostic.JSII_8007_BEHAVIORAL_INTERFACE_NAME.create(
              ts.getNameOfDeclaration(declaration) ?? declaration,
              jsiiType.name,
            ),
          );
        }

        // If the name starts with an "I" it is not intended as a datatype, so switch that off,
        // unless a TSDoc hint was set to force this to be considered a behavioral interface.
        if (jsiiType.datatype && interfaceName && !hints.struct) {
          delete jsiiType.datatype;
        }

        // Okay, this is a data type, check that all properties are readonly
        if (jsiiType.datatype) {
          for (const prop of jsiiType.properties ?? []) {
            if (!prop.immutable) {
              const p = type.getProperty(prop.name)!;
              this._diagnostics.push(
                JsiiDiagnostic.JSII_3008_STRUCT_PROPS_MUST_BE_READONLY.create(
                  _nameOrDeclarationNode(p),
                  p.name,
                  jsiiType,
                ),
              );

              // force property to be "readonly" since jsii languages will pass this by-value
              prop.immutable = true;
            }
          }
        } else {
          // This is *NOT* a data type, so it may not extend something that is one.
          for (const base of bases) {
            if (!spec.isInterfaceType(base)) {
              // Invalid type we already warned about earlier, just ignoring it here..
              continue;
            }
            if (base.datatype) {
              this._diagnostics.push(
                JsiiDiagnostic.JSII_3007_ILLEGAL_STRUCT_EXTENSION.create(
                  type.symbol.valueDeclaration ?? type.symbol.declarations[0],
                  jsiiType,
                  base,
                ),
              );
            }
          }
        }
      },
    );

    // Check that no interface declares a member that's already declared
    // in a base type (not allowed in C#).
    const names = memberNames(jsiiType);
    const checkNoIntersection = (...bases: spec.Type[]) => {
      for (const base of bases) {
        if (!spec.isInterfaceType(base)) {
          continue;
        }

        const baseMembers = memberNames(base);
        for (const memberName of names) {
          if (baseMembers.includes(memberName)) {
            this._diagnostics.push(
              JsiiDiagnostic.JSII_5015_REDECLARED_INTERFACE_MEMBER.create(
                type.symbol.valueDeclaration ?? type.symbol.declarations[0],
                memberName,
                jsiiType,
              ),
            );
          }
        }
        // Recurse upwards
        this._deferUntilTypesAvailable(
          fqn,
          base.interfaces ?? [],
          type.symbol.valueDeclaration,
          checkNoIntersection,
        );
      }
    };
    this._deferUntilTypesAvailable(
      fqn,
      jsiiType.interfaces ?? [],
      type.symbol.valueDeclaration,
      checkNoIntersection,
    );

    return _sortMembers(jsiiType);
  }

  private async _visitMethod(
    symbol: ts.Symbol,
    type: spec.ClassType | spec.InterfaceType,
    ctx: EmitContext,
    declaringTypeDecl: ts.ClassLikeDeclaration | ts.InterfaceDeclaration,
  ) {
    if (LOG.isTraceEnabled()) {
      LOG.trace(
        `Processing method: ${chalk.green(type.fqn)}#${chalk.cyan(
          symbol.name,
        )}`,
      );
    }

    const declaration = symbol.valueDeclaration as
      | ts.MethodDeclaration
      | ts.MethodSignature;
    const signature =
      this._typeChecker.getSignatureFromDeclaration(declaration);
    if (!signature) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_9004_UNABLE_TO_COMPUTE_SIGNATURE.create(
          declaration,
          symbol.name,
          type,
        ),
      );
      return;
    }

    if (Case.pascal(type.name) === Case.pascal(symbol.name)) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_5019_MEMBER_TYPE_NAME_CONFLICT.create(
          declaration.name,
          'method',
          symbol,
          type,
        ).addRelatedInformation(
          declaringTypeDecl.name ?? declaringTypeDecl,
          `The declaring ${type.kind} is introduced here`,
        ),
      );
    }

    if (isProhibitedMemberName(symbol.name)) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_5016_PROHIBITED_MEMBER_NAME.create(
          declaration.name,
          symbol.name,
        ),
      );
      return;
    }
    this._warnAboutReservedWords(symbol);

    const parameters = await Promise.all(
      signature.getParameters().map((p) => this._toParameter(p, ctx)),
    );

    const returnType = signature.getReturnType();
    const method: spec.Method = bindings.setMethodRelatedNode(
      {
        abstract: _isAbstract(symbol, type) || undefined,
        name: symbol.name,
        parameters: parameters.length > 0 ? parameters : undefined,
        protected: _isProtected(symbol) || undefined,
        returns: _isVoid(returnType)
          ? undefined
          : await this._optionalValue(
              returnType,
              declaration.name,
              'return type',
            ),
        async: _isPromise(returnType) || undefined,
        static: _isStatic(symbol) || undefined,
        locationInModule: this.declarationLocation(declaration),
      },
      declaration,
    );
    method.variadic =
      method.parameters?.some((p) => !!p.variadic) === true ? true : undefined;

    this._verifyConsecutiveOptionals(declaration, method.parameters);

    method.docs = this._visitDocumentation(symbol, ctx).docs;

    // If the last parameter is a datatype, verify that it does not share any field names with
    // other function arguments, so that it can be turned into keyword arguments by jsii frontends
    // that support such.
    const lastParamTypeRef = apply(last(parameters), (x) => x.type);
    const lastParamSymbol = last(signature.getParameters());
    if (lastParamTypeRef && spec.isNamedTypeReference(lastParamTypeRef)) {
      this._deferUntilTypesAvailable(
        symbol.name,
        [lastParamTypeRef],
        lastParamSymbol!.declarations[0],
        (lastParamType) => {
          if (!spec.isInterfaceType(lastParamType) || !lastParamType.datatype) {
            return;
          }

          // Liftable datatype, make sure no parameter names match any of the properties in the datatype
          const propNames = this.allProperties(lastParamType);
          const paramNames = new Set(
            parameters.slice(0, parameters.length - 1).map((x) => x.name),
          );
          const sharedNames = intersection(propNames, paramNames);

          for (const badName of sharedNames) {
            this._diagnostics.push(
              JsiiDiagnostic.JSII_5017_POSITIONAL_KEYWORD_CONFLICT.create(
                declaration,
                badName,
              ),
            );
          }
        },
      );
    }

    this._validateReferencedDocParams(method, symbol);

    type.methods = type.methods ?? [];
    if (
      type.methods.find(
        (m) => m.name === method.name && m.static === method.static,
      ) != null
    ) {
      LOG.trace(
        `Dropping re-declaration of ${chalk.green(type.fqn)}#${chalk.cyan(
          method.name,
        )}`,
      );
      return;
    }
    type.methods.push(method);
  }

  private _warnAboutReservedWords(symbol: ts.Symbol) {
    if (!enabledWarnings['reserved-word']) {
      return;
    }

    const reservingLanguages = isReservedName(symbol.name);
    if (reservingLanguages) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_5018_RESERVED_WORD.create(
          _nameOrDeclarationNode(symbol),
          symbol.name,
          reservingLanguages,
        ),
      );
    }
  }

  private async _visitProperty(
    symbol: ts.Symbol,
    type: spec.ClassType | spec.InterfaceType,
    ctx: EmitContext,
    declaringTypeDecl: ts.ClassLikeDeclaration | ts.InterfaceDeclaration,
  ) {
    if (type.properties?.find((p) => p.name === symbol.name)) {
      /*
       * Second declaration of the same property. For example, if code specifies a getter & setter signature,
       * there will be one pass for each of the signatures, but we can process only the first encountered. The
       * typescript compiler will take care of making sure we don't have conflicting declarations, anyway.
       */
      return;
    }

    if (LOG.isTraceEnabled()) {
      LOG.trace(
        `Processing property: ${chalk.green(type.fqn)}#${chalk.cyan(
          symbol.name,
        )}`,
      );
    }

    const declaration = symbol.valueDeclaration ?? symbol.declarations[0];
    const signature = declaration as
      | ts.PropertySignature
      | ts.PropertyDeclaration
      | ts.AccessorDeclaration
      | ts.ParameterPropertyDeclaration;

    if (Case.pascal(type.name) === Case.pascal(symbol.name)) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_5019_MEMBER_TYPE_NAME_CONFLICT.create(
          signature.name,
          'property',
          symbol,
          type,
        ).addRelatedInformation(
          declaringTypeDecl.name ?? declaringTypeDecl,
          `The declaring ${type.kind} is introduced here`,
        ),
      );
    }

    if (isProhibitedMemberName(symbol.name)) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_5016_PROHIBITED_MEMBER_NAME.create(
          symbol.valueDeclaration ?? symbol.declarations[0],
          symbol.name,
        ),
      );
      return;
    }

    this._warnAboutReservedWords(symbol);

    const property: spec.Property = bindings.setPropertyRelatedNode(
      {
        ...(await this._optionalValue(
          this._typeChecker.getTypeOfSymbolAtLocation(symbol, signature),
          signature.name,
          'property type',
        )),
        abstract: _isAbstract(symbol, type) || undefined,
        name: symbol.name,
        protected: _isProtected(symbol) || undefined,
        static: _isStatic(symbol) || undefined,
        locationInModule: this.declarationLocation(signature),
      },
      signature,
    );

    if (ts.isGetAccessor(signature)) {
      const decls = symbol.getDeclarations() ?? [];
      property.immutable =
        !decls.some((decl) => ts.isSetAccessor(decl)) || undefined;
    } else {
      property.immutable =
        (ts.getCombinedModifierFlags(signature) & ts.ModifierFlags.Readonly) !==
          0 || undefined;
    }

    if (signature.questionToken) {
      property.optional = true;
    }

    if (
      property.static &&
      property.immutable &&
      ts.isPropertyDeclaration(signature) &&
      signature.initializer
    ) {
      property.const = true;
    }

    property.docs = this._visitDocumentation(symbol, ctx).docs;

    type.properties = type.properties ?? [];
    if (
      type.properties.find(
        (prop) =>
          prop.name === property.name && prop.static === property.static,
      ) != null
    ) {
      LOG.trace(
        `Dropping re-declaration of ${chalk.green(type.fqn)}#${chalk.cyan(
          property.name,
        )}`,
      );
      return;
    }
    type.properties.push(property);
  }

  private async _toParameter(
    paramSymbol: ts.Symbol,
    ctx: EmitContext,
  ): Promise<spec.Parameter> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing parameter: ${chalk.cyan(paramSymbol.name)}`);
    }
    const paramDeclaration =
      paramSymbol.valueDeclaration as ts.ParameterDeclaration;

    this._warnAboutReservedWords(paramSymbol);

    const parameter: spec.Parameter = bindings.setParameterRelatedNode(
      {
        ...(await this._optionalValue(
          this._typeChecker.getTypeAtLocation(paramDeclaration),
          paramDeclaration.name,
          'parameter type',
        )),
        name: paramSymbol.name,
        variadic: paramDeclaration.dotDotDotToken && true,
      },
      paramDeclaration,
    );

    if (parameter.variadic && spec.isCollectionTypeReference(parameter.type)) {
      // TypeScript types variadic parameters as an array, but JSII uses the item-type instead.
      parameter.type = parameter.type.collection.elementtype;
    } else if (paramDeclaration.initializer || paramDeclaration.questionToken) {
      // Optional parameters have an inherently null-able type.
      parameter.optional = true;
    }

    parameter.docs = this._visitDocumentation(
      paramSymbol,
      ctx.removeStability(), // No inheritance on purpose
    ).docs;

    // Don't rewrite doc comment here on purpose -- instead, we add them as '@param'
    // into the parent's doc comment.

    return parameter;
  }

  private async _typeReference(
    type: ts.Type,
    declaration: ts.Node,
    purpose: TypeUseKind,
  ): Promise<spec.TypeReference> {
    const optionalValue = await this._optionalValue(type, declaration, purpose);
    if (optionalValue.optional) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_3999_INCOHERENT_TYPE_MODEL.create(
          declaration,
          'Encountered optional value in location where a plain type reference is expected',
        ),
      );
    }
    return optionalValue.type;
  }

  private async _optionalValue(
    type: ts.Type,
    declaration: ts.Node,
    purpose: TypeUseKind,
  ): Promise<spec.OptionalValue> {
    const isThisType = _isThisType(type, this._typeChecker);

    if (type.isLiteral() && _isEnumLike(type)) {
      type = this._typeChecker.getBaseTypeOfLiteralType(type);
    } else {
      type = this._typeChecker.getApparentType(type);
    }

    const primitiveType = _tryMakePrimitiveType.call(this);
    if (primitiveType) {
      return { type: primitiveType };
    }

    if (type.isUnion() && !_isEnumLike(type)) {
      return _unionType.call(this);
    }

    if (!type.symbol) {
      this._diagnostics.push(
        JsiiDiagnostic.JSII_1001_TYPE_HAS_NO_SYMBOL.create(declaration),
      );
      return { type: spec.CANONICAL_ANY };
    }

    if (type.symbol.name === 'Array') {
      return { type: await _arrayType.call(this) };
    }

    if (type.symbol.name === '__type' && type.symbol.members) {
      return { type: await _mapType.call(this) };
    }

    if (type.symbol.escapedName === 'Promise') {
      const typeRef = type as ts.TypeReference;
      if (!typeRef.typeArguments || typeRef.typeArguments.length !== 1) {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_1002_UNSPECIFIED_PROMISE.create(declaration),
        );
        return { type: spec.CANONICAL_ANY };
      }
      return {
        type: await this._typeReference(
          typeRef.typeArguments[0],
          declaration,
          purpose,
        ),
      };
    }

    return {
      type: { fqn: await this._getFQN(type, declaration, purpose, isThisType) },
    };

    async function _arrayType(
      this: Assembler,
    ): Promise<spec.CollectionTypeReference> {
      const typeRef = type as ts.TypeReference;
      let elementtype: spec.TypeReference;

      if (typeRef.typeArguments?.length === 1) {
        elementtype = await this._typeReference(
          typeRef.typeArguments[0],
          declaration,
          'list element type',
        );
      } else {
        const count = typeRef.typeArguments
          ? typeRef.typeArguments.length
          : 'none';
        this._diagnostics.push(
          JsiiDiagnostic.JSII_1003_UNSUPPORTED_TYPE.create(
            declaration,
            `Array references must have exactly one type argument (found ${count})`,
          ),
        );
        elementtype = spec.CANONICAL_ANY;
      }

      return {
        collection: {
          elementtype,
          kind: spec.CollectionKind.Array,
        },
      };
    }

    async function _mapType(
      this: Assembler,
    ): Promise<spec.CollectionTypeReference> {
      let elementtype: spec.TypeReference;
      const objectType = type.getStringIndexType();
      if (objectType) {
        elementtype = await this._typeReference(
          objectType,
          declaration,
          'map element type',
        );
      } else {
        this._diagnostics.push(
          JsiiDiagnostic.JSII_1003_UNSUPPORTED_TYPE.create(
            declaration,
            'Only string-indexed map types are supported',
          ),
        );
        elementtype = spec.CANONICAL_ANY;
      }
      return {
        collection: {
          elementtype,
          kind: spec.CollectionKind.Map,
        },
      };
    }

    function _tryMakePrimitiveType(
      this: Assembler,
    ): spec.PrimitiveTypeReference | undefined {
      if (!type.symbol) {
        if (type.flags & ts.TypeFlags.Object) {
          return { primitive: spec.PrimitiveType.Json };
        }
        if (type.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
          return spec.CANONICAL_ANY;
        }
      } else if (
        type.symbol.valueDeclaration &&
        isUnder(
          type.symbol.valueDeclaration.getSourceFile().fileName,
          this.stdlib,
        )
      ) {
        switch (type.symbol.name) {
          case 'Boolean':
            return { primitive: spec.PrimitiveType.Boolean };
          case 'Date':
            return { primitive: spec.PrimitiveType.Date };
          case 'Number':
            return { primitive: spec.PrimitiveType.Number };
          case 'String':
            return { primitive: spec.PrimitiveType.String };
        }
      }
      // Not a primitive type!
      return undefined;
    }

    async function _unionType(this: Assembler): Promise<spec.OptionalValue> {
      const types = new Array<spec.TypeReference>();
      let optional: boolean | undefined;

      for (const subType of (type as ts.UnionType).types) {
        if (subType.flags & ts.TypeFlags.Undefined) {
          optional = true;
          continue;
        }
        // eslint-disable-next-line no-await-in-loop
        const resolvedType = await this._typeReference(
          subType,
          declaration,
          purpose,
        );
        if (types.find((ref) => deepEqual(ref, resolvedType)) != null) {
          continue;
        }
        types.push(resolvedType);
      }

      return types.length === 1
        ? { optional, type: types[0] }
        : { optional, type: { union: { types } } };
    }
  }

  private callDeferredsInOrder() {
    // Do a topological call order of all deferreds.
    while (this._deferred.length > 0) {
      // All fqns in dependency lists that don't have any pending
      // deferreds themselves can be executed now, so are removed from
      // dependency lists.
      const pendingFqns = new Set<string>(this._deferred.map((x) => x.fqn));
      for (const deferred of this._deferred) {
        restrictDependenciesTo(deferred, pendingFqns);
      }

      // Invoke all deferreds with no more dependencies and remove them from the list.
      let invoked = false;
      for (let i = 0; i < this._deferred.length; i++) {
        if (this._deferred[i].dependedFqns.length === 0) {
          const deferred = this._deferred.splice(i, 1)[0];
          deferred.cb();
          invoked = true;
        }
      }

      if (!invoked) {
        // Apparently we're stuck. Complain loudly.
        throw new Error(
          `Could not invoke any more deferreds, cyclic dependency? Remaining: ${JSON.stringify(
            this._deferred,
            undefined,
            2,
          )}`,
        );
      }
    }

    /**
     * Retain only elements in the dependencyfqn that are also in the set
     */
    function restrictDependenciesTo(def: DeferredRecord, fqns: Set<string>) {
      def.dependedFqns = def.dependedFqns.filter(fqns.has.bind(fqns));
    }
  }

  /**
   * Return the set of all (inherited) properties of an interface
   */
  private allProperties(root: spec.InterfaceType): Set<string> {
    const ret = new Set<string>();
    recurse.call(this, root);
    return ret;

    function recurse(this: Assembler, int: spec.InterfaceType) {
      for (const property of int.properties ?? []) {
        ret.add(property.name);
      }

      for (const baseRef of int.interfaces ?? []) {
        const base = this._dereference(baseRef, undefined);
        if (!base) {
          throw new Error(
            'Impossible to have unresolvable base in allProperties()',
          );
        }
        if (!spec.isInterfaceType(base)) {
          throw new Error(
            'Impossible to have non-interface base in allProperties()',
          );
        }

        recurse.call(this, base);
      }
    }
  }

  private _verifyConsecutiveOptionals(
    node: ts.Node,
    parameters?: spec.Parameter[],
  ) {
    if (!parameters) {
      return;
    }

    const remaining = [...parameters].reverse();
    while (remaining.length > 0) {
      const current = remaining.pop()!;
      if (current.optional) {
        const offender = remaining.find((p) => !p.optional && !p.variadic);
        if (offender == null) {
          continue;
        }
        this._diagnostics.push(
          JsiiDiagnostic.JSII_3009_OPTIONAL_PARAMETER_BEFORE_REQUIRED.create(
            node,
            current,
            offender,
          ),
        );
        delete current.optional;
      }
    }
  }

  /**
   * Updates the runtime type info with the fully-qualified name for the current class definition.
   * Used by the runtime type info injector to add this information to the compiled file.
   */
  private registerExportedClassFqn(clazz: ts.ClassDeclaration, fqn: string) {
    this.runtimeTypeInfoInjector.registerClassFqn(clazz, fqn);
  }

  /**
   * Return only those submodules from the submodules list that are submodules inside this
   * assembly.
   */
  private mySubmodules() {
    return Array.from(this._submodules.values()).filter((m) =>
      m.fqn.startsWith(`${this.projectInfo.name}.`),
    );
  }
}

export interface AssemblerOptions {
  /**
   * Whether to remove `@deprecated` members from the generated assembly.
   *
   * @default false
   */
  readonly stripDeprecated?: boolean;

  /**
   * If `stripDeprecated` is true, and a file is provided here, only the FQNs
   * present in the file will actually be removed. This can be useful when
   * you wish to deprecate some elements without actually removing them.
   *
   * @default undefined
   */
  readonly stripDeprecatedAllowListFile?: string;

  /**
   * Whether to inject code that warns when a deprecated element is used.
   *
   * @default false
   */
  readonly addDeprecationWarnings?: boolean;
}

interface SubmoduleSpec {
  /**
   * The submodule's fully qualified name.
   */
  readonly fqn: string;

  /**
   * The submodule's fully qualified name prefix to use when resolving type FQNs. This does not
   * include "inline namespace" names as those are already represented in the TypeCheckers' view of
   * the type names.
   */
  readonly fqnResolutionPrefix: string;

  /**
   * The location of the submodule definition in the source.
   */
  readonly locationInModule: spec.SourceLocation;

  /**
   * Symbol identifier of the root of the root file that represents this submodule
   */
  readonly symbolId?: string;

  /**
   * Any customized configuration for the currentl submodule.
   */
  readonly targets?: spec.AssemblyTargets;

  /**
   * Readme for this submodule (if found)
   */
  readonly readme?: spec.ReadMe;
}

function _fingerprint(assembly: spec.Assembly): spec.Assembly {
  delete assembly.fingerprint;
  assembly = sortJson(assembly);
  const fingerprint = crypto
    .createHash('sha256')
    .update(JSON.stringify(assembly))
    .digest('base64');
  return { ...assembly, fingerprint };
}

function _isAbstract(
  symbol: ts.Symbol,
  declaringType: spec.ClassType | spec.InterfaceType,
): boolean {
  // everything is abstract in interfaces
  if (declaringType.kind === spec.TypeKind.Interface) {
    return true;
  }

  return (
    !!symbol.valueDeclaration &&
    (ts.getCombinedModifierFlags(symbol.valueDeclaration) &
      ts.ModifierFlags.Abstract) !==
      0
  );
}

function _isEnumLike(type: ts.Type): type is ts.EnumType {
  return (type.flags & ts.TypeFlags.EnumLike) !== 0;
}

function _isExported(node: ts.Declaration): boolean {
  return (ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) !== 0;
}

/**
 * Members with names starting with `_` (and marked as @internal) and members
 * that are private are hidden.
 *
 * @param symbol the symbol which should be assessed
 *
 * @return `true` if the symbol should be hidden
 */
function _isPrivate(symbol: ts.Symbol): boolean {
  const TYPE_DECLARATION_KINDS = new Set([
    ts.SyntaxKind.ClassDeclaration,
    ts.SyntaxKind.InterfaceDeclaration,
    ts.SyntaxKind.EnumDeclaration,
  ]);

  // if the symbol doesn't have a value declaration, we are assuming it's a type (enum/interface/class)
  // and check that it has an "export" modifier
  if (
    !symbol.valueDeclaration ||
    TYPE_DECLARATION_KINDS.has(symbol.valueDeclaration.kind)
  ) {
    let hasExport = false;
    for (const decl of symbol.declarations) {
      if (ts.getCombinedModifierFlags(decl) & ts.ModifierFlags.Export) {
        hasExport = true;
        break;
      }
      // Handle nested classes from project references
      if (ts.isModuleBlock(decl.parent)) {
        const moduleDeclaration = decl.parent.parent;
        const modifiers = ts.getCombinedModifierFlags(moduleDeclaration);
        // The trick is the module is declared as ambient & exported
        if (
          (modifiers & ts.ModifierFlags.Ambient) !== 0 &&
          (modifiers & ts.ModifierFlags.Export) !== 0
        ) {
          hasExport = true;
          break;
        }
      }
    }
    return !hasExport;
  }

  return (
    symbol.valueDeclaration &&
    (ts.getCombinedModifierFlags(symbol.valueDeclaration) &
      ts.ModifierFlags.Private) !==
      0
  );
}

function _hasInternalJsDocTag(symbol: ts.Symbol) {
  return symbol.getJsDocTags().some((t: any) => t.name === 'internal');
}

function _isProtected(symbol: ts.Symbol): boolean {
  return (
    !!symbol.valueDeclaration &&
    (ts.getCombinedModifierFlags(symbol.valueDeclaration) &
      ts.ModifierFlags.Protected) !==
      0
  );
}

function _isStatic(symbol: ts.Symbol): boolean {
  return (
    !!symbol.valueDeclaration &&
    (ts.getCombinedModifierFlags(symbol.valueDeclaration) &
      ts.ModifierFlags.Static) !==
      0
  );
}

function _isVoid(type: ts.Type): boolean {
  return (type.flags & ts.TypeFlags.Void) !== 0;
}

function _isPromise(type: ts.Type): boolean {
  return type.symbol?.escapedName === 'Promise';
}

function _sortMembers(type: spec.ClassType): spec.ClassType;
function _sortMembers(type: spec.InterfaceType): spec.InterfaceType;
function _sortMembers(
  type: spec.ClassType | spec.InterfaceType,
): spec.ClassType | spec.InterfaceType {
  type.methods = type.methods && _sort(type.methods);
  type.properties = type.properties && _sort(type.properties);
  return type;

  /**
   * Sorts a member array such that:
   * 1. Static members appear first
   * 2. Immutable members appear first
   * 3. Non-optional members appear first
   * 4. Members appear in lexicographical order
   *
   * @param values the array of members to be sorted
   *
   * @return a sorted copy of ``values``
   */
  function _sort<T extends TypeMember>(values: T[]): T[] {
    if (!values) {
      return values;
    }
    return values.sort(_comparator);

    function _comparator(lval: T, rval: T): number {
      return _format(lval).localeCompare(_format(rval));

      function _format(val: T): string {
        return [
          val.static ? '0' : '1',
          val.immutable ? '0' : '1',
          !val.optional ? '0' : '1',
          val.name,
        ].join('|');
      }
    }
  }
  type TypeMember = {
    name?: string; // Methods & Properties
    static?: boolean; // Methods & Properties
    immutable?: boolean; //           Properties
    optional?: boolean; //           Properties
  };
}

/**
 * Deferred processing that needs to happen in a second, ordered pass
 */
interface DeferredRecord {
  /**
   * The FQN of the type the action will be executed on
   */
  fqn: string;

  /**
   * Dependency FQNs of the types that need to be processed before analysis.
   *
   * All deferred analysis actions for the types listed here must be complete
   * before this analysis action can run.
   */
  dependedFqns: string[];

  /**
   * Callback representing the action to run.
   */
  cb: () => void;
}

/**
 * Return the last element from a list
 */
function last<T>(xs: T[]): T | undefined {
  return xs.length > 0 ? xs[xs.length - 1] : undefined;
}

/**
 * Apply a function to a value if it's not equal to undefined
 */
function apply<T, U>(
  x: T | undefined,
  fn: (x: T) => U | undefined,
): U | undefined {
  return x !== undefined ? fn(x) : undefined;
}

/**
 * Return the intersection of two sets
 */
function intersection<T>(xs: Set<T>, ys: Set<T>): Set<T> {
  const ret = new Set<T>();
  for (const x of xs) {
    if (ys.has(x)) {
      ret.add(x);
    }
  }
  return ret;
}

/**
 * Return all members names of a JSII interface type
 *
 * Returns empty string for a non-interface type.
 */
function memberNames(jsiiType: spec.InterfaceType | spec.ClassType): string[] {
  return Object.keys(typeMembers(jsiiType)).filter((n) => n !== '');
}

function typeMembers(jsiiType: spec.InterfaceType | spec.ClassType): {
  [key: string]: spec.Property | spec.Method;
} {
  const ret: { [key: string]: spec.Property | spec.Method } = {};

  for (const prop of jsiiType.properties ?? []) {
    ret[prop.name] = prop;
  }

  for (const method of jsiiType.methods ?? []) {
    ret[method.name ?? ''] = method;
  }

  return ret;
}

/**
 * Whether or not the given name is conventionally an interface name
 *
 * It's an interface name if it starts with I and has another capital
 * (so we don't mark IonicColumnProps as an interface).
 */
function isInterfaceName(name: string) {
  return (
    name.length >= 2 &&
    name.startsWith('I') &&
    name.charAt(1).toUpperCase() === name.charAt(1)
  );
}

function getConstructor(type: ts.Type): ts.Symbol | undefined {
  return type.symbol.members?.get(ts.InternalSymbolName.Constructor);
}

function* intersect<T>(xs: Set<T>, ys: Set<T>) {
  for (const x of xs) {
    if (ys.has(x)) {
      yield x;
    }
  }
}

function noEmptyDict<T>(
  xs: Record<string, T> | undefined,
): Record<string, T> | undefined {
  if (xs == null || Object.keys(xs).length === 0) {
    return undefined;
  }
  return xs;
}

function toDependencyClosure(assemblies: readonly spec.Assembly[]): {
  [name: string]: spec.DependencyConfiguration;
} {
  const result: { [name: string]: spec.DependencyConfiguration } = {};
  for (const assembly of assemblies) {
    if (!assembly.targets) {
      continue;
    }
    result[assembly.name] = {
      submodules: cleanUp(assembly.submodules),
      targets: assembly.targets,
    };
  }
  return result;

  /**
   * Removes unneeded fields from the entries part of the `dependencyClosure`
   * property. Fields such as `readme` are not necessary and can bloat up the
   * assembly object.
   *
   * This removes the `readme` and `locationInModule` fields from the submodule
   * descriptios if present.
   *
   * @param submodules the submodules list to clean up.
   *
   * @returns the cleaned up submodules list.
   */
  function cleanUp(
    submodules: spec.Assembly['submodules'],
  ): spec.DependencyConfiguration['submodules'] {
    if (submodules == null) {
      return submodules;
    }
    const result: spec.DependencyConfiguration['submodules'] = {};
    for (const [fqn, { targets }] of Object.entries(submodules)) {
      result[fqn] = { targets };
    }
    return result;
  }
}

function toSubmoduleDeclarations(
  submodules: Iterable<SubmoduleSpec>,
): spec.Assembly['submodules'] {
  const result: spec.Assembly['submodules'] = {};

  for (const submodule of submodules) {
    result[submodule.fqn] = {
      locationInModule: submodule.locationInModule,
      targets: submodule.targets,
      readme: submodule.readme,
      symbolId: submodule.symbolId,
    };
  }

  return result;
}

/**
 * Check whether this type is the intrinsic TypeScript "error type"
 *
 * This type is returned if type lookup fails. Unfortunately no public
 * accessors for it are exposed.
 */
function isErrorType(t: ts.Type) {
  return (t as any).intrinsicName === 'error';
}

/**
 * Those have specific semantics in certain languages that don't always translate cleanly in others
 * (like how equals/hashCode are not a thing in Javascript, but carry meaning in Java and C#). The
 * `build` name is reserved for generated code (Java builders use that).
 */
const PROHIBITED_MEMBER_NAMES = ['build', 'equals', 'hashcode'];

/**
 * Whether the given name is prohibited
 */
function isProhibitedMemberName(name: string) {
  return PROHIBITED_MEMBER_NAMES.includes(name.toLowerCase());
}

/**
 * Information about the context in which a declaration is emitted.
 */
class EmitContext {
  public constructor(
    public readonly namespace: readonly string[],
    public readonly stability?: spec.Stability,
  ) {}

  /**
   * Create a new EmitContext by appending a namespace entry at the end.
   * @param element the new namespace entry.
   */
  public appendNamespace(element: string) {
    return new EmitContext([...this.namespace, element], this.stability);
  }

  /**
   * Create a new EmitContext by replacing the stability.
   * @param stability the new stability, if available.
   */
  public replaceStability(stability?: spec.Stability) {
    if (!stability) {
      return this;
    }
    return new EmitContext(this.namespace, stability);
  }

  /**
   * Create a new EmitContext without stability.
   */
  public removeStability() {
    return new EmitContext(this.namespace, undefined);
  }
}

async function flattenPromises<T>(promises: Array<Promise<T[]>>): Promise<T[]> {
  const result = new Array<T>();
  for (const subset of await Promise.all(promises)) {
    result.push(...subset);
  }
  return result;
}

function inferRootDir(program: ts.Program): string | undefined {
  const directories = program
    .getRootFileNames()
    .filter((fileName) => {
      const sourceFile = program.getSourceFile(fileName);
      return (
        sourceFile != null &&
        !program.isSourceFileFromExternalLibrary(sourceFile) &&
        !program.isSourceFileDefaultLibrary(sourceFile)
      );
    })
    .map((fileName) =>
      path.relative(program.getCurrentDirectory(), path.dirname(fileName)),
    )
    .map(segmentPath);

  const maxPrefix = Math.min(
    ...directories.map((segments) => segments.length - 1),
  );
  let commonIndex = -1;
  while (
    commonIndex < maxPrefix &&
    new Set(directories.map((segments) => segments[commonIndex + 1])).size === 1
  ) {
    commonIndex++;
  }

  if (commonIndex < 0) {
    return undefined;
  }

  return directories[0][commonIndex];

  function segmentPath(fileName: string): string[] {
    const result = new Array<string>();
    for (
      let parent = fileName;
      parent !== path.dirname(parent);
      parent = path.dirname(parent)
    ) {
      result.unshift(parent);
    }
    return result;
  }
}

/**
 * Determines whether the provided type is a single-valued enum. It is necessary
 * to check as enums are union-like in the type model, and single-valued enum
 * types are actually reduced to the only available literal, which can trip
 * the assembler.
 *
 * @param type        the type being checked.
 * @param typeChecker the type checker to use to get more information.
 *
 * @return `true` if `type` is a single-valued enum type.
 */
function isSingleValuedEnum(
  type: ts.Type,
  typeChecker: ts.TypeChecker,
): type is ts.EnumType {
  if (type.isLiteral() && _isEnumLike(type)) {
    // Single-Valued enums are reduced to the only literal available.
    return type === typeChecker.getBaseTypeOfLiteralType(type);
  }
  return false;
}

async function findPackageInfo(
  fromDir: string,
): Promise<PackageJson | undefined> {
  const filePath = path.join(fromDir, 'package.json');
  if (await fs.pathExists(filePath)) {
    return fs.readJson(filePath);
  }
  const parent = path.dirname(fromDir);
  if (parent === fromDir) {
    return undefined;
  }
  return findPackageInfo(parent);
}

/**
 * Checks is the provided type is "this" (as a type annotation).
 *
 * @param type        the validated type.
 * @param typeChecker the type checker.
 *
 * @returns `true` iif the type is `this`
 */
function _isThisType(type: ts.Type, typeChecker: ts.TypeChecker): boolean {
  return typeChecker.typeToTypeNode(type)?.kind === ts.SyntaxKind.ThisKeyword;
}

/**
 * Gets the name node for a given symbol; or it's first declaration if no name can be found. This is
 * intended for use in placing problem markers on the right location.
 *
 * @param symbol the symbol for which the name node is needed.
 *
 * @returns the name node for the symbol, or the symbol's first declaration.
 */
function _nameOrDeclarationNode(symbol: ts.Symbol): ts.Node {
  const declaration = symbol.valueDeclaration ?? symbol.declarations[0];
  return ts.getNameOfDeclaration(declaration) ?? declaration;
}

function _findHint(
  decl: ts.Declaration,
  hint: string,
): ts.JSDocTag | undefined {
  const [node] = ts.getAllJSDocTags(
    decl,
    (tag): tag is ts.JSDocTag => tag.tagName.text === hint,
  );
  return node;
}

/**
 * A location where a type can be used.
 */
type TypeUseKind =
  | 'base class'
  | 'base interface'
  | 'list element type'
  | 'map element type'
  | 'parameter type'
  | 'property type'
  | 'return type';

/**
 * Resolve a Type to Symbol, taking into account single-valued enums which have a bug
 *
 * Bug reference: https://github.com/microsoft/TypeScript/issues/46755
 */
function symbolFromType(type: ts.Type, typeChecker: ts.TypeChecker): ts.Symbol {
  if ((type.flags & ts.TypeFlags.EnumLiteral) === 0) {
    return type.symbol;
  }

  const decl = type.symbol.declarations?.[0];
  if (!decl) {
    return type.symbol;
  }

  if (!ts.isEnumMember(decl)) {
    return type.symbol;
  }

  const parentDecl = decl.parent;
  if (!parentDecl || !ts.isEnumDeclaration(parentDecl)) {
    return type.symbol;
  }

  const name = ts.getNameOfDeclaration(parentDecl);
  if (!name) {
    return type.symbol;
  }
  return typeChecker.getSymbolAtLocation(name) ?? type.symbol;
}

const SYMBOLID_CACHE = new WeakMap<spec.Assembly, Record<string, string>>();

/**
 * Build and return an index of { symbolId -> fqn }
 *
 * Uses a cache for performance reasons.
 */
function symbolIdIndex(asm: spec.Assembly): Record<string, string> {
  const existing = SYMBOLID_CACHE.get(asm);
  if (existing) {
    return existing;
  }

  const ret = buildIndex();
  SYMBOLID_CACHE.set(asm, ret);
  return ret;

  function buildIndex() {
    const ret: Record<string, string> = {};
    for (const [fqn, type] of Object.entries(asm.types ?? {})) {
      if (type.symbolId) {
        ret[type.symbolId] = fqn;
      }
    }
    return ret;
  }
}

function getSymbolFromDeclaration(
  decl: ts.Declaration,
  typeChecker: ts.TypeChecker,
): ts.Symbol | undefined {
  const name = ts.getNameOfDeclaration(decl);
  return name ? typeChecker.getSymbolAtLocation(name) : undefined;
}

function isUnder(file: string, dir: string): boolean {
  const relative = path.relative(dir, file);
  return !relative.startsWith(path.sep) && !relative.startsWith('..');
}

async function loadAndRenderReadme(readmePath: string, projectRoot: string) {
  if (!(await fs.pathExists(readmePath))) {
    return undefined;
  }

  return {
    markdown: (
      await literate.includeAndRenderExamples(
        await literate.loadFromFile(readmePath),
        literate.fileSystemLoader(path.dirname(readmePath)),
        projectRoot,
      )
    ).join('\n'),
  };
}
