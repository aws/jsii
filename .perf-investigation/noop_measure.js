// Injected into the jsii kernel (Node) via NODE_OPTIONS=--require.
// Neutralizes perf_hooks performance.measure so the global measure buffer
// never grows. Tests whether the aws-cdk-lib perf_hooks instrumentation is
// the cause of the superlinear synth slowdown.
try {
  const { performance } = require('perf_hooks');
  performance.measure = function () { return undefined; };
  if (performance.clearMeasures) {
    const orig = performance.clearMeasures.bind(performance);
    performance.clearMeasures = function () { return orig(); };
  }
  // Signal (to stderr) that the patch loaded.
  process.stderr.write('[noop_measure] performance.measure neutralized\n');
} catch (e) {
  process.stderr.write('[noop_measure] failed: ' + e + '\n');
}
