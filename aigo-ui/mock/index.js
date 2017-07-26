var path = require('path');


module.exports = (app) => {

    const menus = require('./src/menu.json');
    app.post('/api/menu.json', function (req, res) {
        res.json({
            menus: menus
        });
    });

    app.post('/api/logout', function (req, res) {
        res.clearCookie('uid');
        res.json({'user': 'admin', 'role': 'ADMIN'});
    });

	app.use(require('./ajaxURLs').reduce((router,v)=>router.all(v[0],(req,res,next)=>typeof v[1]==='string'&&v[1]?require('http').request({
		host:v[1].replace('http://',''),
		port:v[2],
		path:req.path+'?'+require('querystring').stringify(req.query),
		method:req.method,
		headers:req.headers,
	},proxy=>(data=>proxy.on('data',chunk=>data.push(chunk)).on('end',a=>res.status(proxy.statusCode).set(proxy.headers).end(Buffer.concat(data))))([])).on('error',e=>res.end('代理错误 '+e)).end(JSON.stringify(req.body)):res.json(typeof v[1]==='function'?v[1](req.query,req.body,req.method,req.headers,req.params):v[1])),require('express').Router()))

    const examine = require('./src/examine.json');
    app.post('/api/v1/reports/initExamine', function (req, res) {
        res.json({
            data: examine
        });
    });

    const examineApproval = require('./src/examineApproval.json');
    app.post('/api/v1/reports/updateExamineApprovalOpinion', function (req, res) {
        res.json({
            data: examineApproval
        });
    });
}