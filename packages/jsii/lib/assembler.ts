import colors = require('colors/safe');
import crypto = require('crypto');
import deepEqual = require('deep-equal');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import log4js = require('log4js');
import path = require('path');
import ts = require('typescript');
import { JSII_DIAGNOSTICS_CODE } from './compiler';
import { parseSymbolDocumentation } from './docs';
import { Diagnostic, Emitter } from './emitter';
import literate = require('./literate');
import { ProjectInfo } from './project-info';
import utils = require('./utils');
import { Validator } from './validator';

// tslint:disable:no-var-requires Modules without TypeScript definitions
const sortJson = require('sort-json');
// tslint:enable:no-var-requires

const LOG = log4js.getLogger('jsii/assembler');

/**
 * The JSII Assembler consumes a ``ts.Program`` instance and emits a JSII assembly.
 */
export class Assembler implements Emitter {
    private _diagnostics = new Array<Diagnostic>();
    private _deferred = new Array<DeferredRecord>();
    private _types: { [fqn: string]: spec.Type };

    /**
     * @param projectInfo information about the package being assembled
     * @param program     the TypeScript program to be assembled from
     * @param stdlib      the directory where the TypeScript stdlib is rooted
     */
    public constructor(public readonly projectInfo: ProjectInfo,
                       public readonly program: ts.Program,
                       public readonly stdlib: string) {}

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
        if (!readme) {
            this._diagnostic(null,
                             ts.DiagnosticCategory.Suggestion,
                            'There is not "README.md" file. It is recommended to have one.');
        }

        this._types = {};
        this._deferred = [];
        const mainFile = path.resolve(this.projectInfo.projectRoot, this.projectInfo.types.replace(/\.d\.ts(x?)$/, '.ts$1'));
        for (const sourceFile of this.program.getSourceFiles().filter(f => !f.isDeclarationFile)) {
            if (sourceFile.fileName !== mainFile) { continue; }
            if (LOG.isTraceEnabled()) {
                LOG.trace(`Processing source file: ${colors.blue(path.relative(this.projectInfo.projectRoot, sourceFile.fileName))}`);
            }
            const symbol = this._typeChecker.getSymbolAtLocation(sourceFile);
            if (!symbol) { continue; }
            for (const node of this._typeChecker.getExportsOfModule(symbol)) {
                await this._visitNode(node.declarations[0]);
            }
        }

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

        const assembly = {
            schema: spec.SchemaVersion.V1_0,
            name: this.projectInfo.name,
            version: this.projectInfo.version,
            description: this.projectInfo.description || this.projectInfo.name,
            license: this.projectInfo.license,
            homepage: this.projectInfo.homepage || this.projectInfo.repository.url,
            author: this.projectInfo.author,
            contributors: this.projectInfo.contributors && [...this.projectInfo.contributors],
            repository: this.projectInfo.repository,
            dependencies: _toDependencies(this.projectInfo.dependencies, this.projectInfo.peerDependencies),
            bundled: this.projectInfo.bundleDependencies,
            types: this._types,
            targets: this.projectInfo.targets,
            readme,
            fingerprint: '<TBD>'
        };

        const validator = new Validator(this.projectInfo, assembly);
        const validationResult = await validator.emit();
        if (!validationResult.emitSkipped) {
            const assemblyPath = path.join(this.projectInfo.projectRoot, '.jsii');
            LOG.trace(`Emitting assembly: ${colors.blue(assemblyPath)}`);
            await fs.writeJson(assemblyPath, _fingerprint(assembly), { replacer: utils.filterEmpty, spaces: 2 });
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
    }

