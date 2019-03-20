import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as os from 'os';
import * as path from 'path';
import { SourceMapConsumer } from 'source-map';
import * as tar from 'tar';
import * as vm from 'vm';
import * as api from './api';
import { TOKEN_DATE, TOKEN_ENUM, TOKEN_REF } from './api';

/**
 * Added to objects and contains the objid (the object reference).
 * Used to find the object id from an object.
 */
const OBJID_PROP = '$__jsii__objid__$';
const FQN_PROP = '$__jsii__fqn__$';
const PROXIES_PROP = '$__jsii__proxies__$';
const PROXY_REFERENT_PROP = '$__jsii__proxy_referent__$';

/**
 * A special FQN that can be used to create empty javascript objects.
 */
const EMPTY_OBJECT_FQN = 'Object';

export class Kernel {
    /**
     * Set to true for verbose debugging.
     */
    public traceEnabled = false;

    private assemblies: { [name: string]: Assembly } = { };
    private objects: { [objid: string]: any } = { };
    private cbs: { [cbid: string]: Callback } = { };
    private waiting: { [cbid: string]: Callback } = { };
    private promises: { [prid: string]: AsyncInvocation } = { };
    private nextid = 10000; // incrementing counter for objid, cbid, promiseid
    private syncInProgress?: string; // forbids async calls (begin) while processing sync calls (get/set/invoke)
    private installDir?: string;

    private readonly sandbox: vm.Context;
    private readonly sourceMaps: { [assm: string]: SourceMapConsumer } = {};

    /**
     * Creates a jsii kernel object.
     *
     * @param callbackHandler This handler is invoked when a synchronous callback is called.
     *                        It's responsibility is to execute the callback and return it's
     *                        result (or throw an error).
     */
    constructor(public callbackHandler: (callback: api.Callback) => any) {
        // `setImmediate` is required for tests to pass (it is otherwise
        // impossible to wait for in-VM promises to complete)

        // `Buffer` is required when using simple-resource-bundler.

        // HACK: when we webpack jsii-runtime, all "require" statements get transpiled,
        // so modules can be resolved within the pack. However, here we actually want to
        // let loaded modules to use the native node "require" method.
        // I wonder if webpack has some pragma that allows opting-out at certain points
        // in the code.
        const moduleLoad = require('module').Module._load;
        const nodeRequire = (p: string) => moduleLoad(p, module, false);

        this.sandbox = vm.createContext({
            Buffer, // to use simple-resource-bundler
            setImmediate, // async tests
            require: nodeRequire // modules need to "require"
        });
    }

    public async load(req: api.LoadRequest): Promise<api.LoadResponse> {
        this._debug('load', req);

        if ('assembly' in req) {
            throw new Error('`assembly` field is deprecated for "load", use `name`, `version` and `tarball` instead');
        }

        if (!this.installDir) {
            this.installDir  = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-kernel-'));
            await fs.mkdirp(path.join(this.installDir, 'node_modules'));
            this._debug('creating jsii-kernel modules workdir:', this.installDir);

            process.on('exit', () => {
                if (this.installDir) {
                    this._debug('removing install dir', this.installDir);
                    fs.removeSync(this.installDir); // can't use async version during exit
                }
            });
        }

        const pkgname = req.name;
        const pkgver  = req.version;

        // check if we already have such a module
        const packageDir = path.join(this.installDir, 'node_modules', pkgname);
        if (await fs.pathExists(packageDir)) {
            // module exists, verify version
            const epkg = await fs.readJson(path.join(packageDir, 'package.json'));
            if (epkg.version !== pkgver) {
                throw new Error(`Multiple versions ${pkgver} and ${epkg.version} of the `
                + `package '${pkgname}' cannot be loaded together since this is unsupported by `
                + `some runtime environments`);
            }

            // same version, no-op
            this._debug('look up already-loaded assembly', pkgname);
            const assm = this.assemblies[pkgname];

            return {
                assembly: assm.metadata.name,
                types: Object.keys(assm.metadata.types || {}).length,
            };
        } else {
            // untar the archive to a staging directory, read the jsii spec from it
            // and then move it to the node_modules directory of the kernel.
            const staging = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-kernel-install-staging-'));
            try {
                await tar.extract({ strict: true, file: req.tarball, cwd: staging });

                // read .jsii metadata from the root of the package
                const  jsiiMetadataFile = path.join(staging, 'package', spec.SPEC_FILE_NAME);
                if (!(await fs.pathExists(jsiiMetadataFile))) {
                    throw new Error(`Package tarball ${req.tarball} must have a file named ${spec.SPEC_FILE_NAME} at the root`);
                }
                const assmSpec = await fs.readJson(jsiiMetadataFile) as spec.Assembly;

                // "install" to "node_modules" directory
                await fs.move(path.join(staging, 'package'), packageDir);

                // load the module and capture it's closure
                const closure = this._execute(`require(String.raw\`${packageDir}\`)`, packageDir);
                const assm = new Assembly(assmSpec, closure);
                this._addAssembly(assm);

                return {
                    assembly: assmSpec.name,
                    types: Object.keys(assmSpec.types || {}).length,
                };
            } finally {
                this._debug('removing staging directory:', staging);
                await fs.remove(staging);
            }
        }
    }

