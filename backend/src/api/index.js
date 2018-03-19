const { Router } = require('express');

const router = new Router();

router.use('/documents', require('./resources/documents'));
router.use('/categories', require('./resources/categories'));
router.use('/users', require('./resources/users'));
router.use('/tags', require('./tags'));
router.use('/search', require('./search'));
router.use('/download', require('./download'));

module.exports = router;
