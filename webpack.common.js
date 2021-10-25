const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const buildHtmlWebpackPlugins = require('./config/webpack/utils/buildHtmlWebpackPlugins.js');

const bs = {
  startPath: './dist/index.html',
};

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
    alias: {
      '@scss': path.resolve(__dirname, './src/scss/'),
      '@image': path.resolve(__dirname, './src/image/'),
    },
  },

  devServer: {
    open: true,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/i,
        use: [
          'babel-loader',
          // 'eslint-loader',
        ],
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
    ...buildHtmlWebpackPlugins(entries, './src'),
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
