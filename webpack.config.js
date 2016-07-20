const cssnext = require('postcss-cssnext');

const __DEV__ = process.env.NODE_ENV !== 'production';

var config = {
    entry: {
        'buttons': [
            './src/buttons.js',
        ],
    },
    output: {
        library: 'socialshares',
        libraryTarget: 'umd',
        filename: './dist/[name].js',
    },
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
                loader: 'style!css!postcss',
            },
            {
                test:   /\.svg$/,
                loader: 'svg-inline',
            },
        ],
    },
    postcss: function () {
        return [cssnext];
    },
};

if (__DEV__) {
    config.devtool = 'source-map';
}

module.exports = config;
