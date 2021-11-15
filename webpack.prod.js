const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const outputFile = '[name].[chunkhash]';
const assetFile = '[contenthash]';

module.exports = merge(common({ outputFile, assetFile }), {
  mode: 'production',

  plugins: [
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: [60 - 70], // 画質
        speed: 1, // スピード
      },
      gifsicle: {
        optimizationLevel: 3, // 圧縮率
      },
      plugins: [
        ImageminMozjpeg({
          quality: 65, // 画質
        }),
      ],
    }),
  ],

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
