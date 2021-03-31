import { build } from 'esbuild';
import { resolve } from 'path';
import * as process from 'process';

build({
  absWorkingDir: resolve(__dirname, '..'),
  bundle: true,
  charset: 'utf8',
  entryPoints: {
    'bin/jsii-runtime': 'bin/jsii-runtime.js',
    'lib/program': 'lib/program.js',
  },
  format: 'cjs',
  outdir: resolve(__dirname, '..', 'webpack'),
  platform: 'node',
  sourcemap: 'external',
  target: 'node10.3',
  // Minify
  keepNames: true,
  minifyIdentifiers: false,
  minifySyntax: true,
  minifyWhitespace: false,
}).then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(-1);
  },
);
