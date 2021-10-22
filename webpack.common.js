const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const glob = require('glob');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');

module.exports = ({ outputFile, assetFile }) => ({
  entry: WebpackWatchedGlobEntries.getEntries(
    [path.resolve(__dirname, './src/js/**/*.js')],
    {
      ignore: path.resolve(__dirname, './src/js/**/_*.js'),
    }
  )(),

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `./js/${outputFile}.js`,
    chunkFilename: `./js/${outputFile}.js`,
  },

  optimization: {
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /node_modules/i,
          name: 'vendor',
        },
        vendorsModules: {
          test: /src[\\/]js[\\/]modules/i,
          name: 'vendor-modules',
          minSize: 0,
          minChunks: 2,
        },
      },
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/i,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')({ grid: true })],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `./image/${assetFile}[ext]`,
        },
        type: 'asset/resource',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      inject: 'body',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/another.html'),
      filename: 'another.html',
      inject: 'body',
      chunks: ['another'],
    }),
    new WebpackWatchedGlobEntries(),
    new MiniCssExtractPlugin({
      filename: `./css/${outputFile}.css`,
    }),
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
});

