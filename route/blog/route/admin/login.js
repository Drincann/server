const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async(req, res) => {
    const { email, password } = req.body;
    // 初步判断登录信息
    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/login.art', {
            info: '<p class="bg-danger error" style="font-size:20px;text-align:center;color:orangered;"> email 或密码错误 <p>'
        });
    }
    // 数据库比对
    let user = await User.findOne({ email });
    if (user) {
        // 密码比对
        let isSame = await bcrypt.compare(password, user.password);
        if (isSame) {
            // 登录成功
            // req.app.locals.userInfo = user;
            req.session.user = user;
            if (req.session.fromUrl) {
                return res.redirect(req.session.fromUrl);
            }
            res.redirect('user');
        } else {
            return res.status(400).render('admin/login.art', {
                info: '<p class="bg-danger error" style="font-size:20px;text-align:center;color:orangered;"> email 或密码错误 <p>',
                email
            });
        }
    } else {
        return res.status(400).render('admin/login.art', {
            info: '<p class="bg-danger error" style="font-size:20px;text-align:center;color:orangered;"> email 或密码错误 <p>',
            email
        });
    }
};