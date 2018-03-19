const { Router } = require('express');

const router = new Router();

const controller = require('./download.controller');

/**
 * @api {get} /download/:id Download a document
 * @apiName DownloadDocument
 * @apiGroup Documents
 * @apiDescription Lien de download d'un document à partir de son ID
 *
 * @apiParam  {String} id   ID du document à télécharger
 * @apiParamExample  {String}  Request-Example:
 *    id: 5a9e7dc7717a690c53650ab1
 */
router.get('/:id', controller.downloadDocument);

module.exports = router;
