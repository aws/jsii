# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.6.4"></a>
## [0.6.4](https://github.com/awslabs/jsii/compare/v0.6.3...v0.6.4) (2018-08-08)


### Bug Fixes

* jsii-pacmak refers to private dependencies ([e61efc0](https://github.com/awslabs/jsii/commit/e61efc0))


<a name="0.6.3"></a>
## [0.6.3](https://github.com/awslabs/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)

### New features

* Produce .nupkg for .NET targets ([#160](https://github.com/awslabs/jsii/issues/160))
* Upgrade TypeScript to 3.0.1 ([#161](https://github.com/awslabs/jsii/issues/160))

### Bug Fixes

* Denote the optional aspect of types when describing them ([#159](https://github.com/awslabs/jsii/issues/159))

<a name="0.6.2"></a>
## 0.6.2 (2018-08-07)

### Bug Fixes

* "Malformed enum value" when using @scoped packages ([#139](https://github.com/awslabs/jsii/issues/139)) ([4e70209](https://github.com/awslabs/jsii/commit/4e70209)), closes [#138](https://github.com/awslabs/jsii/issues/138)

## 0.6.0 - 2018-08-06

* First public release

## 0.5.0 - 2018-06-20

* Support variadics in methods.
* Support for static methods, properties and constants
* Emit strongly-typed `setXxx`/`withXxx` overloads for union properties
* Embed `jsii-runtime.js` as a webpack'd resource into the the java runtime client
