const express = require('express');
const integrationController = require("../controllers/integrationController.js");


const integrationRouter = express.Router();

integrationRouter.post('/get-new-url', integrationController.getUrlApi);
integrationRouter.post('/set-key', integrationController.setKeySearch);
integrationRouter.get('/get-key', integrationController.getKeySearch);
integrationRouter.delete('/delete-key', integrationController.deleteKeySearch);
integrationRouter.get('/get-search-process', integrationController.getAllSearchProcess);
integrationRouter.get('/get-search-id/:processId/', integrationController.getSearchProcessId);
integrationRouter.get('/check-process', integrationController.checkProcessSearch);

module.exports = integrationRouter;
