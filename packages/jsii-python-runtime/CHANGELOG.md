# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.8.0](https://github.com/awslabs/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* Fix Async function support in Python ([b5d49de](https://github.com/awslabs/jsii/commit/b5d49de))
* Fix permissions error in pipeline when generating Python runtime ([af1346f](https://github.com/awslabs/jsii/commit/af1346f))
* Proxy interface literals in the generated Python code ([10242eb](https://github.com/awslabs/jsii/commit/10242eb))
* Python's abstract class proxies now inherit from parent's proxy ([6f1c9c0](https://github.com/awslabs/jsii/commit/6f1c9c0))


### Features

* Add Python Support ([cc3ec87](https://github.com/awslabs/jsii/commit/cc3ec87))
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/awslabs/jsii/issues/376)) ([db3ccdf](https://github.com/awslabs/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/awslabs/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
