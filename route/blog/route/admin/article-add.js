const formidable = require('formidable');
const path = require('path');
const { Article, validateArticleAdd } = require('../../model/article');
const fs = require('fs');
const promisify = require('util').promisify;
const rmFile = promisify(fs.unlink);
const conpress = require('../fun/conpress');
module.exports = async (req, res, next) => {
    if (await Article.countDocuments() > 100) {
        return next(JSON.stringify({
            path: 'article-edit?message=文章过多'
        }));
    }

    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;
    form.parse(req, async (err, fields, files) => {
        // 验证格式
        try {
            await validateArticleAdd(fields);
        } catch (error) {
            return next(JSON.stringify({
                path: 'article-edit?message=' + error.message
            }));
        }
        // 判断是否上传了文件
        if (files.cover.name == '') {
            // 删除空文件
            try {
                await rmFile(files.cover.path);
            } catch (error) {
                return next(JSON.stringify({
                    path: `article-edit?message=服务端错误: ${error.message}`
                }));
            }
        } else {
            // 压缩新文件
            const imgErr = conpress(files.cover.path);
            if (!imgErr instanceof Promise) console.log('图像压缩失败：', imgErr);

            fields.cover = '/blog' + files.cover.path.split('public')[1];
            fields.path = files.cover.path;
        }
        await Article.create(fields);
        // return res.send(files);
        res.redirect('article');
    });

};