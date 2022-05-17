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
  },
  output: {
    path: __dirname + '/webpack',
    iife: false,
  },
  devtool: 'source-map',
  target: 'node14.5',
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
