import * as fs from 'fs-extra';
import * as spec from 'jsii-spec';
import * as os from 'os';
import * as path from 'path';
import { SourceMapConsumer } from 'source-map';
import * as tar from 'tar';
import * as vm from 'vm';
import * as api from './api';
import { TOKEN_REF } from './api';
import { ObjectTable, tagJsiiConstructor } from './objects';
import wire = require('./serialization');

export class Kernel {
  /**
     * Set to true for verbose debugging.
     */
  public traceEnabled = false;

  private assemblies: { [name: string]: Assembly } = { };
  private readonly objects = new ObjectTable();
  private cbs: { [cbid: string]: Callback } = { };
  private waiting: { [cbid: string]: Callback } = { };
  private promises: { [prid: string]: AsyncInvocation } = { };
  private nextid = 20000; // incrementing counter for objid, cbid, promiseid
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
  public constructor(public callbackHandler: (callback: api.Callback) => any) {
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
      this.installDir = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-kernel-'));
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
    const pkgver = req.version;

    // check if we already have such a module
    const packageDir = path.join(this.installDir, 'node_modules', pkgname);
    if (await fs.pathExists(packageDir)) {
      // module exists, verify version
      const epkg = await fs.readJson(path.join(packageDir, 'package.json'));
      if (epkg.version !== pkgver) {
        throw new Error(`Multiple versions ${pkgver} and ${epkg.version} of the `
                + `package '${pkgname}' cannot be loaded together since this is unsupported by `
                + 'some runtime environments');
      }

      // same version, no-op
      this._debug('look up already-loaded assembly', pkgname);
      const assm = this.assemblies[pkgname];

      return {
        assembly: assm.metadata.name,
        types: Object.keys(assm.metadata.types || {}).length,
      };
    }
    // untar the archive to a staging directory, read the jsii spec from it
    // and then move it to the node_modules directory of the kernel.
    const staging = await fs.mkdtemp(path.join(os.tmpdir(), 'jsii-kernel-install-staging-'));
    try {
      await tar.extract({ strict: true, file: req.tarball, cwd: staging });

      // read .jsii metadata from the root of the package
      const jsiiMetadataFile = path.join(staging, 'package', spec.SPEC_FILE_NAME);
      if (!await fs.pathExists(jsiiMetadataFile)) {
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

  public create(req: api.CreateRequest): api.CreateResponse {
    return this._create(req);
  }

  public del(req: api.DelRequest): api.DelResponse {
    const { objref } = req;

    this._debug('del', objref);
    this.objects.deleteObject(objref);

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
    const ret = this._fromSandbox(value, ti);
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
      this._wrapSandboxCode(() => prototype[property] = this._toSandbox(value, ti)));

    return {};
  }

  public get(req: api.GetRequest): api.GetResponse {
    const { objref, property } = req;
    this._debug('get', objref, property);
    const { instance, fqn } = this.objects.findObject(objref);
    const ti = this._typeInfoForProperty(fqn, property);

    // if the property is overridden by the native code and "get" is called on the object, it
    // means that the native code is trying to access the "super" property. in order to enable
    // that, we actually keep a copy of the original property descriptor when we override,
    // so `findPropertyTarget` will return either the original property name ("property") or
    // the "super" property name (somehing like "$jsii$super$<property>$").
    const propertyToGet = this._findPropertyTarget(instance, property);

    // make the actual "get", and block any async calls that might be performed
    // by jsii overrides.
    const value = this._ensureSync(`property '${objref[TOKEN_REF]}.${propertyToGet}'`,
      () => this._wrapSandboxCode(() => instance[propertyToGet]));
    this._debug('value:', value);
    const ret = this._fromSandbox(value, ti);
    this._debug('ret:', ret);
    return { value:  ret };
  }

  public set(req: api.SetRequest): api.SetResponse {
    const { objref, property, value } = req;
    this._debug('set', objref, property, value);
    const { instance, fqn } = this.objects.findObject(objref);

    const propInfo = this._typeInfoForProperty(fqn, req.property);

    if (propInfo.immutable) {
      throw new Error(`Cannot set value of immutable property ${req.property} to ${req.value}`);
    }

    const propertyToSet = this._findPropertyTarget(instance, property);

    this._ensureSync(`property '${objref[TOKEN_REF]}.${propertyToSet}'`,
      () => this._wrapSandboxCode(() => instance[propertyToSet] = this._toSandbox(value, propInfo)));

    return { };
  }

  public invoke(req: api.InvokeRequest): api.InvokeResponse {
    const { objref, method } = req;
    const args = req.args || [];

    this._debug('invoke', objref, method, args);
    const { ti, obj, fn } = this._findInvokeTarget(objref, method, args);

    // verify this is not an async method
    if (ti.async) {
      throw new Error(`${method} is an async method, use "begin" instead`);
    }

    const ret = this._ensureSync(`method '${objref[TOKEN_REF]}.${method}'`, () => {
      return this._wrapSandboxCode(() => fn.apply(obj, this._toSandboxValues(args, ti.parameters)));
    });

    const result = this._fromSandbox(ret, ti.returns || 'void');
    this._debug('invoke result', result);

    return { result };
  }

  public sinvoke(req: api.StaticInvokeRequest): api.InvokeResponse {
    const { fqn, method } = req;
    const args = req.args || [];

    this._debug('sinvoke', fqn, method, args);

    const ti = this._typeInfoForMethod(fqn, method);

    if (!ti.static) {
      throw new Error(`${fqn}.${method} is not a static method`);
    }

    // verify this is not an async method
    if (ti.async) {
      throw new Error(`${method} is an async method, use "begin" instead`);
    }

    const prototype = this._findSymbol(fqn);
    const fn = prototype[method] as (...params: any[]) => any;

    const ret = this._ensureSync(`method '${fqn}.${method}'`, () => {
      return this._wrapSandboxCode(() => fn.apply(prototype, this._toSandboxValues(args, ti.parameters)));
    });

    this._debug('method returned:', ret);
    return { result: this._fromSandbox(ret, ti.returns || 'void') };
  }

  public begin(req: api.BeginRequest): api.BeginResponse {
    const { objref, method } = req;
    const args = req.args || [];

    this._debug('begin', objref, method, args);

    if (this.syncInProgress) {
      throw new Error(`Cannot invoke async method '${req.objref[TOKEN_REF]}.${req.method}' while sync ${this.syncInProgress} is being processed`);
    }

    const { ti, obj, fn } = this._findInvokeTarget(objref, method, args);

    // verify this is indeed an async method
    if (!ti.async) {
      throw new Error(`Method ${method} is expected to be an async method`);
    }

    const promise = this._wrapSandboxCode(() => fn.apply(obj, this._toSandboxValues(args, ti.parameters))) as Promise<any>;

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
    if (promise == null) {
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

    return { result: this._fromSandbox(result, method.returns || 'void') };
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
          method: cb.override.method,
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
      const sandoxResult = this._toSandbox(result, cb.expectedReturnType || 'void');
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
      objectCount: this.objects.count
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
          tagJsiiConstructor(constructor, fqn);
      }
    }
  }

  // find the javascript constructor function for a jsii FQN.
  private _findCtor(fqn: string, args: any[]): { ctor: any, parameters?: spec.Parameter[] } {
    if (fqn === wire.EMPTY_OBJECT_FQN) {
      return { ctor: Object };
    }

    const typeinfo = this._typeInfoForFqn(fqn);

    switch (typeinfo.kind) {
      case spec.TypeKind.Class:
        const classType = typeinfo as spec.ClassType;
        this._validateMethodArguments(classType.initializer, args);
        return { ctor: this._findSymbol(fqn), parameters: classType.initializer && classType.initializer.parameters };

      case spec.TypeKind.Interface:
        throw new Error(`Cannot create an object with an FQN of an interface: ${fqn}`);

      default:
        throw new Error(`Unexpected FQN kind: ${fqn}`);
    }
  }

  // prefixed with _ to allow calling this method internally without
  // getting it recorded for testing.
  private _create(req: api.CreateRequest): api.CreateResponse {
    this._debug('create', req);
    const { fqn, overrides } = req;

    const requestArgs = req.args || [];

    const ctorResult = this._findCtor(fqn, requestArgs);
    const ctor = ctorResult.ctor;
    const obj = this._wrapSandboxCode(() => new ctor(...this._toSandboxValues(requestArgs, ctorResult.parameters)));
    const objref = this.objects.registerObject(obj, fqn);

    // overrides: for each one of the override method names, installs a
    // method on the newly created object which represents the remote "reverse proxy".

    if (overrides) {
      this._debug('overrides', overrides);

      const overrideTypeErrorMessage = 'Override can either be "method" or "property"';
      const methods = new Set<string>();
      const properties = new Set<string>();

      for (const override of overrides) {
        if (api.isMethodOverride(override)) {
          if (api.isPropertyOverride(override)) { throw new Error(overrideTypeErrorMessage); }
          if (methods.has(override.method)) { throw new Error(`Duplicate override for method '${override.method}'`); }
          methods.add(override.method);

          this._applyMethodOverride(obj, objref, fqn, override);
        } else if (api.isPropertyOverride(override)) {
          if (api.isMethodOverride(override)) { throw new Error(overrideTypeErrorMessage); }
          if (properties.has(override.property)) { throw Error(`Duplicate override for property '${override.property}'`); }
          properties.add(override.property);

          this._applyPropertyOverride(obj, objref, fqn, override);
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

  private _applyPropertyOverride(obj: any, objref: api.ObjRef, typeFqn: string, override: api.PropertyOverride) {
    let propInfo;
    if (typeFqn !== wire.EMPTY_OBJECT_FQN) {
      // error if we can find a method with this name
      if (this._tryTypeInfoForMethod(typeFqn, override.property)) {
        throw new Error(`Trying to override method '${override.property}' as a property`);
      }

      propInfo = this._tryTypeInfoForProperty(typeFqn, override.property);
    }

    // if this is a private property (i.e. doesn't have `propInfo` the object has a key)
    if (!propInfo && override.property in obj) {
      this._debug(`Skipping override of private property ${override.property}`);
      return;
    }

    if (!propInfo) {
      // We've overriding a property on an object we have NO type information on (probably
      // because it's an anonymous object).
      // Pretend it's 'prop: any';
      //
      // FIXME: We could do better type checking during the conversion if JSII clients
      // would tell us the intended interface type.
      propInfo = {
        name: override.property,
        type: spec.CANONICAL_ANY,
      };
    }

    this._defineOverridenProperty(obj, objref, override, propInfo);
  }

  private _defineOverridenProperty(obj: any, objref: api.ObjRef, override: api.PropertyOverride, propInfo: spec.Property) {
    const propertyName = override.property;

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
        this._debug('virtual get', objref, propertyName, { cookie: override.cookie });
        const result = this.callbackHandler({
          cookie: override.cookie,
          cbid: this._makecbid(),
          get: { objref, property: propertyName }
        });
        this._debug('callback returned', result);
        return this._toSandbox(result, propInfo);
      },
      set: (value: any) => {
        this._debug('virtual set', objref, propertyName, { cookie: override.cookie });
        this.callbackHandler({
          cookie: override.cookie,
          cbid: this._makecbid(),
          set: { objref, property: propertyName, value: this._fromSandbox(value, propInfo) }
        });
      }
    });
  }

  private _applyMethodOverride(obj: any, objref: api.ObjRef, typeFqn: string, override: api.MethodOverride) {
    let methodInfo;
    if (typeFqn !== wire.EMPTY_OBJECT_FQN) {
      // error if we can find a property with this name
      if (this._tryTypeInfoForProperty(typeFqn, override.method)) {
        throw new Error(`Trying to override property '${override.method}' as a method`);
      }

      methodInfo = this._tryTypeInfoForMethod(typeFqn, override.method);
    }

    // If this is a private method (doesn't have methodInfo, key resolves on the object), we
    // are going to skip the override.
    if (!methodInfo && obj[override.method]) {
      this._debug(`Skipping override of private method ${override.method}`);
      return;
    }

    if (!methodInfo) {
      // We've overriding a method on an object we have NO type information on (probably
      // because it's an anonymous object).
      // Pretend it's an (...args: any[]) => any
      //
      // FIXME: We could do better type checking during the conversion if JSII clients
      // would tell us the intended interface type.
      methodInfo = {
        name: override.method,
        returns: { type: spec.CANONICAL_ANY },
        parameters: [{
          name: 'args',
          type: spec.CANONICAL_ANY,
          variadic: true
        }],
        variadic: true
      };
    }

    this._defineOverridenMethod(obj, objref, override, methodInfo);
  }

  private _defineOverridenMethod(obj: any, objref: api.ObjRef, override: api.MethodOverride, methodInfo: spec.Method) {
    const methodName = override.method;

    if (methodInfo.async) {
      // async method override
      Object.defineProperty(obj, methodName, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (...methodArgs: any[]) => {
          this._debug('invoke async method override', override);
          const args = this._toSandboxValues(methodArgs, methodInfo.parameters);
          return new Promise<any>((succeed, fail) => {
            const cbid = this._makecbid();
            this._debug('adding callback to queue', cbid);
            this.cbs[cbid] = {
              objref,
              override,
              args,
              expectedReturnType: methodInfo.returns || 'void',
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
          this._debug('invoke sync method override', override, 'args', methodArgs);
          // We should be validating the actual arguments according to the
          // declared parameters here, but let's just assume the JSII runtime on the
          // other end has done its work.
          const result = this.callbackHandler({
            cookie: override.cookie,
            cbid: this._makecbid(),
            invoke: {
              objref,
              method: methodName,
              args: this._fromSandboxValues(methodArgs, methodInfo.parameters),
            }
          });
          this._debug('Result', result);
          return this._toSandbox(result, methodInfo.returns || 'void');
        }
      });
    }
  }

  private _findInvokeTarget(objref: any, methodName: string, args: any[]) {
    const { instance, fqn } = this.objects.findObject(objref);
    const ti = this._typeInfoForMethod(fqn, methodName);
    this._validateMethodArguments(ti, args);

    // always first look up the method in the prototype. this practically bypasses
    // any methods overridden by derived classes (which are by definition native
    // methods). this serves to allow native call to invoke "super.method()" when
    // overriding the method.
    // if we didn't find the method on the prototype, it could be a literal object
    // that implements an interface, so we look if we have the method on the object
    // itself. if we do, we invoke it.
    let fn = instance.constructor.prototype[methodName];
    if (!fn) {
      fn = instance[methodName];
      if (!fn) {
        throw new Error(`Cannot find ${methodName} on object`);
      }
    }
    return { ti, obj: instance, fn };
  }

  private _validateMethodArguments(method: spec.Callable | undefined, args: any[]) {
    const params: spec.Parameter[] = method && method.parameters || [];

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
          if (!param.optional && params[j] === undefined) {
            throw new Error(`Unexpected 'undefined' value at index ${j - i} of variadic argument '${param.name}' of type '${spec.describeTypeReference(param.type)}'`);
          }
        }
      } else if (!param.optional && arg === undefined) {
        throw new Error(`Not enough arguments. Missing argument for the required parameter '${param.name}' of type '${spec.describeTypeReference(param.type)}'`);
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
    const [assemblyName, ...parts] = fqn.split('.');
    const assembly = this._assemblyFor(assemblyName);

    let curr = assembly.closure;
    while (parts.length > 0) {
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

  private _typeInfoForFqn(fqn: string): spec.Type {
    const components = fqn.split('.');
    const moduleName = components[0];

    const assembly = this.assemblies[moduleName];
    if (!assembly) {
      throw new Error(`Module '${moduleName}' not found`);
    }

    const types = assembly.metadata.types || {};
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
      ...(typeinfo as spec.InterfaceType).interfaces || []];

    for (const m of methods) {
      if (m.name === methodName) {
        return m;
      }
    }

    // recursion to parent type (if exists)
    for (const base of bases) {
      if (!base) { continue; }

      const found = this._tryTypeInfoForMethod(base, methodName);
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
      bases = classTypeInfo.base ? [classTypeInfo.base] : [];
    } else if (spec.isInterfaceType(typeInfo)) {
      const interfaceTypeInfo = typeInfo as spec.InterfaceType;
      properties = interfaceTypeInfo.properties;
      bases = interfaceTypeInfo.interfaces || [];
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

  private _toSandbox(v: any, expectedType: wire.OptionalValueOrVoid): any {
    const serTypes = wire.serializationType(expectedType, this._typeInfoForFqn.bind(this));
    this._debug('toSandbox', v, JSON.stringify(serTypes));

    const host: wire.SerializerHost = {
      objects: this.objects,
      debug: this._debug.bind(this),
      findSymbol: this._findSymbol.bind(this),
      lookupType: this._typeInfoForFqn.bind(this),
      recurse: this._toSandbox.bind(this),
    };

    const errors = new Array<string>();
    for (const { serializationClass, typeRef } of serTypes) {
      try {
        return wire.SERIALIZERS[serializationClass].deserialize(v, typeRef, host);
      } catch (e) {
        // If no union (99% case), rethrow immediately to preserve stack trace
        if (serTypes.length === 1) { throw e; }
        errors.push(e.message);
      }
    }

    throw new Error(`Value did not match any type in union: ${errors}`);
  }

  private _fromSandbox(v: any, targetType: wire.OptionalValueOrVoid): any {
    const serTypes = wire.serializationType(targetType, this._typeInfoForFqn.bind(this));
    this._debug('fromSandbox', v, JSON.stringify(serTypes));

    const host: wire.SerializerHost = {
      objects: this.objects,
      debug: this._debug.bind(this),
      findSymbol: this._findSymbol.bind(this),
      lookupType: this._typeInfoForFqn.bind(this),
      recurse: this._fromSandbox.bind(this),
    };

    const errors = new Array<string>();
    for (const { serializationClass, typeRef } of serTypes) {
      try {
        return wire.SERIALIZERS[serializationClass].serialize(v, typeRef, host);
      } catch (e) {
        // If no union (99% case), rethrow immediately to preserve stack trace
        if (serTypes.length === 1) { throw e; }
        errors.push(e.message);
      }
    }

    throw new Error(`Value did not match any type in union: ${errors}`);
  }

  private _toSandboxValues(xs: any[], parameters?: spec.Parameter[]) {
    return this._boxUnboxParameters(xs, parameters, this._toSandbox.bind(this));
  }

  private _fromSandboxValues(xs: any[], parameters?: spec.Parameter[]) {
    return this._boxUnboxParameters(xs, parameters, this._fromSandbox.bind(this));
  }

  private _boxUnboxParameters(xs: any[], parameters: spec.Parameter[] | undefined, boxUnbox: (x: any, t: wire.OptionalValueOrVoid) => any) {
    parameters = [...parameters || []];
    const variadic = parameters.length > 0 && !!parameters[parameters.length - 1].variadic;
    // Repeat the last (variadic) type to match the number of actual arguments
    while (variadic && parameters.length < xs.length) {
      parameters.push(parameters[parameters.length - 1]);
    }
    if (xs.length > parameters.length) {
      throw new Error(`Argument list (${JSON.stringify(xs)}) not same size as expected argument list (length ${parameters.length})`);
    }
    return xs.map((x, i) => boxUnbox(x, parameters![i]));
  }

  private _debug(...args: any[]) {
    if (this.traceEnabled) {
      console.error('[jsii-kernel]', ...args);
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
    } finally {
      delete this.syncInProgress;
    }
  }

  private _findPropertyTarget(obj: any, property: string) {
    const superProp = this._getSuperPropertyName(property);
    if (superProp in obj) {
      return superProp;
    }
    return property;

  }

  //
  // type information
  //

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
  override: api.MethodOverride;
  args: any[];
  expectedReturnType: wire.OptionalValueOrVoid;

  // completion callbacks
  succeed: (...args: any[]) => any;
  fail: (...args: any[]) => any;
}

interface AsyncInvocation {
  method: spec.Method;
  promise: Promise<any>;
}

class Assembly {
  public constructor(public readonly metadata: spec.Assembly,
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
  const oldFrames = err.stack.split('\n');
  const obj = { stack: '' };
  const previousLimit = Error.stackTraceLimit;
  try {
    Error.stackTraceLimit = err.stack.split('\n').length;
    Error.captureStackTrace(obj, mapSource);
    const realFrames = obj.stack.split('\n').slice(1);
    const topFrame = realFrames[0].substring(0, realFrames[0].indexOf(' ('));
    err.stack = [
      ...oldFrames.slice(0, oldFrames.findIndex(frame => frame.startsWith(topFrame))).map(applyMaps),
      ...realFrames
    ].join('\n');
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
