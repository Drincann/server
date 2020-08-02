const express = require('express');
const router = require('express').Router();
const path = require('path')


router.post('/getSidebar', require('./route/getSidebar'));
router.use(express.static(path.join(__dirname, 'public')));

module.exports = router;
