# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.20.8](https://github.com/aws/jsii/compare/v0.20.7...v0.20.8) (2019-11-24)

**Note:** Version bump only for package jsii-python-runtime





## [0.20.7](https://github.com/aws/jsii/compare/v0.20.5...v0.20.7) (2019-11-18)


### Bug Fixes

* **java:** handle null-able collections correctly ([#986](https://github.com/aws/jsii/issues/986)) ([e88e5e2](https://github.com/aws/jsii/commit/e88e5e2dc3db75dc9cbae494185ae65100783544)), closes [aws/aws-cdk#4316](https://github.com/aws/aws-cdk/issues/4316)
* **java:** remove Jackson confusion with certain patterns ([#987](https://github.com/aws/jsii/issues/987)) ([a8096b7](https://github.com/aws/jsii/commit/a8096b7a68472067ec8d17c31b378f5841015b03)), closes [aws/aws-cdk#4080](https://github.com/aws/aws-cdk/issues/4080)
* **kernel:** cannot pass decorated structs to kernel as "any" ([#997](https://github.com/aws/jsii/issues/997)) ([2bd3183](https://github.com/aws/jsii/commit/2bd318358781c629085cbe594dfd0cc2b554f308)), closes [aws/aws-cdk#5066](https://github.com/aws/aws-cdk/issues/5066)


### Features

* **rosetta:** extract and compile samples into "tablets" ([#925](https://github.com/aws/jsii/issues/925)) ([eec44e1](https://github.com/aws/jsii/commit/eec44e106ee1e3d2e3d03f70e4d87a4d7ee0bbba))





## [0.20.6](https://github.com/aws/jsii/compare/v0.20.5...v0.20.6) (2019-11-14)


### Bug Fixes

* **python:** dynamic proxies handling of setters ([eec9640](https://github.com/aws/jsii/commit/eec96403fea1e940b744e40d54a35535b766851d)), closes [aws/aws-cdk#5032](https://github.com/aws/aws-cdk/issues/5032)





## [0.20.5](https://github.com/aws/jsii/compare/v0.20.4...v0.20.5) (2019-11-13)


### Bug Fixes

* **dotnet:** allow down-casting to parent interface type ([#983](https://github.com/aws/jsii/issues/983)) ([8a390e5](https://github.com/aws/jsii/commit/8a390e579a7cae2bbe386eaefb1c7a9084210a7f)), closes [#982](https://github.com/aws/jsii/issues/982)
* **python:** correctly handle interface declarations on returned objects ([#980](https://github.com/aws/jsii/issues/980)) ([c2de100](https://github.com/aws/jsii/commit/c2de100ecdf30dacfbad94cb4ff071feb22b2fc2))





## [0.20.4](https://github.com/aws/jsii/compare/v0.20.3...v0.20.4) (2019-11-12)


### Bug Fixes

* **python:** correctly handle nested structs-as-dict ([#973](https://github.com/aws/jsii/issues/973)) ([9fd2499](https://github.com/aws/jsii/commit/9fd2499388745cf63d194a47bf247e5e24f4a7db))





## [0.20.3](https://github.com/aws/jsii/compare/v0.20.2...v0.20.3) (2019-11-11)


### Bug Fixes

* **kernel:** correctly de-serialize mappings as JSON ([#968](https://github.com/aws/jsii/issues/968)) ([5d056f4](https://github.com/aws/jsii/commit/5d056f44ca1fb47c9ad64f622d300e5f35adc474))





## [0.20.2](https://github.com/aws/jsii/compare/v0.20.1...v0.20.2) (2019-11-08)

**Note:** Version bump only for package jsii-python-runtime





## [0.20.1](https://github.com/aws/jsii/compare/v0.20.0...v0.20.1) (2019-11-06)


### Bug Fixes

* **kernel:** revert behavior change around `any` serialization ([#932](https://github.com/aws/jsii/issues/932)) ([2f47543](https://github.com/aws/jsii/commit/2f475437847b10377e5b91cc42bd752d1f2e06c4)), closes [#825](https://github.com/aws/jsii/issues/825)





## [0.20.0](https://github.com/aws/jsii/compare/v0.19.0...v0.20.0) (2019-10-30)


### Bug Fixes

* **kernel:** correct deserialization of structs in union contexts ([#919](https://github.com/aws/jsii/issues/919)) ([c0f338e](https://github.com/aws/jsii/commit/c0f338e289f6523f207bbdd3d9249a998bc370b9)), closes [#822](https://github.com/aws/jsii/issues/822) [aws/aws-cdk#3917](https://github.com/aws/aws-cdk/issues/3917) [aws/aws-cdk#2013](https://github.com/aws/aws-cdk/issues/2013)


### Features

* **kernel:** annotate implemented interfaces on "ObjRef"s ([#825](https://github.com/aws/jsii/issues/825)) ([a4e2095](https://github.com/aws/jsii/commit/a4e209539190cbe156462364f2617e9a05c5589c))





# [0.19.0](https://github.com/aws/jsii/compare/v0.18.0...v0.19.0) (2019-10-14)

**Note:** Version bump only for package jsii-python-runtime





# [0.18.0](https://github.com/aws/jsii/compare/v0.17.1...v0.18.0) (2019-10-01)


### Bug Fixes

* **python:** clear error message when trying to serialize function ([#824](https://github.com/aws/jsii/issues/824)) ([2eb6422](https://github.com/aws/jsii/commit/2eb6422)), closes [aws/aws-cdk#4064](https://github.com/aws/aws-cdk/issues/4064)


### Features

* configure `engines` with `node >= 10.3.0` ([#795](https://github.com/aws/jsii/issues/795)) ([6164b6b](https://github.com/aws/jsii/commit/6164b6b)), closes [#794](https://github.com/aws/jsii/issues/794)





## [0.17.1](https://github.com/aws/jsii/compare/v0.17.0...v0.17.1) (2019-09-30)

**Note:** Version bump only for package jsii-python-runtime





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)

**Note:** Version bump only for package jsii-python-runtime





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)

**Note:** Version bump only for package jsii-python-runtime





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)

**Note:** Version bump only for package jsii-python-runtime





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)

**Note:** Version bump only for package jsii-python-runtime





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)

**Note:** Version bump only for package jsii-python-runtime





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)

**Note:** Version bump only for package jsii-python-runtime





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)


### Bug Fixes

* **build:** fix python runtime BaseProvider signatures ([#601](https://github.com/aws/jsii/issues/601)) ([6526469](https://github.com/aws/jsii/commit/6526469))
* **kernel:** validate presence of required struct properties ([#591](https://github.com/aws/jsii/issues/591)) ([90135f9](https://github.com/aws/jsii/commit/90135f9))





# [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)


### Features

* **python:** idiomatic capitalization for structs ([#586](https://github.com/aws/jsii/issues/586)) ([51211a0](https://github.com/aws/jsii/commit/51211a0)), closes [#537](https://github.com/aws/jsii/issues/537) [#577](https://github.com/aws/jsii/issues/577) [#578](https://github.com/aws/jsii/issues/578) [#588](https://github.com/aws/jsii/issues/588)





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii-python-runtime





## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)


### Bug Fixes

* **.net:** occasional incorrect param type cast ([#568](https://github.com/aws/jsii/issues/568)) ([c89d0fa](https://github.com/aws/jsii/commit/c89d0fa)), closes [awslabs/aws-cdk#3093](https://github.com/awslabs/aws-cdk/issues/3093)





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)

**Note:** Version bump only for package jsii-python-runtime





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)

**Note:** Version bump only for package jsii-python-runtime





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Features

* **jsii:** enforce enum member names to be ALL_CAPS ([#541](https://github.com/aws/jsii/issues/541)) ([c88080d](https://github.com/aws/jsii/commit/c88080d)), closes [awslabs/aws-cdk#2287](https://github.com/awslabs/aws-cdk/issues/2287)


### BREAKING CHANGES

* **jsii:** Enum members are now expected to be `ALL_CAPS`





## [0.11.3](https://github.com/aws/jsii/compare/v0.11.2...v0.11.3) (2019-06-18)

**Note:** Version bump only for package jsii-python-runtime





## [0.11.2](https://github.com/aws/jsii/compare/v0.11.1...v0.11.2) (2019-06-07)

**Note:** Version bump only for package jsii-python-runtime





## [0.11.1](https://github.com/aws/jsii/compare/v0.11.0...v0.11.1) (2019-06-07)


### Bug Fixes

* **python:** support variadic arguments ([#513](https://github.com/aws/jsii/issues/513)) ([695ca6b](https://github.com/aws/jsii/commit/695ca6b))





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)

**Note:** Version bump only for package jsii-python-runtime





## [0.10.5](https://github.com/aws/jsii/compare/v0.10.4...v0.10.5) (2019-05-06)

**Note:** Version bump only for package jsii-python-runtime





## [0.10.4](https://github.com/aws/jsii/compare/v0.10.3...v0.10.4) (2019-05-05)

**Note:** Version bump only for package jsii-python-runtime





## [0.10.3](https://github.com/aws/jsii/compare/v0.10.2...v0.10.3) (2019-04-24)


### Bug Fixes

* **python:** maintain inheritance chain for structs ([#482](https://github.com/aws/jsii/issues/482)) ([607f151](https://github.com/aws/jsii/commit/607f151)), closes [#473](https://github.com/aws/jsii/issues/473)





## [0.10.2](https://github.com/aws/jsii/compare/v0.10.1...v0.10.2) (2019-04-18)

**Note:** Version bump only for package jsii-python-runtime





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)

**Note:** Version bump only for package jsii-python-runtime





# [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)

**Note:** Version bump only for package jsii-python-runtime





# [0.9.0](https://github.com/aws/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


### Features

* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/aws/jsii/issues/415)) ([9cfd867](https://github.com/aws/jsii/commit/9cfd867))





## [0.8.2](https://github.com/aws/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)


### Features

* **python:** Add support for synchronous callbacks ([#407](https://github.com/aws/jsii/issues/407)) ([4cb91b3](https://github.com/aws/jsii/commit/4cb91b3))





## [0.8.1](https://github.com/aws/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **kernel:** make type serialization explicit and recursive ([#401](https://github.com/aws/jsii/issues/401)) ([0a83d52](https://github.com/aws/jsii/commit/0a83d52)), closes [awslabs/aws-cdk#1981](https://github.com/awslabs/aws-cdk/issues/1981)
* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/aws/jsii/issues/395)) ([850f42b](https://github.com/aws/jsii/commit/850f42b))





# [0.8.0](https://github.com/aws/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* Fix Async function support in Python ([b5d49de](https://github.com/aws/jsii/commit/b5d49de))
* Fix permissions error in pipeline when generating Python runtime ([af1346f](https://github.com/aws/jsii/commit/af1346f))
* Proxy interface literals in the generated Python code ([10242eb](https://github.com/aws/jsii/commit/10242eb))
* Python's abstract class proxies now inherit from parent's proxy ([6f1c9c0](https://github.com/aws/jsii/commit/6f1c9c0))


### Features

* Add Python Support ([cc3ec87](https://github.com/aws/jsii/commit/cc3ec87))
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/aws/jsii/issues/376)) ([db3ccdf](https://github.com/aws/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/aws/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
