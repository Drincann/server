const { User } = require('../../model/user');
module.exports = async(req, res) => {
    // 判断账户类型 普通用户跳转 user-edit , 管理员跳转 user

    await User.findOneAndDelete({ _id: req.query._id });
    res.redirect(req.session.fromUrl);
}