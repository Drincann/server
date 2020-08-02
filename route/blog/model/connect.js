const mongoose = require('mongoose');
const config = require('config');
// console.log(`mongodb://${config.get('blog.db.user')}:${config.get('blog.db.pwd')}@${config.get('blog.db.host')}/${config.get('blog.db.name')}`);

mongoose.connect(`mongodb://${config.get('blog.db.user')}:${config.get('blog.db.pwd')}@${config.get('blog.db.host')}/${config.get('blog.db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(' \033[42;33m Done \033[0m blog 路由 数据库连接成功！');
    }).catch(() => {
        console.log(' \033[41;33m Error \033[0m blog 路由 数据库连接失败！');
    });