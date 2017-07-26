var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var customConfig = {
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};


webpackConfig.plugins = webpackConfig.plugins.concat(customConfig.plugins);
webpackConfig.devtool = customConfig.devtool;


// 热加载client
Object.keys(webpackConfig.entry).forEach(key=> {
    var item = webpackConfig.entry[key];
    item.unshift('webpack-hot-middleware/client');
});


module.exports = webpackConfig;
