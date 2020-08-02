module.exports = (req, res, next) => {
    let from = req.headers.referer;
    if (from && (from.indexOf('register') == -1)) {
        req.session.fromUrl = from;
    } else {
        req.session.fromUrl = req.fullUrl;
    }
    next();
}