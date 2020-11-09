const router = require('express').Router();
const express = require('express')
const formidable = require('express-formidable');
const path = require('path');
const getTodayStr = require('../tools/getTodayStr');

// 开放静态资源
router.use(express.static(path.join(__dirname, 'public')));

// parse body
router.use(formidable({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为 2mb
    maxFileSize: 5 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
}, [{ event: 'error', action: () => void(0) }]));

// 上传图片路由
router.post('/upload', require('./route/upload'));

// 当日提交
router.get('/submitCount', require('./route/getCount'));

// 错误处理
router.use((err, req, res, next) => {
    try {
        console.log(getTodayStr() + '> 在 submit 路由触发错误处理', err);
        res.status(500).send({ message: '服务端错误：' + err.message });
    } catch (error) {
        let now = new Date().getMinutes;
        console.log(getTodayStr() + '> 在错误处理中触发了异常', error);
        console.log(getTodayStr() + '> 在 submit 路由触发错误处理', err);
        res.status(500).send({ message: '服务端错误：' + error.message });
    }

});

module.exports = router;