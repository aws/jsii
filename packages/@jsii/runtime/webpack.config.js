const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    wrapper: {
      import: './bin/jsii-runtime.js',
      filename: 'bin/jsii-runtime.js',
    },
    program: {
      import: './lib/program.js',
      filename: 'lib/program.js',
    },
    // Worker entry that builds the kernel's runtime index off the main thread.
    // Emitted as a sibling of program.js so the kernel can start it via
    // `new Worker(join(__dirname, 'runtime-index-worker.js'))`. The module
    // self-executes on a worker thread (it is guarded by `!isMainThread`).
    'index-worker': {
      import: '@jsii/kernel/lib/runtime-index-worker',
      filename: 'lib/runtime-index-worker.js',
    },
  },
  output: {
    path: __dirname + '/webpack',
    iife: false,
  },
  devtool: 'source-map',
  experiments: {
    // Webpack >= 5.109 auto-enables built-in TypeScript support (type
    // stripping) on Node.js >= 22.6, which makes it resolve the `.ts` sources
    // living next to the compiled `.js` in `lib/`. We bundle the pre-compiled
    // output, so keep this disabled.
    typescript: false,
  },
  target: 'node12', // Continue to target node 12 so that check-node does not fail to load on it.
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
          compress: true,
          format: {
            comments: 'some',
          },
          mangle: {
            keep_classnames: true,
            keep_fnames: true,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
