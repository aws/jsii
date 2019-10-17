import colors = require('colors/safe');
import crypto = require('crypto');
import deepEqual = require('deep-equal');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import log4js = require('log4js');
import path = require('path');
import semver = require('semver');
import ts = require('typescript');
import { JSII_DIAGNOSTICS_CODE } from './compiler';
import { getReferencedDocParams, parseSymbolDocumentation } from './docs';
import { Diagnostic, EmitResult, Emitter } from './emitter';
import literate = require('./literate');
import { ProjectInfo } from './project-info';
import { isReservedName } from './reserved-words';
import { Validator } from './validator';
import { SHORT_VERSION, VERSION } from './version';

/* eslint-disable @typescript-eslint/no-var-requires */
const sortJson = require('sort-json');
/* eslint-enable @typescript-eslint/no-var-requires */

const LOG = log4js.getLogger('jsii/assembler');

/**
 * The JSII Assembler consumes a ``ts.Program`` instance and emits a JSII assembly.
 */
export class Assembler implements Emitter {
  private _diagnostics = new Array<Diagnostic>();
  private _deferred = new Array<DeferredRecord>();
  private _types: { [fqn: string]: spec.Type } = {};

  /**
   * @param projectInfo information about the package being assembled
   * @param program     the TypeScript program to be assembled from
   * @param stdlib      the directory where the TypeScript stdlib is rooted
   */
  public constructor(
    public readonly projectInfo: ProjectInfo,
    public readonly program: ts.Program,
    public readonly stdlib: string) { }

  private get _typeChecker(): ts.TypeChecker {
    return this.program.getTypeChecker();
  }

