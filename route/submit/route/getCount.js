const path = require('path');
const fs = require('fs');
const getTodayStr = require('../tools/getTodayStr');

module.exports = (req, res) => {
    try {
        let count = 0;
        let todayStr = require('../tools/getTodayStr')();
        for (filename of fs.readdirSync(path.join(__dirname, '../', 'public', 'uploads'))) {
            if (fs.statSync(path.join(__dirname, '../', 'public', 'uploads', filename)).isFile() &&
                new RegExp(todayStr).test(filename)) {
                ++count;
            }
        }
        return res.send({ message: '获取成功', count });
    } catch (error) {
        console.log(getTodayStr() + '> 在 submitCount 路由触发了异常', error);
        return res.status(500).send({ message: '服务端错误：' + error.message });
    }


};