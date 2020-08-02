const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const joi = require('joi');


async function creatAdmin() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('745663', salt);
    const user = await User.create({
        username: 'admin',
        email: '1019933576@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}


// 用户添加验证
const schemaAdd = {
    username: joi.string().min(2).max(20).required().error(new Error('用户名不符合规则')),
    email: joi.string().email().required().error(new Error('电子邮箱不符合规则')),
    password: joi.string().min(3).max(30).required().error(new Error('密码不符合规则')),
    role: joi.string().valid('normal', 'admin').allow().error(new Error('角色不符合规则')),
    state: joi.number().valid(0, 1).error(new Error('状态不符合规则'))
};
const validateUserAdd = (user) => {
    // 这里吧 promise 对象返回出去, 调用者去 await
    return joi.validate(user, schemaAdd);
};
// 修改认证
const schemaModify = {
    username: joi.string().min(2).max(20).required().error(new Error('用户名不符合规则')),
    email: joi.string().email().required().error(new Error('电子邮箱不符合规则')),
    password: joi.string().min(3).max(30).error(new Error('密码不符合规则')),
    role: joi.string().valid('normal', 'admin').error(new Error('角色不符合规则')),
    state: joi.number().valid(0, 1).error(new Error('状态不符合规则'))
};
const validateUserModify = (user) => {
    // 这里吧 promise 对象返回出去, 调用者去 await
    return joi.validate(user, schemaModify);
};
mongoose.set('useCreateIndex', true);
const User = mongoose.model('User', new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "normal"
            // admin
            // normal
    },
    state: {
        type: Number,
        default: 0
            // 0 启用 
            // 1 禁用
    }
}));


module.exports = {
    User,
    validateUserAdd,
    validateUserModify
}