# `@jsii/check-node`

This package can be used to check whether the node runtime used to run an
application is known to be compatible with the `jsii` constellation of packages,
and emits a warning to `STDERR` in case this is not the case.

## Usage

Either import the `checkNode` function from the root of the package, and run it
wherever it makes sense (often at the entry point of command line tools):

```ts
import { checkNode } from '@jsii/check-node';

// ...
checkNode();
// ...
```

Alternatively, import `@jsii/check-node/run` in the location where the check
should be performed. This is particularly useful when some of the modules
imported by a command line tool may fail loading in unsupported runtimes, and
hence the check must run before these are imported.

```ts
import '@jsii/check-node/run';
```
