const mongoose = require('mongoose');
const config = require('config');
const log_err = ' \033[41;33m Done \033[0m ',
    log_suc = ' \033[42;33m Done \033[0m ';
// console.log(`mongodb://${config.get('admin.db.user')}:${config.get('admin.db.pwd')}@${config.get('admin.db.host')}/${config.get('admin.db.name')}`);

mongoose.connect(`mongodb://${config.get('admin.db.user')}:${config.get('admin.db.pwd')}@${config.get('admin.db.host')}/${config.get('admin.db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((re) => {
        console.log(log_suc + 'template 路由 数据库连接成功！');
    })
    .catch((re) => {
        console.log(log_err + 'template 路由 数据库连接失败！');
    });