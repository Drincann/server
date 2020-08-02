const path = require('path');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const dateFormat = require('dateformat');
const template = require('art-template');
const morgan = require('morgan');
const config = require('config');
const bodyParser = require('body-parser');

// 数据库
require('./model/connect');
// 获取 express 对象
const app = require('../../app');

// 模板引擎
template.defaults.imports.dateFormat = dateFormat;
app.engine('art', require('express-art-template'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// 生产环境
console.log(' \033[41;1m ' + config.get('blog.info') + ' \033[0m ');
if (process.env.NODE_ENV == 'development') {
    var sessionOpeions = {
        name: 'blog',
        secret: '$PV&eiEDk&h(Yg$DN0&',
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
    }
    router.use(morgan('dev'));
} else {
    var sessionOpeions = {
        name: 'blog',
        secret: '$PV&eiEDk&h(Yg$DN0&',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true, maxAge: 1000 * 60 * 60 * 24 },
    }
    // console.log('生产环境');
}

// 二级路由
// 静态资源
router.use(express.static(path.join(__dirname, 'public')));
// 自定义中间件 (为 req 添加一个 fullUrl 属性)
router.use(require('./middleware/fullUrl'));

// POST body 处理中间件
router.use(bodyParser.urlencoded({ extended: false }));

// session
router.use(session(sessionOpeions));

// home route
router.use(['/home', '/'], require('./route/home'));

// admin
// 跳转至登录前页面
router.get('/admin/login', require('./middleware/fromUrl'));
// 删除文章后跳转原链接
router.get('/admin/article-delete', require('./middleware/fromUrl'));
// 删除用户后跳转原链接
router.get('/admin/user-delete', require('./middleware/fromUrl'));
// 登录拦截
router.use('/admin', require('./middleware/loginGuard'));
// 用户权限中间件
router.use('/admin', require('./middleware/userPermission'));
// admin route
router.use('/admin', require('./route/admin'));
// 错误处理
router.use((err, req, res, next) => {
    err = JSON.parse(err);
    res.redirect(`${err.path}`);
});

module.exports = router;