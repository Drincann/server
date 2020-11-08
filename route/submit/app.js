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
router.post('/upload', (req, res) => {
    try {
        // 验证参数 name
        let { name } = req.fields;
        if (!(name && name.length <= 4 && name.length >= 2)) res.status(400).send({ message: '缺少参数 name' });

        // 验证图片及其大小
        let file = req.files['screenshot'] ? req.files['screenshot'] : undefined;
        if (!(file && file.size != 0)) {
            return res.status(400).send({ message: '图片无效' });
        }

        // 重命名
        let today = new Date();
        let newName = path.join(__dirname, 'public', 'uploads',
            '' + today.getFullYear() + today.getMonth() + (today.getDate() < 10 ? '0' + today.getDate() : today.getDate()) + name + '.jpg');
        fs.rename(file.path, newName, function(e) {
            if (e) {
                fs.unlinkSync(file.path);
                return res.status(500).send({ message: '后端错误，文件重命名失败！' });
            } else {
                return res.send({ message: '上传成功' });
            }
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

module.exports = router;