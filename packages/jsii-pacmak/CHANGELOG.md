# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.8.2](https://github.com/awslabs/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)


### Bug Fixes

* **python:** Lift the entire data class hierarchy ([#408](https://github.com/awslabs/jsii/issues/408)) ([f813620](https://github.com/awslabs/jsii/commit/f813620))





## [0.8.1](https://github.com/awslabs/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **kernel:** make type serialization explicit and recursive ([#401](https://github.com/awslabs/jsii/issues/401)) ([0a83d52](https://github.com/awslabs/jsii/commit/0a83d52)), closes [awslabs/aws-cdk#1981](https://github.com/awslabs/aws-cdk/issues/1981)
* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/awslabs/jsii/issues/395)) ([850f42b](https://github.com/awslabs/jsii/commit/850f42b))





# [0.8.0](https://github.com/awslabs/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* copy non-hidden bases when erasing hidden interfaces ([#392](https://github.com/awslabs/jsii/issues/392)) ([5af84b6](https://github.com/awslabs/jsii/commit/5af84b6)), closes [#390](https://github.com/awslabs/jsii/issues/390)
* Fix Async function support in Python ([b5d49de](https://github.com/awslabs/jsii/commit/b5d49de))
* Proxy interface literals in the generated Python code ([10242eb](https://github.com/awslabs/jsii/commit/10242eb))
* Python's abstract class proxies now inherit from parent's proxy ([6f1c9c0](https://github.com/awslabs/jsii/commit/6f1c9c0))


### Features

* Add Python Support ([cc3ec87](https://github.com/awslabs/jsii/commit/cc3ec87))
* internal accessibility ([#390](https://github.com/awslabs/jsii/issues/390)) ([e232cb5](https://github.com/awslabs/jsii/commit/e232cb5)), closes [#287](https://github.com/awslabs/jsii/issues/287) [#388](https://github.com/awslabs/jsii/issues/388)
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/awslabs/jsii/issues/376)) ([db3ccdf](https://github.com/awslabs/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/awslabs/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
* member names that begin with underscore now must be marked as "@internal" in their jsdocs, which will cause them to disappear from type declaration files and jsii APIs.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/awslabs/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)


### Bug Fixes

* **jsii-pacmack:** default to target directory mode ([#363](https://github.com/awslabs/jsii/issues/363)) ([967d917](https://github.com/awslabs/jsii/commit/967d917))




<a name="0.7.14"></a>
## [0.7.14](https://github.com/awslabs/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* **kernel:** Improve tagged type of wire values ([#346](https://github.com/awslabs/jsii/issues/346)) ([8ea39ac](https://github.com/awslabs/jsii/commit/8ea39ac)), closes [#345](https://github.com/awslabs/jsii/issues/345)


### Features

* **jsii:** support multiple class declaration sites ([#348](https://github.com/awslabs/jsii/issues/348)) ([4ecf28c](https://github.com/awslabs/jsii/commit/4ecf28c))
* Generate NuGet symbol and source packages ([#243](https://github.com/awslabs/jsii/issues/243)) ([aafd405](https://github.com/awslabs/jsii/commit/aafd405))




<a name="0.7.13"></a>
## [0.7.13](https://github.com/awslabs/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)




**Note:** Version bump only for package jsii-pacmak

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




<a name="0.7.10"></a>
## [0.7.10](https://github.com/awslabs/jsii/compare/v0.7.9...v0.7.10) (2018-11-12)




**Note:** Version bump only for package jsii-pacmak

<a name="0.7.9"></a>
## [0.7.9](https://github.com/awslabs/jsii/compare/v0.7.8...v0.7.9) (2018-11-12)


### Bug Fixes

* **docs:** improve docs rendering ([#303](https://github.com/awslabs/jsii/issues/303)) ([094a215](https://github.com/awslabs/jsii/commit/094a215)), closes [#301](https://github.com/awslabs/jsii/issues/301) [#298](https://github.com/awslabs/jsii/issues/298) [#302](https://github.com/awslabs/jsii/issues/302) [#300](https://github.com/awslabs/jsii/issues/300) [#299](https://github.com/awslabs/jsii/issues/299)
* **jsii:** do not mark "any" or "unknown" as optional (unless "?") ([#295](https://github.com/awslabs/jsii/issues/295)) ([cdf5a53](https://github.com/awslabs/jsii/commit/cdf5a53)), closes [#284](https://github.com/awslabs/jsii/issues/284)
* **jsii-runtime:** treat "null" as "undefined" ([#297](https://github.com/awslabs/jsii/issues/297)) ([43fb16a](https://github.com/awslabs/jsii/commit/43fb16a)), closes [awslabs/aws-cdk#157](https://github.com/awslabs/aws-cdk/issues/157) [#282](https://github.com/awslabs/jsii/issues/282)
* **runtime/dotnet:** Correct a number of type mappings ([#291](https://github.com/awslabs/jsii/issues/291)) ([0d59dab](https://github.com/awslabs/jsii/commit/0d59dab)), closes [#290](https://github.com/awslabs/jsii/issues/290) [awslabs/aws-cdk#1027](https://github.com/awslabs/aws-cdk/issues/1027)
* accept variadic arguments after optional arguments ([#307](https://github.com/awslabs/jsii/issues/307)) ([c1af1d6](https://github.com/awslabs/jsii/commit/c1af1d6))


### Features

* **jsii:** enforce peer dependencies ([#294](https://github.com/awslabs/jsii/issues/294)) ([1753910](https://github.com/awslabs/jsii/commit/1753910)), closes [awslabs/aws-cdk#979](https://github.com/awslabs/aws-cdk/issues/979)




<a name="0.7.8"></a>
## [0.7.8](https://github.com/awslabs/jsii/compare/v0.7.7...v0.7.8) (2018-10-23)


### Bug Fixes

* **jsii:** use base interfaces for 'datatype' property ([#265](https://github.com/awslabs/jsii/issues/265)) ([1c56902](https://github.com/awslabs/jsii/commit/1c56902)), closes [#264](https://github.com/awslabs/jsii/issues/264)
* match behavioral interface to 'I'-prefix ([#271](https://github.com/awslabs/jsii/issues/271)) ([03103f3](https://github.com/awslabs/jsii/commit/03103f3))




<a name="0.7.7"></a>
## [0.7.7](https://github.com/awslabs/jsii/compare/v0.7.6...v0.7.7) (2018-10-10)


### Bug Fixes

* **dotnet:** abstract classes should have proxy implementations ([#241](https://github.com/awslabs/jsii/issues/241)) ([828a26f](https://github.com/awslabs/jsii/commit/828a26f)), closes [#223](https://github.com/awslabs/jsii/issues/223)
* **jsii:** support  public autoproperties in private constructor ([#256](https://github.com/awslabs/jsii/issues/256)) ([181012e](https://github.com/awslabs/jsii/commit/181012e))
* **jsii-dotnet-generator:** Use FQ type returns in conflict. ([#258](https://github.com/awslabs/jsii/issues/258)) ([a78784a](https://github.com/awslabs/jsii/commit/a78784a)), closes [#252](https://github.com/awslabs/jsii/issues/252)
* **kernel:** Return object literals as references ([#249](https://github.com/awslabs/jsii/issues/249)) ([61cb3a4](https://github.com/awslabs/jsii/commit/61cb3a4)), closes [#248](https://github.com/awslabs/jsii/issues/248) [awslabs/aws-cdk#774](https://github.com/awslabs/aws-cdk/issues/774)




<a name="0.7.6"></a>
## [0.7.6](https://github.com/awslabs/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)


### Bug Fixes

* Sphinx generated incorrect type references for display ([#232](https://github.com/awslabs/jsii/issues/232)) ([b664805](https://github.com/awslabs/jsii/commit/b664805))
* **jsii:** Defaulted parameters were not rendered as optional ([#234](https://github.com/awslabs/jsii/issues/234)) ([578bf9c](https://github.com/awslabs/jsii/commit/578bf9c)), closes [#233](https://github.com/awslabs/jsii/issues/233)
* **jsii:** Optional `any` represented as required ([#237](https://github.com/awslabs/jsii/issues/237)) ([91074f3](https://github.com/awslabs/jsii/commit/91074f3)), closes [#230](https://github.com/awslabs/jsii/issues/230)


### Features

* **sphinx:** allow readme file to define sphinx header and reorganize topic ([#229](https://github.com/awslabs/jsii/issues/229)) ([405da9c](https://github.com/awslabs/jsii/commit/405da9c)), closes [#228](https://github.com/awslabs/jsii/issues/228) [#185](https://github.com/awslabs/jsii/issues/185)
* Document overriden/inherited members ([#238](https://github.com/awslabs/jsii/issues/238)) ([7a6278a](https://github.com/awslabs/jsii/commit/7a6278a)), closes [#196](https://github.com/awslabs/jsii/issues/196)




<a name="0.7.5"></a>
## [0.7.5](https://github.com/awslabs/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)


### Bug Fixes

* **java:** support abstract return types ([#224](https://github.com/awslabs/jsii/issues/224)) ([3257223](https://github.com/awslabs/jsii/commit/3257223)), closes [#220](https://github.com/awslabs/jsii/issues/220) [#223](https://github.com/awslabs/jsii/issues/223) [awslabs/aws-cdk#680](https://github.com/awslabs/aws-cdk/issues/680)




<a name="0.7.4"></a>
## [0.7.4](https://github.com/awslabs/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)




**Note:** Version bump only for package jsii-pacmak

<a name="0.7.3"></a>
## [0.7.3](https://github.com/awslabs/jsii/compare/v0.7.2...v0.7.3) (2018-09-06)




**Note:** Version bump only for package jsii-pacmak

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

### Bug Fixes

* jsii-pacmak refered to private dependencies ([e61efc0](https://github.com/awslabs/jsii/commit/e61efc0))


<a name="0.6.3"></a>
## [0.6.3](https://github.com/awslabs/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)

<a name="0.6.3"></a>
## [0.6.3](https://github.com/awslabs/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)

### New features

* Produce .nupkg for .NET targets ([#160](https://github.com/awslabs/jsii/issues/160))
* Upgrade TypeScript to 3.0.1 ([#161](https://github.com/awslabs/jsii/issues/160))

<a name="0.6.2"></a>
## 0.6.2 (2018-08-07)


### Bug Fixes

* "Malformed enum value" when using [@scoped](https://github.com/scoped) packages ([#139](https://github.com/awslabs/jsii/issues/139)) ([4e70209](https://github.com/awslabs/jsii/commit/4e70209)), closes [#138](https://github.com/awslabs/jsii/issues/138)
