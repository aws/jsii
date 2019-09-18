import * as api from './api';

/**
 * Symbol under which we store the { type -> objid } map on object instances
 */
const OBJID_SYMBOL = Symbol('$__jsii__objid__$');

/**
 * Symbol we use to tag the constructor of a JSII class
 */
const JSII_SYMBOL = Symbol('__jsii__');

/**
 * Get the JSII fqn for an object (if available)
 *
 * This will return something if the object was constructed from a JSII-enabled
 * class/constructor, or if a literal object was annotated with type
 * information.
 */
export function jsiiTypeFqn(obj: any): string | undefined {
  const jsii = obj.constructor[JSII_SYMBOL];
  return jsii && jsii.fqn;
}

/**
 * If this object was previously serialized under a given reference, return the same reference
 *
 * This is to retain object identity across invocations.
 */
export function objectReference(obj: object): api.ObjRef | undefined {
  // If this object as already returned
  if ((obj as any)[OBJID_SYMBOL]) {
    return { [api.TOKEN_REF]: (obj as any)[OBJID_SYMBOL] };
  }

  return undefined;
}

function tagObject(obj: object, objid: string) {
  (obj as any)[OBJID_SYMBOL] = objid;
}

/**
 * Ensure there's a hidden map with the given symbol name on the given object, and return it
 */
export function hiddenMap<T>(obj: any, mapSymbol: symbol): {[key: string]: T} {
  let map: any = obj[mapSymbol];
  if (!map) {
    map = {};
    Object.defineProperty(obj, mapSymbol, {
      value: map,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  return map;
}

/**
 * Set the JSII FQN for classes produced by a given constructor
 */
export function tagJsiiConstructor(constructor: any, fqn: string) {
  Object.defineProperty(constructor, JSII_SYMBOL, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: { fqn }
  });
}

/**
 * Table of JSII objects
 *
 * There can be multiple references to the same object, each under a different requested
 * type.
 */
export class ObjectTable {
  private objects: { [objid: string]: RegisteredObject } = { };
  private nextid = 10000;

  /**
     * Register the given object with the given type
     *
     * Return the existing registration if available.
     */
  public registerObject(obj: object, fqn: string): api.ObjRef {
    if (fqn === undefined) {
      throw new Error('FQN cannot be undefined');
    }

    const existingRef = objectReference(obj);
    if (existingRef) {
      return existingRef;
    }

    const objid = this.makeId(fqn);
    this.objects[objid] = { instance: obj, fqn };
    tagObject(obj, objid);

    return { [api.TOKEN_REF]: objid };
  }

  /**
     * Find the object and registered type for the given ObjRef
     */
  public findObject(objref: api.ObjRef): RegisteredObject {
    if (typeof objref !== 'object' || !(api.TOKEN_REF in objref)) {
      throw new Error(`Malformed object reference: ${JSON.stringify(objref)}`);
    }

    const objid = objref[api.TOKEN_REF];
    const obj = this.objects[objid];
    if (!obj) {
      throw new Error(`Object ${objid} not found`);
    }
    return obj;
  }

  /**
     * Delete the registration with the given objref
     */
  public deleteObject(objref: api.ObjRef) {
    this.findObject(objref); // make sure object exists
    delete this.objects[objref[api.TOKEN_REF]];
  }

  public get count(): number {
    return Object.keys(this.objects).length;
  }

  private makeId(fqn: string) {
    return `${fqn}@${this.nextid++}`;
  }
}

export interface RegisteredObject {
  instance: any;
  fqn: string;
}
