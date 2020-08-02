// system modula
const path = require('path');
// third party modules
const template = require('art-template');
const dateFormat = require('dateformat');
const express = require('express');
// custom module
require(path.join(__dirname, 'model', 'connect'));
const preRouter = express.Router();
const router = require(path.join(__dirname, 'route', 'index'));
const bodyParser = require('body-parser');
// POST body 处理中间件
router.use(bodyParser.urlencoded({ extended: false }));
// template init
template.defaults.root = path.join(__dirname, 'views');
template.defaults.extname = '.html';
template.defaults.imports.dateFormat = dateFormat;

// 路由
// 静态资源
preRouter.use(express.static(path.join(__dirname)));
// 直接转发三级路由
preRouter.use(router);
module.exports = preRouter;