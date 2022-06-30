import * as spec from '@jsii/spec';

import { ObjectTable } from './objects';
import { process, SerializerHost, SerializationClass } from './serialization';

// Remove unnecessary double-quoting of snapshots in this file
expect.addSnapshotSerializer({
  test: (value) => typeof value === 'string',
  print: (value) => value as string,
});

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
    expect(() =>
      process(
        host,
        'serialize',
        "I'm array-like, but not quite an array",
        arrayType,
        `dummy value`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is a string
      │      "I'm array-like, but not quite an array"
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an array
    `);
  });

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, arrayType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an array
    `);
  });

  test('when provided with a date', () => {
    expect(() =>
      process(host, 'serialize', new Date(65_535), arrayType, `dummy value`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is an instance of Date
      │      1970-01-01T00:01:05.535Z
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an array
    `);
  });

  test('when provided with an object', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        arrayType,
        `dummy value`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an array
    `);
  });

  test('when provided with undefined', () => {
    expect(() =>
      process(host, 'serialize', undefined, arrayType, `dummy value`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, arrayType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with an array including a bad value', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], arrayType, `dummy value`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as array<number>
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ Index 0: Unable to serialize value as number
              ├── 🛑 Failing value is a string
              │      'Not a number'
              ╰── 🔍 Failure reason(s):
                  ╰─ Value is not a number
    `);
  });
});

describe(SerializationClass.Date, () => {
  const dateType: spec.OptionalValue = {
    optional: false,
    type: {
      primitive: spec.PrimitiveType.Date,
    },
  };

  test('when provided with a string', () => {
    expect(() =>
      process(
        host,
        'serialize',
        "I'm array-like, but not quite an array",
        dateType,
        `dummy value`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as date
      ├── 🛑 Failing value is a string
      │      "I'm array-like, but not quite an array"
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an instance of Date
    `);
  });

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, dateType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as date
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an instance of Date
    `);
  });

  test('when provided with an object', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        dateType,
        `dummy value`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as date
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an instance of Date
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, dateType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as date
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, dateType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as date
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with an array', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], dateType, `dummy value`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as date
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an instance of Date
    `);
  });
});

describe(SerializationClass.Json, () => {
  const jsonType: spec.OptionalValue = {
    optional: false,
    type: {
      primitive: spec.PrimitiveType.Json,
    },
  };

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, jsonType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as json
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, jsonType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as json
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
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
  test('when provided with a string', () => {
    expect(() =>
      process(
        host,
        'serialize',
        "I'm array-like, but not quite an array",
        mapType,
        `dummy value`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as map<number>
      ├── 🛑 Failing value is a string
      │      "I'm array-like, but not quite an array"
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an object
    `);
  });

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, mapType, `dummy value`))
      .toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as map<number>
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not an object
    `);
  });

  test('when provided with an object with invalid values', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        mapType,
        `dummy value`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Dummy value: Unable to serialize value as map<number>
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ Key 'this': Unable to serialize value as number
              ├── 🛑 Failing value is an array
              │      [ 'is', 'not', 'an', 'Array' ]
              ╰── 🔍 Failure reason(s):
                  ╰─ Value is not a number
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, mapType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as map<number>
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, mapType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as map<number>
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with an array', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], mapType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as map<number>
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ Value is an array
    `);
  });
});

describe(SerializationClass.Scalar, () => {
  const stringType: spec.OptionalValue = {
    optional: false,
    type: {
      primitive: spec.PrimitiveType.String,
    },
  };

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, stringType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as string
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not a string
    `);
  });

  test('when provided with an object', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        stringType,
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as string
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not a string
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, stringType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as string
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, stringType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as string
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ A value is required (type is non-optional)
    `);
  });

  test('when provided with an array', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], stringType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Of test: Unable to serialize value as string
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ Value is not a string
    `);
  });
});
