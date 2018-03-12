const { Router } = require('express');

const router = new Router();

const controller = require('./search.controller');

// http://localhost:4000/api/search?content=documents,categories&q=toto
/**
 * @api {get} /search?q=:query&content=:contents Search in documents or categories
 * @apiName Search
 * @apiGroup Search
 * @apiDescription Cette URL affiche un JSON contenant tous les résultats de la recherche
 *
 * @apiParam  {String}  query   La recherche à effectuer
 * @apiParam  {String}  [contents]  Le type à rechercher: les documents ou les catégories
 *
 * @apiParamExample {String} Query:
 *    query=maths
 *    contents=categories,documents
 *
 * @apiSuccessExample {json} Success-Response:
 *
 *{
 *  "categories": [
 *    {
 *      "motherCategory": null,
 *      "_id": "5aa634695c78a25ec4fe8426",
 *      "name": "Maths",
 *      "__v": 0,
 *      "score": 1.1
 *    }
 *  ],
 *  "documents": [
 *    {
 *      "creationTime": "2018-03-12T09:36:47.636Z",
 *      "_id": "5aa64a2f6c369c1c223516a3",
 *      "author": {
 *        "creationTime": "2018-03-12T07:46:44.245Z",
 *        "_id": "5aa631945c78a25ec4fe8423",
 *        "name": "Jean-Victor",
 *        "__v": 0
 *      },
 *      "uri": "maths.fr",
 *      "title": "Tout sur les maths",
 *      "__v": 0,
 *      "score": 1.3125
 *    }
 *  ]
 *}
 */

router.get('/', controller.search);
module.exports = router;
