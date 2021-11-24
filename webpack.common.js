const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ProvidePlugin } = require('webpack');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const buildHtmlWebpackPlugins = require('./config/webpack/utils/buildHtmlWebpackPlugins.js');

const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, './src/js/**/*.js')],
  {
    ignore: path.resolve(__dirname, './src/js/**/_*.js'),
  }
)();

module.exports = ({ outputFile, assetFile }) => ({
  entry: entries,

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: `./js/${outputFile}.js`,
    chunkFilename: `./js/${outputFile}.js`,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `./image/[name].${assetFile}[ext]`,
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
    ...buildHtmlWebpackPlugins(entries, './src'),
    new MiniCssExtractPlugin({
      filename: `./css/${outputFile}.css`,
    }),
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      velocity: 'velocity-animate',
    }),

    new ESLintPlugin({
      fix: true,
    }),
  ],

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

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@scss': path.resolve(__dirname, './src/scss/'),
      '@image': path.resolve(__dirname, './src/image/'),
    },
  },
});
