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
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is a string
      │      "I'm array-like, but not quite an array"
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an array
              ╰── 🛑 Failing value is a string
                     "I'm array-like, but not quite an array"
    `);
  });

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, arrayType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an array
              ╰── 🛑 Failing value is a number
                     1337
    `);
  });

  test('when provided with a date', () => {
    expect(() =>
      process(host, 'serialize', new Date(65_535), arrayType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is an instance of Date
      │      1970-01-01T00:01:05.535Z
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an array
              ╰── 🛑 Failing value is an instance of Date
                     1970-01-01T00:01:05.535Z
    `);
  });

  test('when provided with an object', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        arrayType,
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an array
              ╰── 🛑 Failing value is an object
                     { this: [Array] }
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, arrayType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is undefined
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, arrayType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is null
    `);
  });

  test('when provided with an array including a bad value', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], arrayType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as array<number>
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Unable to serialize value at index 0 as number
              ├── 🛑 Failing value is a string
              │      'Not a number'
              ╰── 🔍 Failure reason(s):
                  ╰─ [0] Value is not a number
                      ╰── 🛑 Failing value is a string
                             'Not a number'
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
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as date
      ├── 🛑 Failing value is a string
      │      "I'm array-like, but not quite an array"
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an instance of Date
              ╰── 🛑 Failing value is a string
                     "I'm array-like, but not quite an array"
    `);
  });

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, dateType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as date
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an instance of Date
              ╰── 🛑 Failing value is a number
                     1337
    `);
  });

  test('when provided with an object', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        dateType,
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as date
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an instance of Date
              ╰── 🛑 Failing value is an object
                     { this: [Array] }
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, dateType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as date
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is undefined
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, dateType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as date
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is null
    `);
  });

  test('when provided with an array', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], dateType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as date
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an instance of Date
              ╰── 🛑 Failing value is an array
                     [ 'Not a number' ]
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
    expect(() => process(host, 'serialize', undefined, jsonType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as json
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is undefined
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, jsonType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as json
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is null
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
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as map<number>
      ├── 🛑 Failing value is a string
      │      "I'm array-like, but not quite an array"
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an object
              ╰── 🛑 Failing value is a string
                     "I'm array-like, but not quite an array"
    `);
  });

  test('when provided with a number', () => {
    expect(() => process(host, 'serialize', 1337, mapType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as map<number>
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not an object
              ╰── 🛑 Failing value is a number
                     1337
    `);
  });

  test('when provided with an object with invalid values', () => {
    expect(() =>
      process(
        host,
        'serialize',
        { this: ['is', 'not', 'an', 'Array'] },
        mapType,
        `of test`,
      ),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as map<number>
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Unable to serialize value of key "this" as number
              ├── 🛑 Failing value is an array
              │      [ 'is', 'not', 'an', 'Array' ]
              ╰── 🔍 Failure reason(s):
                  ╰─ [0] Value is not a number
                      ╰── 🛑 Failing value is an array
                             [ 'is', 'not', 'an', 'Array' ]
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, mapType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as map<number>
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is undefined
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, mapType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as map<number>
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is null
    `);
  });

  test('when provided with an array', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], mapType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as map<number>
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is an array
              ╰── 🛑 Failing value is an array
                     [ 'Not a number' ]
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
      Unable to serialize value of test as string
      ├── 🛑 Failing value is a number
      │      1337
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not a string
              ╰── 🛑 Failing value is a number
                     1337
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
      Unable to serialize value of test as string
      ├── 🛑 Failing value is an object
      │      { this: [Array] }
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not a string
              ╰── 🛑 Failing value is an object
                     { this: [Array] }
    `);
  });

  test('when provided with undefined', () => {
    expect(() => process(host, 'serialize', undefined, stringType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as string
      ├── 🛑 Failing value is undefined
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is undefined
    `);
  });

  test('when provided with null', () => {
    expect(() => process(host, 'serialize', null, stringType, `of test`))
      .toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as string
      ├── 🛑 Failing value is null
      ╰── 🔍 Failure reason(s):
          ╰─ [0] A value is required (type is non-optional)
              ╰── 🛑 Failing value is null
    `);
  });

  test('when provided with an array', () => {
    expect(() =>
      process(host, 'serialize', ['Not a number'], stringType, `of test`),
    ).toThrowErrorMatchingInlineSnapshot(`
      Unable to serialize value of test as string
      ├── 🛑 Failing value is an array
      │      [ 'Not a number' ]
      ╰── 🔍 Failure reason(s):
          ╰─ [0] Value is not a string
              ╰── 🛑 Failing value is an array
                     [ 'Not a number' ]
    `);
  });
});
