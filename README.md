# vue-study-demo
手撸vue源码模板

##### 1、目录结构
 ```
│  package.json
│  webpack.config.js
│
├─src
│       myVue.js
│
└─test
        index.html
        main.js
 ```
 ##### 2、安装依赖
 ```
 npm i -D webpack webpack-cli webpack-dev-server babel-loader html-webpack-plugin
 ```
 ```
 npm i -D @babel/core @babel/preset-env
 ```
 ##### 3、webpack.config.js 配置
 ```
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const resolve = (pathName) => path.resolve(__dirname, pathName)

module.exports = {
  mode: 'development',
  entry: {
    myVue: resolve('src/myVue.js'),
    main: resolve('test/main.js'),
  },
  performance: {
    hints: false
  },
  output: {
    path: resolve('dist'),
    filename: '[name][hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: resolve('dist'),
    port: 8081,
    open: true,
    hot: true,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('test/index.html')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HashedModuleIdsPlugin()
  ]
}
 ```