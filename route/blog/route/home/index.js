const { Article } = require('../../model/article');
const pagination = require('mongoose-sex-page');

module.exports = async(req, res) => {
    let { page } = req.query;
    let article = await pagination(Article).page(page).size(8).display(3).populate('author').exec();
    let userInfo = req.session.user;
    // return res.send(article);
    res.render('home/index', { article, userInfo });
};