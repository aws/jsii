# jsii-pacmak

Generates ready-to-publish language-specific packages for jsii modules, part of
the [jsii] project.

[jsii]: https://github.com/aws/jsii

## Usage

In general, running `jsii-pacmak` from a well-configured jsii module would generate and
build a ready-to-publish package in each of the target languages defined in `package.json`.

* See [Getting Started](https://github.com/aws/jsii/blob/main/README.md#getting-started) for more details.
* Run `jsii-pacmak --help` for full usage.

## Target plugins (experimental)

`--plugin` loads a target for a language jsii does not ship, from an npm package or a path:

```sh
jsii-pacmak --plugin jsii-target-example -t example -o dist
```

A plugin target is generated for every package, whether or not its `package.json` configures
that language. Built-in targets are unaffected.

A plugin module's default export declares:

```ts
import { TargetPluginDeclaration } from 'jsii-pacmak/lib/plugin-api';

export default {
  targetName: 'example',
  pluginApiVersion: '0.1.0', // the PLUGIN_API_VERSION the plugin was written against
  targetConstructor: ExampleTarget, // or builderFactory, for full control of the build
} satisfies TargetPluginDeclaration;
```

A plugin may import from `jsii-pacmak/lib/plugin-api` only. Everything else in this package is
internal and may change in any release.

The plugin API is versioned by `PLUGIN_API_VERSION`. While it is 0.x, it is experimental: any
minor release may break plugins, and a plugin loads only when its declared major and minor
versions both match. Plugins, and the bindings they generate, are maintained and supported by
their authors, not by the jsii project.

## Contributing

See [CONTRIBUTING](https://github.com/aws/jsii/blob/main/CONTRIBUTING.md)
for details.

## License

__jsii__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
