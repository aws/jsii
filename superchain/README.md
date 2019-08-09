# Superchain
An [`amazonlinux:2`][al2]-based Docker image bundling all the SDKs and tools
required in order to package [jsii] projects in all supported languages.

[al2]: https://hub.docker.com/_/amazonlinux
[jsii]: https://github.com/aws/jsii

## Included Language SDKs

SDK             | Version
----------------|-------------------------------------------
`OpenJDK 8`     | Amazon Corretto `>= 8.222.10.2`
`.NET Core`     | `>= 2.2.301` and `mono >= 6.0.0.319`
`Javascript`    | `node >= 8.16.0` with `npm >= 6.8.0`
`PowerShell`    | `pwsh >= 6.2.2`
`Python 3`      | `python3 >= 3.7.3` with `pip3 >= 19.1.1`
`Ruby`          | `ruby >= 2.4.4p296`

## Included Tools & Utilities

Tool / Utility | Version
---------------|-----------------
`bundler`      | `>= 1.17.2` and `>= 2.0.2`
`gcc`          | `>= 7.3.1`
`docker`       | `>= 18.06.1-ce`
`git`          | `>= 2.17.2`
`make`         | `>= 3.82`
`rsync`        | `>= 3.1.2-4`
`zip` & `unzip`| `>= 6.0-19`

## License

Amazon Linux is available under the [GNU General Public License, version
2.0][gpl2.0]. Individual software packages are available under their own
licenses; `run rpm -qi [package name]` or check
`/usr/share/doc/[package name]-*` and `/usr/share/licenses/[package name]-*` for
details.

As with all Docker images, these likely also contain other software which may be
under other licenses (such as Bash, etc from the base distribution, along with
any direct or indirect dependencies of the primary software being contained).

Some additional license information which was able to be auto-detected might be
found in [the repo-info repository's `amazonlinux/` directory][repo-info-al2].

As for any pre-built image usage, it is the image user's responsibility to
ensure that any use of this image complies with any relevant licenses for all
software contained within.

[gpl2.0]: https://github.com/aws/amazon-linux-docker-images/blob/master/LICENSE
[repo-info-al2]: https://github.com/docker-library/repo-info/tree/master/repos/amazonlinux
