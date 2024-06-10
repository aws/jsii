# Python jsii runtime tests
## Development Iteration

When iterating on the jsii runtime for Python, the developer must run
`yarn build` before making a subsequent attempt at running `pytest` (e.g: via
`yarn test`). This is because the tests run on the code installed in `.env` and
this is updated only by `yarn build`.

Note also that stack traces from test failures will point to the `.env` tree,
so be careful when using IDE linkage to navigate to points of that trace.
