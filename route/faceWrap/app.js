const router = require('express').Router();
const express = require('express');
const formidable = require('express-formidable');
const { faceWrap, getFirst, getUrl } = require('./tools');
const path = require('path');
const fs = require('fs');
const strRandom = require('string-random');

// 开放静态资源
router.use(express.static(path.join(__dirname, 'public')));

// parse body
router.use(formidable({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为 2mb
    maxFileSize: 2 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
}, [{ event: 'error', action: () => void (0) }]));


// 获得模板图片
router.get('/tplList', (req, res) => {
    try {
        const fileList = fs.readdirSync(path.join(__dirname, 'public', 'faceTemplate'));
        const templateArr = [...(new Array(fileList.length))].map((value, index) => path.join('faceTemplate', fileList.shift()));

        res.send({ templateArr });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }

})
// 换脸路由


router.post('/', async (req, res) => {
    try {

        let time = Date.now();
        const fileList = fs.readdirSync(path.join(__dirname, 'public', 'faceTemplate'));
        const templateArr = [...(new Array(fileList.length).keys())].map((value, index) => path.join(__dirname, 'public', 'faceTemplate', fileList.shift()));

        // 验证参数
        // 验证模板序号
        let { index } = req.fields;
        index = parseInt(index);
        if (index < 0 || index >= templateArr.length) {
            return res.status(400).send({ message: '参数无效' });
        }
        // 验证图片大小
        let file = getFirst(req.files);

        if (!(file && file.size != 0)) {
            return res.status(400).send({ message: '图片无效' });
        }

        let facePath = file.path;

        // 读文件
        const tplFace = fs.readFileSync(templateArr[index]);
        const userFace = fs.readFileSync(facePath);


        // 换脸
        let resultImg = await faceWrap(tplFace, userFace);


        // 错误验证
        let { error } = resultImg;
        if (error) {
            try {
                const infoList = {
                    IMAGE_ERROR_UNSUPPORTED_FORMAT: '图片无效',
                    INVALID_IMAGE_SIZE: '图片过大',
                    INVALID_IMAGE_URL: '图片无效',
                    IMAGE_FILE_TOO_LARGE: '图片无效',
                    NO_FACE_FOUND: '未检测到人脸',
                    BAD_FACE: '未检测到人脸',
                    INVALID_RECTANGLE: '未检测到人脸',
                    MISSING_ARGUMENTS: '参数无效',
                    IMAGE_DOWNLOAD_TIMEOUT: '请求超时'
                }
                const errKey = error.error_message.slice(0, error.error_message.indexOf(':'));
                const Msg = infoList[errKey];
                return res.status(500).send({ message: Msg ? Msg : '未知错误' });
            } catch (error) {
                return res.status(500).send({ message: '未知错误' });
            }
        }

        // 返回 url
        const fileName = strRandom(10) + '.jpg'
        fs.writeFileSync(path.join(__dirname, 'public', 'resultImg', fileName), resultImg);
        res.send({ img: getUrl(req) + '/resultImg/' + fileName });
        // let base64 = new Buffer.from(resultImg).toString('base64');
        // res.send({ base64 });

        console.log((new Date()).toLocaleString() + ': ' + (Date.now() - time));
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// catch
router.use((err, req, res, next) => {
    res.status(500).send({ message: err.message });
})
module.exports = router;