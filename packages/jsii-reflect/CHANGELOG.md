# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.9.0](https://github.com/awslabs/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


### Bug Fixes

* **jsii:** Prohibit illegal uses of structs (aka data types) ([#418](https://github.com/awslabs/jsii/issues/418)) ([8ff9137](https://github.com/awslabs/jsii/commit/8ff9137)), closes [#287](https://github.com/awslabs/jsii/issues/287)


### Features

* **jsii:** Enforce use of peerDependencies ([#421](https://github.com/awslabs/jsii/issues/421)) ([e72fea5](https://github.com/awslabs/jsii/commit/e72fea5)), closes [#361](https://github.com/awslabs/jsii/issues/361)
* **jsii:** Erase un-exported base classes instead of prohibiting those ([#425](https://github.com/awslabs/jsii/issues/425)) ([d006f5c](https://github.com/awslabs/jsii/commit/d006f5c)), closes [#417](https://github.com/awslabs/jsii/issues/417)
* **jsii:** Erase un-exported base interfaces instead of prohibiting those ([#426](https://github.com/awslabs/jsii/issues/426)) ([afbabff](https://github.com/awslabs/jsii/commit/afbabff)), closes [#417](https://github.com/awslabs/jsii/issues/417)
* **jsii:** record source locations in assembly ([#429](https://github.com/awslabs/jsii/issues/429)) ([e601c0c](https://github.com/awslabs/jsii/commit/e601c0c))
* **jsii-diff:** standardize doc comments, add API compatibility tool ([#415](https://github.com/awslabs/jsii/issues/415)) ([9cfd867](https://github.com/awslabs/jsii/commit/9cfd867))
* **kernel:** Normalize empty structs to undefined ([#416](https://github.com/awslabs/jsii/issues/416)) ([a8ee954](https://github.com/awslabs/jsii/commit/a8ee954)), closes [#411](https://github.com/awslabs/jsii/issues/411)


### BREAKING CHANGES

* **jsii:** All direct dependencies must be duplicated in
                 peerDependencies unless they are in bundledDependencies.





## [0.8.2](https://github.com/awslabs/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)

**Note:** Version bump only for package jsii-reflect





## [0.8.1](https://github.com/awslabs/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **kernel:** make type serialization explicit and recursive ([#401](https://github.com/awslabs/jsii/issues/401)) ([0a83d52](https://github.com/awslabs/jsii/commit/0a83d52)), closes [awslabs/aws-cdk#1981](https://github.com/awslabs/aws-cdk/issues/1981)
* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/awslabs/jsii/issues/395)) ([850f42b](https://github.com/awslabs/jsii/commit/850f42b))





# [0.8.0](https://github.com/awslabs/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* copy non-hidden bases when erasing hidden interfaces ([#392](https://github.com/awslabs/jsii/issues/392)) ([5af84b6](https://github.com/awslabs/jsii/commit/5af84b6)), closes [#390](https://github.com/awslabs/jsii/issues/390)


### Features

* Add Python Support ([cc3ec87](https://github.com/awslabs/jsii/commit/cc3ec87))
* internal accessibility ([#390](https://github.com/awslabs/jsii/issues/390)) ([e232cb5](https://github.com/awslabs/jsii/commit/e232cb5)), closes [#287](https://github.com/awslabs/jsii/issues/287) [#388](https://github.com/awslabs/jsii/issues/388)
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/awslabs/jsii/issues/376)) ([db3ccdf](https://github.com/awslabs/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/awslabs/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
* member names that begin with underscore now must be marked as "@internal" in their jsdocs, which will cause them to disappear from type declaration files and jsii APIs.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/awslabs/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)




**Note:** Version bump only for package jsii-reflect

<a name="0.7.14"></a>
## [0.7.14](https://github.com/awslabs/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* **kernel:** Improve tagged type of wire values ([#346](https://github.com/awslabs/jsii/issues/346)) ([8ea39ac](https://github.com/awslabs/jsii/commit/8ea39ac)), closes [#345](https://github.com/awslabs/jsii/issues/345)


### Features

* **jsii:** support multiple class declaration sites ([#348](https://github.com/awslabs/jsii/issues/348)) ([4ecf28c](https://github.com/awslabs/jsii/commit/4ecf28c))




<a name="0.7.13"></a>
## [0.7.13](https://github.com/awslabs/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)


### Features

* add option to generate TypeScript project references ([#343](https://github.com/awslabs/jsii/issues/343)) ([5eec5dc](https://github.com/awslabs/jsii/commit/5eec5dc))




<a name="0.7.12"></a>
## [0.7.12](https://github.com/awslabs/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)


### Features

* **jsii-reflect:** library for exploring jsii type systems ([#328](https://github.com/awslabs/jsii/issues/328)) ([69cdb32](https://github.com/awslabs/jsii/commit/69cdb32))
