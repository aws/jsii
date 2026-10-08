# The kernel error's message is surfaced to the host

When the kernel raises an error while handling a request, the error surfaced to the host MUST carry the same message as
the error thrown in the kernel, so the host can inspect and report it.

## Reference Implementation

```ts
// GIVEN
export interface AcceptsPathProps {
  /** A path that may not exist. */
  readonly sourcePath: string;
}

export class AcceptsPath {
  public constructor(props: AcceptsPathProps) {
    if (!fs.existsSync(path.resolve(props.sourcePath))) {
      throw new Error(`Cannot find asset`);
    }
  }
}

// WHEN / THEN
expect(() => new AcceptsPath({ sourcePath: 'A Bad Path' })).toThrow(/^Cannot find asset/);
```
