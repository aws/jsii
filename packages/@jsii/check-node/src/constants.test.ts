import { NodeRelease } from './constants';

describe('before EOL', () => {
  test('supported release', () => {
    const endOfLife = new Date(Date.now() + 31 * 86_400_000);
    const subject = new NodeRelease(42, { endOfLife });

    expect(subject).toMatchObject({
      supported: true,
      deprecated: false,
      endOfLife: false,
      endOfLifeDate: endOfLife,
      endOfJsiiSupportDate: datePlusMonth(endOfLife, 6),
      untested: false,
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
      endOfJsiiSupportDate: datePlusMonth(endOfLife, 6),
      untested: false,
      supported: true,
      supportedRange: expect.objectContaining({ raw: '^42.1337.0' }),
    });
  });
});

test('untested release', () => {
  const endOfLife = new Date(Date.now() + 31 * 86_400_000);
  const subject = new NodeRelease(42, { endOfLife, untested: true });

  expect(subject).toMatchObject({
    supported: false,
    deprecated: false,
    endOfLife: false,
    endOfLifeDate: endOfLife,
    endOfJsiiSupportDate: datePlusMonth(endOfLife, 6),
    untested: true,
    supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
  });
});

describe('deprecated', () => {
  test('after EOL, before EOS', () => {
    const endOfLife = new Date(Date.now() - 30 * 86_400_000);
    const endOfJsiiSupport = new Date(Date.now() + 30 * 86_400_000);
    const subject = new NodeRelease(42, {
      endOfLife,
      endOfJsiiSupport,
    });

    expect(subject).toMatchObject({
      supported: true,
      deprecated: true,
      endOfLife: true,
      endOfLifeDate: endOfLife,
      endOfJsiiSupportDate: endOfJsiiSupport,
      untested: false,
      supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
    });
  });

  test('Within default EOS time', () => {
    const endOfLife = new Date(Date.now() - 30 * 86_400_000);
    const subject = new NodeRelease(42, { endOfLife });

    expect(subject).toMatchObject({
      supported: true,
      deprecated: true,
      endOfLife: true,
      endOfLifeDate: endOfLife,
      endOfJsiiSupportDate: datePlusMonth(endOfLife, 6),
      untested: false,
      supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
    });
  });
});

describe('EOS', () => {
  test('EOS release', () => {
    const endOfLife = new Date(Date.now() - 30 * 86_400_000);
    const endOfJsiiSupport = new Date(Date.now() - 10 * 86_400_000);
    const subject = new NodeRelease(42, {
      endOfLife,
      endOfJsiiSupport,
    });

    expect(subject).toMatchObject({
      supported: false,
      endOfLife: true,
      deprecated: false,
      endOfLifeDate: endOfLife,
      endOfJsiiSupportDate: endOfJsiiSupport,
      untested: false,
      supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
    });
  });

  test('EOS default time frame', () => {
    const endOfLife = new Date(Date.now() - 200 * 86_400_000);
    const subject = new NodeRelease(42, { endOfLife });

    expect(subject).toMatchObject({
      supported: false,
      endOfLife: true,
      deprecated: false,
      endOfLifeDate: endOfLife,
      endOfJsiiSupportDate: datePlusMonth(endOfLife, 6),
      untested: false,
      supportedRange: expect.objectContaining({ raw: '^42.0.0' }),
    });
  });
});

function datePlusMonth(date: Date, months: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + months, date.getDate());
}
