const express = require('express');
const integrationController = require("../controllers/integrationController.js");


const integrationRouter = express.Router();

integrationRouter.post('/get-new-url', integrationController.getUrlApi);
integrationRouter.post('/set-key', integrationController.setKeySearch);
integrationRouter.get('/get-key', integrationController.getKeySearch);
integrationRouter.delete('/delete-key', integrationController.deleteKeySearch);

module.exports = integrationRouter;
