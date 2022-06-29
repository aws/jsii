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
  const arraySerializer = SERIALIZERS[SerializationClass.Array];

  test('when provided with a string', () => {
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
    expect(() =>
      arraySerializer.serialize(1337, arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(`"Expected array type, got 1337"`);
  });

  test('when provided with a date', () => {
    expect(() =>
      arraySerializer.serialize(new Date(65_535), arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected array type, got \\"1970-01-01T00:01:05.535Z\\""`,
    );
  });

  test('when provided with an object', () => {
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
    expect(() =>
      arraySerializer.serialize(undefined, arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'undefined' where a non-optional 'array<number>' value was expected"`,
    );
  });

  test('when provided with null', () => {
    expect(() =>
      arraySerializer.serialize(null, arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'null' where a non-optional 'array<number>' value was expected"`,
    );
  });

  test('when provided with an array including a bad value', () => {
    expect(() =>
      arraySerializer.serialize(['Not a number'], arrayType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected a number, got \\"Not a number\\" (string)"`,
    );
  });
});

describe(SerializationClass.Date, () => {
  const dateType: spec.OptionalValue = {
    optional: false,
    type: {
      primitive: spec.PrimitiveType.Date,
    },
  };
  const dateSerializer = SERIALIZERS[SerializationClass.Date];

  test('when provided with a string', () => {
    expect(() =>
      dateSerializer.serialize(
        "I'm array-like, but not quite an array",
        dateType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected Date, got \\"I'm array-like, but not quite an array\\""`,
    );
  });

  test('when provided with a number', () => {
    expect(() =>
      dateSerializer.serialize(1337, dateType, host),
    ).toThrowErrorMatchingInlineSnapshot(`"Expected Date, got 1337"`);
  });

  test('when provided with an object', () => {
    expect(() =>
      dateSerializer.serialize(
        { this: ['is', 'not', 'an', 'Array'] },
        dateType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected Date, got {\\"this\\":[\\"is\\",\\"not\\",\\"an\\",\\"Array\\"]}"`,
    );
  });

  test('when provided with undefined', () => {
    expect(() =>
      dateSerializer.serialize(undefined, dateType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'undefined' where a non-optional 'date' value was expected"`,
    );
  });

  test('when provided with null', () => {
    expect(() =>
      dateSerializer.serialize(null, dateType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'null' where a non-optional 'date' value was expected"`,
    );
  });

  test('when provided with an array', () => {
    expect(() =>
      dateSerializer.serialize(['Not a number'], dateType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected Date, got [\\"Not a number\\"]"`,
    );
  });
});

describe(SerializationClass.Json, () => {
  const jsonType: spec.OptionalValue = {
    optional: false,
    type: {
      primitive: spec.PrimitiveType.Json,
    },
  };
  const jsonSerializer = SERIALIZERS[SerializationClass.Json];

  test('when provided with undefined', () => {
    expect(() =>
      jsonSerializer.serialize(undefined, jsonType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'undefined' where a non-optional 'json' value was expected"`,
    );
  });

  test('when provided with null', () => {
    expect(() =>
      jsonSerializer.serialize(null, jsonType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'null' where a non-optional 'json' value was expected"`,
    );
  });
});

describe(SerializationClass.Map, () => {
  const mapType: spec.OptionalValue = {
    optional: false,
    type: {
      collection: {
        kind: spec.CollectionKind.Map,
        elementtype: { primitive: spec.PrimitiveType.Number },
      },
    },
  };
  const mapSerializer = SERIALIZERS[SerializationClass.Map];

  test('when provided with a string', () => {
    expect(() =>
      mapSerializer.serialize(
        "I'm array-like, but not quite an array",
        mapType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected object type, got \\"I'm array-like, but not quite an array\\""`,
    );
  });

  test('when provided with a number', () => {
    expect(() =>
      mapSerializer.serialize(1337, mapType, host),
    ).toThrowErrorMatchingInlineSnapshot(`"Expected object type, got 1337"`);
  });

  test('when provided with an object with invalid values', () => {
    expect(() =>
      mapSerializer.serialize(
        { this: ['is', 'not', 'an', 'Array'] },
        mapType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected a number, got [\\"is\\",\\"not\\",\\"an\\",\\"Array\\"]"`,
    );
  });

  test('when provided with undefined', () => {
    expect(() =>
      mapSerializer.serialize(undefined, mapType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'undefined' where a non-optional 'map<number>' value was expected"`,
    );
  });

  test('when provided with null', () => {
    expect(() =>
      mapSerializer.serialize(null, mapType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'null' where a non-optional 'map<number>' value was expected"`,
    );
  });

  test('when provided with an array', () => {
    expect(() =>
      mapSerializer.serialize(['Not a number'], mapType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected a number, got \\"Not a number\\" (string)"`,
    );
  });
});

describe(SerializationClass.Scalar, () => {
  const stringType: spec.OptionalValue = {
    optional: false,
    type: {
      primitive: spec.PrimitiveType.String,
    },
  };
  const scalarSerializer = SERIALIZERS[SerializationClass.Scalar];

  test('when provided with a number', () => {
    expect(() =>
      scalarSerializer.serialize(1337, stringType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected a string, got 1337 (number)"`,
    );
  });

  test('when provided with an object', () => {
    expect(() =>
      scalarSerializer.serialize(
        { this: ['is', 'not', 'an', 'Array'] },
        stringType,
        host,
      ),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected string, got {\\"this\\":[\\"is\\",\\"not\\",\\"an\\",\\"Array\\"]}"`,
    );
  });

  test('when provided with undefined', () => {
    expect(() =>
      scalarSerializer.serialize(undefined, stringType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'undefined' where a non-optional 'string' value was expected"`,
    );
  });

  test('when provided with null', () => {
    expect(() =>
      scalarSerializer.serialize(null, stringType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Got 'null' where a non-optional 'string' value was expected"`,
    );
  });

  test('when provided with an array', () => {
    expect(() =>
      scalarSerializer.serialize(['Not a number'], stringType, host),
    ).toThrowErrorMatchingInlineSnapshot(
      `"Expected string, got [\\"Not a number\\"]"`,
    );
  });
});