    public create(req: api.CreateRequest): api.CreateResponse {
        return this._create(req);
    }

    public del(req: api.DelRequest): api.DelResponse {
        const { objref } = req;

        this._debug('del', objref);
        const obj = this._findObject(objref); // make sure object exists
        delete this.objects[objref[TOKEN_REF]];

        if (obj[PROXY_REFERENT_PROP]) {
            // De-register the proxy if this was a proxy...
            delete obj[PROXY_REFERENT_PROP][PROXIES_PROP][obj[FQN_PROP]];
        }

        return { };
    }

    public sget(req: api.StaticGetRequest): api.GetResponse {
        const { fqn, property } = req;
        const symbol = `${fqn}.${property}`;
        this._debug('sget', symbol);
        const ti = this._typeInfoForProperty(fqn, property);

        if (!ti.static) {
            throw new Error(`property ${symbol} is not static`);
        }

        const prototype = this._findSymbol(fqn);

        const value = this._ensureSync(`property ${property}`, () =>
            this._wrapSandboxCode(() => prototype[property]));

        this._debug('value:', value);
        const ret = this._fromSandbox(value, ti.type);
        this._debug('ret', ret);
        return { value: ret };
    }

    public sset(req: api.StaticSetRequest): api.SetResponse {
        const { fqn, property, value } = req;
        const symbol = `${fqn}.${property}`;
        this._debug('sset', symbol);
        const ti = this._typeInfoForProperty(fqn, property);

        if (!ti.static) {
            throw new Error(`property ${symbol} is not static`);
        }

        if (ti.immutable) {
            throw new Error(`static property ${symbol} is readonly`);
        }

        const prototype = this._findSymbol(fqn);

        this._ensureSync(`property ${property}`, () =>
            this._wrapSandboxCode(() => prototype[property] = this._toSandbox(value)));

        return {};
    }

    public get(req: api.GetRequest): api.GetResponse {
        const { objref, property } = req;
        this._debug('get', objref, property);
        const obj = this._findObject(objref);
        const fqn = this._fqnForObject(obj);
        const ti = this._typeInfoForProperty(fqn, property);

        // if the property is overridden by the native code and "get" is called on the object, it
        // means that the native code is trying to access the "super" property. in order to enable
        // that, we actually keep a copy of the original property descriptor when we override,
        // so `findPropertyTarget` will return either the original property name ("property") or
        // the "super" property name (somehing like "$jsii$super$<property>$").
        const propertyToGet = this._findPropertyTarget(obj, property);

        // make the actual "get", and block any async calls that might be performed
        // by jsii overrides.
        const value = this._ensureSync(`property '${objref[TOKEN_REF]}.${propertyToGet}'`,
                                       () => this._wrapSandboxCode(() => obj[propertyToGet]));
        this._debug('value:', value);
        const ret = this._fromSandbox(value, ti.type);
        this._debug('ret:', ret);
        return { value:  ret };
    }

    public set(req: api.SetRequest): api.SetResponse {
        const { objref, property, value } = req;
        this._debug('set', objref, property, value);
        const obj = this._findObject(objref);

        const fqn = this._fqnForObject(obj);
        const propInfo = this._typeInfoForProperty(fqn, req.property);

        if (propInfo.immutable) {
            throw new Error(`Cannot set value of immutable property ${req.property} to ${req.value}`);
        }

        const propertyToSet = this._findPropertyTarget(obj, property);

        this._ensureSync(`property '${objref[TOKEN_REF]}.${propertyToSet}'`,
                         () => this._wrapSandboxCode(() => obj[propertyToSet] = this._toSandbox(value)));

        return { };
    }

    public invoke(req: api.InvokeRequest): api.InvokeResponse {
        const { objref, method } = req;
        const args = req.args || [ ];

        this._debug('invoke', objref, method, args);
        const { ti, obj, fn } = this._findInvokeTarget(objref, method, args);

        // verify this is not an async method
        if (ti.returns && ti.returns.promise) {
            throw new Error(`${method} is an async method, use "begin" instead`);
        }

        const ret = this._ensureSync(`method '${objref[TOKEN_REF]}.${method}'`, () => {
            return this._wrapSandboxCode(() => fn.apply(obj, this._toSandboxValues(args)));
        });

        return { result: this._fromSandbox(ret, ti.returns) };
    }

    public sinvoke(req: api.StaticInvokeRequest): api.InvokeResponse {
        const { fqn, method } = req;
        const args = req.args || [ ];

        this._debug('sinvoke', fqn, method, args);

        const ti = this._typeInfoForMethod(fqn, method);

        if (!ti.static) {
            throw new Error(`${fqn}.${method} is not a static method`);
        }

        // verify this is not an async method
        if (ti.returns && ti.returns.promise) {
            throw new Error(`${method} is an async method, use "begin" instead`);
        }

        const prototype = this._findSymbol(fqn);
        const fn = prototype[method];

        const ret = this._ensureSync(`method '${fqn}.${method}'`, () => {
            return this._wrapSandboxCode(() => fn.apply(null, this._toSandboxValues(args)));
        });

        this._debug('method returned:', ret);
        return { result: this._fromSandbox(ret, ti.returns) };
    }

