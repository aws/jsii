import * as spec from '@jsii/spec';

import * as api from './api';
import { EMPTY_OBJECT_FQN } from './serialization';
import { JsiiFault } from './kernel';

/**
 * Symbol under which we store the { type -> objid } map on object instances
 */
const OBJID_SYMBOL = Symbol.for('$__jsii__objid__$');

/**
 * Symbol under which we store the interfaces implemented by instances
 */
const IFACES_SYMBOL = Symbol.for('$__jsii__interfaces__$');

/**
 * Symbol we use to tag the constructor of a JSII class
 */
const JSII_RTTI_SYMBOL = Symbol.for('jsii.rtti');

interface ManagedConstructor {
  readonly [JSII_RTTI_SYMBOL]: {
    readonly fqn: string;
    readonly version: string;
  };
}

type MaybeManagedConstructor = Partial<ManagedConstructor>;

/**
 * Get the JSII fqn for an object (if available)
 *
 * This will return something if the object was constructed from a JSII-enabled
 * class/constructor, or if a literal object was annotated with type
 * information.
 */
export function jsiiTypeFqn(obj: any): string | undefined {
  return (obj.constructor as MaybeManagedConstructor)[JSII_RTTI_SYMBOL]?.fqn;
}

/**
 * If this object was previously serialized under a given reference, return the same reference
 *
 * This is to retain object identity across invocations.
 */
export function objectReference(obj: unknown): api.ObjRef | undefined {
  // If this object as already returned
  if ((obj as any)[OBJID_SYMBOL]) {
    return {
      [api.TOKEN_REF]: (obj as ManagedObject)[OBJID_SYMBOL],
      [api.TOKEN_INTERFACES]: (obj as ManagedObject)[IFACES_SYMBOL],
    };
  }

  return undefined;
}

type ManagedObject = {
  [OBJID_SYMBOL]: string;
  [IFACES_SYMBOL]?: string[];
};

function tagObject(obj: unknown, objid: string, interfaces?: string[]) {
  const privateField: Omit<PropertyDescriptor, 'value' | 'get' | 'set'> = {
    // Make sure the field does not show in `JSON.stringify` outputs, and is not
    // copied by splat expressions (`{...obj}`), as this would be problematic.
    // See https://github.com/aws/aws-cdk/issues/17876 for an example of the
    // consequences this could have.
    enumerable: false,
    // Probably not necessary, but allow the property to be re-configured (it
    // would be good to make this `false` in the future, but might cause weird
    // bugs, so not doing it now...)
    configurable: true,
    writable: true,
  };

  // Log a warning in case we are re-tagging this value, so we can hopefully
  // discover about the bugs we'd have if we did not make it configurable nor
  // writable.
  if (Object.prototype.hasOwnProperty.call(obj, OBJID_SYMBOL)) {
    console.error(
      `[jsii/kernel] WARNING: object ${JSON.stringify(
        obj as any,
      )} was already tagged as ${(obj as any)[OBJID_SYMBOL]}!`,
    );
  }

  Object.defineProperty(obj, OBJID_SYMBOL, { ...privateField, value: objid });
  Object.defineProperty(obj, IFACES_SYMBOL, {
    ...privateField,
    value: interfaces,
  });
}

/**
 * Set the JSII FQN for classes produced by a given constructor
 */
export function tagJsiiConstructor(
  constructor: any,
  fqn: string,
  version: string,
) {
  if (Object.prototype.hasOwnProperty.call(constructor, JSII_RTTI_SYMBOL)) {
    return;
  }
  Object.defineProperty(constructor, JSII_RTTI_SYMBOL, {
    configurable: false,
    enumerable: false,
    writable: false,
    value: { fqn, version },
  });
}

/**
 * Table of JSII objects
 *
 * There can be multiple references to the same object, each under a different requested
 * type.
 */
export class ObjectTable {
  private readonly objects = new Map<string, RegisteredObject>();
  private nextid = 10000;

  public constructor(
    private readonly resolveType: (fqn: string) => spec.Type,
  ) {}

