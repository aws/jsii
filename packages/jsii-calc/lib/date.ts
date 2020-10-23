/**
 * This class is used to validate that serialization and deserialization does
 * not interpret ISO-8601-formatted timestampts to the native date/time object,
 * as the jsii protocol has a $jsii$date wrapper for this purpose (node's JSON
 * parsing does *NOT* detect dates automatically in this way, so host libraries
 * should not either).
 */
export abstract class Entropy {
  /**
   * Creates a new instance of Entropy.
   *
   * @param clock your implementation of `WallClock`
   */
  public constructor(private readonly clock: IWallClock) {}

  /**
   * Increases entropy by consuming time from the clock (yes, this is a long
   * shot, please don't judge).
   *
   * @returns the time from the `WallClock`.
   */
  public increase(): string {
    const now = this.clock.iso8601Now();

    if (typeof now !== 'string') {
      throw new Error(
        `Now should have been a string, is a ${typeof now}. Check your (de)serializer`,
      );
    }

    const result = this.repeat(now);

    if (typeof result !== 'string') {
      throw new Error(
        `Repeat should return a string, but returned a ${typeof result}. Check your (de)serializer`,
      );
    }

    return result;
  }

  /**
   * Implement this method such that it returns `word`.
   * @param word the value to return.
   * @returns `word`.
   */
  public abstract repeat(word: string): string;
}

/**
 * Implement this interface.
 */
export interface IWallClock {
  /**
   * Returns the current time, formatted as an ISO-8601 string.
   */
  iso8601Now(): string;
}
