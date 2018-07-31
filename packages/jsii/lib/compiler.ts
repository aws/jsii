import Case = require('case');
import clone = require('clone');
import crypto = require('crypto');
import deepEqual = require('deep-equal');
import fs = require('fs-extra');
import glob = require('glob');
import spec = require('jsii-spec');
import path = require('path');
import ts = require('typescript');
import util = require('util');
import { getCompilerOptions, saveCompilerOptions, saveLinterOptions } from './compiler-options';
import { fileSystemLoader, includeAndRenderExamples, loadFromFile } from './literate';
import readPackageMetadata from './package-metadata';
import { filterEmpty } from './util';

// tslint:disable-next-line:no-var-requires
const sortJson = require('sort-json');

/**
 * Given a CommonJS (npm) typescript package, produces a JSII specification for it.
 * @param packageDir Root directory of the package (where package.json resides)
 * @param includeDirs list of directories to include
 */
export async function compilePackage(packageDir: string, includeDirs = [ 'test', 'bin' ]): Promise<spec.Assembly> {
    // read package.json and validate that we have what we need there
    const pkg = await readPackageMetadata(packageDir);

    // determine typescript program entrypoint
    if (!await fs.pathExists(pkg.entrypoint)) {
        throw new Error('Cannot find entrypoint: ' + pkg.entrypoint);
    }

    // glob all ts files in dirs to include
    const files = new Array<string>();
    for (const dir of includeDirs) {
        const dirFiles = await aglob(`${packageDir}/${dir}/**/*.ts`);
        for (const file of dirFiles) {
            if (file.endsWith('.d.ts') && dirFiles.indexOf(file.replace(/\.d\.ts$/, '.ts')) !== -1) {
                // .d.ts files matching a .ts file should be ignored.
                continue;
            }
            files.push(file);
        }
    }

    // write a copy of the compiler options to the root of the package so IDEs can find it
    // also add to .gitignore to make sure it is not checked in.
    await saveCompilerOptions(packageDir);
    await saveLinterOptions(packageDir);

    const targets = new Set(Object.keys(pkg.targets));
    const { lookup, dependencies, bundled } = await readDependencies(packageDir, pkg.dependencies, pkg.bundledDependencies, targets);

    const assm: spec.Assembly = {
        schema: spec.SchemaVersion.V1_0,
        name: pkg.name,
        version: pkg.version.replace(/\+.+$/, ''),
        targets: {
            ...pkg.targets,
            // automatically add a "js" target based on the npm name.
            js: { npm: pkg.name }
        },
        readme: await loadReadme(packageDir),
        dependencies,
        bundled,
        fingerprint: '<TBD>',
        types: {}
    };
    await compileSources(pkg.entrypoint, files, lookup, assm);

    return normalizeAssembly();

    /**
     * Normalizes (aka sorts) and fingerprints the assembly.
     */
    function normalizeAssembly() {
        const sorted = sortJson(assm);
        // Not accounting for the 'fingerprint' field when fingerprinting.
        delete sorted.fingerprint;
        const fingerprint = crypto.createHash('sha256')
                                  .update(JSON.stringify(sortJson(sorted), filterEmpty))
                                  .digest('base64');
        return { fingerprint, ...sorted } as spec.Assembly;
    }
}

async function loadReadme(packageDir: string): Promise<{ markdown: string } | undefined> {
    const readme = path.join(packageDir, 'README.md');

    if (!await fs.pathExists(readme)) {
        // tslint:disable-next-line:no-console
        console.error(`No README.md file found at ${readme} ☹️`);
        return undefined;
    }

    const renderedLines = await includeAndRenderExamples(
        await loadFromFile(readme),
        fileSystemLoader(packageDir));

    return { markdown: renderedLines.join('\n') };
}

interface ReferencedFqn {
    fqn: string
    ctx: string[]
}

/**
 * Compiles a set of source files and returns a spec. Note that the spec will not contain package information.
 * @param entrypoint            The main source file.
 * @param otherSources          Other source files to include.
 * @param externalTypes         Types imported from dependencies
 * @params assm                 The assembly to add types to.
 * @param treatWarningsAsErrors Fail on warnings
 */
