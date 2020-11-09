// We need a shared buffer array for the purpose of this exercise.
const array = new Int32Array(new SharedArrayBuffer(4));

/**
 * Sleeps for a set amount of time, syncrhonously.
 *
 * @param time the amount of time to wait, in milliseconds.
 */
export function sleep(time: number): void {
  // `Atomics.wait` will block for `time` milliseconds if `array[0]` still has
  // value `0` (which it will, since we just initialized it to that). The return
  // value is irrelevant for our business here.
  Atomics.wait(array, 0, 0, time);
}
