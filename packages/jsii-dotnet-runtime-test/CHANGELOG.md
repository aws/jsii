# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.8.0](https://github.com/awslabs/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Features

* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/awslabs/jsii/issues/376)) ([db3ccdf](https://github.com/awslabs/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/awslabs/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/awslabs/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.14"></a>
## [0.7.14](https://github.com/awslabs/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* **jsii-dotnet-runtime:** Fix EPIPE on Windows. ([1d7cc8b](https://github.com/awslabs/jsii/commit/1d7cc8b)), closes [#341](https://github.com/awslabs/jsii/issues/341)
* **kernel:** Improve tagged type of wire values ([#346](https://github.com/awslabs/jsii/issues/346)) ([8ea39ac](https://github.com/awslabs/jsii/commit/8ea39ac)), closes [#345](https://github.com/awslabs/jsii/issues/345)




<a name="0.7.13"></a>
## [0.7.13](https://github.com/awslabs/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.12"></a>
## [0.7.12](https://github.com/awslabs/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)


### Bug Fixes

* **kernel:** Correctly return instances of un-exported types ([#321](https://github.com/awslabs/jsii/issues/321)) ([9c59acc](https://github.com/awslabs/jsii/commit/9c59acc))


### Features

* JSII_AGENT ([#325](https://github.com/awslabs/jsii/issues/325)) ([cf1d0c3](https://github.com/awslabs/jsii/commit/cf1d0c3)), closes [#324](https://github.com/awslabs/jsii/issues/324)




<a name="0.7.11"></a>
## [0.7.11](https://github.com/awslabs/jsii/compare/v0.7.10...v0.7.11) (2018-11-18)


### Bug Fixes

* **jsii-dotnet-runtime:** Proxy parameters should not throw exception. ([#317](https://github.com/awslabs/jsii/issues/317)) ([acc8f22](https://github.com/awslabs/jsii/commit/acc8f22)), closes [#316](https://github.com/awslabs/jsii/issues/316)
* **jsii-dotnet-runtime-test:** Floating calculator package version ([40881f0](https://github.com/awslabs/jsii/commit/40881f0))


### Features

* **jsii-dotnet-runtime:** Improve .NET Performance ([20321af](https://github.com/awslabs/jsii/commit/20321af)), closes [#304](https://github.com/awslabs/jsii/issues/304)




<a name="0.7.10"></a>
## [0.7.10](https://github.com/awslabs/jsii/compare/v0.7.9...v0.7.10) (2018-11-12)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.9"></a>
## [0.7.9](https://github.com/awslabs/jsii/compare/v0.7.8...v0.7.9) (2018-11-12)


### Bug Fixes

* **dotnet/runtime:** Incorrect callback response format ([#286](https://github.com/awslabs/jsii/issues/286)) ([1b851e1](https://github.com/awslabs/jsii/commit/1b851e1)), closes [#285](https://github.com/awslabs/jsii/issues/285)
* **jsii-runtime:** treat "null" as "undefined" ([#297](https://github.com/awslabs/jsii/issues/297)) ([43fb16a](https://github.com/awslabs/jsii/commit/43fb16a)), closes [awslabs/aws-cdk#157](https://github.com/awslabs/aws-cdk/issues/157) [#282](https://github.com/awslabs/jsii/issues/282)
* **runtime/dotnet:** Correct a number of type mappings ([#291](https://github.com/awslabs/jsii/issues/291)) ([0d59dab](https://github.com/awslabs/jsii/commit/0d59dab)), closes [#290](https://github.com/awslabs/jsii/issues/290) [awslabs/aws-cdk#1027](https://github.com/awslabs/aws-cdk/issues/1027)




<a name="0.7.8"></a>
## [0.7.8](https://github.com/awslabs/jsii/compare/v0.7.7...v0.7.8) (2018-10-23)


### Bug Fixes

* match behavioral interface to 'I'-prefix ([#271](https://github.com/awslabs/jsii/issues/271)) ([03103f3](https://github.com/awslabs/jsii/commit/03103f3))




<a name="0.7.7"></a>
## [0.7.7](https://github.com/awslabs/jsii/compare/v0.7.6...v0.7.7) (2018-10-10)


### Bug Fixes

* **dotnet:** abstract classes should have proxy implementations ([#241](https://github.com/awslabs/jsii/issues/241)) ([828a26f](https://github.com/awslabs/jsii/commit/828a26f)), closes [#223](https://github.com/awslabs/jsii/issues/223)
* **jsii:** support  public autoproperties in private constructor ([#256](https://github.com/awslabs/jsii/issues/256)) ([181012e](https://github.com/awslabs/jsii/commit/181012e))




<a name="0.7.6"></a>
## [0.7.6](https://github.com/awslabs/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.5"></a>
## [0.7.5](https://github.com/awslabs/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.4"></a>
## [0.7.4](https://github.com/awslabs/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.3"></a>
## [0.7.3](https://github.com/awslabs/jsii/compare/v0.7.2...v0.7.3) (2018-09-06)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.2"></a>
## [0.7.2](https://github.com/awslabs/jsii/compare/v0.7.1...v0.7.2) (2018-09-06)


### Features

* **jsii:** Re-implemented jsii to support --watch and produce better error reporting ([#188](https://github.com/awslabs/jsii/issues/188)) ([76472be](https://github.com/awslabs/jsii/commit/76472be))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/awslabs/jsii/compare/v0.7.0...v0.7.1) (2018-08-28)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.0"></a>
# [0.7.0](https://github.com/awslabs/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Features

* **jsii:** Further normalize assembly outputs ([#177](https://github.com/awslabs/jsii/issues/177)) ([de3f062](https://github.com/awslabs/jsii/commit/de3f062)), closes [#60](https://github.com/awslabs/jsii/issues/60)




<a name="0.7.0"></a>
# [0.7.0](https://github.com/awslabs/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Features

* **jsii:** Further normalize assembly outputs ([#177](https://github.com/awslabs/jsii/issues/177)) ([de3f062](https://github.com/awslabs/jsii/commit/de3f062)), closes [#60](https://github.com/awslabs/jsii/issues/60)




<a name="0.6.4"></a>
## [0.6.4](https://github.com/awslabs/jsii/compare/v0.6.3...v0.6.4) (2018-08-08)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.6.3"></a>
## [0.6.3](https://github.com/awslabs/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)




**Note:** Version bump only for package jsii-dotnet-runtime-test
