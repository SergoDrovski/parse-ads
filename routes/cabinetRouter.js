const express = require('express');
const cabinetController = require("../controllers/cabinetController.js");


const cabinetRouter = express.Router();

cabinetRouter.get('/', cabinetController.index);

cabinetRouter.get('/stats', cabinetController.getStats);

cabinetRouter.get('/task/:taskId/url', cabinetController.getUrlInTask);
cabinetRouter.get('/task/:taskId/', cabinetController.getTaskId);

cabinetRouter.get('/check-task', cabinetController.checkStartTask);
cabinetRouter.get('/start/task', cabinetController.startTask);
cabinetRouter.get('/stop/task', cabinetController.stopTask);

module.exports = cabinetRouter;
