const express = require('express');
const integrationController = require("../controllers/integrationController.js");
const loadUser = require("../middleware/loadUser.js");


const integrationRouter = express.Router();

integrationRouter.post('/get-new-url',loadUser.loadUser, integrationController.getUrlApi);
integrationRouter.post('/set-key',loadUser.loadUser, integrationController.setKeySearch);
integrationRouter.get('/get-key',loadUser.loadUser, integrationController.getKeySearch);
integrationRouter.delete('/delete-key',loadUser.loadUser, integrationController.deleteKeySearch);
integrationRouter.get('/get-search-process',loadUser.loadUser, integrationController.getAllSearchProcess);
integrationRouter.get('/get-search-id/:processId/',loadUser.loadUser, integrationController.getSearchProcessId);
integrationRouter.get('/check-process',loadUser.loadUser, integrationController.checkProcessSearch);

module.exports = integrationRouter;
