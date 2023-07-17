import * as spec from '@jsii/spec';
import { loadAssemblyFromPath } from '@jsii/spec';
import * as cp from 'child_process';
import * as fs from 'fs-extra';
import { createRequire } from 'module';
import * as os from 'os';
import * as path from 'path';

import * as api from './api';
import { TOKEN_REF } from './api';
import { jsiiTypeFqn, ObjectTable, tagJsiiConstructor } from './objects';
import * as onExit from './on-exit';
import * as wire from './serialization';
import * as tar from './tar-cache';

export const enum JsiiErrorType {
  JSII_FAULT = '@jsii/kernel.Fault',
  RUNTIME_ERROR = '@jsii/kernel.RuntimeError',
}

export interface JsiiError extends Error {
  readonly name: JsiiErrorType;
}

export class JsiiFault extends Error implements JsiiError {
  public readonly name = JsiiErrorType.JSII_FAULT;
  public constructor(message: string) {
    super(message);
  }
}

export class RuntimeError extends Error implements JsiiError {
  public readonly name = JsiiErrorType.RUNTIME_ERROR;
  public constructor(message: string) {
    super(message);
  }
}
export class Kernel {
  /**
   * Set to true for verbose debugging.
   */
  public traceEnabled = false;
  /**
   * Set to true for timing data to be emitted.
   */
  public debugTimingEnabled = false;

  private readonly assemblies = new Map<string, Assembly>();
  private readonly objects = new ObjectTable(this._typeInfoForFqn.bind(this));
  private readonly cbs = new Map<string, Callback>();
  private readonly waiting = new Map<string, Callback>();
  private readonly promises = new Map<string, AsyncInvocation>();
  private nextid = 20000; // incrementing counter for objid, cbid, promiseid
  private syncInProgress?: string; // forbids async calls (begin) while processing sync calls (get/set/invoke)
  private installDir?: string;
  /** The internal require function, used instead of the global "require" so that webpack does not transform it... */
  private require?: typeof require;

  /**
   * Creates a jsii kernel object.
   *
   * @param callbackHandler This handler is invoked when a synchronous callback is called.
   *                        It's responsibility is to execute the callback and return it's
   *                        result (or throw an error).
   */
  public constructor(public callbackHandler: (callback: api.Callback) => any) {}

  public load(req: api.LoadRequest): api.LoadResponse {
    return this._debugTime(
      () => this._load(req),
      `load(${JSON.stringify(req, null, 2)})`,
    );
  }

  private _load(req: api.LoadRequest): api.LoadResponse {
    this._debug('load', req);

    if ('assembly' in req) {
      throw new JsiiFault(
        '`assembly` field is deprecated for "load", use `name`, `version` and `tarball` instead',
      );
    }

    const pkgname = req.name;
    const pkgver = req.version;

    // check if we already have such a module
    const packageDir = this._getPackageDir(pkgname);
    if (fs.pathExistsSync(packageDir)) {
      // module exists, verify version
      const epkg = fs.readJsonSync(path.join(packageDir, 'package.json'));
      if (epkg.version !== pkgver) {
        throw new JsiiFault(
          `Multiple versions ${pkgver} and ${epkg.version} of the ` +
            `package '${pkgname}' cannot be loaded together since this is unsupported by ` +
            'some runtime environments',
        );
      }

      // same version, no-op
      this._debug('look up already-loaded assembly', pkgname);
      const assm = this.assemblies.get(pkgname)!;

      return {
        assembly: assm.metadata.name,
        types: Object.keys(assm.metadata.types ?? {}).length,
      };
    }

    // Force umask to have npm-install-like permissions
    const originalUmask = process.umask(0o022);
    try {
      // untar the archive to its final location
      const { cache } = this._debugTime(
        () =>
          tar.extract(
            req.tarball,
            packageDir,
            {
              strict: true,
              strip: 1, // Removes the 'package/' path element from entries
              unlink: true,
            },
            req.name,
            req.version,
          ),
        `tar.extract(${req.tarball}) => ${packageDir}`,
      );

      if (cache != null) {
        this._debug(
          `Package cache enabled, extraction resulted in a cache ${cache}`,
        );
      }
    } finally {
      // Reset umask to the initial value
      process.umask(originalUmask);
    }

    // read .jsii metadata from the root of the package
    let assmSpec;
    try {
      assmSpec = this._debugTime(
        () => loadAssemblyFromPath(packageDir),
        `loadAssemblyFromPath(${packageDir})`,
      );
    } catch (e: any) {
      throw new JsiiFault(
        `Error for package tarball ${req.tarball}: ${e.message}`,
      );
    }

    // load the module and capture its closure
    const closure = this._debugTime(
      () => this.require!(packageDir),
      `require(${packageDir})`,
    );
    const assm = new Assembly(assmSpec, closure);
    this._debugTime(
      () => this._addAssembly(assm),
      `registerAssembly({ name: ${assm.metadata.name}, types: ${
        Object.keys(assm.metadata.types ?? {}).length
      } })`,
    );

    return {
      assembly: assmSpec.name,
      types: Object.keys(assmSpec.types ?? {}).length,
    };
  }

