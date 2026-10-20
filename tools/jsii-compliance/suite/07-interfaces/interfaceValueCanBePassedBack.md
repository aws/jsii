# An interface value from the kernel can be passed back as a parameter

When the host receives a value typed as a behavioral interface from the kernel, the host MUST be able to pass that same
value back into the kernel as a method parameter. The kernel MUST be able to invoke the interface's members on the
passed-in value, reaching the original JavaScript implementation.

## Reference Implementation

```ts
// GIVEN
export interface IFriendly {
  hello(): string;
}

export class JSObjectLiteralForInterface {
  public giveMeFriendly(): IFriendly {
    return {
      hello: () => 'I am literally friendly!',
    };
  }
}

export class GreetingAugmenter {
  public betterGreeting(friendly: IFriendly): string {
    return `${friendly.hello()} Let me buy you a drink!`;
  }
}

// WHEN
const friendly = new JSObjectLiteralForInterface().giveMeFriendly();
const augmented = new GreetingAugmenter().betterGreeting(friendly);

// THEN
expect(friendly.hello()).toBe('I am literally friendly!');
expect(augmented).toBe('I am literally friendly! Let me buy you a drink!');
```
