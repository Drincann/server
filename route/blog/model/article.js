const mongoose = require('mongoose');
const joi = require('joi');
// 文章验证
const schemaAdd = {
    title: joi.string().min(1).max(50).required().error(new Error('文章标题必须为 2 - 50 个字符')),
    author: joi.allow(),
    publishDate: joi.allow(),
    cover: joi.allow(),
    path: joi.allow(),
    content: joi.allow()
};
const validateArticleAdd = (article) => {
    // 这里吧 promise 对象返回出去, 调用者去 await
    return joi.validate(article, schemaAdd);
};
const Article = mongoose.model('Article', new mongoose.Schema({
    title: {
        type: String,
        maxlength: 50,
        minlength: 1,
        required: [true, '请填写文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        default: null
    },
    path: {
        type: String,
        default: null
    },
    content: {
        type: String
    }
}));
module.exports = {
    Article,
    validateArticleAdd
};