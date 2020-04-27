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