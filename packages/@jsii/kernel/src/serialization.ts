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

import * as spec from '@jsii/spec';
import * as assert from 'assert';
import { inspect } from 'util';

import {
  isObjRef,
  isWireDate,
  isWireEnum,
  isWireMap,
  isWireStruct,
  ObjRef,
  TOKEN_DATE,
  TOKEN_ENUM,
  TOKEN_MAP,
  TOKEN_REF,
  TOKEN_STRUCT,
  WireDate,
  WireEnum,
} from './api';
import { jsiiTypeFqn, objectReference, ObjectTable } from './objects';

import { api } from '.';

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
const VOID: Void = 'void';

/**
 * A type instance, or Void
 */
export type OptionalValueOrVoid = spec.OptionalValue | Void;

/**
 * A special FQN that can be used to create empty javascript objects.
 */
export const EMPTY_OBJECT_FQN = 'Object';

export const SYMBOL_WIRE_TYPE = Symbol.for('$jsii$wireType$');

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

type FindSymbol = (fqn: spec.FQN) => any;
type IsVisibleType = (fqn: spec.FQN) => boolean;
type LookupType = (fqn: spec.FQN) => spec.Type;

export interface SerializerHost {
  readonly objects: ObjectTable;
  debug(...args: any[]): void;
  isVisibleType: IsVisibleType;
  lookupType: LookupType;
  findSymbol: FindSymbol;
}

interface Serializer {
  serialize(
    value: unknown,
    type: OptionalValueOrVoid,
    host: SerializerHost,
  ): any;
  deserialize(
    value: unknown,
    type: OptionalValueOrVoid,
    host: SerializerHost,
    options?: { allowNullishMapValue?: boolean },
  ): any;
}

