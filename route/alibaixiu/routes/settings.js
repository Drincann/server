// 用户路由
const settings = require('express').Router();
// 获取网站配置
settings.get('/', require('./actions/settings/find'))
// 拦截
settings.use(require('../middleware/guard'));
// 添加网站设置
settings.post('/', require('./actions/settings/create'));


// 导出路由
module.exports = settings;