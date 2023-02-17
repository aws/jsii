# Superchain

A [`debian:10-slim`][debian]-based Docker image bundling all the SDKs and tools
required in order to package [jsii] projects in all supported languages.

[debian]: https://hub.docker.com/_/debian
[jsii]: https://github.com/aws/jsii

## Included Language SDKs

SDK             | Version
----------------|-------------------------------------------
`OpenJDK 8`     | Amazon Corretto `>= 8.242.08.1`
`.NET SDK`      | `>= 6.0.14`
`mono`          | `>= 6.8.0.105`
`Javascript`    | see [NodeJS and NPM](#nodejs-and-npm)
`PowerShell`    | `pwsh >= 7.1.3`
`Python 3`      | `python3 >= 3.7.4` with `pip3 >= 20.0.2`
`Go`            | `go >= 1.18`

## Image tags

Maintained image tags are named using the following pattern:

```
jsii/superchain:<JSII-MAJOR>-<BASE>(-node<NODE-MAJOR>)(-nightly)
```

- `<JSII-MAJOR>` is the major line of the jsii toolchain
  - The only supported value is `1`
- `<BASE>` is the base image tag (e.g: `buster-slim`)
  - The only supported value is `buster-slim`
- `<NODE-MAJOR>` is the major version of node contained in the image
  - `14` corresponds to node 14.x, this is the default
  - `16` corresponds to node 16.x
  - `18` corresponds to node 18.x
- `-nightly` images are released from the `HEAD` of the [`aws/jsii`][jsii]
  repository and should typically not be used for production workloads

The previous image tags have been discontinued:

- `:latest` (users should migrate to `:1-buster-slim`)
- `:nightly` (users should migrate to `:1-buster-slim-nightly`)
- `:node10` (users should migrate to `:1-buster-slim-node14`)
- `:node10-nightly` (users should migrate to `:1-buster-slim-node14-nightly`)
- `:node12` (users shoudl migrate to `:1-buster-slim-node14`)
- `:node12-nightly` (users shoudl migrate to `:1-buster-slim-node14-nightly`)
- `:node14` (users shoudl migrate to `:1-buster-slim-node14`)
- `:node14-nightly` (users shoudl migrate to `:1-buster-slim-node14-nightly`)

## NodeJS and NPM

We build multiple versions of this image, for different versions of Node. They are available as:

* `jsii/superchain:1-buster-slim-node14(-nightly)`
* `jsii/superchain:1-buster-slim-node16(-nightly)`
* `jsii/superchain:1-buster-slim-node18(-nightly)`

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
`sam`          | `>= 1.37.0`

## License

As with all Docker images, these also contain software which may be distributed
under various licenses (such as Bash, etc from the base distribution, along with
any direct or indirect dependencies of the primary software being contained).

As for any pre-built image usage, it is the image user's responsibility to
ensure that any use of this image complies with any relevant licenses for all
software contained within.

For more information, refer to the `/NOTICE` file that is present in the Docker
image.
