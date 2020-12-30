module.exports = (req, res, next) => {
    // if (process.env.NODE_ENV == 'development') {
    // } else {
    //     if (!req.secure) {
    //         return res.redirect('https://' + req.get('host') + req.url);
    //     }
    // }
    next();
}