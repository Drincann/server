const router = require('express').Router();
const express = require('express')
const formidable = require('express-formidable');
const path = require('path');
const fs = require('fs');

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
router.get('/submitCount', (req, res) => {
    try {
        let count = 0;
        let todayStr = require('./tools/getTodayStr')();
        for (filename of fs.readdirSync(path.join(__dirname, 'public', 'uploads'))) {
            if (fs.statSync(path.join(__dirname, 'public', 'uploads', filename)).isFile() &&
                new RegExp(todayStr).test(filename)) {
                ++count;
            }
        }
        return res.send({ message: '获取成功', count });
    } catch (error) {
        return res.status(500).send({ message: '服务端错误：' + error.message });
    }


});

// 错误处理
router.use((err, req, res, next) => {
    try {
        let now = new Date().getMinutes;
        console.log(now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() +
            ' --> submit 路由触发错误处理：' + err.message);
        res.status(500).send({ message: '服务端错误：' + err.message });
    } catch (error) {
        let now = new Date().getMinutes;
        console.log(now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() +
            ' --> submit 路由触发错误处理：' + err.message);
        res.status(500).send({ message: '服务端错误：' + error.message });
    }

});

module.exports = router;