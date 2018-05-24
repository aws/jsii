# jsii

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

__jsii__ is a common JavaScript runtime which enables reusing JavaScript modules
from across multiple programming languages.

The jsii compiler uses the TypeScript compiler (and in the future, other
strongly typed languages that compile to JavaScript) to produce type-annotated
bundles which can be used to generate idiomatic class libraries in a variety of
target languages. The generated classes proxy calls to a JavaScript runtime,
effectively allowing __jsii__ modules to be __"written once and used everywhere"__.

> NOTE: Due to performance of the hosted javascript engine and marshaling costs,
__jsii__ modules are likely to be used for development and build tools, as
oppose to performance-sensitive runtime behavior.

## Development Environment

The project is managed as a
[monorepo](https://github.com/babel/babel/blob/master/doc/design/monorepo.md)
using [lerna](https://github.com/lerna/lerna).

1. Check out this repository.
2. Run `./build.sh` to install lerna and bootstrap the repo.

All modules within this repository have the following scripts:

* `prepare` - builds the module (usually runs the TypeScript compiler).
* `watch` - runs `tsc -w` which picks up changes and builds them progressively.
* `test` - uses `nodeunit test/test.*.js` to run all unit tests.

Each one of these scripts can be executed either from the root of the repo using
`lerna run xxx` or from individual modules using `npm run xxx`.

### Releasing

The `./publish.sh` script can be used to pack and publish a new version.

The script will do the following:

1. Invoke `lerna publish --no-git --no-npm` which will ask that you determine
   the semantic version.
2. For each non-private module, invoke `npm pack` and collect all npm tarballs
   to `dist/staging`
3. Create a single .zip file under `dist/jsii-<version>.zip` with all the tarballs.
4. TODO: release to GitHub.
