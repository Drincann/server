const fs = require('fs');
const path = require('path');
const getTodayStr = require('../tools/getTodayStr');

module.exports = (req, res) => {
    try {
        // 验证参数 name
        let { name } = req.fields;
        if (!(name && name.length <= 4 && name.length >= 2)) res.status(400).send({ message: '缺少参数 name' });

        // 验证图片及其大小
        let file = req.files['screenshot'] ? req.files['screenshot'] : undefined;
        if (!(file && file.size != 0)) {
            return res.status(400).send({ message: '图片无效' });
        }

        // 重命名
        let today = new Date();
        let newName = path.join(__dirname, 'public', 'uploads', getTodayStr() + name + '.jpg');
        fs.rename(file.path, newName, function(e) {
            if (e) {
                fs.unlinkSync(file.path);
                return res.status(500).send({ message: '服务端错误：文件重命名失败！' });
            } else {
                return res.send({ message: '上传成功' });
            }
        });
    } catch (error) {
        return res.status(500).send({ message: '服务端错误：' + error.message });
    }
};