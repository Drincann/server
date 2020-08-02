const router = require('express').Router();
const formidable = require('express-formidable');
router.use(formidable());
router.use(require('./middleware/cors'));

require('./route')(router);

module.exports = router;
