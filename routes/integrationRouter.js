const express = require('express');
const integrationController = require("../controllers/integrationController.js");


const integrationRouter = express.Router();

integrationRouter.use('/get-new-url', integrationController.getApiUrl);

module.exports = integrationRouter;
