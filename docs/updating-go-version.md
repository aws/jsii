# Updating the Go version in jsii

Each major Go release is supported until there are two newer major releases. When a Go release reaches it end of life,
we should remove support for it in jsii. To do this, you have to:

## 1. Update jsii/superchain

- Update the `GO_VERSION` in the [Dockerfile](https://github.com/aws/jsii-superchain/blob/main/superchain/Dockerfile#L87)

## 2. Update `cdk init` template

- Needs to be updated to the new version, so that new apps declare their minimum requirements correctly.
- See example [PR](https://github.com/aws/aws-cdk-cli/pull/768)s

## 3. Update @jsii/go-runtime and jsii repo

- Update the baseline version of Go in `.github/workflows/main.yml`.
- Update `packages/@jsii/go-runtime/jsii-runtime-go/go.mod`
- Update the value of the `GO_VERSION` constant in `packages/jsii-pacmak/lib/targets/go/package.ts`. Don't forget to
  also update the `jsii-pacmak` jest snapshots.
- Update `packages/@jsii/go-runtime-test/project/go.mod`.

## 4. Update jsii-pacmak in aws-cdk-lib (Automatic)

Eventually the above updates will be released and the jsii-pacmak version in `aws-cdk-lib` will be updated automatically.
This should now pass the canaries and everything is completed.
