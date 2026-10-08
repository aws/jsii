# The kernel is told which host runtime is driving it

When the host starts the kernel process, it MUST set the `JSII_AGENT` environment variable to a value identifying the
host runtime and its version. Kernel code that reads that environment variable MUST observe exactly the value the host
provided.

## Reference Implementation

```ts
// GIVEN
export class JsiiAgent {
  /** Returns the value of the JSII_AGENT environment variable. */
  public static get value(): string | undefined {
    return process.env.JSII_AGENT;
  }
}

// WHEN
const agent = JsiiAgent.value;

// THEN
// The host sets JSII_AGENT when spawning the kernel, so it is observed as a non-absent value
// identifying the host runtime and version.
expect(agent).toBeDefined();
```
