/**
 * Handling of types in JSII
 *
 * Types will be serialized according to the following table:
 *
 *                         ┬───────────────────────────────────────────────────────────────────────────────────────────────┐
 *                         │ JAVASCRIPT TYPE                                                                               │
 *                         ┼────────────────┬───────────┬────────────┬───────────────┬───────────────────┬─────────────────┤
 *                         │ undefined/null │   date    │ scalar (*) │     array     │ JSII-class object │ literal object  │
 * ├──────────┼────────────┼────────────────┼───────────┼────────────┼───────────────┼───────────────────┼─────────────────┤
 * │ DECLARED │ void       │ undefined      │ undefined │ undefined  │ undefined     │ undefined         │ undefined       │
 * │ TYPE     │ date       │ undefined(†)   │ { date }  │ -          │ -             │ -                 │ -               │
 * │          │ scalar (*) │ undefined(†)   │ -         │ value      │ -             │ -                 │ -               │
 * │          │ json       │ undefined      │ string    │ value      │ array/R(json) │ -                 │ byvalue/R(json) │
 * │          │ enum       │ undefined(†)   │ -         │ { enum }   │ -             │ -                 │ -               │
 * │          │ array of T │ undefined(†)   │ -         │ -          │ array/R(T)    │ -                 │ -               │
 * │          │ map of T   │ undefined(†)   │ -         │ -          │ -             │ -                 │ byvalue/R(T)    │
 * │          │ interface  │ undefined(†)   │ -         │ -          │ -             │ { ref }           │ { ref: proxy }  │
 * │          │ struct     │ undefined(†)   │ -         │ -          │ -             │ -                 │ byvalue/R(T[k]) │
 * │          │ class      │ undefined(†)   │ -         │ -          │ -             │ { ref }           │ { ref: proxy }  │
 * │          │ any        │ undefined      │ { date }  │ value      │ array/R(any)  │ { ref }           │ byvalue/R(any)  │
 * └──────────┴────────────┴────────────────┴───────────┴────────────┴───────────────┴───────────────────┴─────────────────┘
 *
 *  - (*) scalar means 'string | number | boolean'
 *  - (†) throw if not nullable
 *  - /R(t) recurse with declared type t
 */

import * as spec from 'jsii-spec';
import { isObjRef, isWireDate, isWireEnum, ObjRef, TOKEN_DATE, TOKEN_ENUM, WireDate, WireEnum } from './api';
import { hiddenMap, jsiiTypeFqn, objectReference, ObjectTable } from './objects';

/**
 * A specific singleton type to be explicit about a Void type
 *
 * In the spec, 'void' is represented as 'undefined'(*), but allowing the
 * value 'undefined' in function calls has lead to consumers failing to pass
 * type information that they had, just because they didn't "have to" (the
 * parameter was optional).
 *
 * (*) As in, declaration of a method looks like { returns?: TypeReference }
 * and the absence of a type means it returns 'void'.
 */
export type Void = 'void';

/**
 * A type instance, or Void
 */
export type OptionalValueOrVoid = spec.OptionalValue | Void;

/**
 * A special FQN that can be used to create empty javascript objects.
 */
export const EMPTY_OBJECT_FQN = 'Object';

/**
 * The type kind, that controls how it will be serialized according to the above table
 */
export const enum SerializationClass {
  Void = 'Void',
  Date = 'Date',
  Scalar = 'Scalar',
  Json = 'Json',
  Enum = 'Enum',
  Array = 'Array',
  Map = 'Map',
  Struct = 'Struct',
  ReferenceType = 'RefType',
  Any = 'Any',
}

type TypeLookup = (fqn: spec.FQN) => spec.Type;
type SymbolLookup = (fqn: spec.FQN) => any;

export interface SerializerHost {
  readonly objects: ObjectTable;
  debug(...args: any[]): void;
  lookupType(fqn: string): spec.Type;
  recurse(x: any, type: OptionalValueOrVoid): any;
  findSymbol(fqn: spec.FQN): any;
}

interface Serializer {
  serialize(value: unknown, type: OptionalValueOrVoid, host: SerializerHost): any;
  deserialize(value: unknown, type: OptionalValueOrVoid, host: SerializerHost): any;
}

