const { Router } = require('express');

const router = new Router();

const controller = require('./user.controller');

router.get('/', controller.findAll);

router.get('/:id', controller.findOne);

router.delete('/:id', controller.delete);

router.post('/', controller.create);

module.exports = router;
