# Go Runtime Test

This directory contains compliance tests for the go language bindings.

## Usage

Build & run Go compliance tests: 

```shell
$ cd packages/@jsii/go-runtime-test
$ yarn build && yarn test
```

Produce complaince report:

```shell
$ cd tools/jsii-compliance
$ yarn report
```

## Writing a Test

Let's say we want to implement a test named "nameOfTest".

Add a method under `compliance_test.go` with the following signature:

```go
func (suite *ComplianceSuite) TestNameOfTest()
```

Within this method, write your test.

To indicate that a test is **not applicable** for Go, use the `suite.NotApplicableTest(reason)`:

```go
func (suite *ComplianceSuite) TestCreateObjectAndCtorOverloads()  {
	suite.NotApplicableTest("Golang does not have overloaded functions so the genearated class only has a single New function")
}
```

To indicate that Go is **not compliant yet** in a specific case, use the
`suite.FailTest(url, reason)` where `url` is the URL of the github issue and
`reason` is the reason why this test is failing:

```go
suite.FailTest("https://github.com/aws/jsii/issues/1234", "subclasssing is not yet supported in go")
```

You can also use the `suite.T()` to add assertions. Bear in mind that if an
assertion fails, the build won't pass, so this shouldn't be used if you want to
report that a feature is missing (use `suite.FailTest()` instead).

For example:

```go
t := suite.T()
t.Errorf("Expected length of empty map to be 0. Got: %d", len(actual))
```
