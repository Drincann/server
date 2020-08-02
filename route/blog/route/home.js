const express = require('express');
const home = express.Router();
// index route
home.get(['/', '/index'], require('./home/index'));

// article detail route
home.get('/article', require('./home/article'));

// comment
home.post('/comment', require('./home/comment'))
module.exports = home;