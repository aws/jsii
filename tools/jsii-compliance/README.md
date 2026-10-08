# jsii compliance

This directory contains the jsii standard compliance suite, and the tool that validates the language binding reports
against it and generates the compliance pages of the documentation site.

The suite itself is described in the [specification](../../gh-pages/content/specification/4-standard-compliance-suite.md).

## Test Cases

Each test case is a markdown file in `suite/<category>/<test-name>.md`. Each category directory has a `README.md` with
the category title and description. The file format is described in the specification.

To add a test case:

1. Add a test case file to the category it belongs to.
1. Implement the test in the compliance tests of every language binding, using the file name as the test name.
1. Run `yarn check` from this directory to validate the test case files.

Run `yarn compliance` from the root of the repository to validate the reports and regenerate the pages. It runs as part
of the global `test` phase.

## Validation

The tool fails when a language binding reports a test that has no test case file. This keeps tests that only exist in
one language out of the suite:

```console
Test 'REMOVEME' from golang report has no test case definition in tools/jsii-compliance/suite. If this test is language specific,
  move it out of the compliance test, otherwise, add a test case definition to the suite.
```

Test names are matched ignoring case, underscores and leading `test`s, so each language binding can follow its own
naming conventions: `test_null_is_a_valid_optional_list` matches `testNullIsAValidOptionalList`.

The tool also fails when a test case file is invalid, for example when it has no title, no RFC 2119 key word in its
description, or no reference implementation.

## Generated Pages

The tool writes:

- one page per category to `gh-pages/content/specification/compliance-suite/`, containing all test cases of the
  category;
- the [compliance report](../../gh-pages/content/specification/6-compliance-report.md), with the result of every test
  case in every language binding, linked to the test case.

Both are checked into source control. If you change a test case or a report and don't regenerate them, the build fails:

```console
gh-pages/content/specification/6-compliance-report.md: needs update
```

## Compliance Reports

Each language binding writes a report during its `test` phase:

```json
{
  "<test-case-name>": {
    "status": "success | failure | n/a",
    "reason": "optional, why the test fails or doesn't apply",
    "url": "optional, a link to the issue tracking the failure"
  }
}
```

The status is shown as:

- 🟢 - Test passes for this language.
- 🔴 - Test is failing for this language: missing feature or bug in language bindings.
- ⚪ - Test is not applicable for this language.
- ⭕ - Test is not implemented (yet) for this language.
