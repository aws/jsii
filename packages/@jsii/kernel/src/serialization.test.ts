import { CANONICAL_ANY, OptionalValue, PrimitiveType } from '@jsii/spec';

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
