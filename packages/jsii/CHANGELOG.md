# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.19.0](https://github.com/aws/jsii/compare/v0.18.0...v0.19.0) (2019-10-14)


### Bug Fixes

* **jsii:** Correct the 'types' attribute in package.json ([#876](https://github.com/aws/jsii/issues/876)) ([391a7ec](https://github.com/aws/jsii/commit/391a7eced5ca9dc31f1e203d1fb5056e20551696))


### Features

* **sampiler:** translate code samples to Python ([#827](https://github.com/aws/jsii/issues/827)) ([c9a7002](https://github.com/aws/jsii/commit/c9a7002431c0db6224d595eb5555b916036d4575))





# [0.18.0](https://github.com/aws/jsii/compare/v0.17.1...v0.18.0) (2019-10-01)


### Features

* **jsii:** enable strictPropertyInitialization checks ([#838](https://github.com/aws/jsii/issues/838)) ([11268c4](https://github.com/aws/jsii/commit/11268c4)), closes [#4286](https://github.com/aws/jsii/issues/4286)
* configure `engines` with `node >= 10.3.0` ([#795](https://github.com/aws/jsii/issues/795)) ([6164b6b](https://github.com/aws/jsii/commit/6164b6b)), closes [#794](https://github.com/aws/jsii/issues/794)
* configure AWS logo for NuGet packages ([#797](https://github.com/aws/jsii/issues/797)) ([04305ce](https://github.com/aws/jsii/commit/04305ce))





## [0.17.1](https://github.com/aws/jsii/compare/v0.17.0...v0.17.1) (2019-09-30)

**Note:** Version bump only for package jsii





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)


### Features

* **java:** use immutable java implementations of JSII primitive collection types array and map ([#765](https://github.com/aws/jsii/issues/765)) ([5e713e3](https://github.com/aws/jsii/commit/5e713e3))





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)


### Features

* **jsii:** improve locality of warnings emitted for reserved words ([#739](https://github.com/aws/jsii/issues/739)) ([e762da6](https://github.com/aws/jsii/commit/e762da6))





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)


### Features

* **jsii:** emit warnings when using reserved words ([#704](https://github.com/aws/jsii/issues/704)) ([ca44537](https://github.com/aws/jsii/commit/ca44537)), closes [#701](https://github.com/aws/jsii/issues/701)





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)


### Bug Fixes

* **java:** improve property override detection ([#692](https://github.com/aws/jsii/issues/692)) ([d90b304](https://github.com/aws/jsii/commit/d90b304))





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)

**Note:** Version bump only for package jsii





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)


### Bug Fixes

* fix usage of "external" stability ([#639](https://github.com/aws/jsii/issues/639)) ([30dea87](https://github.com/aws/jsii/commit/30dea87))





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)


### Features

* **jsii:** configure outDir and rootDir for tsc ([#593](https://github.com/aws/jsii/issues/593)) ([21855e2](https://github.com/aws/jsii/commit/21855e2))
* add support for "external" stability ([#596](https://github.com/aws/jsii/issues/596)) ([dd66afb](https://github.com/aws/jsii/commit/dd66afb))





# [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)

**Note:** Version bump only for package jsii





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii





## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)


### Bug Fixes

* **jsii:** correctly inherit initializer stability ([#569](https://github.com/aws/jsii/issues/569)) ([a4de2d8](https://github.com/aws/jsii/commit/a4de2d8))





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)

**Note:** Version bump only for package jsii





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)

**Note:** Version bump only for package jsii





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Bug Fixes

* **jsii:** Validate overriding does not affect optionality ([#549](https://github.com/aws/jsii/issues/549)) ([8c826c1](https://github.com/aws/jsii/commit/8c826c1))


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
* **jsii:** Propagate stability to members ([#522](https://github.com/aws/jsii/issues/522)) ([20507e6](https://github.com/aws/jsii/commit/20507e6))
* **jsii-spec:** Add optional metadata field ([#512](https://github.com/aws/jsii/issues/512)) ([10e2bfe](https://github.com/aws/jsii/commit/10e2bfe))





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)


### Bug Fixes

* **assembler:** handle unknown types without crashing ([#501](https://github.com/aws/jsii/issues/501)) ([7ba1aab](https://github.com/aws/jsii/commit/7ba1aab))
* **jsii:** deduplicate interfaces ([#497](https://github.com/aws/jsii/issues/497)) ([05f5189](https://github.com/aws/jsii/commit/05f5189)), closes [#496](https://github.com/aws/jsii/issues/496)


### Features

* **jsii:** protect against prohibited member names ([#506](https://github.com/aws/jsii/issues/506)) ([2848f76](https://github.com/aws/jsii/commit/2848f76))





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

**Note:** Version bump only for package jsii





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)

**Note:** Version bump only for package jsii





# [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)


### Bug Fixes

* **jsii:** check that static and nonstatic members don't share a name ([#430](https://github.com/aws/jsii/issues/430)) ([a0741cc](https://github.com/aws/jsii/commit/a0741cc)), closes [#427](https://github.com/aws/jsii/issues/427)
* exit with non-zero exit code if there are compilation errors ([#442](https://github.com/aws/jsii/issues/442)) ([6265bf6](https://github.com/aws/jsii/commit/6265bf6)), closes [#383](https://github.com/aws/jsii/issues/383) [#441](https://github.com/aws/jsii/issues/441)
* **jsii:** flatten out dependency list ([#454](https://github.com/aws/jsii/issues/454)) ([ebdd10d](https://github.com/aws/jsii/commit/ebdd10d)), closes [#453](https://github.com/aws/jsii/issues/453)


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

* **jsii:** check that referenced [@params](https://github.com/params) exist ([#431](https://github.com/aws/jsii/issues/431)) ([265c304](https://github.com/aws/jsii/commit/265c304)), closes [#422](https://github.com/aws/jsii/issues/422)
* **jsii:** Enforce use of peerDependencies ([#421](https://github.com/aws/jsii/issues/421)) ([e72fea5](https://github.com/aws/jsii/commit/e72fea5)), closes [#361](https://github.com/aws/jsii/issues/361)
* **jsii:** Erase un-exported base classes instead of prohibiting those ([#425](https://github.com/aws/jsii/issues/425)) ([d006f5c](https://github.com/aws/jsii/commit/d006f5c)), closes [#417](https://github.com/aws/jsii/issues/417)
* **jsii:** Erase un-exported base interfaces instead of prohibiting those ([#426](https://github.com/aws/jsii/issues/426)) ([afbabff](https://github.com/aws/jsii/commit/afbabff)), closes [#417](https://github.com/aws/jsii/issues/417)
* **jsii:** record source locations in assembly ([#429](https://github.com/aws/jsii/issues/429)) ([e601c0c](https://github.com/aws/jsii/commit/e601c0c))
* **jsii:** Tag the jsii compiler version in the .jsii assemblies ([#420](https://github.com/aws/jsii/issues/420)) ([42dece1](https://github.com/aws/jsii/commit/42dece1)), closes [#412](https://github.com/aws/jsii/issues/412)
* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/aws/jsii/issues/415)) ([9cfd867](https://github.com/aws/jsii/commit/9cfd867))


### BREAKING CHANGES

* **jsii:** All direct dependencies must be duplicated in
                 peerDependencies unless they are in bundledDependencies.





## [0.8.2](https://github.com/aws/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)

**Note:** Version bump only for package jsii





## [0.8.1](https://github.com/aws/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)

**Note:** Version bump only for package jsii





# [0.8.0](https://github.com/aws/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* **jsii:** prohibit exported const enums ([#372](https://github.com/aws/jsii/issues/372)) ([5a94825](https://github.com/aws/jsii/commit/5a94825)), closes [awslabs/aws-cdk#1969](https://github.com/awslabs/aws-cdk/issues/1969)
* **jsii:** show jsii diagnostics in watch mode and support $tsc problem matcher ([#383](https://github.com/aws/jsii/issues/383)) ([0275944](https://github.com/aws/jsii/commit/0275944)), closes [#382](https://github.com/aws/jsii/issues/382)
* copy non-hidden bases when erasing hidden interfaces ([#392](https://github.com/aws/jsii/issues/392)) ([5af84b6](https://github.com/aws/jsii/commit/5af84b6)), closes [#390](https://github.com/aws/jsii/issues/390)


### Features

* internal accessibility ([#390](https://github.com/aws/jsii/issues/390)) ([e232cb5](https://github.com/aws/jsii/commit/e232cb5)), closes [#287](https://github.com/aws/jsii/issues/287) [#388](https://github.com/aws/jsii/issues/388)
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/aws/jsii/issues/376)) ([db3ccdf](https://github.com/aws/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/aws/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
* member names that begin with underscore now must be marked as "@internal" in their jsdocs, which will cause them to disappear from type declaration files and jsii APIs.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/aws/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)


### Bug Fixes

* **jsii:** detect double interface member declarations ([#360](https://github.com/aws/jsii/issues/360)) ([b2b2c89](https://github.com/aws/jsii/commit/b2b2c89)), closes [#340](https://github.com/aws/jsii/issues/340)




<a name="0.7.14"></a>
## [0.7.14](https://github.com/aws/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* remove use of private API ([#351](https://github.com/aws/jsii/issues/351)) ([874cbac](https://github.com/aws/jsii/commit/874cbac)), closes [#350](https://github.com/aws/jsii/issues/350)


### Features

* **jsii:** support multiple class declaration sites ([#348](https://github.com/aws/jsii/issues/348)) ([4ecf28c](https://github.com/aws/jsii/commit/4ecf28c))




<a name="0.7.13"></a>
## [0.7.13](https://github.com/aws/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)


### Features

* add option to generate TypeScript project references ([#343](https://github.com/aws/jsii/issues/343)) ([5eec5dc](https://github.com/aws/jsii/commit/5eec5dc))




<a name="0.7.12"></a>
## [0.7.12](https://github.com/aws/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)




**Note:** Version bump only for package jsii

<a name="0.7.11"></a>
## [0.7.11](https://github.com/aws/jsii/compare/v0.7.10...v0.7.11) (2018-11-18)




**Note:** Version bump only for package jsii

<a name="0.7.10"></a>
## [0.7.10](https://github.com/aws/jsii/compare/v0.7.9...v0.7.10) (2018-11-12)


### Bug Fixes

* **jsii:** jsii-fix-peers missing in npm tarball ([#313](https://github.com/aws/jsii/issues/313)) ([6915455](https://github.com/aws/jsii/commit/6915455))




<a name="0.7.9"></a>
## [0.7.9](https://github.com/aws/jsii/compare/v0.7.8...v0.7.9) (2018-11-12)


### Bug Fixes

* **docs:** improve docs rendering ([#303](https://github.com/aws/jsii/issues/303)) ([094a215](https://github.com/aws/jsii/commit/094a215)), closes [#301](https://github.com/aws/jsii/issues/301) [#298](https://github.com/aws/jsii/issues/298) [#302](https://github.com/aws/jsii/issues/302) [#300](https://github.com/aws/jsii/issues/300) [#299](https://github.com/aws/jsii/issues/299)
* **jsii:** do not mark "any" or "unknown" as optional (unless "?") ([#295](https://github.com/aws/jsii/issues/295)) ([cdf5a53](https://github.com/aws/jsii/commit/cdf5a53)), closes [#284](https://github.com/aws/jsii/issues/284)
* **runtime/dotnet:** Correct a number of type mappings ([#291](https://github.com/aws/jsii/issues/291)) ([0d59dab](https://github.com/aws/jsii/commit/0d59dab)), closes [#290](https://github.com/aws/jsii/issues/290) [awslabs/aws-cdk#1027](https://github.com/awslabs/aws-cdk/issues/1027)
* accept variadic arguments after optional arguments ([#307](https://github.com/aws/jsii/issues/307)) ([c1af1d6](https://github.com/aws/jsii/commit/c1af1d6))
* remove overly strict checks on peer versions ([#306](https://github.com/aws/jsii/issues/306)) ([7b89d01](https://github.com/aws/jsii/commit/7b89d01))


### Features

* **jsii:** enforce peer dependencies ([#294](https://github.com/aws/jsii/issues/294)) ([1753910](https://github.com/aws/jsii/commit/1753910)), closes [awslabs/aws-cdk#979](https://github.com/awslabs/aws-cdk/issues/979)




<a name="0.7.8"></a>
## [0.7.8](https://github.com/aws/jsii/compare/v0.7.7...v0.7.8) (2018-10-23)


### Bug Fixes

* **jsii:** use base interfaces for 'datatype' property ([#265](https://github.com/aws/jsii/issues/265)) ([1c56902](https://github.com/aws/jsii/commit/1c56902)), closes [#264](https://github.com/aws/jsii/issues/264)
* match behavioral interface to 'I'-prefix ([#271](https://github.com/aws/jsii/issues/271)) ([03103f3](https://github.com/aws/jsii/commit/03103f3))
* require distinct argument and property names ([#272](https://github.com/aws/jsii/issues/272)) ([4d2f268](https://github.com/aws/jsii/commit/4d2f268)), closes [#268](https://github.com/aws/jsii/issues/268)




<a name="0.7.7"></a>
## [0.7.7](https://github.com/aws/jsii/compare/v0.7.6...v0.7.7) (2018-10-10)


### Bug Fixes

* **jsii:** better usage reporting of private types ([#247](https://github.com/aws/jsii/issues/247)) ([96ac5d6](https://github.com/aws/jsii/commit/96ac5d6))
* **jsii:** support  public autoproperties in private constructor ([#256](https://github.com/aws/jsii/issues/256)) ([181012e](https://github.com/aws/jsii/commit/181012e))
* **jsii:** use default jsx compiler options ([#260](https://github.com/aws/jsii/issues/260)) ([660ae79](https://github.com/aws/jsii/commit/660ae79)), closes [awslabs/aws-cdk#830](https://github.com/awslabs/aws-cdk/issues/830)




<a name="0.7.6"></a>
## [0.7.6](https://github.com/aws/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)


### Bug Fixes

* **jsii:** Defaulted parameters were not rendered as optional ([#234](https://github.com/aws/jsii/issues/234)) ([578bf9c](https://github.com/aws/jsii/commit/578bf9c)), closes [#233](https://github.com/aws/jsii/issues/233)
* **jsii:** Don't skip emit on TS errors when in "watch" mode ([#236](https://github.com/aws/jsii/issues/236)) ([30d1491](https://github.com/aws/jsii/commit/30d1491)), closes [#235](https://github.com/aws/jsii/issues/235)
* **jsii:** Optional `any` represented as required ([#237](https://github.com/aws/jsii/issues/237)) ([91074f3](https://github.com/aws/jsii/commit/91074f3)), closes [#230](https://github.com/aws/jsii/issues/230)




<a name="0.7.5"></a>
## [0.7.5](https://github.com/aws/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)


### Bug Fixes

* **java:** support abstract return types ([#224](https://github.com/aws/jsii/issues/224)) ([3257223](https://github.com/aws/jsii/commit/3257223)), closes [#220](https://github.com/aws/jsii/issues/220) [#223](https://github.com/aws/jsii/issues/223) [awslabs/aws-cdk#680](https://github.com/awslabs/aws-cdk/issues/680)




<a name="0.7.4"></a>
## [0.7.4](https://github.com/aws/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)




**Note:** Version bump only for package jsii

<a name="0.7.3"></a>
## [0.7.3](https://github.com/aws/jsii/compare/v0.7.2...v0.7.3) (2018-09-06)


### Bug Fixes

* **jsii:** add readme and restore missing files in jsii tarball ([09f9fc9](https://github.com/aws/jsii/commit/09f9fc9))




<a name="0.7.2"></a>
## [0.7.2](https://github.com/aws/jsii/compare/v0.7.1...v0.7.2) (2018-09-06)


### Bug Fixes

* Missing types in JSII assembly, invalid Java code, confusing docs ([#208](https://github.com/aws/jsii/issues/208)) ([b37101f](https://github.com/aws/jsii/commit/b37101f)), closes [#175](https://github.com/aws/jsii/issues/175)


### Features

* **jsii:** Re-implemented jsii to support --watch and produce better error reporting ([#188](https://github.com/aws/jsii/issues/188)) ([76472be](https://github.com/aws/jsii/commit/76472be))




<a name="0.7.1"></a>
## [0.7.1](https://github.com/aws/jsii/compare/v0.7.0...v0.7.1) (2018-08-28)

### Features

* **jsii:** Add check against downgrading properties to readonly ([#201](https://github.com/aws/jsii/issues/201)) ([f60b0ac](https://github.com/aws/jsii/commit/f60b0ace014e8e96090ead808436b1ce0cb6b1e8))

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




**Note:** Version bump only for package jsii

<a name="0.6.3"></a>
## [0.6.3](https://github.com/aws/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)




**Note:** Version bump only for package jsii

<a name="0.6.2"></a>
## 0.6.2 (2018-08-07)




**Note:** Version bump only for package jsii
