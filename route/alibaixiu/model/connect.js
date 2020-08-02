const config = require('config');
const mongoose = require('mongoose');

// 数据库连接
mongoose.connect(`mongodb://${config.get('ali.db.user')}:${config.get('ali.db.pwd')}@${config.get('ali.db.host')}/${config.get('ali.db.name')}`, { useNewUrlParser: true, 'useCreateIndex': true })
    .then(() => console.log(' \033[42;33m Done \033[0m ali 路由 数据库连接成功'))
    .catch(() => console.log(' \033[41;33m Error \033[0m ali 路由 数据库连接失败'));
