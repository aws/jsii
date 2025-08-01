# Updating the Go version in jsii

Each major Go release is supported until there are two newer major releases. When a Go release reaches it end of life,
we should remove support for it in jsii. To do this, you have to:

- Update the baseline version of Go in `.github/workflows/main.yml`.
- Update `packages/@jsii/go-runtime/jsii-runtime-go/go.mod`
- Update the value of the `GO_VERSION` constant in `packages/jsii-pacmak/lib/targets/go/package.ts`. Don't forget to
  also update the `jsii-pacmak` jest snapshots.
- Update `packages/@jsii/go-runtime-test/project/go.mod`.