export async function compileSources(entrypoint: string,
                                     otherSources = new Array<string>(),
                                     externalTypes = new Map<string, spec.Type>(),
                                     assm: spec.Assembly,
                                     treatWarningsAsErrors = false): Promise<void> {
    const options = getCompilerOptions();
    const prog = compileProgramSync([ entrypoint, ...otherSources ], options);
    const typeChecker = prog.getTypeChecker();
    const sourceFile = prog.getSourceFile(prog.getRootFileNames()[0]);
    if (!sourceFile) { throw new Error('No source file found!'); }
    const rootModule = typeChecker.getSymbolAtLocation(sourceFile);

    // this is it, start parsing...
    const types = new Array<spec.Type>();

    // collect all refs to FQNs so we can validate we don't use unexported types
    const typeRefs = new Set<ReferencedFqn>();

    if (rootModule) {
        await processModule(rootModule, []);
        addTypeInfo(assm, types);
        verifyUnexportedTypes(assm, typeRefs, externalTypes);
        validateOverriddenSignatures(assm);
        normalizeInitializers(assm, externalTypes);
    }

    return; // Below this are helper functions

    /**
     * Process a module
     */
    async function processModule(symbol: ts.Symbol, ctx: string[]): Promise<void> {
        ctx = newContext(ctx, symbol.name);

        const moduleExports = symbol.exports && typeChecker.getExportsOfModule(symbol);
        if (!moduleExports) {
            return;
        }

        for (const ex of moduleExports) {
            if (isKind(ex, ts.SyntaxKind.ClassDeclaration)) {
                const cls = await tryProcessClass(ex, ctx);
                if (cls) {
                    types.push(cls);
                }
            }

            if (isKind(ex, ts.SyntaxKind.EnumDeclaration)) {
                const en = await tryProcessEnum(ex, ctx);
                if (en) {
                    types.push(en);
                }
            }

            if (isInterface(ex)) {
                const iface = await tryProcessInterface(ex, ctx);
                if (iface) {
                    types.push(iface);
                }
            }

            // both classes and enums can also be namespaces, so we try to recursively process.
            await processModule(ex, ctx);
        }
    }

    function isInterface(sym: ts.Symbol) {
        return sym.declarations &&
            sym.declarations.length > 0 &&
            sym.declarations[0].kind === ts.SyntaxKind.InterfaceDeclaration;
    }

    async function tryProcessBaseType(type: ts.Type, ctx: string[]): Promise<spec.NamedTypeReference | undefined> {
        ctx = newContext(ctx, type.symbol ? type.symbol.name : '<unknown-base-class>');

        const baseTypes = type.getBaseTypes();
        if (!baseTypes || baseTypes.length === 0) {
            return undefined;
        }

        if (baseTypes.length !== 1) {
            throw error(ctx, 'Only a single base type is allowed: ' + (type.symbol && type.symbol.name));
        }

        const resolvedType = await resolveType(baseTypes[0], ctx);
        if (!spec.isNamedTypeReference(resolvedType)) {
            throw error(ctx, 'Unexpected base type: ' + JSON.stringify(resolvedType));
        }

        return resolvedType;
    }

    async function tryProcessClassInterfaces(decl: ts.ClassDeclaration, ctx: string[]): Promise<spec.NamedTypeReference[] | undefined> {
        if (!decl.heritageClauses) {
            return;
        }

        const result = new Array<spec.NamedTypeReference>();

        for (const hc of decl.heritageClauses) {
            if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
                continue; // base classes are handled in tryProcessBaseClass
            }

            if (hc.token !== ts.SyntaxKind.ImplementsKeyword) {
                throw error(ctx, 'Invalid heritage clause token ' + ts.SyntaxKind[hc.token]);
            }

            for (const expr of hc.types || [ ]) {
                const type = typeChecker.getTypeFromTypeNode(expr);

                const ref: spec.NamedTypeReference = {
                    fqn: await getFullyQualifiedName(type.symbol!, ctx)
                };

                result.push(ref);
            }
        }

        return result;
    }

    async function tryProcessInterface(symbol: ts.Symbol, ctx: string[]): Promise<spec.InterfaceType | undefined> {
        ctx = newContext(ctx, symbol.name);

        const name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name');
        }

        const decl = symbol.declarations![0] as ts.InterfaceDeclaration;

        const entity: spec.InterfaceType = {
            kind: spec.TypeKind.Interface,
            ...makeEntityName(name, ctx)
        };

        checkTypeName(entity.name, ctx);

        addDocumentation(entity, symbol);

        const interfaceType = typeChecker.getDeclaredTypeOfSymbol(symbol);
        const bases = new Array<spec.NamedTypeReference>();
        const baseTypes = interfaceType.getBaseTypes() || [];
        for (const base of baseTypes) {
            const fqn = await getFullyQualifiedName(base.symbol!, ctx);
            bases.push({ fqn });
        }
        entity.interfaces = bases;
        entity.methods = [];
        entity.properties = [];

        const props = interfaceType.getProperties();

        if (props) {
            for (const mem of props) {
                if (!mem.valueDeclaration) {
                    throw error(ctx, entity.fqn + ' - unexpected error for member: ' + mem.name);
                }

                // Skip properties that are not direct members of this type.
                if (mem.valueDeclaration.parent !== decl) {
                    continue;
                }

                // interfaces only support methods
                if (ts.isMethodSignature(mem.valueDeclaration)) {
                    const method = await tryProcessMethod(mem, ctx);
                    if (method) {
                        if (!entity.methods) { entity.methods = []; }
                        entity.methods.push(method);
                    }
                    continue;
                }

                if (mem.valueDeclaration.kind === ts.SyntaxKind.PropertySignature) {
                    const prop = await tryProcessProperty(mem, ctx);
                    if (prop) {
                        entity.properties.push(prop);
                    }
                    continue;
                }

                throw error(ctx, entity.fqn + ' - unsupported member kind <' + ts.SyntaxKind[mem.valueDeclaration.kind] + '>: ' + mem.name);
            }
        }

        // if interface only has props, it's considered a datatype.
        if (entity.methods.length === 0 && entity.properties.length > 0) {
            entity.datatype = true;
        }

        return entity;
    }

    async function tryProcessClass(symbol: ts.Symbol, ctx: string[]): Promise<spec.ClassType | undefined> {
        ctx = newContext(ctx, symbol.name);

        const name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name');
        }

        const decl = symbol.valueDeclaration as ts.ClassDeclaration;

        if (isHidden(decl)) {
            return undefined;
        }
        const entity: spec.ClassType = {
            kind: spec.TypeKind.Class,
            ...makeEntityName(name, ctx)
        };

        checkTypeName(entity.name, ctx);

        addDocumentation(entity, symbol);

        const classType = typeChecker.getDeclaredTypeOfSymbol(symbol);

        const base = await tryProcessBaseType(classType, ctx);
        if (base) {
            entity.base = base;
        }

        entity.interfaces = await tryProcessClassInterfaces(decl, ctx);

        if (isAbstract(decl)) {
            entity.abstract = true;
        }

        entity.initializer = await tryProcessConstructor(symbol, ctx);

        for (const memberDecl of decl.members) {
            const mem = (memberDecl as any).symbol;

            // handle parameter properties (shortcut to defining properties via ctor parameters)
            if (ts.isConstructorDeclaration(memberDecl)) {
                const sig = typeChecker.getSignatureFromDeclaration(memberDecl);
                if (sig) {
                    for (const p of sig.parameters) {
                        if (ts.isParameterPropertyDeclaration(p.valueDeclaration!)) {
                            const prop = await tryProcessProperty(p, ctx);
                            if (prop) {
                                entity.properties = entity.properties || [];
                                entity.properties.push(prop);
                            }
                        }
                    }
                }
            }

            // Skip properties that are not direct members of this type.
            if (!isMemberOfClass(mem, symbol.valueDeclaration)) {
                continue;
            }

            // filter out private/protected
            if (!isPublic(memberDecl)) {
                continue;
            }

            if (ts.isMethodDeclaration(memberDecl)) {
                const method = await tryProcessMethod(mem, ctx);
                if (method) {
                    entity.methods = entity.methods || [];
                    entity.methods.push(method);
                }
                continue;
            }

            if (ts.isPropertyDeclaration(memberDecl) || ts.isParameterPropertyDeclaration(memberDecl)) {
                const prop = await tryProcessProperty(mem, ctx);
                if (prop) {
                    entity.properties = entity.properties || [];
                    entity.properties.push(prop);
                }
                continue;
            }

            if (ts.isGetAccessorDeclaration(memberDecl)) {
                const prop = await tryProcessAccessor(mem, ctx);
                if (prop) {
                    entity.properties = entity.properties || [];
                    entity.properties.push(prop);
                }
                continue;
            }

            // skip "set" accessors because they are covered by the getter.
            if (ts.isSetAccessorDeclaration(memberDecl)) {
                continue;
            }

            warning(ctx, entity.fqn + ' - unsupported member kind <' + ts.SyntaxKind[memberDecl.kind] + '>: ' + mem.name);
        }

        return entity;
    }

    async function tryProcessConstructor(classSymbol: ts.Symbol, ctx: string[]) {
        ctx = newContext(ctx, '__ctor__');

        if (!classSymbol.members) {
            return undefined;
        }

        const member = classSymbol.members.get(ts.InternalSymbolName.Constructor);
        if (!member) {
            return undefined;
        }

        const decl = member.declarations && member.declarations[0];
        if (!decl) {
            throw error(ctx, 'Unable to determine constructor declaration');
        }

        const signature = typeChecker.getSignatureFromDeclaration(decl as ts.ConstructorDeclaration);
        if (!signature) {
            throw error(ctx, 'Unable to determine constructor signature');
        }

        const initializer: spec.Method = {
            parameters: [], // So this can be recognized as a Method by `addDocumentation`
            initializer: true
        };

        addDocumentation(initializer, member);

        for (const p of signature.getParameters()) {
            try {
                const param = await processParameter(p, ctx);
                initializer.parameters = initializer.parameters || [];
                initializer.parameters.push(param);
                if (param.variadic) { initializer.variadic = true; }
            } catch (e) {
                // if a parameter could not be added, but it's optional
                // we just stop processing more parameters
                if (typeChecker.isOptionalParameter(p.valueDeclaration as ts.ParameterDeclaration)) {
                    warning(ctx, 'Skipping all parameters from', p.escapedName);
                    break;
                }

                throw e;
            }
        }

        return initializer;
    }

    async function tryProcessEnum(symbol: ts.Symbol, ctx: string[]): Promise<spec.EnumType | undefined> {
        ctx = newContext(ctx, symbol.name);

        const name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name for enum: ' + symbol.getName());
        }

        if (isHidden(symbol.valueDeclaration as ts.EnumDeclaration)) {
            return undefined;
        }

        const entity: spec.EnumType = {
            kind: spec.TypeKind.Enum,
            ...makeEntityName(name, ctx),
            members: []
        };
        addDocumentation(entity, symbol);
        checkTypeName(entity.name, ctx);

        const decl = symbol.valueDeclaration as ts.EnumDeclaration;

        for (const mem of decl.members) {
            entity.members.push({ name: mem.name.getText() });
        }

        return entity;
    }

    async function processParameter(symbol: ts.Symbol, ctx: string[]): Promise<spec.Parameter> {
        ctx = newContext(ctx, symbol.name);

        const decl = symbol.valueDeclaration as ts.ParameterDeclaration;

        const typeAtLocation = typeChecker.getTypeAtLocation(decl);
        const param: spec.Parameter = {
            name: decl.name.getText(),
            type: await resolveType(typeAtLocation, ctx),
        };
        addDocumentation(param, symbol);

        if (decl.dotDotDotToken) {
            param.variadic = true;
            // TypeScript requires variadic arguments are typed as lists, but JSII represents them as scalars.
            if (!spec.isCollectionTypeReference(param.type)) {
                throw new Error(`Invalid variadic parameter ${param.name}: type ${JSON.stringify(param.type)} is not a collection`);
            }
            param.type = param.type.collection.elementtype;
        }

        if (spec.isUnionTypeReference(param.type)) {
            throw error(ctx, 'Unions are not allowed for parameter types');
        }

        if (typeChecker.isOptionalParameter(decl)) {
            param.type = { ...param.type, optional: true };
        }

        return param;
    }

    async function tryProcessMethod(symbol: ts.Symbol, ctx: string[]): Promise<spec.Method | undefined> {
        ctx = newContext(ctx, symbol.name);
        const decl = symbol.valueDeclaration as ts.MethodDeclaration;

        if (isHidden(decl)) {
            return undefined;
        }

        const method: spec.Method = {
            name: decl.name.getText(),
            parameters: [], // So this can be recognized as a Method by `addDocumentation`
        };

        if (hasModifier(decl, ts.SyntaxKind.StaticKeyword)) {
            method.static = true;
        }

        if (isProtected(decl)) {
            method.protected = true;
        }

        if (isAbstract(decl)) {
            method.abstract = true;
        }

        const methodSignature = typeChecker.getSignatureFromDeclaration(decl);
        if (!methodSignature) {
            throw error(ctx, 'cannot determine signature from method declaration');
        }

        if (methodSignature.getTypeParameters()) {
            throw error(ctx, 'Generics are not supported');
        }

        addDocumentation(method, symbol);
        // tslint:disable-next-line:no-bitwise
        const returnsVoid = methodSignature.getReturnType().flags & ts.TypeFlags.Void;
        if (!returnsVoid) {
            method.returns = await resolveType(methodSignature.getReturnType(), ctx);
        }

        const params = methodSignature.getParameters();
        if (params) {
            for (const p of params) {
                const param = await processParameter(p, ctx);
                method.parameters = method.parameters || [];
                method.parameters.push(param);
                if (param.variadic) { method.variadic = true; }
            }
        }

        checkMemberName(method, false, ctx);

        return method;
    }

    async function tryProcessAccessor(symbol: ts.Symbol, ctx: string[]): Promise<spec.Property | undefined> {
        ctx = newContext(ctx, symbol.name);

        if (!symbol.declarations) {
            throw error(ctx, 'unable to extract declarations');
        }

        let getterDecl: ts.SignatureDeclaration | null = null;
        let setterDecl: ts.SignatureDeclaration | null = null;

        for (const decl of symbol.declarations) {
            if (ts.isGetAccessorDeclaration(decl)) {
                getterDecl = decl;
            } else if (ts.isSetAccessorDeclaration(decl)) {
                setterDecl = decl;
            } else {
                throw error(ctx, 'invalid declaration on accessor');
            }
        }

        if (!getterDecl) {
            throw error(ctx, 'all properties must have a getter (setters are optional)');
        }

        if (isHidden(getterDecl)) {
            return undefined;
        }

        const signature = typeChecker.getSignatureFromDeclaration(getterDecl);
        if (!signature) {
            throw error(ctx, 'cannot resolve property signature');
        }

        const prop: spec.Property = {
            name: symbol.name,
            type: await resolveType(signature.getReturnType(), ctx)
        };

        addDocumentation(prop, symbol);

        if (hasModifier(getterDecl, ts.SyntaxKind.StaticKeyword)) {
            prop.static = true;
        }

        if (!setterDecl) {
            prop.immutable = true;
        }

        // in typescript getter and setter must agree on visibility, so we can just check the getter (which must exist).
        if (isProtected(getterDecl)) {
            prop.protected = true;
        }

        checkMemberName(prop, true, ctx);

        return prop;
    }

    async function tryProcessProperty(symbol: ts.Symbol, ctx: string[]): Promise<spec.Property | undefined> {
        ctx = newContext(ctx, symbol.name);

        const decl = symbol.valueDeclaration as ts.PropertyDeclaration;

        if (isHidden(decl)) {
            return undefined;
        }

        const typeAtLocation = typeChecker.getTypeAtLocation(decl);
        const prop: spec.Property = {
            name: decl.name.getText(),
            type: await resolveType(typeAtLocation, ctx)
        };
        addDocumentation(prop, symbol);

        if (hasModifier(decl, ts.SyntaxKind.StaticKeyword)) {
            prop.static = true;
        }

        if (hasModifier(decl, ts.SyntaxKind.ReadonlyKeyword)) {
            prop.immutable = true;
        }

        if (decl.questionToken) {
            prop.type = { ...prop.type, optional: true };
        }

        if (isProtected(decl)) {
            prop.protected = true;
        }

        if (isAbstract(decl)) {
            prop.abstract = true;
        }

        // add a "const" hint if this property has an initializer (i.e. "=
        // VAL"), is static and immutable.
        if (decl.initializer && prop.static && prop.immutable) {
            prop.const = true;
        }

        checkMemberName(prop, true, ctx);

        return prop;
    }

    async function tryResolveCollectionType(type: ts.Type, ctx: string[]) {
        if (!type.symbol) {
            return undefined;
        }

        if (type.symbol.name === 'Array') {
            return await resolveArrayType(type, ctx);
        }

        // this indicates a map in the form of { [key: s]: v }
        if (type.symbol.name === '__type' && type.symbol.members) {
            return await resolveMapType(type, ctx);
        }

        return undefined;
    }

    async function resolveArrayType(type: ts.Type, ctx: string[]): Promise<spec.CollectionTypeReference> {
        const typeRef = type as ts.TypeReference;
        if (!typeRef.typeArguments) {
            throw error(ctx, 'Array must be defined with a single type argument <T>');
        }

        if (typeRef.typeArguments.length !== 1) {
            throw error(ctx, 'Array<> can only have a single type argument');
        }

        return {
            collection: {
                elementtype: await resolveType(typeRef.typeArguments[0], ctx),
                kind: spec.CollectionKind.Array
            }
        };
    }

    async function resolveMapType(type: ts.Type, ctx: string[]): Promise<spec.TypeReference> {
        const objectType = type.getStringIndexType();
        if (!objectType) {
            throw error(ctx, 'Only string indexes are supported');
        }

        return {
            collection: {
                elementtype: await await resolveType(objectType, ctx),
                kind: spec.CollectionKind.Map
            }
        };
    }

    function includesType(searched: spec.TypeReference[], item: spec.TypeReference) {
        const json = JSON.stringify(item);
        return searched.map(x => JSON.stringify(x)).filter(x => x === json).length > 0;
    }

    async function resolveUnionType(type: ts.UnionType, ctx: string[]): Promise<spec.TypeReference> {
        const typeRef: spec.UnionTypeReference = { union: { types: [] } };
        let optional: boolean | undefined;

        for (const subtype of type.types) {
            // If a union contains "undefined", it simply means it's an optional
            // tslint:disable-next-line:no-bitwise
            if (subtype.flags & ts.TypeFlags.Undefined) {
                optional = true;
                continue;
            }

            const resolvedType = await resolveType(subtype, ctx);
            if (includesType(typeRef.union.types, resolvedType)) {
                continue;
            }

            typeRef.union.types.push(resolvedType);
        }

        // if the union type only has one type, it was probably because we had <undefined | Bla>, so we can
        // convert this to a normal type.
        if (typeRef.union.types.length === 1) {
            return { ...typeRef.union.types[0], optional };
        }

        return typeRef;
    }

    async function resolveType(type: ts.Type, ctx: string[]): Promise<spec.TypeReference> {
        ctx = newContext(ctx, type.symbol ? type.symbol.name : '<unknown-type>');

        if (type.isLiteral()) {
            // Literals need to be represented using their base type. Enums are handled differently, because they are Union types.
            type = isEnumLike(type) ? typeChecker.getBaseTypeOfLiteralType(type)
                                    : typeChecker.getApparentType(type);
        } else {
            // Some types are represented by "intrinsic" types, which need be converted to their "apparent" counterpart.
            type = typeChecker.getApparentType(type);
        }

        // Enum types are also Union types, but they shouldn't be resolved as unions.
        if (type.isUnion() && !isEnumLike(type)) {
            return resolveUnionType(type, ctx);
        }

        const primitiveType = tryResolvePrimitiveType(type);
        if (primitiveType) {
            const res: spec.PrimitiveTypeReference = {
                primitive: primitiveType
            };
            return res;
        }

        if (!type.symbol) {
            throw error(ctx, 'Non-primitive types are expected to have a name');
        }

        const collectionType = await tryResolveCollectionType(type, ctx);
        if (collectionType) {
            return collectionType;
        }

        const promiseType = tryResolvePromiseType(type);
        if (promiseType) {
            const resolvedType = await resolveType(promiseType, ctx);
            resolvedType.promise = true;
            return resolvedType;
        }

        const ret: spec.NamedTypeReference = {
            fqn: await getFullyQualifiedName(type.symbol, ctx)
        };

        // add this FQN to the list of types referenced by our public APIs.
        // this will be crossed referenced later with the list of exported types
        // so we won't export unexported types in the public api.
        typeRefs.add({ fqn: ret.fqn, ctx });

        return ret;

        /**
         * If `aType` represents a Promise, returns the promised type.
         */
        function tryResolvePromiseType(aType: ts.Type) {
            const typeAny = aType as any;

            if (aType.symbol && aType.symbol.escapedName === 'Promise') {
                if (!typeAny.typeArguments || typeAny.typeArguments.length !== 1) {
                    throw new Error('Invalid promise type, must be in the form Promise<T>');
                }

                return typeAny.typeArguments[0];
            }

            if (typeAny.promisedTypeOfPromise) {
                return typeAny.promisedTypeOfPromise;
            }

            return undefined;
        }

        /**
         * Attempts to resolve the type at hand as a primitive type and returns the name of the
         * primitive type if successful. Otherwise returns null.
         */
        function tryResolvePrimitiveType(aType: ts.Type): spec.PrimitiveType | undefined {
            // tslint:disable-next-line:no-bitwise
            if (!aType.symbol && aType.flags & ts.TypeFlags.Object) {
                return spec.PrimitiveType.Json;
            }
            // tslint:disable-next-line:no-bitwise
            if (!aType.symbol && aType.flags & ts.TypeFlags.Any) {
                return spec.PrimitiveType.Any;
            }

            if (!aType.symbol) {
                throw error(ctx, `Unable to resolve type (flags: ${flagNames(aType).join(', ')})`);
            }

            if (aType.symbol.name === 'Date') {
                return spec.PrimitiveType.Date;
            }

            if (aType.symbol.name === 'String') {
                return spec.PrimitiveType.String;
            }

            if (aType.symbol.name === 'Number') {
                return spec.PrimitiveType.Number;
            }

            if (aType.symbol.name === 'Boolean') {
                return spec.PrimitiveType.Boolean;
            }

            return undefined;
        }

        function isEnumLike(t: ts.Type): boolean {
            // tslint:disable-next-line:no-bitwise
            return (t.getFlags() & ts.TypeFlags.EnumLike) !== 0;
        }

        function flagNames(t: ts.Type): string[] {
            const result = new Array<string>();
            for (const flag of Object.keys(ts.TypeFlags)) {
                // Number-enums have item indexes in Object.keys
                if (!isNaN(Number(flag))) { continue; }
                const flagValue = (ts.TypeFlags as any)[flag];
                // tslint:disable-next-line:no-bitwise
                if (t.getFlags() & flagValue) {
                    result.push(flag);
                }
            }
            return result;
        }
    }

    /**
     * Given a type symbol, returns a qualified type name.
     */
    async function getFullyQualifiedName(typeSymbol: ts.Symbol, ctx: string[]) {
        ctx = newContext(ctx, typeSymbol.name);

        const fqn = typeChecker.getFullyQualifiedName(typeSymbol);
        const groups = /\"([^\"]+)\"\.(.*)/.exec(fqn);
        if (!groups) {
            throw error(ctx, `Cannot use unexported type '${fqn}' in a public API`);
        }

        const modulePath = groups[1];
        const typeName = groups[2];

        const packageConfig = await findPackageConfig(modulePath);
        if (!packageConfig) {
            throw error(ctx, 'Cannot find package.json up the tree from: ' + modulePath);
        }

        const moduleName = packageConfig.name;
        const jsiiName = moduleName + '.' + typeName;
        // Record to typeRefs, so the type's validity is verified.
        typeRefs.add({ fqn: jsiiName, ctx });
        return jsiiName;
    }

    function addDocumentation(target: spec.Documentable, symbol: ts.Symbol) {
        for (const tag of symbol.getJsDocTags()) {
            // Don't duplicate @params, they're handled on the params themselves...
            if (tag.name !== 'param') {
                target.docs = target.docs || {};
                target.docs[normalize(tag.name)] = tag.text || '';
            }
        }

        const comment = ts.displayPartsToString(symbol.getDocumentationComment(typeChecker));
        if (comment) {
            target.docs = target.docs || {};
            target.docs.comment = comment;
        }

        function normalize(tagName: string): string {
            switch (tagName) {
                // JavaDoc is very particular about it being @return.
                case 'returns': return 'return';
                default: return tagName;
            }
        }
    }

    function isMemberOfClass(memberSymbol: ts.Symbol, classDecl?: ts.Declaration) {
        if (!classDecl) {
            return false;
        }

        if (!memberSymbol.valueDeclaration) {
            return false;
        }

        if (!memberSymbol.valueDeclaration.parent) {
            return false;
        }

        //
        // NOTE: the reason we also support parent.parent is to accomodate ParameterPropertyDeclaration
        //
        //    constructor(readonly prop: type)
        //
        // in which case the ctor is the first parent and the class is the second parent.
        //

        return memberSymbol.valueDeclaration.parent === classDecl ||
            memberSymbol.valueDeclaration.parent.parent === classDecl;
    }

    function isHidden(decl: ts.NamedDeclaration) {
        if (!decl.name) {
            return false;
        }

        if (decl.name.getText().indexOf('_') === 0) {
            return true;
        }

        if (hasModifier(decl, ts.SyntaxKind.PrivateKeyword)) {
            return true;
        }

        return false;
    }

    async function findPackageConfig(modulePath: string): Promise<any | undefined> {

        if (modulePath === '/') {
            return undefined;
        }

        const packageFile = path.join(modulePath, 'package.json');

        const exists = await new Promise<boolean>(done => fs.exists(packageFile, done));
        if (exists) {
            const data = await new Promise<Buffer>((ok, fail) => fs.readFile(packageFile, (err, buf) => err ? fail(err) : ok(buf)));
            return JSON.parse(data.toString());
        }

        return await findPackageConfig(path.dirname(modulePath));
    }

    /**
     * Determines if the main declaration of the symbol is of a desired kind.
     */
    function isKind(symbol: ts.Symbol, kind: ts.SyntaxKind) {
        return symbol.valueDeclaration && symbol.valueDeclaration.kind === kind;
    }

    /**
     * Returns true if a declaration has a specified modifier.
     */
    function hasModifier(decl: ts.Declaration, kind: ts.SyntaxKind) {
        if (!decl.modifiers) {
            return false;
        }

        for (const modifier of decl.modifiers) {
            if (modifier.kind === kind) {
                return true;
            }
        }

        return false;
    }

    function isProtected(decl: ts.Declaration) {
        return hasModifier(decl, ts.SyntaxKind.ProtectedKeyword);
    }

    function isAbstract(decl: ts.Declaration) {
        return hasModifier(decl, ts.SyntaxKind.AbstractKeyword);
    }

    /**
     * Given a declaration, returns true if this entity should be included.
     * For example, if it is 'private', it won't be included.
     */
    function isPublic(decl: ts.Declaration) {
        return !hasModifier(decl, ts.SyntaxKind.PrivateKeyword);
    }

    function makeEntityName(fqn: string, ctx: string[]) {
        const parts = fqn.split('.');

        // fqn may be <assembly>.<name> or <assembly>...<namespace>...<name>
        if (parts.length < 2) {
            throw error(ctx, `Unable to parse fqn '${fqn}. Expecting at least 2 components`);
        }

        return {
            fqn,
            assembly: parts[0], // First segment is the assembly name
            namespace: parts.slice(0, parts.length - 1).join('.'),
            name: parts[parts.length - 1]
        };
    }

    function startsWithUpperCase(symbol: string) {
        if (!symbol) { return false; }
        const firstChar = symbol.substr(0, 1);
        return (firstChar.toLocaleUpperCase() === firstChar);
    }

    function checkMemberName(member: spec.Property | spec.Method, isProperty: boolean, ctx: string[]) {
        const symbol = member.name;
        if (!symbol) { return; } // i.e. initializer

        // static properties should be all-caps (with a potential underscore). all the rest are the same
        if (isProperty && member.static) {

            if ((member as any).const) {

                if (Case.pascal(symbol) !== symbol && Case.snake(symbol).toUpperCase() !== symbol && Case.camel(symbol) !== symbol) {
                    throw error(ctx, `'${symbol}' is a const and must use PascalCase, UPPER_SNAKE_CASE or camelCase`);
                } else {
                    return;
                }
            }

            if (Case.camel(symbol) !== symbol) {
                throw error(ctx, `'${symbol}' is a static property and must use camelCase`);
            } else {
                return;
            }
        }

        // symbol must start with a lowercase letter (this is how we determine it is camel-case).
        if (Case.camel(symbol) !== symbol) {
            throw error(ctx, `'${symbol}' must use camelCase`);
        }

        // do not allow props/methods use the form getXxx() or setXxx(v), which is used in Java
        // for property methods.

        let paramCount = 0;
        if ((member as spec.Method).parameters) {
            paramCount = ((member as spec.Method).parameters || []).length;
        }

        if (symbol.startsWith('get') && startsWithUpperCase(symbol.substr(3)) && paramCount === 0) {
            // tslint:disable-next-line:max-line-length
            throw error(ctx, 'Methods and properties cannot have the signature getXxx() since these will conflict with Java property getters by the same name');
        }

        if (symbol.startsWith('set') && startsWithUpperCase(symbol.substr(3)) && paramCount === 1) {
            throw error(ctx, 'Methods and properties cannot have the signature setXxx(v) since these will conflict with Java property setters');
        }
    }

    function checkTypeName(symbol: string, ctx: string[]) {
        if (!symbol) { return; }

        if (Case.pascal(symbol) !== symbol) {
            throw error(ctx, `Type names must use PascalCase: ${symbol}`);
        }
    }

    function warning(ctx: string[], ...args: any[]) {
        if (treatWarningsAsErrors) {
            return error(ctx, ...args);
        }
        // tslint:disable-next-line:no-console
        console.error(formatMessage('WARNING', ctx, ...args));
    }

    function error(ctx: string[], ...args: any[]) {
        throw new Error(formatMessage('ERROR', ctx, ...args));
    }

    function formatMessage(pre: string, ctx: string[], ...args: any[]) {
        return util.format(pre, ...args) + '\n --------> Scope: ' + ctx.join('=>');
    }

    function newContext(ctx: string[], value: string) {
        return ctx.concat([ value ]);
    }
}

