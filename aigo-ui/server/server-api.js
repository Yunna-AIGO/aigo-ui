const webpack = require('webpack');
const open = require('open');
const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const fs = require('fs');
const app = express();

const CONFIG = {
    HOST: 'http://localhost:10000'
}

//  RESTful API


app.use(function (req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
});

let CURRENT_EDIT_FILE;
try {
    CURRENT_EDIT_FILE = fs.readFileSync('../apis/.yaml.default');
} catch (e) {
    CURRENT_EDIT_FILE = 'api.yaml';
}


let fileNames = [];
let indexHtml = '<body>hello</body>';

/************
 * PROJECT HOME
 * 扫描所有yaml文档，并自动生成目录
 */

(function () {
    let files = fs.readdirSync('../apis/docs');
    let navHtml = '<ol>';
    files.forEach((filename) => {
        if (/yaml$/.test(filename)) {
            navHtml += `<li><a href="javascript:void(0)" data-name="/docs/${filename}">${filename}</a></li>`;
            fileNames.push(filename);
        }
    });
    navHtml += '</ol>';

    indexHtml = fs.readFileSync('../apis/dist/index.html', {encoding: 'utf8'});
    indexHtml = indexHtml.replace(/PLACE_HOLDER_OF_NAV/, navHtml).replace(/PLACE_HOLDER_OF_FIRST_URL/, `${CONFIG.HOST}/docs/${CURRENT_EDIT_FILE}`);
}());

(function () {

    let configPath = '../../apis/editor/config/defaults.json';

    let defaultConfig = require(configPath);

    defaultConfig.exampleFiles = fileNames;

    fs.writeFileSync(path.join(__dirname, configPath), JSON.stringify(defaultConfig, null, 2));

}());

app.get('/dist/', function (req, res, next) {
    res.send(indexHtml);
});


// TODO sample文档时，需切换上下文
// yaml
app.get('/editor/spec/:file', function (req, res, next) {
    let file = req.params.file;

    CURRENT_EDIT_FILE = file;

    let fileData = fs.readFileSync(`../apis/docs/${CURRENT_EDIT_FILE}`);

    res.send(fileData);
});

// 获取第一个文档
// yaml
app.get('/editor/spec', function (req, res, next) {
    let str = fs.readFileSync(`../apis/docs/${CURRENT_EDIT_FILE}`);
    res.send(str);
});


// TODO $ref外部文档时，不切换上下文
// yaml
app.get('/editor/:file', function (req, res, next) {
    let file = req.params.file;

    let fileData = fs.readFileSync(`../apis/docs/${file}`);

    res.send(fileData);
});



// 更新yaml文档
app.put('/editor/spec', function (req, res, next) {
    let stream = fs.createWriteStream(`../apis/docs/${CURRENT_EDIT_FILE}`);
    req.pipe(stream);

    stream.on('finish', function () {
        res.end('ok');
    })
});


/**************
 * 客户端处理，处理域名
 */
app.use('/dist/custom.js', function (req, res) {
    let fileData = fs.readFileSync(`../apis/dist/custom.js`, {encoding: 'utf8'});

    fileData = fileData.replace(/PLACE_HOLDER_OF_HOST/, CONFIG.HOST);
    res.send(fileData);
});


app.use(express.static('../apis'));


//const port = isProduction ? (process.env.PORT || 80) : 3000;
const port = 10000;

app.listen(port, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Server running on port ' + port);
});


open("http://localhost:10000/dist/");