    public begin(req: api.BeginRequest): api.BeginResponse {
        const { objref, method } = req;
        const args = req.args || [ ];

        this._debug('begin', objref, method, args);

        if (this.syncInProgress) {
            // tslint:disable-next-line:max-line-length
            throw new Error(`Cannot invoke async method '${req.objref[TOKEN_REF]}.${req.method}' while sync ${this.syncInProgress} is being processed`);
        }

        const { ti, obj, fn } = this._findInvokeTarget(objref, method, args);

        // verify this is indeed an async method
        if (!ti.returns || !ti.returns.promise) {
            throw new Error(`Method ${method} is expected to be an async method`);
        }

        const promise = this._wrapSandboxCode(() => fn.apply(obj, this._toSandboxValues(args))) as Promise<any>;

        // since we are planning to resolve this promise in a different scope
        // we need to handle rejections here [1]
        // [1]: https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously/40921505
        promise.catch(_ => undefined);

        const prid = this._makeprid();
        this.promises[prid] = {
            promise,
            method: ti
        };

        return { promiseid: prid };
    }

    public async end(req: api.EndRequest): Promise<api.EndResponse> {
        const { promiseid } = req;

        this._debug('end', promiseid);

        const { promise, method } = this.promises[promiseid];
        if (!promise) {
            throw new Error(`Cannot find promise with ID: ${promiseid}`);
        }

        let result;
        try {
            result = await promise;
            this._debug('promise result:', result);
        } catch (e) {
            this._debug('promise error:', e);
            throw mapSource(e, this.sourceMaps);
        }

        return { result: this._fromSandbox(result, method.returns) };
    }

    public callbacks(_req?: api.CallbacksRequest): api.CallbacksResponse {
        this._debug('callbacks');
        const ret = Object.keys(this.cbs).map(cbid => {
            const cb = this.cbs[cbid];
            this.waiting[cbid] = cb; // move to waiting
            const callback: api.Callback = {
                cbid,
                cookie: cb.override.cookie,
                invoke: {
                    objref: cb.objref,
                    method: cb.override.method!,
                    args: cb.args
                },
            };
            return callback;
        });

        // move all callbacks to the wait queue and clean the callback queue.
        this.cbs = { };
        return { callbacks: ret };
    }

    public complete(req: api.CompleteRequest): api.CompleteResponse {
        const { cbid, err, result } = req;

        this._debug('complete', cbid, err, result);

        if (!(cbid in this.waiting)) {
            throw new Error(`Callback ${cbid} not found`);
        }

        const cb = this.waiting[cbid];
        if (err) {
            this._debug('completed with error:', err);
            cb.fail(new Error(err));
        } else {
            const sandoxResult = this._toSandbox(result);
            this._debug('completed with result:', sandoxResult);
            cb.succeed(sandoxResult);
        }

        delete this.waiting[cbid];

        return { cbid };
    }

    /**
     * Returns the language-specific names for a jsii module.
     * @param assemblyName The name of the jsii module (i.e. jsii$jsii_calculator_lib$)
     */
    public naming(req: api.NamingRequest): api.NamingResponse {
        const assemblyName = req.assembly;

        this._debug('naming', assemblyName);

        const assembly = this._assemblyFor(assemblyName);
        const targets = assembly.metadata.targets;
        if (!targets) {
            throw new Error(`Unexpected - "targets" for ${assemblyName} is missing!`);
        }

        return { naming: targets };
    }

    public stats(_req?: api.StatsRequest): api.StatsResponse {
        return {
            objectCount: Object.keys(this.objects).length
        };
    }

    private _addAssembly(assm: Assembly) {
        this.assemblies[assm.metadata.name] = assm;

        // add the __jsii__.fqn property on every constructor. this allows
        // traversing between the javascript and jsii worlds given any object.
        for (const fqn of Object.keys(assm.metadata.types || {})) {
            const typedef = assm.metadata.types![fqn];
            switch (typedef.kind) {
                case spec.TypeKind.Interface:
                    continue; // interfaces don't really exist
                case spec.TypeKind.Class:
                case spec.TypeKind.Enum:
                    const constructor = this._findSymbol(fqn);
                    Object.defineProperty(constructor, '__jsii__', {
                        configurable: false,
                        enumerable: false,
                        writable: false,
                        value: { fqn }
                    });
            }
        }
    }

    // find the javascript constructor function for a jsii FQN.
    private _findCtor(fqn: string, args: any[]) {
        if (fqn === EMPTY_OBJECT_FQN) {
            return Object;
        }

        const typeinfo = this._typeInfoForFqn(fqn);

        switch (typeinfo.kind) {
            case spec.TypeKind.Class:
                const classType = typeinfo as spec.ClassType;
                this._validateMethodArguments(classType.initializer, args);
                return this._findSymbol(fqn);

            case spec.TypeKind.Interface:
                throw new Error(`Cannot create an object with an FQN of an interface: ${fqn}`);

            default:
                throw new Error(`Unexpected FQN kind: ${fqn}`);
        }
    }

