const formidable = require('formidable');
const path = require('path');
module.exports = async(req, res, next) => {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    form.keepExtensions = true;
    form.parse(req, async(err, fields, files) => {
        await Article.create(fields);
        res.send({
            url: '/blog' + files.cover.path.split('public')[1]
        })
    });

};