'use strict';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode:               'production',
  devtool:            'source-map',
  target:             'node',
  output: {
    path:             `${__dirname}/dist`,
    filename:         'bundle.js',
    libraryTarget:    'umd',
  },
  externals:          [ nodeExternals() ],
  optimization: {
    minimize:         false,
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{ loader: 'ts-loader' }],
      },
      // All output '' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
};