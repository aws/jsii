// Require `mock-fs` before `jest` initializes, as `mock-fs`  relies on
// hijacking the `fs` module, which `jest` also hijacks (and that needs to
// happen last).
require('mock-fs');
