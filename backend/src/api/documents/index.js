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
 *    "_id": "5a9e7dc7717a690c53650ab1",
 *    "title": "Document avec URI",
 *    "uri": "perdu.com",
 *    "creationTime": "2018-03-06T11:38:47.160Z",
 *    "__v": 0
 *  },
 *  {
 *    "_id": "5a9e7e591817c20db4ef0e40",
 *    "title": "Autre document",
 *    "uri": "centralelille.fr",
 *    "creationTime": "2018-03-06T11:41:13.491Z",
 *    "__v": 0
 *  }
 *]
 */
router.get('/', controller.findAll);

/**
 * @api {get} /documents/:id  Find a document
 * @apiName GetOneDocument
 * @apiGroup Documents
 * @apiDescription Cette URL affiche un JSON contenant le document
 * correspondant à l'ID
 *
 * @apiParam  {String} id   ID du document à afficher
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e7dc7717a690c53650ab1
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "_id": "5a9e7dc7717a690c53650ab1",
 *     "title": "Document avec URI",
 *     "uri": "perdu.com",
 *     "creationTime": "2018-03-06T11:38:47.160Z",
 *     "__v": 0
 *  }
 */
router.get('/:id', controller.findOne);

/**
 * @api {post} /documents Create a document
 * @apiName PostOneDocument
 * @apiGroup Documents
 * @apiDescription Crée un document et l'ajoute dans la BDD
 *
 * @apiParam  {String} title   Titre du document
 * @apiParam  {String} uri     Lien vers le document
 * @apiParam  {String} [motherCategory]     ID de la catégorie mère si elle existe
 * @apiParamExample   {json} Request-Example:
 *  {
 *   "title": "Document dans une catégorie",
 *   "uri": "g1categorie.fr",
 *   "motherCategory": "5a9e8ff745cff725146b83f3"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "title": "Document dans une catégorie",
 *   "uri": "g1categorie.fr",
 *   "motherCategory": "5a9e8ff745cff725146b83f3",
 *   "creationTime": "2018-03-06T15:08:46.039Z",
 *   "_id": "5a9eaefe3597423cb1c4376e",
 *   "__v": 0
 * }
 */
router.post('/', controller.create);

/**
 * @api {delete} /documents/:id  Delete a document
 * @apiName DeleteOneDocument
 * @apiGroup Documents
 * @apiDescription Supprime le document correspondant à l'ID
 *
 * @apiParam  {String} id   ID du document à supprimer
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e7dc7717a690c53650ab1
 */
router.delete('/:id', controller.delete);

module.exports = router;
