const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
const fs = require('fs');
const promisify = require('util').promisify;
const rmFile = promisify(fs.unlink);
module.exports = async (req, res) => {
    const _id = req.query._id;
    // 判断账户类型 普通用户跳转 article list, 管理员放行
    let article = await Article.findOne({ _id });
    if (article.path) {
        try {
            rmFile(article.path);
        } catch (error) {
            // return res.send('<h1 style="color:red;>' + '服务端错误: ' + error.message + '</h1>');
        }
    }
    await Comment.deleteMany({ aid: _id });
    await Article.findOneAndDelete({ _id });
    res.redirect('article');
};