function compileProgramSync(files: string[], options: ts.CompilerOptions) {
    const host = ts.createCompilerHost(options);

    // for some odd reason `option.lib` doesn't do what it is expected to do
    // so we manually add each lib as a file and remove 'option.lib'.
    const libsDir = host.getDefaultLibLocation && host.getDefaultLibLocation();
    if (!libsDir) {
        throw new Error('Cannot find typescript "lib" directory');
    }
    const libs = options.lib || [];
    for (const lib of libs) {
        files.push(path.join(libsDir, `lib.${lib}.d.ts`));
    }
    delete options.lib;

    const prog = ts.createProgram(files, options, host);

    const result = prog.emit();
    const errors = ts.getPreEmitDiagnostics(prog).concat(result.diagnostics);

    for (const d of errors) {
        const file = d.file;
        const start = d.start;
        if (!file || !start) {
            // tslint:disable-next-line:no-console
            console.log(`ERROR: ${ts.flattenDiagnosticMessageText(d.messageText, '\n')}`);
        } else {
            const { line, character } = file.getLineAndCharacterOfPosition(start);
            const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
            // tslint:disable-next-line:no-console
            console.log(`ERROR: ${file.fileName} (${line + 1},${character + 1}): ${message}`);
        }
    }

    if (errors.length > 0) {
        throw new Error('Build failed');
    }

    return prog;
}

