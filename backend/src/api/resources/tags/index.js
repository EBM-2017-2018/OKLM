const { Router } = require('express');

const router = new Router();

const controller = require('./tag.controller');

/**
 * @api {get} /tags Get all tags
 * @apiName GetTags
 * @apiGroup Tags
 * @apiDescription Cette URL affiche un JSON contenant tous les tags
 *
 * @apiSuccessExample {json} Success-Response:
 *[
 *  {
 *   "_id": "5aa79c3dac53d23f45960e82",
 *   "name": "SQL",
 *   "__v": 0
 *   },
 *  {
 *    "_id": "5aa79c91ac53d23f45960e83",
 *    "name": "Javascript",
 *    "__v": 0
 *  }
 *]
 */
router.get('/', controller.getAll);

/**
 * @api {get} /tag/:id  Get a tag
 * @apiName GetOneTag
 * @apiGroup Tags
 * @apiDescription Cette URL affiche un JSON contenant le tag
 * correspondant à l'ID
 *
 * @apiParam  {String} id   ID du tag à afficher
 * @apiParamExample  {String}  Request-Example:
 *    id: 5aa79c3dac53d23f45960e82
 *
 * @apiSuccessExample {json} Success-Response:
 *  {
 *   "_id": "5aa79c3dac53d23f45960e82",
 *   "name": "SQL",
 *   "__v": 0
 *  }
 */
router.get('/:id', controller.getOne);

/**
 * @api {post} /users Create a tag
 * @apiName PostOneTag
 * @apiGroup Tags
 * @apiDescription Crée un tag et l'ajoute dans la BDD
 *
 * @apiParam  {String} name   Nom du tag
 * @apiParamExample   {json} Request-Example:
 *  {
 *   "name": "Jean-Victor",
 *  }
 *
 * @apiSuccessExample {json} Success-Response:
 * {
 *   "name": "Jean-Victor",
 *   "creationTime": "2018-03-06T15:08:46.039Z",
 *   "_id": "5a9eaefe3597423cb1c4376e",
 *   "__v": 0
 * }
 */
router.post('/', controller.create);

/**
 * @api {delete} /tags/:id  Delete a tag
 * @apiName DeleteOneTag
 * @apiGroup Users
 * @apiDescription Supprime le tag correspondant à l'ID
 *
 * @apiParam  {String} id   ID du tag à supprimer
 * @apiParamExample  {String}  Request-Example:
 *    id: 5aa79c3dac53d23f45960e82
 */
router.delete('/:id', controller.delete);

module.exports = router;