  public getBinScriptCommand(
    req: api.GetScriptCommandRequest,
  ): api.GetScriptCommandResponse {
    return this._getBinScriptCommand(req);
  }

  public invokeBinScript(
    req: api.InvokeScriptRequest,
  ): api.InvokeScriptResponse {
    const { command, args, env } = this._getBinScriptCommand(req);

    const result = cp.spawnSync(command, args, {
      encoding: 'utf-8',
      env,
      shell: true,
    });

    return {
      stdout: result.stdout,
      stderr: result.stderr,
      status: result.status,
      signal: result.signal,
    };
  }

  public create(req: api.CreateRequest): api.CreateResponse {
    return this._create(req);
  }

  public del(req: api.DelRequest): api.DelResponse {
    const { objref } = req;

    this._debug('del', objref);
    this.objects.deleteObject(objref);

    return {};
  }

  public sget(req: api.StaticGetRequest): api.GetResponse {
    const { fqn, property } = req;
    const symbol = `${fqn}.${property}`;
    this._debug('sget', symbol);
    const ti = this._typeInfoForProperty(property, fqn);

    if (!ti.static) {
      throw new JsiiFault(`property ${symbol} is not static`);
    }

    const prototype = this._findSymbol(fqn);

    const value = this._ensureSync(
      `property ${property}`,
      () => prototype[property],
    );

    this._debug('value:', value);
    const ret = this._fromSandbox(value, ti, `of static property ${symbol}`);
    this._debug('ret', ret);
    return { value: ret };
  }

  public sset(req: api.StaticSetRequest): api.SetResponse {
    const { fqn, property, value } = req;
    const symbol = `${fqn}.${property}`;
    this._debug('sset', symbol);
    const ti = this._typeInfoForProperty(property, fqn);

    if (!ti.static) {
      throw new JsiiFault(`property ${symbol} is not static`);
    }

    if (ti.immutable) {
      throw new JsiiFault(`static property ${symbol} is readonly`);
    }

    const prototype = this._findSymbol(fqn);

    this._ensureSync(
      `property ${property}`,
      () =>
        (prototype[property] = this._toSandbox(
          value,
          ti,
          `assigned to static property ${symbol}`,
        )),
    );

    return {};
  }

  public get(req: api.GetRequest): api.GetResponse {
    const { objref, property } = req;
    this._debug('get', objref, property);
    const { instance, fqn, interfaces } = this.objects.findObject(objref);
    const ti = this._typeInfoForProperty(property, fqn, interfaces);

    // if the property is overridden by the native code and "get" is called on the object, it
    // means that the native code is trying to access the "super" property. in order to enable
    // that, we actually keep a copy of the original property descriptor when we override,
    // so `findPropertyTarget` will return either the original property name ("property") or
    // the "super" property name (somehing like "$jsii$super$<property>$").
    const propertyToGet = this._findPropertyTarget(instance, property);

    // make the actual "get", and block any async calls that might be performed
    // by jsii overrides.
    const value = this._ensureSync(
      `property '${objref[TOKEN_REF]}.${propertyToGet}'`,
      () => instance[propertyToGet],
    );
    this._debug('value:', value);
    const ret = this._fromSandbox(value, ti, `of property ${fqn}.${property}`);
    this._debug('ret:', ret);
    return { value: ret };
  }

