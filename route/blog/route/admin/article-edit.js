const { Article } = require('../../model/article');
module.exports = async(req, res) => {
    let { _id, message } = req.query;
    // 判断账户类型 普通用户跳转 article list, 管理员放行
    let userInfo = req.session.user;


    if (_id) {
        try {
            var article = await Article.findOne({ _id });
        } catch (error) {}
        if (article) {
            return res.render('admin/article-edit', { userInfo, message, link: 'article-modify?_id=' + _id, article: article, button: '修改' })
        }

    } else {
        return res.render('admin/article-edit', { userInfo, message, link: 'article-add', button: '提交' });
    }
    res.redirect('article');
};