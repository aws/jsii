# Go

!!! danger
    The **go** target is currently unstable and not suitable for production use.

To enable go package generation, add the `go` key to the jsii targets configuration:

- `packageName` (optional) - The name of the Go package name. If this is not
  specified, the package name will be derived from the npm module name by
  filtering non-alphanumeric characters (e.g. `aws-cdk-lib` will be
  `awscdklib`). You can use this field to set a specific package name.
- `moduleName` (required) - The name of the **target repository** in which this
  module will be published (e.g. `github.com/foo/bar`). The module itself will
  *always* be published under a subdirectory named according to the Go package
  name of the module (e.g. `github.com/foo/bar/awscdk`).
- `versionSuffix` (optional) - Can be provided that will be appended at the end
  of the module version.

This will add generated go package code to your specified `outDir` under
`go/PACKAGE_NAME` (e.g. `dist/go/awscdklib`).

```js
{
  "jsii": {
    "targets": {
      "go": {
        "moduleName": "github.com/foo/bar",  // REQUIRED
        "packageName": "hello",              // OPTIONAL
        "versionSuffix": "-devprefix"        // OPTIONAL
      },
      // ...
    },
    // ...
  },
  // ...
}
```
