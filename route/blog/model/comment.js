const mongoose = require('mongoose');
const joi = require('joi');
// 用户添加验证
const schemaAdd = {
    content: joi.string().min(1).max(1000).error(new Error('字数必须在 1 ~ 1000 之间')),
    aid: joi.allow(),
    uid: joi.allow(),
    time: joi.allow()
};
const validateCommentAdd = (comment) => {
    // 这里吧 promise 对象返回出去, 调用者去 await
    return joi.validate(comment, schemaAdd);
};
const Comment = mongoose.model('Comment', new mongoose.Schema({
    aid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Article'
    },
    uid: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'

    },
    time: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        minlength: 1,
        maxlength: 1000
    }
}));

module.exports = {
    Comment,
    validateCommentAdd
};