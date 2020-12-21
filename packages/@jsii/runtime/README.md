# @jsii/runtime

The JavaScript runtime host for jsii modules, part of the [jsii] project.

When a generated jsii module is used in one of the supported languages, the jsii
client spawns the __@jsii/runtime__ as a child process and instructs it to load
the javascript module into a node.js VM. Then, any interaction with proxy
classes, such as getting/setting properties or invoking methods is transmitted
via a simple STDIN/STDOUT protocol to the actual object hosted within the VM.

[jsii]: https://github.com/aws/jsii
[@jsii/kernel]: https://github.com/aws/jsii/tree/main/packages/@jsii/kernel

See [STDIN/STDOUT protocol](./lib/in-out.ts) and [@jsii/kernel
API](https://github.com/aws/jsii/blob/main/packages/@jsii/kernel/lib/api.ts)
for details.

## License

__jsii__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
