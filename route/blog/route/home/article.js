const { Article } = require('../../model/article');
const { Comment } = require('../../model/comment');
module.exports = async(req, res) => {
    let { _id, message } = req.query;
    let userInfo = req.session.user;
    if (_id) {
        try {
            var article = await Article.findOne({ _id }).populate('author');
            var comment = await Comment.find({ aid: _id }).populate('uid');
        } catch (error) {
            return res.redirect('index');
        }
        if (article) {
            return res.render('home/article', { comment, article, userInfo, message });
        }
    }
    res.redirect('index');


};