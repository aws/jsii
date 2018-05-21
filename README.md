# jsii

__jsii__ is a common JavaScript runtime which enables reusing JavaScript modules
from across multiple programming languages.

__jsii__ creates type-annotated bundles which can be used to auto-generate
idiomatic class libraries in a variety of target languages. Generated types
proxy calls to a JavaScript VM, effectively allowing __jsii__ modules to be
"written once and run everywhere".

Due to performance of the hosted javascript engine and marshaling costs,
__jsii__ modules are likely to be used for development and build tools, as
oppose to performance-sensitive runtime behavior.

## License

This library is distributed under the
[Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0),
see [LICENSE](./LICENSE) and [NOTICE](./NOTICE) for more information.
