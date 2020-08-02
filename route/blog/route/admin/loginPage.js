module.exports = (req, res) => {
    if (req.session.user) {
        return res.redirect('user');
    }
    res.render('admin/login');
};