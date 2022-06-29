import * as spec from '@jsii/spec';

import { ObjectTable } from './objects';
import {
  SERIALIZERS,
  SerializerHost,
  SerializationClass,
  serializationType,
} from './serialization';

const findSymbol: jest.MockedFn<SerializerHost['findSymbol']> = jest
  .fn()
  .mockName('SerializerHost.findSymbol');
const lookupType: jest.MockedFn<SerializerHost['lookupType']> = jest
  .fn()
  .mockName('SerializerHost.lookupType');

const objects = new ObjectTable(lookupType);
const host: SerializerHost = {
  debug: () => void undefined,
  findSymbol,
  lookupType,
  objects,
  recurse: (x, type) => {
    const errors = new Array<any>();
    for (const { serializationClass, typeRef } of serializationType(
      type,
      lookupType,
    )) {
      try {
        return SERIALIZERS[serializationClass].deserialize(x, typeRef, host);
      } catch (error: any) {
        errors.push(error);
      }
    }
    if (errors.length === 1) {
      throw errors[0];
    } else {
      throw new Error(
        `Unable to serialize value:\n- ${errors
          .map((e) => e.message)
          .join('\n- ')}`,
      );
    }
  },
};

describe(SerializationClass.Array, () => {
  const arrayType: spec.OptionalValue = {
    optional: false,
    type: {
      collection: {
        kind: spec.CollectionKind.Array,
        elementtype: { primitive: spec.PrimitiveType.Number },
      },
    },
  };

  test('when provided with a string', () => {
    const arraySerializer = SERIALIZERS[SerializationClass.Array];
    expect(() =>
      arraySerializer.serialize(
        "I'm array-like, but not quite an array",
        arrayType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected array type, got \\"I'm array-like, but not quite an array\\""`,
    );
  });

  test('when provided with a number', () => {
    const arraySerializer = SERIALIZERS[SerializationClass.Array];
    expect(() =>
      arraySerializer.serialize(1337, arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(`"Expected array type, got 1337"`);
  });

  test('when provided with an object', () => {
    const arraySerializer = SERIALIZERS[SerializationClass.Array];
    expect(() =>
      arraySerializer.serialize(
        { this: ['is', 'not', 'an', 'Array'] },
        arrayType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected array type, got {\\"this\\":[\\"is\\",\\"not\\",\\"an\\",\\"Array\\"]}"`,
    );
  });

  test('when provided with undefined', () => {
    const arraySerializer = SERIALIZERS[SerializationClass.Array];
    expect(() =>
      arraySerializer.serialize(undefined, arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'undefined' where a non-optional 'array<number>' value was expected"`,
    );
  });

  test('when provided with null', () => {
    const arraySerializer = SERIALIZERS[SerializationClass.Array];
    expect(() =>
      arraySerializer.serialize(null, arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'null' where a non-optional 'array<number>' value was expected"`,
    );
  });

  test('when provided with an array including a bad value', () => {
    const arraySerializer = SERIALIZERS[SerializationClass.Array];
    expect(() =>
      arraySerializer.serialize(['Not a number'], arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected a number, got \\"Not a number\\" (string)"`,
    );
  });
});
