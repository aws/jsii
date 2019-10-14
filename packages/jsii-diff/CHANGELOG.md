# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.19.0](https://github.com/aws/jsii/compare/v0.18.0...v0.19.0) (2019-10-14)


### Bug Fixes

* **jsii-diff:** add 'main' property to package.json ([#877](https://github.com/aws/jsii/issues/877)) ([670d94a](https://github.com/aws/jsii/commit/670d94a6815e2f06552e7249b4fbb771664a2a30))


### Features

* **sampiler:** translate code samples to Python ([#827](https://github.com/aws/jsii/issues/827)) ([c9a7002](https://github.com/aws/jsii/commit/c9a7002431c0db6224d595eb5555b916036d4575))





# [0.18.0](https://github.com/aws/jsii/compare/v0.17.1...v0.18.0) (2019-10-01)


### Features

* configure `engines` with `node >= 10.3.0` ([#795](https://github.com/aws/jsii/issues/795)) ([6164b6b](https://github.com/aws/jsii/commit/6164b6b)), closes [#794](https://github.com/aws/jsii/issues/794)





## [0.17.1](https://github.com/aws/jsii/compare/v0.17.0...v0.17.1) (2019-09-30)

**Note:** Version bump only for package jsii-diff





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)

**Note:** Version bump only for package jsii-diff





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)


### Bug Fixes

* **jsii-diff:** handle violations in Enums ([#730](https://github.com/aws/jsii/issues/730)) ([934b5c8](https://github.com/aws/jsii/commit/934b5c8))





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)

**Note:** Version bump only for package jsii-diff





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)

**Note:** Version bump only for package jsii-diff





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)

**Note:** Version bump only for package jsii-diff





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)


### Bug Fixes

* fix usage of "external" stability ([#639](https://github.com/aws/jsii/issues/639)) ([30dea87](https://github.com/aws/jsii/commit/30dea87))





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)


### Features

* **jsii-diff:** also check stability transitions ([#592](https://github.com/aws/jsii/issues/592)) ([15f77b5](https://github.com/aws/jsii/commit/15f77b5))
* add support for "external" stability ([#596](https://github.com/aws/jsii/issues/596)) ([dd66afb](https://github.com/aws/jsii/commit/dd66afb))





# [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)

**Note:** Version bump only for package jsii-diff





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii-diff





## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)

**Note:** Version bump only for package jsii-diff





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)


### Bug Fixes

* **jsii-diff:** handle recursive types ([#558](https://github.com/aws/jsii/issues/558)) ([3c43be1](https://github.com/aws/jsii/commit/3c43be1))





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)

**Note:** Version bump only for package jsii-diff





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Features

* **jsii:** enforce enum member names to be ALL_CAPS ([#541](https://github.com/aws/jsii/issues/541)) ([c88080d](https://github.com/aws/jsii/commit/c88080d)), closes [awslabs/aws-cdk#2287](https://github.com/awslabs/aws-cdk/issues/2287)
* **jsii-diff:** extend reporting options ([#547](https://github.com/aws/jsii/issues/547)) ([719be24](https://github.com/aws/jsii/commit/719be24))


### BREAKING CHANGES

* **jsii:** Enum members are now expected to be `ALL_CAPS`





## [0.11.3](https://github.com/aws/jsii/compare/v0.11.2...v0.11.3) (2019-06-18)

**Note:** Version bump only for package jsii-diff





## [0.11.2](https://github.com/aws/jsii/compare/v0.11.1...v0.11.2) (2019-06-07)


### Bug Fixes

* **java:** Escape `*/` in package-info.java ([#526](https://github.com/aws/jsii/issues/526)) ([4e7ea98](https://github.com/aws/jsii/commit/4e7ea98))





## [0.11.1](https://github.com/aws/jsii/compare/v0.11.0...v0.11.1) (2019-06-07)


### Bug Fixes

* **jsii-diff:** crash when changing method to a property ([#521](https://github.com/aws/jsii/issues/521)) ([28241cd](https://github.com/aws/jsii/commit/28241cd)), closes [#520](https://github.com/aws/jsii/issues/520)





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)


### Bug Fixes

* **jsii-diff:** catch exception if type disappeared from other assembly ([#504](https://github.com/aws/jsii/issues/504)) ([8d11900](https://github.com/aws/jsii/commit/8d11900))
* **jsii-diff:** correctly handle assignability of type unions ([#500](https://github.com/aws/jsii/issues/500)) ([04c061e](https://github.com/aws/jsii/commit/04c061e))
* **jsii-diff:** don't fail on new packages ([#502](https://github.com/aws/jsii/issues/502)) ([d1d0633](https://github.com/aws/jsii/commit/d1d0633))





## [0.10.5](https://github.com/aws/jsii/compare/v0.10.4...v0.10.5) (2019-05-06)

**Note:** Version bump only for package jsii-diff





## [0.10.4](https://github.com/aws/jsii/compare/v0.10.3...v0.10.4) (2019-05-05)

**Note:** Version bump only for package jsii-diff





## [0.10.3](https://github.com/aws/jsii/compare/v0.10.2...v0.10.3) (2019-04-24)


### Bug Fixes

* **java:** fix illegal arguments passed to JavaDoc generator ([#475](https://github.com/aws/jsii/issues/475)) ([4456138](https://github.com/aws/jsii/commit/4456138))
* **jsii-diff:** be nicer about validation errors ([#481](https://github.com/aws/jsii/issues/481)) ([fa4d000](https://github.com/aws/jsii/commit/fa4d000))





## [0.10.2](https://github.com/aws/jsii/compare/v0.10.1...v0.10.2) (2019-04-18)

**Note:** Version bump only for package jsii-diff





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)

**Note:** Version bump only for package jsii-diff





# [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)


### Bug Fixes

* **jsii-reflect:** don't load same assembly multiple times ([#461](https://github.com/aws/jsii/issues/461)) ([3a6b21c](https://github.com/aws/jsii/commit/3a6b21c))


### Features

* **jsii-spec:** Model parameter optionality ([#432](https://github.com/aws/jsii/issues/432)) ([21e485a](https://github.com/aws/jsii/commit/21e485a)), closes [#296](https://github.com/aws/jsii/issues/296) [#414](https://github.com/aws/jsii/issues/414)


### BREAKING CHANGES

* **jsii-spec:** JSII assemblies generated by older versions of the tool
will fail loading with this new version, and vice-versa. Re-compile your
projects in order to fix this.





# [0.9.0](https://github.com/aws/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


### Features

* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/aws/jsii/issues/415)) ([9cfd867](https://github.com/aws/jsii/commit/9cfd867))
