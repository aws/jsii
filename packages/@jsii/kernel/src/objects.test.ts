import { ObjectTable, jsiiTypeFqn } from './objects';

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

test('FQN resolution is not broken by inheritance relationships', () => {
  const rtti = Symbol.for('jsii.rtti');

  class Parent {
    public static readonly [rtti] = { fqn: 'phony.Parent' };
  }
  class Child extends Parent {
    public static readonly [rtti] = { fqn: 'phony.Child' };
  }

  const parent = new Parent();
  expect(jsiiTypeFqn(parent, () => true)).toBe(Parent[rtti].fqn);

  const child = new Child();
  expect(jsiiTypeFqn(child, () => true)).toBe(Child[rtti].fqn);
});
