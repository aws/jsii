# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.91.0](https://github.com/aws/jsii/compare/v1.90.0...v1.91.0) (2023-10-24)

## [1.90.0](https://github.com/aws/jsii/compare/v1.89.0...v1.90.0) (2023-10-06)

## [1.89.0](https://github.com/aws/jsii/compare/v1.88.0...v1.89.0) (2023-09-20)

## [1.88.0](https://github.com/aws/jsii/compare/v1.87.0...v1.88.0) (2023-08-24)

## [1.87.0](https://github.com/aws/jsii/compare/v1.86.1...v1.87.0) (2023-08-11)


### Bug Fixes

* **kernel:** fast module loading fails on Windows (EPERM) ([#4212](https://github.com/aws/jsii/issues/4212)) ([fac6cbb](https://github.com/aws/jsii/commit/fac6cbbeb5d9bcbbac8f9dff58001afb701a4065)), closes [#4208](https://github.com/aws/jsii/issues/4208)
* **kernel:** package cache fails under parallelism ([#4215](https://github.com/aws/jsii/issues/4215)) ([b739ef6](https://github.com/aws/jsii/commit/b739ef68d4d92d7af78b2a91b8581e9f3077df96)), closes [#4181](https://github.com/aws/jsii/issues/4181) [#4207](https://github.com/aws/jsii/issues/4207)
* pip, black, setuptools, twine, wheel, and aws-sam-cli incorrectly installed in superchain ([#4201](https://github.com/aws/jsii/issues/4201)) ([851415c](https://github.com/aws/jsii/commit/851415c44864c0fb0b4b2d5ee4535f0b33f89a48))
* **python:** type object 'InterfaceDynamicProxy' has no attribute '__jsii_type__' ([#4209](https://github.com/aws/jsii/issues/4209)) ([057b267](https://github.com/aws/jsii/commit/057b267809a05135d6d22227318ae55100aad272))
* **superchain:** add openssh-client back ([#4224](https://github.com/aws/jsii/issues/4224)) ([8390ca1](https://github.com/aws/jsii/commit/8390ca1615769846f92c42ef35ac590b4673efbb))

## [1.86.1](https://github.com/aws/jsii/compare/v1.86.0...v1.86.1) (2023-08-02)


### Bug Fixes

* **kernel:** incorrectly scoped FQN resolutions ([#4204](https://github.com/aws/jsii/issues/4204)) ([ed667c7](https://github.com/aws/jsii/commit/ed667c76be73c43f969a1b7acc0b4b93a7a00889)), closes [aws/aws-cdk#26604](https://github.com/aws/aws-cdk/issues/26604) [#4202](https://github.com/aws/jsii/issues/4202) [#4203](https://github.com/aws/jsii/issues/4203)

## [1.86.0](https://github.com/aws/jsii/compare/v1.85.0...v1.86.0) (2023-08-01)


### Features

* faster, lazy-friendly runtime loading ([#4181](https://github.com/aws/jsii/issues/4181)) ([ef6e5b1](https://github.com/aws/jsii/commit/ef6e5b1ebbafe69252fc78883962b3731bbb04ef))
* **jsii-pacmak:** allow disabling go build conditionally ([#4196](https://github.com/aws/jsii/issues/4196)) ([7fc7987](https://github.com/aws/jsii/commit/7fc79876889504c2eae5888baeb8525d82a4a491))
* **python:** deprecation message when using Python <= 3.7 ([#4186](https://github.com/aws/jsii/issues/4186)) ([0ef7ace](https://github.com/aws/jsii/commit/0ef7acef765690f99075888d6c3e6f03d7cc2d59))


### Bug Fixes

* **jsii-pacmak:** comment lines should not contain comment ending ([#4193](https://github.com/aws/jsii/issues/4193)) ([906c24d](https://github.com/aws/jsii/commit/906c24db65a0c4a581ba2727dc4ad7ca157a8995))
* **jsii-pacmak:** handles 'default' doc component for go ([#4115](https://github.com/aws/jsii/issues/4115)) ([9085514](https://github.com/aws/jsii/commit/90855148990811ee90b1728b728a974e0b5a0b89))
* type annotation for callable metaclass ([#4179](https://github.com/aws/jsii/issues/4179)) ([4ccbb57](https://github.com/aws/jsii/commit/4ccbb579c8f26f55f8e391ddaf1fd562f1b78c38))

## [1.85.0](https://github.com/aws/jsii/compare/v1.84.0...v1.85.0) (2023-07-17)


### Bug Fixes

* export transliterateAssembly and fix bug with transliterate cli (backport) ([#4166](https://github.com/aws/jsii/issues/4166)) ([6b7eb02](https://github.com/aws/jsii/commit/6b7eb02f3a822941185e8c74be71d677285c741e))
* **go-runtime:** use fatih/color instead of ANSI Escape Code ([#4109](https://github.com/aws/jsii/issues/4109)) ([28b192a](https://github.com/aws/jsii/commit/28b192aa1a3ecdd3b3ce6ee49a5efd32db01e695))

## [1.84.0](https://github.com/aws/jsii/compare/v1.83.0...v1.84.0) (2023-06-13)


### Features

* **jsii:** allow specifying a deprecation message regardless of stability ([#4145](https://github.com/aws/jsii/issues/4145)) ([38d327c](https://github.com/aws/jsii/commit/38d327c7f47b3af360c2829bae8b785c9be055b5))

## [1.83.0](https://github.com/aws/jsii/compare/v1.82.0...v1.83.0) (2023-06-07)

## [1.82.0](https://github.com/aws/jsii/compare/v1.81.0...v1.82.0) (2023-05-22)


### Features

* **go:** register exported properties as callbacks ([#4104](https://github.com/aws/jsii/issues/4104)) ([fa921ec](https://github.com/aws/jsii/commit/fa921ecfb1dab52144e89cbbeeba0b334779cde9)), closes [cdk8s-team/cdk8s#1326](https://github.com/cdk8s-team/cdk8s/issues/1326)
* **superchain:** switch to JDK 20 ([#4082](https://github.com/aws/jsii/issues/4082)) ([f0a1dfc](https://github.com/aws/jsii/commit/f0a1dfce8edb06a1b71758b49886580e6ee271ff))


### Bug Fixes

* **jsii-pacmak:** disable `doclint` ([#4103](https://github.com/aws/jsii/issues/4103)) ([30afa09](https://github.com/aws/jsii/commit/30afa095e296d71d3700a2a56a36483a92c5457d))
* **jsii-pacmak:** emit correct `[@return](https://github.com/return)` tag for JavaDocs ([#4095](https://github.com/aws/jsii/issues/4095)) ([fc7ab7c](https://github.com/aws/jsii/commit/fc7ab7c57f4a94949794cc963bbf644ad491d246))
* **jsii-pacmak:** escape documentation in all positions ([#4096](https://github.com/aws/jsii/issues/4096)) ([6a2248d](https://github.com/aws/jsii/commit/6a2248dde982d2758976cc1b5d4c3e7676b0f204))
* **pacmak:** _ is not treated as a keyword in Java  ([#4094](https://github.com/aws/jsii/issues/4094)) ([eaaf3ee](https://github.com/aws/jsii/commit/eaaf3ee20ad64ba5d5ed4441aa12f27f024e7c85))

## [1.81.0](https://github.com/aws/jsii/compare/v1.80.0...v1.81.0) (2023-05-10)


### Features

* **jsii-diff:** allow external stability to be treated as error ([#4076](https://github.com/aws/jsii/issues/4076)) ([95689ea](https://github.com/aws/jsii/commit/95689ea840a99f38f8449aab2bc452cf489e3e3f))
* **jsii-pacmak:** parsing arguments in non-strict mode ([#4068](https://github.com/aws/jsii/issues/4068)) ([3d49d6f](https://github.com/aws/jsii/commit/3d49d6fd2dc64db45aa3f1164bb976c8cfe75175)), closes [#3465](https://github.com/aws/jsii/issues/3465)


### Bug Fixes

* **pacmak:** go docs overview displays repeating description ([#4081](https://github.com/aws/jsii/issues/4081)) ([4fd596a](https://github.com/aws/jsii/commit/4fd596a467cdb422ebea3fdf01d068bc360b3757)), closes [/github.com/aws/jsii/pull/3698/files#diff-0a99c713a1282d6efe349c932d74dbfbdf1d926834c46ebfb5d65daeb27073f3R263](https://github.com/aws//github.com/aws/jsii/pull/3698/files/issues/diff-0a99c713a1282d6efe349c932d74dbfbdf1d926834c46ebfb5d65daeb27073f3R263) [/github.com/aws/aws-cdk/blob/main/packages/aws-cdk-lib/package.json#L4](https://github.com/aws//github.com/aws/aws-cdk/blob/main/packages/aws-cdk-lib/package.json/issues/L4) [/github.com/aws/jsii/blob/main/packages/jsii-reflect/lib/assembly.ts#L46-L52](https://github.com/aws//github.com/aws/jsii/blob/main/packages/jsii-reflect/lib/assembly.ts/issues/L46-L52)
* **rosetta:** flakey trim-cache test ([#4043](https://github.com/aws/jsii/issues/4043)) ([f70c0f7](https://github.com/aws/jsii/commit/f70c0f77069c8beb30010395cfd5817ac013feba))

## [1.80.0](https://github.com/aws/jsii/compare/v1.79.0...v1.80.0) (2023-04-04)


### Features

* **rosetta:** handle tablets with a streaming JSON codec ([#4034](https://github.com/aws/jsii/issues/4034)) ([d2ecb6d](https://github.com/aws/jsii/commit/d2ecb6d2a6a460e309e4985dc001a6b749b3aac7)), closes [aws/jsii-rosetta#43](https://github.com/aws/jsii-rosetta/issues/43)


### Bug Fixes

* enable dereference when copying module to tmp dir ([#4030](https://github.com/aws/jsii/issues/4030)) ([e00102b](https://github.com/aws/jsii/commit/e00102bbd412be0edd5497948c63ae61c6717c5e))
* **jsii:** incorrect symbol-id generated with typesVersions ([#4037](https://github.com/aws/jsii/issues/4037)) ([1f06ac9](https://github.com/aws/jsii/commit/1f06ac9d6937e823e4333300398260d50cce2978))

## [1.79.0](https://github.com/aws/jsii/compare/v1.78.1...v1.79.0) (2023-03-23)


### Features

* add configurable pack command ([#4021](https://github.com/aws/jsii/issues/4021)) ([6b2fd18](https://github.com/aws/jsii/commit/6b2fd186bd77416a9b341c5544a101f50793076d))
* enable Go generics for jsii Go CDK code ([#4009](https://github.com/aws/jsii/issues/4009)) ([f653b31](https://github.com/aws/jsii/commit/f653b3173760679562648710b08907bfe2c7c748))
* **runtimes:** support JSII_NODE setting ([#4024](https://github.com/aws/jsii/issues/4024)) ([f8f2f13](https://github.com/aws/jsii/commit/f8f2f13780f805cd41cb9945ad8febce9aec5900)), closes [#4009](https://github.com/aws/jsii/issues/4009)

## [1.78.1](https://github.com/aws/jsii/compare/v1.78.0...v1.78.1) (2023-03-16)


### Bug Fixes

* **pacmak:** runtime dependency should match pacmak release ([#4013](https://github.com/aws/jsii/issues/4013)) ([37c29f7](https://github.com/aws/jsii/commit/37c29f7c944b9abe9d7f26c313d729f7af6970a8))

## [1.78.0](https://github.com/aws/jsii/compare/v1.77.0...v1.78.0) (2023-03-15)


### Features

* jsii-reflect now renders union candidates sorted ([#4005](https://github.com/aws/jsii/issues/4005)) ([1fd6cde](https://github.com/aws/jsii/commit/1fd6cde89794dd329049d13008f6f2453663f251))


### Bug Fixes

* **kernel:** json deserialization fails on `null` value ([#4000](https://github.com/aws/jsii/issues/4000)) ([884b0ff](https://github.com/aws/jsii/commit/884b0ffc9993bd3b8a0f9a8b40ecab116ff34872)), closes [aws/aws-cdk#14639](https://github.com/aws/aws-cdk/issues/14639)

## [1.77.0](https://github.com/aws/jsii/compare/v1.76.0...v1.77.0) (2023-03-06)


### Bug Fixes

* **dotnet:** target netcoreapp3.1 with RollForward ([#3987](https://github.com/aws/jsii/issues/3987)) ([461446b](https://github.com/aws/jsii/commit/461446b1b65f60a789aff7d9804aec7b5d867cf7))
* **rosetta:** go may incorrectly emit _ instead of . ([#3985](https://github.com/aws/jsii/issues/3985)) ([52163f8](https://github.com/aws/jsii/commit/52163f88e22ad48ed4fcbfb2ff002c9f8bf6dc52))
* **rosetta:** prints colors to log file ([#3953](https://github.com/aws/jsii/issues/3953)) ([0fc9229](https://github.com/aws/jsii/commit/0fc9229383e23cd535d8fa0a5867e6e51618f00a))

## [1.76.0](https://github.com/aws/jsii/compare/v1.75.0...v1.76.0) (2023-02-24)


### ⚠ BREAKING CHANGES

* **dotnet:** The runtime library for .NET & generated .NET bindings will no longer support netcoreapp3.1 after this release. Users are advised to upgrade their apps to use net6.0 or net7.0 instead.

### Features

* **dotnet:** update TargetFramework to net6.0 ([#3957](https://github.com/aws/jsii/issues/3957)) ([ae335ed](https://github.com/aws/jsii/commit/ae335edc7aef0d918a4bbd32880d4b272a21da7d)), closes [aws/aws-cdk#23926](https://github.com/aws/aws-cdk/issues/23926) [aws/aws-cdk#23921](https://github.com/aws/aws-cdk/issues/23921)
* **go:** add JSII_NODE to override node entrypoint ([#3890](https://github.com/aws/jsii/issues/3890)) ([357562a](https://github.com/aws/jsii/commit/357562a4340a40b3ffb869497b40d552fcfbbcdd)), closes [#3889](https://github.com/aws/jsii/issues/3889)


### Bug Fixes

* JSII_RUNTIME_PACKAGE_CACHE improper case bug ([#3912](https://github.com/aws/jsii/issues/3912)) ([9c27b6e](https://github.com/aws/jsii/commit/9c27b6eb164ec0f86cafa96b7e1cb49517471abc)), closes [#3911](https://github.com/aws/jsii/issues/3911)

## [1.75.0](https://github.com/aws/jsii/compare/v1.74.0...v1.75.0) (2023-02-14)


### Features

* **check-node:** export NodeRelease class ([#3959](https://github.com/aws/jsii/issues/3959)) ([7e18e57](https://github.com/aws/jsii/commit/7e18e57595317780f591d60e623c2e14794dbe7f))


### Bug Fixes

* **go:** shorten file names for sub-packages ([#3927](https://github.com/aws/jsii/issues/3927)) ([7697571](https://github.com/aws/jsii/commit/7697571542df82b5d228faf85d0e637edb254519))
* **rosetta:** submodule-qualified names produce invalid Go, Java ([#3928](https://github.com/aws/jsii/issues/3928)) ([1ff230d](https://github.com/aws/jsii/commit/1ff230d9f7bc969e888e418375e7858df2a14424)), closes [#3551](https://github.com/aws/jsii/issues/3551)

## [1.74.0](https://github.com/aws/jsii/compare/v1.73.0...v1.74.0) (2023-01-28)


### Bug Fixes

* **python:** returning Promise<void> breaks runtime ([#3916](https://github.com/aws/jsii/issues/3916)) ([209d10e](https://github.com/aws/jsii/commit/209d10eab284b4e8ad38e37c0d4b4bf3294569c4))
* **rosetta:** Rosetta does not support `await` ([#3915](https://github.com/aws/jsii/issues/3915)) ([e4c51c4](https://github.com/aws/jsii/commit/e4c51c43ca5c37ea7c40ed13ebcf3f94f5da4299))

## [1.73.0](https://github.com/aws/jsii/compare/v1.72.0...v1.73.0) (2023-01-04)

## [1.72.0](https://github.com/aws/jsii/compare/v1.71.0...v1.72.0) (2022-12-05)


### Features

* **check-node:** allow silencing @jsii/check-node warnings ([#3841](https://github.com/aws/jsii/issues/3841)) ([880dbcc](https://github.com/aws/jsii/commit/880dbccc883005d10f00a1536561e0fe84b5fda6)), closes [#3817](https://github.com/aws/jsii/issues/3817) [#3171](https://github.com/aws/jsii/issues/3171)
* **python:** streaming bin script output ([#3794](https://github.com/aws/jsii/issues/3794)) ([7a41349](https://github.com/aws/jsii/commit/7a41349b6abf230c6798fe8f0019fa5eb7584020)), closes [#3782](https://github.com/aws/jsii/issues/3782)


### Bug Fixes

* **dotnet:** broken error name deserialization ([#3855](https://github.com/aws/jsii/issues/3855)) ([be008d4](https://github.com/aws/jsii/commit/be008d4de8ac65d2dc3c59dedd3993c1850073fb))
* **python:** dereference values returned from Kernel.ainvoke ([#3847](https://github.com/aws/jsii/issues/3847)) ([5643c50](https://github.com/aws/jsii/commit/5643c5057ab5f40f3d76a960fee926720dc1287d))
* **python:** parameter names shadow imported modules ([#3848](https://github.com/aws/jsii/issues/3848)) ([8bac012](https://github.com/aws/jsii/commit/8bac0126832ebce2a5391c86ba9702b12f248b01))
* revert "chore(deps): Bump aws-actions/stale-issue-cleanup from 5 to 6" ([#3850](https://github.com/aws/jsii/issues/3850)) ([6700f1a](https://github.com/aws/jsii/commit/6700f1aa84c1635e739ccf970dfa18b5ca289b83)), closes [aws/jsii#3844](https://github.com/aws/jsii/issues/3844)

## [1.71.0](https://github.com/aws/jsii/compare/v1.70.0...v1.71.0) (2022-11-09)


### Features

* **superchain:** add Amazon SSM agent ([#3819](https://github.com/aws/jsii/issues/3819)) ([d3c3b17](https://github.com/aws/jsii/commit/d3c3b170057b976cdbd196f357e287e6437bb1aa))


### Bug Fixes

* **jsii-diff:** does not check types in submodules ([#3808](https://github.com/aws/jsii/issues/3808)) ([12ea38e](https://github.com/aws/jsii/commit/12ea38ef6123ff2293c7d15f4b318c79e9ccddbe))
* **python:** type-checking may require incorrect type ([#3820](https://github.com/aws/jsii/issues/3820)) ([e9d4084](https://github.com/aws/jsii/commit/e9d4084d06cd2611e4ff25cc7533f823878d1281)), closes [#3818](https://github.com/aws/jsii/issues/3818)

## [1.70.0](https://github.com/aws/jsii/compare/v1.69.0...v1.70.0) (2022-10-19)


### Features

* add error awareness to go deserialization ([#3793](https://github.com/aws/jsii/issues/3793)) ([9b6a307](https://github.com/aws/jsii/commit/9b6a3072ae4c95be152196f8fea36237fa2d0f99))
* **python:** add error differentiation to Python. ([#3772](https://github.com/aws/jsii/issues/3772)) ([e3f7d5e](https://github.com/aws/jsii/commit/e3f7d5e2c9683b13092e4ba05c13ade8b2a5e823))
* **superchain:** add 'acl' package to support projen GHA ([#3783](https://github.com/aws/jsii/issues/3783)) ([306b248](https://github.com/aws/jsii/commit/306b24845d6b36a7079ddb88aaeab2847f7bb238))


### Bug Fixes

* **jsii-reflect:** TypeMember is not SourceLocatable ([#3778](https://github.com/aws/jsii/issues/3778)) ([db809e2](https://github.com/aws/jsii/commit/db809e212735b559d54e96666a2be6b18e432893)), closes [#3777](https://github.com/aws/jsii/issues/3777)
* **python:** KeyError in type checks when decorating methods ([#3791](https://github.com/aws/jsii/issues/3791)) ([dae724c](https://github.com/aws/jsii/commit/dae724c39ba274c6facd8fb9f4b93cc2db52e311))

## [1.69.0](https://github.com/aws/jsii/compare/v1.68.0...v1.69.0) (2022-09-27)


### Features

* **dotnet:** distinguish error types ([#3764](https://github.com/aws/jsii/issues/3764)) ([283dae5](https://github.com/aws/jsii/commit/283dae57647cb28323f4f02ef040deef81248f3a))


### Bug Fixes

* **jsii:** missing deprecation warning in collections ([#3756](https://github.com/aws/jsii/issues/3756)) ([72f2e7c](https://github.com/aws/jsii/commit/72f2e7ca82555c2dce647f873bed923a98808f95)), closes [#3755](https://github.com/aws/jsii/issues/3755)
* **kernel:** EPERM on rename operation on Windows ([#3769](https://github.com/aws/jsii/issues/3769)) ([bab1d38](https://github.com/aws/jsii/commit/bab1d388e8bed41c4930566ba5834acf57cc696c)), closes [#992](https://github.com/aws/jsii/issues/992) [#3724](https://github.com/aws/jsii/issues/3724) [#3751](https://github.com/aws/jsii/issues/3751)
* **python:** bin script python support, test argument passing ([#3762](https://github.com/aws/jsii/issues/3762)) ([0cf5008](https://github.com/aws/jsii/commit/0cf500864c918a799505625b08025293431031c7)), closes [#3694](https://github.com/aws/jsii/issues/3694)

## [1.68.0](https://github.com/aws/jsii/compare/v1.67.0...v1.68.0) (2022-09-22)


### Features

* **kernel:** distinguish framework errors from userland errors in Java ([#3747](https://github.com/aws/jsii/issues/3747)) ([a4d39c6](https://github.com/aws/jsii/commit/a4d39c6fb619cd4d7c9103ec70a731ab6fb23374))


### Bug Fixes

* **jsii:** unable to return Promise<void> ([#3752](https://github.com/aws/jsii/issues/3752)) ([852b3dc](https://github.com/aws/jsii/commit/852b3dc5da113546bc090d99f9250104f526f5af)), closes [#51](https://github.com/aws/jsii/issues/51)
* **pacmak:** .NET bindings fail to compile with error CS8120 ([#3760](https://github.com/aws/jsii/issues/3760)) ([783ec7f](https://github.com/aws/jsii/commit/783ec7f1d40619677f34318ee247244b682cd92d)), closes [#3759](https://github.com/aws/jsii/issues/3759)
* **runtime:** type not found ([#3763](https://github.com/aws/jsii/issues/3763)) ([c7dfad3](https://github.com/aws/jsii/commit/c7dfad3ec905a5ee795be1d313d9c078ab3b4234)), closes [#3742](https://github.com/aws/jsii/issues/3742)

## [1.67.0](https://github.com/aws/jsii/compare/v1.66.0...v1.67.0) (2022-09-02)


### Features

* **java:** dynamic type checking for union-typed parameters ([#3703](https://github.com/aws/jsii/issues/3703)) ([26ca47c](https://github.com/aws/jsii/commit/26ca47cfef15ce346f610d75991e62d5bd0597e3))
* **java:** utility to perform unsafe cast ([#3730](https://github.com/aws/jsii/issues/3730)) ([4a52d4c](https://github.com/aws/jsii/commit/4a52d4cbc31e88d744ed84d5a64df8c8f9651017))
* **kernel:** experimental runtime package cache ([#3724](https://github.com/aws/jsii/issues/3724)) ([4c2dcd5](https://github.com/aws/jsii/commit/4c2dcd5562b2abdfb2a454cb0ee487c4a0533e12)), closes [#3389](https://github.com/aws/jsii/issues/3389)


### Bug Fixes

* **java:** type generation code-gen issues ([#3735](https://github.com/aws/jsii/issues/3735)) ([cf04f79](https://github.com/aws/jsii/commit/cf04f79d28d10861a7e3e7d80b7dfb5dabd0068b))
* **pacmak:** crash when generating java code ([1fd58db](https://github.com/aws/jsii/commit/1fd58db1e94a0024d173d53597416f1d2a2fa941))

## [1.66.0](https://github.com/aws/jsii/compare/v1.65.1...v1.66.0) (2022-08-29)


### Features

* **go:** emit deprecation warning when using go1.16 and go1.17 ([#3718](https://github.com/aws/jsii/issues/3718)) ([3cf5c28](https://github.com/aws/jsii/commit/3cf5c28b26e189db1a05f9543a5f6f38583e8868))
* **go:** runtime type check type unions ([#3712](https://github.com/aws/jsii/issues/3712)) ([c73c2ee](https://github.com/aws/jsii/commit/c73c2ee6d973ea8ff14b320a5f97ae017107ebab))


### Bug Fixes

* **.net:** missing dynamic type checking for collection-nested unions ([#3720](https://github.com/aws/jsii/issues/3720)) ([362326e](https://github.com/aws/jsii/commit/362326e989e1d9f2a032d4c15c34f3d60e712051))
* **rosetta:** rosetta reader expects default tablet file to be uncompressed ([#3723](https://github.com/aws/jsii/issues/3723)) ([9768e2a](https://github.com/aws/jsii/commit/9768e2a7f2eb8847d8d06e3f40deeedac0c7dec4))
* type unions in variadic position leads to invalid code-gen ([#3722](https://github.com/aws/jsii/issues/3722)) ([93aec85](https://github.com/aws/jsii/commit/93aec85ada9fd9e505591766b8e87ee53c0bde6b))

## [1.65.1](https://github.com/aws/jsii/compare/v1.65.0...v1.65.1) (2022-08-29)


### Bug Fixes

* **python:** reference to type does not use alias ([#3728](https://github.com/aws/jsii/pull/3728))


## [1.65.0](https://github.com/aws/jsii/compare/v1.64.0...v1.65.0) (2022-08-18)


### Features

* **pacmak:** allow opt-out of runtime type checking generation ([#3710](https://github.com/aws/jsii/issues/3710)) ([39923a5](https://github.com/aws/jsii/commit/39923a5885f33e99cc8c9181b8f36f20b6208551))


### Bug Fixes

* **dotnet:** AnonymousObject fails runtime type checks ([#3709](https://github.com/aws/jsii/issues/3709)) ([e7fadc0](https://github.com/aws/jsii/commit/e7fadc0866a9dbd1a0061ec184ae840b0f2f58a1))

## [1.64.0](https://github.com/aws/jsii/compare/v1.63.2...v1.64.0) (2022-08-11)


### Features

* **.net:** dynamic type checking for union-typed parameters ([#3668](https://github.com/aws/jsii/issues/3668)) ([f5e0603](https://github.com/aws/jsii/commit/f5e06038adfa6912baabc9ea004ad40a5ad87295)), closes [#3640](https://github.com/aws/jsii/issues/3640)
* **.net:** embed package icon when configured ([#3676](https://github.com/aws/jsii/issues/3676)) ([c65b1d9](https://github.com/aws/jsii/commit/c65b1d9fd1e0a6e37dad96c763c0bb1a1d15f57d))


### Bug Fixes

* **python:** classproperty not working with type checkers ([#3694](https://github.com/aws/jsii/issues/3694)) ([5413720](https://github.com/aws/jsii/commit/5413720a274fbcc9d3b62823197b76589f99329c)), closes [#3633](https://github.com/aws/jsii/issues/3633)
* **python:** unable to override methods with keyword arguments ([#3695](https://github.com/aws/jsii/issues/3695)) ([bcffb4b](https://github.com/aws/jsii/commit/bcffb4bb65846fcada33755269e72ce708ebeacf)), closes [#3656](https://github.com/aws/jsii/issues/3656)

## [1.63.2](https://github.com/aws/jsii/compare/v1.63.1...v1.63.2) (2022-07-29)


### Bug Fixes

* **pyhon:** under-qualified types used by dynamic type checking ([#3688](https://github.com/aws/jsii/issues/3688)) ([833a717](https://github.com/aws/jsii/commit/833a71781c9e4fee1522d75e53d3de76b93439f5))

## [1.63.1](https://github.com/aws/jsii/compare/v1.63.0...v1.63.1) (2022-07-26)


### Features

* **python:** formally allow dicts to be passed in lieu of structs ([#3683](https://github.com/aws/jsii/pull/3683))

## [1.63.0](https://github.com/aws/jsii/compare/v1.62.0...v1.63.0) (2022-07-26)


### Features

* **jsii:** allow specifying baseUrl and paths in tsconfig.json ([#3662](https://github.com/aws/jsii/issues/3662)) ([7eb11b7](https://github.com/aws/jsii/commit/7eb11b7d3173f450cd6bd4c29180f6edf7f6b219)), closes [#865](https://github.com/aws/jsii/issues/865)
* **python:** add dynamic type checking ([#3660](https://github.com/aws/jsii/issues/3660)) ([6c4b773](https://github.com/aws/jsii/commit/6c4b77301341add25df059c66fabde225377a48a)), closes [#3639](https://github.com/aws/jsii/issues/3639)


### Bug Fixes

* **go:** unused imports emitted for type unions ([#3664](https://github.com/aws/jsii/issues/3664)) ([68a80d9](https://github.com/aws/jsii/commit/68a80d98f1faa5772862c18b6907ca2298dccc76)), closes [#3399](https://github.com/aws/jsii/issues/3399)
* **rosetta:** infuse incorrectly handles compressed assemblies ([#3669](https://github.com/aws/jsii/issues/3669)) ([a5bd219](https://github.com/aws/jsii/commit/a5bd2196f2e2e43686c3013a4671c55ddd8ee248))
* **rosetta:** tablet compression handled incorrectly in multiple places ([#3670](https://github.com/aws/jsii/issues/3670)) ([30eded9](https://github.com/aws/jsii/commit/30eded98ec05734f687023ca04ec09769fb1e331)), closes [#3652](https://github.com/aws/jsii/issues/3652)

## [1.62.0](https://github.com/aws/jsii/compare/v1.61.0...v1.62.0) (2022-07-12)


### Features

* **@jsii/spec:** add loadAssemblyFromBuffer function ([#3634](https://github.com/aws/jsii/issues/3634)) ([4f3a0d1](https://github.com/aws/jsii/commit/4f3a0d16a769a678a4ce4bde9a6bbbd715a48ab2))
* **@jsii/spec:** add a utility library to be consumed by jsii modules ([#3570](https://github.com/aws/jsii/issues/3570)) ([635404a](https://github.com/aws/jsii/commit/635404a561a52033f2c93ce238c861a7518a47f4))
* **rosetta:** tablets can be compressed ([#3652](https://github.com/aws/jsii/issues/3652)) ([359e74f](https://github.com/aws/jsii/commit/359e74f3c05a682ef1e55297e27f9e2d538b0694))
* use new read/load assembly functions everywhere ([#3600](https://github.com/aws/jsii/issues/3600)) ([623c0c1](https://github.com/aws/jsii/commit/623c0c14fbe4c4a50c208c5415e689e45f9f54c4)), closes [#3570](https://github.com/aws/jsii/issues/3570) [#3570](https://github.com/aws/jsii/issues/3570)


### Bug Fixes

* **benchmark:** compilation fails due to missing dependencies ([#3610](https://github.com/aws/jsii/issues/3610)) ([28db6e3](https://github.com/aws/jsii/commit/28db6e3c7696da919b8cf3a3a99e22dd53fcedd9))
* jitter Docker build startup ([#3646](https://github.com/aws/jsii/issues/3646)) ([5857ea8](https://github.com/aws/jsii/commit/5857ea8207c47c7002e365b09b5852c36a7c68a3))
* **jsii:** fail compilation when two or more enum members have same val ([#3412](https://github.com/aws/jsii/issues/3412)) ([f64dace](https://github.com/aws/jsii/commit/f64dace793f1db1bf5057f29017820d225887a1f)), closes [#2782](https://github.com/aws/jsii/issues/2782)
* Status icon for Go language that it is generally available. ([#3607](https://github.com/aws/jsii/issues/3607)) ([1762310](https://github.com/aws/jsii/commit/1762310ee59539d1dd604b639aae979ace5818af))

## [1.61.0](https://github.com/aws/jsii/compare/v1.60.1...v1.61.0) (2022-06-16)


### Features

* add support for using custom .m2 directory ([#3573](https://github.com/aws/jsii/issues/3573)) ([0003c8a](https://github.com/aws/jsii/commit/0003c8a22dd44a2c89fcc117e1b1064b221aacfe))


### Bug Fixes

* @jsii/check-node crashes on loading with older node releases ([#3588](https://github.com/aws/jsii/issues/3588)) ([a1582bf](https://github.com/aws/jsii/commit/a1582bf7d9cc4081dd89e51efb4b3bc76b6e407e))
* instantiate perf observer for each iteration ([#3585](https://github.com/aws/jsii/issues/3585)) ([3827d93](https://github.com/aws/jsii/commit/3827d93d7a1c1c83247a79647e84a56c2b5e321a))
* italics in Markdown notation ([#3594](https://github.com/aws/jsii/issues/3594)) ([f754baa](https://github.com/aws/jsii/commit/f754baa81f78cce2f269732272fe305f6b34ca86))

## [1.60.1](https://github.com/aws/jsii/compare/v1.60.0...v1.60.1) (2022-06-09)

### Bug Fixes

* **@aws-cdk/check-node** fails to load on older (EOL) releases of node ([#3588](https://github.com/aws/jsii/pull/3588)) ([a1582bf](https://github.com/aws/jsii/commit/a1582bf7d9cc4081dd89e51efb4b3bc76b6e407e))

## [1.60.0](https://github.com/aws/jsii/compare/v1.59.0...v1.60.0) (2022-06-08)


### ⚠ BREAKING CHANGES

* Beginning with this release, jsii packages no longer
support node 12. Users should migrate to a supported node release (14.x,
16.x, or 18.x).

### Features

* **jsii:** make source map behavior fully configurable ([#3558](https://github.com/aws/jsii/issues/3558)) ([06d9a39](https://github.com/aws/jsii/commit/06d9a39cec8254ebab76a81026ab0e64a2f05462)), closes [#3521](https://github.com/aws/jsii/issues/3521)


### Bug Fixes

* **@jsii/spec:** speed up assembly validation by 20x for large libraries ([#3565](https://github.com/aws/jsii/issues/3565)) ([c40f26c](https://github.com/aws/jsii/commit/c40f26cdc7bef7835fbddbae983783a495be2d0e))
* **java:** rendering of `[@see](https://github.com/see)` hyperlink leads to errors ([#3554](https://github.com/aws/jsii/issues/3554)) ([9fd3c71](https://github.com/aws/jsii/commit/9fd3c71c4edc4d7c03c05930b47fe34fe364bd29))
* **jsii:** `assert` not allowed as interface member ([#3553](https://github.com/aws/jsii/issues/3553)) ([f3fec0c](https://github.com/aws/jsii/commit/f3fec0c10dd72ae734047d2d8e242f8fb4e98812))


* drop support for Node 12 ([#3547](https://github.com/aws/jsii/issues/3547)) ([06a7889](https://github.com/aws/jsii/commit/06a7889514cb0939f5b8224f8961e6d578ea3986))

## [1.59.0](https://github.com/aws/jsii/compare/v1.58.0...v1.59.0) (2022-05-16)


### Features

* **jsii:** enable source maps for declaration files ([#3521](https://github.com/aws/jsii/issues/3521)) ([2751ca8](https://github.com/aws/jsii/commit/2751ca852ee751d3d7a49ee991004f3b5a6bde21))


### Bug Fixes

* **jsii:** deprecation warnings use this.constructor before calling super ([#3528](https://github.com/aws/jsii/issues/3528)) ([5d5f435](https://github.com/aws/jsii/commit/5d5f435c9ce32e6a1e76afe27b7ef810200bde58)), closes [#3527](https://github.com/aws/jsii/issues/3527)
* **python:** cannot import nested submodules ([#3540](https://github.com/aws/jsii/issues/3540)) ([8ef8ef2](https://github.com/aws/jsii/commit/8ef8ef2fe1e5559ef77a5b7ba0dbb67f52329927)), closes [#3408](https://github.com/aws/jsii/issues/3408)

## [1.58.0](https://github.com/aws/jsii/compare/v1.57.0...v1.58.0) (2022-05-06)


### ⚠ BREAKING CHANGES

* `jsii-pacmak` and the libraries it generates for Python
targets now require a minimum Python version of 3.7, instead of 3.6
previously. We recommend users upgrade to the latest supported Python
release (Python 3.10).

### Features

* compiler benchmarks and gh action ([#3503](https://github.com/aws/jsii/issues/3503)) ([4a91cf0](https://github.com/aws/jsii/commit/4a91cf0d3032a988d20049ab9fffc25747ed9c47)), closes [/github.com/MrArnoldPalmer/jsii/pull/417#commitcomment-72358212](https://github.com/aws//github.com/MrArnoldPalmer/jsii/pull/417/issues/commitcomment-72358212)
* **go:** add tag to denote required/optional properties ([#3486](https://github.com/aws/jsii/issues/3486)) ([3d7c310](https://github.com/aws/jsii/commit/3d7c310dcb66f1d61ab4c6a8530be06870d577b3)), closes [#2536](https://github.com/aws/jsii/issues/2536) [#2672](https://github.com/aws/jsii/issues/2672)


### Bug Fixes

* **go:** object type not recognized ([#3485](https://github.com/aws/jsii/issues/3485)) ([fe2fa94](https://github.com/aws/jsii/commit/fe2fa947891ab5d517efbec37998b9b57203aa8d)), closes [#2880](https://github.com/aws/jsii/issues/2880)
* incorrect token for benchmark action ([#3517](https://github.com/aws/jsii/issues/3517)) ([3648117](https://github.com/aws/jsii/commit/3648117811c1edb40c047b2df3adf11a28452b3d))
* **jsii:** some submodules are not exported from `aws-cdk-lib` ([#3491](https://github.com/aws/jsii/issues/3491)) ([47f70a2](https://github.com/aws/jsii/commit/47f70a26383f401a8b3df700787d6ce7934f66f9))
* make jsii --watch work ([#3487](https://github.com/aws/jsii/issues/3487)) ([4a46f7d](https://github.com/aws/jsii/commit/4a46f7d7db3e6f9f1cf2730b02f4af0c1da9f237)), closes [#3467](https://github.com/aws/jsii/issues/3467)
* **pacmak:** missing python artifacts when using relative -o path ([#3518](https://github.com/aws/jsii/issues/3518)) ([cc9b561](https://github.com/aws/jsii/commit/cc9b561b7ee847c78bbc6c8514a74a7e48ed3ef4)), closes [aws/aws-cdk#20041](https://github.com/aws/aws-cdk/issues/20041)
* **rosetta:** attempts transliteraiton to unsupported languages ([#3478](https://github.com/aws/jsii/issues/3478)) ([db2d62e](https://github.com/aws/jsii/commit/db2d62e563432ddb99df273107e182d5fbaf7173))
* **rosetta:** incorrect transliteration for selective imports ([#3508](https://github.com/aws/jsii/issues/3508)) ([8eec086](https://github.com/aws/jsii/commit/8eec0868c02730dd22009c841e25034144b2e86f))


* drop support for Python 3.6 (EOL as of 2021-12-23) ([#3472](https://github.com/aws/jsii/issues/3472)) ([abf7415](https://github.com/aws/jsii/commit/abf741545cc07a6aa85c74a12b7e0271ad8a531d))

## [1.57.0](https://github.com/aws/jsii/compare/v1.56.0...v1.57.0) (2022-04-19)


### Bug Fixes

* **go:** object type not recognized ([#3485](https://github.com/aws/jsii/issues/3485)) ([fe2fa94](https://github.com/aws/jsii/commit/fe2fa947891ab5d517efbec37998b9b57203aa8d)), closes [#2880](https://github.com/aws/jsii/issues/2880)
* **jsii:** some submodules are not exported from `aws-cdk-lib` ([#3491](https://github.com/aws/jsii/issues/3491)) ([47f70a2](https://github.com/aws/jsii/commit/47f70a26383f401a8b3df700787d6ce7934f66f9))
* make jsii --watch work ([#3487](https://github.com/aws/jsii/issues/3487)) ([4a46f7d](https://github.com/aws/jsii/commit/4a46f7d7db3e6f9f1cf2730b02f4af0c1da9f237)), closes [#3467](https://github.com/aws/jsii/issues/3467)

## [1.56.0](https://github.com/aws/jsii/compare/v1.55.1...v1.56.0) (2022-04-08)


### Features

* drop internal functions from Deprecation Error stack trace ([#3426](https://github.com/aws/jsii/issues/3426)) ([5b4b852](https://github.com/aws/jsii/commit/5b4b852c4550782d4f9777cbca7a65264bea49fe))
* expose unknownSnippets config ([#3475](https://github.com/aws/jsii/issues/3475)) ([e9d99a0](https://github.com/aws/jsii/commit/e9d99a06b7b06da2e87d1bf4e2101a0ff5cf3dc9))
* specify output directory for assemblies ([#3437](https://github.com/aws/jsii/issues/3437)) ([5419876](https://github.com/aws/jsii/commit/541987673dd015e0264cf299b51998923556eb8d))
* Standardize issue template for discussions ([b191f60](https://github.com/aws/jsii/commit/b191f60630d513449c6771de38d2d7fcbc8d7941))


### Bug Fixes

* **rosetta:** incorrect transliteration of map keys in python ([#3449](https://github.com/aws/jsii/issues/3449)) ([54cebaa](https://github.com/aws/jsii/commit/54cebaa188a132ab764e2167c9ec5f9042588b47)), closes [#3448](https://github.com/aws/jsii/issues/3448) [#3448](https://github.com/aws/jsii/issues/3448)
* typo "though" -> "through" ([#3419](https://github.com/aws/jsii/issues/3419)) ([3274b6c](https://github.com/aws/jsii/commit/3274b6cb8c5a025c8877343423c1f101029ea0a5))

## [1.55.1](https://github.com/aws/jsii/compare/v1.55.0...v1.55.1) (2022-03-16)

## [1.55.0](https://github.com/aws/jsii/compare/v1.54.0...v1.55.0) (2022-03-10)


### Features

* rosetta go support ([#3376](https://github.com/aws/jsii/issues/3376)) ([015e663](https://github.com/aws/jsii/commit/015e66374a5a846741a54efd610cf351516dbe44))


### Bug Fixes

* **go:** lots of documentation is missing from generated code ([#3409](https://github.com/aws/jsii/issues/3409)) ([69d28bb](https://github.com/aws/jsii/commit/69d28bb467113c5d5e91493b0846616685c64678))

## [1.54.0](https://github.com/aws/jsii/compare/v1.53.0...v1.54.0) (2022-02-15)


### Bug Fixes

* **jsii:** dependencies' README files are unnecessarily re-rendered ([#3380](https://github.com/aws/jsii/issues/3380)) ([ec4edc5](https://github.com/aws/jsii/commit/ec4edc5458d9b146ebd4a2d0c9c6cca1ed03dfaf))

## [1.53.0](https://github.com/aws/jsii/compare/v1.52.1...v1.53.0) (2022-02-09)


### Features

* add configuration for Visual Studio Code ([#3309](https://github.com/aws/jsii/issues/3309)) ([3edf74c](https://github.com/aws/jsii/commit/3edf74cdc6486f35352aec5c98bf5a01657a1209))
* **go:** add UnsafeCast function ([#3316](https://github.com/aws/jsii/issues/3316)) ([19da85e](https://github.com/aws/jsii/commit/19da85e57e544761b83c6c0dfc4bc3432ce4a2b3))
* **go:** Use type registry to find the correct target type for JSII Proxy ([#3354](https://github.com/aws/jsii/issues/3354)) ([75d94ef](https://github.com/aws/jsii/commit/75d94effb71bcbdb0ab30c9b468024e0939d2084)), closes [#3353](https://github.com/aws/jsii/issues/3353) [#2819](https://github.com/aws/jsii/issues/2819)
* **rosetta:** Rosetta manages dependencies automatically ([#3269](https://github.com/aws/jsii/issues/3269)) ([f0b811b](https://github.com/aws/jsii/commit/f0b811b5642e1093a0b59b170a70df258df39fab))


### Bug Fixes

* **dontet:** excessive overrides generated ([#3355](https://github.com/aws/jsii/issues/3355)) ([5460d66](https://github.com/aws/jsii/commit/5460d66f2db6441f7d8cfc849d16f89d3548b82a))
* **go:** replace uses of CanConvert to Type.AssignableTo ([#3373](https://github.com/aws/jsii/issues/3373)) ([ae4ea62](https://github.com/aws/jsii/commit/ae4ea624ad4bcac7da90734ed385b0716375ee5d))
* **go:** unable to reuse instances between child/parent interfaces ([#3321](https://github.com/aws/jsii/issues/3321)) ([70be636](https://github.com/aws/jsii/commit/70be636e2eb3e5144dab16cae62162420a4fe5a8))
* **jsii:** breaks due to faulty version of `colors` ([#3328](https://github.com/aws/jsii/issues/3328)) ([13c0737](https://github.com/aws/jsii/commit/13c073793a9fc5b45cad93801634ce6397a2e007))
* **jsii:** compiler allows inheriting interface-violating members ([#3343](https://github.com/aws/jsii/issues/3343)) ([b5037b9](https://github.com/aws/jsii/commit/b5037b9adf74c1978f1fd940921ce6c2050c297b)), closes [#3342](https://github.com/aws/jsii/issues/3342)
* **jsii:** excessive overrides declarations registered ([#3375](https://github.com/aws/jsii/issues/3375)) ([64a5984](https://github.com/aws/jsii/commit/64a598487f81339e63a0aec5f7428eb99b6c7eb1))
* **jsii:** submodule READMEs don't have literate examples ([#3347](https://github.com/aws/jsii/issues/3347)) ([5769771](https://github.com/aws/jsii/commit/576977133bd9ea0997d9bc1dd114c9407d9b5b12)), closes [aws/aws-cdk#18589](https://github.com/aws/aws-cdk/issues/18589)
* **kernel:** kernel's private object annotations are enumerable ([#3339](https://github.com/aws/jsii/issues/3339)) ([d361c7b](https://github.com/aws/jsii/commit/d361c7bdb2d269e6fcc9c06e55d23e8fe19859a5))
* **pacmak:** greatly reduce go code-gen memory footprint ([#3362](https://github.com/aws/jsii/issues/3362)) ([77b520f](https://github.com/aws/jsii/commit/77b520fb47989bd0dbc0c5af53a17eba0c54a439))
* **python:** cannot call a method that takes an empty struct ([#3372](https://github.com/aws/jsii/issues/3372)) ([c36b67c](https://github.com/aws/jsii/commit/c36b67cbcd125f6b89bedf7be4ebc8fa30e1ba90)), closes [#2846](https://github.com/aws/jsii/issues/2846)
* remove the "comments rewriter" ([#3368](https://github.com/aws/jsii/issues/3368)) ([50dd3b0](https://github.com/aws/jsii/commit/50dd3b051727a64950165efc191d554831812447))
* **superchain:** failure to download PowerShell ([#3340](https://github.com/aws/jsii/issues/3340)) ([59eaaa3](https://github.com/aws/jsii/commit/59eaaa33734bc44d31c483cb81dc5c70b1e24dd8))

## [1.52.1](https://github.com/aws/jsii/compare/v1.52.0...v1.52.1) (2022-01-09)


### Bug Fixes

* **jsii:** breaks due to faulty version of `colors` ([#3328](https://github.com/aws/jsii/issues/3328)) ([5bd5e04](https://github.com/aws/jsii/commit/5bd5e04bc401bdf6c1bc1f3aba9e6401f7347478))

## [1.52.0](https://github.com/aws/jsii/compare/v1.51.0...v1.52.0) (2022-01-07)


### Bug Fixes

* **rosetta:** `transliterate` tries to recompile samples from tablets ([#3324](https://github.com/aws/jsii/issues/3324)) ([7aa69a7](https://github.com/aws/jsii/commit/7aa69a7c51b31ab1adb37b9d5cab682b5da6c715)), closes [#3262](https://github.com/aws/jsii/issues/3262)

## [1.51.0](https://github.com/aws/jsii/compare/v1.50.0...v1.51.0) (2022-01-06)


### Features

* **pacmak:** go yaml struct tags ([#3299](https://github.com/aws/jsii/issues/3299)) ([63132cf](https://github.com/aws/jsii/commit/63132cf30ad62ba59d2a8cdfaba60b92819352cd)), closes [#3293](https://github.com/aws/jsii/issues/3293)


### Bug Fixes

* **jsii:** cannot use submodule types from assemblies before 1.39.0 ([#3306](https://github.com/aws/jsii/issues/3306)) ([949d5f0](https://github.com/aws/jsii/commit/949d5f00df6a44c4fbacc06dc9f4f239c68c583e)), closes [#3233](https://github.com/aws/jsii/issues/3233)
* **rosetta:** Python translation for `implements` is wrong ([#3280](https://github.com/aws/jsii/issues/3280)) ([a833a1d](https://github.com/aws/jsii/commit/a833a1d2f1335e9447fd5702b9e4f9c6166abe67)), closes [aws/aws-cdk#17928](https://github.com/aws/aws-cdk/issues/17928)

## [1.50.0](https://github.com/aws/jsii/compare/v1.49.0...v1.50.0) (2021-12-24)


### Bug Fixes

* **jsii:** color codes are logged to logfiles ([#3284](https://github.com/aws/jsii/issues/3284)) ([2c8c647](https://github.com/aws/jsii/commit/2c8c647356345981cc2f9416449d48b660b5da44))
* **jsii:** slow with deep dependency tree ([#3294](https://github.com/aws/jsii/issues/3294)) ([04d64c9](https://github.com/aws/jsii/commit/04d64c91da5e8a0eccd06cd03a4b7a20bce55845))
* **pacmak:** fails on bundled dependency without entry point ([#3277](https://github.com/aws/jsii/issues/3277)) ([6e5a0b5](https://github.com/aws/jsii/commit/6e5a0b50e19af6cb0c1817fe3c447a24a9632a7b)), closes [#3275](https://github.com/aws/jsii/issues/3275)
* **rosetta:** diagnostics from infused snippets were not ignored ([#3282](https://github.com/aws/jsii/issues/3282)) ([ad7f6a4](https://github.com/aws/jsii/commit/ad7f6a4a20564e733bf29a70956bbbe54d66562e))
* **rosetta:** infused snippets not returned from cache ([#3291](https://github.com/aws/jsii/issues/3291)) ([dd44431](https://github.com/aws/jsii/commit/dd444313b4177babce8d972da01071f308600416))
* **rosetta:** non-compiling snippets not reported on subsequent extracts ([#3260](https://github.com/aws/jsii/issues/3260)) ([771190b](https://github.com/aws/jsii/commit/771190b5435a82fe6033a05247bfa828276f0130))
* **rosetta:** transliterate command does not translate in parallel ([#3262](https://github.com/aws/jsii/issues/3262)) ([beeadaa](https://github.com/aws/jsii/commit/beeadaa21d5bd5a34e97691c2410366f475d3da3))

## [1.49.0](https://github.com/aws/jsii/compare/v1.48.0...v1.49.0) (2021-12-14)


### Bug Fixes

* improve compatibility with restricted-export modules ([#3205](https://github.com/aws/jsii/issues/3205)) ([31a7172](https://github.com/aws/jsii/commit/31a71721bfaff28876ce0554230e63803591e112))
* **jsii:** correctly identify types regardless of import method ([#3233](https://github.com/aws/jsii/issues/3233)) ([aa37d62](https://github.com/aws/jsii/commit/aa37d623f866d2b2a3802a90578e8e85227b37b1)), closes [aws/aws-cdk#17860](https://github.com/aws/aws-cdk/issues/17860)
* **jsii:** handle imports from libraries compiled with old jsii ([#3245](https://github.com/aws/jsii/issues/3245)) ([133d1cf](https://github.com/aws/jsii/commit/133d1cf371367b1516b175aa9ed904eb701fac0f)), closes [#3233](https://github.com/aws/jsii/issues/3233) [#3233](https://github.com/aws/jsii/issues/3233)
* **jsii:** symbolid for single-valued enums is incorrect ([#3234](https://github.com/aws/jsii/issues/3234)) ([83d3fc8](https://github.com/aws/jsii/commit/83d3fc805874a72b7a76d08f62e8b10121b4777b))
* **rosetta:** `rosetta extract` fails if run after `rosetta infuse` ([#3248](https://github.com/aws/jsii/issues/3248)) ([e3ec929](https://github.com/aws/jsii/commit/e3ec92921c10bf397e740d45ad7c5a39a21dc800))
* **rosetta:** classes are not correctly identified if package uses an outDir ([#3225](https://github.com/aws/jsii/issues/3225)) ([05631a7](https://github.com/aws/jsii/commit/05631a723b8c08d8d82e9ec50c6adaee1e2d693e))
* **rosetta:** infuse drops first assembly ([#3243](https://github.com/aws/jsii/issues/3243)) ([29a6a84](https://github.com/aws/jsii/commit/29a6a848e2cada2a695d0d1a852c6c53c24d35ac))

## [1.48.0](https://github.com/aws/jsii/compare/v1.45.0...v1.48.0) (2021-12-13)


### Features

* **reflect:** add `allTypes` accessor ([#3194](https://github.com/aws/jsii/issues/3194)) ([41f301a](https://github.com/aws/jsii/commit/41f301a8304bd1ed6ed7ec4e31bd23ffd1a2ed8b))
* **rosetta:**  metadata tag for fixtures in docs ([#3200](https://github.com/aws/jsii/issues/3200)) ([8cefa8b](https://github.com/aws/jsii/commit/8cefa8bc8c9554913960b48226531aff874ee247))
* **rosetta:** generate rosetta tablets next to each assembly ([#3223](https://github.com/aws/jsii/issues/3223)) ([1e7b604](https://github.com/aws/jsii/commit/1e7b604c15a0083f27ceafd8ca32ff9b6cf61759))
* **rosetta:** reuse output file as additional cache and introduce `--infuse` option for `extract` ([#3210](https://github.com/aws/jsii/issues/3210)) ([ccb3c57](https://github.com/aws/jsii/commit/ccb3c57b834225f16ec619f55a7976e59b7a53c3))


### Bug Fixes

* improve compatibility with restricted-export modules ([#3205](https://github.com/aws/jsii/issues/3205)) ([31a7172](https://github.com/aws/jsii/commit/31a71721bfaff28876ce0554230e63803591e112))
* **jsii:** constants can't mix letters and digits ([#3209](https://github.com/aws/jsii/issues/3209)) ([a444e29](https://github.com/aws/jsii/commit/a444e2993b73dc002586e2c4a3446121c279eb65)), closes [#3208](https://github.com/aws/jsii/issues/3208)
* **jsii:** correctly identify types regardless of import method ([#3233](https://github.com/aws/jsii/issues/3233)) ([aa37d62](https://github.com/aws/jsii/commit/aa37d623f866d2b2a3802a90578e8e85227b37b1)), closes [aws/aws-cdk#17860](https://github.com/aws/aws-cdk/issues/17860)
* **jsii:** deprecation message is not displayed for deprecated classes ([#3206](https://github.com/aws/jsii/issues/3206)) ([3841538](https://github.com/aws/jsii/commit/3841538179226b67c756ca8689ac1a3de4bec521))
* **jsii:** handle imports from libraries compiled with old jsii ([#3245](https://github.com/aws/jsii/issues/3245)) ([133d1cf](https://github.com/aws/jsii/commit/133d1cf371367b1516b175aa9ed904eb701fac0f)), closes [#3233](https://github.com/aws/jsii/issues/3233) [#3233](https://github.com/aws/jsii/issues/3233)
* **jsii:** symbolid for single-valued enums is incorrect ([#3234](https://github.com/aws/jsii/issues/3234)) ([83d3fc8](https://github.com/aws/jsii/commit/83d3fc805874a72b7a76d08f62e8b10121b4777b))
* **pacmak:** don't automatically translate examples without asking ([#3219](https://github.com/aws/jsii/issues/3219)) ([937f8c3](https://github.com/aws/jsii/commit/937f8c3753bec27269ce9213a6bc55fea79647b0))
* **rosetta:** `extract` ignores `--compile` option ([#3193](https://github.com/aws/jsii/issues/3193)) ([639c510](https://github.com/aws/jsii/commit/639c510ba6d07b26bf35d0c8d3c9cdcced6d916a))
* **rosetta:** classes are not correctly identified if package uses an outDir ([#3225](https://github.com/aws/jsii/issues/3225)) ([05631a7](https://github.com/aws/jsii/commit/05631a723b8c08d8d82e9ec50c6adaee1e2d693e))
* **rosetta:** enum resolution breaks for properties ([#3190](https://github.com/aws/jsii/issues/3190)) ([3b49066](https://github.com/aws/jsii/commit/3b49066e4dd960385709dbdce1d9c1fbfb2f20cf))
* **rosetta:** infuse drops first assembly ([#3243](https://github.com/aws/jsii/issues/3243)) ([29a6a84](https://github.com/aws/jsii/commit/29a6a848e2cada2a695d0d1a852c6c53c24d35ac))
* **rosetta:** use `--compile` flag by default ([#3218](https://github.com/aws/jsii/issues/3218)) ([9df7950](https://github.com/aws/jsii/commit/9df7950f263aae045877accb45007e0f9a5b03bd))


## [1.47.0](https://github.com/aws/jsii/compare/v1.45.0...v1.47.0) (2021-12-06)


### Features

* **reflect:** add `allTypes` accessor ([#3194](https://github.com/aws/jsii/issues/3194)) ([41f301a](https://github.com/aws/jsii/commit/41f301a8304bd1ed6ed7ec4e31bd23ffd1a2ed8b))
* **rosetta:**  metadata tag for fixtures in docs ([#3200](https://github.com/aws/jsii/issues/3200)) ([8cefa8b](https://github.com/aws/jsii/commit/8cefa8bc8c9554913960b48226531aff874ee247))
* **rosetta:** generate rosetta tablets next to each assembly ([#3223](https://github.com/aws/jsii/issues/3223)) ([1e7b604](https://github.com/aws/jsii/commit/1e7b604c15a0083f27ceafd8ca32ff9b6cf61759))
* **rosetta:** reuse output file as additional cache and introduce `--infuse` option for `extract` ([#3210](https://github.com/aws/jsii/issues/3210)) ([ccb3c57](https://github.com/aws/jsii/commit/ccb3c57b834225f16ec619f55a7976e59b7a53c3))


### Bug Fixes

* **jsii:** constants can't mix letters and digits ([#3209](https://github.com/aws/jsii/issues/3209)) ([a444e29](https://github.com/aws/jsii/commit/a444e2993b73dc002586e2c4a3446121c279eb65)), closes [#3208](https://github.com/aws/jsii/issues/3208)
* **jsii:** deprecation message is not displayed for deprecated classes ([#3206](https://github.com/aws/jsii/issues/3206)) ([3841538](https://github.com/aws/jsii/commit/3841538179226b67c756ca8689ac1a3de4bec521))
* **pacmak:** don't automatically translate examples without asking ([#3219](https://github.com/aws/jsii/issues/3219)) ([937f8c3](https://github.com/aws/jsii/commit/937f8c3753bec27269ce9213a6bc55fea79647b0))
* **rosetta:** `extract` ignores `--compile` option ([#3193](https://github.com/aws/jsii/issues/3193)) ([639c510](https://github.com/aws/jsii/commit/639c510ba6d07b26bf35d0c8d3c9cdcced6d916a))
* **rosetta:** enum resolution breaks for properties ([#3190](https://github.com/aws/jsii/issues/3190)) ([3b49066](https://github.com/aws/jsii/commit/3b49066e4dd960385709dbdce1d9c1fbfb2f20cf))
* **rosetta:** use `--compile` flag by default ([#3218](https://github.com/aws/jsii/issues/3218)) ([9df7950](https://github.com/aws/jsii/commit/9df7950f263aae045877accb45007e0f9a5b03bd))

## [1.46.0](https://github.com/aws/jsii/compare/v1.45.0...v1.46.0) (2021-11-21)


### Bug Fixes

* **rosetta:** `extract` ignores `--compile` option ([#3193](https://github.com/aws/jsii/issues/3193)) ([639c510](https://github.com/aws/jsii/commit/639c510ba6d07b26bf35d0c8d3c9cdcced6d916a))
* **rosetta:** enum resolution breaks for properties ([#3190](https://github.com/aws/jsii/issues/3190)) ([3b49066](https://github.com/aws/jsii/commit/3b49066e4dd960385709dbdce1d9c1fbfb2f20cf))

## [1.45.0](https://github.com/aws/jsii/compare/v1.44.1...v1.45.0) (2021-11-18)


### Bug Fixes

* C# NamespaceDoc emitted to wrong location ([#3183](https://github.com/aws/jsii/issues/3183)) ([0f5f349](https://github.com/aws/jsii/commit/0f5f349d2f6d7d916c59e4f13e0c5195cc0f80c9))
* **jsii:** require statement for the warning file is generated when it's not used ([#3184](https://github.com/aws/jsii/issues/3184)) ([3d90ae6](https://github.com/aws/jsii/commit/3d90ae699fdcf6730d9b5559c55e78ec5f9c1260))
* **pacmak:** dotnet code docs loses indentation ([#3180](https://github.com/aws/jsii/issues/3180)) ([ace0b83](https://github.com/aws/jsii/commit/ace0b83a0c951052349b102c3af34e92cae76767))
* **pacmak:** Generate Relative Module Imports in Python ([#3181](https://github.com/aws/jsii/issues/3181)) ([b0afe51](https://github.com/aws/jsii/commit/b0afe51a8cb36a9ebdd39bd19a842285c58ee2c1))
* **rosetta:** diagnostics not showing ([#3182](https://github.com/aws/jsii/issues/3182)) ([92a7d5e](https://github.com/aws/jsii/commit/92a7d5e3b10dc7c881ef70c12730f1f0cdcf9b63))
* **rosetta:** Rosetta is not submodule-aware ([#3176](https://github.com/aws/jsii/issues/3176)) ([5c7d148](https://github.com/aws/jsii/commit/5c7d148104f6cfb54573a73a76efb288dd2f346b))
* **rosetta:** types from submodules not recognized properly ([#3174](https://github.com/aws/jsii/issues/3174)) ([b009d07](https://github.com/aws/jsii/commit/b009d07c2ae34248d1e7beea3c66121b8deef957))

## [1.44.2](https://github.com/aws/jsii/compare/v1.44.1...v1.44.2) (2021-11-18)


### Bug Fixes

* **jsii:** require statement for the warning file is generated when it's not used ([#3184](https://github.com/aws/jsii/issues/3184)) ([8f53f89](https://github.com/aws/jsii/commit/8f53f897ebc03e3b3f9e5837fea988e7af592571))

## [1.44.1](https://github.com/aws/jsii/compare/v1.44.0...v1.44.1) (2021-11-16)

* revert "fix: dependency submodules may not be discovered" ([#3170](https://github.com/aws/jsii/pull/3170)) ([0449dd9](https://github.com/aws/jsii/commit/0449dd92ce3297b065c171efafc28d1f877432cc))

## [1.44.0](https://github.com/aws/jsii/compare/v1.43.0...v1.44.0) (2021-11-15)


### Features

* **rosetta:** expose the 'extract' API ([#3161](https://github.com/aws/jsii/issues/3161)) ([c3b30c0](https://github.com/aws/jsii/commit/c3b30c093515e8bce4922eed1a88536e8c2080e8))


### Bug Fixes

* dependency submodules may not be discovered ([#3151](https://github.com/aws/jsii/issues/3151)) ([5768bb9](https://github.com/aws/jsii/commit/5768bb9951856f4a051c24db7f56d23fd8573815))
* deprecation warnings are generated even when one property is not deprecated ([#3157](https://github.com/aws/jsii/issues/3157)) ([e566f37](https://github.com/aws/jsii/commit/e566f37802438a929d66448c1d67b7a2c2e901a1))
* **jsii:** incorrectly allowed unexported type in constructor params ([#3147](https://github.com/aws/jsii/issues/3147)) ([7cd59fc](https://github.com/aws/jsii/commit/7cd59fc180648b6c4b873364ef301b3228e69885))
* **pacmak:** remove disclaimer on compiling examples ([#3148](https://github.com/aws/jsii/issues/3148)) ([75e4093](https://github.com/aws/jsii/commit/75e4093af9123f50b2ba92c1f70be6e9a2ed46b6))
* **pacmak:** Support more than 255 properties for interfaces in Java ([#3133](https://github.com/aws/jsii/issues/3133)) ([ba4a20d](https://github.com/aws/jsii/commit/ba4a20df41e7298ba6518652a5046deaac490c3b)), closes [#3132](https://github.com/aws/jsii/issues/3132) [#3132](https://github.com/aws/jsii/issues/3132)
* **rosetta:** `didCompile` evaluates to true when compilation not attempted ([#3149](https://github.com/aws/jsii/issues/3149)) ([7ad9e0a](https://github.com/aws/jsii/commit/7ad9e0a9013316e730b89bdf3b9934ec0174c742))
* **rosetta:** cache source file parses ([#3163](https://github.com/aws/jsii/issues/3163)) ([307d3ca](https://github.com/aws/jsii/commit/307d3ca09b6a2d1bae2754b9aaf1be98e77d016f))
* **rosetta:** gets confused by type unions ([#3156](https://github.com/aws/jsii/issues/3156)) ([ca04dad](https://github.com/aws/jsii/commit/ca04dad3f54981d59177309b2d5c7626256ca3a9))
* **rosetta:** snippet throughput incorrect ([#3145](https://github.com/aws/jsii/issues/3145)) ([91418d6](https://github.com/aws/jsii/commit/91418d60d5a0b10a32579a3393139d6f04853cde))

## [1.43.0](https://github.com/aws/jsii/compare/v1.42.0...v1.43.0) (2021-11-08)


### Features

* **pacmak:** fail on untranslated snippets ([#3127](https://github.com/aws/jsii/issues/3127)) ([874e8e2](https://github.com/aws/jsii/commit/874e8e2c6a4cc61ae049c5b23f25ff390504d345)), closes [cdklabs/cdk-ops#1777](https://github.com/cdklabs/cdk-ops/issues/1777)
* **rosetta:** find fixtures based on submodules ([#3131](https://github.com/aws/jsii/issues/3131)) ([236dd88](https://github.com/aws/jsii/commit/236dd88f816f2251e62239feb8dfb51c729b7d30))


### Bug Fixes

* **pacmak:** add 'silly' loglevel for command output ([#3125](https://github.com/aws/jsii/issues/3125)) ([bf769da](https://github.com/aws/jsii/commit/bf769daa4785d1e2c686547bfb50577c3f5006a5))
* **pacmak:** API locations for inherited members are incorrect ([#3130](https://github.com/aws/jsii/issues/3130)) ([8d0a248](https://github.com/aws/jsii/commit/8d0a24826052600c3ab51cac7e31a2666930ef39)), closes [cdklabs/cdk-ops#1777](https://github.com/cdklabs/cdk-ops/issues/1777)
* **pacmak:** development version cannot pack java ([#3121](https://github.com/aws/jsii/issues/3121)) ([0d9cf51](https://github.com/aws/jsii/commit/0d9cf511e58d0329dbff7e749109be76c61fb84e)), closes [#3107](https://github.com/aws/jsii/issues/3107)
* **pacmak:** re-introduce parallelism for Python and Go builds ([#3124](https://github.com/aws/jsii/issues/3124)) ([87ba35d](https://github.com/aws/jsii/commit/87ba35d894baff68b1ce3a1dec8b17f19667e162)), closes [#3045](https://github.com/aws/jsii/issues/3045)
* **rosetta:** `infuse` creates untranslated examples ([#3126](https://github.com/aws/jsii/issues/3126)) ([ab60275](https://github.com/aws/jsii/commit/ab602757634b836728f32eca6620836d1b641ec4))
* **rosetta:** crashes on outdated tablet files in a package ([#3119](https://github.com/aws/jsii/issues/3119)) ([80ff0dc](https://github.com/aws/jsii/commit/80ff0dc22f5d04016812c993f07ed3b4893e518d))
* **rosetta:** remember live-translated snippets without fixtures ([#3129](https://github.com/aws/jsii/issues/3129)) ([0638345](https://github.com/aws/jsii/commit/0638345e7712638f01e809994f4b38b50523622e))
* **rosetta:** stop skipping example values ([#3128](https://github.com/aws/jsii/issues/3128)) ([ee0620a](https://github.com/aws/jsii/commit/ee0620aa9d5fdc595d505be7fa4a7e30e827ad62))

## [1.42.0](https://github.com/aws/jsii/compare/v1.41.0...v1.42.0) (2021-11-02)


### Features

* **rosetta:** reuse translation results from a cache ([#3101](https://github.com/aws/jsii/issues/3101)) ([b08a50e](https://github.com/aws/jsii/commit/b08a50e381351afab093bbf8e78fffd5a4cd58c0))


### Bug Fixes

* **jsii:** deprecation warnings erroneously warn for duplicate enum values ([#3105](https://github.com/aws/jsii/issues/3105)) ([c477422](https://github.com/aws/jsii/commit/c4774225b0f134cdb3705eb95905c0f7937fa8c4)), closes [#3103](https://github.com/aws/jsii/issues/3103)
* **jsii:** generated deprecation-warning code is platform dependent ([#3096](https://github.com/aws/jsii/issues/3096)) ([9aa6f02](https://github.com/aws/jsii/commit/9aa6f022734ebcc57ef06fbf5c437479e49b408c))
* **jsii:** unexpected deprecated warnings when a deprecated interface is extended ([#3112](https://github.com/aws/jsii/issues/3112)) ([bd7e07c](https://github.com/aws/jsii/commit/bd7e07c562a06a0d5a25f58a0d0307a61c23a554)), closes [#3111](https://github.com/aws/jsii/issues/3111)
* **pacmak:** '*/' not escaped in JavaDocs ([#3104](https://github.com/aws/jsii/issues/3104)) ([7ab109a](https://github.com/aws/jsii/commit/7ab109a376911d8034d73abd7f392df0e746ba37))
* **rosetta:** arrays aren't handled properly ([#3098](https://github.com/aws/jsii/issues/3098)) ([de4648b](https://github.com/aws/jsii/commit/de4648b6ba25154afcac07e99c964a0457b3a9a0))

## [1.41.0](https://github.com/aws/jsii/compare/v1.40.0...v1.41.0) (2021-10-27)


### Features

* **jsii:** experimental --strip-deprecated with file ([#3085](https://github.com/aws/jsii/issues/3085)) ([e5ba807](https://github.com/aws/jsii/commit/e5ba807a2da6bdb88ecd66d35770269a8292d805))
* **rosetta:** "rosetta infuse" feature ([#3067](https://github.com/aws/jsii/issues/3067)) ([0f2f2d0](https://github.com/aws/jsii/commit/0f2f2d01e879c229d021099fdf2144837bd9e632))
* **rosetta:** improve translation throughput ([#3083](https://github.com/aws/jsii/issues/3083)) ([919d895](https://github.com/aws/jsii/commit/919d895956fb73fcbc684a7485c3ff8a8ecd678b))


### Bug Fixes

* deprecation-warnings includes TS-only import ([#3094](https://github.com/aws/jsii/issues/3094)) ([edfdc48](https://github.com/aws/jsii/commit/edfdc48430886c53fe5331c26d117861d3c91df2))

## [1.40.0](https://github.com/aws/jsii/compare/v1.39.0...v1.40.0) (2021-10-19)


### Features

* **jsii:** added warnings for usage of deprecated elements  ([#3051](https://github.com/aws/jsii/issues/3051)) ([8c0dd3b](https://github.com/aws/jsii/commit/8c0dd3b88f6ecb47e858ad5fc3c14f074c2c4a45))
* **jsii:** allow customizing tsconfig.json file name ([#3076](https://github.com/aws/jsii/issues/3076)) ([c611f26](https://github.com/aws/jsii/commit/c611f262c0ecba286e0fa84e03196614e1e3c722))


### Bug Fixes

* **rosetta:** allow only property assignments in object literals ([#3065](https://github.com/aws/jsii/issues/3065)) ([c783ab7](https://github.com/aws/jsii/commit/c783ab7037773dfcfa586ccd8d90c8450a5602bc)), closes [#3061](https://github.com/aws/jsii/issues/3061)
* **rosetta:** breaks when given a lot of snippets ([#3075](https://github.com/aws/jsii/issues/3075)) ([eca552e](https://github.com/aws/jsii/commit/eca552ebbfb39222f62033a2c7503c193f3f9acf))
* **rosetta:** class declaration uses wrong constructor name in C# ([#3064](https://github.com/aws/jsii/issues/3064)) ([13f75a1](https://github.com/aws/jsii/commit/13f75a15c6b5b3c5aa8ac56122a593393fed8c3e)), closes [#3056](https://github.com/aws/jsii/issues/3056)
* **rosetta:** disallow nullish coalescing operator in examples ([#3060](https://github.com/aws/jsii/issues/3060)) ([a35bbfa](https://github.com/aws/jsii/commit/a35bbfa7a104213b670ffafeac064dd629ad64a4)), closes [#3053](https://github.com/aws/jsii/issues/3053)
* **rosetta:** fix usage of Builders in Java ([#3058](https://github.com/aws/jsii/issues/3058)) ([a0ce42d](https://github.com/aws/jsii/commit/a0ce42db08238e30739fe9cdb28e4ca0e9b52192)), closes [#2984](https://github.com/aws/jsii/issues/2984)
* **rosetta:** newlines after return statements missing ([#3063](https://github.com/aws/jsii/issues/3063)) ([26c95f5](https://github.com/aws/jsii/commit/26c95f5cbcf23fe026faf3190488be2534313dd3)), closes [#3054](https://github.com/aws/jsii/issues/3054)

## [1.39.0](https://github.com/aws/jsii/compare/v1.38.0...v1.39.0) (2021-10-12)


### Features

* **jsii:** added a symbol identifier to every type in the assembly ([#3030](https://github.com/aws/jsii/issues/3030)) ([2120d34](https://github.com/aws/jsii/commit/2120d34ef74597a6c7995e7798947a6fc931df04))
* **jsii:** case consistency between filesystems ([#3015](https://github.com/aws/jsii/issues/3015)) ([cc364f0](https://github.com/aws/jsii/commit/cc364f0e46ee0e2c6f230b69f14b825b591f8151)), closes [#3013](https://github.com/aws/jsii/issues/3013) [#3013](https://github.com/aws/jsii/issues/3013)


### Bug Fixes

* **java:** log messages may not flush by app exit ([#3028](https://github.com/aws/jsii/issues/3028)) ([41631e7](https://github.com/aws/jsii/commit/41631e75e26851991e6eb6c607536cd4943e1975)), closes [#3009](https://github.com/aws/jsii/issues/3009)
* **pacmak:** build failure due to non-sequential package builds between consumer and dependency ([#3045](https://github.com/aws/jsii/issues/3045)) ([1589af8](https://github.com/aws/jsii/commit/1589af8484df894258aabd16e13bfe8e5f56e630))
* **python:** unknown type when submodule is not loaded ([#3049](https://github.com/aws/jsii/issues/3049)) ([da55a1e](https://github.com/aws/jsii/commit/da55a1e9add0f8c903ef6f4aa5085f2a3d5a360b)), closes [aws/aws-cdk#16625](https://github.com/aws/aws-cdk/issues/16625)
* **rosetta:** constants are incorrectly turned into getters ([#3050](https://github.com/aws/jsii/issues/3050)) ([84e4ca3](https://github.com/aws/jsii/commit/84e4ca350f9a0049475f5fb95527bf24b8bd2fbe)), closes [#2984](https://github.com/aws/jsii/issues/2984)
* **rosetta:** correctly detect arguments typed as `any` ([#3043](https://github.com/aws/jsii/issues/3043)) ([3d2ba15](https://github.com/aws/jsii/commit/3d2ba15ed235439b490031efa0eb08e765b3ea21)), closes [#3029](https://github.com/aws/jsii/issues/3029)
* **rosetta:** fix translation of `!` and `===` operators ([#3052](https://github.com/aws/jsii/issues/3052)) ([72b9b98](https://github.com/aws/jsii/commit/72b9b98e57f600316bbf29ffb7fecb98b1fa48d7)), closes [#2993](https://github.com/aws/jsii/issues/2993)
* **rosetta:** literal map type is rendered as __object in C sharp ([#3047](https://github.com/aws/jsii/issues/3047)) ([e2843be](https://github.com/aws/jsii/commit/e2843be12e61665bdaa85dcba399c24738c6f1ad)), closes [#3044](https://github.com/aws/jsii/issues/3044) [#3026](https://github.com/aws/jsii/issues/3026) [#3027](https://github.com/aws/jsii/issues/3027)
* **rosetta:** structs starting with `I` are incorrectly interpreted as non-structs ([#3040](https://github.com/aws/jsii/issues/3040)) ([d564350](https://github.com/aws/jsii/commit/d56435048bcf8c65cbfd782bf05bb5cdc4dbe70e))
* **rosetta:** support `declare` statements ([#3044](https://github.com/aws/jsii/issues/3044)) ([4ccacd1](https://github.com/aws/jsii/commit/4ccacd14ded542b74232751f7dabc5d05b020a55))
* **rosetta:** turn `asList` into `List.of` ([#3048](https://github.com/aws/jsii/issues/3048)) ([ee75bf1](https://github.com/aws/jsii/commit/ee75bf1393c17680ff9e80403f2c33a1b568087a))

## [1.38.0](https://github.com/aws/jsii/compare/v1.37.0...v1.38.0) (2021-10-07)


### Bug Fixes

* **jsii-pacmak:** modules not packed in topological order ([3f6db2c](https://github.com/aws/jsii/commit/3f6db2cf2292f53a307e0c83625d8e1b1605d813))

## [1.37.0](https://github.com/aws/jsii/compare/v1.36.0...v1.37.0) (2021-10-06)


### Features

* **pacmak:** opt out of jsii assembly validation ([#3032](https://github.com/aws/jsii/issues/3032)) ([a3265d9](https://github.com/aws/jsii/commit/a3265d96e7cc69eae2a5b16f85fc4a77fe0fd92d))
* **reflect:** memoize expensive properties ([#3031](https://github.com/aws/jsii/issues/3031)) ([e169c38](https://github.com/aws/jsii/commit/e169c38934e1e47d326dfccccbd9bb873fc1eb16))

## [1.36.0](https://github.com/aws/jsii/compare/v1.35.0...v1.36.0) (2021-10-04)

## [1.35.0](https://github.com/aws/jsii/compare/v1.34.0...v1.35.0) (2021-09-28)


### ⚠ BREAKING CHANGES

* the minimum supported version of `node` changed from
`10.3.0` to `12.7.0`. We recommend using `16.x` if possible.

### Features

* **rosetta:** propagate max heap size to worker threads ([#3002](https://github.com/aws/jsii/issues/3002)) ([9c7f63e](https://github.com/aws/jsii/commit/9c7f63eea27db55db83f1ad53552394edba4a931))


### Bug Fixes

* **jsii:** improve checks around peerDependencies ([#2997](https://github.com/aws/jsii/issues/2997)) ([d1ff3e6](https://github.com/aws/jsii/commit/d1ff3e678c9011df5e51816b37bec77767b6e8e2)), closes [#2994](https://github.com/aws/jsii/issues/2994)
* typo in documentation ([#2999](https://github.com/aws/jsii/issues/2999)) ([f3e2271](https://github.com/aws/jsii/commit/f3e2271855d528f3b43478e1f3b6d3e482d44900))


* upgrade baseline node requirement to >=12.7.0 ([#2946](https://github.com/aws/jsii/issues/2946)) ([f2c6842](https://github.com/aws/jsii/commit/f2c68426f1066de86f74fe4900011a10eef32c14))

## [1.34.0](https://github.com/aws/jsii/compare/v1.33.0...v1.34.0) (2021-08-25)


### ⚠ BREAKING CHANGES

* **superchain:** the `jsii/superchain` image tags `:latest`, `:nightly`,
`:node10` and `:node14` are no longer maintained. Users should migrate to
the new debian-based tags starting with `:1-buster-slim`.

### Features

* [@struct](https://github.com/struct) type system hint ([#2965](https://github.com/aws/jsii/issues/2965)) ([a4ed9a8](https://github.com/aws/jsii/commit/a4ed9a851964038a884d1ebb09e2a347f0389c38))
* **superchain:** arm64 support ([#2949](https://github.com/aws/jsii/issues/2949)) ([ceb66a6](https://github.com/aws/jsii/commit/ceb66a6d60eb3c17867f5b823efec8236ddd5505)), closes [#2930](https://github.com/aws/jsii/issues/2930)


### Bug Fixes

* **python:** unable to implement additional interfaces ([#2964](https://github.com/aws/jsii/issues/2964)) ([4ced4d5](https://github.com/aws/jsii/commit/4ced4d538be80b181a9727ab4d74841f08af0afa)), closes [#2963](https://github.com/aws/jsii/issues/2963)

## [1.33.0](https://github.com/aws/jsii/compare/v1.32.0...v1.33.0) (2021-08-16)


### Features

* node runtime version check ([#2948](https://github.com/aws/jsii/issues/2948)) ([f0a9ec6](https://github.com/aws/jsii/commit/f0a9ec6d9275be5126bcb2a455d43df2107a9262))


### Bug Fixes

* **java:** Disable covariants for java builder params ([#2853](https://github.com/aws/jsii/issues/2853)) ([e729f5d](https://github.com/aws/jsii/commit/e729f5d53311224b9b742d024dc4cdf768e24e48)), closes [#2839](https://github.com/aws/jsii/issues/2839)
* **java:** implemented interface is not registered ([#2952](https://github.com/aws/jsii/issues/2952)) ([99da7a6](https://github.com/aws/jsii/commit/99da7a690a75bd6347fa5da15318c0f262b606a8)), closes [#2951](https://github.com/aws/jsii/issues/2951)

## [1.32.0](https://github.com/aws/jsii/compare/v1.30.0...v1.32.0) (2021-07-22)


### Features

* **jsii-rosetta transliterate:** transliterate a jsii assembly ([#2869](https://github.com/aws/jsii/issues/2869)) ([d9028c8](https://github.com/aws/jsii/commit/d9028c8cf91297a44cd4b1f128f769716bf0e74e))
* **rosetta:** hoist declare statements to top-level of document ([#2897](https://github.com/aws/jsii/issues/2897)) ([7b2ec05](https://github.com/aws/jsii/commit/7b2ec05b2ec247de83901e8504f7ba711d6027bb))
* **rosetta:** transliterate loose mode ([#2892](https://github.com/aws/jsii/issues/2892)) ([43e6dfd](https://github.com/aws/jsii/commit/43e6dfd0591b0f38a8c636edd3896400c96676e3))


### Bug Fixes

* crash when assembly originator key file is missing ([#2899](https://github.com/aws/jsii/issues/2899)) ([e05ce62](https://github.com/aws/jsii/commit/e05ce625ba4760fa8196a5944cc9089a1aaefcfb))
* **dotnet:** strong-name sign assemblies ([#2894](https://github.com/aws/jsii/issues/2894)) ([7b90f27](https://github.com/aws/jsii/commit/7b90f27c7819209f6485c28eabefb328a0304ab5))
* **pacmak/go:** missing go.sum entry ([#2893](https://github.com/aws/jsii/issues/2893)) ([6e6ad69](https://github.com/aws/jsii/commit/6e6ad693230e18f36990e8feaf3734da7c01dbd5))
* **rosetta:** extract does not respect strict metadata entry ([#2863](https://github.com/aws/jsii/issues/2863)) ([5d2392b](https://github.com/aws/jsii/commit/5d2392b7713cb6dfea6092c4ac3ee45360a5d28a)), closes [#2861](https://github.com/aws/jsii/issues/2861)
* **rosetta:** fails on "Debug Failure" ([#2917](https://github.com/aws/jsii/issues/2917)) ([f6078ef](https://github.com/aws/jsii/commit/f6078ef08a144ea86623f331c60ac15ca5f91219)), closes [cdklabs/jsii-docgen#369](https://github.com/cdklabs/jsii-docgen/issues/369)
* **rosetta:** hangs on 'markdown' command when a file is provided ([#2871](https://github.com/aws/jsii/issues/2871)) ([e538b36](https://github.com/aws/jsii/commit/e538b36c6ccf53ace908ff4c342dc9a4435ce353))

## [1.31.0](https://github.com/aws/jsii/compare/v1.30.0...v1.31.0) (2021-07-09)


### Features

* **jsii-rosetta transliterate:** transliterate a jsii assembly ([#2869](https://github.com/aws/jsii/issues/2869)) ([d9028c8](https://github.com/aws/jsii/commit/d9028c8cf91297a44cd4b1f128f769716bf0e74e))
* **rosetta:** transliterate loose mode ([#2892](https://github.com/aws/jsii/issues/2892)) ([43e6dfd](https://github.com/aws/jsii/commit/43e6dfd0591b0f38a8c636edd3896400c96676e3))


### Bug Fixes

* **pacmak/go:** missing go.sum entry ([#2893](https://github.com/aws/jsii/issues/2893)) ([6e6ad69](https://github.com/aws/jsii/commit/6e6ad693230e18f36990e8feaf3734da7c01dbd5))
* **rosetta:** extract does not respect strict metadata entry ([#2863](https://github.com/aws/jsii/issues/2863)) ([5d2392b](https://github.com/aws/jsii/commit/5d2392b7713cb6dfea6092c4ac3ee45360a5d28a)), closes [#2861](https://github.com/aws/jsii/issues/2861)
* **rosetta:** hangs on 'markdown' command when a file is provided ([#2871](https://github.com/aws/jsii/issues/2871)) ([e538b36](https://github.com/aws/jsii/commit/e538b36c6ccf53ace908ff4c342dc9a4435ce353))

## [1.30.0](https://github.com/aws/jsii/compare/v1.29.0...v1.30.0) (2021-05-27)


### Features

* **rosetta:** JSII_ROSETTA_MAX_WORKER_COUNT limits max workers ([#2816](https://github.com/aws/jsii/issues/2816)) ([c478da4](https://github.com/aws/jsii/commit/c478da482e688f763ecccf6bff52cded3758ad53))


### Bug Fixes

* **docs:** correct the "source version" in Python version mapping ([47a40f1](https://github.com/aws/jsii/commit/47a40f15195c00368c55bb9d08eded063d970dec))
* update lineMap after altering source.text ([#2837](https://github.com/aws/jsii/issues/2837)) ([82f5d5f](https://github.com/aws/jsii/commit/82f5d5f34dee083e617f7194f7c326ff82f2cd90)), closes [#2680](https://github.com/aws/jsii/issues/2680)
* **pacmak:** fails when package path contains space ([#2758](https://github.com/aws/jsii/issues/2758)) ([0fbba6b](https://github.com/aws/jsii/commit/0fbba6bc1af09cbab19acdabaea14e5eb1681ae3)), closes [#2748](https://github.com/aws/jsii/issues/2748)
* **python:** classes do not correctly implement interfaces ([#2809](https://github.com/aws/jsii/issues/2809)) ([0769347](https://github.com/aws/jsii/commit/07693478ff85142cc79691539d72ce5a4169eb9d)), closes [aws/aws-cdk#13474](https://github.com/aws/aws-cdk/issues/13474)
* **python:** module import fails: NameError: name 'List' is not defined ([#2851](https://github.com/aws/jsii/issues/2851)) ([b7b9e5f](https://github.com/aws/jsii/commit/b7b9e5f75d09543e0e48f31bcde0ee770599fe04))

## [1.29.0](https://github.com/aws/jsii/compare/v1.28.0...v1.29.0) (2021-04-21)


### Features

* **superchain:** add github cli ([#2803](https://github.com/aws/jsii/issues/2803)) ([23f3582](https://github.com/aws/jsii/commit/23f3582fafaee2b7a64c92d6d426783b31f5aea4))


### Bug Fixes

* **go:** panic on callback: using *<interface> as <interface> ([#2797](https://github.com/aws/jsii/issues/2797)) ([e5a40d8](https://github.com/aws/jsii/commit/e5a40d8ec59b8dd92cd19274154208bbef099637)), closes [#2793](https://github.com/aws/jsii/issues/2793)

## [1.28.0](https://github.com/aws/jsii/compare/v1.27.1...v1.28.0) (2021-04-13)


### Features

* **jsii-go:** use reflect to resolve overriden methods ([#2780](https://github.com/aws/jsii/issues/2780)) ([295d189](https://github.com/aws/jsii/commit/295d189610938d5e644243af8c4d1f17f1c2a8a0)), closes [#2768](https://github.com/aws/jsii/issues/2768)


### Bug Fixes

* **dotnet:** unable to pass 2d-array of interfaces ([#2763](https://github.com/aws/jsii/issues/2763)) ([347cf69](https://github.com/aws/jsii/commit/347cf69305a82733da2dc10517cb0b911decbce1)), closes [aws/aws-cdk#12587](https://github.com/aws/aws-cdk/issues/12587)
* deprecated symbol stripping does not strip out heritage clause with imported type ([#2783](https://github.com/aws/jsii/issues/2783)) ([e87d879](https://github.com/aws/jsii/commit/e87d879f9b637a769b6b62af5fe7711ca0b8a3c5))

## [1.27.1](https://github.com/aws/jsii/compare/v1.27.0...v1.27.1) (2021-04-12)

### Bug Fixes

* **go:** retracted github.com/aws/jsii-runtime-go@v1.27.0 as it was unusable.

## [1.27.0](https://github.com/aws/jsii/compare/v1.26.0...v1.27.0) (2021-04-02)


### Features

* **go:** variadic type helpers to build slices ([#2755](https://github.com/aws/jsii/issues/2755)) ([16b6546](https://github.com/aws/jsii/commit/16b65468c27bf6569a35042279fadb2d5cc4c715))
* **superchain:** also build a superchain image with Node 14 ([#2741](https://github.com/aws/jsii/issues/2741)) ([6364d51](https://github.com/aws/jsii/commit/6364d514edc1904aab5e0e9037a6025c9b335043))


### Bug Fixes

* **go:** dates are mistreated as strings ([#2730](https://github.com/aws/jsii/issues/2730)) ([2ba2ec4](https://github.com/aws/jsii/commit/2ba2ec47af1b3007844c00bd44aa81ccc7729040)), closes [#2659](https://github.com/aws/jsii/issues/2659)
* **go:** missing setter for R/W interface properties ([#2731](https://github.com/aws/jsii/issues/2731)) ([74d0d99](https://github.com/aws/jsii/commit/74d0d9999d6381ef8bec36a45141380f190e26b9)), closes [#2665](https://github.com/aws/jsii/issues/2665)
* **go:** protected property accessors missing ([#2738](https://github.com/aws/jsii/issues/2738)) ([94c799a](https://github.com/aws/jsii/commit/94c799a93ebedb12f1b7c9ae475eeac98d13a755))
* **go:** unable to set an array of interfaces/enums ([#2754](https://github.com/aws/jsii/issues/2754)) ([0cd514e](https://github.com/aws/jsii/commit/0cd514e6e61d47116e9dc693916325fefb90c45d)), closes [#2686](https://github.com/aws/jsii/issues/2686)
* **python:** accept Sequence[T] for array parameters ([#2606](https://github.com/aws/jsii/issues/2606)) ([b09d578](https://github.com/aws/jsii/commit/b09d578464f1b408607bbb9645c65fbb5db318fa)), closes [aws/aws-cdk#13203](https://github.com/aws/aws-cdk/issues/13203)
* **python:** module import fails with: KeyError: '__all__' ([#2757](https://github.com/aws/jsii/issues/2757)) ([c32a889](https://github.com/aws/jsii/commit/c32a8895bdd7c84bd289ca053d15b97086bb5511)), closes [#2750](https://github.com/aws/jsii/issues/2750)
* **rosetta:** 'extract' does not translate samples in submodule READMEs ([#2744](https://github.com/aws/jsii/issues/2744)) ([0a3f01f](https://github.com/aws/jsii/commit/0a3f01fa73e94aea4c86adb64450f45340360b92))
* **superchain:** use entrypoint to set up nvm ([#2736](https://github.com/aws/jsii/issues/2736)) ([0e247b6](https://github.com/aws/jsii/commit/0e247b6d9f432512559fb4642eebce0b1a854859))

## [1.26.0](https://github.com/aws/jsii/compare/v1.24.0...v1.26.0) (2021-03-22)


### ⚠ BREAKING CHANGES

* **go,python/java:** if multiple members have the same name with different capitalization, only one is allowed to be non-deprecated. This will currently only manifest when producing python bindings, but will be added as a jsii compiler error in the future.

### Features

* **compliance:** Compliance suite ([#2607](https://github.com/aws/jsii/issues/2607)) ([18b2c16](https://github.com/aws/jsii/commit/18b2c167bbc47d7620e6a952e08751af28bf53a6))
* **go:** extension & overrides mechanism ([#2717](https://github.com/aws/jsii/issues/2717)) ([33f3b26](https://github.com/aws/jsii/commit/33f3b26070bffbb0c39ec38be84c5246a983559a))
* **go:** packageName and versionSuffix ([#2687](https://github.com/aws/jsii/issues/2687)) ([9562108](https://github.com/aws/jsii/commit/95621082cb742bb8dc24e28f3bf6cb6013050c03)), closes [#2632](https://github.com/aws/jsii/issues/2632)
* **superchain:** `$NVM_USE_VERSION` selects Node.js version ([#2726](https://github.com/aws/jsii/issues/2726)) ([fb9abf9](https://github.com/aws/jsii/commit/fb9abf954d29fd1f1e67cdc2d917c7dbb3a8f9d9))
* **superchain:** install both Node 10 and Node 14 ([#2718](https://github.com/aws/jsii/issues/2718)) ([3ca97d9](https://github.com/aws/jsii/commit/3ca97d9f7164ac158a253354837970177e1d2f4e))


### Bug Fixes

* **go:** duplicate conversion functions when parent structs have the same base name ([#2697](https://github.com/aws/jsii/issues/2697)) ([52bd510](https://github.com/aws/jsii/commit/52bd510a994597cc166effde0b8c658a2a8cb0df)), closes [#2692](https://github.com/aws/jsii/issues/2692)
* **go:** invalid code when a module only has static methods [test only] ([#2704](https://github.com/aws/jsii/issues/2704)) ([2dbe84d](https://github.com/aws/jsii/commit/2dbe84dfeff8d6f63aab19c1674fb7c9d17ea976)), closes [#2622](https://github.com/aws/jsii/issues/2622) [#2617](https://github.com/aws/jsii/issues/2617)
* **go:** missing imports needed by base members ([#2685](https://github.com/aws/jsii/issues/2685)) ([daca06f](https://github.com/aws/jsii/commit/daca06f7c426d1fba509068ab842bd8dc7ddb62a)), closes [#2647](https://github.com/aws/jsii/issues/2647)
* **go:** missing imports required by collection types ([#2691](https://github.com/aws/jsii/issues/2691)) ([c9a36a6](https://github.com/aws/jsii/commit/c9a36a6c0e18c44aa8e8e7e719cb9df144da5193)), closes [#2689](https://github.com/aws/jsii/issues/2689)
* **go:** nested types are not namespaced ([#2650](https://github.com/aws/jsii/issues/2650)) ([45b527c](https://github.com/aws/jsii/commit/45b527c0b2f35a09b715c1a6c5940ec0578007fb)), closes [#2649](https://github.com/aws/jsii/issues/2649)
* **go:** optional values ([#2705](https://github.com/aws/jsii/issues/2705)) ([7d0cfc5](https://github.com/aws/jsii/commit/7d0cfc5ab341e79d7a7cc53deaf161ebe1c7f7aa)), closes [#2442](https://github.com/aws/jsii/issues/2442) [#2671](https://github.com/aws/jsii/issues/2671)
* **go,python/java:** bad code for members with same name with different casing ([#2699](https://github.com/aws/jsii/issues/2699)) ([25528fb](https://github.com/aws/jsii/commit/25528fb12fae6f54c902e97c8449d61435c2a814)), closes [#2508](https://github.com/aws/jsii/issues/2508)
* **pacmak:** .NET submodules don't have namespace docs ([#2683](https://github.com/aws/jsii/issues/2683)) ([097a4ea](https://github.com/aws/jsii/commit/097a4ea95f5816f944cd0977479ae696091d77c1))
* **pacmak:** Java submodules don't have package infos ([#2682](https://github.com/aws/jsii/issues/2682)) ([e6ca054](https://github.com/aws/jsii/commit/e6ca05465f4f17b705d98d29979ca572dac3f89f))
* **pacmak:** Python submodules don't have docstrings ([#2681](https://github.com/aws/jsii/issues/2681)) ([a950282](https://github.com/aws/jsii/commit/a9502826fdc54f43212c641078f21a4d4bcf127f))
* **pacmak:** xmldom error when generating packages ([#2713](https://github.com/aws/jsii/issues/2713)) ([6b2bbe8](https://github.com/aws/jsii/commit/6b2bbe8198b66c07d868d64981bb5a4eb6966588))
* TypeError when trying to use bin-scripts in Python ([#2720](https://github.com/aws/jsii/issues/2720)) ([acdf1a9](https://github.com/aws/jsii/commit/acdf1a9fe7b42200d1f1295486359492b0c00412))
* **python:** duplicated kwargs when field is multi-inherited ([#2654](https://github.com/aws/jsii/issues/2654)) ([3cd9d19](https://github.com/aws/jsii/commit/3cd9d1934d3d08bf57df1eb952347bf905c2a35c)), closes [#2653](https://github.com/aws/jsii/issues/2653)
* **rosetta:** 'extract' does not translate samples in submodule READMEs ([#2712](https://github.com/aws/jsii/issues/2712)) ([ccac1bd](https://github.com/aws/jsii/commit/ccac1bd4dc6abdd271002515a0745349404716a7))

## [1.25.0](https://github.com/aws/jsii/compare/v1.24.0...v1.25.0) (2021-03-16)


### Features

* **compliance:** Compliance suite ([#2607](https://github.com/aws/jsii/issues/2607)) ([18b2c16](https://github.com/aws/jsii/commit/18b2c167bbc47d7620e6a952e08751af28bf53a6))
* **go:** packageName and versionSuffix ([#2687](https://github.com/aws/jsii/issues/2687)) ([9562108](https://github.com/aws/jsii/commit/95621082cb742bb8dc24e28f3bf6cb6013050c03)), closes [#2632](https://github.com/aws/jsii/issues/2632)


### Bug Fixes

* **go:** duplicate conversion functions when parent structs have the same base name ([#2697](https://github.com/aws/jsii/issues/2697)) ([52bd510](https://github.com/aws/jsii/commit/52bd510a994597cc166effde0b8c658a2a8cb0df)), closes [#2692](https://github.com/aws/jsii/issues/2692)
* **go:** invalid code when a module only has static methods [test only] ([#2704](https://github.com/aws/jsii/issues/2704)) ([2dbe84d](https://github.com/aws/jsii/commit/2dbe84dfeff8d6f63aab19c1674fb7c9d17ea976)), closes [#2622](https://github.com/aws/jsii/issues/2622) [#2617](https://github.com/aws/jsii/issues/2617)
* **go:** missing imports needed by base members ([#2685](https://github.com/aws/jsii/issues/2685)) ([daca06f](https://github.com/aws/jsii/commit/daca06f7c426d1fba509068ab842bd8dc7ddb62a)), closes [#2647](https://github.com/aws/jsii/issues/2647)
* **go:** missing imports required by collection types ([#2691](https://github.com/aws/jsii/issues/2691)) ([c9a36a6](https://github.com/aws/jsii/commit/c9a36a6c0e18c44aa8e8e7e719cb9df144da5193)), closes [#2689](https://github.com/aws/jsii/issues/2689)
* **go:** nested types are not namespaced ([#2650](https://github.com/aws/jsii/issues/2650)) ([45b527c](https://github.com/aws/jsii/commit/45b527c0b2f35a09b715c1a6c5940ec0578007fb)), closes [#2649](https://github.com/aws/jsii/issues/2649)

## [1.24.0](https://github.com/aws/jsii/compare/v1.23.0...v1.24.0) (2021-03-03)


### Features

* **go:** support direct implementation of jsii interfaces ([#2614](https://github.com/aws/jsii/issues/2614)) ([9da3282](https://github.com/aws/jsii/commit/9da32821676a9ed7ea6cd4744c06df4fb3551bc7)), closes [#2048](https://github.com/aws/jsii/issues/2048)


### Bug Fixes

* **go:** enums inside structs are not properly serialized ([#2636](https://github.com/aws/jsii/issues/2636)) ([19cbd25](https://github.com/aws/jsii/commit/19cbd2532e6210f034e12299c5c1b00807a91b90))
* **go:** invalid generated code for classes a keyword name ([#2641](https://github.com/aws/jsii/issues/2641)) ([8668f13](https://github.com/aws/jsii/commit/8668f13d7b74b3f2fecc0b02d241a1a6f9e2f648)), closes [#2637](https://github.com/aws/jsii/issues/2637)
* **go:** malformed multiline docstrings in constructors ([#2639](https://github.com/aws/jsii/issues/2639)) ([72f25af](https://github.com/aws/jsii/commit/72f25af24c47075d6faa3b624236dd0375e3acdb)), closes [#2638](https://github.com/aws/jsii/issues/2638)

## [1.23.0](https://github.com/aws/jsii/compare/v1.22.0...v1.23.0) (2021-03-01)

### Features

* **go:** emit indirect dependencies in go.mod ([#2596](https://github.com/aws/jsii/issues/2596)) ([0f95a0b](https://github.com/aws/jsii/commit/0f95a0b8cd4d569d410bfad21254949c4fd90870))
* **go:** preserve casing of enum member names ([#2598](https://github.com/aws/jsii/issues/2598)) ([efdc165](https://github.com/aws/jsii/commit/efdc1659e1cbf1fae08a8a32cb2b98821f3c41f1)), closes [aws/aws-cdk-rfcs#292](https://github.com/aws/aws-cdk-rfcs/issues/292)
* **go:** represent jsii structs as go structs (only) ([#2600](https://github.com/aws/jsii/issues/2600)) ([e7cc93e](https://github.com/aws/jsii/commit/e7cc93e902ac4ae7dbd37388d0be1b65ba691a40)), closes [aws/aws-cdk-rfcs#292](https://github.com/aws/aws-cdk-rfcs/issues/292)
* **go:** require go 1.16, use native embed ([#2603](https://github.com/aws/jsii/issues/2603)) ([67cd3ce](https://github.com/aws/jsii/commit/67cd3cec5bef9e91e828d7a47cd63b0c814e446e))
* **pacmak:** emit LICENSE file with SPDX license text, NOTICE file ([#2604](https://github.com/aws/jsii/issues/2604)) ([6747f12](https://github.com/aws/jsii/commit/6747f12a061d06672bb1d3f18e2639205e104577))


### Bug Fixes

* **go:** map values incorrectly handled though de/serialization ([#2587](https://github.com/aws/jsii/issues/2587)) ([0359928](https://github.com/aws/jsii/commit/035992887b3346e6cb1e66d0bb66c3029de2917f))
* **go-runtime:** enums are not encoded/decoded correctly ([#2585](https://github.com/aws/jsii/issues/2585)) ([4731aeb](https://github.com/aws/jsii/commit/4731aeb6ad85c04160b30232e85e3f8a43c712a6)), closes [#2534](https://github.com/aws/jsii/issues/2534)
* **java:** invalid code when multi-inheriting optional properties ([#2591](https://github.com/aws/jsii/issues/2591)) ([2399608](https://github.com/aws/jsii/commit/23996087adef48f73ecb61d6b499263435af2283)), closes [#22556](https://github.com/aws/jsii/issues/22556)
* **java:** JsiiRuntime.ErrorStreamSink does not respond to being interrupted ([#2540](https://github.com/aws/jsii/issues/2540)) ([6e74bf9](https://github.com/aws/jsii/commit/6e74bf9d3aa00b936e76e42f4591890b2d735d86)), closes [#2533](https://github.com/aws/jsii/issues/2533)
* **jsii:** excessive "exclude" in "tsconfig.json" ([#1736](https://github.com/aws/jsii/issues/1736)) ([ecffb9f](https://github.com/aws/jsii/commit/ecffb9f9dd7f02643fb2af30d9c0052f7465691d))
* **pacmak:** go 1.16 requires running "go mod download" explicitly ([#2616](https://github.com/aws/jsii/issues/2616)) ([1f8f022](https://github.com/aws/jsii/commit/1f8f0222b0f1ece444a242aff87cf4ffe897a9d0)), closes [#2615](https://github.com/aws/jsii/issues/2615)
* **pacmak:** go local replace do not respect `--outdir` in some cases ([#2584](https://github.com/aws/jsii/issues/2584)) ([b9b9b4c](https://github.com/aws/jsii/commit/b9b9b4ca9dbb535b714df4ba506a31a5fc56c773))
* **pacmak:** multiple go (and python) issues  ([#2622](https://github.com/aws/jsii/issues/2622)) ([c2bd156](https://github.com/aws/jsii/commit/c2bd156b30fd1db469fd609af09dbed314a5d280)), closes [#2618](https://github.com/aws/jsii/issues/2618) [#2619](https://github.com/aws/jsii/issues/2619) [#2620](https://github.com/aws/jsii/issues/2620) [#2621](https://github.com/aws/jsii/issues/2621)

## [1.22.0](https://github.com/aws/jsii/compare/v1.21.0...v1.22.0) (2021-02-18)

### Bug Fixes

* **go:** map values incorrectly handled though de/serialization ([#2587](https://github.com/aws/jsii/issues/2587)) ([0359928](https://github.com/aws/jsii/commit/035992887b3346e6cb1e66d0bb66c3029de2917f))
* **go-runtime:** enums are not encoded/decoded correctly ([#2585](https://github.com/aws/jsii/issues/2585)) ([4731aeb](https://github.com/aws/jsii/commit/4731aeb6ad85c04160b30232e85e3f8a43c712a6)), closes [#2534](https://github.com/aws/jsii/issues/2534)
* **jsii:** excessive "exclude" in "tsconfig.json" ([#1736](https://github.com/aws/jsii/issues/1736)) ([ecffb9f](https://github.com/aws/jsii/commit/ecffb9f9dd7f02643fb2af30d9c0052f7465691d))
* **pacmak:** go local replace do not respect `--outdir` in some cases ([#2584](https://github.com/aws/jsii/issues/2584)) ([b9b9b4c](https://github.com/aws/jsii/commit/b9b9b4ca9dbb535b714df4ba506a31a5fc56c773))

## [1.21.0](https://github.com/aws/jsii/compare/v1.20.1...v1.21.0) (2021-02-15)


### Bug Fixes

* **pacmak:** examples with multi-line strings produce invalid python docstrings ([#2571](https://github.com/aws/jsii/issues/2571)) ([d5c2e3a](https://github.com/aws/jsii/commit/d5c2e3aeb89524462fd4544df5aacea379cf9dd7)), closes [#2569](https://github.com/aws/jsii/issues/2569)
* **pacmak:** TypeError when operating with Worker threads ([#2550](https://github.com/aws/jsii/issues/2550)) ([5822e48](https://github.com/aws/jsii/commit/5822e48f53e49e8116a57ed4b2da7e30b483f289)), closes [isaacs/node-graceful-fs#204](https://github.com/isaacs/node-graceful-fs/issues/204) [isaacs/node-graceful-fs#205](https://github.com/isaacs/node-graceful-fs/issues/205)
* **rosetta,pacmak:** TypeError in node 10 with --experimental-worker ([#2554](https://github.com/aws/jsii/issues/2554)) ([4728e86](https://github.com/aws/jsii/commit/4728e866956c238a0fabe1a9d8c4b270ed05a990)), closes [isaacs/node-graceful-fs#204](https://github.com/isaacs/node-graceful-fs/issues/204)

## [1.20.1](https://github.com/aws/jsii/compare/v1.20.0...v1.20.1) (2021-02-05)


### Bug Fixes

* **python:** ValueError: write to closed file ([#2541](https://github.com/aws/jsii/issues/2541)) ([64c6853](https://github.com/aws/jsii/commit/64c68535a3ef16b85f2eedc7997fb4404846e003))

## [1.20.0](https://github.com/aws/jsii/compare/v1.19.0...v1.20.0) (2021-02-03)


### Features

* **runtime:** use a dedicated file descriptor for sync IPC ([#2411](https://github.com/aws/jsii/issues/2411)) ([0413081](https://github.com/aws/jsii/commit/0413081583df52fd42ab378a88a0ddb7c9b9200d))


### Bug Fixes

* **go:** invalid major version suffix for submodules and jsii init ([#2519](https://github.com/aws/jsii/issues/2519)) ([12e9b27](https://github.com/aws/jsii/commit/12e9b27373bdfce70456fddb9f38df0be6dbd511)), closes [#2507](https://github.com/aws/jsii/issues/2507) [#2507](https://github.com/aws/jsii/issues/2507)

## [1.19.0](https://github.com/aws/jsii/compare/v1.18.0...v1.19.0) (2021-02-02)


### Features

* add runtime type info (fqn and version) to compiled sources ([481e7a4](https://github.com/aws/jsii/commit/481e7a47a8f4dd7348ba4aba683902b869d11c84)), closes [/github.com/aws/aws-cdk-rfcs/blob/master/text/0253-cdk-metadata-v2.md#appendix-1](https://github.com/aws//github.com/aws/aws-cdk-rfcs/blob/master/text/0253-cdk-metadata-v2.md/issues/appendix-1)
* **go:** version file in the generated module directory ([#2492](https://github.com/aws/jsii/issues/2492)) ([da3ea25](https://github.com/aws/jsii/commit/da3ea25330a8a73f3102db1dfc8f94ea1d6eca3c))


### Bug Fixes

* **go:** major version suffix is missing in module names for >=v2 ([#2507](https://github.com/aws/jsii/issues/2507)) ([32c0add](https://github.com/aws/jsii/commit/32c0add5edd0ed57d535241b483168e2b7e731ce)), closes [#2509](https://github.com/aws/jsii/issues/2509)

## [1.18.0](https://github.com/aws/jsii/compare/v1.17.1...v1.18.0) (2021-01-28)


### Features

* add support for bin-scripts (python only) ([#1941](https://github.com/aws/jsii/issues/1941)) ([61ef5ed](https://github.com/aws/jsii/commit/61ef5edc9696c41a45984c907dc30771c675e20b))
* **dotnet,java:** kernel process inherits host's STDERR ([#2248](https://github.com/aws/jsii/issues/2248)) ([70ce153](https://github.com/aws/jsii/commit/70ce15312d7553bc44c2e4f8981b596563b5ecd7))
* submodules expose readmes and targets via `jsii-reflect` ([#2482](https://github.com/aws/jsii/issues/2482)) ([33f41eb](https://github.com/aws/jsii/commit/33f41eb7f1e5acddcf505070ecb3f8dee6f9f4b1))
* **go:** run "go build" on generated code ([#2485](https://github.com/aws/jsii/issues/2485)) ([d3602ec](https://github.com/aws/jsii/commit/d3602ece2fb7fa329557cef6043106669fd22608)), closes [#2463](https://github.com/aws/jsii/issues/2463)
* **go:** runtime release tagging ([#2417](https://github.com/aws/jsii/issues/2417)) ([9ffd204](https://github.com/aws/jsii/commit/9ffd20481bd804ff288ab4bf91b9f394d52d3d90))
* **jsii:** experimental --strip-deprecated feature ([#2437](https://github.com/aws/jsii/issues/2437)) ([f958f5a](https://github.com/aws/jsii/commit/f958f5a9603da990146ed6fe3674094fee227079))


### Bug Fixes

* **dotnet:** Use nested classes for proxies to avoid name collision ([#2368](https://github.com/aws/jsii/issues/2368)) ([90b17e2](https://github.com/aws/jsii/commit/90b17e2a7da159879a7e618ce6f2edca336f316e)), closes [#2367](https://github.com/aws/jsii/issues/2367)
* **go:** generated code runtime dependency version ([#2399](https://github.com/aws/jsii/issues/2399)) ([f1a06e5](https://github.com/aws/jsii/commit/f1a06e5f71e599fcf6efccaa0906cee8cd93d3e1))
* **go:** invalid output for multi-line [@return](https://github.com/return) and [@deprecated](https://github.com/deprecated) comments ([#2462](https://github.com/aws/jsii/issues/2462)) ([590681a](https://github.com/aws/jsii/commit/590681a4adc672345febdc274e1aa45658a8d7a5)), closes [#2457](https://github.com/aws/jsii/issues/2457)
* **jsii:** errors when invoking with a project root argument ([#2351](https://github.com/aws/jsii/issues/2351)) ([9c66340](https://github.com/aws/jsii/commit/9c66340d2471db36175000c6673d1d498f4ec2c5))
* **jsii:** submodules of dependencies show up in assembly ([#2481](https://github.com/aws/jsii/issues/2481)) ([2630a80](https://github.com/aws/jsii/commit/2630a8046dc5f9c799546248e783d24ed58a6783))
* **jsii:** unknown error in Assembler._validateHeritageClauses ([#2350](https://github.com/aws/jsii/issues/2350)) ([3120bf4](https://github.com/aws/jsii/commit/3120bf448cc160cb0249aa57a0a2bd62e35c1659)), closes [#2349](https://github.com/aws/jsii/issues/2349)
* bad working directory in go runtime push ([#2356](https://github.com/aws/jsii/issues/2356)) ([53457e2](https://github.com/aws/jsii/commit/53457e2f6063e5f0202eac7040ad03e1ed64805e))
* **pacmak:** illegal static overrides in java & c# ([#2373](https://github.com/aws/jsii/issues/2373)) ([4672e4b](https://github.com/aws/jsii/commit/4672e4b5f37a83ebfe6e2296c81839af6b296d8f)), closes [#2358](https://github.com/aws/jsii/issues/2358)
* **python:** mypy validation errors ([#2472](https://github.com/aws/jsii/issues/2472)) ([2b2e9a8](https://github.com/aws/jsii/commit/2b2e9a86e80a8a608b0ff5f0c4114e2a7b43883e)), closes [#2464](https://github.com/aws/jsii/issues/2464) [#2476](https://github.com/aws/jsii/issues/2476)
* **python:** pin mypy to the exact version ([#2476](https://github.com/aws/jsii/issues/2476)) ([01a46d6](https://github.com/aws/jsii/commit/01a46d64fe30d81913b58c27d81899e1529715a3)), closes [#2464](https://github.com/aws/jsii/issues/2464)
* **rosetta:** correctly emit multi-line string literals ([#2419](https://github.com/aws/jsii/issues/2419)) ([a30a996](https://github.com/aws/jsii/commit/a30a996479f961c93523ce9e378ededa39424948))

## [1.17.1](https://github.com/aws/jsii/compare/v1.17.0...v1.17.1) (2021-01-13)

### Bug Fixes

* **python:** process.terminate() got an unexpected keyword argument 'timeout' ([#2421](https://github.com/aws/jsii/issues/2421)), closes [#2398](https://github.com/aws/jsii/issues/2398)


## [1.17.0](https://github.com/aws/jsii/compare/v1.16.0...v1.17.0) (2021-01-13)


### Features

* add support for bin-scripts (python only) ([#1941](https://github.com/aws/jsii/issues/1941)) ([61ef5ed](https://github.com/aws/jsii/commit/61ef5edc9696c41a45984c907dc30771c675e20b))
* **dotnet,java:** kernel process inherits host's STDERR ([#2248](https://github.com/aws/jsii/issues/2248)) ([70ce153](https://github.com/aws/jsii/commit/70ce15312d7553bc44c2e4f8981b596563b5ecd7))


### Bug Fixes

* bad working directory in go runtime push ([#2356](https://github.com/aws/jsii/issues/2356)) ([53457e2](https://github.com/aws/jsii/commit/53457e2f6063e5f0202eac7040ad03e1ed64805e))
* **dotnet:** Use nested classes for proxies to avoid name collision ([#2368](https://github.com/aws/jsii/issues/2368)) ([90b17e2](https://github.com/aws/jsii/commit/90b17e2a7da159879a7e618ce6f2edca336f316e)), closes [#2367](https://github.com/aws/jsii/issues/2367)
* **go:** generated code runtime dependency version ([#2399](https://github.com/aws/jsii/issues/2399)) ([f1a06e5](https://github.com/aws/jsii/commit/f1a06e5f71e599fcf6efccaa0906cee8cd93d3e1))
* **jsii:** errors when invoking with a project root argument ([#2351](https://github.com/aws/jsii/issues/2351)) ([9c66340](https://github.com/aws/jsii/commit/9c66340d2471db36175000c6673d1d498f4ec2c5))
* **jsii:** unknown error in Assembler._validateHeritageClauses ([#2350](https://github.com/aws/jsii/issues/2350)) ([3120bf4](https://github.com/aws/jsii/commit/3120bf448cc160cb0249aa57a0a2bd62e35c1659)), closes [#2349](https://github.com/aws/jsii/issues/2349)
* **pacmak:** illegal static overrides in java & c# ([#2373](https://github.com/aws/jsii/issues/2373)) ([4672e4b](https://github.com/aws/jsii/commit/4672e4b5f37a83ebfe6e2296c81839af6b296d8f)), closes [#2358](https://github.com/aws/jsii/issues/2358)

## [1.16.0](https://github.com/aws/jsii/compare/v1.15.0...v1.16.0) (2020-12-07)


### Bug Fixes

* **java:** exception is logged when Java VM is shutting down ([#2305](https://github.com/aws/jsii/issues/2305)) ([8e1e7bd](https://github.com/aws/jsii/commit/8e1e7bd2a038dc0e3eb6f0b3f9c616da4caa464d)), closes [#2303](https://github.com/aws/jsii/issues/2303)
* **runtime:** excessive latency introduced by sleep ([#2298](https://github.com/aws/jsii/issues/2298)) ([1a94b85](https://github.com/aws/jsii/commit/1a94b859dbde4e002b4b3c04dfedf3ba97804962)), closes [#2284](https://github.com/aws/jsii/issues/2284)

## [1.15.0](https://github.com/aws/jsii/compare/v1.14.1...v1.15.0) (2020-11-25)


### Features

* **dotnet,java:** finalize kernel process on VM shutdown ([#2247](https://github.com/aws/jsii/issues/2247)) ([29b2262](https://github.com/aws/jsii/commit/29b226281c71e62049f72a9418011925e17dc615)), closes [#2100](https://github.com/aws/jsii/issues/2100)
* **go:** generate go.mod files ([#2265](https://github.com/aws/jsii/issues/2265)) ([4164eb5](https://github.com/aws/jsii/commit/4164eb53e8b5dbbe54e6a727ad77b92f3a325196)), closes [#2090](https://github.com/aws/jsii/issues/2090)
* **go:** Runtime arg type casting ([8ba6aa9](https://github.com/aws/jsii/commit/8ba6aa90e7e45743da5deac70bb05ccabe58a403))
* **go:** Runtime interface type casting ([bfce93d](https://github.com/aws/jsii/commit/bfce93d9d3552591e96f7dc2a687ee636b451c95))
* **jsii:** configure diagnostics in package.json ([#2233](https://github.com/aws/jsii/issues/2233)) ([2bbef1f](https://github.com/aws/jsii/commit/2bbef1fb13efe27261b85a8bcc445f4c2e7caf3a))
* **rosetta:** hoist imports above fixtures ([#2211](https://github.com/aws/jsii/issues/2211)) ([66e2ac8](https://github.com/aws/jsii/commit/66e2ac874295db7a25b2aa414da7f34047c14741))
* **rosetta:** make assembly validation opt-in ([#2252](https://github.com/aws/jsii/issues/2252)) ([302dbb9](https://github.com/aws/jsii/commit/302dbb9d07d13823f24dd4b27f3cba7421038c53))
* **rosetta:** support "strict" assemblies ([#2253](https://github.com/aws/jsii/issues/2253)) ([6cbde78](https://github.com/aws/jsii/commit/6cbde789fb02e77bac645e8d4091789eb778e829))
* **rosetta:** support computed properties ([#2230](https://github.com/aws/jsii/issues/2230)) ([80b3aae](https://github.com/aws/jsii/commit/80b3aae22c5fae5963d79aeb915317357cc363f6))


### Bug Fixes

* **go:** generate concrete structs for behavioral interfaces ([#2257](https://github.com/aws/jsii/issues/2257)) ([6da0870](https://github.com/aws/jsii/commit/6da0870844ec9d37131e7727e408af34d32e1c32))
* **go:** Method call return reference an implMap ([af5b27b](https://github.com/aws/jsii/commit/af5b27bdd387acd9076a1649a55f2a1f6808b0dc))
* **python:** update `cattrs` dependency specification ([#2212](https://github.com/aws/jsii/issues/2212)) ([4f2836b](https://github.com/aws/jsii/commit/4f2836bed7c72d5e502f352ec4c0df232f9c5d69)), closes [aws/aws-cdk#11219](https://github.com/aws/aws-cdk/issues/11219)
* **runtime:** "Error: EOF: end of file, read" on Windows ([#2238](https://github.com/aws/jsii/issues/2238)) ([1453ed3](https://github.com/aws/jsii/commit/1453ed34736917b54cfc212b2fa5e381714d1654))

## [1.14.1](https://github.com/aws/jsii/compare/v1.14.0...v1.14.1) (2020-11-04)


### Bug Fixes

* **python:** update `cattrs` dependency specification ([#2212](https://github.com/aws/jsii/issues/2212)) ([d7731f9](https://github.com/aws/jsii/commit/d7731f997a95ec2e41d4fcf027695bb5267a7514)), closes [aws/aws-cdk#11219](https://github.com/aws/aws-cdk/issues/11219)

## [1.14.0](https://github.com/aws/jsii/compare/v1.13.0...v1.14.0) (2020-10-29)


### ⚠ BREAKING CHANGES

* The `jsii/superchain` Docker image no longer includes `ruby` and `gcc`. Users who need those should install them as part of their initialization script.

### Features

* **dotnet:** introduce `UnsafeCast<T>()` method ([#2192](https://github.com/aws/jsii/issues/2192)) ([5e22e81](https://github.com/aws/jsii/commit/5e22e8182516c17757f857f8a4d50feca9a79b42)), closes [aws/aws-cdk#3284](https://github.com/aws/aws-cdk/issues/3284) [aws/aws-cdk-rfcs#193](https://github.com/aws/aws-cdk-rfcs/issues/193)
* **go:** dynamically load npm packages as needed ([#2067](https://github.com/aws/jsii/issues/2067)) ([7dbdbeb](https://github.com/aws/jsii/commit/7dbdbebe336bde2d02de598dc21d86d469a6abf0))
* **go:** embed jsii runtime application ([#2066](https://github.com/aws/jsii/issues/2066)) ([85764de](https://github.com/aws/jsii/commit/85764deffd70af92333363bf38478440351654da))
* **go:** Runtime method and static invoke support ([#2145](https://github.com/aws/jsii/issues/2145)) ([ff882c1](https://github.com/aws/jsii/commit/ff882c12defd6b703a32efe77cd3979b5cd2de9c))
* **go:** runtime object creation ([#2117](https://github.com/aws/jsii/issues/2117)) ([977a063](https://github.com/aws/jsii/commit/977a063013601d70cc7a66e0a4cc6dce64789976))
* **pacmak:** prerelease identifier support ([#2146](https://github.com/aws/jsii/issues/2146)) ([1338fc2](https://github.com/aws/jsii/commit/1338fc2492295f683381d00a04fb88517f3c4d55)), closes [#2114](https://github.com/aws/jsii/issues/2114)
* **pacmak/java:** emit default interface implementations ([#2076](https://github.com/aws/jsii/issues/2076)) ([c618de3](https://github.com/aws/jsii/commit/c618de3940085847bf0a0b44acc758b57508a842)), closes [#2014](https://github.com/aws/jsii/issues/2014)


### Bug Fixes

* **dotnet:** abundant nullability warnings in generated code ([#2061](https://github.com/aws/jsii/issues/2061)) ([01a2951](https://github.com/aws/jsii/commit/01a295105b9d60edaf0ee0a3133e4b5942a971f2))
* **go:** fix generation of readonly and static properties ([#2133](https://github.com/aws/jsii/issues/2133)) ([57b7d56](https://github.com/aws/jsii/commit/57b7d566bffb3516863308c4eb33d71a50b065bd)), closes [#2093](https://github.com/aws/jsii/issues/2093)
* **go:** runtime api json invalid tags ([#2115](https://github.com/aws/jsii/issues/2115)) ([a9d96db](https://github.com/aws/jsii/commit/a9d96db055b6b48797eaf0dad41c238807a75015))
* **go:** Submodule File Paths ([#2147](https://github.com/aws/jsii/issues/2147)) ([8863493](https://github.com/aws/jsii/commit/886349335778b89ba57191a9b747940382df9497))
* **jsii:** annotation '[@internal](https://github.com/internal)' causes missing type declarations downstream ([#2172](https://github.com/aws/jsii/issues/2172)) ([e80a4f7](https://github.com/aws/jsii/commit/e80a4f7869d11bcd9de8078e86fe137ac4d54237)), closes [#1947](https://github.com/aws/jsii/issues/1947) [#1830](https://github.com/aws/jsii/issues/1830)
* **jsii:** TypeError: Cannot read property 'getJsDocTags' of undefined ([#2163](https://github.com/aws/jsii/issues/2163)) ([5d87101](https://github.com/aws/jsii/commit/5d87101941ea71555927f5354a8f1da58df2d6d5)), closes [#2098](https://github.com/aws/jsii/issues/2098)
* **jsii-diff:** external structs returned from methods cannot be changed ([#2070](https://github.com/aws/jsii/issues/2070)) ([11e9389](https://github.com/aws/jsii/commit/11e9389c0fa2444502e2c8e232e7ac549dc13f04)), closes [#2064](https://github.com/aws/jsii/issues/2064)
* **pacmak/python:** escape character escapes in python docs ([#2138](https://github.com/aws/jsii/issues/2138)) ([1578899](https://github.com/aws/jsii/commit/1578899b524494b11f39faf9764fa17b854b51d1)), closes [#2137](https://github.com/aws/jsii/issues/2137)
* **python:** leftover jsii-kernel-* directories in TMPDIR ([#2100](https://github.com/aws/jsii/issues/2100)) ([c119994](https://github.com/aws/jsii/commit/c11999499e6f9679da0272d96a1422025bbc0502))
* **rosetta:** duplicated problem markers ([#2130](https://github.com/aws/jsii/issues/2130)) ([21c6fb5](https://github.com/aws/jsii/commit/21c6fb5df90751323a0e71a205a4f71185d1e8f4))


* removes unused software from superchain to reduce image size ([#2092](https://github.com/aws/jsii/issues/2092)) ([fe2c597](https://github.com/aws/jsii/commit/fe2c5972a4c5c867b21cfa5c7d37a428f271296b))

## [1.13.0](https://github.com/aws/jsii/compare/v1.12.0...v1.13.0) (2020-09-29)


### Features

* add go to superchain ([#1994](https://github.com/aws/jsii/issues/1994)) ([30f76c7](https://github.com/aws/jsii/commit/30f76c7e867226837597ce07763fae329c8b677a))
* **go:** runtime library definition ([#1996](https://github.com/aws/jsii/issues/1996)) ([adbf44d](https://github.com/aws/jsii/commit/adbf44dbe634461cac26547ece0a11a80011c019))
* **jsii:** reflect stabilities in doc comment summaries ([#1951](https://github.com/aws/jsii/issues/1951)) ([ce8c0c4](https://github.com/aws/jsii/commit/ce8c0c4d1dd75e8e53d0f22d75cc0bf0b3fe2703))
* **pacmak:** go module resolution & compiler fixes ([#1956](https://github.com/aws/jsii/issues/1956)) ([7e2512f](https://github.com/aws/jsii/commit/7e2512f55cba40e8eededf895a6c6a10ef76e021))
* **pacmak:** retry select external command invocations ([#2013](https://github.com/aws/jsii/issues/2013)) ([66cf186](https://github.com/aws/jsii/commit/66cf1862fd56197bfc61234764841c709352116e))


### Bug Fixes

* **dontet:** iso-8601 date strings get turned into DateTime ([#2058](https://github.com/aws/jsii/issues/2058)) ([52d7382](https://github.com/aws/jsii/commit/52d7382ca0a073326cbe22c2115909a28b00b49f)), closes [aws/aws-cdk#10513](https://github.com/aws/aws-cdk/issues/10513)
* **go:** null returns and pointer getters/setters ([807568d](https://github.com/aws/jsii/commit/807568df3fc73d202031347b54c89cf69d5590f1))
* **go:** Only embed behavioral interfaces ([#1966](https://github.com/aws/jsii/issues/1966)) ([e1f4e18](https://github.com/aws/jsii/commit/e1f4e184abec9d03be1ed5b8a39f3cb31453a7f8))
* **pacmak:** go bad local package imports ([#1973](https://github.com/aws/jsii/issues/1973)) ([f9311b2](https://github.com/aws/jsii/commit/f9311b2a280b194011e09ca6597aad0191e88ac5))

## [1.12.0](https://github.com/aws/jsii/compare/v1.11.0...v1.12.0) (2020-08-27)


### Features

* **golang:** introduce Golang code generation ([#1551](https://github.com/aws/jsii/issues/1551)) ([2833db4](https://github.com/aws/jsii/commit/2833db48e7f32191aebd81d5eebf97d111406589)), closes [#83](https://github.com/aws/jsii/issues/83)
* **java:** use covariant types for collection elements ([#1884](https://github.com/aws/jsii/issues/1884)) ([be2c7e2](https://github.com/aws/jsii/commit/be2c7e2aceecc1a6cb9f8a97cee90ea35b80f5f5)), closes [#1517](https://github.com/aws/jsii/issues/1517)
* **jsii:** standardized error messages ([#1931](https://github.com/aws/jsii/issues/1931)) ([b146286](https://github.com/aws/jsii/commit/b146286fe66f78a1851228159b48d9bd2c2b6f3b))


### Bug Fixes

* **java:** module "<module name>" not found error ([#1906](https://github.com/aws/jsii/issues/1906)) ([d0b9ffd](https://github.com/aws/jsii/commit/d0b9ffd8797ff5547a89d43134c40b4744d5e852)), closes [#1904](https://github.com/aws/jsii/issues/1904)
* **jsii:** class members named after the class result in illegal C# ([#1903](https://github.com/aws/jsii/issues/1903)) ([bc71154](https://github.com/aws/jsii/commit/bc711541c17019eba3af16ec7efadc6a25287514)), closes [#1931](https://github.com/aws/jsii/issues/1931) [#1880](https://github.com/aws/jsii/issues/1880)
* **kernel:** calling super.property unexpectedly returns `undefined` ([#1932](https://github.com/aws/jsii/issues/1932)) ([3b48778](https://github.com/aws/jsii/commit/3b48778a6554bf009eb461651bc32b8341d3416f))
* **python:** generate type-checking code ([#1881](https://github.com/aws/jsii/issues/1881)) ([e6d1bc1](https://github.com/aws/jsii/commit/e6d1bc161ed426261f39c5ccadfa80a4020e4ffc)), closes [awslabs/cdk8s#194](https://github.com/awslabs/cdk8s/issues/194)

## [1.11.0](https://github.com/aws/jsii/compare/v1.10.0...v1.11.0) (2020-08-18)


### Features

* **jsii:** detect changing visibility when overriding ([#1876](https://github.com/aws/jsii/issues/1876)) ([cfc99c2](https://github.com/aws/jsii/commit/cfc99c2c7f2577de5b7832ad30ba28458813c868)), closes [aws/aws-cdk#9616](https://github.com/aws/aws-cdk/issues/9616)
* **jsii-pacmak:** option to disallow parallel generation of languages ([#1890](https://github.com/aws/jsii/issues/1890)) ([9d5a439](https://github.com/aws/jsii/commit/9d5a439aaddef7ffd6e6add6e215a7cc3268e58a))
* **python:** allow setting additional trove classifiers ([#1902](https://github.com/aws/jsii/issues/1902)) ([26be2b6](https://github.com/aws/jsii/commit/26be2b6ec7ceb15a3abb842eb2e34190dd99bbb1)), closes [aws/cdk-ops#393](https://github.com/aws/cdk-ops/issues/393)


### Bug Fixes

* **dotnet:** "Could not infer JSII type for .NET type 'AnonymousObject'" ([#1718](https://github.com/aws/jsii/issues/1718)) ([41d79e7](https://github.com/aws/jsii/commit/41d79e7f31a8e7c59c7274c91f17dcd23187757f)), closes [aws/aws-cdk#7977](https://github.com/aws/aws-cdk/issues/7977)
* **dotnet:** crash when TEMP contains certain unicode characters ([#1913](https://github.com/aws/jsii/issues/1913)) ([8f31b1a](https://github.com/aws/jsii/commit/8f31b1ac5cd20c18d0da20dad33782a9cb113643)), closes [aws/aws-cdk#7456](https://github.com/aws/aws-cdk/issues/7456)
* **jsii:** README.md filename is case sensitive ([#1871](https://github.com/aws/jsii/issues/1871)) ([e375647](https://github.com/aws/jsii/commit/e375647d21255cf3efa84081d672143a920854d2)), closes [#1862](https://github.com/aws/jsii/issues/1862)
* **jsii:** unable to use nested types from dependencies ([#1866](https://github.com/aws/jsii/issues/1866)) ([44f9109](https://github.com/aws/jsii/commit/44f91092a34179e6f5edbe1699cbaddac2f9a99b)), closes [#1861](https://github.com/aws/jsii/issues/1861)
* **pacmak:** `EMFILE` error when running `jsii-pacmak` ([#1891](https://github.com/aws/jsii/issues/1891)) ([7316b44](https://github.com/aws/jsii/commit/7316b44690eed46ce7e5d5089af77ee1f49a6a5e))
* **rosetta:** use of keyword 'lambda' produces invalid Python code ([#1850](https://github.com/aws/jsii/issues/1850)) ([39769b0](https://github.com/aws/jsii/commit/39769b0311886158631f56be6dce0b6262ba9c5c))

## [1.10.0](https://github.com/aws/jsii/compare/v1.9.0...v1.10.0) (2020-08-05)


### Bug Fixes

* **java:** user.xml repository ID was not sanitized ([#1812](https://github.com/aws/jsii/issues/1812)) ([4283af0](https://github.com/aws/jsii/commit/4283af0cb2338c31594c53b2ab040b7b183aec77))
* **jsii:** Location of initializers in source was not documented ([#1806](https://github.com/aws/jsii/issues/1806)) ([3957827](https://github.com/aws/jsii/commit/3957827a5a730d51029313518caacb0e87c09b83))
* **jsii:** selective exports declarations are ignored ([#1829](https://github.com/aws/jsii/issues/1829)) ([2699ccf](https://github.com/aws/jsii/commit/2699ccf89f3243edac677dac9ca8186a5bb102f2)), closes [#1818](https://github.com/aws/jsii/issues/1818)
* **python:** missing imports for certain keyword arguments ([#1810](https://github.com/aws/jsii/issues/1810)) ([f124bc8](https://github.com/aws/jsii/commit/f124bc8b0ebf9243f45c59be6209ca01fd967dea)), closes [#1809](https://github.com/aws/jsii/issues/1809)
* **rosetta:** OOpsie -- couldn't find root file back on Windows ([#1842](https://github.com/aws/jsii/issues/1842)) ([6ea8daa](https://github.com/aws/jsii/commit/6ea8daa8a022c5bda5fd1854d49292e65caac2be))
* **rosetta:** kwargs arguments are emitted at a variadic position ([#1832](https://github.com/aws/jsii/issues/1832)) ([079e147](https://github.com/aws/jsii/commit/079e147060d30dc1c878862af7bbb52f0cc54733)), closes [#1821](https://github.com/aws/jsii/issues/1821)

## [1.9.0](https://github.com/aws/jsii/compare/v1.8.0...v1.9.0) (2020-07-16)


### Bug Fixes

* **jsii-reflect:** TypeSystem.methods and .properties ignores submodules ([#1779](https://github.com/aws/jsii/issues/1779)) ([bdb5483](https://github.com/aws/jsii/commit/bdb5483e95e0e0ec6b556f5a06b92018bfe1a642))
* **pacmak:** python pack fails when installing 'black' via pip ([#1782](https://github.com/aws/jsii/issues/1782)) ([d83e004](https://github.com/aws/jsii/commit/d83e0043f3a8a40dcf79b60ffce4837721617149))
* **pacmak:** race condition in python packing when run over multiple packages ([#1783](https://github.com/aws/jsii/issues/1783)) ([7807027](https://github.com/aws/jsii/commit/7807027d6751fcdaaa06544a3755215937e8d9e9))

## [1.8.0](https://github.com/aws/jsii/compare/v1.7.0...v1.8.0) (2020-07-02)


### Bug Fixes

* **kernel:** tarball unpacking does not behave like 'npm install' ([#1766](https://github.com/aws/jsii/issues/1766)) ([2dc1b21](https://github.com/aws/jsii/commit/2dc1b2127295c7b91e95571e6cba246785d98ea3)), closes [aws/aws-cdk#8233](https://github.com/aws/aws-cdk/issues/8233) [#1765](https://github.com/aws/jsii/issues/1765)
* **python:** relative import missing for kwargs types ([#1768](https://github.com/aws/jsii/issues/1768)) ([c174ac5](https://github.com/aws/jsii/commit/c174ac5822d9923c904ec38b3f7d0513310ef973))

## [1.7.0](https://github.com/aws/jsii/compare/v1.6.0...v1.7.0) (2020-06-18)


### Features

* **jsii-pacmak:** add maven and nuget support for * dependencies ([#1696](https://github.com/aws/jsii/issues/1696)) ([13667f6](https://github.com/aws/jsii/commit/13667f6e22a4548c8bcbd9e1c589582f6c3417b5)), closes [aws/jsii#1678](https://github.com/aws/jsii/issues/1678)
* turn off assembly validation ([#1751](https://github.com/aws/jsii/issues/1751)) ([c6d5f8a](https://github.com/aws/jsii/commit/c6d5f8a9d57602c6187374e753dcc1ecd01a93b6))


### Bug Fixes

* **@jsii/runtime:** "maximum call stack size exceeded" in SyncStdio.readLine ([#1717](https://github.com/aws/jsii/issues/1717)) ([6348226](https://github.com/aws/jsii/commit/6348226d9060c0145c62792f04373ed84361dcf9)), closes [aws/aws-cdk#8288](https://github.com/aws/aws-cdk/issues/8288) [aws/aws-cdk#5187](https://github.com/aws/aws-cdk/issues/5187) [aws/aws-cdk#8397](https://github.com/aws/aws-cdk/issues/8397)
* **jsii:** build succeeds using Omit<T, K> ([#1708](https://github.com/aws/jsii/issues/1708)) ([a46fdb1](https://github.com/aws/jsii/commit/a46fdb1110188356ab6ec3188b552a3fe685ca7d)), closes [#1707](https://github.com/aws/jsii/issues/1707)
* **python:** no overload variant of "Factory" matches argument type "object" ([#1716](https://github.com/aws/jsii/issues/1716)) ([eee8ea5](https://github.com/aws/jsii/commit/eee8ea534157823856201478266ca8019b48a22b))
* **python:** reference isomorphism is broken within __init__ ([#1724](https://github.com/aws/jsii/issues/1724)) ([b7be1c6](https://github.com/aws/jsii/commit/b7be1c6efec8867e37192e1df2233331986b11b5)), closes [aws/aws-cdk#8262](https://github.com/aws/aws-cdk/issues/8262)

## [1.6.0](https://github.com/aws/jsii/compare/v1.5.0...v1.6.0) (2020-06-02)


### Features

* **java:** add a Builder<T> interface implemented by all builders ([#1654](https://github.com/aws/jsii/issues/1654)) ([52e73b5](https://github.com/aws/jsii/commit/52e73b511ffc3a2887ca96dec98482bcdd86cc8d)), closes [#1652](https://github.com/aws/jsii/issues/1652)
* **java:** use covariant types for collection elements ([#1653](https://github.com/aws/jsii/issues/1653)) ([bc5e200](https://github.com/aws/jsii/commit/bc5e20085b26af6d8662fb30b2add95459f93875)), closes [#1517](https://github.com/aws/jsii/issues/1517)
* **jsii:** use incremental builders ([aaa7593](https://github.com/aws/jsii/commit/aaa75934c989965d49490f8090e9d908d1aa5ffe))
* allow per-submodule naming configuration ([#1690](https://github.com/aws/jsii/issues/1690)) ([b2aa424](https://github.com/aws/jsii/commit/b2aa4247b550a4ce627d3bb4a05b45002b7d912a)), closes [#1286](https://github.com/aws/jsii/issues/1286)
* **pacmak/java:** isolate maven repositories ([#1709](https://github.com/aws/jsii/issues/1709)) ([4904cd8](https://github.com/aws/jsii/commit/4904cd80dfa47090e4ff2235fc0fd693703571da))
* **python:** add explicit return type to setters ([#1645](https://github.com/aws/jsii/issues/1645)) ([0f3c6e2](https://github.com/aws/jsii/commit/0f3c6e23d42a097786143ccac9ee0ccbef059fdc))


### Bug Fixes

* **dotnet:** F# dictionaries cause NullReferenceException ([#1655](https://github.com/aws/jsii/issues/1655)) ([50c656c](https://github.com/aws/jsii/commit/50c656c4be6856b843fd2e56895c0d57ca8f1554)), closes [#1322](https://github.com/aws/jsii/issues/1322)
* **jsii:** dependency submodules are not tagged ([#1663](https://github.com/aws/jsii/issues/1663)) ([18e3702](https://github.com/aws/jsii/commit/18e3702ed1a621cf0a71c328b37f11fa73c8cb05))
* package runtimes as private for integ test ([#1677](https://github.com/aws/jsii/issues/1677)) ([7afe761](https://github.com/aws/jsii/commit/7afe7619ceded745a6fcc9e95fff172ca6f6a28e))
* **jsii-pacmak:** computeIfAbsent throws ConcurrentModificationException ([#1706](https://github.com/aws/jsii/issues/1706)) ([fa60b7f](https://github.com/aws/jsii/commit/fa60b7f3d4268cd426d519bab9c738507c1ae503))
* **kernel:** error raised during rename operation on win32 ([#1702](https://github.com/aws/jsii/issues/1702)) ([38ee336](https://github.com/aws/jsii/commit/38ee336cd9fd5ceed3a19c85cd106a82d7073264)), closes [#992](https://github.com/aws/jsii/issues/992)
* **pacmak:** label "External" stability as "Stable" ([#1633](https://github.com/aws/jsii/issues/1633)) ([8569c00](https://github.com/aws/jsii/commit/8569c00045f8ee25356e8fa3074674558ec41732))
* **python:** `self` as property name leads to assignment error ([#1330](https://github.com/aws/jsii/issues/1330)) ([a877f34](https://github.com/aws/jsii/commit/a877f34c5dc4cbfcd615ed521f345c86501b0c56))
* **python:** imports between subpackages are broken ([#1528](https://github.com/aws/jsii/issues/1528)) ([84e0f48](https://github.com/aws/jsii/commit/84e0f4892e6da680f24dc8793322d228a0203e9e))

## [1.5.0](https://github.com/aws/jsii/compare/v1.4.1...v1.5.0) (2020-05-07)


### Bug Fixes

* **jsii:** unable to use type from dependencies' submodules ([#1557](https://github.com/aws/jsii/issues/1557)) ([ba7fac2](https://github.com/aws/jsii/commit/ba7fac25c4e625f4beb1bcc74a39d1c5e75441c1))

## [1.4.1](https://github.com/aws/jsii/compare/v1.4.0...v1.4.1) (2020-04-22)


### Bug Fixes

* **java:** compilation fails with "code too large" ([#1605](https://github.com/aws/jsii/issues/1605)) ([b9ec853](https://github.com/aws/jsii/commit/b9ec85384c53567e77bed4ab1a02910a297fff02))

## [1.4.0](https://github.com/aws/jsii/compare/v1.3.2...v1.4.0) (2020-04-22)


### Features

* **python:** improve metadata of jsii package ([#1587](https://github.com/aws/jsii/issues/1587)) ([7dd04fe](https://github.com/aws/jsii/commit/7dd04fe9987bbba7b1360162b7afc2caf15a50e6))
* **spec:** model submodules in the Assembly schema ([#1563](https://github.com/aws/jsii/issues/1563)) ([de2689b](https://github.com/aws/jsii/commit/de2689b0e3a9218c22c3c0cc046f98be029a1707)), closes [#1528](https://github.com/aws/jsii/issues/1528) [#1557](https://github.com/aws/jsii/issues/1557)

## [1.3.2](https://github.com/aws/jsii/compare/v1.3.1...v1.3.2) (2020-04-20)


### Bug Fixes

* **python:** incorrect dependency on jsii ([#1582](https://github.com/aws/jsii/issues/1582)) ([c537bd7](https://github.com/aws/jsii/commit/c537bd7e700004b5a66124c1970f4fb540a427d6)), closes [#1573](https://github.com/aws/jsii/issues/1573)

## [1.3.1](https://github.com/aws/jsii/compare/v1.3.0...v1.3.1) (2020-04-18)


### Bug Fixes

* **jsii-pacmak:** invalid dotnet version suffixes ([#1568](https://github.com/aws/jsii/issues/1568)) ([9ef8f17](https://github.com/aws/jsii/commit/9ef8f17e11fa3403043c3237463c16e08020c696))

## [1.3.0](https://github.com/aws/jsii/compare/v1.2.0...v1.3.0) (2020-04-16)


### Features

* **compliance:** produce compliance test reports ([#1368](https://github.com/aws/jsii/issues/1368)) ([11ef55d](https://github.com/aws/jsii/commit/11ef55d2aee68b4c85aa0f5cd06477d5a34c31c4))


### Bug Fixes

* **jsii-diff:** detect interfaces inherited via interfaces ([#1492](https://github.com/aws/jsii/issues/1492)) ([e03a638](https://github.com/aws/jsii/commit/e03a63807856126c4efc84d6663a1b4ae8b15dba))
* **python:** packages fail to load when relocated ([#1518](https://github.com/aws/jsii/issues/1518)) ([9db95e1](https://github.com/aws/jsii/commit/9db95e17b0cdb4d2e9b6502ee144c4a62ca30488)), closes [#1501](https://github.com/aws/jsii/issues/1501)

## [1.2.0](https://github.com/aws/jsii/compare/v1.0.0...v1.2.0) (2020-03-31)


### Features

* **jsii:** introduce submodules feature ([#1297](https://github.com/aws/jsii/issues/1297)) ([2df5d90](https://github.com/aws/jsii/commit/2df5d90f831808d02a4d697946a18065f3ae5ef2)), closes [#1286](https://github.com/aws/jsii/issues/1286)
* add autobump script ([#1335](https://github.com/aws/jsii/issues/1335)) ([bdda569](https://github.com/aws/jsii/commit/bdda569729db83abe09edb9f9d922ba4194cd847))


### Bug Fixes

* **diff:** check super types ([#1354](https://github.com/aws/jsii/issues/1354)) ([b08f65f](https://github.com/aws/jsii/commit/b08f65feab97133ead27857233384d788676ce80))
* **dotnet:** missing ? on nullable interface members ([#1287](https://github.com/aws/jsii/issues/1287)) ([9299db2](https://github.com/aws/jsii/commit/9299db25348504a4e413a047ce9ba914fb0f8856)), closes [#1285](https://github.com/aws/jsii/issues/1285)
* **dotnet-analyzers:** unit test null reference ([#1341](https://github.com/aws/jsii/issues/1341)) ([6b88509](https://github.com/aws/jsii/commit/6b88509ef84891005d6dc904828bbce9c81a9cc3))
* **jsii:** missing context on "Message" diagnostics ([#1298](https://github.com/aws/jsii/issues/1298)) ([c44f5f3](https://github.com/aws/jsii/commit/c44f5f30b77225e463d80c2e01e519e40d5601c5))
* **jsii:** out-of-source builds are broken ([#1344](https://github.com/aws/jsii/issues/1344)) ([aecdc5e](https://github.com/aws/jsii/commit/aecdc5eecc540e11f91c761de41bcf36c2f88f20)), closes [#1273](https://github.com/aws/jsii/issues/1273)
* **jsii:** single-valued enums are not processed correctly ([#1406](https://github.com/aws/jsii/issues/1406)) ([39425a4](https://github.com/aws/jsii/commit/39425a4caabcfe3d199f0dc04ee507b57905071d)), closes [aws/aws-cdk#6712](https://github.com/aws/aws-cdk/issues/6712) [aws/aws-cdk#6948](https://github.com/aws/aws-cdk/issues/6948)
* **kernel:** "any" serialization breaks private type instances ([#1347](https://github.com/aws/jsii/issues/1347)) ([655adeb](https://github.com/aws/jsii/commit/655adeb9f3e9617049fbbe9160b9ef15218790be)), closes [aws/aws-cdk#6746](https://github.com/aws/aws-cdk/issues/6746)
* **python-runtime:** KernelResponse missing types ([#1332](https://github.com/aws/jsii/issues/1332)) ([fcafab4](https://github.com/aws/jsii/commit/fcafab48c97e14ba76585d186041b0e8af79cf3a))

# [1.1.0](https://github.com/aws/jsii/compare/v1.0.0...v1.1.0) (2020-03-10)


### Bug Fixes

* **dotnet:** missing ? on nullable interface members ([#1287](https://github.com/aws/jsii/issues/1287)) ([9299db2](https://github.com/aws/jsii/commit/9299db25348504a4e413a047ce9ba914fb0f8856)), closes [#1285](https://github.com/aws/jsii/issues/1285)
* **jsii:** missing context on "Message" diagnostics ([#1298](https://github.com/aws/jsii/issues/1298)) ([c44f5f3](https://github.com/aws/jsii/commit/c44f5f30b77225e463d80c2e01e519e40d5601c5))





## [1.0.0](https://github.com/aws/jsii/compare/v0.22.0...v1.0.0) (2020-02-17)


### Features

* CDK Build Integration Test ([#1219](https://github.com/aws/jsii/issues/1219)) ([e99d722](https://github.com/aws/jsii/commit/e99d722fb7b12d6a87b423980aca70077c0ad1cb)), closes [#1209](https://github.com/aws/jsii/issues/1209)
* **csharp:** enable nullable reference types ([#1246](https://github.com/aws/jsii/issues/1246)) ([cbc7258](https://github.com/aws/jsii/commit/cbc72588b7a70fb2cb1d6d3012bec53d27263001))
* **dotnet:** upgrade target framework to netcoreapp3.1 ([#1241](https://github.com/aws/jsii/issues/1241)) ([c324439](https://github.com/aws/jsii/commit/c32443979548faa283894d5aaf4f4baf31350063))





## [0.22.0](https://github.com/aws/jsii/compare/v0.21.2...v0.22.0) (2020-02-06)


### Bug Fixes

* **java:** invalid collections returned with non-class elements ([#1197](https://github.com/aws/jsii/issues/1197)) ([bbc2302](https://github.com/aws/jsii/commit/bbc23029746038e34fdd572312cec218344a368a)), closes [#1196](https://github.com/aws/jsii/issues/1196)


### Features

* **java:** annotate nullability ([#1234](https://github.com/aws/jsii/issues/1234)) ([6f2ab03](https://github.com/aws/jsii/commit/6f2ab03dfc4fe5625d97cfacdc980e85b54928a7)), closes [aws/aws-cdk#6026](https://github.com/aws/aws-cdk/issues/6026)





## [0.21.2](https://github.com/aws/jsii/compare/v0.21.1...v0.21.2) (2020-01-22)


### Bug Fixes

* **java:** maven-surefire-plugin 2.22.2 ([#1165](https://github.com/aws/jsii/issues/1165)) ([2f1f7b9](https://github.com/aws/jsii/commit/2f1f7b91f6405db8f992dc3331a5749b7f5fc9b3))
* depend on python-3.8-supporting version of cattrs ([#1177](https://github.com/aws/jsii/issues/1177)) ([e9b00c8](https://github.com/aws/jsii/commit/e9b00c80c46968aecc2e51dbf822fbe8acecd1cb)), closes [#913](https://github.com/aws/jsii/issues/913)
* **rosetta:** properly escape C# comments as XML ([#1184](https://github.com/aws/jsii/issues/1184)) ([2bdc589](https://github.com/aws/jsii/commit/2bdc589f105a90f394e85f0c9287f69b19c0b536))
* poor error message on scalar deserialization type mismatch ([#1187](https://github.com/aws/jsii/issues/1187)) ([fdf8927](https://github.com/aws/jsii/commit/fdf8927314a6953d4c206a0c69df510ddcc2eaf0))


### Features

* **superchain:** upgrade maven to 3.6.3 ([#1205](https://github.com/aws/jsii/issues/1205)) ([1398bef](https://github.com/aws/jsii/commit/1398bef0eb5359b2cacb3eda3a1255510f0e7e77))





## [0.21.1](https://github.com/aws/jsii/compare/v0.21.0...v0.21.1) (2020-01-03)


### Bug Fixes

* **rosetta:** crashes on behavioral interfaces ([#1169](https://github.com/aws/jsii/issues/1169)) ([5f3e9e0](https://github.com/aws/jsii/commit/5f3e9e048ba60b278627e9d4d69550bb10dadfd1))





## [0.21.0](https://github.com/aws/jsii/compare/v0.20.11...v0.21.0) (2020-01-02)


### Bug Fixes

* **dotnet:** documentation strings sometimes invalid ([#1127](https://github.com/aws/jsii/issues/1127)) ([94da056](https://github.com/aws/jsii/commit/94da0568c09a0d18cff6be7b933cd2d5ad506c65))
* **java,dotnet:** abstract properties have concrete implementations ([#1128](https://github.com/aws/jsii/issues/1128)) ([c9351a3](https://github.com/aws/jsii/commit/c9351a3c477e778ec8a0ce1e34d262f39563e49d)), closes [#240](https://github.com/aws/jsii/issues/240) [#1011](https://github.com/aws/jsii/issues/1011)
* **jsii:** `--watch` causes immediate failure ([#1150](https://github.com/aws/jsii/issues/1150)) ([6bdf7d7](https://github.com/aws/jsii/commit/6bdf7d76873809279f7c01053d56cbacfd8f2b3d)), closes [#1149](https://github.com/aws/jsii/issues/1149)
* **pacmak:** generated dependencies are not consistent with source npm module ([#1141](https://github.com/aws/jsii/issues/1141)) ([03221fe](https://github.com/aws/jsii/commit/03221fe6c2b26414ac45fb693524701ec05509dc)), closes [#676](https://github.com/aws/jsii/issues/676) [#1137](https://github.com/aws/jsii/issues/1137)
* **runtime:** runtime crashes with EAGAIN trying to read from STDIN ([#1143](https://github.com/aws/jsii/issues/1143)) ([e3502ed](https://github.com/aws/jsii/commit/e3502ed4af3e17e9de7087c61fa9b8da6c05e1b0)), closes [#1142](https://github.com/aws/jsii/issues/1142) [aws/aws-cdk#5187](https://github.com/aws/aws-cdk/issues/5187)
* **superchain:** bad permissions on ~/.ssh/config ([#1139](https://github.com/aws/jsii/issues/1139)) ([eda462d](https://github.com/aws/jsii/commit/eda462df415330060efd3660f92cab22d6c5aace)), closes [#1138](https://github.com/aws/jsii/issues/1138)


### Features

* **jsii:** switch to disable reserved words warnings ([#1076](https://github.com/aws/jsii/issues/1076)) ([5389def](https://github.com/aws/jsii/commit/5389def583160d6e06bb399704ff4cce9c8ef13a)), closes [#1073](https://github.com/aws/jsii/issues/1073)
* **rosetta:** translate examples to Java and C# ([#985](https://github.com/aws/jsii/issues/985)) ([d591b85](https://github.com/aws/jsii/commit/d591b859e1f4a3f49753b91d752e0e654400795e))





## [0.20.11](https://github.com/aws/jsii/compare/v0.20.10...v0.20.11) (2019-12-13)


### Bug Fixes

* **rosetta:** "Rosetta configured for live conversion to undefined" ([#1120](https://github.com/aws/jsii/issues/1120)) ([10e9d38](https://github.com/aws/jsii/commit/10e9d3863e36bc86afd57f399cb64c02a8f1df4d))





## [0.20.10](https://github.com/aws/jsii/compare/v0.20.9...v0.20.10) (2019-12-13)


### Bug Fixes

* **reflect:** failure to load assembly from "npm pack" ([#1117](https://github.com/aws/jsii/issues/1117)) ([a2b11f1](https://github.com/aws/jsii/commit/a2b11f19a826027be021ca815985c08461df618a))





## [0.20.9](https://github.com/aws/jsii/compare/v0.20.8...v0.20.9) (2019-12-11)


### Bug Fixes

* allow Missing Dotnet Version Suffix ([#1047](https://github.com/aws/jsii/issues/1047)) ([fc366d0](https://github.com/aws/jsii/commit/fc366d0a461473e1e6caeb85117098c708d191da)), closes [#1037](https://github.com/aws/jsii/issues/1037)
* **dotnet/roslyn:** analyzer target framework ([#1071](https://github.com/aws/jsii/issues/1071)) ([fea0f0a](https://github.com/aws/jsii/commit/fea0f0a4c8ddd002957823a42b2e93cd6a23344d)), closes [aws/aws-cdk#5189](https://github.com/aws/aws-cdk/issues/5189)
* generate non-overlapping artifacts ([#1104](https://github.com/aws/jsii/issues/1104)) ([2add627](https://github.com/aws/jsii/commit/2add6276f9490fdb25ee53a1b1a9ea8a85012a1b))
* **java:** missing remarks in builder documentation ([#1111](https://github.com/aws/jsii/issues/1111)) ([33e820c](https://github.com/aws/jsii/commit/33e820c9252dd791a11eefdb2e6ad64f63facefd)), closes [#1094](https://github.com/aws/jsii/issues/1094)
* **java:** remove Jackson confusion with certain patterns ([#1070](https://github.com/aws/jsii/issues/1070)) ([9eacbe3](https://github.com/aws/jsii/commit/9eacbe3476c471bf0528559bb602bcb1ede0904b)), closes [#987](https://github.com/aws/jsii/issues/987) [aws/aws-cdk#4080](https://github.com/aws/aws-cdk/issues/4080)
* **python:** correctly emit sligified positional args ([#1081](https://github.com/aws/jsii/issues/1081)) ([6f9167b](https://github.com/aws/jsii/commit/6f9167bc21fd5274d4e7c5e5442973d747f7dd94)), closes [aws/aws-cdk#4302](https://github.com/aws/aws-cdk/issues/4302)
* **python:** correctly handle structs out of callbacks ([#1009](https://github.com/aws/jsii/issues/1009)) ([812d8c2](https://github.com/aws/jsii/commit/812d8c2fec948a507bcf488dd7387c6ce1b91b1a)), closes [#1003](https://github.com/aws/jsii/issues/1003) [#997](https://github.com/aws/jsii/issues/997) [#997](https://github.com/aws/jsii/issues/997) [#1003](https://github.com/aws/jsii/issues/1003)
* **python:** members named property results in invalid code ([#1114](https://github.com/aws/jsii/issues/1114)) ([92be5d7](https://github.com/aws/jsii/commit/92be5d7f12cfccb5f7f3ba714b73a4db96f7d329)), closes [#1113](https://github.com/aws/jsii/issues/1113)


### Features

* upgrade to typescript 3.7 ([#988](https://github.com/aws/jsii/issues/988)) ([6e0a7e6](https://github.com/aws/jsii/commit/6e0a7e698ee1f2b20526667bb1222e92beb9eec8))





## [0.20.8](https://github.com/aws/jsii/compare/v0.20.7...v0.20.8) (2019-11-24)


### Bug Fixes

* Move jsii-spec to Dependencies ([#1032](https://github.com/aws/jsii/issues/1032)) ([0581323](https://github.com/aws/jsii/commit/05813230903c3b10ad8a3ad304ada99011f8c865)), closes [#1030](https://github.com/aws/jsii/issues/1030)





## [0.20.7](https://github.com/aws/jsii/compare/v0.20.5...v0.20.7) (2019-11-18)


### Bug Fixes

* **java:** handle null-able collections correctly ([#986](https://github.com/aws/jsii/issues/986)) ([e88e5e2](https://github.com/aws/jsii/commit/e88e5e2dc3db75dc9cbae494185ae65100783544)), closes [aws/aws-cdk#4316](https://github.com/aws/aws-cdk/issues/4316)
* **jsii:** unable to depend on modules with private declarations ([#995](https://github.com/aws/jsii/issues/995)) ([08c4294](https://github.com/aws/jsii/commit/08c4294f270da1c0b1271ab8d119057d9626c03a)), closes [#994](https://github.com/aws/jsii/issues/994)
* **kernel:** cannot pass decorated structs to kernel as "any" ([#997](https://github.com/aws/jsii/issues/997)) ([2bd3183](https://github.com/aws/jsii/commit/2bd318358781c629085cbe594dfd0cc2b554f308)), closes [aws/aws-cdk#5066](https://github.com/aws/aws-cdk/issues/5066)


### Features

* **jsii-config:** introducing jsii-config ([#981](https://github.com/aws/jsii/issues/981)) ([2bbf576](https://github.com/aws/jsii/commit/2bbf576b8877b846bf5b602945ab4a8a90993975)), closes [#904](https://github.com/aws/jsii/issues/904)
* **rosetta:** extract and compile samples into "tablets" ([#925](https://github.com/aws/jsii/issues/925)) ([eec44e1](https://github.com/aws/jsii/commit/eec44e106ee1e3d2e3d03f70e4d87a4d7ee0bbba))





## [0.20.6](https://github.com/aws/jsii/compare/v0.20.5...v0.20.6) (2019-11-14)


### Bug Fixes

* **python:** dynamic proxies handling of setters ([eec9640](https://github.com/aws/jsii/commit/eec96403fea1e940b744e40d54a35535b766851d)), closes [aws/aws-cdk#5032](https://github.com/aws/aws-cdk/issues/5032)





## [0.20.5](https://github.com/aws/jsii/compare/v0.20.4...v0.20.5) (2019-11-13)


### Bug Fixes

* **dotnet:** allow down-casting to parent interface type ([#983](https://github.com/aws/jsii/issues/983)) ([8a390e5](https://github.com/aws/jsii/commit/8a390e579a7cae2bbe386eaefb1c7a9084210a7f)), closes [#982](https://github.com/aws/jsii/issues/982)
* **python:** correctly handle interface declarations on returned objects ([#980](https://github.com/aws/jsii/issues/980)) ([c2de100](https://github.com/aws/jsii/commit/c2de100ecdf30dacfbad94cb4ff071feb22b2fc2))


### Features

* **python:** add license & classifiers to generated packages ([#712](https://github.com/aws/jsii/issues/712)) ([84fd8bb](https://github.com/aws/jsii/commit/84fd8bbcf2ca22235780d3fa3959bd327a0d8107)), closes [#707](https://github.com/aws/jsii/issues/707)





## [0.20.4](https://github.com/aws/jsii/compare/v0.20.3...v0.20.4) (2019-11-12)


### Bug Fixes

* **python:** correctly handle nested structs-as-dict ([#973](https://github.com/aws/jsii/issues/973)) ([9fd2499](https://github.com/aws/jsii/commit/9fd2499388745cf63d194a47bf247e5e24f4a7db))





## [0.20.3](https://github.com/aws/jsii/compare/v0.20.2...v0.20.3) (2019-11-11)


### Bug Fixes

* **kernel:** correctly de-serialize mappings as JSON ([#968](https://github.com/aws/jsii/issues/968)) ([5d056f4](https://github.com/aws/jsii/commit/5d056f44ca1fb47c9ad64f622d300e5f35adc474))





## [0.20.2](https://github.com/aws/jsii/compare/v0.20.1...v0.20.2) (2019-11-08)


### Bug Fixes

* **dotnet:** fix callback issues ([#953](https://github.com/aws/jsii/issues/953)) ([849c004](https://github.com/aws/jsii/commit/849c004ddfefa7b255197daf4dddc8e6f55c6dcb))
* **pacmak:** .NET build downloading packages from NuGet ([#949](https://github.com/aws/jsii/issues/949)) ([433d1f8](https://github.com/aws/jsii/commit/433d1f870e23d9881c847d79834ebd27cd640061))
* **pacmak:** occasional EISDIR failure ([#948](https://github.com/aws/jsii/issues/948)) ([a388f24](https://github.com/aws/jsii/commit/a388f24b418b9b0053a09329c7a72be7207215f5))
* **runtime:** make kernel 'load' operation synchronous ([#951](https://github.com/aws/jsii/issues/951)) ([896d688](https://github.com/aws/jsii/commit/896d688bd33b26e5af1a3f044cb5e47e5d304c03))





## [0.20.1](https://github.com/aws/jsii/compare/v0.20.0...v0.20.1) (2019-11-06)


### Bug Fixes

* **dotnet/analyzer:** remove dependency on Runtime ([#927](https://github.com/aws/jsii/issues/927)) ([815b449](https://github.com/aws/jsii/commit/815b44982bfe1f9b2ee3a9cf60e4f5dfb4dd22f6))
* **kernel:** revert behavior change around `any` serialization ([#932](https://github.com/aws/jsii/issues/932)) ([2f47543](https://github.com/aws/jsii/commit/2f475437847b10377e5b91cc42bd752d1f2e06c4)), closes [#825](https://github.com/aws/jsii/issues/825)
* **pacmak:** put package README into the right Python module ([#928](https://github.com/aws/jsii/issues/928)) ([17dd60f](https://github.com/aws/jsii/commit/17dd60f18142ec64849f3c03be46325fc3c6deff))


### Features

* **jsii-diff:** make assembly validation optional ([#926](https://github.com/aws/jsii/issues/926)) ([e2c80f0](https://github.com/aws/jsii/commit/e2c80f07f38aee25fc57164e71bdd8ae448cda7e))





## [0.20.0](https://github.com/aws/jsii/compare/v0.19.0...v0.20.0) (2019-10-30)


### Bug Fixes

* **java:** correctly search for protected override implementations ([#905](https://github.com/aws/jsii/issues/905)) ([e3f0f6c](https://github.com/aws/jsii/commit/e3f0f6cb4e7fa722412ca158a1e2803ed06c4c40)), closes [#903](https://github.com/aws/jsii/issues/903)
* **java,dotnet:** emit default implementations for optional properties ([#906](https://github.com/aws/jsii/issues/906)) ([37ddfd5](https://github.com/aws/jsii/commit/37ddfd5fde1399274ca1541542c7268b75e026c2)), closes [#543](https://github.com/aws/jsii/issues/543)
* **kernel:** correct deserialization of structs in union contexts ([#919](https://github.com/aws/jsii/issues/919)) ([c0f338e](https://github.com/aws/jsii/commit/c0f338e289f6523f207bbdd3d9249a998bc370b9)), closes [#822](https://github.com/aws/jsii/issues/822) [aws/aws-cdk#3917](https://github.com/aws/aws-cdk/issues/3917) [aws/aws-cdk#2013](https://github.com/aws/aws-cdk/issues/2013)
* **pacmak:** fix a couple of issues related to java generation ([#921](https://github.com/aws/jsii/issues/921)) ([5ad58c0](https://github.com/aws/jsii/commit/5ad58c0d3937e4a5fa5f5dfbb84f4be089727cba))
* **pacmak/python:** improve detection of twine ([#845](https://github.com/aws/jsii/issues/845)) ([2c4ef29](https://github.com/aws/jsii/commit/2c4ef2969997b21243bdf3c508d5df78f7308141))


### Features

* update Dockerfile to .NET SDK 3.1, improve NuGet metadata ([#880](https://github.com/aws/jsii/issues/880)) ([5e076cf](https://github.com/aws/jsii/commit/5e076cfe0063e87e58c85862488d88a5959036ba))
* **java:** offer Builders for certain Java classes ([#895](https://github.com/aws/jsii/issues/895)) ([f9c1335](https://github.com/aws/jsii/commit/f9c1335cc0f27c8186d5b7d7a148ef7fffc5b1aa)), closes [#488](https://github.com/aws/jsii/issues/488)
* **kernel:** annotate implemented interfaces on "ObjRef"s ([#825](https://github.com/aws/jsii/issues/825)) ([a4e2095](https://github.com/aws/jsii/commit/a4e209539190cbe156462364f2617e9a05c5589c))
* **pacmak:** build all java targets at once ([#849](https://github.com/aws/jsii/issues/849)) ([5d7824d](https://github.com/aws/jsii/commit/5d7824d5f0aa35625fc56b8301bc27a1e5691d46))
* **pacmak:** put translated README into module docstring ([#900](https://github.com/aws/jsii/issues/900)) ([8bacfb1](https://github.com/aws/jsii/commit/8bacfb1463e252aeb907665efe2038fb47e5f01a))





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
