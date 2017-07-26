require('babel-register');

const webpack = require('webpack');

const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('../webpack.dev.config');

const app = express();

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
}));

app.use(require('webpack-hot-middleware')(compiler));

//  RESTful API
app.use(bodyParser.json({type: 'application/json'}));


//const port = isProduction ? (process.env.PORT || 80) : 3000;
const port = 80;

app.listen(port, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});


/*******
 * below mock html and apis
 */

require('../mock/index.js')(app);

const staticPath = path.resolve(__dirname, '../dist');
app.use(express.static(staticPath));

const apis = require('../mock/index.json');

Object.keys(apis).forEach((key)=> {

    var method = 'POST',
        url = key;

    if (/GET:/.test(key)) {
        method = 'GET';
        url = key.slice(4);
    } else if (/POST:/.test(key)) {
        url = key.slice(5);
    }

    if (method == 'POST') {
        app.post(url, function (req, res) {
            res.json(apis[key]);
        });
    } else {
        app.get(url, function (req, res) {
            res.json(apis[key]);
        });
    }

});


