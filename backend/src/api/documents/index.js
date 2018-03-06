const { Router } = require('express');

const router = new Router();

const controller = require('./documents.controller');

/**
 * @api {get} /documents Find all documents
 * @apiName GetAllDocuments
 * @apiGroup Documents
 * @apiDescription Cette URL affiche un JSON contenant tous les Documents de la BDD
 *
 * @apiSuccessExample {json} Success-Response:
 *[
 *  {
 *    "_id": "5a9e6c0d117e045787407664",
 *    "title": "Premier test",
 *    "creationTime": "2018-03-06T10:23:09.410Z",
 *    "__v": 0
 *  },
 *  {
 *    "_id": "5a9e6cddb3924a58d84b8d62",
 *    "title": "Deuxième test",
 *    "creationTime": "2018-03-06T10:26:37.167Z",
 *    "__v": 0
 *  }
 *]
 */
router.get('/', controller.findAll);

/**
 * @api {post} /documents Create a document
 * @apiName PostOneDocument
 * @apiGroup Documents
 * @apiDescription Crée un document et l'ajoute dans la BDD
 *
 * @apiParam  {String} title   Titre du document
 * @apiParamExample   {json} Request-Example:
 *  {
 *    "title": "Deuxième test"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "title": "Premier test",
 *    "creationTime": "2018-03-06T10:23:09.410Z",
 *    "_id": "5a9e6c0d117e045787407664",
 *    "__v": 0
 *  }
 */
router.post('/', controller.create);

module.exports = router;
