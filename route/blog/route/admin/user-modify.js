const { User, validateUserModify } = require('../../model/user');
const bcrypt = require('bcrypt');
module.exports = async(req, res, next) => {
    let { _id } = req.query;
    let body = req.body;

    // 判断账户类型 普通用户跳转 user-edit , 管理员跳转 user
    let userInfo = req.session.user;


    // 查询 email 是否存在
    try {
        var userFind = await User.findOne({ email: body.email });
        var userPre = await User.findOne({ _id });
    } catch (error) {}
    if (userFind && userFind.email != userPre.email) {
        // email 被占用
        return next(JSON.stringify({
            path: `user-edit?message=邮箱被占用&_id=${_id}`
        }));
    }
    // 查询 username 是否存在
    try {
        var userFind = await User.findOne({ username: body.username });
        var userPre = await User.findOne({ _id });
    } catch (error) {}
    if (userFind && userFind.username != userPre.username) {
        // username 被占用
        return next(JSON.stringify({
            path: `user-edit?message=用户名被占用&_id=${_id}`
        }));
    }
    if (!body.password) delete body.password;
    // 验证格式
    try {
        await validateUserModify(req.body);
    } catch (error) {
        return next(JSON.stringify({
            path: `user-edit?message=${error.message}&_id=${_id}`
        }));
    }
    // 密码加密
    if (body.password) body.password = await bcrypt.hash(body.password, await bcrypt.genSalt(10));

    // 修改数据
    try {
        await User.updateOne({ _id }, body);
    } catch (error) {
        return next(JSON.stringify({
            path: `user-edit?message=服务端出现错误: ${error.message}&_id=${_id}`
        }));
    }
    res.redirect('user');
};