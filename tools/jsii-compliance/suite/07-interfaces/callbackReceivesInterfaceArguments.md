# A host callback receives interface-typed arguments it can use

When the kernel invokes a method on a host-implemented interface, it MAY pass an argument whose declared type is another
behavioral interface. The host MUST receive that argument typed as the interface and MUST be able to invoke the
interface's members on it. This MUST hold no matter how the kernel implements the passed-in value — as a bare object, as
an instance of an exported class, or as an instance of a type that is not exported.

## Reference Implementation

```ts
// GIVEN
export interface IBell {
  ring(): void;
}

export interface IBellRinger {
  yourTurn(bell: IBell): void;
}

export class Bell implements IBell {
  public rung = false;
  public ring() {
    this.rung = true;
  }
}

class PrivateBell implements IBell {
  public rung = false;
  public ring() {
    this.rung = true;
  }
}

export class ConsumerCanRingBell {
  public static staticImplementedByObjectLiteral(ringer: IBellRinger) {
    let rung = false;
    ringer.yourTurn({
      ring() {
        rung = true;
      },
    });
    return rung;
  }

  public static staticImplementedByPublicClass(ringer: IBellRinger) {
    const bell = new Bell();
    ringer.yourTurn(bell);
    return bell.rung;
  }

  public static staticImplementedByPrivateClass(ringer: IBellRinger) {
    const bell = new PrivateBell();
    ringer.yourTurn(bell);
    return bell.rung;
  }
}

// WHEN
// The host implements IBellRinger; the kernel calls back with an IBell argument.
class Ringer implements IBellRinger {
  public yourTurn(bell: IBell) {
    bell.ring();
  }
}
const ringer = new Ringer();

// THEN
expect(ConsumerCanRingBell.staticImplementedByObjectLiteral(ringer)).toBe(true);
expect(ConsumerCanRingBell.staticImplementedByPrivateClass(ringer)).toBe(true);
expect(ConsumerCanRingBell.staticImplementedByPublicClass(ringer)).toBe(true);
```
