import * as spec from '@jsii/spec';
import { CollectionKind } from '@jsii/spec';

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
const isVisibleType: jest.MockedFn<SerializerHost['isVisibleType']> = jest
  .fn()
  .mockName('SerializerHost.isVisibleType');
const lookupType: jest.MockedFn<SerializerHost['lookupType']> = jest
  .fn()
  .mockName('SerializerHost.lookupType');

const objects = new ObjectTable(lookupType);
const host: SerializerHost = {
  debug: () => void undefined,
  findSymbol,
  isVisibleType,
  lookupType,
  objects,
};

describe('serialize errors', () => {
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

    test('when passed a string', () => {
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

    test('when passed a number', () => {
      expect(() => process(host, 'serialize', 1337, arrayType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as array<number>
              ├── 🛑 Failing value is a number
              │      1337
              ╰── 🔍 Failure reason(s):
                  ╰─ Value is not an array
          `);
    });

    test('when passed a date', () => {
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

    test('when passed an object', () => {
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

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, arrayType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as array<number>
              ├── 🛑 Failing value is undefined
              ╰── 🔍 Failure reason(s):
                  ╰─ A value is required (type is non-optional)
          `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'serialize', null, arrayType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as array<number>
              ├── 🛑 Failing value is null
              ╰── 🔍 Failure reason(s):
                  ╰─ A value is required (type is non-optional)
          `);
    });

    test('when passed an array including a bad value', () => {
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

    test('when passed a string', () => {
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

    test('when passed a number', () => {
      expect(() => process(host, 'serialize', 1337, dateType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as date
              ├── 🛑 Failing value is a number
              │      1337
              ╰── 🔍 Failure reason(s):
                  ╰─ Value is not an instance of Date
          `);
    });

    test('when passed an object', () => {
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

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, dateType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as date
              ├── 🛑 Failing value is undefined
              ╰── 🔍 Failure reason(s):
                  ╰─ A value is required (type is non-optional)
          `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'serialize', null, dateType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as date
              ├── 🛑 Failing value is null
              ╰── 🔍 Failure reason(s):
                  ╰─ A value is required (type is non-optional)
          `);
    });

    test('when passed an array', () => {
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

  describe(SerializationClass.Enum, () => {
    const ENUM_TYPE_FQN = 'phony.module.EnumType';
    const ENUM_TYPE: spec.EnumType = {
      assembly: 'phony',
      fqn: ENUM_TYPE_FQN,
      kind: spec.TypeKind.Enum,
      members: [],
      name: 'EnumType',
      namespace: 'module',
    };
    const ENUM_MAP = {} as const;
    const enumType: spec.OptionalValue = {
      optional: false,
      type: { fqn: ENUM_TYPE_FQN },
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(ENUM_TYPE_FQN);
        return ENUM_TYPE;
      });
      findSymbol.mockImplementation((fqn) => {
        expect(fqn).toBe(ENUM_TYPE_FQN);
        return ENUM_MAP;
      });
      done();
    });

    test('when passed a string that is not in the enum', () => {
      expect(() =>
        process(
          host,
          'serialize',
          "I'm array-like, but not quite an array",
          enumType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not present in enum phony.module.EnumType
      `);
    });

    test('when passed a number that is not in the enum', () => {
      expect(() => process(host, 'serialize', 1337, enumType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not present in enum phony.module.EnumType
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(host, 'serialize', new Date(65_535), enumType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string or number
      `);
    });

    test('when passed an object', () => {
      expect(() =>
        process(
          host,
          'serialize',
          { this: ['is', 'not', 'an', 'Array'] },
          enumType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string or number
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, enumType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'serialize', null, enumType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(host, 'serialize', ['Not a number'], enumType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.EnumType
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string or number
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

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, jsonType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as json
              ├── 🛑 Failing value is undefined
              ╰── 🔍 Failure reason(s):
                  ╰─ A value is required (type is non-optional)
          `);
    });

    test('when passed null', () => {
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
    test('when passed a string', () => {
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

    test('when passed a number', () => {
      expect(() => process(host, 'serialize', 1337, mapType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
              Dummy value: Unable to serialize value as map<number>
              ├── 🛑 Failing value is a number
              │      1337
              ╰── 🔍 Failure reason(s):
                  ╰─ Value is not an object
          `);
    });

    test('when passed an object with invalid values', () => {
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

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, mapType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as map<number>
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'serialize', null, mapType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as map<number>
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(host, 'serialize', ['Not a number'], mapType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as map<number>
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is an array
      `);
    });
  });

  describe(SerializationClass.ReferenceType, () => {
    const TYPE_FQN = 'phony.module.UsedType';
    const TYPE: spec.ClassType = {
      assembly: 'phony',
      fqn: TYPE_FQN,
      kind: spec.TypeKind.Class,
      name: 'UsedType',
    };
    const referenceType: spec.OptionalValue = {
      optional: false,
      type: { fqn: TYPE_FQN },
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(TYPE_FQN);
        return TYPE;
      });
      done();
    });

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'serialize',
          "I'm array-like, but not quite an array",
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.UsedType
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a number', () => {
      expect(() =>
        process(host, 'serialize', 1337, referenceType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.UsedType
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(
          host,
          'serialize',
          new Date(65_535),
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.UsedType
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ Value is a Date
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, referenceType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.UsedType
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() =>
        process(host, 'serialize', null, referenceType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.UsedType
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(
          host,
          'serialize',
          ['Not a number'],
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.UsedType
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
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

    test('when passed a number', () => {
      expect(() => process(host, 'serialize', 1337, stringType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as string
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string
      `);
    });

    test('when passed an object', () => {
      expect(() =>
        process(
          host,
          'serialize',
          { this: ['is', 'not', 'an', 'Array'] },
          stringType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as string
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, stringType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as string
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'serialize', null, stringType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as string
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(host, 'serialize', ['Not a number'], stringType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as string
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string
      `);
    });
  });

  describe(SerializationClass.Struct, () => {
    const STRUCT_FQN = 'phony.module.Struct';
    const STRUCT_TYPE: spec.InterfaceType = {
      assembly: 'phony',
      fqn: STRUCT_FQN,
      kind: spec.TypeKind.Interface,
      name: 'Struct',
      datatype: true,
      properties: [],
    };
    const structType: spec.OptionalValue = {
      optional: false,
      type: {
        fqn: STRUCT_FQN,
      },
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(STRUCT_FQN);
        return STRUCT_TYPE;
      });
      done();
    });

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'serialize',
          "I'm array-like, but not quite an array",
          structType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.Struct
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a number', () => {
      expect(() => process(host, 'serialize', 1337, structType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.Struct
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(host, 'serialize', new Date(65_535), structType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.Struct
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'serialize', undefined, structType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.Struct
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'serialize', null, structType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.Struct
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(host, 'serialize', ['Not a number'], structType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as phony.module.Struct
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is an array
      `);
    });
  });

  describe('The impossible type union', () => {
    const ENUM_FQN = 'phony.module.Enum';

    const unionType: spec.OptionalValue = {
      optional: false,
      type: {
        union: {
          types: [
            // { primitive: spec.PrimitiveType.Any }, // Would allow ANYTHING, so we can't have that
            { primitive: spec.PrimitiveType.Boolean },
            { primitive: spec.PrimitiveType.Date },
            // { primitive: spec.PrimitiveType.Json }, // Would allow nearly anything, so we can't have that
            { primitive: spec.PrimitiveType.Number },
            { primitive: spec.PrimitiveType.String },
            {
              collection: {
                kind: CollectionKind.Array,
                elementtype: { primitive: spec.PrimitiveType.Any },
              },
            },
            {
              collection: {
                kind: CollectionKind.Map,
                elementtype: { primitive: spec.PrimitiveType.Boolean },
              },
            },
            { fqn: ENUM_FQN },
          ],
        },
      },
    };

    const ENUM_TYPE: spec.EnumType = {
      assembly: 'phony',
      fqn: 'phony.module.Enum',
      kind: spec.TypeKind.Enum,
      name: 'Enum',
      namespace: 'module',
      members: [],
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(ENUM_FQN);
        return ENUM_TYPE;
      });
      done();
    });

    test('when passed and invalid value', () => {
      expect(() => {
        process(host, 'serialize', { not: 'valid' }, unionType, 'dummy value');
      }).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to serialize value as boolean | date | number | string | array<any> | map<boolean> | phony.module.Enum
        ├── 🛑 Failing value is an object
        │      { not: 'valid' }
        ╰── 🔍 Failure reason(s):
            ├─ [as date] Value is not an instance of Date
            ├─ [as boolean] Value is not a boolean
            ├─ [as number] Value is not a number
            ├─ [as string] Value is not a string
            ├─ [as phony.module.Enum] Value is not a string or number
            ├─ [as array<any>] Value is not an array
            ╰─ [as map<boolean>] Key 'not': Unable to serialize value as boolean
                ├── 🛑 Failing value is a string
                │      'valid'
                ╰── 🔍 Failure reason(s):
                    ╰─ Value is not a boolean
      `);
    });
  });
});

describe('deserialize errors', () => {
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

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          "I'm array-like, but not quite an array",
          arrayType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an array
      `);
    });

    test('when passed a number', () => {
      expect(() => process(host, 'deserialize', 1337, arrayType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an array
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          new Date(65_535),
          arrayType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an array
      `);
    });

    test('when passed an object', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is', 'not', 'an', 'Array'] },
          arrayType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an array
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, arrayType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'deserialize', null, arrayType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array including a bad value', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          ['Not a number'],
          arrayType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as array<number>
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Index 0: Unable to deserialize value as number
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

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          "I'm array-like, but not quite an array",
          dateType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as date
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.date" key
      `);
    });

    test('when passed a number', () => {
      expect(() => process(host, 'deserialize', 1337, dateType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as date
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.date" key
      `);
    });

    test('when passed an object', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is', 'not', 'an', 'Array'] },
          dateType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as date
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.date" key
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, dateType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as date
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'deserialize', null, dateType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as date
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(host, 'deserialize', ['Not a number'], dateType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as date
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.date" key
      `);
    });
  });

  describe(SerializationClass.Enum, () => {
    const ENUM_TYPE_FQN = 'phony.module.EnumType';
    const ENUM_TYPE: spec.EnumType = {
      assembly: 'phony',
      fqn: ENUM_TYPE_FQN,
      kind: spec.TypeKind.Enum,
      members: [],
      name: 'EnumType',
      namespace: 'module',
    };
    const ENUM_MAP = {} as const;
    const enumType: spec.OptionalValue = {
      optional: false,
      type: { fqn: ENUM_TYPE_FQN },
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(ENUM_TYPE_FQN);
        return ENUM_TYPE;
      });
      findSymbol.mockImplementation((fqn) => {
        expect(fqn).toBe(ENUM_TYPE_FQN);
        return ENUM_MAP;
      });
      done();
    });

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          "I'm array-like, but not quite an array",
          enumType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.enum" key
      `);
    });

    test('when passed a number', () => {
      expect(() => process(host, 'deserialize', 1337, enumType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.enum" key
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(host, 'deserialize', new Date(65_535), enumType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.enum" key
      `);
    });

    test('when passed an object', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is', 'not', 'an', 'Array'] },
          enumType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.enum" key
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, enumType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'deserialize', null, enumType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array including a bad value', () => {
      expect(() =>
        process(host, 'deserialize', ['Not a number'], enumType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.EnumType
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.enum" key
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

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, jsonType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as json
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'deserialize', null, jsonType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as json
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
    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          "I'm array-like, but not quite an array",
          mapType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as map<number>
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a number', () => {
      expect(() => process(host, 'deserialize', 1337, mapType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as map<number>
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed an object with invalid values', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is', 'not', 'an', 'Array'] },
          mapType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as map<number>
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Key 'this': Unable to deserialize value as number
                ├── 🛑 Failing value is an array
                │      [ 'is', 'not', 'an', 'Array' ]
                ╰── 🔍 Failure reason(s):
                    ╰─ Value is not a number
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, mapType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as map<number>
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() => process(host, 'deserialize', null, mapType, `dummy value`))
        .toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as map<number>
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(host, 'deserialize', ['Not a number'], mapType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as map<number>
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is an array
      `);
    });
  });

  describe(SerializationClass.ReferenceType, () => {
    const TYPE_FQN = 'phony.module.UsedType';
    const TYPE: spec.ClassType = {
      assembly: 'phony',
      fqn: TYPE_FQN,
      kind: spec.TypeKind.Class,
      name: 'UsedType',
      namespace: 'module',
    };
    const referenceType: spec.OptionalValue = {
      optional: false,
      type: { fqn: TYPE_FQN },
    };

    const BAD_TYPE_FQN = 'not.the.correct.TypeAtAll';
    const BAD_TYPE: spec.Type = {
      assembly: 'not',
      fqn: TYPE_FQN,
      kind: spec.TypeKind.Interface,
      name: 'TypeAtAll',
      namespace: 'the.correct',
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect([TYPE_FQN, BAD_TYPE_FQN]).toContain(fqn);
        return fqn === TYPE_FQN ? TYPE : BAD_TYPE;
      });
      done();
    });

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          "I'm array-like, but not quite an array",
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.byref" key
      `);
    });

    test('when passed a number', () => {
      expect(() =>
        process(host, 'deserialize', 1337, referenceType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.byref" key
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          new Date(65_535),
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.byref" key
      `);
    });

    test('when passed an object (not a by-ref value)', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is', 'not', 'an', 'Array'] },
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.byref" key
      `);
    });

    test('when passed an object of thre wrong type', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          objects.registerObject(Object.create(null), BAD_TYPE_FQN),
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is an object
        │      {
        │        '$jsii.byref': 'not.the.correct.TypeAtAll@10000',
        │        '$jsii.interfaces': undefined
        │      }
        ╰── 🔍 Failure reason(s):
            ╰─ Object of type 'not.the.correct.TypeAtAll' is not convertible to phony.module.UsedType
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, referenceType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() =>
        process(host, 'deserialize', null, referenceType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          ['Not a number'],
          referenceType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.UsedType
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value does not have the "$jsii.byref" key
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

    test('when passed a number', () => {
      expect(() =>
        process(host, 'deserialize', 1337, stringType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as string
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string
      `);
    });

    test('when passed an object', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is', 'not', 'an', 'Array'] },
          stringType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as string
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, stringType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as string
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() =>
        process(host, 'deserialize', null, stringType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as string
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          ['Not a number'],
          stringType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as string
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not a string
      `);
    });
  });

  describe(SerializationClass.Struct, () => {
    const STRUCT_FQN = 'phony.module.Struct';
    const STRUCT_TYPE: spec.InterfaceType = {
      assembly: 'phony',
      fqn: STRUCT_FQN,
      kind: spec.TypeKind.Interface,
      name: 'Struct',
      datatype: true,
      properties: [
        {
          name: 'this',
          type: {
            collection: {
              kind: spec.CollectionKind.Array,
              elementtype: { primitive: spec.PrimitiveType.String },
            },
          },
          optional: true,
        },
        {
          name: 'that',
          type: { primitive: spec.PrimitiveType.Number },
        },
      ],
    };
    const structType: spec.OptionalValue = {
      optional: false,
      type: {
        fqn: STRUCT_FQN,
      },
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(STRUCT_FQN);
        return STRUCT_TYPE;
      });
      done();
    });

    test('when passed a string', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          "I'm array-like, but not quite an array",
          structType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is a string
        │      "I'm array-like, but not quite an array"
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a number', () => {
      expect(() =>
        process(host, 'deserialize', 1337, structType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is a number
        │      1337
        ╰── 🔍 Failure reason(s):
            ╰─ Value is not an object
      `);
    });

    test('when passed a date', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          new Date(65_535),
          structType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is an instance of Date
        │      1970-01-01T00:01:05.535Z
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed undefined', () => {
      expect(() =>
        process(host, 'deserialize', undefined, structType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is undefined
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed null', () => {
      expect(() =>
        process(host, 'deserialize', null, structType, `dummy value`),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is null
        ╰── 🔍 Failure reason(s):
            ╰─ A value is required (type is non-optional)
      `);
    });

    test('when passed an array', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          ['Not a number'],
          structType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is an array
        │      [ 'Not a number' ]
        ╰── 🔍 Failure reason(s):
            ╰─ Value is an array (varargs may have been incorrectly supplied)
      `);
    });

    test('when passed an object missing a required property', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { this: ['is not a serialized', 'struct'] },
          structType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is an object
        │      { this: [Array] }
        ╰── 🔍 Failure reason(s):
            ╰─ Missing required properties for phony.module.Struct: 'that'
      `);
    });

    test('when passed an object with a bad property value', () => {
      expect(() =>
        process(
          host,
          'deserialize',
          { that: 'is not a number' },
          structType,
          `dummy value`,
        ),
      ).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as phony.module.Struct
        ├── 🛑 Failing value is an object
        │      { that: 'is not a number' }
        ╰── 🔍 Failure reason(s):
            ╰─ Key 'that': Unable to deserialize value as number
                ├── 🛑 Failing value is a string
                │      'is not a number'
                ╰── 🔍 Failure reason(s):
                    ╰─ Value is not a number
      `);
    });
  });

  describe('The impossible type union', () => {
    const ENUM_FQN = 'phony.module.Enum';

    const unionType: spec.OptionalValue = {
      optional: false,
      type: {
        union: {
          types: [
            // { primitive: spec.PrimitiveType.Any }, // Would allow ANYTHING, so we can't have that
            { primitive: spec.PrimitiveType.Boolean },
            { primitive: spec.PrimitiveType.Date },
            // { primitive: spec.PrimitiveType.Json }, // Would allow nearly anything, so we can't have that
            { primitive: spec.PrimitiveType.Number },
            { primitive: spec.PrimitiveType.String },
            {
              collection: {
                kind: CollectionKind.Array,
                elementtype: { primitive: spec.PrimitiveType.Any },
              },
            },
            {
              collection: {
                kind: CollectionKind.Map,
                elementtype: { primitive: spec.PrimitiveType.Boolean },
              },
            },
            { fqn: ENUM_FQN },
          ],
        },
      },
    };

    const ENUM_TYPE: spec.EnumType = {
      assembly: 'phony',
      fqn: 'phony.module.Enum',
      kind: spec.TypeKind.Enum,
      name: 'Enum',
      namespace: 'module',
      members: [],
    };

    beforeEach((done) => {
      lookupType.mockImplementation((fqn) => {
        expect(fqn).toBe(ENUM_FQN);
        return ENUM_TYPE;
      });
      done();
    });

    test('when passed and invalid value', () => {
      expect(() => {
        process(
          host,
          'deserialize',
          { not: 'valid' },
          unionType,
          'dummy value',
        );
      }).toThrowErrorMatchingInlineSnapshot(`
        Dummy value: Unable to deserialize value as boolean | date | number | string | array<any> | map<boolean> | phony.module.Enum
        ├── 🛑 Failing value is an object
        │      { not: 'valid' }
        ╰── 🔍 Failure reason(s):
            ├─ [as date] Value does not have the "$jsii.date" key
            ├─ [as boolean] Value is not a boolean
            ├─ [as number] Value is not a number
            ├─ [as string] Value is not a string
            ├─ [as phony.module.Enum] Value does not have the "$jsii.enum" key
            ├─ [as array<any>] Value is not an array
            ╰─ [as map<boolean>] Key 'not': Unable to deserialize value as boolean
                ├── 🛑 Failing value is a string
                │      'valid'
                ╰── 🔍 Failure reason(s):
                    ╰─ Value is not a boolean
      `);
    });
  });
});
