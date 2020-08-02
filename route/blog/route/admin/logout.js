module.exports = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie();
        res.redirect('/blog/home/index');
    })
};