# Superchain

A [`debian`][debian]-based Docker image bundling all the SDKs and tools
required in order to package [jsii] projects in all supported languages.

[debian]: https://gallery.ecr.aws/debian/debian
[jsii]: https://github.com/aws/jsii

## Recommended image

We recommend the following image for most users.
See [Image tags](#image-tags) for further details.

```
public.ecr.aws/jsii/superchain:1-bullseye-slim
```

## Included Language SDKs

| SDK          | Version                                  |
| ------------ | ---------------------------------------- |
| `OpenJDK 20` | Amazon Corretto `>= 20.0.2`              |
| `.NET SDK`   | `>= 6.0.14`                              |
| `mono`       | `>= 6.12.0.200`                          |
| `Javascript` | see [NodeJS and NPM](#nodejs-and-npm)    |
| `PowerShell` | `pwsh >= 7.2.16`                         |
| `Python 3`   | see [Python'](#python)                   |
| `Go`         | `go >= 1.18`                             |

## Image tags

Maintained image tags are named using the following pattern:

```
public.ecr.aws/jsii/superchain:<JSII-MAJOR>-<BASE>(-node<NODE-MAJOR>)(-nightly)
```

- `<JSII-MAJOR>` is the major line of the jsii toolchain (must be `1`)
- `<BASE>` is the base image tag, currently supported base images are
  - `bookworm-slim`
  - `bullseye-slim`
- `<NODE-MAJOR>` is the major version of node contained in the image
  - `18` corresponds to node 18.x, this is the default
  - `20` corresponds to node 20.x
- `-nightly` images are released from the `HEAD` of the [`aws/jsii`][jsii]
  repository and should typically not be used for production workloads

**The following base image lines have been deprecated and are not updated anymore. Users are adviced to upgrade to :**

- `:1-buster-slim-*`

**The previous image tags have been discontinued and must NOT BE USED ANYMORE:**

- `:latest` (users should migrate to `:1-bullseye-slim`)
- `:nightly` (users should migrate to `:1-bullseye-slim-nightly`)
- `:nodeX` (users should migrate to an image using a supported node version)
- `:nodeX-nightly` (users should migrate to a nightly image using a supported node version)

## Building

This docker image must be built from the package root with the Dockerfile set to
`superchain/Dockerfile`:

```
jsii$ docker build . -f superchain/Dockerfile -t jsii/superchain:local
```

In case the tests fail, skip the tests and inspect the image manually:

```
jsii$ docker build . -f superchain/Dockerfile -t jsii/superchain:local --target=superchain
```

## NodeJS and NPM

We build multiple versions of this image, for different versions of Node.
You can use a specific Node version like this:

```
public.ecr.aws/jsii/superchain:1-bullseye-slim-node20
```

We will stop publishing images for Node versions that are EOL.

| Debian                 | Node versions    |
| -----------------------| -----------------|
| `bookworm`             | `20`             |
| `bullseye`             | `20`, `18`       |
| `buster` (deprecated)  | `18`, `16`, `14` | 

If you are building this image from source, you can control the Node version with the
`NODE_MAJOR_VERSION` build argument:

```
jsii$ docker build [...] --build-arg NODE_MAJOR_VERSION=16
```

## Python

The image includes the most recent Python version available for the respecitve Debian distribution.
A complete list can be viewed on the [Debian website](https://wiki.debian.org/Python#Supported_Python_Versions).

| Debian                 | Python version |
| -----------------------| ---------------|
| `bookworm`             | `3.11`         |
| `bullseye`             | `3.9`          |
| `buster` (deprecated)  | `3.7`          |


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
