import colors = require('colors/safe');
import crypto = require('crypto');
import deepEqual = require('deep-equal');
import fs = require('fs-extra');
import spec = require('jsii-spec');
import log4js = require('log4js');
import path = require('path');
import ts = require('typescript');
import { Diagnostic, Emitter } from './emitter';
import literate = require('./literate');
import { ProjectInfo } from './project-info';
import utils = require('./utils');
import { Validator } from './validator';

// tslint:disable:no-var-requires Modules without TypeScript definitions
const sortJson = require('sort-json');
// tslint:enable:no-var-requires

const LOG = log4js.getLogger('jsii/assembler');

/**
 * The JSII Assembler consumes a ``ts.Program`` instance and emits a JSII assembly.
 */
export class Assembler implements Emitter {
    private _diagnostics = new Array<Diagnostic>();
    private _deferred = new Array<() => void>();
    private _types: { [fqn: string]: spec.Type };

    /**
     * @param projectInfo information about the package being assembled
     * @param program     the TypeScript program to be assembled from
     */
    public constructor(public readonly projectInfo: ProjectInfo,
                       public readonly program: ts.Program) {}

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
        for (const deferred of this._deferred) {
            deferred();
        }

        // Skip emitting if any diagnostic message is an error
        if (this._diagnostics.find(diag => diag.category === ts.DiagnosticCategory.Error) != null) {
            LOG.debug('Skipping emit due to errors.');
            // Clearing ``this._types`` to allow contents to be garbage-collected.
            delete this._types;
            try {
                return { diagnostics: this._diagnostics, emitSkipped: true };
            } finally {
                // Clearing ``this._diagnostics`` and ``this._deferred`` to allow contents to be garbage-collected.
                delete this._diagnostics;
                delete this._deferred;
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
            dependencies: _toDependencies(this.projectInfo.dependencies),
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

            // Clearing ``this._diagnostics`` and ``this._deferred`` to allow contents to be garbage-collected.
            delete this._diagnostics;
            delete this._deferred;
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
     * Defer checks for after the program has been entirely processed; useful for verifying type references that may not
     * have been discovered yet, and verifying properties about them.
     *
     * @param cb the function to be called in a deferred way. It will be bound with ``this``, so it can depend on using
     *           ``this``.
     */
    private _defer(cb: () => void) {
        this._deferred.push(cb.bind(this));
    }

    /**
     * Obtains the ``spec.Type`` for a given ``spec.NamedTypeReference``.
     *
     * @param ref the type reference to be de-referenced
     *
     * @returns the de-referenced type, if it was found, otherwise ``undefined``.
     */
    private _dereference(ref: spec.NamedTypeReference): spec.Type | undefined {
        const [assm, ] = ref.fqn.split('.');
        if (assm === this.projectInfo.name) {
            return this._types[ref.fqn];
        } else {
            const assembly = this.projectInfo.transitiveDependencies.find(dep => dep.name === assm);
            return assembly && assembly.types && assembly.types[ref.fqn];
        }
    }

    private _diagnostic(node: ts.Node | null, category: ts.DiagnosticCategory, messageText: string) {
        this._diagnostics.push({
            domain: 'JSII',
            category, code: 0,
            messageText,
            file: node != null ? node.getSourceFile() : undefined,
            start: node != null ? node.getStart() : undefined,
            length: node != null ? node.getEnd() - node.getStart() : undefined
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
        if (!groups) {
            this._diagnostic(type.symbol.valueDeclaration, ts.DiagnosticCategory.Error, `Cannot use private type ${tsName} in exported declarations`);
            return tsName;
        }
        const [, modulePath, typeName, ] = groups;
        const pkg = await _findPackageInfo(modulePath);
        if (!pkg) {
            this._diagnostic(type.symbol.valueDeclaration, ts.DiagnosticCategory.Error, `Could not find module for ${modulePath}`);
            return `unknown.${typeName}`;
        }
        const fqn = `${pkg.name}.${typeName}`;
        if (pkg.name !== this.projectInfo.name && !this._dereference({ fqn })) {
            this._diagnostic(type.symbol.valueDeclaration,
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
            const moduleType = this._typeChecker.getTypeAtLocation(node);
            if (LOG.isTraceEnabled()) {
                LOG.trace(`Entering namespace: ${colors.cyan([...namePrefix, moduleType.symbol.name].join('.'))}`);
            }
            const allTypes = new Array<spec.Type>();
            for (const prop of this._typeChecker.getExportsOfModule(moduleType.symbol)) {
                allTypes.push(...await this._visitNode(prop.declarations[0], namePrefix.concat(node.name.getText())));
            }
            if (LOG.isTraceEnabled()) {
                LOG.trace(`Leaving namespace:  ${colors.cyan([...namePrefix, moduleType.symbol.name].join('.'))}`);
            }
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

    private async _visitClass(type: ts.Type, namespace: string[]): Promise<spec.ClassType> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing class: ${colors.gray(namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
        }

        const jsiiType: spec.ClassType = {
            assembly: this.projectInfo.name,
            fqn: `${[this.projectInfo.name, ...namespace].join('.')}.${type.symbol.name}`,
            kind: spec.TypeKind.Class,
            name: type.symbol.name,
            namespace: namespace.join('.')
        };

        if (_isAbstract(type.symbol)) {
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
            this._defer(() => {
                if (!spec.isClassType(this._dereference(ref))) {
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
            for (const expression of clause.types) {
                const iface = this._typeChecker.getTypeFromTypeNode(expression);
                const typeRef = await this._typeReference(iface, iface.symbol.valueDeclaration);
                if (!spec.isNamedTypeReference(typeRef)) {
                    this._diagnostic(expression,
                                     ts.DiagnosticCategory.Error,
                                     `Interface of ${jsiiType.fqn} is not a named type (${spec.describeTypeReference(typeRef)})`);
                    continue;
                }
                this._defer(() => {
                    if (!spec.isInterfaceType(this._dereference(typeRef))) {
                        this._diagnostic(expression,
                                        ts.DiagnosticCategory.Error,
                                        `Implements clause of ${jsiiType.fqn} uses ${spec.describeTypeReference(typeRef)} as an interface`);
                    }
                });
                if (jsiiType.interfaces) {
                    jsiiType.interfaces.push(typeRef);
                } else {
                    jsiiType.interfaces = [typeRef];
                }
            }
        }

        for (const memberDecl of (type.symbol.valueDeclaration as ts.ClassDeclaration | ts.InterfaceDeclaration).members) {
            const member: ts.Symbol = (memberDecl as any).symbol;
            if (!(type.symbol.getDeclarations() || []).find(decl => decl === memberDecl.parent)) { continue; }
            if (_isHidden(member)) { continue; }
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

        const constructor = type.symbol.members && type.symbol.members.get(ts.InternalSymbolName.Constructor);
        const ctorDeclaration = constructor && (constructor.declarations[0] as ts.ConstructorDeclaration);
        if (constructor && ctorDeclaration) {
            // tslint:disable-next-line:no-bitwise
            if ((ts.getCombinedModifierFlags(ctorDeclaration) & ts.ModifierFlags.Private) === 0) {
                const signature = this._typeChecker.getSignatureFromDeclaration(ctorDeclaration);
                jsiiType.initializer = { initializer: true };
                if (signature) {
                    for (const param of signature.getParameters()) {
                        jsiiType.initializer.parameters = jsiiType.initializer.parameters || [];
                        jsiiType.initializer.parameters.push(await this._toParameter(param));
                        if (ts.isParameterPropertyDeclaration(param.valueDeclaration)) {
                            await this._visitProperty(param, jsiiType);
                        }
                        jsiiType.initializer.variadic = jsiiType.initializer.parameters
                            && jsiiType.initializer.parameters.find(p => !!p.variadic) != null;
                    }
                }
                this._visitDocumentation(constructor, jsiiType.initializer);
            }
        } else if (jsiiType.base) {
            this._defer(() => {
                const baseType = this._dereference(jsiiType.base!);
                if (!baseType) {
                    this._diagnostic(type.symbol.valueDeclaration,
                                    ts.DiagnosticCategory.Error,
                                    `Unable to resolve type ${jsiiType.base!.fqn} (base type of ${jsiiType.fqn})`);
                } else if (spec.isClassType(baseType)) {
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

        return _sortMembers(this._visitDocumentation(type.symbol, jsiiType));
    }

    private async _visitEnum(type: ts.Type, namespace: string[]): Promise<spec.EnumType> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing enum: ${colors.gray(namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
        }

        const jsiiType: spec.EnumType = {
            assembly: this.projectInfo.name,
            fqn: `${[this.projectInfo.name, ...namespace].join('.')}.${type.symbol.name}`,
            kind: spec.TypeKind.Enum,
            members: ((type as ts.UnionType).types || [])
                .map(m => this._visitDocumentation<spec.EnumMember>(m.symbol, { name: m.symbol.name })),
            name: type.symbol.name,
            namespace: namespace.join('.')
        };

        this._visitDocumentation(type.symbol, jsiiType);

        return jsiiType;
    }

    /**
     * Register documentations on a ``spec.Documentable`` entry.
     *
     * @param symbol       the symbol holding the JSDoc information
     * @param documentable the entity being documented
     *
     * @returns ``documentable``
     */
    private _visitDocumentation<T extends spec.Documentable>(symbol: ts.Symbol | ts.Signature, documentable: T): T {
        const comment = ts.displayPartsToString(symbol.getDocumentationComment(this._typeChecker));
        if (comment) {
            if (LOG.isTraceEnabled()) {
                LOG.trace(`Found documentation comment: ${colors.yellow(comment)}`);
            }
            if (documentable.docs) {
                documentable.docs.comment = comment;
            } else {
                documentable.docs = { comment };
            }
        }

        for (const tagInfo of symbol.getJsDocTags().filter(tag => tag.text && tag.name !== 'param')) {
            const tagName = _normalizeTag(tagInfo.name);
            if (LOG.isTraceEnabled()) {
                LOG.trace(`Found documentation tag ${colors.magenta(tagInfo.name)}: ${colors.yellow(tagInfo.text!)}`);
            }
            if (documentable.docs) {
                documentable.docs[tagName] = tagInfo.text!;
            } else {
                documentable.docs = { [tagName]: tagInfo.text! };
            }
        }

        return documentable;

        function _normalizeTag(name: string): string {
            switch (name) {
            case 'returns':
                return 'return';
            default:
                return name;
            }
        }
    }

    private async _visitInterface(type: ts.Type, namespace: string[]): Promise<spec.InterfaceType> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing interface: ${colors.gray(namespace.join('.'))}.${colors.cyan(type.symbol.name)}`);
        }

        const jsiiType: spec.InterfaceType = {
            assembly: this.projectInfo.name,
            fqn: `${[this.projectInfo.name, ...namespace].join('.')}.${type.symbol.name}`,
            kind: spec.TypeKind.Interface,
            name: type.symbol.name,
            namespace: namespace.join('.')
        };
        for (const base of (type.getBaseTypes() || [])) {
            const ref = await this._typeReference(base, type.symbol.valueDeclaration);
            if (!spec.isNamedTypeReference(ref)) {
                this._diagnostic(base.symbol.valueDeclaration,
                                 ts.DiagnosticCategory.Error,
                                 `Base type of ${jsiiType.fqn} is not a named type (${spec.describeTypeReference(ref)})`);
                continue;
            }
            this._defer(() => {
                if (!spec.isInterfaceType(this._dereference(ref))) {
                    const baseType = this._dereference(ref);
                    if (baseType) {
                        this._diagnostic(base.symbol.valueDeclaration,
                                        ts.DiagnosticCategory.Error,
                                        `Base type of ${jsiiType.fqn} is not an interface (${baseType.kind} ${spec.describeTypeReference(ref)})`);
                    } else {
                        this._diagnostic(base.symbol.valueDeclaration,
                            ts.DiagnosticCategory.Error,
                            `Base type of ${jsiiType.fqn} could not be resolved (${spec.describeTypeReference(ref)})`);
                    }
                }
            });
            if (jsiiType.interfaces) {
                jsiiType.interfaces.push(ref);
            } else {
                jsiiType.interfaces = [ref];
            }
        }
        for (const member of type.getProperties()) {
            if (!(type.symbol.getDeclarations() || []).find(decl => decl === member.valueDeclaration.parent)) { continue; }
            if (_isHidden(member)) { continue; }
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
        if ((jsiiType.methods || []).length === 0 && (jsiiType.properties || []).length > 0) {
            jsiiType.datatype = true;
        }

        return _sortMembers(this._visitDocumentation(type.symbol, jsiiType));
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
        const returnType = signature.getReturnType();
        const method: spec.Method = {
            abstract: _isAbstract(symbol),
            name: symbol.name,
            parameters: await Promise.all(signature.getParameters().map(p => this._toParameter(p))),
            protected: _isProtected(symbol),
            returns: _isVoid(returnType) ? undefined : await this._typeReference(returnType, declaration),
            static: _isStatic(symbol),
        };
        method.variadic = method.parameters && method.parameters.find(p => !!p.variadic) != null;

        this._visitDocumentation(symbol, method);

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
            abstract: _isAbstract(symbol),
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

        if (property.static && property.immutable && ts.isPropertyDeclaration(signature) && signature.initializer) {
            property.const = true;
        }

        this._visitDocumentation(symbol, property);

        type.properties = type.properties || [];
        type.properties.push(property);
    }

    private async _toParameter(paramSymbol: ts.Symbol): Promise<spec.Parameter> {
        if (LOG.isTraceEnabled()) {
            LOG.trace(`Processing parameter: ${colors.cyan(paramSymbol.name)}`);
        }
        const parameter: spec.Parameter = {
            name: paramSymbol.name,
            type: await this._typeReference(this._typeChecker.getTypeAtLocation(paramSymbol.valueDeclaration), paramSymbol.valueDeclaration),
            variadic: !!(paramSymbol.valueDeclaration as ts.ParameterDeclaration).dotDotDotToken
        };
        if (parameter.variadic) {
            parameter.type = (parameter.type as spec.CollectionTypeReference).collection.elementtype;
        }
        this._visitDocumentation(paramSymbol, parameter);
        return parameter;
    }

    private async _typeReference(type: ts.Type, declaration: ts.Declaration): Promise<spec.TypeReference> {
        if (type.isLiteral() && _isEnumLike(type)) {
            type = this._typeChecker.getBaseTypeOfLiteralType(type);
        } else {
            type = this._typeChecker.getApparentType(type);
        }

        const primitiveType = _tryMakePrimitiveType();
        if (primitiveType) { return primitiveType; }

        if (type.isUnion() && !_isEnumLike(type)) {
            return _unionType.call(this);
        }

        if (!type.symbol) {
            this._diagnostic(declaration, ts.DiagnosticCategory.Error, `Non-primitive types must have a symbol`);
            return { primitive: spec.PrimitiveType.Any };
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
                return { primitive: spec.PrimitiveType.Any, promise: true };
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
                elementtype = { primitive: spec.PrimitiveType.Any };
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

        function _tryMakePrimitiveType(): spec.PrimitiveTypeReference | undefined {
            if (!type.symbol) {
                // tslint:disable-next-line:no-bitwise
                if (type.flags & ts.TypeFlags.Object) {
                    return { primitive: spec.PrimitiveType.Json };
                }
                // tslint:disable-next-line:no-bitwise
                if (type.flags & (ts.TypeFlags.Any | ts.TypeFlags.Unknown)) {
                    return { primitive: spec.PrimitiveType.Any };
                }
            } else {
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

function _isAbstract(symbol: ts.Symbol): boolean {
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
 * Members with names starting with ``_`` and members that are private are hidden.
 *
 * @param symbol the symbol which should be assessed
 *
 * @return ``true`` if the symbol should be hidden
 */
function _isHidden(symbol: ts.Symbol): boolean {
    return !symbol.valueDeclaration
        || symbol.name.startsWith('_')
        // tslint:disable-next-line:no-bitwise
        || (ts.getCombinedModifierFlags(symbol.valueDeclaration) & ts.ModifierFlags.Private) !== 0;
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

function _toDependencies(assemblies: ReadonlyArray<spec.Assembly>): { [name: string]: spec.PackageVersion } {
    const result: { [name: string]: spec.PackageVersion } = {};
    for (const assembly of assemblies) {
        result[assembly.name] = {
            version: assembly.version,
            targets: assembly.targets,
            dependencies: assembly.dependencies
        };
    }
    return result;
}
