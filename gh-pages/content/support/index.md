# Maintenance & Support Policy

This page describes what you can expect from the parts of the jsii toolchain that are maintained in the
[`aws/jsii`](https://github.com/aws/jsii) repository.

The `jsii` compiler and `jsii-rosetta` are maintained in their own repositories, and have their own policies:

- [`aws/jsii-compiler`](https://github.com/aws/jsii-compiler/blob/main/SUPPORT.md)
- [`aws/jsii-rosetta`](https://github.com/aws/jsii-rosetta/blob/main/SUPPORT.md)

## Scope

This policy covers `jsii-pacmak`, which creates language-specific packages from jsii modules, and the runtime libraries
those packages depend on: `@jsii/python-runtime`, `@jsii/java-runtime`, `@jsii/dotnet-runtime` and `@jsii/go-runtime`.
The jsii kernel is bundled with the runtime libraries, so it is supported along with them.

The other tools in this repository, for example `jsii-diff` and `jsii-config`, are provided as-is and are not covered by
this policy.

## Versioning Scheme

All packages in this repository are released together under a single version, and follow
[Semantic Versioning](https://semver.org): breaking changes only come with a new major version.

You can count on the following:

- Packages created by `jsii-pacmak` work with the version of the runtime library they were created for.
- Newer runtime libraries keep working with packages created by older versions of `jsii-pacmak`.

`jsii-pacmak` uses `jsii-rosetta` to translate the code examples in your documentation. Only actively supported versions
of `jsii-rosetta` are supported. The supported versions are listed in the `package.json` of `jsii-pacmak`, and are
tested as part of every build.

## Platform Support

`jsii-pacmak` runs on Node.js and creates packages for Python, Java, .NET and Go. We support the versions of these that
are still supported by their own maintainers. Once a version reaches its end-of-life, we may stop testing against it and
drop support for it, without releasing a new major version.

- **Node.js**: A warning is shown when you use a version of Node.js that is unsupported, untested or past its
  end-of-life. The versions we test against are listed in the [user guides](../user-guides/lib-author/).
- **Languages**: The minimum version of each language is listed in the same
  [prerequisites](../user-guides/lib-author/#other-languages).
