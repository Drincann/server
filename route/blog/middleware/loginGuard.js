const { User } = require('../model/user');
module.exports = async(req, res, next) => {
    if (req.url != '/login' && !req.session.user && req.url != '/register') {
        // 未登录
        return res.redirect('login');
    } else {
        if (!req.session.user) {
            // 未登录
            return next();
        }

        // 已登录
        // 更新 cookie
        try {
            var user = await User.findOne({ _id: req.session.user._id });
        } catch (error) {
            delete req.session.user;
            return res.redirect('login');
        }
        req.session.user = user;
        // 普通用户访问 admin 则重定向到 ucenter 路由
        if (req.session.role == 'normal') {
            return res.redirect('/blog/ucenter/user');
        }
        next();
    }
};