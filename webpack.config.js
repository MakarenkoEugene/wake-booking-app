const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const argv = require('minimist')(process.argv.slice(2));
const { title, version } = require('./package.json');

const isProduction = argv.mode === 'production';
const isDevelopment = !isProduction;

module.exports = {
  devtool: isDevelopment ? 'cheap-module-source-map' : false,

  entry: path.join(__dirname, 'src/index.jsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[contenthash:8].js',
    publicPath: isDevelopment ? '/' : '/client/',
  },

  resolve: {
    extensions: ['.js', '.jsx'],

    alias: {
      '@app': path.resolve(__dirname, 'src/app/'),
      '@libs': path.resolve(__dirname, 'src/app/libs/'),
      '@components': path.resolve(__dirname, 'src/app/components/'),
      '@store': path.resolve(__dirname, 'src/app/store/'),
      'react-dom': '@hot-loader/react-dom',
    },
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: isProduction ? 'production' : 'development',
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jp(e?)g|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    isProduction && (
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].[contenthash:8].css',
        chunkFilename: 'assets/css/[name].[contenthash:8].chunk.css',
      })
    ),
    new CleanWebpackPlugin(),
    new DotenvPlugin({ path: isProduction ? '.env.production' : '.env' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title,
      version,
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public/img'),
        to: path.resolve(__dirname, 'dist/assets/img'),
      }],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        isProduction ? 'production' : 'development',
      ),
    }),
  ].filter(Boolean),
  devServer: {
    port: 8080,
    compress: true,
    historyApiFallback: true,
    open: false,
    overlay: true,
    hot: true,
  },
};
