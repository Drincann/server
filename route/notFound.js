const config = require('config');
module.exports = (req, res) => {
    res.redirect(config.get('notFoundPage'));
}