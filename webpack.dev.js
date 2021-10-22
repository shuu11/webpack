const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const outputFile = '[name]';
const assetFile = '[name]';

module.exports = () => merge(commonConfig({outputFile,assetFile}) , {
  mode:"development",
  // watch:true,
  devtool: 'source-map',
});