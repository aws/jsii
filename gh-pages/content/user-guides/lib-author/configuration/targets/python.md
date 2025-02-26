# :fontawesome-brands-python: Python

The `python` target requires two configuration entries:

- `module` - the name of the generated **Python** module, which will be used by users in `import` directives.
- `distName` - the [PyPI] distribution name for the package.
- `classifiers` - a list of [trove classifiers] to declare on the package. It is the user's responsibility to specify
  _valid_ values (the authoritative list of valid [trove classifiers] is defined in the [pypa/trove-classifiers]
  package).
  - Some classifiers are automatically included (and should not be added to the `classifiers` property) based on
    relevant configuration from the `package.json` file:
    - `Development Status :: ` is determined based on the package's `stability`
    - `License ::` is determined based on the package's `license`
    - `Operating System :: OS Independent` is always set
    - `Typing :: Typed` is always set
  - Additionally, the following `Programming Language ::` classifiers are already set (more could be added by the user
    if relevant):
    - `Programming Language :: Python :: 3 :: Only`
    - `Programming Language :: Python :: 3.9`
    - `Programming Language :: Python :: 3.10`
    - `Programming Language :: Python :: 3.11`

Example:

```js
{
  "jsii": {
    "targets": {
      "python": {
        "module": "hello_jsii",   // Required
        "distName": "hello-jsii", // Required
        "classifiers": [          // Optional
          "Framework :: AWS CDK",
          "Framework :: AWS CDK :: 1"
        ]
      },
      // ...
    }
    // ...
  },
  // ...
}
```

The resulting package can be published to [PyPI].

[pypi]: https://pypi.org/
[trove classifiers]: https://www.python.org/dev/peps/pep-0301/#distutils-trove-classification
[pypa/trove-classifiers]: https://github.com/pypa/trove-classifiers

## Prerelease Versions

The original `npm` package may feature a version number that includes a [SemVer 2.0][semver]-compliant prerelease
identifer (e.g: `1.2.3-pre.4`). Python packages distributed to [PyPI] must however use a different format to express
prerelease versions, as specified in [PEP-440]. In order to generate valid packages, only certain prerelease identifiers
are accepted by `jsii-pacmak`, and are translated according to the following table:

| Source Version (`npm`) | Python Version ([PEP-440]) | Notes                            |
| ---------------------- | -------------------------- | -------------------------------- |
| `X.Y.Z-dev.N`          | `X.Y.Z.devN`               | Development, iteration `N`.      |
| `X.Y.Z-pre.N`          | `X.Y.Z.devN`               | Development, iteration `N`       |
| `X.Y.Z-alpha.N`        | `X.Y.Z.aN`                 | Alpha release, iteration `N`     |
| `X.Y.Z-beta.N`         | `X.Y.Z.bN`                 | Beta release, iteration `N`      |
| `X.Y.Z-rc.N`           | `X.Y.Z.rcN`                | Release candidate, iteration `N` |

[semver]: https://semver.org/spec/v2.0.0.html
[pep-440]: https://www.python.org/dev/peps/pep-0440/#pre-releases
