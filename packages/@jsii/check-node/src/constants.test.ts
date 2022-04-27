import { NodeRelease } from './constants';

test('supported release', () => {
  const endOfLife = new Date(Date.now() + 31 * 86_400_000);
  const subject = new NodeRelease(42, { endOfLife });

  expect(subject).toMatchObject({
    deprecated: false,
    endOfLife: false,
    endOfLifeDate: endOfLife,
    untested: false,
    supported: true,
    supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
  });
});

test('supported release with range', () => {
  const endOfLife = new Date(Date.now() + 31 * 86_400_000);
  const subject = new NodeRelease(42, {
    endOfLife,
    supportedRange: '^42.1337.0',
  });

  expect(subject).toMatchObject({
    deprecated: false,
    endOfLife: false,
    endOfLifeDate: endOfLife,
    untested: false,
    supported: true,
    supportedRange: expect.objectContaining({ raw: '^42.1337.0' }),
  });
});

test('untested release', () => {
  const endOfLife = new Date(Date.now() + 31 * 86_400_000);
  const subject = new NodeRelease(42, { endOfLife, untested: true });

  expect(subject).toMatchObject({
    deprecated: false,
    endOfLife: false,
    endOfLifeDate: endOfLife,
    untested: true,
    supported: false,
    supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
  });
});

test('deprecated release', () => {
  const endOfLife = new Date(Date.now() + 25 * 86_400_000);
  const subject = new NodeRelease(42, { endOfLife });

  expect(subject).toMatchObject({
    deprecated: true,
    endOfLife: false,
    endOfLifeDate: endOfLife,
    untested: false,
    supported: true,
    supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
  });
});

test('EOL release', () => {
  const endOfLife = new Date();
  const subject = new NodeRelease(42, { endOfLife });

  expect(subject).toMatchObject({
    deprecated: false,
    endOfLife: true,
    endOfLifeDate: endOfLife,
    untested: false,
    supported: false,
    supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
  });
});
