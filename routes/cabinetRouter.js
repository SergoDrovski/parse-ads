const express = require('express');
const cabinetController = require("../controllers/cabinetController.js");
const loadUser = require("../middleware/loadUser.js");

const cabinetRouter = express.Router();

cabinetRouter.get('/', cabinetController.index);

cabinetRouter.get('/stats',loadUser.loadUser, cabinetController.getStats);

cabinetRouter.get('/task/:taskId/url',loadUser.loadUser, cabinetController.getUrlInTask);
cabinetRouter.get('/task/:taskId/',loadUser.loadUser, cabinetController.getTaskId);

cabinetRouter.get('/check-task',loadUser.loadUser, cabinetController.checkStartTask);
cabinetRouter.get('/start/task',loadUser.loadUser, cabinetController.startTask);
cabinetRouter.get('/stop/task',loadUser.loadUser, cabinetController.stopTask);

module.exports = cabinetRouter;