    // prefixed with _ to allow calling this method internally without
    // getting it recorded for testing.
    private _create(req: api.CreateRequest): api.CreateResponse {
        const { fqn, overrides } = req;

        const requestArgs = req.args || [];

        const ctor = this._findCtor(fqn, requestArgs);
        const obj = this._wrapSandboxCode(() => new ctor(...this._toSandboxValues(requestArgs)));
        const objref = this._createObjref(obj, fqn);

        // overrides: for each one of the override method names, installs a
        // method on the newly created object which represents the remote "reverse proxy".

        if (overrides) {
            this._debug('overrides', overrides);

            const overrideTypeErrorMessage = 'Override can either be "method" or "property"';
            const methods = new Set<string>();
            const properties = new Set<string>();

            for (const override of overrides) {
                if (override.method) {
                    if (override.property) { throw new Error(overrideTypeErrorMessage); }
                    if (methods.has(override.method)) { throw new Error(`Duplicate override for method '${override.method}'`); }

                    methods.add(override.method);

                    // check that the method being overridden actually exists
                    let methodInfo;
                    if (fqn !== EMPTY_OBJECT_FQN) {
                        // error if we can find a property with this name
                        if (this._tryTypeInfoForProperty(fqn, override.method)) {
                            throw new Error(`Trying to override property '${override.method}' as a method`);
                        }

                        methodInfo = this._tryTypeInfoForMethod(fqn, override.method);
                    }

                    this._applyMethodOverride(obj, objref, override, methodInfo);
                } else if (override.property) {
                    if (override.method) { throw new Error(overrideTypeErrorMessage); }
                    if (properties.has(override.property)) { throw Error(`Duplicate override for property '${override.property}'`); }
                    properties.add(override.property);

                    let propInfo: spec.Property | undefined;
                    if (fqn !== EMPTY_OBJECT_FQN) {
                        // error if we can find a method with this name
                        if (this._tryTypeInfoForMethod(fqn, override.property)) {
                            throw new Error(`Trying to override method '${override.property}' as a property`);
                        }

                        propInfo = this._tryTypeInfoForProperty(fqn, override.property);
                    }

                    this._applyPropertyOverride(obj, objref, override, propInfo);
                } else {
                    throw new Error(overrideTypeErrorMessage);
                }
            }
        }

        return objref;
    }

    private _getSuperPropertyName(name: string) {
        return `$jsii$super$${name}$`;
    }

    private _applyPropertyOverride(obj: any, objref: api.ObjRef, override: api.Override, propInfo?: spec.Property) {
        const self = this;
        const propertyName = override.property!;

        // if this is a private property (i.e. doesn't have `propInfo` the object has a key)
        if (!propInfo && propertyName in obj) {
            this._debug(`Skipping override of private property ${propertyName}`);
            return;
        }

        this._debug('apply override', propertyName);

        // save the old property under $jsii$super$<prop>$ so that property overrides
        // can still access it via `super.<prop>`.
        const prev = Object.getOwnPropertyDescriptor(obj, propertyName) || {
            value: undefined,
            writable: true,
            enumerable: true,
            configurable: true
        };

        const prevEnumerable = prev.enumerable;
        prev.enumerable = false;
        Object.defineProperty(obj, this._getSuperPropertyName(propertyName), prev);

        // we add callbacks for both 'get' and 'set', even if the property
        // is readonly. this is fine because if you try to set() a readonly
        // property, it will fail.
        Object.defineProperty(obj, propertyName, {
            enumerable: prevEnumerable,
            configurable: prev.configurable,
            get: () => {
                const result = self.callbackHandler({
                    cookie: override.cookie,
                    cbid: self._makecbid(),
                    get: { objref, property: propertyName }
                });
                this._debug('callback returned', result);
                return this._toSandbox(result);
            },
            set: (value: any) => {
                self._debug('virtual set', objref, propertyName, { cookie: override.cookie });
                self.callbackHandler({
                    cookie: override.cookie,
                    cbid: self._makecbid(),
                    set: { objref, property: propertyName, value: self._fromSandbox(value) }
                });
            }
        });
    }