export const SERIALIZERS: {[k: string]: Serializer} = {
  // ----------------------------------------------------------------------
  [SerializationClass.Void]: {
    serialize(value, _type, host) {
      if (value != null) {
        host.debug('Expected void, got', value);
      }
      return undefined;
    },

    deserialize(value, _type, host) {
      if (value != null) {
        host.debug('Expected void, got', value);
      }
      return undefined;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Date]: {
    serialize(value, optionalValue): WireDate | undefined {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (!isDate(value)) {
        throw new Error(`Expected Date, got ${JSON.stringify(value)}`);
      }
      return serializeDate(value);
    },

    deserialize(value, optionalValue) {
      if (nullAndOk(value, optionalValue)) { return undefined; }

      if (!isWireDate(value)) {
        throw new Error(`Expected Date, got ${JSON.stringify(value)}`);
      }
      return deserializeDate(value);
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Scalar]: {
    serialize(value, optionalValue) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      const primitiveType = optionalValue.type as spec.PrimitiveTypeReference;

      if (!isScalar(value)) {
        throw new Error(`Expected Scalar, got ${JSON.stringify(value)}`);
      }
      if (typeof value !== primitiveType.primitive) {
        throw new Error(`Expected '${primitiveType.primitive}', got ${JSON.stringify(value)} (${typeof value})`);
      }
      return value;
    },

    deserialize(value, optionalValue) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      const primitiveType = optionalValue.type as spec.PrimitiveTypeReference;

      if (!isScalar(value)) {
        throw new Error(`Expected Scalar, got ${JSON.stringify(value)}`);
      }
      if (typeof value !== primitiveType.primitive) {
        throw new Error(`Expected '${primitiveType.primitive}', got ${JSON.stringify(value)} (${typeof value})`);
      }

      return value;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Json]: {
    serialize(value) {
      // Just whatever. Dates will automatically serialize themselves to strings.
      return value;
    },
    deserialize(value, optionalValue) {
      // /!\ Top-level "null" will turn to undefined, but any null nested in the value is valid JSON, so it'll stay!
      if (nullAndOk(value, optionalValue)) { return undefined; }
      return value;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Enum]: {
    serialize(value, optionalValue, host): WireEnum | undefined {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new Error(`Expected enum value, got ${JSON.stringify(value)}`);
      }

      host.debug('Serializing enum');

      const enumType = optionalValue.type as spec.NamedTypeReference;
      const enumMap = host.findSymbol(enumType.fqn);
      const enumEntry = Object.entries(enumMap).find(([, v]) => v === value);
      if (!enumEntry) {
        throw new Error(`No entry in ${enumType.fqn} has value ${value}`);
      }
      return { [TOKEN_ENUM]: `${enumType.fqn}/${enumEntry[0]}` };
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }

      if (!isWireEnum(value)) {
        throw new Error(`Expected enum value, got ${JSON.stringify(value)}`);
      }

      return deserializeEnum(value, host.findSymbol);
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Array]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (!Array.isArray(value)) {
        throw new Error(`Expected array type, got ${JSON.stringify(value)}`);
      }

      const arrayType = optionalValue.type as spec.CollectionTypeReference;

      return value.map(x => host.recurse(x, { type: arrayType.collection.elementtype }));
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (!Array.isArray(value)) {
        throw new Error(`Expected array type, got ${JSON.stringify(value)}`);
      }

      const arrayType = optionalValue.type as spec.CollectionTypeReference;

      return value.map(x => host.recurse(x, { type: arrayType.collection.elementtype }));
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Map]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      const mapType = optionalValue.type as spec.CollectionTypeReference;
      return mapValues(value, v => host.recurse(v, { type: mapType.collection.elementtype }));
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      const mapType = optionalValue.type as spec.CollectionTypeReference;
      return mapValues(value, v => host.recurse(v, { type: mapType.collection.elementtype }));
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Struct]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (typeof value !== 'object' || value == null) {
        throw new Error(`Expected object, got ${JSON.stringify(value)}`);
      }

      // This looks odd, but if an object was originally passed in/out as a by-ref
      // class, and it happens to conform to a datatype interface we say we're
      // returning, return the actual object instead of the serialized value.
      // NOTE: Not entirely sure yet whether this is a bug masquerading as a
      // feature or not.
      const prevRef = objectReference(value);
      if (prevRef) { return prevRef; }

      /*
        This is what we'd like to do, but we can't because at least the Java client
        does not understand by-value serialized interface types, so we'll have to
        serialize by-reference for now:
        https://github.com/aws/jsii/issues/400

      const props = propertiesOf(namedType);

      return mapValues(value, (v, key) => {
        if (!props[key]) { return undefined; } // Don't map if unknown property
        return host.recurse(v, props[key].type);
      });
      */

      host.debug('Returning value type as reference type for now (awslabs/jsii#400)');
      const wireFqn = selectWireType(value, optionalValue.type as spec.NamedTypeReference, host.lookupType);
      return host.objects.registerObject(value, wireFqn);
    },
    deserialize(value, optionalValue, host) {
      if (typeof value === 'object' && Object.keys(value || {}).length === 0) {
        // Treat empty structs as `undefined` (see https://github.com/aws/jsii/issues/411)
        value = undefined;
      }
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (typeof value !== 'object' || value == null) {
        throw new Error(`Expected object reference, got ${JSON.stringify(value)}`);
      }

      const namedType = host.lookupType((optionalValue.type as spec.NamedTypeReference).fqn);
      const props = propertiesOf(namedType, host.lookupType);

      if (Array.isArray(value)) {
        throw new Error(`Got an array where a ${namedType.fqn} was expected. Did you mean to pass a variable number of arguments?`);
      }

      // Similarly to serialization, we might be getting a reference type where we're
      // expecting a value type. Accept this for now (but also validate that object
      // for presence of the right properties).
      if (isObjRef(value)) {
        host.debug('Expected value type but got reference type, accepting for now (awslabs/jsii#400)');

        // Return same INSTANCE (shouldn't matter but we don't know for sure that it doesn't)
        return validateRequiredProps(
          host.objects.findObject(value).instance,
          namedType.fqn,
          props);
      }

      value = validateRequiredProps(value, namedType.fqn, props);

      // Return a dict COPY, we have by-value semantics anyway.
      return mapValues(value, (v, key) => {
        if (!props[key]) { return undefined; } // Don't map if unknown property
        return host.recurse(v, props[key]);
      });
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.ReferenceType]: {
    serialize(value, optionalValue, host): ObjRef | undefined {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      if (typeof value !== 'object' || value == null) {
        throw new Error(`Expected object reference, got ${JSON.stringify(value)}`);
      }

      const prevRef = objectReference(value);
      if (prevRef) { return prevRef; }

      const wireFqn = selectWireType(value, optionalValue.type as spec.NamedTypeReference, host.lookupType);
      return host.objects.registerObject(value, wireFqn);
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue)) { return undefined; }
      if (optionalValue === 'void') { throw new Error('Encountered unexpected `void` type'); }

      // The only way to pass a by-ref object is to have created it
      // previously inside JSII kernel, so it must have an objref already.

      if (!isObjRef(value)) {
        throw new Error(`Expected object reference, got ${JSON.stringify(value)}`);
      }

      const { instance, fqn } = host.objects.findObject(value);

      const namedTypeRef = optionalValue.type as spec.NamedTypeReference;
      if (namedTypeRef.fqn !== EMPTY_OBJECT_FQN) {
        const namedType = host.lookupType(namedTypeRef.fqn);

        // Check that the object we got is of the right type
        // We only do this for classes, not interfaces, since Java might pass us objects that
        // privately implement some interface and we can't prove they don't.
        // https://github.com/aws/jsii/issues/399
        const declaredType = optionalValue.type as spec.NamedTypeReference;
        if (spec.isClassType(namedType) && !isAssignable(fqn, declaredType, host.lookupType)) {
          throw new Error(`Object of type ${fqn} is not convertible to ${declaredType.fqn}`);
        }
      }

      return instance;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Any]: {
    serialize(value, _type, host) {
      if (value == null) { return undefined; }

      if (isDate(value)) { return serializeDate(value); }
      if (isScalar(value)) { return value; }
      if (Array.isArray(value)) {
        return value.map(e => host.recurse(e, { type: spec.CANONICAL_ANY }));
      }

      // Note: no case for "ENUM" here, without type declaration we can't tell the difference
      // between an enum member and a scalar.

      if (typeof value !== 'object' || value == null) {
        throw new Error(`JSII kernel assumption violated, ${JSON.stringify(value)} is not an object`);
      }

      // To make sure people aren't going to try and return Map<> or Set<> out, test for
      // those and throw a descriptive error message. We can't detect these cases any other
      // way, and the by-value serialized object will be quite useless.
      if (value instanceof Set || value instanceof Map) { throw new Error("Can't return objects of type Set or Map"); }

      // Use a previous reference to maintain object identity. NOTE: this may cause us to return
      // a different type than requested! This is just how it is right now.
      // https://github.com/aws/jsii/issues/399
      const prevRef = objectReference(value);
      if (prevRef) { return prevRef; }

      // If this is or should be a reference type, pass or make the reference
      // (Like regular reftype serialization, but without the type derivation to an interface)
      const jsiiType = jsiiTypeFqn(value);
      if (jsiiType) { return host.objects.registerObject(value, jsiiType); }

      // At this point we have an object that is not of an exported type. Either an object
      // literal, or an instance of a fully private class (cannot distinguish those cases).

      // We will serialize by-value, but recurse for serialization so that if
      // the object contains reference objects, they will be serialized appropriately.
      // (Basically, serialize anything else as a map of 'any').
      return mapValues(value, (v) => host.recurse(v, { type: spec.CANONICAL_ANY }));
    },

    deserialize(value, _type, host) {
      if (value == null) { return undefined; }

      if (isWireDate(value)) {
        host.debug('ANY is a Date');
        return deserializeDate(value);
      }
      if (isScalar(value)) {
        host.debug('ANY is a Scalar');
        return value;
      }
      if (Array.isArray(value)) {
        host.debug('ANY is an Array');
        return value.map(e => host.recurse(e, { type: spec.CANONICAL_ANY }));
      }

      if (isWireEnum(value)) {
        host.debug('ANY is an Enum');
        return deserializeEnum(value, host.findSymbol);
      }
      if (isObjRef(value)) {
        host.debug('ANY is a Ref');
        return host.objects.findObject(value).instance;
      }

      // At this point again, deserialize by-value.
      host.debug('ANY is a Map');
      return mapValues(value, (v) => host.recurse(v, { type: spec.CANONICAL_ANY }));
    },
  },
};

