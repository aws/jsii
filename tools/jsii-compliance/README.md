# jsii compliance

This directory contains scripts and resources to create and validate the jsii compliance suite.

## Compliance Suite

The compliance suite is defined as a collection of abstract test cases, that each language binding must implement individually.
Language specific exclusions may be added to each test separately, or to the entire suite.

> See [suite.ts](./suite.ts).

Note that if you add a compliance test to a specific language binding only, i.e without adding it to the suite definition, the build will fail. For example:

```console
Test 'REMOVEME' from golang report does not exist in the compliance suite. Please add it to the suite definition.
```

### Compliance Report

Each language binding is responsible for creating a language specific report during the `test` phase of our build.

The report takes the following form:

```json
{
  "<test-case-name>": {
    "status": "success | skipped"
  }
}
```

The `<test-case-name>` must match the test case name in the suite definition. For example, the following test case definition:

```json
{
  "name": "maps",
  "description": "",
  "exclusions": {}
},
```

Requires that each language report to include an entry with a key called `maps`.

> Note that matching is **not case sensitive**, which means you can and should adhere to the
> conventions of your specific language when writing the tests.

These reports are then aggregated into a single multi-language compliance report. It is generated during build time,
and should be checked into [source control](../../gh-pages/content/specification/6-compliance-report.md).

> The report is generated automatically as part of the global `test` phase of the repository. You can also directly generate the report by running `yarn compliance` from the top level directory of the repo, or `yarn report` from this package directory.

Note that if you add a test and don't re-generate the report, the build will fail:

```console
gh-pages/content/specification/6-compliance-report.md: needs update
```

The report contains the state of each test with respect to each language binding.
Every test will have one of the following statuses:

- 🟢 - Test passes for this language.
- ⚪ - Test is not applicable for this language.
- ⭕ - Test is not implemented (yet) for this language
- 🔴 - Test is failing for this language: missing feature or bug in language bindings.

Eventually, this report lands on our [docs site](https://aws.github.io/jsii/specification/6-compliance-report/).
