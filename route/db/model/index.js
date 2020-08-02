const mongoose = require('mongoose');
const config = require('config');
mongoose.connect(`mongodb://${config.get('admin.db.user')}:${config.get('admin.db.pwd')}@${config.get('admin.db.host')}/${config.get('admin.db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(' \033[42;33m Done \033[0m db 路由 数据库连接成功！');
    }).catch(() => {
        console.log(' \033[41;33m Error \033[0m db 路由 数据库连接失败！');
    });