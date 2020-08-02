const { User } = require('../../model/user');
module.exports = async (req, res) => {
    let { message, _id } = req.query;
    req.app.locals.currentLink = 'user';
    let userInfo = req.session.user;
    // 判断用户类型, 普通用户跳转自己 _id 对应 user-edit, 管理员放行

    if (_id) {
        try {
            var user = await User.findOne({ _id });
        } catch (error) { }
        if (user) {
            return res.render('admin/user-edit', { userInfo, user, message, link: 'user-modify?_id=' + _id, button: '修改' });
        }
    } else {
        return res.render('admin/user-edit', { userInfo, message, link: 'user-edit', button: '提交' });
    }
    res.redirect('user');
}