const { Router } = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const { requireAuth } = require('ebm-auth');
const config = require('../../../config/index');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, config.filesystem.uploadPath);
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split('.').slice(-1).pop()}`);
  },
});
const upload = multer({ storage });

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
router.get('/', controller.getAll);

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
 *  {
 *    "isLocalFile": true,
 *    "creationTime": "2018-03-13T09:27:58.556Z",
 *    "_id": "5aa7999e5a51187473f3038c",
 *    "title": "Fichier",
 *    "author": "5a9ec0f0a03d0a1ae7d14deb",
 *    "uri": "/api/download/5aa7999e5a51187473f3038c",
 *    "fileName": "mythra.jpg",
 *    "localFileName": "753b90f9-4358-4af6-bcf6-d911ed22e344.jpg",
 *    "__v": 0
 *  }
 */
router.get('/:id', controller.findOne);

/**
 * @api {post} /documents Create a document
 * @apiName PostOneDocument
 * @apiGroup Documents
 * @apiDescription Crée un document et l'ajoute dans la BDD, si l'utilisateur est authentifié.
 *
 * @apiParam  {String} title   Titre du document
 * @apiParam  {String} motherCategory     ID de la catégorie mère si elle existe
 * @apiParam  {File} [file]     Fichier à upload, obligatoire si aucune uri n'a été fournie
 * @apiParam  {String} [uri]     Lien externe, obligatoire si aucun fichier n'a été fourni
 * @apiHeader Authorization     JWT Access Authentication token
 * @apiParamExample   {json} Without File:
 *  {
 *   "title": "Document dans une catégorie",
 *   "uri": "g1categorie.fr",
 *   "motherCategory": "5a9e8ff745cff725146b83f3"
 *  }
 *  @apiParamExample  {form} With File (Multipart):
 *  title: Fichier
 *  file: [mythra.jpg]
 *  motherCategory: 5a9e8ff745cff725146b83f3
 *
 * @apiSuccessExample {json} Success-Response (Without File):
 * {
 *   "title": "Document dans une catégorie",
 *   "author" : "student"
 *   "motherCategory": "5a9e8ff745cff725146b83f3",
 *   "isLocalFile": false,
 *   "creationTime": "2018-03-06T15:08:46.039Z",
 *   "_id": "5a9eaefe3597423cb1c4376e",
 *   "uri": "g1categorie.fr",
 *   "__v": 0
 * }
 * @apiSuccessExample {json} Success-Response (With File):
 * {
 *   "title": "Fichier",
 *   "author": "student",
 *   "motherCategory": "5a9e8ff745cff725146b83f3",
 *   "isLocalFile": true,
 *   "creationTime": "2018-03-12T09:48:47.532Z",
 *   "_id": "5aa64cff6007ea3053c99a7c",
 *   "uri": "/api/download/5aaf763f17700866a8fa4c3b",
 *   "__v": 0
 * }
 */
router.post('/', requireAuth({ provider: config.auth.provider }), upload.single('file'), controller.create);

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
router.delete('/:id', requireAuth({ provider: config.auth.provider }), controller.delete);

module.exports = router;
