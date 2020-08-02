const bcrypt = require('bcrypt');
const { validateUserAdd, User } = require('../../model/user');

module.exports = async(req, res, next) => {
    if (await User.countDocuments() > 20) {
        return next(JSON.stringify({
            path: 'register?message=注册人数过多'
        }));
    }
    // 查询 email 是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        // 邮箱被占用
        return next(JSON.stringify({
            path: 'register?message=邮箱被占用'
        }));
    }
    // 查询 username 是否存在
    user = await User.findOne({ username: req.body.username });
    if (user) {
        // 邮箱被占用
        return next(JSON.stringify({
            path: 'register?message=用户名被占用'
        }));
    }
    // 验证格式
    try {
        await validateUserAdd(req.body);
    } catch (error) {
        return next(JSON.stringify({
            path: 'register?message=' + error.message
        }));
    }
    // 密码加密
    req.body.password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));
    // 写入数据库
    try {
        // 不允许更改角色
        delete req.body.role;
        await User.create(req.body);
    } catch (error) {
        return next(JSON.stringify({
            path: 'register?message=服务端出现错误: ' + error.message
        }));
    }

    res.redirect('/blog/admin/login');
};