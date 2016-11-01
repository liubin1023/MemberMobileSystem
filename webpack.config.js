const webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx',
  ],

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.web.js', '.json', '.js', '.jsx'],
  },

  module: {
    loaders: [  // 似乎react-hot-loader失效了
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      }, {
        test: /\.less$/,
        include: /node_modules/,
        loader: 'style!css!postcss!less',
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'url?limit=25000',
      },
    ],
  },

  postcss: function () {
    return [pxtorem({
      rootValue: 100,
      propWhiteList: [],
      selectorBlackList: [/^html$/, /^\.ant-/, /^\.github-/, /^\.gh-/]
    })];
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.BannerPlugin('This file is created by jxy'),
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'production' ? 'false' : 'true')),
    }),
  ],
};
