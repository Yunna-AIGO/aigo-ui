var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var customConfig = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
            },
            compress: {
                warnings: false
            }
        })
    ]
};

webpackConfig.plugins = webpackConfig.plugins.concat(customConfig.plugins);

module.exports = webpackConfig;
