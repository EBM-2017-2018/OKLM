const { Router } = require('express');

const router = new Router();

const controller = require('./documents.controller');

/**
 * @api {get} / Find all documents
 * @apiName GetAllDocuments
 * @apiGroup Static Pages
 * @apiDescription Cette URL affiche un JSON contenant tous les Documents de la BDD
 *
 * TODO: Ajouter un exemple quand on aura des documents dans la bdd
 * @apiSuccessExample {json} Success-Response:
 *    ...
 */
router.get('/', controller.findAll);

module.exports = router;
