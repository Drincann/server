const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    req.app.locals.currentLink = 'article';
    const page = req.query.page;
    // 判断账户类型 普通用户查询自己的文章，管理员查询所有文章

    let userInfo = req.session.user;
    if (userInfo.role == 'normal') {
        // 普通用户, 查询自己文章
        var article = await pagination(Article).page(page).size(10).display(5).populate('author').find({ author: userInfo._id }).exec();
    } else {
        var article = await pagination(Article).page(page).size(10).display(5).populate('author').exec();
    }


    // return res.send(article);
    res.render('admin/article', { article, userInfo: req.session.user });
};