/**
 * Ensures that all types have an initializer.
 * - If there's a base class with an initializer, it will be cloned.
 * - If not, an empty initializer is defined.
 * This is because JavaScript does that implicitly (but in many languages this is not the case), so we might as well do it here.
 */
function normalizeInitializers(mod: spec.Assembly, externalTypes: Map<string, spec.Type>) {
    for (const type of Object.values(mod.types || {})) {
        if (type.kind === spec.TypeKind.Class) {
            normalize(type as spec.ClassType);
        }
    }

    function normalize(cls: spec.ClassType) {
        // if we already have an initializer, we are done.
        if (cls.initializer) {
            return;
        }

        // if we don't have a base class, produce an initializer without any arguments
        if (!cls.base) {
            cls.initializer = { initializer: true };
            return;
        }

        if (!cls.base.fqn) {
            throw new Error('No FQN for base class. Impossible!');
        }

        // normalize initializer for base class first
        let base = mod.types![cls.base.fqn] as spec.ClassType;
        if (base) {
            normalize(base);
        } else {
            const externalBase = externalTypes.get(cls.base.fqn);
            if (!externalBase) {
                throw new Error(`Cannot find base type '${cls.base.fqn}' of ${cls.name} neither as local or external type`);
            }

            base = externalBase as spec.ClassType;
        }

        if (!base.initializer) {
            throw new Error(`Missing initializer for base class '${base.name}'`);
        }

        // clone from base class
        cls.initializer = clone(base.initializer);
    }

}

