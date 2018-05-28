import * as path from 'path'
import * as ts from 'typescript'
import * as spec from 'jsii-spec'
import * as fs from 'fs-extra'
import * as util from 'util'
import * as glob from 'glob'
import * as clone from 'clone'
import { getCompilerOptions, saveCompilerOptions } from './compiler-options'
import readPackageMetadata from './package-metadata'
import { normalizeJsiiModuleName } from './naming'

/**
 * Given a CommonJS (npm) typescript package, produces a JSII specification for it.
 * @param packageDir Root directory of the package (where package.json resides)
 * @param includeDirs list of directories to include
 */
export async function compilePackage(packageDir: string, includeDirs = [ 'test', 'bin' ]): Promise<spec.Assembly> {
    // read package.json and validate that we have what we need there
    const pkg = await readPackageMetadata(packageDir);

    // determine typescript program entrypoint
    let entrypoint = pkg.types;
    if (!await fs.pathExists(entrypoint)) {
        throw new Error('Cannot find entrypoint: ' + entrypoint);
    }

    // glob all ts files in dirs to include
    let files = new Array<string>();
    for (let dir of includeDirs) {
        files = files.concat(await aglob(`${packageDir}/${dir}/**/*.ts`));
    }

    // write a copy of the compiler options to the root of the package so IDEs can find it
    // also add to .gitignore to make sure it is not checked in.
    await saveCompilerOptions(packageDir);

    // determine list of languages we need our dependencies to specify names for. otherwise,
    // we won't be able to determine the name of types for that dependency.
    const languages = new Set<string>(Object.keys(pkg.names));

    let { lookup, dependencies, bundled } =
        await readDependencies(packageDir, pkg.dependencies, pkg.bundledDependencies, languages);

    let mod = await compileSources(entrypoint, files, lookup);

    // add package information
    mod.name = normalizeJsiiModuleName(pkg.name);
    mod.package = pkg.name;
    mod.version = pkg.version
    mod.dependencies = dependencies;
    mod.bundled = bundled;
    mod.names = pkg.names;

    // automatically add a "js" name based on the npm name.
    mod.names['js'] = pkg.name;

    // create a map of native names for this module and all dependencies
    // to allow generators and runtimes to translate jsii names to native names.
    mod.nativenames = renderNativeNames(mod);

    const readme = path.join(packageDir, 'README.md');
    if (await fs.pathExists(readme)) {
        mod.readme = { markdown: await fs.readFile(readme, { encoding: 'utf-8' }) };
    } else {
        // tslint:disable-next-line:no-console
        console.error(`No README.md file found at ${readme} ☹️`);
    }

    return mod;
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
export async function compileSources(entrypoint: string, otherSources = new Array<string>(), externalTypes = new Map<string, spec.Type>(), treatWarningsAsErrors = false): Promise<spec.Assembly> {
    var options = getCompilerOptions();
    let prog = compileProgramSync([ entrypoint, ...otherSources ], options);
    let typeChecker = prog.getTypeChecker();
    let sourceFile = prog.getSourceFile(prog.getRootFileNames()[0]);
    if (!sourceFile)
        throw new Error('No source file found!');
    let rootModule = typeChecker.getSymbolAtLocation(sourceFile);

    // this is it, start parsing...
    var mod = new spec.Assembly();
    let types = new Array<spec.Type>();

    // collect all refs to FQNs so we can validate we don't use unexported types
    let typeRefs = new Set<ReferencedFqn>();

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
        ctx = newContext(ctx, symbol.name)

        let moduleExports = symbol.exports && typeChecker.getExportsOfModule(symbol);
        if (!moduleExports) {
            return;
        }

        for (let ex of moduleExports) {
            if (isKind(ex, ts.SyntaxKind.ClassDeclaration)) {
                let cls = await tryProcessClass(ex, ctx);
                if (cls) {
                    types.push(cls);
                }
            }

            if (isKind(ex, ts.SyntaxKind.EnumDeclaration)) {
                let en = await tryProcessEnum(ex, ctx);
                if (en) {
                    types.push(en);
                }
            }

            if (isInterface(ex)) {
                let iface = await tryProcessInterface(ex, ctx);
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

        let baseTypes = type.getBaseTypes();
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

    async function tryProcessClassInterfaces(decl: ts.ClassDeclaration, ctx: string[]): Promise<Array<spec.UserTypeReference> | undefined> {
        if (!decl.heritageClauses) {
            return;
        }

        const result = new Array<spec.UserTypeReference>();

        for (let hc of decl.heritageClauses) {
            if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
                continue; // base classes are handled in tryProcessBaseClass
            }

            if (hc.token !== ts.SyntaxKind.ImplementsKeyword) {
                throw error(ctx, 'Invalid heritage clause token ' + ts.SyntaxKind[hc.token]);
            }

            const types = hc.types || [ ];
            for (let expr of types) {
                const type = typeChecker.getTypeFromTypeNode(expr);

                const ref = new spec.UserTypeReference();
                ref.fqn = await getFullyQualifiedName(type.symbol!, ctx);

                result.push(ref);
            }
        }

        return result;
    }

    /**
     * Returns the contents of a Javascript string literal (without quotes or double-quotes).
     */
    function parseStringLiteral(s: string) {
        let doubleQuotes = s.startsWith('"') && s.endsWith('"');
        let singleQuotes = s.startsWith("'") && s.endsWith("'");

        if (singleQuotes || doubleQuotes) {
            return s.substr(1, s.length - 2);
        }

        throw new Error('Invalid string literal "' + s + '". Either single or double quotes are required');
    }

    async function tryProcessConstValue(decl: ts.PropertyDeclaration, ctx: string[]) {
        ctx = ctx.concat(decl.name.getText());

        // warn and ignore non-readonly properties
        if (!hasModifier(decl, ts.SyntaxKind.ReadonlyKeyword)) {
            throw error(ctx, 'Only readonly primitives are supported as static members');
        }

        if (!decl.initializer) {
            throw error(ctx, 'Const values must be assigned with a value');
        }

        let constValue = new spec.ConstValue();
        constValue.name = decl.name.getText();

        switch (decl.initializer.kind) {
            case ts.SyntaxKind.StringLiteral:
                constValue.primitive = spec.PrimitiveType.String;
                constValue.stringValue = parseStringLiteral(decl.initializer.getText());
                break;

            case ts.SyntaxKind.FirstLiteralToken:
                constValue.primitive = spec.PrimitiveType.Number;
                constValue.numberValue = parseFloat(decl.initializer.getText());
                break;

            case ts.SyntaxKind.FalseKeyword:
                constValue.primitive = spec.PrimitiveType.Boolean;
                constValue.booleanValue = false;
                break;

            case ts.SyntaxKind.TrueKeyword:
                constValue.primitive = spec.PrimitiveType.Boolean;
                constValue.booleanValue = true;
                break;

            default:
                warning(ctx, 'Non-primitive public const value is skipped');
                return undefined;
        }

        return constValue;
    }

    /**
     * Classes may expose readonly static primitive values (consts).
     */
    async function processConstValues(classDecl: ts.ClassDeclaration | undefined, ctx: string[]) {
        if (!classDecl) {
            return [];
        }

        var result = new Array<spec.ConstValue>();

        for (let m of classDecl.members) {
            if (!ts.isPropertyDeclaration(m)) {
                continue;
            }

            if (!m.name || !m.modifiers) {
                continue;
            }

            // non-static
            if (!hasModifier(m, ts.SyntaxKind.StaticKeyword)) {
                continue;
            }

            // ignore private statics
            if (isHidden(m)) {
                continue;
            }

            let constValue = await tryProcessConstValue(m, ctx);
            if (constValue) {
                result.push(constValue);
            }
        }

        return result;
    }

    async function tryProcessInterface(symbol: ts.Symbol, ctx: string[]): Promise<spec.InterfaceType | undefined> {
        ctx = newContext(ctx, symbol.name);

        let entity = new spec.InterfaceType();
        let name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name');
        }

        const decl = symbol.declarations![0] as ts.InterfaceDeclaration;

        populateEntityName(entity, name, ctx);
        checkTypeName(entity.name, ctx);

        addDocumentation(entity, symbol);

        let interfaceType = typeChecker.getDeclaredTypeOfSymbol(symbol);
        const bases = new Array<spec.UserTypeReference>();
        const baseTypes = interfaceType.getBaseTypes() || [];
        for (let base of baseTypes) {
            const fqn = await getFullyQualifiedName(base.symbol!, ctx)
            bases.push({ fqn });
        }
        entity.interfaces = bases;
        entity.methods = [];
        entity.properties = [];

        let props = interfaceType.getProperties();

        if (props) {
            for (let mem of props) {
                if (!mem.valueDeclaration) {
                    throw error(ctx, entity.fqn + ' - unexpected error for member: ' + mem.name);
                }

                // Skip properties that are not direct members of this type.
                if (mem.valueDeclaration.parent !== decl) {
                    continue;
                }

                // interfaces only support methods
                if (ts.isMethodSignature(mem.valueDeclaration)) {
                    let method = await tryProcessMethod(mem, ctx);
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

        let entity = new spec.ClassType();
        let name = await getFullyQualifiedName(symbol, ctx);
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

        let classType = typeChecker.getDeclaredTypeOfSymbol(symbol);

        let base = await tryProcessBaseType(classType, ctx);
        if (base) {
            entity.base = base;
        }

        entity.interfaces = await tryProcessClassInterfaces(decl, ctx);

        if (isAbstract(decl)) {
            entity.abstract = true;
        }

        entity.initializer = await tryProcessConstructor(symbol, ctx);

        // process static members - only readonly primitive consts are allowed.
        entity.consts = await processConstValues(symbol.valueDeclaration as ts.ClassDeclaration, ctx);

        let props = classType.getProperties();

        if (props) {
            for (let mem of props) {
                if (!mem.valueDeclaration) {
                    throw error(ctx, entity.fqn + ' - unexpected error for member: ' + mem.name);
                }

                // Skip properties that are not direct members of this type.
                if (!isMemberOfClass(mem, symbol.valueDeclaration)) {
                    continue;
                }

                // filter out private/protected
                if (!isPublic(mem.valueDeclaration)) {
                    continue;
                }

                if (ts.isMethodDeclaration(mem.valueDeclaration)) {
                    let method = await tryProcessMethod(mem, ctx);
                    if (method) {
                        entity.methods!.push(method);
                    }
                    continue;
                }

                if (ts.isPropertyDeclaration(mem.valueDeclaration) || ts.isParameterPropertyDeclaration(mem.valueDeclaration)) {
                    let prop = await tryProcessProperty(mem, ctx);
                    if (prop) {
                        entity.properties!.push(prop);
                    }
                    continue;
                }

                if (ts.isGetAccessorDeclaration(mem.valueDeclaration) || ts.isSetAccessorDeclaration(mem.valueDeclaration)) {
                    let prop = await tryProcessAccessor(mem, ctx);
                    if (prop) {
                        entity.properties!.push(prop);
                    }
                    continue;
                }

                throw error(ctx, entity.fqn + ' - unsupported member kind <' + ts.SyntaxKind[mem.valueDeclaration.kind] + '>: ' + mem.name);
            }
        }

        return entity;
    }

    async function tryProcessConstructor(classSymbol: ts.Symbol, ctx: string[]) {
        ctx = newContext(ctx, '__ctor__');

        if (!classSymbol.members) {
            return undefined;
        }

        let member = classSymbol.members.get(ts.InternalSymbolName.Constructor)
        if (!member) {
            return undefined;
        }

        let decl = member.declarations && member.declarations[0];
        if (!decl) {
            throw error(ctx, 'Unable to determine constructor declaration');
        }

        let signature = typeChecker.getSignatureFromDeclaration(decl as ts.ConstructorDeclaration);
        if (!signature) {
            throw error(ctx, 'Unable to determine constructor signature');
        }

        let initializer = new spec.Method();
        initializer.initializer = true;

        addDocumentation(initializer, member);

        for (let p of signature.getParameters()) {
            try {
                initializer.parameters!.push(await processParameter(p, ctx));
            }
            catch (e) {
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

        let entity = new spec.EnumType();
        let name = await getFullyQualifiedName(symbol, ctx);
        if (!name) {
            throw error(ctx, 'Cannot determine type name for enum: ' + symbol.getName());
        }

        if (isHidden(symbol.valueDeclaration as ts.EnumDeclaration)) {
            return undefined;
        }

        populateEntityName(entity, name, ctx);
        addDocumentation(entity, symbol);
        checkTypeName(entity.name, ctx);

        let decl = symbol.valueDeclaration as ts.EnumDeclaration;

        decl.members.forEach(mem => {

            let member = new spec.EnumMember();
            member.name = mem.name.getText();

            //TODO: enum member doc
            // addDocumentation(member, sym);

            entity.members.push(member);
        });

        return entity;
    }

    async function processParameter(symbol: ts.Symbol, ctx: string[]): Promise<spec.Parameter> {
        ctx = newContext(ctx, symbol.name);

        let decl = symbol.valueDeclaration as ts.ParameterDeclaration;

        let param = new spec.Parameter();
        param.name = decl.name.getText();

        addDocumentation(param, symbol);

        let typeAtLocation = typeChecker.getTypeAtLocation(decl);
        param.type = await resolveType(typeAtLocation, ctx);

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
        let decl = symbol.valueDeclaration as ts.MethodDeclaration;
        let method = new spec.Method();
        method.name = decl.name.getText();

        if (isProtected(decl)) {
            method.protected = true;
        }

        if (isAbstract(decl)) {
            method.abstract = true;
        }

        if (isHidden(decl)) {
            return undefined;
        }

        let methodSignature = typeChecker.getSignatureFromDeclaration(decl);
        if (!methodSignature) {
            throw error(ctx, 'cannot determine signature from method declaration');
        }

        if (methodSignature.getTypeParameters()) {
            throw error(ctx, 'Generics are not supported');
        }

        addDocumentation(method, symbol);

        let returnsVoid = methodSignature.getReturnType().flags & ts.TypeFlags.Void;
        if (!returnsVoid) {
            method.returns = await resolveType(methodSignature.getReturnType(), ctx);
        }

        let params = methodSignature.getParameters();
        if (params) {
            for (let p of params) {
                method.parameters!.push(await processParameter(p, ctx));
            }
        }

        checkPropertyOrMethodName(method.name, method.parameters!, ctx);

        return method;
    }

    async function tryProcessAccessor(symbol: ts.Symbol, ctx: string[]): Promise<spec.Property | undefined> {

        ctx = newContext(ctx, symbol.name);

        let prop = new spec.Property();
        prop.name = symbol.name;

        addDocumentation(prop, symbol);

        if (!symbol.declarations) {
            throw error(ctx, 'unable to extract declarations');
        }

        let getterDecl: ts.SignatureDeclaration | null = null;
        let setterDecl: ts.SignatureDeclaration | null = null;

        for (let decl of symbol.declarations) {
            if (ts.isGetAccessorDeclaration(decl)) {
                getterDecl = decl;
            }
            else if (ts.isSetAccessorDeclaration(decl)) {
                setterDecl = decl;
            }
            else {
                throw error(ctx, 'invalid declaration on accessor');
            }
        }

        if (!getterDecl) {
            throw error(ctx, 'all properties must have a getter (setters are optional)');
        }

        if (isHidden(getterDecl)) {
            return undefined;
        }

        checkPropertyOrMethodName(prop.name, [], ctx);

        let signature = typeChecker.getSignatureFromDeclaration(getterDecl);
        if (!signature) {
            throw error(ctx, 'cannot resolve property signature');
        }

        prop.type = await resolveType(signature.getReturnType(), ctx);

        if (!setterDecl) {
            prop.immutable = true;
        }

        // in typescript getter and setter must agree on visibility, so we can just check the getter (which must exist).
        if (isProtected(getterDecl)) {
            prop.protected = true;
        }

        return prop;
    }

    async function tryProcessProperty(symbol: ts.Symbol, ctx: string[]): Promise<spec.Property | undefined> {
        ctx = newContext(ctx, symbol.name);

        let decl = symbol.valueDeclaration as ts.PropertyDeclaration;
        let prop = new spec.Property();
        prop.name = decl.name.getText();
        checkPropertyOrMethodName(prop.name, [], ctx);

        addDocumentation(prop, symbol);

        if (isHidden(decl)) {
            return undefined;
        }

        let typeAtLocation = typeChecker.getTypeAtLocation(decl);
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
        let typeRef = type as ts.TypeReference;
        if (!typeRef.typeArguments) {
            throw error(ctx, 'Array must be defined with a single type argument <T>');
        }

        if (typeRef.typeArguments.length !== 1) {
            throw error(ctx, 'Array<> can only have a single type argument');
        }

        let ret = new spec.TypeReference();
        ret.collection = new spec.CollectionTypeReference();
        ret.collection.elementtype = await resolveType(typeRef.typeArguments[0], ctx);
        ret.collection.kind = spec.CollectionKind.Array;
        return ret;
    }

    async function resolveMapType(type: ts.Type, ctx: string[]) {
        let objectType = type.getStringIndexType()
        if (!objectType) {
            throw error(ctx, 'Only string indexes are supported');
        }

        let ret = new spec.TypeReference();
        ret.collection = new spec.CollectionTypeReference();
        ret.collection.elementtype = await await resolveType(objectType, ctx);
        ret.collection.kind = spec.CollectionKind.Map;
        return ret;
    }

    function includesType(types: spec.TypeReference[], item: spec.TypeReference) {
        let json = JSON.stringify(item);
        return types.map(x => JSON.stringify(x)).filter(x => x === json).length > 0;
    }

    async function resolveUnionType(type: ts.UnionType, ctx: string[]) {
        let ret = new spec.TypeReference();
        let union = ret.union = new spec.UnionTypeReference();

        for (let subtype of type.types) {
            // If a union contains "undefined", it simply means it's an optional
            if (subtype.flags & ts.TypeFlags.Undefined) {
                ret.optional = true;
                continue;
            }

            let resolvedType = await resolveType(subtype, ctx);
            if (includesType(union.types, resolvedType)) {
                continue;
            }

            union.types.push(resolvedType);
        }

        // if the union type only has one type, it was probably because we had <undefined | Bla>, so we can
        // convert this to a normal type.
        if (union.types.length === 1) {
            let normalType = union.types[0];
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
        if (type.flags & ts.TypeFlags.Union && (!(type.flags & ts.TypeFlags.EnumLiteral))) {
            return resolveUnionType(type as ts.UnionType, ctx);
        }

        let primitiveType = tryResolvePrimitiveType(type);
        if (primitiveType) {
            let ret = new spec.TypeReference();
            ret.primitive = primitiveType;
            return ret;
        }

        if (!type.symbol) {
            throw error(ctx, 'Non-primitive types are expected to have a name');
        }

        let collectionType = await tryResolveCollectionType(type, ctx);
        if (collectionType) {
            return collectionType;
        }

        let promiseType = tryResolvePromiseType(type);
        if (promiseType) {
            const resolvedType = await resolveType(promiseType, ctx);
            resolvedType.promise = true;
            return resolvedType;
        }

        let ret = new spec.TypeReference();
        ret.fqn = await getFullyQualifiedName(type.symbol, ctx);

        // add this FQN to the list of types referenced by our public APIs.
        // this will be crossed referenced later with the list of exported types
        // so we won't export unexported types in the public api.
        typeRefs.add({ fqn: ret.fqn, ctx: ctx });

        return ret;

        /**
         * If `type` represents a Promise, returns the promised type.
         */
        function tryResolvePromiseType(type: ts.Type) {
            const typeAny = type as any;

            if (type.symbol && type.symbol.escapedName === 'Promise') {
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
        function tryResolvePrimitiveType(type: ts.Type): spec.PrimitiveType | undefined {

            if (!type.symbol && type.flags & ts.TypeFlags.Object) {
                return spec.PrimitiveType.Json;
            }

            if (!type.symbol && type.flags & ts.TypeFlags.Any) {
                return spec.PrimitiveType.Any;
            }

            if (!type.symbol) {
                throw error(ctx, 'Unable to resolve type');
            }

            if (type.symbol.name === 'Date') {
                return spec.PrimitiveType.Date;
            }

            if (type.symbol.name === 'String') {
                return spec.PrimitiveType.String;
            }

            if (type.symbol.name === 'Number') {
                return spec.PrimitiveType.Number;
            }

            if (type.symbol.name === 'Boolean') {
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

        let fqn = typeChecker.getFullyQualifiedName(typeSymbol);
        let groups = /\"([^\"]+)\"\.(.*)/.exec(fqn);
        if (!groups) {
            throw error(ctx, `Cannot use unexported type '${fqn}' in a public API`);
        }

        let modulePath = groups[1];
        let typeName = groups[2];

        let packageConfig = await findPackageConfig(modulePath);
        if (!packageConfig) {
            throw error(ctx, 'Cannot find package.json up the tree from: ' + modulePath);
        }

        let moduleName = normalizeJsiiModuleName(packageConfig.name);
        return moduleName + '.' + typeName;
    }

    function addDocumentation(target: spec.Documentable, symbol: ts.Symbol) {
        symbol.getJsDocTags().forEach(tag => {
            // Don't duplicate @params for stuff that declares parameters...
            if (!(target as any).parameters || tag.name !== 'param') {
                target.docs[tag.name] = tag.text || '';
            }
        })

        let comment = ts.displayPartsToString(symbol.getDocumentationComment(typeChecker));
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

        return memberSymbol.valueDeclaration.parent == classDecl ||
            memberSymbol.valueDeclaration.parent.parent == classDecl;
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

        let packageFile = path.join(modulePath, 'package.json');

        let exists = await new Promise<boolean>(done => fs.exists(packageFile, done));
        if (exists) {
            let data = await new Promise<Buffer>((ok, fail) => fs.readFile(packageFile, (err, data) => err ? fail(err) : ok(data)));
            return JSON.parse(data.toString());
        }

        return await findPackageConfig(path.dirname(modulePath));
    }

    /**
     * Determines if the main declaration of the symbol is of a desired kind.
     */
    function isKind(symbol: ts.Symbol, kind: ts.SyntaxKind) {
        return symbol.valueDeclaration && symbol.valueDeclaration.kind == kind;
    }

    /**
     * Returns true if a declaration has a specified modifier.
     */
    function hasModifier(decl: ts.Declaration, kind: ts.SyntaxKind) {
        if (!decl.modifiers) {
            return false;
        }

        for (let i = 0; i < decl.modifiers.length; ++i) {
            let mod = decl.modifiers[i];
            if (mod.kind === kind) {
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
        let parts = fqn.split('.');

        // fqn may be <module>.<name> or <module>...<namespace>...<name>
        if (parts.length < 2) {
            throw error(ctx, `Unable to parse fqn '${fqn}. Expecting at least 2 components`);
        }

        entity.fqn = fqn;
        entity.module = parts[0]; // first component is always the module name
        entity.namespace = parts.slice(0, parts.length - 1).join('.');
        entity.name = parts[parts.length - 1];
    }


    function startsWithLowerCase(symbol: string) {
        if (!symbol) { return false; }
        const firstChar = symbol.substr(0, 1);
        return (firstChar.toLocaleLowerCase() === firstChar);
    }

    function startsWithUpperCase(symbol: string) {
        if (!symbol) { return false; }
        const firstChar = symbol.substr(0, 1);
        return (firstChar.toLocaleUpperCase() === firstChar);
    }

    function checkPropertyOrMethodName(symbol: string, params: spec.Parameter[], ctx: string[]) {
        if (!symbol) { return; }

        // make sure symbol (method/property) starts with a lowercase character.
        if (!startsWithLowerCase(symbol)) {
            throw error(ctx, `'${symbol}' must use camelCase (start with a lowercase letter)`);
        }

        if (symbol.startsWith('get') && startsWithUpperCase(symbol.substr(3)) && params.length === 0) {
            throw error(ctx, 'Methods and properties cannot have the signature getXxx() since these will conflict with Java property getters by the same name');
        }

        if (symbol.startsWith('set') && startsWithUpperCase(symbol.substr(3)) && params.length === 1) {
            throw error(ctx, 'Methods and properties cannot have the signature setXxx(v) since these will conflict with Java property setters');
        }

        if (symbol.indexOf('_') !== -1) {
            throw error(ctx, `Member names cannot use an underscore: ${symbol}`);
        }
    }

    function checkTypeName(symbol: string, ctx: string[]) {
        if (!symbol) { return; }

        if (!startsWithUpperCase(symbol)) {
            throw error(ctx, `Type names must begin with an uppercase characters: ${symbol}`);
        }

        if (symbol.indexOf('_') !== -1) {
            throw error(ctx, `Type names cannot use an underscore: ${symbol}`);
        }
    }

    function warning(ctx: string[], ...args: any[]) {
        if (treatWarningsAsErrors) {
            return error(ctx, ...args);
        }

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
    for (let lib of libs) {
        files.push(path.join(libsDir, `lib.${lib}.d.ts`));
    }
    delete options.lib;

    let prog = ts.createProgram(files, options, host);

    let result = prog.emit();
    let errors = ts.getPreEmitDiagnostics(prog).concat(result.diagnostics);

    errors.forEach(d => {
        let file = d.file;
        let start = d.start;
        if (!file || !start) return;
        let { line, character } = file.getLineAndCharacterOfPosition(start);
        let message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
        console.log(`ERROR: ${file.fileName} (${line + 1},${character + 1}): ${message}`);
    })

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

    for (let type of types) {
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

    for (const fqn in mod.types) {
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
        }
        else {
            const externalBase = externalTypes.get(cls.base.fqn)
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

        let parentFqn = node.getType();
        if (parentFqn) {
            let parentType = mod.types[parentFqn];

            for (let childname of node.children()) {
                let child = node[childname];
                let childFqn = child.getType();

                // there are some programming languages that won't be able to support
                // a namespace as a sub-name of a concrete type (e.g. java), so we can't support that.
                if (!childFqn) {
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
    let errors = new Array<string>();

    for (let ref of typeRefs) {
        let localType = ref.fqn in mod.types;
        let externalType = externalTypes.has(ref.fqn);

        if (!localType && !externalType) {
            errors.push(`${ref.fqn} is referenced from context: ${ref.ctx.join('/')}`);
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
    let lookup = new Map<string, spec.Type>();
    let dependencies: { [dep: string]: spec.Assembly } = { };
    let bundled: { [name: string]: string } = { };

    bundledDeps = bundledDeps || [ ];
    packageDeps = packageDeps || { };

    async function addDependency(packageName: string, rootDir: string) {
        let { jsii, pkg } = await readJsiiForModule(rootDir, packageName);

        // verify that dependencies specify names for all languages defined by this package
        // this is required in order for us to be able to resolve jsii symbols in native languages.
        for (let lang of languages) {
            if (!(lang in pkg.names)) {
                throw new Error(`Dependent package ${packageName} does not have a name specified for language '${lang}' which is defined by this module`);
            }
        }

        let moduleName = normalizeJsiiModuleName(packageName);

        dependencies[moduleName] = jsii;
        delete jsii.code;

        // add all types to lookup table.
        if (jsii.types) {
            Object.keys(jsii.types).forEach(fqn => lookup.set(fqn, jsii.types[fqn]));
        }
    }

    for (let packageName in packageDeps) {
        // if this package is defined under 'jsiiBundledDependencies', add it to the "bundled" list
        let bundledDepIndex = bundledDeps.indexOf(packageName);
        if (bundledDepIndex !== -1) {
            bundled[packageName] = packageDeps[packageName];
            bundledDeps.splice(bundledDepIndex, 1); // remove from the expected list
            continue;
        }

        addDependency(packageName, rootDir);
    }

    if (bundledDeps.length > 0) {
        throw new Error('There are some dependencies defined as jsiiBundledDependencies but we could not find them under "dependencies": ' + bundledDeps.join());
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
    let moduleDir = await findModuleRoot(rootDir, packageName);

    if (!moduleDir) {
        throw new Error(`Cannot find ${packageName} under node_modules (here or up the tree)`);
    }

    let pkg = await readPackageMetadata(moduleDir);

    const outdir = pkg.outdir;
    let jsiiFilePath = path.join(outdir, spec.SPEC_FILE_NAME);
    let jsii = await fs.readJson(jsiiFilePath) as spec.Assembly;
    if (jsii.schema !== spec.SPEC_VERSION) {
        throw new Error(`The jsii spec of module ${packageName} has version ${jsii.schema} while we expect ${spec.SPEC_VERSION} (TODO: semver)`);
    }

    return { pkg, jsii, moduleDir };
}

async function aglob(pattern: string) {
    return new Promise<string[]>((ok, fail) => glob(pattern, (err, matches) => err ? fail(err) : ok(matches)));
}

function renderNativeNames(mod: spec.Assembly) {
    const nativenames: { [jsii: string]: { [language: string]: string } } = { };

    nativenames[mod.name] = mod.names;

    for (let depname of Object.keys(mod.dependencies)) {
        const dep = mod.dependencies[depname];
        nativenames[depname] = dep.names;
    }

    return nativenames;
}
