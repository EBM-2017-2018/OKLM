const { Router } = require('express');

const router = new Router();

const controller = require('./user.controller');

/**
 * @api {get} /users Find all users
 * @apiName GetAllUsers
 * @apiGroup Users
 * @apiDescription Cette URL affiche un JSON contenant tous les users de la BDD
 *
 * @apiSuccessExample {json} Success-Response:
 *[
 *  {
 *    "_id": "5a9e7dc7717a690c53650ab1",
 *    "name": "Jean-Victor",
 *    "creationTime": "2018-03-06T11:38:47.160Z",
 *    "__v": 0
 *  },
 *  {
 *    "_id": "5a9e7e591817c20db4ef0e40",
 *    "name": "Philippe JailBreaklivet",
 *    "creationTime": "2018-03-06T11:41:13.491Z",
 *    "__v": 0
 *  }
 *]
 */
router.get('/', controller.findAll);

/**
 * @api {get} /user/:id  Find a user
 * @apiName GetOneUser
 * @apiGroup Users
 * @apiDescription Cette URL affiche un JSON contenant l'user
 * correspondant à l'ID
 *
 * @apiParam  {String} id   ID de l'user à afficher
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e7dc7717a690c53650ab1
 *
 * @apiSuccessExample {json} Success-Response:
 *   {
 *     "_id": "5a9e7dc7717a690c53650ab1",
 *     "name": "Jean-Victor",
 *     "creationTime": "2018-03-06T11:38:47.160Z",
 *     "__v": 0
 *  }
 */
router.get('/:id', controller.findOne);

/**
 * @api {delete} /users/:id  Delete a user
 * @apiName DeleteOneUser
 * @apiGroup Users
 * @apiDescription Supprime l'user correspondant à l'ID
 *
 * @apiParam  {String} id   ID de l'user à supprimer
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e7dc7717a690c53650ab1
 */
router.delete('/:id', controller.delete);

router.get('/:id/documents', controller.fndDocumentsOfUser);

/**
 * @api {post} /users Create a user
 * @apiName PostOneUser
 * @apiGroup Users
 * @apiDescription Crée un user et l'ajoute dans la BDD
 *
 * @apiParam  {String} name   Nom de l'user
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

module.exports = router;
