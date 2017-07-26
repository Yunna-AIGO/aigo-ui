require('babel-register')

const webpack = require('webpack');

const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('../webpack.dev.config');

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();

// Webpack developer
if (isDeveloping) {

    app.use(proxy((pathname, req) => {
        let regs = [/\.do$/, /\.json$/, /\.htm$/, /\.jsp$/];
        let flag = false;

        if (req.hostname == 'employee.cathay-ins.com.cn') {
            return false;
        }

        // 判断是否有扩展名
        if (/\./.test(pathname)) {
            regs.forEach((reg) => {

                if (reg.test(pathname)) {
                    flag = true;
                }
            })
        } else if(!/webpack/.test(pathname)){

            // 无扩展名
            flag = true;
        }
        return flag;
    }, {
        target: 'http://localhost:8090',
        changeOrigin: false
    }));


    const compiler = webpack(config);
    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    app.use(require('webpack-hot-middleware')(compiler));
}


//  RESTful API
const staticPath = path.resolve(__dirname, '../dist');
app.use(bodyParser.json({type: 'application/json'}))
app.use(express.static(staticPath));

//const port = isProduction ? (process.env.PORT || 80) : 3000;
const port = 80;

app.listen(port, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});