  public set(req: api.SetRequest): api.SetResponse {
    const { objref, property, value } = req;
    this._debug('set', objref, property, value);
    const { instance, fqn, interfaces } = this.objects.findObject(objref);

    const propInfo = this._typeInfoForProperty(req.property, fqn, interfaces);

    if (propInfo.immutable) {
      throw new JsiiFault(
        `Cannot set value of immutable property ${req.property} to ${req.value}`,
      );
    }

    const propertyToSet = this._findPropertyTarget(instance, property);

    this._ensureSync(
      `property '${objref[TOKEN_REF]}.${propertyToSet}'`,
      () =>
        (instance[propertyToSet] = this._toSandbox(
          value,
          propInfo,
          `assigned to property ${fqn}.${property}`,
        )),
    );

    return {};
  }

  public invoke(req: api.InvokeRequest): api.InvokeResponse {
    const { objref, method } = req;
    const args = req.args ?? [];

    this._debug('invoke', objref, method, args);
    const { ti, obj, fn } = this._findInvokeTarget(objref, method, args);

    // verify this is not an async method
    if (ti.async) {
      throw new JsiiFault(`${method} is an async method, use "begin" instead`);
    }

    const fqn = jsiiTypeFqn(obj);
    const ret = this._ensureSync(
      `method '${objref[TOKEN_REF]}.${method}'`,
      () => {
        return fn.apply(
          obj,
          this._toSandboxValues(
            args,
            `method ${fqn ? `${fqn}#` : ''}${method}`,
            ti.parameters,
          ),
        );
      },
    );

    const result = this._fromSandbox(
      ret,
      ti.returns ?? 'void',
      `returned by method ${fqn ? `${fqn}#` : ''}${method}`,
    );
    this._debug('invoke result', result);

    return { result };
  }

  public sinvoke(req: api.StaticInvokeRequest): api.InvokeResponse {
    const { fqn, method } = req;
    const args = req.args ?? [];

    this._debug('sinvoke', fqn, method, args);

    const ti = this._typeInfoForMethod(method, fqn);

    if (!ti.static) {
      throw new JsiiFault(`${fqn}.${method} is not a static method`);
    }

    // verify this is not an async method
    if (ti.async) {
      throw new JsiiFault(`${method} is an async method, use "begin" instead`);
    }

    const prototype = this._findSymbol(fqn);
    const fn = prototype[method] as (...params: any[]) => any;

    const ret = this._ensureSync(`method '${fqn}.${method}'`, () => {
      return fn.apply(
        prototype,
        this._toSandboxValues(
          args,
          `static method ${fqn}.${method}`,
          ti.parameters,
        ),
      );
    });

    this._debug('method returned:', ret);
    return {
      result: this._fromSandbox(
        ret,
        ti.returns ?? 'void',
        `returned by static method ${fqn}.${method}`,
      ),
    };
  }

  public begin(req: api.BeginRequest): api.BeginResponse {
    const { objref, method } = req;
    const args = req.args ?? [];

    this._debug('begin', objref, method, args);

    if (this.syncInProgress) {
      throw new JsiiFault(
        `Cannot invoke async method '${req.objref[TOKEN_REF]}.${req.method}' while sync ${this.syncInProgress} is being processed`,
      );
    }

    const { ti, obj, fn } = this._findInvokeTarget(objref, method, args);

    // verify this is indeed an async method
    if (!ti.async) {
      throw new JsiiFault(`Method ${method} is expected to be an async method`);
    }

    const fqn = jsiiTypeFqn(obj);

    const promise = fn.apply(
      obj,
      this._toSandboxValues(
        args,
        `async method ${fqn ? `${fqn}#` : ''}${method}`,
        ti.parameters,
      ),
    ) as Promise<any>;

    // since we are planning to resolve this promise in a different scope
    // we need to handle rejections here [1]
    // [1]: https://stackoverflow.com/questions/40920179/should-i-refrain-from-handling-promise-rejection-asynchronously/40921505
    promise.catch((_) => undefined);

    const prid = this._makeprid();
    this.promises.set(prid, {
      promise,
      method: ti,
    });

    return { promiseid: prid };
  }

