const { Article } = require('../model/article');
module.exports = async(req, res, next) => {
    if (!req.session.user) {
        // 未登录
        return next();
    } else {
        // 已登录
        let userInfo = req.session.user;
        let { _id } = req.query;
        let url = req.path;

        // user part
        // userPage
        if (req.method == 'post') {
            // post 请求
            if (url == '/user-edit') {
                // 用户添加路由
                if (userInfo.role == 'normal') {
                    // 普通用户, 跳转自己的 user-edit，若管理员则放行
                    return res.redirect(`user-edit?_id=${userInfo._id}`);
                } else {
                    return next();
                }
            } else if (url == '/user-modify') {
                // 用户更新路由
                if (userInfo.role == 'normal') {
                    // 普通用户, 若访问别人的 id 则跳转自己的 user-edit，若管理员则放行
                    if (userInfo._id != _id) {
                        return res.redirect(`user-edit?_id=${userInfo._id}`);
                    } else {
                        return next();
                    }
                }
            } else if (url == '/article-modify') {
                // 修改文章路由
                if (userInfo.role == 'normal') {
                    // 判断账户类型 
                    // 普通用户 
                    let targetArticle = await Article.find({ _id });
                    if (targetArticle.author != userInfo._id) {
                        // 普通用户访问到了其他人的文章, 跳转自己的 article list，若管理员则放行
                        return res.redirect(`article`);
                    } else {
                        return next();
                    }
                }
            } else if (url == '/article-edit') {
                // 提交文章路由
                if (userInfo.role == 'normal') {
                    // 普通用户 
                    let targetArticle = await Article.find({ _id });
                    if (targetArticle.author != userInfo._id) {
                        // 普通用户访问到了其他人的文章, 跳转自己的 article list，若管理员则放行
                        return res.redirect(`article`);
                    } else {
                        return next();
                    }
                }
            }
            next();
        } else {
            if (url == '/user') {
                // 用户列表路由
                if (userInfo.role == 'normal') {
                    // 普通用户, 跳转自己的 user-edit
                    return res.redirect(`user-edit?_id=${userInfo._id}`);
                } else {
                    return next();
                }
            } else if (url == '/user-edit') {
                // 用户编辑路由
                if (userInfo.role == 'normal') {
                    // 普通用户, 跳转自己的 user-edit
                    if (userInfo._id != _id) {
                        // 普通用户访问了别人的 id
                        return res.redirect(`user-edit?_id=${userInfo._id}`);
                    } else {
                        return next();
                    }
                }
            } else if (url == '/user-delete') {
                // 用户删除路由
                if (userInfo.role == 'normal') {
                    // 普通用户, 跳转自己的 user-edit
                    return res.redirect(`user-edit?_id=${userInfo._id}`);
                } else {
                    return next();
                }
            } else if (url == '/article') {
                // 根据用户渲染页面
                return next();
            } else if (url == '/article-delete') {
                // 文章删除路由
                if (userInfo.role == 'normal') {
                    // 判断账户类型 普通用户跳转 article list, 管理员放行
                    // 普通用户 
                    let targetArticle = await Article.find({ _id });
                    if (targetArticle.author != userInfo.author) {
                        // 普通用户访问到了其他人的文章, 跳转自己的 article list
                        return res.redirect(`article`);
                    } else {
                        return next();
                    }
                }
            }
            next();
        }
    }
};