const { Router } = require('express');

const router = new Router();

const controller = require('./download.controller');

router.get('/:id', controller.downloadDocument);

module.exports = router;
