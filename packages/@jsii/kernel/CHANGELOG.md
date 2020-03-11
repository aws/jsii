# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [1.1.0](https://github.com/aws/jsii/compare/v1.0.0...v1.1.0) (2020-03-10)

**Note:** Version bump only for package @jsii/kernel





# [1.0.0](https://github.com/aws/jsii/compare/v0.22.0...v1.0.0) (2020-02-17)

**Note:** Version bump only for package @jsii/kernel





# [0.22.0](https://github.com/aws/jsii/compare/v0.21.2...v0.22.0) (2020-02-06)

**Note:** Version bump only for package @jsii/kernel





## [0.21.2](https://github.com/aws/jsii/compare/v0.21.1...v0.21.2) (2020-01-22)


### Bug Fixes

* poor error message on scalar deserialization type mismatch ([#1187](https://github.com/aws/jsii/issues/1187)) ([fdf8927](https://github.com/aws/jsii/commit/fdf8927314a6953d4c206a0c69df510ddcc2eaf0))





## [0.21.1](https://github.com/aws/jsii/compare/v0.21.0...v0.21.1) (2020-01-03)

**Note:** Version bump only for package @jsii/kernel





# [0.21.0](https://github.com/aws/jsii/compare/v0.20.11...v0.21.0) (2020-01-02)

**Note:** Version bump only for package @jsii/kernel





## [0.20.11](https://github.com/aws/jsii/compare/v0.20.10...v0.20.11) (2019-12-13)

**Note:** Version bump only for package @jsii/kernel





## [0.20.10](https://github.com/aws/jsii/compare/v0.20.9...v0.20.10) (2019-12-13)

**Note:** Version bump only for package @jsii/kernel





## [0.20.9](https://github.com/aws/jsii/compare/v0.20.8...v0.20.9) (2019-12-11)

**Note:** Version bump only for package @jsii/kernel





## [0.20.8](https://github.com/aws/jsii/compare/v0.20.7...v0.20.8) (2019-11-24)

**Note:** Version bump only for package jsii-kernel





## [0.20.7](https://github.com/aws/jsii/compare/v0.20.5...v0.20.7) (2019-11-18)


### Bug Fixes

* **kernel:** cannot pass decorated structs to kernel as "any" ([#997](https://github.com/aws/jsii/issues/997)) ([2bd3183](https://github.com/aws/jsii/commit/2bd318358781c629085cbe594dfd0cc2b554f308)), closes [aws/aws-cdk#5066](https://github.com/aws/aws-cdk/issues/5066)





## [0.20.6](https://github.com/aws/jsii/compare/v0.20.5...v0.20.6) (2019-11-14)

**Note:** Version bump only for package jsii-kernel





## [0.20.5](https://github.com/aws/jsii/compare/v0.20.4...v0.20.5) (2019-11-13)

**Note:** Version bump only for package jsii-kernel




## [0.20.4](https://github.com/aws/jsii/compare/v0.20.3...v0.20.4) (2019-11-12)


### Bug Fixes

* **python:** correctly handle nested structs-as-dict ([#973](https://github.com/aws/jsii/issues/973)) ([9fd2499](https://github.com/aws/jsii/commit/9fd2499388745cf63d194a47bf247e5e24f4a7db))





## [0.20.3](https://github.com/aws/jsii/compare/v0.20.2...v0.20.3) (2019-11-11)


### Bug Fixes

* **kernel:** correctly de-serialize mappings as JSON ([#968](https://github.com/aws/jsii/issues/968)) ([5d056f4](https://github.com/aws/jsii/commit/5d056f44ca1fb47c9ad64f622d300e5f35adc474))





## [0.20.2](https://github.com/aws/jsii/compare/v0.20.1...v0.20.2) (2019-11-08)


### Bug Fixes

* **runtime:** make kernel 'load' operation synchronous ([#951](https://github.com/aws/jsii/issues/951)) ([896d688](https://github.com/aws/jsii/commit/896d688bd33b26e5af1a3f044cb5e47e5d304c03))





## [0.20.1](https://github.com/aws/jsii/compare/v0.20.0...v0.20.1) (2019-11-06)


### Bug Fixes

* **kernel:** revert behavior change around `any` serialization ([#932](https://github.com/aws/jsii/issues/932)) ([2f47543](https://github.com/aws/jsii/commit/2f475437847b10377e5b91cc42bd752d1f2e06c4)), closes [#825](https://github.com/aws/jsii/issues/825)





## [0.20.0](https://github.com/aws/jsii/compare/v0.19.0...v0.20.0) (2019-10-30)


### Bug Fixes

* **kernel:** correct deserialization of structs in union contexts ([#919](https://github.com/aws/jsii/issues/919)) ([c0f338e](https://github.com/aws/jsii/commit/c0f338e289f6523f207bbdd3d9249a998bc370b9)), closes [#822](https://github.com/aws/jsii/issues/822) [aws/aws-cdk#3917](https://github.com/aws/aws-cdk/issues/3917) [aws/aws-cdk#2013](https://github.com/aws/aws-cdk/issues/2013)


### Features

* **kernel:** annotate implemented interfaces on "ObjRef"s ([#825](https://github.com/aws/jsii/issues/825)) ([a4e2095](https://github.com/aws/jsii/commit/a4e209539190cbe156462364f2617e9a05c5589c))
* **pacmak:** build all java targets at once ([#849](https://github.com/aws/jsii/issues/849)) ([5d7824d](https://github.com/aws/jsii/commit/5d7824d5f0aa35625fc56b8301bc27a1e5691d46))





# [0.19.0](https://github.com/aws/jsii/compare/v0.18.0...v0.19.0) (2019-10-14)


### Features

* **sampiler:** translate code samples to Python ([#827](https://github.com/aws/jsii/issues/827)) ([c9a7002](https://github.com/aws/jsii/commit/c9a7002431c0db6224d595eb5555b916036d4575))





# [0.18.0](https://github.com/aws/jsii/compare/v0.17.1...v0.18.0) (2019-10-01)


### Features

* configure `engines` with `node >= 10.3.0` ([#795](https://github.com/aws/jsii/issues/795)) ([6164b6b](https://github.com/aws/jsii/commit/6164b6b)), closes [#794](https://github.com/aws/jsii/issues/794)
* configure AWS logo for NuGet packages ([#797](https://github.com/aws/jsii/issues/797)) ([04305ce](https://github.com/aws/jsii/commit/04305ce))





## [0.17.1](https://github.com/aws/jsii/compare/v0.17.0...v0.17.1) (2019-09-30)

**Note:** Version bump only for package jsii-kernel





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)

**Note:** Version bump only for package jsii-kernel





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)


### Bug Fixes

* **kernel:** correctly serialize enum values ([#754](https://github.com/aws/jsii/issues/754)) ([41ed25d](https://github.com/aws/jsii/commit/41ed25d)), closes [#753](https://github.com/aws/jsii/issues/753)





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)

**Note:** Version bump only for package jsii-kernel





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)

**Note:** Version bump only for package jsii-kernel





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)

**Note:** Version bump only for package jsii-kernel





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)


### Bug Fixes

* fix usage of "external" stability ([#639](https://github.com/aws/jsii/issues/639)) ([30dea87](https://github.com/aws/jsii/commit/30dea87))





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)


### Bug Fixes

* **kernel:** validate presence of required struct properties ([#591](https://github.com/aws/jsii/issues/591)) ([90135f9](https://github.com/aws/jsii/commit/90135f9))





# [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)

**Note:** Version bump only for package jsii-kernel





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii-kernel





## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)

**Note:** Version bump only for package jsii-kernel





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)


### Features

* **pacmak:** support adding a suffix to Java package version ([#552](https://github.com/aws/jsii/issues/552)) ([dfde37a](https://github.com/aws/jsii/commit/dfde37a))
* **pacmak:** support adding suffix to .NET package versions ([#557](https://github.com/aws/jsii/issues/557)) ([99adf19](https://github.com/aws/jsii/commit/99adf19))





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)


### Bug Fixes

* **kernel:** properly deserialize structs passed in byref ([#554](https://github.com/aws/jsii/issues/554)) ([1e89aab](https://github.com/aws/jsii/commit/1e89aab)), closes [#553](https://github.com/aws/jsii/issues/553)





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Features

* **jsii:** enforce enum member names to be ALL_CAPS ([#541](https://github.com/aws/jsii/issues/541)) ([c88080d](https://github.com/aws/jsii/commit/c88080d)), closes [awslabs/aws-cdk#2287](https://github.com/awslabs/aws-cdk/issues/2287)


### BREAKING CHANGES

* **jsii:** Enum members are now expected to be `ALL_CAPS`





## [0.11.3](https://github.com/aws/jsii/compare/v0.11.2...v0.11.3) (2019-06-18)

**Note:** Version bump only for package jsii-kernel





## [0.11.2](https://github.com/aws/jsii/compare/v0.11.1...v0.11.2) (2019-06-07)


### Bug Fixes

* **java:** Escape `*/` in package-info.java ([#526](https://github.com/aws/jsii/issues/526)) ([4e7ea98](https://github.com/aws/jsii/commit/4e7ea98))
* **kernel:** Correct null handling in JSON types ([#523](https://github.com/aws/jsii/issues/523)) ([7ffa98d](https://github.com/aws/jsii/commit/7ffa98d))





## [0.11.1](https://github.com/aws/jsii/compare/v0.11.0...v0.11.1) (2019-06-07)

**Note:** Version bump only for package jsii-kernel





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)

**Note:** Version bump only for package jsii-kernel





## [0.10.5](https://github.com/aws/jsii/compare/v0.10.4...v0.10.5) (2019-05-06)

**Note:** Version bump only for package jsii-kernel





## [0.10.4](https://github.com/aws/jsii/compare/v0.10.3...v0.10.4) (2019-05-05)

**Note:** Version bump only for package jsii-kernel





## [0.10.3](https://github.com/aws/jsii/compare/v0.10.2...v0.10.3) (2019-04-24)


### Bug Fixes

* **java:** fix illegal arguments passed to JavaDoc generator ([#475](https://github.com/aws/jsii/issues/475)) ([4456138](https://github.com/aws/jsii/commit/4456138))





## [0.10.2](https://github.com/aws/jsii/compare/v0.10.1...v0.10.2) (2019-04-18)

**Note:** Version bump only for package jsii-kernel





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)

**Note:** Version bump only for package jsii-kernel





# [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)


### Bug Fixes

* **kernel:** Set `this` in static contexts ([#460](https://github.com/aws/jsii/issues/460)) ([c81b4c1](https://github.com/aws/jsii/commit/c81b4c1)), closes [awslabs/aws-cdk#2304](https://github.com/awslabs/aws-cdk/issues/2304)


### Features

* **jsii-spec:** Model parameter optionality ([#432](https://github.com/aws/jsii/issues/432)) ([21e485a](https://github.com/aws/jsii/commit/21e485a)), closes [#296](https://github.com/aws/jsii/issues/296) [#414](https://github.com/aws/jsii/issues/414)


### BREAKING CHANGES

* **jsii-spec:** JSII assemblies generated by older versions of the tool
will fail loading with this new version, and vice-versa. Re-compile your
projects in order to fix this.





# [0.9.0](https://github.com/aws/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


### Features

* **jsii:** Enforce use of peerDependencies ([#421](https://github.com/aws/jsii/issues/421)) ([e72fea5](https://github.com/aws/jsii/commit/e72fea5)), closes [#361](https://github.com/aws/jsii/issues/361)
* **jsii:** Erase un-exported base classes instead of prohibiting those ([#425](https://github.com/aws/jsii/issues/425)) ([d006f5c](https://github.com/aws/jsii/commit/d006f5c)), closes [#417](https://github.com/aws/jsii/issues/417)
* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/aws/jsii/issues/415)) ([9cfd867](https://github.com/aws/jsii/commit/9cfd867))
* **kernel:** Normalize empty structs to undefined ([#416](https://github.com/aws/jsii/issues/416)) ([a8ee954](https://github.com/aws/jsii/commit/a8ee954)), closes [#411](https://github.com/aws/jsii/issues/411)


### BREAKING CHANGES

* **jsii:** All direct dependencies must be duplicated in
                 peerDependencies unless they are in bundledDependencies.





## [0.8.2](https://github.com/aws/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)


### Bug Fixes

* **kernel:** Transitively consider properties when deserializing structs ([#409](https://github.com/aws/jsii/issues/409)) ([66789e8](https://github.com/aws/jsii/commit/66789e8))





## [0.8.1](https://github.com/aws/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **kernel:** make type serialization explicit and recursive ([#401](https://github.com/aws/jsii/issues/401)) ([0a83d52](https://github.com/aws/jsii/commit/0a83d52)), closes [awslabs/aws-cdk#1981](https://github.com/awslabs/aws-cdk/issues/1981)
* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/aws/jsii/issues/395)) ([850f42b](https://github.com/aws/jsii/commit/850f42b))





# [0.8.0](https://github.com/aws/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Features

* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/aws/jsii/issues/376)) ([db3ccdf](https://github.com/aws/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/aws/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/aws/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.14"></a>
## [0.7.14](https://github.com/aws/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* **kernel:** Improve tagged type of wire values ([#346](https://github.com/aws/jsii/issues/346)) ([8ea39ac](https://github.com/aws/jsii/commit/8ea39ac)), closes [#345](https://github.com/aws/jsii/issues/345)




<a name="0.7.13"></a>
## [0.7.13](https://github.com/aws/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.12"></a>
## [0.7.12](https://github.com/aws/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)


### Bug Fixes

* **kernel:** Correctly return instances of un-exported types ([#321](https://github.com/aws/jsii/issues/321)) ([9c59acc](https://github.com/aws/jsii/commit/9c59acc))


### Features

* JSII_AGENT ([#325](https://github.com/aws/jsii/issues/325)) ([cf1d0c3](https://github.com/aws/jsii/commit/cf1d0c3)), closes [#324](https://github.com/aws/jsii/issues/324)




<a name="0.7.11"></a>
## [0.7.11](https://github.com/aws/jsii/compare/v0.7.10...v0.7.11) (2018-11-18)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.10"></a>
## [0.7.10](https://github.com/aws/jsii/compare/v0.7.9...v0.7.10) (2018-11-12)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.9"></a>
## [0.7.9](https://github.com/aws/jsii/compare/v0.7.8...v0.7.9) (2018-11-12)


### Bug Fixes

* **jsii-runtime:** treat "null" as "undefined" ([#297](https://github.com/aws/jsii/issues/297)) ([43fb16a](https://github.com/aws/jsii/commit/43fb16a)), closes [awslabs/aws-cdk#157](https://github.com/awslabs/aws-cdk/issues/157) [#282](https://github.com/aws/jsii/issues/282)




<a name="0.7.8"></a>
## [0.7.8](https://github.com/aws/jsii/compare/v0.7.7...v0.7.8) (2018-10-23)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.7"></a>
## [0.7.7](https://github.com/aws/jsii/compare/v0.7.6...v0.7.7) (2018-10-10)


### Bug Fixes

* **kernel:** Return object literals as references ([#249](https://github.com/aws/jsii/issues/249)) ([61cb3a4](https://github.com/aws/jsii/commit/61cb3a4)), closes [#248](https://github.com/aws/jsii/issues/248) [awslabs/aws-cdk#774](https://github.com/awslabs/aws-cdk/issues/774)




<a name="0.7.6"></a>
## [0.7.6](https://github.com/aws/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.5"></a>
## [0.7.5](https://github.com/aws/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)


### Bug Fixes

* **java:** support abstract return types ([#224](https://github.com/aws/jsii/issues/224)) ([3257223](https://github.com/aws/jsii/commit/3257223)), closes [#220](https://github.com/aws/jsii/issues/220) [#223](https://github.com/aws/jsii/issues/223) [awslabs/aws-cdk#680](https://github.com/awslabs/aws-cdk/issues/680)




<a name="0.7.4"></a>
## [0.7.4](https://github.com/aws/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.3"></a>
## [0.7.3](https://github.com/aws/jsii/compare/v0.7.2...v0.7.3) (2018-09-06)




**Note:** Version bump only for package jsii-kernel

<a name="0.7.2"></a>
## [0.7.2](https://github.com/aws/jsii/compare/v0.7.1...v0.7.2) (2018-09-06)


### Features

* **jsii:** Re-implemented jsii to support --watch and produce better error reporting ([#188](https://github.com/aws/jsii/issues/188)) ([76472be](https://github.com/aws/jsii/commit/76472be))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/aws/jsii/compare/v0.7.0...v0.7.1) (2018-08-28)

### Bug Fixes

* **jsii-kernel:** Fix module loading on systems that use '\' instead of '/' as the path separator ([#193](https://github.com/aws/jsii/issues/193)) ([9e42991](https://github.com/aws/jsii/pull/193/commits/9e42991c9dad214935d10497c18279cb29c3b613))


<a name="0.7.0"></a>
# [0.7.0](https://github.com/aws/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Bug Fixes

* **kernel:** can't find temp directory on Windows ([#184](https://github.com/aws/jsii/issues/184)) ([1aec545](https://github.com/aws/jsii/commit/1aec545)), closes [#183](https://github.com/aws/jsii/issues/183)




<a name="0.7.0"></a>
# [0.7.0](https://github.com/aws/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Bug Fixes

* **kernel:** can't find temp directory on Windows ([#184](https://github.com/aws/jsii/issues/184)) ([1aec545](https://github.com/aws/jsii/commit/1aec545)), closes [#183](https://github.com/aws/jsii/issues/183)




<a name="0.6.4"></a>
## [0.6.4](https://github.com/aws/jsii/compare/v0.6.3...v0.6.4) (2018-08-08)




**Note:** Version bump only for package jsii-kernel

<a name="0.6.3"></a>
## [0.6.3](https://github.com/aws/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)




**Note:** Version bump only for package jsii-kernel

<a name="0.6.2"></a>
## 0.6.2 (2018-08-07)


### Bug Fixes

* "Malformed enum value" when using [@scoped](https://github.com/scoped) packages ([#139](https://github.com/aws/jsii/issues/139)) ([4e70209](https://github.com/aws/jsii/commit/4e70209)), closes [#138](https://github.com/aws/jsii/issues/138)