  /**
   * Attempt emitting the JSII assembly for the program.
   *
   * @return the result of the assembly emission.
   */
  public async emit(): Promise<EmitResult> {
    this._diagnostics = [];
    if (!this.projectInfo.description) {
      this._diagnostic(null,
        ts.DiagnosticCategory.Suggestion,
        'A "description" field should be specified in "package.json"');
    }
    if (!this.projectInfo.homepage) {
      this._diagnostic(null,
        ts.DiagnosticCategory.Suggestion,
        'A "homepage" field should be specified in "package.json"');
    }
    const readme = await _loadReadme.call(this);
    if (readme == null) {
      this._diagnostic(null,
        ts.DiagnosticCategory.Suggestion,
        'There is no "README.md" file. It is recommended to have one.');
    }
    const docs = _loadDocs.call(this);

    this._types = {};
    this._deferred = [];
    const mainFile = path.resolve(this.projectInfo.projectRoot, this.projectInfo.types.replace(/\.d\.ts(x?)$/, '.ts$1'));
    const visitPromises = new Array<Promise<any>>();
    for (const sourceFile of this.program.getSourceFiles().filter(f => !f.isDeclarationFile)) {
      if (sourceFile.fileName !== mainFile) { continue; }
      if (LOG.isTraceEnabled()) {
        LOG.trace(`Processing source file: ${colors.blue(path.relative(this.projectInfo.projectRoot, sourceFile.fileName))}`);
      }
      const symbol = this._typeChecker.getSymbolAtLocation(sourceFile);
      if (!symbol) { continue; }
      for (const node of this._typeChecker.getExportsOfModule(symbol)) {
        visitPromises.push(this._visitNode(node.declarations[0], new EmitContext([], this.projectInfo.stability)));
      }
    }
    await Promise.all(visitPromises);

    this.callDeferredsInOrder();

    // Skip emitting if any diagnostic message is an error
    if (this._diagnostics.find(diag => diag.category === ts.DiagnosticCategory.Error) != null) {
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

    const jsiiVersion = this.projectInfo.jsiiVersionFormat === 'short' ? SHORT_VERSION : VERSION;

    const assembly: spec.Assembly = {
      schema: spec.SchemaVersion.LATEST,
      name: this.projectInfo.name,
      version: this.projectInfo.version,
      description: this.projectInfo.description || this.projectInfo.name,
      license: this.projectInfo.license,
      homepage: this.projectInfo.homepage || this.projectInfo.repository.url,
      author: this.projectInfo.author,
      contributors: this.projectInfo.contributors && [...this.projectInfo.contributors],
      repository: this.projectInfo.repository,
      dependencies: this._toDependencies(this.projectInfo.dependencies),
      dependencyClosure: this._buildDependencyClosure(this.projectInfo.dependencies),
      bundled: this.projectInfo.bundleDependencies,
      types: this._types,
      targets: this.projectInfo.targets,
      metadata: this.projectInfo.metadata,
      docs,
      readme,
      jsiiVersion,
      fingerprint: '<TBD>',
    };

    const validator = new Validator(this.projectInfo, assembly);
    const validationResult = await validator.emit();
    if (!validationResult.emitSkipped) {
      const assemblyPath = path.join(this.projectInfo.projectRoot, '.jsii');
      LOG.trace(`Emitting assembly: ${colors.blue(assemblyPath)}`);
      await fs.writeJson(assemblyPath, _fingerprint(assembly), { encoding: 'utf8', spaces: 2 });
    }

    try {
      return {
        diagnostics: [...this._diagnostics, ...validationResult.diagnostics],
        emitSkipped: validationResult.emitSkipped
      };
    } finally {
      // Clearing ``this._types`` to allow contents to be garbage-collected.
      delete this._types;

      // Clearing ``this._diagnostics`` to allow contents to be garbage-collected.
      delete this._diagnostics;
    }

    async function _loadReadme(this: Assembler) {
      const readmePath = path.join(this.projectInfo.projectRoot, 'README.md');
      if (!await fs.pathExists(readmePath)) { return undefined; }
      const renderedLines = await literate.includeAndRenderExamples(
        await literate.loadFromFile(readmePath),
        literate.fileSystemLoader(this.projectInfo.projectRoot)
      );
      return { markdown: renderedLines.join('\n') };
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
    fqn: string, baseTypes: Array<string | spec.NamedTypeReference>,
    referencingNode: ts.Node, cb: (...xs: spec.Type[]) => void
  ) {
    // We can do this one eagerly
    if (baseTypes.length === 0) {
      cb();
      return;
    }
    const baseFqns = baseTypes.map(bt => typeof bt === 'string' ? bt : bt.fqn);

    this._defer(fqn, baseFqns, () => {
      const resolved = baseFqns.map(x => this._dereference(x, referencingNode)).filter(x => x !== undefined);
      if (resolved.length > 0) {
        cb(...resolved as spec.Type[]);
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
   * @param deps List of FQNs of types this callback depends on. All deferreds for all
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
  private _dereference(ref: string | spec.NamedTypeReference, referencingNode: ts.Node | null): spec.Type | undefined {
    if (typeof ref !== 'string') {
      ref = ref.fqn;
    }

    const [assm,] = ref.split('.');
    let type;
    if (assm === this.projectInfo.name) {
      type = this._types[ref];
    } else {
      const assembly = this.projectInfo.transitiveDependencies.find(dep => dep.name === assm);
      type = assembly && assembly.types && assembly.types[ref];

      // since we are exposing a type of this assembly in this module's public API,
      // we expect it to appear as a peer dependency instead of a normal dependency.
      if (assembly) {
        const asPeerDependency = this.projectInfo.peerDependencies.find(d => d.name === assembly.name);
        if (!asPeerDependency) {
          this._diagnostic(referencingNode, ts.DiagnosticCategory.Warning,
            `The type '${ref}' is exposed in the public API of this module. ` +
            `Therefore, the module '${assembly.name}' must also be defined under "peerDependencies". ` +
            'This will be auto-corrected unless --no-fix-peer-dependencies was specified.');
        }
      }
    }

    if (!type) {
      this._diagnostic(referencingNode, ts.DiagnosticCategory.Error,
        `Unable to resolve referenced type '${ref}'. Type may be @internal or unexported`);
    }

    return type;
  }

  private _diagnostic(node: ts.Node | null, category: ts.DiagnosticCategory, messageText: string) {
    this._diagnostics.push({
      domain: 'JSII',
      category,
      code: JSII_DIAGNOSTICS_CODE,
      messageText: `JSII: ${messageText}`,
      file: node != null ? node.getSourceFile() : undefined,
      start: node != null ? node.getStart() : undefined,
      length: node != null ? node.getEnd() - node.getStart() : undefined,
    });
  }

  /**
   * Compute the JSII fully qualified name corresponding to a ``ts.Type`` instance. If for any reason a name cannot be
   * computed for the type, a marker is returned instead, and an ``ts.DiagnosticCategory.Error`` diagnostic is
   * inserted in the assembler context.
   *
   * @param type the type for which a JSII fully qualified name is neede.
   *
   * @returns the FQN of the type, or some "unknown" marker.
   */
  private async _getFQN(type: ts.Type): Promise<string> {
    const tsName = this._typeChecker.getFullyQualifiedName(type.symbol);
    const groups = /^"([^"]+)"\.(.*)$/.exec(tsName);
    let node = type.symbol.valueDeclaration;
    if (!node && type.symbol.declarations.length > 0) { node = type.symbol.declarations[0]; }
    if (!groups) {
      this._diagnostic(node, ts.DiagnosticCategory.Error, `Cannot use private type ${tsName} in exported declarations`);
      return tsName;
    }
    const [, modulePath, typeName,] = groups;
    const pkg = await _findPackageInfo(modulePath);
    if (!pkg) {
      this._diagnostic(node, ts.DiagnosticCategory.Error, `Could not find module for ${modulePath}`);
      return `unknown.${typeName}`;
    }
    const fqn = `${pkg.name}.${typeName}`;
    if (pkg.name !== this.projectInfo.name && !this._dereference({ fqn }, type.symbol.valueDeclaration)) {
      this._diagnostic(node,
        ts.DiagnosticCategory.Error,
        `Use of foreign type not present in the ${pkg.name}'s assembly: ${fqn}`);
    }
    return fqn;

    async function _findPackageInfo(fromDir: string): Promise<any> {
      const filePath = path.join(fromDir, 'package.json');
      if (await fs.pathExists(filePath)) {
        return fs.readJson(filePath);
      }
      const parent = path.dirname(fromDir);
      if (parent === fromDir) { return undefined; }
      return _findPackageInfo(parent);
    }
  }

  /**
   * Register exported types in ``this.types``.
   *
   * @param node       a node found in a module
   * @param namePrefix the prefix for the types' namespaces
   */
  private async _visitNode(node: ts.Declaration, context: EmitContext): Promise<spec.Type[]> {
    if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) === 0) { return []; }

    let jsiiType: spec.Type | undefined;

    if (ts.isClassDeclaration(node) && _isExported(node)) {
      jsiiType = await this._visitClass(this._typeChecker.getTypeAtLocation(node), context);
    } else if (ts.isInterfaceDeclaration(node) && _isExported(node)) {
      jsiiType = await this._visitInterface(this._typeChecker.getTypeAtLocation(node), context);
    } else if (ts.isEnumDeclaration(node) && _isExported(node)) {
      jsiiType = await this._visitEnum(this._typeChecker.getTypeAtLocation(node), context);
    } else if (ts.isModuleDeclaration(node)) {
      const name = node.name.getText();
      const symbol = (node as any).symbol;

      if (LOG.isTraceEnabled()) { LOG.trace(`Entering namespace: ${colors.cyan([...context.namespace, name].join('.'))}`); }

      const allTypesPromises = new Array<Promise<spec.Type[]>>();
      for (const prop of this._typeChecker.getExportsOfModule(symbol)) {
        allTypesPromises.push(this._visitNode(prop.declarations[0], context.appendNamespace(node.name.getText())));
      }
      const allTypes = await flattenPromises(allTypesPromises);

      if (LOG.isTraceEnabled()) { LOG.trace(`Leaving namespace:  ${colors.cyan([...context.namespace, name].join('.'))}`); }
      return allTypes;
    } else {
      this._diagnostic(node, ts.DiagnosticCategory.Message, `Skipping ${ts.SyntaxKind[node.kind]} node`);
    }

    if (!jsiiType) { return []; }

    if (LOG.isInfoEnabled()) {
      LOG.info(`Registering JSII ${colors.magenta(jsiiType.kind)}: ${colors.green(jsiiType.fqn)}`);
    }
    this._types[jsiiType.fqn] = jsiiType;
    jsiiType.locationInModule = this.declarationLocation(node);

    const type = this._typeChecker.getTypeAtLocation(node);
    if (type.symbol.exports) {
      const nestedContext = context.appendNamespace(type.symbol.name);
      const visitedNodes = this._typeChecker.getExportsOfModule(type.symbol).filter(s => s.declarations)
        .map(exportedNode => this._visitNode(exportedNode.declarations[0], nestedContext));
      for (const nestedTypes of await Promise.all(visitedNodes)) {
        for (const nestedType of nestedTypes) {
          if (nestedType.namespace !== nestedContext.namespace.join('.')) {
            this._diagnostic(node,
              ts.DiagnosticCategory.Error,
              `All child names of a type '${jsiiType.fqn}' must point to concrete types, but '${nestedType.namespace}' is a namespaces, and this structure cannot be supported in all languages (e.g. Java)`);
          }
        }
      }
    }

    return [jsiiType];
  }

  private declarationLocation(node: ts.Declaration): spec.SourceLocation {
    const file = node.getSourceFile();
    const line = ts.getLineAndCharacterOfPosition(file, node.getStart()).line;
    return {
      filename: path.relative(this.projectInfo.projectRoot, file.fileName),
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

    const typeRefs = Array.from(baseInterfaces).map(async iface => {
      const decl = iface.symbol.valueDeclaration;
      const typeRef = await this._typeReference(iface, decl);
      return { decl, typeRef };
    });
    for (const { decl, typeRef } of await Promise.all(typeRefs)) {
      if (!spec.isNamedTypeReference(typeRef)) {
        this._diagnostic(decl,
          ts.DiagnosticCategory.Error,
          `Interface of ${fqn} is not a named type (${spec.describeTypeReference(typeRef)})`);
        continue;
      }

      this._deferUntilTypesAvailable(fqn, [typeRef], decl, (deref) => {
        if (!spec.isInterfaceType(deref)) {
          this._diagnostic(decl,
            ts.DiagnosticCategory.Error,
            `Inheritance clause of ${fqn} uses ${spec.describeTypeReference(typeRef)} as an interface`);
        }
      });

      result.push(typeRef);
    }

    return { interfaces: result.length === 0 ? undefined : result, erasedBases };
  }

  private async _visitClass(type: ts.Type, ctx: EmitContext): Promise<spec.ClassType | undefined> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing class: ${colors.gray(ctx.namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
    }

    if (_hasInternalJsDocTag(type.symbol)) {
      return undefined;
    }

    this._warnAboutReservedWords(type.symbol);

    const fqn = `${[this.projectInfo.name, ...ctx.namespace].join('.')}.${type.symbol.name}`;

    const jsiiType: spec.ClassType = {
      assembly: this.projectInfo.name,
      fqn,
      kind: spec.TypeKind.Class,
      name: type.symbol.name,
      namespace: ctx.namespace.length > 0 ? ctx.namespace.join('.') : undefined,
      docs: this._visitDocumentation(type.symbol, ctx),
    };

    if (_isAbstract(type.symbol, jsiiType)) {
      jsiiType.abstract = true;
    }

    const erasedBases = new Array<ts.BaseType>();
    for (let base of type.getBaseTypes() || []) {
      if (jsiiType.base) {
        this._diagnostic(base.symbol.valueDeclaration, ts.DiagnosticCategory.Error, `Found multiple base types for ${jsiiType.fqn}`);
        continue;
      }

      //
      // base classes ("extends foo")

      // Crawl up the inheritance tree if the current base type is not exported, so we identify the type(s) to be
      // erased, and identify the closest exported base class, should there be one.
      while (base && this._isPrivateOrInternal(base.symbol)) {
        LOG.debug(`Base class of ${colors.green(jsiiType.fqn)} named ${colors.green(base.symbol.name)} is not exported, erasing it...`);
        erasedBases.push(base);
        base = (base.getBaseTypes() || [])[0];
      }
      if (!base) {
        // There is no exported base class to be found, pretend this class has no base class.
        continue;
      }

      /* eslint-disable no-await-in-loop */
      const ref = await this._typeReference(base, type.symbol.valueDeclaration);
      /* eslint-enable no-await-in-loop */

      if (!spec.isNamedTypeReference(ref)) {
        this._diagnostic(base.symbol.valueDeclaration,
          ts.DiagnosticCategory.Error,
          `Base type of ${jsiiType.fqn} is not a named type (${spec.describeTypeReference(ref)})`);
        continue;
      }
      this._deferUntilTypesAvailable(fqn, [ref], base.symbol.valueDeclaration, (deref) => {
        if (!spec.isClassType(deref)) {
          this._diagnostic(base.symbol.valueDeclaration,
            ts.DiagnosticCategory.Error,
            `Base type of ${jsiiType.fqn} is not a class (${spec.describeTypeReference(ref)})`);
        }
      });
      jsiiType.base = ref.fqn;
    }

    //
    // base interfaces ("implements foo")

    // collect all "implements" declarations from the current type and all
    // erased base types (because otherwise we lose them, see jsii#487)
    const implementsClauses = new Array<ts.HeritageClause>();
    for (const heritage of [type, ...erasedBases].map(t => (t.symbol.valueDeclaration as ts.ClassDeclaration).heritageClauses || [])) {
      for (const clause of heritage) {
        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
          // Handled by `getBaseTypes`
          continue;
        } else if (clause.token !== ts.SyntaxKind.ImplementsKeyword) {
          this._diagnostic(clause, ts.DiagnosticCategory.Error, `Ignoring ${ts.SyntaxKind[clause.token]} heritage clause`);
          continue;
        }

        implementsClauses.push(clause);
      }
    }

    // process all "implements" clauses
    const allInterfaces = new Set<string>();
    const baseInterfaces = implementsClauses.map(clause => this._processBaseInterfaces(fqn, clause.types.map(t => this._getTypeFromTypeNode(t))));
    for (const { interfaces } of await Promise.all(baseInterfaces)) {
      for (const ifc of interfaces || []) {
        allInterfaces.add(ifc.fqn);
      }
      if (interfaces) {
        this._deferUntilTypesAvailable(jsiiType.fqn, interfaces, type.symbol.valueDeclaration, (...ifaces) => {
          for (const iface of ifaces) {
            if (spec.isInterfaceType(iface) && iface.datatype) {
              this._diagnostic(type.symbol.valueDeclaration,
                ts.DiagnosticCategory.Error,
                `Attempted to implement struct ${iface.fqn} from class ${jsiiType.fqn}`);
            }
          }
        });
      }
    }

    if (allInterfaces.size > 0) {
      jsiiType.interfaces = Array.from(allInterfaces);
    }

    if (!type.isClass()) {
      throw new Error('Oh no');
    }

    const allDeclarations: Array<{ decl: ts.Declaration, type: ts.InterfaceType | ts.BaseType }>
      = type.symbol.declarations.map(decl => ({ decl, type }));

    // Considering erased bases' declarations, too, so they are "blended in"
    for (const base of erasedBases) {
      allDeclarations.push(...base.symbol.declarations.map(decl => ({ decl, type: base })));
    }

    for (const { decl, type: declaringType } of allDeclarations) {
      const classDecl = decl as ts.ClassDeclaration | ts.InterfaceDeclaration;
      if (!classDecl.members) { continue; }

      for (const memberDecl of classDecl.members) {
        const member: ts.Symbol = (memberDecl as any).symbol;

        if (!(declaringType.symbol.getDeclarations() || []).find(d => d === memberDecl.parent)) {
          continue;
        }

        if (this._isPrivateOrInternal(member, memberDecl)) {
          continue;
        }

        // constructors are handled later
        if (ts.isConstructorDeclaration(memberDecl)) {
          continue;
        }

        /* eslint-disable no-await-in-loop */
        if (ts.isMethodDeclaration(memberDecl) || ts.isMethodSignature(memberDecl)) {
          await this._visitMethod(member, jsiiType, ctx.replaceStability(jsiiType.docs && jsiiType.docs.stability));
        } else if (ts.isPropertyDeclaration(memberDecl)
          || ts.isPropertySignature(memberDecl)
          || ts.isAccessor(memberDecl)) {
          await this._visitProperty(member, jsiiType, ctx.replaceStability(jsiiType.docs && jsiiType.docs.stability));
        } else {
          this._diagnostic(memberDecl,
            ts.DiagnosticCategory.Warning,
            `Ignoring un-handled ${ts.SyntaxKind[memberDecl.kind]} member`);
        }
        /* eslint-enable no-await-in-loop */
      }
    }

    const memberEmitContext = ctx.replaceStability(jsiiType.docs && jsiiType.docs.stability);

    // Find the first defined constructor in this class, or it's erased bases
    const constructor = [type, ...erasedBases].map(getConstructor).find(ctor => ctor != null);
    const ctorDeclaration = constructor && (constructor.declarations[0] as ts.ConstructorDeclaration);
    if (constructor && ctorDeclaration) {
      const signature = this._typeChecker.getSignatureFromDeclaration(ctorDeclaration);

      if ((ts.getCombinedModifierFlags(ctorDeclaration) & ts.ModifierFlags.Private) === 0) {
        jsiiType.initializer = {};
        if (signature) {
          for (const param of signature.getParameters()) {
            jsiiType.initializer.parameters = jsiiType.initializer.parameters || [];
            /* eslint-disable no-await-in-loop */
            jsiiType.initializer.parameters.push(await this._toParameter(param, ctx.replaceStability(jsiiType.docs && jsiiType.docs.stability)));
            /* eslint-enable no-await-in-loop */
            jsiiType.initializer.variadic =
              (jsiiType.initializer.parameters && jsiiType.initializer.parameters.some(p => !!p.variadic))
              || undefined;
          }
        }
        this._verifyConsecutiveOptionals(ctorDeclaration, jsiiType.initializer.parameters);
        jsiiType.initializer.docs = this._visitDocumentation(constructor, memberEmitContext);
      }

      // Process constructor-based property declarations even if constructor is private
      if (signature) {
        for (const param of signature.getParameters()) {
          if (ts.isParameterPropertyDeclaration(param.valueDeclaration, param.valueDeclaration.parent) && !this._isPrivateOrInternal(param)) {
            /* eslint-disable no-await-in-loop */
            await this._visitProperty(param, jsiiType, memberEmitContext);
            /* eslint-enable no-await-in-loop */
          }
        }
      }
    } else if (jsiiType.base) {
      this._deferUntilTypesAvailable(fqn, [jsiiType.base], type.symbol.valueDeclaration, (baseType) => {
        if (spec.isClassType(baseType)) {
          jsiiType.initializer = baseType.initializer;
        } else {
          this._diagnostic(type.symbol.valueDeclaration,
            ts.DiagnosticCategory.Error,
            `Base type of ${jsiiType.fqn} (${jsiiType.base}) is not a class`);
        }
      });
    } else {
      jsiiType.initializer = {};
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
      throw new Error(`Unable to resolve type: ${t.getFullText()}. This typically happens if something is wrong with your dependency closure.`);
    }
    return type;
  }

  /**
   * Check that this class doesn't declare any members that are of different staticness in itself or any of its bases
   */
  private _verifyNoStaticMixing(klass: spec.ClassType, decl: ts.Declaration) {
    function stat(s?: boolean) {
      return s ? 'static' : 'non-static';
    }

    // Check class itself--may have two methods/props with the same name, so check the arrays
    const statics = new Set((klass.methods || []).concat(klass.properties || []).filter(x => x.static).map(x => x.name));
    const nonStatics = new Set((klass.methods || []).concat(klass.properties || []).filter(x => !x.static).map(x => x.name));
    // Intersect
    for (const member of intersect(statics, nonStatics)) {
      this._diagnostic(decl, ts.DiagnosticCategory.Error,
        `member '${member}' of class '${klass.name}' cannot be declared both statically and non-statically`);
    }

    // Check against base classes. They will not contain duplicate member names so we can load
    // the members into a map.
    const classMembers = typeMembers(klass);
    this._withBaseClass(klass, decl, (base, recurse) => {
      for (const [name, baseMember] of Object.entries(typeMembers(base))) {
        const member = classMembers[name];
        if (!member) { continue; }

        if (!!baseMember.static !== !!member.static) {
          this._diagnostic(decl, ts.DiagnosticCategory.Error,
            `${stat(member.static)} member '${name}' of class '${klass.name}' conflicts with ${stat(baseMember.static)} member in ancestor '${base.name}'`);
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
  private _withBaseClass(klass: spec.ClassType, decl: ts.Declaration, cb: (base: spec.ClassType, recurse: () => void) => void) {
    if (klass.base) {
      this._deferUntilTypesAvailable(klass.fqn, [klass.base], decl, (base) => {
        if (!spec.isClassType(base)) { throw new Error('Oh no'); }
        cb(base, () => this._withBaseClass(base, decl, cb));
      });
    }
  }

  /**
   * @returns true if this member is internal and should be omitted from the type manifest
   */
  private _isPrivateOrInternal(symbol: ts.Symbol, validateDeclaration?: ts.Declaration): boolean {
    const hasInternalJsDocTag = _hasInternalJsDocTag(symbol);
    const hasUnderscorePrefix = symbol.name !== '__constructor' && symbol.name.startsWith('_');

    if (_isPrivate(symbol)) {
      LOG.trace(`${colors.cyan(symbol.name)} is marked "private", or is an unexported type declaration`);
      return true;
    }

    if (!hasInternalJsDocTag && !hasUnderscorePrefix) {
      return false;
    }

    // we only validate if we have a declaration
    if (validateDeclaration) {
      if (!hasUnderscorePrefix) {
        this._diagnostic(validateDeclaration, ts.DiagnosticCategory.Error,
          `${colors.cyan(symbol.name)}: the name of members marked as @internal must begin with an underscore`);
      }

      if (!hasInternalJsDocTag) {
        this._diagnostic(validateDeclaration, ts.DiagnosticCategory.Error,
          `${colors.cyan(symbol.name)}: members with names that begin with an underscore must be marked as @internal via a JSDoc tag`);
      }
    }

    return true;
  }

  private async _visitEnum(type: ts.Type, ctx: EmitContext): Promise<spec.EnumType | undefined> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing enum: ${colors.gray(ctx.namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
    }

    // Forcefully resolving to the EnumDeclaration symbol for single-valued enums
    const symbol: ts.Symbol = type.isLiteral() ? (type.symbol as any).parent : type.symbol;
    if (!symbol) {
      throw new Error(`Unable to resolve enum declaration for ${type.symbol.name}!`);
    }

    if (_hasInternalJsDocTag(symbol)) {
      return Promise.resolve(undefined);
    }

    this._warnAboutReservedWords(type.symbol);

    const decl = symbol.valueDeclaration;
    const flags = ts.getCombinedModifierFlags(decl);
    if (flags & ts.ModifierFlags.Const) {
      this._diagnostic(decl,
        ts.DiagnosticCategory.Error,
        "Exported enum cannot be declared 'const'");
    }

    const docs = this._visitDocumentation(symbol, ctx);

    const typeContext = ctx.replaceStability(docs && docs.stability);
    const members = type.isUnion() ? type.types : [type];

    const jsiiType: spec.EnumType = {
      assembly: this.projectInfo.name,
      fqn: `${[this.projectInfo.name, ...ctx.namespace].join('.')}.${symbol.name}`,
      kind: spec.TypeKind.Enum,
      members: members.map(m => ({
        name: m.symbol.name,
        docs: this._visitDocumentation(m.symbol, typeContext),
      })),
      name: symbol.name,
      namespace: ctx.namespace.length > 0 ? ctx.namespace.join('.') : undefined,
      docs
    };

    return Promise.resolve(jsiiType);
  }

  /**
   * Return docs for a symbol
   */
  private _visitDocumentation(sym: ts.Symbol, context: EmitContext): spec.Docs | undefined {
    const result = parseSymbolDocumentation(sym, this._typeChecker);

    for (const diag of result.diagnostics || []) {
      this._diagnostic(sym.declarations[0],
        ts.DiagnosticCategory.Error,
        diag
      );
    }

    // Apply the current context's stability if none was specified locally.
    if (result.docs.stability == null) {
      result.docs.stability = context.stability;
    }

    const allUndefined = Object.values(result.docs).every(v => v === undefined);
    return !allUndefined ? result.docs : undefined;
  }

  /**
   * Check that all parameters the doc block refers to with a @param declaration actually exist
   */
  private _validateReferencedDocParams(method: spec.Method, methodSym: ts.Symbol) {
    const params = getReferencedDocParams(methodSym);
    const actualNames = new Set((method.parameters || []).map(p => p.name));
    for (const param of params) {
      if (!actualNames.has(param)) {
        this._diagnostic(methodSym.valueDeclaration, ts.DiagnosticCategory.Warning,
          `In doc block of '${method.name}', '@param ${param}' refers to a nonexistent parameter.`);
      }
    }
  }

  private async _visitInterface(type: ts.Type, ctx: EmitContext): Promise<spec.InterfaceType | undefined> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing interface: ${colors.gray(ctx.namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
    }

    if (_hasInternalJsDocTag(type.symbol)) {
      return undefined;
    }

    this._warnAboutReservedWords(type.symbol);

    const fqn = `${[this.projectInfo.name, ...ctx.namespace].join('.')}.${type.symbol.name}`;

    const jsiiType: spec.InterfaceType = {
      assembly: this.projectInfo.name,
      fqn,
      kind: spec.TypeKind.Interface,
      name: type.symbol.name,
      namespace: ctx.namespace.length > 0 ? ctx.namespace.join('.') : undefined,
      docs: this._visitDocumentation(type.symbol, ctx),
    };

    const { interfaces, erasedBases } = await this._processBaseInterfaces(fqn, type.getBaseTypes());
    jsiiType.interfaces = apply(interfaces, arr => arr.map(i => i.fqn));

    for (const declaringType of [type, ...erasedBases]) {
      for (const member of declaringType.getProperties()) {
        if (!(declaringType.symbol.getDeclarations() || []).find(decl => decl === member.valueDeclaration.parent)) { continue; }

        if (this._isPrivateOrInternal(member, member.valueDeclaration)) {
          continue;
        }

        /* eslint-disable no-await-in-loop */
        if (ts.isMethodDeclaration(member.valueDeclaration) || ts.isMethodSignature(member.valueDeclaration)) {
          await this._visitMethod(member, jsiiType, ctx.replaceStability(jsiiType.docs && jsiiType.docs.stability));
        } else if (ts.isPropertyDeclaration(member.valueDeclaration)
          || ts.isPropertySignature(member.valueDeclaration)
          || ts.isAccessor(member.valueDeclaration)) {
          await this._visitProperty(member, jsiiType, ctx.replaceStability(jsiiType.docs && jsiiType.docs.stability));
        } else {
          this._diagnostic(member.valueDeclaration,
            ts.DiagnosticCategory.Warning,
            `Ignoring un-handled ${ts.SyntaxKind[member.valueDeclaration.kind]} member`);
        }
        /* eslint-enable no-await-in-loop */
      }
    }

    // Calculate datatype based on the datatypeness of this interface and all of its parents
    // To keep the spec minimal the actual values of the attribute are "true" or "undefined" (to represent "false").
    this._deferUntilTypesAvailable(fqn, jsiiType.interfaces || [], type.symbol.valueDeclaration, (...bases: spec.Type[]) => {
      if ((jsiiType.methods || []).length === 0) {
        jsiiType.datatype = true;
      }

      for (const base of bases) {
        if (spec.isInterfaceType(base) && !base.datatype) {
          jsiiType.datatype = undefined;
        }
      }

      const interfaceName = isInterfaceName(jsiiType.name);

      // If it's not a datatype the name must start with an "I".
      if (!jsiiType.datatype && !interfaceName) {
        this._diagnostic(type.symbol.declarations[0],
          ts.DiagnosticCategory.Error,
          `Interface contains behavior: name should be "I${jsiiType.name}"`);
      }

      // If the name starts with an "I" it is not intended as a datatype, so switch that off.
      if (jsiiType.datatype && interfaceName) {
        jsiiType.datatype = undefined;
      }

      // Okay, this is a data type, check that all properties are readonly
      if (jsiiType.datatype) {
        for (const prop of jsiiType.properties || []) {
          if (!prop.immutable) {
            const p = type.getProperty(prop.name)!;
            this._diagnostic(p.valueDeclaration,
              ts.DiagnosticCategory.Error,
              `The property '${prop.name}' in data type '${jsiiType.name}' must be 'readonly' since data is passed by-value`);

            // force property to be "readonly" since jsii languages will pass this by-value
            prop.immutable = true;
          }
        }
      } else {
        // This is *NOT* a data type, so it may not extend something that is one.
        for (const base of bases) {
          if (!spec.isInterfaceType(base)) {
            // Invalid type we already warned about earlier, just ignoring it here...
            continue;
          }
          if (base.datatype) {
            this._diagnostic(type.symbol.valueDeclaration,
              ts.DiagnosticCategory.Error,
              `Attempted to extend struct ${base.fqn} from regular interface ${jsiiType.fqn}`);
          }
        }
      }
    });

    // Check that no interface declares a member that's already declared
    // in a base type (not allowed in C#).
    const names = memberNames(jsiiType);
    const checkNoIntersection = (...bases: spec.Type[]) => {
      for (const base of bases) {
        if (!spec.isInterfaceType(base)) { continue; }

        const baseMembers = memberNames(base);
        for (const memberName of names) {
          if (baseMembers.includes(memberName)) {
            this._diagnostic(type.symbol.declarations[0],
              ts.DiagnosticCategory.Error,
              `Interface declares same member as inherited interface: ${memberName}`);
          }
        }
        // Recurse upwards
        this._deferUntilTypesAvailable(fqn, base.interfaces || [], type.symbol.valueDeclaration, checkNoIntersection);
      }
    };
    this._deferUntilTypesAvailable(fqn, jsiiType.interfaces || [], type.symbol.valueDeclaration, checkNoIntersection);

    return _sortMembers(jsiiType);
  }

  private async _visitMethod(symbol: ts.Symbol, type: spec.ClassType | spec.InterfaceType, ctx: EmitContext) {
    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing method: ${colors.green(type.fqn)}#${colors.cyan(symbol.name)}`);
    }

    const declaration = symbol.valueDeclaration as (ts.MethodDeclaration | ts.MethodSignature);
    const signature = this._typeChecker.getSignatureFromDeclaration(declaration);
    if (!signature) {
      this._diagnostic(declaration, ts.DiagnosticCategory.Error, `Unable to compute signature for ${type.fqn}#${symbol.name}`);
      return;
    }
    if (isProhibitedMemberName(symbol.name)) {
      this._diagnostic(declaration, ts.DiagnosticCategory.Error, `Prohibited member name: ${symbol.name}`);
      return;
    }
    this._warnAboutReservedWords(symbol);

    const parameters = await Promise.all(signature.getParameters().map(p => this._toParameter(p, ctx)));

    const returnType = signature.getReturnType();
    const method: spec.Method = {
      abstract: _isAbstract(symbol, type) || undefined,
      name: symbol.name,
      parameters: parameters.length > 0 ? parameters : undefined,
      protected: _isProtected(symbol) || undefined,
      returns: _isVoid(returnType) ? undefined : await this._optionalValue(returnType, declaration),
      async: _isPromise(returnType) || undefined,
      static: _isStatic(symbol) || undefined,
      locationInModule: this.declarationLocation(declaration),
    };
    method.variadic = (method.parameters && method.parameters.some(p => !!p.variadic)) || undefined;

    this._verifyConsecutiveOptionals(declaration, method.parameters);

    method.docs = this._visitDocumentation(symbol, ctx);

    // If the last parameter is a datatype, verify that it does not share any field names with
    // other function arguments, so that it can be turned into keyword arguments by jsii frontends
    // that support such.
    const lastParamTypeRef = apply(last(parameters), x => x.type);
    const lastParamSymbol = last(signature.getParameters());
    if (lastParamTypeRef && spec.isNamedTypeReference(lastParamTypeRef)) {
      this._deferUntilTypesAvailable(symbol.name, [lastParamTypeRef], lastParamSymbol!.declarations[0], (lastParamType) => {
        if (!spec.isInterfaceType(lastParamType) || !lastParamType.datatype) { return; }

        // Liftable datatype, make sure no parameter names match any of the properties in the datatype
        const propNames = this.allProperties(lastParamType);
        const paramNames = new Set(parameters.slice(0, parameters.length - 1).map(x => x.name));
        const sharedNames = intersection(propNames, paramNames);

        if (sharedNames.size > 0) {
          this._diagnostic(
            declaration,
            ts.DiagnosticCategory.Error,
            `Name occurs in both function arguments and in datatype properties, rename one: ${Array.from(sharedNames).join(', ')}`);
        }
      });
    }

    this._validateReferencedDocParams(method, symbol);

    type.methods = type.methods || [];
    if (type.methods.find(m => m.name === method.name && m.static === method.static) != null) {
      LOG.trace(`Dropping re-declaration of ${colors.green(type.fqn)}#${colors.cyan(method.name)}`);
      return;
    }
    type.methods.push(method);
  }

  private _warnAboutReservedWords(symbol: ts.Symbol) {
    const reservingLanguages = isReservedName(symbol.name);
    if (reservingLanguages) {
      this._diagnostic(ts.getNameOfDeclaration(symbol.valueDeclaration) || symbol.valueDeclaration,
        ts.DiagnosticCategory.Warning,
        `'${symbol.name}' is a reserved word in ${reservingLanguages.join(', ')}. Using this name may cause problems `
        + 'when generating language bindings. Consider using a different name.');
    }
  }

  private async _visitProperty(symbol: ts.Symbol, type: spec.ClassType | spec.InterfaceType, ctx: EmitContext) {
    if (type.properties && type.properties.find(p => p.name === symbol.name)) {
      /*
       * Second declaration of the same property. For example, if code specifies a getter & setter signature,
       * there will be one pass for each of the signatures, but we can process only the first encountered. The
       * typescript compiler will take care of making sure we don't have conflicting declarations, anyway.
       */
      return;
    }

    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing property: ${colors.green(type.fqn)}#${colors.cyan(symbol.name)}`);
    }
    if (isProhibitedMemberName(symbol.name)) {
      this._diagnostic(symbol.valueDeclaration, ts.DiagnosticCategory.Error, `Prohibited member name: ${symbol.name}`);
      return;
    }

    this._warnAboutReservedWords(symbol);

    const signature = symbol.valueDeclaration as (ts.PropertySignature
    | ts.PropertyDeclaration
    | ts.AccessorDeclaration
    | ts.ParameterPropertyDeclaration);
    const property: spec.Property = {
      ...await this._optionalValue(this._typeChecker.getTypeOfSymbolAtLocation(symbol, signature), signature),
      abstract: _isAbstract(symbol, type) || undefined,
      name: symbol.name,
      protected: _isProtected(symbol) || undefined,
      static: _isStatic(symbol) || undefined,
      locationInModule: this.declarationLocation(signature),
    };

    if (ts.isGetAccessor(signature)) {
      const decls = symbol.getDeclarations() || [];
      property.immutable = !decls.some(decl => ts.isSetAccessor(decl)) || undefined;
    } else {
      property.immutable = ((ts.getCombinedModifierFlags(signature) & ts.ModifierFlags.Readonly) !== 0) || undefined;
    }

    if (signature.questionToken) {
      property.optional = true;
    }

    if (property.static && property.immutable && ts.isPropertyDeclaration(signature) && signature.initializer) {
      property.const = true;
    }

    property.docs = this._visitDocumentation(symbol, ctx);

    type.properties = type.properties || [];
    if (type.properties.find(prop => prop.name === property.name && prop.static === property.static) != null) {
      LOG.trace(`Dropping re-declaration of ${colors.green(type.fqn)}#${colors.cyan(property.name)}`);
      return;
    }
    type.properties.push(property);
  }

  private async _toParameter(paramSymbol: ts.Symbol, ctx: EmitContext): Promise<spec.Parameter> {
    if (LOG.isTraceEnabled()) {
      LOG.trace(`Processing parameter: ${colors.cyan(paramSymbol.name)}`);
    }
    const paramDeclaration = paramSymbol.valueDeclaration as ts.ParameterDeclaration;

    this._warnAboutReservedWords(paramSymbol);

    const parameter: spec.Parameter = {
      ...await this._optionalValue(this._typeChecker.getTypeAtLocation(paramSymbol.valueDeclaration), paramSymbol.valueDeclaration),
      name: paramSymbol.name,
      variadic: paramDeclaration.dotDotDotToken && true,
    };

    if (parameter.variadic && spec.isCollectionTypeReference(parameter.type)) {
      // TypeScript types variadic parameters as an array, but JSII uses the item-type instead.
      parameter.type = parameter.type.collection.elementtype;
    } else if (paramDeclaration.initializer || paramDeclaration.questionToken) {
      // Optional parameters have an inherently null-able type.
      parameter.optional = true;
    }

    parameter.docs = this._visitDocumentation(paramSymbol, ctx.removeStability()); // No inheritance on purpose

    return parameter;
  }

  private async _typeReference(type: ts.Type, declaration: ts.Declaration): Promise<spec.TypeReference> {
    const optionalValue = await this._optionalValue(type, declaration);
    if (optionalValue.optional) {
      this._diagnostic(declaration,
        ts.DiagnosticCategory.Error,
        'Encountered optional value in location where a plan type reference is expected');
    }
    return optionalValue.type;
  }

  private async _optionalValue(type: ts.Type, declaration: ts.Declaration): Promise<spec.OptionalValue> {
    if (type.isLiteral() && _isEnumLike(type)) {
      type = this._typeChecker.getBaseTypeOfLiteralType(type);
    } else {
      type = this._typeChecker.getApparentType(type);
    }

    const primitiveType = _tryMakePrimitiveType.call(this);
    if (primitiveType) { return { type: primitiveType }; }

    if (type.isUnion() && !_isEnumLike(type)) {
      return _unionType.call(this);
    }

    if (!type.symbol) {
      this._diagnostic(declaration, ts.DiagnosticCategory.Error, 'Non-primitive types must have a symbol');
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
        this._diagnostic(declaration,
          ts.DiagnosticCategory.Error,
          'Un-specified promise type (need to specify as Promise<T>)');
        return { type: spec.CANONICAL_ANY };
      }
      return { type: await this._typeReference(typeRef.typeArguments[0], declaration) };

    }

    return { type: { fqn: await this._getFQN(type) } };

    async function _arrayType(this: Assembler): Promise<spec.CollectionTypeReference> {
      const typeRef = type as ts.TypeReference;
      let elementtype: spec.TypeReference;

      if (typeRef.typeArguments && typeRef.typeArguments.length === 1) {
        elementtype = await this._typeReference(typeRef.typeArguments[0], declaration);
      } else {
        const count = typeRef.typeArguments ? typeRef.typeArguments.length : 'none';
        this._diagnostic(declaration,
          ts.DiagnosticCategory.Error,
          `Array references must have exactly one type argument (found ${count})`);
        elementtype = spec.CANONICAL_ANY;
      }

      return {
        collection: {
          elementtype,
          kind: spec.CollectionKind.Array
        }
      };
    }

    async function _mapType(this: Assembler): Promise<spec.CollectionTypeReference> {
      let elementtype: spec.TypeReference;
      const objectType = type.getStringIndexType();
      if (objectType) {
        elementtype = await this._typeReference(objectType, declaration);
      } else {
        this._diagnostic(declaration,
          ts.DiagnosticCategory.Error,
          'Only string index maps are supported');
        elementtype = spec.CANONICAL_ANY;
      }
      return {
        collection: {
          elementtype,
          kind: spec.CollectionKind.Map
        }
      };
    }

    function _tryMakePrimitiveType(this: Assembler): spec.PrimitiveTypeReference | undefined {
      if (!type.symbol) {
        if (type.flags & ts.TypeFlags.Object) {
          return { primitive: spec.PrimitiveType.Json };
        }
        if (type.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
          return spec.CANONICAL_ANY;
        }
      } else if (type.symbol.valueDeclaration && isUnder(type.symbol.valueDeclaration.getSourceFile().fileName, this.stdlib)) {
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

      function isUnder(file: string, dir: string): boolean {
        const relative = path.relative(dir, file);
        return !relative.startsWith(path.sep) && !relative.startsWith('..');
      }
    }

    async function _unionType(this: Assembler): Promise<spec.OptionalValue> {
      const types = new Array<spec.TypeReference>();
      let optional: boolean | undefined;

      for (const subType of (type as ts.UnionType).types) {
        if (subType.flags & ts.TypeFlags.Undefined) {
          optional = true;
          continue;
        }
        /* eslint-disable no-await-in-loop */
        const resolvedType = await this._typeReference(subType, declaration);
        /* eslint-enable no-await-in-loop */
        if (types.find(ref => deepEqual(ref, resolvedType)) != null) {
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
      const pendingFqns = new Set<string>(this._deferred.map(x => x.fqn));
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
        throw new Error(`Could not invoke any more deferreds, cyclic dependency? Remaining: ${JSON.stringify(this._deferred, undefined, 2)}`);
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
      for (const property of int.properties || []) {
        ret.add(property.name);
      }

      for (const baseRef of int.interfaces || []) {
        const base = this._dereference(baseRef, null);
        if (!base) { throw new Error('Impossible to have unresolvable base in allProperties()'); }
        if (!spec.isInterfaceType(base)) { throw new Error('Impossible to have non-interface base in allProperties()'); }

        recurse.call(this, base);
      }
    }
  }

  private _verifyConsecutiveOptionals(node: ts.Node, parameters?: spec.Parameter[]) {
    if (!parameters) { return; }

    const remaining = [...parameters].reverse();
    while (remaining.length > 0) {
      const current = remaining.pop()!;
      if (current.optional) {
        const offender = remaining.find(p => !p.optional && !p.variadic);
        if (offender == null) { continue; }
        this._diagnostic(node,
          ts.DiagnosticCategory.Error,
          `Parameter ${current.name} cannot be optional, as it precedes non-optional parameter ${offender.name}`);
        delete current.optional;
      }
    }
  }

  private _toDependencies(assemblies: readonly spec.Assembly[]): { [name: string]: spec.PackageVersion } | undefined {
    const ret: { [name: string]: spec.PackageVersion } = {};

    for (const a of assemblies) {
      Object.assign(ret, assemblyToPackageVersionMap(a));
    }

    return noEmptyDict(ret);
  }

  private _buildDependencyClosure(assemblies: readonly spec.Assembly[]): { [name: string]: spec.PackageVersion } | undefined {
    // Merge the dependency closures of all dependencies and add the direct dependencies.
    // There should not be version conflicts between them but we guard against it anyway.

    // Get an array of dependency maps
    const dependencyBags = flatten(assemblies.map(a => [assemblyToPackageVersionMap(a), a.dependencies || {}]));

    const warned = new Set<string>();
    const result: { [name: string]: spec.PackageVersion } = {};
    for (const bag of dependencyBags) {
      for (const [name, packV] of Object.entries(bag)) {
        maybeRecord.call(this, name, packV);
      }
    }

    return noEmptyDict(result);

    function maybeRecord(this: Assembler, name: string, pack: spec.PackageVersion) {
      let recordThisDependency = true;

      if (name in result) {
        // Two dependencies on the same package, find the right version to use
        const highestVersion = mostConstrainedVersion(result[name].version, pack.version);

        if (highestVersion === undefined) {
          warnAboutVersionConflict.call(this, name, result[name].version, pack.version);
        }

        recordThisDependency = pack.version === highestVersion;
      }

      if (recordThisDependency) {
        result[name] = {
          version: pack.version,
          targets: pack.targets,
        };
      }
    }

    function warnAboutVersionConflict(this: Assembler, name: string, v1: string, v2: string) {
      if (warned.has(name)) { return; }
      this._diagnostic(null, ts.DiagnosticCategory.Error, `Conflicting dependencies on incompatible versions for package '${name}': ${v1} and ${v2}`);
      warned.add(name);
    }
  }
}

function assemblyToPackageVersionMap(a: spec.Assembly): {[key: string]: spec.PackageVersion} {
  return {
    [a.name]: {
      version: a.version,
      targets: a.targets
    }
  };
}

function _fingerprint(assembly: spec.Assembly): spec.Assembly {
  delete assembly.fingerprint;
  assembly = sortJson(assembly);
  const fingerprint = crypto.createHash('sha256')
    .update(JSON.stringify(assembly))
    .digest('base64');
  return { ...assembly, fingerprint };
}

function _isAbstract(symbol: ts.Symbol, declaringType: spec.ClassType | spec.InterfaceType): boolean {
  // everything is abstract in interfaces
  if (declaringType.kind === spec.TypeKind.Interface) {
    return true;
  }

  return !!symbol.valueDeclaration
    && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Abstract) !== 0;
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
  if (!symbol.valueDeclaration || TYPE_DECLARATION_KINDS.has(symbol.valueDeclaration.kind)) {
    let hasExport = false;
    for (const decl of symbol.declarations) {
      if (ts.getCombinedModifierFlags(decl) & ts.ModifierFlags.Export) {
        hasExport = true;
      }
    }
    return !hasExport;
  }

  return symbol.valueDeclaration && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Private) !== 0;
}

function _hasInternalJsDocTag(symbol: ts.Symbol) {
  return symbol.getJsDocTags().some((t: any) => t.name === 'internal');
}

function _isProtected(symbol: ts.Symbol): boolean {
  return !!symbol.valueDeclaration
    && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Protected) !== 0;
}

function _isStatic(symbol: ts.Symbol): boolean {
  return !!symbol.valueDeclaration
    && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Static) !== 0;
}

function _isVoid(type: ts.Type): boolean {
  return (type.flags & ts.TypeFlags.Void) !== 0;
}

function _isPromise(type: ts.Type): boolean {
  return type.symbol && type.symbol.escapedName === 'Promise';
}

function _sortMembers(type: spec.ClassType): spec.ClassType;
function _sortMembers(type: spec.InterfaceType): spec.InterfaceType;
function _sortMembers(type: spec.ClassType | spec.InterfaceType): spec.ClassType | spec.InterfaceType {
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
    if (!values) { return values; }
    return values.sort(_comparator);

    function _comparator(lval: T, rval: T): number {
      return _format(lval).localeCompare(_format(rval));

      function _format(val: T): string {
        return [
          val.static ? '0' : '1',
          val.immutable ? '0' : '1',
          !val.optional ? '0' : '1',
          val.name
        ].join('|');
      }
    }
  }
  type TypeMember = {
    name?: string;                      // Methods & Properties
    static?: boolean;                   // Methods & Properties
    immutable?: boolean;                //           Properties
    optional?: boolean;                 //           Properties
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
function apply<T, U>(x: T | undefined, fn: (x: T) => U | undefined): U | undefined {
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
  return Object.keys(typeMembers(jsiiType)).filter(n => n !== '');
}

function typeMembers(jsiiType: spec.InterfaceType | spec.ClassType): {[key: string]: spec.Property | spec.Method} {
  const ret: {[key: string]: spec.Property | spec.Method} = {};

  for (const prop of jsiiType.properties || []) {
    ret[prop.name] = prop;
  }

  for (const method of jsiiType.methods || []) {
    ret[method.name || ''] = method;
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
  return name.length >= 2 && name.startsWith('I') && name.charAt(1).toUpperCase() === name.charAt(1);
}

function getConstructor(type: ts.Type): ts.Symbol | undefined {
  return type.symbol.members
      && type.symbol.members.get(ts.InternalSymbolName.Constructor);
}

function* intersect<T>(xs: Set<T>, ys: Set<T>) {
  for (const x of xs) {
    if (ys.has(x)) {
      yield x;
    }
  }
}

/**
 * Return the most constrained version given two versions
 *
 * Returns the highest version. Return undefined if the values are not pairwise
 * comparable.
 */
function mostConstrainedVersion(version1: string, version2: string): string | undefined {
  if (semver.satisfies(version1, `^${version2}`)) {
    // If v1 satisifies v2, then either:
    // - v2 also satisfies v1, in which case it doesn't matter which we return
    // - v2 does not satisfy v1, in which it must be the case that v1 is higher
    return version1;
  }

  // Reverse logic
  if (semver.satisfies(version2, `^${version1}`)) { return version2; }

  return undefined;
}

function flatten<T>(xs: T[][]): T[] {
  return Array.prototype.concat.call([], ...xs);
}

function noEmptyDict<T>(xs: {[key: string]: T}): {[key: string]: T} | undefined {
  if (Object.keys(xs).length === 0) { return undefined; }
  return xs;
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
  public constructor(public readonly namespace: readonly string[], public readonly stability?: spec.Stability) {
  }

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
