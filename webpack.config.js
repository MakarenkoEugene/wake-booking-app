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
      '@utils': path.resolve(__dirname, 'src/app/utils/'),
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
    new DotenvPlugin({ path: '.env' }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title,
      version,
      data: isProduction ? '<%- data %>' : `{"_id":"6061a6649dfa370101e5231f","advertiserIdName":["134365 - TestAdvertiserUsers"],"plaVariationsToUpload":[{"name":"base - B","selected":false},{"name":"base - FSQ","selected":false},{"name":"base - SQ","selected":true}],"issueType":"Playable","plaVariationsThatWentLive":[],"excludeDevices":null,"advertiserEmail":"eugene.makarenko@ironsrc.com","fileChecksum":null,"orientation":null,"titleAppName":"Game Dev Tycoon","updated":"2021-03-26T14:05:52.000Z","advertiserName":"TestAdvertiserUsers","isLiveTitle":false,"squad":{"value":"Lightning","id":"21148"},"advertiserTier":"3","isQaFail":false,"priority":"Major","externalCreativeType":{"value":"Playable + End card","id":"20701"},"orientations":[{"value":"Portrait","id":"20725"}],"creativeURL":null,"vendorOther":null,"vendor":null,"protocol":null,"creativePOC":null,"creativeVersion":null,"internalApprovers":[{"email":"volodymyr.maksymchuk@ironsrc.com","status":"pending"},{"email":"plwx@ironsrc.com","status":"approved"}],"androidTitleFreeText":null,"androidTitleBundleId":"Game Dev Tycoon - com.greenheartgames.gdt","iosTitleFreeText":null,"iosTitleBundleId":"Game Dev Tycoon - com.greenheartgames.gdtmobile","advertiserNameFreeText":null,"fileSize":null,"isApprovalSkipped":false,"isQaAllowedInParallel":false,"isQaPass":false,"status":"internalApprovalCont","advertiserId":"134365","isFreeOrientation":true,"defaultOrientation":"portrait","linksToCreatives":[],"variationsThatWentLive":[],"variationsToUpload":[{"name":"base - B","selected":false},{"name":"base - FSQ","selected":true},{"name":"base - SQ","selected":true}],"title":"yuyuuyuy","language":"20841","contentIssues":null,"technicalIssues":null,"uxIssues":null,"internalReviewCommentId":null,"rawStatus":{"name":"internal approval cont.","id":"14519"},"demos":[{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15729-tapper-base-B/src/index.html","description":"regular version","id":"Version A"},{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15729-tapper-base-SQ/src/index.html","description":"superQuick version","id":"Version B"},{"url":"https://pwcreatives.s3.amazonaws.com/democreatives-staging/TestAdvertiserUsers-134365/Game%20Dev%20Tycoon/iec/SPLWX-15729-tapper-base-FSQ/src/index.html","description":"fullScreenQuick version","id":"Version C"}],"isRotatable":false,"variationsLabels":{"defaultCreativeLabels":["mech_scratch","mech_drag and drop"],"variation1":{"name":"base - B","labels":["mech_xray"]},"variation2":{"name":"base - FSQ","labels":[]},"variation3":{"name":"base - SQ","labels":[]}},"issueKey":"SPLWX-15729","project":"SPLWX","type":"iec","csmEmail":"michael.kopelovich@ironsrc.com","accountManagerEmail":"eugene.makarenko@ironsrc.com","operationsEmail":"Emmanuel.Bergman@ironsrc.com","__v":0,"state":"internalIEC","approversMessage":"","approver":"dm9sb2R5bXlyLm1ha3N5bWNodWtAaXJvbnNyYy5jb20=","iecLabels":["mech_scratch","mech_drag and drop","mech_xray","mech_swipe","mech_tap","mech_tap&hold","desi_no title","desi_with button in main frame","desi_animated BG","desi_animated Character","desi_animated extra elements","desi_juicy button","desi_intro","desi_fake level endframe","main_weapons","main_character - male","main_character - female","main_character - animal","main_cars","main_skins","main_gold and money","main_real money","them_seasonal","them_sports","them_action","them_puzzle","them_rpg","them_racing","them_asmr","them_runner","int_1","int_2","int_3","int_4","int_5","int_6","int_7","int_8","int_9","int_10","conc_gameplay","conc_misleading gameplay","conc_unauthentic gameplay","conc_cinematic","conc_skins","conc_multi choice","conc_multi level","conc_long(8s+)","conc_long(15s+)","conc_long(20s+)","conc_always fail","conc_always win","conc_short(7or less)","conc_hitOrMiss","conc_poster","hin_static pointer","hin_animated pointer","hin_arrow","hin_text only","hin_fingerprint","hin_glowing button","hin_pedal","hin_lever","hin_customised","sys_ab test","sys_localised","sys_refresh","sys_fix","sys_endtimer(20)","them_lucky","them_idle","them_dating","them_finance","them_word","them_renovation","them_cards","them_casino","them_kids","them_io","them_arcade","them_simulation","them_shooter"]}`,
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
