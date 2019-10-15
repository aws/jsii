# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.19.0](https://github.com/aws/jsii/compare/v0.18.0...v0.19.0) (2019-10-14)


### Features

* **sampiler:** translate code samples to Python ([#827](https://github.com/aws/jsii/issues/827)) ([c9a7002](https://github.com/aws/jsii/commit/c9a7002431c0db6224d595eb5555b916036d4575))





# [0.18.0](https://github.com/aws/jsii/compare/v0.17.1...v0.18.0) (2019-10-01)


### Features

* configure `engines` with `node >= 10.3.0` ([#795](https://github.com/aws/jsii/issues/795)) ([6164b6b](https://github.com/aws/jsii/commit/6164b6b)), closes [#794](https://github.com/aws/jsii/issues/794)





## [0.17.1](https://github.com/aws/jsii/compare/v0.17.0...v0.17.1) (2019-09-30)

**Note:** Version bump only for package jsii-dotnet-runtime-test





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)


### Bug Fixes

* **dotnet:** fix deep type conversion across the process boundary, intelisense docs, set target to netcoreapp2.1 ([#772](https://github.com/aws/jsii/issues/772)) ([ecf8d3b](https://github.com/aws/jsii/commit/ecf8d3b))





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)


### Bug Fixes

* **dotnet:** Fix property set for nested Dictionaries ([#736](https://github.com/aws/jsii/issues/736)) ([04bab47](https://github.com/aws/jsii/commit/04bab47))


### Features

* **dotnet:** drop the useless I prefix for non datatype interfaces ([#728](https://github.com/aws/jsii/issues/728)) ([b9621f1](https://github.com/aws/jsii/commit/b9621f1)), closes [#109](https://github.com/aws/jsii/issues/109)
* **dotnet:** Support for JSII_DEBUG and JSII_RUNTIME ([#724](https://github.com/aws/jsii/issues/724)) ([1816740](https://github.com/aws/jsii/commit/1816740))


### BREAKING CHANGES

* **dotnet:** names of .NET behavioral interfaces have changed (the duplicate prefix I was removed).





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)


### Bug Fixes

* **dotnet:** add missing GetInterfaceType in the .NET runtime ([#703](https://github.com/aws/jsii/issues/703)) ([56617b1](https://github.com/aws/jsii/commit/56617b1)), closes [/docs.aws.amazon.com/cdk/api/latest/dotnet/api/Amazon.CDK.AWS.EC2.Vpc.html#Amazon_CDK_AWS_EC2](https://github.com//docs.aws.amazon.com/cdk/api/latest/dotnet/api/Amazon.CDK.AWS.EC2.Vpc.html/issues/Amazon_CDK_AWS_EC2) [aws/aws-cdk#2362](https://github.com/aws/aws-cdk/issues/2362)





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)


### Bug Fixes

* **dotnet:** stop mutating Dictionary when iterating on it ([#691](https://github.com/aws/jsii/issues/691)) ([8aedfc9](https://github.com/aws/jsii/commit/8aedfc9)), closes [#690](https://github.com/aws/jsii/issues/690)


### Features

* **dotnet:** handling optional and variadic parameters ([#680](https://github.com/aws/jsii/issues/680)) ([e8b5a35](https://github.com/aws/jsii/commit/e8b5a35)), closes [#153](https://github.com/aws/jsii/issues/153) [#210](https://github.com/aws/jsii/issues/210)





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)


### Features

* new code generator for .NET ([#567](https://github.com/aws/jsii/issues/567)) ([c03e078](https://github.com/aws/jsii/commit/c03e078))





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)


### Bug Fixes

* fix usage of "external" stability ([#639](https://github.com/aws/jsii/issues/639)) ([30dea87](https://github.com/aws/jsii/commit/30dea87))





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)

**Note:** Version bump only for package jsii-dotnet-runtime-test





# [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)


### Bug Fixes

* **.net:** occasional incorrect param type cast ([#568](https://github.com/aws/jsii/issues/568)) ([c89d0fa](https://github.com/aws/jsii/commit/c89d0fa)), closes [awslabs/aws-cdk#3093](https://github.com/awslabs/aws-cdk/issues/3093)





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)

**Note:** Version bump only for package jsii-dotnet-runtime-test





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Features

* **jsii:** enforce enum member names to be ALL_CAPS ([#541](https://github.com/aws/jsii/issues/541)) ([c88080d](https://github.com/aws/jsii/commit/c88080d)), closes [awslabs/aws-cdk#2287](https://github.com/awslabs/aws-cdk/issues/2287)


### BREAKING CHANGES

* **jsii:** Enum members are now expected to be `ALL_CAPS`





## [0.11.3](https://github.com/aws/jsii/compare/v0.11.2...v0.11.3) (2019-06-18)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.11.2](https://github.com/aws/jsii/compare/v0.11.1...v0.11.2) (2019-06-07)


### Bug Fixes

* **java:** Escape `*/` in package-info.java ([#526](https://github.com/aws/jsii/issues/526)) ([4e7ea98](https://github.com/aws/jsii/commit/4e7ea98))





## [0.11.1](https://github.com/aws/jsii/compare/v0.11.0...v0.11.1) (2019-06-07)


### Features

* **jsii-spec:** Add optional metadata field ([#512](https://github.com/aws/jsii/issues/512)) ([10e2bfe](https://github.com/aws/jsii/commit/10e2bfe))





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.10.5](https://github.com/aws/jsii/compare/v0.10.4...v0.10.5) (2019-05-06)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.10.4](https://github.com/aws/jsii/compare/v0.10.3...v0.10.4) (2019-05-05)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.10.3](https://github.com/aws/jsii/compare/v0.10.2...v0.10.3) (2019-04-24)


### Bug Fixes

* **java:** fix illegal arguments passed to JavaDoc generator ([#475](https://github.com/aws/jsii/issues/475)) ([4456138](https://github.com/aws/jsii/commit/4456138))





## [0.10.2](https://github.com/aws/jsii/compare/v0.10.1...v0.10.2) (2019-04-18)


### Bug Fixes

* **dotnet:** Correctly handle 'void' callback results ([#471](https://github.com/aws/jsii/issues/471)) ([81e41bd](https://github.com/aws/jsii/commit/81e41bd))





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)

**Note:** Version bump only for package jsii-dotnet-runtime-test





# [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)


### Features

* **jsii-spec:** Model parameter optionality ([#432](https://github.com/aws/jsii/issues/432)) ([21e485a](https://github.com/aws/jsii/commit/21e485a)), closes [#296](https://github.com/aws/jsii/issues/296) [#414](https://github.com/aws/jsii/issues/414)


### BREAKING CHANGES

* **jsii-spec:** JSII assemblies generated by older versions of the tool
will fail loading with this new version, and vice-versa. Re-compile your
projects in order to fix this.





# [0.9.0](https://github.com/aws/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


### Features

* **jsii:** Enforce use of peerDependencies ([#421](https://github.com/aws/jsii/issues/421)) ([e72fea5](https://github.com/aws/jsii/commit/e72fea5)), closes [#361](https://github.com/aws/jsii/issues/361)
* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/aws/jsii/issues/415)) ([9cfd867](https://github.com/aws/jsii/commit/9cfd867))


### BREAKING CHANGES

* **jsii:** All direct dependencies must be duplicated in
                 peerDependencies unless they are in bundledDependencies.





## [0.8.2](https://github.com/aws/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)

**Note:** Version bump only for package jsii-dotnet-runtime-test





## [0.8.1](https://github.com/aws/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/aws/jsii/issues/395)) ([850f42b](https://github.com/aws/jsii/commit/850f42b))





# [0.8.0](https://github.com/aws/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Features

* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/aws/jsii/issues/376)) ([db3ccdf](https://github.com/aws/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/aws/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/aws/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.14"></a>
## [0.7.14](https://github.com/aws/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* **jsii-dotnet-runtime:** Fix EPIPE on Windows. ([1d7cc8b](https://github.com/aws/jsii/commit/1d7cc8b)), closes [#341](https://github.com/aws/jsii/issues/341)
* **kernel:** Improve tagged type of wire values ([#346](https://github.com/aws/jsii/issues/346)) ([8ea39ac](https://github.com/aws/jsii/commit/8ea39ac)), closes [#345](https://github.com/aws/jsii/issues/345)




<a name="0.7.13"></a>
## [0.7.13](https://github.com/aws/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.12"></a>
## [0.7.12](https://github.com/aws/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)


### Bug Fixes

* **kernel:** Correctly return instances of un-exported types ([#321](https://github.com/aws/jsii/issues/321)) ([9c59acc](https://github.com/aws/jsii/commit/9c59acc))


### Features

* JSII_AGENT ([#325](https://github.com/aws/jsii/issues/325)) ([cf1d0c3](https://github.com/aws/jsii/commit/cf1d0c3)), closes [#324](https://github.com/aws/jsii/issues/324)




<a name="0.7.11"></a>
## [0.7.11](https://github.com/aws/jsii/compare/v0.7.10...v0.7.11) (2018-11-18)


### Bug Fixes

* **jsii-dotnet-runtime:** Proxy parameters should not throw exception. ([#317](https://github.com/aws/jsii/issues/317)) ([acc8f22](https://github.com/aws/jsii/commit/acc8f22)), closes [#316](https://github.com/aws/jsii/issues/316)
* **jsii-dotnet-runtime-test:** Floating calculator package version ([40881f0](https://github.com/aws/jsii/commit/40881f0))


### Features

* **jsii-dotnet-runtime:** Improve .NET Performance ([20321af](https://github.com/aws/jsii/commit/20321af)), closes [#304](https://github.com/aws/jsii/issues/304)




<a name="0.7.10"></a>
## [0.7.10](https://github.com/aws/jsii/compare/v0.7.9...v0.7.10) (2018-11-12)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.9"></a>
## [0.7.9](https://github.com/aws/jsii/compare/v0.7.8...v0.7.9) (2018-11-12)


### Bug Fixes

* **dotnet/runtime:** Incorrect callback response format ([#286](https://github.com/aws/jsii/issues/286)) ([1b851e1](https://github.com/aws/jsii/commit/1b851e1)), closes [#285](https://github.com/aws/jsii/issues/285)
* **jsii-runtime:** treat "null" as "undefined" ([#297](https://github.com/aws/jsii/issues/297)) ([43fb16a](https://github.com/aws/jsii/commit/43fb16a)), closes [awslabs/aws-cdk#157](https://github.com/awslabs/aws-cdk/issues/157) [#282](https://github.com/aws/jsii/issues/282)
* **runtime/dotnet:** Correct a number of type mappings ([#291](https://github.com/aws/jsii/issues/291)) ([0d59dab](https://github.com/aws/jsii/commit/0d59dab)), closes [#290](https://github.com/aws/jsii/issues/290) [awslabs/aws-cdk#1027](https://github.com/awslabs/aws-cdk/issues/1027)




<a name="0.7.8"></a>
## [0.7.8](https://github.com/aws/jsii/compare/v0.7.7...v0.7.8) (2018-10-23)


### Bug Fixes

* match behavioral interface to 'I'-prefix ([#271](https://github.com/aws/jsii/issues/271)) ([03103f3](https://github.com/aws/jsii/commit/03103f3))




<a name="0.7.7"></a>
## [0.7.7](https://github.com/aws/jsii/compare/v0.7.6...v0.7.7) (2018-10-10)


### Bug Fixes

* **dotnet:** abstract classes should have proxy implementations ([#241](https://github.com/aws/jsii/issues/241)) ([828a26f](https://github.com/aws/jsii/commit/828a26f)), closes [#223](https://github.com/aws/jsii/issues/223)
* **jsii:** support  public autoproperties in private constructor ([#256](https://github.com/aws/jsii/issues/256)) ([181012e](https://github.com/aws/jsii/commit/181012e))




<a name="0.7.6"></a>
## [0.7.6](https://github.com/aws/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.5"></a>
## [0.7.5](https://github.com/aws/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.4"></a>
## [0.7.4](https://github.com/aws/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.3"></a>
## [0.7.3](https://github.com/aws/jsii/compare/v0.7.2...v0.7.3) (2018-09-06)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.2"></a>
## [0.7.2](https://github.com/aws/jsii/compare/v0.7.1...v0.7.2) (2018-09-06)


### Features

* **jsii:** Re-implemented jsii to support --watch and produce better error reporting ([#188](https://github.com/aws/jsii/issues/188)) ([76472be](https://github.com/aws/jsii/commit/76472be))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/aws/jsii/compare/v0.7.0...v0.7.1) (2018-08-28)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.7.0"></a>
# [0.7.0](https://github.com/aws/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Features

* **jsii:** Further normalize assembly outputs ([#177](https://github.com/aws/jsii/issues/177)) ([de3f062](https://github.com/aws/jsii/commit/de3f062)), closes [#60](https://github.com/aws/jsii/issues/60)




<a name="0.7.0"></a>
# [0.7.0](https://github.com/aws/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Features

* **jsii:** Further normalize assembly outputs ([#177](https://github.com/aws/jsii/issues/177)) ([de3f062](https://github.com/aws/jsii/commit/de3f062)), closes [#60](https://github.com/aws/jsii/issues/60)




<a name="0.6.4"></a>
## [0.6.4](https://github.com/aws/jsii/compare/v0.6.3...v0.6.4) (2018-08-08)




**Note:** Version bump only for package jsii-dotnet-runtime-test

<a name="0.6.3"></a>
## [0.6.3](https://github.com/aws/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)




**Note:** Version bump only for package jsii-dotnet-runtime-test