    /**
     * Defer a callback until a (set of) types are available
     *
     * This is a helper function around _defer() which encapsulates the _dereference
     * action (which is basically the majority use case for _defer anyway).
     *
     * Will not invoke the function with any 'undefined's; an error will already have been emitted in
     * that case anyway.
     */
    // tslint:disable-next-line:max-line-length
    private _deferUntilTypesAvailable(fqn: string, baseTypes: spec.NamedTypeReference[], referencingNode: ts.Node, cb: (...xs: spec.Type[]) => void) {
        // We can do this one eagerly
        if (baseTypes.length === 0) {
            cb();
            return;
        }

        this._defer(fqn, baseTypes.map(x => x.fqn), () => {
            const resolved = baseTypes.map(x => this._dereference(x, referencingNode)).filter(x => x !== undefined);
            if (resolved.length > 0) {
                return cb(...resolved as spec.Type[]);
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
    private _dereference(ref: spec.NamedTypeReference, referencingNode: ts.Node | null): spec.Type | undefined {
        const [assm, ] = ref.fqn.split('.');
        let type;
        if (assm === this.projectInfo.name) {
            type = this._types[ref.fqn];
        } else {
            const assembly = this.projectInfo.transitiveDependencies.find(dep => dep.name === assm);
            type = assembly && assembly.types && assembly.types[ref.fqn];

            // since we are exposing a type of this assembly in this module's public API,
            // we expect it to appear as a peer dependency instead of a normal dependency.
            if (assembly) {
                const asPeerDependency = this.projectInfo.peerDependencies.find(d => d.name === assembly.name);
                if (!asPeerDependency) {
                    this._diagnostic(referencingNode, ts.DiagnosticCategory.Warning,
                        `The type '${ref.fqn}' is exposed in the public API of this module. ` +
                        `Therefore, the module '${assembly.name}' must also be defined under "peerDependencies". ` +
                        `You can use the "jsii-fix-peers" utility to fix.`);
                }
            }
        }

        if (!type) {
            this._diagnostic(referencingNode, ts.DiagnosticCategory.Error,
                `Unable to resolve referenced type '${ref.fqn}'. ` +
                `Type may be @internal or unexported`);
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
        const groups = tsName.match(/^\"([^\"]+)\"\.(.*)$/);
        let node = type.symbol.valueDeclaration;
        if (!node && type.symbol.declarations.length > 0) { node = type.symbol.declarations[0]; }
        if (!groups) {
            this._diagnostic(node, ts.DiagnosticCategory.Error, `Cannot use private type ${tsName} in exported declarations`);
            return tsName;
        }
        const [, modulePath, typeName, ] = groups;
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
                return await fs.readJson(filePath);
            }
            const parent = path.dirname(fromDir);
            if (parent === fromDir) { return undefined; }
            return await _findPackageInfo(parent);
        }
    }

    /**
     * Register exported types in ``this.types``.
     *
     * @param node       a node found in a module
     * @param namePrefix the prefix for the types' namespaces
     */
    private async _visitNode(node: ts.Declaration, namePrefix: string[] = []): Promise<spec.Type[]> {
        // tslint:disable-next-line:no-bitwise Ignore nodes that are not export declarations
        if ((ts.getCombinedModifierFlags(node) & ts.ModifierFlags.Export) === 0) { return []; }

        let jsiiType: spec.Type | undefined;

        if (ts.isClassDeclaration(node) && _isExported(node)) {
            jsiiType = await this._visitClass(this._typeChecker.getTypeAtLocation(node), namePrefix);
        } else if (ts.isInterfaceDeclaration(node) && _isExported(node)) {
            jsiiType = await this._visitInterface(this._typeChecker.getTypeAtLocation(node), namePrefix);
        } else if (ts.isEnumDeclaration(node) && _isExported(node)) {
            jsiiType = await this._visitEnum(this._typeChecker.getTypeAtLocation(node), namePrefix);
        } else if (ts.isModuleDeclaration(node)) {
            const moduleDecl = node as ts.ModuleDeclaration;
            const name = node.name.getText();
            const symbol = (moduleDecl as any).symbol;

            if (LOG.isTraceEnabled()) { LOG.trace(`Entering namespace: ${colors.cyan([...namePrefix, name].join('.'))}`); }

            const allTypes = new Array<spec.Type>();
            for (const prop of this._typeChecker.getExportsOfModule(symbol)) {
                allTypes.push(...await this._visitNode(prop.declarations[0], namePrefix.concat(node.name.getText())));
            }

            if (LOG.isTraceEnabled()) { LOG.trace(`Leaving namespace:  ${colors.cyan([...namePrefix, name].join('.'))}`); }
            return allTypes;
        } else {
            this._diagnostic(node, ts.DiagnosticCategory.Message, `Skipping ${ts.SyntaxKind[node.kind]} node`);
        }

        if (!jsiiType) { return []; }
        if (LOG.isInfoEnabled()) {
            LOG.info(`Registering JSII ${colors.magenta(jsiiType.kind)}: ${colors.green(jsiiType.fqn)}`);
        }
        this._types[jsiiType.fqn] = jsiiType;

        const type = this._typeChecker.getTypeAtLocation(node);
        if (type.symbol.exports) {
            const nestedPrefix = [...namePrefix, type.symbol.name];
            for (const exportedNode of this._typeChecker.getExportsOfModule(type.symbol).filter(s => s.declarations)) {
                const nestedTypes = await this._visitNode(exportedNode.declarations[0], nestedPrefix);
                for (const nestedType of nestedTypes) {
                    if (nestedType.namespace !== nestedPrefix.join('.')) {
                        this._diagnostic(node,
                                         ts.DiagnosticCategory.Error,
                                         // tslint:disable-next-line:max-line-length
                                         `All child names of a type '${jsiiType.fqn}' must point to concrete types, but '${nestedType.namespace}' is a namespaces, and this structure cannot be supported in all languages (e.g. Java)`);
                    }
                }
            }
        }

        return [jsiiType];
    }

    private async _processBaseInterfaces(fqn: string, baseTypes?: ts.Type[]) {
        if (!baseTypes) {
            return undefined;
        }

        const result = new Array<spec.NamedTypeReference>();
        const baseInterfaces = new Set<ts.Type>();

        const processBaseTypes = (types: ts.Type[]) => {
            for (const iface of types) {

                // base is private/internal, so we continue recursively with it's own bases
                if (this._isPrivateOrInternal(iface.symbol)) {
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

        for (const iface of baseInterfaces) {
            const decl = iface.symbol.valueDeclaration;
            const typeRef = await this._typeReference(iface, decl);

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

        return result.length === 0 ? undefined : result;
    }

    private async _visitClass(type: ts.Type, namespace: string[]): Promise<spec.ClassType | undefined> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing class: ${colors.gray(namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
        }

        if (_hasInternalJsDocTag(type.symbol)) {
            return undefined;
        }

        const fqn = `${[this.projectInfo.name, ...namespace].join('.')}.${type.symbol.name}`;

        const jsiiType: spec.ClassType = {
            assembly: this.projectInfo.name,
            fqn,
            kind: spec.TypeKind.Class,
            name: type.symbol.name,
            namespace: namespace.join('.'),
            docs: this._visitDocumentation(type.symbol),
        };

        if (_isAbstract(type.symbol, jsiiType)) {
            jsiiType.abstract = true;
        }
        for (const base of (type.getBaseTypes() || [])) {
            if (jsiiType.base) {
                this._diagnostic(base.symbol.valueDeclaration, ts.DiagnosticCategory.Error, `Found multiple base types for ${jsiiType.fqn}`);
                continue;
            }

            const ref = await this._typeReference(base, type.symbol.valueDeclaration);

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
            jsiiType.base = ref;
        }
        for (const clause of (type.symbol.valueDeclaration as ts.ClassDeclaration).heritageClauses || []) {
            if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                // Handled by `getBaseTypes`
                continue;
            } else if (clause.token !== ts.SyntaxKind.ImplementsKeyword) {
                this._diagnostic(clause, ts.DiagnosticCategory.Error, `Ignoring ${ts.SyntaxKind[clause.token]} heritage clause`);
                continue;
            }

            jsiiType.interfaces = await this._processBaseInterfaces(fqn, clause.types.map(t => this._typeChecker.getTypeFromTypeNode(t)));
        }

        if (!type.isClass()) {
            throw new Error('Oh no');
        }

        for (const decl of type.symbol.declarations) {
            const classDecl = (decl as ts.ClassDeclaration | ts.InterfaceDeclaration);
            if (!classDecl.members) { continue; }

            for (const memberDecl of classDecl.members) {
                const member: ts.Symbol = (memberDecl as any).symbol;

                if (!(type.symbol.getDeclarations() || []).find(d => d === memberDecl.parent)) {
                    continue;
                }

                if (this._isPrivateOrInternal(member, memberDecl)) {
                    continue;
                }

                // constructors are handled later
                if (ts.isConstructorDeclaration(memberDecl)) {
                    continue;
                }

                if (ts.isMethodDeclaration(memberDecl) || ts.isMethodSignature(memberDecl)) {
                    await this._visitMethod(member, jsiiType);
                } else if (ts.isPropertyDeclaration(memberDecl)
                        || ts.isPropertySignature(memberDecl)
                        || ts.isAccessor(memberDecl)) {
                    await this._visitProperty(member, jsiiType);
                } else {
                    this._diagnostic(memberDecl,
                                    ts.DiagnosticCategory.Warning,
                                    `Ignoring un-handled ${ts.SyntaxKind[memberDecl.kind]} member`);
                }
            }
        }

        const constructor = type.symbol.members && type.symbol.members.get(ts.InternalSymbolName.Constructor);
        const ctorDeclaration = constructor && (constructor.declarations[0] as ts.ConstructorDeclaration);
        if (constructor && ctorDeclaration) {
            const signature = this._typeChecker.getSignatureFromDeclaration(ctorDeclaration);

            // tslint:disable-next-line:no-bitwise
            if ((ts.getCombinedModifierFlags(ctorDeclaration) & ts.ModifierFlags.Private) === 0) {
                jsiiType.initializer = { initializer: true };
                if (signature) {
                    for (const param of signature.getParameters()) {
                        jsiiType.initializer.parameters = jsiiType.initializer.parameters || [];
                        jsiiType.initializer.parameters.push(await this._toParameter(param));
                        jsiiType.initializer.variadic = jsiiType.initializer.parameters
                            && jsiiType.initializer.parameters.find(p => !!p.variadic) != null;
                    }
                }
                jsiiType.initializer.docs = this._visitDocumentation(constructor);
                this._verifyConsecutiveOptionals(type.symbol.valueDeclaration, jsiiType.initializer.parameters);
            }

            // Process constructor-based property declarations even if constructor is private
            if (signature) {
                for (const param of signature.getParameters()) {
                    if (ts.isParameterPropertyDeclaration(param.valueDeclaration)) {
                        await this._visitProperty(param, jsiiType);
                    }
                }
            }
        } else if (jsiiType.base) {
            this._deferUntilTypesAvailable(fqn, [jsiiType.base!], type.symbol.valueDeclaration, (baseType) => {
                if (spec.isClassType(baseType)) {
                    jsiiType.initializer = baseType.initializer;
                } else {
                    this._diagnostic(type.symbol.valueDeclaration,
                        ts.DiagnosticCategory.Error,
                        `Base type of ${jsiiType.fqn} (${jsiiType.base!.fqn}) is not a class`);
                }
            });
        } else {
            jsiiType.initializer = { initializer: true };
        }

        return _sortMembers(jsiiType);
    }

    /**
     * @returns true if this member is internal and should be omitted from the type manifest
     */
    private _isPrivateOrInternal(symbol: ts.Symbol, validateDeclaration?: ts.Declaration): boolean {
        const hasInternalJsDocTag = _hasInternalJsDocTag(symbol);
        const hasUnderscorePrefix = symbol.name !== '__constructor' && symbol.name.startsWith('_');

        if (_isPrivate(symbol)) {
            LOG.trace(`${symbol.name} is marked "private"`);
            return true;
        }

        if (!hasInternalJsDocTag && !hasUnderscorePrefix) {
            return false;
        }

        // we only validate if we have a declaration
        if (validateDeclaration) {
            if (!hasUnderscorePrefix) {
                this._diagnostic(validateDeclaration, ts.DiagnosticCategory.Error,
                    `${symbol.name}: the name of members marked as @internal must begin with an underscore`);
            }

            if (!hasInternalJsDocTag) {
                this._diagnostic(validateDeclaration, ts.DiagnosticCategory.Error,
                    `${symbol.name}: members with names that begin with an underscore must be marked as @internal via a JSDoc tag`);
            }
        }

        return true;
    }

    private async _visitEnum(type: ts.Type, namespace: string[]): Promise<spec.EnumType | undefined> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing enum: ${colors.gray(namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
        }

        if (_hasInternalJsDocTag(type.symbol)) {
            return undefined;
        }

        const decl = type.symbol.valueDeclaration;
        const flags = ts.getCombinedModifierFlags(decl);
        // tslint:disable-next-line:no-bitwise
        if (flags & ts.ModifierFlags.Const) {
            this._diagnostic(decl,
                             ts.DiagnosticCategory.Error,
                            `Exported enum cannot be declared 'const'`);
        }

        const docs = this._visitDocumentation(type.symbol);

        const jsiiType: spec.EnumType = {
            assembly: this.projectInfo.name,
            fqn: `${[this.projectInfo.name, ...namespace].join('.')}.${type.symbol.name}`,
            kind: spec.TypeKind.Enum,
            members: ((type as ts.UnionType).types || []).map(m => ({
                name: m.symbol.name,
                docs: this._visitDocumentation(m.symbol),
            })),
            name: type.symbol.name,
            namespace: namespace.join('.'),
            docs
        };

        return jsiiType;
    }

    /**
     * Register documentations on a ``spec.Documentable`` entry.
     *
     * @param sym       the symbol holding the JSDoc information
     * @param documentable the entity being documented
     *
     * @returns ``documentable``
     */
    private _visitDocumentation(sym: ts.Symbol): spec.Docs | undefined {
        const comment = ts.displayPartsToString(sym.getDocumentationComment(this._typeChecker)).trim();

        // Right here we'll just guess that the first declaration site is the most important one.
        const result = parseSymbolDocumentation(comment, sym.getJsDocTags());

        for (const diag of result.diagnostics || []) {
            this._diagnostic(sym.declarations[0],
                ts.DiagnosticCategory.Error,
                diag
            );
        }

        const allUndefined = Object.values(result.docs).every(v => v === undefined);
        return !allUndefined ? result.docs : undefined;
    }

    private async _visitInterface(type: ts.Type, namespace: string[]): Promise<spec.InterfaceType | undefined> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing interface: ${colors.gray(namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
        }

        if (_hasInternalJsDocTag(type.symbol)) {
            return undefined;
        }

        const fqn = `${[this.projectInfo.name, ...namespace].join('.')}.${type.symbol.name}`;

        const jsiiType: spec.InterfaceType = {
            assembly: this.projectInfo.name,
            fqn,
            kind: spec.TypeKind.Interface,
            name: type.symbol.name,
            namespace: namespace.join('.'),
            docs: this._visitDocumentation(type.symbol),
        };

        jsiiType.interfaces = await this._processBaseInterfaces(fqn, type.getBaseTypes());

        for (const member of type.getProperties()) {
            if (!(type.symbol.getDeclarations() || []).find(decl => decl === member.valueDeclaration.parent)) { continue; }

            if (this._isPrivateOrInternal(member, member.valueDeclaration)) {
                continue;
            }

            if (ts.isMethodDeclaration(member.valueDeclaration) || ts.isMethodSignature(member.valueDeclaration)) {
                await this._visitMethod(member, jsiiType);
            } else if (ts.isPropertyDeclaration(member.valueDeclaration)
                    || ts.isPropertySignature(member.valueDeclaration)
                    || ts.isAccessor(member.valueDeclaration)) {
                await this._visitProperty(member, jsiiType);
            } else {
                this._diagnostic(member.valueDeclaration,
                                 ts.DiagnosticCategory.Warning,
                                 `Ignoring un-handled ${ts.SyntaxKind[member.valueDeclaration.kind]} member`);
            }
        }

        // Calculate datatype based on the datatypeness of this interface and all of its parents
        // To keep the spec minimal the actual values of the attribute are "true" or "undefined" (to represent "false").
        // tslint:disable-next-line:no-console
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
            }
        });

        // Check that no interface declares a member that's already declared
        // in a base type (not allowed in C#).
        const memberNames = interfaceMemberNames(jsiiType);
        const checkNoIntersection = (...bases: spec.Type[]) => {
            for (const base of bases) {
                if (!spec.isInterfaceType(base)) { continue; }

                const baseMembers = interfaceMemberNames(base);
                for (const memberName of memberNames) {
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

    private async _visitMethod(symbol: ts.Symbol, type: spec.ClassType | spec.InterfaceType) {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing method: ${colors.green(type.fqn)}#${colors.cyan(symbol.name)}`);
        }

        const declaration = symbol.valueDeclaration as (ts.MethodDeclaration | ts.MethodSignature);
        const signature = this._typeChecker.getSignatureFromDeclaration(declaration);
        if (!signature) {
            this._diagnostic(declaration, ts.DiagnosticCategory.Error, `Unable to compute signature for ${type.fqn}#${symbol.name}`);
            return;
        }
        const parameters = await Promise.all(signature.getParameters().map(p => this._toParameter(p)));

        const returnType = signature.getReturnType();
        const method: spec.Method = {
            abstract: _isAbstract(symbol, type),
            name: symbol.name,
            parameters,
            protected: _isProtected(symbol),
            returns: _isVoid(returnType) ? undefined : await this._typeReference(returnType, declaration),
            static: _isStatic(symbol),
        };
        method.variadic = method.parameters && method.parameters.find(p => !!p.variadic) != null;

        this._verifyConsecutiveOptionals(declaration, method.parameters);

        method.docs = this._visitDocumentation(symbol);

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

        type.methods = type.methods || [];
        type.methods.push(method);
    }

    private async _visitProperty(symbol: ts.Symbol, type: spec.ClassType | spec.InterfaceType) {
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

        const signature = symbol.valueDeclaration as (ts.PropertySignature
                                                    | ts.PropertyDeclaration
                                                    | ts.AccessorDeclaration
                                                    | ts.ParameterPropertyDeclaration);
        const property: spec.Property = {
            abstract: _isAbstract(symbol, type),
            name: symbol.name,
            protected: _isProtected(symbol),
            static: _isStatic(symbol),
            type: await this._typeReference(this._typeChecker.getTypeOfSymbolAtLocation(symbol, signature), signature),
        };

        if (ts.isGetAccessor(signature)) {
            const decls = symbol.getDeclarations() || [];
            property.immutable = decls.find(decl => ts.isSetAccessor(decl)) == null;
        } else {
            // tslint:disable-next-line:no-bitwise
            property.immutable = (ts.getCombinedModifierFlags(signature) & ts.ModifierFlags.Readonly) !== 0;
        }

        if (signature.questionToken) {
            property.type.optional = true;
        }

        if (property.static && property.immutable && ts.isPropertyDeclaration(signature) && signature.initializer) {
            property.const = true;
        }

        property.docs = this._visitDocumentation(symbol);

        type.properties = type.properties || [];
        type.properties.push(property);
    }

    private async _toParameter(paramSymbol: ts.Symbol): Promise<spec.Parameter> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing parameter: ${colors.cyan(paramSymbol.name)}`);
        }
        const paramDeclaration = paramSymbol.valueDeclaration as ts.ParameterDeclaration;
        const parameter: spec.Parameter = {
            name: paramSymbol.name,
            type: await this._typeReference(this._typeChecker.getTypeAtLocation(paramSymbol.valueDeclaration), paramSymbol.valueDeclaration),
            variadic: !!paramDeclaration.dotDotDotToken
        };
        if (parameter.variadic) {
            parameter.type = (parameter.type as spec.CollectionTypeReference).collection.elementtype;
        }
        if (paramDeclaration.initializer || paramDeclaration.questionToken) {
            parameter.type.optional = true;
        }

        parameter.docs = this._visitDocumentation(paramSymbol); // No inheritance on purpose

        return parameter;
    }

    private async _typeReference(type: ts.Type, declaration: ts.Declaration): Promise<spec.TypeReference> {
        if (type.isLiteral() && _isEnumLike(type)) {
            type = this._typeChecker.getBaseTypeOfLiteralType(type);
        } else {
            type = this._typeChecker.getApparentType(type);
        }

        const primitiveType = _tryMakePrimitiveType.call(this);
        if (primitiveType) { return primitiveType; }

        if (type.isUnion() && !_isEnumLike(type)) {
            return _unionType.call(this);
        }

        if (!type.symbol) {
            this._diagnostic(declaration, ts.DiagnosticCategory.Error, `Non-primitive types must have a symbol`);
            return { primitive: spec.PrimitiveType.Any, optional: true };
        }

        if (type.symbol.name === 'Array') {
            return await _arrayType.call(this);
        }

        if (type.symbol.name === '__type' && type.symbol.members) {
            return await _mapType.call(this);
        }

        if (type.symbol.escapedName === 'Promise') {
            const typeRef = type as ts.TypeReference;
            if (!typeRef.typeArguments || typeRef.typeArguments.length !== 1) {
                this._diagnostic(declaration,
                                 ts.DiagnosticCategory.Error,
                                 `Un-specified promise type (need to specify as Promise<T>)`);
                return { primitive: spec.PrimitiveType.Any, optional: true, promise: true };
            } else {
                return {
                    ...await this._typeReference(typeRef.typeArguments[0], declaration),
                    promise: true
                 };
            }
        }

        return { fqn: await this._getFQN(type) };

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
                elementtype = { primitive: spec.PrimitiveType.Any, optional: true };
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
                                 `Only string index maps are supported`);
                elementtype = { primitive: spec.PrimitiveType.Any };
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
                // tslint:disable-next-line:no-bitwise
                if (type.flags & ts.TypeFlags.Object) {
                    return { primitive: spec.PrimitiveType.Json };
                }
                // tslint:disable-next-line:no-bitwise
                if (type.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
                    return { primitive: spec.PrimitiveType.Any };
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

        async function _unionType(this: Assembler): Promise<spec.TypeReference> {
            const types = new Array<spec.TypeReference>();
            let optional: boolean = false;

            for (const subType of (type as ts.UnionType).types) {
                // tslint:disable-next-line:no-bitwise
                if (subType.flags & ts.TypeFlags.Undefined) {
                    optional = true;
                    continue;
                }
                const resolvedType = await this._typeReference(subType, declaration);
                if (types.find(ref => deepEqual(ref, resolvedType)) != null) {
                    continue;
                }
                types.push(resolvedType);
            }

            return types.length === 1
                ? { ...types[0], optional }
                : { union: { types }, optional };
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
        const self = this;

        const ret = new Set<string>();
        recurse(root);
        return ret;

        function recurse(int: spec.InterfaceType) {
            for (const property of int.properties || []) {
                ret.add(property.name);
            }

            for (const baseRef of int.interfaces || []) {
                const base = self._dereference(baseRef, null);
                if (!base) { throw new Error('Impossible to have unresolvable base in allProperties()'); }
                if (!spec.isInterfaceType(base)) { throw new Error('Impossible to have non-interface base in allProperties()'); }

                recurse(base);
            }
        }
    }

    /**
     * Verifies that if a method has an optional parameter, all consecutive
     * parameters are optionals as well.
     */
    private _verifyConsecutiveOptionals(node: ts.Node, parameters?: spec.Parameter[]) {
        if (!parameters) {
            return;
        }

        let optional = false;
        for (const p of parameters) {
            if (optional && !p.type.optional && !p.variadic) {
                this._diagnostic(node, ts.DiagnosticCategory.Error,
                    `Parameter ${p.name} must be optional since it comes after an optional parameter`);
            }

            if (p.type.optional) {
                optional = true;
            }
        }
    }
}

/**
 * The result of ``Assembler#emit()``.
 */
export interface EmitResult {
    /**
     * @return all diagnostic information produced by the assembler's emit process
     */
    readonly diagnostics: ts.Diagnostic[];

    /**
     * @return true if the assembly was not written to disk (as the consequence
     *         of errors, which are visible in ``#diagnostics``)
     */
    readonly emitSkipped: boolean;
}

function _fingerprint(assembly: spec.Assembly): spec.Assembly {
    delete assembly.fingerprint;
    assembly = sortJson(assembly);
    const fingerprint = crypto.createHash('sha256')
                              .update(JSON.stringify(assembly, utils.filterEmpty))
                              .digest('base64');
    return { ...assembly, fingerprint };
}

function _isAbstract(symbol: ts.Symbol, declaringType: spec.ClassType | spec.InterfaceType): boolean {
    // everything is abstract in interfaces
    if (declaringType.kind === spec.TypeKind.Interface) {
        return true;
    }

    return !!symbol.valueDeclaration
        // tslint:disable-next-line:no-bitwise
        && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Abstract) !== 0;
}

function _isEnumLike(type: ts.Type): type is ts.EnumType {
    // tslint:disable-next-line:no-bitwise
    return (type.flags & ts.TypeFlags.EnumLike) !== 0;
}

function _isExported(node: ts.Declaration): boolean {
    // tslint:disable-next-line:no-bitwise
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

    // if the symbol doesn't have a value declaration, we are assuming it's a type (enum/interface/class)
    // and check that it has an "export" modifier
    if (!symbol.valueDeclaration) {
        let hasExport = false;
        for (const decl of symbol.declarations) {
            // tslint:disable-next-line:no-bitwise
            if (ts.getCombinedModifierFlags(decl) & ts.ModifierFlags.Export) {
                hasExport = true;
            }
        }
        return !hasExport;
    }

    // tslint:disable-next-line:no-bitwise
    return symbol.valueDeclaration && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Private) !== 0;
}

function _hasInternalJsDocTag(symbol: ts.Symbol) {
    return symbol.getJsDocTags().some((t: any) => t.name === 'internal');
}

function _isProtected(symbol: ts.Symbol): boolean {
    return !!symbol.valueDeclaration
        // tslint:disable-next-line:no-bitwise
        && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Protected) !== 0;
}

function _isStatic(symbol: ts.Symbol): boolean {
    return !!symbol.valueDeclaration
        // tslint:disable-next-line:no-bitwise
        && (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Static) !== 0;
}

function _isVoid(type: ts.Type): boolean {
    // tslint:disable-next-line:no-bitwise
    return ((type.flags & ts.TypeFlags.Void) !== 0);
}

function _sortMembers(type: spec.ClassType): spec.ClassType;
function _sortMembers(type: spec.InterfaceType): spec.InterfaceType;
function _sortMembers(type: spec.ClassType | spec.InterfaceType): spec.ClassType | spec.InterfaceType {
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
                    val.static                       ? '0' : '1',
                    val.immutable                    ? '0' : '1',
                    !(val.type && val.type.optional) ? '0' : '1',
                    val.name
                ].join('|');
            }
        }
    }
    type TypeMember = {
        name?: string;                      // Methods & Properties
        static?: boolean;                   // Methods & Properties
        immutable?: boolean;                //           Properties
        type?: { optional?: boolean; };     //           Properties
    };
}

function _toDependencies(assemblies: ReadonlyArray<spec.Assembly>, peers: ReadonlyArray<spec.Assembly>): { [name: string]: spec.PackageVersion } {
    const result: { [name: string]: spec.PackageVersion } = {};

    for (const assembly of assemblies) {
        result[assembly.name] = {
            version: assembly.version,
            targets: assembly.targets,
            dependencies: assembly.dependencies
        };
    }

    for (const peer of peers) {
        result[peer.name] = {
            version: peer.version,
            targets: peer.targets,
            dependencies: peer.dependencies,
            peer: true
        };
    }
    return result;
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
function interfaceMemberNames(jsiiType: spec.InterfaceType): string[] {
    const ret = new Array<string>();
    if (jsiiType.methods) {
        ret.push(...jsiiType.methods.map(m => m.name).filter(x => x !== undefined) as string[]);
    }
    if (jsiiType.properties) {
        ret.push(...jsiiType.properties.map(m => m.name));
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
    return name.length >= 2 && name.charAt(0) === 'I' && name.charAt(1).toUpperCase() === name.charAt(1);
}
