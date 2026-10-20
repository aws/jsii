# Asynchronous methods returning no value can be invoked

The host MUST be able to invoke a promise-returning method that resolves to no value, both when it is a static method and
when it is an instance method. In each case the host MUST issue the invocation as an asynchronous request (`sbegin` for
the static method, `begin` for the instance method), drive it to completion, and observe successful completion with no
value returned.

## Reference Implementation

```ts
// GIVEN
export class PromiseNothing {
  public static async promiseIt(): Promise<void> {
    return Promise.resolve();
  }

  public async instancePromiseIt(): Promise<void> {
    return PromiseNothing.promiseIt();
  }
}

// WHEN / THEN
await expect(new PromiseNothing().instancePromiseIt()).resolves.toBeUndefined();
await expect(PromiseNothing.promiseIt()).resolves.toBeUndefined();
```
