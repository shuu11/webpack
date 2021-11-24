const path = require('path');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const outputFile = '[name]';
const assetFile = '[name]';

const bs = {
  startPath: './dist/index.html',
};

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

  plugins: [
    new BrowserSyncPlugin({
      server: {
        baseDir: './',
      },
      startPath: bs.startPath,
      port: 3000,
      notify: false,
      open: 'external',
    }),
  ],

});