/**
 * Add "subtypes" and "parenttype" to all types, and registers the types in the assembly.
 * Also verifies that we don't have weird situations that can be supported by all langauges.
 *
 * @param mod   The module
 * @param types The types to be registered.
 */
function addTypeInfo(mod: spec.Assembly, types: spec.Type[]) {
    mod.types = mod.types || {};
    for (const type of types) {
        mod.types[type.fqn] = type;
    }

    visitTree(spec.NameTree.of(mod));

    function visitTree(node: spec.NameTree) {
        if (node.fqn) {
            const parentType = mod.types![node.fqn];

            for (const childName of Object.keys(node.children)) {
                const child = node.children[childName];
                // there are some programming languages that won't be able to support
                // a namespace as a sub-name of a concrete type (e.g. java), so we can't support that.
                if (!child.fqn) {
                    // tslint:disable-next-line:max-line-length
                    throw new Error(`All child names of a type '${node.fqn}' must point to concrete types, but '${node.fqn}.${childName}' is a namespaces, and this structure cannot be supported in all languages (e.g. Java)`);
                }
                mod.types![child.fqn].parenttype = node.fqn;
                if (!parentType.subtypes) { parentType.subtypes = []; }
                parentType.subtypes.push(child.fqn);
            }
        }

        Object.values(node.children).forEach(visitTree);
    }
}

