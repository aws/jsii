# JSII Go Runtime

This is a go module used for communicating between jsii-pacmak generated go code and the JSII node process. JSII modules, when compiled into go modules, depend on this package and call the various functions in `jsii-runtime-go/runtime.go` to setup and communicate with the JSII kernel process.

To see what this looks like in practice you can perform the following steps:
1. Clone the repository and build all packages with `yarn install && yarn build` from the root
2. Navigate to the `packages/@jsii/go-runtime` directory
3. run `yarn test:calc`

This will run code generation against all of the jsii-calc modules and place the built go modules into the `jsii-calc/golang` directory. The code in `jsii-calc-test` imports these generated modules and can be used to test runtime functionality. `yarn test:calc` also runs `go run ./jsii-calc-test`.

## Development Workflow

Unit tests are run with `go test`. New unit test files can be added in the `jsii-runtime-go` directory.

The `jsii-calc-test` module contains the integration test suite.

#### Test Commands

- `yarn test:unit` - run unit tests
- `yarn test:calc` - run `jsii-calc-test` module binary
- `yarn test` - runs unit and integration tests
