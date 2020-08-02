module.exports = (req, res, next) => {
    req.fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    next();
};