/**
 * Verify that overridden methods don't change the signature.
 *
 * Changing the types of arguments or the return type is not allowed in
 * some languages (such as C#).
 *
 * Must be called after verifyUnexportedTypes() which hoists external types.
 */
function validateOverriddenSignatures(mod: spec.Assembly) {
    if (!mod.types) { return; }

    for (const typeName of Object.keys(mod.types)) {
        // Checking type against self should never fail, and implies
        // checking against all ancestors anyway.
        checkTypeAgainst(typeName, typeName);
    }

    type MethodMap = {[name: string]: spec.Method};
    type PropertyMap = {[name: string]: spec.Property};

    function checkTypeAgainst(currentFqn: string, ancestorFqn: string) {
        const current = getType(currentFqn);
        const ancestor = getType(ancestorFqn);

        validateMap(methodMap(current), methodMap(ancestor), validateMethod);
        validateMap(propertyMap(current), propertyMap(ancestor), validateProperty);

        // Validate against ancestors of ancestor
        if (spec.isClassType(ancestor) && ancestor.base) {
            checkTypeAgainst(currentFqn, ancestor.base.fqn);
        }
        if (spec.isClassOrInterfaceType(ancestor) && ancestor.interfaces) {
            for (const extendsInterface of ancestor.interfaces) {
                checkTypeAgainst(currentFqn, extendsInterface.fqn);
            }
        }

        function validateMethod(currentMethod: spec.Method, ancestorMethod: spec.Method) {
            const where = `${currentFqn}.${currentMethod.name}`;
            if (!typeReferencesEqual(currentMethod.returns, ancestorMethod.returns)) {
                const orig = spec.describeTypeReference(ancestorMethod.returns);
                const cur = spec.describeTypeReference(currentMethod.returns);
                throw new Error(`${where}: return type changed from ${orig} (in ${ancestorFqn}) to ${cur}`);
            }

            const currentParams = currentMethod.parameters || [];
            const ancestorParams = ancestorMethod.parameters || [];
            if (currentParams.length !== ancestorParams.length) {
                const orig = ancestorParams.length;
                const cur = currentParams.length;
                throw new Error(`${where}: parameter count changed from ${orig} (in ${ancestorFqn}) to ${cur}`);
            }
            for (let i = 0; i < currentParams.length; i++) {
                if (currentParams[i].variadic !== ancestorParams[i].variadic ||
                    !typeReferencesEqual(currentParams[i].type, ancestorParams[i].type)) {
                    const orig = spec.describeTypeReference(ancestorParams[i].type);
                    const cur = spec.describeTypeReference(currentParams[i].type);

                    // tslint:disable-next-line:max-line-length
                    throw new Error(`${where}: parameter ${i + 1} type changed from ${orig} (in ${ancestorFqn}) to ${cur}`);
                }
            }
        }

        function validateProperty(currentProperty: spec.Property, ancestorProperty: spec.Property) {
            if (!typeReferencesEqual(currentProperty.type, ancestorProperty.type)) {
                const orig = spec.describeTypeReference(ancestorProperty.type);
                const cur = spec.describeTypeReference(currentProperty.type);

                throw new Error(`${currentFqn}.${currentProperty.name}: type changed from ${orig} (in ${ancestorFqn}) to ${cur}`);
            }
        }
    }

    /**
     * Execute a validation function against matching elements from two maps
     */
    function validateMap<T>(currentMap: {[key: string]: T}, ancestorMap: {[key: string]: T}, comparisonFn: (a: T, b: T) => void) {
        for (const name of Object.keys(currentMap)) {
            if (name in ancestorMap) {
                comparisonFn(currentMap[name], ancestorMap[name]);
            }
        }
    }

    /**
     * Return a map of all instance methods of a type
     */
    function methodMap(type: spec.Type): MethodMap {
        const methods = spec.isClassOrInterfaceType(type) ? (type.methods || []) : [];
        // Prepend '_' to avoid collissions with built-in functions on Object such as toString().
        return buildMap(methods.filter(m => !m.static), m => '_' + m.name);
    }

    /**
     * Return a map of all instance properties of a type
     */
    function propertyMap(type: spec.Type): PropertyMap {
        const properties = spec.isClassOrInterfaceType(type) ? (type.properties || []) : [];
        return buildMap(properties.filter(m => !m.static), m => '_' + m.name);
    }

    /**
     * Find the Type object for a given fqn
     */
    function getType(fqn: string): spec.Type {
        if (mod.types && mod.types[fqn]) { return mod.types[fqn]; }
        if (mod.externals && mod.externals[fqn]) { return mod.externals[fqn]; }
        throw new Error(`Unknown type: ${fqn}`);
    }
}