    private _applyMethodOverride(obj: any, objref: api.ObjRef, override: api.Override, methodInfo?: spec.Method) {
        const self = this;
        const methodName = override.method!;

        // If this is a private method (doesn't have methodInfo, key resolves on the object), we
        // are going to skip the override.
        if (!methodInfo && obj[methodName]) {
            this._debug(`Skipping override of private method ${methodName}`);
            return;
        }

        // note that we are applying the override even if the method doesn't exist
        // on the type spec in order to allow native code to override methods from
        // interfaces.

        if (methodInfo && methodInfo.returns && methodInfo.returns.promise) {
            // async method override
            Object.defineProperty(obj, methodName, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: (...methodArgs: any[]) => {
                    self._debug('invoked async override', override);
                    const args = self._toSandboxValues(methodArgs);
                    return new Promise<any>((succeed, fail) => {
                        const cbid = self._makecbid();
                        self._debug('adding callback to queue', cbid);
                        self.cbs[cbid] = {
                            objref,
                            override,
                            args,
                            succeed,
                            fail
                        };
                    });
                }
            });
        } else {
            // sync method override (method info is not required)
            Object.defineProperty(obj, methodName, {
                enumerable: false,
                configurable: false,
                writable: false,
                value: (...methodArgs: any[]) => {
                    const result = self.callbackHandler({
                        cookie: override.cookie,
                        cbid: self._makecbid(),
                        invoke: {
                            objref,
                            method: methodName,
                            args: this._fromSandbox(methodArgs)
                        }
                    });
                    return this._toSandbox(result);
                }
            });
        }
    }

    private _findInvokeTarget(objref: any, methodName: string, args: any[]) {
        const obj = this._findObject(objref);
        const fqn = this._fqnForObject(obj);
        const ti = this._typeInfoForMethod(fqn, methodName);
        this._validateMethodArguments(ti, args);

        // always first look up the method in the prototype. this practically bypasses
        // any methods overridden by derived classes (which are by definition native
        // methods). this serves to allow native call to invoke "super.method()" when
        // overriding the method.
        // if we didn't find the method on the prototype, it could be a literal object
        // that implements an interface, so we look if we have the method on the object
        // itself. if we do, we invoke it.
        let fn = obj.constructor.prototype[methodName];
        if (!fn) {
            fn = obj[methodName];
            if (!fn) {
                throw new Error(`Cannot find ${methodName} on object`);
            }
        }
        return { ti, obj, fn };
    }

    private _formatTypeRef(typeRef: spec.TypeReference): string {
        if (spec.isCollectionTypeReference(typeRef)) {
            return `${typeRef.collection.kind}<${this._formatTypeRef(typeRef.collection.elementtype)}>`;
        }

        if (spec.isNamedTypeReference(typeRef)) {
            return typeRef.fqn;
        }

        if (spec.isPrimitiveTypeReference(typeRef)) {
            return typeRef.primitive;
        }

        if (spec.isUnionTypeReference(typeRef)) {
            return typeRef.union.types.map(t => this._formatTypeRef(t)).join(' | ');
        }

        throw new Error(`Invalid type reference: ${JSON.stringify(typeRef)}`);
    }

    private _validateMethodArguments(method: spec.Method | undefined, args: any[]) {
        const params: spec.Parameter[] = (method && method.parameters) || [];

        // error if args > params
        if (args.length > params.length && !(method && method.variadic)) {
            throw new Error(`Too many arguments (method accepts ${params.length} parameters, got ${args.length} arguments)`);
        }

        for (let i = 0; i < params.length; ++i) {
            const param = params[i];
            const arg = args[i];

            if (param.variadic) {
                if (params.length <= i) { return; } // No vararg was provided
                for (let j = i ; j < params.length ; j++) {
                    if (params[j] === undefined) {
                        // tslint:disable-next-line:max-line-length
                        throw new Error(`Unexpected 'undefined' value at index ${j - i} of variadic argument '${param.name}' of type '${this._formatTypeRef(param.type)}'`);
                    }
                }
            } else if (!param.type.optional && arg === undefined) {
                // tslint:disable-next-line:max-line-length
                throw new Error(`Not enough arguments. Missing argument for the required parameter '${param.name}' of type '${this._formatTypeRef(param.type)}'`);
            }
        }
    }

    private _assemblyFor(assemblyName: string) {
        const assembly = this.assemblies[assemblyName];
        if (!assembly) {
            throw new Error(`Could not find assembly: ${assemblyName}`);
        }
        return assembly;
    }

    private _findSymbol(fqn: string) {
        const [ assemblyName, ...parts ] = fqn.split('.');
        const assembly = this._assemblyFor(assemblyName);

        let curr = assembly.closure;
        while (true) {
            const name = parts.shift();
            if (!name) {
                break;
            }

            curr = curr[name];
        }
        if (!curr) {
            throw new Error(`Could not find symbol ${fqn}`);
        }
        return curr;
    }

    private _createObjref(obj: any, fqn: string): api.ObjRef {
        const objid = this._mkobjid(fqn);
        Object.defineProperty(obj, OBJID_PROP, {
            value: objid,
            configurable: false,
            enumerable: false,
            writable: false
        });

        Object.defineProperty(obj, FQN_PROP, {
            value: fqn,
            configurable: false,
            enumerable: false,
            writable: false
        });

        this.objects[objid] = obj;
        return { [TOKEN_REF]: objid };
    }

    private _findObject(objref: api.ObjRef) {
        if (typeof(objref) !== 'object' || !(TOKEN_REF in objref)) {
            throw new Error(`Malformed object reference: ${JSON.stringify(objref)}`);
        }

        const objid = objref[TOKEN_REF];
        this._debug('findObject', objid);
        const obj = this.objects[objid];
        if (!obj) {
            throw new Error(`Object ${objid} not found`);
        }
        return obj;
    }

    private _typeInfoForFqn(fqn: string): spec.Type {
        const components = fqn.split('.');
        const moduleName = components[0];

        const assembly = this.assemblies[moduleName];
        if (!assembly) {
            throw new Error(`Module '${moduleName}' not found`);
        }

        const types = assembly.metadata.types || {};
        const fqnInfo = types[fqn];
        if (!fqnInfo) {
            throw new Error(`Type '${fqn}' not found`);
        }

        return fqnInfo;
    }

    private _typeInfoForMethod(fqn: string, methodName: string): spec.Method {
        const ti = this._tryTypeInfoForMethod(fqn, methodName);
        if (!ti) {
            throw new Error(`Class ${fqn} doesn't have a method '${methodName}'`);
        }
        return ti;
    }

    private _tryTypeInfoForMethod(fqn: string, methodName: string): spec.Method | undefined {
        const typeinfo = this._typeInfoForFqn(fqn);

        const methods = (typeinfo as (spec.ClassType | spec.InterfaceType)).methods || [];
        const bases = [
            (typeinfo as spec.ClassType).base,
            ...((typeinfo as spec.InterfaceType).interfaces || []) ];

        for (const m of methods) {
            if (m.name === methodName) {
                return m;
            }
        }

        // recursion to parent type (if exists)
        for (const base of bases) {
            if (!base) { continue; }

            const found = this._tryTypeInfoForMethod(base.fqn!, methodName);
            if (found) {
                return found;
            }
        }

        return undefined;
    }

    private _tryTypeInfoForProperty(fqn: string, property: string): spec.Property | undefined {
        if (!fqn) {
            throw new Error('missing "fqn"');
        }
        const typeInfo = this._typeInfoForFqn(fqn);

        let properties;
        let bases;

        if (spec.isClassType(typeInfo)) {
            const classTypeInfo = typeInfo as spec.ClassType;
            properties = classTypeInfo.properties;
            bases = classTypeInfo.base ? [ classTypeInfo.base.fqn ] : [];
        } else if (spec.isInterfaceType(typeInfo)) {
            const interfaceTypeInfo = typeInfo as spec.InterfaceType;
            properties = interfaceTypeInfo.properties;
            bases = (interfaceTypeInfo.interfaces || []).map(x => x.fqn);
        } else {
            throw new Error(`Type of kind ${typeInfo.kind} does not have properties`);
        }

        for (const p of properties || []) {
            if (p.name === property) {
                return p;
            }
        }

        // recurse to parent type (if exists)
        for (const baseFqn of bases) {
            const ret = this._tryTypeInfoForProperty(baseFqn, property);
            if (ret) {
                return ret;
            }
        }

        return undefined;
    }

    private _typeInfoForProperty(fqn: string, property: string): spec.Property {
        const typeInfo = this._tryTypeInfoForProperty(fqn, property);
        if (!typeInfo) {
            throw new Error(`Type ${fqn} doesn't have a property '${property}'`);
        }
        return typeInfo;
    }

    private _toSandbox(v: any): any {
        // undefined
        if (typeof v === 'undefined') {
            return undefined;
        }

        // null is treated as "undefined" because most languages do not have this distinction
        // see awslabs/aws-cdk#157 and awslabs/jsii#282
        if (v === null) {
            return undefined;
        }

        // pointer
        if (typeof v === 'object' && TOKEN_REF in v) {
            return this._findObject(v);
        }

        // date
        if (typeof v === 'object' && TOKEN_DATE in v) {
            this._debug('Found date:', v);
            return new Date(v[TOKEN_DATE]);
        }

        // enums
        if (typeof v === 'object' && TOKEN_ENUM in v) {
            this._debug('Enum:', v);

            const value = v[TOKEN_ENUM] as string;
            const sep = value.lastIndexOf('/');
            if (sep === -1) {
                throw new Error(`Malformed enum value: ${v[TOKEN_ENUM]}`);
            }

            const typeName = value.substr(0, sep);
            const valueName = value.substr(sep + 1);

            const enumValue = this._findSymbol(typeName)[valueName];
            if (enumValue === undefined) {
                throw new Error(`No enum member named ${valueName} in ${typeName}`);
            }

            this._debug('resolved enum value:', enumValue);
            return enumValue;
        }

        // array
        if (Array.isArray(v)) {
            return v.map(x => this._toSandbox(x));
        }

        // map
        if (typeof v === 'object') {
            const out: any = { };
            for (const k of Object.keys(v)) {
                const value = this._toSandbox(v[k]);

                // javascript has a fun behavior where
                //     { ...{ x: 'hello' }, ...{ x: undefined } }
                // will result in:
                //     { x: undefined }
                // so omit any keys that have an `undefined` values.
                // see awslabs/aws-cdk#965 and compliance test "mergeObjects"
                if (value === undefined) {
                    continue;
                }

                out[k] = value;
            }
            return out;
        }

        // primitive
        return v;
    }

    private _fromSandbox(v: any, targetType?: spec.TypeReference): any {
        this._debug('fromSandbox', v, targetType);

        // undefined is returned as null: true
        if (typeof(v) === 'undefined') {
            return undefined;
        }

        if (v === null) {
            return undefined;
        }

        // existing object
        const objid = v[OBJID_PROP];
        if (objid) {
            // object already has an objid, return it as a ref.
            this._debug('objref exists', objid);
            return { [TOKEN_REF]: objid };
        }

        // new object
        if (typeof(v) === 'object' && v.constructor.__jsii__) {
            // this is jsii object which was created inside the sandbox and still doesn't
            // have an object id, so we need to allocate one for it.
            this._debug('creating objref for', v);
            const fqn = this._fqnForObject(v);
            if (!targetType || !spec.isNamedTypeReference(targetType) || this._isAssignable(fqn, targetType)) {
                return this._createObjref(v, fqn);
            }
        }

        // if the method/property returns an object literal and the return type
        // is a class, we create a new object based on the fqn and assign all keys.
        // so the client receives a real object.
        if (typeof(v) === 'object' && targetType && spec.isNamedTypeReference(targetType)) {
            this._debug('coalescing to', targetType);
            /*
             * We "cache" proxy instances in [PROXIES_PROP] so we can return an
             * identical object reference upon multiple accesses of the same
             * object literal under the same exposed type. This results in a
             * behavior that is more consistent with class instances.
             */
            const proxies: Proxies = v[PROXIES_PROP] = v[PROXIES_PROP] || {};
            if (!proxies[targetType.fqn]) {
                const handler = new KernelProxyHandler(v);
                const proxy = new Proxy(v, handler);
                // _createObjref will set the FQN_PROP & OBJID_PROP on the proxy.
                proxies[targetType.fqn] = { objRef: this._createObjref(proxy, targetType.fqn), handler };
            }
            return proxies[targetType.fqn].objRef;
        }

        // date (https://stackoverflow.com/a/643827/737957)
        if (typeof(v) === 'object' && Object.prototype.toString.call(v) === '[object Date]') {
            this._debug('date', v);
            return { [TOKEN_DATE]: v.toISOString() };
        }

        // array
        if (Array.isArray(v)) {
            this._debug('array', v);
            return v.map(x => this._fromSandbox(x));
        }

        if (targetType && spec.isNamedTypeReference(targetType)) {
            const propType = this._typeInfoForFqn(targetType.fqn);

            // enum
            if (propType.kind === spec.TypeKind.Enum) {
                this._debug('enum', v);
                const fqn = propType.fqn;

                const valueName = this._findSymbol(fqn)[v];

                return { [TOKEN_ENUM]: `${propType.fqn}/${valueName}` };
            }

        }

        // map
        if (typeof(v) === 'object') {
            this._debug('map', v);
            const out: any = { };
            for (const k of Object.keys(v)) {
                const value = this._fromSandbox(v[k]);
                if (value === undefined) {
                    continue;
                }
                out[k] = value;
            }
            return out;
        }

        // primitive
        this._debug('primitive', v);
        return v;
    }

    /**
     * Tests whether a given type (by it's FQN) can be assigned to a named type reference.
     *
     * @param actualTypeFqn the FQN of the type that is being tested.
     * @param requiredType  the required reference type.
     *
     * @returns true if ``requiredType`` is a super-type (base class or implemented interface) of the type designated by
     *          ``actualTypeFqn``.
     */
    private _isAssignable(actualTypeFqn: string, requiredType: spec.NamedTypeReference): boolean {
        if (requiredType.fqn === actualTypeFqn) {
            return true;
        }
        const actualType = this._typeInfoForFqn(actualTypeFqn);
        if (spec.isClassType(actualType) && actualType.base) {
            if (this._isAssignable(actualType.base.fqn, requiredType)) {
                return true;
            }
        }
        if (spec.isClassOrInterfaceType(actualType) && actualType.interfaces) {
            return actualType.interfaces.find(iface => this._isAssignable(iface.fqn, requiredType)) != null;
        }
        return false;
    }

    private _toSandboxValues(args: any[]) {
        return args.map(v => this._toSandbox(v));
    }

    private _debug(...args: any[]) {
        if (this.traceEnabled) {
            // tslint:disable-next-line:no-console
            console.error.apply(console, [
                '[jsii-kernel]',
                args[0],
                ...args.slice(1)
            ]);
        }
    }

    /**
     * Ensures that `fn` is called and defends against beginning to invoke
     * async methods until fn finishes (successfully or not).
     */
    private _ensureSync<T>(desc: string, fn: () => T): T {
        this.syncInProgress = desc;
        try {
            return fn();
        } catch (e) {
            throw e;
        } finally {
            delete this.syncInProgress;
        }
    }

    private _findPropertyTarget(obj: any, property: string) {
        const superProp = this._getSuperPropertyName(property);
        if (superProp in obj) {
            return superProp;
        } else {
            return property;
        }
    }

    //
    // type information
    //

    private _fqnForObject(obj: any) {
        if (FQN_PROP in obj) {
            return obj[FQN_PROP];
        }

        if (!obj.constructor.__jsii__) {
            throw new Error('No jsii type info for object');
        }

        return obj.constructor.__jsii__.fqn;
    }

    private _mkobjid(fqn: string) {
        return `${fqn}@${this.nextid++}`;
    }

    private _makecbid() {
        return `jsii::callback::${this.nextid++}`;
    }

    private _makeprid() {
        return `jsii::promise::${this.nextid++}`;
    }

    private _wrapSandboxCode<T>(fn: () => T): T {
        try {
            return fn();
        } catch (err) {
            throw mapSource(err, this.sourceMaps);
        }
    }

    /**
     * Executes arbitrary code in a VM sandbox.
     *
     * @param code       JavaScript code to be executed in the VM
     * @param sandbox    a VM context to use for running the code
     * @param sourceMaps source maps to be used in case an exception is thrown
     * @param filename   the file name to use for the executed code
     *
     * @returns the result of evaluating the code
     */
    private _execute(code: string, filename: string) {
        const script = new vm.Script(code, { filename });
        try {
            return script.runInContext(this.sandbox, { displayErrors: true });
        } catch (err) {
            throw mapSource(err, this.sourceMaps);
        }
    }
}

