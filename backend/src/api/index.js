const { Router } = require('express');

const router = new Router();

router.use('/documents', require('./model/documents'));
router.use('/categories', require('./model/categories'));
router.use('/users', require('./model/users'));


module.exports = router;
