const router = require('express').Router();
const Students = require('../model/user');
const template = require('art-template');

// 三级路由
router.get(['/add', '/'], (req, res) => {
    let html = template('index', {})

    res.send(html);
})

router.get('/list', async(req, res) => {
    let data = await Students.find();
    let html = template('list', { students: data });
    res.send(html);
})

router.post('/add', (req, res) => {
    Students.create(req.body);
    res.writeHead(301, {
        Location: '/template/list'
    });
    res.send();
})
module.exports = router;