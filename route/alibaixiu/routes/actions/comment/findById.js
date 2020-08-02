// 用户模块
const { Comment } = require('../../../model/Comment');
// 验证模块
const Joi = require('joi');
module.exports = async (req, res, next) => {
    // 文章 id
    const post = req.params['id'];
    // 定义对象验证规则
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id非法'))
    // 验证yong
    const { error } = Joi.validate(post, schema);
    // 数据格式没有通过验证
    if (error) return res.status(400).send({ message: error.message });

    // 查询用户信息
    const comment = await Comment.find({ post }).populate('author', '-password').sort('createAt');

    // 响应
    res.send(comment);
}