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

## Host Stack Traces

When using jsii from a non-JavaScript language (Python, Java, Go, .NET), stack
traces captured inside the kernel refer to JavaScript frames, which are not
useful to end users. The **host stack trace** feature allows language runtimes to
capture a stack trace on the host side and send it to the kernel, so that
downstream consumers (such as the AWS CDK) can report meaningful traces in the
user's language.

### Enabling

Set the environment variable `JSII_HOST_STACK_TRACES=1` to opt in. When
disabled (the default), no stack traces are captured and no additional data is
sent over the wire.

### Wire protocol

When enabled, the host runtime attaches a `$jsii.stacktrace` field to any
request sent to the kernel:

```json
{
  "api": "create",
  "fqn": "aws-cdk-lib.Stack",
  "args": [],
  "$jsii.stacktrace": [
    ["my_app/my_stack.py", 42, 0, "MyStack.__init__"],
    ["app.py", 12, 0, "<module>"]
  ]
}
```

Each frame is a tuple of `[file, line, column, function]`:

| Field    | Type   | Description                                           |
|----------|--------|-------------------------------------------------------|
| file     | string | Source file path (relative or absolute)               |
| line     | number | 1-indexed line number                                 |
| column   | number | 0-indexed column (0 if unavailable)                   |
| function | string | Qualified function name (e.g. `MyStack.__init__`)     |

Frames are ordered most-recent-first (matching V8 `Error.stack` convention).

### Kernel-side contract

The kernel extracts the `$jsii.stacktrace` field and stores it in a well-known
global before dispatching the request:

```js
globalThis[Symbol.for('jsii.context.hostStackTrace')]
```

This global is set before the kernel method executes and cleared immediately
after. JavaScript code running inside the kernel (e.g., CDK construct libraries)
can read this global to obtain the host-side stack trace without depending on any
jsii package.

## License

__jsii__ is distributed under the
[Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0).

See [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
