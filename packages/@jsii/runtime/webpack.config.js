const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'production',
  entry: {
    main: {
      import: './lib/program.js',
      filename: 'jsii-runtime.js',
    },
    worker: {
      import: './lib/sync-reader/worker.js',
      filename: 'sync-reader/worker.js',
    },
  },
  output: {
    path: __dirname + '/webpack',
    iife: false,
  },
  devtool: 'source-map',
  target: 'node10.3',
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
          compress: false,
          format: {
            beautify: true,
            comments: 'some',
          },
          mangle: false,
        },
        extractComments: false,
      }),
    ],
  },
};
