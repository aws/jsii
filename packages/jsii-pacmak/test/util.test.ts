import { AllAttemptsFailed, retry, wait } from '../lib/util';

type Waiter = typeof wait;

describe(retry, () => {
  const mockWaiter = jest.fn<ReturnType<Waiter>, Parameters<Waiter>>();

  beforeEach((done) => {
    mockWaiter.mockImplementation(() => Promise.resolve());
    done();
  });

  afterEach((done) => {
    jest.resetAllMocks();
    done();
  });

  test('throws on invalid maxTries', async () => {
    // GIVEN
    const fakeCallback = jest.fn();

    // WHEN
    const result = retry(fakeCallback, { maxAttempts: 0 }, mockWaiter);

    // THEN
    await expect(result).rejects.toThrow('maxTries must be > 0');
    expect(fakeCallback).not.toHaveBeenCalled();
  });

  test('throws on invalid backoffBaseMilliseconds', async () => {
    // GIVEN
    const fakeCallback = jest.fn();

    // WHEN
    const result = retry(
      fakeCallback,
      { backoffBaseMilliseconds: 0 },
      mockWaiter,
    );

    // THEN
    await expect(result).rejects.toThrow('backoffBaseMilliseconds must be > 0');
    expect(fakeCallback).not.toHaveBeenCalled();
  });

  test('throws on invalid backoffMultiplier', async () => {
    // GIVEN
    const fakeCallback = jest.fn();

    // WHEN
    const result = retry(fakeCallback, { backoffMultiplier: 1 }, mockWaiter);

    // THEN
    await expect(result).rejects.toThrow('backoffMultiplier must be > 1');
    expect(fakeCallback).not.toHaveBeenCalled();
  });

  test('throws when it exhausted all attempts', async () => {
    // GIVEN
    const alwaysFail = () => Promise.reject(new Error('Always'));

    // WHEN
    const result = retry(alwaysFail, {}, mockWaiter);

    // THEN
    await expect(result).rejects.toThrow(AllAttemptsFailed);
    expect(mockWaiter).toHaveBeenCalledTimes(4);
    for (let i = 0; i < 4; i++) {
      expect(mockWaiter).toHaveBeenNthCalledWith(i + 1, 150 * Math.pow(2, i));
    }
  });

  test('behaves correctly if callback throws non-Error', async () => {
    // GIVEN
    const alwaysFail = () => Promise.reject(new Error('Always'));

    // WHEN
    const result = retry(
      alwaysFail,
      { maxAttempts: 3, backoffBaseMilliseconds: 1337, backoffMultiplier: 42 },
      mockWaiter,
    );

    // THEN
    await expect(result).rejects.toThrow(AllAttemptsFailed);
    expect(mockWaiter).toHaveBeenCalledTimes(2);
  });

  test('correctly implements exponential back-off and calls onFaieldAttempt appropriately', async () => {
    // GIVEN
    const expectedResult = Math.random();
    let attemptNumber = 0;
    const failFourTimes = () =>
      new Promise((ok, ko) => {
        attemptNumber++;
        if (attemptNumber <= 4) {
          ko(new Error(`Attempt #${attemptNumber}`));
        } else {
          ok(expectedResult);
        }
      });
    const onFailedAttempt = jest
      .fn()
      .mockName('onFailedAttempt')
      .mockImplementation(
        (error: Error, attemptsLeft: number, backoffMs: number) => {
          expect(error.message).toBe(`Attempt #${attemptNumber}`);
          expect(attemptsLeft).toBe(5 - attemptNumber);
          expect(backoffMs).toBe(1337 * Math.pow(42, attemptNumber - 1));
        },
      );

    // WHEN
    const result = await retry(
      failFourTimes,
      {
        backoffBaseMilliseconds: 1337,
        backoffMultiplier: 42,
        onFailedAttempt,
      },
      mockWaiter,
    );

    // THEN
    expect(result).toBe(result);

    expect(onFailedAttempt).toHaveBeenCalledTimes(4);
    expect(mockWaiter).toHaveBeenCalledTimes(4);
    for (let i = 0; i < 4; i++) {
      expect(mockWaiter).toHaveBeenNthCalledWith(i + 1, 1337 * Math.pow(42, i));
    }
  });
});