  /**
   * Register the given object with the given type
   *
   * Return the existing registration if available.
   */
  public registerObject(
    obj: unknown,
    fqn: string,
    interfaces?: string[],
  ): api.ObjRef {
    if (fqn === undefined) {
      throw new JsiiFault('FQN cannot be undefined');
    }

    const existingRef = objectReference(obj);
    if (existingRef) {
      if (interfaces) {
        const allIfaces = new Set(interfaces);
        for (const iface of existingRef[api.TOKEN_INTERFACES] ?? []) {
          allIfaces.add(iface);
        }
        // Note - obj[INTERFACES_SYMBOL] should already have been declared as a
        // private property by a previous call to tagObject  at this stage.
        if (!Object.prototype.hasOwnProperty.call(obj, IFACES_SYMBOL)) {
          console.error(
            `[jsii/kernel] WARNING: referenced object ${
              existingRef[api.TOKEN_REF]
            } does not have the ${String(IFACES_SYMBOL)} property!`,
          );
        }

        this.objects.get(existingRef[api.TOKEN_REF])!.interfaces =
          (obj as any)[IFACES_SYMBOL] =
          existingRef[api.TOKEN_INTERFACES] =
          interfaces =
            this.removeRedundant(Array.from(allIfaces), fqn);
      }
      return existingRef;
    }

    interfaces = this.removeRedundant(interfaces, fqn);

    const objid = this.makeId(fqn);
    this.objects.set(objid, { instance: obj, fqn, interfaces });
    tagObject(obj, objid, interfaces);

    return { [api.TOKEN_REF]: objid, [api.TOKEN_INTERFACES]: interfaces };
  }

  /**
   * Find the object and registered type for the given ObjRef
   */
  public findObject(objref: api.ObjRef): RegisteredObject {
    if (typeof objref !== 'object' || !(api.TOKEN_REF in objref)) {
      throw new JsiiFault(`Malformed object reference: ${JSON.stringify(objref)}`);
    }

    const objid = objref[api.TOKEN_REF];
    const obj = this.objects.get(objid);
    if (!obj) {
      throw new JsiiFault(`Object ${objid} not found`);
    }

    // If there are "additional" interfaces declared on the objref, merge them
    // into the returned object. This is used to support client-side forced
    // down-casting (a.k.a: unsafe casting). We do NOT register the extra
    // interfaces here so that if the client provided an interface that is
    // actually not implemented, we aren't "poisoning" our state with that
    // incorrect information.
    const additionalInterfaces = objref[api.TOKEN_INTERFACES];
    if (additionalInterfaces != null && additionalInterfaces.length > 0) {
      return {
        ...obj,
        interfaces: [
          ...(obj.interfaces ?? []),
          // We append at the end so "registered" interface information has
          // precedence over client-declared ones.
          ...additionalInterfaces,
        ],
      };
    }

    return obj;
  }

  /**
   * Delete the registration with the given objref
   */
  public deleteObject({ [api.TOKEN_REF]: objid }: api.ObjRef) {
    if (!this.objects.delete(objid)) {
      throw new JsiiFault(`Object ${objid} not found`);
    }
  }

  public get count(): number {
    return this.objects.size;
  }

  private makeId(fqn: string) {
    return `${fqn}@${this.nextid++}`;
  }

  private removeRedundant(
    interfaces: string[] | undefined,
    fqn: string,
  ): string[] | undefined {
    if (!interfaces || interfaces.length === 0) {
      return undefined;
    }

    const result = new Set(interfaces);
    const builtIn = new InterfaceCollection(this.resolveType);

    if (fqn !== EMPTY_OBJECT_FQN) {
      builtIn.addFromClass(fqn);
    }
    interfaces.forEach(builtIn.addFromInterface.bind(builtIn));

    for (const iface of builtIn) {
      result.delete(iface);
    }

    return result.size > 0 ? Array.from(result).sort() : undefined;
  }
}

export interface RegisteredObject {
  instance: any;
  fqn: string;
  interfaces?: string[];
}

class InterfaceCollection implements Iterable<string> {
  private readonly interfaces = new Set<string>();

  public constructor(
    private readonly resolveType: (fqn: string) => spec.Type,
  ) {}

  public addFromClass(fqn: string): void {
    const ti = this.resolveType(fqn);
    if (!spec.isClassType(ti)) {
      throw new JsiiFault(
        `Expected a class, but received ${spec.describeTypeReference(ti)}`,
      );
    }
    if (ti.base) {
      this.addFromClass(ti.base);
    }
    if (ti.interfaces) {
      for (const iface of ti.interfaces) {
        if (this.interfaces.has(iface)) {
          continue;
        }
        this.interfaces.add(iface);
        this.addFromInterface(iface);
      }
    }
  }

  public addFromInterface(fqn: string): void {
    const ti = this.resolveType(fqn);
    if (!spec.isInterfaceType(ti)) {
      throw new JsiiFault(
        `Expected an interface, but received ${spec.describeTypeReference(ti)}`,
      );
    }
    if (!ti.interfaces) {
      return;
    }
    for (const iface of ti.interfaces) {
      if (this.interfaces.has(iface)) {
        continue;
      }
      this.interfaces.add(iface);
      this.addFromInterface(iface);
    }
  }

  public [Symbol.iterator]() {
    return this.interfaces[Symbol.iterator]();
  }
}
