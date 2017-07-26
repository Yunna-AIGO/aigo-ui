const fs = require('fs');
const webpackConfig = require('./webpack.config.js');
const PATH = webpackConfig.output.path;
const PUBLIC_PATH = webpackConfig.output.publicPath;

const path = require('path');
const async = require('async');
const md5 = require('md5');

function generateParallel(dirpath, files) {

    let callbacks = [];

    files.forEach((file) => {
        callbacks.push((callback) => {
            fs.readFile(path.join(dirpath, file), 'utf-8', callback);
        })
    });

    return callbacks;
}


// 1. 读取所有静态资源文件
fs.readdir(PATH, (err, files) => {

    let timestamp = {};
    async.parallel(generateParallel(PATH, files), (err, results) => {

        // 2. 对静态资源进行md5摘要时间戳
        results.forEach((data, i) => {
            timestamp[files[i]] = md5(data);
        });

        // TODO SOFA_LITE2 升级后此目录有调整
        let htmlDir = path.join(__dirname, './dist');
        let htmls = fs.readdirSync(htmlDir);

        // 3. 找到要处理的html文件，只保留htm, html, jsp文件
        htmls = htmls.filter((filename) => {
            if (/\.html$/.test(filename) || /\.jsp$/.test(filename) || /\.htm$/.test(filename)) {
                return true;
            }
        });

        // 4. 读取所有html文件
        async.parallel(generateParallel(htmlDir, htmls), (err, results) => {

            // 5. 对每个html文件进行路径匹配，匹配后进行路径时间戳替换
            results.forEach((htmlData, j) => {

                let flag = false;
                // 5.1 去除原有时间戳
                htmlData = htmlData.replace(/\?t=[0-9a-z]{32}/g, '');

                files.forEach((file) => {
                    let patten = PUBLIC_PATH + file;
                    if (~htmlData.indexOf(patten)) {
                        htmlData = htmlData.replace(patten, `${patten}?t=${timestamp[file]}`)
                        flag = true;
                    }
                });

                if (flag) {
                    fs.writeFile(path.join(htmlDir, htmls[j]), htmlData, (err) => {
                    })
                }

            })

        });

    })

});