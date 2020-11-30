/**
 * Sleeps for a set amount of time, synchronously.
 *
 * @param time the amount of time to wait, in milliseconds.
 * @param promise a promise that aborts the wait when it resolves.
 */
export function sleep(time: number, promise?: Promise<unknown>): void {
  // We need a shared buffer array for the purpose of this exercise.
  const array = new Int32Array(new SharedArrayBuffer(4));

  promise?.then(
    () => Atomics.notify(array, 0, +Infinity),
    () => undefined /* Ignore errors here */,
  );

  // `Atomics.wait` will block for `time` milliseconds if `array[0]` still has
  // value `0` (which it will, since we just initialized it to that). The return
  // value is irrelevant for our business here.
  const condition = Atomics.wait(array, 0, 0, time);

  if (process.env.JSII_DEBUG) {
    // This should be `ok` (if the promise resolved in-time) or `timed-out` (if it did not)
    console.error(
      `Kernel synchronous sleep resulted in condition: ${condition}`,
    );
  }
}
