import { buildSync, formatMessagesSync } from 'esbuild';
import { resolve } from 'path';

const result = buildSync({
  bundle: true,
  entryPoints: ['bin/jsii-runtime.js', 'lib/program.js'],
  outdir: resolve(__dirname, '..', 'webpack'),
  minify: false,
  platform: 'node',
  sourcemap: 'linked',
  target: 'node12',
});

for (const formattedMessage of formatMessagesSync(result.warnings, {
  kind: 'warning',
  color: process.stderr.isTTY,
})) {
  console.error(formattedMessage);
}

for (const formattedMessage of formatMessagesSync(result.errors, {
  kind: 'error',
  color: process.stderr.isTTY,
})) {
  console.error(formattedMessage);
}

if (result.errors.length > 0) {
  process.exitCode = 1;
}