function serializeDate(value: Date): WireDate {
  return { [TOKEN_DATE]: value.toISOString() };
}

function deserializeDate(value: WireDate): Date {
  return new Date(value[TOKEN_DATE]);
}

function deserializeEnum(value: WireEnum, lookup: SymbolLookup) {
  const enumLocator = value[TOKEN_ENUM];
  const sep = enumLocator.lastIndexOf('/');
  if (sep === -1) {
    throw new Error(`Malformed enum value: ${JSON.stringify(value)}`);
  }

  const typeName = enumLocator.substr(0, sep);
  const valueName = enumLocator.substr(sep + 1);

  const enumValue = lookup(typeName)[valueName];
  if (enumValue === undefined) {
    throw new Error(`No enum member named ${valueName} in ${typeName}`);
  }
  return enumValue;
}

export interface TypeSerialization {
  serializationClass: SerializationClass;
  typeRef: OptionalValueOrVoid;
}

/**
 * From a type reference, return the possible serialization types
 *
 * There can be multiple, because the type can be a type union.
 */
export function serializationType(typeRef: OptionalValueOrVoid, lookup: TypeLookup): TypeSerialization[] {
  if (typeRef == null) { throw new Error("Kernel error: expected type information, got 'undefined'"); }
  if (typeRef === 'void') { return [{ serializationClass: SerializationClass.Void, typeRef }]; }
  if (spec.isPrimitiveTypeReference(typeRef.type)) {
    switch (typeRef.type.primitive) {
      case spec.PrimitiveType.Any: return [{ serializationClass: SerializationClass.Any, typeRef }];
      case spec.PrimitiveType.Date: return [{ serializationClass: SerializationClass.Date, typeRef }];
      case spec.PrimitiveType.Json: return [{ serializationClass: SerializationClass.Json, typeRef }];
      case spec.PrimitiveType.Boolean:
      case spec.PrimitiveType.Number:
      case spec.PrimitiveType.String:
        return [{ serializationClass: SerializationClass.Scalar, typeRef }];
    }

    throw new Error('Unknown primitive type');
  }
  if (spec.isCollectionTypeReference(typeRef.type)) {
    return [{
      serializationClass: typeRef.type.collection.kind === spec.CollectionKind.Array ? SerializationClass.Array : SerializationClass.Map,
      typeRef
    }];
  }
  if (spec.isUnionTypeReference(typeRef.type)) {
    const compoundTypes = flatMap(typeRef.type.union.types, t => serializationType({ type: t }, lookup));
    // Propagate the top-level 'optional' field to each individual subtype
    for (const t of compoundTypes) {
      if (t.typeRef !== 'void') {
        t.typeRef.optional = typeRef.optional;
      }
    }
    return compoundTypes;
  }

  // The next part of the conversion is lookup-dependent
  const type = lookup(typeRef.type.fqn);

  if (spec.isEnumType(type)) {
    return [{ serializationClass: SerializationClass.Enum, typeRef }];
  }

  if (spec.isInterfaceType(type) && type.datatype) {
    return [{ serializationClass: SerializationClass.Struct, typeRef }];
  }

  return [{ serializationClass: SerializationClass.ReferenceType, typeRef }];
}

