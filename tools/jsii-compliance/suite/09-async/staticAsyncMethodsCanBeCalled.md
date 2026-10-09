# Static asynchronous methods can be invoked from the host

The host MUST be able to invoke a promise-returning (asynchronous) static method without an instance. It MUST issue the
call as a static asynchronous (`sbegin`) request with the method's arguments, allow the kernel to run its pending
callbacks and promises to completion, and then collect the resolved value, which it MUST return to the caller with its
declared type.

## Reference Implementation

```ts
// GIVEN
export class StaticAsyncMethods {
  public static async addOne(value: number): Promise<number> {
    return Promise.resolve(value + 1);
  }

  private constructor() {}
}

// WHEN / THEN
expect(await StaticAsyncMethods.addOne(41)).toBe(42);
```

## Kernel Trace

```
> {"api":"sbegin","fqn":"jsii-calc.StaticAsyncMethods","method":"addOne","args":[41]}
< {"ok":{"promiseid":"jsii::promise::20000"}}
> {"api":"callbacks"}
< {"ok":{"callbacks":[]}}
> {"api":"end","promiseid":"jsii::promise::20000"}
< {"ok":{"result":42}}
```
