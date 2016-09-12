'use strict'

const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const stylelint = require('stylelint')
const cssnext = require('postcss-cssnext')
const postcssEach = require('postcss-each')
const args = require('yargs').argv

const __DEV__ = process.env.NODE_ENV !== 'production'

var config = {
  entry: {
    'socialshares': [
      './src/socialshares.js',
    ],
  },
  output: {
    library: ['[name]'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: './build',
    filename: '[name].js',
  },
  plugins: [
    new webpack.BannerPlugin(
      'socialshares v{VERSION} - https://socialshar.es'
    ),
    new HtmlPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(__DEV__ ? 'development' : 'production'),
      },
    }),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loaders: ['babel', 'eslint'],
      },
      {
        test: /\.css$/,
        loaders: ['style/useable?insertAt=top&singleton', 'css', 'postcss'],
      },
      {
        test: /\.svg$/,
        loader: args['exclude-icons'] ? 'null' : 'svg-inline',
      },
    ],
  },
  postcss: () => {
    return [stylelint, postcssEach, cssnext]
  },
}

if (__DEV__) {
  config.plugins.push(
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 3000,
        // Proxy Webpack Dev Server
        proxy: 'http://localhost:3100/',
      },
      {
        // Prevent BrowserSync from reloading the page
        // and let Webpack Dev Server take care of this
        reload: false,
      }
    )
  )
  config.devtool = 'source-map'
}

module.exports = config