function nullAndOk(x: unknown, type: OptionalValueOrVoid): boolean {
  if (x != null) { return false; }

  if (type !== 'void' && !type.optional) {
    throw new Error(`Got 'undefined' for non-optional instance of ${JSON.stringify(type)}`);
  }

  return true;
}

function isDate(x: unknown): x is Date {
  return typeof x === 'object' && Object.prototype.toString.call(x) === '[object Date]';
}

function isScalar(x: unknown): x is string | number | boolean {
  return typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
}

function flatMap<T, U>(xs: T[], fn: (x: T) => U[]): U[] {
  const ret = new Array<U>();
  for (const x of xs) { ret.push(...fn(x)); }
  return ret;
}

/**
 * Map an object's values, skipping 'undefined' values'
 */
function mapValues(value: unknown, fn: (value: any, field: string) => any) {
  if (typeof value !== 'object' || value == null) {
    throw new Error(`Expected object type, got ${JSON.stringify(value)}`);
  }

  const out: any = { };
  for (const [k, v] of Object.entries(value)) {
    const wireValue = fn(v, k);
    if (wireValue === undefined) { continue; }
    out[k] = wireValue;
  }
  return out;
}

function propertiesOf(t: spec.Type, lookup: TypeLookup): {[name: string]: spec.Property} {
  if (!spec.isClassOrInterfaceType(t)) { return {}; }

  let ret: { [name: string]: spec.Property } = {};

  if (t.interfaces) {
    for (const iface of t.interfaces) {
      ret = { ...ret, ...propertiesOf(lookup(iface), lookup) };
    }
  }
  if (spec.isClassType(t) && t.base) {
    ret = { ...ret, ...propertiesOf(lookup(t.base), lookup) };
  }

  for (const prop of t.properties || []) {
    ret[prop.name] = prop;
  }

  return ret;
}

