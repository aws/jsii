import {
  CANONICAL_ANY,
  CollectionKind,
  OptionalValue,
  PrimitiveType,
} from '@jsii/spec';

import { TOKEN_REF } from './api';
import { ObjectTable } from './objects';
import {
  SerializationClass,
  SerializationError,
  SerializerHost,
  SERIALIZERS,
} from './serialization';

const TYPE_ANY: OptionalValue = { type: CANONICAL_ANY };
const TYPE_BOOLEAN: OptionalValue = {
  type: { primitive: PrimitiveType.Boolean },
};
const TYPE_NUMBER: OptionalValue = {
  type: { primitive: PrimitiveType.Number },
};
const TYPE_STRING: OptionalValue = {
  type: { primitive: PrimitiveType.String },
};
const TYPE_VOID = 'void';

const isVisibleType: SerializerHost['isVisibleType'] = jest
  .fn()
  .mockName('host.isVisibleType');
const lookupType: SerializerHost['lookupType'] = jest
  .fn()
  .mockName('host.lookupType');
const host: SerializerHost = {
  debug: jest.fn().mockName('host.debug'),
  findSymbol: jest.fn().mockName('host.findSymbol'),
  isVisibleType,
  lookupType,
  objects: new ObjectTable(lookupType),
};

describe(SerializationClass.Any, () => {
  const anySerializer = SERIALIZERS[SerializationClass.Any];
  class PrivateType {
    readonly #randomValue = Math.random();

    public random() {
      return this.#randomValue;
    }
  }

  describe(anySerializer.serialize, () => {
    test('by-value object literal', () => {
      expect(
        anySerializer.serialize({ literal: { integer: 1337 } }, TYPE_ANY, host),
      ).toEqual({ literal: { integer: 1337 } });
    });

    test('non-exported type instance', () => {
      expect(
        anySerializer.serialize(new PrivateType(), TYPE_ANY, host),
      ).toEqual({ [TOKEN_REF]: 'Object@10000' });
    });

    test('arrays', () => {
      expect(
        anySerializer.serialize(
          [{ literal: { integer: 1337 } }],
          TYPE_ANY,
          host,
        ),
      ).toEqual([{ literal: { integer: 1337 } }]);
    });
  });
});

describe(SerializationClass.Scalar, () => {
  const scalarSerializer = SERIALIZERS[SerializationClass.Scalar];

  describe(scalarSerializer.deserialize, () => {
    describe('void', () => {
      test('accepts undefined', () =>
        expect(
          scalarSerializer.deserialize(undefined, TYPE_VOID, host),
        ).toBeUndefined());

      test('accepts null', () =>
        expect(
          scalarSerializer.deserialize(null, TYPE_VOID, host),
        ).toBeUndefined());

      test('rejects any value', () =>
        expect(() =>
          scalarSerializer.deserialize('nothing!', TYPE_VOID, host),
        ).toThrow(/Encountered unexpected void type!/));
    });

    const scalarTypes = [
      { name: 'string', type: TYPE_STRING, validValues: ['This is a string!'] },
      {
        name: 'number',
        type: TYPE_NUMBER,
        validValues: [-1337, 0, Number.EPSILON],
      },
      { name: 'boolean', type: TYPE_BOOLEAN, validValues: [true, false] },
    ];
    for (const example of scalarTypes) {
      describe(example.name, () => {
        test('fails when provided an object', () => {
          expect(() =>
            scalarSerializer.deserialize(
              { 'this is not': `a ${example.name}` },
              example.type,
              host,
            ),
          ).toThrow(SerializationError);
        });

        for (const validValue of example.validValues) {
          test(`accepts: ${validValue}`, () =>
            expect(
              scalarSerializer.deserialize(validValue, example.type, host),
            ).toBe(validValue));
        }

        const invalidValues = scalarTypes
          .filter((t) => t.name !== example.name)
          .map((t) => t.validValues)
          .reduce((acc, elt) => [...acc, ...elt], new Array<any>());
        for (const invalidValue of invalidValues) {
          test(`rejects: ${invalidValue}`, () =>
            expect(() =>
              scalarSerializer.deserialize(invalidValue, example.type, host),
            ).toThrow(SerializationError));
        }
      });
    }
  });
});

describe('"__proto__" keys are rejected', () => {
  const TYPE_JSON: OptionalValue = { type: { primitive: PrimitiveType.Json } };
  const TYPE_MAP_OF_ANY: OptionalValue = {
    type: {
      collection: { kind: CollectionKind.Map, elementtype: CANONICAL_ANY },
    },
  };

  // JSON.parse creates "__proto__" as an own property, like the wire protocol does
  const withProto = () => JSON.parse('{"__proto__": {"polluted": true}}');
  const nestedProto = () =>
    JSON.parse('{"outer": {"__proto__": {"polluted": true}}}');

  afterEach(() => {
    expect(({} as any).polluted).toBeUndefined();
  });

  test.each([
    [
      'Map (wrapped)',
      SerializationClass.Map,
      () => ({ '$jsii.map': withProto() }),
      TYPE_MAP_OF_ANY,
    ],
    ['Map (unwrapped)', SerializationClass.Map, withProto, TYPE_MAP_OF_ANY],
    ['Json', SerializationClass.Json, withProto, TYPE_JSON],
    ['Json (nested)', SerializationClass.Json, nestedProto, TYPE_JSON],
    ['Any', SerializationClass.Any, withProto, TYPE_ANY],
    ['Any (nested)', SerializationClass.Any, nestedProto, TYPE_ANY],
  ] as const)('deserialize %s', (_name, cls, value, type) => {
    expect(() => SERIALIZERS[cls].deserialize(value(), type, host)).toThrow(
      /Key '__proto__' is not supported/,
    );
  });

  test.each([
    ['Map', SerializationClass.Map, TYPE_MAP_OF_ANY],
    ['Any', SerializationClass.Any, TYPE_ANY],
  ] as const)('serialize %s', (_name, cls, type) => {
    expect(() => SERIALIZERS[cls].serialize(withProto(), type, host)).toThrow(
      /Key '__proto__' is not supported/,
    );
  });

  test('other keys are still accepted', () => {
    expect(
      SERIALIZERS[SerializationClass.Json].deserialize(
        JSON.parse('{"proto": 1, "constructor": 2}'),
        TYPE_JSON,
        host,
      ),
    ).toEqual({ proto: 1, constructor: 2 });
  });
});