  public async end(req: api.EndRequest): Promise<api.EndResponse> {
    const { promiseid } = req;

    this._debug('end', promiseid);

    const storedPromise = this.promises.get(promiseid);
    if (storedPromise == null) {
      throw new JsiiFault(`Cannot find promise with ID: ${promiseid}`);
    }
    const { promise, method } = storedPromise;

    let result;
    try {
      result = await promise;
      this._debug('promise result:', result);
    } catch (e: any) {
      this._debug('promise error:', e);
      if (e.name === JsiiErrorType.JSII_FAULT) {
        if (e instanceof JsiiFault) {
          throw e;
        }
        throw new JsiiFault(e.message);
      }

      // default to RuntimeError, since non-kernel errors may not
      // have their `name` field defined
      if (e instanceof RuntimeError) {
        throw e;
      }
      throw new RuntimeError(e);
    }

    return {
      result: this._fromSandbox(
        result,
        method.returns ?? 'void',
        `returned by async method ${method.name}`,
      ),
    };
  }

  public callbacks(_req?: api.CallbacksRequest): api.CallbacksResponse {
    this._debug('callbacks');
    const ret = Array.from(this.cbs.entries()).map(([cbid, cb]) => {
      this.waiting.set(cbid, cb); // move to waiting
      this.cbs.delete(cbid); // remove from created
      const callback: api.Callback = {
        cbid,
        cookie: cb.override.cookie,
        invoke: {
          objref: cb.objref,
          method: cb.override.method,
          args: cb.args,
        },
      };
      return callback;
    });

    return { callbacks: ret };
  }

  public complete(req: api.CompleteRequest): api.CompleteResponse {
    const { cbid, err, result, name } = req;

    this._debug('complete', cbid, err, result);

    const cb = this.waiting.get(cbid);
    if (!cb) {
      throw new JsiiFault(`Callback ${cbid} not found`);
    }

    if (err) {
      this._debug('completed with error:', err);
      cb.fail(
        name === JsiiErrorType.JSII_FAULT
          ? new JsiiFault(err)
          : new RuntimeError(err),
      );
    } else {
      const sandoxResult = this._toSandbox(
        result,
        cb.expectedReturnType ?? 'void',
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        `returned by callback ${cb.toString()}`,
      );
      this._debug('completed with result:', sandoxResult);
      cb.succeed(sandoxResult);
    }

    this.waiting.delete(cbid);

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
      throw new JsiiFault(
        `Unexpected - "targets" for ${assemblyName} is missing!`,
      );
    }

