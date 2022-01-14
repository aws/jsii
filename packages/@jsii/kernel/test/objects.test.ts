import { ObjectTable } from '../lib/objects';

const mockResolve = jest.fn();

test('can spread registered objects without consequences', () => {
  const subject = new ObjectTable(mockResolve);

  const obj = { foo: 'bar', baz: 1337 };
  const objRef = subject.registerObject(obj, 'Object');

  const copy = { ...obj, foo: undefined, baz: undefined };
  const copyRef = subject.registerObject(copy, 'Object');

  expect(objRef).not.toEqual(copyRef);
});

test('registered objects have clean JSON.Stringify', () => {
  const subject = new ObjectTable(mockResolve);

  const obj = { foo: 'bar', baz: 1337 };
  const expected = JSON.stringify(obj);

  subject.registerObject(obj, 'Object');

  expect(JSON.stringify(obj)).toEqual(expected);
});