function verifyUnexportedTypes(mod: spec.Assembly, typeRefs: Set<ReferencedFqn>, externalTypes: Map<string, spec.Type>) {
    const errors = new Array<string>();

    for (const ref of typeRefs) {
        const localType = mod.types && (ref.fqn in mod.types);
        const externalType = externalTypes.has(ref.fqn);

        if (!localType && !externalType) {
            errors.push(`${ref.fqn} is referenced from context: ${ref.ctx.join('/')}`);
        }

        if (externalType) {
            if (!mod.externals) { mod.externals = {}; }
            const extType = externalTypes.get(ref.fqn)!;
            mod.externals[ref.fqn] = extType;

            hoistExternalTypeInfo(extType);
        }
    }

    if (errors.length > 0) {
        throw new Error(`Found unexported types in the API, which are also not exported by any dependency:\n  ${errors.join('\n  ')}`);
    }

    /**
     * Bring the base type and interfaces of external types into the current module's ``externalTypes`` map, so the assembly contains
     * the specification of the full type hierarchy. This enables code generators to reason over a complete type specification without
     * having to necessarily be able to load the assemblies that define them.
     *
     * @param type the type whose base and interfaces need to be hoisted.
     */
    function hoistExternalTypeInfo(type: spec.Type, processed: Set<string> = new Set()) {
        // Ensure we don't run into infinite loop if a type has a method that returns itself.
        if (processed.has(type.fqn)) { return; }
        processed.add(type.fqn);

        if (!mod.externals) { mod.externals = {}; }
        mod.externals[type.fqn] = type;

        if (spec.isClassType(type) && type.base) {
            const baseFqn = type.base.fqn;
            if (!externalTypes.has(baseFqn)) {
                errors.push(`Unable to find the definition of ${baseFqn}, a base type of ${type.fqn}`);
                return;
            }
            const baseType = externalTypes.get(baseFqn)!;
            mod.externals[baseFqn] = baseType;
            hoistExternalTypeInfo(baseType, processed);
        }
        if ((spec.isClassType(type) || spec.isInterfaceType(type))) {
            for (const iface of type.interfaces || []) {
                const ifaceFqn = iface.fqn;
                if (ifaceFqn in mod.externals) { continue; }
                if (!externalTypes.has(ifaceFqn)) {
                    errors.push(`Unable to find the definition of ${ifaceFqn}, an interface of ${type.fqn}`);
                    continue;
                }
                const ifaceType = externalTypes.get(ifaceFqn)!;
                mod.externals[ifaceFqn] = ifaceType;
                hoistExternalTypeInfo(ifaceType, processed);
            }
            for (const method of type.methods || []) {
                if (method.returns && spec.isNamedTypeReference(method.returns)) {
                    const returnType = externalTypes.get(method.returns.fqn);
                    if (!returnType) {
                        errors.push(`Unable to locate external return type of ${type.fqn}.${method.name}: ${method.returns.fqn}`);
                        continue;
                    }
                    hoistExternalTypeInfo(returnType, processed);
                }
                for (const param of method.parameters || []) {
                    if (!spec.isNamedTypeReference(param.type)) { continue; }
                    const paramType = externalTypes.get(param.type.fqn);
                    if (!paramType) {
                        // tslint:disable-next-line:max-line-length
                        errors.push(`Unable to locate external type of parameter ${param.name} of ${type.fqn}.${method.name}: ${param.type.fqn}`);
                        continue;
                    }
                    hoistExternalTypeInfo(paramType, processed);
                }
            }
            for (const prop of type.properties || []) {
                if (!spec.isNamedTypeReference(prop.type)) { continue; }
                const propType = externalTypes.get(prop.type.fqn);
                if (!propType) {
                    errors.push(`Unable to locate external type of property ${prop.name} of ${type.fqn}: ${prop.type.fqn}`);
                    continue;
                }
                hoistExternalTypeInfo(propType, processed);
            }
        }
    }
}

