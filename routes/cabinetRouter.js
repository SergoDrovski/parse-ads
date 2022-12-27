const express = require('express');
const cabinetController = require("../controllers/cabinetController.js");


const cabinetRouter = express.Router();

cabinetRouter.get('/', cabinetController.index);

cabinetRouter.use('/stats', cabinetController.getStats);

cabinetRouter.use('/task/:taskId/url', cabinetController.getUrlInTask);
cabinetRouter.use('/task/:taskId/', cabinetController.getTaskId);

cabinetRouter.use('/start/task', cabinetController.startTask);
cabinetRouter.use('/stop/task', cabinetController.stopTask);

module.exports = cabinetRouter;
