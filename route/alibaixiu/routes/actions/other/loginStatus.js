module.exports = async (req, res) => {
    if (req.session && req.session.userInfo) {
        if (req.session.userInfo.role == 'admin') {
            return res.send(`var isAdmin = true; var isLogin = true; var userId=\"${req.session.userInfo._id}\"`)
        }
        const s = `var isAdmin = false; var isLogin = true; var userId=\"${req.session.userInfo._id}\"`
        res.send(s)
    } else {
        res.send('var isLogin = false')
    }
};
