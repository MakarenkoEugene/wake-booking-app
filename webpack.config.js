/* eslint-disable */
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
      '@public': path.resolve(__dirname, 'public/'),
      '@app': path.resolve(__dirname, 'src/app/'),
      '@libs': path.resolve(__dirname, 'src/app/libs/'),
      '@components': path.resolve(__dirname, 'src/app/components/'),
      '@hooks': path.resolve(__dirname, 'src/app/hooks/'),
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
    new DotenvPlugin({ path: isProduction ? ( process.env.STAGING ? '.env.staging' : '.env.production' ) : '.env' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title,
      version,
      // data: isProduction ? '<%- user %>' : '{"email":"maxim.sinyakov@ironsrc.com","isSuperAdmin":true,"roles":{}}',
      data: isProduction ? '<%- data %>' : '{"_id":"60390eec7ee4c206a1684f50","issueKey":"SPLWX-15506","__v":0,"accountManagerEmail":"danit.rossmann@ironsrc.com","advertiserEmail":"danit.rossmann@ironsrc.com","advertiserId":"134365","advertiserIdName":["134365 - TestAdvertiserUsers"],"advertiserName":"TestAdvertiserUsers","advertiserNameFreeText":null,"advertiserTier":"3","androidTitleBundleId":"8 Ball Pool - com.miniclip.eightballpool","androidTitleFreeText":null,"approvedPlatforms":null,"contentIssues":null,"creativePOC":null,"creativeURL":null,"creativeVersion":null,"csmEmail":"dror.szpiler@ironsrc.com","defaultOrientation":"landscape","demos":[{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15506-gallery-srcName-B/src/index.html","description":"srcName: regular version","id":"Version A"},{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15506-gallery-srcName-FSQ/src/index.html","description":"srcName: fullScreenQuick version","id":"Version B"},{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15506-gallery-srcName-SQ/src/index.html","description":"srcName: superQuick version","id":"Version C"}],"excludeDevices":null,"externalCreativeType":{"value":"Playable + End card","id":"20701"},"fileChecksum":null,"fileSize":null,"internalApprovers":[{"email":"danit.rossmann@ironsrc.com","status":"approved"}],"internalReviewComment":null,"internalReviewCommentId":null,"iosTitleBundleId":"Game Dev Tycoon - com.greenheartgames.gdtmobile","iosTitleFreeText":null,"isApprovalSkipped":false,"isFreeOrientation":true,"isLiveTitle":false,"isQaAllowedInParallel":false,"isQaFail":false,"isQaPass":true,"isRotatable":false,"issueType":"Playable","language":"20841","operationsEmail":"danit.rossmann@ironsrc.com","operationsManagerEmail":null,"orientation":null,"orientations":[{"value":"Portrait","id":"20725"}],"plaVariationsThatWentLive":[{"name":"danitCreativeName - ECP - gallery - srcName - FSQ - SPLWX-15506.html (UAP Creative ID: 387220) (UAP Asset ID: 798912 ios) - High Maturity, High CTR","selected":false}],"plaVariationsToUpload":[{"name":"srcName - B","selected":false},{"name":"srcName - FSQ","selected":true},{"name":"srcName - SQ","selected":false}],"priority":"Major","project":"SPLWX","protocol":null,"qaOwnerEmail":null,"rawStatus":{"name":"Available in UAP","id":"14634"},"squad":{"value":"Lightning","id":"21148"},"status":"availableInUAP","technicalIssues":null,"title":"Test - our first full flow","titleAppName":"Game Dev Tycoon","type":"iec","updated":"2020-12-28T10:16:25.000Z","uxIssues":null,"variationsLabels":{"defaultCreativeLabels":["hin_arrow"],"variation1":{"name":"srcName - FSQ","labels":["mech_xray"]},"variation2":{"name":"srcName - SQ","labels":[]},"variation3":{"name":"srcName - B","labels":null},"variation4":null,"variation5":null,"variation6":null,"variation7":null,"variation8":null,"variation9":null,"variation10":null},"variationsThatWentLive":[{"name":"danitCreativeName - IEC - gallery - srcName - FSQ - SPLWX-15506.html (UAP Asset ID: 798914 ios) - High Maturity","selected":false},{"name":"danitCreativeName - IEC - gallery - srcName - SQ - SPLWX-15506.html (UAP Asset ID: 798916 ios)","selected":false}],"variationsToUpload":[{"name":"srcName - B","selected":false},{"name":"srcName - FSQ","selected":true},{"name":"srcName - SQ","selected":true}],"vendor":null,"vendorOther":null,"state":"review","iecLabels":[],"paVariationLabels":[]}',
      publicPath: isDevelopment ? '/' : '/client/',
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'public/img'),
        to: path.resolve(__dirname, 'dist/assets/img'),
      }],
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
      'process.env.PUBLIC_PATH': JSON.stringify(isDevelopment ? '' : '/client'),
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
