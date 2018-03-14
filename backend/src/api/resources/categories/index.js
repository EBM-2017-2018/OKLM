const { Router } = require('express');
const { requireAuth } = require('ebm-auth');
const config = require('../../../config');

const router = new Router();

const controller = require('./categories.controller');

/**
 * @api {get} /categories Get top level categories
 * @apiName GetFirstCategories
 * @apiGroup Categories
 * @apiDescription Cette URL affiche un JSON contenant toutes les
 * Catégories de la BDD qui n'ont pas de catégorie mère : ce sont donc les
 * "premières" catégories, qui partent de la racine.
 *
 * @apiSuccessExample {json} Success-Response:
 *[
 *  {
 *    "_id": "5a9e8f301b310a244bc74210",
 *    "name": "Catégorie 1",
 *    "__v": 0
 *  },
 *  {
 *    "_id": "5a9e8ff745cff725146b83f3",
 *    "name": "Catégorie 2",
 *    "__v": 0
 *  }
 *]
 */
router.get('/', controller.findTopLevelCategories);

/**
 * @api {get} /categories/:id  Get a category (and its children)
 * @apiName GetOneCategory
 * @apiGroup Categories
 * @apiDescription Cette URL affiche un JSON contenant la catégorie
 * correspondant à l'ID, et son contenu si cela est demandé dans le
 * champ de query "content"
 *
 * @apiParam  {String} id   ID de la catégorie à afficher
 * @apiParam  {String} [content]   Query à mettre égal à "all" pour avoir
 * également le contenu de la catégorie
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e90288e165e255773b6aa
 * @apiParamExample {String}  With Query :
 *    id: 5a9e8ff745cff725146b83f3
 *    content: all
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "_id": "5a9e90288e165e255773b6aa",
 *     "name": "Catégorie 3",
 *     "motherCategory": "5a9e8f301b310a244bc74210",
 *     "__v": 0
 *  }
 *  @apiSuccessExample {json} With Query :
 *{
 *   "_id": "5a9e8ff745cff725146b83f3",
 *   "name": "Catégorie 2",
 *   "__v": 0,
 *   "content": {
 *       "categories": [
 *           {
 *               "_id": "5a9ea94a71e517367db42b14",
 *               "name": "Catégorie 4",
 *               "motherCategory": "5a9e8ff745cff725146b83f3",
 *               "__v": 0
 *           },
 *           {
 *               "_id": "5a9eb0cfcfd3993e22132b6a",
 *               "name": "Catégorie 5",
 *               "motherCategory": "5a9e8ff745cff725146b83f3",
 *               "__v": 0
 *           }
 *       ],
 *       "documents": [
 *           {
 *               "_id": "5a9eaefe3597423cb1c4376e",
 *               "title": "Document dans une catégorie",
 *               "uri": "g1categorie.fr",
 *               "motherCategory": "5a9e8ff745cff725146b83f3",
 *               "creationTime": "2018-03-06T15:08:46.039Z",
 *               "__v": 0
 *           }
 *       ]
 *   }
 * }
 */
router.get('/:id', controller.findOne);

/**
 * @api {post} /categories Create a category
 * @apiName PostOneCategory
 * @apiGroup Categories
 * @apiDescription Crée une catégorie et l'ajoute dans la BDD
 *
 * @apiParam  {String} name    Nom de la catégorie
 * @apiParam  {String} [motherCategory]     ID de la catégorie mère si elle existe
 * @apiParamExample   {json} Request-Example:
 *  {
 *    "name": "Catégorie 3",
 *    "motherCategory": "5a9e8f301b310a244bc74210"
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *    "name": "Catégorie 3",
 *    "motherCategory": "5a9e8f301b310a244bc74210",
 *    "_id": "5a9e90288e165e255773b6aa",
 *    "__v": 0
 *  }
 */
router.post('/', requireAuth({ provider: config.auth.provider }), controller.create);

/**
 * @api {delete} /categories/:id  Delete a category
 * @apiName DeleteOneCategory
 * @apiGroup Categories
 * @apiDescription Supprime la catégorie correspondant à l'ID
 *
 * @apiParam  {String} id   ID de la catégorie à supprimer
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e8ff745cff725146b83f3
 */
router.delete('/:id', requireAuth({ provider: config.auth.provider }), controller.delete);

module.exports = router;