export const SERIALIZERS: { [k: string]: Serializer } = {
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
    serialize(value, optionalValue, host): WireDate | undefined {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (!isDate(value)) {
        throw new SerializationError(
          `Value is not an instance of Date`,
          value,
          host,
        );
      }
      return serializeDate(value);
    },

    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }

      if (!isWireDate(value)) {
        throw new SerializationError(
          `Value does not have the "${TOKEN_DATE}" key`,
          value,
          host,
        );
      }
      return deserializeDate(value);
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Scalar]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      const primitiveType = optionalValue.type as spec.PrimitiveTypeReference;

      if (!isScalar(value)) {
        throw new SerializationError(
          `Value is not a ${spec.describeTypeReference(optionalValue.type)}`,
          value,
          host,
        );
      }
      if (typeof value !== primitiveType.primitive) {
        throw new SerializationError(
          `Value is not a ${spec.describeTypeReference(optionalValue.type)}`,
          value,
          host,
        );
      }
      return value;
    },

    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      const primitiveType = optionalValue.type as spec.PrimitiveTypeReference;

      if (!isScalar(value)) {
        throw new SerializationError(
          `Value is not a ${spec.describeTypeReference(optionalValue.type)}`,
          value,
          host,
        );
      }
      if (typeof value !== primitiveType.primitive) {
        throw new SerializationError(
          `Value is not a ${spec.describeTypeReference(optionalValue.type)}`,
          value,
          host,
        );
      }

      return value;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Json]: {
    serialize(value, optionalValue, host) {
      // /!\ Top-level "null" will turn to undefined, but any null nested in the value is valid JSON, so it'll stay!
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }

      // Just whatever. Dates will automatically serialize themselves to strings.
      return value;
    },
    deserialize(value, optionalValue, host) {
      // /!\ Top-level "null" will turn to undefined, but any null nested in the value is valid JSON, so it'll stay!
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }

      // A mapping object can arrive though here. This would be the case if anything that is valid into a Map<string, ?>
      // is passed into a JSON transfer point. Indeed, those are also valid JSON! For example, Python "dicts" will be
      // serialized (by the Python runtime) as a $jsii.map (the mapping object). We need to de-serialize that as a
      // Map<string, JSON> in order to obtain the correct output behavior here!
      if (isWireMap(value)) {
        return SERIALIZERS[SerializationClass.Map].deserialize(
          value,
          {
            type: {
              collection: {
                kind: spec.CollectionKind.Map,
                elementtype: { primitive: spec.PrimitiveType.Json },
              },
            },
          },
          host,
          { allowNullishMapValue: true },
        );
      }

      if (typeof value !== 'object') {
        return value;
      }

      if (Array.isArray(value)) {
        return value.map(mapJsonValue);
      }

      return mapValues(value, mapJsonValue, host);

      function mapJsonValue(toMap: any, key: string | number) {
        if (toMap == null) {
          return toMap;
        }
        return process(
          host,
          'deserialize',
          toMap,
          { type: { primitive: spec.PrimitiveType.Json } },
          typeof key === 'string' ? `key ${inspect(key)}` : `index ${key}`,
        );
      }
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Enum]: {
    serialize(value, optionalValue, host): WireEnum | undefined {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (typeof value !== 'string' && typeof value !== 'number') {
        throw new SerializationError(
          `Value is not a string or number`,
          value,
          host,
        );
      }

      host.debug('Serializing enum');

      const enumType = optionalValue.type as spec.NamedTypeReference;
      const enumMap = host.findSymbol(enumType.fqn);
      const enumEntry = Object.entries(enumMap).find(([, v]) => v === value);
      if (!enumEntry) {
        throw new SerializationError(
          `Value is not present in enum ${spec.describeTypeReference(
            enumType,
          )}`,
          value,
          host,
        );
      }
      return { [TOKEN_ENUM]: `${enumType.fqn}/${enumEntry[0]}` };
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }

      if (!isWireEnum(value)) {
        throw new SerializationError(
          `Value does not have the "${TOKEN_ENUM}" key`,
          value,
          host,
        );
      }

      return deserializeEnum(value, host);
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Array]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (!Array.isArray(value)) {
        throw new SerializationError(`Value is not an array`, value, host);
      }

      const arrayType = optionalValue.type as spec.CollectionTypeReference;

      return value.map((x, idx) =>
        process(
          host,
          'serialize',
          x,
          { type: arrayType.collection.elementtype },
          `index ${inspect(idx)}`,
        ),
      );
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (!Array.isArray(value)) {
        throw new SerializationError(`Value is not an array`, value, host);
      }

      const arrayType = optionalValue.type as spec.CollectionTypeReference;

      return value.map((x, idx) =>
        process(
          host,
          'deserialize',
          x,
          { type: arrayType.collection.elementtype },
          `index ${inspect(idx)}`,
        ),
      );
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Map]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      const mapType = optionalValue.type as spec.CollectionTypeReference;
      return {
        [TOKEN_MAP]: mapValues(
          value,
          (v, key) =>
            process(
              host,
              'serialize',
              v,
              { type: mapType.collection.elementtype },
              `key ${inspect(key)}`,
            ),
          host,
        ),
      };
    },
    deserialize(
      value,
      optionalValue,
      host,
      { allowNullishMapValue = false } = {},
    ) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      const mapType = optionalValue.type as spec.CollectionTypeReference;
      if (!isWireMap(value)) {
        // Compatibility mode with older versions that didn't wrap in [TOKEN_MAP]
        return mapValues(
          value,
          (v, key) =>
            process(
              host,
              'deserialize',
              v,
              {
                optional: allowNullishMapValue,
                type: mapType.collection.elementtype,
              },
              `key ${inspect(key)}`,
            ),
          host,
        );
      }
      const result = mapValues(
        value[TOKEN_MAP],
        (v, key) =>
          process(
            host,
            'deserialize',
            v,
            {
              optional: allowNullishMapValue,
              type: mapType.collection.elementtype,
            },
            `key ${inspect(key)}`,
          ),
        host,
      );
      Object.defineProperty(result, SYMBOL_WIRE_TYPE, {
        configurable: false,
        enumerable: false,
        value: TOKEN_MAP,
        writable: false,
      });
      return result;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Struct]: {
    serialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (typeof value !== 'object' || value == null || value instanceof Date) {
        throw new SerializationError(`Value is not an object`, value, host);
      }

      if (Array.isArray(value)) {
        throw new SerializationError(`Value is an array`, value, host);
      }

      /*
        This is what we'd like to do, but we can't because at least the Java client
        does not understand by-value serialized interface types, so we'll have to
        serialize by-reference. Additionally, serializing known properties would
        cause problems when the return type of a method is a UNION of structs.
        See: https://github.com/aws/jsii/issues/400

      const props = propertiesOf(namedType);

      return mapValues(value, (v, key) => {
        if (!props[key]) { return undefined; } // Don't map if unknown property
        return host.recurse(v, props[key].type);
      });
      */

      host.debug('Returning value type by reference');
      return host.objects.registerObject(value, EMPTY_OBJECT_FQN, [
        (optionalValue.type as spec.NamedTypeReference).fqn,
      ]);
    },
    deserialize(value, optionalValue, host) {
      if (typeof value === 'object' && Object.keys(value ?? {}).length === 0) {
        // Treat empty structs as `undefined` (see https://github.com/aws/jsii/issues/411)
        value = undefined;
      }
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (typeof value !== 'object' || value == null) {
        throw new SerializationError(`Value is not an object`, value, host);
      }

      const namedType = host.lookupType(
        (optionalValue.type as spec.NamedTypeReference).fqn,
      );
      const props = propertiesOf(namedType, host.lookupType);

      if (Array.isArray(value)) {
        throw new SerializationError(
          'Value is an array (varargs may have been incorrectly supplied)',
          value,
          host,
        );
      }

      // Similarly to serialization, we might be getting a reference type where we're
      // expecting a value type. Accept this for now (but also validate that object
      // for presence of the right properties).
      if (isObjRef(value)) {
        host.debug(
          'Expected value type but got reference type, accepting for now (awslabs/jsii#400)',
        );

        // Return same INSTANCE (shouldn't matter but we don't know for sure that it doesn't)
        return validateRequiredProps(
          host.objects.findObject(value).instance,
          namedType.fqn,
          props,
          host,
        );
      }

      if (api.isWireStruct(value)) {
        const { fqn, data } = value[api.TOKEN_STRUCT];
        if (!isAssignable(fqn, namedType, host.lookupType)) {
          throw new SerializationError(
            `Wired struct has type '${fqn}', which does not match expected type`,
            value,
            host,
          );
        }
        value = data;
      }

      // Python, for example, allows using plain mapping objects instead of Structs (dyanmic typing, YOLO!)
      if (api.isWireMap(value)) {
        value = value[api.TOKEN_MAP];
      }

      value = validateRequiredProps(value as any, namedType.fqn, props, host);

      // Return a dict COPY, we have by-value semantics anyway.
      return mapValues(
        value,
        (v, key) => {
          if (!props[key]) {
            return undefined;
          } // Don't map if unknown property
          return process(
            host,
            'deserialize',
            v,
            props[key],
            `key ${inspect(key)}`,
          );
        },
        host,
      );
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.ReferenceType]: {
    serialize(value, optionalValue, host): ObjRef | undefined {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      if (typeof value !== 'object' || value == null || Array.isArray(value)) {
        throw new SerializationError(`Value is not an object`, value, host);
      }

      if (value instanceof Date) {
        throw new SerializationError(`Value is a Date`, value, host);
      }

      const expectedType = host.lookupType(
        (optionalValue.type as spec.NamedTypeReference).fqn,
      );
      const interfaces = spec.isInterfaceType(expectedType)
        ? [expectedType.fqn]
        : undefined;
      const jsiiType =
        jsiiTypeFqn(value, host.isVisibleType) ??
        (spec.isClassType(expectedType) ? expectedType.fqn : EMPTY_OBJECT_FQN);

      return host.objects.registerObject(value, jsiiType, interfaces);
    },
    deserialize(value, optionalValue, host) {
      if (nullAndOk(value, optionalValue, host)) {
        return undefined;
      }
      assert(optionalValue !== VOID, 'Encountered unexpected void type!');

      // The only way to pass a by-ref object is to have created it
      // previously inside JSII kernel, so it must have an objref already.

      if (!isObjRef(value)) {
        throw new SerializationError(
          `Value does not have the "${TOKEN_REF}" key`,
          value,
          host,
        );
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
        if (
          spec.isClassType(namedType) &&
          !isAssignable(fqn, declaredType, host.lookupType)
        ) {
          throw new SerializationError(
            `Object of type '${fqn}' is not convertible to ${spec.describeTypeReference(
              declaredType,
            )}`,
            value,
            host,
          );
        }
      }

      return instance;
    },
  },

  // ----------------------------------------------------------------------
  [SerializationClass.Any]: {
    serialize(value, _type, host) {
      if (value == null) {
        return undefined;
      }

      if (isDate(value)) {
        return serializeDate(value);
      }
      if (isScalar(value)) {
        return value;
      }
      if (Array.isArray(value)) {
        return value.map((e, idx) =>
          process(
            host,
            'serialize',
            e,
            { type: spec.CANONICAL_ANY },
            `index ${inspect(idx)}`,
          ),
        );
      }

      // Note: no case for "ENUM" here, without type declaration we can't tell the difference
      // between an enum member and a scalar.

      if (typeof value === 'function') {
        throw new SerializationError(
          'Functions cannot be passed across language boundaries',
          value,
          host,
        );
      }

      if (typeof value !== 'object' || value == null) {
        throw new SerializationError(
          `A jsii kernel assumption was violated: value is not an object`,
          value,
          host,
        );
      }

      if (
        SYMBOL_WIRE_TYPE in value &&
        (value as any)[SYMBOL_WIRE_TYPE] === TOKEN_MAP
      ) {
        return SERIALIZERS[SerializationClass.Map].serialize(
          value,
          {
            type: {
              collection: {
                kind: spec.CollectionKind.Map,
                elementtype: spec.CANONICAL_ANY,
              },
            },
          },
          host,
        );
      }

      // To make sure people aren't going to try and return Map<> or Set<> out, test for
      // those and throw a descriptive error message. We can't detect these cases any other
      // way, and the by-value serialized object will be quite useless.
      if (value instanceof Set || value instanceof Map) {
        throw new SerializationError(
          'Set and Map instances cannot be sent across the language boundary',
          value,
          host,
        );
      }

      // Use a previous reference to maintain object identity. NOTE: this may cause us to return
      // a different type than requested! This is just how it is right now.
      // https://github.com/aws/jsii/issues/399
      const prevRef = objectReference(value);
      if (prevRef) {
        return prevRef;
      }

      // If this is or should be a reference type, pass or make the reference
      // (Like regular reftype serialization, but without the type derivation to an interface)
      const jsiiType =
        jsiiTypeFqn(value, host.isVisibleType) ??
        (isByReferenceOnly(value) ? EMPTY_OBJECT_FQN : undefined);
      if (jsiiType) {
        return host.objects.registerObject(value, jsiiType);
      }

      // At this point we have an object that is not of an exported type. Either an object
      // literal, or an instance of a fully private class (cannot distinguish those cases).

      // We will serialize by-value, but recurse for serialization so that if
      // the object contains reference objects, they will be serialized appropriately.
      // (Basically, serialize anything else as a map of 'any').
      return mapValues(
        value,
        (v, key) =>
          process(
            host,
            'serialize',
            v,
            { type: spec.CANONICAL_ANY },
            `key ${inspect(key)}`,
          ),
        host,
      );
    },

    deserialize(value, _type, host) {
      if (value == null) {
        return undefined;
      }

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
        return value.map((e, idx) =>
          process(
            host,
            'deserialize',
            e,
            { type: spec.CANONICAL_ANY },
            `index ${inspect(idx)}`,
          ),
        );
      }

      if (isWireEnum(value)) {
        host.debug('ANY is an Enum');
        return deserializeEnum(value, host);
      }
      if (isWireMap(value)) {
        host.debug('ANY is a Map');
        const mapOfAny: spec.CollectionTypeReference = {
          collection: {
            kind: spec.CollectionKind.Map,
            elementtype: spec.CANONICAL_ANY,
          },
        };
        return SERIALIZERS[SerializationClass.Map].deserialize(
          value,
          { type: mapOfAny },
          host,
        );
      }
      if (isObjRef(value)) {
        host.debug('ANY is a Ref');
        return host.objects.findObject(value).instance;
      }

      // if the value has a struct token, it was serialized by a typed jsii
      // struct, but since the deserialization target is ANY, all we can do is
      // strip the data from $jsii.struct and continue to deserialize as ANY.
      if (isWireStruct(value)) {
        const { fqn, data } = value[TOKEN_STRUCT];
        host.debug(`ANY is a struct of type ${fqn}`);
        return SERIALIZERS[SerializationClass.Struct].deserialize(
          data,
          { type: { fqn } },
          host,
        );
      }

      // At this point again, deserialize by-value.
      host.debug('ANY is a Map');
      return mapValues(
        value,
        (v, key) =>
          process(
            host,
            'deserialize',
            v,
            { type: spec.CANONICAL_ANY },
            `key ${inspect(key)}`,
          ),
        host,
      );
    },
  },
};

