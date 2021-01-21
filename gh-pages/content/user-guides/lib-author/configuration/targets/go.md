# Go

!!! danger
    The **go** target is currently unstable and not suitable for production use.

To enable go package generation, add the **go** key with an empty object to the jsii targets configuration.

This will add generated go package code to your specified `outDir` for testing and experimentation.

```json
{
  "jsii": {
    "targets": {
      "go": {},
      // ...
    },
    // ...
  },
  // ...
}
```
