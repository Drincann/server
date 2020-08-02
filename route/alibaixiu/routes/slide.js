// 用户路由
const slide = require('express').Router();
// 获取轮播图
slide.get('/', require('./actions/slide/find'))
// 拦截
slide.use(require('../middleware/guard'));
// 添加轮播图片
slide.post('/', require('./actions/slide/create'));
// 根据id删除轮播图片
slide.delete('/:id', require('./actions/slide/findByIdAndDelete'));


// 导出路由
module.exports = slide;