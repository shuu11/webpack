const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';

module.exports = () => merge(commonConfig({outputFile,assetFile}) , {
  mode:"production",
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },

});