import { OptionalValue, PrimitiveType } from '@jsii/spec';
import { ObjectTable } from '../lib/objects';
import {
  SerializationClass,
  SerializerHost,
  SERIALIZERS,
} from '../lib/serialization';

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

describe(SerializationClass.Scalar, () => {
  const scalarSerializer = SERIALIZERS[SerializationClass.Scalar];
  const lookupType: SerializerHost['lookupType'] = jest
    .fn()
    .mockName('host.lookupType');
  const host: SerializerHost = {
    debug: jest.fn().mockName('host.debug'),
    findSymbol: jest.fn().mockName('host.findSymbol'),
    lookupType,
    objects: new ObjectTable(lookupType),
    recurse: jest.fn().mockName('host.recurse'),
  };

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
        ).toThrow(/Encountered unexpected `void` type/));
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
          ).toThrow(`Expected a ${example.name}, got {`);
        });

        for (const validValue of example.validValues) {
          test(`accepts: ${validValue}`, () =>
            expect(
              scalarSerializer.deserialize(validValue, example.type, host),
            ).toBe(validValue));
        }

        const invalidValues = scalarTypes
          .filter(t => t.name !== example.name)
          .map(t => t.validValues)
          .reduce((acc, elt) => [...acc, ...elt], new Array<any>());
        for (const invalidValue of invalidValues) {
          test(`rejects: ${invalidValue}`, () =>
            expect(() =>
              scalarSerializer.deserialize(invalidValue, example.type, host),
            ).toThrow(
              `Expected a ${example.name}, got ${JSON.stringify(
                invalidValue,
              )} (${typeof invalidValue})`,
            ));
        }
      });
    }
  });
});
