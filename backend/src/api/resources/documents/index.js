const { Router } = require('express');
const multer = require('multer');
const config = require('../../../config/index');

const upload = multer({ dest: config.filesystem.uploadPath });

const router = new Router();

const controller = require('./documents.controller');

/**
 * @api {get} /documents Get all documents
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
 *    "author" : "5a9ec0f0a03d0a1ae7d14deb"
 *    "creationTime": "2018-03-06T11:38:47.160Z",
 *    "__v": 0
 *  },
 *  {
 *    "_id": "5a9e7e591817c20db4ef0e40",
 *    "title": "Autre document",
 *    "uri": "centralelille.fr",
 *    "author" : "5a9ec0eca03d0a1ae7d14dea"
 *    "creationTime": "2018-03-06T11:41:13.491Z",
 *    "__v": 0
 *  }
 *]
 */
router.get('/', controller.findAll);

/**
 * @api {get} /documents/:id  Get a document
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
 *     "author" : "5a9ec0f0a03d0a1ae7d14deb"
 *     "creationTime": "2018-03-06T11:38:47.160Z",
 *     "__v": 0
 *  }
 */
router.get('/:id', controller.findOne);

/**
 * @api {post} /documents Create a document
 * @apiName PostOneDocument
 * @apiGroup Documents
 * @apiDescription Crée un document et l'ajoute dans la BDD. Si on ajoute un fichier,
 *
 * @apiParam  {String} title   Titre du document
 * @apiParam  {String} author ID du propriétaire du document
 * @apiParam  {String} motherCategory     ID de la catégorie mère si elle existe
 * @apiParam  {File} [file]     Fichier à upload, obligatoire si aucune uri n'a été fournie
 * @apiParam  {String} [uri]     Lien externe, obligatoire si aucun fichier n'a été fourni
 * @apiParamExample   {json} Without File:
 *  {
 *   "title": "Document dans une catégorie",
 *   "uri": "g1categorie.fr",
 *   "motherCategory": "5a9e8ff745cff725146b83f3"
 *   "author" : "5a9ec0f0a03d0a1ae7d14deb"
 *  }
 *  @apiParamExample  {form} With File (Multipart):
 *  title: Fichier
 *  file: [mythra.jpg]
 *  author: 5a9ec0f0a03d0a1ae7d14deb
 *  motherCategory: 5a9e8ff745cff725146b83f3
 *
 * @apiSuccessExample {json} Success-Response (Without File):
 * {
 *   "title": "Document dans une catégorie",
 *   "uri": "g1categorie.fr",
 *   "motherCategory": "5a9e8ff745cff725146b83f3",
 *   "author" : "5a9ec0f0a03d0a1ae7d14deb"
 *   "creationTime": "2018-03-06T15:08:46.039Z",
 *   "_id": "5a9eaefe3597423cb1c4376e",
 *   "__v": 0
 * }
 * @apiSuccessExample {json} Success-Response (With File):
 * {
 *    "title": "Fichier",
 *    "author": "5a9ec0f0a03d0a1ae7d14deb",
 *    "motherCategory": "5a9e8ff745cff725146b83f3",
 *    "isLocalFile": true,
 *    "creationTime": "2018-03-12T09:48:47.532Z",
 *    "_id": "5aa64cff6007ea3053c99a7c",
 *    "uri": "/tmp/384087105dfead92a01608de603ddfc5",
 *    "__v": 0
 * }
 */
router.post('/', upload.single('file'), controller.create);

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