interface Callback {
    objref: api.ObjRef;
    override: api.Override;
    args: any[];

    // completion callbacks
    succeed: (...args: any[]) => any;
    fail: (...args: any[]) => any;
}

interface AsyncInvocation {
    method: spec.Method
    promise: Promise<any>
}

class Assembly {
    constructor(public readonly metadata: spec.Assembly,
                public readonly closure: any) {
    }
}

/**
 * Applies source maps to an error's stack trace and returns the mapped error,
 * and stitches stack trace elements to adapt the context to the current trace.
 *
 * @param err        is the error to be mapped
 * @param sourceMaps the source maps to be used
 *
 * @returns the mapped error
 */
function mapSource(err: Error, sourceMaps: { [assm: string]: SourceMapConsumer }): Error {
    if (!err.stack) { return err; }
    const oldFrames = err.stack.split("\n");
    const obj = { stack: '' };
    const previousLimit = Error.stackTraceLimit;
    try {
        Error.stackTraceLimit = err.stack.split("\n").length;
        Error.captureStackTrace(obj, mapSource);
        const realFrames = obj.stack.split('\n').slice(1);
        const topFrame = realFrames[0].substring(0, realFrames[0].indexOf(' ('));
        err.stack = [
            ...oldFrames.slice(0, oldFrames.findIndex(frame => frame.startsWith(topFrame))).map(applyMaps),
            ...realFrames
        ].join("\n");
        return err;
    } finally {
        Error.stackTraceLimit = previousLimit;
    }

    function applyMaps(frame: string): string {
        const mappable = /^(\s*at\s+.+)\(jsii\/(.+)\.js:(\d+):(\d+)\)$/;
        const matches = mappable.exec(frame);
        if (!matches) { return frame; }
        const assm = matches[2];
        if (!(assm in sourceMaps)) { return frame; }
        const prefix = matches[1];
        const line = parseInt(matches[3], 10);
        const column = parseInt(matches[4], 10);
        const sourceMap = sourceMaps[assm];
        const pos = sourceMap.originalPositionFor({ line, column });
        if (pos.source != null && pos.line != null) {
            const source = pos.source.replace(/^webpack:\/\//, `${assm}`);
            return `${prefix}(${source}:${pos.line}:${pos.column || 0})`;
        }
        return frame;
    }
}

type ObjectKey = string | number | symbol;
/**
 * A Proxy handler class to support mutation of the returned object literals, as
 * they may "embody" several different interfaces. The handler is in particular
 * responsible to make sure the ``FQN_PROP`` and ``OBJID_PROP`` do not get set
 * on the ``referent`` object, for this would cause subsequent accesses to
 * possibly return incorrect object references.
 */
class KernelProxyHandler implements ProxyHandler<any> {
    private readonly ownProperties: { [key: string]: any } = {};

    /**
     * @param referent the "real" value that will be returned.
     */
    constructor(public readonly referent: any) {
        /*
         * Proxy-properties must exist as non-configurable & writable on the
         * referent, otherwise the Proxy will not allow returning ``true`` in
         * response to ``defineProperty``.
         */
        for (const prop of [FQN_PROP, OBJID_PROP]) {
            Object.defineProperty(referent, prop, {
                configurable: false,
                enumerable: false,
                writable: true,
                value: undefined
            });
        }
    }

    public defineProperty(target: any, property: ObjectKey, attributes: PropertyDescriptor): boolean {
        switch (property) {
        case FQN_PROP:
        case OBJID_PROP:
            return Object.defineProperty(this.ownProperties, property, attributes);
        default:
            return Object.defineProperty(target, property, attributes);
        }
    }

    public deleteProperty(target: any, property: ObjectKey): boolean {
        switch (property) {
        case FQN_PROP:
        case OBJID_PROP:
            delete this.ownProperties[property];
            break;
        default:
            delete target[property];
        }
        return true;
    }

    public getOwnPropertyDescriptor(target: any, property: ObjectKey): PropertyDescriptor | undefined {
        switch (property) {
        case FQN_PROP:
        case OBJID_PROP:
            return Object.getOwnPropertyDescriptor(this.ownProperties, property);
        default:
            return Object.getOwnPropertyDescriptor(target, property);
        }
    }

    public get(target: any, property: ObjectKey): any {
        switch (property) {
        // Magical property for the proxy, so we can tell it's one...
        case PROXY_REFERENT_PROP:
            return this.referent;
        case FQN_PROP:
        case OBJID_PROP:
            return this.ownProperties[property];
        default:
            return target[property];
        }
    }

    public set(target: any, property: ObjectKey, value: any): boolean {
        switch (property) {
        case FQN_PROP:
        case OBJID_PROP:
            this.ownProperties[property] = value;
            break;
        default:
            target[property] = value;
        }
        return true;
    }

    public has(target: any, property: ObjectKey): boolean {
        switch (property) {
        case FQN_PROP:
        case OBJID_PROP:
            return property in this.ownProperties;
        default:
            return property in target;
        }
    }

    public ownKeys(target: any): ObjectKey[] {
        return Reflect.ownKeys(target).concat(Reflect.ownKeys(this.ownProperties));
    }
}

type Proxies = { [fqn: string]: ProxyReference };
interface ProxyReference {
    objRef: api.ObjRef;
    handler: KernelProxyHandler;
}