/**
 * Reads all jsii deps of a module and creates a lookup table so we can resolve
 * external types. Also returns the set of jsii specs for each module, just in case.
 *
 * @param rootDir The root dir of the module
 * @param packageDeps The 'dependencies' section of package.json
 */
async function readDependencies(rootDir: string, packageDeps: any, bundledDeps: undefined | string[], targets: Set<string>) {
    const lookup = new Map<string, spec.Type>();
    const dependencies: { [dep: string]: spec.PackageVersion } = { };
    const bundled: { [name: string]: string } = { };

    bundledDeps = bundledDeps || [ ];
    packageDeps = packageDeps || { };

    async function addDependency(packageName: string, moduleRootDir: string) {
        const { jsii, pkg } = await readJsiiForModule(moduleRootDir, packageName);

        // verify that dependencies specify names for all languages defined by this package
        // this is required in order for us to be able to resolve jsii symbols in native languages.
        for (const target of targets) {
            if (!(target in pkg.targets)) {
                // tslint:disable-next-line:max-line-length
                throw new Error(`Dependent package ${packageName} does not have a configuration specified for target '${target}' which is defined by this module`);
            }
        }

        const moduleName = jsii.name;

        dependencies[moduleName] = { version: jsii.version, targets: jsii.targets, dependencies: jsii.dependencies };

        // add all types to lookup table.
        if (jsii.types) {
            for (const fqn of Object.keys(jsii.types)) { lookup.set(fqn, jsii.types[fqn]); }
        }
        if (jsii.externals) {
            for (const fqn of Object.keys(jsii.externals)) { lookup.set(fqn, jsii.externals![fqn]); }
        }
    }

    for (const packageName of Object.keys(packageDeps)) {
        // if this package is defined under 'jsiiBundledDependencies', add it to the "bundled" list
        const bundledDepIndex = bundledDeps.indexOf(packageName);
        if (bundledDepIndex !== -1) {
            bundled[packageName] = packageDeps[packageName];
            bundledDeps.splice(bundledDepIndex, 1); // remove from the expected list
            continue;
        }

        await addDependency(packageName, rootDir);
    }

    if (bundledDeps.length > 0) {
        // tslint:disable-next-line:max-line-length
        throw new Error(`There are some dependencies defined as jsiiBundledDependencies but we could not find them under "dependencies": ${bundledDeps.join()}`);
    }

    return { lookup, dependencies, bundled };
}

async function findModuleRoot(dir: string, packageName: string): Promise<string | undefined> {
    if (dir === '/') {
        return undefined;
    }

    const moduleDir = path.join(dir, 'node_modules', packageName);
    const exists = await fs.pathExists(moduleDir);
    if (exists) {
        return moduleDir;
    }

    return findModuleRoot(path.resolve(dir, '..'), packageName);
}

async function readJsiiForModule(rootDir: string, packageName: string) {
    const moduleDir = await findModuleRoot(rootDir, packageName);
    if (!moduleDir) {
        throw new Error(`Cannot find ${packageName} under node_modules (here or up the tree)`);
    }

    const pkg = await readPackageMetadata(moduleDir);

    const jsiiFilePath = path.join(moduleDir, spec.SPEC_FILE_NAME);
    const jsii = spec.validateAssembly(await fs.readJson(jsiiFilePath));
    if (jsii.schema !== spec.SchemaVersion.V1_0) {
        // tslint:disable-next-line:max-line-length
        throw new Error(`The jsii spec of module ${packageName} has version ${jsii.schema} while we expect ${spec.SchemaVersion.V1_0} (TODO: semver)`);
    }

    return { pkg, jsii, moduleDir };
}

async function aglob(pattern: string) {
    return new Promise<string[]>((ok, fail) => glob(pattern, (err, matches) => err ? fail(err) : ok(matches)));
}

/**
 * Build a map from a list using the given function to derive keys
 *
 * If the key function returns undefined, the value is not added to the map.
 */
function buildMap<T>(xs: T[], keyFn: (x: T) => (string | undefined)): {[key: string]: T} {
    const ret: {[key: string]: T}  = {};
    for (const x of xs) {
        const key = keyFn(x);
        if (key !== undefined) { ret[key] = x; }
    }
    return ret;
}

/**
 * True if the type references refer to the same type
 */
export function typeReferencesEqual(a?: spec.TypeReference, b?: spec.TypeReference): boolean {
    return deepEqual(a, b, { strict: true });
}
