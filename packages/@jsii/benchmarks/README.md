# jsii Benchmarks

This package is meant to collect benchmarks for `jsii`, `jsii-pacmak`, and any other jsii packages sourced in TS. It
contains a basic benchmark runner in [`benchmark.ts`](lib/benchmark.ts) that uses the `perf_hooks` module in order to
time synchronous functions.

## Usage

There is a small CLI app wrapping calls to the benchmarks defined. To call the benchmarks:

```
yarn benchmark
```

To output benchmark run results to a json file, pass the `--output` option

```
yarn benchmark --output my-file.json
```

## Output Format

The output format is JSON and is used by the
[continous benchmark action](https://github.com/benchmark-action/github-action-benchmark) which tracks the results of
benchmarks over time.
