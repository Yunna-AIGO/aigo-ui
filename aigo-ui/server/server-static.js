require('babel-register')

const webpack = require('webpack');

const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('../webpack.production.config');

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();


app.use(proxy((pathname, req)=> {
    let regs = [/\.do$/, /\.json$/, /\.htm$/,/\.jsp$/];
    let flag = false;

    // 判断是否有扩展名
    if(/\./.test(pathname)){
        regs.forEach((reg)=>{

            if(reg.test(pathname)){
                flag = true;
            }
        })
    }else{
        // 无扩展名
        flag = true;
    }
    return flag;
}, {
    target: 'http://10.253.24.155/',
    changeOrigin: false
}));


//  RESTful API

app.use(bodyParser.json({type: 'application/json'}))

app.use(express.static('dist'));


//const port = isProduction ? (process.env.PORT || 80) : 3000;
const port = 80;

app.listen(port, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});

