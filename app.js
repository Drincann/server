const express = require('express');
const path = require('path');
const https = require('https');
const http = require('http');
const fs = require('fs');
// server
const options = {
    key: fs.readFileSync(path.join(__dirname, 'https', 'server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'https', 'server.crt'))
};
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);
module.exports = app;

// 一级路由
const router = {
    db: require(path.join(__dirname, 'route', 'db', 'app')),
    template: require(path.join(__dirname, 'route', 'template', 'app')),
    blog: require(path.join(__dirname, 'route', 'blog', 'app')),
    todo: require('./route/todo/app'),
    ali: require('./route/alibaixiu/app'),
    faceWrap: require('./route/faceWrap/app'),
    // query: require('./route/query/app'), // 接口失效
    noteServer: require('./route/noteServer/app'),
    checkIn: require('./route/checkIn/app'),
};

// https 重定向
app.use(require('./middleware/httpsRedirect'));

// 静态资源
app.use(express.static(path.join(__dirname, '../', 'Web')));

// 路由
app.use('/db', router.db);
app.use('/template', router.template);
app.use('/blog', router.blog);
app.use('/todo', router.todo);
app.use('/ali', router.ali);
app.use('/faceWrap', router.faceWrap);
app.use('/query', router.query);
app.use('/note', router.noteServer);
app.use('/checkIn', router.checkIn);
// 404
app.use(require('./route/notFound'));

// listen
httpServer.listen(80, () => {
    console.log(' \033[42;2m Server \033[0m 服务端开始监听端口 80');
});
httpsServer.listen(443, () => {
    console.log(' \033[42;2m Server \033[0m 服务端开始监听端口 443');
});