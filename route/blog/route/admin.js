const express = require('express');
const admin = express.Router();

// User
// register get route
admin.get('/register', require('./admin/register'));

// register post route
admin.post('/register', require('./admin/register-fn'));

// login page and default route
admin.get(['/login', '/'], require('./admin/loginPage'));

// login post route
admin.post('/login', require('./admin/login'));

// user list route
admin.get('/user', require('./admin/userPage'));

// logout route
admin.get('/logout', require('./admin/logout'));

// user-edit route
admin.get('/user-edit', require('./admin/user-edit'));

// user-modify route
admin.post('/user-modify', require('./admin/user-modify'));

// user-edit route
admin.post('/user-edit', require('./admin/user-edit-fn'));

// delete route
admin.get('/user-delete', require('./admin/user-delete'));


// article
// article list route
admin.get('/article', require('./admin/articlePage'));


// article-edit route
admin.get('/article-edit', require('./admin/article-edit'));

// article-add route
admin.post('/article-add', require('./admin/article-add'));

// article-modify
admin.post('/article-modify', require('./admin/article-modify'));

// article-delete
admin.get('/article-delete', require('./admin/article-delete'));

// upload
// admin.post('/upload', require('./admin/upload'));
module.exports = admin;