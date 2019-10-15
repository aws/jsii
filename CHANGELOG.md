# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.19.0](https://github.com/aws/jsii/compare/v0.18.0...v0.19.0) (2019-10-14)


### Bug Fixes

* **jsii:** Correct the 'types' attribute in package.json ([#876](https://github.com/aws/jsii/issues/876)) ([391a7ec](https://github.com/aws/jsii/commit/391a7eced5ca9dc31f1e203d1fb5056e20551696))
* **jsii-diff:** add 'main' property to package.json ([#877](https://github.com/aws/jsii/issues/877)) ([670d94a](https://github.com/aws/jsii/commit/670d94a6815e2f06552e7249b4fbb771664a2a30))
* **sampiler:** Add missing .npmignore ([#875](https://github.com/aws/jsii/issues/875)) ([b16fc6b](https://github.com/aws/jsii/commit/b16fc6bdaf1825d53629c2a44b769f924ffb91d0))


### Features

* **sampiler:** translate code samples to Python ([#827](https://github.com/aws/jsii/issues/827)) ([c9a7002](https://github.com/aws/jsii/commit/c9a7002431c0db6224d595eb5555b916036d4575))





# [0.18.0](https://github.com/aws/jsii/compare/v0.17.1...v0.18.0) (2019-10-01)


### Bug Fixes

* **dotnet:** use snupkg format for dotnet symbol packages ([#830](https://github.com/aws/jsii/issues/830)) ([0d18b4d](https://github.com/aws/jsii/commit/0d18b4d)), closes [NuGet/Home#6082](https://github.com/NuGet/Home/issues/6082)
* **python:** clear error message when trying to serialize function ([#824](https://github.com/aws/jsii/issues/824)) ([2eb6422](https://github.com/aws/jsii/commit/2eb6422)), closes [aws/aws-cdk#4064](https://github.com/aws/aws-cdk/issues/4064)


### Features

* **jsii:** enable strictPropertyInitialization checks ([#838](https://github.com/aws/jsii/issues/838)) ([11268c4](https://github.com/aws/jsii/commit/11268c4)), closes [#4286](https://github.com/aws/jsii/issues/4286)
* configure `engines` with `node >= 10.3.0` ([#795](https://github.com/aws/jsii/issues/795)) ([6164b6b](https://github.com/aws/jsii/commit/6164b6b)), closes [#794](https://github.com/aws/jsii/issues/794)
* configure AWS logo for NuGet packages ([#797](https://github.com/aws/jsii/issues/797)) ([04305ce](https://github.com/aws/jsii/commit/04305ce))





## [0.17.1](https://github.com/aws/jsii/compare/v0.17.0...v0.17.1) (2019-09-30)


### Bug Fixes

* **dotnet:** use snupkg format for dotnet symbol packages ([#830](https://github.com/aws/jsii/issues/830)) ([d2724f0](https://github.com/aws/jsii/commit/d2724f0)), closes [NuGet/Home#6082](https://github.com/NuGet/Home/issues/6082)





# [0.17.0](https://github.com/aws/jsii/compare/v0.16.0...v0.17.0) (2019-09-18)


### Bug Fixes

* **dotnet:** fix deep type conversion across the process boundary, intelisense docs, set target to netcoreapp2.1 ([#772](https://github.com/aws/jsii/issues/772)) ([ecf8d3b](https://github.com/aws/jsii/commit/ecf8d3b))
* **kernel:** stack overflow in KernelHost.run() ([#780](https://github.com/aws/jsii/issues/780)) ([41a8c2f](https://github.com/aws/jsii/commit/41a8c2f)), closes [#778](https://github.com/aws/jsii/issues/778)


### Features

* **java:** Indicate if method param is required ([#762](https://github.com/aws/jsii/issues/762)) ([cb7e11f](https://github.com/aws/jsii/commit/cb7e11f)), closes [#365](https://github.com/aws/jsii/issues/365)
* **java:** use immutable java implementations of JSII primitive collection types array and map ([#765](https://github.com/aws/jsii/issues/765)) ([5e713e3](https://github.com/aws/jsii/commit/5e713e3))





# [0.16.0](https://github.com/aws/jsii/compare/v0.15.1...v0.16.0) (2019-08-29)


### Bug Fixes

* **dotnet:** Fix property set for nested Dictionaries ([#736](https://github.com/aws/jsii/issues/736)) ([04bab47](https://github.com/aws/jsii/commit/04bab47))
* **jsii-diff:** handle violations in Enums ([#730](https://github.com/aws/jsii/issues/730)) ([934b5c8](https://github.com/aws/jsii/commit/934b5c8))
* **kernel:** correctly serialize enum values ([#754](https://github.com/aws/jsii/issues/754)) ([41ed25d](https://github.com/aws/jsii/commit/41ed25d)), closes [#753](https://github.com/aws/jsii/issues/753)


### Features

* **dotnet:** [JsiiOptional] attribute on properties that are optionals + Roslyn Analyzer ([#717](https://github.com/aws/jsii/issues/717)) ([bece042](https://github.com/aws/jsii/commit/bece042))
* **dotnet:** drop the useless I prefix for non datatype interfaces ([#728](https://github.com/aws/jsii/issues/728)) ([b9621f1](https://github.com/aws/jsii/commit/b9621f1)), closes [#109](https://github.com/aws/jsii/issues/109)
* **dotnet:** Support for JSII_DEBUG and JSII_RUNTIME ([#724](https://github.com/aws/jsii/issues/724)) ([1816740](https://github.com/aws/jsii/commit/1816740))
* **jsii:** improve locality of warnings emitted for reserved words ([#739](https://github.com/aws/jsii/issues/739)) ([e762da6](https://github.com/aws/jsii/commit/e762da6))
* **superchain:** bundle which in the Docker image ([#751](https://github.com/aws/jsii/issues/751)) ([50c9152](https://github.com/aws/jsii/commit/50c9152))
* **superchain:** ship with openssl CLI tools ([#740](https://github.com/aws/jsii/issues/740)) ([9fb32ad](https://github.com/aws/jsii/commit/9fb32ad))


### BREAKING CHANGES

* **dotnet:** names of .NET behavioral interfaces have changed (the duplicate prefix I was removed).





## [0.15.2](https://github.com/aws/jsii/compare/v0.15.1...v0.15.2) (2019-08-28)


### Bug Fixes

* **jsii:** pin TypeScript compiler dependency to minor version ([22c61c2](https://github.com/aws/jsii/commit/22c61c2))





## [0.15.1](https://github.com/aws/jsii/compare/v0.15.0...v0.15.1) (2019-08-18)


### Bug Fixes

* **dotnet:** add missing GetInterfaceType in the .NET runtime ([#703](https://github.com/aws/jsii/issues/703)) ([56617b1](https://github.com/aws/jsii/commit/56617b1))
* **superchain:** fix python distribution due to old setuptools ([#709](https://github.com/aws/jsii/issues/709)) ([b37790d](https://github.com/aws/jsii/commit/b37790d)), closes [#708](https://github.com/aws/jsii/issues/708)


### Features

* **java:** detect & rename members named after reserved words ([#705](https://github.com/aws/jsii/issues/705)) ([32bc117](https://github.com/aws/jsii/commit/32bc117))
* **jsii:** emit warnings when using reserved words ([#704](https://github.com/aws/jsii/issues/704)) ([ca44537](https://github.com/aws/jsii/commit/ca44537)), closes [#701](https://github.com/aws/jsii/issues/701)
* **python:** check distribution artifacts with `twine` ([#711](https://github.com/aws/jsii/issues/711)) ([f3d1da0](https://github.com/aws/jsii/commit/f3d1da0)), closes [#710](https://github.com/aws/jsii/issues/710)





## [0.15.0](https://github.com/aws/jsii/compare/v0.14.3...v0.15.0) (2019-08-12)


### Bug Fixes

* **dotnet:** stop mutating Dictionary when iterating on it ([#691](https://github.com/aws/jsii/issues/691)) ([8aedfc9](https://github.com/aws/jsii/commit/8aedfc9)), closes [#690](https://github.com/aws/jsii/issues/690)
* **java:** improve property override detection ([#692](https://github.com/aws/jsii/issues/692)) ([d90b304](https://github.com/aws/jsii/commit/d90b304))


### Features

* **dotnet:** handling optional and variadic parameters ([#680](https://github.com/aws/jsii/issues/680)) ([e8b5a35](https://github.com/aws/jsii/commit/e8b5a35)), closes [#153](https://github.com/aws/jsii/issues/153) [#210](https://github.com/aws/jsii/issues/210)
* **java:** overhauled structs with native implementation, builders, ...  ([#694](https://github.com/aws/jsii/issues/694)) ([b0b3fd2](https://github.com/aws/jsii/commit/b0b3fd2)), closes [#525](https://github.com/aws/jsii/issues/525)
* **java:** remove dependency on google Guava ([#681](https://github.com/aws/jsii/issues/681)) ([e86bfdc](https://github.com/aws/jsii/commit/e86bfdc))
* **superchain:** add `mono` toolchain ([#687](https://github.com/aws/jsii/issues/687)) ([3defca3](https://github.com/aws/jsii/commit/3defca3))





## [0.14.3](https://github.com/aws/jsii/compare/v0.14.2...v0.14.3) (2019-08-01)


### Bug Fixes

* **dotnet:** use fully-qualified type names ([#651](https://github.com/aws/jsii/issues/651)) ([d32e2cd](https://github.com/aws/jsii/commit/d32e2cd)), closes [#650](https://github.com/aws/jsii/issues/650)


### Features

* new code generator for .NET ([#567](https://github.com/aws/jsii/issues/567)) ([c03e078](https://github.com/aws/jsii/commit/c03e078))





## [0.14.2](https://github.com/aws/jsii/compare/v0.14.1...v0.14.2) (2019-07-19)


### Bug Fixes

* fix usage of "external" stability ([#639](https://github.com/aws/jsii/issues/639)) ([30dea87](https://github.com/aws/jsii/commit/30dea87))





## [0.14.1](https://github.com/aws/jsii/compare/v0.14.0...v0.14.1) (2019-07-17)


### Bug Fixes

* **build:** fix python runtime BaseProvider signatures ([#601](https://github.com/aws/jsii/issues/601)) ([6526469](https://github.com/aws/jsii/commit/6526469))
* **kernel:** validate presence of required struct properties ([#591](https://github.com/aws/jsii/issues/591)) ([90135f9](https://github.com/aws/jsii/commit/90135f9))


### Features

* **jsii:** configure outDir and rootDir for tsc ([#593](https://github.com/aws/jsii/issues/593)) ([21855e2](https://github.com/aws/jsii/commit/21855e2))
* **jsii-diff:** also check stability transitions ([#592](https://github.com/aws/jsii/issues/592)) ([15f77b5](https://github.com/aws/jsii/commit/15f77b5))
* add support for "external" stability ([#596](https://github.com/aws/jsii/issues/596)) ([dd66afb](https://github.com/aws/jsii/commit/dd66afb))





## [0.14.0](https://github.com/aws/jsii/compare/v0.13.4...v0.14.0) (2019-07-08)


### Features

* **python:** idiomatic capitalization for structs ([#586](https://github.com/aws/jsii/issues/586)) ([51211a0](https://github.com/aws/jsii/commit/51211a0)), closes [#537](https://github.com/aws/jsii/issues/537) [#577](https://github.com/aws/jsii/issues/577) [#578](https://github.com/aws/jsii/issues/578) [#588](https://github.com/aws/jsii/issues/588)





## [0.13.4](https://github.com/aws/jsii/compare/v0.13.3...v0.13.4) (2019-07-03)

**Note:** Version bump only for package jsii


## [0.13.3](https://github.com/aws/jsii/compare/v0.13.2...v0.13.3) (2019-07-01)


### Bug Fixes

* **.net:** occasional incorrect param type cast ([#568](https://github.com/aws/jsii/issues/568)) ([c89d0fa](https://github.com/aws/jsii/commit/c89d0fa)), closes [awslabs/aws-cdk#3093](https://github.com/awslabs/aws-cdk/issues/3093)
* **jsii:** correctly inherit initializer stability ([#569](https://github.com/aws/jsii/issues/569)) ([a4de2d8](https://github.com/aws/jsii/commit/a4de2d8))





## [0.13.2](https://github.com/aws/jsii/compare/v0.12.1...v0.13.2) (2019-07-01)


### Bug Fixes

* **jsii-diff:** handle recursive types ([#558](https://github.com/aws/jsii/issues/558)) ([3c43be1](https://github.com/aws/jsii/commit/3c43be1))


### Features

* **pacmak:** support adding a suffix to Java package version ([#552](https://github.com/aws/jsii/issues/552)) ([dfde37a](https://github.com/aws/jsii/commit/dfde37a))
* **pacmak:** support adding suffix to .NET package versions ([#557](https://github.com/aws/jsii/issues/557)) ([99adf19](https://github.com/aws/jsii/commit/99adf19))





## [0.12.1](https://github.com/aws/jsii/compare/v0.12.0...v0.12.1) (2019-06-25)


### Bug Fixes

* **kernel:** properly deserialize structs passed in byref ([#554](https://github.com/aws/jsii/issues/554)) ([1e89aab](https://github.com/aws/jsii/commit/1e89aab)), closes [#553](https://github.com/aws/jsii/issues/553)





# [0.12.0](https://github.com/aws/jsii/compare/v0.11.3...v0.12.0) (2019-06-24)


### Bug Fixes

* **jsii:** Validate overriding does not affect optionality ([#549](https://github.com/aws/jsii/issues/549)) ([8c826c1](https://github.com/aws/jsii/commit/8c826c1))
* **python:** parameter names in docstrings should be snake_case, not camelCase ([#539](https://github.com/aws/jsii/issues/539)) ([a91a315](https://github.com/aws/jsii/commit/a91a315))


### Features

* **jsii:** enforce enum member names to be ALL_CAPS ([#541](https://github.com/aws/jsii/issues/541)) ([c88080d](https://github.com/aws/jsii/commit/c88080d)), closes [awslabs/aws-cdk#2287](https://github.com/awslabs/aws-cdk/issues/2287)
* **jsii-diff:** extend reporting options ([#547](https://github.com/aws/jsii/issues/547)) ([719be24](https://github.com/aws/jsii/commit/719be24))


### BREAKING CHANGES

* **jsii:** Enum members are now expected to be `ALL_CAPS`





## [0.11.3](https://github.com/aws/jsii/compare/v0.11.2...v0.11.3) (2019-06-18)

### Features

* **jsii-reflect:** Expose Assembly metadata field ([#542](https://github.com/aws/jsii/pull/542)) ([9b35e98](https://github.com/aws/jsii/commit/9b35e98))


### Bug Fixes

* **jsii:** Correctly handle singleton enums ([#535](https://github.com/aws/jsii/issues/535)) ([01aed03](https://github.com/aws/jsii/commit/01aed03)), closes [#231](https://github.com/aws/jsii/issues/231)
* **jsii:** Correctly ignore private properties from ctor ([#531](https://github.com/aws/jsii/issues/531)) ([e804cab](https://github.com/aws/jsii/commit/e804cab))





## [0.11.2](https://github.com/aws/jsii/compare/v0.11.1...v0.11.2) (2019-06-07)


### Bug Fixes

* **java:** Escape `*/` in package-info.java ([#526](https://github.com/aws/jsii/issues/526)) ([4e7ea98](https://github.com/aws/jsii/commit/4e7ea98))
* **kernel:** Correct null handling in JSON types ([#523](https://github.com/aws/jsii/issues/523)) ([7ffa98d](https://github.com/aws/jsii/commit/7ffa98d))





## [0.11.1](https://github.com/aws/jsii/compare/v0.11.0...v0.11.1) (2019-06-07)


### Bug Fixes

* **jsii-diff:** crash when changing method to a property ([#521](https://github.com/aws/jsii/issues/521)) ([28241cd](https://github.com/aws/jsii/commit/28241cd)), closes [#520](https://github.com/aws/jsii/issues/520)
* **jsii-pacmak:** retry .NET build a couple of times ([#509](https://github.com/aws/jsii/issues/509)) ([d1ef618](https://github.com/aws/jsii/commit/d1ef618))
* **python:** support variadic arguments ([#513](https://github.com/aws/jsii/issues/513)) ([695ca6b](https://github.com/aws/jsii/commit/695ca6b))


### Features

* Register module-level stability ([#515](https://github.com/aws/jsii/issues/515)) ([efae447](https://github.com/aws/jsii/commit/efae447)), closes [awslabs/cdk-ops#367](https://github.com/awslabs/cdk-ops/issues/367)
* **jsii:** Propagate stability to members ([#522](https://github.com/aws/jsii/issues/522)) ([20507e6](https://github.com/aws/jsii/commit/20507e6))
* **jsii-spec:** Add optional metadata field ([#512](https://github.com/aws/jsii/issues/512)) ([10e2bfe](https://github.com/aws/jsii/commit/10e2bfe))





# [0.11.0](https://github.com/aws/jsii/compare/v0.10.5...v0.11.0) (2019-05-21)


### Bug Fixes

* **assembler:** handle unknown types without crashing ([#501](https://github.com/aws/jsii/issues/501)) ([7ba1aab](https://github.com/aws/jsii/commit/7ba1aab))
* **jsii:** deduplicate interfaces ([#497](https://github.com/aws/jsii/issues/497)) ([05f5189](https://github.com/aws/jsii/commit/05f5189)), closes [#496](https://github.com/aws/jsii/issues/496)
* **jsii-diff:** catch exception if type disappeared from other assembly ([#504](https://github.com/aws/jsii/issues/504)) ([8d11900](https://github.com/aws/jsii/commit/8d11900))
* **jsii-diff:** correctly handle assignability of type unions ([#500](https://github.com/aws/jsii/issues/500)) ([04c061e](https://github.com/aws/jsii/commit/04c061e))
* **jsii-diff:** don't fail on new packages ([#502](https://github.com/aws/jsii/issues/502)) ([d1d0633](https://github.com/aws/jsii/commit/d1d0633))


### Features

* **jsii:** protect against prohibited member names ([#506](https://github.com/aws/jsii/issues/506)) ([2848f76](https://github.com/aws/jsii/commit/2848f76))


### BREAKING CHANGES

* **jsii:** The `equals` and `hashCode` method names may no longer be used on JSII classes and interfaces, due to their
  colliding with "special meaning" methods in other languages (Java, .NET, ...).


## [0.10.5](https://github.com/aws/jsii/compare/v0.10.4...v0.10.5) (2019-05-06)


### Bug Fixes

* **jsii:** merge all "implements" declarations ([#494](https://github.com/aws/jsii/issues/494)) ([5e069aa](https://github.com/aws/jsii/commit/5e069aa)), closes [#493](https://github.com/aws/jsii/issues/493)





## [0.10.4](https://github.com/aws/jsii/compare/v0.10.3...v0.10.4) (2019-05-05)


### Bug Fixes

* **jsii:** consider interfaces from erased base classes ([#491](https://github.com/aws/jsii/issues/491)) ([b03511b](https://github.com/aws/jsii/commit/b03511b)), closes [#487](https://github.com/aws/jsii/issues/487)





## [0.10.3](https://github.com/aws/jsii/compare/v0.10.2...v0.10.3) (2019-04-24)


### Bug Fixes

* **java:** fix illegal arguments passed to JavaDoc generator ([#475](https://github.com/aws/jsii/issues/475)) ([4456138](https://github.com/aws/jsii/commit/4456138))
* **jsii-diff:** be nicer about validation errors ([#481](https://github.com/aws/jsii/issues/481)) ([fa4d000](https://github.com/aws/jsii/commit/fa4d000))
* **python:** fix indentation for multiline bullets in RST generator ([#479](https://github.com/aws/jsii/issues/479)) ([3a79142](https://github.com/aws/jsii/commit/3a79142)), closes [#478](https://github.com/aws/jsii/issues/478)
* **python:** maintain inheritance chain for structs ([#482](https://github.com/aws/jsii/issues/482)) ([607f151](https://github.com/aws/jsii/commit/607f151)), closes [#473](https://github.com/aws/jsii/issues/473)


### Features

* **jsii-pacmak:** add Python docstrings ([#470](https://github.com/aws/jsii/issues/470)) ([6cd4903](https://github.com/aws/jsii/commit/6cd4903))





## [0.10.2](https://github.com/aws/jsii/compare/v0.10.1...v0.10.2) (2019-04-18)


### Bug Fixes

* **dotnet:** Correctly handle 'void' callback results ([#471](https://github.com/aws/jsii/issues/471)) ([81e41bd](https://github.com/aws/jsii/commit/81e41bd))





## [0.10.1](https://github.com/aws/jsii/compare/v0.10.0...v0.10.1) (2019-04-17)


### Bug Fixes

* **dotnet:** Correctly generate "optional" markers ([#466](https://github.com/aws/jsii/issues/466)) ([17403dc](https://github.com/aws/jsii/commit/17403dc))





## [0.10.0](https://github.com/aws/jsii/compare/v0.9.0...v0.10.0) (2019-04-16)


### Bug Fixes

* exit with non-zero exit code if there are compilation errors ([#442](https://github.com/aws/jsii/issues/442)) ([6265bf6](https://github.com/aws/jsii/commit/6265bf6)), closes [#383](https://github.com/aws/jsii/issues/383) [#441](https://github.com/aws/jsii/issues/441)
* **dotnet:** fix doc comment model parsing in .NET generator ([#455](https://github.com/aws/jsii/issues/455)) ([ae85aa5](https://github.com/aws/jsii/commit/ae85aa5))
* **java:** Stop using Streams to render params ([#459](https://github.com/aws/jsii/issues/459)) ([a5e8a93](https://github.com/aws/jsii/commit/a5e8a93))
* **jsii:** check that static and nonstatic members don't share a name ([#430](https://github.com/aws/jsii/issues/430)) ([a0741cc](https://github.com/aws/jsii/commit/a0741cc)), closes [#427](https://github.com/aws/jsii/issues/427)
* **jsii:** flatten out dependency list ([#454](https://github.com/aws/jsii/issues/454)) ([ebdd10d](https://github.com/aws/jsii/commit/ebdd10d)), closes [#453](https://github.com/aws/jsii/issues/453)
* **jsii-reflect:** don't load same assembly multiple times ([#461](https://github.com/aws/jsii/issues/461)) ([3a6b21c](https://github.com/aws/jsii/commit/3a6b21c))
* **jsii-spec:** show deep validation errors ([#452](https://github.com/aws/jsii/issues/452)) ([4d84e0b](https://github.com/aws/jsii/commit/4d84e0b))
* **kernel:** Set `this` in static contexts ([#460](https://github.com/aws/jsii/issues/460)) ([c81b4c1](https://github.com/aws/jsii/commit/c81b4c1)), closes [awslabs/aws-cdk#2304](https://github.com/awslabs/aws-cdk/issues/2304)
* **pacmak:** fix Maven dependency collector. ([#449](https://github.com/aws/jsii/issues/449)) ([675b86a](https://github.com/aws/jsii/commit/675b86a)), closes [#447](https://github.com/aws/jsii/issues/447)


### Features

* **jsii-spec:** Model parameter optionality ([#432](https://github.com/aws/jsii/issues/432)) ([21e485a](https://github.com/aws/jsii/commit/21e485a)), closes [#296](https://github.com/aws/jsii/issues/296) [#414](https://github.com/aws/jsii/issues/414)


### BREAKING CHANGES

* **jsii-spec:** JSII assemblies generated by older versions of the tool
will fail loading with this new version, and vice-versa. Re-compile your
projects in order to fix this.





## [0.9.0](https://github.com/aws/jsii/compare/v0.8.2...v0.9.0) (2019-04-04)


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
* **kernel:** Normalize empty structs to undefined ([#416](https://github.com/aws/jsii/issues/416)) ([a8ee954](https://github.com/aws/jsii/commit/a8ee954)), closes [#411](https://github.com/aws/jsii/issues/411)


### BREAKING CHANGES

* **jsii:** All direct dependencies must be duplicated in
                 peerDependencies unless they are in bundledDependencies.





## [0.8.2](https://github.com/aws/jsii/compare/v0.8.1...v0.8.2) (2019-03-28)


### Bug Fixes

* **kernel:** Transitively consider properties when deserializing structs ([#409](https://github.com/aws/jsii/issues/409)) ([66789e8](https://github.com/aws/jsii/commit/66789e8))
* **python:** Lift the entire data class hierarchy ([#408](https://github.com/aws/jsii/issues/408)) ([f813620](https://github.com/aws/jsii/commit/f813620))


### Features

* **python:** Add support for synchronous callbacks ([#407](https://github.com/aws/jsii/issues/407)) ([4cb91b3](https://github.com/aws/jsii/commit/4cb91b3))





## [0.8.1](https://github.com/aws/jsii/compare/v0.8.0...v0.8.1) (2019-03-28)


### Bug Fixes

* **kernel:** make type serialization explicit and recursive ([#401](https://github.com/aws/jsii/issues/401)) ([0a83d52](https://github.com/aws/jsii/commit/0a83d52)), closes [awslabs/aws-cdk#1981](https://github.com/awslabs/aws-cdk/issues/1981)
* **runtime:** Passing 'this' to a callback from constructor ([#395](https://github.com/aws/jsii/issues/395)) ([850f42b](https://github.com/aws/jsii/commit/850f42b))





# [0.8.0](https://github.com/aws/jsii/compare/v0.7.15...v0.8.0) (2019-03-20)


### Bug Fixes

* **jsii:** prohibit exported const enums ([#372](https://github.com/aws/jsii/issues/372)) ([5a94825](https://github.com/aws/jsii/commit/5a94825)), closes [awslabs/aws-cdk#1969](https://github.com/awslabs/aws-cdk/issues/1969)
* **jsii:** show jsii diagnostics in watch mode and support $tsc problem matcher ([#383](https://github.com/aws/jsii/issues/383)) ([0275944](https://github.com/aws/jsii/commit/0275944)), closes [#382](https://github.com/aws/jsii/issues/382)
* copy non-hidden bases when erasing hidden interfaces ([#392](https://github.com/aws/jsii/issues/392)) ([5af84b6](https://github.com/aws/jsii/commit/5af84b6)), closes [#390](https://github.com/aws/jsii/issues/390)
* Fix Async function support in Python ([b5d49de](https://github.com/aws/jsii/commit/b5d49de))
* Fix permissions error in pipeline when generating Python runtime ([af1346f](https://github.com/aws/jsii/commit/af1346f))
* Proxy interface literals in the generated Python code ([10242eb](https://github.com/aws/jsii/commit/10242eb))
* Python's abstract class proxies now inherit from parent's proxy ([6f1c9c0](https://github.com/aws/jsii/commit/6f1c9c0))


### Features

* Add Python Support ([cc3ec87](https://github.com/aws/jsii/commit/cc3ec87))
* internal accessibility ([#390](https://github.com/aws/jsii/issues/390)) ([e232cb5](https://github.com/aws/jsii/commit/e232cb5)), closes [#287](https://github.com/aws/jsii/issues/287) [#388](https://github.com/aws/jsii/issues/388)
* pass data types (structs) by-value instead of by-ref ([#376](https://github.com/aws/jsii/issues/376)) ([db3ccdf](https://github.com/aws/jsii/commit/db3ccdf)), closes [awslabs/aws-cdk#965](https://github.com/awslabs/aws-cdk/issues/965) [#375](https://github.com/aws/jsii/issues/375)


### BREAKING CHANGES

* all properties in interfaces which represent data types must be marked as `readonly`. Otherwise, jsii compilation will fail.
* member names that begin with underscore now must be marked as "@internal" in their jsdocs, which will cause them to disappear from type declaration files and jsii APIs.





<a name="0.7.15"></a>
## [0.7.15](https://github.com/aws/jsii/compare/v0.7.14...v0.7.15) (2019-02-27)


### Bug Fixes

* **jsii-pacmack:** default to target directory mode ([#363](https://github.com/aws/jsii/issues/363)) ([967d917](https://github.com/aws/jsii/commit/967d917))
* **java-runtime:** Bump version of Jackson because of CVEs ([#362](https://github.com/aws/jsii/issues/362)) ([140aa4d](https://github.com/aws/jsii/commit/140aa4d))
* **jsii:** detect double interface member declarations ([#360](https://github.com/aws/jsii/issues/360)) ([b2b2c89](https://github.com/aws/jsii/commit/b2b2c89)), closes [#340](https://github.com/aws/jsii/issues/340)




<a name="0.7.14"></a>
## [0.7.14](https://github.com/aws/jsii/compare/v0.7.13...v0.7.14) (2019-02-04)


### Bug Fixes

* remove use of private API ([#351](https://github.com/aws/jsii/issues/351)) ([874cbac](https://github.com/aws/jsii/commit/874cbac)), closes [#350](https://github.com/aws/jsii/issues/350)
* **jsii-dotnet-runtime:** Fix EPIPE on Windows. ([1d7cc8b](https://github.com/aws/jsii/commit/1d7cc8b)), closes [#341](https://github.com/aws/jsii/issues/341)
* **jsii-dotnet-runtime:** Redirect to STDERR. ([e20f401](https://github.com/aws/jsii/commit/e20f401))
* **kernel:** Improve tagged type of wire values ([#346](https://github.com/aws/jsii/issues/346)) ([8ea39ac](https://github.com/aws/jsii/commit/8ea39ac)), closes [#345](https://github.com/aws/jsii/issues/345)


### Features

* **jsii:** support multiple class declaration sites ([#348](https://github.com/aws/jsii/issues/348)) ([4ecf28c](https://github.com/aws/jsii/commit/4ecf28c))
* Generate NuGet symbol and source packages ([#243](https://github.com/aws/jsii/issues/243)) ([aafd405](https://github.com/aws/jsii/commit/aafd405))




<a name="0.7.13"></a>
## [0.7.13](https://github.com/aws/jsii/compare/v0.7.12...v0.7.13) (2019-01-03)


### Features

* add option to generate TypeScript project references ([#343](https://github.com/aws/jsii/issues/343)) ([5eec5dc](https://github.com/aws/jsii/commit/5eec5dc))




<a name="0.7.12"></a>
## [0.7.12](https://github.com/aws/jsii/compare/v0.7.11...v0.7.12) (2018-12-11)


### Bug Fixes

* **kernel:** Correctly return instances of un-exported types ([#321](https://github.com/aws/jsii/issues/321)) ([9c59acc](https://github.com/aws/jsii/commit/9c59acc))


### Features

* JSII_AGENT ([#325](https://github.com/aws/jsii/issues/325)) ([cf1d0c3](https://github.com/aws/jsii/commit/cf1d0c3)), closes [#324](https://github.com/aws/jsii/issues/324)
* **jsii-reflect:** library for exploring jsii type systems ([#328](https://github.com/aws/jsii/issues/328)) ([69cdb32](https://github.com/aws/jsii/commit/69cdb32))




<a name="0.7.11"></a>
## [0.7.11](https://github.com/aws/jsii/compare/v0.7.10...v0.7.11) (2018-11-18)


### Bug Fixes

* **jsii-dotnet-runtime:** Build projects, not solutions. ([dc3be5e](https://github.com/aws/jsii/commit/dc3be5e))
* **jsii-dotnet-runtime:** Proxy parameters should not throw exception. ([#317](https://github.com/aws/jsii/issues/317)) ([acc8f22](https://github.com/aws/jsii/commit/acc8f22)), closes [#316](https://github.com/aws/jsii/issues/316)
* **jsii-dotnet-runtime-test:** Floating calculator package version ([40881f0](https://github.com/aws/jsii/commit/40881f0))


### Features

* **jsii-dotnet-runtime:** Improve .NET Performance ([20321af](https://github.com/aws/jsii/commit/20321af)), closes [#304](https://github.com/aws/jsii/issues/304)




<a name="0.7.10"></a>
## [0.7.10](https://github.com/aws/jsii/compare/v0.7.9...v0.7.10) (2018-11-12)


### Bug Fixes

* **jsii:** jsii-fix-peers missing in npm tarball ([#313](https://github.com/aws/jsii/issues/313)) ([6915455](https://github.com/aws/jsii/commit/6915455))




<a name="0.7.9"></a>
## [0.7.9](https://github.com/aws/jsii/compare/v0.7.8...v0.7.9) (2018-11-12)


### Bug Fixes

* **docs:** improve docs rendering ([#303](https://github.com/aws/jsii/issues/303)) ([094a215](https://github.com/aws/jsii/commit/094a215)), closes [#301](https://github.com/aws/jsii/issues/301) [#298](https://github.com/aws/jsii/issues/298) [#302](https://github.com/aws/jsii/issues/302) [#300](https://github.com/aws/jsii/issues/300) [#299](https://github.com/aws/jsii/issues/299)
* **dotnet/runtime:** Incorrect callback response format ([#286](https://github.com/aws/jsii/issues/286)) ([1b851e1](https://github.com/aws/jsii/commit/1b851e1)), closes [#285](https://github.com/aws/jsii/issues/285)
* **jsii:** do not mark "any" or "unknown" as optional (unless "?") ([#295](https://github.com/aws/jsii/issues/295)) ([cdf5a53](https://github.com/aws/jsii/commit/cdf5a53)), closes [#284](https://github.com/aws/jsii/issues/284)
* **jsii-runtime:** treat "null" as "undefined" ([#297](https://github.com/aws/jsii/issues/297)) ([43fb16a](https://github.com/aws/jsii/commit/43fb16a)), closes [awslabs/aws-cdk#157](https://github.com/awslabs/aws-cdk/issues/157) [#282](https://github.com/aws/jsii/issues/282)
* **runtime/dotnet:** Correct a number of type mappings ([#291](https://github.com/aws/jsii/issues/291)) ([0d59dab](https://github.com/aws/jsii/commit/0d59dab)), closes [#290](https://github.com/aws/jsii/issues/290) [awslabs/aws-cdk#1027](https://github.com/awslabs/aws-cdk/issues/1027)
* accept variadic arguments after optional arguments ([#307](https://github.com/aws/jsii/issues/307)) ([c1af1d6](https://github.com/aws/jsii/commit/c1af1d6))
* remove overly strict checks on peer versions ([#306](https://github.com/aws/jsii/issues/306)) ([7b89d01](https://github.com/aws/jsii/commit/7b89d01))


### Features

* **jsii:** enforce peer dependencies ([#294](https://github.com/aws/jsii/issues/294)) ([1753910](https://github.com/aws/jsii/commit/1753910)), closes [awslabs/aws-cdk#979](https://github.com/awslabs/aws-cdk/issues/979)




<a name="0.7.8"></a>
## [0.7.8](https://github.com/aws/jsii/compare/v0.7.7...v0.7.8) (2018-10-23)


### Bug Fixes

* **jsii:** use base interfaces for 'datatype' property ([#265](https://github.com/aws/jsii/issues/265)) ([1c56902](https://github.com/aws/jsii/commit/1c56902)), closes [#264](https://github.com/aws/jsii/issues/264)
* **jsii:** use default jsx compiler options ([#261](https://github.com/aws/jsii/issues/261)) ([bf1f586](https://github.com/aws/jsii/commit/bf1f586)), closes [awslabs/aws-cdk#830](https://github.com/awslabs/aws-cdk/issues/830)
* match behavioral interface to 'I'-prefix ([#271](https://github.com/aws/jsii/issues/271)) ([03103f3](https://github.com/aws/jsii/commit/03103f3))
* require distinct argument and property names ([#272](https://github.com/aws/jsii/issues/272)) ([4d2f268](https://github.com/aws/jsii/commit/4d2f268)), closes [#268](https://github.com/aws/jsii/issues/268)




<a name="0.7.7"></a>
## [0.7.7](https://github.com/aws/jsii/compare/v0.7.6...v0.7.7) (2018-10-10)


### Bug Fixes

* **dotnet:** abstract classes should have proxy implementations ([#241](https://github.com/aws/jsii/issues/241)) ([828a26f](https://github.com/aws/jsii/commit/828a26f)), closes [#223](https://github.com/aws/jsii/issues/223)
* **jsii:** better usage reporting of private types ([#247](https://github.com/aws/jsii/issues/247)) ([96ac5d6](https://github.com/aws/jsii/commit/96ac5d6))
* **jsii:** support  public autoproperties in private constructor ([#256](https://github.com/aws/jsii/issues/256)) ([181012e](https://github.com/aws/jsii/commit/181012e))
* **jsii:** use default jsx compiler options ([#260](https://github.com/aws/jsii/issues/260)) ([660ae79](https://github.com/aws/jsii/commit/660ae79)), closes [awslabs/aws-cdk#830](https://github.com/awslabs/aws-cdk/issues/830)
* **jsii-dotnet-generator:** Use FQ type returns in conflict. ([#258](https://github.com/aws/jsii/issues/258)) ([a78784a](https://github.com/aws/jsii/commit/a78784a)), closes [#252](https://github.com/aws/jsii/issues/252)
* **jsii-runtime:** Use buffer factory methods instead of constructor. ([#246](https://github.com/aws/jsii/issues/246)) ([6ad6b9d](https://github.com/aws/jsii/commit/6ad6b9d))
* **kernel:** Return object literals as references ([#249](https://github.com/aws/jsii/issues/249)) ([61cb3a4](https://github.com/aws/jsii/commit/61cb3a4)), closes [#248](https://github.com/aws/jsii/issues/248) [awslabs/aws-cdk#774](https://github.com/awslabs/aws-cdk/issues/774)




<a name="0.7.6"></a>
## [0.7.6](https://github.com/aws/jsii/compare/v0.7.5...v0.7.6) (2018-09-20)


### Bug Fixes

* Sphinx generated incorrect type references for display ([#232](https://github.com/aws/jsii/issues/232)) ([b664805](https://github.com/aws/jsii/commit/b664805))
* **jsii:** Defaulted parameters were not rendered as optional ([#234](https://github.com/aws/jsii/issues/234)) ([578bf9c](https://github.com/aws/jsii/commit/578bf9c)), closes [#233](https://github.com/aws/jsii/issues/233)
* **jsii:** Don't skip emit on TS errors when in "watch" mode ([#236](https://github.com/aws/jsii/issues/236)) ([30d1491](https://github.com/aws/jsii/commit/30d1491)), closes [#235](https://github.com/aws/jsii/issues/235)
* **jsii:** Optional `any` represented as required ([#237](https://github.com/aws/jsii/issues/237)) ([91074f3](https://github.com/aws/jsii/commit/91074f3)), closes [#230](https://github.com/aws/jsii/issues/230)


### Features

* **sphinx:** allow readme file to define sphinx header and reorganize topic ([#229](https://github.com/aws/jsii/issues/229)) ([405da9c](https://github.com/aws/jsii/commit/405da9c)), closes [#228](https://github.com/aws/jsii/issues/228) [#185](https://github.com/aws/jsii/issues/185)
* Document overriden/inherited members ([#238](https://github.com/aws/jsii/issues/238)) ([7a6278a](https://github.com/aws/jsii/commit/7a6278a)), closes [#196](https://github.com/aws/jsii/issues/196)




<a name="0.7.5"></a>
## [0.7.5](https://github.com/aws/jsii/compare/v0.7.4...v0.7.5) (2018-09-13)

### Known Issues

* **dotnet**: unable to instantiate objects when return type is abstract ([#223](https://github.com/aws/jsii/issues/223))

### Bug Fixes

* **java:** support abstract return types ([#224](https://github.com/aws/jsii/issues/224)) ([3257223](https://github.com/aws/jsii/commit/3257223)), closes [#220](https://github.com/aws/jsii/issues/220) [#223](https://github.com/aws/jsii/issues/223) [awslabs/aws-cdk#680](https://github.com/awslabs/aws-cdk/issues/680)


<a name="0.7.4"></a>
## [0.7.4](https://github.com/aws/jsii/compare/v0.7.3...v0.7.4) (2018-09-10)

### Bug Fixes

* **jsii:** Force generated assemblies to reference jsii-only dependencies ([cf62773](https://github.com/aws/jsii/commit/cf62773))


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

### Bug Fixes

* **jsii-pacmak:** Output .NET build artifacts to `dist/dotnet/` instead of just `dist/` ([#192](https://github.com/aws/jsii/issues/192)) ([f25c8c4](https://github.com/aws/jsii/commit/f25c8c45ba3de62c05d5d115f8aad675f85a3f31))
* **jsii-kernel:** Fix module loading on systems that use '\' instead of '/' as the path separator ([#193](https://github.com/aws/jsii/issues/193)) ([9e42991](https://github.com/aws/jsii/pull/193/commits/9e42991c9dad214935d10497c18279cb29c3b613))

### Features

* **jsii:** Add check against downgrading properties to readonly ([#201](https://github.com/aws/jsii/issues/201)) ([f60b0ac](https://github.com/aws/jsii/commit/f60b0ace014e8e96090ead808436b1ce0cb6b1e8))

<a name="0.7.0"></a>
# [0.7.0](https://github.com/aws/jsii/compare/v0.6.4...v0.7.0) (2018-08-21)


### Bug Fixes

* **kernel:** can't find temp directory on Windows ([#184](https://github.com/aws/jsii/issues/184)) ([1aec545](https://github.com/aws/jsii/commit/1aec545)), closes [#183](https://github.com/aws/jsii/issues/183)


### Features

* **jsii:** Further normalize assembly outputs ([#177](https://github.com/aws/jsii/issues/177)) ([de3f062](https://github.com/aws/jsii/commit/de3f062)), closes [#60](https://github.com/aws/jsii/issues/60)

<a name="0.6.4"></a>
## [0.6.4](https://github.com/aws/jsii/compare/v0.6.3...v0.6.4) (2018-08-08)


### Bug Fixes

* jsii-pacmak refers to private dependencies ([e61efc0](https://github.com/aws/jsii/commit/e61efc0))


<a name="0.6.3"></a>
## [0.6.3](https://github.com/aws/jsii/compare/v0.6.2...v0.6.3) (2018-08-08)

### New features

* Produce .nupkg for .NET targets ([#160](https://github.com/aws/jsii/issues/160))
* Upgrade TypeScript to 3.0.1 ([#161](https://github.com/aws/jsii/issues/160))

### Bug Fixes

* Denote the optional aspect of types when describing them ([#159](https://github.com/aws/jsii/issues/159))

<a name="0.6.2"></a>
## [0.6.2](https://github.com/aws/jsii/compare/v0.6.0...v0.6.2) (2018-08-07)

### Bug Fixes

* "Malformed enum value" when using @scoped packages ([#139](https://github.com/aws/jsii/issues/139)) ([4e70209](https://github.com/aws/jsii/commit/4e70209)), closes [#138](https://github.com/aws/jsii/issues/138)

## [0.6.0](https://github.com/aws/jsii/compare/v0.5.0...v0.6.0) (2018-08-06)

* First public release

## 0.5.0 (2018-06-20)

* Support variadics in methods.
* Support for static methods, properties and constants
* Emit strongly-typed `setXxx`/`withXxx` overloads for union properties
* Embed `jsii-runtime.js` as a webpack'd resource into the the java runtime client
