const config = require('config');
module.exports = (req, res, next) => {
    if (req.session && req.session.userInfo && req.session.userInfo.role == 'admin') {
        next();
    } else {
        res.redirect(config.get('notFoundPage'));
    }
}