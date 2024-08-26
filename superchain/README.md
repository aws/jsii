# Superchain

A [`debian`][debian]-based Docker image bundling all the SDKs and tools
required in order to package [jsii] projects in all supported languages.

[debian]: https://gallery.ecr.aws/debian/debian
[jsii]: https://github.com/aws/jsii

## Recommended image

We recommend the following image for most users.
See [Image tags](#current-image-tags) for further details.

```text
public.ecr.aws/jsii/superchain:1-bookworm-slim
```

### Current image tags

The following image tags are actively maintained and updated regularly.

```text
public.ecr.aws/jsii/superchain:<image-tag>
```

| Image tag                | Debian          | Node | Python |
| ------------------------ | --------------- | ---- | ------ |
| `1-bookworm-slim`        | `12` `bookworm` | `18` | `3.11` |
| `1-bookworm-slim-node18` | `12` `bookworm` | `18` | `3.11` |
| `1-bookworm-slim-node20` | `12` `bookworm` | `20` | `3.11` |
| `1-bookworm-slim-node22` | `12` `bookworm` | `22` | `3.11` |
| `1-bullseye-slim-node20` | `11` `bullseye` | `20` | `3.9`  |
| `1-bullseye-slim-node22` | `11` `bullseye` | `22` | `3.9`  |

Any other tags should be *considered* deprecated or in the case of `nightly` images *experimental*.

## Included Language SDKs

| SDK          | Version                                       |
| ------------ | --------------------------------------------- |
| `OpenJDK 20` | Amazon Corretto `>= 20.0.2`                   |
| `.NET SDK`   | `>= 6.0.14`                                   |
| `mono`       | `>= 6.12.0.200`                               |
| `Javascript` | see [Current image tags](#current-image-tags) |
| `PowerShell` | `pwsh >= 7.2.16`                              |
| `Python 3`   | see [Current image tags](#current-image-tags) |
| `Go`         | `go >= 1.18`                                  |

## Building

This docker image must be built from the package root with the Dockerfile set to
`superchain/Dockerfile`:

```console
docker build . -f superchain/Dockerfile -t jsii/superchain:local
```

In case the tests fail, skip the tests and inspect the image manually:

```console
docker build . -f superchain/Dockerfile -t jsii/superchain:local --target=superchain
```

### NodeJS and NPM

If you are building this image from source, you can control the Node version with the
`NODE_MAJOR_VERSION` build argument:

```console
docker build [...] --build-arg NODE_MAJOR_VERSION=22
```

### Image tags

Image tags are named using the following pattern:

```text
public.ecr.aws/jsii/superchain:<JSII-MAJOR>-<BASE>(-node<NODE-MAJOR>)(-nightly)
```

- `<JSII-MAJOR>` is the major line of the jsii toolchain (must be `1`)
- `<BASE>` is the base image tag, currently supported base images are
- `<NODE-MAJOR>` is the major version of Node.js contained in the image
- `-nightly` images are released from the `HEAD` of the [`aws/jsii`][jsii]
  repository and should typically not be used for production workloads

## Support policy

Generally only actively versions that are actively supported by upstream projects are maintained in superchain.

### Debian

We only publish images for Debian releases that receive updates from the [Debian security team]([debian-releases](https://wiki.debian.org/DebianReleases#Production_Releases)).
All superchain images are based on the slim variant.

### Node

We publish images variants for Node versions that are Current or LTS.
We include the npm version that ships with the version of Node.

### Python

The image includes the most recent Python version available for the respective Debian distribution.
A complete list can be viewed on the [Debian website](https://wiki.debian.org/Python#Supported_Python_Versions).

## Included Tools & Utilities

The following tools & utilities are available for your convinience.
Versions are generally the latest available for the respective Debian distribution.

| Tool / Utility  | Version                    |
| --------------- | -------------------------- |
| `aws`           | `>= 2.11.17`               |
| `bundler`       | `>= 1.17.3` and `>= 2.1.4` |
| `docker`        | `>= 24.0.7-ce`             |
| `git`           | `>= 2.30.2`                |
| `make`          | `>= 4.3`                   |
| `maven`         | `>= 6.4.15`                |
| `openssl`       | `>= 1.1.1w`                |
| `rsync`         | `>= 3.2.3`                 |
| `yarn`          | `>= 1.22.19`               |
| `zip` & `unzip` | `>= 6.0-19`                |
| `gh`            | `>= 1.13.1`                |
| `sam`           | `>= 1.102.0`               |

## License

As with all Docker images, these also contain software which may be distributed
under various licenses (such as Bash, etc from the base distribution, along with
any direct or indirect dependencies of the primary software being contained).

As for any pre-built image usage, it is the image user's responsibility to
ensure that any use of this image complies with any relevant licenses for all
software contained within.

For more information, refer to the `/NOTICE` file that is present in the Docker
image.