function serializeDate(value: Date): WireDate {
  return { [TOKEN_DATE]: value.toISOString() };
}

function deserializeDate(value: WireDate): Date {
  return new Date(value[TOKEN_DATE]);
}

function deserializeEnum(value: WireEnum, host: SerializerHost) {
  const enumLocator = value[TOKEN_ENUM];
  const sep = enumLocator.lastIndexOf('/');
  if (sep === -1) {
    throw new SerializationError(
      `Invalid enum token value ${inspect(enumLocator)}`,
      value,
      host,
    );
  }

  const typeName = enumLocator.slice(0, sep);
  const valueName = enumLocator.slice(sep + 1);

  const enumValue = host.findSymbol(typeName)[valueName];
  if (enumValue === undefined) {
    throw new SerializationError(
      `No such enum member: ${inspect(valueName)}`,
      value,
      host,
    );
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
export function serializationType(
  typeRef: OptionalValueOrVoid,
  lookup: LookupType,
): TypeSerialization[] {
  assert(
    typeRef != null,
    `Kernel error: expected type information, got ${inspect(typeRef)}`,
  );

  if (typeRef === 'void') {
    return [{ serializationClass: SerializationClass.Void, typeRef }];
  }
  if (spec.isPrimitiveTypeReference(typeRef.type)) {
    switch (typeRef.type.primitive) {
      case spec.PrimitiveType.Any:
        return [{ serializationClass: SerializationClass.Any, typeRef }];
      case spec.PrimitiveType.Date:
        return [{ serializationClass: SerializationClass.Date, typeRef }];
      case spec.PrimitiveType.Json:
        return [{ serializationClass: SerializationClass.Json, typeRef }];
      case spec.PrimitiveType.Boolean:
      case spec.PrimitiveType.Number:
      case spec.PrimitiveType.String:
        return [{ serializationClass: SerializationClass.Scalar, typeRef }];
    }

    assert(false, `Unknown primitive type: ${inspect(typeRef.type)}`);
  }
  if (spec.isCollectionTypeReference(typeRef.type)) {
    return [
      {
        serializationClass:
          typeRef.type.collection.kind === spec.CollectionKind.Array
            ? SerializationClass.Array
            : SerializationClass.Map,
        typeRef,
      },
    ];
  }
  if (spec.isUnionTypeReference(typeRef.type)) {
    const compoundTypes = flatMap(typeRef.type.union.types, (t) =>
      serializationType({ type: t }, lookup),
    );
    // Propagate the top-level 'optional' field to each individual subtype
    for (const t of compoundTypes) {
      if (t.typeRef !== 'void') {
        t.typeRef.optional = typeRef.optional;
      }
    }
    return compoundTypes.sort((l, r) =>
      compareSerializationClasses(l.serializationClass, r.serializationClass),
    );
  }

  if (spec.isIntersectionTypeReference(typeRef.type)) {
    throw new Error(`Intersection types cannot be serialized`);
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

function nullAndOk(
  x: unknown,
  type: OptionalValueOrVoid,
  host: SerializerHost,
): boolean {
  if (x != null) {
    return false;
  }

  if (type !== 'void' && !type.optional) {
    throw new SerializationError(
      `A value is required (type is non-optional)`,
      x,
      host,
    );
  }

  return true;
}

function isDate(x: unknown): x is Date {
  return (
    typeof x === 'object' &&
    Object.prototype.toString.call(x) === '[object Date]'
  );
}

function isScalar(x: unknown): x is string | number | boolean {
  return (
    typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean'
  );
}

function flatMap<T, U>(xs: T[], fn: (x: T) => U[]): U[] {
  const ret = new Array<U>();
  for (const x of xs) {
    ret.push(...fn(x));
  }
  return ret;
}

/**
 * Map an object's values, skipping 'undefined' values'
 */
function mapValues(
  value: unknown,
  fn: (value: any, field: string) => any,
  host: SerializerHost,
): { [key: string]: any } {
  if (typeof value !== 'object' || value == null) {
    throw new SerializationError(`Value is not an object`, value, host);
  }

  if (Array.isArray(value)) {
    throw new SerializationError(`Value is an array`, value, host);
  }

  const out: { [key: string]: any } = {};
  for (const [k, v] of Object.entries(value)) {
    const wireValue = fn(v, k);
    if (wireValue === undefined) {
      continue;
    }
    out[k] = wireValue;
  }
  return out;
}

function propertiesOf(
  t: spec.Type,
  lookup: LookupType,
): { [name: string]: spec.Property } {
  if (!spec.isClassOrInterfaceType(t)) {
    return {};
  }

  let ret: { [name: string]: spec.Property } = {};

  if (t.interfaces) {
    for (const iface of t.interfaces) {
      ret = { ...ret, ...propertiesOf(lookup(iface), lookup) };
    }
  }
  if (spec.isClassType(t) && t.base) {
    ret = { ...ret, ...propertiesOf(lookup(t.base), lookup) };
  }

  for (const prop of t.properties ?? []) {
    ret[prop.name] = prop;
  }

  return ret;
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
function isAssignable(
  actualTypeFqn: string,
  requiredType: spec.NamedTypeReference,
  lookup: LookupType,
): boolean {
  // The empty object is assignable to everything
  if (actualTypeFqn === EMPTY_OBJECT_FQN) {
    return true;
  }

  if (requiredType.fqn === actualTypeFqn) {
    return true;
  }
  const actualType = lookup(actualTypeFqn);
  if (spec.isClassType(actualType)) {
    if (
      actualType.base &&
      isAssignable(actualType.base, requiredType, lookup)
    ) {
      return true;
    }
  }
  if (spec.isClassOrInterfaceType(actualType) && actualType.interfaces) {
    return (
      actualType.interfaces.find((iface) =>
        isAssignable(iface, requiredType, lookup),
      ) != null
    );
  }
  return false;
}

function validateRequiredProps(
  actualProps: { [key: string]: any },
  typeName: string,
  specProps: { [key: string]: spec.Property },
  host: SerializerHost,
) {
  // Check for required properties
  const missingRequiredProps = Object.keys(specProps)
    .filter((name) => !specProps[name].optional)
    .filter((name) => !(name in actualProps));

  if (missingRequiredProps.length > 0) {
    throw new SerializationError(
      `Missing required properties for ${typeName}: ${missingRequiredProps
        .map((p) => inspect(p))
        .join(', ')}`,
      actualProps,
      host,
    );
  }

  return actualProps;
}

function compareSerializationClasses(
  l: SerializationClass,
  r: SerializationClass,
): number {
  const order = [
    SerializationClass.Void,
    SerializationClass.Date,
    SerializationClass.Scalar,
    SerializationClass.Json,
    SerializationClass.Enum,
    SerializationClass.Array,
    SerializationClass.Map,
    SerializationClass.Struct,
    SerializationClass.ReferenceType,
    SerializationClass.Any,
  ];
  return order.indexOf(l) - order.indexOf(r);
}

/**
 * Determines whether `obj` must be passed by-reference or if by-value is acceptable. For example,
 * objects with methods, or dynamic getters (or setters) should be passed by-reference as a matter
 * of security. The behavior in non-JS runtimes could otherwise differ from that in pure JS (if
 * getters are not stable, etc...).
 *
 * @param obj the object to be tested.
 *
 * @returns true if `obj` must be passed by-reference.
 */
function isByReferenceOnly(obj: any): boolean {
  if (Array.isArray(obj)) {
    return false;
  }

  let curr = obj;
  // Crawl up the prototype chain to look for dynamic properties or methods.
  do {
    for (const prop of Object.getOwnPropertyNames(curr)) {
      const descr = Object.getOwnPropertyDescriptor(curr, prop);
      if (
        descr?.get != null ||
        descr?.set != null ||
        typeof descr?.value === 'function'
      ) {
        // Property has a dynamic getter, setter or is a constructor/method, so by-ref required!
        return true;
      }
    }
    // End when the parent proto is `Object`, which has no parent proto itself.
  } while (Object.getPrototypeOf((curr = Object.getPrototypeOf(curr))) != null);

  return false;
}

export function process(
  host: SerializerHost,
  serde: keyof Serializer,
  value: unknown,
  type: OptionalValueOrVoid,
  context: string,
) {
  const wireTypes = serializationType(type, host.lookupType);
  host.debug(serde, value, ...wireTypes);

  const errors = new Array<any>();
  for (const { serializationClass, typeRef } of wireTypes) {
    try {
      return SERIALIZERS[serializationClass][serde](value, typeRef, host);
    } catch (error: any) {
      error.context = `as ${
        typeRef === VOID ? VOID : spec.describeTypeReference(typeRef.type)
      }`;
      errors.push(error);
    }
  }

  const typeDescr =
    type === VOID ? type : spec.describeTypeReference(type.type);
  const optionalTypeDescr =
    type !== VOID && type.optional ? `${typeDescr} | undefined` : typeDescr;
  throw new SerializationError(
    `${titleize(context)}: Unable to ${serde} value as ${optionalTypeDescr}`,
    value,
    host,
    errors,
    { renderValue: true },
  );

  function titleize(text: string): string {
    text = text.trim();
    if (text === '') {
      return text;
    }
    const [first, ...rest] = text;
    return [first.toUpperCase(), ...rest].join('');
  }
}

export class SerializationError extends Error {
  public readonly name: string = '@jsii/kernel.SerializationError';

  public constructor(
    message: string,
    public readonly value: unknown,
    { isVisibleType }: { readonly isVisibleType: (fqn: string) => boolean },
    public readonly causes: readonly any[] = [],
    { renderValue = false }: { renderValue?: boolean } = {},
  ) {
    super(
      [
        message,
        ...(renderValue
          ? [
              `${
                causes.length > 0 ? '\u{251C}' : '\u{2570}'
              }\u{2500}\u{2500} \u{1F6D1} Failing value is ${describeTypeOf(
                value,
                isVisibleType,
              )}`,
              ...(value == null
                ? []
                : inspect(value, false, 0)
                    .split('\n')
                    .map(
                      (l) =>
                        `${causes.length > 0 ? '\u{2502}' : ' '}      ${l}`,
                    )),
            ]
          : []),
        ...(causes.length > 0
          ? [
              '\u{2570}\u{2500}\u{2500} \u{1F50D} Failure reason(s):',
              ...causes.map(
                (cause, idx) =>
                  `    ${
                    idx < causes.length - 1 ? '\u{251C}' : '\u{2570}'
                  }\u{2500}${
                    causes.length > 1
                      ? ` [${cause.context ?? inspect(idx)}]`
                      : ''
                  } ${cause.message.split('\n').join('\n        ')}`,
              ),
            ]
          : []),
      ].join('\n'),
    );
  }
}

function describeTypeOf(
  value: unknown,
  isVisibleType: (fqn: string) => boolean,
) {
  const type = typeof value;
  switch (type) {
    case 'object':
      if (value == null) {
        return JSON.stringify(value);
      }

      if (Array.isArray(value)) {
        return 'an array';
      }

      const fqn = jsiiTypeFqn(value as object, isVisibleType);
      if (fqn != null && fqn !== EMPTY_OBJECT_FQN) {
        return `an instance of ${fqn}`;
      }

      const ctorName = (value as object).constructor.name;
      if (ctorName != null && ctorName !== Object.name) {
        return `an instance of ${ctorName}`;
      }

      return `an object`;

    case 'undefined':
      return type;

    case 'boolean':
    case 'function':
    case 'number':
    case 'string':
    case 'bigint':
    case 'symbol':
    default:
      return `a ${type}`;
  }
}
