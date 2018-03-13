const { Router } = require('express');

const router = new Router();

const controller = require('./tag.controller');

router.get('/', controller.getAll);

router.get('/:id', controller.getOne);

router.post('/', controller.create);

router.delete('/:id', controller.delete);

module.exports = router;
