const { Article, validateArticleAdd } = require('../../model/article');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const rmFile = promisify(fs.unlink);
const conpress = require('../fun/conpress');
module.exports = (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;
    // 解析
    form.parse(req, async (err, fields, files) => {
        // fields 请求参数
        // files 文件信息
        const { _id } = req.query;
        const oldArticle = await Article.findOne({ _id });
        // 修改提交用户
        fields.author = oldArticle.author;
        // 验证格式
        try {
            await validateArticleAdd(fields);
        } catch (error) {
            return next(JSON.stringify({
                path: `article-edit?_id=${_id}&message=${error.message}`
            }));
        }
        // 判断是否上传了文件
        if (files.cover.name == '') {
            // 删除空文件
            try {
                await rmFile(files.cover.path);
            } catch (error) {
                return next(JSON.stringify({
                    path: `article-edit?_id=${_id}&message=服务端错误: ${error.message}`
                }));
            }
        } else {
            // 删除原文件
            try {
                await rmFile(oldArticle.path);
            } catch (error) {
                // return next(JSON.stringify({
                //     path: `article-edit?id=${_id}&message=服务端错误: ${error.message}`
                // }));
            }
            // 压缩新文件
            const imgErr = conpress(files.cover.path);
            if (!imgErr instanceof Promise) console.log('图像压缩失败：', imgErr);


            // let split = files.cover.path.split('public')[1];
            // console.log(filename);
            // let replace = filename.replace(/\\/g, '/');
            // console.log(re);

            fields.cover = '/blog' + files.cover.path.split('public')[1];
            fields.path = files.cover.path;
        }

        await Article.updateOne({ _id }, fields);
        res.redirect('article');
    });
};