# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
