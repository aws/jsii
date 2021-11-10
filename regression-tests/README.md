# Regression Tests

This directory contains packages that are supposed to cleanly compile using
`jsii`. This validates the compiler is able to correctly interpret the source.

When adding new tests, be sure to follow these guidelines:

- Create a new namespace for each regression scenario
- All packages should have `private: true` in their `package.json`
- Provide a README.md with an explanation of what the package(s) validate
