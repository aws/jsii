import * as Case from 'case';
import * as clone from 'clone';
import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as spec from 'jsii-spec';
import * as path from 'path';
import * as ts from 'typescript';
import * as util from 'util';
import { getCompilerOptions, saveCompilerOptions, saveLinterOptions } from './compiler-options';
import { normalizeJsiiModuleName } from './naming';
import readPackageMetadata from './package-metadata';
import { fileSystemLoader, includeAndRenderExamples, loadFromFile } from './literate';


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

    // determine list of languages we need our dependencies to specify names for. otherwise,
    // we won't be able to determine the name of types for that dependency.
    const languages = new Set<string>(Object.keys(pkg.names));

    const { lookup, dependencies, bundled, nativenames } =
        await readDependencies(packageDir, pkg.dependencies, pkg.bundledDependencies, languages);

    const mod = await compileSources(pkg.entrypoint, files, lookup);

    // add package information
    mod.name = normalizeJsiiModuleName(pkg.name);
    mod.package = pkg.name;
    mod.version = pkg.version;
    mod.dependencies = dependencies;
    mod.bundled = bundled;
    mod.names = pkg.names;

    // automatically add a "js" name based on the npm name.
    mod.names.js = pkg.name;

    // create a map of native names for this module and all dependencies
    // to allow generators and runtimes to translate jsii names to native names.
    mod.nativenames = nativenames;
    mod.nativenames[mod.name] = mod.names;

    mod.readme = await loadReadme(packageDir);

    return mod;
}

