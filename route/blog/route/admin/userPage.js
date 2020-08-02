const { User } = require('../../model/user');
module.exports = async(req, res) => {

    let userInfo = req.session.user;
    // 当前选中分页
    req.app.locals.currentLink = 'user';

    let page = req.query.page || 1;
    let pageSize = 10;
    let count = await User.countDocuments();
    let pageTotal = Math.ceil(count / pageSize);
    let start = (page - 1) * pageSize;

    let users = await User.find().limit(pageSize).skip(start).sort('_id');


    // res.send({ pageSize, count, pageTotal });
    // return;

    res.render('admin/user', {
        users,
        page,
        pageTotal,
        count,
        userInfo
    });
};