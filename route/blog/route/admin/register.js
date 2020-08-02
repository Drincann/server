module.exports = async(req, res) => {
    let { message } = req.query;
    res.render('admin/register', { message });
}