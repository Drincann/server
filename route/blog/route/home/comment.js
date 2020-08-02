const { Comment, validateCommentAdd } = require('../../model/comment');
module.exports = async(req, res) => {
    let userInfo = req.session.user;
    if (userInfo) {
        // 用户已登录
        var comment = req.body;
        comment.uid = userInfo._id;

        try {
            await validateCommentAdd(comment);
        } catch (error) {
            return res.redirect(`article?_id=${comment.aid}&message=${error.message}`);
        }

        try {
            await Comment.create(comment);
        } catch (error) {
            return res.redirect(`article?_id=${comment.aid}&message=服务端错误: ${error.message}`);
        }

    }
    res.redirect(`article?_id=${comment.aid}`);
};