async function loadReadme(packageDir: string) : Promise<{ markdown: string } | undefined> {
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
 * @param entrypoint The main source file.
 * @param otherSources Other source files to include.
 */
export async function compileSources(entrypoint: string,
                                     otherSources = new Array<string>(),
                                     externalTypes = new Map<string, spec.Type>(),
                                     treatWarningsAsErrors = false): Promise<spec.Assembly> {
    const options = getCompilerOptions();
    const prog = compileProgramSync([ entrypoint, ...otherSources ], options);
    const typeChecker = prog.getTypeChecker();
    const sourceFile = prog.getSourceFile(prog.getRootFileNames()[0]);
    if (!sourceFile) { throw new Error('No source file found!'); }
    const rootModule = typeChecker.getSymbolAtLocation(sourceFile);

    // this is it, start parsing...
    const mod = new spec.Assembly();
    const types = new Array<spec.Type>();

    // collect all refs to FQNs so we can validate we don't use unexported types
    const typeRefs = new Set<ReferencedFqn>();

    if (rootModule) {
        await processModule(rootModule, []);
        createNameTree(mod, types);
        verifyUnexportedTypes(mod, typeRefs, externalTypes);
        normalizeInitializers(mod, externalTypes);
    }

    return mod;

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

    async function tryProcessBaseType(type: ts.Type, ctx: string[]) {
        ctx = newContext(ctx, type.symbol ? type.symbol.name : '<unknown-base-class>');

        const baseTypes = type.getBaseTypes();
        if (!baseTypes || baseTypes.length === 0) {
            return undefined;
        }

        if (baseTypes.length !== 1) {
            throw error(ctx, 'Only a single base type is allowed: ' + (type.symbol && type.symbol.name));
        }

        const resolvedType = await resolveType(baseTypes[0], ctx);
        if (!resolvedType.fqn) {
            throw error(ctx, 'Unexpected base type: ' + JSON.stringify(resolvedType));
        }

        return resolvedType as spec.UserTypeReference;
    }

    async function tryProcessClassInterfaces(decl: ts.ClassDeclaration, ctx: string[]): Promise<spec.UserTypeReference[] | undefined> {
        if (!decl.heritageClauses) {
            return;
        }

        const result = new Array<spec.UserTypeReference>();

        for (const hc of decl.heritageClauses) {
            if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
                continue; // base classes are handled in tryProcessBaseClass
            }

            if (hc.token !== ts.SyntaxKind.ImplementsKeyword) {
                throw error(ctx, 'Invalid heritage clause token ' + ts.SyntaxKind[hc.token]);
            }

            for (const expr of hc.types || [ ]) {
                const type = typeChecker.getTypeFromTypeNode(expr);

                const ref = new spec.UserTypeReference();
                ref.fqn = await getFullyQualifiedName(type.symbol!, ctx);

                result.push(ref);
            }
        }

        return result;
    }

    async function tryProcessInterface(symbol: ts.Symbol, ctx: string[]): Promise<spec.InterfaceType | undefined> {
        ctx = newContext(ctx, symbol.name);

        const entity = new spec.InterfaceType();
        const name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name');
        }

        const decl = symbol.declarations![0] as ts.InterfaceDeclaration;

        populateEntityName(entity, name, ctx);
        checkTypeName(entity.name, ctx);

        addDocumentation(entity, symbol);

        const interfaceType = typeChecker.getDeclaredTypeOfSymbol(symbol);
        const bases = new Array<spec.UserTypeReference>();
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
                        entity.methods!.push(method);
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

        const entity = new spec.ClassType();
        const name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name');
        }

        const decl = symbol.valueDeclaration as ts.ClassDeclaration;

        if (isHidden(decl)) {
            return undefined;
        }

        populateEntityName(entity, name, ctx);
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
                                entity.properties!.push(prop);
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
                    entity.methods!.push(method);
                }
                continue;
            }

            if (ts.isPropertyDeclaration(memberDecl) || ts.isParameterPropertyDeclaration(memberDecl)) {
                const prop = await tryProcessProperty(mem, ctx);
                if (prop) {
                    entity.properties!.push(prop);
                }
                continue;
            }

            if (ts.isGetAccessorDeclaration(memberDecl)) {
                // console.log('here!', ts.SyntaxKind[memberDecl.kind]);
                const prop = await tryProcessAccessor(mem, ctx);
                if (prop) {
                    entity.properties!.push(prop);
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

        const initializer = new spec.Method();
        initializer.initializer = true;

        addDocumentation(initializer, member);

        for (const p of signature.getParameters()) {
            try {
                const param = await processParameter(p, ctx);
                initializer.parameters!.push(param);
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

        const entity = new spec.EnumType();
        const name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name for enum: ' + symbol.getName());
        }

        if (isHidden(symbol.valueDeclaration as ts.EnumDeclaration)) {
            return undefined;
        }

        populateEntityName(entity, name, ctx);
        addDocumentation(entity, symbol);
        checkTypeName(entity.name, ctx);

        const decl = symbol.valueDeclaration as ts.EnumDeclaration;

        decl.members.forEach(mem => {

            const member = new spec.EnumMember();
            member.name = mem.name.getText();

            // TODO: enum member doc
            // addDocumentation(member, sym);

            entity.members.push(member);
        });

        return entity;
    }

    async function processParameter(symbol: ts.Symbol, ctx: string[]): Promise<spec.Parameter> {
        ctx = newContext(ctx, symbol.name);

        const decl = symbol.valueDeclaration as ts.ParameterDeclaration;

        const param = new spec.Parameter();
        param.name = decl.name.getText();

        addDocumentation(param, symbol);

        const typeAtLocation = typeChecker.getTypeAtLocation(decl);
        param.type = await resolveType(typeAtLocation, ctx);
        if (decl.dotDotDotToken) {
            param.variadic = true;
            // TypeScript requires variadic arguments are typed as lists.
            param.type = param.type.collection!.elementtype;
        }

        if (param.type.union) {
            throw error(ctx, 'Unions are not allowed for parameter types');
        }

        if (typeChecker.isOptionalParameter(decl)) {
            param.type.optional = true;
        }

        return param;
    }

    async function tryProcessMethod(symbol: ts.Symbol, ctx: string[]): Promise<spec.Method | undefined> {
        ctx = newContext(ctx, symbol.name);
        const decl = symbol.valueDeclaration as ts.MethodDeclaration;
        const method = new spec.Method();
        method.name = decl.name.getText();

        if (hasModifier(decl, ts.SyntaxKind.StaticKeyword)) {
            method.static = true;
        }

        if (isProtected(decl)) {
            method.protected = true;
        }

        if (isAbstract(decl)) {
            method.abstract = true;
        }

        if (isHidden(decl)) {
            return undefined;
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
                method.parameters!.push(param);
                if (param.variadic) { method.variadic = true; }
            }
        }

        checkMemberName(method, false, ctx);

        return method;
    }

    async function tryProcessAccessor(symbol: ts.Symbol, ctx: string[]): Promise<spec.Property | undefined> {

        ctx = newContext(ctx, symbol.name);

        const prop = new spec.Property();
        prop.name = symbol.name;

        addDocumentation(prop, symbol);

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

        prop.type = await resolveType(signature.getReturnType(), ctx);

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
        const prop = new spec.Property();
        prop.name = decl.name.getText();

        if (hasModifier(decl, ts.SyntaxKind.StaticKeyword)) {
            prop.static = true;
        }

        addDocumentation(prop, symbol);

        if (isHidden(decl)) {
            return undefined;
        }

        const typeAtLocation = typeChecker.getTypeAtLocation(decl);
        prop.type = await resolveType(typeAtLocation, ctx);

        if (hasModifier(decl, ts.SyntaxKind.ReadonlyKeyword)) {
            prop.immutable = true;
        }

        if (decl.questionToken) {
            prop.type.optional = true;
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

    async function resolveArrayType(type: ts.Type, ctx: string[]) {
        const typeRef = type as ts.TypeReference;
        if (!typeRef.typeArguments) {
            throw error(ctx, 'Array must be defined with a single type argument <T>');
        }

        if (typeRef.typeArguments.length !== 1) {
            throw error(ctx, 'Array<> can only have a single type argument');
        }

        const ret = new spec.TypeReference();
        ret.collection = new spec.CollectionTypeReference();
        ret.collection.elementtype = await resolveType(typeRef.typeArguments[0], ctx);
        ret.collection.kind = spec.CollectionKind.Array;
        return ret;
    }

    async function resolveMapType(type: ts.Type, ctx: string[]) {
        const objectType = type.getStringIndexType();
        if (!objectType) {
            throw error(ctx, 'Only string indexes are supported');
        }

        const ret = new spec.TypeReference();
        ret.collection = new spec.CollectionTypeReference();
        ret.collection.elementtype = await await resolveType(objectType, ctx);
        ret.collection.kind = spec.CollectionKind.Map;
        return ret;
    }

    function includesType(searched: spec.TypeReference[], item: spec.TypeReference) {
        const json = JSON.stringify(item);
        return searched.map(x => JSON.stringify(x)).filter(x => x === json).length > 0;
    }

    async function resolveUnionType(type: ts.UnionType, ctx: string[]) {
        const ret = new spec.TypeReference();
        const union = ret.union = new spec.UnionTypeReference();

        for (const subtype of type.types) {
            // If a union contains "undefined", it simply means it's an optional
            // tslint:disable-next-line:no-bitwise
            if (subtype.flags & ts.TypeFlags.Undefined) {
                ret.optional = true;
                continue;
            }

            const resolvedType = await resolveType(subtype, ctx);
            if (includesType(union.types, resolvedType)) {
                continue;
            }

            union.types.push(resolvedType);
        }

        // if the union type only has one type, it was probably because we had <undefined | Bla>, so we can
        // convert this to a normal type.
        if (union.types.length === 1) {
            const normalType = union.types[0];
            normalType.optional = ret.optional;
            return normalType;
        }

        return ret;
    }

    async function resolveType(type: ts.Type, ctx: string[]): Promise<spec.TypeReference> {
        ctx = newContext(ctx, type.symbol ? type.symbol.name : '<unknown-type>');

        // convert to apparent type (in case for example, of a literal value)
        type = typeChecker.getApparentType(type);

        // check if this is a union
        // tslint:disable-next-line:no-bitwise
        if (type.flags & ts.TypeFlags.Union && (!(type.flags & ts.TypeFlags.EnumLiteral))) {
            return resolveUnionType(type as ts.UnionType, ctx);
        }

        const primitiveType = tryResolvePrimitiveType(type);
        if (primitiveType) {
            const res = new spec.TypeReference();
            res.primitive = primitiveType;
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

        const ret = new spec.TypeReference();
        ret.fqn = await getFullyQualifiedName(type.symbol, ctx);

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
                throw error(ctx, 'Unable to resolve type');
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

        const moduleName = normalizeJsiiModuleName(packageConfig.name);
        const jsiiName = moduleName + '.' + typeName;
        // Record to typeRefs, so the type's validity is verified.
        typeRefs.add({ fqn: jsiiName, ctx });
        return jsiiName;
    }

    function addDocumentation(target: spec.Documentable, symbol: ts.Symbol) {
        symbol.getJsDocTags().forEach(tag => {
            // Don't duplicate @params for stuff that declares parameters...
            if (!(target as any).parameters || tag.name !== 'param') {
                target.docs[tag.name] = tag.text || '';
            }
        });

        const comment = ts.displayPartsToString(symbol.getDocumentationComment(typeChecker));
        if (comment && comment.length > 0) {
            target.docs.comment = comment;
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

    function populateEntityName(entity: spec.Type, fqn: string, ctx: string[]) {
        const parts = fqn.split('.');

        // fqn may be <module>.<name> or <module>...<namespace>...<name>
        if (parts.length < 2) {
            throw error(ctx, `Unable to parse fqn '${fqn}. Expecting at least 2 components`);
        }

        entity.fqn = fqn;
        entity.module = parts[0]; // first component is always the module name
        entity.namespace = parts.slice(0, parts.length - 1).join('.');
        entity.name = parts[parts.length - 1];
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
        if (member instanceof spec.Method) {
            paramCount = (member.parameters || []).length;
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

    errors.forEach(d => {
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
    });

    if (errors.length > 0) {
        throw new Error('Build failed');
    }

    return prog;
}

/**
 * Creates the name tree and type map and also adds parent relationships to all types.
 */
function createNameTree(mod: spec.Assembly, types: spec.Type[]) {
    mod.types = { };
    mod.nametree = new spec.NameTree();
    mod.typecount = types.length;

    for (const type of types) {
        mod.types[type.fqn] = type;
        mod.nametree.add(type.fqn);
    }

    addSubtypes(mod);
}

/**
 * Ensures that all types have an initializer.
 * - If there's a base class with an initializer, it will be cloned.
 * - If not, an empty initializer is defined.
 * This is because JavaScript does that implicitly (but in many languages this is not the case), so we might as well do it here.
 */
function normalizeInitializers(mod: spec.Assembly, externalTypes: Map<string, spec.Type>) {

    for (const fqn of Object.keys(mod.types)) {
        const type = mod.types[fqn];
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
            cls.initializer = new spec.Method();
            cls.initializer.initializer = true;
            return;
        }

        if (!cls.base.fqn) {
            throw new Error('No FQN for base class. Impossible!');
        }

        // normalize initializer for base class first
        let base = mod.types[cls.base.fqn] as spec.ClassType;
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
 * Add "subtypes" and "parenttype" to all nodes.
 * Also verifies that we don't have weird situations that can be supported by all langauges.
 * @param mod The module
 */
function addSubtypes(mod: spec.Assembly) {

    function visit(node: spec.NameTree) {

        const parentFqn = node.getType();
        if (parentFqn) {
            const parentType = mod.types[parentFqn];

            for (const childname of node.children()) {
                const child = node[childname];
                const childFqn = child.getType();

                // there are some programming languages that won't be able to support
                // a namespace as a sub-name of a concrete type (e.g. java), so we can't support that.
                if (!childFqn) {
                    // tslint:disable-next-line:max-line-length
                    throw new Error(`All child names of a type '${parentFqn}' must point to concrete types, but '${childname}' is a namespaces, and this structure cannot be supported in all languages (e.g. Java)`);
                }
                mod.types[childFqn].parenttype = parentFqn;
                parentType.subtypes!.push(childFqn);
            }
        }

        node.forEachChild(visit);
    }

    visit(mod.nametree);
}

function verifyUnexportedTypes(mod: spec.Assembly, typeRefs: Set<ReferencedFqn>, externalTypes: Map<string, spec.Type>) {
    const errors = new Array<string>();

    for (const ref of typeRefs) {
        const localType = ref.fqn in mod.types;
        const externalType = externalTypes.has(ref.fqn);

        if (!localType && !externalType) {
            errors.push(`${ref.fqn} is referenced from context: ${ref.ctx.join('/')}`);
        }

        if (externalType) {
            if (!mod.externalTypes) { mod.externalTypes = {}; }
            mod.externalTypes[ref.fqn] = externalTypes.get(ref.fqn)!;
        }
    }

    if (errors.length > 0) {
        throw new Error(`Found unexported types in the API, which are also not exported by any dependency:\n  ${errors.join('\n  ')}`);
    }
}

/**
 * Reads all jsii deps of a module and creates a lookup table so we can resolve
 * external types. Also returns the set of jsii specs for each module, just in case.
 *
 * @param rootDir The root dir of the module
 * @param packageDeps The 'dependencies' section of package.json
 */
async function readDependencies(rootDir: string, packageDeps: any, bundledDeps: undefined | string[], languages: Set<string>) {
    const lookup = new Map<string, spec.Type>();
    const dependencies: { [dep: string]: spec.PackageVersion } = { };
    const bundled: { [name: string]: string } = { };
    const nativenames: { [name: string]: { [language: string]: string } } = {};

    bundledDeps = bundledDeps || [ ];
    packageDeps = packageDeps || { };

    async function addDependency(packageName: string, moduleRootDir: string) {
        const { jsii, pkg } = await readJsiiForModule(moduleRootDir, packageName);

        // verify that dependencies specify names for all languages defined by this package
        // this is required in order for us to be able to resolve jsii symbols in native languages.
        for (const lang of languages) {
            if (!(lang in pkg.names)) {
                // tslint:disable-next-line:max-line-length
                throw new Error(`Dependent package ${packageName} does not have a name specified for language '${lang}' which is defined by this module`);
            }
        }

        const moduleName = normalizeJsiiModuleName(packageName);

        dependencies[moduleName] = { package: jsii.package, version: jsii.version };
        nativenames[moduleName] = jsii.names;

        // add all types to lookup table.
        if (jsii.types) {
            Object.keys(jsii.types).forEach(fqn => lookup.set(fqn, jsii.types[fqn]));
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

    return { lookup, dependencies, bundled, nativenames };
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

    const outdir = pkg.outdir;
    const jsiiFilePath = path.join(outdir, spec.SPEC_FILE_NAME);
    const jsii = await fs.readJson(jsiiFilePath) as spec.Assembly;
    if (jsii.schema !== spec.SPEC_VERSION) {
        throw new Error(`The jsii spec of module ${packageName} has version ${jsii.schema} while we expect ${spec.SPEC_VERSION} (TODO: semver)`);
    }

    return { pkg, jsii, moduleDir };
}

async function aglob(pattern: string) {
    return new Promise<string[]>((ok, fail) => glob(pattern, (err, matches) => err ? fail(err) : ok(matches)));
}
