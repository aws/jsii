# Superchain

A [`debian:10-slim`][debian]-based Docker image bundling all the SDKs and tools
required in order to package [jsii] projects in all supported languages.

[debian]: https://hub.docker.com/_/debian
[jsii]: https://github.com/aws/jsii

## Included Language SDKs

SDK             | Version
----------------|-------------------------------------------
`OpenJDK 8`     | Amazon Corretto `>= 8.242.08.1`
`.NET SDK`      | `>= 3.1.101`
`mono`          | `>= 6.8.0.105`
`Javascript`    | `node >= 10.19.0` OR `node >= 14.16.0` with `npm >= 6.14.11` (see [NodeJS and NPM](#nodejs-and-npm))
`PowerShell`    | `pwsh >= 7.1.3`
`Python 3`      | `python3 >= 3.7.3` with `pip3 >= 20.0.2`
`Go`            | `go >= 1.16`

## Image tags

Maintained image tags are the following:

- `:nightly` is built off the current repository HEAD, and should not be used for production workloads
- `:latest-buster-slim` is the latest supported release, built on the `debian:buster-slim` base
- `:node<MV>-buster-slim` is the latest supported release with Node `<MV>`, built on the `debian:buster-slim` base

The following tags are no longer updated and should not be used:

- `:latest` (users should migrate to `:latest-buster-slim`)
- `:node10` (users should migrate to `:node14-buster-slim`)
- `:node14` (users shoudl migrate to `:node14-buster-slim`)

## NodeJS and NPM

We build multiple versions of this image, for different versions of Node. They are available as:

* `jsii/superchain:node10(-buster-slim|-nightly)`
* `jsii/superchain:node14(-buster-slim|-nightly)`

The following labels are also available, and are aliases for the Node 10 images:

* `jsii/superchain:nightly`
* `jsii/superchain:latest-buster-slim`

If you are building this image from source, you can control the Node version with the
`NODE_MAJOR_VERSION` build argument:

```
docker build [...] --build-arg NODE_MAJOR_VERSION=14 .
```

## Included Tools & Utilities

Tool / Utility | Version
---------------|--------------------------------------------
`aws`          | `>= 1.16.300`
`bundler`      | `>= 1.17.3` and `>= 2.1.4`
`docker`       | `>= 18.09.9-ce`
`git`          | `>= 2.23.1`
`make`         | `>= 3.82`
`maven`        | `>= 3.6.3`
`openssl`      | `>= 1.0.2k-fips`
`rsync`        | `>= 3.1.2`
`yarn`         | `>= 1.21.1`
`zip` & `unzip`| `>= 6.0-19`
`gh`           | `>= 1.9.2`

## License

As with all Docker images, these also contain software which may be distributed
under various licenses (such as Bash, etc from the base distribution, along with
any direct or indirect dependencies of the primary software being contained).

As for any pre-built image usage, it is the image user's responsibility to
ensure that any use of this image complies with any relevant licenses for all
software contained within.
