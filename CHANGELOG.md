# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.7.6"></a>
## [0.7.6](https://github.com/awslabs/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)


### Bug Fixes

* Sphinx generated incorrect type references for display ([#232](https://github.com/awslabs/jsii/issues/232)) ([b664805](https://github.com/awslabs/jsii/commit/b664805))
* **jsii:** Defaulted parameters were not rendered as optional ([#234](https://github.com/awslabs/jsii/issues/234)) ([578bf9c](https://github.com/awslabs/jsii/commit/578bf9c)), closes [#233](https://github.com/awslabs/jsii/issues/233)
* **jsii:** Don't skip emit on TS errors when in "watch" mode ([#236](https://github.com/awslabs/jsii/issues/236)) ([30d1491](https://github.com/awslabs/jsii/commit/30d1491)), closes [#235](https://github.com/awslabs/jsii/issues/235)
* **jsii:** Optional `any` represented as required ([#237](https://github.com/awslabs/jsii/issues/237)) ([91074f3](https://github.com/awslabs/jsii/commit/91074f3)), closes [#230](https://github.com/awslabs/jsii/issues/230)


### Features

* **sphinx:** allow readme file to define sphinx header and reorganize topic ([#229](https://github.com/awslabs/jsii/issues/229)) ([405da9c](https://github.com/awslabs/jsii/commit/405da9c)), closes [#228](https://github.com/awslabs/jsii/issues/228) [#185](https://github.com/awslabs/jsii/issues/185)
* Document overriden/inherited members ([#238](https://github.com/awslabs/jsii/issues/238)) ([7a6278a](https://github.com/awslabs/jsii/commit/7a6278a)), closes [#196](https://github.com/awslabs/jsii/issues/196)




<a name="0.7.5"></a>
## [0.7.5](https://github.com/awslabs/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)

### Known Issues

* **dotnet**: unable to instantiate objects when return type is abstract ([#223](https://github.com/awslabs/jsii/issues/223))

### Bug Fixes

* **java:** support abstract return types ([#224](https://github.com/awslabs/jsii/issues/224)) ([3257223](https://github.com/awslabs/jsii/commit/3257223)), closes [#220](https://github.com/awslabs/jsii/issues/220) [#223](https://github.com/awslabs/jsii/issues/223) [awslabs/aws-cdk#680](https://github.com/awslabs/aws-cdk/issues/680)


<a name="0.7.4"></a>
## [0.7.4](https://github.com/awslabs/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)

### Bug Fixes

* **jsii:** Force generated assemblies to reference jsii-only dependencies ([cf62773](https://github.com/awslabs/jsii/commit/cf62773))


<a name="0.7.3"></a>
## [0.7.3](https://github.com/awslabs/jsii/compare/v0.7.2...v0.7.3) (2018-09-06)


### Bug Fixes

* **jsii:** add readme and restore missing files in jsii tarball ([09f9fc9](https://github.com/awslabs/jsii/commit/09f9fc9))




<a name="0.7.2"></a>
## [0.7.2](https://github.com/awslabs/jsii/compare/v0.7.1...v0.7.2) (2018-09-06)


### Bug Fixes

* Missing types in JSII assembly, invalid Java code, confusing docs ([#208](https://github.com/awslabs/jsii/issues/208)) ([b37101f](https://github.com/awslabs/jsii/commit/b37101f)), closes [#175](https://github.com/awslabs/jsii/issues/175)


### Features

* **jsii:** Re-implemented jsii to support --watch and produce better error reporting ([#188](https://github.com/awslabs/jsii/issues/188)) ([76472be](https://github.com/awslabs/jsii/commit/76472be))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/awslabs/jsii/compare/v0.7.0...v0.7.1) (2018-08-28)

### Bug Fixes

* **jsii-pacmak:** Output .NET build artifacts to `dist/dotnet/` instead of just `dist/` ([#192](https://github.com/awslabs/jsii/issues/192)) ([f25c8c4](https://github.com/awslabs/jsii/commit/f25c8c45ba3de62c05d5d115f8aad675f85a3f31))
* **jsii-kernel:** Fix module loading on systems that use '\' instead of '/' as the path separator ([#193](https://github.com/awslabs/jsii/issues/193)) ([9e42991](https://github.com/awslabs/jsii/pull/193/commits/9e42991c9dad214935d10497c18279cb29c3b613))

### Features

* **jsii:** Add check against downgrading properties to readonly ([#201](https://github.com/awslabs/jsii/issues/201)) ([f60b0ac](https://github.com/awslabs/jsii/commit/f60b0ace014e8e96090ead808436b1ce0cb6b1e8))

<a name="0.7.0"></a>
# [0.7.0](https://github.com/awslabs/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Bug Fixes

* **kernel:** can't find temp directory on Windows ([#184](https://github.com/awslabs/jsii/issues/184)) ([1aec545](https://github.com/awslabs/jsii/commit/1aec545)), closes [#183](https://github.com/awslabs/jsii/issues/183)


### Features

* **jsii:** Further normalize assembly outputs ([#177](https://github.com/awslabs/jsii/issues/177)) ([de3f062](https://github.com/awslabs/jsii/commit/de3f062)), closes [#60](https://github.com/awslabs/jsii/issues/60)

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
## [0.6.2](https://github.com/awslabs/jsii/compare/v0.6.0...v0.6.2) (2018-08-07)

### Bug Fixes

* "Malformed enum value" when using @scoped packages ([#139](https://github.com/awslabs/jsii/issues/139)) ([4e70209](https://github.com/awslabs/jsii/commit/4e70209)), closes [#138](https://github.com/awslabs/jsii/issues/138)

## [0.6.0](https://github.com/awslabs/jsii/compare/v0.5.0...v0.6.0) (2018-08-06)

* First public release

## 0.5.0 (2018-06-20)

* Support variadics in methods.
* Support for static methods, properties and constants
* Emit strongly-typed `setXxx`/`withXxx` overloads for union properties
* Embed `jsii-runtime.js` as a webpack'd resource into the the java runtime client
