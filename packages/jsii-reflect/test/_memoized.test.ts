import { TypeSystem } from '../lib';
import { memoized, memoizedWhenLocked } from '../lib/_memoized';

const accessorSpy = jest.fn(() => 'foobar');

class TestClass {
  public constructor(public readonly system: TypeSystem) {}

  public get uncached(): string {
    return accessorSpy();
  }

  @memoized
  public get cached(): string {
    return accessorSpy();
  }

  @memoizedWhenLocked
  public get cachedWhenLocked(): string {
    return accessorSpy();
  }
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop(_val: unknown) {}

describe('memoized', () => {
  beforeEach(() => {
    accessorSpy.mockClear();
  });
  const subject = new TestClass(new TypeSystem());

  test('cached property is memoized', () => {
    // Access the property twice
    noop(subject.cached);
    noop(subject.cached);

    expect(accessorSpy).toHaveBeenCalledTimes(1);
    expect(subject.cached).toBe('foobar');
  });

  test('uncached property is not memoized', () => {
    // Access the property twice
    noop(subject.uncached);
    noop(subject.uncached);

    expect(accessorSpy).toHaveBeenCalledTimes(2);
    expect(subject.uncached).toBe('foobar');
  });
});

describe('memoizedWhenLocked', () => {
  let subject: TestClass;
  beforeEach(() => {
    accessorSpy.mockClear();
    subject = new TestClass(new TypeSystem());
  });

  test('property is memoized when the typesystem is locked', () => {
    // Lock the typesystem to enable memoizing
    subject.system.lock();

    // Access the property twice
    noop(subject.cachedWhenLocked);
    noop(subject.cachedWhenLocked);

    expect(accessorSpy).toHaveBeenCalledTimes(1);
    expect(subject.cachedWhenLocked).toBe('foobar');
  });

  test('property is not memoized when the typesystem is not locked', () => {
    // Access the property twice
    noop(subject.cachedWhenLocked);
    noop(subject.cachedWhenLocked);

    expect(accessorSpy).toHaveBeenCalledTimes(2);
    expect(subject.cachedWhenLocked).toBe('foobar');
  });
});
