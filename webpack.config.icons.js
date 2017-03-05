'use strict'

const webpack = require('webpack')

const icons = ['email', 'facebook', 'googleplus', 'linkedin', 'pinterest', 'reddit', 'slack', 'tumblr', 'twitter', 'vk', 'more']

var config = {
  entry: {/* see bottom of file */},
  output: {
    library: ['socialshares']['[name]Icon'],
    libraryTarget: 'umd',
    umdNamedDefine: true,
    path: './build/icons',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline',
      },
    ],
  },
}

for (let icon of icons) {
  config.entry[icon] = `./src/icons/${icon}.js`
}

module.exports = config
