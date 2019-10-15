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

**Note:** Version bump only for package jsii-reflect





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)


### Features

* **java:** use immutable java implementations of JSII primitive collection types array and map ([#765](https://github.com/aws/jsii/issues/765)) ([5e713e3](https://github.com/aws/jsii/commit/5e713e3))





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)


### Bug Fixes

* **kernel:** correctly serialize enum values ([#754](https://github.com/aws/jsii/issues/754)) ([41ed25d](https://github.com/aws/jsii/commit/41ed25d)), closes [#753](https://github.com/aws/jsii/issues/753)





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)


### Bug Fixes

* **dotnet:** add missing GetInterfaceType in the .NET runtime ([#703](https://github.com/aws/jsii/issues/703)) ([56617b1](https://github.com/aws/jsii/commit/56617b1)), closes [/docs.aws.amazon.com/cdk/api/latest/dotnet/api/Amazon.CDK.AWS.EC2.Vpc.html#Amazon_CDK_AWS_EC2](https://github.com//docs.aws.amazon.com/cdk/api/latest/dotnet/api/Amazon.CDK.AWS.EC2.Vpc.html/issues/Amazon_CDK_AWS_EC2) [aws/aws-cdk#2362](https://github.com/aws/aws-cdk/issues/2362)


### Features

* **java:** detect & rename members named after reserved words ([#705](https://github.com/aws/jsii/issues/705)) ([32bc117](https://github.com/aws/jsii/commit/32bc117))





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)


### Bug Fixes

* **dotnet:** stop mutating Dictionary when iterating on it ([#691](https://github.com/aws/jsii/issues/691)) ([8aedfc9](https://github.com/aws/jsii/commit/8aedfc9)), closes [#690](https://github.com/aws/jsii/issues/690)
* **java:** improve property override detection ([#692](https://github.com/aws/jsii/issues/692)) ([d90b304](https://github.com/aws/jsii/commit/d90b304))


### Features

* **java:** overhauled structs with native implementation, builders, ...  ([#694](https://github.com/aws/jsii/issues/694)) ([b0b3fd2](https://github.com/aws/jsii/commit/b0b3fd2)), closes [#525](https://github.com/aws/jsii/issues/525)





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)

**Note:** Version bump only for package jsii-reflect





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)


### Bug Fixes

* fix usage of "external" stability ([#639](https://github.com/aws/jsii/issues/639)) ([30dea87](https://github.com/aws/jsii/commit/30dea87))





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)


### Bug Fixes

* **kernel:** validate presence of required struct properties ([#591](https://github.com/aws/jsii/issues/591)) ([90135f9](https://github.com/aws/jsii/commit/90135f9))


### Features

* add support for "external" stability ([#596](https://github.com/aws/jsii/issues/596)) ([dd66afb](https://github.com/aws/jsii/commit/dd66afb))





# [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)


### Features

* **python:** idiomatic capitalization for structs ([#586](https://github.com/aws/jsii/issues/586)) ([51211a0](https://github.com/aws/jsii/commit/51211a0)), closes [#537](https://github.com/aws/jsii/issues/537) [#577](https://github.com/aws/jsii/issues/577) [#578](https://github.com/aws/jsii/issues/578) [#588](https://github.com/aws/jsii/issues/588)





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii-reflect





## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)


### Bug Fixes

* **.net:** occasional incorrect param type cast ([#568](https://github.com/aws/jsii/issues/568)) ([c89d0fa](https://github.com/aws/jsii/commit/c89d0fa)), closes [awslabs/aws-cdk#3093](https://github.com/awslabs/aws-cdk/issues/3093)
* **jsii:** correctly inherit initializer stability ([#569](https://github.com/aws/jsii/issues/569)) ([a4de2d8](https://github.com/aws/jsii/commit/a4de2d8))





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)


### Bug Fixes

* **jsii-diff:** handle recursive types ([#558](https://github.com/aws/jsii/issues/558)) ([3c43be1](https://github.com/aws/jsii/commit/3c43be1))





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)

**Note:** Version bump only for package jsii-reflect





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Features

* **jsii:** enforce enum member names to be ALL_CAPS ([#541](https://github.com/aws/jsii/issues/541)) ([c88080d](https://github.com/aws/jsii/commit/c88080d)), closes [awslabs/aws-cdk#2287](https://github.com/awslabs/aws-cdk/issues/2287)


### BREAKING CHANGES

* **jsii:** Enum members are now expected to be `ALL_CAPS`





## [0.11.3](https://github.com/aws/jsii/compare/v0.11.2...v0.11.3) (2019-06-18)


### Bug Fixes

* **jsii:** Correctly handle singleton enums ([#535](https://github.com/aws/jsii/issues/535)) ([01aed03](https://github.com/aws/jsii/commit/01aed03)), closes [#231](https://github.com/aws/jsii/issues/231)
* **jsii:** Correctly ignore private properties from ctor ([#531](https://github.com/aws/jsii/issues/531)) ([e804cab](https://github.com/aws/jsii/commit/e804cab))





## [0.11.2](https://github.com/aws/jsii/compare/v0.11.1...v0.11.2) (2019-06-07)


### Bug Fixes

* **java:** Escape `*/` in package-info.java ([#526](https://github.com/aws/jsii/issues/526)) ([4e7ea98](https://github.com/aws/jsii/commit/4e7ea98))





## [0.11.1](https://github.com/aws/jsii/compare/v0.11.0...v0.11.1) (2019-06-07)


### Features

* Register module-level stability ([#515](https://github.com/aws/jsii/issues/515)) ([efae447](https://github.com/aws/jsii/commit/efae447)), closes [awslabs/cdk-ops#367](https://github.com/awslabs/cdk-ops/issues/367)





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)


### Bug Fixes

* **jsii:** deduplicate interfaces ([#497](https://github.com/aws/jsii/issues/497)) ([05f5189](https://github.com/aws/jsii/commit/05f5189)), closes [#496](https://github.com/aws/jsii/issues/496)





## [0.10.5](https://github.com/aws/jsii/compare/v0.10.4...v0.10.5) (2019-05-06)


### Bug Fixes

* **jsii:** merge all "implements" declarations ([#494](https://github.com/aws/jsii/issues/494)) ([5e069aa](https://github.com/aws/jsii/commit/5e069aa)), closes [#493](https://github.com/aws/jsii/issues/493)





## [0.10.4](https://github.com/aws/jsii/compare/v0.10.3...v0.10.4) (2019-05-05)


### Bug Fixes

* **jsii:** consider interfaces from erased base classes ([#491](https://github.com/aws/jsii/issues/491)) ([b03511b](https://github.com/aws/jsii/commit/b03511b)), closes [#487](https://github.com/aws/jsii/issues/487)





## [0.10.3](https://github.com/aws/jsii/compare/v0.10.2...v0.10.3) (2019-04-24)


### Bug Fixes

* **java:** fix illegal arguments passed to JavaDoc generator ([#475](https://github.com/aws/jsii/issues/475)) ([4456138](https://github.com/aws/jsii/commit/4456138))





## [0.10.2](https://github.com/aws/jsii/compare/v0.10.1...v0.10.2) (2019-04-18)


### Bug Fixes

* **dotnet:** Correctly handle 'void' callback results ([#471](https://github.com/aws/jsii/issues/471)) ([81e41bd](https://github.com/aws/jsii/commit/81e41bd))





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)

**Note:** Version bump only for package jsii-reflect





# [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)


### Bug Fixes

* **dotnet:** fix doc comment model parsing in .NET generator ([#455](https://github.com/aws/jsii/issues/455)) ([ae85aa5](https://github.com/aws/jsii/commit/ae85aa5))
* **jsii:** flatten out dependency list ([#454](https://github.com/aws/jsii/issues/454)) ([ebdd10d](https://github.com/aws/jsii/commit/ebdd10d)), closes [#453](https://github.com/aws/jsii/issues/453)
* **jsii-reflect:** don't load same assembly multiple times ([#461](https://github.com/aws/jsii/issues/461)) ([3a6b21c](https://github.com/aws/jsii/commit/3a6b21c))
* **kernel:** Set `this` in static contexts ([#460](https://github.com/aws/jsii/issues/460)) ([c81b4c1](https://github.com/aws/jsii/commit/c81b4c1)), closes [awslabs/aws-cdk#2304](https://github.com/awslabs/aws-cdk/issues/2304)


### Features

* **jsii-spec:** Model parameter optionality ([#432](https://github.com/aws/jsii/issues/432)) ([21e485a](https://github.com/aws/jsii/commit/21e485a)), closes [#296](https://github.com/aws/jsii/issues/296) [#414](https://github.com/aws/jsii/issues/414)


### BREAKING CHANGES

* **jsii-spec:** JSII assemblies generated by older versions of the tool
will fail loading with this new version, and vice-versa. Re-compile your
projects in order to fix this.





# [0.9.0](https://github.com/aws/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


### Bug Fixes

* **jsii:** Prohibit illegal uses of structs (aka data types) ([#418](https://github.com/aws/jsii/issues/418)) ([8ff9137](https://github.com/aws/jsii/commit/8ff9137)), closes [#287](https://github.com/aws/jsii/issues/287)


### Features

* **jsii:** Enforce use of peerDependencies ([#421](https://github.com/aws/jsii/issues/421)) ([e72fea5](https://github.com/aws/jsii/commit/e72fea5)), closes [#361](https://github.com/aws/jsii/issues/361)
* **jsii:** Erase un-exported base classes instead of prohibiting those ([#425](https://github.com/aws/jsii/issues/425)) ([d006f5c](https://github.com/aws/jsii/commit/d006f5c)), closes [#417](https://github.com/aws/jsii/issues/417)
* **jsii:** Erase un-exported base interfaces instead of prohibiting those ([#426](https://github.com/aws/jsii/issues/426)) ([afbabff](https://github.com/aws/jsii/commit/afbabff)), closes [#417](https://github.com/aws/jsii/issues/417)
* **jsii:** record source locations in assembly ([#429](https://github.com/aws/jsii/issues/429)) ([e601c0c](https://github.com/aws/jsii/commit/e601c0c))
* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/aws/jsii/issues/415)) ([9cfd867](https://github.com/aws/jsii/commit/9cfd867))
* **kernel:** Normalize empty structs to undefined ([#416](https://github.com/aws/jsii/issues/416)) ([a8ee954](https://github.com/aws/jsii/commit/a8ee954)), closes [#411](https://github.com/aws/jsii/issues/411)


### BREAKING CHANGES

* **jsii:** All direct dependencies must be duplicated in
                 peerDependencies unless they are in bundledDependencies.





## [0.8.2](https://github.com/aws/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)

**Note:** Version bump only for package jsii-reflect





## [0.8.1](https://github.com/aws/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **kernel:** make type serialization explicit and recursive ([#401](https://github.com/aws/jsii/issues/401)) ([0a83d52](https://github.com/aws/jsii/commit/0a83d52)), closes [awslabs/aws-cdk#1981](https://github.com/awslabs/aws-cdk/issues/1981)
* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/aws/jsii/issues/395)) ([850f42b](https://github.com/aws/jsii/commit/850f42b))





# [0.8.0](https://github.com/aws/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* copy non-hidden bases when erasing hidden interfaces ([#392](https://github.com/aws/jsii/issues/392)) ([5af84b6](https://github.com/aws/jsii/commit/5af84b6)), closes [#390](https://github.com/aws/jsii/issues/390)


### Features

* Add Python Support ([cc3ec87](https://github.com/aws/jsii/commit/cc3ec87))
* internal accessibility ([#390](https://github.com/aws/jsii/issues/390)) ([e232cb5](https://github.com/aws/jsii/commit/e232cb5)), closes [#287](https://github.com/aws/jsii/issues/287) [#388](https://github.com/aws/jsii/issues/388)
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/aws/jsii/issues/376)) ([db3ccdf](https://github.com/aws/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/aws/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
* member names that begin with underscore now must be marked as "@internal" in their jsdocs, which will cause them to disappear from type declaration files and jsii APIs.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/aws/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)




**Note:** Version bump only for package jsii-reflect

<a name="0.7.14"></a>
## [0.7.14](https://github.com/aws/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* **kernel:** Improve tagged type of wire values ([#346](https://github.com/aws/jsii/issues/346)) ([8ea39ac](https://github.com/aws/jsii/commit/8ea39ac)), closes [#345](https://github.com/aws/jsii/issues/345)


### Features

* **jsii:** support multiple class declaration sites ([#348](https://github.com/aws/jsii/issues/348)) ([4ecf28c](https://github.com/aws/jsii/commit/4ecf28c))




<a name="0.7.13"></a>
## [0.7.13](https://github.com/aws/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)


### Features

* add option to generate TypeScript project references ([#343](https://github.com/aws/jsii/issues/343)) ([5eec5dc](https://github.com/aws/jsii/commit/5eec5dc))




<a name="0.7.12"></a>
## [0.7.12](https://github.com/aws/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)


### Features

* **jsii-reflect:** library for exploring jsii type systems ([#328](https://github.com/aws/jsii/issues/328)) ([69cdb32](https://github.com/aws/jsii/commit/69cdb32))