    return { naming: targets };
  }

  public stats(_req?: api.StatsRequest): api.StatsResponse {
    return {
      objectCount: this.objects.count,
    };
  }

  private _addAssembly(assm: Assembly) {
    this.assemblies.set(assm.metadata.name, assm);

    // add the __jsii__.fqn property on every constructor. this allows
    // traversing between the javascript and jsii worlds given any object.
    for (const fqn of Object.keys(assm.metadata.types ?? {})) {
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
  private _findCtor(
    fqn: string,
    args: any[],
  ): { ctor: any; parameters?: spec.Parameter[] } {
    if (fqn === wire.EMPTY_OBJECT_FQN) {
      return { ctor: Object };
    }

    const typeinfo = this._typeInfoForFqn(fqn);

    switch (typeinfo.kind) {
      case spec.TypeKind.Class:
        const classType = typeinfo as spec.ClassType;
        this._validateMethodArguments(classType.initializer, args);
        return {
          ctor: this._findSymbol(fqn),
          parameters: classType.initializer && classType.initializer.parameters,
        };

      case spec.TypeKind.Interface:
        throw new JsiiFault(
          `Cannot create an object with an FQN of an interface: ${fqn}`,
        );

      default:
        throw new JsiiFault(`Unexpected FQN kind: ${fqn}`);
    }
  }

  private _getPackageDir(pkgname: string): string {
    if (!this.installDir) {
      this.installDir = fs.mkdtempSync(path.join(os.tmpdir(), 'jsii-kernel-'));
      this.require = createRequire(this.installDir);
      fs.mkdirpSync(path.join(this.installDir, 'node_modules'));
      this._debug('creating jsii-kernel modules workdir:', this.installDir);

      onExit.removeSync(this.installDir);
    }
    return path.join(this.installDir, 'node_modules', pkgname);
  }

  // prefixed with _ to allow calling this method internally without
  // getting it recorded for testing.
  private _create(req: api.CreateRequest): api.CreateResponse {
    this._debug('create', req);
    const { fqn, interfaces, overrides } = req;

    const requestArgs = req.args ?? [];

    const ctorResult = this._findCtor(fqn, requestArgs);
    const ctor = ctorResult.ctor;
    const obj = new ctor(
      ...this._toSandboxValues(
        requestArgs,
        `new ${fqn}`,
        ctorResult.parameters,
      ),
    );
    const objref = this.objects.registerObject(obj, fqn, req.interfaces ?? []);

    // overrides: for each one of the override method names, installs a
    // method on the newly created object which represents the remote "reverse proxy".

    if (overrides) {
      this._debug('overrides', overrides);

      const overrideTypeErrorMessage =
        'Override can either be "method" or "property"';
      const methods = new Set<string>();
      const properties = new Set<string>();

      for (const override of overrides) {
        if (api.isMethodOverride(override)) {
          if (api.isPropertyOverride(override)) {
            throw new JsiiFault(overrideTypeErrorMessage);
          }
          if (methods.has(override.method)) {
            throw new JsiiFault(
              `Duplicate override for method '${override.method}'`,
            );
          }
          methods.add(override.method);

          this._applyMethodOverride(obj, objref, fqn, interfaces, override);
        } else if (api.isPropertyOverride(override)) {
          if (api.isMethodOverride(override)) {
            throw new JsiiFault(overrideTypeErrorMessage);
          }
          if (properties.has(override.property)) {
            throw new JsiiFault(
              `Duplicate override for property '${override.property}'`,
            );
          }
          properties.add(override.property);

          this._applyPropertyOverride(obj, objref, fqn, interfaces, override);
        } else {
          throw new JsiiFault(overrideTypeErrorMessage);
        }
      }
    }

    return objref;
  }

  private _getSuperPropertyName(name: string) {
    return `$jsii$super$${name}$`;
  }

  private _applyPropertyOverride(
    obj: any,
    objref: api.ObjRef,
    typeFqn: string,
    interfaces: string[] | undefined,
    override: api.PropertyOverride,
  ) {
    // error if we can find a method with this name
    if (this._tryTypeInfoForMethod(override.property, typeFqn, interfaces)) {
      throw new JsiiFault(
        `Trying to override method '${override.property}' as a property`,
      );
    }

    let propInfo = this._tryTypeInfoForProperty(
      override.property,
      typeFqn,
      interfaces,
    );
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

  private _defineOverridenProperty(
    obj: any,
    objref: api.ObjRef,
    override: api.PropertyOverride,
    propInfo: spec.Property,
  ) {
    const propertyName = override.property;

    this._debug('apply override', propertyName);

    // save the old property under $jsii$super$<prop>$ so that property overrides
    // can still access it via `super.<prop>`.
    const prev = getPropertyDescriptor(obj, propertyName) ?? {
      value: obj[propertyName],
      writable: true,
      enumerable: true,
      configurable: true,
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
        this._debug('virtual get', objref, propertyName, {
          cookie: override.cookie,
        });
        const result = this.callbackHandler({
          cookie: override.cookie,
          cbid: this._makecbid(),
          get: { objref, property: propertyName },
        });
        this._debug('callback returned', result);
        return this._toSandbox(
          result,
          propInfo,
          `returned by callback property ${propertyName}`,
        );
      },
      set: (value: any) => {
        this._debug('virtual set', objref, propertyName, {
          cookie: override.cookie,
        });
        this.callbackHandler({
          cookie: override.cookie,
          cbid: this._makecbid(),
          set: {
            objref,
            property: propertyName,
            value: this._fromSandbox(
              value,
              propInfo,
              `assigned to callback property ${propertyName}`,
            ),
          },
        });
      },
    });

    function getPropertyDescriptor(
      obj: any,
      propertyName: string,
    ): PropertyDescriptor | undefined {
      const direct = Object.getOwnPropertyDescriptor(obj, propertyName);
      if (direct != null) {
        return direct;
      }
      const proto = Object.getPrototypeOf(obj);
      if (proto == null && proto !== Object.prototype) {
        // We reached Object or the prototype chain root, all hope is lost!
        return undefined;
      }
      return getPropertyDescriptor(proto, propertyName);
    }
  }

  private _applyMethodOverride(
    obj: any,
    objref: api.ObjRef,
    typeFqn: string,
    interfaces: string[] | undefined,
    override: api.MethodOverride,
  ) {
    // error if we can find a property with this name
    if (this._tryTypeInfoForProperty(override.method, typeFqn, interfaces)) {
      throw new JsiiFault(
        `Trying to override property '${override.method}' as a method`,
      );
    }

    let methodInfo = this._tryTypeInfoForMethod(
      override.method,
      typeFqn,
      interfaces,
    );

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
      methodInfo = {
        name: override.method,
        returns: { type: spec.CANONICAL_ANY },
        parameters: [
          {
            name: 'args',
            type: spec.CANONICAL_ANY,
            variadic: true,
          },
        ],
        variadic: true,
      };
    }

    this._defineOverridenMethod(obj, objref, override, methodInfo);
  }

  private _defineOverridenMethod(
    obj: any,
    objref: api.ObjRef,
    override: api.MethodOverride,
    methodInfo: spec.Method,
  ) {
    const methodName = override.method;
    const fqn = jsiiTypeFqn(obj);
    const methodContext = `${methodInfo.async ? 'async ' : ''}method${
      fqn ? `${fqn}#` : methodName
    }`;

    if (methodInfo.async) {
      // async method override
      Object.defineProperty(obj, methodName, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (...methodArgs: any[]) => {
          this._debug('invoke async method override', override);
          const args = this._toSandboxValues(
            methodArgs,
            methodContext,
            methodInfo.parameters,
          );
          return new Promise<any>((succeed, fail) => {
            const cbid = this._makecbid();
            this._debug('adding callback to queue', cbid);
            this.cbs.set(cbid, {
              objref,
              override,
              args,
              expectedReturnType: methodInfo.returns ?? 'void',
              succeed,
              fail,
            });
          });
        },
      });
    } else {
      // sync method override (method info is not required)
      Object.defineProperty(obj, methodName, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: (...methodArgs: any[]) => {
          this._debug(
            'invoke sync method override',
            override,
            'args',
            methodArgs,
          );
          // We should be validating the actual arguments according to the
          // declared parameters here, but let's just assume the JSII runtime on the
          // other end has done its work.
          const result = this.callbackHandler({
            cookie: override.cookie,
            cbid: this._makecbid(),
            invoke: {
              objref,
              method: methodName,
              args: this._fromSandboxValues(
                methodArgs,
                methodContext,
                methodInfo.parameters,
              ),
            },
          });
          this._debug('Result', result);
          return this._toSandbox(
            result,
            methodInfo.returns ?? 'void',
            `returned by callback method ${methodName}`,
          );
        },
      });
    }
  }

  private _findInvokeTarget(
    objref: api.ObjRef,
    methodName: string,
    args: any[],
  ) {
    const { instance, fqn, interfaces } = this.objects.findObject(objref);
    const ti = this._typeInfoForMethod(methodName, fqn, interfaces);
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
        throw new JsiiFault(`Cannot find ${methodName} on object`);
      }
    }
    return { ti, obj: instance, fn };
  }

  private _validateMethodArguments(
    method: spec.Callable | undefined,
    args: any[],
  ) {
    const params: spec.Parameter[] = method?.parameters ?? [];

    // error if args > params
    if (args.length > params.length && !(method && method.variadic)) {
      throw new JsiiFault(
        `Too many arguments (method accepts ${params.length} parameters, got ${args.length} arguments)`,
      );
    }

    for (let i = 0; i < params.length; ++i) {
      const param = params[i];
      const arg = args[i];

      if (param.variadic) {
        if (params.length <= i) {
          return;
        } // No vararg was provided
        for (let j = i; j < params.length; j++) {
          if (!param.optional && params[j] === undefined) {
            throw new JsiiFault(
              `Unexpected 'undefined' value at index ${
                j - i
              } of variadic argument '${
                param.name
              }' of type '${spec.describeTypeReference(param.type)}'`,
            );
          }
        }
      } else if (!param.optional && arg === undefined) {
        throw new JsiiFault(
          `Not enough arguments. Missing argument for the required parameter '${
            param.name
          }' of type '${spec.describeTypeReference(param.type)}'`,
        );
      }
    }
  }

  private _assemblyFor(assemblyName: string) {
    const assembly = this.assemblies.get(assemblyName);
    if (!assembly) {
      throw new JsiiFault(`Could not find assembly: ${assemblyName}`);
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
      throw new JsiiFault(`Could not find symbol ${fqn}`);
    }
    return curr;
  }

  private _typeInfoForFqn(fqn: string): spec.Type {
    const components = fqn.split('.');
    const moduleName = components[0];

    const assembly = this.assemblies.get(moduleName);
    if (!assembly) {
      throw new JsiiFault(`Module '${moduleName}' not found`);
    }

    const types = assembly.metadata.types ?? {};
    const fqnInfo = types[fqn];
    if (!fqnInfo) {
      throw new JsiiFault(`Type '${fqn}' not found`);
    }

    return fqnInfo;
  }

  private _typeInfoForMethod(
    methodName: string,
    fqn: string,
    interfaces?: string[],
  ): spec.Method {
    const ti = this._tryTypeInfoForMethod(methodName, fqn, interfaces);
    if (!ti) {
      const addendum =
        interfaces && interfaces.length > 0
          ? ` or interface(s) ${interfaces.join(', ')}`
          : '';
      throw new JsiiFault(
        `Class ${fqn}${addendum} doesn't have a method '${methodName}'`,
      );
    }
    return ti;
  }

  private _tryTypeInfoForMethod(
    methodName: string,
    classFqn: string,
    interfaces: string[] = [],
  ): spec.Method | undefined {
    for (const fqn of [classFqn, ...interfaces]) {
      if (fqn === wire.EMPTY_OBJECT_FQN) {
        continue;
      }
      const typeinfo = this._typeInfoForFqn(fqn);

      const methods =
        (typeinfo as spec.ClassType | spec.InterfaceType).methods ?? [];

      for (const m of methods) {
        if (m.name === methodName) {
          return m;
        }
      }

      // recursion to parent type (if exists)
      const bases = [
        (typeinfo as spec.ClassType).base,
        ...((typeinfo as spec.InterfaceType).interfaces ?? []),
      ];
      for (const base of bases) {
        if (!base) {
          continue;
        }

        const found = this._tryTypeInfoForMethod(methodName, base);
        if (found) {
          return found;
        }
      }
    }

    return undefined;
  }

  private _tryTypeInfoForProperty(
    property: string,
    classFqn: string,
    interfaces: string[] = [],
  ): spec.Property | undefined {
    for (const fqn of [classFqn, ...interfaces]) {
      if (fqn === wire.EMPTY_OBJECT_FQN) {
        continue;
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
        bases = interfaceTypeInfo.interfaces ?? [];
      } else {
        throw new JsiiFault(
          `Type of kind ${typeInfo.kind} does not have properties`,
        );
      }

      for (const p of properties ?? []) {
        if (p.name === property) {
          return p;
        }
      }

      // recurse to parent type (if exists)
      for (const baseFqn of bases) {
        const ret = this._tryTypeInfoForProperty(property, baseFqn);
        if (ret) {
          return ret;
        }
      }
    }

    return undefined;
  }

  private _typeInfoForProperty(
    property: string,
    fqn: string,
    interfaces?: string[],
  ): spec.Property {
    const typeInfo = this._tryTypeInfoForProperty(property, fqn, interfaces);
    if (!typeInfo) {
      const addendum =
        interfaces && interfaces.length > 0
          ? ` or interface(s) ${interfaces.join(', ')}`
          : '';
      throw new JsiiFault(
        `Type ${fqn}${addendum} doesn't have a property '${property}'`,
      );
    }
    return typeInfo;
  }
  private _toSandbox(
    v: any,
    expectedType: wire.OptionalValueOrVoid,
    context: string,
  ): any {
    return wire.process(
      {
        objects: this.objects,
        debug: this._debug.bind(this),
        findSymbol: this._findSymbol.bind(this),
        lookupType: this._typeInfoForFqn.bind(this),
      },
      'deserialize',
      v,
      expectedType,
      context,
    );
  }

  private _fromSandbox(
    v: any,
    targetType: wire.OptionalValueOrVoid,
    context: string,
  ): any {
    return wire.process(
      {
        objects: this.objects,
        debug: this._debug.bind(this),
        findSymbol: this._findSymbol.bind(this),
        lookupType: this._typeInfoForFqn.bind(this),
      },
      'serialize',
      v,
      targetType,
      context,
    );
  }

  private _toSandboxValues(
    xs: readonly unknown[],
    methodContext: string,
    parameters: readonly spec.Parameter[] | undefined,
  ) {
    return this._boxUnboxParameters(
      xs,
      methodContext,
      parameters,
      this._toSandbox.bind(this),
    );
  }

  private _fromSandboxValues(
    xs: readonly unknown[],
    methodContext: string,
    parameters: readonly spec.Parameter[] | undefined,
  ) {
    return this._boxUnboxParameters(
      xs,
      methodContext,
      parameters,
      this._fromSandbox.bind(this),
    );
  }

  private _boxUnboxParameters(
    xs: readonly unknown[],
    methodContext: string,
    parameters: readonly spec.Parameter[] = [],
    boxUnbox: (x: any, t: wire.OptionalValueOrVoid, context: string) => any,
  ) {
    const parametersCopy = [...parameters];
    const variadic =
      parametersCopy.length > 0 &&
      !!parametersCopy[parametersCopy.length - 1].variadic;
    // Repeat the last (variadic) type to match the number of actual arguments
    while (variadic && parametersCopy.length < xs.length) {
      parametersCopy.push(parametersCopy[parametersCopy.length - 1]);
    }
    if (xs.length > parametersCopy.length) {
      throw new JsiiFault(
        `Argument list (${JSON.stringify(
          xs,
        )}) not same size as expected argument list (length ${
          parametersCopy.length
        })`,
      );
    }
    return xs.map((x, i) =>
      boxUnbox(
        x,
        parametersCopy[i],
        `passed to parameter ${parametersCopy[i].name} of ${methodContext}`,
      ),
    );
  }

  private _debug(...args: any[]) {
    if (this.traceEnabled) {
      console.error('[@jsii/kernel]', ...args);
    }
  }

  private _debugTime<T>(cb: () => T, label: string): T {
    const fullLabel = `[@jsii/kernel:timing] ${label}`;
    if (this.debugTimingEnabled) {
      console.time(fullLabel);
    }
    try {
      return cb();
    } finally {
      if (this.debugTimingEnabled) {
        console.timeEnd(fullLabel);
      }
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
    } catch (e: any) {
      if (e.name === JsiiErrorType.JSII_FAULT) {
        if (e instanceof JsiiFault) {
          throw e;
        }
        throw new JsiiFault(e);
      }
      // This error can be thrown by the kernel directly, or it can be
      // thrown from user code. If the error comes from the kernel, then its name field will be populated;
      // if the error comes from user code, the name field will not be populated.
      if (e instanceof RuntimeError) {
        throw e;
      }
      throw new RuntimeError(e);
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

  /**
   * Shared (non-public implementation) to as not to break API recording.
   */
  private _getBinScriptCommand(
    req: api.GetScriptCommandRequest,
  ): api.GetScriptCommandResponse {
    const packageDir = this._getPackageDir(req.assembly);
    if (fs.pathExistsSync(packageDir)) {
      // module exists, verify version
      const epkg = fs.readJsonSync(path.join(packageDir, 'package.json'));

      const scriptPath = epkg.bin?.[req.script];

      if (!epkg.bin) {
        throw new JsiiFault(`Script with name ${req.script} was not defined.`);
      }

      return {
        command: path.join(packageDir, scriptPath),
        args: req.args ?? [],
        env: {
          ...process.env,
          // Make sure the current NODE_OPTIONS are honored if we shell out to node
          NODE_OPTIONS: process.execArgv.join(' '),
          // Make sure "this" node is ahead of $PATH just in case
          PATH: `${path.dirname(process.execPath)}:${process.env.PATH}`,
        },
      };
    }
    throw new JsiiFault(`Package with name ${req.assembly} was not loaded.`);
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
  public constructor(
    public readonly metadata: spec.Assembly,
    public readonly closure: any,
  ) {}
}
