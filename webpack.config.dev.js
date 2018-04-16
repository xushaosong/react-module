/**
 * Created by xss on 2017/6/9.
 */


// 接口联调环境
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const APPConfig = require('./app/root/app_config.js');

module.exports = {
  entry: {
    index: './app/root/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, pkg.out_name),
    pathinfo: true,
    publicPath: '',
    sourceMapFilename: '[file].map',
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  // performance: {
  //   hints: "warning"
  // },
  devtool: 'eval',
  resolve: {
    alias: {
      zepto: path.resolve(__dirname, './node_modules/zepto/dist/zepto.js'),
      'hashHistory': path.resolve(__dirname, './node_modules/react-router/lib/hashHistory.js')
    },
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         chunks: 'initial',
  //         minChunks: 2, maxInitialRequests: 5,
  //         minSize: 0
  //       },
  //       vendor: {
  //         test: /node_modules/,
  //         chunks: 'initial',
  //         name: 'vendor',
  //         priority: 10,
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  plugins: [

    new webpack.DefinePlugin({
      'process.env.NODE_ENV':'"dev"'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[hash].css'),


    new webpack.ProvidePlugin({
      $: 'zepto',
      zepto: 'zepto',
      'window.zepto': 'zepto',
      'global.zepto': 'zepto',
    }),
    new webpack.ProvidePlugin({
      hashHistory: 'hashHistory',
      'window.hashHistory': 'hashHistory',
      'global.hashHistory': 'hashHistory'
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        compress: true,
        output: {
          comments: false,
          beautify: false,
        }
      },
    }),
    new HtmlWebpackPlugin({
      title: '国信联盟',
      filename: 'index.html',
      template: './app/src/page/index.ejs',
      chunks: ['index', 'zepto'],
      inject: 'body',
    }),
  ],
  module: {
    // noParse: 忽略大型库文件(library)可以提高构建性能。noParse: /jquery|lodash/
    rules: [{
      test: /\.(less|css)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }, {
      test: /\.(png|jpg|gif|svg|ttf|woff2)(#[a-zA-Z])*$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]'
        }
      }]
    }, {
      test: /\.(html|htm)$/,
      use: [{
        loader: 'html-loader',
      }]
    }, {
      test: /\.(woff|eot)(#[a-zA-Z])*$/,
      use: ['file-loader']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
          plugins: [
            ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
          ]
        }
      }]
    }, {
      test: require.resolve('zepto'),
      use: [{
        loader: 'exports-loader?window.$'
      }, {
        loader: 'script-loader'
      }]
    }]
  },
  devServer: {
    disableHostCheck: true,
    hot: true,
    inline: true,
    port: APPConfig.APPSetting.webpack_dev_port,
    host: APPConfig.APPSetting.webpack_dev_host,
    proxy: {
      '/jmiou/*': {
        target: APPConfig.APPSetting.webpack_dev_api,
        ingorePath: false,
        changeOrigin: true,
        secure: false
      }

    }

  }
};