var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractCSS = new ExtractTextPlugin('[name].css');
var cssLoader = extractCSS.extract('style', 'css');
var lessLoader = extractCSS.extract('style', ['css', 'less']);


module.exports = {
    entry: {
        'bundle': [
            './src.pc/index'
        ]
        // ,'bundle-sale': [
        //     './src.pc/SaleApp/saleRouter'
        // ],
    },
    output: {
        path: path.join(__dirname, 'dist/bops'),
        filename: '[name].js',
        publicPath: '/bops/'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        extractCSS,
        new AssetsPlugin({fullPath: false})
    ],
    resolve: {
        extensions: ['', '.web.js', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.json$/,
                loaders: ['json-loader'],
                exclude: /node_modules/,
                include: __dirname
            },
            {
                test: /\.less?$/,
                loader: lessLoader,
                include: __dirname
            },
            {
                test: /\.css?$/,
                loader: cssLoader,
                include: __dirname
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'url',
                query: {limit: 10240}
            }
        ]
    }
};
