const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const outputFile = '[name]';
const assetFile = '[name]';

module.exports = merge(common({ outputFile, assetFile }), {
  mode: 'development',
  // watch:true,
  devtool: 'source-map',

  devServer: {
    open: true,
    contentBase: './dist',
    watchOptions: {
      ignored: /node_modules/,
    },
  },
});