const WIRE_TYPE_MAP = Symbol('$__jsii_wire_type__$');

/**
 * Select the wire type for the given object and requested type
 *
 * Should return the most specific type that is in the JSII assembly and
 * assignable to the required type.
 *
 * We actually don't need to search much; because of prototypal constructor
 * linking, object.constructor.__jsii__ will have the FQN of the most specific
 * exported JSII class this object is an instance of.
 *
 * Either that's assignable to the requested type, in which case we return it,
 * or it's not, in which case there's a hidden class that implements the interface
 * and we just return the interface so the other side can instantiate an interface
 * proxy for it.
 *
 * Cache the analysis on the object to avoid having to do too many searches through
 * the type system for repeated accesses on the same object.
 */
function selectWireType(obj: any, expectedType: spec.NamedTypeReference, lookup: TypeLookup): string {
  const map = hiddenMap<string>(obj, WIRE_TYPE_MAP);

  if (!(expectedType.fqn in map)) {
    const jsiiType = jsiiTypeFqn(obj);
    if (jsiiType) {
      const assignable = isAssignable(jsiiType, expectedType, lookup);

      // If we're not assignable and both types are class types, this cannot be satisfied.
      if (!assignable && spec.isClassType(lookup(expectedType.fqn))) {
        throw new Error(`Object of type ${jsiiType} is not convertible to ${expectedType.fqn}`);
      }

      map[expectedType.fqn] = assignable ? jsiiType : expectedType.fqn;
    } else {
      map[expectedType.fqn] = expectedType.fqn;
    }
  }

  return map[expectedType.fqn];
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
function isAssignable(actualTypeFqn: string, requiredType: spec.NamedTypeReference, lookup: TypeLookup): boolean {
  // The empty object is assignable to everything
  if (actualTypeFqn === EMPTY_OBJECT_FQN) { return true; }

  if (requiredType.fqn === actualTypeFqn) {
    return true;
  }
  const actualType = lookup(actualTypeFqn);
  if (spec.isClassType(actualType)) {
    if (actualType.base && isAssignable(actualType.base, requiredType, lookup)) {
      return true;
    }
  }
  if (spec.isClassOrInterfaceType(actualType) && actualType.interfaces) {
    return actualType.interfaces.find(iface => isAssignable(iface, requiredType, lookup)) != null;
  }
  return false;
}

function validateRequiredProps(actualProps: {[key: string]: any}, typeName: string, specProps: {[key: string]: spec.Property}) {
  // Check for required properties
  const missingRequiredProps = Object.keys(specProps)
    .filter(name => !specProps[name].optional)
    .filter(name => !(name in actualProps));

  if (missingRequiredProps.length > 0) {
    throw new Error(`Missing required properties for ${typeName}: ${missingRequiredProps}`);
  }

  return actualProps;
}
