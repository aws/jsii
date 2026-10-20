# ISO-8601 strings are not interpreted as dates

A string that happens to be formatted as an ISO-8601 timestamp MUST cross the boundary as a string, and MUST NOT be
interpreted or deserialized as a date. The protocol encodes dates explicitly, so only values that were explicitly
encoded as dates are received as dates; any other string &mdash; including an ISO-8601 one returned from a host callback
&mdash; MUST remain a string on both sides of the boundary.

## Reference Implementation

```ts
// GIVEN
export abstract class Entropy {
  public constructor(private readonly clock: IWallClock) {}

  /** Returns the time from the `WallClock`, verifying it stayed a string on the way in and out. */
  public increase(): string {
    const now = this.clock.iso8601Now();
    if (typeof now !== 'string') {
      throw new Error(`Now should have been a string, is a ${typeof now}`);
    }
    const result = this.repeat(now);
    if (typeof result !== 'string') {
      throw new Error(`Repeat should return a string, but returned a ${typeof result}`);
    }
    return result;
  }

  public abstract repeat(word: string): string;
}

export interface IWallClock {
  iso8601Now(): string;
}

// WHEN
const nowAsISO = '2020-01-02T03:04Z';

class HostWallClock implements IWallClock {
  public iso8601Now() {
    return nowAsISO;
  }
}

class HostEntropy extends Entropy {
  public repeat(word: string) {
    return word;
  }
}

const entropy = new HostEntropy(new HostWallClock());

// THEN
expect(entropy.increase()).toBe(nowAsISO);
```
