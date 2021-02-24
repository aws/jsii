# JSII Compliance

This directory contains scripts and resources to create and validate the JSII compliance suite.

### Compliance Suite

The compliance suite is defined as a collection of abstract test cases, that each language binding must implement individualy.
Language specific exclusions may be added to each test separately, or to the entire suite.

> See [compliance-suite.json](./compliance-suite.json).

### Compliance Report

Each language binding is responsible for creating a language specific report during the `test` phase of our build.

These reports are then aggregated into a single multi-language compliance report. It is generated during build time,
and should be checked into [source control](../../gh-pages/content/specification/6-compliance-report.md).

> To directly generate the report, run `yarn compliance` from the top level direcotry.

Note that if you add a test and don't re-generate the report, the build will fail:

```console
```

The report contains the state of each test with respect to each language binding.
Every test will have one of the following statuses:

- ✅ - Test passes.
- ❌ - Test is either missing or is not reporting success.
- N/A - The test was excluded.

Eventually, this report lands on our [docs site](https://aws.github.io/jsii/specification/6-compliance-report/).
