const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const cssnext = require('postcss-cssnext');
const postcssEach = require('postcss-each');

const __DEV__ = process.env.NODE_ENV !== 'production';

var config = {
    entry: {
        'socialshares': [
            './src/socialshares.js',
        ],
    },
    output: {
        library: 'socialshares',
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
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test:   /\.css$/,
                loaders: ['style/useable?insertAt=top&singleton', 'css', 'postcss'],
            },
            {
                test:   /\.svg$/,
                loader: 'svg-inline',
            },
        ],
    },
    postcss: function () {
        return [postcssEach, cssnext];
    },
};

if (__DEV__) {
    config.plugins.push(
        new OpenBrowserPlugin({
            url: 'http://localhost:3000',
        })
    );
    config.devtool = 'source-map';
}

module.exports = config;
