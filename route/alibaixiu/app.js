// 引入express框架
const express = require('express');
const router = express.Router();
// 引入数据库连接模块
require('./model/connect');
// 引入路径处理模块
const path = require('path');
// 引入session模块
var session = require('express-session');
// 处理文件上传
const formidableMiddleware = require('express-formidable');

// 开放静态资源
router.use(express.static(path.join(__dirname, 'public')));
// session配置
router.use(session({
    name: 'ali',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
}));
// 处理post参数
router.use(formidableMiddleware({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为2M
    maxFileSize: 2 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
}));


// 路由
require('./routes')(router);

module.exports = router;

