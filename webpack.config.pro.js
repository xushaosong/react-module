/**
 * Created by xss on 2017/6/9.
 */


// 线上部署环境
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const pkg = require('./package.json');
const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
  entry: {
    index: './app/root/index.js',
  },
  output: {
    filename: '[hash].[name].bundle.js',
    path: path.resolve(__dirname, pkg.out_name),
    pathinfo: true,
    publicPath: '',
    sourceMapFilename: '[hash].map',
    chunkFilename: '[hash].[name].bundle.js',
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      zepto: path.resolve(__dirname, './node_modules/zepto/dist/zepto.js'),
      'hashHistory': path.resolve(__dirname, './node_modules/react-router/lib/hashHistory.js')
    },
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('[name].[hash].css'),

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
      inject: 'body',
      minify: {
        removeComments: true,        //去注释
        collapseWhitespace: true,    //压缩空格
        removeAttributeQuotes: true  //去除属性引用
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
      chunksSortMode: 'dependency'
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$|\.css$/,
      threshold: 10240,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
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
    }, {
      test: /\.bundle\.js$/,
      use: {
        loader: 'bundle-loader',
        options: {
          name: 'my-chunk'
        }
      }
    }]
  },
};