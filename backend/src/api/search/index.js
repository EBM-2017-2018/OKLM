const { Router } = require('express');

const router = new Router();

const controller = require('./search.controller');

router.get('/', controller.search);
module.exports = router;
